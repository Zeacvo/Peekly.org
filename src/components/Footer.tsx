import React from 'react';
import { translations } from '../translations';
import type { Language } from '../translations';
import { PeeklyLogo } from './PeeklyLogo';

interface FooterProps {
  currentLang: Language;
  onOpenChangelog?: () => void;
  onGoHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenChangelog, onGoHome }) => {
  const t = translations[currentLang];

  return (
    <footer className="w-full bg-[#000000] border-t border-white/10 relative z-10 mt-0 py-8 sm:py-10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 text-xs text-neutral-500">
        
        {/* Left Column: Logo & Legal Disclaimer */}
        <div className="flex flex-col items-start text-left max-w-sm">
          <div 
            onClick={onGoHome}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (onGoHome) onGoHome();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="h-5 flex items-center space-x-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <PeeklyLogo size={14} className="group-hover:text-[#FF5500] transition-colors" />
            <span className="font-bold tracking-wider uppercase font-sans">Peekly</span>
          </div>
          <p className="text-left text-[11px] text-neutral-500 mt-2 leading-relaxed">
            {t.footer.disclaimer}
          </p>
        </div>

        {/* Right Column: Stacked Navigation Links (Strictly in a column) & Copyright */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right gap-2.5">
          {/* Row 1: Localized Changelog Link */}
          <button
            onClick={() => {
              if (onOpenChangelog) onOpenChangelog();
              else window.location.hash = '#changelog';
            }}
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 w-fit text-left md:text-right focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {t.footer.changelog || t.nav.changelog}
          </button>

          {/* Row 2: Chrome Web Store Link */}
          <a
            href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-neutral-400 hover:text-white transition-colors w-fit text-left md:text-right cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            Chrome Web Store
          </a>

          {/* Row 3: Copyright */}
          <div className="text-[11px] text-neutral-500 font-sans mt-1 whitespace-nowrap">
            © 2026 Peekly. {t.footer.allRightsReserved || t.footer.rights}
          </div>
        </div>

      </div>
    </footer>
  );
};
