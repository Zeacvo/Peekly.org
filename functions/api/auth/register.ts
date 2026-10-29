/**
 * Cloudflare Pages Function: POST /api/auth/register
 * Validates nickname, email, Apple password criteria, hashes password,
 * and issues a 6-digit verification code.
 */

import {
  ensureAuthSchema,
  hashPassword,
  isValidEmail,
  isValidNickname,
  checkPasswordRequirements,
  memoryAuthUsers,
  memoryVerificationCodes,
  type D1Database,
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

    const { nickname, email, password } = body as {
      nickname?: string;
      email?: string;
      password?: string;
    };

    const cleanNickname = (nickname || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // 1. Validate Nickname (3 to 20 chars, alphanumeric + _ -)
    if (!cleanNickname) {
      return new Response(JSON.stringify({ error: 'Nickname is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!isValidNickname(cleanNickname)) {
      return new Response(
        JSON.stringify({
          error:
            'Nickname must be 3-20 characters long and contain only Latin letters, numbers, underscores, or hyphens.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 2. Validate Email
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 3. Validate Password (Apple Policy)
    const pwCheck = checkPasswordRequirements(cleanPassword);
    if (!pwCheck.isValid) {
      return new Response(
        JSON.stringify({
          error:
            'Password must be at least 8 characters and include at least one number, one uppercase letter, one lowercase letter, and one special character.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 4. Check if user already exists
    if (db) {
      const existing = await db
        .prepare('SELECT id FROM users WHERE email = ?')
        .bind(cleanEmail)
        .first();

      if (existing) {
        return new Response(JSON.stringify({ error: 'Email already registered.' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      for (const u of memoryAuthUsers.values()) {
        if (u.email === cleanEmail) {
          return new Response(JSON.stringify({ error: 'Email already registered.' }), {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // 5. Hash password with PBKDF2 (SHA-256 100k) + unique salt
    const { hash, salt } = await hashPassword(cleanPassword);
    const now = Date.now();
    const expiresAt = now + 10 * 60 * 1000; // 10 minutes expiry

    // Generate 6-digit numeric verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 6. Save pending registration to verification_codes table
    if (db) {
      await db
        .prepare(
          `INSERT INTO verification_codes (email, code, nickname, password_hash, salt, expires_at, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(email) DO UPDATE SET
           code = excluded.code,
           nickname = excluded.nickname,
           password_hash = excluded.password_hash,
           salt = excluded.salt,
           expires_at = excluded.expires_at,
           created_at = excluded.created_at`
        )
        .bind(cleanEmail, code, cleanNickname, hash, salt, expiresAt, now)
        .run();
    } else {
      memoryVerificationCodes.set(cleanEmail, {
        email: cleanEmail,
        code,
        nickname: cleanNickname,
        password_hash: hash,
        salt,
        expires_at: expiresAt,
        created_at: now,
      });
    }

    console.log(`[AUTH OTP] 6-digit verification code for ${cleanEmail}: ${code}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `A 6-digit code has been sent to your email: ${cleanEmail}`,
        email: cleanEmail,
        devCode: code,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: `Server error: ${String(err)}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequest = onRequestPost;
