import React, { useEffect } from 'react';
import type { Language } from '../translations';
import { notFoundTranslations } from '../data/notFoundTranslations';
import { PeeklyLogo } from './PeeklyLogo';

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
      className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-16 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center flex-1 z-10 animate-apple-reveal font-sans text-center my-auto min-h-[65vh]"
    >
      {/* 1. Tactical Radar Ping & 404 Watermark Container */}
      <div className="relative flex items-center justify-center mb-8 select-none">
        {/* Massive 404 Background Typography in #141518 with subtle glow */}
        <div 
          className="text-8xl sm:text-9xl md:text-[160px] font-black font-sans tracking-tighter text-[#141518] leading-none select-none pointer-events-none drop-shadow-[0_0_35px_rgba(255,85,0,0.08)]"
          style={{ letterSpacing: '-0.06em' }}
        >
          404
        </div>

        {/* Central Tactical Radar Reticle & Peekly Crosshair overlaying 404 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Radar Ping Ripple (expanding orange circle) */}
          <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#FF5500]/40 animate-ping opacity-75" />
          
          {/* Radar Scanning Outer Ring */}
          <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-dashed border-[#FF5500]/30 animate-spin" style={{ animationDuration: '8s' }} />

          {/* Solid Tactical Target Hub */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0a0a0c] border border-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.4)] flex items-center justify-center relative z-10">
            <PeeklyLogo size={30} className="text-[#FF5500]" />
          </div>
        </div>
      </div>

      {/* 2. Localized Description text under radar */}
      <p className="text-[15px] sm:text-[16px] text-[#8b8e96] max-w-md mx-auto leading-relaxed mb-8 select-text font-sans">
        {t.description}
      </p>

      {/* 3. Localized Action Button with link/action to home */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-white text-black font-sans text-xs sm:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-[#FF5500] hover:text-black hover:border-white transition-colors duration-150 cursor-pointer shadow-2xl active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
      >
        <span>{t.button}</span>
      </button>
    </div>
  );
};

export default NotFoundPage;
