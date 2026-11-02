/**
 * Cloudflare Pages Function: POST /api/auth/verify-code
 * Validates 6-digit OTP code against email_verifications,
 * provisions confirmed user in D1, and creates an active session.
 */

import {
  ensureAuthSchema,
  generateSessionToken,
  createSessionCookieHeader,
  memoryAuthUsers,
  memoryAuthSessions,
  memoryEmailVerifications,
  type D1Database,
  type DbUser,
  type DbSession,
  type DbEmailVerification,
} from '../utils/auth.ts';

interface EventContext {
  request: Request;
  env?: {
    DB?: D1Database;
    [key: string]: unknown;
  };
}

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestPost = async (context: EventContext): Promise<Response> => {
  try {
    const { request, env } = context;
    const db = env?.DB;

    if (db) {
      await ensureAuthSchema(db);
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid JSON payload.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { email, code } = body as { email?: string; code?: string };
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanCode = (code || '').trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return new Response(JSON.stringify({ error: 'A valid email address is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!cleanCode || cleanCode.length !== 6) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired verification code.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const now = Date.now();
    let record: DbEmailVerification | null = null;

    if (db) {
      try {
        record = await db
          .prepare(
            `SELECT email, code, username, password_hash, salt, newsletter_opt_in, expires_at, attempts 
             FROM email_verifications WHERE email = ?`
          )
          .bind(cleanEmail)
          .first<DbEmailVerification>();
      } catch {
        record = await db
          .prepare(
            `SELECT email, code, username, password_hash, newsletter_opt_in, expires_at, attempts 
             FROM email_verifications WHERE email = ?`
          )
          .bind(cleanEmail)
          .first<DbEmailVerification>();
      }
    } else {
      record = memoryEmailVerifications.get(cleanEmail) || null;
    }

    if (!record) {
      return new Response(
        JSON.stringify({ error: 'No pending verification found. Please register again.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check expiration
    if (record.expires_at <= now) {
      if (db) {
        await db
          .prepare('DELETE FROM email_verifications WHERE email = ?')
          .bind(cleanEmail)
          .run();
      } else {
        memoryEmailVerifications.delete(cleanEmail);
      }
      return new Response(
        JSON.stringify({ error: 'Verification code has expired. Please request a new code.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check code match
    if (record.code.trim() !== cleanCode) {
      const attempts = (record.attempts || 0) + 1;
      if (attempts >= 5) {
        if (db) {
          await db
            .prepare('DELETE FROM email_verifications WHERE email = ?')
            .bind(cleanEmail)
            .run();
        } else {
          memoryEmailVerifications.delete(cleanEmail);
        }
        return new Response(
          JSON.stringify({ error: 'Too many invalid attempts. Please request a new code.' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      if (db) {
        await db
          .prepare('UPDATE email_verifications SET attempts = ? WHERE email = ?')
          .bind(attempts, cleanEmail)
          .run();
      } else {
        record.attempts = attempts;
      }

      return new Response(
        JSON.stringify({ error: 'Invalid or expired verification code.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Code is valid! Parse stored password hash and salt
    let passwordHash = record.password_hash;
    let salt = record.salt || '';
    if (passwordHash.includes(':')) {
      const parts = passwordHash.split(':');
      passwordHash = parts[0];
      salt = parts[1] || salt;
    }

    const userId = crypto.randomUUID();
    const cleanNickname = record.username;
    const isCeo =
      cleanEmail === 'zeacvo@icloud.com' || cleanNickname.toLowerCase() === 'zeacvo';
    const role = isCeo ? 'ADMIN' : 'USER';
    const newsletterSubscribed = record.newsletter_opt_in ?? 1;

    const newUser: DbUser = {
      id: userId,
      email: cleanEmail,
      password_hash: passwordHash,
      salt,
      nickname: cleanNickname,
      role,
      created_at: now,
      newsletter_subscribed: newsletterSubscribed,
    };

    // Provision user into `users` table
    if (db) {
      try {
        try {
          await db
            .prepare(
              'INSERT INTO users (id, email, password_hash, salt, nickname, role, created_at, newsletter_subscribed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
            )
            .bind(
              newUser.id,
              newUser.email,
              newUser.password_hash,
              newUser.salt,
              newUser.nickname,
              newUser.role,
              newUser.created_at,
              newsletterSubscribed
            )
            .run();
        } catch {
          await db
            .prepare(
              'INSERT INTO users (id, email, password_hash, salt, nickname, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
            )
            .bind(
              newUser.id,
              newUser.email,
              newUser.password_hash,
              newUser.salt,
              newUser.nickname,
              newUser.role,
              newUser.created_at
            )
            .run();
        }
      } catch (insertErr: unknown) {
        const errMsg = String(insertErr);
        if (errMsg.includes('UNIQUE') || errMsg.includes('constraint')) {
          const isEmail = errMsg.includes('users.email') || !errMsg.includes('users.nickname');
          return new Response(
            JSON.stringify({
              error: isEmail
                ? 'Email already registered. Please sign in instead.'
                : 'Username is already taken. Please choose another.',
              field: isEmail ? 'email' : 'nickname',
            }),
            {
              status: 409,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        throw insertErr;
      }

      // Cleanup pending verification
      await db
        .prepare('DELETE FROM email_verifications WHERE email = ?')
        .bind(cleanEmail)
        .run();
    } else {
      memoryAuthUsers.set(userId, newUser);
      memoryEmailVerifications.delete(cleanEmail);
    }

    // Create session
    const token = generateSessionToken();
    const expiresAt = now + 30 * 24 * 60 * 60 * 1000;
    const newSession: DbSession = {
      token,
      user_id: userId,
      expires_at: expiresAt,
      created_at: now,
    };

    if (db) {
      await db
        .prepare(
          'INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)'
        )
        .bind(
          newSession.token,
          newSession.user_id,
          newSession.expires_at,
          newSession.created_at
        )
        .run();
    } else {
      memoryAuthSessions.set(token, newSession);
    }

    // Set cookies
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.append('Set-Cookie', createSessionCookieHeader(token));

    const clientSession = {
      id: userId,
      email: cleanEmail,
      nickname: cleanNickname,
      role,
      avatar: '',
      country: null,
      elo: null,
      level: null,
      faceit_connected: false,
      faceit_nickname: null,
    };
    headers.append(
      'Set-Cookie',
      `peekly_user=${encodeURIComponent(
        JSON.stringify(clientSession)
      )}; Path=/; Secure; SameSite=Lax; Max-Age=2592000`
    );

    return new Response(
      JSON.stringify({
        success: true,
        user: clientSession,
        redirect: '/',
      }),
      { status: 200, headers }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: `Server error: ${String(err)}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequest = onRequestPost;
