import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LanguageIcon } from './LanguageIcon';
import { PeeklyLogo } from './PeeklyLogo';
import { translations, SUPPORTED_LANGUAGES } from '../translations';
import type { Language } from '../translations';
import { BROWSERS } from '../constants/browsers';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onGoHome?: () => void;
  onOpenChangelog?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange, onGoHome, onOpenChangelog }) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [installDropdownOpen, setInstallDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const installDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang] || translations.en;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (installDropdownRef.current && !installDropdownRef.current.contains(e.target as Node)) {
        setInstallDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
        setInstallDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 min-h-[64px] sm:min-h-[80px] bg-black/90 backdrop-blur-md border-b border-white/10 pt-[env(safe-area-inset-top)] transition-all">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 h-16 sm:h-20 min-h-[64px] sm:min-h-[80px] flex items-center justify-between">
        
        {/* Left: Brand Logo (Eye turns #FF5500 on hover, PEEKLY stays purely white) */}
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

        {/* Right: Borderless Minimalist Navigation with Unified 24px Gap */}
        <div className="flex items-center gap-6 shrink-0">
          
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
            <span className="hidden sm:inline text-neutral-400 group-hover:text-white transition-colors leading-none">{t.nav.changelog}</span>
          </button>

          {/* 3. Language Selector */}
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
              <ChevronDown className={`w-3 h-3 shrink-0 text-neutral-500 group-hover:text-white transition-transform duration-150 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language dropdown menu (Right-aligned, no scroll, clean language names only) */}
            {langDropdownOpen && (
              <div 
                role="listbox"
                className="absolute right-0 top-full mt-2 w-max bg-[#0D0D0D] border border-white/15 rounded-none shadow-2xl flex flex-col z-50"
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

          {/* 4. Install Extension CTA Button & Dropdown (Accent margin before button: 24px gap + 8px ml = 32px) */}
          <div className="relative inline-flex items-center shrink-0 ml-2" ref={installDropdownRef}>
            <button
              type="button"
              onClick={() => setInstallDropdownOpen(!installDropdownOpen)}
              aria-expanded={installDropdownOpen}
              aria-haspopup="menu"
              aria-label="Install extension options"
              className="hidden sm:inline-flex items-center justify-center text-center h-8 sm:h-9 px-3 sm:px-3.5 md:px-4 lg:px-5 rounded-none btn-header-install font-sans font-bold text-[10px] sm:text-[11px] md:text-xs tracking-wider uppercase cursor-pointer shadow-lg active:scale-95 shrink-0 focus-visible:ring-1 focus-visible:ring-white"
            >
              <span>{t.nav.install.toUpperCase()}</span>
            </button>

            {/* Browser Install Dropdown Menu */}
            {installDropdownOpen && (
              <div
                role="menu"
                aria-label="Supported Browsers"
                className="absolute right-0 top-full mt-2 w-52 sm:w-56 bg-[#0D0D0D] border border-white/15 rounded-none shadow-2xl flex flex-col py-1 z-50"
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
