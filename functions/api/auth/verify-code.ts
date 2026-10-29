/**
 * Cloudflare Pages Function: POST /api/auth/verify-code
 * Verifies 6-digit OTP code, saves user to D1, and establishes active session.
 */

import {
  ensureAuthSchema,
  generateSessionToken,
  createSessionCookieHeader,
  memoryAuthUsers,
  memoryAuthSessions,
  memoryVerificationCodes,
  type D1Database,
  type DbUser,
  type DbSession,
  type DbVerificationCode,
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
    const cleanCode = (code || '').trim().replace(/\D/g, '');

    if (!cleanEmail || !cleanCode) {
      return new Response(
        JSON.stringify({ error: 'Email and 6-digit verification code are required.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const now = Date.now();
    let pending: DbVerificationCode | null = null;

    if (db) {
      pending = await db
        .prepare(
          'SELECT email, code, nickname, password_hash, salt, expires_at, created_at FROM verification_codes WHERE email = ?'
        )
        .bind(cleanEmail)
        .first<DbVerificationCode>();
    } else {
      pending = memoryVerificationCodes.get(cleanEmail) || null;
    }

    if (!pending) {
      return new Response(
        JSON.stringify({
          error: 'No verification code found for this email. Please request a new code.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (pending.expires_at < now) {
      return new Response(
        JSON.stringify({
          error: 'Verification code has expired. Please click "Resend" to get a new code.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (pending.code !== cleanCode) {
      return new Response(JSON.stringify({ error: 'Invalid verification code.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Create and insert user into users table
    const userId = crypto.randomUUID();
    const isCeo =
      cleanEmail === 'zeacvo@icloud.com' ||
      pending.nickname.toLowerCase() === 'zeacvo';
    const role = isCeo ? 'ADMIN' : 'USER';

    const newUser: DbUser = {
      id: userId,
      email: cleanEmail,
      password_hash: pending.password_hash,
      salt: pending.salt,
      nickname: pending.nickname,
      role,
      created_at: now,
    };

    const token = generateSessionToken();
    const sessionExpiresAt = now + 30 * 24 * 60 * 60 * 1000;
    const newSession: DbSession = {
      token,
      user_id: userId,
      expires_at: sessionExpiresAt,
      created_at: now,
    };

    if (db) {
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

      // Clean up verified code
      await db
        .prepare('DELETE FROM verification_codes WHERE email = ?')
        .bind(cleanEmail)
        .run();
    } else {
      memoryAuthUsers.set(userId, newUser);
      memoryAuthSessions.set(token, newSession);
      memoryVerificationCodes.delete(cleanEmail);
    }

    // 2. Set Cookies
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.append('Set-Cookie', createSessionCookieHeader(token));

    const clientSession = {
      id: userId,
      email: cleanEmail,
      nickname: pending.nickname,
      role,
      country: 'BY',
      elo: isCeo ? 1699 : 1500,
      level: isCeo ? 8 : 6,
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
      }),
      { status: 201, headers }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: `Server error: ${String(err)}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequest = onRequestPost;
