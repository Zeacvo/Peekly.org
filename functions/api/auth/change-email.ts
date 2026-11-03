/**
 * Cloudflare Pages Function: POST /api/auth/change-email
 * Two-step OTP verified email change endpoint for authenticated users.
 */

import {
  parseCookies,
  isValidEmail,
  ensureAuthSchema,
  memoryAuthSessions,
  memoryAuthUsers,
  type D1Database,
} from '../utils/auth.ts';

interface EventContext {
  request: Request;
  env?: {
    DB?: D1Database;
    RESEND_API_KEY?: string;
    [key: string]: unknown;
  };
}

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
};

const memoryChangeEmailCodes = new Map<string, { code: string; expires_at: number; newEmail: string }>();

export const onRequestPost = async (context: EventContext): Promise<Response> => {
  try {
    const { request, env } = context;
    const db = env?.DB;
    if (db) {
      await ensureAuthSchema(db);
    }

    const cookies = parseCookies(request.headers.get('Cookie'));
    const sessionToken = cookies['peekly_session'];

    if (!sessionToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Session required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    let userId: string | null = null;
    let currentUserEmail = '';

    if (db) {
      const row = await db
        .prepare(
          `SELECT u.id, u.email
           FROM sessions s
           JOIN users u ON s.user_id = u.id
           WHERE s.token = ? AND s.expires_at > ?`
        )
        .bind(sessionToken, Date.now())
        .first<{ id: string; email: string }>();

      if (row) {
        userId = row.id;
        currentUserEmail = row.email;
      }
    } else {
      const session = memoryAuthSessions.get(sessionToken);
      if (session && session.expires_at > Date.now()) {
        const u = memoryAuthUsers.get(session.user_id);
        if (u) {
          userId = u.id;
          currentUserEmail = u.email;
        }
      }
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Session expired or invalid' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const body = (await request.json().catch(() => ({}))) as {
      action?: 'send_code' | 'verify_code';
      newEmail?: string;
      code?: string;
    };

    const action = body.action || (body.code ? 'verify_code' : 'send_code');
    const newEmail = (body.newEmail || '').trim().toLowerCase();

    if (!isValidEmail(newEmail)) {
      return new Response(JSON.stringify({ error: 'Invalid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (newEmail === currentUserEmail.toLowerCase()) {
      return new Response(JSON.stringify({ error: 'New email is identical to current email.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Step 1: Send verification code
    if (action === 'send_code') {
      if (db) {
        const existing = await db
          .prepare('SELECT id FROM users WHERE LOWER(email) = LOWER(?) AND id != ?')
          .bind(newEmail, userId)
          .first<{ id: string }>();

        if (existing) {
          return new Response(JSON.stringify({ error: 'This email is already in use by another account.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }
      }

      // Generate 6-digit OTP code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 15 * 60 * 1000;

      memoryChangeEmailCodes.set(userId, { code, expires_at: expiresAt, newEmail });

      // Send email via Resend if API key is present
      const resendApiKey = env?.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: 'PEEKLY Security <auth@peekly.org>',
              to: [newEmail],
              subject: `${code} is your Peekly verification code`,
              html: `
                <div style="background-color: #000000; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; max-width: 520px; margin: 0 auto; border: 1px solid #1A1A1F;">
                  <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 0 0 16px;">Verify Email Change</h1>
                  <p style="color: #8F9098; font-size: 14px; margin: 0 0 24px;">Use the verification code below to confirm updating your account email to <strong style="color: #FFFFFF;">${newEmail}</strong>.</p>
                  <div style="background-color: #0F0F11; border: 1px solid #FFFFFF; padding: 18px; text-align: center; margin: 0 0 24px;">
                    <span style="font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #FFFFFF;">${code}</span>
                  </div>
                  <p style="color: #555555; font-size: 12px; margin: 0;">Code expires in 15 minutes. If you did not request this, please disregard.</p>
                </div>
              `,
            }),
          });
        } catch (mailErr) {
          console.warn('[Resend] Error sending email change OTP:', mailErr);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Verification code sent to ${newEmail}`,
          // In dev mode without resend, provide code for testing
          testCode: resendApiKey ? undefined : code,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    // Step 2: Verify code and update email
    if (action === 'verify_code') {
      const inputCode = (body.code || '').trim();
      const pending = memoryChangeEmailCodes.get(userId);

      if (!pending || pending.newEmail !== newEmail) {
        return new Response(JSON.stringify({ error: 'No verification request found for this email.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      if (Date.now() > pending.expires_at) {
        memoryChangeEmailCodes.delete(userId);
        return new Response(JSON.stringify({ error: 'Verification code has expired. Request a new one.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      if (pending.code !== inputCode) {
        return new Response(JSON.stringify({ error: 'Invalid verification code.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      // Success: update email in D1
      if (db) {
        await db.prepare('UPDATE users SET email = ? WHERE id = ?').bind(newEmail, userId).run();
      } else {
        const u = memoryAuthUsers.get(userId);
        if (u) u.email = newEmail;
      }

      memoryChangeEmailCodes.delete(userId);

      return new Response(
        JSON.stringify({ success: true, message: 'Email updated successfully.', email: newEmail }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Server error: ${String(err)}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};

export const onRequest = onRequestPost;
