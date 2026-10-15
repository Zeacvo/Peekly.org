import type { Language } from '../translations';

export interface TableRow {
  category: string;
  status: string;
  statusType: 'not_collected' | 'ephemeral' | 'stored_locally';
  processing: string;
}

export interface PermissionItem {
  name: string;
  desc: string;
}

export interface PrivacyTranslation {
  pageTitle: string;
  subtitle: string;
  projectLabel: string;
  projectName: string;
  effectiveDateLabel: string;
  effectiveDateValue: string;
  sections: {
    s1: {
      title: string;
      p1: string;
      p2: string;
    };
    s2: {
      title: string;
      intro: string;
      subIntro: string;
      bullets: Array<{ label: string; text: string }>;
    };
    s3: {
      title: string;
      intro: string;
      bullets: Array<{ label: string; text: string }>;
      tableHeaders: {
        category: string;
        status: string;
        method: string;
      };
      tableRows: TableRow[];
    };
    s4: {
      title: string;
      intro: string;
      bullets: Array<{ label: string; text: string }>;
      storageNote: string;
    };
    s5: {
      title: string;
      intro: string;
      items: PermissionItem[];
    };
    s6: {
      title: string;
      intro: string;
      bullets: Array<{ label: string; text: string }>;
    };
    s7: {
      title: string;
      intro: string;
      projectLabel: string;
      supportEmailLabel: string;
      websiteLabel: string;
    };
    s8: {
      title: string;
      text: string;
    };
  };
  disclaimer: {
    copyright: string;
    legal: string;
  };
}

