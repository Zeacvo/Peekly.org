import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  hashPassword,
  verifyPassword,
  parseCookies,
  memoryAuthUsers,
  memoryAuthSessions,
  memoryEmailVerifications,
} from '../functions/api/utils/auth.ts';
import { onRequestPost as onRegister } from '../functions/api/auth/register.ts';
import { onRequestPost as onVerifyCode } from '../functions/api/auth/verify-code.ts';
import { onRequestPost as onLogin } from '../functions/api/auth/login.ts';
import { onRequestGet as onMe } from '../functions/api/auth/me.ts';
import { onRequest as onLogout } from '../functions/api/auth/logout.ts';
import { onRequest as onGoogleCallback } from '../functions/api/auth/callback/google.ts';

describe('Authentication & Crypto Logic', () => {
  beforeEach(() => {
    memoryAuthUsers.clear();
    memoryAuthSessions.clear();
    memoryEmailVerifications.clear();
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

  test('Cloudflare Turnstile token validation, OTP code dispatch and verification flow work', async () => {
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

    // 2. Step 1: Successful registration initiation returns requireVerification: true
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
    assert.strictEqual(validRes.status, 200);
    const validData = await validRes.json();
    assert.strictEqual(validData.success, true);
    assert.strictEqual(validData.requireVerification, true);
    assert.strictEqual(validData.email, 'test@peekly.org');

    // Check verification code in memory
    const pending = memoryEmailVerifications.get('test@peekly.org');
    assert.ok(pending, 'Pending verification must exist in memory store');
    assert.strictEqual(pending.code.length, 6, 'Verification code must be 6 digits');
    assert.strictEqual(pending.username, 'TestGamer');

    // 3. Step 2a: Invalid OTP code returns 400
    const invalidCodeReq = new Request('http://localhost/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@peekly.org',
        code: '000000',
      }),
    });
    const invalidCodeRes = await onVerifyCode({ request: invalidCodeReq, env: {} });
    assert.strictEqual(invalidCodeRes.status, 400);
    const invalidCodeData = await invalidCodeRes.json();
    assert.strictEqual(invalidCodeData.error, 'Invalid or expired verification code.');

    // 4. Step 2b: Valid OTP code provisions user, creates session, and clears pending verification
    const verifyReq = new Request('http://localhost/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@peekly.org',
        code: pending.code,
      }),
    });
    const verifyRes = await onVerifyCode({ request: verifyReq, env: {} });
    assert.strictEqual(verifyRes.status, 200);
    const verifyData = await verifyRes.json();
    assert.strictEqual(verifyData.success, true);
    assert.strictEqual(verifyData.user.nickname, 'TestGamer');
    assert.strictEqual(verifyData.user.email, 'test@peekly.org');
    assert.strictEqual(verifyData.redirect, '/');

    const setCookie = verifyRes.headers.get('Set-Cookie') || '';
    assert.match(setCookie, /peekly_session=/);
    const cookies = parseCookies(setCookie);
    const sessionToken = cookies['peekly_session'];
    assert.ok(sessionToken, 'Session token cookie must be present');
    assert.strictEqual(memoryEmailVerifications.has('test@peekly.org'), false, 'Pending verification should be cleaned up');

    // 5. Duplicate email registration rejected with 409
    const dupEmailReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'AnotherGamer',
        email: 'test@peekly.org',
        password: 'Password123!',
        turnstileToken: 'mock-turnstile-token',
      }),
    });
    const dupEmailRes = await onRegister({ request: dupEmailReq, env: {} });
    assert.strictEqual(dupEmailRes.status, 409);
    const dupEmailData = await dupEmailRes.json();
    assert.strictEqual(dupEmailData.error, 'Email already registered. Please sign in instead.');

    // 6. Duplicate username registration rejected with 409
    const dupNickReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'TestGamer',
        email: 'different@peekly.org',
        password: 'Password123!',
        turnstileToken: 'mock-turnstile-token',
      }),
    });
    const dupNickRes = await onRegister({ request: dupNickReq, env: {} });
    assert.strictEqual(dupNickRes.status, 409);
    const dupNickData = await dupNickRes.json();
    assert.strictEqual(dupNickData.error, 'Username is already taken. Please choose another.');

    // 7. Me endpoint returns authenticated profile
    const meReq = new Request('http://localhost/api/auth/me', {
      headers: { Cookie: `peekly_session=${sessionToken}` },
    });
    const meRes = await onMe({ request: meReq, env: {} });
    assert.strictEqual(meRes.status, 200);
    const meData = await meRes.json();
    assert.strictEqual(meData.authenticated, true);
    assert.strictEqual(meData.user.nickname, 'TestGamer');

    // 8. Login with verified credentials
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

    // 9. Logout clears session
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

  test('Google OAuth callback logs and redirects with granular error when token exchange fails', async () => {
    const origFetch = globalThis.fetch;
    try {
      globalThis.fetch = async (url) => {
        const urlStr = url.toString();
        if (urlStr.includes('oauth2.googleapis.com/token')) {
          return new Response(
            JSON.stringify({
              error: 'redirect_uri_mismatch',
              error_description: 'Bad Request: redirect_uri mismatch',
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        return new Response('Not found', { status: 404 });
      };

      const callbackReq = new Request(
        'http://localhost/api/auth/callback/google?code=mismatched_code'
      );
      const callbackRes = await onGoogleCallback({ request: callbackReq, env: {} });
      assert.strictEqual(callbackRes.status, 302);
      assert.strictEqual(
        callbackRes.headers.get('Location'),
        'http://localhost/?auth_error=Bad%20Request%3A%20redirect_uri%20mismatch'
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});
