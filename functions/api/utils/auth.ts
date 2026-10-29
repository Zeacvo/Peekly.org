/**
 * Authentication and Cryptographic Utilities for Cloudflare D1
 * PBKDF2 with SHA-256, 100,000 iterations via Web Crypto API (crypto.subtle)
 */

export interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  salt: string;
  nickname: string;
  role: string;
  created_at: number;
  newsletter_subscribed?: number;
  avatar_url?: string | null;
  faceit_id?: string | null;
  faceit_nickname?: string | null;
  country?: string | null;
  level?: number | null;
  elo?: number | null;
}

export interface DbSession {
  token: string;
  user_id: string;
  expires_at: number;
  created_at: number;
}

export interface DbVerificationCode {
  email: string;
  code: string;
  nickname: string;
  password_hash: string;
  salt: string;
  expires_at: number;
  created_at: number;
}

export interface D1Database {
  exec: (sql: string) => Promise<unknown>;
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      first: <T = unknown>() => Promise<T | null>;
      all: <T = unknown>() => Promise<{ results?: T[] }>;
      run: () => Promise<{ success: boolean }>;
    };
  };
}

// In-memory fallback stores for development when D1 is not attached
export const memoryAuthUsers = new Map<string, DbUser>();
export const memoryAuthSessions = new Map<string, DbSession>();
export const memoryVerificationCodes = new Map<string, DbVerificationCode>();

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidNickname = (nickname: string): boolean =>
  /^[a-zA-Z0-9_-]{3,20}$/.test(nickname.trim());

export interface PasswordRequirements {
  hasLength: boolean;
  hasNumber: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasSpecial: boolean;
  score: number; // 0 to 100
  isValid: boolean;
}

export function checkPasswordRequirements(password: string): PasswordRequirements {
  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  let passedCount = 0;
  if (hasLength) passedCount++;
  if (hasNumber) passedCount++;
  if (hasUpper) passedCount++;
  if (hasLower) passedCount++;
  if (hasSpecial) passedCount++;

  const score = Math.round((passedCount / 5) * 100);
  const isValid = passedCount === 5;

  return {
    hasLength,
    hasNumber,
    hasUpper,
    hasLower,
    hasSpecial,
    score,
    isValid,
  };
}

let schemaInitialized = false;

export async function ensureAuthSchema(db?: D1Database): Promise<void> {
  if (!db || schemaInitialized) return;
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        nickname TEXT NOT NULL,
        role TEXT DEFAULT 'USER',
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS verification_codes (
        email TEXT PRIMARY KEY,
        code TEXT NOT NULL,
        nickname TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
      CREATE INDEX IF NOT EXISTS idx_verification_email ON verification_codes(email);
    `);
    try {
      await db.exec('ALTER TABLE users ADD COLUMN newsletter_subscribed INTEGER DEFAULT 1;');
    } catch {}
    try {
      await db.exec('ALTER TABLE users ADD COLUMN avatar_url TEXT;');
    } catch {}
    try {
      await db.exec('ALTER TABLE users ADD COLUMN faceit_id TEXT;');
    } catch {}
    try {
      await db.exec('ALTER TABLE users ADD COLUMN faceit_nickname TEXT;');
    } catch {}
    try {
      await db.exec('ALTER TABLE users ADD COLUMN country TEXT;');
    } catch {}
    try {
      await db.exec('ALTER TABLE users ADD COLUMN level INTEGER;');
    } catch {}
    try {
      await db.exec('ALTER TABLE users ADD COLUMN elo INTEGER;');
    } catch {}
    schemaInitialized = true;
  } catch (err) {
    console.warn('[D1] Schema init warning:', err);
  }
}

function toHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hexString: string): Uint8Array {
  const match = hexString.match(/.{1,2}/g) || [];
  return new Uint8Array(match.map((byte) => parseInt(byte, 16)));
}

export async function hashPassword(
  password: string,
  saltHex?: string
): Promise<{ hash: string; salt: string }> {
  const enc = new TextEncoder();
  const saltBytes = saltHex
    ? fromHex(saltHex)
    : crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes as unknown as ArrayBuffer,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  return {
    hash: toHex(derivedBits),
    salt: toHex(saltBytes),
  };
}

export async function verifyPassword(
  password: string,
  storedHash: string,
  saltHex: string
): Promise<boolean> {
  const { hash } = await hashPassword(password, saltHex);
  return hash === storedHash;
}

export function generateSessionToken(): string {
  return crypto.randomUUID();
}

export function parseCookies(header: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!header) return cookies;
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k) cookies[k] = decodeURIComponent(v.join('='));
  }
  return cookies;
}

export function createSessionCookieHeader(token: string, maxAgeSeconds = 2592000): string {
  return `peekly_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

export function clearSessionCookieHeaders(): string[] {
  return [
    'peekly_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    'peekly_auth=; Path=/; Max-Age=0',
    'peekly_user=; Path=/; Max-Age=0',
  ];
}
