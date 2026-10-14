import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LanguageIcon } from './LanguageIcon';
import { PeeklyLogo } from './PeeklyLogo';
import { translations, SUPPORTED_LANGUAGES } from '../translations';
import type { Language } from '../translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onGoHome?: () => void;
  onOpenChangelog?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange, onGoHome, onOpenChangelog }) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/45 border-b border-white/5 transition-all">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo (Eye turns #FF5500 on hover, PEEKLY stays purely white) */}
        <div
          onClick={() => {
            if (onGoHome) onGoHome();
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 sm:gap-3 md:gap-3.5 h-12 group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0"
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
            size={22}
            className="text-white group-hover:text-[#FF5500] transition-colors duration-150 shrink-0 sm:w-[26px] sm:h-[26px]" 
          />
          <span className="font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-wider text-white leading-none select-none">
            PEEKLY
          </span>
        </div>

        {/* Right: Borderless Minimalist Navigation + Single CTA Accent */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0">
          
          {/* 1. Online: 0 (Flexible: stays visible on tablets and medium screens) */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 font-sans text-xs md:text-[13px] font-normal text-neutral-400 leading-none whitespace-nowrap select-none shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-soft-breath"></span>
            <span>{t.nav.statusLabel}</span>
            <span className="text-white font-mono text-xs md:text-[13px] font-medium leading-none">{t.nav.onlineCount}</span>
          </div>

          {/* 2. Changelog Link */}
          <button
            type="button"
            onClick={() => {
              if (onOpenChangelog) onOpenChangelog();
            }}
            className="group flex items-center gap-1 sm:gap-1.5 font-sans text-xs md:text-[13px] font-normal text-neutral-400 hover:text-white leading-none whitespace-nowrap transition-colors duration-150 cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0 active:scale-95"
            aria-label={t.nav.changelog}
          >
            <span className="font-mono text-white flex items-center">
              <span>&gt;</span>
              <span className="inline-block text-white animate-terminal-blink">_</span>
            </span>
            <span className="hidden sm:inline text-neutral-400 group-hover:text-white transition-colors">{t.nav.changelog}</span>
          </button>

          {/* 3. Language Selector */}
          <div className="relative inline-flex items-center shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="group flex items-center gap-1 sm:gap-1.5 font-sans text-xs md:text-[13px] font-normal text-neutral-400 hover:text-white leading-none whitespace-nowrap transition-colors duration-150 py-1 cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0 active:scale-95"
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
            >
              <LanguageIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
              <span className="sm:hidden font-mono uppercase font-medium">{currentLangObj.code}</span>
              <span className="hidden sm:inline">{currentLangObj.name}</span>
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

          {/* 4. Install Extension CTA Button (Visible on tablets and medium screens with responsive padding & typography) */}
          <a
            href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center justify-center text-center h-8 sm:h-9 px-2.5 sm:px-3 md:px-4 lg:px-5 rounded-none btn-header-install font-sans font-bold text-[10px] sm:text-[11px] md:text-xs tracking-wider uppercase cursor-pointer shadow-lg active:scale-95 ml-0.5 sm:ml-1 md:ml-2 shrink-0 focus-visible:ring-1 focus-visible:ring-white"
          >
            <span>{t.nav.install.toUpperCase()}</span>
          </a>

        </div>

      </div>
    </header>
  );
};
