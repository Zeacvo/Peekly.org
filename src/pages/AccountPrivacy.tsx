import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
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

  const renderBadge = (label: string, value: string) => (
    <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] border border-neutral-800 px-2.5 py-1 rounded-none">
      <span className="text-neutral-500 font-sans">{label}</span>
      <strong className="text-white font-medium">{value}</strong>
    </span>
  );

  const renderSectionTitle = (title: string, subtitle: string) => (
    <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
      <span>{title}</span>
      <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
      <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
        {subtitle}
      </span>
    </h2>
  );

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-16 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-stretch z-10 animate-apple-reveal font-sans"
    >
      {/* 1. Back Navigation Button */}
      <div className={`w-full flex ${isRtl ? 'justify-end' : 'justify-start'} mb-8`}>
        <button
          type="button"
          onClick={onBack}
          className="h-10 px-4 sm:px-5 text-sm font-semibold border border-transparent bg-white text-black hover:bg-neutral-200 hover:border-white transition-all duration-150 rounded-none inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <ChevronLeft className={`w-4 h-4 stroke-[2] shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{backLabel}</span>
        </button>
      </div>

      {/* 2. Text Content — Monolithic Document Layout matching Terms & Privacy */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">
        {/* H1 Heading */}
        <h1 className="w-full max-w-none text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          Peekly Account & Privacy
        </h1>

        {/* Subtitle */}
        <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          {isRu
            ? 'Технические меры защиты, политика нулевой телеметрии и архитектура безопасности учетных записей.'
            : 'Technical safeguards, zero-telemetry policy, and security architecture.'}
        </p>

        {/* Metadata Badges */}
        <div className="w-full max-w-none flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-400 font-mono mb-10 select-text">
          {renderBadge(isRu ? 'Проект:' : 'Project:', 'Peekly for FACEIT')}
          {renderBadge(isRu ? 'Дата вступления в силу:' : 'Effective Date:', isRu ? 'Октябрь 2026' : 'October 2026')}
        </div>

        {/* Sections 01–04 with Linear Header */}
        <div className="w-full max-w-none space-y-8 sm:space-y-10 font-sans">
          {/* Section 01 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                01
              </span>
              {renderSectionTitle(
                isRu ? 'Безопасность данных и шифрование' : 'Data Security & Encryption',
                'PBKDF2 SHA-256 (100k iterations) & salt isolation'
              )}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>
                {isRu
                  ? 'Все учетные данные и пароли шифруются с использованием криптографических стандартов PBKDF2 (SHA-256 с 100 000 итераций) с индивидуальной криптографической солью, генерируемой через нативный Web Crypto API. Исходные пароли никогда не сохраняются в открытом виде, не передаются в логах и не доступны в незашифрованной памяти.'
                  : 'All account credentials and passwords are encrypted using industry-standard PBKDF2 key derivation (SHA-256 with 100,000 iterations) combined with unique per-user cryptographic salts generated via native Web Crypto API. Raw passwords never touch database storage, persistent logs, or unencrypted memory.'}
              </p>
              <p>
                {isRu
                  ? 'Активные сессии используют 128-битные криптографически защищенные токены UUID, выдаваемые в cookie с флагами HttpOnly, Secure, SameSite=Lax и строгим сроком действия 30 дней.'
                  : 'Active sessions utilize 128-bit cryptographically secure UUID tokens issued in protected cookies with HttpOnly, Secure, SameSite=Lax attributes, and a strict 30-day time-to-live expiration.'}
              </p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                02
              </span>
              {renderSectionTitle(
                isRu ? 'CS2 статистика и синхронизация с FACEIT' : 'CS2 Stats & FACEIT Synchronization',
                'Client-side API requests, no credential access'
              )}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>
                {isRu
                  ? 'Peekly запрашивает исключительно общедоступные статистические данные соревновательных матчей напрямую с официальных API FACEIT (CS2 ELO, уровень мастерства, история матчей, K/D, ADR, винрейт карт). Ваши учетные данные FACEIT или Steam (логины, пароли, Guard-токены) никогда не запрашиваются, не сохраняются и не доступны нашему сервису.'
                  : 'Peekly requests exclusively public competitive gameplay statistics directly from official FACEIT API relays (CS2 ELO, skill level tier, match history, K/D ratios, ADR, and map win rates). Your FACEIT login credentials, Steam guard tokens, and passwords are never requested, stored, or accessible to our service.'}
              </p>
              <p>
                {isRu
                  ? 'Авторизация через «Continue with FACEIT» использует официальный протокол FACEIT Connect OAuth 2.0, безопасно передавая токены идентификации напрямую между вашим браузером и серверами FACEIT.'
                  : 'Authentication via "Continue with FACEIT" leverages official FACEIT Connect OAuth 2.0 protocols, securely transmitting identity tokens directly between your browser and FACEIT servers.'}
              </p>
            </div>
          </div>

          {/* Section 03 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                03
              </span>
              {renderSectionTitle(
                isRu ? 'Инфраструктура Cloudflare D1' : 'Cloudflare D1 Infrastructure',
                'Distributed SQL isolation, no tracking telemetry'
              )}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>
                {isRu
                  ? 'База данных развернута в изолированных защищенных кластерах Cloudflare D1 SQL корпоративного уровня. Обработка API-запросов выполняется в распределенной бессерверной среде Cloudflare Pages Functions с автоматической защитой от DDoS-атак и сквозным шифрованием TLS 1.3.'
                  : 'Our database infrastructure is deployed on isolated, enterprise-grade Cloudflare D1 SQL clusters. API requests run within distributed Cloudflare Pages Functions serverless runtimes with automated DDoS protection and TLS 1.3 transport encryption.'}
              </p>
              <p>
                {isRu
                  ? 'Мы строго соблюдаем политику нулевой телеметрии: профили пользователей, временные метки входа и аналитика матчей никогда не продаются, не передаются рекламным брокерам и не отправляются во внешние сети отслеживания.'
                  : 'We operate under a strict zero-telemetry policy: user profiles, login timestamps, and gameplay analytics are never sold, rented, or transmitted to advertising brokers or external tracking networks.'}
              </p>
            </div>
          </div>

          {/* Section 04 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                04
              </span>
              {renderSectionTitle(
                isRu ? 'Управление учетной записью и удаление' : 'Account Control & Deletion',
                'Complete local data ownership and instant one-click deletion'
              )}
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>
                {isRu
                  ? 'Пользователь сохраняет полный контроль и право собственности на свои данные. Вы можете в любой момент запросить полный экспорт записей своего профиля или инициировать немедленное, безвозвратное удаление учетной записи и всех связанных токенов сессий.'
                  : 'You maintain absolute ownership and control over your data. You may request a complete export of your stored profile records or initiate an immediate, permanent, irreversible deletion of your account and associated session tokens at any time.'}
              </p>
              <p>
                {isRu
                  ? 'Для запроса полного удаления учетной записи или консультации по вопросам конфиденциальности обратитесь к администрации безопасности напрямую по адресу: privacy@peekly.org.'
                  : 'To request complete account deletion or for privacy inquiries, contact our security administration directly at privacy@peekly.org.'}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Bottom Prominent Action CTA Button */}
        <div className="w-full flex justify-center mt-12 mb-4">
          <a
            href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 sm:gap-3.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-sans text-xs md:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-neutral-200 transition-colors duration-150 btn-chrome-action cursor-pointer shadow-2xl active:scale-95 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <ChromeLogo className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 fill-current" />
            <span>{ctaLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountPrivacy;
