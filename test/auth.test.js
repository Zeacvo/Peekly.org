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

  test('Registration, Login, Me, and Logout flow works end-to-end', async () => {
    // 1. Register new user
    const regReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'TestGamer',
        email: 'test@peekly.org',
        password: 'password123',
      }),
    });

    const regRes = await onRegister({ request: regReq, env: {} });
    assert.strictEqual(regRes.status, 201);
    const regData = await regRes.json();
    assert.strictEqual(regData.success, true);
    assert.strictEqual(regData.user.nickname, 'TestGamer');
    assert.strictEqual(regData.user.email, 'test@peekly.org');

    const setCookie = regRes.headers.get('Set-Cookie') || '';
    assert.match(setCookie, /peekly_session=/);

    // Parse the session token from cookie
    const cookies = parseCookies(setCookie);
    const sessionToken = cookies['peekly_session'];
    assert.ok(sessionToken, 'Session token cookie must be present');

    // 2. Duplicate registration should be rejected
    const dupReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'AnotherName',
        email: 'test@peekly.org',
        password: 'password456',
      }),
    });
    const dupRes = await onRegister({ request: dupReq, env: {} });
    assert.strictEqual(dupRes.status, 409);

    // 3. Me endpoint returns authenticated profile
    const meReq = new Request('http://localhost/api/auth/me', {
      headers: { Cookie: `peekly_session=${sessionToken}` },
    });
    const meRes = await onMe({ request: meReq, env: {} });
    assert.strictEqual(meRes.status, 200);
    const meData = await meRes.json();
    assert.strictEqual(meData.authenticated, true);
    assert.strictEqual(meData.user.nickname, 'TestGamer');

    // 4. Login with correct credentials
    const loginReq = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@peekly.org',
        password: 'password123',
      }),
    });
    const loginRes = await onLogin({ request: loginReq, env: {} });
    assert.strictEqual(loginRes.status, 200);

    // 5. Login with invalid password fails
    const badLoginReq = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@peekly.org',
        password: 'wrongpassword',
      }),
    });
    const badLoginRes = await onLogin({ request: badLoginReq, env: {} });
    assert.strictEqual(badLoginRes.status, 401);

    // 6. Logout clears session
    const logoutReq = new Request('http://localhost/api/auth/logout', {
      method: 'POST',
      headers: { Cookie: `peekly_session=${sessionToken}` },
    });
    const logoutRes = await onLogout({ request: logoutReq, env: {} });
    assert.strictEqual(logoutRes.status, 200);

    // After logout, me endpoint returns unauthenticated
    const postLogoutMeReq = new Request('http://localhost/api/auth/me', {
      headers: { Cookie: `peekly_session=${sessionToken}` },
    });
    const postLogoutMeRes = await onMe({ request: postLogoutMeReq, env: {} });
    const postLogoutMeData = await postLogoutMeRes.json();
    assert.strictEqual(postLogoutMeData.authenticated, false);
  });
});
