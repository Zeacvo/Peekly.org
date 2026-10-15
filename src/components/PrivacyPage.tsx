import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../translations';
import { privacyTranslations } from '../data/privacyTranslations';
import { ChromeLogo } from './ChromeLogo';

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

  const tLang = translations[currentLang] || translations.en;
  const backLabel = backLabelMap[currentLang] || backLabelMap.en;
  const ctaLabel = (tLang.hero.cta || 'ADD TO CHROME').toUpperCase();

  const timeVal = elapsedTime;

  // Radar pulses in #FF5500 and #10B981
  const pulse1 = (timeVal % 2.4) / 2.4;
  const radius1 = 20 + pulse1 * 34;
  const opacity1 = (1 - pulse1) * 0.45;

  const pulse2 = ((timeVal + 1.2) % 2.4) / 2.4;
  const radius2 = 20 + pulse2 * 34;
  const opacity2 = (1 - pulse2) * 0.45;

  const shieldGlow = 0.75 + 0.25 * Math.sin(timeVal * 2.5);

  const scanProgress = (timeVal % 3.0) / 3.0;
  const scanlineY = 48 + scanProgress * 188;

  return (
    <main 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-12 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-stretch z-10 animate-apple-reveal font-sans"
    >
      
      {/* 1. Back Navigation Button */}
      <div className={`w-full flex ${isRtl ? 'justify-end' : 'justify-start'} mb-6`}>
        <button
          onClick={onBack}
          className="h-10 px-4 sm:px-5 text-sm font-semibold border border-transparent bg-white text-black hover:bg-[#FF5500] hover:border-white transition-all duration-150 rounded-none inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <ChevronLeft className={`w-4 h-4 stroke-[2] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{backLabel}</span>
        </button>
      </div>

      {/* 2. Hero Security & Privacy Animation Block (Exact Replica of Window Shell from ChangelogPage) */}
      <div className="w-full bg-[#0d0d0d] border border-white/20 overflow-hidden mb-10 shadow-2xl relative">
        <div className="h-72 sm:h-96 w-full flex items-center justify-center p-4 bg-[#0d0d0d]">
          <svg 
            className="w-full h-full max-w-xl object-contain" 
            viewBox="0 0 440 260" 
            fill="none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <defs>
              <linearGradient id="secScanlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="20%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#FF5500" stopOpacity="0.75" />
                <stop offset="80%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Window Outer Container */}
            <rect x="25" y="20" width="390" height="220" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            
            {/* Window Header Line */}
            <line x1="25" y1="46" x2="415" y2="46" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            
            {/* Three grey dots on left (● ● ●) */}
            <circle cx="41" cy="33" r="3.5" fill="#555555" />
            <circle cx="54" cy="33" r="3.5" fill="#555555" />
            <circle cx="67" cy="33" r="3.5" fill="#555555" />

            {/* Header Terminal Label */}
            <text x="405" y="36" textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="8.5" fontFamily="monospace" letterSpacing="0.06em">
              PEEKLY_SECURITY // ZERO_TELEMETRY
            </text>

            {/* Center Vertical Separator */}
            <line x1="160" y1="56" x2="160" y2="230" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" strokeWidth="1" />

            {/* --- LEFT SECTION: Interactive Security Shield & Encryption Radar --- */}
            {/* Radar Crosshairs */}
            <line x1="36" y1="138" x2="148" y2="138" stroke="rgba(16,185,129,0.2)" strokeWidth="0.8" strokeDasharray="2 3" />
            <line x1="92" y1="78" x2="92" y2="198" stroke="rgba(16,185,129,0.2)" strokeWidth="0.8" strokeDasharray="2 3" />

            {/* Radar Concentric Rings */}
            <circle cx="92" cy="138" r="26" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="3 3" fill="none" />
            <circle cx="92" cy="138" r="44" stroke="#FF5500" strokeWidth="0.8" strokeOpacity="0.2" fill="none" />

            {/* Expanding Pulse Waves (Dual Tone: Emerald & Orange) */}
            <circle cx="92" cy="138" r={radius1} stroke="#FF5500" strokeWidth="1.2" fill="none" opacity={opacity1} />
            <circle cx="92" cy="138" r={radius2} stroke="#10b981" strokeWidth="1.2" fill="none" opacity={opacity2} />

            {/* Security Shield Vector Path */}
            <path
              d="M 92 110 L 112 117 C 112 138 103 150 92 158 C 81 150 72 138 72 117 Z"
              fill="rgba(255, 85, 0, 0.08)"
              stroke="#FF5500"
              strokeWidth="1.6"
              strokeOpacity={shieldGlow}
              strokeLinejoin="round"
            />

            {/* Lock Mechanism inside Shield in #10B981 */}
            <path
              d="M 88.5 133 V 128 C 88.5 126 90 124.5 92 124.5 C 94 124.5 95.5 126 95.5 128 V 133"
              stroke="#10b981"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="86" y="133" width="12" height="9" rx="1.5" fill="#10b981" />
            <circle cx="92" cy="136.5" r="1" fill="#000000" />

            {/* Bottom Badge under Shield */}
            <rect x="59" y="180" width="66" height="15" rx="3" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8" />
            <text x="92" y="191" textAnchor="middle" fill="#10b981" fontSize="7.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.06em">
              ENCRYPTED
            </text>

            {/* --- RIGHT SECTION: Live Console / Running Audit Stream --- */}
            <text x="174" y="66" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="0.08em">
              &gt; RUNTIME SECURITY AUDIT
            </text>

            {/* Row 1: CLIENT-SIDE ONLY */}
            <g>
              <circle cx="178" cy="85" r="2.5" fill="#10b981" opacity={0.6 + 0.4 * Math.sin(timeVal * 3)} />
              <text x="188" y="88" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="700">[SECURE]</text>
              <text x="236" y="88" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="600">CLIENT-SIDE ONLY</text>
              <text x="188" y="99" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="monospace">
                &gt; CLIENT-SIDE ONLY: 100% LOCAL PROCESSING
              </text>
            </g>

            {/* Row 2: ZERO TELEMETRY */}
            <g>
              <circle cx="178" cy="117" r="2.5" fill="#FF5500" opacity={0.6 + 0.4 * Math.sin(timeVal * 3 + 1)} />
              <text x="188" y="120" fill="#FF5500" fontSize="8" fontFamily="monospace" fontWeight="700">[BLOCKED]</text>
              <text x="242" y="120" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="600">0 TRACKERS</text>
              <text x="188" y="131" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="monospace">
                &gt; ZERO TELEMETRY &amp; NO TRACKERS DETECTED
              </text>
            </g>

            {/* Row 3: CREDENTIALS */}
            <g>
              <circle cx="178" cy="149" r="2.5" fill="#38bdf8" opacity={0.6 + 0.4 * Math.sin(timeVal * 3 + 2)} />
              <text x="188" y="152" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="700">[PROTECTED]</text>
              <text x="254" y="152" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="600">CREDENTIALS ISOLATED</text>
              <text x="188" y="163" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="monospace">
                &gt; NO CREDENTIAL, COOKIE OR CHAT ACCESS
              </text>
            </g>

            {/* Row 4: PUBLIC API */}
            <g>
              <circle cx="178" cy="181" r="2.5" fill="#10b981" opacity={0.6 + 0.4 * Math.sin(timeVal * 3 + 3)} />
              <text x="188" y="184" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="700">[VERIFIED]</text>
              <text x="246" y="184" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="600">PUBLIC FACEIT API</text>
              <text x="188" y="195" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="monospace">
                &gt; PUBLIC FACEIT API ONLY
              </text>
            </g>

            {/* Bottom Status line */}
            <line x1="174" y1="210" x2="405" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x="174" y="222" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">
              STATUS: 100% COMPLIANT WITH CHROME WEB STORE POLICIES
            </text>

            {/* Scanline Sweep Shimmer */}
            <line x1="26" y1={scanlineY} x2="414" y2={scanlineY} stroke="url(#secScanlineGrad)" strokeWidth="1.2" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* 3. Text Content — ровно 100% ширины контейнера */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* Заголовок H1 */}
        <h1 className="w-full max-w-none text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          {t.pageTitle}
        </h1>

        {/* Вводный текст описания */}
        <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          {t.subtitle}
        </p>

        {/* Метаданные (Строго только Project и Effective Date, без бейджа версии) */}
        <div className="w-full max-w-none flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-400 font-mono mb-8 select-text">
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            <span className="text-neutral-500 font-sans">{t.projectLabel}</span>
            <span className="text-white font-medium">{t.projectName}</span>
          </span>
          <span className="text-neutral-600 hidden sm:inline">&bull;</span>
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            <span className="text-neutral-500 font-sans">{t.effectiveDateLabel}</span>
            <span className="text-white font-medium">{t.effectiveDateValue}</span>
          </span>
        </div>

        {/* Список разделов со стилизованными номерами 01–08 как в Changelog */}
        <div className="w-full max-w-none space-y-8 font-sans">

          {/* Section 01 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                01
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s1.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s1.p1}</p>
              <p>{t.sections.s1.p2}</p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                02
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s2.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s2.intro}</p>
              <p>{t.sections.s2.subIntro}</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400">
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
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                03
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s3.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s3.intro}</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400">
                {t.sections.s3.bullets.map((b, idx) => (
                  <li key={idx}>
                    <strong className="text-white font-medium">{b.label}:</strong> {b.text}
                  </li>
                ))}
              </ul>

              {/* Table */}
              <div className="my-6 border border-white/10 rounded-xl overflow-hidden bg-[#0d0d0d] shadow-xl text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">
                          {t.sections.s3.tableHeaders.category}
                        </th>
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">
                          {t.sections.s3.tableHeaders.status}
                        </th>
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">
                          {t.sections.s3.tableHeaders.method}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300">
                      {t.sections.s3.tableRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-medium text-white">{row.category}</td>
                          <td className="py-3.5 px-4">
                            <span 
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border ${
                                row.statusType === 'not_collected'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : row.statusType === 'ephemeral'
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                                  : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-neutral-400">{row.processing}</td>
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
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                04
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s4.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s4.intro}</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400">
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
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                05
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s5.title}
              </h2>
            </div>
            <div className="pl-6 space-y-4 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s5.intro}</p>
              <div className="space-y-3.5 my-2 text-left">
                {t.sections.s5.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 border-l-2 border-l-[#FF5500]">
                    <div className="font-mono text-xs sm:text-sm font-semibold text-white mb-1.5">
                      {item.name}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-0">
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
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                06
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s6.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s6.intro}</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400">
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
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                07
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s7.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s7.intro}</p>
              <div className="my-4 p-5 sm:p-6 rounded-xl bg-[#0d0d0d] border border-white/10 space-y-3.5 divide-y divide-white/5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">{t.sections.s7.projectLabel}</span>
                  <span className="text-white font-mono">{t.projectName}</span>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">{t.sections.s7.supportEmailLabel}</span>
                  <a href="mailto:support@peekly.org" className="text-[#FF5500] hover:text-[#ff6b1a] underline underline-offset-2 font-mono text-xs sm:text-sm transition-colors">
                    support@peekly.org
                  </a>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">{t.sections.s7.websiteLabel}</span>
                  <a href="https://peekly.org/privacy" className="text-[#FF5500] hover:text-[#ff6b1a] underline underline-offset-2 font-mono text-xs sm:text-sm transition-colors break-all">
                    https://peekly.org/privacy
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 08 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                08
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                {t.sections.s8.title}
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s8.text}</p>
            </div>
          </div>

        </div>

        {/* Disclaimer / Copyright block */}
        <div className="w-full max-w-none pt-8 mt-6 border-t border-white/10 font-sans text-xs text-neutral-500 space-y-2 leading-relaxed cursor-text select-text">
          <p>{t.disclaimer.copyright}</p>
          <p>{t.disclaimer.legal}</p>
        </div>

      </div>

      {/* 4. Bottom Prominent Action CTA Button (100% exact replica of Hero / Changelog CTA button, mt-12 mb-12) */}
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

    </main>
  );
};

export default PrivacyPage;
