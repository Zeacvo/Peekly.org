import React, { useEffect } from 'react';
import type { Language } from '../translations';
import { notFoundTranslations } from '../data/notFoundTranslations';
import { authErrorTranslations } from '../data/authErrorTranslations';

interface AuthErrorPageProps {
  status?: string;
  errorMessage?: string;
  currentLang?: Language;
  onBack: () => void;
}

export const AuthErrorPage: React.FC<AuthErrorPageProps> = ({
  status = '400',
  errorMessage,
  currentLang = 'en',
  onBack,
}) => {
  const notFoundT = notFoundTranslations[currentLang] || notFoundTranslations.en;
  const authT = authErrorTranslations[currentLang] || authErrorTranslations.en;
  const isRtl = currentLang === 'ar';

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${status} — Peekly for FACEIT`;
    return () => {
      document.title = prevTitle;
    };
  }, [status, currentLang]);

  // Determine description: if specific error was passed and it's not the default code missing string
  const isDefaultMissing = !errorMessage || errorMessage === 'Missing required authorization code parameter.';
  const displayDescription = isDefaultMissing ? authT.description : errorMessage;

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:pt-28 pb-16 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center flex-1 z-10 animate-apple-reveal font-sans text-center my-auto min-h-[60vh]"
    >
      {/* 1. Solid White Hero Error Status Headline */}
      <h1 
        className="text-7xl sm:text-8xl md:text-9xl lg:text-[140px] font-black tracking-tight text-white leading-none select-none mb-6 drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]"
        style={{ letterSpacing: '-0.04em' }}
      >
        {status}
      </h1>

      {/* 2. Localized Description text under status */}
      <p className="text-[15px] sm:text-[16px] text-[#8b8e96] max-w-md mx-auto leading-relaxed mb-8 select-text font-sans">
        {displayDescription}
      </p>

      {/* 3. Localized Action Button with link/action to home */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 bg-white text-black font-sans text-xs sm:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-[#FF5500] hover:text-black hover:border-white transition-colors duration-150 cursor-pointer shadow-2xl active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
      >
        <span>{authT.button || notFoundT.button}</span>
      </button>
    </div>
  );
};

export default AuthErrorPage;
