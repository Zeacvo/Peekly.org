/**
 * Cloudflare Pages Function: POST /api/auth/delete-account
 * Self-service account deletion for authenticated non-owner users.
 */

import {
  parseCookies,
  clearSessionCookieHeaders,
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

    let userId: string | null = null;
    let nickname = '';
    let email = '';

    if (db) {
      const row = await db
        .prepare(
          `SELECT u.id, u.nickname, u.email
           FROM sessions s
           JOIN users u ON s.user_id = u.id
           WHERE s.token = ? AND s.expires_at > ?`
        )
        .bind(sessionToken, Date.now())
        .first<{ id: string; nickname: string; email: string }>();

      if (row) {
        userId = row.id;
        nickname = row.nickname;
        email = row.email;
      }
    } else {
      const session = memoryAuthSessions.get(sessionToken);
      if (session && session.expires_at > Date.now()) {
        const u = memoryAuthUsers.get(session.user_id);
        if (u) {
          userId = u.id;
          nickname = u.nickname;
          email = u.email;
        }
      }
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Session expired or invalid' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Owner protection safeguard
    if (
      nickname.toLowerCase() === 'zeacvo' ||
      email.toLowerCase() === 'zeacvo@icloud.com' ||
      nickname.toLowerCase().includes('zeacvo')
    ) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: Owner account cannot be deleted.' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    if (db) {
      await db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId).run();
      await db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run();
    } else {
      memoryAuthSessions.delete(sessionToken);
      memoryAuthUsers.delete(userId);
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    clearSessionCookieHeaders().forEach((c) => headers.append('Set-Cookie', c));

    return new Response(
      JSON.stringify({ success: true, message: 'Account deleted successfully.' }),
      {
        status: 200,
        headers,
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
