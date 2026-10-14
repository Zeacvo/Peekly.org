export type Language =
  | 'en'
  | 'ru'
  | 'de'
  | 'pl'
  | 'fr'
  | 'es'
  | 'da'
  | 'pt'
  | 'fi'
  | 'sv'
  | 'tr'
  | 'uk'
  | 'zh'
  | 'ar'
  | 'ja'
  | 'ko';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export const bottomCtaTitleMap: Record<Language, string> = {
  en: 'READY TO DOMINATE?',
  ru: 'ГОТОВ ДОМИНИРОВАТЬ?',
  zh: '准备好主宰比赛了吗？',
  de: 'BEREIT ZU DOMINIEREN?',
  pl: 'GOTOWY ZDOMINOWAĆ?',
  fr: 'PRÊT À DOMINER ?',
  es: '¿LISTO PARA DOMINAR?',
  da: 'KLAR TIL AT DOMINERE?',
  pt: 'PRONTO PARA DOMINAR?',
  fi: 'VALMIS HALLITSEMAAN?',
  sv: 'REDO ATT DOMINERA?',
  tr: 'HÜKMETMEYE HAZIR MISINIZ?',
  uk: 'ГОТОВИЙ ДОМІНУВАТИ?',
  ar: 'هل أنت مستعد للسيطرة؟',
  ja: '支配する準備はできていますか？',
  ko: '지배할 준비가 되셨습니까?',
};

export const changelogVersionMap: Record<Language, string> = {
  ru: 'Версия 1.0.0',
  en: 'Version 1.0.0',
  uk: 'Версія 1.0.0',
  de: 'Version 1.0.0',
  fr: 'Version 1.0.0',
  es: 'Versión 1.0.0',
  pl: 'Wersja 1.0.0',
  pt: 'Versão 1.0.0',
  da: 'Version 1.0.0',
  fi: 'Versio 1.0.0',
  sv: 'Version 1.0.0',
  tr: 'Sürüm 1.0.0',
  zh: '版本 1.0.0',
  ja: 'バージョン 1.0.0',
  ko: '버전 1.0.0',
  ar: 'الإصدار 1.0.0',
};

export interface FeatureCard {
  id: string;
  tab: 'matchroom' | 'automation' | 'profile';
  title: string;
  desc: string;
}

export interface Translations {
  nav: {
    statusLabel: string;
    onlineCount: string;
    install: string;
    changelog: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    note: string;
  };
  features: {
    title: string;
    items: FeatureCard[];
  };
  changelogPage: {
    badge: string;
    version: string;
    title: string;
    desc: string;
    modulesSubtitle: string;
    modulesTitle: string;
    initialReleaseTitle: string;
    initialReleaseDesc: string;
  };
  footer: {
    tagline: string;
    disclaimer: string;
    rights: string;
    changelog: string;
    allRightsReserved: string;
  };
}

