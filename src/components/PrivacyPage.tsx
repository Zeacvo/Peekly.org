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

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${t.pageTitle} — Peekly for FACEIT`;
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {}
    return () => {
      document.title = prevTitle;
    };
  }, [t.pageTitle]);

  useEffect(() => {
    let frameId: number;
    const start = performance.now();

    const tick = (now: number) => {
      setElapsedTime((now - start) / 1000);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const backLabel = backLabelMap[currentLang] || backLabelMap.en;
  const timeVal = elapsedTime;

  // Strict Monochrome Radar & Shield Math
  const pulse1 = (timeVal % 2.5) / 2.5;
  const radius1 = 20 + pulse1 * 95;
  const opacity1 = (1 - pulse1) * 0.35;

  const pulse2 = ((timeVal + 1.25) % 2.5) / 2.5;
  const radius2 = 20 + pulse2 * 95;
  const opacity2 = (1 - pulse2) * 0.35;

  const sweepAngle = (timeVal * 0.75) % (Math.PI * 2);
  const sweepX = 200 + Math.cos(sweepAngle) * 115;
  const sweepY = 130 + Math.sin(sweepAngle) * 115;

  return (
    <main 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-16 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-stretch z-10 animate-apple-reveal font-sans"
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

      {/* 2. Top Card: Pure Monochrome Geometric Vector Infographic (NO TEXT SYMBOLS) */}
      <div className="w-full bg-[#0d0d0d] border border-white/20 overflow-hidden mb-10 shadow-2xl relative">
        <div className="h-72 sm:h-96 min-h-[300px] w-full flex items-center justify-center p-4 bg-[#0d0d0d]">
          <svg 
            className="w-full h-full max-w-lg object-contain select-none pointer-events-none" 
            viewBox="0 0 400 260" 
            fill="none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            {/* Subtle Crosshairs */}
            <line x1="75" y1="130" x2="325" y2="130" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="200" y1="15" x2="200" y2="245" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4" />

            {/* Concentric Circular Perimeter Rings */}
            <circle cx="200" cy="130" r="30" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="2 3" fill="none" />
            <circle cx="200" cy="130" r="55" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
            <circle cx="200" cy="130" r="85" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <circle cx="200" cy="130" r="115" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />

            {/* Pulsing Perimeter Waves */}
            <circle cx="200" cy="130" r={radius1} stroke="#ffffff" strokeWidth="1" fill="none" opacity={opacity1} />
            <circle cx="200" cy="130" r={radius2} stroke="#ffffff" strokeWidth="1" fill="none" opacity={opacity2} />

            {/* Smooth Rotating Radar Scanner Arm */}
            <line x1="200" y1="130" x2={sweepX} y2={sweepY} stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />

            {/* Central Security Shield (Pure White Outline, No Text) */}
            <path
              d="M 200 96 L 226 106 C 226 134 215 152 200 164 C 185 152 174 134 174 106 Z"
              fill="rgba(255, 255, 255, 0.04)"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeOpacity="0.85"
              strokeLinejoin="round"
            />

            {/* Central Lock Graphic inside Shield */}
            <path
              d="M 194.5 128 V 122 C 194.5 119 197 116.5 200 116.5 C 203 116.5 205.5 119 205.5 122 V 128"
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="191" y="128" width="18" height="14" rx="2" fill="rgba(255, 255, 255, 0.12)" stroke="#ffffff" strokeWidth="1.4" />
            <circle cx="200" cy="133.5" r="1.3" fill="#ffffff" />
            <line x1="200" y1="134.8" x2="200" y2="137.8" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 3. Text Content */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* H1 Heading */}
        <h1 className="w-full max-w-none text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          {t.pageTitle}
        </h1>

        {/* Subtitle */}
        <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          {t.subtitle}
        </p>

        {/* Metadata (Clean monochrome: only Project & Effective Date) */}
        <div className="w-full max-w-none flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-zinc-400 font-mono mb-10 select-text">
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            <span className="text-zinc-500 font-sans">{t.projectLabel}</span>
            <span className="text-white font-medium">{t.projectName}</span>
          </span>
          <span className="text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            <span className="text-zinc-500 font-sans">{t.effectiveDateLabel}</span>
            <span className="text-white font-medium">{t.effectiveDateValue}</span>
          </span>
        </div>

        {/* Sections 01–08 with Clean Grey Numbering (text-zinc-500) */}
        <div className="w-full max-w-none space-y-10 font-sans">

          {/* Section 01 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-zinc-500 select-none shrink-0">
                01
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s1.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s1.p1}</p>
              <p>{t.sections.s1.p2}</p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-zinc-500 select-none shrink-0">
                02
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s2.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s2.intro}</p>
              <p>{t.sections.s2.subIntro}</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-zinc-400">
                {t.sections.s2.bullets.map((b, idx) => (
                  <li key={idx}>
                    <strong className="text-white font-medium">{b.label}:</strong> {b.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 03 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-zinc-500 select-none shrink-0">
                03
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s3.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s3.intro}</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-zinc-400">
                {t.sections.s3.bullets.map((b, idx) => (
                  <li key={idx}>
                    <strong className="text-white font-medium">{b.label}:</strong> {b.text}
                  </li>
                ))}
              </ul>

              {/* Monochrome Architecture Table */}
              <div className="my-6 border border-white/10 rounded-xl overflow-hidden bg-[#0d0d0d] shadow-xl text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                          {t.sections.s3.tableHeaders.category}
                        </th>
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                          {t.sections.s3.tableHeaders.status}
                        </th>
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-zinc-400">
                          {t.sections.s3.tableHeaders.method}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-400">
                      {t.sections.s3.tableRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-medium text-white">{row.category}</td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono bg-white/5 text-zinc-300 border border-white/10">
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
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-zinc-500 select-none shrink-0">
                04
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s4.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s4.intro}</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-zinc-400">
                {t.sections.s4.bullets.map((b, idx) => (
                  <li key={idx}>
                    <strong className="text-white font-medium">{b.label}:</strong> {b.text}
                  </li>
                ))}
              </ul>
              <p>{t.sections.s4.storageNote}</p>
            </div>
          </div>

          {/* Section 05 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-zinc-500 select-none shrink-0">
                05
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s5.title}
              </h2>
            </div>
            <div className="pl-6 space-y-4 font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s5.intro}</p>
              <div className="space-y-3.5 my-2 text-left">
                {t.sections.s5.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 border-l-2 border-l-white/40">
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
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-zinc-500 select-none shrink-0">
                06
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s6.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s6.intro}</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-zinc-400">
                {t.sections.s6.bullets.map((b, idx) => (
                  <li key={idx}>
                    <strong className="text-white font-medium">{b.label}:</strong> {b.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 07 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-zinc-500 select-none shrink-0">
                07
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s7.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s7.intro}</p>
              <div className="my-4 p-5 sm:p-6 rounded-xl bg-[#0d0d0d] border border-white/10 space-y-3.5 divide-y divide-white/5 text-left">
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
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-zinc-500 select-none shrink-0">
                08
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s8.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s8.text}</p>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
};

export default PrivacyPage;
