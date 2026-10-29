/**
 * Cloudflare Pages Middleware
 * Handles SPA client-side routing fallback without 308 redirect loops or asset conflicts.
 */

interface Env {
  ASSETS: {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  };
}

export const onRequest = async (context: {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
}): Promise<Response> => {
  const url = new URL(context.request.url);

  // Do not rewrite API routes
  if (url.pathname.startsWith('/api/')) {
    return context.next();
  }

  // Attempt to serve static asset
  const response = await context.next();

  // If route is not a static asset, serve SPA index.html with 200 OK
  if (response.status === 404 && (context.request.method === 'GET' || context.request.method === 'HEAD')) {
    const rootUrl = new URL('/', context.request.url);
    const spaRequest = new Request(rootUrl.toString(), context.request);
    const spaResponse = await context.env.ASSETS.fetch(spaRequest);
    return new Response(spaResponse.body, {
      status: 200,
      headers: spaResponse.headers,
    });
  }

  return response;
};
