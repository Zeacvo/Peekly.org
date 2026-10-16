import React, { useEffect, useState } from 'react';
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
  const [elapsedTime, setElapsedTime] = useState<number>(0);

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

  // Intro animation timer (smooth 3.2s kinematic sequence, then freezes permanently in static state)
  useEffect(() => {
    const TOTAL_DURATION = 3200; // 3.2 seconds intro
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(TOTAL_DURATION, now - start);
      setElapsedTime(elapsed / 1000); // 0.0 to 3.2

      if (elapsed < TOTAL_DURATION) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const backLabel = backLabelMap[currentLang] || backLabelMap.en;
  const isFinal = elapsedTime >= 3.2;
  const animTime = elapsedTime;

  // Staggered easing curves matching Feature Cards 01-10 design code
  // Stage 1: Container scale & opacity (0.0 -> 0.4s)
  const containerProgress = isFinal ? 1 : Math.min(1, animTime / 0.4);
  const containerEase = isFinal ? 1 : 1 - Math.pow(1 - containerProgress, 3);
  const containerScale = 0.98 + 0.02 * containerEase;

  // Stage 2: Browser window & client elements (0.2 -> 0.8s)
  const block1Progress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 0.2) / 0.6));
  const block1Ease = isFinal ? 1 : 1 - Math.pow(1 - block1Progress, 3);
  const block1TranslateY = (1 - block1Ease) * 8;

  // Stage 3: Local data pipeline stream (0.6 -> 1.2s)
  const flow1Progress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 0.6) / 0.6));
  const flow1Ease = isFinal ? 1 : 1 - Math.pow(1 - flow1Progress, 3);

  // Stage 4: Local Sandbox with [ ] brackets & memory matrix (0.9 -> 1.6s)
  const block2Progress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 0.9) / 0.7));
  const block2Ease = isFinal ? 1 : 1 - Math.pow(1 - block2Progress, 3);
  const block2TranslateY = (1 - block2Ease) * 8;

  // Stage 5: Outgoing transmission blockade with white X strike (1.5 -> 2.2s)
  const blockStrikeProgress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 1.5) / 0.7));
  const blockStrikeEase = isFinal ? 1 : 1 - Math.pow(1 - blockStrikeProgress, 3);
  const strikeScale = isFinal ? 1 : (blockStrikeProgress > 0 ? 0.6 + 0.4 * blockStrikeEase : 0);

  // Stage 6: External server block muted appearance (1.8 -> 2.5s)
  const block3Progress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 1.8) / 0.7));
  const block3Ease = isFinal ? 1 : 1 - Math.pow(1 - block3Progress, 3);

  // Stage 7: Contrast indicators illumination (2.2 -> 2.9s)
  const accentProgress = isFinal ? 1 : Math.max(0, Math.min(1, (animTime - 2.2) / 0.7));
  const accentEase = isFinal ? 1 : 1 - Math.pow(1 - accentProgress, 2);

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

      {/* 2. Top Card: Authentic 1:1 Feature Cards Wireframe Infographic (Client -> Sandbox [ ] -> Blocked ✕ External) */}
      <div className="w-full bg-[#0a0a0a] border border-[#262626] rounded-none overflow-hidden mb-10 shadow-2xl relative" style={{ contain: 'layout' }}>
        <div className="h-72 sm:h-96 min-h-[288px] sm:min-h-[384px] w-full flex items-center justify-center p-3 sm:p-6 bg-[#0a0a0a]">
          <svg 
            role="img"
            aria-label="Peekly Client-Side Sandbox and Zero-Telemetry Architecture Diagram"
            className="w-full h-full max-w-3xl object-contain select-none pointer-events-none" 
            viewBox="0 0 540 220" 
            fill="none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <rect width="540" height="220" fill="#0a0a0a" />

            {/* Overall Animated Container (opacity: 0 -> 1, scale: 0.98 -> 1) */}
            <g 
              opacity={containerEase} 
              transform={`scale(${containerScale})`}
              style={{ transformOrigin: '270px 110px' }}
            >
              {/* Subtle Architectural Horizontal Axis Guides */}
              <line x1="20" y1="20" x2="520" y2="20" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
              <line x1="20" y1="200" x2="520" y2="200" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />

              {/* ======================================================== */}
              {/* 1. CLIENT BLOCK (Browser / Extension)                    */}
              {/* ======================================================== */}
              <g 
                opacity={block1Ease} 
                transform={`translate(0, ${block1TranslateY})`}
              >
                {/* Window Shell Frame */}
                <rect x="24" y="32" width="144" height="156" fill="#0d0d0d" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
                
                {/* Window Header Line */}
                <line x1="24" y1="56" x2="168" y2="56" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                
                {/* 3 Window Dots (● ● ● r=3, identical to cards 04-06) */}
                <circle cx="36" cy="44" r="3" fill="#555555" />
                <circle cx="46" cy="44" r="3" fill="#555555" />
                <circle cx="56" cy="44" r="3" fill="#555555" />

                {/* Mini Window Tab Skeleton */}
                <rect x="68" y="41" width="46" height="6" fill="#222222" />

                {/* Mini Extension Active Indicator Badge */}
                <rect x="144" y="41" width="14" height="6" fill="#ffffff" opacity={accentEase} />

                {/* Profile Card Inside Browser */}
                {/* Avatar Slot with Silhouette (Authentic 1:1 match to Card 02 Stats Overlay) */}
                <g transform="translate(36, 68)">
                  <rect width="28" height="28" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <circle cx="14" cy="11" r="4" fill="#777777" />
                  <path d="M 7 23 C 7 17 10 16 14 16 C 18 16 21 17 21 23 Z" fill="#777777" />
                </g>

                {/* Nickname & Subtitle Skeletons */}
                <rect x="72" y="72" width="82" height="7" fill="#ffffff" />
                <rect x="72" y="85" width="50" height="5" fill="#4a4a4a" />

                {/* Divider */}
                <line x1="36" y1="104" x2="156" y2="104" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* 3 Match Stats Rows */}
                <g transform="translate(36, 112)">
                  {/* Row 1 */}
                  <rect x="0" y="0" width="22" height="6" fill="#ffffff" />
                  <rect x="28" y="0" width="48" height="6" fill="#444444" />
                  <rect x="82" y="0" width="38" height="6" fill="#2a2a2a" />

                  {/* Row 2 */}
                  <rect x="0" y="12" width="22" height="6" fill="#666666" />
                  <rect x="28" y="12" width="40" height="6" fill="#333333" />
                  <rect x="82" y="12" width="38" height="6" fill="#222222" />

                  {/* Row 3 */}
                  <rect x="0" y="24" width="22" height="6" fill="#444444" />
                  <rect x="28" y="24" width="54" height="6" fill="#2a2a2a" />
                  <rect x="82" y="24" width="38" height="6" fill="#1c1c1c" />
                </g>

                {/* Bottom Extraction Plate (Arrows directly into local storage) */}
                <rect x="36" y="152" width="120" height="24" fill="#141414" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <path d="M 44 167 L 48 164 L 44 161" stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="54" y="161" width="88" height="6" fill="#ffffff" />
              </g>

              {/* ======================================================== */}
              {/* PIPELINE 1 -> 2 (Client to Local Sandbox Flow)          */}
              {/* ======================================================== */}
              <g opacity={flow1Ease}>
                {/* Upper circuit wire */}
                <line x1="168" y1="78" x2="198" y2="78" stroke="#333333" strokeWidth="1" strokeDasharray="3 3" />
                <polygon points="197,75 203,78 197,81" fill="#333333" />

                {/* Main Solid Data Pipeline */}
                <line x1="168" y1="110" x2="200" y2="110" stroke="#ffffff" strokeWidth="1.5" />
                <polygon points="199,106 206,110 199,114" fill="#ffffff" />

                {/* Lower circuit wire */}
                <line x1="168" y1="164" x2="198" y2="164" stroke="#333333" strokeWidth="1" strokeDasharray="3 3" />
                <polygon points="197,161 203,164 197,167" fill="#333333" />

                {/* Moving data packet during intro */}
                {!isFinal && flow1Progress > 0 && (
                  <circle cx={168 + flow1Progress * 32} cy="110" r="3" fill="#ffffff" />
                )}
              </g>

              {/* ======================================================== */}
              {/* 2. ISOLATION BLOCK (Local Sandbox in Reticle Brackets)   */}
              {/* ======================================================== */}
              <g 
                opacity={block2Ease} 
                transform={`translate(0, ${block2TranslateY})`}
              >
                {/* High-Contrast White Reticle Framing Brackets [ ] (Card 05 Lobby Focus Mode) */}
                <path 
                  d="M 218 36 L 206 36 L 206 184 L 218 184" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="square" 
                  strokeLinejoin="miter" 
                />
                <path 
                  d="M 322 36 L 334 36 L 334 184 L 322 184" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="square" 
                  strokeLinejoin="miter" 
                />

                {/* Sandbox Enclosure Body */}
                <rect x="212" y="42" width="116" height="136" fill="#0d0d0d" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

                {/* Sandbox Header Status Tag */}
                <rect x="222" y="52" width="62" height="7" fill="#ffffff" />
                <rect x="296" y="52" width="22" height="7" fill="#242424" />
                <circle cx="312" cy="55.5" r="2" fill="#ffffff" opacity={accentEase} />

                {/* Divider */}
                <line x1="222" y1="67" x2="318" y2="67" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                {/* Internal Circulating Memory Matrix (A <-> B loop, 100% inside sandbox) */}
                {/* Unit A */}
                <rect x="222" y="74" width="40" height="26" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <rect x="228" y="80" width="28" height="5" fill="#888888" />
                <rect x="228" y="89" width="18" height="4" fill="#444444" />

                {/* Unit B */}
                <rect x="278" y="74" width="40" height="26" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <rect x="284" y="80" width="28" height="5" fill="#ffffff" />
                <rect x="284" y="89" width="20" height="4" fill="#666666" />

                {/* Bi-directional Closed-Loop Arrows */}
                {/* Forward A -> B */}
                <line x1="264" y1="83" x2="274" y2="83" stroke="#ffffff" strokeWidth="1.2" />
                <polygon points="272,81 276,83 272,85" fill="#ffffff" />
                {/* Return B -> A */}
                <line x1="266" y1="91" x2="276" y2="91" stroke="#888888" strokeWidth="1.2" />
                <polygon points="268,89 264,91 268,93" fill="#888888" />

                {/* Local Client Processing Pipeline Rows */}
                <rect x="222" y="108" width="96" height="14" fill="#121212" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <rect x="228" y="113" width="50" height="4" fill="#ffffff" />
                <rect x="286" y="113" width="26" height="4" fill="#555555" />

                <rect x="222" y="126" width="96" height="14" fill="#121212" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <rect x="228" y="131" width="38" height="4" fill="#888888" />
                <rect x="274" y="131" width="38" height="4" fill="#333333" />

                {/* Bottom Client-Side Seal Plate (Solid High-Contrast White, Zero Telemetry) */}
                <rect x="222" y="148" width="96" height="20" fill="#ffffff" />
                <rect x="230" y="156" width="56" height="4" fill="#000000" />
                <rect x="292" y="154" width="18" height="8" fill="#000000" />
              </g>

              {/* ======================================================== */}
              {/* 3. BLOCKED OUTGOING GATEWAY (Firewall Plug & Strike X)   */}
              {/* ======================================================== */}
              <g opacity={blockStrikeEase}>
                {/* Attempted Outgoing Data Trace (Broken / Blocked) */}
                <line x1="334" y1="110" x2="356" y2="110" stroke="#666666" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="368" y1="110" x2="384" y2="110" stroke="#333333" strokeWidth="1" strokeDasharray="2 3" />
                <polygon points="383,107 388,110 383,113" fill="#333333" />

                {/* Upper status blocked tag */}
                <rect x="348" y="70" width="28" height="10" fill="#181818" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <rect x="352" y="74" width="20" height="2" fill="#ffffff" />

                {/* Solid Monolithic Lockout Plug */}
                <rect x="359" y="86" width="6" height="48" fill="#ffffff" />

                {/* Heavy 90° Strike Cross ✕ (100% Client-Side Blockade) */}
                <g 
                  transform={`scale(${strikeScale})`} 
                  style={{ transformOrigin: '362px 110px' }}
                >
                  <line x1="352" y1="100" x2="372" y2="120" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="square" />
                  <line x1="352" y1="120" x2="372" y2="100" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="square" />
                </g>

                {/* Lower security lock pin */}
                <rect x="357" y="138" width="10" height="10" fill="#1a1a1a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <circle cx="362" cy="143" r="2" fill="#ffffff" />
              </g>

              {/* ======================================================== */}
              {/* 4. REMOTE SERVERS BLOCK (Muted / Zero Telemetry / Dark)  */}
              {/* ======================================================== */}
              <g opacity={0.28 * block3Ease}>
                {/* Dashed Shell for Inactive External Cloud/Server */}
                <rect x="390" y="32" width="126" height="156" fill="#070707" stroke="#333333" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* External Server Header */}
                <line x1="390" y1="56" x2="516" y2="56" stroke="#222222" strokeWidth="1" />
                <rect x="402" y="42" width="50" height="6" fill="#222222" />
                <circle cx="504" cy="45" r="2.5" fill="#222222" />

                {/* 3 Empty Inactive Server Rack Slots (0 Bytes Received) */}
                <g transform="translate(402, 66)">
                  {/* Slot 1 */}
                  <rect x="0" y="0" width="102" height="22" fill="#0a0a0a" stroke="#1f1f1f" strokeWidth="1" />
                  <circle cx="10" cy="11" r="2.5" fill="#282828" />
                  <rect x="20" y="9" width="46" height="4" fill="#222222" />
                  <rect x="74" y="9" width="20" height="4" fill="#1a1a1a" />

                  {/* Slot 2 */}
                  <rect x="0" y="28" width="102" height="22" fill="#0a0a0a" stroke="#1f1f1f" strokeWidth="1" />
                  <circle cx="10" cy="39" r="2.5" fill="#282828" />
                  <rect x="20" y="37" width="38" height="4" fill="#222222" />
                  <rect x="68" y="37" width="26" height="4" fill="#1a1a1a" />

                  {/* Slot 3 */}
                  <rect x="0" y="56" width="102" height="22" fill="#0a0a0a" stroke="#1f1f1f" strokeWidth="1" />
                  <circle cx="10" cy="67" r="2.5" fill="#282828" />
                  <rect x="20" y="65" width="52" height="4" fill="#222222" />
                  <rect x="80" y="65" width="14" height="4" fill="#1a1a1a" />
                </g>

                {/* Bottom Zero-Byte Status Bar */}
                <rect x="402" y="152" width="102" height="18" fill="#0c0c0c" stroke="#1a1a1a" strokeWidth="1" />
                <rect x="426" y="159" width="54" height="4" fill="#1a1a1a" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* 3. Text Content — ровно 100% ширины контейнера по образцу /changelog */}
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
