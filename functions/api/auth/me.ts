/**
 * Cloudflare Pages Function: GET /api/auth/me
 * Returns current authenticated user profile using session cookie in D1.
 */

import {
  ensureAuthSchema,
  parseCookies,
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestGet = async (context: EventContext): Promise<Response> => {
  try {
    const { request, env } = context;
    const db = env?.DB;

    if (db) {
      await ensureAuthSchema(db);
    }

    const cookieHeader = request.headers.get('Cookie');
    const cookies = parseCookies(cookieHeader);
    const sessionToken = cookies['peekly_session'];

    if (!sessionToken) {
      // Check fallback peekly_user / peekly_auth cookies for compatibility
      const legacyRaw = cookies['peekly_user'] || cookies['peekly_auth'];
      if (legacyRaw) {
        try {
          const parsed = JSON.parse(decodeURIComponent(legacyRaw));
          if (parsed?.nickname) {
            return new Response(
              JSON.stringify({ authenticated: true, user: parsed }),
              {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              }
            );
          }
        } catch {}
      }

      return new Response(JSON.stringify({ authenticated: false, user: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const now = Date.now();

    // 1. D1 session lookup
    if (db) {
      const row = await db
        .prepare(
          `SELECT u.id, u.email, u.nickname, u.role, u.created_at, s.expires_at
           FROM sessions s
           JOIN users u ON s.user_id = u.id
           WHERE s.token = ? AND s.expires_at > ?`
        )
        .bind(sessionToken, now)
        .first<{
          id: string;
          email: string;
          nickname: string;
          role: string;
          created_at: number;
          expires_at: number;
        }>();

      if (row) {
        const isCeo = row.email === 'zeacvo@icloud.com' || row.nickname.toLowerCase() === 'zeacvo';
        return new Response(
          JSON.stringify({
            authenticated: true,
            user: {
              id: row.id,
              email: row.email,
              nickname: row.nickname,
              role: row.role,
              country: 'BY',
              elo: isCeo ? 1699 : 1500,
              level: isCeo ? 8 : 6,
            },
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      const session = memoryAuthSessions.get(sessionToken);
      if (session && session.expires_at > now) {
        const user = memoryAuthUsers.get(session.user_id);
        if (user) {
          const isCeo = user.email === 'zeacvo@icloud.com' || user.nickname.toLowerCase() === 'zeacvo';
          return new Response(
            JSON.stringify({
              authenticated: true,
              user: {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                role: user.role,
                country: 'BY',
                elo: isCeo ? 1699 : 1500,
                level: isCeo ? 8 : 6,
              },
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      }
    }

    return new Response(JSON.stringify({ authenticated: false, user: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Server error: ${String(err)}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequest = onRequestGet;
