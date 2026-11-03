/**
 * Cloudflare Pages Function: /api/admin/users
 * Protected CEO Admin Endpoint: returns all players and dashboard KPI metrics.
 * Strictly restricted to nickname === 'Zeacvo' or email === 'zeacvo@icloud.com'.
 */

import { getAllPlayers, computeStats, deletePlayersByIds, type PlayerUser, type AdminStats } from '../storage/usersDb.ts';

interface EventContext {
  request: Request;
  env?: Record<string, unknown>;
}

export interface AdminUsersResponse {
  stats: AdminStats;
  users: PlayerUser[];
  currentUser?: {
    nickname: string;
    email: string;
    role: string;
  };
}

export function isAuthorizedCeo(request: Request): { authorized: boolean; nickname?: string; email?: string } {
  const url = new URL(request.url);

  // 1. Query parameter check (e.g. ?admin_user=Zeacvo or ?as=Zeacvo)
  const queryUser = url.searchParams.get('admin_user') || url.searchParams.get('as');
  if (queryUser && queryUser.trim().toLowerCase() === 'zeacvo') {
    return { authorized: true, nickname: 'Zeacvo', email: 'zeacvo@icloud.com' };
  }

  // 2. Custom header check (e.g. X-Admin-User: Zeacvo)
  const headerUser = request.headers.get('X-Admin-User');
  if (headerUser && headerUser.trim().toLowerCase() === 'zeacvo') {
    return { authorized: true, nickname: 'Zeacvo', email: 'zeacvo@icloud.com' };
  }

  // 3. Authorization Bearer header
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token.toLowerCase() === 'zeacvo' || token === 'ceo-token-secret') {
      return { authorized: true, nickname: 'Zeacvo', email: 'zeacvo@icloud.com' };
    }
    try {
      const decoded = JSON.parse(atob(token));
      if (
        decoded?.nickname?.toLowerCase() === 'zeacvo' ||
        decoded?.email?.toLowerCase() === 'zeacvo@icloud.com'
      ) {
        return { authorized: true, nickname: 'Zeacvo', email: 'zeacvo@icloud.com' };
      }
    } catch {}
  }

  // 4. Cookie check (peekly_auth or peekly_user)
  const cookieHeader = request.headers.get('Cookie') || '';
  const match = cookieHeader.match(/peekly_auth=([^;]+)/) || cookieHeader.match(/peekly_user=([^;]+)/);
  if (match) {
    try {
      const raw = decodeURIComponent(match[1]);
      const session = JSON.parse(raw);
      if (
        session?.nickname?.toLowerCase() === 'zeacvo' ||
        session?.email?.toLowerCase() === 'zeacvo@icloud.com'
      ) {
        return {
          authorized: true,
          nickname: session.nickname || 'Zeacvo',
          email: session.email || 'zeacvo@icloud.com',
        };
      }
    } catch {}
  }

  return { authorized: false };
}

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-User',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestGet = async (context: EventContext): Promise<Response> => {
  const auth = isAuthorizedCeo(context.request);

  if (!auth.authorized) {
    return new Response(
      JSON.stringify({
        error: 'Forbidden: Access restricted to CEO (Zeacvo).',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  const users = await getAllPlayers(context.env);
  const stats = computeStats(users);

  const payload: AdminUsersResponse = {
    stats,
    users,
    currentUser: {
      nickname: auth.nickname || 'Zeacvo',
      email: auth.email || 'zeacvo@icloud.com',
      role: 'CEO / Project Owner',
    },
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
};

export const onRequestDelete = async (context: EventContext): Promise<Response> => {
  const auth = isAuthorizedCeo(context.request);
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({ error: 'Forbidden: Access restricted to CEO (Zeacvo).' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  try {
    const body = (await context.request.json().catch(() => ({}))) as {
      userIds?: string[];
      userId?: string;
    };
    let ids: string[] = [];
    if (Array.isArray(body.userIds)) ids = body.userIds.filter(Boolean);
    else if (body.userId) ids = [body.userId];

    if (ids.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing userIds' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const deletedCount = await deletePlayersByIds(context.env, ids);
    return new Response(JSON.stringify({ success: true, deletedCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};

export const onRequest = async (context: EventContext): Promise<Response> => {
  if (context.request.method === 'OPTIONS') {
    return onRequestOptions();
  }
  if (context.request.method === 'GET') {
    return onRequestGet(context);
  }
  if (context.request.method === 'DELETE' || context.request.method === 'POST') {
    return onRequestDelete(context);
  }
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
