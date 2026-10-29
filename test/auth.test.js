import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  hashPassword,
  verifyPassword,
  parseCookies,
  memoryAuthUsers,
  memoryAuthSessions,
  memoryVerificationCodes,
} from '../functions/api/utils/auth.ts';
import { onRequestPost as onRegister } from '../functions/api/auth/register.ts';
import { onRequestPost as onVerifyCode } from '../functions/api/auth/verify-code.ts';
import { onRequestPost as onResendCode } from '../functions/api/auth/resend-code.ts';
import { onRequestPost as onLogin } from '../functions/api/auth/login.ts';
import { onRequestGet as onMe } from '../functions/api/auth/me.ts';
import { onRequest as onLogout } from '../functions/api/auth/logout.ts';

describe('Authentication & Crypto Logic', () => {
  beforeEach(() => {
    memoryAuthUsers.clear();
    memoryAuthSessions.clear();
    memoryVerificationCodes.clear();
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

  test('Registration, OTP verification, Login, Me, and Logout flow works end-to-end', async () => {
    // 1. Register new user (initiates OTP code)
    const regReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'TestGamer',
        email: 'test@peekly.org',
        password: 'Password123!',
      }),
    });

    const regRes = await onRegister({ request: regReq, env: {} });
    assert.strictEqual(regRes.status, 200);
    const regData = await regRes.json();
    assert.strictEqual(regData.success, true);
    assert.ok(regData.devCode && regData.devCode.length === 6, 'Should return 6-digit verification code');

    // 2. Reject wrong verification code
    const badVerifyReq = new Request('http://localhost/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@peekly.org',
        code: '000000',
      }),
    });
    const badVerifyRes = await onVerifyCode({ request: badVerifyReq, env: {} });
    assert.strictEqual(badVerifyRes.status, 400);

    // 3. Test resend verification code
    const resendReq = new Request('http://localhost/api/auth/resend-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@peekly.org' }),
    });
    const resendRes = await onResendCode({ request: resendReq, env: {} });
    assert.strictEqual(resendRes.status, 200);
    const resendData = await resendRes.json();
    assert.ok(resendData.devCode && resendData.devCode.length === 6);

    // 4. Verify with the latest code
    const verifyReq = new Request('http://localhost/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@peekly.org',
        code: resendData.devCode,
      }),
    });
    const verifyRes = await onVerifyCode({ request: verifyReq, env: {} });
    assert.strictEqual(verifyRes.status, 201);
    const verifyData = await verifyRes.json();
    assert.strictEqual(verifyData.success, true);
    assert.strictEqual(verifyData.user.nickname, 'TestGamer');
    assert.strictEqual(verifyData.user.email, 'test@peekly.org');

    const setCookie = verifyRes.headers.get('Set-Cookie') || '';
    assert.match(setCookie, /peekly_session=/);
    const cookies = parseCookies(setCookie);
    const sessionToken = cookies['peekly_session'];
    assert.ok(sessionToken, 'Session token cookie must be present');

    // 5. Duplicate registration should be rejected
    const dupReq = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: 'AnotherName',
        email: 'test@peekly.org',
        password: 'Password123!',
      }),
    });
    const dupRes = await onRegister({ request: dupReq, env: {} });
    assert.strictEqual(dupRes.status, 409);

    // 6. Me endpoint returns authenticated profile
    const meReq = new Request('http://localhost/api/auth/me', {
      headers: { Cookie: `peekly_session=${sessionToken}` },
    });
    const meRes = await onMe({ request: meReq, env: {} });
    assert.strictEqual(meRes.status, 200);
    const meData = await meRes.json();
    assert.strictEqual(meData.authenticated, true);
    assert.strictEqual(meData.user.nickname, 'TestGamer');

    // 7. Login with correct credentials
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

    // 8. Logout clears session
    const logoutReq = new Request('http://localhost/api/auth/logout', {
      method: 'POST',
      headers: { Cookie: `peekly_session=${sessionToken}` },
    });
    const logoutRes = await onLogout({ request: logoutReq, env: {} });
    assert.strictEqual(logoutRes.status, 200);
  });
});
