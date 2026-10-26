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

// Initial seed players including CEO (Zeacvo) and notable FACEIT CS2 players
export const INITIAL_PLAYERS: PlayerUser[] = [
  {
    guid: 'ceo-zeacvo-001',
    nickname: 'Zeacvo',
    email: 'zeacvo@icloud.com',
    avatar: 'https://assets.faceit-cdn.net/avatars/default_avatar.png',
    country: 'RU',
    elo: 2450,
    level: 10,
    created_at: '2026-10-01T10:00:00.000Z',
    last_login_at: new Date().toISOString(),
    plan: 'PRO',
  },
  {
    guid: 'm0n-1234-002',
    nickname: 'm0NESY',
    email: 'm0nesy@g2.gg',
    avatar: 'https://distribution.faceit-cdn.net/images/f3261a29-0639-4402-9907-391adfb57896.jpeg',
    country: 'RU',
    elo: 3820,
    level: 10,
    created_at: '2026-10-05T14:20:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    plan: 'PRO',
  },
  {
    guid: 's1m-1234-003',
    nickname: 's1mple',
    email: 's1mple@navi.gg',
    avatar: 'https://distribution.faceit-cdn.net/images/99fa77ea-aef5-4be4-b4a1-b845e2a39a06.jpeg',
    country: 'UA',
    elo: 3650,
    level: 10,
    created_at: '2026-10-06T11:10:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    plan: 'PRO',
  },
  {
    guid: 'dnk-1234-004',
    nickname: 'donk',
    email: 'donk@spirit.team',
    avatar: 'https://distribution.faceit-cdn.net/images/e854b41a-8eef-42d4-bbcb-1f486ef0a6cf.jpeg',
    country: 'RU',
    elo: 3990,
    level: 10,
    created_at: '2026-10-07T09:40:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    plan: 'PRO',
  },
  {
    guid: 'zyw-1234-005',
    nickname: 'ZywOo',
    email: 'zywoo@vitality.gg',
    avatar: 'https://distribution.faceit-cdn.net/images/c2d20e7f-5a1e-450f-9f7c-7d9cf1b8df79.jpeg',
    country: 'FR',
    elo: 3550,
    level: 10,
    created_at: '2026-10-08T16:00:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    plan: 'PRO',
  },
  {
    guid: 'b1t-1234-006',
    nickname: 'b1t',
    email: 'b1t@navi.gg',
    avatar: 'https://distribution.faceit-cdn.net/images/154fa944-ffae-4d7a-8b1b-944ff12faea6.jpeg',
    country: 'UA',
    elo: 3120,
    level: 10,
    created_at: '2026-10-10T12:00:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    plan: 'FREE',
  },
  {
    guid: 'rpz-1234-007',
    nickname: 'ropz',
    email: 'ropz@faze.gg',
    avatar: 'https://distribution.faceit-cdn.net/images/4214f09a-65b1-4f1b-a5d6-8488e3ab039b.jpeg',
    country: 'EE',
    elo: 3380,
    level: 10,
    created_at: '2026-10-12T13:45:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
    plan: 'FREE',
  },
  {
    guid: 'nik-1234-008',
    nickname: 'NiKo',
    email: 'niko@falcons.gg',
    avatar: 'https://distribution.faceit-cdn.net/images/a6c5e7b2-132d-4d7b-9f4a-8531ef571d18.jpeg',
    country: 'BA',
    elo: 3490,
    level: 10,
    created_at: '2026-10-14T17:15:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    plan: 'FREE',
  },
  {
    guid: 'dev-1234-009',
    nickname: 'device',
    email: 'device@astralis.gg',
    avatar: 'https://distribution.faceit-cdn.net/images/877fe91b-6e9f-4f81-a675-5205aa6f2ca9.jpeg',
    country: 'DK',
    elo: 2980,
    level: 10,
    created_at: '2026-10-15T08:30:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    plan: 'FREE',
  },
  {
    guid: 'brk-1234-010',
    nickname: 'broky',
    email: 'broky@faze.gg',
    avatar: 'https://distribution.faceit-cdn.net/images/8477ff9a-7a8a-4bb1-bf99-23ef74aa1109.jpeg',
    country: 'LV',
    elo: 3210,
    level: 10,
    created_at: '2026-10-18T19:20:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 800).toISOString(),
    plan: 'FREE',
  },
  {
    guid: 'shr-1234-011',
    nickname: 'sh1ro',
    email: 'sh1ro@spirit.team',
    avatar: 'https://distribution.faceit-cdn.net/images/b655da92-1b6a-4d43-85b2-3850ea1d821a.jpeg',
    country: 'RU',
    elo: 3450,
    level: 10,
    created_at: '2026-10-20T10:15:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 950).toISOString(),
    plan: 'FREE',
  },
  {
    guid: 'kyo-1234-012',
    nickname: 'kyousuke',
    email: 'kyousuke@cs2.jp',
    avatar: 'https://assets.faceit-cdn.net/avatars/default_avatar.png',
    country: 'JP',
    elo: 1850,
    level: 8,
    created_at: '2026-10-22T04:10:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 1100).toISOString(),
    plan: 'FREE',
  },
  {
    guid: 'alm-1234-013',
    nickname: 'aleman_cs',
    email: 'hans@cs2.de',
    avatar: 'https://assets.faceit-cdn.net/avatars/default_avatar.png',
    country: 'DE',
    elo: 1720,
    level: 8,
    created_at: '2026-10-24T18:40:00.000Z',
    last_login_at: new Date(Date.now() - 1000 * 60 * 1200).toISOString(),
    plan: 'FREE',
  },
  {
    guid: 'plg-1234-014',
    nickname: 'polski_gracz',
    email: 'pawel@cs2.pl',
    avatar: 'https://assets.faceit-cdn.net/avatars/default_avatar.png',
    country: 'PL',
    elo: 1580,
    level: 7,
    created_at: new Date().toISOString(),
    last_login_at: new Date().toISOString(),
    plan: 'FREE',
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

  const averageElo = totalPlayers > 0 ? Math.round(totalElo / totalPlayers) : 1000;

  let topCountry = 'RU';
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
    topCountry: `${topCountry} (${topCountryPercent}%)`,
    active24h,
  };
}
