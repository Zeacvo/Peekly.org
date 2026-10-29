import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import type { Language } from '../translations';
import { translations } from '../translations';
import { ChromeLogo } from './ChromeLogo';
import { termsTranslations } from '../data/termsTranslations';

interface TermsPageProps {
  currentLang: Language;
  onBack: () => void;
}

const backLabelMap: Record<Language, string> = {
  en: 'Back to home',
  da: 'Tilbage til forsiden',
  de: 'Zurück zur Startseite',
  es: 'Volver al inicio',
  fr: "Retour à l'accueil",
  pl: 'Powrót do strony głównej',
  pt: 'Voltar ao início',
  fi: 'Takaisin etusivulle',
  sv: 'Tillbaka till startsidan',
  tr: 'Ana sayfaya dön',
  ru: 'Назад на главную',
  uk: 'Назад на головну',
  ar: 'العودة إلى الصفحة الرئيسية',
  ja: 'ホームに戻る',
  ko: '홈으로 돌아가기',
  zh: '返回首页',
};

export const TermsPage: React.FC<TermsPageProps> = ({ currentLang, onBack }) => {
  const t = termsTranslations[currentLang] || termsTranslations.en;
  const isRtl = currentLang === 'ar';
  const ctaLabel = (translations[currentLang] || translations.en).hero.cta.toUpperCase();

  // Synchronize document title
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${t.title} — Peekly for FACEIT`;
    return () => {
      document.title = prevTitle;
    };
  }, [t.title]);

  const backLabel = backLabelMap[currentLang] || backLabelMap.en;

  const renderBadge = (badgeText: string) => {
    const colonIndex = badgeText.indexOf(':') !== -1 ? badgeText.indexOf(':') : badgeText.indexOf('：');
    if (colonIndex !== -1) {
      const label = badgeText.slice(0, colonIndex + 1);
      const value = badgeText.slice(colonIndex + 1).trim();
      return (
        <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] border border-neutral-800 px-2.5 py-1 rounded-none">
          <span className="text-neutral-500 font-sans">{label}</span>
          <strong className="text-white font-medium">{value}</strong>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] border border-neutral-800 px-2.5 py-1 rounded-none text-neutral-300">
        {badgeText}
      </span>
    );
  };

  const renderSectionTitle = (fullTitle: string) => {
    const dashIndex = fullTitle.indexOf(' — ');
    if (dashIndex !== -1) {
      const main = fullTitle.slice(0, dashIndex);
      const sub = fullTitle.slice(dashIndex + 3);
      return (
        <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
          <span>{main}</span>
          <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
          <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
            {sub}
          </span>
        </h2>
      );
    }
    return (
      <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
        <span>{fullTitle}</span>
      </h2>
    );
  };

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-16 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-stretch z-10 animate-apple-reveal font-sans"
    >
      {/* 1. Back Navigation Button */}
      <div className={`w-full flex ${isRtl ? 'justify-end' : 'justify-start'} mb-6`}>
        <button
          onClick={onBack}
          className="h-10 px-4 sm:px-5 text-sm font-semibold border border-transparent bg-white text-black hover:bg-neutral-200 hover:border-white transition-all duration-150 rounded-none inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <ChevronLeft className={`w-4 h-4 stroke-[2] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{backLabel}</span>
        </button>
      </div>

      {/* 2. Text Content — ровно 100% ширины контейнера по образцу /privacy */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">
        {/* H1 Heading */}
        <h1 className="w-full max-w-none text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          {t.title}
        </h1>

        {/* Subtitle */}
        <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          {t.subtitle}
        </p>

        {/* Metadata Badges */}
        <div className="w-full max-w-none flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-400 font-mono mb-10 select-text">
          {renderBadge(t.badgeProject)}
          {renderBadge(t.badgeDate)}
        </div>

        {/* Sections 01–06 with Linear Header */}
        <div className="w-full max-w-none space-y-8 sm:space-y-10 font-sans">
          {/* Section 01 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                {t.sec1_num}
              </span>
              {renderSectionTitle(t.sec1_title)}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sec1_body}</p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                {t.sec2_num}
              </span>
              {renderSectionTitle(t.sec2_title)}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sec2_body}</p>
            </div>
          </div>

          {/* Section 03 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                {t.sec3_num}
              </span>
              {renderSectionTitle(t.sec3_title)}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sec3_lead}</p>
              <div className="space-y-3 my-2">
                <div className="space-y-1">
                  <strong className="font-medium text-white block text-sm md:text-[15px]">
                    {t.sec3_p1_title}
                  </strong>
                  <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-0">
                    {t.sec3_p1_desc}
                  </p>
                </div>
                <div className="space-y-1">
                  <strong className="font-medium text-white block text-sm md:text-[15px]">
                    {t.sec3_p2_title}
                  </strong>
                  <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-0">
                    {t.sec3_p2_desc}
                  </p>
                </div>
                <div className="space-y-1">
                  <strong className="font-medium text-white block text-sm md:text-[15px]">
                    {t.sec3_p3_title}
                  </strong>
                  <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-0">
                    {t.sec3_p3_desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 04 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                {t.sec4_num}
              </span>
              {renderSectionTitle(t.sec4_title)}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sec4_body}</p>
            </div>
          </div>

          {/* Section 05 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                {t.sec5_num}
              </span>
              {renderSectionTitle(t.sec5_title)}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sec5_body}</p>
            </div>
          </div>

          {/* Section 06 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                {t.sec6_num}
              </span>
              {renderSectionTitle(t.sec6_title)}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sec6_body}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Prominent Action CTA Button (Matches Changelog & Privacy 1:1) */}
      <div className="w-full flex justify-center mt-12 mb-12">
        <a
          href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 sm:gap-3.5 px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-black font-sans text-xs md:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-[#FF5500] hover:text-black hover:border-white transition-colors duration-150 btn-chrome-action cursor-pointer shadow-2xl active:scale-95 w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          <ChromeLogo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0 fill-current" />
          <span>{ctaLabel}</span>
        </a>
      </div>
    </div>
  );
};

export default TermsPage;
