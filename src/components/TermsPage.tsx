import React, { useEffect, useState } from 'react';
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
  const [elapsedTime, setElapsedTime] = useState<number>(0);

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

  // Intro animation timer (smooth 3.2s kinematic sequence, then freezes permanently in static state)
  useEffect(() => {
    const TOTAL_DURATION = 3200; // 3.2 seconds intro
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(TOTAL_DURATION, now - start);
      setElapsedTime(elapsed / 1000); // 0.0 to 3.2

      if (elapsed < TOTAL_DURATION) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const backLabel = backLabelMap[currentLang] || backLabelMap.en;
  const isFinal = elapsedTime >= 3.2;
  const animTime = elapsedTime;

  // Staggered easing curves matching Feature Cards 01-10 design code
  const containerProgress = isFinal ? 1 : Math.min(1, animTime / 0.4);
  const containerEase = isFinal ? 1 : 1 - Math.pow(1 - containerProgress, 3);
  const containerScale = 0.98 + 0.02 * containerEase;

  const block1Progress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 0.2) / 0.6));
  const block1Ease = isFinal ? 1 : 1 - Math.pow(1 - block1Progress, 3);
  const block1TranslateY = (1 - block1Ease) * 8;

  const flow1Progress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 0.6) / 0.6));
  const flow1Ease = isFinal ? 1 : 1 - Math.pow(1 - flow1Progress, 3);

  const block2Progress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 0.9) / 0.7));
  const block2Ease = isFinal ? 1 : 1 - Math.pow(1 - block2Progress, 3);
  const block2TranslateY = (1 - block2Ease) * 8;

  const blockStrikeProgress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 1.5) / 0.7));
  const blockStrikeEase = isFinal ? 1 : 1 - Math.pow(1 - blockStrikeProgress, 3);
  const strikeScale = isFinal ? 1 : (blockStrikeProgress > 0 ? 0.6 + 0.4 * blockStrikeEase : 0);

  const block3Progress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 1.8) / 0.7));
  const block3Ease = isFinal ? 1 : 1 - Math.pow(1 - block3Progress, 3);

  const accentProgress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 2.2) / 0.7));
  const accentEase = isFinal ? 1 : 1 - Math.pow(1 - accentProgress, 2);

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

      {/* 2. Top Card: Authentic 1:1 Feature Cards Wireframe Infographic (Client -> Sandbox [ ] -> Blocked ✕ External) */}
      <div className="w-full bg-[#0a0a0a] border border-[#262626] rounded-none overflow-hidden mb-10 shadow-2xl relative" style={{ contain: 'layout' }}>
        <div className="h-72 sm:h-96 min-h-[288px] sm:min-h-[384px] w-full flex items-center justify-center p-3 sm:p-6 bg-[#0a0a0a]">
          <svg 
            role="img"
            aria-label="Peekly Client-Side Sandbox and Terms Architecture Diagram"
            className="w-full h-full max-w-3xl object-contain select-none pointer-events-none" 
            viewBox="0 0 540 220" 
            fill="none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <rect width="540" height="220" fill="#0a0a0a" />

            {/* Overall Animated Container (opacity: 0 -> 1, scale: 0.98 -> 1) */}
            <g 
              opacity={containerEase} 
              transform={`scale(${containerScale})`}
              style={{ transformOrigin: '270px 110px' }}
            >
              {/* Subtle Architectural Horizontal Axis Guides */}
              <line x1="20" y1="20" x2="520" y2="20" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
              <line x1="20" y1="200" x2="520" y2="200" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />

              {/* 1. CLIENT BLOCK (Browser / Extension) */}
              <g 
                opacity={block1Ease} 
                transform={`translate(0, ${block1TranslateY})`}
              >
                <rect x="24" y="32" width="144" height="156" fill="#0d0d0d" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
                <line x1="24" y1="56" x2="168" y2="56" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="36" cy="44" r="3" fill="#555555" />
                <circle cx="46" cy="44" r="3" fill="#555555" />
                <circle cx="56" cy="44" r="3" fill="#555555" />
                <rect x="68" y="41" width="46" height="6" fill="#222222" />
                <rect x="144" y="41" width="14" height="6" fill="#ffffff" opacity={accentEase} />

                <g transform="translate(36, 68)">
                  <rect width="28" height="28" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <circle cx="14" cy="11" r="4" fill="#777777" />
                  <path d="M 7 23 C 7 17 10 16 14 16 C 18 16 21 17 21 23 Z" fill="#777777" />
                </g>

                <rect x="72" y="72" width="82" height="7" fill="#ffffff" />
                <rect x="72" y="85" width="50" height="5" fill="#4a4a4a" />
                <line x1="36" y1="104" x2="156" y2="104" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                <g transform="translate(36, 112)">
                  <rect x="0" y="0" width="22" height="6" fill="#ffffff" />
                  <rect x="28" y="0" width="48" height="6" fill="#444444" />
                  <rect x="82" y="0" width="38" height="6" fill="#2a2a2a" />
                  <rect x="0" y="12" width="22" height="6" fill="#666666" />
                  <rect x="28" y="12" width="40" height="6" fill="#333333" />
                  <rect x="82" y="12" width="38" height="6" fill="#222222" />
                  <rect x="0" y="24" width="22" height="6" fill="#444444" />
                  <rect x="28" y="24" width="54" height="6" fill="#2a2a2a" />
                  <rect x="82" y="24" width="38" height="6" fill="#1c1c1c" />
                </g>

                <rect x="36" y="152" width="120" height="24" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <path d="M 44 167 L 48 164 L 44 161" stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="54" y="161" width="88" height="6" fill="#ffffff" />
              </g>

              {/* PIPELINE 1 -> 2 (Client to Local Sandbox Flow) */}
              <g opacity={flow1Ease}>
                <line x1="168" y1="78" x2="198" y2="78" stroke="#333333" strokeWidth="1" strokeDasharray="3 3" />
                <polygon points="197,75 203,78 197,81" fill="#333333" />
                <line x1="168" y1="110" x2="200" y2="110" stroke="#ffffff" strokeWidth="1.5" />
                <polygon points="199,106 206,110 199,114" fill="#ffffff" />
                <line x1="168" y1="164" x2="198" y2="164" stroke="#333333" strokeWidth="1" strokeDasharray="3 3" />
                <polygon points="197,161 203,164 197,167" fill="#333333" />

                {!isFinal && flow1Progress > 0 && (
                  <circle cx={168 + flow1Progress * 32} cy="110" r="3" fill="#ffffff" />
                )}
              </g>

              {/* 2. ISOLATION BLOCK (Local Sandbox in Reticle Brackets) */}
              <g 
                opacity={block2Ease} 
                transform={`translate(0, ${block2TranslateY})`}
              >
                <path 
                  d="M 218 36 L 206 36 L 206 184 L 218 184" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="square" 
                  strokeLinejoin="miter" 
                />
                <path 
                  d="M 322 36 L 334 36 L 334 184 L 322 184" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="square" 
                  strokeLinejoin="miter" 
                />

                <rect x="212" y="42" width="116" height="136" fill="#0d0d0d" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <rect x="222" y="52" width="62" height="7" fill="#ffffff" />
                <rect x="296" y="52" width="22" height="7" fill="#242424" />
                <circle cx="312" cy="55.5" r="2" fill="#ffffff" opacity={accentEase} />
                <line x1="222" y1="67" x2="318" y2="67" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                <rect x="222" y="74" width="40" height="26" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <rect x="228" y="80" width="28" height="5" fill="#888888" />
                <rect x="228" y="89" width="18" height="4" fill="#444444" />

                <rect x="278" y="74" width="40" height="26" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <rect x="284" y="80" width="28" height="5" fill="#ffffff" />
                <rect x="284" y="89" width="20" height="4" fill="#666666" />

                <line x1="264" y1="83" x2="274" y2="83" stroke="#ffffff" strokeWidth="1.2" />
                <polygon points="272,81 276,83 272,85" fill="#ffffff" />
                <line x1="266" y1="91" x2="276" y2="91" stroke="#888888" strokeWidth="1.2" />
                <polygon points="268,89 264,91 268,93" fill="#888888" />

                <rect x="222" y="108" width="96" height="14" fill="#121212" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <rect x="228" y="113" width="50" height="4" fill="#ffffff" />
                <rect x="286" y="113" width="26" height="4" fill="#555555" />

                <rect x="222" y="126" width="96" height="14" fill="#121212" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <rect x="228" y="131" width="38" height="4" fill="#888888" />
                <rect x="274" y="131" width="38" height="4" fill="#333333" />

                <rect x="222" y="148" width="96" height="20" fill="#ffffff" />
                <rect x="230" y="156" width="56" height="4" fill="#000000" />
                <rect x="292" y="154" width="18" height="8" fill="#000000" />
              </g>

              {/* 3. BLOCKED OUTGOING GATEWAY */}
              <g opacity={blockStrikeEase}>
                <line x1="334" y1="110" x2="356" y2="110" stroke="#666666" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="368" y1="110" x2="384" y2="110" stroke="#333333" strokeWidth="1" strokeDasharray="2 3" />
                <polygon points="383,107 388,110 383,113" fill="#333333" />

                <rect x="348" y="70" width="28" height="10" fill="#181818" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <rect x="352" y="74" width="20" height="2" fill="#ffffff" />
                <rect x="359" y="86" width="6" height="48" fill="#ffffff" />

                <g 
                  transform={`scale(${strikeScale})`} 
                  style={{ transformOrigin: '362px 110px' }}
                >
                  <line x1="352" y1="100" x2="372" y2="120" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="square" />
                  <line x1="352" y1="120" x2="372" y2="100" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="square" />
                </g>

                <rect x="357" y="138" width="10" height="10" fill="#1a1a1a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <circle cx="362" cy="143" r="2" fill="#ffffff" />
              </g>

              {/* 4. REMOTE SERVERS BLOCK */}
              <g opacity={0.28 * block3Ease}>
                <rect x="390" y="32" width="126" height="156" fill="#070707" stroke="#333333" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="390" y1="56" x2="516" y2="56" stroke="#222222" strokeWidth="1" />
                <rect x="402" y="42" width="50" height="6" fill="#222222" />
                <circle cx="504" cy="45" r="2.5" fill="#222222" />

                <g transform="translate(402, 66)">
                  <rect x="0" y="0" width="102" height="22" fill="#0a0a0a" stroke="#1f1f1f" strokeWidth="1" />
                  <circle cx="10" cy="11" r="2.5" fill="#282828" />
                  <rect x="20" y="9" width="46" height="4" fill="#222222" />
                  <rect x="74" y="9" width="20" height="4" fill="#1a1a1a" />

                  <rect x="0" y="28" width="102" height="22" fill="#0a0a0a" stroke="#1f1f1f" strokeWidth="1" />
                  <circle cx="10" cy="39" r="2.5" fill="#282828" />
                  <rect x="20" y="37" width="38" height="4" fill="#222222" />
                  <rect x="68" y="37" width="26" height="4" fill="#1a1a1a" />

                  <rect x="0" y="56" width="102" height="22" fill="#0a0a0a" stroke="#1f1f1f" strokeWidth="1" />
                  <circle cx="10" cy="67" r="2.5" fill="#282828" />
                  <rect x="20" y="65" width="52" height="4" fill="#222222" />
                  <rect x="80" y="65" width="14" height="4" fill="#1a1a1a" />
                </g>

                <rect x="402" y="152" width="102" height="18" fill="#0c0c0c" stroke="#1a1a1a" strokeWidth="1" />
                <rect x="426" y="159" width="54" height="4" fill="#1a1a1a" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* 3. Text Content — ровно 100% ширины контейнера по образцу /privacy */}
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
