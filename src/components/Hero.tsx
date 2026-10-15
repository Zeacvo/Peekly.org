import React from 'react';
import { translations } from '../translations';
import type { Language } from '../translations';
import { ChromeLogo } from './ChromeLogo';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.en;

  return (
    <section className="relative pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:pt-40 md:pt-44 pb-24 sm:pb-36 md:pb-40 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] min-h-[580px] w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center z-10">

      {/* 1. Dominant Tactical Headline H1 */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.08] mb-5 drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] break-words">
        {t.hero.title}
      </h1>

      {/* 2. Subtitle */}
      <p className="text-sm sm:text-lg md:text-xl font-normal text-neutral-400 tracking-normal leading-relaxed max-w-2xl mb-6 sm:mb-7 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
        {t.hero.subtitle}
      </p>

      {/* 3. Massive Prominent CTA Action Button */}
      <div className="flex flex-col items-center w-full sm:w-auto">
        <a
          href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 sm:gap-3.5 px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-black font-sans text-xs md:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-[#FF5500] hover:text-black hover:border-white transition-colors duration-150 btn-chrome-action cursor-pointer shadow-2xl active:scale-95 w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          {/* Large Google Chrome Vector Icon */}
          <ChromeLogo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0 fill-current" />
          <span>{t.hero.cta.toUpperCase()}</span>
        </a>
      </div>

    </section>
  );
};
