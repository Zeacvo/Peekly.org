import React from 'react';
import { translations } from '../translations';
import type { Language } from '../translations';
import { HeroCtaButtons } from './HeroCtaButtons';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang] || translations.en;

  return (
    <section className="relative pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-14 min-h-[calc(100vh-13rem)] sm:min-h-[calc(100vh-13.5rem)] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center z-10">

      {/* 1. Dominant Tactical Headline H1 */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.04] mb-6 drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] break-words">
        {t.hero.title}
      </h1>

      {/* 2. Subtitle */}
      <p className="text-base sm:text-xl md:text-2xl font-normal text-[#929292] tracking-normal leading-relaxed max-w-3xl mb-8 sm:mb-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
        {t.hero.subtitle}
      </p>

      {/* 3. Multi-Browser CTA Buttons Dock */}
      <HeroCtaButtons />

    </section>
  );
};

