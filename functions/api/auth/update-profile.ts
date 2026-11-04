/**
 * Cloudflare Pages Function: POST /api/auth/update-profile
 * Updates authenticated user's nickname and avatar in Cloudflare D1.
 */

import {
  parseCookies,
  isValidNickname,
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
    let currentUser: { id: string; nickname: string; email: string; avatar_url?: string | null; role: string } | null = null;

    if (db) {
      currentUser = await db
        .prepare(
          `SELECT u.id, u.nickname, u.email, u.avatar_url, u.role
           FROM sessions s
           JOIN users u ON s.user_id = u.id
           WHERE s.token = ? AND s.expires_at > ?`
        )
        .bind(sessionToken, Date.now())
        .first<{ id: string; nickname: string; email: string; avatar_url?: string | null; role: string }>();

      if (currentUser) userId = currentUser.id;
    } else {
      const session = memoryAuthSessions.get(sessionToken);
      if (session && session.expires_at > Date.now()) {
        const u = memoryAuthUsers.get(session.user_id);
        if (u) {
          userId = u.id;
          currentUser = { id: u.id, nickname: u.nickname, email: u.email, avatar_url: u.avatar_url, role: u.role };
        }
      }
    }

    if (!userId || !currentUser) {
      return new Response(JSON.stringify({ error: 'Session expired or invalid' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const body = (await request.json().catch(() => ({}))) as {
      nickname?: string;
      avatar?: string;
    };

    let updatedNickname = currentUser.nickname;
    let updatedAvatar = currentUser.avatar_url;

    if (typeof body.nickname === 'string') {
      const cleanNick = body.nickname.trim();
      if (!isValidNickname(cleanNick)) {
        return new Response(
          JSON.stringify({ error: 'Nickname must be 3-20 characters (letters, numbers, _, -).' }),
          { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
      }

      // Check if nickname taken
      if (cleanNick.toLowerCase() !== currentUser.nickname.toLowerCase()) {
        if (db) {
          const existing = await db
            .prepare('SELECT id FROM users WHERE LOWER(nickname) = LOWER(?) AND id != ?')
            .bind(cleanNick, userId)
            .first<{ id: string }>();

          if (existing) {
            return new Response(JSON.stringify({ error: 'This nickname is already taken.' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            });
          }
        }
      }
      updatedNickname = cleanNick;
    }

    if (typeof body.avatar === 'string') {
      const cleanAvatar = body.avatar.trim();
      if (
        cleanAvatar &&
        !cleanAvatar.startsWith('http://') &&
        !cleanAvatar.startsWith('https://') &&
        !cleanAvatar.startsWith('data:image/')
      ) {
        return new Response(JSON.stringify({ error: 'Avatar must be a valid image URL or image data.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
      updatedAvatar = cleanAvatar || null;
    }

    if (db) {
      await db
        .prepare('UPDATE users SET nickname = ?, avatar_url = ? WHERE id = ?')
        .bind(updatedNickname, updatedAvatar, userId)
        .run();
    } else {
      const user = memoryAuthUsers.get(userId);
      if (user) {
        user.nickname = updatedNickname;
        user.avatar_url = updatedAvatar;
      }
    }

    const responseUser = {
      ...currentUser,
      nickname: updatedNickname,
      avatar: updatedAvatar,
      avatar_url: updatedAvatar,
    };

    return new Response(
      JSON.stringify({ success: true, message: 'Profile updated successfully.', user: responseUser }),
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
