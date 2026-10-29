import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  hashPassword,
  verifyPassword,
  parseCookies,
  memoryAuthUsers,
  memoryAuthSessions,
} from '../functions/api/utils/auth.ts';
import { onRequestPost as onRegister } from '../functions/api/auth/register.ts';
import { onRequestPost as onLogin } from '../functions/api/auth/login.ts';
import { onRequestGet as onMe } from '../functions/api/auth/me.ts';
import { onRequest as onLogout } from '../functions/api/auth/logout.ts';
import { onRequest as onGoogleCallback } from '../functions/api/auth/callback/google.ts';

describe('Authentication & Crypto Logic', () => {
  beforeEach(() => {
    memoryAuthUsers.clear();
    memoryAuthSessions.clear();
  });

  test('hashPassword creates secure PBKDF2 hash and verifyPassword validates correctly', async () => {
    const pwd = 'SecretPassword123!';
    const { hash, salt } = await hashPassword(pwd);
    assert.ok(hash && hash.length === 64, 'SHA-256 hex string should be 64 characters');
    assert.ok(salt && salt.length === 32, 'Salt hex string should be 32 characters');

    const isValid = await verifyPassword(pwd, hash, salt);
    assert.strictEqual(isValid, true);

    const isInvalid = await verifyPassword('WrongPassword', hash, salt);
    assert.strictEqual(isInvalid, false);
  });

  test('Cloudflare Turnstile token validation and direct registration flow work', async () => {
    // 1. Missing turnstileToken -> 400
    const noTokenReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'TestGamer',
        email: 'test@peekly.org',
        password: 'Password123!',
      }),
    });
    const noTokenRes = await onRegister({ request: noTokenReq, env: {} });
    assert.strictEqual(noTokenRes.status, 400);
    const noTokenData = await noTokenRes.json();
    assert.strictEqual(noTokenData.error, 'Turnstile verification is required');

    // 2. Successful registration with valid turnstile token
    const validReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'TestGamer',
        email: 'test@peekly.org',
        password: 'Password123!',
        turnstileToken: 'mock-turnstile-token',
      }),
    });
    const validRes = await onRegister({ request: validReq, env: {} });
    assert.strictEqual(validRes.status, 201);
    const validData = await validRes.json();
    assert.strictEqual(validData.success, true);
    assert.strictEqual(validData.user.nickname, 'TestGamer');
    assert.strictEqual(validData.user.email, 'test@peekly.org');

    const setCookie = validRes.headers.get('Set-Cookie') || '';
    assert.match(setCookie, /peekly_session=/);
    const cookies = parseCookies(setCookie);
    const sessionToken = cookies['peekly_session'];
    assert.ok(sessionToken, 'Session token cookie must be present');

    // 3. Duplicate registration should be rejected with 409
    const dupReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'AnotherGamer',
        email: 'test@peekly.org',
        password: 'Password123!',
        turnstileToken: 'mock-turnstile-token',
      }),
    });
    const dupRes = await onRegister({ request: dupReq, env: {} });
    assert.strictEqual(dupRes.status, 409);

    // 4. Me endpoint returns authenticated profile
    const meReq = new Request('http://localhost/api/auth/me', {
      headers: { Cookie: `peekly_session=${sessionToken}` },
    });
    const meRes = await onMe({ request: meReq, env: {} });
    assert.strictEqual(meRes.status, 200);
    const meData = await meRes.json();
    assert.strictEqual(meData.authenticated, true);
    assert.strictEqual(meData.user.nickname, 'TestGamer');

    // 5. Login with registered credentials
    const loginReq = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@peekly.org',
        password: 'Password123!',
      }),
    });
    const loginRes = await onLogin({ request: loginReq, env: {} });
    assert.strictEqual(loginRes.status, 200);

    // 6. Logout clears session
    const logoutReq = new Request('http://localhost/api/auth/logout', {
      method: 'POST',
      headers: { Cookie: `peekly_session=${sessionToken}` },
    });
    const logoutRes = await onLogout({ request: logoutReq, env: {} });
    assert.strictEqual(logoutRes.status, 200);
  });

  test('Google OAuth callback redirects on missing code or error query parameter', async () => {
    // 1. Missing code
    const noCodeReq = new Request('http://localhost/api/auth/callback/google');
    const noCodeRes = await onGoogleCallback({ request: noCodeReq, env: {} });
    assert.strictEqual(noCodeRes.status, 302);
    assert.strictEqual(noCodeRes.headers.get('Location'), 'http://localhost/?auth_error=no_code');

    // 2. Error parameter
    const errorReq = new Request('http://localhost/api/auth/callback/google?error=access_denied');
    const errorRes = await onGoogleCallback({ request: errorReq, env: {} });
    assert.strictEqual(errorRes.status, 302);
    assert.strictEqual(errorRes.headers.get('Location'), 'http://localhost/?auth_error=access_denied');
  });

  test('Google OAuth callback exchanges code, provisions user and sets session cookies', async () => {
    const origFetch = globalThis.fetch;
    try {
      globalThis.fetch = async (url, init) => {
        const urlStr = url.toString();
        if (urlStr.includes('oauth2.googleapis.com/token')) {
          return new Response(JSON.stringify({ access_token: 'mock-google-token' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        if (urlStr.includes('googleapis.com/oauth2/v2/userinfo')) {
          return new Response(
            JSON.stringify({
              id: 'google-12345',
              email: 'google_gamer@gmail.com',
              name: 'Google Gamer',
              picture: 'https://example.com/avatar.png',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        return origFetch(url, init);
      };

      const callbackReq = new Request(
        'http://localhost/api/auth/callback/google?code=valid_test_code'
      );
      const callbackRes = await onGoogleCallback({ request: callbackReq, env: {} });
      assert.strictEqual(callbackRes.status, 302);
      assert.strictEqual(
        callbackRes.headers.get('Location'),
        'http://localhost/?auth=success'
      );

      const setCookies = callbackRes.headers.get('Set-Cookie') || '';
      assert.match(setCookies, /peekly_session=/);
      assert.match(setCookies, /peekly_user=/);
      const cookies = parseCookies(setCookies);
      const sessionToken = cookies['peekly_session'];
      assert.ok(sessionToken);

      // Verify created session works with /api/auth/me
      const meReq = new Request('http://localhost/api/auth/me', {
        headers: { Cookie: `peekly_session=${sessionToken}` },
      });
      const meRes = await onMe({ request: meReq, env: {} });
      assert.strictEqual(meRes.status, 200);
      const meData = await meRes.json();
      assert.strictEqual(meData.authenticated, true);
      assert.strictEqual(meData.user.email, 'google_gamer@gmail.com');
      assert.strictEqual(meData.user.nickname, 'Google Gamer');
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});
