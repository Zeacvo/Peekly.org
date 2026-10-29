/**
 * Cloudflare Pages Function: POST /api/auth/resend-code
 * Regenerates and re-issues a 6-digit verification code.
 */

import {
  ensureAuthSchema,
  isValidEmail,
  memoryVerificationCodes,
  type D1Database,
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

    const { email } = body as { email?: string };
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return new Response(
        JSON.stringify({ error: 'A valid email address is required.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    let existing: DbVerificationCode | null = null;
    if (db) {
      existing = await db
        .prepare('SELECT email, nickname, password_hash, salt FROM verification_codes WHERE email = ?')
        .bind(cleanEmail)
        .first<DbVerificationCode>();
    } else {
      existing = memoryVerificationCodes.get(cleanEmail) || null;
    }

    if (!existing) {
      return new Response(
        JSON.stringify({ error: 'No pending registration found for this email. Please register again.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const now = Date.now();
    const expiresAt = now + 10 * 60 * 1000;

    if (db) {
      await db
        .prepare('UPDATE verification_codes SET code = ?, expires_at = ? WHERE email = ?')
        .bind(newCode, expiresAt, cleanEmail)
        .run();
    } else {
      existing.code = newCode;
      existing.expires_at = expiresAt;
    }

    console.log(`[AUTH OTP RESEND] New 6-digit code for ${cleanEmail}: ${newCode}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `A new 6-digit verification code has been sent to ${cleanEmail}`,
        email: cleanEmail,
        devCode: newCode,
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
