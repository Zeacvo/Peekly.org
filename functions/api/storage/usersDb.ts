/**
 * Cloudflare Pages Functions & Dev Storage for FACEIT Players
 * Supports Cloudflare D1 (SQL), Cloudflare KV, and resilient fallback store.
 */

export interface PlayerUser {
  guid: string;
  nickname: string;
  email: string;
  avatar: string;
  country: string;
  elo: number;
  level: number;
  created_at: string;
  last_login_at: string;
  plan: 'FREE' | 'PRO';
}

export interface AdminStats {
  totalPlayers: number;
  newToday: number;
  averageElo: number;
  topCountry: string;
  active24h: number;
}

export function calculateFaceitLevel(elo: number): number {
  if (elo >= 2001) return 10;
  if (elo >= 1751) return 9;
  if (elo >= 1531) return 8;
  if (elo >= 1351) return 7;
  if (elo >= 1201) return 6;
  if (elo >= 1051) return 5;
  if (elo >= 901) return 4;
  if (elo >= 751) return 3;
  if (elo >= 501) return 2;
  return 1;
}

// Initial verified players authenticated via FACEIT Connect
export const INITIAL_PLAYERS: PlayerUser[] = [
  {
    guid: '0a9c2d71-e6eb-437d-bc7e-3996720d20d6',
    nickname: 'Zeacvo',
    email: 'zeacvo@icloud.com',
    avatar: 'https://assets.faceit-cdn.net/avatars/default_avatar.png',
    country: 'BY',
    elo: 1699,
    level: 8,
    created_at: '2026-10-27T04:39:00.000Z',
    last_login_at: new Date().toISOString(),
    plan: 'PRO',
  },
];

// Persistent in-memory fallback store across runtime requests
const memoryUsers = new Map<string, PlayerUser>(INITIAL_PLAYERS.map((p) => [p.guid, p]));

export async function upsertPlayer(
  env: Record<string, unknown> | undefined,
  player: PlayerUser
): Promise<void> {
  // Always update in-memory cache
  const existing = memoryUsers.get(player.guid);
  const record: PlayerUser = {
    ...player,
    created_at: existing?.created_at || player.created_at || new Date().toISOString(),
    last_login_at: new Date().toISOString(),
    level: calculateFaceitLevel(player.elo),
  };
  memoryUsers.set(player.guid, record);

  // 1. Cloudflare D1 Support
  const d1 = env?.DB as {
    exec?: (sql: string) => Promise<unknown>;
    prepare?: (sql: string) => {
      bind: (...args: unknown[]) => { run: () => Promise<unknown> };
    };
  } | undefined;

  if (d1?.exec && d1?.prepare) {
    try {
      await d1.exec(`
        CREATE TABLE IF NOT EXISTS users (
          guid TEXT PRIMARY KEY,
          nickname TEXT NOT NULL,
          email TEXT,
          avatar TEXT,
          country TEXT,
          elo INTEGER DEFAULT 1000,
          level INTEGER DEFAULT 1,
          created_at TEXT NOT NULL,
          last_login_at TEXT NOT NULL,
          plan TEXT DEFAULT 'FREE'
        );
      `);

      await d1
        .prepare(
          `INSERT INTO users (guid, nickname, email, avatar, country, elo, level, created_at, last_login_at, plan)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(guid) DO UPDATE SET
             nickname = excluded.nickname,
             email = coalesce(excluded.email, users.email),
             avatar = excluded.avatar,
             country = excluded.country,
             elo = excluded.elo,
             level = excluded.level,
             last_login_at = excluded.last_login_at,
             plan = excluded.plan;`
        )
        .bind(
          record.guid,
          record.nickname,
          record.email,
          record.avatar,
          record.country,
          record.elo,
          record.level,
          record.created_at,
          record.last_login_at,
          record.plan
        )
        .run();
    } catch (e) {
      console.warn('[D1] Error upserting user:', e);
    }
  }

  // 2. Cloudflare KV Support
  const kv = (env?.USERS_KV || env?.KV) as {
    put?: (key: string, value: string) => Promise<unknown>;
  } | undefined;

  if (kv?.put) {
    try {
      await kv.put(`user:${record.guid}`, JSON.stringify(record));
    } catch (e) {
      console.warn('[KV] Error putting user:', e);
    }
  }
}

export async function getAllPlayers(env: Record<string, unknown> | undefined): Promise<PlayerUser[]> {
  // 1. Cloudflare D1
  const d1 = env?.DB as {
    prepare?: (sql: string) => {
      all: () => Promise<{ results?: PlayerUser[] }>;
    };
  } | undefined;

  if (d1?.prepare) {
    try {
      const res = await d1.prepare(`SELECT * FROM users ORDER BY last_login_at DESC`).all();
      if (res?.results && Array.isArray(res.results) && res.results.length > 0) {
        return res.results;
      }
    } catch (e) {
      console.warn('[D1] Error fetching all users:', e);
    }
  }

  // Fallback to memoryUsers
  return Array.from(memoryUsers.values()).sort(
    (a, b) => new Date(b.last_login_at).getTime() - new Date(a.last_login_at).getTime()
  );
}

export function computeStats(players: PlayerUser[]): AdminStats {
  const totalPlayers = players.length;
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

  let newToday = 0;
  let active24h = 0;
  let totalElo = 0;
  const countryCounts: Record<string, number> = {};

  for (const player of players) {
    const createdTime = new Date(player.created_at).getTime();
    const loginTime = new Date(player.last_login_at).getTime();

    if (createdTime >= todayStart) {
      newToday++;
    }
    if (loginTime >= twentyFourHoursAgo) {
      active24h++;
    }

    totalElo += Number(player.elo) || 1000;

    const country = (player.country || 'GLOBAL').toUpperCase();
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  }

  const averageElo = totalPlayers > 0 ? Math.round(totalElo / totalPlayers) : 0;

  let topCountry = '—';
  let maxCount = 0;
  for (const [code, count] of Object.entries(countryCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topCountry = code;
    }
  }

  const topCountryPercent = totalPlayers > 0 ? Math.round((maxCount / totalPlayers) * 100) : 0;

  return {
    totalPlayers,
    newToday,
    averageElo,
    topCountry: totalPlayers > 0 ? `${topCountry} (${topCountryPercent}%)` : '—',
    active24h,
  };
}
