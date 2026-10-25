import React, { useEffect } from 'react';
import type { Language } from '../translations';
import { notFoundTranslations } from '../data/notFoundTranslations';

interface NotFoundPageProps {
  currentLang?: Language;
  onBack: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ currentLang = 'en', onBack }) => {
  const t = notFoundTranslations[currentLang] || notFoundTranslations.en;
  const isRtl = currentLang === 'ar';

  useEffect(() => {
    const prevTitle = document.title;
    document.title = '404 — Peekly for FACEIT';
    return () => {
      document.title = prevTitle;
    };
  }, [currentLang]);

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:pt-28 pb-16 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center flex-1 z-10 animate-apple-reveal font-sans text-center my-auto min-h-[60vh]"
    >
      {/* 1. Solid White Hero 404 Headline */}
      <h1 
        className="text-7xl sm:text-8xl md:text-9xl lg:text-[140px] font-black tracking-tight text-white leading-none select-none mb-6 drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]"
        style={{ letterSpacing: '-0.04em' }}
      >
        404
      </h1>

      {/* 2. Localized Description text under 404 */}
      <p className="text-[15px] sm:text-[16px] text-[#8b8e96] max-w-md mx-auto leading-relaxed mb-8 select-text font-sans">
        {t.description}
      </p>

      {/* 3. Localized Action Button with link/action to home */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 bg-white text-black font-sans text-xs sm:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-[#FF5500] hover:text-black hover:border-white transition-colors duration-150 cursor-pointer shadow-2xl active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
      >
        <span>{t.button}</span>
      </button>
    </div>
  );
};

export default NotFoundPage;
