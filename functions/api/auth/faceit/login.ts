/**
 * FACEIT OAuth Login Endpoint (Cloudflare Pages Function & Dev Middleware)
 * Client ID: d58837f4-984d-41a5-bd76-615ef5156660
 * Generates PKCE code_verifier and code_challenge, redirects to FACEIT OAuth dialog.
 */

function base64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function generatePkcePair(): Promise<{ verifier: string; challenge: string }> {
  const verifierBytes = new Uint8Array(32);
  crypto.getRandomValues(verifierBytes);
  const verifier = base64Url(verifierBytes);

  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(verifier));
  const challenge = base64Url(new Uint8Array(digest));

  return { verifier, challenge };
}

export async function onRequest(): Promise<Response> {
  const { verifier, challenge } = await generatePkcePair();

  // Pass verifier in state for 100% reliable cross-domain return
  const state = `v_${verifier}`;

  const params = new URLSearchParams({
    client_id: 'd58837f4-984d-41a5-bd76-615ef5156660',
    response_type: 'code',
    redirect_uri: 'https://peekly.org/api/auth/faceit/callback',
    scope: 'openid profile email membership chat.messages.read chat.messages.write chat.rooms.read',
    code_challenge: challenge,
    code_challenge_method: 'S256',
    state,
  });

  const loginUrl = `https://accounts.faceit.com/?${params.toString()}`;

  const headers = new Headers();
  headers.set('Location', loginUrl);
  headers.set(
    'Set-Cookie',
    `faceit_verifier=${verifier}; Path=/api/auth/faceit; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );

  return new Response(null, {
    status: 302,
    headers,
  });
}
