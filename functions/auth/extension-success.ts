/**
 * Extension Success Completion Endpoint (Cloudflare Pages Function)
 * Path: /auth/extension-success
 * Renders tactical success screen, syncs profile to extension, and auto-closes.
 */

import { generateSuccessHtml, type FaceitProfilePayload } from '../api/auth/faceit/callback.ts';

interface EventContext {
  request: Request;
}

export async function onRequest(context: EventContext): Promise<Response> {
  const url = new URL(context.request.url);
  const dataParam = url.searchParams.get('data');

  let profile: FaceitProfilePayload = {
    guid: '',
    nickname: '',
    avatar: '',
    country: '',
    elo: 0,
    level: 1,
    membership: 'free',
  };

  if (dataParam) {
    try {
      profile = JSON.parse(decodeURIComponent(dataParam));
    } catch {
      try {
        profile = JSON.parse(dataParam);
      } catch {}
    }
  }

  return new Response(generateSuccessHtml(profile), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
