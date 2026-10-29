/**
 * Cloudflare Pages Function: POST /api/auth/logout
 * Terminates user session in D1 and clears session cookies.
 */

import {
  parseCookies,
  clearSessionCookieHeaders,
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
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequest = async (context: EventContext): Promise<Response> => {
  try {
    const { request, env } = context;
    const db = env?.DB;

    const cookieHeader = request.headers.get('Cookie');
    const cookies = parseCookies(cookieHeader);
    const sessionToken = cookies['peekly_session'];

    if (sessionToken) {
      if (db) {
        try {
          await db
            .prepare('DELETE FROM sessions WHERE token = ?')
            .bind(sessionToken)
            .run();
        } catch (e) {
          console.warn('[D1] Error deleting session on logout:', e);
        }
      } else {
        memoryAuthSessions.delete(sessionToken);
      }
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    for (const cookie of clearSessionCookieHeaders()) {
      headers.append('Set-Cookie', cookie);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Server error: ${String(err)}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
