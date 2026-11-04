import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { LanguageIcon } from './LanguageIcon';
import { PeeklyLogo } from './PeeklyLogo';
import { FaceitLogo } from './AuthModal';
import { translations, SUPPORTED_LANGUAGES } from '../translations';
import type { Language } from '../translations';
import { BROWSERS } from '../constants/browsers';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onGoHome?: () => void;
  onOpenChangelog?: () => void;
  onOpenProfile?: () => void;
  onOpenAdmin?: () => void;
  onOpenAuthModal?: () => void;
}

interface UserSession {
  id?: string;
  nickname: string;
  email?: string;
  avatar?: string;
  picture?: string;
  country?: string | null;
  elo?: number | null;
  level?: number | null;
  faceit_connected?: boolean;
  faceit_nickname?: string | null;
  role?: string;
}

function getStoredUser(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const queryUser = searchParams.get('admin_user') || searchParams.get('as');
    if (queryUser && queryUser.trim().toLowerCase() === 'zeacvo') {
      const ceoSession: UserSession = {
        nickname: 'Zeacvo',
        email: 'zeacvo@icloud.com',
        avatar: '',
        country: null,
        elo: null,
        level: null,
        faceit_connected: false,
        faceit_nickname: null,
        role: 'ceo',
      };
      try {
        localStorage.setItem('peekly_auth', JSON.stringify(ceoSession));
        localStorage.setItem('peekly_user', JSON.stringify(ceoSession));
      } catch {}
      return ceoSession;
    }

    const raw = localStorage.getItem('peekly_auth') || localStorage.getItem('peekly_user');
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

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onGoHome,
  onOpenChangelog,
  onOpenProfile,
  onOpenAdmin: _onOpenAdmin,
  onOpenAuthModal,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [installDropdownOpen, setInstallDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(getStoredUser);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const installDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang] || translations.en;
  const isRu = currentLang === 'ru';

  useEffect(() => {
    const syncUser = () => {
      setUserSession(getStoredUser());
    };
    syncUser();

    // Verify session with server endpoint /api/auth/me
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setUserSession(data.user);
          try {
            localStorage.setItem('peekly_user', JSON.stringify(data.user));
            localStorage.setItem('peekly_auth', JSON.stringify(data.user));
          } catch {}
          if (new URLSearchParams(window.location.search).get('auth') === 'success') {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
      })
      .catch(() => {});

    window.addEventListener('storage', syncUser);
    window.addEventListener('focus', syncUser);
    window.addEventListener('peekly_user_updated', syncUser);
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('focus', syncUser);
      window.removeEventListener('peekly_user_updated', syncUser);
    };
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
    setUserSession(null);
    if (onGoHome) onGoHome();
    else window.location.href = '/';
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (installDropdownRef.current && !installDropdownRef.current.contains(e.target as Node)) {
        setInstallDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
        setInstallDropdownOpen(false);
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 min-h-[64px] sm:min-h-[80px] bg-black/80 backdrop-blur-md border-b border-[#1A1A1F] pt-[env(safe-area-inset-top)] transition-all">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 min-h-[64px] sm:min-h-[80px] flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div
          onClick={() => {
            if (onGoHome) onGoHome();
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 h-12 group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (onGoHome) onGoHome();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="Peekly Home"
        >
          <PeeklyLogo
            size={28}
            className="h-7 w-auto sm:h-8 sm:w-auto md:h-9 md:w-auto text-white group-hover:text-[#FF5500] transition-colors duration-150 shrink-0"
          />
          <span className="font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-wider text-white leading-none select-none">
            PEEKLY
          </span>
        </div>

        {/* Right: Navigation, Auth & Install CTA */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 shrink-0">
          {/* Changelog Link */}
          <button
            type="button"
            onClick={() => {
              if (onOpenChangelog) onOpenChangelog();
            }}
            className="group inline-flex items-center gap-1.5 font-sans text-xs md:text-[13px] font-normal text-neutral-400 hover:text-white leading-none whitespace-nowrap transition-colors duration-150 cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0 active:scale-95"
            aria-label={t.nav.changelog}
          >
            <span className="font-mono text-white flex items-center leading-none">
              <span>&gt;</span>
              <span className="inline-block text-white animate-terminal-blink">_</span>
            </span>
            <span className="hidden sm:inline text-neutral-400 group-hover:text-white transition-colors leading-none">
              {t.nav.changelog}
            </span>
          </button>

          {/* Language Selector */}
          <div className="relative inline-flex items-center shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="group inline-flex items-center gap-1.5 font-sans text-xs md:text-[13px] font-normal text-neutral-400 hover:text-white leading-none whitespace-nowrap transition-colors duration-150 cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0 active:scale-95"
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
            >
              <LanguageIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
              <span className="sm:hidden font-mono uppercase font-medium leading-none">{currentLangObj.code}</span>
              <span className="hidden sm:inline leading-none">{currentLangObj.name}</span>
              <ChevronDown
                className={`w-3 h-3 shrink-0 text-neutral-500 group-hover:text-white transition-transform duration-150 ${
                  langDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Language dropdown menu */}
            {langDropdownOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-2 w-max bg-[#090909] border border-[#1A1A1F] rounded-none shadow-2xl flex flex-col z-50"
              >
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={isSelected}
                      type="button"
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 font-sans text-xs md:text-[13px] leading-none whitespace-nowrap rounded-none transition-colors duration-150 border-0 cursor-pointer ${
                        isSelected
                          ? 'bg-white/[0.12] text-white font-medium'
                          : 'bg-transparent text-neutral-400 font-normal hover:bg-white/[0.08] hover:text-white'
                      }`}
                    >
                      {lang.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Profile Trigger & Dropdown */}
          {userSession ? (
            <div className="relative inline-flex items-center shrink-0" ref={userDropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-expanded={userDropdownOpen}
                aria-haspopup="menu"
                aria-label="User account menu"
                className="group flex items-center gap-2 h-10 px-3 bg-[#090909] hover:bg-white/[0.06] border border-[#222228] hover:border-white text-xs transition-all rounded-none cursor-pointer focus-visible:ring-1 focus-visible:ring-white shrink-0"
              >
                {/* Avatar / Icon */}
                <div className="w-6 h-6 rounded-none bg-[#000000] border border-[#222228] overflow-hidden shrink-0 flex items-center justify-center">
                  {(userSession.avatar || userSession.picture) &&
                  !(userSession.avatar || userSession.picture)?.includes('default_avatar.png') ? (
                    <img
                      src={userSession.avatar || userSession.picture}
                      alt={userSession.nickname}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[#FFFFFF]" />
                  )}
                </div>

                {/* Nickname */}
                <span className="font-bold text-white text-xs max-w-[120px] truncate leading-none">
                  {userSession.nickname}
                </span>

                {/* Dropdown Chevron */}
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 text-neutral-400 group-hover:text-white transition-transform duration-150 ${
                    userDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  role="menu"
                  aria-label="User Account Options"
                  className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#090909] border border-[#1A1A1F] rounded-none shadow-2xl p-4 flex flex-col gap-3.5 z-50 animate-fade-in"
                >
                  {/* Profile Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-[#000000] border border-[#222228] overflow-hidden shrink-0 flex items-center justify-center">
                      {(userSession.avatar || userSession.picture) &&
                      !(userSession.avatar || userSession.picture)?.includes('default_avatar.png') ? (
                        <img
                          src={userSession.avatar || userSession.picture}
                          alt={userSession.nickname}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <User className="w-5 h-5 text-[#FFFFFF]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white text-sm truncate leading-snug">
                        {userSession.nickname}
                      </div>
                      {userSession.email && (
                        <div className="text-xs text-[#929292] truncate leading-snug">
                          {userSession.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FACEIT Integration: compact strict badge or full-width button */}
                  {userSession.faceit_connected || userSession.faceit_nickname ? (
                    <div className="border border-[#1A1A1F] bg-white/[0.03] px-3.5 py-2.5 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-[#929292]">
                        <FaceitLogo className="w-3.5 h-3.5 text-[#929292]" />
                        <span className="text-white font-medium">FACEIT</span>
                      </span>
                      <span className="text-white font-bold truncate max-w-[130px]">
                        {userSession.faceit_nickname || 'Connected'}
                      </span>
                    </div>
                  ) : (
                    <a
                      href="/api/auth/faceit/login"
                      className="btn-brand-interactive h-10 gap-2 no-underline"
                    >
                      <FaceitLogo className="w-3.5 h-3.5 shrink-0" />
                      <span>{isRu ? 'ПРИВЯЗАТЬ FACEIT' : 'LINK FACEIT ACCOUNT'}</span>
                    </a>
                  )}

                  {/* Divider */}
                  <div className="border-t border-[#1A1A1F] my-0.5" />

                  {/* Navigation Links: Exactly 2 Actions */}
                  <div className="flex flex-col gap-2">
                    {/* 1. My Profile (White Button) */}
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onOpenProfile) onOpenProfile();
                        else {
                          try {
                            history.pushState(null, '', '/profile');
                            window.dispatchEvent(new PopStateEvent('popstate'));
                          } catch {
                            window.location.href = '/profile';
                          }
                        }
                      }}
                      className="btn-brand-interactive h-10 gap-2"
                    >
                      <User className="w-3.5 h-3.5 shrink-0" />
                      <span>{isRu ? 'МОЙ ПРОФИЛЬ' : 'MY PROFILE'}</span>
                    </button>

                    {/* 2. Sign Out (Gray Button) */}
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLogout();
                      }}
                      className="btn-brand-signout h-10"
                    >
                      <span>{isRu ? 'ВЫЙТИ ИЗ АККАУНТА' : 'SIGN OUT'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="inline-flex items-center justify-center text-center h-10 px-5 sm:px-6 rounded-none bg-black text-white hover:border-white border border-[#222228] font-mono text-xs font-bold tracking-wider uppercase transition-colors shrink-0 shadow-sm cursor-pointer focus-visible:ring-1 focus-visible:ring-white"
              title="Sign in to Peekly"
            >
              <span>SIGN IN</span>
            </button>
          )}

          {/* Install Extension CTA Button & Dropdown */}
          <div className="relative inline-flex items-center shrink-0" ref={installDropdownRef}>
            <button
              type="button"
              onClick={() => setInstallDropdownOpen(!installDropdownOpen)}
              aria-expanded={installDropdownOpen}
              aria-haspopup="menu"
              aria-label="Install extension options"
              className="inline-flex items-center justify-center text-center h-10 px-4 sm:px-5 rounded-none btn-header-install font-mono text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg active:scale-95 shrink-0 focus-visible:ring-1 focus-visible:ring-white"
            >
              <span>{t.nav.install.toUpperCase()}</span>
            </button>

            {/* Browser Install Dropdown Menu */}
            {installDropdownOpen && (
              <div
                role="menu"
                aria-label="Supported Browsers"
                className="absolute right-0 top-full mt-2 w-52 sm:w-56 bg-[#090909] border border-[#1A1A1F] rounded-none shadow-2xl flex flex-col py-1 z-50"
              >
                {BROWSERS.map((browser) => (
                  <a
                    key={browser.id}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setInstallDropdownOpen(false)}
                    className="group flex items-center gap-3 px-3.5 py-2.5 text-white font-bold text-[13px] tracking-wide bg-transparent hover:bg-white/[0.08] transition-colors duration-100 cursor-pointer no-underline select-none rounded-none"
                  >
                    <span className="text-white group-hover:text-[#FF5500] transition-colors duration-100 shrink-0 flex items-center justify-center">
                      {browser.icon('w-[22px] h-[22px] shrink-0 fill-current')}
                    </span>
                    <span className="truncate">{browser.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
