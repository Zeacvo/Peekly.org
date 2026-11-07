/**
 * Cloudflare Pages Function: GET /api/users/by-slug/:slug
 * Returns public player profile by slug / nickname / id.
 */

import { getPlayerById, type PlayerUser } from '../../storage/usersDb.ts';
import { ensureAuthSchema, type D1Database } from '../../utils/auth.ts';

interface EventContext {
  request: Request;
  params: {
    slug?: string;
  };
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
    const slug = context.params?.slug;
    if (!slug || !slug.trim()) {
      return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const target = decodeURIComponent(slug.trim());
    const db = context.env?.DB;
    if (db) {
      await ensureAuthSchema(db);
    }

    // Try direct SQL lookup in D1
    if (db) {
      try {
        const row = await db
          .prepare(
            `SELECT id, nickname, email, role, created_at, avatar_url, country, level, elo, faceit_id, faceit_nickname
             FROM users
             WHERE LOWER(nickname) = LOWER(?) OR LOWER(id) = LOWER(?)`
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

        // If D1 is connected and no user matches this slug/id, return 404 immediately
        return new Response(JSON.stringify({ error: 'Player not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      } catch (err) {
        console.error('D1 slug lookup error:', err);
      }
    }

    // Fallback: search memory / KV store
    const fallbackPlayer: PlayerUser | null = await getPlayerById(context.env, target);
    if (fallbackPlayer) {
      const isOwner =
        fallbackPlayer.nickname.toLowerCase() === 'zeacvo' ||
        fallbackPlayer.email.toLowerCase() === 'zeacvo@icloud.com' ||
        fallbackPlayer.role?.toUpperCase() === 'OWNER' ||
        fallbackPlayer.role?.toUpperCase() === 'CEO';

      return new Response(
        JSON.stringify({
          success: true,
          user: {
            id: fallbackPlayer.guid,
            guid: fallbackPlayer.guid,
            nickname: fallbackPlayer.nickname,
            avatar: fallbackPlayer.avatar || '',
            country: fallbackPlayer.country || null,
            elo: fallbackPlayer.elo || null,
            level: fallbackPlayer.level || null,
            role: isOwner ? 'OWNER' : fallbackPlayer.role || 'USER',
            plan: isOwner ? 'OWNER' : fallbackPlayer.plan || 'FREE',
            faceit_connected: fallbackPlayer.is_faceit_linked ?? true,
            faceit_nickname: fallbackPlayer.nickname,
            created_at: fallbackPlayer.created_at,
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    return new Response(JSON.stringify({ error: 'Player not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};