export const privacyTranslations: Record<Language, PrivacyTranslation> = {
  en: {
    pageTitle: 'Privacy Policy',
    subtitle: 'Official privacy policy, single-purpose mandate, and zero-telemetry architecture for Peekly for FACEIT.',
    projectLabel: 'Project:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Effective Date:',
    effectiveDateValue: 'October 2026',
    sections: {
      s1: {
        title: 'Introduction & Single Purpose',
        p1: 'This Privacy Policy governs the browser extension Peekly for FACEIT ("Peekly", "the Extension", "we", "our"), developed to enhance the competitive matchmaking experience for players on the FACEIT competitive platform (faceit.com).',
        p2: 'In full accordance with the Google Chrome Web Store Developer Program Policies, Peekly operates under a strict Single Purpose mandate: to compute and render transparent match performance intelligence (recent match statistics, rating dynamics, map balance radar, and match history insights) directly inside authorized FACEIT matchroom interfaces.',
      },
      s2: {
        title: 'Data Collection & Usage',
        intro: 'Peekly is engineered on strict privacy-by-design principles. We explicitly state that the Extension does not collect, store, sell, trade, or transfer any Personally Identifiable Information (PII) to external developers or commercial third parties.',
        subIntro: 'Specifically:',
        bullets: [
          { label: 'No Personal Identifiers', text: 'We do not collect or process your real name, email address, physical address, phone number, or IP address.' },
          { label: 'No Account Credentials', text: 'Peekly never accesses, logs, or stores your FACEIT passwords, Steam authentication credentials, API tokens, or payment methods.' },
          { label: 'No Private Communications', text: 'The Extension does not inspect, read, or record private chat messages, friend lists, or direct communications.' },
          { label: 'No Browsing History', text: 'Peekly does not monitor, track, or record your web browsing activity outside of authorized faceit.com matchrooms and profiles.' },
          { label: 'No Third-Party Trackers or Analytics', text: 'Peekly contains zero analytics SDKs, tracking pixels, telemetry scripts, or advertising trackers (including Google Analytics, Yandex Metrika, Sentry, or Mixpanel).' },
        ],
      },
      s3: {
        title: 'Data Processing Architecture',
        intro: 'All data processing is executed strictly client-side within your local web browser session:',
        bullets: [
          { label: 'Direct Official API Requests', text: 'Statistical queries (e.g., K/D ratio, ADR, HLTV rating, match history) are performed directly from your browser to official public FACEIT API endpoints (such as https://open.faceit.com/* and https://api.faceit.com/*).' },
          { label: 'No Intermediate Servers', text: 'Peekly operates without proprietary proxy servers, relay endpoints, or cloud databases. No query or session data passes through third-party infrastructure.' },
        ],
        tableHeaders: {
          category: 'Data Category',
          status: 'Collection Status',
          method: 'Processing Method',
        },
        tableRows: [
          {
            category: 'Personal Identity & Contact Info',
            status: 'Not Collected',
            statusType: 'not_collected',
            processing: 'Never accessed or transmitted',
          },
          {
            category: 'Passwords & Authentication Cookies',
            status: 'Not Collected',
            statusType: 'not_collected',
            processing: 'Never accessed or stored',
          },
          {
            category: 'Lobby Match Statistics (K/D, ADR, ELO)',
            status: 'Ephemeral / Not Collected',
            statusType: 'ephemeral',
            processing: 'Fetched directly from FACEIT API into browser runtime memory',
          },
          {
            category: 'User Preferences (Language, Toggles)',
            status: 'Stored Locally Only',
            statusType: 'stored_locally',
            processing: 'Persisted on the local device via chrome.storage.local',
          },
        ],
      },
      s4: {
        title: 'Local Storage (chrome.storage.local)',
        intro: 'Peekly uses the native Google Chrome Storage API (chrome.storage.local) exclusively for client-side functionality:',
        bullets: [
          { label: 'User Configuration', text: 'Remembering user interface settings, selected display language (e.g., English, Russian, Polish, etc.), active module toggles, and notification preferences.' },
          { label: 'Ephemeral Match Cache', text: 'Temporarily caching recent match stats with an automated Time-To-Live (TTL) expiration to avoid redundant API queries when refreshing lobby views.' },
        ],
        storageNote: 'All stored information remains strictly on the user\'s local machine. It is never synchronized across devices, never transmitted to external servers, and inaccessible to any other website.',
      },
      s5: {
        title: 'Permissions Justification',
        intro: 'In adherence to the Chrome Web Store policy of minimal permissions, Peekly requests only the permissions strictly necessary for its declared functionality:',
        items: [
          {
            name: 'host_permissions: https://*.faceit.com/*',
            desc: 'Required to inject the analytics user interface (player cards, radar map balance, team indicators) directly into FACEIT web matchrooms and profiles.',
          },
          {
            name: 'storage & unlimitedStorage',
            desc: 'Required to store user preferences and temporary match statistics locally on the client without encountering storage quota interruptions.',
          },
          {
            name: 'downloads',
            desc: 'Used solely when the user clicks the "Download Demo" button in match history to initiate the direct browser download of the official CS2 match replay file from FACEIT servers.',
          },
        ],
      },
      s6: {
        title: 'User Rights & Data Deletion',
        intro: 'Because all data generated by Peekly is stored exclusively on your local machine, you have complete ownership and control over it:',
        bullets: [
          { label: 'Complete Deletion', text: 'Removing the extension from your browser (via chrome://extensions → "Remove") permanently and instantly deletes all stored preferences, configurations, and cached data from your machine.' },
          { label: 'Feature Control', text: 'You can disable any specific module or feature at any time through the Peekly popup menu without altering other settings.' },
        ],
      },
      s7: {
        title: 'Contact Information',
        intro: 'If you have questions, feedback, or compliance inquiries regarding this Privacy Policy or Peekly\'s data practices, please contact us:',
        projectLabel: 'Project:',
        supportEmailLabel: 'Support Email:',
        websiteLabel: 'Legal Documentation / Website:',
      },
      s8: {
        title: 'Changes to This Privacy Policy',
        text: 'This Privacy Policy may be updated periodically to maintain compliance with relevant browser extension policies or platform modifications. Any updates will be reflected on this page with a revised Effective Date.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. All rights reserved.',
      legal: 'Disclaimer: Peekly is an independent software project and is not affiliated with, maintained, authorized, or endorsed by FACEIT Ltd or Valve Corporation. Counter-Strike, CS2, and FACEIT are registered trademarks of their respective owners.',
    },
  },

  ru: {
    pageTitle: 'Политика конфиденциальности',
    subtitle: 'Официальная политика конфиденциальности, декларация единой цели и архитектура с нулевой телеметрией расширения Peekly for FACEIT.',
    projectLabel: 'Проект:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Дата вступления в силу:',
    effectiveDateValue: 'Октябрь 2026',
    sections: {
      s1: {
        title: 'Введение и единая цель',
        p1: 'Настоящая Политика конфиденциальности регулирует использование браузерного расширения Peekly for FACEIT («Peekly», «Расширение», «мы», «наш»), разработанного для улучшения соревновательного опыта игроков на платформе FACEIT (faceit.com).',
        p2: 'В полном соответствии с правилами программы разработчиков Google Chrome Web Store, Peekly действует в рамках строгой единой цели: вычисление и отображение прозрачной игровой аналитики (статистика последних матчей, динамика рейтинга, радар маппула и история игр) непосредственно в авторизованных интерфейсах лобби FACEIT.',
      },
      s2: {
        title: 'Сбор и использование данных',
        intro: 'Peekly спроектирован на принципах строгой конфиденциальности (privacy-by-design). Расширение не собирает, не хранит, не продает и не передает персональные идентификационные данные (PII) сторонним разработчикам или коммерческим сервисам.',
        subIntro: 'В частности:',
        bullets: [
          { label: 'Без личных идентификаторов', text: 'Мы не собираем и не обрабатываем ваше реальное имя, адрес электронной почты, физический адрес, номер телефона или IP-адрес.' },
          { label: 'Без учетных данных', text: 'Peekly никогда не запрашивает, не регистрирует и не сохраняет пароли FACEIT, данные аутентификации Steam, API-ключи или платежные реквизиты.' },
          { label: 'Без доступа к переписке', text: 'Расширение не сканирует и не сохраняет сообщения в чатах, списки друзей или личные коммуникации.' },
          { label: 'Без истории браузера', text: 'Peekly не отслеживает и не фиксирует действия пользователя за пределами страниц faceit.com.' },
          { label: 'Без трекеров и аналитики', text: 'В коде отсутствуют аналитические SDK, пиксели отслеживания, телеметрия или рекламные трекеры (включая Google Analytics, Яндекс.Метрику, Sentry или Mixpanel).' },
        ],
      },
      s3: {
        title: 'Архитектура обработки данных',
        intro: 'Вся обработка информации выполняется исключительно на стороне клиента (client-side) внутри вашей локальной сессии браузера:',
        bullets: [
          { label: 'Прямые официальные API-запросы', text: 'Статистика (K/D, ADR, рейтинг HLTV, история матчей) запрашивается напрямую из браузера к публичным эндпоинтам FACEIT API (https://open.faceit.com/* и https://api.faceit.com/*).' },
          { label: 'Без промежуточных серверов', text: 'Peekly работает без собственных прокси-серверов, шлюзов или облачных баз данных. Запросы не проходят через инфраструктуру третьих лиц.' },
        ],
        tableHeaders: {
          category: 'Категория данных',
          status: 'Статус сбора',
          method: 'Способ обработки',
        },
        tableRows: [
          {
            category: 'Личные данные и контакты',
            status: 'Не собираются',
            statusType: 'not_collected',
            processing: 'Никогда не запрашиваются и не передаются',
          },
          {
            category: 'Пароли и сессионные cookies',
            status: 'Не собираются',
            statusType: 'not_collected',
            processing: 'Никогда не считываются и не сохраняются',
          },
          {
            category: 'Статистика матча в лобби (K/D, ADR, ELO)',
            status: 'Временная / Не собирается',
            statusType: 'ephemeral',
            processing: 'Загружается напрямую из FACEIT API в оперативную память браузера',
          },
          {
            category: 'Настройки пользователя (язык, тумблеры)',
            status: 'Только локально',
            statusType: 'stored_locally',
            processing: 'Сохраняются на устройстве через chrome.storage.local',
          },
        ],
      },
      s4: {
        title: 'Локальное хранилище (chrome.storage.local)',
        intro: 'Peekly использует стандартный API браузера Google Chrome (chrome.storage.local) исключительно для локальной функциональности:',
        bullets: [
          { label: 'Пользовательские настройки', text: 'Сохранение языка интерфейса, активных модулей аналитики и параметров уведомлений.' },
          { label: 'Краткосрочный кэш матчей', text: 'Временное кэширование статистики матчей с автоматическим временем жизни (TTL) для предотвращения избыточных повторных запросов.' },
        ],
        storageNote: 'Все сохраненные параметры остаются исключительно на вашем устройстве, никогда не синхронизируются и недоступны другим сайтам.',
      },
      s5: {
        title: 'Обоснование разрешений',
        intro: 'Следуя политике минимально необходимых разрешений Chrome Web Store, Peekly запрашивает только то, что строго необходимо для работы:',
        items: [
          {
            name: 'host_permissions: https://*.faceit.com/*',
            desc: 'Необходимо для отображения элементов аналитики (карточки игроков, радар маппула, ELO команд) в лобби и профилях FACEIT.',
          },
          {
            name: 'storage & unlimitedStorage',
            desc: 'Необходимо для сохранения пользовательских настроек и временного кэша статистики локально на устройстве.',
          },
          {
            name: 'downloads',
            desc: 'Используется исключительно при нажатии кнопки «Скачать демо» в истории матчей для прямой загрузки реплея с серверов FACEIT.',
          },
        ],
      },
      s6: {
        title: 'Права пользователя и удаление данных',
        intro: 'Так как все данные хранятся только на вашем компьютере, вы обладаете полным контролем над ними:',
        bullets: [
          { label: 'Полное удаление', text: 'Удаление расширения из браузера (chrome://extensions → «Удалить») моментально и навсегда стирает все сохраненные настройки и кэш.' },
          { label: 'Управление функциями', text: 'Вы можете в любой момент отключить любой отдельный модуль в всплывающем меню Peekly.' },
        ],
      },
      s7: {
        title: 'Контактная информация',
        intro: 'По вопросам, предложениям или юридическим запросам относительно настоящей Политики конфиденциальности обращайтесь к нам:',
        projectLabel: 'Проект:',
        supportEmailLabel: 'Служба поддержки:',
        websiteLabel: 'Документация и сайт:',
      },
      s8: {
        title: 'Изменения в Политике конфиденциальности',
        text: 'Настоящая Политика может периодически обновляться для соответствия правилам платформ. Любые изменения публикуются на этой странице с указанием даты вступления в силу.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Все права защищены.',
      legal: 'Отказ от ответственности: Peekly является независимым проектом и не связан, не авторизован и не поддерживается компаниями FACEIT Ltd или Valve Corporation. Counter-Strike, CS2 и FACEIT являются зарегистрированными товарными знаками соответствующих владельцев.',
    },
  },

  uk: {
    pageTitle: 'Політика конфіденційності',
    subtitle: 'Офіційна політика конфіденційності, декларація єдиної мети та архітектура з нульовою телеметрією розширення Peekly for FACEIT.',
    projectLabel: 'Проєкт:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Дата набуття чинності:',
    effectiveDateValue: 'Жовтень 2026',
    sections: {
      s1: {
        title: 'Вступ та єдина мета',
        p1: 'Ця Політика конфіденційності регулює використання браузерного розширення Peekly for FACEIT («Peekly», «Розширення», «ми», «наш»), створеного для покращення змагального досвіду гравців на платформі FACEIT (faceit.com).',
        p2: 'У повній відповідності до правил Google Chrome Web Store Developer Program, Peekly діє за суворим принципом єдиної мети: обчислення та прозоре відображення статистики матчів безпосередньо в лобі FACEIT.',
      },
      s2: {
        title: 'Збір та використання даних',
        intro: 'Peekly розроблено на засадах суворої конфіденційності. Розширення не збирає, не зберігає, не продає та не передає жодних персональних даних (PII) третім особам.',
        subIntro: 'Зокрема:',
        bullets: [
          { label: 'Без особистих ідентифікаторів', text: 'Ми не збираємо ваше ім\'я, email, телефон чи IP-адресу.' },
          { label: 'Без облікових даних', text: 'Peekly ніколи не отримує доступ до паролів FACEIT чи ключів Steam.' },
          { label: 'Без доступу до чатів', text: 'Розширення не сканує приватні повідомлення або список друзів.' },
          { label: 'Без історії браузера', text: 'Дії за межами faceit.com жодним чином не відстежуються.' },
          { label: 'Без трекерів і телеметрії', text: 'У коді повністю відсутні аналітичні та рекламні трекери.' },
        ],
      },
      s3: {
        title: 'Архітектура обробки даних',
        intro: 'Уся обробка даних здійснюється виключно на стороні клієнта (client-side) у локальній сесії браузера:',
        bullets: [
          { label: 'Прямі запити до офіційного API', text: 'Статистика надходить напряму від публічних ендпоінтів FACEIT API (https://open.faceit.com/*).' },
          { label: 'Без проміжних серверів', text: 'Peekly не використовує сторонніх проксі чи хмарних серверів.' },
        ],
        tableHeaders: {
          category: 'Категорія даних',
          status: 'Статус збору',
          method: 'Спосіб обробки',
        },
        tableRows: [
          { category: 'Особисті дані та контакти', status: 'Не збираються', statusType: 'not_collected', processing: 'Ніколи не зчитуються' },
          { category: 'Паролі та cookies', status: 'Не збираються', statusType: 'not_collected', processing: 'Ніколи не зберігаються' },
          { category: 'Статистика лобі (K/D, ADR, ELO)', status: 'Тимчасова / Не збирається', statusType: 'ephemeral', processing: 'Завантажується напряму з FACEIT API в пам\'ять' },
          { category: 'Налаштування користувача', status: 'Тільки локально', statusType: 'stored_locally', processing: 'Зберігаються через chrome.storage.local' },
        ],
      },
      s4: {
        title: 'Локальне сховище (chrome.storage.local)',
        intro: 'Peekly використовує Google Chrome Storage API виключно для збереження локальних налаштувань:',
        bullets: [
          { label: 'Конфігурація користувача', text: 'Збереження вибраної мови та активних перемикачів модулів.' },
          { label: 'Кеш матчів', text: 'Тимчасове кешування з автоматичним терміном дії (TTL).' },
        ],
        storageNote: 'Усі дані зберігаються тільки на вашому пристрої і ніколи не передаються в мережу.',
      },
      s5: {
        title: 'Обґрунтування дозволів',
        intro: 'Peekly запитує лише мінімально необхідні дозволи для виконання своїх функцій:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Необхідно для відображення інтерфейсу в матчах FACEIT.' },
          { name: 'storage & unlimitedStorage', desc: 'Необхідно для збереження локальних налаштувань без переривань квоти.' },
          { name: 'downloads', desc: 'Потрібно тільки для прямого завантаження демозаписів CS2 матчів.' },
        ],
      },
      s6: {
        title: 'Права користувача та видалення даних',
        intro: 'Ви маєте повний контроль над усіма локальними даними розширення:',
        bullets: [
          { label: 'Повне видалення', text: 'Видалення розширення миттєво очищує всі локальні дані.' },
          { label: 'Контроль функцій', text: 'Будь-який модуль можна вимкнути через меню налаштувань.' },
        ],
      },
      s7: {
        title: 'Контактна інформація',
        intro: 'Для запитань або звернень щодо Політики конфіденційності звертайтеся:',
        projectLabel: 'Проєкт:',
        supportEmailLabel: 'Служба підтримки:',
        websiteLabel: 'Документація та сайт:',
      },
      s8: {
        title: 'Зміни до Політики конфіденційності',
        text: 'Цю політику може бути оновлено відповідно до змін у політиках магазину розширень.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Всі права захищені.',
      legal: 'Застереження: Peekly є незалежним програмним забезпеченням і не пов\'язаний з FACEIT Ltd або Valve Corporation.',
    },
  },

  de: {
    pageTitle: 'Datenschutzerklärung',
    subtitle: 'Offizielle Datenschutzerklärung, Zweckbindung und Null-Telemetrie-Architektur von Peekly for FACEIT.',
    projectLabel: 'Projekt:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Gültig ab:',
    effectiveDateValue: 'Oktober 2026',
    sections: {
      s1: {
        title: 'Einführung & Zweckbindung',
        p1: 'Diese Datenschutzerklärung gilt für die Browser-Erweiterung Peekly for FACEIT ("Peekly", "die Erweiterung", "wir"), entwickelt für FACEIT CS2-Spieler (faceit.com).',
        p2: 'Gemäß den Richtlinien des Chrome Web Stores verfolgt Peekly einen einzigen Zweck: transparente Spielstatistiken direkt in autorisierten FACEIT-Matchräumen darzustellen.',
      },
      s2: {
        title: 'Datenerfassung & Verwendung',
        intro: 'Peekly basiert auf striktem Privacy-by-Design. Wir erfassen, speichern, verkaufen oder übertragen keinerlei personenbezogene Daten (PII).',
        subIntro: 'Konkret:',
        bullets: [
          { label: 'Keine personenbezogenen Kennungen', text: 'Weder Name, E-Mail-Adresse, Telefonnummer noch IP-Adresse werden erfasst.' },
          { label: 'Keine Zugangsdaten', text: 'Passwörter, Steam-Authentifizierungen oder Zahlungsmethoden werden niemals berührt.' },
          { label: 'Keine Chat-Einsicht', text: 'Private Chats und Freundeslisten werden weder gelesen noch gespeichert.' },
          { label: 'Kein Browserverlauf', text: 'Aktivitäten außerhalb von faceit.com werden zu keinem Zeitpunkt erfasst.' },
          { label: 'Keine Drittanbieter-Tracker', text: 'Null Tracking-Pixel, keine Telemetrie und keine Werbetracker.' },
        ],
      },
      s3: {
        title: 'Datenverarbeitungs-Architektur',
        intro: 'Alle Prozesse laufen zu 100% Client-seitig in Ihrer lokalen Browsersitzung ab:',
        bullets: [
          { label: 'Direkte offizielle API-Anfragen', text: 'Statistiken werden direkt von öffentlichen FACEIT-API-Endpunkten geladen.' },
          { label: 'Keine Zwischenserver', text: 'Peekly betreibt keine Proxyserver oder externen Cloud-Datenbanken.' },
        ],
        tableHeaders: {
          category: 'Datenkategorie',
          status: 'Erfassungsstatus',
          method: 'Verarbeitungsmethode',
        },
        tableRows: [
          { category: 'Persönliche Identität & Kontakt', status: 'Nicht erfasst', statusType: 'not_collected', processing: 'Niemals aufgerufen oder übertragen' },
          { category: 'Passwörter & Authentifizierungs-Cookies', status: 'Nicht erfasst', statusType: 'not_collected', processing: 'Niemals ausgelesen oder gespeichert' },
          { category: 'Lobby-Matchstatistiken (K/D, ELO)', status: 'Flüchtig / Nicht erfasst', statusType: 'ephemeral', processing: 'Direkt von FACEIT API in den lokalen Arbeitsspeicher' },
          { category: 'Benutzereinstellungen (Sprache, Module)', status: 'Nur lokal gespeichert', statusType: 'stored_locally', processing: 'Auf dem Gerät via chrome.storage.local gespeichert' },
        ],
      },
      s4: {
        title: 'Lokaler Speicher (chrome.storage.local)',
        intro: 'Peekly nutzt die Chrome Storage API ausschließlich für lokale Browserfunktionen:',
        bullets: [
          { label: 'Benutzerkonfiguration', text: 'Speichern von Anzeigesprache und Modul-Einstellungen.' },
          { label: 'Flüchtiger Match-Cache', text: 'Kurzzeitiges Zwischenspeichern zur Reduzierung doppelter API-Anfragen.' },
        ],
        storageNote: 'Alle Daten verbleiben ausschließlich auf Ihrem Gerät und werden niemals synchronisiert.',
      },
      s5: {
        title: 'Berechtigungsbegründung',
        intro: 'Peekly fordert nur Berechtigungen an, die für die Kernfunktion zwingend erforderlich sind:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Erforderlich für das Einblenden der Analysen in FACEIT-Räume.' },
          { name: 'storage & unlimitedStorage', desc: 'Erforderlich für das lokale Speichern der Einstellungen.' },
          { name: 'downloads', desc: 'Wird nur beim Klick auf "Demo herunterladen" zum Abruf des Replays verwendet.' },
        ],
      },
      s6: {
        title: 'Nutzerrechte & Datenlöschung',
        intro: 'Da alle Daten nur lokal vorliegen, haben Sie die vollständige Kontrolle:',
        bullets: [
          { label: 'Vollständige Löschung', text: 'Durch Deinstallation der Erweiterung werden alle Einstellungen sofort gelöscht.' },
          { label: 'Modulsteuerung', text: 'Jedes Feature kann jederzeit im Menü einzeln deaktiviert werden.' },
        ],
      },
      s7: {
        title: 'Kontaktinformationen',
        intro: 'Bei Fragen oder Anfragen zur Datenschutzerklärung erreichen Sie uns unter:',
        projectLabel: 'Projekt:',
        supportEmailLabel: 'Support-E-Mail:',
        websiteLabel: 'Website & Dokumentation:',
      },
      s8: {
        title: 'Änderungen dieser Datenschutzerklärung',
        text: 'Etwaige Aktualisierungen werden auf dieser Seite mit einem überarbeiteten Datum veröffentlicht.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Alle Rechte vorbehalten.',
      legal: 'Haftungsausschluss: Peekly ist ein unabhängiges Softwareprojekt und steht in keiner Verbindung zu FACEIT Ltd oder Valve Corporation.',
    },
  },

  fr: {
    pageTitle: 'Politique de confidentialité',
    subtitle: 'Politique officielle, mandat à finalité unique et architecture zéro télémétrie de Peekly for FACEIT.',
    projectLabel: 'Projet :',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Date d\'effet :',
    effectiveDateValue: 'Octobre 2026',
    sections: {
      s1: {
        title: 'Introduction & Finalité unique',
        p1: 'Cette Politique de confidentialité régit l\'extension Peekly for FACEIT (« Peekly », « nous »), conçue pour les joueurs sur FACEIT (faceit.com).',
        p2: 'Conformément aux règles du Chrome Web Store, Peekly opère selon un mandat strict à finalité unique : calculer et afficher des statistiques compétitives directement dans FACEIT.',
      },
      s2: {
        title: 'Collecte et utilisation des données',
        intro: 'Peekly est conçu selon le principe de confidentialité dès la conception. Aucune donnée personnelle identifiable (PII) n\'est collectée, vendue ou transférée.',
        subIntro: 'Plus précisément :',
        bullets: [
          { label: 'Aucun identifiant personnel', text: 'Aucun nom, email, téléphone ou adresse IP n\'est collecté.' },
          { label: 'Aucun identifiant de compte', text: 'Mots de passe, tokens Steam ou cartes bancaires ne sont jamais consultés.' },
          { label: 'Aucune communication privée', text: 'Les chats et messages privés restent strictement inaccessibles.' },
          { label: 'Aucun historique de navigation', text: 'L\'activité hors de faceit.com n\'est jamais surveillée.' },
          { label: 'Aucun traceur tiers', text: 'Zéro pixel, aucun script de télémétrie, aucun outil publicitaire.' },
        ],
      },
      s3: {
        title: 'Architecture de traitement des données',
        intro: 'Tous les traitements sont exécutés à 100% côté client dans votre navigateur :',
        bullets: [
          { label: 'Requêtes API officielles directes', text: 'Les statistiques proviennent directement des serveurs publics de FACEIT.' },
          { label: 'Aucun serveur intermédiaire', text: 'Peekly n\'utilise aucun serveur proxy ni base de données cloud propriétaire.' },
        ],
        tableHeaders: {
          category: 'Catégorie de données',
          status: 'Statut de collecte',
          method: 'Méthode de traitement',
        },
        tableRows: [
          { category: 'Identité personnelle & Contact', status: 'Non collecté', statusType: 'not_collected', processing: 'Jamais consulté ni transmis' },
          { category: 'Mots de passe & Cookies d\'authentification', status: 'Non collecté', statusType: 'not_collected', processing: 'Jamais lu ni enregistré' },
          { category: 'Statistiques de match (K/D, ADR, ELO)', status: 'Éphémère / Non collecté', statusType: 'ephemeral', processing: 'Chargé directement depuis l\'API FACEIT en mémoire' },
          { category: 'Préférences utilisateur (Langue, Modules)', status: 'Stocké localement uniquement', statusType: 'stored_locally', processing: 'Persisté sur l\'appareil via chrome.storage.local' },
        ],
      },
      s4: {
        title: 'Stockage local (chrome.storage.local)',
        intro: 'Peekly utilise chrome.storage.local uniquement pour le fonctionnement local de l\'interface :',
        bullets: [
          { label: 'Configuration utilisateur', text: 'Mémorisation de la langue et des options sélectionnées.' },
          { label: 'Cache temporaire', text: 'Mise en cache temporaire pour limiter les requêtes API répétées.' },
        ],
        storageNote: 'Toutes les données restent strictement sur votre machine locale.',
      },
      s5: {
        title: 'Justification des autorisations',
        intro: 'Peekly ne demande que les autorisations indispensables à son fonctionnement :',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Requis pour injecter l\'interface d\'analyse dans les salles de match FACEIT.' },
          { name: 'storage & unlimitedStorage', desc: 'Requis pour enregistrer les préférences locales sans interruption de quota.' },
          { name: 'downloads', desc: 'Utilisé uniquement pour le téléchargement direct du replay officiel CS2.' },
        ],
      },
      s6: {
        title: 'Droits utilisateur & Suppression',
        intro: 'Les données étant stockées uniquement sur votre appareil, vous en avez le contrôle total :',
        bullets: [
          { label: 'Suppression complète', text: 'La désinstallation de l\'extension efface immédiatement toutes les données locales.' },
          { label: 'Contrôle des modules', text: 'Chaque fonction peut être activée ou désactivée à tout moment.' },
        ],
      },
      s7: {
        title: 'Contact',
        intro: 'Pour toute question relative à cette politique de confidentialité, contactez-nous :',
        projectLabel: 'Projet :',
        supportEmailLabel: 'Email de support :',
        websiteLabel: 'Documentation & Site :',
      },
      s8: {
        title: 'Modifications de la politique',
        text: 'Toute mise à jour sera publiée sur cette page avec une date d\'effet actualisée.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Tous droits réservés.',
      legal: 'Avertissement : Peekly est un projet logiciel indépendant, non affilié à FACEIT Ltd ou Valve Corporation.',
    },
  },

  es: {
    pageTitle: 'Política de privacidad',
    subtitle: 'Política oficial de privacidad, mandato de propósito único y arquitectura de cero telemetría para Peekly for FACEIT.',
    projectLabel: 'Proyecto:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Fecha de entrada en vigor:',
    effectiveDateValue: 'Octubre de 2026',
    sections: {
      s1: {
        title: 'Introducción y propósito único',
        p1: 'Esta Política de Privacidad rige la extensión de navegador Peekly for FACEIT ("Peekly", "la Extensión", "nosotros"), diseñada para jugadores competitivos de FACEIT (faceit.com).',
        p2: 'Conforme a las políticas de Google Chrome Web Store, Peekly opera bajo un mandato estricto de propósito único: computar y mostrar estadísticas de rendimiento directamente en las salas de FACEIT.',
      },
      s2: {
        title: 'Recopilación y uso de datos',
        intro: 'Peekly está diseñado bajo el principio de privacidad por diseño. No recopilamos, almacenamos, vendemos ni transferimos ninguna información de identificación personal (PII).',
        subIntro: 'Específicamente:',
        bullets: [
          { label: 'Sin identificadores personales', text: 'No recopilamos su nombre, correo, dirección, teléfono ni dirección IP.' },
          { label: 'Sin credenciales de cuenta', text: 'Nunca accedemos ni guardamos contraseñas de FACEIT o Steam.' },
          { label: 'Sin acceso a chats', text: 'No leemos ni registramos mensajes privados ni listas de amigos.' },
          { label: 'Sin historial de navegación', text: 'No monitoreamos la actividad fuera de faceit.com.' },
          { label: 'Sin rastreadores de terceros', text: 'Cero telemetría, sin píxeles de seguimiento ni analíticas externas.' },
        ],
      },
      s3: {
        title: 'Arquitectura de procesamiento de datos',
        intro: 'Todo el procesamiento se realiza exclusivamente en el lado del cliente (client-side):',
        bullets: [
          { label: 'Consultas directas a la API oficial', text: 'Las estadísticas se obtienen directamente de los endpoints públicos de FACEIT.' },
          { label: 'Sin servidores intermediarios', text: 'Peekly opera sin servidores proxy ni bases de datos en la nube.' },
        ],
        tableHeaders: {
          category: 'Categoría de datos',
          status: 'Estado de recopilación',
          method: 'Método de procesamiento',
        },
        tableRows: [
          { category: 'Identidad personal y contacto', status: 'No recopilado', statusType: 'not_collected', processing: 'Nunca accedido ni transmitido' },
          { category: 'Contraseñas y cookies de sesión', status: 'No recopilado', statusType: 'not_collected', processing: 'Nunca accedido ni almacenado' },
          { category: 'Estadísticas de partida (K/D, ADR, ELO)', status: 'Efímero / No recopilado', statusType: 'ephemeral', processing: 'Descargado directamente a la memoria del navegador' },
          { category: 'Preferencias de usuario (Idioma, Ajustes)', status: 'Almacenado solo localmente', statusType: 'stored_locally', processing: 'Guardado en el dispositivo vía chrome.storage.local' },
        ],
      },
      s4: {
        title: 'Almacenamiento local (chrome.storage.local)',
        intro: 'Peekly utiliza chrome.storage.local exclusivamente para funcionalidades locales:',
        bullets: [
          { label: 'Configuración del usuario', text: 'Guarda idioma seleccionado y módulos activos.' },
          { label: 'Caché temporal de partidas', text: 'Almacenamiento en caché con expiración automática (TTL).' },
        ],
        storageNote: 'Toda la información se mantiene estrictamente en el dispositivo local del usuario.',
      },
      s5: {
        title: 'Justificación de permisos',
        intro: 'Peekly solo solicita los permisos imprescindibles para su funcionamiento:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Necesario para inyectar la interfaz de análisis en las salas de FACEIT.' },
          { name: 'storage & unlimitedStorage', desc: 'Necesario para guardar preferencias localmente sin límites de cuota.' },
          { name: 'downloads', desc: 'Utilizado únicamente para descargar demos oficiales de partidas de CS2.' },
        ],
      },
      s6: {
        title: 'Derechos del usuario y eliminación',
        intro: 'Dado que los datos son solo locales, usted tiene el control total:',
        bullets: [
          { label: 'Eliminación completa', text: 'Al desinstalar la extensión se eliminan de inmediato todos los datos guardados.' },
          { label: 'Control de módulos', text: 'Puede deshabilitar cualquier función en cualquier momento.' },
        ],
      },
      s7: {
        title: 'Información de contacto',
        intro: 'Para consultas o dudas sobre esta política de privacidad, contáctenos:',
        projectLabel: 'Proyecto:',
        supportEmailLabel: 'Correo de soporte:',
        websiteLabel: 'Documentación y sitio web:',
      },
      s8: {
        title: 'Cambios en la política de privacidad',
        text: 'Cualquier modificación será publicada en esta página con la fecha revisada.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Todos los derechos reservados.',
      legal: 'Aviso legal: Peekly es un proyecto independiente no afiliado con FACEIT Ltd ni Valve Corporation.',
    },
  },

  pl: {
    pageTitle: 'Polityka prywatności',
    subtitle: 'Oficjalna polityka prywatności, deklaracja pojedynczego celu oraz architektura zerowej telemetrii w Peekly for FACEIT.',
    projectLabel: 'Projekt:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Data wejścia w życie:',
    effectiveDateValue: 'Październik 2026',
    sections: {
      s1: {
        title: 'Wprowadzenie i pojedynczy cel',
        p1: 'Niniejsza Polityka prywatności reguluje działanie rozszerzenia Peekly for FACEIT ("Peekly", "Rozszerzenie", "my"), stworzonego dla graczy platformy FACEIT (faceit.com).',
        p2: 'Zgodnie z zasadami Chrome Web Store, Peekly realizuje ściśle określony pojedynczy cel: analizę i prezentację statystyk meczowych bezpośrednio w pokojach meczowych FACEIT.',
      },
      s2: {
        title: 'Gromadzenie i wykorzystywanie danych',
        intro: 'Peekly opiera się na zasadzie prywatności w fazie projektowania (privacy-by-design). Rozszerzenie nie gromadzi, nie przechowuje, nie sprzedaje ani nie przekazuje danych osobowych (PII).',
        subIntro: 'W szczególności:',
        bullets: [
          { label: 'Brak danych osobowych', text: 'Nie zbieramy nazwisk, adresów e-mail, telefonów ani adresów IP.' },
          { label: 'Brak danych logowania', text: 'Nigdy nie mamy dostępu do haseł FACEIT ani tokenów Steam.' },
          { label: 'Brak dostępu do wiadomości', text: 'Prywatne czaty i listy znajomych pozostają niedostępne.' },
          { label: 'Brak historii przeglądania', text: 'Aktywność poza domeną faceit.com nie jest monitorowana.' },
          { label: 'Brak zewnętrznych trackerów', text: 'Zero skryptów telemetrycznych i analitycznych stron trzecich.' },
        ],
      },
      s3: {
        title: 'Architektura przetwarzania danych',
        intro: 'Wszystkie operacje wykonywane są w 100% po stronie klienta (client-side) w przeglądarce:',
        bullets: [
          { label: 'Bezpośrednie zapytania do oficjalnego API', text: 'Statystyki pobierane są wprost z publicznych serwerów FACEIT API.' },
          { label: 'Brak serwerów pośredniczących', text: 'Peekly nie korzysta z własnych serwerów proxy ani baz danych w chmurze.' },
        ],
        tableHeaders: {
          category: 'Kategoria danych',
          status: 'Status gromadzenia',
          method: 'Metoda przetwarzania',
        },
        tableRows: [
          { category: 'Tożsamość i dane kontaktowe', status: 'Nie gromadzone', statusType: 'not_collected', processing: 'Nigdy nie odczytywane ani nie wysyłane' },
          { category: 'Hasła i pliki cookie uwierzytelniania', status: 'Nie gromadzone', statusType: 'not_collected', processing: 'Nigdy nie zapisywane' },
          { category: 'Statystyki meczu (K/D, ADR, ELO)', status: 'Tymczasowe / Nie gromadzone', statusType: 'ephemeral', processing: 'Pobierane do pamięci podręcznej przeglądarki' },
          { category: 'Preferencje użytkownika (Język, Moduły)', status: 'Zapisywane tylko lokalnie', statusType: 'stored_locally', processing: 'Zapisywane w chrome.storage.local' },
        ],
      },
      s4: {
        title: 'Pamięć lokalna (chrome.storage.local)',
        intro: 'Peekly wykorzystuje API chrome.storage.local wyłącznie do obsługi ustawień lokalnych:',
        bullets: [
          { label: 'Konfiguracja użytkownika', text: 'Zapisywanie wybranego języka i przełączników funkcji.' },
          { label: 'Pamięć podręczna meczów', text: 'Krótkotrwały cache z automatycznym wygasaniem (TTL).' },
        ],
        storageNote: 'Wszystkie dane pozostają wyłącznie na urządzeniu użytkownika.',
      },
      s5: {
        title: 'Uzasadnienie uprawnień',
        intro: 'Rozszerzenie wymaga wyłącznie uprawnień koniecznych do działania deklarowanych funkcji:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Wymagane do wyświetlania interfejsu statystyk na platformie FACEIT.' },
          { name: 'storage & unlimitedStorage', desc: 'Wymagane do lokalnego zapisywania ustawień.' },
          { name: 'downloads', desc: 'Używane wyłącznie do bezpośredniego pobierania plików demo meczów CS2.' },
        ],
      },
      s6: {
        title: 'Prawa użytkownika i usuwanie danych',
        intro: 'Ponieważ dane przechowywane są lokalnie, zachowujesz nad nimi pełną kontrolę:',
        bullets: [
          { label: 'Całkowite usunięcie', text: 'Usunięcie rozszerzenia natychmiast usuwa wszystkie zapisane preferencje.' },
          { label: 'Kontrola modułów', text: 'Każdą funkcję można wyłączyć w menu podręcznym.' },
        ],
      },
      s7: {
        title: 'Informacje kontaktowe',
        intro: 'W przypadku pytań dotyczących niniejszej polityki prosimy o kontakt:',
        projectLabel: 'Projekt:',
        supportEmailLabel: 'E-mail wsparcia:',
        websiteLabel: 'Dokumentacja i strona:',
      },
      s8: {
        title: 'Zmiany w polityce prywatności',
        text: 'Wszelkie aktualizacje będą publikowane na tej stronie z podaniem nowej daty wejścia w życie.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Wszelkie prawa zastrzeżone.',
      legal: 'Zastrzeżenie prawne: Peekly jest niezależnym oprogramowaniem i nie jest powiązane z firmami FACEIT Ltd ani Valve Corporation.',
    },
  },

  pt: {
    pageTitle: 'Política de Privacidade',
    subtitle: 'Política oficial de privacidade, mandato de propósito único e arquitetura sem telemetria do Peekly for FACEIT.',
    projectLabel: 'Projeto:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Data de vigência:',
    effectiveDateValue: 'Outubro de 2026',
    sections: {
      s1: {
        title: 'Introdução e Propósito Único',
        p1: 'Esta Política de Privacidade rege a extensão de navegador Peekly for FACEIT ("Peekly", "a Extensão", "nós"), desenvolvida para jogadores de FACEIT (faceit.com).',
        p2: 'Em conformidade com as diretrizes da Chrome Web Store, o Peekly opera sob um propósito único estrito: calcular e exibir inteligência de partidas diretamente nas salas da FACEIT.',
      },
      s2: {
        title: 'Coleta e Uso de Dados',
        intro: 'O Peekly foi construído sob rigorosos padrões de privacidade. Não coletamos, armazenamos, comercializamos nem transferimos informações de identificação pessoal (PII).',
        subIntro: 'Especificamente:',
        bullets: [
          { label: 'Sem identificadores pessoais', text: 'Não coletamos nome, e-mail, telefone nem endereço IP.' },
          { label: 'Sem credenciais de conta', text: 'Senhas da FACEIT ou chaves Steam nunca são acessadas.' },
          { label: 'Sem acesso a mensagens', text: 'Conversas privadas e listas de amigos permanecem inacessíveis.' },
          { label: 'Sem histórico de navegação', text: 'Nenhuma atividade fora do faceit.com é rastreada.' },
          { label: 'Sem rastreadores externos', text: 'Zero telemetria ou ferramentas analíticas de terceiros.' },
        ],
      },
      s3: {
        title: 'Arquitetura de Processamento de Dados',
        intro: 'Todo o processamento é executado estritamente no cliente (client-side) no navegador:',
        bullets: [
          { label: 'Consultas diretas à API oficial', text: 'As estatísticas são solicitadas diretamente aos endpoints públicos da FACEIT.' },
          { label: 'Sem servidores intermediários', text: 'O Peekly opera sem servidores proxy ou nuvem própria.' },
        ],
        tableHeaders: {
          category: 'Categoria de Dados',
          status: 'Status de Coleta',
          method: 'Método de Processamento',
        },
        tableRows: [
          { category: 'Identidade Pessoal e Contato', status: 'Não coletado', statusType: 'not_collected', processing: 'Nunca acessado ou transmitido' },
          { category: 'Senhas e Cookies de Sessão', status: 'Não coletado', statusType: 'not_collected', processing: 'Nunca lido ou armazenado' },
          { category: 'Estatísticas de Partida (K/D, ELO)', status: 'Efêmero / Não coletado', statusType: 'ephemeral', processing: 'Carregado diretamente na memória do navegador' },
          { category: 'Preferências do Usuário (Idioma, Módulos)', status: 'Apenas local', statusType: 'stored_locally', processing: 'Salvo no dispositivo via chrome.storage.local' },
        ],
      },
      s4: {
        title: 'Armazenamento Local (chrome.storage.local)',
        intro: 'O Peekly utiliza chrome.storage.local exclusivamente para funcionalidades locais:',
        bullets: [
          { label: 'Configuração do usuário', text: 'Armazena idioma e módulos ativados.' },
          { label: 'Cache temporário de partidas', text: 'Cache com expiração automática (TTL).' },
        ],
        storageNote: 'Todas as informações permanecem estritamente na máquina local do usuário.',
      },
      s5: {
        title: 'Justificativa de Permissões',
        intro: 'O Peekly solicita apenas as permissões estritamente necessárias para suas funções:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Necessário para injetar o painel analítico na FACEIT.' },
          { name: 'storage & unlimitedStorage', desc: 'Necessário para salvar configurações locais sem interrupções de cota.' },
          { name: 'downloads', desc: 'Usado unicamente para download direto de gravações demo do CS2.' },
        ],
      },
      s6: {
        title: 'Direitos do Usuário e Exclusão',
        intro: 'Como todos os dados ficam apenas no seu computador, você mantém controle total:',
        bullets: [
          { label: 'Exclusão completa', text: 'A remoção da extensão apaga imediatamente todos os dados salvos.' },
          { label: 'Controle de recursos', text: 'Qualquer recurso pode ser desativado no menu da extensão.' },
        ],
      },
      s7: {
        title: 'Informações de Contato',
        intro: 'Para dúvidas sobre esta Política de Privacidade, entre em contato:',
        projectLabel: 'Projeto:',
        supportEmailLabel: 'E-mail de suporte:',
        websiteLabel: 'Documentação e site:',
      },
      s8: {
        title: 'Alterações nesta Política de Privacidade',
        text: 'Quaisquer alterações serão publicadas nesta página com a data revisada.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Todos os direitos reservados.',
      legal: 'Aviso legal: O Peekly é um software independente e não possui vínculo com a FACEIT Ltd ou Valve Corporation.',
    },
  },

  da: {
    pageTitle: 'Privatlivspolitik',
    subtitle: 'Officiel privatlivspolitik, enkeltformålsdeklaration og nul-telemetriarkitektur for Peekly for FACEIT.',
    projectLabel: 'Projekt:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Ikrafttrædelsesdato:',
    effectiveDateValue: 'Oktober 2026',
    sections: {
      s1: {
        title: 'Introduktion og enkelt formål',
        p1: 'Denne privatlivspolitik gælder for browserudvidelsen Peekly for FACEIT ("Peekly", "vi"), udviklet til spillere på FACEIT (faceit.com).',
        p2: 'I overensstemmelse med Chrome Web Store-reglerne har Peekly ét enkelt formål: at vise gennemsigtig kampstatistik direkte i FACEIT-lobbies.',
      },
      s2: {
        title: 'Dataindsamling og anvendelse',
        intro: 'Peekly er bygget på principper om databeskyttelse gennem design. Vi indsamler, gemmer eller deler ingen personoplysninger (PII).',
        subIntro: 'Specifikt:',
        bullets: [
          { label: 'Ingen personlige identifikatorer', text: 'Vi indsamler hverken navn, e-mail, telefon eller IP-adresse.' },
          { label: 'Ingen kontooplysninger', text: 'Adgangskoder og Steam-tokens tilgås aldrig.' },
          { label: 'Ingen chatovervågning', text: 'Private samtaler og vennelister berøres ikke.' },
          { label: 'Ingen browserhistorik', text: 'Aktivitet uden for faceit.com registreres aldrig.' },
          { label: 'Ingen tredjepartstrackere', text: 'Nul telemetri og ingen eksterne analysescripts.' },
        ],
      },
      s3: {
        title: 'Databehandlingsarkitektur',
        intro: 'Al behandling foregår udelukkende på klientsiden i din browser:',
        bullets: [
          { label: 'Direkte officielle API-kald', text: 'Statistik hentes direkte fra officielle FACEIT API-endpoints.' },
          { label: 'Ingen mellemliggende servere', text: 'Peekly benytter ingen egne proxyservere eller skydatabaser.' },
        ],
        tableHeaders: {
          category: 'Datakategori',
          status: 'Indsamlingsstatus',
          method: 'Behandlingsmetode',
        },
        tableRows: [
          { category: 'Personlig identitet & kontakt', status: 'Ikke indsamlet', statusType: 'not_collected', processing: 'Aldrig tilgået eller sendt' },
          { category: 'Adgangskoder & sessionscookies', status: 'Ikke indsamlet', statusType: 'not_collected', processing: 'Aldrig udlæst eller gemt' },
          { category: 'Kampstatistik (K/D, ELO)', status: 'Flygtig / Ikke indsamlet', statusType: 'ephemeral', processing: 'Hentes direkte ind i browserens arbejdshukommelse' },
          { category: 'Brugerpræferencer (Sprog, moduler)', status: 'Kun gemt lokalt', statusType: 'stored_locally', processing: 'Gemt på enheden via chrome.storage.local' },
        ],
      },
      s4: {
        title: 'Lokal lagring (chrome.storage.local)',
        intro: 'Peekly anvender chrome.storage.local udelukkende til lokale brugerindstillinger:',
        bullets: [
          { label: 'Brugerkonfiguration', text: 'Gemmer sprogvalg og aktive funktioner.' },
          { label: 'Midlertidig matchcache', text: 'Cache med automatisk udløb (TTL).' },
        ],
        storageNote: 'Alle oplysninger forbliver udelukkende på brugerens lokale enhed.',
      },
      s5: {
        title: 'Begrundelse for tilladelser',
        intro: 'Peekly anmoder kun om tilladelser, der er strengt nødvendige:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Påkrævet for at vise statistik i FACEIT-lobbies.' },
          { name: 'storage & unlimitedStorage', desc: 'Påkrævet for at gemme indstillinger lokalt.' },
          { name: 'downloads', desc: 'Bruges udelukkende ved download af officielle CS2-kampoptagelser.' },
        ],
      },
      s6: {
        title: 'Brugerrettigheder og datasletning',
        intro: 'Da alle data kun gemmes lokalt, har du fuld kontrol:',
        bullets: [
          { label: 'Fuld sletning', text: 'Afinstallation af udvidelsen sletter straks alle lokale data.' },
          { label: 'Modulkontrol', text: 'Du kan til enhver tid slå enkelte funktioner fra.' },
        ],
      },
      s7: {
        title: 'Kontaktoplysninger',
        intro: 'Kontakt os ved spørgsmål til denne privatlivspolitik:',
        projectLabel: 'Projekt:',
        supportEmailLabel: 'Support-e-mail:',
        websiteLabel: 'Hjemmeside og dokumentation:',
      },
      s8: {
        title: 'Ændringer i privatlivspolitikken',
        text: 'Eventuelle opdateringer vil blive offentliggjort på denne side.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Alle rettigheder forbeholdes.',
      legal: 'Ansvarsfraskrivelse: Peekly er et uafhængigt softwareprojekt og er ikke tilknyttet FACEIT Ltd eller Valve Corporation.',
    },
  },

  fi: {
    pageTitle: 'Tietosuojakäytäntö',
    subtitle: 'Peekly for FACEIT -selainlaajennuksen virallinen tietosuojakäytäntö ja nollatelemetria-arkkitehtuuri.',
    projectLabel: 'Projekti:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Voimaantulopäivä:',
    effectiveDateValue: 'Lokakuu 2026',
    sections: {
      s1: {
        title: 'Johdanto ja yksittäinen tarkoitus',
        p1: 'Tämä tietosuojakäytäntö koskee Peekly for FACEIT -laajennusta ("Peekly", "me"), joka on kehitetty FACEIT-pelaajille (faceit.com).',
        p2: 'Chrome Web Storen sääntöjen mukaisesti Peeklyllä on yksi selkeä tarkoitus: tilastojen ja pelianalyysin näyttäminen FACEIT-otteluhuoneissa.',
      },
      s2: {
        title: 'Tietojen kerääminen ja käyttö',
        intro: 'Peekly noudattaa sisäänrakennetun tietosuojan periaatteita. Emme kerää, tallenna tai luovuta henkilötietoja (PII).',
        subIntro: 'Erityisesti:',
        bullets: [
          { label: 'Ei henkilötunnisteita', text: 'Emme kerää nimeä, sähköpostia, puhelinnumeroa tai IP-osoitetta.' },
          { label: 'Ei kirjautumistietoja', text: 'Salasanoihin tai Steam-tunnisteisiin ei koskaan kosketa.' },
          { label: 'Ei viestien lukemista', text: 'Yksityisviestejä tai kaverilistoja ei seurata.' },
          { label: 'Ei selaushistoriaa', text: 'Toimintaa faceit.comin ulkopuolella ei seurata.' },
          { label: 'Ei ulkopuolisia seurantalaitteita', text: 'Ei telemetriaa, seurantapikseleitä tai mainosseurantaa.' },
        ],
      },
      s3: {
        title: 'Tietojenkäsittelyn arkkitehtuuri',
        intro: 'Kaikki tietojenkäsittely tapahtuu täysin asiakaskohtaisesti (client-side) selaimessasi:',
        bullets: [
          { label: 'Suorat viralliset API-kutsut', text: 'Tilastot noudetaan suoraan FACEITin julkisista rajapinnoista.' },
          { label: 'Ei välipalvelimia', text: 'Peekly ei käytä omia välityspalvelimia tai pilvitietokantoja.' },
        ],
        tableHeaders: {
          category: 'Tietoryhmä',
          status: 'Keräystila',
          method: 'Käsittelytapa',
        },
        tableRows: [
          { category: 'Henkilöllisyys & Yhteystiedot', status: 'Ei kerätä', statusType: 'not_collected', processing: 'Ei koskaan lueta tai lähetetä' },
          { category: 'Salasanat & Istuntoevästeet', status: 'Ei kerätä', statusType: 'not_collected', processing: 'Ei koskaan lueta tai tallenneta' },
          { category: 'Ottelutilastot (K/D, ELO)', status: 'Väliaikainen / Ei kerätä', statusType: 'ephemeral', processing: 'Noudetaan suoraan selaimen välimuistiin' },
          { category: 'Käyttäjäasetukset (Kieli, Moduulit)', status: 'Vain paikallisesti tallennettu', statusType: 'stored_locally', processing: 'Tallennetaan laitteelle chrome.storage.localin kautta' },
        ],
      },
      s4: {
        title: 'Paikallinen tallennustila (chrome.storage.local)',
        intro: 'Peekly käyttää chrome.storage.local-rajapintaa vain paikallisiin asetuksiin:',
        bullets: [
          { label: 'Käyttäjän asetukset', text: 'Tallentaa kielen ja moduulien tilat.' },
          { label: 'Väliaikainen välimuisti', text: 'Automaattisesti vanheneva välimuisti turhien kutsujen estämiseksi.' },
        ],
        storageNote: 'Kaikki tiedot pysyvät ainoastaan käyttäjän omalla laitteella.',
      },
      s5: {
        title: 'Käyttöoikeuksien perustelut',
        intro: 'Peekly pyytää vain ehdottoman välttämättömät luvat:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Tarvitaan tilastopaneelien lisäämiseen FACEIT-huoneisiin.' },
          { name: 'storage & unlimitedStorage', desc: 'Tarvitaan asetusten paikalliseen tallentamiseen.' },
          { name: 'downloads', desc: 'Käytetään vain CS2-otteludemojen lataamiseen käyttäjän pyynnöstä.' },
        ],
      },
      s6: {
        title: 'Käyttäjän oikeudet ja tietojen poistaminen',
        intro: 'Koska tiedot ovat vain laitteellasi, sinulla on täysi hallinta:',
        bullets: [
          { label: 'Täydellinen poisto', text: 'Laajennuksen poistaminen pyyhkii välittömästi kaikki paikalliset tiedot.' },
          { label: 'Moduulien hallinta', text: 'Voit poistaa minkä tahansa toiminnon käytöstä milloin vain.' },
        ],
      },
      s7: {
        title: 'Yhteystiedot',
        intro: 'Jos sinulla on kysyttävää tietosuojakäytännöstä, ota yhteyttä:',
        projectLabel: 'Projekti:',
        supportEmailLabel: 'Tukisähköposti:',
        websiteLabel: 'Verkkosivusto & dokumentaatio:',
      },
      s8: {
        title: 'Muutokset tietosuojakäytäntöön',
        text: 'Kaikki päivitykset julkaistaan tällä sivulla muutosajankohdan kera.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Kaikki oikeudet pidätetään.',
      legal: 'Vastuuvapauslauseke: Peekly on itsenäinen projekti eikä se liity FACEIT Ltd:hen tai Valve Corporationiin.',
    },
  },

  sv: {
    pageTitle: 'Integritetspolicy',
    subtitle: 'Officiell integritetspolicy, deklaration om enskilt syfte och noll-telemetriarkitektur för Peekly for FACEIT.',
    projectLabel: 'Projekt:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Giltighetsdatum:',
    effectiveDateValue: 'Oktober 2026',
    sections: {
      s1: {
        title: 'Introduktion och enskilt syfte',
        p1: 'Denna integritetspolicy reglerar webbläsartillägget Peekly for FACEIT ("Peekly", "vi"), skapat för spelare på FACEIT (faceit.com).',
        p2: 'I enlighet med reglerna för Chrome Web Store har Peekly ett strikt enskilt syfte: att visa transparent matchstatistik i FACEIT-lobbyn.',
      },
      s2: {
        title: 'Datainsamling och användning',
        intro: 'Peekly bygger på principer om inbyggt integritetsskydd. Vi samlar inte in, sparar inte eller överför personuppgifter (PII).',
        subIntro: 'Specifikt:',
        bullets: [
          { label: 'Inga personliga identifierare', text: 'Varken namn, e-post, telefonnummer eller IP-adress samlas in.' },
          { label: 'Inga kontouppgifter', text: 'Lösenord eller Steam-inloggningar berörs aldrig.' },
          { label: 'Ingen tillgång till chatt', text: 'Privata meddelanden och vänlistor läses inte.' },
          { label: 'Ingen webbhistorik', text: 'Aktiviteter utanför faceit.com övervakas aldrig.' },
          { label: 'Inga tredjepartsspårare', text: 'Noll telemetri och inga externa analysskript.' },
        ],
      },
      s3: {
        title: 'Arkitektur för databehandling',
        intro: 'All databehandling sker uteslutande på klientsidan (client-side) i din webbläsare:',
        bullets: [
          { label: 'Direkta officiella API-anrop', text: 'Statistik hämtas direkt från officiella FACEIT API:er.' },
          { label: 'Inga mellanliggande servrar', text: 'Peekly använder inga proxyservrar eller egna molndatabaser.' },
        ],
        tableHeaders: {
          category: 'Datakategori',
          status: 'Insamlingsstatus',
          method: 'Behandlingsmetod',
        },
        tableRows: [
          { category: 'Personlig identitet & kontakt', status: 'Samlas inte in', statusType: 'not_collected', processing: 'Läses eller skickas aldrig' },
          { category: 'Lösenord & sessionscookies', status: 'Samlas inte in', statusType: 'not_collected', processing: 'Läses eller sparas aldrig' },
          { category: 'Matchstatistik (K/D, ELO)', status: 'Flyktig / Samlas inte in', statusType: 'ephemeral', processing: 'Läses direkt in i webbläsarens arbetsminne' },
          { category: 'Användarinställningar (Språk, moduler)', status: 'Endast lokalt sparade', statusType: 'stored_locally', processing: 'Sparas på enheten via chrome.storage.local' },
        ],
      },
      s4: {
        title: 'Lokal lagring (chrome.storage.local)',
        intro: 'Peekly använder chrome.storage.local endast för lokala gränssnittsfunktioner:',
        bullets: [
          { label: 'Användarkonfiguration', text: 'Sparar språkval och aktiva moduler.' },
          { label: 'Tillfällig matchcache', text: 'Cache med automatisk utgångstid (TTL).' },
        ],
        storageNote: 'All information stannar uteslutande på användarens lokala enhet.',
      },
      s5: {
        title: 'Motivering av behörigheter',
        intro: 'Peekly begär endast de behörigheter som är absolut nödvändiga:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'Krävs för att visa statistik i FACEIT-rum.' },
          { name: 'storage & unlimitedStorage', desc: 'Krävs för att spara inställningar lokalt.' },
          { name: 'downloads', desc: 'Används enbart för att ladda ner officiella CS2-matchdemos.' },
        ],
      },
      s6: {
        title: 'Användarrättigheter och radering',
        intro: 'Eftersom all data endast lagras lokalt har du fullständig kontroll:',
        bullets: [
          { label: 'Fullständig radering', text: 'Avinstallation av tillägget raderar omedelbart all lokal data.' },
          { label: 'Modulstyrning', text: 'Du kan när som helst stänga av enskilda funktioner.' },
        ],
      },
      s7: {
        title: 'Kontaktinformation',
        intro: 'Om du har frågor om denna integritetspolicy, kontakta oss:',
        projectLabel: 'Projekt:',
        supportEmailLabel: 'Support-e-post:',
        websiteLabel: 'Webbplats och dokumentation:',
      },
      s8: {
        title: 'Ändringar i integritetspolicyn',
        text: 'Uppdateringar publiceras på denna sida med reviderat datum.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Alla rättigheter förbehållna.',
      legal: 'Friskrivning: Peekly är ett oberoende mjukvaruprojekt och är inte anslutet till FACEIT Ltd eller Valve Corporation.',
    },
  },

  tr: {
    pageTitle: 'Gizlilik Politikası',
    subtitle: 'Peekly for FACEIT resmi gizlilik politikası, tek amaç bildirimi ve sıfır telemetri mimarisi.',
    projectLabel: 'Proje:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'Yürürlük Tarihi:',
    effectiveDateValue: 'Ekim 2026',
    sections: {
      s1: {
        title: 'Giriş ve Tek Amaç Bildirimi',
        p1: 'Bu Gizlilik Politikası, FACEIT (faceit.com) platformundaki rekabetçi CS2 oyuncuları için geliştirilen Peekly for FACEIT ("Peekly", "biz") tarayıcı uzantısını kapsar.',
        p2: 'Chrome Web Mağazası Geliştirici Politikaları doğrultusunda Peekly, yalnızca tek bir amaca hizmet eder: maç odalarında şeffaf maç istatistiklerini hesaplamak ve sunmak.',
      },
      s2: {
        title: 'Veri Toplama ve Kullanımı',
        intro: 'Peekly, tasarım gereği gizlilik (privacy-by-design) ilkeleriyle geliştirilmiştir. Kişisel olarak tanımlanabilir hiçbir bilgiyi (PII) toplamıyor, satmıyor veya aktarmıyoruz.',
        subIntro: 'Özellikle:',
        bullets: [
          { label: 'Kişisel Tanımlayıcı Yok', text: 'Gerçek adınız, e-postanız, telefonunuz veya IP adresiniz toplanmaz.' },
          { label: 'Hesap Bilgileri Yok', text: 'FACEIT parolaları veya Steam kimlik bilgileri asla işlenmez.' },
          { label: 'Özel Mesaj Erişimi Yok', text: 'Sohbetler ve arkadaş listeleri asla taranmaz.' },
          { label: 'Tarayıcı Geçmişi Yok', text: 'faceit.com dışındaki hiçbir etkinlik izlenmez.' },
          { label: 'Üçüncü Taraf Takipçisi Yok', text: 'Sıfır telemetri, izleme pikseli veya harici analiz aracı.' },
        ],
      },
      s3: {
        title: 'Veri İşleme Mimarisi',
        intro: 'Tüm veri işleme işlemleri tamamen istemci tarafında (client-side) tarayıcınızda gerçekleşir:',
        bullets: [
          { label: 'Doğrudan Resmi API İstekleri', text: 'İstatistikler doğrudan resmi kamuya açık FACEIT API uç noktalarından çekilir.' },
          { label: 'Ara Sunucu Yok', text: 'Peekly özel proxy sunucuları veya bulut veritabanları kullanmaz.' },
        ],
        tableHeaders: {
          category: 'Veri Kategorisi',
          status: 'Toplama Durumu',
          method: 'İşleme Yöntemi',
        },
        tableRows: [
          { category: 'Kişisel Kimlik ve İletişim', status: 'Toplanmaz', statusType: 'not_collected', processing: 'Asla erişilmez veya aktarılmaz' },
          { category: 'Parolalar ve Çerezler', status: 'Toplanmaz', statusType: 'not_collected', processing: 'Asla okunmaz veya kaydedilmez' },
          { category: 'Maç İstatistikleri (K/D, ELO)', status: 'Geçici / Toplanmaz', statusType: 'ephemeral', processing: 'Doğrudan FACEIT API\'den tarayıcı belleğine yüklenir' },
          { category: 'Kullanıcı Tercihleri (Dil, Modüller)', status: 'Yalnızca Yerel Kaydedilir', statusType: 'stored_locally', processing: 'chrome.storage.local ile cihazda saklanır' },
        ],
      },
      s4: {
        title: 'Yerel Depolama (chrome.storage.local)',
        intro: 'Peekly, chrome.storage.local API\'sini yalnızca istemci tarafı yapılandırması için kullanır:',
        bullets: [
          { label: 'Kullanıcı Ayarları', text: 'Seçilen dil ve aktif modül tercihlerini hatırlar.' },
          { label: 'Geçici Önbellek', text: 'Tekrarlayan API sorgularını önlemek için TTL süreli önbellek.' },
        ],
        storageNote: 'Tüm veriler yalnızca kullanıcının yerel cihazında kalır, asla senkronize edilmez.',
      },
      s5: {
        title: 'İzinlerin Gerekçesi',
        intro: 'Peekly yalnızca bildirilen işlevler için kesinlikle gerekli olan izinleri ister:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'İstatistik arayüzünü FACEIT maç odalarına eklemek için gereklidir.' },
          { name: 'storage & unlimitedStorage', desc: 'Kullanıcı ayarlarını yerel olarak kesintisiz kaydetmek için gereklidir.' },
          { name: 'downloads', desc: 'Yalnızca maç demolarını doğrudan indirmek için kullanılır.' },
        ],
      },
      s6: {
        title: 'Kullanıcı Hakları ve Veri Silme',
        intro: 'Veriler yalnızca yerel olarak depolandığından, tam kontrole sahipsiniz:',
        bullets: [
          { label: 'Tam Silme', text: 'Uzantıyı kaldırdığınızda tüm yerel ayarlar anında silinir.' },
          { label: 'Modül Kontrolü', text: 'İstediğiniz modülü menüden dilediğiniz zaman kapatabilirsiniz.' },
        ],
      },
      s7: {
        title: 'İletişim Bilgileri',
        intro: 'Gizlilik Politikası hakkında sorularınız için bizimle iletişime geçebilirsiniz:',
        projectLabel: 'Proje:',
        supportEmailLabel: 'Destek E-postası:',
        websiteLabel: 'Web Sitesi ve Belgeler:',
      },
      s8: {
        title: 'Gizlilik Politikasında Değişiklikler',
        text: 'Yapılacak güncellemeler revize edilmiş yürürlük tarihiyle bu sayfada yayınlanacaktır.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. Tüm hakları saklıdır.',
      legal: 'Yasal Uyarı: Peekly bağımsız bir yazılım projesidir ve FACEIT Ltd veya Valve Corporation ile bir bağı yoktur.',
    },
  },

  zh: {
    pageTitle: '隐私政策',
    subtitle: 'Peekly for FACEIT 官方隐私政策、单一用途声明与零遥测数据保护架构。',
    projectLabel: '项目：',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: '生效日期：',
    effectiveDateValue: '2026年10月',
    sections: {
      s1: {
        title: '介绍与单一用途声明',
        p1: '本隐私政策适用于专为 FACEIT（faceit.com）CS2 竞技玩家打造的浏览器扩展 Peekly for FACEIT（以下简称“Peekly”或“我们”）。',
        p2: '严格遵循 Google Chrome 网上应用店开发者计划政策，Peekly 仅遵循单一用途原则：在授权的 FACEIT 比赛房间中即时计算并呈现透明的比赛表现数据。',
      },
      s2: {
        title: '数据收集与使用',
        intro: 'Peekly 严格遵循隐私保护设计（privacy-by-design）原则。我们明确声明：本扩展绝不收集、存储、出售或向任何第三方传输个人身份信息（PII）。',
        subIntro: '具体说明：',
        bullets: [
          { label: '无个人身份标识', text: '我们不收集您的姓名、电子邮箱、地址、电话号码或 IP 地址。' },
          { label: '无账户登录凭据', text: '绝不读取或保存您的 FACEIT 密码、Steam 认证令牌或支付信息。' },
          { label: '无私密通信访问', text: '扩展不会检查或记录任何聊天记录或好友列表。' },
          { label: '无浏览历史记录', text: '绝不监控 faceit.com 以外的任何网页浏览行为。' },
          { label: '零第三方追踪器', text: '代码中不包含任何遥测 SDK、追踪像素或广告分析代码。' },
        ],
      },
      s3: {
        title: '数据处理架构',
        intro: '所有数据处理均在您本地浏览器的会话中（client-side）完全在客户端本地完成：',
        bullets: [
          { label: '直接请求官方 API', text: '所有比赛数据直接从官方公共 FACEIT API 接口拉取到浏览器内存。' },
          { label: '无中间服务器', text: 'Peekly 不设私有代理服务器或云端数据库，数据不经由任何第三方流转。' },
        ],
        tableHeaders: {
          category: '数据类别',
          status: '收集状态',
          method: '处理方式',
        },
        tableRows: [
          { category: '个人身份与联系方式', status: '不收集', statusType: 'not_collected', processing: '从不访问或向外传输' },
          { category: '密码与认证 Cookies', status: '不收集', statusType: 'not_collected', processing: '从不读取或持久化存储' },
          { category: '比赛对局统计（K/D、ELO）', status: '仅临时驻留 / 不收集', statusType: 'ephemeral', processing: '直接从 FACEIT API 加载至浏览器运行时内存' },
          { category: '用户偏好（语言、功能开关）', status: '仅保存在本地', statusType: 'stored_locally', processing: '通过 chrome.storage.local 保存在用户本地设备' },
        ],
      },
      s4: {
        title: '本地存储（chrome.storage.local）',
        intro: 'Peekly 仅使用原生的 chrome.storage.local API 保障客户端功能：',
        bullets: [
          { label: '用户偏好配置', text: '记忆所选界面语言、功能模块开关与通知偏好。' },
          { label: '临时比赛缓存', text: '具有自动过期时间（TTL）的统计缓存，避免重复请求。' },
        ],
        storageNote: '所有配置仅留在用户本地设备，绝不会跨设备同步或泄露给外部网站。',
      },
      s5: {
        title: '权限使用说明',
        intro: '遵循 Chrome 商店最小权限原则，Peekly 仅申请核心功能所必需的权限：',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: '用于在 FACEIT 比赛房间和个人资料页中注入数据分析面板。' },
          { name: 'storage & unlimitedStorage', desc: '用于在本地存储用户偏好和缓存数据。' },
          { name: 'downloads', desc: '仅在用户点击“下载 Demo”按钮时直接从 FACEIT 服务器下载 CS2 官方比赛录像。' },
        ],
      },
      s6: {
        title: '用户权利与数据删除',
        intro: '所有数据完全属于您并在本地保存，您拥有全部掌控权：',
        bullets: [
          { label: '完全删除', text: '从浏览器卸载本扩展将立即且永久清除所有本地设置与缓存。' },
          { label: '功能管理', text: '您可以随时通过插件弹窗菜单单独启用或关闭任何模块。' },
        ],
      },
      s7: {
        title: '联系方式',
        intro: '如果您对本隐私政策或 Peekly 的数据处理有任何疑问，请联系我们：',
        projectLabel: '项目：',
        supportEmailLabel: '支持邮箱：',
        websiteLabel: '官方网站与文档：',
      },
      s8: {
        title: '隐私政策更新',
        text: '本隐私政策可能会适时更新以保持合规，任何更新均将在此页面公布并标明生效日期。',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. 保留所有权利。',
      legal: '法律声明：Peekly 为独立软件项目，与 FACEIT Ltd 或 Valve Corporation 没有任何关联或官方授权。Counter-Strike、CS2 和 FACEIT 均为各自所有者的注册商标。',
    },
  },

  ja: {
    pageTitle: 'プライバシーポリシー',
    subtitle: 'Peekly for FACEIT の公式プライバシーポリシー、単一目的の宣言、および完全クライアントサイド実行アーキテクチャ。',
    projectLabel: 'プロジェクト：',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: '発効日：',
    effectiveDateValue: '2026年10月',
    sections: {
      s1: {
        title: 'はじめに・単一目的の宣言',
        p1: '本プライバシーポリシーは、FACEIT（faceit.com）上のCS2プレイヤー向けに開発されたブラウザ拡張機能「Peekly for FACEIT」（以下「Peekly」「当方」）に適用されます。',
        p2: 'Google Chrome ウェブストアの規約に基づき、Peekly は単一目的（Single Purpose）に厳密に従います。それは、FACEIT の試合ルーム内で直接試合戦術データを計算・表示することです。',
      },
      s2: {
        title: 'データ収集と利用について',
        intro: 'Peekly はプライバシー・バイ・デザインの理念に基づき開発されています。個人を特定できる情報（PII）の収集、保存、販売、第三者への提供は一切行いません。',
        subIntro: '具体的には以下の通りです：',
        bullets: [
          { label: '個人識別情報の不収集', text: '氏名、メールアドレス、電話番号、IPアドレスは一切収集しません。' },
          { label: '認証情報の不保持', text: 'FACEIT のパスワードや Steam 認証情報にアクセスすることはありません。' },
          { label: 'チャットアクセスの遮断', text: '非公開チャットやフレンドリストを閲覧・記録することはありません。' },
          { label: '閲覧履歴の不追跡', text: 'faceit.com 以外のウェブサイトの利用状況を監視することはありません。' },
          { label: '外部トラッカーの完全排除', text: '分析SDK、広告トラッカー、テレメトリスクリプトは一切含まれていません。' },
        ],
      },
      s3: {
        title: 'データ処理アーキテクチャ',
        intro: 'すべてのデータ処理は、ブラウザ内のローカル環境（client-side）で完結します：',
        bullets: [
          { label: '公式 API への直接通信', text: '統計データはブラウザから直接 FACEIT 公式公開 API エンドポイントにリクエストされます。' },
          { label: '中継サーバーの不使用', text: 'プロキシサーバーや外部クラウドデータベースを経由することはありません。' },
        ],
        tableHeaders: {
          category: 'データ項目',
          status: '収集ステータス',
          method: '処理方法',
        },
        tableRows: [
          { category: '個人情報・連絡先', status: '未収集', statusType: 'not_collected', processing: 'アクセスおよび外部送信を一切行わない' },
          { category: 'パスワード・認証 Cookie', status: '未収集', statusType: 'not_collected', processing: '読み取りおよび保存を一切行わない' },
          { category: '試合データ（K/D、ELO 等）', status: '一時的 / 未収集', statusType: 'ephemeral', processing: 'FACEIT API からブラウザのメモリに直接読み込み' },
          { category: '設定（言語、機能の有効化）', status: '端末内のみ保存', statusType: 'stored_locally', processing: 'chrome.storage.local を通じて端末内に保存' },
        ],
      },
      s4: {
        title: 'ローカルストレージ（chrome.storage.local）',
        intro: 'Peekly はクライアント機能の維持のためにのみ chrome.storage.local を使用します：',
        bullets: [
          { label: 'ユーザー設定の保持', text: '選択した表示言語や各モジュールのオン/オフ状態を記憶します。' },
          { label: '統計データの一時キャッシュ', text: '過剰なリクエストを防ぐため、一定時間で自動破棄されるキャッシュです。' },
        ],
        storageNote: 'すべての情報は端末内にのみ存在し、外部に送信されることはありません。',
      },
      s5: {
        title: '権限の利用目的',
        intro: 'Peekly は必要最小限の権限のみを要求します：',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'FACEIT の試合画面に分析カードを直接表示するために必要です。' },
          { name: 'storage & unlimitedStorage', desc: 'ユーザー設定をローカルに安全に保存するために必要です。' },
          { name: 'downloads', desc: '試合履歴から公式リプレイ（Demo）ファイルをダウンロードする際にのみ使用されます。' },
        ],
      },
      s6: {
        title: 'データの削除とユーザーの権利',
        intro: 'データはお使いの端末にのみ存在するため、完全な自己管理が可能です：',
        bullets: [
          { label: '完全消去', text: '拡張機能をブラウザからアンインストールすると、保存データは即座に完全に削除されます。' },
          { label: 'モジュール管理', text: '拡張機能のポップアップから、いつでも個別に機能を停止できます。' },
        ],
      },
      s7: {
        title: 'お問い合わせ窓口',
        intro: '本プライバシーポリシーに関するご質問は、下記までお問い合わせください：',
        projectLabel: 'プロジェクト：',
        supportEmailLabel: 'サポート窓口：',
        websiteLabel: '公式ウェブサイト・規約：',
      },
      s8: {
        title: 'プライバシーポリシーの改定',
        text: '規約やプラットフォームの変更に伴い本方針が更新された場合、改定日とともに本ページに掲載されます。',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. All rights reserved.',
      legal: '免責事項：Peekly は独立したソフトウェアであり、FACEIT Ltd または Valve Corporation との提携、公認、支援関係はありません。',
    },
  },

  ko: {
    pageTitle: '개인정보 처리방침',
    subtitle: 'Peekly for FACEIT 공식 개인정보 처리방침, 단일 목적 선언 및 완전 로컬 텔레메트리 0% 아키텍처.',
    projectLabel: '프로젝트:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: '시행일:',
    effectiveDateValue: '2026년 10월',
    sections: {
      s1: {
        title: '소개 및 단일 목적 선언',
        p1: '본 개인정보 처리방침은 FACEIT(faceit.com) CS2 매치메이킹 플레이어를 위해 개발된 브라우저 확장 프로그램 Peekly for FACEIT("Peekly", "당사")에 적용됩니다.',
        p2: 'Chrome 웹 스토어 정책에 따라 Peekly는 공인된 FACEIT 매치룸 내에서 투명한 경기 통계와 분석을 제공하는 단 하나의 목적만을 위해 작동합니다.',
      },
      s2: {
        title: '데이터 수집 및 이용',
        intro: 'Peekly는 프라이버시 중심 설계(privacy-by-design)를 따릅니다. 당사는 어떠한 개인식별정보(PII)도 수집, 저장, 판매 또는 제3자에게 이전하지 않습니다.',
        subIntro: '세부 내역:',
        bullets: [
          { label: '개인 식별자 미수집', text: '이름, 이메일, 전화번호, IP 주소 등을 일체 수집하지 않습니다.' },
          { label: '계정 인증정보 미수집', text: 'FACEIT 비밀번호, Steam 인증 토큰에 절대 접근하지 않습니다.' },
          { label: '비공개 대화 미수집', text: '개인 채팅이나 친구 목록을 확인하거나 기록하지 않습니다.' },
          { label: '브라우징 기록 미추적', text: 'faceit.com 외부의 웹 활동은 절대 추적하지 않습니다.' },
          { label: '외부 트래커 완전 배제', text: '분석 SDK, 텔레메트리 스크립트, 광고 트래커가 전혀 없습니다.' },
        ],
      },
      s3: {
        title: '데이터 처리 구조',
        intro: '모든 데이터 처리는 사용자의 브라우저 내(client-side)에서 100% 로컬로 실행됩니다:',
        bullets: [
          { label: '공식 API 직접 요청', text: '경기 통계는 브라우저에서 공식 FACEIT API로 직접 요청되어 메모리에만 로드됩니다.' },
          { label: '중계 서버 미사용', text: 'Peekly는 프록시 서버나 별도의 클라우드 데이터베이스를 두지 않습니다.' },
        ],
        tableHeaders: {
          category: '데이터 범주',
          status: '수집 여부',
          method: '처리 방식',
        },
        tableRows: [
          { category: '개인 신원 및 연락처', status: '수집 안 함', statusType: 'not_collected', processing: '접근 및 전송하지 않음' },
          { category: '비밀번호 및 인증 쿠키', status: '수집 안 함', statusType: 'not_collected', processing: '접근 및 저장하지 않음' },
          { category: '매치 통계 (K/D, ADR, ELO)', status: '일시적 보관 / 수집 안 함', statusType: 'ephemeral', processing: 'FACEIT API에서 브라우저 메모리로 직접 로드' },
          { category: '사용자 설정 (언어, 모듈)', status: '로컬에만 저장', statusType: 'stored_locally', processing: 'chrome.storage.local을 통해 기기에만 보관' },
        ],
      },
      s4: {
        title: '로컬 저장소 (chrome.storage.local)',
        intro: 'Peekly는 클라이언트 기능 유지를 위해서만 chrome.storage.local API를 사용합니다:',
        bullets: [
          { label: '사용자 환경설정', text: '선택한 표시 언어 및 각 모듈 활성화 여부를 기억합니다.' },
          { label: '임시 매치 캐시', text: '반복적인 API 요청을 방지하기 위한 자동 만료(TTL) 캐시입니다.' },
        ],
        storageNote: '모든 저장 정보는 사용자의 로컬 기기에만 안전하게 유지됩니다.',
      },
      s5: {
        title: '권한 요청 사유',
        intro: 'Peekly는 최소 권한 원칙에 따라 필수적인 권한만을 요청합니다:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'FACEIT 매치룸 및 프로필에 분석 UI를 표시하기 위해 필요합니다.' },
          { name: 'storage & unlimitedStorage', desc: '사용자 설정을 로컬에 안정적으로 보관하기 위해 필요합니다.' },
          { name: 'downloads', desc: '매치 기록에서 공식 CS2 데모 파일을 다운로드할 때만 사용됩니다.' },
        ],
      },
      s6: {
        title: '사용자 권리 및 데이터 삭제',
        intro: '데이터가 오직 사용자의 기기에만 보관되므로 완벽한 통제권을 가집니다:',
        bullets: [
          { label: '완전 삭제', text: '확장 프로그램을 브라우저에서 제거하면 모든 설정과 캐시가 즉시 영구 삭제됩니다.' },
          { label: '기능 제어', text: '언제든 팝업 메뉴에서 개별 모듈을 직접 비활성화할 수 있습니다.' },
        ],
      },
      s7: {
        title: '연락처 안내',
        intro: '본 개인정보 처리방침과 관련된 문의는 아래 채널로 접수해 주시기 바랍니다:',
        projectLabel: '프로젝트:',
        supportEmailLabel: '지원 이메일:',
        websiteLabel: '공식 웹사이트 및 문서:',
      },
      s8: {
        title: '개인정보 처리방침 변경',
        text: '정책 변경 사항이 발생하는 경우 시행일자와 함께 본 페이지에 공지됩니다.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. All rights reserved.',
      legal: '법적 고지: Peekly는 독립 소프트웨어이며 FACEIT Ltd 또는 Valve Corporation과 제휴되어 있지 않습니다.',
    },
  },

  ar: {
    pageTitle: 'سياسة الخصوصية',
    subtitle: 'سياسة الخصوصية الرسمية وإعلان الغرض الأحادي وبنية خلو القياس عن بُعد لملحق Peekly for FACEIT.',
    projectLabel: 'المشروع:',
    projectName: 'Peekly for FACEIT',
    effectiveDateLabel: 'تاريخ السريان:',
    effectiveDateValue: 'أكتوبر 2026',
    sections: {
      s1: {
        title: 'المقدمة والغرض الأحادي',
        p1: 'تنظم سياسة الخصوصية هذه ملحق المتصفح Peekly for FACEIT ("Peekly"، "الملحق"، "نحن")، المصمم لتعزيز تجربة لاعبي منصة FACEIT (faceit.com).',
        p2: 'وفقاً لسياسات متجر Chrome الإلكتروني، يعمل Peekly بغرض أحادي واضح: حساب وعرض إحصاءات المباريات بشفافية داخل غرف مباريات FACEIT.',
      },
      s2: {
        title: 'جمع البيانات واستخدامها',
        intro: 'تم تصميم Peekly على مبادئ الخصوصية الصارمة. نعلن صراحة أن الملحق لا يجمع ولا يخزن ولا يبيع أو ينقل أي بيانات تعريف شخصية (PII).',
        subIntro: 'على وجه التحديد:',
        bullets: [
          { label: 'لا معرّفات شخصية', text: 'لا نجمع اسمك الحقيقي، بريدك الإلكتروني، رقم هاتفك أو عنوان IP.' },
          { label: 'لا بيانات اعتماد للحساب', text: 'لا يتم الوصول إلى كلمات مرور FACEIT أو رموز Steam أبداً.' },
          { label: 'لا مراقبة للمحادثات', text: 'لا يتم الاطلاع على الرسائل الخاصة أو قوائم الأصدقاء.' },
          { label: 'لا سجل تصفح', text: 'لا يتم تتبع أي نشاط خارج موقع faceit.com.' },
          { label: 'خالٍ من متتبعات الطرف الثالث', text: 'صفر قياس عن بُعد، ولا توجد أي نصوص برمجية إعلانية.' },
        ],
      },
      s3: {
        title: 'بنية معالجة البيانات',
        intro: 'تتم جميع عمليات المعالجة بالكامل من جانب العميل (client-side) في متصفحك:',
        bullets: [
          { label: 'طلبات مباشرة لواجهات API الرسمية', text: 'يتم جلب الإحصاءات مباشرة من واجهات FACEIT العامة إلى ذاكرة المتصفح.' },
          { label: 'لا خوادم وسيطة', text: 'يعمل Peekly دون خوادم بروكسي أو قواعد بيانات سحابية خارجية.' },
        ],
        tableHeaders: {
          category: 'فئة البيانات',
          status: 'حالة الجمع',
          method: 'طريقة المعالجة',
        },
        tableRows: [
          { category: 'الهوية الشخصية ومعلومات الاتصال', status: 'لا تُجمع', statusType: 'not_collected', processing: 'لا يتم الوصول إليها أو نقلها أبداً' },
          { category: 'كلمات المرور وملفات تعريف الارتباط', status: 'لا تُجمع', statusType: 'not_collected', processing: 'لا تتم قراءتها أو تخزينها أبداً' },
          { category: 'إحصاءات المباراة (K/D، ELO)', status: 'مؤقتة / لا تُجمع', statusType: 'ephemeral', processing: 'تُحمّل مباشرة من API إلى ذاكرة المتصفح' },
          { category: 'تفضيلات المستخدم (اللغة، المفاتيح)', status: 'تخزين محلي فقط', statusType: 'stored_locally', processing: 'محفوظة على جهازك عبر chrome.storage.local' },
        ],
      },
      s4: {
        title: 'التخزين المحلي (chrome.storage.local)',
        intro: 'يستخدم Peekly واجهة chrome.storage.local حصرياً لإعدادات واجهة المستخدم:',
        bullets: [
          { label: 'تكوين المستخدم', text: 'حفظ خيارات اللغة وتفعيل الوحدات.' },
          { label: 'ذاكرة تخزين مؤقتة للمباريات', text: 'ذاكرة مؤقتة تنتهي صلاحيتها تلقائياً لمنع تكرار الطلبات.' },
        ],
        storageNote: 'تبقى جميع البيانات المحفوظة محلياً على جهازك ولا تتم مزامنتها خارجياً.',
      },
      s5: {
        title: 'مبررات الأذونات',
        intro: 'يطلب Peekly فقط الحد الأدنى من الصلاحيات اللازمة لعمله:',
        items: [
          { name: 'host_permissions: https://*.faceit.com/*', desc: 'مطلوب لعرض لوحة التحليلات داخل غرف مباريات FACEIT.' },
          { name: 'storage & unlimitedStorage', desc: 'مطلوب لحفظ إعدادات المستخدم محلياً.' },
          { name: 'downloads', desc: 'يُستخدم فقط لتنزيل ملفات تسجيل مباريات CS2 الرسمية عند طلبك.' },
        ],
      },
      s6: {
        title: 'حقوق المستخدم وحذف البيانات',
        intro: 'نظراً لأن البيانات مخزنة محلياً فقط، فإنك تحتفظ بالتحكم الكامل:',
        bullets: [
          { label: 'الحذف الكامل', text: 'إزالة الملحق من المتصفح تحذف فوراً جميع الإعدادات المحفوظة.' },
          { label: 'التحكم بالوحدات', text: 'يمكنك إيقاف أي ميزة من القائمة في أي وقت.' },
        ],
      },
      s7: {
        title: 'معلومات الاتصال',
        intro: 'لأي استفسارات قانونية أو أسئلة حول سياسة الخصوصية، يرجى التواصل معنا:',
        projectLabel: 'المشروع:',
        supportEmailLabel: 'البريد الإلكتروني للدعم:',
        websiteLabel: 'الموقع الرسمي والتوثيق:',
      },
      s8: {
        title: 'التغييرات على هذه السياسة',
        text: 'سيتم نشر أي تحديثات مستقبلية على هذه الصفحة مع تاريخ سريان معدل.',
      },
    },
    disclaimer: {
      copyright: '© 2026 Peekly for FACEIT. جميع الحقوق محفوظة.',
      legal: 'إخلاء مسؤولية: Peekly هو مشروع برمجي مستقل وليس تابعاً لشركتي FACEIT Ltd أو Valve Corporation.',
    },
  },
};
