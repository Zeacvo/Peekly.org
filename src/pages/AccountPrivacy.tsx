import React, { useEffect } from 'react';
import { ChevronLeft, ShieldCheck, Lock, Database } from 'lucide-react';
import type { Language } from '../translations';
import { translations } from '../translations';
import { ChromeLogo } from '../components/ChromeLogo';

interface AccountPrivacyProps {
  currentLang: Language;
  onBack: () => void;
}

const backLabelMap: Record<Language, string> = {
  en: 'Back to home',
  ru: 'Назад на главную',
  uk: 'Назад на головну',
  da: 'Tilbage til forsiden',
  de: 'Zurück zur Startseite',
  es: 'Volver al inicio',
  fr: "Retour à l'accueil",
  pl: 'Powrót do strony głównej',
  pt: 'Voltar ao início',
  fi: 'Takaisin etusivulle',
  sv: 'Tillbaka till startsidan',
  tr: 'Ana sayfaya dön',
  ar: 'العودة إلى الصفحة الرئيسية',
  ja: 'ホームに戻る',
  ko: '홈으로 돌아가기',
  zh: '返回首页',
};

export const AccountPrivacy: React.FC<AccountPrivacyProps> = ({ currentLang, onBack }) => {
  const isRu = currentLang === 'ru' || currentLang === 'uk';
  const isRtl = currentLang === 'ar';
  const backLabel = backLabelMap[currentLang] || backLabelMap.en;
  const ctaLabel = (translations[currentLang] || translations.en).hero.cta.toUpperCase();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = isRu
      ? 'Учетная запись и приватность — Peekly for FACEIT'
      : 'Peekly Account & Privacy — Peekly for FACEIT';
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {}
    return () => {
      document.title = prevTitle;
    };
  }, [isRu]);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-16 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-stretch z-10 animate-fade-in font-sans"
    >
      {/* 1. Back Navigation Button */}
      <div className={`w-full flex ${isRtl ? 'justify-end' : 'justify-start'} mb-8`}>
        <button
          type="button"
          onClick={onBack}
          className="h-10 px-4 sm:px-5 text-xs font-mono font-bold tracking-wider uppercase border border-transparent bg-white text-black hover:bg-neutral-200 transition-colors duration-150 rounded-none inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <ChevronLeft className={`w-4 h-4 stroke-[2] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{backLabel}</span>
        </button>
      </div>

      {/* 2. Document Header Card */}
      <div className="w-full bg-[#0A0A0A] border border-white/15 p-6 sm:p-10 mb-8 rounded-none shadow-2xl relative overflow-hidden">
        {/* Subtle Accent Glow */}
        <div className="absolute top-0 left-0 w-32 h-1 bg-[#FF5500]" />

        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#FF5500] mb-3">
          <span>LEGAL</span>
          <span className="text-neutral-600">/</span>
          <span>ACCOUNT & PRIVACY</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
          Peekly Account & Privacy
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-3xl">
          {isRu
            ? 'Информация учетной записи Peekly используется исключительно для обеспечения безопасного входа, синхронизации CS2 статистики через официальный FACEIT API и работы серверных функций без передачи третьим лицам.'
            : 'Your Peekly Account information is used exclusively to facilitate secure authentication, synchronize competitive CS2 stats via official FACEIT APIs, and power extension features without sharing data with third parties.'}
        </p>

        {/* Security Highlights Banner */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="flex items-center gap-2.5 text-neutral-300">
            <Lock className="w-4 h-4 text-[#FF5500] shrink-0" />
            <span>PBKDF2 SHA-256 (100k)</span>
          </div>
          <div className="flex items-center gap-2.5 text-neutral-300">
            <Database className="w-4 h-4 text-[#FF5500] shrink-0" />
            <span>Cloudflare D1 SQL Isolation</span>
          </div>
          <div className="flex items-center gap-2.5 text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-[#FF5500] shrink-0" />
            <span>Zero Third-Party Trackers</span>
          </div>
        </div>
      </div>

      {/* 3. Detailed Policy Sections */}
      <div className="space-y-6">
        {/* Section 01: Data Security & Encryption */}
        <div className="w-full bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 rounded-none">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF5500] px-2 py-0.5 bg-[#FF5500]/10 border border-[#FF5500]/30">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {isRu ? 'Data Security & Encryption' : 'Data Security & Encryption'}
            </h2>
          </div>
          <div className="text-sm text-neutral-400 leading-relaxed space-y-3 font-sans">
            <p>
              {isRu
                ? 'Все учетные данные (пароли) шифруются с использованием криптографических стандартов PBKDF2 (SHA-256, 100 000 итераций) с индивидуальной криптографической солью, генерируемой через нативный Web Crypto API. Ваши исходные пароли никогда не сохраняются в открытом виде и не передаются в логах.'
                : 'All account credentials and passwords are encrypted using industry-standard PBKDF2 key derivation (SHA-256 with 100,000 iterations) combined with unique per-user cryptographic salts generated via native Web Crypto API. Raw passwords never touch database storage, persistent logs, or unencrypted memory.'}
            </p>
            <p>
              {isRu
                ? 'Сессионные токены представляют собой 128-битные криптографические идентификаторы, хранящиеся строго в защищенных cookie с флагами HttpOnly, Secure, SameSite=Lax и автоматическим истечением срока действия.'
                : 'Active sessions utilize 128-bit cryptographically secure UUID tokens issued in protected cookies with HttpOnly, Secure, SameSite=Lax attributes, and a strict 30-day time-to-live expiration.'}
            </p>
          </div>
        </div>

        {/* Section 02: CS2 Stats & FACEIT Synchronization */}
        <div className="w-full bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 rounded-none">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF5500] px-2 py-0.5 bg-[#FF5500]/10 border border-[#FF5500]/30">
              02
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {isRu ? 'CS2 Stats & FACEIT Synchronization' : 'CS2 Stats & FACEIT Synchronization'}
            </h2>
          </div>
          <div className="text-sm text-neutral-400 leading-relaxed space-y-3 font-sans">
            <p>
              {isRu
                ? 'Peekly запрашивает исключительно публичные игровые данные с серверов FACEIT (ELO, соревновательный ранг, история матчей, K/D, ADR, винрейт карт). Ваши учетные данные FACEIT или Steam (пароли, Guard-коды) никогда не запрашиваются и не сохраняются на наших серверах.'
                : 'Peekly requests exclusively public competitive gameplay statistics directly from official FACEIT API relays (CS2 ELO, skill level tier, match history, K/D ratios, ADR, and map win rates). Your FACEIT login credentials, Steam guard tokens, and passwords are never requested, stored, or accessible to our service.'}
            </p>
            <p>
              {isRu
                ? 'Авторизация через кнопку «SIGN IN WITH FACEIT» использует официальный протокол FACEIT OAuth 2.0 (FACEIT Connect), передавая токен аутентификации напрямую между вашим браузером и серверами FACEIT.'
                : 'Authentication via "SIGN IN WITH FACEIT" leverages official FACEIT Connect OAuth 2.0 protocols, securely transmitting identity tokens directly between your browser and FACEIT servers.'}
            </p>
          </div>
        </div>

        {/* Section 03: Cloudflare D1 Infrastructure */}
        <div className="w-full bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 rounded-none">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF5500] px-2 py-0.5 bg-[#FF5500]/10 border border-[#FF5500]/30">
              03
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {isRu ? 'Cloudflare D1 Infrastructure' : 'Cloudflare D1 Infrastructure'}
            </h2>
          </div>
          <div className="text-sm text-neutral-400 leading-relaxed space-y-3 font-sans">
            <p>
              {isRu
                ? 'База данных размещена на защищенных изолированных серверах Cloudflare D1. Обработка запросов происходит в распределенной бессерверной среде Cloudflare Pages Functions с автоматической защитой от DDoS-атак и шифрованием трафика по TLS 1.3.'
                : 'Our database infrastructure is deployed on isolated, enterprise-grade Cloudflare D1 SQL clusters. API requests run within distributed Cloudflare Pages Functions serverless runtimes with automated DDoS protection and TLS 1.3 transport encryption.'}
            </p>
            <p>
              {isRu
                ? 'Мы строго придерживаемся принципа нулевой телеметрии: данные учетных записей не передаются рекламным брокерам, внешним аналитическим системам или сторонним трекерам.'
                : 'We operate under a strict zero-telemetry policy: user profiles, login timestamps, and gameplay analytics are never sold, rented, or transmitted to advertising brokers or external tracking networks.'}
            </p>
          </div>
        </div>

        {/* Section 04: Account Control & Deletion */}
        <div className="w-full bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 rounded-none">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-[#FF5500] px-2 py-0.5 bg-[#FF5500]/10 border border-[#FF5500]/30">
              04
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {isRu ? 'Account Control & Deletion' : 'Account Control & Deletion'}
            </h2>
          </div>
          <div className="text-sm text-neutral-400 leading-relaxed space-y-3 font-sans">
            <p>
              {isRu
                ? 'Пользователь имеет право в любой момент запросить полный экспорт или безвозвратное удаление своего профиля и всех связанных сессий. При удалении аккаунта все записи в таблицах users и sessions стираются каскадно без возможности восстановления.'
                : 'You maintain absolute ownership and control over your data. You may request a complete export of your stored profile records or initiate an immediate, permanent, irreversible deletion of your account and associated session tokens at any time.'}
            </p>
            <p>
              {isRu
                ? 'Для запроса удаления учетной записи или консультации по вопросам приватности обратитесь к администрации через официальный email: privacy@peekly.org.'
                : 'To request complete account deletion or for privacy inquiries, contact our security administration directly at privacy@peekly.org.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Bottom Prominent Action CTA Button */}
      <div className="w-full flex justify-center mt-12 mb-8">
        <a
          href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 sm:gap-3.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-sans text-xs md:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-[#FF5500] hover:text-black hover:border-white transition-colors duration-150 btn-chrome-action cursor-pointer shadow-2xl active:scale-95 w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          <ChromeLogo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0 fill-current" />
          <span>{ctaLabel}</span>
        </a>
      </div>
    </div>
  );
};

export default AccountPrivacy;
