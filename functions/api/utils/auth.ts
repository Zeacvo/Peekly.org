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
}

export interface DbSession {
  token: string;
  user_id: string;
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

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
    `);
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
      salt: saltBytes,
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
