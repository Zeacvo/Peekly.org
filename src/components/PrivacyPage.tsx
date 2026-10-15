import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../translations';
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

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Privacy Policy — Peekly for FACEIT';
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {}
    return () => {
      document.title = prevTitle;
    };
  }, []);

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

  const t = elapsedTime;

  // Animation values for radar pulses & scanline
  const pulse1 = (t % 2.4) / 2.4;
  const radius1 = 20 + pulse1 * 34;
  const opacity1 = (1 - pulse1) * 0.45;

  const pulse2 = ((t + 1.2) % 2.4) / 2.4;
  const radius2 = 20 + pulse2 * 34;
  const opacity2 = (1 - pulse2) * 0.45;

  const shieldGlow = 0.75 + 0.25 * Math.sin(t * 2.5);

  const scanProgress = (t % 3.0) / 3.0;
  const scanlineY = 48 + scanProgress * 188;

  return (
    <main className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-0 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-stretch z-10 animate-apple-reveal font-sans">
      
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
                <stop offset="0%" stopColor="#FF5500" stopOpacity="0" />
                <stop offset="20%" stopColor="#FF5500" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#FF5500" stopOpacity="0.65" />
                <stop offset="80%" stopColor="#FF5500" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Unified Window Shell (exact match to cards 04, 05 & changelog) */}
            <rect x="25" y="20" width="390" height="220" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            
            {/* Window Header Line */}
            <line x1="25" y1="46" x2="415" y2="46" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            
            {/* Three identical grey dots on left (● ● ●: same size r=3.5, gap=13, fill #555555) */}
            <circle cx="41" cy="33" r="3.5" fill="#555555" />
            <circle cx="54" cy="33" r="3.5" fill="#555555" />
            <circle cx="67" cy="33" r="3.5" fill="#555555" />

            {/* Header Terminal Label */}
            <text x="405" y="36" textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="8.5" fontFamily="monospace" letterSpacing="0.06em">
              PEEKLY_SECURITY_KERNEL // CLIENT_SIDE_LOCAL
            </text>

            {/* Center Vertical Separator */}
            <line x1="165" y1="56" x2="165" y2="230" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" strokeWidth="1" />

            {/* --- LEFT SECTION: Interactive Security Shield & Radar Scanner --- */}
            {/* Radar Crosshairs */}
            <line x1="38" y1="138" x2="152" y2="138" stroke="rgba(255,85,0,0.15)" strokeWidth="0.8" strokeDasharray="2 3" />
            <line x1="95" y1="78" x2="95" y2="198" stroke="rgba(255,85,0,0.15)" strokeWidth="0.8" strokeDasharray="2 3" />

            {/* Static Radar Concentric Rings */}
            <circle cx="95" cy="138" r="26" stroke="#FF5500" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="3 3" fill="none" />
            <circle cx="95" cy="138" r="44" stroke="#FF5500" strokeWidth="0.8" strokeOpacity="0.18" fill="none" />

            {/* Expanding Pulse Waves */}
            <circle cx="95" cy="138" r={radius1} stroke="#FF5500" strokeWidth="1.2" fill="none" opacity={opacity1} />
            <circle cx="95" cy="138" r={radius2} stroke="#FF5500" strokeWidth="1.2" fill="none" opacity={opacity2} />

            {/* Security Shield Vector Path */}
            <path
              d="M 95 110 L 115 117 C 115 138 106 150 95 158 C 84 150 75 138 75 117 Z"
              fill="rgba(255, 85, 0, 0.08)"
              stroke="#FF5500"
              strokeWidth="1.6"
              strokeOpacity={shieldGlow}
              strokeLinejoin="round"
            />

            {/* Lock Mechanism inside Shield */}
            <path
              d="M 91.5 133 V 128 C 91.5 126 93 124.5 95 124.5 C 97 124.5 98.5 126 98.5 128 V 133"
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="89" y="133" width="12" height="9" rx="1.5" fill="#FF5500" />
            <circle cx="95" cy="136.5" r="1" fill="#ffffff" />

            {/* Bottom Badge under Shield */}
            <rect x="62" y="180" width="66" height="15" rx="3" fill="rgba(255,85,0,0.12)" stroke="rgba(255,85,0,0.3)" strokeWidth="0.8" />
            <text x="95" y="191" textAnchor="middle" fill="#FF5500" fontSize="7.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.06em">
              ZERO TELEMETRY
            </text>

            {/* --- RIGHT SECTION: Live Console / Audit Stream --- */}
            <text x="180" y="66" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="0.08em">
              &gt; PRIVACY &amp; SECURITY AUDIT STREAM
            </text>

            {/* Row 1: Client-Side */}
            <g>
              <circle cx="184" cy="85" r="2.5" fill="#10b981" opacity={0.6 + 0.4 * Math.sin(t * 3)} />
              <text x="194" y="88" fill="#10b981" fontSize="8.5" fontFamily="monospace" fontWeight="700">[SECURE]</text>
              <text x="242" y="88" fill="#ffffff" fontSize="8.5" fontFamily="monospace" fontWeight="600">CLIENT-SIDE ONLY</text>
              <text x="194" y="99" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="monospace">
                &gt; CLIENT_SIDE_ONLY: ENABLED (100% LOCAL)
              </text>
            </g>

            {/* Row 2: Trackers */}
            <g>
              <circle cx="184" cy="117" r="2.5" fill="#10b981" opacity={0.6 + 0.4 * Math.sin(t * 3 + 1)} />
              <text x="194" y="120" fill="#FF5500" fontSize="8.5" fontFamily="monospace" fontWeight="700">[BLOCKED]</text>
              <text x="246" y="120" fill="#ffffff" fontSize="8.5" fontFamily="monospace" fontWeight="600">0 EXTERNAL TRACKERS</text>
              <text x="194" y="131" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="monospace">
                &gt; EXTERNAL_TRACKERS: ZERO DETECTED
              </text>
            </g>

            {/* Row 3: Credentials */}
            <g>
              <circle cx="184" cy="149" r="2.5" fill="#10b981" opacity={0.6 + 0.4 * Math.sin(t * 3 + 2)} />
              <text x="194" y="152" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="700">[PROTECTED]</text>
              <text x="258" y="152" fill="#ffffff" fontSize="8.5" fontFamily="monospace" fontWeight="600">ZERO CREDENTIAL ACCESS</text>
              <text x="194" y="163" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="monospace">
                &gt; CREDENTIAL_ACCESS: STRICTLY BLOCKED
              </text>
            </g>

            {/* Row 4: Official API */}
            <g>
              <circle cx="184" cy="181" r="2.5" fill="#10b981" opacity={0.6 + 0.4 * Math.sin(t * 3 + 3)} />
              <text x="194" y="184" fill="#10b981" fontSize="8.5" fontFamily="monospace" fontWeight="700">[VERIFIED]</text>
              <text x="250" y="184" fill="#ffffff" fontSize="8.5" fontFamily="monospace" fontWeight="600">OFFICIAL FACEIT API ONLY</text>
              <text x="194" y="195" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="monospace">
                &gt; TELEMETRY_STREAM: NULL (OFFLINE)
              </text>
            </g>

            {/* Bottom Status line */}
            <line x1="180" y1="210" x2="405" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x="180" y="222" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">
              STATUS: 100% COMPLIANT WITH CHROME WEB STORE POLICIES
            </text>

            {/* Scanline Sweep Shimmer */}
            <line x1="26" y1={scanlineY} x2="414" y2={scanlineY} stroke="url(#secScanlineGrad)" strokeWidth="1.2" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* 3. Text Content — ровно 100% ширины контейнера, БЕЗ max-w-* и БЕЗ px-* */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* Заголовок H1 */}
        <h1 className="w-full max-w-none text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          Privacy Policy
        </h1>

        {/* Вводный текст описания */}
        <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          Official privacy policy, single-purpose declaration, and zero-telemetry architecture for Peekly for FACEIT.
        </p>

        {/* Версия / метаданные */}
        <div className="w-full max-w-none flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-400 font-mono mb-8 select-text">
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            <span className="text-neutral-500 font-sans">Project:</span>
            <span className="text-white font-medium">Peekly for FACEIT</span>
          </span>
          <span className="text-neutral-600 hidden sm:inline">&bull;</span>
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            <span className="text-neutral-500 font-sans">Effective Date:</span>
            <span className="text-white font-medium">October 2026</span>
          </span>
          <span className="text-neutral-600 hidden sm:inline">&bull;</span>
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            <span className="text-neutral-500 font-sans">Version:</span>
            <span className="text-[#FF5500] font-medium">1.0.0</span>
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
                Introduction &amp; Single Purpose
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>
                This Privacy Policy governs the browser extension <strong className="text-white font-medium">Peekly for FACEIT</strong> (&ldquo;Peekly&rdquo;, &ldquo;the Extension&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), developed to enhance the competitive matchmaking experience for players on the FACEIT competitive platform (<a href="https://www.faceit.com" target="_blank" rel="noopener noreferrer" className="text-[#FF5500] hover:text-[#ff6b1a] underline underline-offset-2 transition-colors">faceit.com</a>).
              </p>
              <p>
                In full accordance with the Google Chrome Web Store Developer Program Policies, Peekly operates under a strict <strong className="text-white font-medium">Single Purpose</strong> mandate: to compute and render transparent match performance intelligence (recent match statistics, rating dynamics, map balance radar, and match history insights) directly inside authorized FACEIT matchroom interfaces.
              </p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                02
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                Data Collection &amp; Usage
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>
                Peekly is engineered on strict <strong className="text-white font-medium">privacy-by-design</strong> principles. We explicitly state that the Extension does <strong className="text-white font-medium">not</strong> collect, store, sell, trade, or transfer any Personally Identifiable Information (PII) to external developers or commercial third parties.
              </p>
              <p>Specifically:</p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400">
                <li><strong className="text-white font-medium">No Personal Identifiers:</strong> We do not collect or process your real name, email address, physical address, phone number, or IP address.</li>
                <li><strong className="text-white font-medium">No Account Credentials:</strong> Peekly never accesses, logs, or stores your FACEIT passwords, Steam authentication credentials, API tokens, or payment methods.</li>
                <li><strong className="text-white font-medium">No Private Communications:</strong> The Extension does not inspect, read, or record private chat messages, friend lists, or direct communications.</li>
                <li><strong className="text-white font-medium">No Browsing History:</strong> Peekly does not monitor, track, or record your web browsing activity outside of authorized <code className="text-[#FF5500] bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono border border-white/10">faceit.com</code> matchrooms and profiles.</li>
                <li><strong className="text-white font-medium">No Third-Party Trackers or Analytics:</strong> Peekly contains zero analytics SDKs, tracking pixels, telemetry scripts, or advertising trackers (including Google Analytics, Yandex Metrika, Sentry, or Mixpanel).</li>
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
                Data Processing Architecture
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>
                All data processing is executed strictly <strong className="text-white font-medium">client-side</strong> within your local web browser session:
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400">
                <li><strong className="text-white font-medium">Direct Official API Requests:</strong> Statistical queries (e.g., K/D ratio, ADR, HLTV rating, match history) are performed directly from your browser to official public FACEIT API endpoints (such as <code className="text-[#FF5500] bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono border border-white/10">https://open.faceit.com/*</code> and <code className="text-[#FF5500] bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono border border-white/10">https://api.faceit.com/*</code>).</li>
                <li><strong className="text-white font-medium">No Intermediate Servers:</strong> Peekly operates without proprietary proxy servers, relay endpoints, or cloud databases. No query or session data passes through third-party infrastructure.</li>
              </ul>

              {/* Table */}
              <div className="my-6 border border-white/10 rounded-xl overflow-hidden bg-[#0d0d0d] shadow-xl text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">Data Category</th>
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">Collection Status</th>
                        <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">Processing Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-medium text-white">Personal Identity &amp; Contact Info</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Not Collected
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-400">Never accessed or transmitted</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-medium text-white">Passwords &amp; Authentication Cookies</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Not Collected
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-400">Never accessed or stored</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-medium text-white">Lobby Match Statistics (K/D, ADR, ELO)</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            Ephemeral / Not Collected
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-400">Fetched directly from FACEIT API into browser runtime memory</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-medium text-white">User Preferences (Language, Toggles)</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            Stored Locally Only
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-400">
                          Persisted on the local device via <code className="text-[#FF5500] bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono border border-white/10">chrome.storage.local</code>
                        </td>
                      </tr>
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
                Local Storage (chrome.storage.local)
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>
                Peekly uses the native Google Chrome Storage API (<code className="text-[#FF5500] bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono border border-white/10">chrome.storage.local</code>) exclusively for client-side functionality:
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400">
                <li><strong className="text-white font-medium">User Configuration:</strong> Remembering user interface settings, selected display language (e.g., English, Russian, Polish, etc.), active module toggles, and notification preferences.</li>
                <li><strong className="text-white font-medium">Ephemeral Match Cache:</strong> Temporarily caching recent match stats with an automated Time-To-Live (TTL) expiration to avoid redundant API queries when refreshing lobby views.</li>
              </ul>
              <p>
                All stored information remains strictly on the user's local machine. It is never synchronized across devices, never transmitted to external servers, and inaccessible to any other website.
              </p>
            </div>
          </div>

          {/* Section 05 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 mb-2 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                05
              </span>
              <h2 className="font-sans text-base md:text-lg font-bold tracking-tight text-white">
                Permissions Justification
              </h2>
            </div>
            <div className="pl-6 space-y-4 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>
                In adherence to the Chrome Web Store policy of minimal permissions, Peekly requests only the permissions strictly necessary for its declared functionality:
              </p>
              <div className="space-y-3.5 my-2 text-left">
                <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 border-l-2 border-l-[#FF5500]">
                  <div className="font-mono text-xs sm:text-sm font-semibold text-white mb-1.5">
                    host_permissions: https://*.faceit.com/*
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-0">
                    Required to inject the analytics user interface (player cards, radar map balance, team indicators) directly into FACEIT web matchrooms and profiles.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 border-l-2 border-l-[#FF5500]">
                  <div className="font-mono text-xs sm:text-sm font-semibold text-white mb-1.5">
                    storage &amp; unlimitedStorage
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-0">
                    Required to store user preferences and temporary match statistics locally on the client without encountering storage quota interruptions.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 border-l-2 border-l-[#FF5500]">
                  <div className="font-mono text-xs sm:text-sm font-semibold text-white mb-1.5">
                    downloads
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-0">
                    Used solely when the user clicks the &ldquo;Download Demo&rdquo; button in match history to initiate the direct browser download of the official CS2 match replay file from FACEIT servers.
                  </p>
                </div>
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
                User Rights &amp; Data Deletion
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>
                Because all data generated by Peekly is stored exclusively on your local machine, you have complete ownership and control over it:
              </p>
              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400">
                <li><strong className="text-white font-medium">Complete Deletion:</strong> Removing the extension from your browser (via <code className="text-[#FF5500] bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono border border-white/10">chrome://extensions</code> &rarr; &ldquo;Remove&rdquo;) permanently and instantly deletes all stored preferences, configurations, and cached data from your machine.</li>
                <li><strong className="text-white font-medium">Feature Control:</strong> You can disable any specific module or feature at any time through the Peekly popup menu without altering other settings.</li>
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
                Contact Information
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>
                If you have questions, feedback, or compliance inquiries regarding this Privacy Policy or Peekly's data practices, please contact us:
              </p>
              <div className="my-4 p-5 sm:p-6 rounded-xl bg-[#0d0d0d] border border-white/10 space-y-3.5 divide-y divide-white/5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">Project:</span>
                  <span className="text-white font-mono">Peekly for FACEIT</span>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">Support Email:</span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <a href="mailto:support@peekly.org" className="text-[#FF5500] hover:text-[#ff6b1a] underline underline-offset-2 font-mono text-xs sm:text-sm transition-colors">
                      support@peekly.org
                    </a>
                    <span className="text-neutral-600 hidden sm:inline">&bull;</span>
                    <a href="mailto:zeacvo@icloud.com" className="text-neutral-400 hover:text-white underline underline-offset-2 font-mono text-xs sm:text-sm transition-colors">
                      zeacvo@icloud.com
                    </a>
                  </div>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">Legal Documentation / Website:</span>
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
                Changes to This Privacy Policy
              </h2>
            </div>
            <div className="pl-6 space-y-3 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
              <p>
                This Privacy Policy may be updated periodically to maintain compliance with relevant browser extension policies or platform modifications. Any updates will be reflected on this page with a revised Effective Date.
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer / Copyright block */}
        <div className="w-full max-w-none pt-8 mt-6 border-t border-white/10 font-sans text-xs text-neutral-500 space-y-2 leading-relaxed cursor-text select-text">
          <p>
            &copy; 2026 Peekly for FACEIT. All rights reserved.
          </p>
          <p>
            Disclaimer: Peekly is an independent software project and is not affiliated with, maintained, authorized, or endorsed by FACEIT Ltd or Valve Corporation. Counter-Strike, CS2, and FACEIT are registered trademarks of their respective owners.
          </p>
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
