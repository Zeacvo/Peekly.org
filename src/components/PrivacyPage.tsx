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

  // Intro animation timer (smooth 6.0s kinematic build, then freezes permanently in static state)
  useEffect(() => {
    const TOTAL_DURATION = 6000; // 6.0 seconds intro
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(TOTAL_DURATION, now - start);
      setElapsedTime(elapsed / 1000); // 0.0 to 6.0

      if (elapsed < TOTAL_DURATION) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const backLabel = backLabelMap[currentLang] || backLabelMap.en;
  const timeVal = elapsedTime;
  const isFinal = timeVal >= 6.0;

  // Kinetic kinematics for intro build
  const layoutEase = isFinal ? 1 : 1 - Math.pow(1 - Math.min(1, timeVal / 1.5), 3);
  const shieldEase = isFinal ? 1 : 1 - Math.pow(1 - Math.max(0, Math.min(1, (timeVal - 0.5) / 1.3)), 2.5);
  const lockEase = isFinal ? 1 : 1 - Math.pow(1 - Math.max(0, Math.min(1, (timeVal - 1.0) / 1.2)), 2.5);

  const pulseRaw = isFinal ? 1 : Math.max(0, Math.min(1, (timeVal - 0.8) / 3.7));
  const pulseRadius = 25 + pulseRaw * 105;
  const pulseOpacity = isFinal ? 0 : Math.sin(pulseRaw * Math.PI) * 0.4;

  const sweepProgress = isFinal ? 1 : Math.max(0, Math.min(1, (timeVal - 1.2) / 3.8));
  const sweepOpacity = isFinal ? 0 : Math.sin(sweepProgress * Math.PI) * 0.75;
  const sweepX = 15 + sweepProgress * 490;

  return (
    <main 
      dir={isRtl ? 'rtl' : 'ltr'}
      className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-16 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-stretch z-10 animate-apple-reveal font-sans"
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

      {/* 2. Top Card: Advanced Security HUD & Telemetry Dashboard Mockup (1:1 with Features & Changelog) */}
      <div className="w-full bg-[#0d0d0d] border border-white/20 rounded-none overflow-hidden mb-10 shadow-2xl relative">
        <div className="h-72 sm:h-96 min-h-[310px] w-full flex items-center justify-center p-2 sm:p-4 bg-[#0d0d0d]">
          <svg 
            className="w-full h-full max-w-2xl object-contain select-none pointer-events-none" 
            viewBox="0 0 520 280" 
            fill="none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <defs>
              <clipPath id="centerShieldClip">
                <path d="M 260 112 L 294 125 C 294 162 277 183 260 195 C 243 183 226 162 226 125 Z" />
              </clipPath>
              <linearGradient id="hudLightBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.06" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 1. Outer Application Window Shell */}
            <rect x="15" y="12" width="490" height="256" fill="#0d0d0d" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
            
            {/* Window Header Bar */}
            <line x1="15" y1="38" x2="505" y2="38" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            
            {/* Window Header Dots (● ● ●) */}
            <circle cx="30" cy="25" r="2.8" fill="#555555" />
            <circle cx="40" cy="25" r="2.8" fill="#555555" />
            <circle cx="50" cy="25" r="2.8" fill="#555555" />

            {/* Window Header Status Title */}
            <text x="68" y="28" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="1.2">
              SEC_AUDIT // LOCAL_ONLY
            </text>

            {/* Top-Right Badge: VERIFIED */}
            <rect x="432" y="20" width="58" height="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <circle cx="440" cy="26" r="1.8" fill="#ffffff" />
            <text x="446" y="29" fill="#ffffff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
              VERIFIED
            </text>

            {/* Zone Dividers */}
            <line x1="150" y1="38" x2="150" y2="268" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 3" />
            <line x1="370" y1="38" x2="370" y2="268" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 3" />

            {/* ----------------- LEFT ZONE: SECURITY SPECS & MATRIX ----------------- */}
            <g opacity={layoutEase}>
              <text x="26" y="55" fill="rgba(255,255,255,0.6)" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                SECURITY_SPECS
              </text>

              {/* Status Row 1: CLIENT_SCOPE */}
              <text x="26" y="73" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="monospace">
                EXEC_SCOPE
              </text>
              <text x="26" y="83" fill="#ffffff" fontSize="7" fontFamily="monospace">
                100% LOCAL
              </text>
              <rect x="26" y="88" width="105" height="3" fill="rgba(255,255,255,0.08)" />
              <rect x="26" y="88" width="105" height="3" fill="#ffffff" opacity={0.8 * layoutEase} />

              {/* Status Row 2: EXT_TRACKERS */}
              <text x="26" y="108" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="monospace">
                EXT_TRACKERS
              </text>
              <text x="26" y="118" fill="#ffffff" fontSize="7" fontFamily="monospace">
                0 DETECTED
              </text>
              <rect x="26" y="123" width="105" height="3" fill="rgba(255,255,255,0.08)" />
              <rect x="26" y="123" width="14" height="3" fill="#ffffff" opacity={0.4 * layoutEase} />

              {/* Status Row 3: AUTH_VAULT */}
              <text x="26" y="143" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="monospace">
                AUTH_VAULT
              </text>
              <text x="26" y="153" fill="#ffffff" fontSize="7" fontFamily="monospace">
                STRICT_ISOLATED
              </text>
              <rect x="26" y="158" width="105" height="3" fill="rgba(255,255,255,0.08)" />

              {/* Pixel Security Data Matrix (Mockup) */}
              <text x="26" y="178" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="monospace">
                SEC_PARTITIONS
              </text>
              <g>
                {[0, 1, 2].map((row) =>
                  [0, 1, 2, 3, 4, 5].map((col) => (
                    <rect
                      key={`${row}-${col}`}
                      x={26 + col * 18}
                      y={185 + row * 9}
                      width="14"
                      height="6"
                      fill={
                        (row + col) % 3 === 0
                          ? 'rgba(255,255,255,0.35)'
                          : (row + col) % 2 === 0
                          ? 'rgba(255,255,255,0.15)'
                          : 'rgba(255,255,255,0.06)'
                      }
                    />
                  ))
                )}
              </g>

              {/* Terminal Logs Footer */}
              <text x="26" y="235" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">
                &gt; CLIENT_ONLY: ENABLED
              </text>
              <text x="26" y="246" fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="monospace">
                &gt; EXTERNAL_IO: BLOCKED
              </text>
            </g>

            {/* ----------------- CENTER ZONE: RADAR & SOLID SHIELD ----------------- */}
            {/* Center Grid Crosshairs */}
            <line x1="165" y1="150" x2="355" y2="150" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" opacity={layoutEase} />
            <line x1="260" y1="45" x2="260" y2="255" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" opacity={layoutEase} />

            {/* Concentric Radar Rings */}
            <circle cx="260" cy="150" r={34 * layoutEase} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 3" fill="none" />
            <circle cx="260" cy="150" r={60 * layoutEase} stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" />
            <circle cx="260" cy="150" r={90 * layoutEase} stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <circle cx="260" cy="150" r={114 * layoutEase} stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />

            {/* Radial Degree Labels */}
            <text x="260" y="86" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace" textAnchor="middle" opacity={layoutEase}>000°</text>
            <text x="260" y="222" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace" textAnchor="middle" opacity={layoutEase}>180°</text>
            <text x="180" y="152" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace" textAnchor="middle" opacity={layoutEase}>270°</text>
            <text x="340" y="152" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace" textAnchor="middle" opacity={layoutEase}>090°</text>

            {/* Corner Framing Brackets */}
            <path d="M 205 95 H 197 V 103" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" opacity={layoutEase} />
            <path d="M 315 95 H 323 V 103" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" opacity={layoutEase} />
            <path d="M 205 205 H 197 V 197" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" opacity={layoutEase} />
            <path d="M 315 205 H 323 V 197" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" opacity={layoutEase} />

            {/* Intro Sonar Radar Wave */}
            {pulseOpacity > 0.01 && (
              <circle cx="260" cy="150" r={pulseRadius} stroke="#ffffff" strokeWidth="1.2" fill="none" opacity={pulseOpacity} />
            )}

            {/* Central Solid Monochrome Shield */}
            {shieldEase > 0 && (
              <g opacity={shieldEase}>
                {/* 1. Solid Shield Backing (#121214) */}
                <path
                  d="M 260 112 L 294 125 C 294 162 277 183 260 195 C 243 183 226 162 226 125 Z"
                  fill="#121214"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* 2. Sweeping HUD light beam across shield face during intro */}
                {!isFinal && sweepProgress > 0 && sweepOpacity > 0.01 && (
                  <g clipPath="url(#centerShieldClip)">
                    <rect
                      x={170 + sweepProgress * 180}
                      y={60}
                      width="50"
                      height="200"
                      fill="url(#hudLightBeamGradient)"
                      transform="rotate(30 260 150)"
                      opacity={sweepOpacity}
                    />
                  </g>
                )}

                {/* 3. Solid White Lock Graphic */}
                {lockEase > 0 && (
                  <g opacity={lockEase}>
                    {/* Shackle */}
                    <path
                      d="M 253.5 145 V 139 C 253.5 135.4 256.4 132.5 260 132.5 C 263.6 132.5 266.5 135.4 266.5 139 V 145"
                      stroke="#ffffff"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Solid White Body */}
                    <rect x="249" y="145" width="22" height="17" rx="2" fill="#ffffff" />
                    {/* Dark graphite keyhole cutout */}
                    <circle cx="260" cy="151.5" r="1.8" fill="#121214" />
                    <polygon points="259.1,151.5 260.9,151.5 261.3,157.5 258.7,157.5" fill="#121214" />
                  </g>
                )}
              </g>
            )}

            {/* ----------------- RIGHT ZONE: DATA FLOW PIPELINE ----------------- */}
            <g opacity={layoutEase}>
              <text x="385" y="55" fill="rgba(255,255,255,0.6)" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                FLOW_PIPELINE
              </text>

              {/* Module 1: FACEIT_API */}
              <rect x="385" y="68" width="110" height="23" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              <text x="393" y="79" fill="#ffffff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">FACEIT API [DIRECT]</text>
              <text x="393" y="87" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">HTTPS // CLIENT ONLY</text>

              {/* Module 2: LOCAL_STORAGE */}
              <rect x="385" y="98" width="110" height="23" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              <text x="393" y="109" fill="#ffffff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">STORAGE [LOCAL]</text>
              <text x="393" y="117" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">RAM & EXT_STORAGE</text>

              {/* Module 3: CLOUD_SERVICES */}
              <rect x="385" y="128" width="110" height="23" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              <text x="393" y="139" fill="#ffffff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">CLOUD SERVICES</text>
              <text x="393" y="147" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">0 CLOUD SERVERS</text>

              {/* Certification Stamp */}
              <rect x="385" y="158" width="110" height="42" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
              <text x="393" y="171" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">ZERO TELEMETRY</text>
              <text x="393" y="183" fill="#ffffff" fontSize="7" fontFamily="monospace" fontWeight="bold">100% PRIVATE</text>
              <text x="393" y="193" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="monospace">CODE ISOLATED</text>

              {/* Terminal Logs Footer */}
              <text x="385" y="235" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">
                &gt; TELEMETRY: NULL
              </text>
              <text x="385" y="246" fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="monospace">
                &gt; TRACKERS: ZERO
              </text>
            </g>

            {/* Global HUD light sweep line during intro */}
            {!isFinal && sweepOpacity > 0.01 && (
              <line 
                x1={sweepX - 25} 
                y1="38" 
                x2={sweepX + 25} 
                y2="268" 
                stroke="#ffffff" 
                strokeWidth="1.5" 
                opacity={sweepOpacity * 0.5} 
              />
            )}
          </svg>
        </div>
      </div>

      {/* 3. Text Content — выровнен по левой границе с карточкой в сетке max-w-5xl */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* H1 Heading */}
        <h1 className="w-full max-w-none text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          {t.pageTitle}
        </h1>

        {/* Subtitle */}
        <p className="w-full max-w-none font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          {t.subtitle}
        </p>

        {/* Metadata: Two large sharp badges without dividing dots */}
        <div className="w-full flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono mb-12 select-text">
          <span className="inline-flex items-center gap-2 border border-white/10 bg-zinc-900/50 px-3 py-1.5 rounded-none text-zinc-400">
            <span className="text-zinc-500 font-sans">{t.projectLabel}</span>
            <span className="text-white font-medium">{t.projectName}</span>
          </span>
          <span className="inline-flex items-center gap-2 border border-white/10 bg-zinc-900/50 px-3 py-1.5 rounded-none text-zinc-400">
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
            <div className="space-y-4 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s2.intro}</p>
              <div className="space-y-4 pt-1">
                {t.sections.s2.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-white font-medium text-sm sm:text-base block">{b.label}</span>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed m-0">{b.text}</p>
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
            <div className="space-y-4 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s3.intro}</p>
              <div className="space-y-4 pt-1">
                {t.sections.s3.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-white font-medium text-sm sm:text-base block">{b.label}</span>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed m-0">{b.text}</p>
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
            <div className="space-y-4 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s4.intro}</p>
              <div className="space-y-4 pt-1">
                {t.sections.s4.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-white font-medium text-sm sm:text-base block">{b.label}</span>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed m-0">{b.text}</p>
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
            <div className="space-y-4 font-sans text-sm sm:text-base font-normal text-zinc-400 leading-relaxed text-justify cursor-text select-text">
              <p>{t.sections.s6.intro}</p>
              <div className="space-y-4 pt-1">
                {t.sections.s6.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-white font-medium text-sm sm:text-base block">{b.label}</span>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed m-0">{b.text}</p>
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
