/**
 * Cloudflare Pages Function: /api/admin/users/delete
 * Protected endpoint for single and bulk user deletion in Cloudflare D1 SQL database.
 * Strictly restricted to Project Owner / Admin (Zeacvo).
 */

import { isAuthorizedCeo } from '../users.ts';
import { deletePlayersByIds } from '../../storage/usersDb.ts';

interface EventContext {
  request: Request;
  env?: Record<string, unknown>;
}

export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-User',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestPost = async (context: EventContext): Promise<Response> => {
  const auth = isAuthorizedCeo(context.request);
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({ error: 'Forbidden: Access restricted to CEO / Admin.' }),
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

    let idsToDelete: string[] = [];
    if (Array.isArray(body.userIds)) {
      idsToDelete = body.userIds.filter(Boolean);
    } else if (body.userId) {
      idsToDelete = [body.userId];
    }

    if (idsToDelete.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing userIds array or userId' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const deletedCount = await deletePlayersByIds(context.env, idsToDelete);

    return new Response(
      JSON.stringify({
        success: true,
        deletedCount,
        message: `Successfully deleted ${deletedCount} user(s).`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Server error: ${String(err)}` }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

export const onRequestDelete = onRequestPost;

export const onRequest = async (context: EventContext): Promise<Response> => {
  if (context.request.method === 'OPTIONS') {
    return onRequestOptions();
  }
  if (context.request.method === 'POST' || context.request.method === 'DELETE') {
    return onRequestPost(context);
  }
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
