/**
 * FACEIT OAuth Login Endpoint (Cloudflare Pages Function)
 * Client ID: d58837f4-984d-41a5-bd76-615ef5156660
 * Redirects user to official FACEIT OAuth authorization dialog.
 */
export const FACEIT_AUTH_LOGIN_URL =
  'https://accounts.faceit.com/?client_id=d58837f4-984d-41a5-bd76-615ef5156660&response_type=code&redirect_uri=https%3A%2F%2Fpeekly.org%2Fapi%2Fauth%2Ffaceit%2Fcallback&scope=openid%20profile%20email%20membership%20chat.messages.read%20chat.messages.write%20chat.rooms.read';

export async function onRequest(): Promise<Response> {
  return Response.redirect(FACEIT_AUTH_LOGIN_URL, 302);
}
