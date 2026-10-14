export interface FeatureDetail {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  bullets?: { label: string; desc: string }[];
  specs: { label: string; value: string }[];
}

export const featureDetailsByLang: Record<string, Record<string, FeatureDetail>> = {
  ru: {
    radar: {
      id: 'radar',
      number: '001',
      title: 'MAP POOL RADAR CHART',
      category: 'МАТЧРУМ АНАЛИТИКА',
      summary: 'Тактическая паутина пула карт обеих команд',
      description: 'Алгоритм построения паутины на базе 30 последних соревновательных матчей обеих команд, расчет перекоса вето и относительного винрейта.',
      bullets: [
        { label: 'Глубина выборки', desc: 'Автоматический анализ последних 30 матчей каждого игрока в матче' },
        { label: 'Анализ вето', desc: 'Определение наиболее комфортных карт вашей команды и слабых зон соперника' },
        { label: 'Весовой баланс', desc: 'Учет свежести матчей и текущего винрейта на каждой карте соревновательного маппула CS2' }
      ],
      specs: [
        { label: 'ЗАДЕРЖКА', value: '15ms (Кэшировано)' },
        { label: 'ВЫБОРКА', value: '30 матчей' },
        { label: 'БЕЗОПАСНОСТЬ', value: '100% Read-Only' }
      ]
    },
    stats: {
      id: 'stats',
      number: '002',
      title: 'MATCH PLAYER STATS OVERLAY',
      category: 'МАТЧРУМ АНАЛИТИКА',
      summary: 'Отображение формы и боевых метрик игроков в лобби',
      description: 'Инъекция метрик в HUD лобби (K/D, ADR, процент хедшотов, винрейт за последние 20 матчей), определение текущей формы игроков.',
      bullets: [
        { label: 'Боевые показатели', desc: 'Мгновенное отображение K/D, ADR, HS% и винрейта прямо под аватаром игрока' },
        { label: 'Индикатор формы', desc: 'Оценка винстриков, спадов и текущей стабильности стрельбы' },
        { label: 'Контрастный HUD', desc: 'Интеграция в дизайн FACEIT с сохранением визуальной чистоты интерфейса' }
      ],
      specs: [
        { label: 'МЕТРИКИ', value: 'K/D, ADR, HS%, WIN%' },
        { label: 'ПЕРИОД', value: 'Последние 20 матчей' },
        { label: 'ОБНОВЛЕНИЕ', value: 'В реальном времени' }
      ]
    },
    autoAcceptMatch: {
      id: 'autoAcceptMatch',
      number: '003',
      title: 'AUTO-ACCEPT MATCH CHECK',
      category: 'АВТОМАТИЗАЦИЯ',
      summary: 'Автоматическое подтверждение готовности к матчу',
      description: 'Нулевая задержка реакции, настраиваемый таймер отклика (0–10 секунд) через локальное хранилище, предотвращение пропущенных матчей.',
      bullets: [
        { label: 'Нулевая задержка', desc: 'Моментальное подтверждение чека готовности без задержек и подвисаний' },
        { label: 'Настраиваемый таймер', desc: 'Возможность задать симуляцию задержки отклика (от 0 до 10 секунд)' },
        { label: 'Защита от кулдауна', desc: 'Никаких банов за пропущенную кнопку проверки готовности' }
      ],
      specs: [
        { label: 'СКОРОСТЬ', value: '0ms Latency' },
        { label: 'ТАЙМЕР', value: '0 – 10 сек (Storage)' },
        { label: 'СТАТУС', value: 'Auto-Confirm' }
      ]
    },
    autoAcceptParty: {
      id: 'autoAcceptParty',
      number: '004',
      title: 'AUTO-ACCEPT PARTY INVITES',
      category: 'АВТОМАТИЗАЦИЯ',
      summary: 'Авто-вход в лобби друзей из белого списка',
      description: 'Автоматическое принятие инвайтов исключительно от доверенного списка тиммейтов без лишних подтверждений.',
      bullets: [
        { label: 'Белый список', desc: 'Принятие приглашений только от подтвержденных друзей и тиммейтов' },
        { label: 'Без кликов', desc: 'Мгновенное подключение к группе при получении инвайта в фоновом режиме' },
        { label: 'Защита от спама', desc: 'Блокировка случайных или навязчивых входящих приглашений' }
      ],
      specs: [
        { label: 'ДОСТУП', value: 'Trusted Friends' },
        { label: 'ДЕЙСТВИЕ', value: 'Instant Auto-Join' },
        { label: 'ХРАНЕНИЕ', value: 'Local Whitelist' }
      ]
    },
    enhancedHistory: {
      id: 'enhancedHistory',
      number: '005',
      title: 'ENHANCED MATCH HISTORY',
      category: 'ПРОФИЛЬ И СТАТИСТИКА',
      summary: 'Расширенная аналитика матчей и прямая загрузка демок',
      description: 'Расширенная таблица профиля FACEIT с продвинутыми метриками и кнопкой загрузки GOTV-демки напрямую с серверов матча в один клик без перехода на сторонние сервисы.',
      bullets: [
        { label: 'K/R (Kills / Total Rounds)', desc: 'Среднее количество фрагов за раунд — объективный показатель огневой мощи' },
        { label: 'ADR (Average Damage per Round)', desc: 'Средний наносимый урон за раунд независимо от добиваний' },
        { label: 'PCR (Peekly Contribution Rating)', desc: 'Процентный вклад игрока в победу взамен RWS (фраги, ADR, клатчи, утилити). Норма в команде — 20%' },
        { label: 'Прямая GOTV загрузка', desc: 'Скачивание официальной .DEM записи матча напрямую с CDN серверов платформы' }
      ],
      specs: [
        { label: 'ФОРМУЛЫ', value: 'K/R, ADR, PCR' },
        { label: 'ФОРМАТ', value: '.DEM (CS2 GOTV)' },
        { label: 'СКАЧИВАНИЕ', value: '1-Click Direct CDN' }
      ]
    },
    autoCopyServer: {
      id: 'autoCopyServer',
      number: '006',
      title: 'AUTO-COPY SERVER IP',
      category: 'АВТОМАТИЗАЦИЯ',
      summary: 'Мгновенный захват IP сервера в буфер обмена',
      description: 'Мгновенный захват строки connect IP:PORT; password ... в системный буфер обмена сразу после распределения игрового сервера платформой.',
      bullets: [
        { label: 'Захват строки', desc: 'Автоматическое копирование команды connect сразу после выделения сервера' },
        { label: 'Готовность к игре', desc: 'Достаточно открыть консоль CS2 и нажать Ctrl+V для мгновенного входа' },
        { label: 'Уведомление', desc: 'Тактильное уведомление об успешной синхронизации с буфером обмена' }
      ],
      specs: [
        { label: 'ЦЕЛЬ', value: 'System Clipboard' },
        { label: 'ФОРМАТ', value: 'connect IP:PORT' },
        { label: 'СКОРОСТЬ', value: 'Мгновенно' }
      ]
    },
    focusMode: {
      id: 'focusMode',
      number: '007',
      title: 'LOBBY FOCUS MODE',
      category: 'ИНТЕРФЕЙС И HUD',
      summary: 'Минималистичный режим лобби без визуального шума',
      description: 'Сокрытие баннеров, чатов и посторонних интерфейсных блоков FACEIT, оставляя только критически важные данные: сервер, статус и радар.',
      bullets: [
        { label: 'Очистка шума', desc: 'Скрытие рекламных баннеров, ленты новостей и тяжелых анимаций страницы' },
        { label: 'Фокус на игре', desc: 'На виду только окно вето, статус сервера, радар и карточки игроков' },
        { label: 'Повышение FPS', desc: 'Снижение нагрузки на браузер за счет отключения лишних DOM-элементов' }
      ],
      specs: [
        { label: 'РЕЖИМ', value: 'Distraction-Free' },
        { label: 'ФОКУС', value: 'Matchroom & Radar' },
        { label: 'ПЕРЕКЛЮЧЕНИЕ', value: '1-Click Toggle' }
      ]
    },
    avgEloPill: {
      id: 'avgEloPill',
      number: '008',
      title: 'TEAM AVERAGE ELO BADGE',
      category: 'МАТЧРУМ АНАЛИТИКА',
      summary: 'Мгновенный расчет баланса ELO обеих команд',
      description: 'Моментальный расчет среднего баланса ELO обеих команд в реальном времени с индикацией разницы в очках.',
      bullets: [
        { label: 'Среднее ELO', desc: 'Точный математический расчет среднего рейтинга обеих команд' },
        { label: 'Разница в очках', desc: 'Индикация разрыва ELO для оценки шансов на победу и ставки очков' },
        { label: 'Баланс сил', desc: 'Оценка сложности матча и реального скилла оппонентов до старта' }
      ],
      specs: [
        { label: 'ИНДЕКС', value: 'CS2 FACEIT ELO' },
        { label: 'РАСЧЕТ', value: 'Real-Time Avg' },
        { label: 'ТОЧНОСТЬ', value: '100% Математическая' }
      ]
    },
        sidebarElo: {
      id: 'sidebarElo',
      number: '09',
      title: 'SIDEBAR ELO WIDGET',
      category: 'ПРОФИЛЬ',
      summary: 'Отображает компактный 2-элементный блок ELO с иконкой ранга и счетом в сайдбаре профиля',
      description: 'Компактная интеграция рейтинга ELO и ранга в боковую панель профиля FACEIT.',
      bullets: [
        { label: 'Быстрый доступ', desc: 'Рейтинг и ранг всегда на виду в сайдбаре профиля' },
        { label: '2-элементный блок', desc: 'Иконка ранга и счет ELO в лаконичном блоке' },
        { label: 'Контроль прогресса', desc: 'Удобное отслеживание динамики изменения очков' }
      ],
      specs: [
        { label: 'ФОРМАТ', value: '2-элементный блок' },
        { label: 'ОБНОВЛЕНИЕ', value: 'После каждого матча' },
        { label: 'ЛОКАЦИЯ', value: 'Сайдбар профиля' }
      ]
    },
    mapSelectorStats: {
      id: 'mapSelectorStats',
      number: '009',
      title: 'MAP SELECTOR WIN RATES',
      category: 'ВЕТО И СТРАТЕГИЯ',
      summary: 'Процент побед прямо на плитках выбора карт',
      description: 'Отображение личного и командного процента побед непосредственно на плитках выбора карт на этапе драфта вето.',
      bullets: [
        { label: 'Драфт-интеграция', desc: 'Процент побед отображается прямо на кнопках карт во время драфта' },
        { label: 'Личный и командный', desc: 'Мгновенное сопоставление показателей вашей группы и соперников' },
        { label: 'Тактическое вето', desc: 'Выбирайте свои лучшие карты и баньте сильнейшие карты оппонентов' }
      ],
      specs: [
        { label: 'ЭТАП', value: 'Map Veto Phase' },
        { label: 'ДАННЫЕ', value: 'Winrate % per Map' },
        { label: 'ОБНОВЛЕНИЕ', value: 'Live Queue Draft' }
      ]
    }
  },
  en: {
    radar: {
      id: 'radar',
      number: '001',
      title: 'MAP POOL RADAR CHART',
      category: 'MATCHROOM INTELLIGENCE',
      summary: 'Tactical map pool radar chart for both teams',
      description: 'Dynamic radar chart algorithm generated from the last 30 competitive matches of both teams, calculating map veto bias, win rate differentials, and ban recommendations.',
      bullets: [
        { label: 'Sample Depth', desc: 'Automated telemetry query across 30 recent competitive matches per player' },
        { label: 'Veto Optimization', desc: 'Identifies core team comfort picks versus opponent exploitable blindspots' },
        { label: 'Weighted Recency', desc: 'Recency-weighted balance calculations for CS2 competitive active duty' }
      ],
      specs: [
        { label: 'LATENCY', value: '15ms (Cached)' },
        { label: 'SAMPLE', value: '30 Matches' },
        { label: 'INTEGRITY', value: '100% Read-Only' }
      ]
    },
    stats: {
      id: 'stats',
      number: '002',
      title: 'MATCH PLAYER STATS OVERLAY',
      category: 'MATCHROOM INTELLIGENCE',
      summary: 'Live player performance & form HUD metrics',
      description: 'Live metric injection directly into the matchroom HUD (K/D, ADR, HS%, 20-match rolling winrate), identifying player hot-streaks and active form.',
      bullets: [
        { label: 'Combat Metrics', desc: 'Instant K/D, ADR, HS% and winrate badges rendered below each player' },
        { label: 'Form Tracker', desc: 'Detects active win-streaks, tilting trends, and shooting consistency' },
        { label: 'Native Styling', desc: 'Seamlessly matches platform design without layout shifting' }
      ],
      specs: [
        { label: 'METRICS', value: 'K/D, ADR, HS%, WIN%' },
        { label: 'WINDOW', value: 'Last 20 Matches' },
        { label: 'UPDATE', value: 'Real-Time Sync' }
      ]
    },
    autoAcceptMatch: {
      id: 'autoAcceptMatch',
      number: '003',
      title: 'AUTO-ACCEPT MATCH CHECK',
      category: 'AUTOMATION SUITE',
      summary: 'Zero-latency ready check auto-confirmation',
      description: 'Zero-latency automated ready-check response with configurable delay timer (0–10s) stored locally, preventing queue cooldowns and missed matches.',
      bullets: [
        { label: 'Zero Latency', desc: 'Sub-millisecond ready check response without browser hang' },
        { label: 'Custom Delay', desc: 'Configurable response delay slider (0 to 10 seconds) in popup settings' },
        { label: 'Queue Protection', desc: 'Zero queue cooldowns caused by alt-tabbing or missing popups' }
      ],
      specs: [
        { label: 'LATENCY', value: '0ms Reaction' },
        { label: 'DELAY', value: '0 – 10s (Local Storage)' },
        { label: 'MODE', value: 'Auto-Confirm' }
      ]
    },
    autoAcceptParty: {
      id: 'autoAcceptParty',
      number: '004',
      title: 'AUTO-ACCEPT PARTY INVITES',
      category: 'AUTOMATION SUITE',
      summary: 'Automatic party joining for trusted friends',
      description: 'Seamless party invitation auto-join strictly restricted to your trusted teammates whitelist, eliminating manual popup clicks.',
      bullets: [
        { label: 'Trusted Whitelist', desc: 'Restricted purely to approved friend IDs you designate' },
        { label: 'Click-Free Flow', desc: 'Background party acceptance without disrupting your current screen' },
        { label: 'Spam Filtering', desc: 'Filters out unverified or intrusive public lobby spam' }
      ],
      specs: [
        { label: 'SCOPE', value: 'Trusted Friends' },
        { label: 'ACTION', value: 'Instant Auto-Join' },
        { label: 'STORAGE', value: 'Local Whitelist' }
      ]
    },
    enhancedHistory: {
      id: 'enhancedHistory',
      number: '005',
      title: 'ENHANCED MATCH HISTORY',
      category: 'PROFILE INTELLIGENCE',
      summary: 'Advanced career metrics & 1-click GOTV demo downloads',
      description: 'Extended FACEIT profile table featuring specialized competitive metrics and 1-click GOTV demo downloading straight from match servers with zero third-party redirects.',
      bullets: [
        { label: 'K/R (Kills / Total Rounds)', desc: 'Direct firepower efficiency measuring true round-by-round frag output' },
        { label: 'ADR (Average Damage per Round)', desc: 'Pure unassisted round damage output independent of kill confirms' },
        { label: 'PCR (Peekly Contribution Rating)', desc: 'Player round win contribution percentage replacing RWS (kills, ADR, clutches, utility). Squad norm is 20%' },
        { label: 'Direct GOTV Download', desc: 'Instant 1-click download of official .DEM replay files directly from platform CDN' }
      ],
      specs: [
        { label: 'METRICS', value: 'K/R, ADR, PCR' },
        { label: 'FORMAT', value: '.DEM (CS2 GOTV)' },
        { label: 'DOWNLOAD', value: '1-Click Direct CDN' }
      ]
    },
    autoCopyServer: {
      id: 'autoCopyServer',
      number: '006',
      title: 'AUTO-COPY SERVER IP',
      category: 'AUTOMATION SUITE',
      summary: 'Instant console connect command clipboard sync',
      description: 'Instant system clipboard synchronization of the console command connect IP:PORT; password ... the exact millisecond the game server is allocated.',
      bullets: [
        { label: 'Clipboard Sync', desc: 'Copies connect command the exact moment server allocation fires' },
        { label: 'Game-Ready', desc: 'Simply open the CS2 console and press Ctrl+V for immediate connection' },
        { label: 'Visual Confirmation', desc: 'Haptic toast confirmation verifying the string has been copied' }
      ],
      specs: [
        { label: 'TARGET', value: 'System Clipboard' },
        { label: 'FORMAT', value: 'connect IP:PORT' },
        { label: 'TIMING', value: 'Sub-Millisecond' }
      ]
    },
    focusMode: {
      id: 'focusMode',
      number: '007',
      title: 'LOBBY FOCUS MODE',
      category: 'INTERFACE HUD',
      summary: 'Distraction-free minimalist matchroom mode',
      description: 'HUD decluttering filter removing platform banners, chat spam, and extraneous feed blocks, keeping only critical match telemetry: server, status, and radar.',
      bullets: [
        { label: 'Noise Reduction', desc: 'Silences ad banners, community feeds, and heavy visual distractions' },
        { label: 'Pure Telemetry', desc: 'Leaves only the map veto, server IP, radar, and player cards' },
        { label: 'Browser Performance', desc: 'Lowers browser memory footprint during competitive play' }
      ],
      specs: [
        { label: 'MODE', value: 'Distraction-Free' },
        { label: 'FOCUS', value: 'Matchroom & Radar' },
        { label: 'SWITCH', value: '1-Click Toggle' }
      ]
    },
    avgEloPill: {
      id: 'avgEloPill',
      number: '008',
      title: 'TEAM AVERAGE ELO BADGE',
      category: 'MATCHROOM INTELLIGENCE',
      summary: 'Real-time team ELO balance and differential display',
      description: 'Real-time average team ELO balance calculation with instant display of rating difference and matchup difficulty.',
      bullets: [
        { label: 'Team Average ELO', desc: 'Precise real-time arithmetic mean of both rosters' },
        { label: 'Rating Differential', desc: 'Immediate delta calculation revealing matchup favorability' },
        { label: 'Matchup Stakes', desc: 'Pre-match assessment of roster strength differential and competitive stakes' }
      ],
      specs: [
        { label: 'INDEX', value: 'CS2 FACEIT ELO' },
        { label: 'CALCULATION', value: 'Real-Time Avg' },
        { label: 'ACCURACY', value: '100% Mathematical' }
      ]
    },
        sidebarElo: {
      id: 'sidebarElo',
      number: '09',
      title: 'SIDEBAR ELO WIDGET',
      category: 'PROFILE',
      summary: 'Displays a compact 2-element ELO block with rank badge and score in profile sidebar',
      description: 'Compact integration of ELO rating and rank badge directly into the FACEIT profile sidebar.',
      bullets: [
        { label: 'Fast Access', desc: 'Rating and rank always visible in the profile sidebar' },
        { label: '2-Element Block', desc: 'Rank badge and ELO score in a sleek format' },
        { label: 'Progress Tracking', desc: 'Easily track rating changes after matches' }
      ],
      specs: [
        { label: 'FORMAT', value: '2-Element Block' },
        { label: 'UPDATE', value: 'Post-Match Live' },
        { label: 'LOCATION', value: 'Profile Sidebar' }
      ]
    },
mapSelectorStats: {
      id: 'mapSelectorStats',
      number: '009',
      title: 'MAP SELECTOR WIN RATES',
      category: 'VETO & STRATEGY',
      summary: 'Win rate badges injected directly on map veto tiles',
      description: 'Direct winrate overlay rendered straight on map veto draft tiles, giving instant strategic insight during the voting phase.',
      bullets: [
        { label: 'Draft Tile Overlay', desc: 'Winrates injected directly into map cards during the veto phase' },
        { label: 'Roster Comparison', desc: 'Compares your team winrate versus enemy record per active map' },
        { label: 'Strategic Bans', desc: 'Pick your high-percentage maps and ban enemy comfort picks' }
      ],
      specs: [
        { label: 'PHASE', value: 'Map Veto Phase' },
        { label: 'DATA', value: 'Winrate % per Map' },
        { label: 'SYNC', value: 'Live Queue Draft' }
      ]
    }
  }
};