export const translations: Record<Language, Translations> = {
  "en": {
    "nav": {
      "statusLabel": "Online:",
      "onlineCount": "0",
      "install": "Install extension",
      "changelog": "Changelog"
    },
    "hero": {
      "badge": "Google Chrome Extension",
      "title": "DOMINATE THE LOBBY",
      "subtitle": "High-performance matchroom intelligence, player analytics, and automation overlays for competitive FACEIT CS2.",
      "cta": "Add to Chrome",
      "note": "Manifest V3 • 100% FACEIT Anti-Cheat Safe"
    },
    "features": {
      "title": "Features",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Map Pool Radar Chart",
          "desc": "Renders team map pool radar chart in matchroom based on last 30 matches."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Match Player Stats Overlay",
          "desc": "Displays 30-match performance stats and map breakdown under each player in the matchroom."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Team Average ELO Badge",
          "desc": "Displays high-contrast team average ELO pills with rank icons in match banner."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Auto-Copy Server IP",
          "desc": "Automatically copies connect command to clipboard when IP is assigned."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Lobby Focus Mode",
          "desc": "Hides team rosters and score banner, keeping server, map, and radar visible."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Auto-Accept Match Check",
          "desc": "Automatically confirms ready check dialog upon match creation."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Auto-Accept Party Invites",
          "desc": "Automatically accepts incoming party invitations with configurable delay."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Enhanced Match History",
          "desc": "Adds K/R, ADR, PCR columns and a direct Demo download button to the match history table."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Sidebar ELO Widget",
          "desc": "Displays compact 2-element ELO widget with skill level icon and live score in rail."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Map Selector Win Rates",
          "desc": "Displays team and personal win rate badges directly on matchmaking queue map tiles."
        }
      ]
    },
    "changelogPage": {
      "version": "Version 1.0.0",
      "badge": "RELEASE LOGS",
      "title": "Peekly System Changelog",
      "desc": "Complete release history, latency optimizations, and feature rollouts for the competitive FACEIT CS2 companion.",
      "modulesSubtitle": "10 CORE FEATURES",
      "modulesTitle": "ACTIVE MODULES & RELEASE HIGHLIGHTS",
      "initialReleaseTitle": "Initial Public Release 1.0.0 in Google Chrome Web Store",
      "initialReleaseDesc": "Full-featured tactical interface extension suite for competitive FACEIT CS2, available in the Google Chrome Web Store."
    },
    "footer": {
      "tagline": "The clean, minimal companion for competitive FACEIT CS2.",
      "disclaimer": "Peekly is developed independently, and is not officially endorsed by or affiliated with FACEIT or Valve Corporation.",
      "rights": "© 2026 Peekly. All rights reserved.",
      "changelog": "Changelog",
      "allRightsReserved": "All rights reserved."
    }
  },
  "ru": {
    "nav": {
      "statusLabel": "Online:",
      "onlineCount": "0",
      "install": "Установить расширение",
      "changelog": "История версий"
    },
    "hero": {
      "badge": "Расширение для Google Chrome",
      "title": "ДОМИНИРУЙ В ЛОББИ",
      "subtitle": "Высокопроизводительная разведка лобби, аналитика игроков и оверлеи автоматизации для соревновательного FACEIT CS2.",
      "cta": "Установить в Chrome",
      "note": "Manifest V3 • 100% безопасно для FACEIT Anti-Cheat"
    },
    "features": {
      "title": "Возможности",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Радар маппула в лобби",
          "desc": "Отображает радар маппула команд в лобби матча на основе последних 30 игр."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Статистика игроков в матче",
          "desc": "Отображает плашки со статистикой за 30 игр и раскладку по картам под каждым игроком."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Плашка среднего ELO команд",
          "desc": "Отображает контрастные плашки среднего ELO со значком ранга в баннере счета."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Автокопирование IP сервера",
          "desc": "Автоматически копирует команду connect в буфер при назначении сервера."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Режим фокусировки лобби",
          "desc": "Скрывает ростеры игроков и баннер счета, оставляя карту, сервер и радар."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Автопринятие матча",
          "desc": "Автоматически подтверждает готовность при нахождении матча с задержкой."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Автопринятие инвайтов в группу",
          "desc": "Автоматически принимает входящие приглашения в группу с задержкой."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Расширенная история матчей",
          "desc": "Добавляет в таблицу матчей показатели K/R, ADR, PCR и кнопку скачивания демозаписи (Demo)."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Виджет ELO в сайдбаре",
          "desc": "Отображает компактный 2-элементный блок ELO с иконкой ранга и счетом."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Винрейт на карточках карт",
          "desc": "Отображает плашки винрейта прямо на плитках карт в очереди матча."
        }
      ]
    },
    "changelogPage": {
      "version": "Версия 1.0.0",
      "badge": "ИСТОРИЯ ВЕРСИЙ",
      "title": "История обновлений Peekly",
      "desc": "Полная хронология обновлений, улучшений производительности и новых модулей тактического интерфейса для соревновательного FACEIT CS2.",
      "modulesSubtitle": "10 КЛЮЧЕВЫХ КОМПОНЕНТОВ",
      "modulesTitle": "СПИСОК МОДУЛЕЙ И ИЗМЕНЕНИЙ",
      "initialReleaseTitle": "Первый публичный релиз 1.0.0 в Google Chrome",
      "initialReleaseDesc": "Полнофункциональный релиз расширения тактического интерфейса для соревновательного FACEIT CS2, доступный в магазине Google Chrome Web Store."
    },
    "footer": {
      "tagline": "Чистый и надежный инструмент для соревновательного FACEIT CS2.",
      "disclaimer": "Peekly разрабатывается независимо и не связан с FACEIT или Valve Corporation.",
      "rights": "© 2026 Peekly. Все права защищены.",
      "changelog": "История версий",
      "allRightsReserved": "Все права защищены."
    }
  },
  "zh": {
    "nav": {
      "statusLabel": "在线:",
      "onlineCount": "0",
      "install": "安装扩展程序",
      "changelog": "更新日志"
    },
    "hero": {
      "badge": "Google Chrome 扩展程序",
      "title": "统治比赛大厅",
      "subtitle": "专为 FACEIT CS2 打造的高性能比赛房间情报、选手数据分析与自动化悬浮窗。",
      "cta": "添加至 Chrome",
      "note": "Manifest V3 • 100% 兼容 FACEIT 反作弊"
    },
    "features": {
      "title": "核心功能",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "赛前地图池雷达图",
          "desc": "基于最近30场比赛在对局大厅实时展示双方队伍的地图池雷达图。"
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "对局选手数据浮层",
          "desc": "在每位玩家下方直接展示最近30场比赛的战力卡片与地图战绩分布。"
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "队伍平均 ELO 徽章",
          "desc": "在比分横幅中展示带有段位图标的高对比度队伍平均 ELO 徽章。"
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "自动复制服务器连接 IP",
          "desc": "当比赛服务器分配就绪时，自动将 connect 控制台命令复制到剪贴板。"
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "大厅专注模式",
          "desc": "隐藏选手名单与比分横幅，仅保留地图、服务器状态与雷达核心。"
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "自动确认对局就绪",
          "desc": "匹配成功时自动确认就绪，支持延迟时间自定义（0–10秒滑块调节）。"
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "自动接受组队邀请",
          "desc": "自动静默接受入队邀请，支持延迟时间自定义（0–10秒滑块调节）。"
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "比赛历史拓展",
          "desc": "在战绩列表中增加 K/R、ADR、PCR 数据与一键录像下载（Demo）按钮。"
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "侧边栏 ELO 战力组件",
          "desc": "在个人资料侧边栏中展示包含段位图标与积分的紧凑型双元素 ELO 模块。"
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "地图选择器胜率",
          "desc": "在匹配队列的地图选择卡片上直接覆盖展示实时胜率浮层。"
        }
      ]
    },
    "changelogPage": {
      "version": "版本 1.0.0",
      "badge": "更新日志",
      "title": "Peekly 更新日志",
      "desc": "竞争性 FACEIT CS2 伴侣的完整版本发布记录、延迟优化与功能上线历史。",
      "modulesSubtitle": "10 项核心功能",
      "modulesTitle": "模块清单与发布要点",
      "initialReleaseTitle": "首个公开发布版本 1.0.0",
      "initialReleaseDesc": "针对 FACEIT CS2 竞技环境的完整战术情报与自动化扩展套件。"
    },
    "footer": {
      "tagline": "专为 FACEIT CS2 竞技选手打造的纯粹极简战术伴侣。",
      "disclaimer": "Peekly 为独立开发工具，与 FACEIT 或 Valve Corporation 无官方关联。",
      "rights": "© 2026 Peekly. 保留所有权利。",
      "changelog": "更新日志",
      "allRightsReserved": "保留所有权利。"
    }
  },
  "de": {
    "nav": {
      "statusLabel": "Online:",
      "onlineCount": "0",
      "install": "Erweiterung installieren",
      "changelog": "Changelog"
    },
    "hero": {
      "badge": "Google Chrome Erweiterung",
      "title": "DOMINIERE DIE LOBBY",
      "subtitle": "Hochleistungs-Matchroom-Intelligence, Spieleranalysen und Automatisierungs-Overlays für FACEIT CS2.",
      "cta": "Zu Chrome hinzufügen",
      "note": "Manifest V3 • 100% FACEIT Anti-Cheat sicher"
    },
    "features": {
      "title": "Funktionen",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Map-Pool Radar-Diagramm",
          "desc": "Zeigt das Map-Pool-Radar der Teams im Matchroom basierend auf den letzten 30 Spielen an."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Spieler-Statistiken Overlay",
          "desc": "Zeigt 30-Spiele-Leistungskarten und Map-Statistiken direkt unter jedem Spieler an."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Team Durchschnitts-ELO Abzeichen",
          "desc": "Zeigt kontrastreiche Durchschnitts-ELO-Plaketten mit Rang-Symbol im Score-Banner an."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Server-IP Auto-Copy",
          "desc": "Kopiert den Connect-Befehl bei Serverzuweisung automatisch in die Zwischenablage."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Lobby-Fokusmodus",
          "desc": "Blendet Spielerlisten und Score-Banner aus und behält Map, Server und Radar im Fokus."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Match Auto-Accept Check",
          "desc": "Bestätigt gefundene Matches automatisch mit Verzögerung (Schieberegler 0–10 Sek.)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Party-Einladungen Auto-Accept",
          "desc": "Nimmt eingehende Party-Einladungen automatisch mit Verzögerung an (0–10 Sek.)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Erweiterte Match-Historie",
          "desc": "Fügt der Match-Tabelle K/R, ADR, PCR und 1-Klick-Demo-Downloads (Demo) hinzu."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Sidebar ELO-Widget",
          "desc": "Zeigt einen kompakten 2-Element-ELO-Block mit Rang-Symbol und Wertung in der Profil-Sidebar."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Map-Auswahl Winrates",
          "desc": "Zeigt Winrate-Badges direkt auf den Kartenauswahl-Kacheln der Matchmaking-Warteschlange."
        }
      ]
    },
    "changelogPage": {
      "version": "Version 1.0.0",
      "badge": "ÄNDERUNGSPROTOKOLL",
      "title": "Peekly System-Änderungsprotokoll",
      "desc": "Vollständiger Versionsverlauf, Latenzoptimierungen und Funktions-Rollouts für den FACEIT CS2-Begleiter.",
      "modulesSubtitle": "10 KERNFUNKTIONEN",
      "modulesTitle": "AKTIVE MODULE & HIGHLIGHTS",
      "initialReleaseTitle": "Erste öffentliche Version 1.0.0",
      "initialReleaseDesc": "Vollständige Suite für Matchroom-Intelligence und Automatisierung für FACEIT CS2."
    },
    "footer": {
      "tagline": "Der saubere, minimalistische Begleiter für kompetitives FACEIT CS2.",
      "disclaimer": "Peekly wird unabhängig entwickelt und ist nicht offiziell mit FACEIT oder Valve verbunden.",
      "rights": "© 2026 Peekly. Alle Rechte vorbehalten.",
      "changelog": "Änderungsprotokoll",
      "allRightsReserved": "Alle Rechte vorbehalten."
    }
  },
  "pl": {
    "nav": {
      "statusLabel": "Online:",
      "onlineCount": "0",
      "install": "Zainstaluj rozszerzenie",
      "changelog": "Historia zmian"
    },
    "hero": {
      "badge": "Rozszerzenie Google Chrome",
      "title": "ZDOMINUJ LOBBY",
      "subtitle": "Zaawansowana analityka pokoju meczowego, statystyki graczy i nakładki automatyzacji dla FACEIT CS2.",
      "cta": "Dodaj do Chrome",
      "note": "Manifest V3 • W 100% bezpieczne dla FACEIT Anti-Cheat"
    },
    "features": {
      "title": "Funkcje",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Wykres radarowy map w lobby",
          "desc": "Wyświetla radar puli map drużyn w pokoju meczowym na podstawie ostatnich 30 gier."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Nakładka statystyk graczy w meczu",
          "desc": "Wyświetla statystyki z ostatnich 30 gier i zestawienie map pod każdym graczem."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Odznaka średniego ELO drużyny",
          "desc": "Wyświetla kontrastowe plakietki średniego ELO z ikoną rangi w banerze wyniku."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Kopiowanie IP serwera",
          "desc": "Automatycznie kopiuje polecenie connect do schowka po przydzieleniu serwera."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Tryb skupienia w poczekalni",
          "desc": "Ukrywa składy graczy i baner wyniku, pozostawiając mapę, serwer i radar."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Automatyczna akceptacja meczu",
          "desc": "Automatycznie potwierdza gotowość po znalezieniu meczu z opóźnieniem (suwak 0–10 s)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Automatyczne dołączanie do grupy",
          "desc": "Automatycznie akceptuje zaproszenia do grupy z opóźnieniem (suwak 0–10 s)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Rozszerzona historia meczów",
          "desc": "Dodaje wskaźniki K/R, ADR, PCR oraz pobieranie wersji demonstracyjnej (Demo)."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Widżet ELO w panelu bocznym",
          "desc": "Wyświetla kompaktowy 2-elementowy blok ELO z ikoną rangi i wynikiem w panelu profilu."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Wskaźniki wygranych wyboru map",
          "desc": "Wyświetla plakietki procentu wygranych bezpośrednio na kafelkach wyboru map w kolejce."
        }
      ]
    },
    "changelogPage": {
      "version": "Wersja 1.0.0",
      "badge": "HISTORIA ZMIAN",
      "title": "Historia zmian systemu Peekly",
      "desc": "Pełna historia wydań, optymalizacje opóźnień i wdrożenia funkcji dla FACEIT CS2.",
      "modulesSubtitle": "10 KLUCZOWYCH FUNKCJI",
      "modulesTitle": "AKTYWNE MODUŁY I NAJWAŻNIEJSZE ZMIANY",
      "initialReleaseTitle": "Pierwsze publiczne wydanie 1.0.0",
      "initialReleaseDesc": "Kompletny pakiet analizy lobby i automatyzacji dla FACEIT CS2."
    },
    "footer": {
      "tagline": "Czysty, minimalistyczny pomocnik dla turniejowego FACEIT CS2.",
      "disclaimer": "Peekly jest rozwijany niezależnie i nie jest oficjalnie powiązany z FACEIT ani Valve Corporation.",
      "rights": "© 2026 Peekly. Wszelkie prawa zastrzeżone.",
      "changelog": "Historia zmian",
      "allRightsReserved": "Wszelkie prawa zastrzeżone."
    }
  },
  "fr": {
    "nav": {
      "statusLabel": "En ligne:",
      "onlineCount": "0",
      "install": "Installer l extension",
      "changelog": "Notes de version"
    },
    "hero": {
      "badge": "Extension Google Chrome",
      "title": "DOMINEZ LE LOBBY",
      "subtitle": "Intelligence de matchroom haute performance, analyses de joueurs et overlays d'automatisation pour FACEIT CS2.",
      "cta": "Ajouter à Chrome",
      "note": "Manifest V3 • 100% conforme FACEIT Anti-Cheat"
    },
    "features": {
      "title": "Fonctionnalités",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Radar du pool de cartes",
          "desc": "Affiche le radar du pool de cartes des équipes dans le lobby basé sur les 30 derniers matchs."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Overlay des stats des joueurs en match",
          "desc": "Affiche les plaques de stats sur 30 matchs et les détails par carte sous chaque joueur."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Badge ELO moyen des équipes",
          "desc": "Affiche des badges ELO moyen à fort contraste avec icône de rang dans la bannière de score."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Copie auto de l'IP du serveur",
          "desc": "Copie automatiquement la commande connect dans le presse-papiers dès assignation du serveur."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Mode focus lobby",
          "desc": "Masque les compositions et la bannière de score, ne conservant que carte, serveur et radar."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Acceptation auto du check de match",
          "desc": "Confirme automatiquement la disponibilité dès détection du match (curseur 0–10 s)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Acceptation auto des invitations",
          "desc": "Accepte automatiquement les invitations de groupe avec délai configurable (curseur 0–10 s)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Historique des matchs étendu",
          "desc": "Ajoute les indicateurs K/R, ADR, PCR et un bouton de téléchargement de démo (Demo)."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Widget ELO de barre latérale",
          "desc": "Affiche un bloc ELO compact à 2 éléments avec badge de rang et score dans la barre latérale."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Taux de victoire du sélecteur de cartes",
          "desc": "Affiche les badges de taux de victoire directement sur les tuiles de cartes en file d'attente."
        }
      ]
    },
    "changelogPage": {
      "version": "Version 1.0.0",
      "badge": "JOURNAL DES MODIFICATIONS",
      "title": "Journal des modifications Peekly",
      "desc": "Historique complet des versions, optimisations de latence et déploiements de fonctionnalités pour FACEIT CS2.",
      "modulesSubtitle": "10 FONCTIONNALITÉS CLÉS",
      "modulesTitle": "MODULES ACTIFS ET POINTS CLÉS",
      "initialReleaseTitle": "Version publique initiale 1.0.0",
      "initialReleaseDesc": "Suite complète de renseignement de salon et d'automatisation pour FACEIT CS2 compétitif."
    },
    "footer": {
      "tagline": "Le compagnon propre et minimaliste pour la compétition FACEIT CS2.",
      "disclaimer": "Peekly est développé indépendamment et n est pas affilié à FACEIT ou Valve Corporation.",
      "rights": "© 2026 Peekly. Tous droits réservés.",
      "changelog": "Journal des modifications",
      "allRightsReserved": "Tous droits réservés."
    }
  },
  "es": {
    "nav": {
      "statusLabel": "En línea:",
      "onlineCount": "0",
      "install": "Instalar extensión",
      "changelog": "Historial de cambios"
    },
    "hero": {
      "badge": "Extensión de Google Chrome",
      "title": "DOMINA LA SALA",
      "subtitle": "Inteligencia de sala de partidas de alto rendimiento, analíticas de jugadores y superposiciones de automatización para FACEIT CS2.",
      "cta": "Añadir a Chrome",
      "note": "Manifest V3 • 100% seguro para FACEIT Anti-Cheat"
    },
    "features": {
      "title": "Características",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Radar del pool de mapas en sala",
          "desc": "Muestra el radar de mapas de los equipos en la sala del partido según los últimos 30 juegos."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Superposición de estadísticas en partida",
          "desc": "Muestra placas con estadísticas de 30 partidas y desglose de mapas bajo cada jugador."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Insignia de ELO medio de equipos",
          "desc": "Muestra placas contrastadas de ELO medio con icono de rango en el banner del marcador."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Copiar IP del servidor automático",
          "desc": "Copia automáticamente el comando connect al portapapeles al asignar el servidor."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Modo de enfoque en sala",
          "desc": "Oculta alineaciones y banner de marcador, manteniendo solo mapa, servidor y radar."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Autoaceptar comprobación de partida",
          "desc": "Confirma automáticamente al encontrar partida con retraso ajustable (deslizador 0–10 s)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Aceptar invitaciones de grupo",
          "desc": "Acepta automáticamente invitaciones al grupo con retraso ajustable (deslizador 0–10 s)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Historial de partidas ampliado",
          "desc": "Añade métricas K/R, ADR, PCR y botón de descarga de demostración (Demo) a la tabla."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Widget de ELO en barra lateral",
          "desc": "Muestra un bloque compacto de ELO de 2 elementos con icono de rango y puntuación en el perfil."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Tasas de victoria del selector de mapas",
          "desc": "Muestra placas de porcentaje de victorias en las casillas de mapas en cola."
        }
      ]
    },
    "changelogPage": {
      "version": "Versión 1.0.0",
      "badge": "REGISTRO DE CAMBIOS",
      "title": "Registro de cambios de Peekly",
      "desc": "Historial completo de lanzamientos, optimizaciones de latencia e implementación de funciones para FACEIT CS2.",
      "modulesSubtitle": "10 FUNCIONES PRINCIPALES",
      "modulesTitle": "MÓDULOS ACTIVOS Y NOVEDADES",
      "initialReleaseTitle": "Lanzamiento público inicial 1.0.0",
      "initialReleaseDesc": "Suite completa de inteligencia de sala y automatización para FACEIT CS2 competitivo."
    },
    "footer": {
      "tagline": "El compañero limpio y minimalista para FACEIT CS2 competitivo.",
      "disclaimer": "Peekly se desarrolla de forma independiente y no está afiliado a FACEIT ni a Valve Corporation.",
      "rights": "© 2026 Peekly. Todos los derechos reservados.",
      "changelog": "Registro de cambios",
      "allRightsReserved": "Todos los derechos reservados."
    }
  },
  "da": {
    "nav": {
      "statusLabel": "Online:",
      "onlineCount": "0",
      "install": "Installer udvidelse",
      "changelog": "Ændringslog"
    },
    "hero": {
      "badge": "Google Chrome Udvidelse",
      "title": "DOMINÉR LOBBYEN",
      "subtitle": "Højtydende matchroom-efterretning, spilleranalyse og automatiserings-overlays til FACEIT CS2.",
      "cta": "Tilføj til Chrome",
      "note": "Manifest V3 • 100% FACEIT Anti-Cheat sikker"
    },
    "features": {
      "title": "Funktioner",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Kortpulje Radardiagram i Lobby",
          "desc": "Viser holdenes banepulje-radar i kampens lobby baseret på de sidste 30 kampe."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Spillerstatistik Overlay i Kampen",
          "desc": "Viser 30-kamps præstationskort og baneopdeling direkte under hver spiller."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Hold Gennemsnitlig ELO-Badge",
          "desc": "Viser kontrastfulde gennemsnitlige ELO-badges med rang-ikon i scorebanneret."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Auto-Kopiér Server-IP",
          "desc": "Kopierer automatisk connect-kommandoen til udklipsholderen, når serveren tildeles."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Lobby Fokus-Tilstand",
          "desc": "Skjuler spillerlister og scorebannere, så kun kort, server og radar er synlige."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Auto-Accept Kamp-Tjek",
          "desc": "Bekræfter automatisk match fundet med justerbar forsinkelse (0–10 sek. skyder)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Auto-Accept Gruppeinvitationer",
          "desc": "Accepterer automatisk indgående gruppeinvitationer med forsinkelse (0–10 sek. skyder)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Udvidet Kamphistorik",
          "desc": "Tilføjer K/R, ADR, PCR-målinger og demo-downloadknap (Demo) til kamphistorikken."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Sidepanel ELO-Widget",
          "desc": "Viser en kompakt 2-elements ELO-blok med rangbadge og rating i profilens sidepanel."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Kortvælger Winrates",
          "desc": "Viser sejrsrater direkte på kortvalgsfliserne i matchmaking-køen."
        }
      ]
    },
    "changelogPage": {
      "version": "Version 1.0.0",
      "badge": "ÆNDRINGSLOG",
      "title": "Peekly Systemændringslog",
      "desc": "Komplet udgivelseshistorik, latenstidsoptimeringer og funktionsopdateringer til FACEIT CS2.",
      "modulesSubtitle": "10 NØGLEFUNKTIONER",
      "modulesTitle": "AKTIVE MODULER & HØJDEPUNKTER",
      "initialReleaseTitle": "Første offentlige udgivelse 1.0.0",
      "initialReleaseDesc": "Komplet pakke med taktisk efterretning og automatisering til FACEIT CS2."
    },
    "footer": {
      "tagline": "Den rene, minimalistiske ledsager til konkurrencepræget FACEIT CS2.",
      "disclaimer": "Peekly er udviklet uafhængigt og er ikke tilknyttet FACEIT eller Valve Corporation.",
      "rights": "© 2026 Peekly. Alle rettigheder forbeholdes.",
      "changelog": "Ændringslog",
      "allRightsReserved": "Alle rettigheder forbeholdes."
    }
  },
  "pt": {
    "nav": {
      "statusLabel": "Online:",
      "onlineCount": "0",
      "install": "Instalar extensão",
      "changelog": "Notas de versão"
    },
    "hero": {
      "badge": "Extensão Google Chrome",
      "title": "DOMINE O LOBBY",
      "subtitle": "Inteligência de matchroom de alta performance, análise de jogadores e overlays de automação para FACEIT CS2.",
      "cta": "Adicionar ao Chrome",
      "note": "Manifest V3 • 100% seguro para FACEIT Anti-Cheat"
    },
    "features": {
      "title": "Recursos",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Radar do Map Pool no Lobby",
          "desc": "Exibe o radar do pool de mapas dos times na sala de partida com base nos últimos 30 jogos."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Overlay de Estatísticas no Jogo",
          "desc": "Exibe placas de desempenho de 30 jogos e detalhes de mapas abaixo de cada jogador."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Distintivo de ELO Médio das Equipes",
          "desc": "Exibe placas contrastantes de ELO médio com ícone de patente no banner de pontuação."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Copiar IP do Servidor Automático",
          "desc": "Copia automaticamente o comando connect para a área de transferência ao atribuir o servidor."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Modo Foco no Lobby",
          "desc": "Oculta escalações e banner de pontuação, mantendo mapa, servidor e radar em foco."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Auto-Aceitar Confirmação de Partida",
          "desc": "Confirma automaticamente prontidão ao encontrar partida com atraso (slider de 0 a 10s)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Auto-Aceitar Convites de Grupo",
          "desc": "Aceita automaticamente convites para grupos com atraso configurável (slider de 0 a 10s)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Histórico de Partidas Estendido",
          "desc": "Adiciona métricas K/R, ADR, PCR e download de demo (Demo) à tabela de partidas."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Widget de ELO na Barra Lateral",
          "desc": "Exibe um bloco compacto de ELO de 2 elementos com ícone de patente e pontuação no perfil."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Taxas de Vitória do Seletor de Mapas",
          "desc": "Exibe placas de taxa de vitória diretamente nos blocos de mapas na fila de busca."
        }
      ]
    },
    "changelogPage": {
      "version": "Versão 1.0.0",
      "badge": "HISTÓRICO DE VERSÕES",
      "title": "Histórico de atualizações do Peekly",
      "desc": "Histórico completo de lançamentos, otimizações de latência e novos recursos para o FACEIT CS2 competitivo.",
      "modulesSubtitle": "10 RECURSOS PRINCIPAIS",
      "modulesTitle": "MÓDULOS ATIVOS E DESTAQUES",
      "initialReleaseTitle": "Lançamento público inicial 1.0.0",
      "initialReleaseDesc": "Conjunto completo de inteligência de sala e automação para FACEIT CS2 competitivo."
    },
    "footer": {
      "tagline": "O companheiro limpo e minimalista para o FACEIT CS2 competitivo.",
      "disclaimer": "Peekly é desenvolvido de forma independente e não é afiliado à FACEIT ou Valve Corporation.",
      "rights": "© 2026 Peekly. Todos os direitos reservados.",
      "changelog": "Histórico de alterações",
      "allRightsReserved": "Todos os direitos reservados."
    }
  },
  "fi": {
    "nav": {
      "statusLabel": "Online:",
      "onlineCount": "0",
      "install": "Asenna laajennus",
      "changelog": "Muutosloki"
    },
    "hero": {
      "badge": "Google Chrome -laajennus",
      "title": "HALLITSE AULAA",
      "subtitle": "Huipputason otteluhuoneen analytiikka, pelaajatilastot ja automaatio-overlayt FACEIT CS2:lle.",
      "cta": "Lisää Chromeen",
      "note": "Manifest V3 • 100% FACEIT Anti-Cheat yhteensopiva"
    },
    "features": {
      "title": "Ominaisuudet",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Karttavalikoiman Tutkakaavio Aulassa",
          "desc": "Näyttää joukkueiden karttavalikoiman tutkan otteluaulassa viimeisen 30 ottelun perusteella."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Pelaajatilastojen Overlay Ottelussa",
          "desc": "Näyttää 30 ottelun tilastolaatat ja karttakohtaiset tiedot kunkin pelaajan alla."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Joukkueiden Keskimääräinen ELO -merkki",
          "desc": "Näyttää selkeät keskimääräisen ELO-arvon laatat tasokuvakkeella tulospalkissa."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Palvelimen IP:n Automaattinen Kopiointi",
          "desc": "Kopioi connect-komennon leikepöydälle automaattisesti palvelimen määrityksen yhteydessä."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Aulan Tarkennustila",
          "desc": "Piilottaa pelaajalistat ja tulospalkin jättäen näkyviin kartan, palvelimen ja tutkan."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Ottelutarkistuksen Automaattinen Hyväksyntä",
          "desc": "Vahvistaa valmiustilan automaattisesti ottelun löydyttyä viiveellä (0–10 s liukusäädin)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Ryhmäkutsujen Automaattinen Hyväksyntä",
          "desc": "Hyväksyy saapuvat ryhmäkutsut automaattisesti viiveellä (0–10 s liukusäädin)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Laajennettu Otteluhistoria",
          "desc": "Lisää K/R, ADR, PCR -mittarit ja demon latauspainikkeen (Demo) ottelutaulukkoon."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Sivupalkin ELO-Widget",
          "desc": "Näyttää kompaktin 2-elementtisen ELO-lohkon tasokuvakkeella ja pistemäärällä profiilissa."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Karttavalitsimen Voittoprosentit",
          "desc": "Näyttää voittoprosenttilaatat suoraan karttavalintalaatoilla otteluhaun jonossa."
        }
      ]
    },
    "changelogPage": {
      "version": "Versio 1.0.0",
      "badge": "MUUTOSLOKI",
      "title": "Peekly-järjestelmän muutosloki",
      "desc": "Täydellinen julkaisuhistoria, viiveoptimoinnit ja ominaisuuksien julkaisut kilpailulliseen FACEIT CS2:een.",
      "modulesSubtitle": "10 KESKEISTÄ OMINAISUUTTA",
      "modulesTitle": "AKTIIVISET MODUULIT JA JULKAISUN KOHOKOHDAT",
      "initialReleaseTitle": "Ensimmäinen julkinen versio 1.0.0",
      "initialReleaseDesc": "Täydellinen otteluhuoneen analyysi- ja automaatiopaketti kilpailulliseen FACEIT CS2:een."
    },
    "footer": {
      "tagline": "Puhdas ja minimalistinen kumppani kilpailulliseen FACEIT CS2 -pelaamiseen.",
      "disclaimer": "Peekly on kehitetty itsenäisesti eikä se ole virallisesti sidoksissa FACEITiin tai Valve Corporationiin.",
      "rights": "© 2026 Peekly. Kaikki oikeudet pidätetään.",
      "changelog": "Muutosloki",
      "allRightsReserved": "Kaikki oikeudet pidätetään."
    }
  },
  "sv": {
    "nav": {
      "statusLabel": "Online:",
      "onlineCount": "0",
      "install": "Installera tillägg",
      "changelog": "Ändringslogg"
    },
    "hero": {
      "badge": "Google Chrome-tillägg",
      "title": "DOMINERA LOBBYN",
      "subtitle": "Högpresterande matchrumsanalys, spelarstatistik och automatiseringsöverlägg för FACEIT CS2.",
      "cta": "Lägg till i Chrome",
      "note": "Manifest V3 • 100% säkert för FACEIT Anti-Cheat"
    },
    "features": {
      "title": "Funktioner",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Kartpools Radardiagram i Lobby",
          "desc": "Visar lagens kartpoolsradar i matchlobbyn baserat på de senaste 30 matcherna."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Spelarstatistik Overlay i Matchen",
          "desc": "Visar statistikbrickor för 30 matcher och kartuppdelning under varje spelare."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Lagets Genomsnittliga ELO-Emblem",
          "desc": "Visar kontrasterande genomsnittliga ELO-brickor med rangikon i poängbannern."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Auto-Kopiera Server-IP",
          "desc": "Kopierar connect-kommandot automatiskt till urklipp när servern tilldelas."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Lobby Fokusläge",
          "desc": "Döljer spelartrupper och poängbanner, lämnar karta, server och radar i fokus."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Auto-Acceptera Matchkontroll",
          "desc": "Bekräftar automatiskt när match hittas med fördröjning (skjutreglage 0–10 sek)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Auto-Acceptera Gruppinbjudningar",
          "desc": "Accepterar automatiskt gruppinbjudningar med fördröjning (skjutreglage 0–10 sek)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Utökad Matchhistorik",
          "desc": "Lägger till K/R, ADR, PCR och demo-nedladdningsknapp (Demo) i matchtabellen."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Sidofält ELO-Widget",
          "desc": "Visar ett kompakt 2-elements ELO-block med rangikon och poäng i profilsidofältet."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Kartväljarens Vinstprocent",
          "desc": "Visar vinstprocentbrickor direkt på kartvalskorten i matchmaking-kön."
        }
      ]
    },
    "changelogPage": {
      "version": "Version 1.0.0",
      "badge": "ÄNDRINGSLOGG",
      "title": "Peekly Systemändringslogg",
      "desc": "Fullständig versionshistorik, latensoptimeringar och funktionslanseringar för FACEIT CS2.",
      "modulesSubtitle": "10 NYCKELFUNKTIONER",
      "modulesTitle": "AKTIVA MODULER & UTGÅVOHÖJDPUNKTER",
      "initialReleaseTitle": "Första offentliga utgåvan 1.0.0",
      "initialReleaseDesc": "Komplett svit för matchrumsinformation och automatisering för FACEIT CS2."
    },
    "footer": {
      "tagline": "Den rena, minimalistiska följeslagaren för tävlingsinriktad FACEIT CS2.",
      "disclaimer": "Peekly utvecklas oberoende och är inte anslutet till FACEIT eller Valve Corporation.",
      "rights": "© 2026 Peekly. Alla rättigheter förbehållna.",
      "changelog": "Ändringslogg",
      "allRightsReserved": "Alla rättigheter förbehållna."
    }
  },
  "tr": {
    "nav": {
      "statusLabel": "Çevrimiçi:",
      "onlineCount": "0",
      "install": "Uzantıyı yükle",
      "changelog": "Değişiklik günlüğü"
    },
    "hero": {
      "badge": "Google Chrome Uzantısı",
      "title": "LOBİYE HÜKMET",
      "subtitle": "FACEIT CS2 için yüksek performanslı maç odası istihbaratı, oyuncu analitiği ve otomasyon arayüzleri.",
      "cta": "Chrome a Ekle",
      "note": "Manifest V3 • %100 FACEIT Anti-Cheat Uyumlu"
    },
    "features": {
      "title": "Özellikler",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Harita Havuzu Radar Grafiği",
          "desc": "Son 30 maça dayalı olarak maç lobisinde takımların harita havuzu radarını gösterir."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Maç İçi Oyuncu İstatistikleri Katmanı",
          "desc": "Her oyuncunun altında 30 maçlık performans plakalarını ve harita dağılımını gösterir."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Takım Ortalama ELO Rozeti",
          "desc": "Skor başlığında rütbe simgesiyle birlikte yüksek kontrastlı ortalama ELO rozetlerini gösterir."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Sunucu IP'sini Otomatik Kopyala",
          "desc": "Sunucu atandığında connect komutunu panoya otomatik olarak kopyalar."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Lobi Odak Modu",
          "desc": "Harita, sunucu ve radarı koruyarak oyuncu kadrolarını ve skor başlığını gizler."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Maç Kontrolünü Otomatik Kabul Et",
          "desc": "Maç bulunduğunda gecikmeyle hazır durumunu otomatik onaylar (0–10 sn kaydırıcı)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Grup Davetlerini Otomatik Kabul",
          "desc": "Gelen grup davetlerini gecikmeyle otomatik olarak kabul eder (0–10 sn kaydırıcı)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Gelişmiş Maç Geçmişi",
          "desc": "Maç tablosuna K/R, ADR, PCR metriklerini ve demo indirme düğmesini (Demo) ekler."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Kenar Çubuğu ELO Pencere Öğesi",
          "desc": "Profil kenar çubuğunda rütbe simgesi ve puan içeren kompakt 2 ögeli ELO bloğu gösterir."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Harita Seçici Kazanma Oranları",
          "desc": "Eşleştirme kuyruğundaki harita seçim kartlarında doğrudan kazanma oranı rozetlerini gösterir."
        }
      ]
    },
    "changelogPage": {
      "version": "Sürüm 1.0.0",
      "badge": "SÜRÜM NOTLARI",
      "title": "Peekly Sistem Güncelleme Geçmişi",
      "desc": "Rekabetçi FACEIT CS2 için eksiksiz sürüm geçmişi, gecikme optimizasyonları ve özellik dağıtımları.",
      "modulesSubtitle": "10 TEMEL ÖZELLİK",
      "modulesTitle": "AKTİF MODÜLLER VE SÜRÜM ÖNE ÇIKANLARI",
      "initialReleaseTitle": "İlk Genel Sürüm 1.0.0",
      "initialReleaseDesc": "Rekabetçi FACEIT CS2 için eksiksiz maç odası istihbaratı ve otomasyon paketi."
    },
    "footer": {
      "tagline": "Rekabetçi FACEIT CS2 için temiz, minimalist taktik asistanı.",
      "disclaimer": "Peekly bağımsız olarak geliştirilmiştir ve FACEIT veya Valve Corporation ile bağlantılı değildir.",
      "rights": "© 2026 Peekly. Tüm hakları saklıdır.",
      "changelog": "Sürüm notları",
      "allRightsReserved": "Tüm hakları saklıdır."
    }
  },
  "uk": {
    "nav": {
      "statusLabel": "Онлайн:",
      "onlineCount": "0",
      "install": "Встановити розширення",
      "changelog": "Історія версій"
    },
    "hero": {
      "badge": "Розширення для Google Chrome",
      "title": "ДОМІНУЙ У ЛОББІ",
      "subtitle": "Високопродуктивна розвідка лобі, аналітика гравців та оверлеї автоматизації для FACEIT CS2.",
      "cta": "Додати в Chrome",
      "note": "Manifest V3 • 100% безпечно для FACEIT Anti-Cheat"
    },
    "features": {
      "title": "Можливості",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "Радар маппулу в лобі",
          "desc": "Відображає радар маппулу команд у лобі матчу на основі останніх 30 ігор."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "Статистика гравців у матчі",
          "desc": "Відображає плашки зі статистикою за 30 ігор та розкладку по картах під кожним гравцем."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "Плашка середнього ELO команд",
          "desc": "Відображає контрастні плашки середнього ELO зі значком рангу в банері рахунку."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "Автокопіювання IP сервера",
          "desc": "Автоматично копіює команду connect у буфер при призначенні сервера."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "Режим фокусування лобі",
          "desc": "Приховує ростери гравців і банер рахунку, залишаючи карту, сервер і радар."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "Автоприйняття матчу",
          "desc": "Автоматично підтверджує готовність при знаходженні матчу із затримкою (повзунок 0–10 сек)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "Автоприйняття інвайтів у групу",
          "desc": "Автоматично приймає вхідні запрошення в групу із затримкою (повзунок 0–10 сек)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "Розширена історія матчів",
          "desc": "Додає в таблицю матчів показники K/R, ADR, PCR і кнопку завантаження демозапису (Demo)."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "Віджет ELO в сайдбарі",
          "desc": "Відображає компактний 2-елементний блок ELO з іконкою рангу та рахунком у сайдбарі профілю."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "Вінрейт на картках карт",
          "desc": "Відображає плашки вінрейту прямо на плитках карт у черзі матчу."
        }
      ]
    },
    "changelogPage": {
      "version": "Версія 1.0.0",
      "badge": "ІСТОРІЯ ВЕРСІЙ",
      "title": "Історія оновлень Peekly",
      "desc": "Повна хронологія оновлень, оптимізацій затримки та нових тактичних модулів для змагального FACEIT CS2.",
      "modulesSubtitle": "10 КЛЮЧОВИХ КОМПОНЕНТІВ",
      "modulesTitle": "СПИСОК МОДУЛІВ ТА ЗМІН",
      "initialReleaseTitle": "Перший публічний реліз 1.0.0",
      "initialReleaseDesc": "Полнофункціональний реліз розширення для змагального FACEIT CS2."
    },
    "footer": {
      "tagline": "Чистий і надійний інструмент для змагального FACEIT CS2.",
      "disclaimer": "Peekly розробляється незалежно і не пов язаний з FACEIT або Valve Corporation.",
      "rights": "© 2026 Peekly. Всі права захищені.",
      "changelog": "Історія версій",
      "allRightsReserved": "Всі права захищені."
    }
  },
  "ar": {
    "nav": {
      "statusLabel": "متصل:",
      "onlineCount": "0",
      "install": "تثبيت الإضافة",
      "changelog": "سجل التغييرات"
    },
    "hero": {
      "badge": "إضافة Google Chrome",
      "title": "سيطر على ساحة الانتظار",
      "subtitle": "معلومات تكتيكية فورية للغرفة، وتحليلات اللاعبين، وأدوات الأتمتة لـ FACEIT CS2 التنافسي.",
      "cta": "إضافة إلى Chrome",
      "note": "Manifest V3 • آمن تماماً مع FACEIT Anti-Cheat"
    },
    "features": {
      "title": "المميزات",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "مخطط رادار الخرائط في الردهة",
          "desc": "يعرض رادار خرائط الفرق في ردهة المباراة بناءً على آخر 30 مباراة."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "تراكب إحصائيات اللاعبين في المباراة",
          "desc": "يعرض لوحات أداء آخر 30 مباراة وتفاصيل الخرائط تحت كل لاعب."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "شارة متوسط ELO للفريقين",
          "desc": "يعرض شارات متوسط ELO عالية التباين مع رمز الرتبة في شريط النتيجة."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "نسخ IP الخادم تلقائياً",
          "desc": "ينسخ أمر connect تلقائياً إلى الحافظة فور تعيين خادم المباراة."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "وضع التركيز في الردهة",
          "desc": "يخفي قوائم اللاعبين وشريط النتيجة ويحتفظ بالخريطة والخادم والرادار."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "فحص قبول المباراة تلقائياً",
          "desc": "يؤكد الجاهزية تلقائياً عند العثور على مباراة مع تأخير (شريط تمرير 0–10 ثوانٍ)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "قبول دعوات المجموعة تلقائياً",
          "desc": "يقبل دعوات المجموعة الواردة تلقائياً مع تأخير (شريط تمرير 0–10 ثوانٍ)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "سجل مباريات متقدم",
          "desc": "يضيف مقاييس K/R و ADR و PCR وزر تنزيل الديمو (Demo) إلى جدول المباريات."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "أداة ELO في الشريط الجانبي",
          "desc": "يعرض قالباً مدمجاً من عنصرين لتصنيف ELO مع شارة الرتبة والنقاط في الملف الشخصي."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "نسب فوز محدد الخرائط",
          "desc": "يعرض شارات نسب الفوز مباشرة على بطاقات اختيار الخرائط في قائمة الانتظار."
        }
      ]
    },
    "changelogPage": {
      "version": "الإصدار 1.0.0",
      "badge": "سجل التغييرات",
      "title": "سجل تحديثات نظام Peekly",
      "desc": "سجل كامل للإصدارات وتحسينات زمن الاستجابة ونشر الميزات الجديدة لـ FACEIT CS2 التنافسي.",
      "modulesSubtitle": "10 ميزات أساسية",
      "modulesTitle": "الوحدات النشطة وأبرز التحديثات",
      "initialReleaseTitle": "الإصدار العام الأول 1.0.0",
      "initialReleaseDesc": "حزمة متكاملة من المعلومات التكتيكية والأتمتة لـ FACEIT CS2 التنافسي."
    },
    "footer": {
      "tagline": "المساعد التكتيكي الأنيق والخفيف لـ FACEIT CS2 التنافسي.",
      "disclaimer": "تم تطوير Peekly بشكل مستقل، وليس تابعاً أو مدعوماً رسمياً من FACEIT أو Valve Corporation.",
      "rights": "© 2026 Peekly. جميع الحقوق محفوظة.",
      "changelog": "سجل التغييرات",
      "allRightsReserved": "جميع الحقوق محفوظة."
    }
  },
  "ja": {
    "nav": {
      "statusLabel": "オンライン:",
      "onlineCount": "0",
      "install": "拡張機能をインストール",
      "changelog": "変更履歴"
    },
    "hero": {
      "badge": "Google Chrome 拡張機能",
      "title": "ロビーを支配せよ",
      "subtitle": "競技 FACEIT CS2 向けの高性能マッチルーム情報、プレイヤー分析、オートメーションオーバーレイ。",
      "cta": "Chrome に追加",
      "note": "Manifest V3 • FACEIT Anti-Cheat 100% 安全"
    },
    "features": {
      "title": "機能",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "ロビーのマッププールレーダー",
          "desc": "直近30試合の実績に基づき、マッチルーム内で両チームのマッププールレーダーを表示します。"
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "対戦中プレイヤースタッツ オーバーレイ",
          "desc": "各プレイヤーの下に直近30試合の戦績パネルとマップ別内訳を表示します。"
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "チーム平均 ELO バッジ",
          "desc": "スコアバナー内にランクアイコン付きの高コントラストな平均 ELO プレートを表示します。"
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "サーバーIP自動コピー",
          "desc": "マッチサーバーが割り当てられると、connect コマンドをクリップボードに自動コピーします。"
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "ロビーフォーカスモード",
          "desc": "ロスターとスコアバナーを隠し、マップ、サーバー、レーダーのみに集中できます。"
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "マッチチェック自動承認",
          "desc": "マッチング成立時に自動で準備完了を確認します（0〜10秒のスライダー設定）。"
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "パーティ招待の自動承認",
          "desc": "届いたパーティ招待を自動で承認します（0〜10秒のスライダー設定）。"
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "拡張マッチ履歴",
          "desc": "マッチ表に K/R、ADR、PCR の指標とデモダウンロード（Demo）ボタンを追加します。"
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "サイドバー ELO ウィジェット",
          "desc": "プロフィールサイドバーにランクアイコンとレート数を備えたコンパクトな2要素 ELO ブロックを表示します。"
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "マップセレクター勝率",
          "desc": "マッチ待機キューのマップ選択タイル上に勝率バッジを直接表示します。"
        }
      ]
    },
    "changelogPage": {
      "version": "バージョン 1.0.0",
      "badge": "変更履歴",
      "title": "Peekly システム更新履歴",
      "desc": "競技 FACEIT CS2 向けの完全なリリース履歴、レイテンシ最適化、および機能展開。",
      "modulesSubtitle": "10のコア機能",
      "modulesTitle": "アクティブモジュールとリリースのハイライト",
      "initialReleaseTitle": "初回パブリックリリース 1.0.0",
      "initialReleaseDesc": "競技 FACEIT CS2 向けの高機能マッチルーム分析および自動化スイート。"
    },
    "footer": {
      "tagline": "競技 FACEIT CS2 のための洗練されたミニマルコンパニオン。",
      "disclaimer": "Peekly は独立して開発されており、FACEIT または Valve Corporation と提携または承認されていません。",
      "rights": "© 2026 Peekly. 無断転載を禁じます。",
      "changelog": "変更履歴",
      "allRightsReserved": "無断転載を禁じます。"
    }
  },
  "ko": {
    "nav": {
      "statusLabel": "온라인:",
      "onlineCount": "0",
      "install": "확장 프로그램 설치",
      "changelog": "변경 로그"
    },
    "hero": {
      "badge": "Google Chrome 확장 프로그램",
      "title": "로비를 지배하라",
      "subtitle": "경쟁 FACEIT CS2를 위한 고성능 매치룸 인텔리전스, 플레이어 분석 및 자동화 오버레이.",
      "cta": "Chrome에 추가",
      "note": "Manifest V3 • FACEIT Anti-Cheat 100% 안전"
    },
    "features": {
      "title": "기능",
      "items": [
        {
          "id": "radar",
          "tab": "matchroom",
          "title": "로비 맵 풀 레이더 차트",
          "desc": "최근 30경기 기록을 바탕으로 매치룸에서 양 팀의 맵 풀 레이더를 표시합니다."
        },
        {
          "id": "stats",
          "tab": "matchroom",
          "title": "매치 플레이어 전적 분석 오버레이",
          "desc": "각 플레이어 하단에 30경기 기록 패널과 맵별 상세 전적을 표시합니다."
        },
        {
          "id": "avgEloPill",
          "tab": "matchroom",
          "title": "팀 평균 ELO 뱃지",
          "desc": "스코어 배너에 랭크 아이콘과 고대비 팀 평균 ELO 패널을 표시합니다."
        },
        {
          "id": "autoCopyServer",
          "tab": "matchroom",
          "title": "서버 IP 자동 복사",
          "desc": "매치 서버가 배정되는 즉시 콘솔 connect 명령어를 클립보드에 자동 복사합니다."
        },
        {
          "id": "focusMode",
          "tab": "matchroom",
          "title": "로비 집중 모드",
          "desc": "플레이어 명단과 스코어 배너를 숨기고 맵, 서버, 레이더만 깔끔하게 유지합니다."
        },
        {
          "id": "autoAcceptMatch",
          "tab": "automation",
          "title": "매치 확인 자동 수락",
          "desc": "매치 발견 시 수락 버튼을 자동으로 클릭합니다 (0–10초 조절 슬라이더)."
        },
        {
          "id": "autoAcceptParty",
          "tab": "automation",
          "title": "파티 초대 자동 수락",
          "desc": "수신된 파티 초대를 딜레이와 함께 자동으로 수락합니다 (0–10초 조절 슬라이더)."
        },
        {
          "id": "enhancedHistory",
          "tab": "profile",
          "title": "확장 매치 기록",
          "desc": "매치 테이블에 K/R, ADR, PCR 지표 및 데모 다운로드(Demo) 버튼을 추가합니다."
        },
        {
          "id": "sidebarElo",
          "tab": "profile",
          "title": "사이드바 ELO 위젯",
          "desc": "프로필 사이드바에 랭크 아이콘과 평점이 포함된 컴팩트한 2요소 ELO 블록을 표시합니다."
        },
        {
          "id": "mapSelectorStats",
          "tab": "profile",
          "title": "맵 선택기 승률",
          "desc": "매치메이킹 대기열의 맵 선택 타일 위에 팀 승률 뱃지를 직접 표시합니다."
        }
      ]
    },
    "changelogPage": {
      "version": "버전 1.0.0",
      "badge": "변경 로그",
      "title": "Peekly 시스템 변경 로그",
      "desc": "경쟁 FACEIT CS2를 위한 전체 릴리스 내역, 지연 시간 최적화 및 새로운 기능 출시 기록.",
      "modulesSubtitle": "10가지 핵심 기능",
      "modulesTitle": "활성 모듈 및 릴리스 주요 변경 사항",
      "initialReleaseTitle": "최초 공식 출시 1.0.0",
      "initialReleaseDesc": "경쟁 FACEIT CS2를 위한 고성능 매치룸 인텔리전스 및 자동화 확장 프로그램 제품군."
    },
    "footer": {
      "tagline": "경쟁 FACEIT CS2를 위한 미니멀하고 강력한 컴패니언.",
      "disclaimer": "Peekly는 독립적으로 개발되었으며 FACEIT 또는 Valve Corporation과 제휴하거나 보증하지 않습니다.",
      "rights": "© 2026 Peekly. 모든 권리 보유.",
      "changelog": "변경 로그",
      "allRightsReserved": "모든 권리 보유."
    }
  }
};
