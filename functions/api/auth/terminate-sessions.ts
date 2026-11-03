/**
 * Cloudflare Pages Function: POST /api/auth/terminate-sessions
 * Terminates all active sessions for the current user except the active device.
 */

import {
  parseCookies,
  ensureAuthSchema,
  memoryAuthSessions,
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

    if (db) {
      const row = await db
        .prepare('SELECT user_id FROM sessions WHERE token = ? AND expires_at > ?')
        .bind(sessionToken, Date.now())
        .first<{ user_id: string }>();

      if (row) userId = row.user_id;
    } else {
      const session = memoryAuthSessions.get(sessionToken);
      if (session && session.expires_at > Date.now()) {
        userId = session.user_id;
      }
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Session expired or invalid' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    let terminatedCount = 0;
    if (db) {
      const res = await db
        .prepare('DELETE FROM sessions WHERE user_id = ? AND token != ?')
        .bind(userId, sessionToken)
        .run();
      terminatedCount = (res as { changes?: number })?.changes || 1;
    } else {
      for (const [t, s] of memoryAuthSessions.entries()) {
        if (s.user_id === userId && t !== sessionToken) {
          memoryAuthSessions.delete(t);
          terminatedCount++;
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'All other sessions have been terminated.',
        terminatedCount,
      }),
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
