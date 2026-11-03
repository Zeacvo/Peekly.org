/**
 * Cloudflare Pages Function: POST /api/auth/change-password
 * Verifies current password and updates password hash (PBKDF2) in Cloudflare D1.
 */

import {
  parseCookies,
  hashPassword,
  verifyPassword,
  ensureAuthSchema,
  memoryAuthSessions,
  memoryAuthUsers,
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

    const cookies = parseCookies(request.headers.get('Cookie'));
    const sessionToken = cookies['peekly_session'];

    if (!sessionToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Session required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const body = (await request.json().catch(() => ({}))) as {
      oldPassword?: string;
      newPassword?: string;
    };

    const oldPassword = body.oldPassword || '';
    const newPassword = body.newPassword || '';

    if (!newPassword || newPassword.length < 8) {
      return new Response(
        JSON.stringify({ error: 'New password must be at least 8 characters long.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    let userId: string | null = null;
    let currentHash: string | null = null;
    let currentSalt: string | null = null;

    if (db) {
      const row = await db
        .prepare(
          `SELECT u.id, u.password_hash, u.salt
           FROM sessions s
           JOIN users u ON s.user_id = u.id
           WHERE s.token = ? AND s.expires_at > ?`
        )
        .bind(sessionToken, Date.now())
        .first<{ id: string; password_hash: string; salt: string }>();

      if (row) {
        userId = row.id;
        currentHash = row.password_hash;
        currentSalt = row.salt;
      }
    } else {
      const session = memoryAuthSessions.get(sessionToken);
      if (session && session.expires_at > Date.now()) {
        const user = memoryAuthUsers.get(session.user_id);
        if (user) {
          userId = user.id;
          currentHash = user.password_hash;
          currentSalt = user.salt;
        }
      }
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Session expired or invalid' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // If current hash exists, verify old password
    if (currentHash && currentSalt) {
      const isValid = await verifyPassword(oldPassword, currentHash, currentSalt);
      if (!isValid) {
        return new Response(JSON.stringify({ error: 'Current password is incorrect.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    const { hash: newHash, salt: newSalt } = await hashPassword(newPassword);

    if (db) {
      await db
        .prepare('UPDATE users SET password_hash = ?, salt = ? WHERE id = ?')
        .bind(newHash, newSalt, userId)
        .run();
    } else {
      const user = memoryAuthUsers.get(userId);
      if (user) {
        user.password_hash = newHash;
        user.salt = newSalt;
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Password updated successfully.' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: `Server error: ${String(err)}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};

export const onRequest = onRequestPost;
