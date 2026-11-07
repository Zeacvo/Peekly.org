/**
 * Cloudflare Pages Function: GET /api/users/profile
 * Returns public player profile by id / guid / nickname.
 */

import { getPlayerById, type PlayerUser } from '../storage/usersDb.ts';
import { ensureAuthSchema, type D1Database } from '../utils/auth.ts';

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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestGet = async (context: EventContext): Promise<Response> => {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id') || url.searchParams.get('userId') || url.searchParams.get('guid');

    if (!id || !id.trim()) {
      return new Response(JSON.stringify({ error: 'Missing user id query parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const target = id.trim();
    const db = context.env?.DB;
    if (db) {
      await ensureAuthSchema(db);
    }

    // First try direct SQL lookup in D1
    if (db) {
      try {
        const row = await db
          .prepare(
            `SELECT id, nickname, email, role, created_at, avatar_url, country, level, elo, faceit_id, faceit_nickname
             FROM users
             WHERE LOWER(id) = LOWER(?) OR LOWER(nickname) = LOWER(?)`
          )
          .bind(target, target)
          .first<{
            id: string;
            nickname: string;
            email: string;
            role: string;
            created_at: number;
            avatar_url?: string | null;
            country?: string | null;
            level?: number | null;
            elo?: number | null;
            faceit_id?: string | null;
            faceit_nickname?: string | null;
          }>();

        if (row) {
          const isOwner =
            row.nickname.toLowerCase() === 'zeacvo' ||
            row.nickname.toLowerCase() === 'zeacvo123' ||
            row.email.toLowerCase() === 'zeacvo@icloud.com' ||
            row.role?.toUpperCase() === 'OWNER' ||
            row.role?.toUpperCase() === 'CEO';

          return new Response(
            JSON.stringify({
              success: true,
              user: {
                id: row.id,
                guid: row.id,
                nickname: row.nickname,
                avatar: row.avatar_url || '',
                country: row.country || null,
                elo: row.elo || null,
                level: row.level || null,
                role: isOwner ? 'OWNER' : row.role || 'USER',
                plan: isOwner ? 'OWNER' : 'FREE',
                faceit_connected: Boolean(row.faceit_id || row.faceit_nickname || (row.elo && row.elo > 0)),
                faceit_nickname: row.faceit_nickname || row.nickname,
                created_at: row.created_at,
              },
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            }
          );
        }

        // If D1 is connected and no user matches, return 404 immediately
        return new Response(JSON.stringify({ error: 'Player not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      } catch (err) {
        console.warn('[D1] Public profile query error:', err);
      }
    }

    // Fallback to storage helper
    const player: PlayerUser | null = await getPlayerById(context.env, target);
    if (!player) {
      return new Response(JSON.stringify({ error: 'Player not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const isOwner =
      player.nickname.toLowerCase() === 'zeacvo' ||
      player.email.toLowerCase() === 'zeacvo@icloud.com' ||
      player.role?.toUpperCase() === 'OWNER' ||
      player.role?.toUpperCase() === 'CEO';

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: player.guid,
          guid: player.guid,
          nickname: player.nickname,
          avatar: player.avatar || '',
          country: player.country || null,
          elo: player.elo || null,
          level: player.level || null,
          role: isOwner ? 'OWNER' : player.role || 'USER',
          plan: isOwner ? 'OWNER' : 'FREE',
          faceit_connected: Boolean(player.is_faceit_linked),
          faceit_nickname: player.nickname,
          created_at: player.created_at,
        },
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

export const onRequest = onRequestGet;
