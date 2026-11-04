/**
 * Cloudflare Pages Function: /api/users/avatar
 * Handles direct avatar upload (POST) and avatar reset/deletion to default (DELETE / POST null).
 */

import {
  parseCookies,
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
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-User',
      'Access-Control-Max-Age': '86400',
    },
  });
};

async function getAuthenticatedUser(context: EventContext): Promise<{
  userId: string;
  currentUser: { id: string; nickname: string; email: string; avatar_url?: string | null; role: string };
} | null> {
  const { request, env } = context;
  const db = env?.DB;
  if (db) {
    await ensureAuthSchema(db);
  }

  const cookies = parseCookies(request.headers.get('Cookie'));
  const sessionToken = cookies['peekly_session'];
  const adminUserHeader = request.headers.get('X-Admin-User');

  let userId: string | null = null;
  let currentUser: {
    id: string;
    nickname: string;
    email: string;
    avatar_url?: string | null;
    role: string;
  } | null = null;

  if (sessionToken) {
    if (db) {
      currentUser = await db
        .prepare(
          `SELECT u.id, u.nickname, u.email, u.avatar_url, u.role
           FROM sessions s
           JOIN users u ON s.user_id = u.id
           WHERE s.token = ? AND s.expires_at > ?`
        )
        .bind(sessionToken, Date.now())
        .first<{
          id: string;
          nickname: string;
          email: string;
          avatar_url?: string | null;
          role: string;
        }>();

      if (currentUser) userId = currentUser.id;
    } else {
      const session = memoryAuthSessions.get(sessionToken);
      if (session && session.expires_at > Date.now()) {
        const u = memoryAuthUsers.get(session.user_id);
        if (u) {
          userId = u.id;
          currentUser = {
            id: u.id,
            nickname: u.nickname,
            email: u.email,
            avatar_url: u.avatar_url,
            role: u.role,
          };
        }
      }
    }
  }

  // Fallback: If admin/owner header provided
  if (!currentUser && adminUserHeader && adminUserHeader.trim().toLowerCase() === 'zeacvo') {
    if (db) {
      currentUser = await db
        .prepare('SELECT id, nickname, email, avatar_url, role FROM users WHERE LOWER(nickname) = ?')
        .bind('zeacvo')
        .first<{ id: string; nickname: string; email: string; avatar_url?: string | null; role: string }>();
      if (currentUser) userId = currentUser.id;
    } else {
      for (const u of memoryAuthUsers.values()) {
        if (u.nickname.toLowerCase() === 'zeacvo') {
          userId = u.id;
          currentUser = {
            id: u.id,
            nickname: u.nickname,
            email: u.email,
            avatar_url: u.avatar_url,
            role: u.role,
          };
          break;
        }
      }
    }
  }

  if (!userId || !currentUser) return null;
  return { userId, currentUser };
}

export const onRequestDelete = async (context: EventContext): Promise<Response> => {
  try {
    const auth = await getAuthenticatedUser(context);
    if (!auth) {
      return new Response(JSON.stringify({ error: 'Session expired or unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const { userId } = auth;
    const db = context.env?.DB;

    if (db) {
      await db
        .prepare('UPDATE users SET avatar_url = NULL WHERE id = ?')
        .bind(userId)
        .run();
    }

    const memUser = memoryAuthUsers.get(userId);
    if (memUser) {
      memUser.avatar_url = null;
    }

    return new Response(
      JSON.stringify({
        success: true,
        avatar: null,
        avatar_url: null,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Server error: ${(err as Error).message}` }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
};

export const onRequestPost = async (context: EventContext): Promise<Response> => {
  try {
    const auth = await getAuthenticatedUser(context);
    if (!auth) {
      return new Response(JSON.stringify({ error: 'Session expired or unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const { userId } = auth;
    const { request, env } = context;
    const db = env?.DB;

    let avatarData: string | null = '';
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = (await request.json().catch(() => ({}))) as { avatar?: string | null; avatar_url?: string | null };
      if (body.avatar === null || body.avatar_url === null || body.avatar === '' || body.avatar_url === '') {
        avatarData = null;
      } else {
        avatarData = (body.avatar || body.avatar_url || '').trim();
      }
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') || formData.get('avatar');
      if (file && typeof file === 'object' && 'arrayBuffer' in file) {
        const arrayBuf = await (file as Blob).arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuf)));
        const mimeType = (file as Blob).type || 'image/png';
        avatarData = `data:${mimeType};base64,${base64}`;
      } else if (typeof file === 'string') {
        avatarData = file;
      }
    }

    // If avatarData is null or empty, reset to default
    if (avatarData === null || avatarData === '') {
      if (db) {
        await db
          .prepare('UPDATE users SET avatar_url = NULL WHERE id = ?')
          .bind(userId)
          .run();
      }
      const memUser = memoryAuthUsers.get(userId);
      if (memUser) {
        memUser.avatar_url = null;
      }
      return new Response(
        JSON.stringify({
          success: true,
          avatar: null,
          avatar_url: null,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    // Validate size (max 4MB string)
    if (avatarData.length > 4 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'Avatar file is too large (max 2MB).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (db) {
      await db
        .prepare('UPDATE users SET avatar_url = ? WHERE id = ?')
        .bind(avatarData, userId)
        .run();
    }

    const memUser = memoryAuthUsers.get(userId);
    if (memUser) {
      memUser.avatar_url = avatarData;
    }

    return new Response(
      JSON.stringify({
        success: true,
        avatar: avatarData,
        avatar_url: avatarData,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Server error: ${(err as Error).message}` }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
};
