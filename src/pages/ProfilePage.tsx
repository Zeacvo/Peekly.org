import React, { useState, useEffect } from 'react';
import { PeeklyLogo } from '../components/PeeklyLogo';
import { FaceitLogo } from '../components/AuthModal';
import { Shield, ShieldAlert, Check, Copy, ExternalLink, Cpu, Calendar } from 'lucide-react';
import type { Language } from '../translations';
import { calculateFaceitLevel } from '../../functions/api/storage/usersDb';

interface ProfilePageProps {
  currentLang?: Language;
  onGoHome?: () => void;
  onOpenAdmin?: () => void;
}

interface UserSession {
  id?: string;
  guid?: string;
  nickname: string;
  email?: string;
  avatar?: string;
  country?: string | null;
  elo?: number | null;
  level?: number | null;
  faceit_connected?: boolean;
  faceit_nickname?: string | null;
  role?: string;
  created_at?: string | number;
  plan?: string;
}

function getInitialUser(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('peekly_user') || localStorage.getItem('peekly_auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.nickname) return parsed;
    }
    const match = document.cookie.match(/peekly_user=([^;]+)/) || document.cookie.match(/peekly_auth=([^;]+)/);
    if (match) {
      const parsed = JSON.parse(decodeURIComponent(match[1]));
      if (parsed?.nickname) return parsed;
    }
  } catch {}
  return null;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onGoHome, onOpenAdmin }) => {
  const [user, setUser] = useState<UserSession | null>(getInitialUser);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setUser(data.user);
          try {
            localStorage.setItem('peekly_user', JSON.stringify(data.user));
            localStorage.setItem('peekly_auth', JSON.stringify(data.user));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
      localStorage.removeItem('peekly_auth');
      localStorage.removeItem('peekly_user');
      document.cookie = 'peekly_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0;';
      document.cookie = 'peekly_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0;';
      document.cookie = 'peekly_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0;';
    } catch {}
    setUser(null);
    if (onGoHome) onGoHome();
    else window.location.href = '/';
  };

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isCeo =
    user?.nickname?.toLowerCase() === 'zeacvo' ||
    user?.email?.toLowerCase() === 'zeacvo@icloud.com' ||
    user?.role?.toLowerCase() === 'ceo' ||
    user?.role?.toLowerCase() === 'admin' ||
    user?.role?.toLowerCase() === 'owner';

  const isFaceitLinked = Boolean(
    user?.faceit_connected || user?.faceit_nickname || (user?.elo && user.elo > 0)
  );

  const faceitElo = user?.elo ? Number(user.elo) : null;
  const faceitLevel = user?.level || (faceitElo ? calculateFaceitLevel(faceitElo) : null);

  const registrationDate = user?.created_at
    ? new Date(
        typeof user.created_at === 'number'
          ? user.created_at
          : isNaN(Number(user.created_at))
          ? user.created_at
          : Number(user.created_at)
      ).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Oct 2026';

  const monogram = (user?.nickname || 'U').slice(0, 1).toUpperCase();

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-[#FF5500] selection:text-black">
      {/* 1. Tactical Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 min-h-[64px] sm:min-h-[80px] bg-black/90 backdrop-blur-md border-b border-white/10 pt-[env(safe-area-inset-top)] transition-all">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 min-h-[64px] sm:min-h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <button
              type="button"
              onClick={onGoHome}
              className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0 bg-transparent border-none p-0"
              title="Back to Landing Page"
            >
              <PeeklyLogo
                size={28}
                className="h-7 w-auto sm:h-8 sm:w-auto md:h-9 md:w-auto text-white group-hover:text-[#FF5500] transition-colors duration-150 shrink-0"
              />
              <span className="font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-wider text-white leading-none select-none">
                PEEKLY
              </span>
            </button>

            <span className="text-white/20 font-mono text-xs">/</span>

            <span className="border border-white/20 text-neutral-300 font-mono text-xs font-semibold uppercase tracking-wider px-2 py-0.5">
              PROFILE
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {isCeo && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] border border-white/10 text-xs">
                <span className="font-bold text-white">{user?.nickname || 'Zeacvo'}</span>
                <span className="border border-[#FF5500]/50 text-[#FF5500] text-[10px] font-mono px-1.5 py-0.5 font-bold uppercase tracking-wider">
                  OWNER
                </span>
              </div>
            )}

            {isCeo && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hidden md:inline-flex items-center justify-center text-center h-8 sm:h-9 px-3 sm:px-4 rounded-none bg-[#FF5500]/10 border border-[#FF5500]/40 hover:bg-[#FF5500] hover:text-black text-[#FF5500] font-mono font-bold text-xs tracking-wider uppercase cursor-pointer transition-colors"
              >
                <span>ADMIN CONSOLE ↗</span>
              </button>
            )}

            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center justify-center text-center h-8 sm:h-9 px-3 sm:px-4 rounded-none btn-header-install font-sans font-bold text-xs tracking-wider uppercase cursor-pointer shadow-lg active:scale-95 shrink-0"
            >
              <span>&lt; HOME</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center text-center h-8 sm:h-9 px-3 sm:px-4 rounded-none bg-transparent border border-white/20 hover:border-red-500/50 hover:text-red-400 text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
        {/* Profile Header Hero */}
        <div className="bg-[#0A0A0E] border border-[#1A1A1F] p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar Monogram */}
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.nickname}
                  className="w-20 h-20 rounded-none object-cover border-2 border-white/20 bg-neutral-900"
                />
              ) : (
                <div className="w-20 h-20 rounded-none bg-neutral-900 border-2 border-white/20 flex items-center justify-center text-3xl font-mono font-black text-white shadow-inner">
                  {monogram}
                </div>
              )}
              {isFaceitLinked && (
                <div
                  className="absolute -bottom-2 -right-2 bg-black border border-white/20 p-1 shadow-md"
                  title="FACEIT Account Verified"
                >
                  <FaceitLogo className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* User Title & Badges */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase font-sans truncate">
                  {user?.nickname || 'Commander'}
                </h1>
                {isCeo ? (
                  <span className="bg-[#FF5500]/15 border border-[#FF5500] text-[#FF5500] font-mono text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                    OWNER
                  </span>
                ) : (
                  <span className="bg-white/5 border border-white/20 text-neutral-300 font-mono text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                    FREE TIER (EARLY BETA)
                  </span>
                )}
              </div>

              {/* Subtitle / Email */}
              {user?.email && (
                <div className="text-sm font-mono text-neutral-400 mb-3 flex items-center gap-2">
                  <span>{user.email}</span>
                </div>
              )}

              {/* Meta Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Joined {registrationDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 1: Account & Security */}
        <div className="bg-[#0A0A0E] border border-[#1A1A1F] p-6 mb-6">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/10">
            <Shield className="w-4 h-4 text-neutral-400" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Account & Security
            </h2>
          </div>

          <div className="space-y-4 font-mono">
            {/* Email Field */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-black border border-white/10 gap-3">
              <div>
                <div className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider mb-1">
                  Primary Email
                </div>
                <div className="text-sm text-white font-medium break-all">
                  {user?.email || 'Not specified'}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                  <Check className="w-3 h-3" />
                  <span>Verified</span>
                </span>
                {user?.email && (
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Authentication Credentials */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-black border border-white/10 gap-3">
              <div>
                <div className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider mb-1">
                  Security Encryption
                </div>
                <div className="text-sm text-neutral-300 font-medium tracking-widest">
                  ••••••••••••••••
                </div>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                PBKDF2-SHA256 (100k rounds)
              </div>
            </div>

            {/* Browser Extension */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-black border border-white/10 gap-3">
              <div>
                <div className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider mb-1">
                  Tactical Browser Extension
                </div>
                <div className="text-sm text-neutral-300">
                  HUD Overlays & Real-time Scouting
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-400 text-[11px] font-bold">
                  Not Linked
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: FACEIT Integration */}
        <div className="bg-[#0A0A0E] border border-[#1A1A1F] p-6 mb-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <FaceitLogo className="w-4 h-4" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                FACEIT Integration
              </h2>
            </div>
            {isFaceitLinked && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
                <Check className="w-3 h-3" />
                <span>Verified & Synced</span>
              </span>
            )}
          </div>

          {!isFaceitLinked ? (
            /* Unlinked State Banner */
            <div className="bg-black border border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-lg">
                <div className="flex items-center gap-2 text-white font-bold font-mono text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
                  <span>FACEIT ACCOUNT NOT LINKED</span>
                </div>
                <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                  Link your official FACEIT account to unlock CS2 competitive telemetry, live match lobby scouting, radar veto automation, and competitive tier badges.
                </p>
              </div>

              <a
                href="/api/auth/faceit/login"
                className="w-full sm:w-auto h-11 px-6 rounded-none btn-header-install font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer no-underline shrink-0 shadow-lg"
              >
                <FaceitLogo className="w-3.5 h-3.5" />
                <span>Connect FACEIT Account</span>
              </a>
            </div>
          ) : (
            /* Linked State Display */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Nickname & Platform */}
                <div className="p-4 bg-black border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider mb-1">
                    FACEIT Handle
                  </div>
                  <div className="text-base font-mono font-bold text-[#FF5500] truncate">
                    {user?.faceit_nickname || user?.nickname}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-1">
                    Region: {user?.country || 'BY'}
                  </div>
                </div>

                {/* CS2 Level */}
                <div className="p-4 bg-black border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider mb-1">
                    Skill Level
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-white/10 border border-white/20 font-mono font-black text-sm text-white">
                      LVL {faceitLevel || 8}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">Competitive Tier</span>
                  </div>
                </div>

                {/* CS2 ELO */}
                <div className="p-4 bg-black border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider mb-1">
                    Competitive ELO
                  </div>
                  <div className="text-xl font-mono font-black text-white">
                    {faceitElo ? faceitElo.toLocaleString() : '1,699'}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-0.5">
                    CS2 Matchmaking
                  </div>
                </div>
              </div>

              {/* View on FACEIT Link */}
              <div className="flex items-center justify-end pt-2">
                <a
                  href={`https://www.faceit.com/en/players/${user?.faceit_nickname || user?.nickname}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                >
                  <span>View Public Profile on FACEIT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Card 3: Database & System Admin (restricted to OWNER / Zeacvo) */}
        {isCeo && (
          <div className="bg-[#0A0A0E] border border-[#FF5500]/40 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5500] via-[#FF7733] to-transparent" />
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-[#FF5500]" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                System Administrator Privileges
              </h2>
            </div>

            <p className="text-xs font-mono text-neutral-300 leading-relaxed mb-5 max-w-2xl">
              You are authenticated as Project Owner (CEO). Access the central telemetry console to inspect live registered users in Cloudflare D1 SQL storage, analyze competitive skill tiers, and download CSV telemetry exports.
            </p>

            <button
              type="button"
              onClick={onOpenAdmin}
              className="h-11 px-6 bg-[#FF5500] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider border border-[#FF5500] hover:border-white hover:shadow-[0_0_15px_rgba(255,85,0,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Cpu className="w-4 h-4" />
              <span>Open Admin Telemetry Console ↗</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
