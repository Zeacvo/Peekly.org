import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../translations';
import { InstallExtensionButton } from './InstallExtensionButton';
import { changelogReleases, getLocalizedVersionTitle } from '../data/changelogData';

interface ChangelogPageProps {
  currentLang: Language;
  onBack: () => void;
}

const backLabelMap: Record<Language, string> = {
  en: 'Back to home',
  da: 'Tilbage til forsiden',
  de: 'Zurück zur Startseite',
  es: 'Volver al inicio',
  fr: 'Retour à l\'accueil',
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

export const ChangelogPage: React.FC<ChangelogPageProps> = ({ currentLang, onBack }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [openVersions, setOpenVersions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    const titleText = currentLang === 'ru' ? 'История версий' : 'Changelog';
    document.title = `${titleText} — Peekly for FACEIT`;
    return () => {
      document.title = prevTitle;
    };
  }, [currentLang]);

  useEffect(() => {
    const TOTAL_DURATION = 3500; // 3.5 seconds smooth deployment
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(TOTAL_DURATION, now - start);
      setElapsedTime(elapsed / 1000); // 0.0 to 3.5

      if (elapsed < TOTAL_DURATION) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const tLang = translations[currentLang] || translations.en;
  const backLabel = backLabelMap[currentLang] || backLabelMap.en;

  const t = elapsedTime;

  // 11 modules visual architecture map (strictly language-agnostic monochrome)
  const visualModules = [
    // Group 0: Chrome Web Store Release (1 row)
    { id: 0, group: 0, y: 60, w1: 96, w2: 120 },
    // Group 1: Matchroom (5 rows)
    { id: 1, group: 1, y: 75, w1: 76, w2: 124 },
    { id: 2, group: 1, y: 89, w1: 88, w2: 108 },
    { id: 3, group: 1, y: 103, w1: 68, w2: 136 },
    { id: 4, group: 1, y: 117, w1: 82, w2: 116 },
    { id: 5, group: 1, y: 131, w1: 72, w2: 126 },
    // Group 2: Automation (2 rows)
    { id: 6, group: 2, y: 153, w1: 80, w2: 118 },
    { id: 7, group: 2, y: 167, w1: 86, w2: 110 },
    // Group 3: Profile (3 rows)
    { id: 8, group: 3, y: 189, w1: 90, w2: 114 },
    { id: 9, group: 3, y: 203, w1: 66, w2: 134 },
    { id: 10, group: 3, y: 217, w1: 74, w2: 122 },
  ];

  const toggleVersion = (version: string) => {
    setOpenVersions((prev) => ({
      ...prev,
      [version]: !prev[version],
    }));
  };

  return (
    <main className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-stretch z-10 animate-apple-reveal">
      
      {/* 1. Back Navigation Button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={onBack}
          className="h-10 px-4 sm:px-5 text-sm font-semibold border border-transparent bg-white text-black hover:bg-[#FF5500] hover:border-white transition-all duration-150 rounded-none inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2] shrink-0" />
          <span>{backLabel}</span>
        </button>
      </div>

      {/* 2. Hero Animation Block (Exact Replica of Window Shell from Cards 04 & 05) */}
      <div className="w-full bg-[#0d0d0d] border border-white/20 overflow-hidden mb-10 shadow-2xl relative" style={{ contain: 'layout' }}>
        <div className="h-72 sm:h-96 min-h-[288px] sm:min-h-[384px] w-full flex items-center justify-center p-4 bg-[#0d0d0d]">
          <svg 
            role="img"
            aria-label="Peekly Changelog Module Architecture Diagram"
            className="w-full h-full max-w-xl object-contain" 
            viewBox="0 0 440 260" 
            fill="none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            {/* Unified Window Shell (exact match to cards 04 & 05) */}
            <rect x="25" y="20" width="390" height="220" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            
            {/* Window Header Line */}
            <line x1="25" y1="46" x2="415" y2="46" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            
            {/* Three identical grey dots on left (● ● ●: same size r=3.5, gap=13, fill #555555) */}
            <circle cx="41" cy="33" r="3.5" fill="#555555" />
            <circle cx="54" cy="33" r="3.5" fill="#555555" />
            <circle cx="67" cy="33" r="3.5" fill="#555555" />

            {/* Group Separator Dividers (Between Matchroom, Automation, Profile) */}
            <line x1="36" y1="143" x2="404" y2="143" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="36" y1="179" x2="404" y2="179" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="1" />

            {/* 11 Visual Architecture Modules */}
            {visualModules.map((mod, idx) => {
              const rowStart = 0.15 + idx * 0.14;
              const rowProgress = Math.max(0, Math.min(1, (t - rowStart) / 0.20));
              const activeEase = 1 - Math.pow(1 - rowProgress, 3);
              const isActive = rowProgress > 0.05;

              return (
                <g key={mod.id} opacity={0.3 + 0.7 * activeEase}>
                  <circle 
                    cx="41" 
                    cy={mod.y + 3} 
                    r="2" 
                    fill={isActive ? "#737373" : "#262626"} 
                  />
                  <rect 
                    x="52" 
                    y={mod.y + 0.5} 
                    width={mod.w1} 
                    height="5" 
                    fill={isActive ? "#ffffff" : "#222222"} 
                    opacity={isActive ? 0.9 : 0.3} 
                  />
                  <rect 
                    x={52 + mod.w1 + 8} 
                    y={mod.y + 1} 
                    width={mod.w2} 
                    height="4" 
                    fill={isActive ? "#555555" : "#1a1a1a"} 
                    opacity={isActive ? 0.8 : 0.25} 
                  />
                  <rect 
                    x="374" 
                    y={mod.y + 1} 
                    width="28" 
                    height="4" 
                    fill={isActive ? "#444444" : "#181818"} 
                    opacity={isActive ? 0.7 : 0.2} 
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 3. Text Content — ровно 100% ширины контейнера */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* История обновлений Peekly */}
        <h1 className="w-full max-w-none text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          {tLang.changelogPage.title}
        </h1>

        {/* Вводный текст описания */}
        <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-[#929292] leading-relaxed text-justify mb-8 cursor-text select-text">
          {tLang.changelogPage.desc}
        </p>

        {/* Collapsible Versions Accordion */}
        <div className="w-full flex flex-col gap-4 mt-2 font-sans">
          {changelogReleases.map((release) => {
            const isOpen = !!openVersions[release.version];
            const title = getLocalizedVersionTitle(release.version, currentLang);
            const items = release.getItems(currentLang);

            return (
              <div
                key={release.version}
                className="w-full bg-[#090909] border border-[#1A1A1F] hover:border-white/20 transition-all rounded-none"
              >
                {/* Header Toggle Row */}
                <button
                  type="button"
                  onClick={() => toggleVersion(release.version)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-base md:text-lg font-bold tracking-tight text-white group-hover:text-[#FF5500] transition-colors">
                      {title}
                    </span>
                    {release.version === '1.1.0' && (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white rounded-none border border-white/20 select-none">
                        {currentLang === 'ru' ? 'СВЕЖИЙ РЕЛИЗ' : 'LATEST'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[#929292] group-hover:text-[#FF5500] transition-colors">
                    <span className="text-xs font-mono hidden sm:inline text-[#929292] select-none">
                      {items.length} {currentLang === 'ru' ? 'пунктов' : 'items'}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 stroke-[2] ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Collapsible Items List */}
                {isOpen && (
                  <div className="px-5 pb-6 pt-3 border-t border-[#1A1A1F] space-y-3 font-sans">
                    {items.map((item, idx) => (
                      <div key={idx} className="w-full flex items-baseline gap-2.5 cursor-text select-text">
                        <span className="font-mono text-sm md:text-[15px] font-bold text-[#929292] select-none shrink-0">
                          {item.num}
                        </span>
                        <span className="w-full font-sans text-sm md:text-[15px] font-normal text-[#929292] leading-relaxed text-justify">
                          <span className="text-white font-medium">{item.title}</span> — {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* 4. Bottom Prominent Action CTA Button with Browser Dropdown */}
      <div className="w-full flex justify-center mt-12 mb-16">
        <InstallExtensionButton currentLang={currentLang} />
      </div>

    </main>
  );
};
