import React, { useEffect } from 'react';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import type { Language } from '../translations';

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

  const backLabel = backLabelMap[currentLang] || 'Back to home';

  return (
    <main className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-16 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-stretch z-10 animate-apple-reveal font-sans">
      
      {/* 1. Back Navigation Button */}
      <div className="w-full flex justify-start mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="h-10 px-4 sm:px-5 text-sm font-semibold border border-transparent bg-white text-black hover:bg-[#FF5500] hover:border-white transition-all duration-150 rounded-none inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2] shrink-0" />
          <span>{backLabel}</span>
        </button>
      </div>

      {/* 2. Document Header */}
      <header className="border-b border-white/10 pb-6 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FF5500] mb-4">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
          <span>Official Legal Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Privacy Policy
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-400 font-mono">
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
      </header>

      {/* 3. Main Content Sections */}
      <div className="space-y-10 text-zinc-300 text-sm sm:text-[15px] leading-relaxed">

        {/* Section 1 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
            1. Introduction & Single Purpose
          </h2>
          <p className="mb-3">
            This Privacy Policy governs the browser extension <strong className="text-white font-semibold">Peekly for FACEIT</strong> (&ldquo;Peekly&rdquo;, &ldquo;the Extension&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), developed to enhance the competitive matchmaking experience for players on the FACEIT competitive platform (<a href="https://www.faceit.com" target="_blank" rel="noopener noreferrer" className="text-[#FF5500] hover:text-[#ff6b1a] underline underline-offset-2 transition-colors">faceit.com</a>).
          </p>
          <p>
            In full accordance with the Google Chrome Web Store Developer Program Policies, Peekly operates under a strict <strong className="text-white font-semibold">Single Purpose</strong> mandate: to compute and render transparent match performance intelligence (recent match statistics, rating dynamics, map balance radar, and match history insights) directly inside authorized FACEIT matchroom interfaces.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
            2. Data Collection & Usage
          </h2>
          <p className="mb-3">
            Peekly is engineered on strict <strong className="text-white font-semibold">privacy-by-design</strong> principles. We explicitly state that the Extension does <strong className="text-white font-semibold">not</strong> collect, store, sell, trade, or transfer any Personally Identifiable Information (PII) to external developers or commercial third parties.
          </p>
          <p className="mb-2">Specifically:</p>
          <ul className="list-disc list-inside space-y-2 ml-1 text-zinc-300">
            <li>
              <strong className="text-white">No Personal Identifiers:</strong> We do not collect or process your real name, email address, physical address, phone number, or IP address.
            </li>
            <li>
              <strong className="text-white">No Account Credentials:</strong> Peekly never accesses, logs, or stores your FACEIT passwords, Steam authentication credentials, API tokens, or payment methods.
            </li>
            <li>
              <strong className="text-white">No Private Communications:</strong> The Extension does not inspect, read, or record private chat messages, friend lists, or direct communications.
            </li>
            <li>
              <strong className="text-white">No Browsing History:</strong> Peekly does not monitor, track, or record your web browsing activity outside of authorized <code className="text-[#FF5500] bg-white/5 px-2 py-0.5 rounded text-xs font-mono border border-white/10">faceit.com</code> matchrooms and profiles.
            </li>
            <li>
              <strong className="text-white">No Third-Party Trackers or Analytics:</strong> Peekly contains zero analytics SDKs, tracking pixels, telemetry scripts, or advertising trackers (including Google Analytics, Yandex Metrika, Sentry, or Mixpanel).
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
            3. Data Processing Architecture
          </h2>
          <p className="mb-3">
            All data processing is executed strictly <strong className="text-white font-semibold">client-side</strong> within your local web browser session:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-1 mb-4 text-zinc-300">
            <li>
              <strong className="text-white">Direct Official API Requests:</strong> Statistical queries (e.g., K/D ratio, ADR, HLTV rating, match history) are performed directly from your browser to official public FACEIT API endpoints (such as <code className="text-[#FF5500] bg-white/5 px-2 py-0.5 rounded text-xs font-mono border border-white/10">https://open.faceit.com/*</code> and <code className="text-[#FF5500] bg-white/5 px-2 py-0.5 rounded text-xs font-mono border border-white/10">https://api.faceit.com/*</code>).
            </li>
            <li>
              <strong className="text-white">No Intermediate Servers:</strong> Peekly operates without proprietary proxy servers, relay endpoints, or cloud databases. No query or session data passes through third-party infrastructure.
            </li>
          </ul>

          <div className="my-6 border border-white/10 rounded-xl overflow-hidden bg-[#0d0d0d] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                    <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">Data Category</th>
                    <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">Collection Status</th>
                    <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-neutral-300">Processing Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">Personal Identity & Contact Info</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Not Collected
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">Never accessed or transmitted</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">Passwords & Authentication Cookies</td>
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
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
            4. Local Storage (chrome.storage.local)
          </h2>
          <p className="mb-3">
            Peekly uses the native Google Chrome Storage API (<code className="text-[#FF5500] bg-white/5 px-2 py-0.5 rounded text-xs font-mono border border-white/10">chrome.storage.local</code>) exclusively for client-side functionality:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-1 mb-3 text-zinc-300">
            <li>
              <strong className="text-white">User Configuration:</strong> Remembering user interface settings, selected display language (e.g., English, Russian, Polish, etc.), active module toggles, and notification preferences.
            </li>
            <li>
              <strong className="text-white">Ephemeral Match Cache:</strong> Temporarily caching recent match stats with an automated Time-To-Live (TTL) expiration to avoid redundant API queries when refreshing lobby views.
            </li>
          </ul>
          <p>
            All stored information remains strictly on the user's local machine. It is never synchronized across devices, never transmitted to external servers, and inaccessible to any other website.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
            5. Permissions Justification
          </h2>
          <p className="mb-4">
            In adherence to the Chrome Web Store policy of minimal permissions, Peekly requests only the permissions strictly necessary for its declared functionality:
          </p>

          <div className="space-y-4 my-4">
            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 border-l-2 border-l-[#FF5500]">
              <div className="font-mono text-sm font-semibold text-white mb-1.5">
                host_permissions: https://*.faceit.com/*
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Required to inject the analytics user interface (player cards, radar map balance, team indicators) directly into FACEIT web matchrooms and profiles.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 border-l-2 border-l-[#FF5500]">
              <div className="font-mono text-sm font-semibold text-white mb-1.5">
                storage & unlimitedStorage
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Required to store user preferences and temporary match statistics locally on the client without encountering storage quota interruptions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 border-l-2 border-l-[#FF5500]">
              <div className="font-mono text-sm font-semibold text-white mb-1.5">
                downloads
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Used solely when the user clicks the &ldquo;Download Demo&rdquo; button in match history to initiate the direct browser download of the official CS2 match replay file from FACEIT servers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
            6. User Rights & Data Deletion
          </h2>
          <p className="mb-3">
            Because all data generated by Peekly is stored exclusively on your local machine, you have complete ownership and control over it:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-1 text-zinc-300">
            <li>
              <strong className="text-white">Complete Deletion:</strong> Removing the extension from your browser (via <code className="text-[#FF5500] bg-white/5 px-2 py-0.5 rounded text-xs font-mono border border-white/10">chrome://extensions</code> &rarr; &ldquo;Remove&rdquo;) permanently and instantly deletes all stored preferences, configurations, and cached data from your machine.
            </li>
            <li>
              <strong className="text-white">Feature Control:</strong> You can disable any specific module or feature at any time through the Peekly popup menu without altering other settings.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
            7. Contact Information
          </h2>
          <p className="mb-4">
            If you have questions, feedback, or compliance inquiries regarding this Privacy Policy or Peekly's data practices, please contact us:
          </p>

          <div className="my-4 p-5 sm:p-6 rounded-xl bg-[#0d0d0d] border border-white/10 space-y-3.5 divide-y divide-white/5">
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
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            This Privacy Policy may be updated periodically to maintain compliance with relevant browser extension policies or platform modifications. Any updates will be reflected on this page with a revised Effective Date.
          </p>
        </section>

      </div>

      {/* Document Footer Disclaimer */}
      <div className="mt-14 pt-8 border-t border-white/10 text-xs text-neutral-500 space-y-2 leading-relaxed">
        <p>
          &copy; 2026 Peekly for FACEIT. All rights reserved.
        </p>
        <p>
          Disclaimer: Peekly is an independent software project and is not affiliated with, maintained, authorized, or endorsed by FACEIT Ltd or Valve Corporation. Counter-Strike, CS2, and FACEIT are registered trademarks of their respective owners.
        </p>
      </div>

    </main>
  );
};

export default PrivacyPage;
