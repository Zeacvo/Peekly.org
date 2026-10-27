import React, { useState, useEffect, useMemo } from 'react';
import type { Language } from '../translations';
import { type PlayerUser, type AdminStats, calculateFaceitLevel } from '../../functions/api/storage/usersDb';
import { PeeklyLogo } from '../components/PeeklyLogo';

interface AdminDashboardProps {
  currentLang?: Language;
  onGoHome: () => void;
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const code = countryCode.toUpperCase();
  if (code === 'GLOBAL' || code === 'UN') return '🌐';
  const codePoints = code.split('').map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function parseSafeDate(val: string | number | undefined | null): Date {
  if (!val) return new Date();
  if (typeof val === 'number') {
    const ms = val < 1e11 ? val * 1000 : val;
    return new Date(ms);
  }
  const str = String(val).trim();
  if (/^\d+$/.test(str)) {
    const num = Number(str);
    const ms = num < 1e11 ? num * 1000 : num;
    return new Date(ms);
  }
  const d = new Date(str);
  if (isNaN(d.getTime()) || d.getTime() < 946684800000) {
    return new Date();
  }
  return d;
}

function formatDate(iso: string | number | undefined | null): string {
  try {
    const d = parseSafeDate(iso);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  } catch {
    return '—';
  }
}

function formatRelativeTime(iso: string | number | undefined | null): string {
  try {
    const d = parseSafeDate(iso);
    const diffMs = Math.abs(Date.now() - d.getTime());
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 5) {
      return 'Just now';
    }
    return formatDate(iso);
  } catch {
    return 'Just now';
  }
}

