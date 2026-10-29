/**
 * Cloudflare Pages Function: POST /api/auth/login
 * Verifies email + password against D1 and establishes user session.
 */

import {
  ensureAuthSchema,
  verifyPassword,
  generateSessionToken,
  createSessionCookieHeader,
  memoryAuthUsers,
  memoryAuthSessions,
  type D1Database,
  type DbUser,
  type DbSession,
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

    const { email, password } = body as { email?: string; password?: string };
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      return new Response(JSON.stringify({ error: 'Email and password are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Fetch user by email
    let user: DbUser | null = null;

    if (db) {
      user = await db
        .prepare('SELECT id, email, password_hash, salt, nickname, role, created_at FROM users WHERE email = ?')
        .bind(cleanEmail)
        .first<DbUser>();
    } else {
      for (const u of memoryAuthUsers.values()) {
        if (u.email === cleanEmail) {
          user = u;
          break;
        }
      }
    }

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Verify password with stored PBKDF2 hash & salt
    const isPasswordValid = await verifyPassword(cleanPassword, user.password_hash, user.salt);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Create active session token
    const token = generateSessionToken();
    const now = Date.now();
    const expiresAt = now + 30 * 24 * 60 * 60 * 1000;
    const session: DbSession = {
      token,
      user_id: user.id,
      expires_at: expiresAt,
      created_at: now,
    };

    if (db) {
      await db
        .prepare('INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
        .bind(session.token, session.user_id, session.expires_at, session.created_at)
        .run();
    } else {
      memoryAuthSessions.set(token, session);
    }

    // 4. Set session cookies
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.append('Set-Cookie', createSessionCookieHeader(token));

    const isCeo = user.email === 'zeacvo@icloud.com' || user.nickname.toLowerCase() === 'zeacvo';
    const clientSession = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
      country: 'BY',
      elo: isCeo ? 1699 : 1500,
      level: isCeo ? 8 : 6,
    };
    headers.append(
      'Set-Cookie',
      `peekly_user=${encodeURIComponent(JSON.stringify(clientSession))}; Path=/; Secure; SameSite=Lax; Max-Age=2592000`
    );

    return new Response(
      JSON.stringify({
        success: true,
        user: clientSession,
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
