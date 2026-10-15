import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import type { Language } from '../translations';
import { privacyTranslations } from '../data/privacyTranslations';

interface PrivacyPageProps {
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

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ currentLang, onBack }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const t = privacyTranslations[currentLang] || privacyTranslations.en;
  const isRtl = currentLang === 'ar';

  // Synchronize document title dynamically with language without triggering scroll
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${t.pageTitle} — Peekly for FACEIT`;
    return () => {
      document.title = prevTitle;
    };
  }, [t.pageTitle]);

  // Intro animation timer (smooth 4.5s kinematic build, then freezes permanently in static state)
  useEffect(() => {
    const TOTAL_DURATION = 4500; // 4.5 seconds intro
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(TOTAL_DURATION, now - start);
      setElapsedTime(elapsed / 1000); // 0.0 to 4.5

      if (elapsed < TOTAL_DURATION) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const backLabel = backLabelMap[currentLang] || backLabelMap.en;
  const timeVal = elapsedTime;
  const isFinal = timeVal >= 4.5;

  // Kinetic kinematics for intro build
  const ringEase = isFinal ? 1 : 1 - Math.pow(1 - Math.min(1, timeVal / 1.2), 3);
  const shieldEase = isFinal ? 1 : 1 - Math.pow(1 - Math.max(0, Math.min(1, (timeVal - 0.4) / 1.2)), 2.5);
  const lockEase = isFinal ? 1 : 1 - Math.pow(1 - Math.max(0, Math.min(1, (timeVal - 1.0) / 1.2)), 2.5);

  const pulseRaw = isFinal ? 1 : Math.max(0, Math.min(1, (timeVal - 0.8) / 3.0));
  const pulseRadius = 25 + pulseRaw * 105;
  const pulseOpacity = isFinal ? 0 : Math.sin(pulseRaw * Math.PI) * 0.35;

  const sweepProgress = isFinal ? 1 : Math.max(0, Math.min(1, (timeVal - 1.2) / 2.6));
  const sweepBeamOpacity = isFinal ? 0 : Math.sin(sweepProgress * Math.PI) * 0.9;

  return (
    <main 
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

      {/* 2. Top Card: Pure Monochrome Geometric Vector Infographic (1:1 with Features & Changelog) */}
      <div className="w-full bg-[#0d0d0d] border border-white/20 rounded-none overflow-hidden mb-10 shadow-2xl relative">
        <div className="h-72 sm:h-96 min-h-[300px] w-full flex items-center justify-center p-4 bg-[#0d0d0d]">
          <svg 
            className="w-full h-full max-w-lg object-contain select-none pointer-events-none" 
            viewBox="0 0 400 260" 
            fill="none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <defs>
              <clipPath id="shieldBodyClip">
                <path d="M 200 90 L 236 104 C 236 142 219 164 200 176 C 181 164 164 142 164 104 Z" />
              </clipPath>
              <linearGradient id="hudBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Subtle Crosshairs */}
            <line x1="60" y1="130" x2="340" y2="130" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4" opacity={ringEase} />
            <line x1="200" y1="15" x2="200" y2="245" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4" opacity={ringEase} />

            {/* Concentric Circular Perimeter Rings */}
            <circle cx="200" cy="130" r={32 * ringEase} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 3" fill="none" />
            <circle cx="200" cy="130" r={62 * ringEase} stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" />
            <circle cx="200" cy="130" r={94 * ringEase} stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <circle cx="200" cy="130" r={124 * ringEase} stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />

            {/* Corner HUD Framing Brackets */}
            <path d="M 152 82 H 144 V 90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" opacity={ringEase} />
            <path d="M 248 82 H 256 V 90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" opacity={ringEase} />
            <path d="M 152 178 H 144 V 170" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" opacity={ringEase} />
            <path d="M 248 178 H 256 V 170" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" opacity={ringEase} />

            {/* Intro Sonar Radar Wave */}
            {pulseOpacity > 0.01 && (
              <circle cx="200" cy="130" r={pulseRadius} stroke="#ffffff" strokeWidth="1.2" fill="none" opacity={pulseOpacity} />
            )}

            {/* Central Solid Monochrome Shield */}
            {shieldEase > 0 && (
              <g opacity={shieldEase}>
                {/* 1. Solid Shield Backing (#121214) */}
                <path
                  d="M 200 90 L 236 104 C 236 142 219 164 200 176 C 181 164 164 142 164 104 Z"
                  fill="#121214"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* 2. Sweeping HUD light band across shield face (active during intro, freezes/disappears after) */}
                {!isFinal && sweepProgress > 0 && sweepBeamOpacity > 0.01 && (
                  <g clipPath="url(#shieldBodyClip)">
                    <rect
                      x={110 + sweepProgress * 180}
                      y={40}
                      width="50"
                      height="200"
                      fill="url(#hudBeamGradient)"
                      transform="rotate(30 200 130)"
                      opacity={sweepBeamOpacity}
                    />
                  </g>
                )}

                {/* 3. Solid White Lock Graphic */}
                {lockEase > 0 && (
                  <g opacity={lockEase}>
                    {/* Shackle */}
                    <path
                      d="M 193 125 V 120 C 193 116.1 196.1 113 200 113 C 203.9 113 207 116.1 207 120 V 125"
                      stroke="#ffffff"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Solid White Body */}
                    <rect x="189" y="125" width="22" height="17" rx="2" fill="#ffffff" />
                    {/* Dark graphite keyhole cutout */}
                    <circle cx="200" cy="131.5" r="1.8" fill="#121214" />
                    <polygon points="199,131.5 201,131.5 201.5,137.5 198.5,137.5" fill="#121214" />
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* 3. Text Content — 100% ширины контейнера без смещения сетки */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* H1 Heading */}
        <h1 className="w-full max-w-none text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          {t.pageTitle}
        </h1>

        {/* Subtitle */}
        <p className="w-full max-w-none font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          {t.subtitle}
        </p>

        {/* Metadata (Clean monochrome: two independent badges, no dividing bullet) */}
        <div className="w-full max-w-none flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-zinc-400 font-mono mb-12 select-text">
          <span className="inline-flex items-center gap-1.5 bg-zinc-950 border border-white/10 px-2.5 py-1 rounded-none">
            <span className="text-zinc-500 font-sans">{t.projectLabel}</span>
            <span className="text-white font-medium">{t.projectName}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-zinc-950 border border-white/10 px-2.5 py-1 rounded-none">
            <span className="text-zinc-500 font-sans">{t.effectiveDateLabel}</span>
            <span className="text-white font-medium">{t.effectiveDateValue}</span>
          </span>
        </div>

        {/* Sections 01–08 with Clean Grey Numbering 1:1 with Features / Changelog */}
        <div className="w-full max-w-none space-y-12 font-sans">

          {/* Section 01 */}
          <div className="w-full max-w-none">
            <div className="font-mono text-lg sm:text-xl font-bold text-zinc-500 tracking-tight select-none">
              01
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 mb-3.5 cursor-text select-text">
              {t.sections.s1.title}
            </h2>
            <div className="space-y-3.5 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s1.p1}</p>
              <p>{t.sections.s1.p2}</p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="w-full max-w-none">
            <div className="font-mono text-lg sm:text-xl font-bold text-zinc-500 tracking-tight select-none">
              02
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 mb-3.5 cursor-text select-text">
              {t.sections.s2.title}
            </h2>
            <div className="space-y-3.5 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s2.intro}</p>
              <p>{t.sections.s2.subIntro}</p>
              <div className="space-y-4 my-2">
                {t.sections.s2.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-white font-medium block">{b.label}</span>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 03 */}
          <div className="w-full max-w-none">
            <div className="font-mono text-lg sm:text-xl font-bold text-zinc-500 tracking-tight select-none">
              03
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 mb-3.5 cursor-text select-text">
              {t.sections.s3.title}
            </h2>
            <div className="space-y-3.5 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s3.intro}</p>
              <div className="space-y-4 my-2">
                {t.sections.s3.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-white font-medium block">{b.label}</span>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </div>

              {/* Monochrome Architecture Table (rounded-none, border-white/10) */}
              <div className="my-6 border border-white/10 rounded-none overflow-hidden bg-[#0d0d0d] shadow-xl text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white font-medium">
                        <th className="py-3.5 px-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                          {t.sections.s3.tableHeaders.category}
                        </th>
                        <th className="py-3.5 px-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                          {t.sections.s3.tableHeaders.status}
                        </th>
                        <th className="py-3.5 px-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                          {t.sections.s3.tableHeaders.method}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-zinc-300">
                      {t.sections.s3.tableRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-medium text-white">{row.category}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-mono bg-white/5 text-zinc-300 border border-white/10">
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-zinc-400">{row.processing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Section 04 */}
          <div className="w-full max-w-none">
            <div className="font-mono text-lg sm:text-xl font-bold text-zinc-500 tracking-tight select-none">
              04
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 mb-3.5 cursor-text select-text">
              {t.sections.s4.title}
            </h2>
            <div className="space-y-3.5 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s4.intro}</p>
              <div className="space-y-4 my-2">
                {t.sections.s4.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-white font-medium block">{b.label}</span>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </div>
              <p>{t.sections.s4.storageNote}</p>
            </div>
          </div>

          {/* Section 05 */}
          <div className="w-full max-w-none">
            <div className="font-mono text-lg sm:text-xl font-bold text-zinc-500 tracking-tight select-none">
              05
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 mb-3.5 cursor-text select-text">
              {t.sections.s5.title}
            </h2>
            <div className="space-y-3.5 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s5.intro}</p>
              <div className="space-y-3.5 my-3 text-left">
                {t.sections.s5.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-none bg-[#0d0d0d] border border-white/10 border-l-2 border-l-white/40">
                    <div className="font-mono text-xs sm:text-sm font-semibold text-white mb-1.5">
                      {item.name}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-0">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 06 */}
          <div className="w-full max-w-none">
            <div className="font-mono text-lg sm:text-xl font-bold text-zinc-500 tracking-tight select-none">
              06
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 mb-3.5 cursor-text select-text">
              {t.sections.s6.title}
            </h2>
            <div className="space-y-3.5 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s6.intro}</p>
              <div className="space-y-4 my-2">
                {t.sections.s6.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-white font-medium block">{b.label}</span>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 07 */}
          <div className="w-full max-w-none">
            <div className="font-mono text-lg sm:text-xl font-bold text-zinc-500 tracking-tight select-none">
              07
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 mb-3.5 cursor-text select-text">
              {t.sections.s7.title}
            </h2>
            <div className="space-y-3.5 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s7.intro}</p>
              <div className="my-4 p-5 sm:p-6 rounded-none bg-[#0d0d0d] border border-white/10 space-y-3.5 divide-y divide-white/10 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-zinc-500 font-medium sm:min-w-[220px]">{t.sections.s7.projectLabel}</span>
                  <span className="text-white font-mono">{t.projectName}</span>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-zinc-500 font-medium sm:min-w-[220px]">{t.sections.s7.supportEmailLabel}</span>
                  <a href="mailto:support@peekly.org" className="text-white hover:text-zinc-300 underline underline-offset-2 font-mono text-xs sm:text-sm transition-colors">
                    support@peekly.org
                  </a>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-zinc-500 font-medium sm:min-w-[220px]">{t.sections.s7.websiteLabel}</span>
                  <a href="https://peekly.org/privacy" className="text-white hover:text-zinc-300 underline underline-offset-2 font-mono text-xs sm:text-sm transition-colors break-all">
                    https://peekly.org/privacy
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 08 */}
          <div className="w-full max-w-none">
            <div className="font-mono text-lg sm:text-xl font-bold text-zinc-500 tracking-tight select-none">
              08
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 mb-3.5 cursor-text select-text">
              {t.sections.s8.title}
            </h2>
            <div className="space-y-3.5 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s8.text}</p>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
};

export default PrivacyPage;
