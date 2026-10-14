import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { translations, changelogVersionMap } from '../translations';
import type { Language } from '../translations';
import { ChromeLogo } from './ChromeLogo';

interface ChangelogPageProps {
  currentLang: Language;
  onBack: () => void;
}

const backLabelMap: Record<Language, string> = {
  en: 'Back to home',
  da: 'Tilbage til forsiden',
  de: 'Zurück zur Startseite',
  es: 'Volver al inicio',
  fr: 'Retour à l\'accueil',
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

interface ChangelogItem {
  num: string;
  title: string;
  desc: string;
}

const changelogModulesRu: ChangelogItem[] = [
  {
    num: '01',
    title: 'Первый публичный релиз в Google Chrome Web Store',
    desc: 'Полный набор тактического интерфейса и автоматизации для соревновательного FACEIT CS2.',
  },
  {
    num: '02',
    title: 'Радар маппула в лобби',
    desc: 'Отображает радар маппула команд в лобби матча на основе последних 30 игр.',
  },
  {
    num: '03',
    title: 'Статистика игроков в матче',
    desc: 'Отображает плашки со статистикой за 30 игр и раскладку по картам под каждым игроком.',
  },
  {
    num: '04',
    title: 'Плашка среднего ELO команд',
    desc: 'Отображает контрастные плашки среднего ELO со значком ранга в баннере счета.',
  },
  {
    num: '05',
    title: 'Автокопирование IP сервера',
    desc: 'Автоматически копирует команду connect в буфер при назначении сервера.',
  },
  {
    num: '06',
    title: 'Режим фокусировки лобби',
    desc: 'Скрывает ростеры игроков и баннер счета, оставляя карту, сервер и радар.',
  },
  {
    num: '07',
    title: 'Автопринятие матча',
    desc: 'Автоматически подтверждает готовность при нахождении матча с задержкой.',
  },
  {
    num: '08',
    title: 'Автопринятие инвайтов в группу',
    desc: 'Автоматически принимает входящие приглашения в группу с задержкой.',
  },
  {
    num: '09',
    title: 'Расширенная история матчей',
    desc: 'Добавляет в таблицу матчей показатели K/R, ADR, PCR и кнопку скачивания демозаписи (Demo).',
  },
  {
    num: '10',
    title: 'Виджет ELO в сайдбаре',
    desc: 'Отображает компактный 2-элементный блок ELO с иконкой ранга и счетом.',
  },
  {
    num: '11',
    title: 'Винрейт на карточках карт',
    desc: 'Отображает плашки винрейта прямо на плитках карт в очереди матча.',
  },
];

const changelogModulesEn: ChangelogItem[] = [
  {
    num: '01',
    title: 'Initial public release in Google Chrome Web Store',
    desc: 'Full-featured tactical interface and automation suite for competitive FACEIT CS2.',
  },
  {
    num: '02',
    title: 'Map Pool Radar Chart',
    desc: 'Renders team map pool radar chart in matchroom based on last 30 matches.',
  },
  {
    num: '03',
    title: 'Match Player Stats Overlay',
    desc: 'Displays 30-match performance stats and map breakdown under each player in the matchroom.',
  },
  {
    num: '04',
    title: 'Team Average ELO Badge',
    desc: 'Displays high-contrast team average ELO pills with rank icons in match banner.',
  },
  {
    num: '05',
    title: 'Auto-Copy Server IP',
    desc: 'Automatically copies connect command to clipboard when IP is assigned.',
  },
  {
    num: '06',
    title: 'Lobby Focus Mode',
    desc: 'Hides team rosters and score banner, keeping server, map, and radar visible.',
  },
  {
    num: '07',
    title: 'Auto-Accept Match Check',
    desc: 'Automatically confirms ready check dialog upon match creation.',
  },
  {
    num: '08',
    title: 'Auto-Accept Party Invites',
    desc: 'Automatically accepts incoming party invitations with configurable delay.',
  },
  {
    num: '09',
    title: 'Enhanced Match History',
    desc: 'Adds K/R, ADR, PCR columns and a direct Demo download button to the match history table.',
  },
  {
    num: '10',
    title: 'Sidebar ELO Widget',
    desc: 'Displays compact 2-element ELO widget with skill level icon and live score in rail.',
  },
  {
    num: '11',
    title: 'Map Selector Win Rates',
    desc: 'Displays team and personal win rate badges directly on matchmaking queue map tiles.',
  },
];

export const ChangelogPage: React.FC<ChangelogPageProps> = ({ currentLang, onBack }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const TOTAL_DURATION = 3500; // 3.5 seconds smooth deployment
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(TOTAL_DURATION, now - start);
      setElapsedTime(elapsed / 1000); // 0.0 to 3.5

      if (elapsed < TOTAL_DURATION) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const tLang = translations[currentLang] || translations.en;
  const backLabel = backLabelMap[currentLang] || backLabelMap.en;
  const ctaLabel = (tLang.hero.cta || 'ADD TO CHROME').toUpperCase();

  const t = elapsedTime;

  // 11 modules visual architecture map (strictly language-agnostic monochrome)
  const visualModules = [
    // Group 0: Chrome Web Store Release (1 row)
    { id: 0, group: 0, y: 60, w1: 96, w2: 120 },
    // Group 1: Matchroom (5 rows)
    { id: 1, group: 1, y: 75, w1: 76, w2: 124 },
    { id: 2, group: 1, y: 89, w1: 88, w2: 108 },
    { id: 3, group: 1, y: 103, w1: 68, w2: 136 },
    { id: 4, group: 1, y: 117, w1: 82, w2: 116 },
    { id: 5, group: 1, y: 131, w1: 72, w2: 126 },
    // Group 2: Automation (2 rows)
    { id: 6, group: 2, y: 153, w1: 80, w2: 118 },
    { id: 7, group: 2, y: 167, w1: 86, w2: 110 },
    // Group 3: Profile (3 rows)
    { id: 8, group: 3, y: 189, w1: 90, w2: 114 },
    { id: 9, group: 3, y: 203, w1: 66, w2: 134 },
    { id: 10, group: 3, y: 217, w1: 74, w2: 122 },
  ];

  const versionString = changelogVersionMap[currentLang] || tLang.changelogPage.version || 'Version 1.0.0';

  const changes: ChangelogItem[] = (() => {
    if (currentLang === 'ru') return changelogModulesRu;
    if (currentLang === 'en') return changelogModulesEn;
    const initialItem: ChangelogItem = {
      num: '01',
      title: tLang.changelogPage.initialReleaseTitle || 'Initial public release in Google Chrome Web Store',
      desc: tLang.changelogPage.initialReleaseDesc || 'Full tactical interface and automation suite for competitive FACEIT CS2.',
    };
    const featureItems: ChangelogItem[] = tLang.features.items.map((item, idx) => ({
      num: String(idx + 2).padStart(2, '0'),
      title: item.title,
      desc: item.desc,
    }));
    return [initialItem, ...featureItems];
  })();

  return (
    <main className="pt-20 sm:pt-24 pb-0 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-stretch z-10 animate-apple-reveal">
      
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

      {/* 2. Hero Animation Block (Exact Replica of Window Shell from Cards 04 & 05) */}
      <div className="w-full bg-[#0d0d0d] border border-white/20 overflow-hidden mb-10 shadow-2xl relative">
        <div className="h-72 sm:h-96 w-full flex items-center justify-center p-4 bg-[#0d0d0d]">
          <svg 
            className="w-full h-full max-w-xl object-contain" 
            viewBox="0 0 440 260" 
            fill="none"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            {/* Unified Window Shell (exact match to cards 04 & 05) */}
            <rect x="25" y="20" width="390" height="220" fill="#0d0d0d" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            
            {/* Window Header Line */}
            <line x1="25" y1="46" x2="415" y2="46" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            
            {/* Three identical grey dots on left (● ● ●: same size r=3.5, gap=13, fill #555555) */}
            <circle cx="41" cy="33" r="3.5" fill="#555555" />
            <circle cx="54" cy="33" r="3.5" fill="#555555" />
            <circle cx="67" cy="33" r="3.5" fill="#555555" />

            {/* Group Separator Dividers (Between Matchroom, Automation, Profile) */}
            {/* Divider 1: between Matchroom (rows 1-5) and Automation (rows 6-7) */}
            <line x1="36" y1="143" x2="404" y2="143" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="1" />
            {/* Divider 2: between Automation (rows 6-7) and Profile (rows 8-10) */}
            <line x1="36" y1="179" x2="404" y2="179" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="1" />

            {/* 11 Visual Architecture Modules (Clean List of Skeleton Rows Starting Directly Under Header) */}
            {visualModules.map((mod, idx) => {
              const rowStart = 0.15 + idx * 0.14;
              const rowProgress = Math.max(0, Math.min(1, (t - rowStart) / 0.20));
              const activeEase = 1 - Math.pow(1 - rowProgress, 3);
              const isActive = rowProgress > 0.05;

              return (
                <g key={mod.id} opacity={0.3 + 0.7 * activeEase}>
                  {/* 1. Minimalist Dot Marker */}
                  <circle 
                    cx="41" 
                    cy={mod.y + 3} 
                    r="2" 
                    fill={isActive ? "#737373" : "#262626"} 
                  />

                  {/* 2. Abstract White Module Title Skeleton Bar */}
                  <rect 
                    x="52" 
                    y={mod.y + 0.5} 
                    width={mod.w1} 
                    height="5" 
                    fill={isActive ? "#ffffff" : "#222222"} 
                    opacity={isActive ? 0.9 : 0.3} 
                  />

                  {/* 3. Abstract Grey Description Skeleton Bar */}
                  <rect 
                    x={52 + mod.w1 + 8} 
                    y={mod.y + 1} 
                    width={mod.w2} 
                    height="4" 
                    fill={isActive ? "#555555" : "#1a1a1a"} 
                    opacity={isActive ? 0.8 : 0.25} 
                  />

                  {/* 4. Right Subtle Status Marker */}
                  <rect 
                    x="374" 
                    y={mod.y + 1} 
                    width="28" 
                    height="4" 
                    fill={isActive ? "#444444" : "#181818"} 
                    opacity={isActive ? 0.7 : 0.2} 
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 3. Text Content — ровно 100% ширины контейнера, БЕЗ max-w-* и БЕЗ px-* */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* История обновлений Peekly (Шрифт 1) */}
        <h1 className="w-full max-w-none text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 cursor-text select-text font-sans">
          {tLang.changelogPage.title}
        </h1>

        {/* Вводный текст описания (Шрифт 3) */}
        <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify mb-8 cursor-text select-text">
          {tLang.changelogPage.desc}
        </p>

        {/* Версия 1.0.0 (Шрифт 2) */}
        <h2 className="w-full max-w-none font-sans text-base md:text-lg font-bold tracking-tight text-white mb-2 mt-8 cursor-text select-text">
          {versionString}
        </h2>

        {/* Список компонентов (Шрифт 3 + стилизованные номера 01–11 с компактным gap-2.5) */}
        <div className="w-full max-w-none space-y-3 font-sans">
          {changes.map((item, idx) => (
            <div key={idx} className="w-full max-w-none flex items-baseline gap-2.5 cursor-text select-text">
              <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                {item.num}
              </span>
              <span className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify">
                {item.title} — {item.desc}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* 4. Bottom Prominent Action CTA Button (100% exact replica of Hero CTA button, mt-12 mb-12) */}
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

    </main>
  );
};
