import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import type { Language } from '../translations';
import { translations } from '../translations';
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

const privacySectionSummaries: Record<Language, {
  s1: string;
  s2: string;
  s3: string;
  s4: string;
  s5: string;
  s6: string;
  s7: string;
  s8: string;
}> = {
  en: {
    s1: 'Single-purpose mandate & store compliance',
    s2: 'Zero telemetry architecture and strict client-side isolation',
    s3: 'Direct official API queries and zero intermediate servers',
    s4: 'Local configuration preferences and ephemeral match cache',
    s5: 'Minimal required extension permissions for HUD overlay rendering',
    s6: 'Complete local data ownership and instant one-click deletion',
    s7: 'Official project contacts and legal support channels',
    s8: 'Periodic policy updates and revision tracking',
  },
  ru: {
    s1: 'Декларация единой цели и регламент магазина Chrome Web Store',
    s2: 'Архитектура с нулевой телеметрией и строгая изоляция на клиенте',
    s3: 'Прямые официальные API-запросы и отсутствие промежуточных серверов',
    s4: 'Локальное хранение параметров и временный кэш матчей',
    s5: 'Минимально необходимые разрешения расширения для работы интерфейса',
    s6: 'Полный локальный контроль и моментальное удаление всех данных',
    s7: 'Официальные контакты проекта и каналы юридической поддержки',
    s8: 'Периодические обновления политики и отслеживание ревизий',
  },
  da: {
    s1: 'Enkeltformåls-mandat og overholdelse af Chrome Web Store-regler',
    s2: 'Nul-telemetri arkitektur og streng klientside-isolering',
    s3: 'Direkte officielle API-forespørgsler og ingen mellemliggende servere',
    s4: 'Lokale konfigurationsindstillinger og midlertidig match-cache',
    s5: 'Minimalt påkrævede tilladelser til HUD-overlejringsrendering',
    s6: 'Fuld lokalt dataejerskab og øjeblikkelig sletning med et klik',
    s7: 'Officielle projektkontakter og juridiske supportkanaler',
    s8: 'Periodiske politiopdateringer og versionssporing',
  },
  de: {
    s1: 'Single-Purpose-Mandat und Richtlinien-Konformität',
    s2: 'Null-Telemetrie-Architektur und strikte clientseitige Isolation',
    s3: 'Direkte offizielle API-Anfragen und keine Zwischenserver',
    s4: 'Lokale Konfigurationseinstellungen und flüchtiger Match-Cache',
    s5: 'Minimal erforderliche Berechtigungen für das HUD-Overlay',
    s6: 'Vollständige lokale Datenkontrolle und sofortige Löschung',
    s7: 'Offizielle Projektkontakte und juristische Support-Kanäle',
    s8: 'Periodische Richtlinienaktualisierungen und Versionsverfolgung',
  },
  es: {
    s1: 'Mandato de propósito único y cumplimiento normativo',
    s2: 'Arquitectura sin telemetría y estricto aislamiento del lado del cliente',
    s3: 'Consultas directas a la API oficial sin servidores intermediarios',
    s4: 'Preferencias de configuración local y caché temporal de partidas',
    s5: 'Permisos mínimos requeridos para la superposición del HUD',
    s6: 'Control total de datos locales y eliminación instantánea con un clic',
    s7: 'Contactos oficiales del proyecto y canales de soporte legal',
    s8: 'Actualizaciones periódicas de la política y seguimiento de revisiones',
  },
  fr: {
    s1: 'Mandat à but unique et conformité au Chrome Web Store',
    s2: 'Architecture sans télémétrie et isolation stricte côté client',
    s3: 'Requêtes directes à l\'API officielle et aucun serveur relais intermédiaire',
    s4: 'Préférences de configuration locale et cache éphémère des matchs',
    s5: 'Autorisations minimales requises pour le rendu de l\'interface HUD',
    s6: 'Contrôle total des données locales et suppression instantanée en un clic',
    s7: 'Contacts officiels du projet et canaux d\'assistance juridique',
    s8: 'Mises à jour périodiques de la politique et suivi des révisions',
  },
  pl: {
    s1: 'Zasada pojedynczego celu i zgodność z regulaminem Chrome Web Store',
    s2: 'Architektura zero telemetrii i ścisła izolacja po stronie klienta',
    s3: 'Bezpośrednie oficjalne zapytania API bez serwerów pośredniczących',
    s4: 'Lokalne preferencje konfiguracji i tymczasowa pamięć podręczna meczów',
    s5: 'Minimalne wymagane uprawnienia rozszerzenia do nakładki HUD',
    s6: 'Pełna lokalna kontrola danych i natychmiastowe usunięcie jednym kliknięciem',
    s7: 'Oficjalne kontakty projektu i kanały wsparcia prawnego',
    s8: 'Okresowe aktualizacje polityki i śledzenie wersji',
  },
  pt: {
    s1: 'Mandato de finalidade única e conformidade de políticas',
    s2: 'Arquitetura de telemetria zero e isolamento estrito no cliente',
    s3: 'Consultas diretas à API oficial e ausência de servidores intermediários',
    s4: 'Preferências de configuração local e cache temporário de partidas',
    s5: 'Permissões mínimas necessárias para a renderização da interface HUD',
    s6: 'Propriedade total dos dados locais e exclusão instantânea com um clique',
    s7: 'Contatos oficiais do projeto e canais de suporte legal',
    s8: 'Atualizações periódicas da política e rastreamento de revisões',
  },
  fi: {
    s1: 'Yksittäisen käyttötarkoituksen periaate ja sääntöjen noudattaminen',
    s2: 'Nollatelemetrian arkkitehtuuri ja tiukka asiakaspuolen eristys',
    s3: 'Suorat viralliset API-pyynnöt ilman välityspalvelimia',
    s4: 'Paikalliset asetukset ja väliaikainen ottelukatsaus',
    s5: 'Vähimmäisvaatimukset HUD-käyttöliittymän näyttämiselle',
    s6: 'Täysi paikallinen tietojen hallinta ja välitön poisto yhdellä klikkauksella',
    s7: 'Projektin viralliset yhteystiedot ja juridinen tuki',
    s8: 'Käytännön säännölliset päivitykset ja versiohallinta',
  },
  sv: {
    s1: 'Enskilt syfte-mandat och efterlevnad av Chrome Web Store-policy',
    s2: 'Noll-telemetriarkitektur och strikt isolering på klientsidan',
    s3: 'Direkta officiella API-anrop utan mellanliggande servrar',
    s4: 'Lokala konfigurationsinställningar och tillfällig matchcache',
    s5: 'Minsta nödvändiga behörigheter för HUD-överlagring',
    s6: 'Fullständigt lokalt dataägarskap och omedelbar radering med ett klick',
    s7: 'Officiella projektkontakter och juridiska supportkanaler',
    s8: 'Periodiska policyuppdateringar och versionsspårning',
  },
  tr: {
    s1: 'Tek amaç ilkesi ve Chrome Web Store politikalarına uyum',
    s2: 'Sıfır telemetri mimarisi ve istemci tarafında tam yalıtım',
    s3: 'Doğrudan resmi API sorguları ve ara sunucu olmaması',
    s4: 'Yerel yapılandırma tercihleri ve geçici maç önbelleği',
    s5: 'HUD arayüzü çizimi için gerekli minimum eklenti izinleri',
    s6: 'Tam yerel veri kontrolü ve tek tıklamayla anında silme',
    s7: 'Resmi proje iletişim bilgileri ve yasal destek kanalları',
    s8: 'Periyodik politika güncellemeleri ve revizyon takibi',
  },
  uk: {
    s1: 'Декларація єдиної мети та відповідність регламенту Chrome Web Store',
    s2: 'Архітектура з нульовою телеметрією та сувора ізоляція на клієнті',
    s3: 'Прямі офіційні API-запити та відсутність проміжних серверів',
    s4: 'Локальне збереження налаштувань та тимчасовий кеш матчів',
    s5: 'Мінімально необхідні дозволи розширення для відображення інтерфейсу',
    s6: 'Повний локальний контроль та миттєве видалення всіх даних',
    s7: 'Офіційні контакти проєкту та канали юридичної підтримки',
    s8: 'Періодичні оновлення політики та відстеження ревізій',
  },
  ar: {
    s1: 'مبدأ الغرض الواحد والامتثال لسياسات المتجر',
    s2: 'هيكل بدون تتبع وعزل تام من جانب العميل',
    s3: 'طلبات واجهة برمجة مباشرة وبدون خوادم وسيطة',
    s4: 'إعدادات التكوين المحلية وذاكرة التخزين المؤقت المؤقتة',
    s5: 'الحد الأدنى من الأذونات المطلوبة لعرض واجهة المستخدم',
    s6: 'ملكية كاملة للبيانات المحلية وحذف فوري بنقرة واحدة',
    s7: 'جهات الاتصال الرسمية للمشروع وقنوات الدعم القانوني',
    s8: 'تحديثات دورية للسياسة وتتبع المراجعات',
  },
  ja: {
    s1: '単一目的の原則とストアポリシーの遵守',
    s2: 'テレメトリゼロ設計と厳格なクライアント側分離',
    s3: '公式APIへの直接リクエストと中間サーバーの排除',
    s4: 'ローカル設定の保存と一時的なマッチキャッシュ',
    s5: 'HUDオーバーレイ描画に必要な最小限の拡張機能権限',
    s6: '完全なローカルデータ保持とワンクリックでの即時削除',
    s7: 'プロジェクト公式連絡先および法務サポート窓口',
    s8: 'ポリシーの定期的な更新と改訂履歴の追跡',
  },
  ko: {
    s1: '단일 목적 원칙 및 스토어 정책 준수',
    s2: '원격 측정 없는 설계 및 엄격한 클라이언트 측 격리',
    s3: '공식 API 직접 요청 및 중간 서버 배제',
    s4: '로컬 설정 저장 및 임시 매치 캐시',
    s5: 'HUD 오버레이 렌더링에 필요한 최소 확장 프로그램 권한',
    s6: '완전한 로컬 데이터 제어 및 원클릭 즉시 삭제',
    s7: '공식 프로젝트 연락처 및 법적 지원 채널',
    s8: '정기적인 정책 업데이트 및 개정 추적',
  },
  zh: {
    s1: '单一用途原则与商店政策合规',
    s2: '零遥测架构与严格的客户端隔离',
    s3: '直接请求官方 API 且无中间中继服务器',
    s4: '本地配置偏好与临时比赛缓存',
    s5: '用于渲染 HUD 覆盖层所需的最小扩展权限',
    s6: '完全的本地数据所有权与一键即时删除',
    s7: '官方项目联系方式与法律支持渠道',
    s8: '定期政策更新与修订跟踪',
  },
};

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ currentLang, onBack }) => {

  const t = privacyTranslations[currentLang] || privacyTranslations.en;
  const isRtl = currentLang === 'ar';
  const summaries = privacySectionSummaries[currentLang] || privacySectionSummaries.en;
  const ctaLabel = (translations[currentLang] || translations.en).hero.cta.toUpperCase();

  // Synchronize document title dynamically with language without triggering scroll
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${t.pageTitle} — Peekly for FACEIT`;
    return () => {
      document.title = prevTitle;
    };
  }, [t.pageTitle]);

  const backLabel = backLabelMap[currentLang] || backLabelMap.en;

  return (
    <div 
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

      {/* 2. Text Content — ровно 100% ширины контейнера по образцу /changelog */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* H1 Heading (Matches Changelog 1:1) */}
        <h1 className="w-full max-w-none text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          {t.pageTitle}
        </h1>

        {/* Subtitle (Matches Changelog 1:1) */}
        <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          {t.subtitle}
        </p>

        {/* Metadata Badges */}
        <div className="w-full max-w-none flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-400 font-mono mb-10 select-text">
          <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] border border-neutral-800 px-2.5 py-1 rounded-none">
            <span className="text-neutral-500 font-sans">{t.projectLabel}</span>
            <span className="text-white font-medium">{t.projectName}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] border border-neutral-800 px-2.5 py-1 rounded-none">
            <span className="text-neutral-500 font-sans">{t.effectiveDateLabel}</span>
            <span className="text-white font-medium">{t.effectiveDateValue}</span>
          </span>
        </div>

        {/* Sections 01–08 with Linear Header (01 Title — Summary) */}
        <div className="w-full max-w-none space-y-8 sm:space-y-10 font-sans">

          {/* Section 01 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                01
              </span>
              <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
                <span>{t.sections.s1.title}</span>
                <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
                <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
                  {summaries.s1}
                </span>
              </h2>
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sections.s1.p1}</p>
              <p>{t.sections.s1.p2}</p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                02
              </span>
              <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
                <span>{t.sections.s2.title}</span>
                <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
                <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
                  {summaries.s2}
                </span>
              </h2>
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sections.s2.intro}</p>
              <p>{t.sections.s2.subIntro}</p>
              <div className="space-y-3 my-2">
                {t.sections.s2.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-medium text-white block text-sm md:text-[15px]">{b.label}</span>
                    <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-0">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 03 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                03
              </span>
              <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
                <span>{t.sections.s3.title}</span>
                <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
                <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
                  {summaries.s3}
                </span>
              </h2>
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sections.s3.intro}</p>
              <div className="space-y-3 my-2">
                {t.sections.s3.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-medium text-white block text-sm md:text-[15px]">{b.label}</span>
                    <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-0">{b.text}</p>
                  </div>
                ))}
              </div>

              {/* Monochrome Architecture Table (border border-neutral-800, bg-[#0A0A0A]) */}
              <div className="my-5 border border-neutral-800 rounded-none overflow-hidden bg-[#0A0A0A] text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-neutral-900/50 border-b border-neutral-800 text-white font-medium">
                        <th className="py-2.5 sm:py-3 px-3.5 sm:px-4 font-mono text-xs uppercase tracking-wider text-neutral-400">
                          {t.sections.s3.tableHeaders.category}
                        </th>
                        <th className="py-2.5 sm:py-3 px-3.5 sm:px-4 font-mono text-xs uppercase tracking-wider text-neutral-400">
                          {t.sections.s3.tableHeaders.status}
                        </th>
                        <th className="py-2.5 sm:py-3 px-3.5 sm:px-4 font-mono text-xs uppercase tracking-wider text-neutral-400">
                          {t.sections.s3.tableHeaders.method}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 text-neutral-300">
                      {t.sections.s3.tableRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-neutral-900/20 transition-colors">
                          <td className="py-2.5 sm:py-3 px-3.5 sm:px-4 font-medium text-white">{row.category}</td>
                          <td className="py-2.5 sm:py-3 px-3.5 sm:px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-none text-xs font-mono bg-neutral-900 text-neutral-300 border border-neutral-800">
                              {row.status}
                            </span>
                          </td>
                          <td className="py-2.5 sm:py-3 px-3.5 sm:px-4 text-neutral-400">{row.processing}</td>
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
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                04
              </span>
              <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
                <span>{t.sections.s4.title}</span>
                <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
                <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
                  {summaries.s4}
                </span>
              </h2>
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sections.s4.intro}</p>
              <div className="space-y-3 my-2">
                {t.sections.s4.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-medium text-white block text-sm md:text-[15px]">{b.label}</span>
                    <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-0">{b.text}</p>
                  </div>
                ))}
              </div>
              <p>{t.sections.s4.storageNote}</p>
            </div>
          </div>

          {/* Section 05 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                05
              </span>
              <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
                <span>{t.sections.s5.title}</span>
                <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
                <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
                  {summaries.s5}
                </span>
              </h2>
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sections.s5.intro}</p>
              <div className="space-y-2.5 my-3 text-left">
                {t.sections.s5.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-none bg-[#0A0A0A] border border-neutral-800">
                    <div className="font-mono text-xs sm:text-sm font-medium text-white mb-1 tracking-tight select-text">
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
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                06
              </span>
              <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
                <span>{t.sections.s6.title}</span>
                <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
                <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
                  {summaries.s6}
                </span>
              </h2>
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sections.s6.intro}</p>
              <div className="space-y-3 my-2">
                {t.sections.s6.bullets.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-medium text-white block text-sm md:text-[15px]">{b.label}</span>
                    <p className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-0">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 07 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                07
              </span>
              <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
                <span>{t.sections.s7.title}</span>
                <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
                <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
                  {summaries.s7}
                </span>
              </h2>
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sections.s7.intro}</p>
              <div className="my-3.5 p-4 sm:p-5 rounded-none bg-[#0A0A0A] border border-neutral-800 space-y-3 divide-y divide-neutral-800 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">{t.sections.s7.projectLabel}</span>
                  <span className="text-white font-mono">{t.projectName}</span>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">{t.sections.s7.supportEmailLabel}</span>
                  <a href="mailto:support@peekly.org" className="text-white hover:text-neutral-300 underline underline-offset-2 font-mono text-xs sm:text-sm transition-colors">
                    support@peekly.org
                  </a>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-neutral-400 font-medium sm:min-w-[220px]">{t.sections.s7.websiteLabel}</span>
                  <a href="https://peekly.org/privacy" className="text-white hover:text-neutral-300 underline underline-offset-2 font-mono text-xs sm:text-sm transition-colors break-all">
                    https://peekly.org/privacy
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 08 */}
          <div className="w-full max-w-none">
            <div className="w-full max-w-none flex items-baseline gap-2.5 sm:gap-3 mb-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0 w-6 sm:w-7">
                08
              </span>
              <h2 className="w-full max-w-none font-sans text-sm md:text-[15px] font-bold tracking-tight text-white cursor-text select-text leading-snug">
                <span>{t.sections.s8.title}</span>
                <span className="text-neutral-500 font-normal mx-2 select-none">—</span>
                <span className="font-sans text-sm md:text-[15px] font-normal text-neutral-400">
                  {summaries.s8}
                </span>
              </h2>
            </div>
            <div className={`space-y-2.5 font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text ${isRtl ? 'pr-8 sm:pr-10' : 'pl-8 sm:pl-10'}`}>
              <p>{t.sections.s8.text}</p>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Bottom Prominent Action CTA Button (Matches Changelog 1:1) */}
      <div className="w-full flex justify-center mt-12 mb-12">
        <a
          href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 sm:gap-3.5 px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-black font-sans text-xs md:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-[#FF5500] hover:text-black hover:border-white transition-colors duration-150 btn-chrome-action cursor-pointer shadow-2xl active:scale-95 w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          {/* Large Google Chrome Vector Icon */}
          <ChromeLogo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0 fill-current" />
          <span>{ctaLabel}</span>
        </a>
      </div>

    </div>
  );
};

export default PrivacyPage;
