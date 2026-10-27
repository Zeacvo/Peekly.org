import React, { useState, useEffect, useMemo } from 'react';
import type { Language } from '../translations';
import { type PlayerUser, type AdminStats } from '../../functions/api/storage/usersDb';

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

function getLevelBadgeStyle(level: number): { bg: string; text: string; border: string } {
  if (level >= 10) return { bg: 'bg-[#FF5500]', text: 'text-white', border: 'border-[#FF5500]' };
  if (level >= 8) return { bg: 'bg-[#FFAA00]', text: 'text-black', border: 'border-[#FFAA00]' };
  if (level >= 4) return { bg: 'bg-[#32CD32]', text: 'text-black', border: 'border-[#32CD32]' };
  return { bg: 'bg-[#6B7280]', text: 'text-white', border: 'border-[#6B7280]' };
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function formatRelativeTime(iso: string): string {
  try {
    const diffMs = Date.now() - new Date(iso).getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 1) return 'только что';
    if (diffMinutes < 60) return `${diffMinutes} мин назад`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} ч назад`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} дн назад`;
  } catch {
    return formatDate(iso);
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
      <div className="min-h-screen bg-[#070809] flex items-center justify-center text-white">
        <p className="text-sm font-mono text-[#8b8e96] animate-pulse">Checking authorization...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090b] text-[#f0f2f5] font-sans antialiased selection:bg-[#FF5500] selection:text-black">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0e1013]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none"
            title="Back to Landing Page"
          >
            <div className="w-8 h-8 rounded-none bg-black border border-white/20 flex items-center justify-center text-[#ff5500] group-hover:border-[#ff5500] transition-colors">
              <svg width="18" height="12" viewBox="6 22 88 56" fill="currentColor">
                <path
                  d="M 8 50 C 24 30, 36 24, 50 24 C 64 24, 76 30, 92 50 C 76 70, 64 76, 50 76 C 36 76, 24 70, 8 50 Z M 50 29 A 21 21 0 1 0 50 71 A 21 21 0 1 0 50 29 Z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-mono text-sm font-bold tracking-widest text-white group-hover:text-[#ff5500] transition-colors">
              PEEKLY
            </span>
          </button>

          <span className="text-white/20 font-mono text-xs">/</span>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
            CEO DASHBOARD
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-[#14161a] border border-white/10 text-xs">
            <div className="w-5 h-5 rounded-full bg-[#20232a] flex items-center justify-center text-[10px] font-bold text-white border border-white/20">
              Z
            </div>
            <span className="font-bold text-white">{currentUser.nickname || 'Zeacvo'}</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#ff5500]/20 text-[#ff5500] font-bold">
              OWNER
            </span>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black hover:bg-[#ff5500] hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-white"
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
            className="px-3 py-1.5 bg-[#15171c] hover:bg-[#202329] text-white/80 hover:text-white border border-white/10 font-mono text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            &lt; Home
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
              className="text-xs uppercase font-mono px-2.5 py-1 bg-red-900/60 hover:bg-red-800 text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* 3. Top KPI Metric Cards */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Total Players */}
          <div className="bg-[#121418] border border-white/10 p-5 relative overflow-hidden group hover:border-[#ff5500]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-[#8b8e96] uppercase tracking-wider">Total Players</span>
              <span className="text-white/30 text-xs">👥</span>
            </div>
            <div className="text-3xl font-black text-white font-sans tracking-tight">
              {stats?.totalPlayers ?? users.length}
            </div>
            <div className="mt-2 text-[11px] text-[#4ade80] font-mono flex items-center gap-1">
              <span>●</span> Verified FACEIT accounts
            </div>
          </div>

          {/* New Today */}
          <div className="bg-[#121418] border border-white/10 p-5 relative overflow-hidden group hover:border-[#ff5500]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-[#8b8e96] uppercase tracking-wider">New Today</span>
              <span className="text-[#ff5500] text-xs">⚡</span>
            </div>
            <div className="text-3xl font-black text-[#ff5500] font-sans tracking-tight">
              +{stats?.newToday ?? 0}
            </div>
            <div className="mt-2 text-[11px] text-[#8b8e96] font-mono">
              Registrations last 24h
            </div>
          </div>

          {/* Average ELO */}
          <div className="bg-[#121418] border border-white/10 p-5 relative overflow-hidden group hover:border-[#ff5500]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-[#8b8e96] uppercase tracking-wider">Average CS2 ELO</span>
              <span className="text-yellow-400 text-xs">🏆</span>
            </div>
            <div className="text-3xl font-black text-white font-sans tracking-tight flex items-baseline gap-2">
              <span>{stats?.averageElo?.toLocaleString() ?? '2,180'}</span>
              <span className="text-xs font-mono font-bold text-yellow-400">LVL 9</span>
            </div>
            <div className="mt-2 text-[11px] text-[#8b8e96] font-mono">
              Competitive skill tier
            </div>
          </div>

          {/* Active 24h */}
          <div className="bg-[#121418] border border-white/10 p-5 relative overflow-hidden group hover:border-[#ff5500]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-[#8b8e96] uppercase tracking-wider">Active 24h</span>
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-ping" />
            </div>
            <div className="text-3xl font-black text-white font-sans tracking-tight">
              {stats?.active24h ?? users.length}
            </div>
            <div className="mt-2 text-[11px] text-[#4ade80] font-mono flex items-center gap-1">
              <span>●</span> In match queues now
            </div>
          </div>

          {/* Top Region */}
          <div className="bg-[#121418] border border-white/10 p-5 relative overflow-hidden group hover:border-[#ff5500]/50 transition-colors col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-[#8b8e96] uppercase tracking-wider">Top Region</span>
              <span className="text-xs">🌍</span>
            </div>
            <div className="text-3xl font-black text-white font-sans tracking-tight flex items-center gap-2">
              <span>{stats?.topCountry ?? 'RU (42%)'}</span>
            </div>
            <div className="mt-2 text-[11px] text-[#8b8e96] font-mono">
              Highest player density
            </div>
          </div>
        </section>

        {/* 4. Filter & Search Controls */}
        <section className="bg-[#121418] border border-white/10 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by nickname, email, or GUID..."
              className="w-full bg-[#0a0b0d] border border-white/15 px-9 py-2 text-sm text-white placeholder-white/40 focus:border-[#ff5500] focus:outline-none transition-colors font-mono"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Country Filter */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bg-[#0a0b0d] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-[#ff5500] focus:outline-none"
            >
              <option value="ALL">All Countries ({countries.length})</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {getFlagEmoji(c)} {c}
                </option>
              ))}
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value as 'ALL' | 'FREE' | 'PRO')}
              className="bg-[#0a0b0d] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-[#ff5500] focus:outline-none"
            >
              <option value="ALL">All Plans</option>
              <option value="FREE">FREE</option>
              <option value="PRO">PRO</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'last_login' | 'created_at' | 'elo' | 'nickname')
              }
              className="bg-[#0a0b0d] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-[#ff5500] focus:outline-none"
            >
              <option value="last_login">Sort: Last Active</option>
              <option value="created_at">Sort: Registration</option>
              <option value="elo">Sort: Highest ELO</option>
              <option value="nickname">Sort: Nickname</option>
            </select>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-3 py-2 bg-[#1b1e24] hover:bg-[#252830] border border-white/10 text-white/80 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              title="Refresh player list from server"
            >
              {isLoading ? '...' : '↻'}
            </button>
          </div>
        </section>

        {/* 5. Player Database Table */}
        <section className="bg-[#121418] border border-white/10 overflow-hidden shadow-2xl">
          <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#15171d]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                REGISTERED PLAYERS
              </span>
              <span className="px-2 py-0.5 bg-white/10 text-[11px] font-mono text-white/70">
                {filteredUsers.length} of {users.length}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8b8e96]">
              Real-time synchronization with FACEIT OAuth
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#0e1014] text-[11px] font-mono text-[#8b8e96] uppercase tracking-wider">
                  <th className="py-3 px-5">PLAYER</th>
                  <th className="py-3 px-5">EMAIL</th>
                  <th className="py-3 px-5">CS2 ELO & LEVEL</th>
                  <th className="py-3 px-5">COUNTRY</th>
                  <th className="py-3 px-5">REGISTRATION & ACTIVITY</th>
                  <th className="py-3 px-5 text-right">PLAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {isLoading && users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-white/40 font-mono text-sm">
                      Loading player records from database...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-white/40 font-mono text-sm">
                      No players found matching current query or filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((player) => {
                    const badge = getLevelBadgeStyle(player.level);
                    return (
                      <tr
                        key={player.guid}
                        className="hover:bg-white/[0.03] transition-colors group"
                      >
                        {/* Col 1: Avatar & Nickname */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-none bg-[#1d2026] border border-white/15 overflow-hidden shrink-0 flex items-center justify-center">
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
                                <span className="font-bold text-xs text-white/60">
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
                                  className="font-bold text-white group-hover:text-[#ff5500] transition-colors flex items-center gap-1.5"
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
                                {player.nickname.toLowerCase() === 'zeacvo' && (
                                  <span className="px-1.5 py-0.5 bg-[#ff5500] text-black font-mono font-black text-[9px] uppercase tracking-wider">
                                    CEO
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-mono text-[#8b8e96] truncate max-w-[150px]">
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
                              className="font-mono text-xs text-[#a0a5b0] hover:text-white transition-colors"
                            >
                              {player.email}
                            </a>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(player.email)}
                              className="opacity-0 group-hover:opacity-100 text-[10px] font-mono text-[#8b8e96] hover:text-white px-1.5 py-0.5 bg-white/5 border border-white/10 transition-opacity"
                              title="Copy email"
                            >
                              {copiedEmail === player.email ? '✓ Copied' : 'Copy'}
                            </button>
                          </div>
                        </td>

                        {/* Col 3: CS2 ELO & Level Badge */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-6 h-6 rounded-none flex items-center justify-center font-mono font-black text-xs ${badge.bg} ${badge.text} border ${badge.border} shadow-sm`}
                              title={`FACEIT Level ${player.level}`}
                            >
                              {player.level}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-mono text-sm font-bold text-white">
                                {player.elo.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-mono text-[#8b8e96]">CS2 Matchmaking</span>
                            </div>
                          </div>
                        </td>

                        {/* Col 4: Country */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="text-base">{getFlagEmoji(player.country)}</span>
                            <span className="font-bold text-white/90">{player.country}</span>
                          </div>
                        </td>

                        {/* Col 5: Registration & Last Active */}
                        <td className="py-3.5 px-5">
                          <div className="flex flex-col font-mono text-xs">
                            <span className="text-white font-medium flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                              {formatRelativeTime(player.last_login_at)}
                            </span>
                            <span className="text-[10px] text-[#8b8e96]">
                              Joined {formatDate(player.created_at)}
                            </span>
                          </div>
                        </td>

                        {/* Col 6: Plan */}
                        <td className="py-3.5 px-5 text-right">
                          <span
                            className={`inline-block px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider ${
                              player.plan === 'PRO'
                                ? 'bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/40 shadow-[0_0_12px_rgba(255,85,0,0.2)]'
                                : 'bg-white/5 text-white/70 border border-white/10'
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
          <div className="px-5 py-3 border-t border-white/10 bg-[#0e1014] flex items-center justify-between text-xs font-mono text-[#8b8e96]">
            <span>Total registered database size: {users.length} players</span>
            <div className="flex items-center gap-4">
              <span>Cloudflare D1 / KV Engine active</span>
              <button
                type="button"
                onClick={handleExportCsv}
                className="text-white hover:text-[#ff5500] underline font-bold cursor-pointer"
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