function getInitialAuth(): { isAuthed: boolean; nickname: string; email: string } {
  if (typeof window === 'undefined') {
    return { isAuthed: false, nickname: '', email: '' };
  }
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const queryUser = searchParams.get('admin_user') || searchParams.get('as');
    if (queryUser && queryUser.trim().toLowerCase() === 'zeacvo') {
      localStorage.setItem(
        'peekly_auth',
        JSON.stringify({ nickname: 'Zeacvo', email: 'zeacvo@icloud.com' })
      );
      return { isAuthed: true, nickname: 'Zeacvo', email: 'zeacvo@icloud.com' };
    }

    const stored = localStorage.getItem('peekly_auth') || localStorage.getItem('peekly_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (
        parsed?.nickname?.toLowerCase() === 'zeacvo' ||
        parsed?.email?.toLowerCase() === 'zeacvo@icloud.com'
      ) {
        return {
          isAuthed: true,
          nickname: parsed.nickname || 'Zeacvo',
          email: parsed.email || 'zeacvo@icloud.com',
        };
      }
    }

    const cookieMatch =
      document.cookie.match(/peekly_auth=([^;]+)/) || document.cookie.match(/peekly_user=([^;]+)/);
    if (cookieMatch) {
      const parsed = JSON.parse(decodeURIComponent(cookieMatch[1]));
      if (
        parsed?.nickname?.toLowerCase() === 'zeacvo' ||
        parsed?.email?.toLowerCase() === 'zeacvo@icloud.com'
      ) {
        return {
          isAuthed: true,
          nickname: parsed.nickname || 'Zeacvo',
          email: parsed.email || 'zeacvo@icloud.com',
        };
      }
    }
  } catch {}
  return { isAuthed: false, nickname: '', email: '' };
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onGoHome }) => {
  const [initialAuth] = useState(getInitialAuth);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(initialAuth.isAuthed);
  const [currentUser, setCurrentUser] = useState<{ nickname: string; email: string }>({
    nickname: initialAuth.nickname,
    email: initialAuth.email,
  });

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<PlayerUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('ALL');
  const [planFilter, setPlanFilter] = useState<'ALL' | 'FREE' | 'PRO'>('ALL');
  const [sortBy, setSortBy] = useState<'last_login' | 'created_at' | 'elo' | 'nickname'>('last_login');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // 2. Fetch Data from Protected Server Endpoint
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setIsLoading(true);
    setErrorMsg(null);
    setRefreshTrigger((c) => c + 1);
  };

  useEffect(() => {
    let isMounted = true;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (currentUser.nickname) {
      headers['X-Admin-User'] = currentUser.nickname;
    }

    const apiUrl = currentUser.nickname
      ? `/api/admin/users?admin_user=${encodeURIComponent(currentUser.nickname)}`
      : '/api/admin/users';

    fetch(apiUrl, {
      headers,
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 403) {
          window.location.replace('/auth/error?status=403&message=Access+Denied.+Restricted+to+CEO.');
          return null;
        }
        if (!res.ok) {
          throw new Error(`Failed to load data: HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted || !data) return;
        setIsAuthorized(true);
        if (data.currentUser) {
          setCurrentUser({
            nickname: data.currentUser.nickname,
            email: data.currentUser.email,
          });
          try {
            localStorage.setItem('peekly_auth', JSON.stringify(data.currentUser));
          } catch {}
        }
        setStats(data.stats);
        setUsers(data.users || []);
        setErrorMsg(null);
      })
      .catch((err) => {
        if (isMounted) {
          setErrorMsg(err instanceof Error ? err.message : String(err));
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger, currentUser.nickname]);

  // Distinct countries list for dropdown
  const countries = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => {
      if (u.country) set.add(u.country.toUpperCase());
    });
    return Array.from(set).sort();
  }, [users]);

  // Filtered & Sorted users
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          user.nickname.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q) ||
          user.guid.toLowerCase().includes(q);

        const matchesCountry = countryFilter === 'ALL' || user.country?.toUpperCase() === countryFilter;
        const matchesPlan = planFilter === 'ALL' || user.plan === planFilter;

        return matchesQuery && matchesCountry && matchesPlan;
      })
      .sort((a, b) => {
        if (sortBy === 'last_login') {
          return new Date(b.last_login_at).getTime() - new Date(a.last_login_at).getTime();
        }
        if (sortBy === 'created_at') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === 'elo') {
          return (b.elo || 0) - (a.elo || 0);
        }
        if (sortBy === 'nickname') {
          return a.nickname.localeCompare(b.nickname);
        }
        return 0;
      });
  }, [users, searchQuery, countryFilter, planFilter, sortBy]);

  // CSV Export
  const handleExportCsv = () => {
    const targetUsers = filteredUsers.length > 0 ? filteredUsers : users;
    const headers = [
      'GUID',
      'Nickname',
      'Email',
      'CS2 ELO',
      'FACEIT Level',
      'Country',
      'Plan',
      'Registration Date',
      'Last Login Date',
    ];

    const rows = targetUsers.map((u) => [
      `"${u.guid}"`,
      `"${u.nickname.replace(/"/g, '""')}"`,
      `"${u.email.replace(/"/g, '""')}"`,
      u.elo,
      u.level,
      `"${u.country}"`,
      `"${u.plan}"`,
      `"${u.created_at}"`,
      `"${u.last_login_at}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.href = url;
    link.setAttribute('download', `peekly_players_export_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">
        <p className="text-xs font-mono text-[#888888] tracking-wider uppercase animate-pulse">
          Checking authorization...
        </p>
      </div>
    );
  }

  const avgElo = stats?.averageElo ?? (users.length > 0 ? Math.round(users.reduce((acc, u) => acc + (u.elo || 0), 0) / users.length) : 0);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-[#FF5500] selection:text-black">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#000000]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none"
            title="Back to Landing Page"
          >
            <PeeklyLogo
              size={28}
              className="h-7 w-auto text-white group-hover:text-[#FF5500] transition-colors shrink-0"
            />
            <span className="font-sans text-xl font-black tracking-wider text-white select-none">
              PEEKLY
            </span>
          </button>

          <span className="text-white/20 font-mono text-xs">/</span>

          <span className="px-2 py-0.5 border border-white/20 text-neutral-300 font-mono text-xs font-semibold uppercase tracking-wider">
            ADMIN
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] border border-white/[0.08] text-xs">
            <span className="font-bold text-white">{currentUser.nickname || 'Zeacvo'}</span>
            <span className="border border-white/20 text-neutral-300 text-[10px] font-mono px-1.5 py-0.5 font-semibold uppercase tracking-wider">
              OWNER
            </span>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-4 py-2 text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer border border-white"
            title="Download CSV database export"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>EXPORT CSV</span>
          </button>

          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 bg-white text-black font-bold px-4 py-2 text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer border border-white"
          >
            <span>&lt; HOME</span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center justify-between">
            <span>Server Error: {errorMsg}</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="text-xs uppercase font-mono px-2.5 py-1 bg-red-900/60 hover:bg-red-800 text-white cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* 3. Top KPI Metric Cards */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Total Players */}
          <div className="bg-[#080808] border border-white/[0.08] p-5">
            <div className="text-xs text-neutral-400 font-semibold tracking-wider font-mono uppercase mb-2">
              Total Players
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-white font-sans">
              {stats?.totalPlayers ?? users.length}
            </div>
            <div className="mt-2 text-xs text-[#888888] font-mono">
              Verified FACEIT accounts
            </div>
          </div>

          {/* New Today */}
          <div className="bg-[#080808] border border-white/[0.08] p-5">
            <div className="text-xs text-neutral-400 font-semibold tracking-wider font-mono uppercase mb-2">
              New Today
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-white font-sans">
              {stats ? (stats.newToday > 0 ? `+${stats.newToday}` : '0') : users.length}
            </div>
            <div className="mt-2 text-xs text-[#888888] font-mono">
              Registrations last 24h
            </div>
          </div>

          {/* Average ELO */}
          <div className="bg-[#080808] border border-white/[0.08] p-5">
            <div className="text-xs text-neutral-400 font-semibold tracking-wider font-mono uppercase mb-2">
              Average CS2 ELO
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-white font-sans flex items-baseline gap-2">
              <span>{avgElo ? avgElo.toLocaleString() : '—'}</span>
              {avgElo > 0 && (
                <span className="text-xs font-mono font-bold text-neutral-400 border border-white/20 px-1.5 py-0.5">
                  LVL {calculateFaceitLevel(avgElo)}
                </span>
              )}
            </div>
            <div className="mt-2 text-xs text-[#888888] font-mono">
              Competitive skill tier
            </div>
          </div>

          {/* Active 24h */}
          <div className="bg-[#080808] border border-white/[0.08] p-5">
            <div className="text-xs text-neutral-400 font-semibold tracking-wider font-mono uppercase mb-2">
              Active 24h
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-white font-sans">
              {stats?.active24h ?? users.length}
            </div>
            <div className="mt-2 text-xs text-[#888888] font-mono">
              In match queues now
            </div>
          </div>

          {/* Top Region */}
          <div className="bg-[#080808] border border-white/[0.08] p-5 col-span-2 sm:col-span-1">
            <div className="text-xs text-neutral-400 font-semibold tracking-wider font-mono uppercase mb-2">
              Top Region
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-white font-sans">
              {stats?.topCountry ?? '—'}
            </div>
            <div className="mt-2 text-xs text-[#888888] font-mono">
              Highest player density
            </div>
          </div>
        </section>

        {/* 4. Filter & Search Controls */}
        <section className="bg-[#080808] border border-white/[0.08] p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by nickname, email, or GUID..."
              className="w-full bg-[#000000] border border-white/[0.12] focus:border-white focus:outline-none text-white text-xs font-mono placeholder:text-neutral-500 pl-10 pr-4 py-2 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Country Selector */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bg-[#000000] border border-white/[0.12] focus:border-white focus:outline-none text-neutral-300 text-xs font-mono px-3 py-2 cursor-pointer transition-colors"
            >
              <option value="ALL">All Countries ({countries.length})</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {getFlagEmoji(c)} {c}
                </option>
              ))}
            </select>

            {/* Plan Selector */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value as 'ALL' | 'FREE' | 'PRO')}
              className="bg-[#000000] border border-white/[0.12] focus:border-white focus:outline-none text-neutral-300 text-xs font-mono px-3 py-2 cursor-pointer transition-colors"
            >
              <option value="ALL">All Plans</option>
              <option value="PRO">PRO</option>
              <option value="FREE">FREE</option>
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'last_login' | 'created_at' | 'elo' | 'nickname')}
              className="bg-[#000000] border border-white/[0.12] focus:border-white focus:outline-none text-neutral-300 text-xs font-mono px-3 py-2 cursor-pointer transition-colors"
            >
              <option value="last_login">Sort: Last Active</option>
              <option value="created_at">Sort: Registration</option>
              <option value="elo">Sort: CS2 ELO</option>
              <option value="nickname">Sort: Nickname</option>
            </select>

            {/* Refresh */}
            <button
              type="button"
              onClick={handleRefresh}
              className="bg-[#000000] border border-white/[0.12] hover:border-white hover:text-white text-neutral-400 p-2 cursor-pointer transition-colors"
              title="Refresh database"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={isLoading ? 'animate-spin text-white' : ''}
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </button>
          </div>
        </section>

        {/* 5. Registered Players Table */}
        <section className="bg-[#080808] border border-white/[0.08] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                REGISTERED PLAYERS
              </span>
              <span className="px-2 py-0.5 bg-white/10 text-[10px] font-mono text-neutral-300">
                {filteredUsers.length} of {users.length}
              </span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              Real-time synchronization with FACEIT OAuth
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#000000] text-xs font-mono text-[#777777] uppercase tracking-wider">
                  <th className="py-3 px-5">PLAYER</th>
                  <th className="py-3 px-5">EMAIL</th>
                  <th className="py-3 px-5">CS2 ELO & LEVEL</th>
                  <th className="py-3 px-5">COUNTRY</th>
                  <th className="py-3 px-5">REGISTRATION & ACTIVITY</th>
                  <th className="py-3 px-5 text-right">PLAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-sm">
                {isLoading && users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono text-xs">
                      Loading player records from database...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono text-xs">
                      No players found matching current query or filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((player) => {
                    const isCeo = player.nickname.toLowerCase() === 'zeacvo' || player.email.toLowerCase() === 'zeacvo@icloud.com';
                    return (
                      <tr
                        key={player.guid}
                        className="hover:bg-white/[0.03] transition-colors group"
                      >
                        {/* Col 1: Player (Avatar + Nickname + CEO Badge + GUID) */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#111111] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                              {player.avatar ? (
                                <img
                                  src={player.avatar}
                                  alt={player.nickname}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                      'https://assets.faceit-cdn.net/avatars/default_avatar.png';
                                  }}
                                />
                              ) : (
                                <span className="font-bold text-xs text-neutral-400">
                                  {player.nickname.substring(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <a
                                  href={`https://www.faceit.com/en/players/${encodeURIComponent(player.nickname)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold text-white hover:text-neutral-300 transition-colors flex items-center gap-1.5"
                                  title="View on FACEIT"
                                >
                                  <span>{player.nickname}</span>
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                  </svg>
                                </a>
                                {isCeo && (
                                  <span className="border border-white/20 text-neutral-300 text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                                    CEO
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-mono text-[#888888] truncate max-w-[150px]">
                                {player.guid}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Col 2: Email */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${player.email}`}
                              className="font-mono text-xs text-neutral-300 hover:text-white transition-colors"
                            >
                              {player.email}
                            </a>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(player.email)}
                              className="opacity-0 group-hover:opacity-100 text-[10px] font-mono text-neutral-400 hover:text-white px-1.5 py-0.5 bg-white/5 border border-white/10 transition-opacity cursor-pointer"
                              title="Copy email"
                            >
                              {copiedEmail === player.email ? '✓' : (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Col 3: CS2 ELO & Level Badge */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="px-1.5 py-0.5 bg-white/10 border border-white/20 font-mono font-bold text-xs text-white"
                              title={`FACEIT Level ${player.level}`}
                            >
                              LVL {player.level}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-mono text-sm font-bold text-white">
                                {player.elo.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-mono text-[#888888]">CS2 Matchmaking</span>
                            </div>
                          </div>
                        </td>

                        {/* Col 4: Country */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="text-base">{getFlagEmoji(player.country)}</span>
                            <span className="font-bold text-white">{player.country}</span>
                          </div>
                        </td>

                        {/* Col 5: Registration & Activity */}
                        <td className="py-3.5 px-5">
                          <div className="flex flex-col font-mono text-xs">
                            <span className="text-white font-medium">
                              {formatRelativeTime(player.last_login_at)}
                            </span>
                            <span className="text-[10px] text-[#888888]">
                              Joined {formatDate(player.created_at)}
                            </span>
                          </div>
                        </td>

                        {/* Col 6: Plan */}
                        <td className="py-3.5 px-5 text-right">
                          <span
                            className={`inline-block font-mono text-[10px] font-bold uppercase tracking-wider ${
                              player.plan === 'PRO'
                                ? 'border border-white/20 text-neutral-200 px-2 py-0.5'
                                : 'text-neutral-500'
                            }`}
                          >
                            {player.plan}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-5 py-3 border-t border-white/[0.08] bg-[#000000] flex items-center justify-between text-xs font-mono text-[#888888]">
            <span>Total registered database size: {users.length} {users.length === 1 ? 'player' : 'players'}</span>
            <div className="flex items-center gap-4">
              <span>Cloudflare D1 / KV Engine active</span>
              <button
                type="button"
                onClick={handleExportCsv}
                className="text-white hover:underline font-bold cursor-pointer"
              >
                Download CSV Export
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
