import React, { useEffect } from 'react';
import type { Language } from '../translations';
import { linkSuccessTranslations } from '../data/linkSuccessTranslations';

interface LinkSuccessPageProps {
  currentLang?: Language;
  onGoHome?: () => void;
  onGoProfile?: () => void;
}

export const LinkSuccessPage: React.FC<LinkSuccessPageProps> = ({
  currentLang = 'ru',
  onGoHome,
  onGoProfile,
}) => {
  const lang: Language = currentLang || 'ru';
  const t = linkSuccessTranslations[lang] || linkSuccessTranslations.ru;
  const isRtl = lang === 'ar';

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${t.pageTitle} — Peekly for FACEIT`;
    return () => {
      document.title = prevTitle;
    };
  }, [t.pageTitle]);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const dataParam = urlParams.get('data');
      let parsed: any = null;
      if (dataParam) {
        let raw = dataParam;
        for (let i = 0; i < 5; i++) {
          if (!raw.includes('%')) break;
          try {
            const next = decodeURIComponent(raw);
            if (next === raw) break;
            raw = next;
          } catch {
            break;
          }
        }
        try {
          parsed = JSON.parse(raw);
        } catch {
          try {
            parsed = JSON.parse(dataParam);
          } catch {}
        }
      }
      if (!parsed) {
        const match = document.cookie.match(/peekly_user=([^;]+)/);
        if (match) {
          let cRaw = match[1];
          for (let i = 0; i < 5; i++) {
            if (!cRaw.includes('%')) break;
            try {
              const next = decodeURIComponent(cRaw);
              if (next === cRaw) break;
              cRaw = next;
            } catch {
              break;
            }
          }
          try {
            parsed = JSON.parse(cRaw);
          } catch {}
        }
      }

      // Notify extension via all known IDs, window message, and custom event
      const KNOWN_EXTENSION_IDS = [
        'ohkbcdegfepkjgljolmmonkpncjhoaek',
        'cmfgneodcjfofdcglbbhcghijgcjcokk',
      ];
      if (typeof window !== 'undefined' && (window as any).chrome?.runtime?.sendMessage) {
        for (const extId of KNOWN_EXTENSION_IDS) {
          try {
            (window as any).chrome.runtime.sendMessage(
              extId,
              {
                type: 'PEEKLY_AUTH_SUCCESS',
                profile: parsed,
              },
              () => {
                if ((window as any).chrome?.runtime?.lastError) {
                  void (window as any).chrome.runtime.lastError;
                }
              }
            );
          } catch {}
        }
      }

      window.postMessage({ type: 'PEEKLY_AUTH_SUCCESS', profile: parsed }, '*');
      try {
        document.dispatchEvent(new CustomEvent('PEEKLY_AUTH_SUCCESS', { detail: parsed }));
      } catch {}

      if (window.opener) {
        window.opener.postMessage({ type: 'PEEKLY_AUTH_SUCCESS', profile: parsed }, '*');
      }

      if (parsed) {
        localStorage.setItem('peekly_auth_token', JSON.stringify({ profile: parsed, ts: Date.now() }));
      }
    } catch (e) {
      console.warn('[LinkSuccessPage] Init error:', e);
    }
  }, []);

  const handleHomeOrClose = () => {
    try {
      window.opener = null;
      window.open('', '_self');
      window.close();
    } catch {}
    try {
      window.close();
    } catch {}
    setTimeout(() => {
      if (onGoHome) {
        onGoHome();
      } else {
        window.location.href = '/';
      }
    }, 100);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-4 sm:py-6 z-10 animate-apple-reveal font-sans"
    >
      <div className="bg-[#090909] border border-[#1A1A1F] rounded-none p-6 sm:p-8 max-w-[420px] w-full text-center flex flex-col items-center select-none shadow-2xl">
        {/* White checkmark badge */}
        <div className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center mb-4 text-white shrink-0">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title: Sentence-case, no caps, ending with a period */}
        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight mb-5">
          {t.title}
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full justify-center">
          <button
            type="button"
            onClick={handleHomeOrClose}
            className="w-full py-3 sm:py-3.5 px-6 bg-white text-black font-bold text-sm sm:text-base border border-white rounded-none transition-colors duration-150 hover:bg-[#FF5500] hover:border-[#FF5500] hover:text-white cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white flex items-center justify-center"
          >
            {t.goHome}
          </button>
          <button
            type="button"
            onClick={() => {
              if (onGoProfile) {
                onGoProfile();
              } else {
                window.location.href = '/profile';
              }
            }}
            className="w-full py-3 sm:py-3.5 px-6 bg-[#090909] text-white font-bold text-sm sm:text-base border border-[#1A1A1F] rounded-none transition-colors duration-150 hover:border-[#FF5500] hover:text-[#FF5500] cursor-pointer inline-flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {t.goToProfile}
          </button>
        </div>
      </div>
    </div>
  );
};
