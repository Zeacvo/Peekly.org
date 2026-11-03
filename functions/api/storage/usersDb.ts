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
  role?: string;
  is_faceit_linked?: boolean;
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

// Initial verified players authenticated via FACEIT Connect (cleaned of stale mocks)
export const INITIAL_PLAYERS: PlayerUser[] = [];

// Persistent in-memory fallback store across runtime requests
const memoryUsers = new Map<string, PlayerUser>();

export async function upsertPlayer(
  env: Record<string, unknown> | undefined,
  player: PlayerUser
): Promise<void> {
  const existing = memoryUsers.get(player.guid);
  const record: PlayerUser = {
    ...player,
    created_at: existing?.created_at || player.created_at || new Date().toISOString(),
    last_login_at: new Date().toISOString(),
    level: calculateFaceitLevel(player.elo),
    is_faceit_linked: true,
  };
  memoryUsers.set(player.guid, record);

  // 1. Cloudflare D1 Support
  const d1 = env?.DB as {
    exec?: (sql: string) => Promise<unknown>;
    prepare?: (sql: string) => {
      bind: (...args: unknown[]) => {
        first: <T = unknown>() => Promise<T | null>;
        run: () => Promise<unknown>;
      };
    };
  } | undefined;

  if (d1?.prepare) {
    try {
      if (d1.exec) {
        try {
          await d1.exec('ALTER TABLE users ADD COLUMN last_login_at TEXT');
        } catch {}
        try {
          await d1.exec("ALTER TABLE users ADD COLUMN plan TEXT DEFAULT 'FREE'");
        } catch {}
      }

      const existingUser = await d1
        .prepare('SELECT id, email, role, created_at FROM users WHERE email = ? OR faceit_id = ? OR id = ?')
        .bind(player.email.toLowerCase(), player.guid, player.guid)
        .first<{ id: string; email: string; role: string; created_at: unknown }>();

      const isCeo =
        player.nickname.toLowerCase() === 'zeacvo' ||
        player.email.toLowerCase() === 'zeacvo@icloud.com';
      const role = isCeo ? 'OWNER' : (existingUser?.role || 'USER');

      if (existingUser) {
        await d1
          .prepare(
            `UPDATE users SET
              faceit_id = ?,
              faceit_nickname = ?,
              avatar_url = COALESCE(?, avatar_url),
              country = COALESCE(?, country),
              elo = ?,
              level = ?,
              role = ?,
              last_login_at = ?
            WHERE id = ?`
          )
          .bind(
            player.guid,
            player.nickname,
            player.avatar,
            player.country,
            player.elo,
            player.level,
            role,
            record.last_login_at,
            existingUser.id
          )
          .run();
      } else {
        const newId = player.guid || `usr_${Date.now()}`;
        await d1
          .prepare(
            `INSERT INTO users (
              id, email, password_hash, salt, nickname, role, created_at,
              avatar_url, faceit_id, faceit_nickname, country, level, elo, last_login_at, plan
            ) VALUES (?, ?, '', '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            newId,
            player.email.toLowerCase(),
            player.nickname,
            role,
            Date.now(),
            player.avatar,
            player.guid,
            player.nickname,
            player.country,
            player.level,
            player.elo,
            record.last_login_at,
            player.plan || 'FREE'
          )
          .run();
      }
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
  const d1 = env?.DB as {
    exec?: (sql: string) => Promise<unknown>;
    prepare?: (sql: string) => {
      all: () => Promise<{ results?: unknown[] }>;
    };
  } | undefined;

  const d1Users: PlayerUser[] = [];

  if (d1?.prepare) {
    try {
      const res = await d1.prepare('SELECT * FROM users').all();
      if (res?.results && Array.isArray(res.results)) {
        for (const raw of res.results) {
          const row = raw as Record<string, unknown>;
          const email = String(row.email || '').trim().toLowerCase();
          const nickname = String(row.faceit_nickname || row.nickname || 'Unknown');
          const isCeo =
            nickname.toLowerCase() === 'zeacvo' ||
            email === 'zeacvo@icloud.com' ||
            row.role === 'OWNER' ||
            row.role === 'CEO';

          const isFaceitLinked = Boolean(
            row.faceit_id ||
            row.faceit_nickname ||
            (row.elo && Number(row.elo) > 0)
          );

          const elo = row.elo ? Number(row.elo) : 0;
          const level = row.level
            ? Number(row.level)
            : elo > 0
            ? calculateFaceitLevel(elo)
            : 0;

          let createdAtIso: string;
          try {
            if (typeof row.created_at === 'number') {
              createdAtIso = new Date(row.created_at).toISOString();
            } else if (!isNaN(Number(row.created_at))) {
              createdAtIso = new Date(Number(row.created_at)).toISOString();
            } else if (typeof row.created_at === 'string' && row.created_at.length > 0) {
              createdAtIso = new Date(row.created_at).toISOString();
            } else {
              createdAtIso = new Date().toISOString();
            }
          } catch {
            createdAtIso = new Date().toISOString();
          }

          let lastLoginIso: string;
          try {
            if (row.last_login_at) {
              lastLoginIso = new Date(String(row.last_login_at)).toISOString();
            } else {
              lastLoginIso = createdAtIso;
            }
          } catch {
            lastLoginIso = createdAtIso;
          }

          d1Users.push({
            guid: String(row.faceit_id || row.guid || row.id || `usr-${email}`),
            nickname,
            email: String(row.email || ''),
            avatar: String(
              row.avatar_url ||
              row.avatar ||
              'https://assets.faceit-cdn.net/avatars/default_avatar.png'
            ),
            country: String(row.country || (isFaceitLinked ? 'BY' : '—')),
            elo,
            level,
            created_at: createdAtIso,
            last_login_at: lastLoginIso,
            plan: (row.plan === 'PRO' ? 'PRO' : 'FREE'),
            role: isCeo ? 'OWNER' : String(row.role || 'USER'),
            is_faceit_linked: isFaceitLinked,
          });
        }
      }
    } catch (e) {
      console.warn('[D1] Error fetching all users:', e);
    }
  }

  // Deduplication logic: merge records across D1 and memoryUsers by normalized email / nickname
  const allSources = [...d1Users, ...Array.from(memoryUsers.values())];
  const uniqueMap = new Map<string, PlayerUser>();

  for (const p of allSources) {
    const emailKey = p.email ? p.email.toLowerCase() : null;
    const nickKey = p.nickname ? p.nickname.toLowerCase() : null;
    const key = emailKey || nickKey || p.guid;

    const existing = uniqueMap.get(key);
    if (!existing) {
      uniqueMap.set(key, p);
    } else {
      const existingCreated = new Date(existing.created_at).getTime();
      const currentCreated = new Date(p.created_at).getTime();

      const merged: PlayerUser = {
        ...existing,
        ...p,
        guid: p.guid || existing.guid,
        nickname: p.nickname || existing.nickname,
        avatar: p.is_faceit_linked
          ? p.avatar
          : existing.is_faceit_linked
          ? existing.avatar
          : p.avatar,
        country: p.country && p.country !== '—' ? p.country : existing.country,
        elo: Math.max(p.elo || 0, existing.elo || 0),
        level: Math.max(p.level || 0, existing.level || 0),
        is_faceit_linked: Boolean(p.is_faceit_linked || existing.is_faceit_linked),
        role:
          p.role === 'OWNER' || existing.role === 'OWNER'
            ? 'OWNER'
            : p.role || existing.role,
        created_at:
          existingCreated && currentCreated
            ? new Date(Math.min(existingCreated, currentCreated)).toISOString()
            : p.created_at,
        last_login_at: new Date(
          Math.max(
            new Date(p.last_login_at).getTime() || 0,
            new Date(existing.last_login_at).getTime() || 0
          )
        ).toISOString(),
      };
      uniqueMap.set(key, merged);
    }
  }

  return Array.from(uniqueMap.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
  let eloCount = 0;
  const countryCounts: Record<string, number> = {};

  for (const player of players) {
    const createdTime = new Date(player.created_at).getTime();
    const loginTime = new Date(player.last_login_at || player.created_at).getTime();

    if (createdTime >= todayStart) {
      newToday++;
    }
    if (loginTime >= twentyFourHoursAgo) {
      active24h++;
    }

    if (player.elo && player.elo > 0) {
      totalElo += Number(player.elo);
      eloCount++;
    }

    const country = (player.country || 'BY').toUpperCase();
    if (country && country !== '—' && country !== 'GLOBAL') {
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    }
  }

  const averageElo = eloCount > 0 ? Math.round(totalElo / eloCount) : 0;

  let topCountry = '—';
  let maxCount = 0;
  for (const [code, count] of Object.entries(countryCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topCountry = code;
    }
  }

  const topCountryPercent =
    totalPlayers > 0 && maxCount > 0
      ? Math.round((maxCount / totalPlayers) * 100)
      : 0;

  return {
    totalPlayers,
    newToday,
    averageElo,
    topCountry: maxCount > 0 ? `${topCountry} (${topCountryPercent}%)` : '—',
    active24h: active24h || (totalPlayers > 0 ? 1 : 0),
  };
}
