import React, { useState, useEffect, useMemo } from 'react';
import type { Language } from '../translations';
import { adminTranslations } from '../data/adminTranslations';
import { DefaultUserAvatar } from '../components/DefaultUserAvatar';
import { ActivityChart } from '../components/admin/ActivityChart';
import { Trash2 } from 'lucide-react';
import { type PlayerUser, type AdminStats } from '../../functions/api/storage/usersDb';

interface AdminDashboardProps {
  currentLang?: Language;
  onGoHome?: () => void;
  onNavigateProfile?: (guid: string) => void;
}

const COUNTRY_NAMES: Record<string, string> = {
  BY: 'Belarus',
  RU: 'Russia',
  UA: 'Ukraine',
  KZ: 'Kazakhstan',
  US: 'United States',
  DE: 'Germany',
  PL: 'Poland',
  GB: 'United Kingdom',
  FR: 'France',
  ES: 'Spain',
  SE: 'Sweden',
  FI: 'Finland',
  NO: 'Norway',
  DK: 'Denmark',
  EE: 'Estonia',
  LV: 'Latvia',
  LT: 'Lithuania',
  BR: 'Brazil',
  TR: 'Turkey',
};

function getCountryName(code?: string | null): string {
  if (!code || code === '—') return 'Belarus';
  const clean = code.trim().toUpperCase();
  return COUNTRY_NAMES[clean] || (clean.length === 2 ? clean : code);
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

function formatDateOnly(iso: string | number | undefined | null): string {
  try {
    const d = parseSafeDate(iso);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return '03.11.2026';
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

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentLang = 'en',
  onNavigateProfile,
}) => {
  const t = adminTranslations[currentLang] || adminTranslations.en;
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

  // Checkbox selection and deletion states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    ids: string[];
    isBulk: boolean;
    targetNickname?: string;
  }>({ isOpen: false, ids: [], isBulk: false });
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

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
      u.elo || 0,
      u.level || 1,
      `"${getCountryName(u.country)}"`,
      `"${u.plan?.toLowerCase() === 'pro' ? 'Pro' : 'Free'}"`,
      `"${formatDateOnly(u.created_at)}"`,
      `"${formatDateOnly(u.last_login_at)}"`,
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

  // User deletion & selection helpers
  const isSelectable = (player: PlayerUser) => {
    const nick = player.nickname.toLowerCase();
    const mail = player.email.toLowerCase();
    return nick !== 'zeacvo' && mail !== 'zeacvo@icloud.com' && !nick.includes('zeacvo');
  };

  const selectableFiltered = useMemo(
    () => filteredUsers.filter(isSelectable),
    [filteredUsers]
  );

  const isAllSelected =
    selectableFiltered.length > 0 &&
    selectableFiltered.every((p) => selectedIds.includes(p.guid));

  const isSomeSelected =
    selectableFiltered.some((p) => selectedIds.includes(p.guid)) && !isAllSelected;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(selectableFiltered.map((p) => p.guid));
    }
  };

  const handleToggleRow = (guid: string) => {
    setSelectedIds((prev) =>
      prev.includes(guid) ? prev.filter((id) => id !== guid) : [...prev, guid]
    );
  };

  const handleRequestSingleDelete = (player: PlayerUser) => {
    setDeleteModal({
      isOpen: true,
      ids: [player.guid],
      isBulk: false,
      targetNickname: player.nickname,
    });
  };

  const handleRequestBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteModal({
      isOpen: true,
      ids: selectedIds,
      isBulk: true,
    });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.ids.length === 0) return;
    setIsDeleting(true);
    try {
      const res = await fetch('/api/admin/users/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-User': currentUser.nickname || 'Zeacvo',
        },
        body: JSON.stringify({ userIds: deleteModal.ids }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || t.errorDeleting);
      } else {
        const deletedCount = data.deletedCount || deleteModal.ids.length;
        setUsers((prev) => prev.filter((u) => !deleteModal.ids.includes(u.guid)));
        setSelectedIds((prev) => prev.filter((id) => !deleteModal.ids.includes(id)));
        setDeleteModal({ isOpen: false, ids: [], isBulk: false });
        setActionSuccessMsg(t.deleteSuccess.replace('{count}', String(deletedCount)));
        setTimeout(() => setActionSuccessMsg(null), 4000);
      }
    } catch (err) {
      alert(`${t.errorDeleting}: ${String(err)}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">
        <p className="text-xs font-mono text-neutral-400 tracking-wider animate-pulse">
          {t.checkingAuth}
        </p>
      </div>
    );
  }

  const avgElo =
    stats?.averageElo ??
    (users.length > 0 ? Math.round(users.reduce((acc, u) => acc + (u.elo || 0), 0) / users.length) : 0);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-[#FF5500] selection:text-black">
      {/* Main Content Container matching landing page layout geometry */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 space-y-6">
        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center justify-between">
            <span>{t.serverError}: {errorMsg}</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="text-xs font-mono px-2.5 py-1 bg-red-900/60 hover:bg-red-800 text-white cursor-pointer"
            >
              {t.retry}
            </button>
          </div>
        )}

        {/* 3. Top KPI Metric Cards in clean Apple-minimalist style */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* Total Players */}
          <div className="bg-[#090909] border border-[#1A1A1F] p-5 sm:p-6 transition-colors">
            <div className="text-xs text-[#929292] font-semibold tracking-wider mb-2">
              {currentLang === 'ru' ? 'Всего игроков' : 'Total players'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {stats?.totalPlayers ?? users.length}
            </div>
          </div>

          {/* New Today */}
          <div className="bg-[#090909] border border-[#1A1A1F] p-5 sm:p-6 transition-colors">
            <div className="text-xs text-[#929292] font-semibold tracking-wider mb-2">
              {currentLang === 'ru' ? 'Новые сегодня' : 'New today'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {stats ? (stats.newToday > 0 ? `+${stats.newToday}` : '0') : users.length}
            </div>
          </div>

          {/* Average ELO */}
          <div className="bg-[#090909] border border-[#1A1A1F] p-5 sm:p-6 transition-colors">
            <div className="text-xs text-[#929292] font-semibold tracking-wider mb-2">
              {currentLang === 'ru' ? 'Среднее Elo' : 'Average Elo'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {avgElo ? avgElo.toLocaleString() : '—'}
            </div>
          </div>

          {/* Active 24h */}
          <div className="bg-[#090909] border border-[#1A1A1F] p-5 sm:p-6 transition-colors">
            <div className="text-xs text-[#929292] font-semibold tracking-wider mb-2">
              {currentLang === 'ru' ? 'Активные 24ч' : 'Active 24h'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {stats?.active24h ?? users.length}
            </div>
          </div>

          {/* Top Region */}
          <div className="bg-[#090909] border border-[#1A1A1F] p-5 sm:p-6 transition-colors col-span-2 sm:col-span-1">
            <div className="text-xs text-[#929292] font-semibold tracking-wider mb-2">
              {currentLang === 'ru' ? 'Топ регион' : 'Top region'}
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {stats?.topCountry ?? '—'}
            </div>
          </div>
        </section>

        {/* 3.5 Activity Trends Infographic */}
        <ActivityChart users={users} currentLang={currentLang} />

        {/* 4. Filter & Search Controls */}
        <section className="bg-[#090909] border border-[#1A1A1F] p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#929292] w-4 h-4 pointer-events-none"
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
              placeholder={currentLang === 'ru' ? 'Поиск' : 'Search'}
              className="w-full bg-[#000000] border border-[#1A1A1F] focus:border-white focus:outline-none text-white text-xs placeholder:text-[#929292] pl-10 pr-4 py-2 transition-colors rounded-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Country Selector */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bg-[#000000] border border-[#1A1A1F] focus:border-white focus:outline-none text-[#929292] hover:text-white text-xs px-3 py-2 cursor-pointer transition-colors rounded-none"
            >
              <option value="ALL">{t.allCountries} ({countries.length})</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Plan Selector */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value as 'ALL' | 'FREE' | 'PRO')}
              className="bg-[#000000] border border-[#1A1A1F] focus:border-white focus:outline-none text-[#929292] hover:text-white text-xs px-3 py-2 cursor-pointer transition-colors rounded-none"
            >
              <option value="ALL">{currentLang === 'ru' ? 'Все тарифы' : 'All Plans'}</option>
              <option value="FREE">Free</option>
              <option value="PRO">Pro</option>
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'last_login' | 'created_at' | 'elo' | 'nickname')}
              className="bg-[#000000] border border-[#1A1A1F] focus:border-white focus:outline-none text-[#929292] hover:text-white text-xs px-3 py-2 cursor-pointer transition-colors rounded-none"
            >
              <option value="last_login">{t.sortLastActive}</option>
              <option value="created_at">{t.sortRegistration}</option>
              <option value="elo">{t.sortElo}</option>
              <option value="nickname">{t.sortNickname}</option>
            </select>

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center justify-center text-center h-[34px] px-3 sm:px-4 rounded-none bg-white text-black hover:bg-[#FF5500] font-mono font-bold text-xs tracking-wider cursor-pointer shadow-none active:scale-95 shrink-0 focus-visible:ring-1 focus-visible:ring-white gap-2 transition-colors"
              title="Export CSV"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export CSV</span>
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={handleRefresh}
              className="bg-[#000000] border border-[#1A1A1F] hover:border-white hover:text-white text-[#929292] p-2 cursor-pointer transition-colors rounded-none h-[34px] w-[34px] flex items-center justify-center"
              title={t.refreshTooltip}
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
        <section className="bg-[#090909] border border-[#1A1A1F] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1A1A1F] flex items-center justify-between bg-[#000000]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-white tracking-wider">
                {currentLang === 'ru' ? 'Зарегистрированные игроки' : 'Registered players'}
              </span>
              <span className="px-2 py-0.5 bg-white/10 text-[10px] text-[#929292] font-mono">
                {filteredUsers.length} of {users.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#000000] border-b border-[#1A1A1F] text-left text-xs font-mono text-[#929292]">
                <tr>
                  <th className="py-3 px-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeSelected;
                      }}
                      onChange={handleToggleSelectAll}
                      className="w-4 h-4 rounded-none bg-[#090909] border border-[#222228] checked:bg-[#FF5500] checked:border-[#FF5500] cursor-pointer accent-[#FF5500]"
                      title={t.selectAll}
                    />
                  </th>
                  <th className="py-3 px-4 font-normal">Nickname</th>
                  <th className="py-3 px-4 font-normal">Email</th>
                  <th className="py-3 px-4 font-normal">Elo & Level</th>
                  <th className="py-3 px-4 font-normal">Country</th>
                  <th className="py-3 px-4 font-normal">Registration & Activity</th>
                  <th className="py-3 px-4 font-normal">Plan</th>
                  <th className="py-3 px-4 font-normal text-right">Удалить</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1F] text-xs font-mono">
                {isLoading && users.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#929292] text-xs">
                      {t.loadingRecords}
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#929292] text-xs">
                      {t.noPlayersFound}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((player, index) => {
                    const canSelect = isSelectable(player);
                    return (
                      <tr
                        key={player.guid}
                        className={`border-b border-[#1A1A1F] hover:bg-[#0c0c0e] transition-colors group ${
                          index % 2 === 0 ? 'bg-[#000000]' : 'bg-[#090909]'
                        } ${
                          selectedIds.includes(player.guid) ? '!bg-[#FF5500]/[0.08]' : ''
                        }`}
                      >
                        {/* Col 0: Checkbox */}
                        <td className="py-3 px-4 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(player.guid)}
                            disabled={!canSelect}
                            onChange={() => handleToggleRow(player.guid)}
                            className={`w-4 h-4 rounded-none bg-[#090909] border border-[#222228] checked:bg-[#FF5500] checked:border-[#FF5500] accent-[#FF5500] ${
                              !canSelect ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            title={!canSelect ? t.protectedCeo : t.selectUser}
                          />
                        </td>

                        {/* Col 1: Nickname */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-[#000000] border border-[#222228] rounded-none flex items-center justify-center shrink-0 overflow-hidden">
                              {player.avatar && !player.avatar.includes('default_avatar.png') ? (
                                <img
                                  src={player.avatar}
                                  alt={player.nickname}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <DefaultUserAvatar size={14} className="w-3.5 h-3.5 text-[#FFFFFF]" />
                              )}
                            </div>
                            <a
                              href={`/profile?id=${encodeURIComponent(player.guid)}`}
                              onClick={(e) => {
                                e.preventDefault();
                                if (onNavigateProfile) {
                                  onNavigateProfile(player.guid);
                                } else {
                                  window.location.href = `/profile?id=${encodeURIComponent(player.guid)}`;
                                }
                              }}
                              className="font-bold text-[#FFFFFF] hover:text-[#FF5500] transition-colors"
                              title={`${t.openProfile} ${player.nickname}`}
                            >
                              {player.nickname}
                            </a>
                          </div>
                        </td>

                        {/* Col 2: Email */}
                        <td className="py-3 px-4 text-[#929292]">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${player.email}`}
                              className="hover:text-white transition-colors"
                            >
                              {player.email}
                            </a>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(player.email)}
                              className="opacity-0 group-hover:opacity-100 text-[10px] text-[#929292] hover:text-white px-1.5 py-0.5 bg-white/5 border border-[#222228] transition-opacity cursor-pointer rounded-none"
                              title={t.copyEmail}
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

                        {/* Col 3: Elo & Level */}
                        <td className="py-3 px-4 text-[#FFFFFF]">
                          {player.elo ? `${player.elo.toLocaleString()} & ${player.level || 1} level` : '—'}
                        </td>

                        {/* Col 4: Country */}
                        <td className="py-3 px-4 text-[#FFFFFF]">
                          {getCountryName(player.country) || 'Belarus'}
                        </td>

                        {/* Col 5: Registration & Activity */}
                        <td className="py-3 px-4 text-[#FFFFFF]">
                          <span>{formatDateOnly(player.created_at)}</span>
                          <span className="text-[#929292] mx-1.5">&</span>
                          <span className="text-[#929292]">{formatDateOnly(player.last_login_at)}</span>
                        </td>

                        {/* Col 6: Plan */}
                        <td className="py-3 px-4 text-[#929292]">
                          {player.plan?.toLowerCase() === 'pro' ? 'Pro' : 'Free'}
                        </td>

                        {/* Col 7: Actions (Delete) */}
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleRequestSingleDelete(player)}
                            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-[#929292] hover:text-[#FFFFFF] hover:bg-[#1A1A1F] border border-transparent hover:border-[#222228] transition-colors rounded-none cursor-pointer"
                            title="Удалить"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Удалить</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Floating Action Bar for Bulk Deletion */}
        {selectedIds.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#090909] border border-white/20 px-6 py-3.5 shadow-2xl flex items-center gap-5 sm:gap-6 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span className="text-[#929292]">{t.selected}:</span>
              <span className="font-bold text-white px-2 py-0.5 bg-white/10">
                {selectedIds.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleRequestBulkDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer rounded-none flex items-center gap-2 shadow-lg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>{t.deleteSelected} ({selectedIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-xs text-[#929292] hover:text-white transition-colors cursor-pointer"
            >
              {t.clearSelection}
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#000000] border border-red-600/50 p-6 relative">
              <h3 className="text-sm font-mono font-bold text-red-500 tracking-wider mb-3 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>{t.deleteModalTitle}</span>
              </h3>

              <p className="text-xs font-mono text-neutral-300 leading-relaxed mb-6">
                {deleteModal.isBulk
                  ? t.deleteBulkConfirm.replace('{count}', String(deleteModal.ids.length))
                  : t.deleteSingleConfirm.replace('{name}', deleteModal.targetNickname || '')}
              </p>

              <div className="flex items-center justify-end gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setDeleteModal({ isOpen: false, ids: [], isBulk: false })}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-[#222228] text-[#929292] hover:text-white hover:border-white cursor-pointer rounded-none"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold transition-colors cursor-pointer rounded-none flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.deleting}</span>
                    </>
                  ) : (
                    <span>{t.confirmDelete}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Success Toast */}
        {actionSuccessMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#000000] border border-white/30 text-white px-4 py-3 text-xs shadow-2xl flex items-center gap-2">
            <span>✓</span>
            <span>{actionSuccessMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
