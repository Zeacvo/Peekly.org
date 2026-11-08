/**
 * Peekly for FACEIT - Extension Link Success Endpoint (Cloudflare Pages Function)
 * Path: /link/success
 * Serves SPA client application to render full interactive LinkSuccessPage with Header, Footer, and i18n.
 */

interface Env {
  ASSETS: {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  };
}

export async function onRequest(context: {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
}): Promise<Response> {
  if (context.env?.ASSETS) {
    const rootUrl = new URL('/', context.request.url);
    const spaRequest = new Request(rootUrl.toString(), context.request);
    const spaResponse = await context.env.ASSETS.fetch(spaRequest);
    return new Response(spaResponse.body, {
      status: 200,
      headers: spaResponse.headers,
    });
  }
  return context.next();
}
