/**
 * Cloudflare Pages Function: GET/POST /api/auth/callback/google
 * Google OAuth 2.0 Callback handler
 * Exchanges authorization code for tokens, retrieves user profile,
 * and provisions user & session in Cloudflare D1.
 */

import {
  ensureAuthSchema,
  hashPassword,
  generateSessionToken,
  createSessionCookieHeader,
  memoryAuthUsers,
  memoryAuthSessions,
  type D1Database,
  type DbUser,
  type DbSession,
} from '../../utils/auth.ts';

interface EventContext {
  request: Request;
  env?: {
    DB?: D1Database;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
  };
}

export const onRequest = async (context: EventContext): Promise<Response> => {
  const { request, env } = context;
  const url = new URL(request.url);

  // Read credentials from Cloudflare Pages environment variables / context bindings
  const clientId =
    env?.GOOGLE_CLIENT_ID ||
    (typeof process !== 'undefined' ? process.env?.GOOGLE_CLIENT_ID : '') ||
    '';
  const clientSecret =
    env?.GOOGLE_CLIENT_SECRET ||
    (typeof process !== 'undefined' ? process.env?.GOOGLE_CLIENT_SECRET : '') ||
    '';

  // 1. Get code from query params
  const code = url.searchParams.get('code');
  const errorParam = url.searchParams.get('error');

  if (errorParam) {
    return Response.redirect(`${url.origin}/?auth_error=${encodeURIComponent(errorParam)}`, 302);
  }

  if (!code) {
    return Response.redirect(`${url.origin}/?auth_error=no_code`, 302);
  }

  try {
    const redirectUri = `${url.origin}/api/auth/callback/google`;

    // 2. Exchange code for Google tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text().catch(() => '');
      console.error('[Google OAuth] Token exchange error:', errText);
      return Response.redirect(`${url.origin}/?auth_error=token_exchange_failed`, 302);
    }

    const tokens = (await tokenRes.json()) as { access_token?: string; id_token?: string };
    if (!tokens.access_token) {
      return Response.redirect(`${url.origin}/?auth_error=no_access_token`, 302);
    }

    // 3. Fetch Google User Profile
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userRes.ok) {
      return Response.redirect(`${url.origin}/?auth_error=userinfo_failed`, 302);
    }

    const googleUser = (await userRes.json()) as {
      id?: string;
      email?: string;
      name?: string;
      picture?: string;
    };

    if (!googleUser.email) {
      return Response.redirect(`${url.origin}/?auth_error=no_email`, 302);
    }

    const cleanEmail = googleUser.email.trim().toLowerCase();
    const db = env?.DB;
    await ensureAuthSchema(db);

    const isCeo = cleanEmail === 'zeacvo@icloud.com';
    const role = isCeo ? 'ADMIN' : 'USER';
    const now = Date.now();

    // 4. Find or Create User in D1 / memory
    let user: DbUser | null = null;

    if (db) {
      user = await db
        .prepare('SELECT * FROM users WHERE email = ?')
        .bind(cleanEmail)
        .first<DbUser>();

      if (!user) {
        const userId = crypto.randomUUID();
        const { hash, salt } = await hashPassword(crypto.randomUUID());
        let cleanNickname = (googleUser.name || cleanEmail.split('@')[0])
          .trim()
          .replace(/[^a-zA-Z0-9_\-\s]/g, '')
          .slice(0, 20)
          .trim();
        if (cleanNickname.length < 2) {
          cleanNickname = cleanEmail.split('@')[0].slice(0, 20);
        }

        user = {
          id: userId,
          email: cleanEmail,
          password_hash: hash,
          salt,
          nickname: cleanNickname,
          role,
          created_at: now,
        };

        await db
          .prepare(
            'INSERT INTO users (id, email, password_hash, salt, nickname, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
          )
          .bind(
            user.id,
            user.email,
            user.password_hash,
            user.salt,
            user.nickname,
            user.role,
            user.created_at
          )
          .run();
      }
    } else {
      user =
        Array.from(memoryAuthUsers.values()).find((u) => u.email === cleanEmail) || null;

      if (!user) {
        const userId = crypto.randomUUID();
        const { hash, salt } = await hashPassword(crypto.randomUUID());
        let cleanNickname = (googleUser.name || cleanEmail.split('@')[0])
          .trim()
          .replace(/[^a-zA-Z0-9_\-\s]/g, '')
          .slice(0, 20)
          .trim();
        if (cleanNickname.length < 2) {
          cleanNickname = cleanEmail.split('@')[0].slice(0, 20);
        }

        user = {
          id: userId,
          email: cleanEmail,
          password_hash: hash,
          salt,
          nickname: cleanNickname,
          role,
          created_at: now,
        };

        memoryAuthUsers.set(userId, user);
      }
    }

    // 5. Generate session token and store in sessions table
    const sessionToken = generateSessionToken();
    const expiresAt = now + 30 * 24 * 60 * 60 * 1000;
    const newSession: DbSession = {
      token: sessionToken,
      user_id: user.id,
      expires_at: expiresAt,
      created_at: now,
    };

    if (db) {
      await db
        .prepare('INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
        .bind(newSession.token, newSession.user_id, newSession.expires_at, newSession.created_at)
        .run();
    } else {
      memoryAuthSessions.set(sessionToken, newSession);
    }

    // 6. Set Cookies & redirect to /?auth=success
    const clientSession = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
      avatar: googleUser.picture || '',
      country: 'BY',
      elo: user.role === 'ADMIN' ? 1699 : 1500,
      level: user.role === 'ADMIN' ? 8 : 6,
    };

    const headers = new Headers();
    headers.set('Location', `${url.origin}/?auth=success`);
    headers.append('Set-Cookie', createSessionCookieHeader(sessionToken));
    headers.append(
      'Set-Cookie',
      `peekly_user=${encodeURIComponent(
        JSON.stringify(clientSession)
      )}; Path=/; Secure; SameSite=Lax; Max-Age=2592000`
    );
    headers.append(
      'Set-Cookie',
      `peekly_auth=${encodeURIComponent(
        JSON.stringify(clientSession)
      )}; Path=/; Secure; SameSite=Lax; Max-Age=2592000`
    );

    return new Response(null, {
      status: 302,
      headers,
    });
  } catch (err) {
    console.error('[Google OAuth] Exception in callback:', err);
    return Response.redirect(`${url.origin}/?auth_error=server_error`, 302);
  }
};
