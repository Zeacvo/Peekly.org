import type { Language, Translations } from '../translations';
import { translations } from '../translations';

export interface ChangelogItem {
  num: string;
  title: string;
  desc: string;
}

export interface ChangelogRelease {
  version: string;
  getItems: (lang: Language) => ChangelogItem[];
}

export function getLocalizedVersionTitle(version: string, lang: Language): string {
  const prefixMap: Record<Language, string> = {
    ru: 'Версия',
    en: 'Version',
    uk: 'Версія',
    de: 'Version',
    fr: 'Version',
    es: 'Versión',
    pl: 'Wersja',
    pt: 'Versão',
    da: 'Version',
    fi: 'Versio',
    sv: 'Version',
    tr: 'Sürüm',
    zh: '版本',
    ja: 'バージョン',
    ko: '버전',
    ar: 'الإصدار',
  };
  const prefix = prefixMap[lang] || 'Version';
  return `${prefix} ${version}`;
}

export const changelog110: Record<Language, ChangelogItem[]> = {
  ru: [
    { num: '01', title: 'Увеличение уровней с 1–10 до 1–20', desc: 'Система уровней навыка расширена с привычных 10 до 20 соревновательных дивизионов с обновленными значками рангов и точными диапазонами ELO.' },
    { num: '02', title: 'Отдельная карточка рейтинга в профиле', desc: 'Текущий дивизион и расширенный уровень теперь наглядно отображаются в отдельной карточке прямо на странице профиля.' },
    { num: '03', title: 'Рейтинг HLTV 2.0 в истории матчей', desc: 'В таблицу сыгранных игр добавлен расчет соревновательного рейтинга игрока за каждый матч.' },
    { num: '04', title: 'Детальное изменение ELO за матч', desc: 'В окне быстрого трекера появились наглядные стрелки и точные числа, показывающие, сколько рейтинга вы получили или потеряли за игру.' },
    { num: '05', title: 'Шкала прогресса до следующего ранга', desc: 'В трекере добавлен индикатор, который точно показывает, сколько очков ELO осталось набрать до повышения.' },
    { num: '06', title: 'Реальный уровень матча в статистике', desc: 'В блоке последних матчей теперь отображается честный расширенный уровень лобби для игр с высоким рейтингом вместо стандартной десятки.' },
    { num: '07', title: 'Защита автопринятия от случайных нажатий', desc: 'Автопринятие улучшено: теперь оно подтверждает только готовность к матчу и больше не реагирует на посторонние всплывающие окна и приглашения.' },
    { num: '08', title: 'Исправление статусов побед и поражений', desc: 'Устранена ошибка, из-за которой результат матча в определенные дни недели мог отображаться и подсвечиваться неверно.' },
    { num: '09', title: 'Удобное открытие меню профиля', desc: 'Всплывающее окно статистики больше не появляется случайно и не перекрывает кнопки профиля, поддержки и настроек FACEIT.' },
    { num: '10', title: 'Чистая таблица истории игр', desc: 'Убраны лишние полосы, двойные рамки и полосы прокрутки, таблица аккуратно вписана в стандартный интерфейс FACEIT.' },
    { num: '11', title: 'Повышение стабильности работы', desc: 'Оптимизирована фоновая загрузка статистики, снижена нагрузка на браузер и устранены скрытые сбои при переходах между страницами.' },
  ],
  en: [
    { num: '01', title: 'Expanded Skill Levels from 1–10 to 1–20', desc: 'The skill ranking system is expanded from the traditional 10 to 20 competitive divisions with updated rank badges and precise ELO rating thresholds.' },
    { num: '02', title: 'Dedicated Profile Rating Card', desc: 'Current competitive division and expanded level are now prominently displayed in a dedicated card right on your profile page.' },
    { num: '03', title: 'HLTV 2.0 Rating in Match History', desc: 'Added competitive per-match HLTV 2.0 player rating calculations directly to the match history table.' },
    { num: '04', title: 'Detailed Match ELO Delta Tracker', desc: 'Quick tracker now features clear directional indicators and exact delta values showing ELO gained or lost per match.' },
    { num: '05', title: 'Next Rank Progress Bar', desc: 'Added a visual progress bar indicating exact remaining ELO points required to achieve the next division tier.' },
    { num: '06', title: 'Actual Lobby Level in Match Stats', desc: 'Recent match blocks now reflect authentic expanded skill tiers for high-rating lobbies instead of capping at standard Level 10.' },
    { num: '07', title: 'Accidental Click Guard for Auto-Accept', desc: 'Enhanced auto-accept engine to exclusively confirm match readiness, ignoring unrelated popups, prompts, and party invites.' },
    { num: '08', title: 'Match Outcome Status Fix', desc: 'Resolved a bug where match victory or defeat outcomes could be misidentified or incorrectly highlighted on certain days.' },
    { num: '09', title: 'Streamlined Profile Menu Access', desc: 'Telemetry overlays no longer trigger inadvertently or obstruct native FACEIT profile, support, and navigation menus.' },
    { num: '10', title: 'Clean Match History Layout', desc: 'Eliminated redundant scrollbars, double borders, and layout shifts, seamlessly blending match tables into native FACEIT UI.' },
    { num: '11', title: 'Core Stability & Performance Upgrades', desc: 'Optimized background telemetry polling, reduced browser resource footprint, and resolved silent edge-case navigation exceptions.' },
  ],
  uk: [
    { num: '01', title: 'Збільшення рівнів з 1–10 до 1–20', desc: 'Систему рівнів майстерності розширено зі звичних 10 до 20 змагальних дивізіонів із оновленими значками рангів і точними діапазонами ELO.' },
    { num: '02', title: 'Окрема картка рейтингу в профілі', desc: 'Поточний дивізіон і розширений рівень тепер наочно відображаються в окремій картці безпосередньо на сторінці профілю.' },
    { num: '03', title: 'Рейтинг HLTV 2.0 в історії матчів', desc: 'До таблиці зіграних ігор додано розрахунок змагального рейтингу гравця за кожний матч.' },
    { num: '04', title: 'Детальна зміна ELO за матч', desc: 'У вікні швидкого трекера з’явилися наочні стрілки та точні числа, що показують зміну рейтингу за гру.' },
    { num: '05', title: 'Шкала прогресу до наступного рангу', desc: 'У трекері додано індикатор, що показує, скільки очок ELO залишилося набрати до підвищення.' },
    { num: '06', title: 'Реальний рівень матчу в статистиці', desc: 'У блоці останніх матчів тепер показується чесний розширений рівень лобі для ігор із високим рейтингом замість стандартної десятки.' },
    { num: '07', title: 'Захист автоприйняття від випадкових натискань', desc: 'Автоприйняття вдосконалено: тепер воно підтверджує лише готовність до матчу та ігнорує сторонні спливаючі вікна й інвайти.' },
    { num: '08', title: 'Виправлення статусів перемог і поразок', desc: 'Усунено помилку, через яку результат матчу в окремі дні тижня міг підсвічуватися та відображатися некоректно.' },
    { num: '09', title: 'Зручне відкриття меню профілю', desc: 'Спливаюче вікно статистики більше не з’являється випадково та не перекриває кнопки профілю, підтримки та налаштувань FACEIT.' },
    { num: '10', title: 'Чиста таблиця історії ігор', desc: 'Прибрано зайві смуги, подвійні рамки та скролбари, таблицю акуратно вписано в стандартний інтерфейс FACEIT.' },
    { num: '11', title: 'Підвищення стабільності роботи', desc: 'Оптимізовано фонове завантаження статистики, знижено навантаження на браузер і усунуто приховані збої під час переходів між сторінками.' },
  ],
  de: [
    { num: '01', title: 'Erweiterte Skill-Level von 1–10 auf 1–20', desc: 'Das Rangsystem wurde von den üblichen 10 auf 20 wettbewerbsfähige Divisionen mit aktualisierten Rangabzeichen und präzisen ELO-Schwellenwerten erweitert.' },
    { num: '02', title: 'Eigene Rating-Karte im Profil', desc: 'Die aktuelle Division und das erweiterte Level werden jetzt übersichtlich in einer eigenen Karte direkt auf der Profilseite angezeigt.' },
    { num: '03', title: 'HLTV 2.0-Bewertung im Spielverlauf', desc: 'Die Spielverlaufstabelle wurde um die Berechnung des wettbewerbsorientierten HLTV 2.0-Ratings für jedes Match erweitert.' },
    { num: '04', title: 'Detaillierte ELO-Änderung pro Match', desc: 'Im Schnell-Tracker zeigen deutliche Pfeile und exakte Werte an, wie viel Rating Sie pro Spiel gewonnen oder verloren haben.' },
    { num: '05', title: 'Fortschrittsbalken zum nächsten Rang', desc: 'Ein visueller Indikator zeigt genau an, wie viele ELO-Punkte bis zum nächsten Divisionsaufstieg fehlen.' },
    { num: '06', title: 'Reales Match-Level in den Statistiken', desc: 'In den letzten Matches wird für Spiele mit hohem Rating nun das reale erweiterte Lobby-Level anstelle der Standardstufe 10 angezeigt.' },
    { num: '07', title: 'Schutz vor versehentlichem Auto-Accept', desc: 'Auto-Accept bestätigt nur noch die tatsächliche Match-Bereitschaft und reagiert nicht mehr auf fremde Popups oder Einladungen.' },
    { num: '08', title: 'Korrektur der Sieg- und Niederlagenanzeige', desc: 'Ein Fehler wurde behoben, durch den Match-Ergebnisse an bestimmten Wochentagen fehlerhaft dargestellt wurden.' },
    { num: '09', title: 'Komfortabler Zugriff auf das Profilmenü', desc: 'Statistik-Overlays erscheinen nicht mehr unbeabsichtigt und verbergen weder Profil-, Support- noch Einstellungs-Buttons auf FACEIT.' },
    { num: '10', title: 'Aufgeräumte Spielverlaufstabelle', desc: 'Überflüssige Ränder, doppelte Rahmen und Scrollleisten wurden entfernt; die Tabelle fügt sich nahtlos in das FACEIT-Design ein.' },
    { num: '11', title: 'Erhöhte Systemstabilität', desc: 'Optimierte Hintergrundabfragen, geringere Browserauslastung und Behebung seltener Navigationsfehler.' },
  ],
  fr: [
    { num: '01', title: 'Niveaux de compétence étendus de 1–10 à 1–20', desc: 'Le système de classement passe de 10 à 20 divisions compétitives avec de nouveaux insignes et des paliers ELO précis.' },
    { num: '02', title: 'Carte de classement dédiée sur le profil', desc: 'Votre division actuelle et votre niveau étendu s\'affichent désormais clairement dans une carte dédiée directement sur votre profil.' },
    { num: '03', title: 'Évaluation HLTV 2.0 dans l\'historique', desc: 'Ajout du calcul du rating compétitif HLTV 2.0 pour chaque joueur et chaque match dans l\'historique.' },
    { num: '04', title: 'Évolution détaillée de l\'ELO par match', desc: 'Le tracker rapide affiche des indicateurs précis et des valeurs exactes des points ELO gagnés ou perdus.' },
    { num: '05', title: 'Barre de progression vers le rang suivant', desc: 'Un indicateur visuel indique exactement le nombre de points ELO nécessaires pour atteindre la division supérieure.' },
    { num: '06', title: 'Niveau réel du match dans les statistiques', desc: 'L\'historique récent affiche désormais le véritable niveau étendu des salons de haut niveau au lieu de plafonner au niveau 10.' },
    { num: '07', title: 'Protection anti-clic pour l\'acceptation automatique', desc: 'L\'acceptation automatique valide uniquement la disponibilité du match et ignore les pop-ups et invitations externes.' },
    { num: '08', title: 'Correction des statuts de victoire et défaite', desc: 'Correction d\'un problème d\'affichage et de surbrillance des résultats de match survenus certains jours de la semaine.' },
    { num: '09', title: 'Accès fluide au menu du profil', desc: 'Les fenêtres de statistiques ne s\'ouvrent plus accidentellement et ne masquent plus les menus et paramètres FACEIT.' },
    { num: '10', title: 'Tableau d\'historique épuré', desc: 'Suppression des bordures doubles et barres de défilement inutiles pour une intégration parfaite dans l\'interface FACEIT.' },
    { num: '11', title: 'Stabilité et performances renforcées', desc: 'Chargement des statistiques optimisé en arrière-plan, empreinte navigateur réduite et fluidité accrue.' },
  ],
  es: [
    { num: '01', title: 'Ampliación de niveles de 1–10 a 1–20', desc: 'El sistema de niveles se expande de las tradicionales 10 a 20 divisiones competitivas con insignias renovadas y rangos de ELO precisos.' },
    { num: '02', title: 'Tarjeta de rango dedicada en el perfil', desc: 'La división actual y el nivel ampliado ahora se muestran con claridad en una tarjeta dedicada en su perfil.' },
    { num: '03', title: 'Clasificación HLTV 2.0 en el historial', desc: 'Se añade el cálculo del rating competitivo HLTV 2.0 de cada jugador para todas las partidas jugadas.' },
    { num: '04', title: 'Variación detallada de ELO por partida', desc: 'El rastreador rápido incluye flechas claras y números exactos que indican el ELO ganado o perdido por juego.' },
    { num: '05', title: 'Barra de progreso hacia el siguiente rango', desc: 'Indicador visual que muestra con exactitud cuántos puntos ELO faltan para subir de división.' },
    { num: '06', title: 'Nivel real de la sala en estadísticas', desc: 'El historial reciente muestra el auténtico nivel ampliado del lobby en partidas de alto rango en lugar del estándar nivel 10.' },
    { num: '07', title: 'Protección contra clics involuntarios en autoaceptar', desc: 'La autoaceptación se ha mejorado para confirmar únicamente partidas, ignorando avisos e invitaciones ajenas.' },
    { num: '08', title: 'Corrección de estados de victoria y derrota', desc: 'Corregido un error que provocaba que los resultados se resaltaran de forma errónea en ciertos días.' },
    { num: '09', title: 'Apertura cómoda del menú de perfil', desc: 'La ventana de estadísticas ya no se despliega por error ni obstruye botones de perfil o ajustes en FACEIT.' },
    { num: '10', title: 'Tabla de historial limpia y ordenada', desc: 'Se eliminaron barras de desplazamiento y bordes dobles, adaptando la tabla a la interfaz nativa de FACEIT.' },
    { num: '11', title: 'Mayor estabilidad y rendimiento', desc: 'Carga de telemetría optimizada en segundo plano, menor consumo del navegador y transiciones fluidas.' },
  ],
  pl: [
    { num: '01', title: 'Rozszerzenie poziomów z 1–10 do 1–20', desc: 'System poziomów umiejętności rozszerzono z tradycyjnych 10 do 20 dywizji turniejowych z nowymi odznakami i dokładnymi progami ELO.' },
    { num: '02', title: 'Dedykowana karta rangi w profilu', desc: 'Aktualna dywizja oraz rozszerzony poziom są teraz czytelnie widoczne na osobnej karcie bezpośrednio w profilu.' },
    { num: '03', title: 'Rating HLTV 2.0 w historii meczów', desc: 'Do tabeli rozegranych gier dodano kalkulację turniejowego ratingu gracza HLTV 2.0 dla każdego meczu.' },
    { num: '04', title: 'Szczegółowa zmiana ELO po meczu', desc: 'Szybki tracker pokazuje teraz czytelne strzałki i dokładne liczby punktów ELO zdobytych lub straconych w meczu.' },
    { num: '05', title: 'Pasek postępu do następnej rangi', desc: 'Wskaźnik wizualny dokładnie wskazuje, ile punktów ELO brakuje do awansu do kolejnej dywizji.' },
    { num: '06', title: 'Rzeczywisty poziom lobby w statystykach', desc: 'W ostatnich meczach wyświetlany jest rzeczywisty, rozszerzony poziom lobby dla gier o wysokim ratingu zamiast standardowego 10.' },
    { num: '07', title: 'Ochrona autoakceptacji przed przypadkowymi kliknięciami', desc: 'Autoakceptacja potwierdza wyłącznie gotowość do meczu i ignoruje inne wyskakujące okna oraz zaproszenia.' },
    { num: '08', title: 'Poprawka statusów zwycięstw i porażek', desc: 'Naprawiono błąd powodujący nieprawidłowe podświetlanie wyników meczów w określone dni tygodnia.' },
    { num: '09', title: 'Wygodne otwieranie menu profilu', desc: 'Wyskakujące okno statystyk nie pojawia się przypadkowo i nie zasłania przycisków profilu, wsparcia oraz ustawień FACEIT.' },
    { num: '10', title: 'Przejrzysta tabela historii meczów', desc: 'Usunięto zbędne podwójne ramki i paski przewijania, idealnie integrując tabelę z interfejsem FACEIT.' },
    { num: '11', title: 'Zwiększenie stabilności działania', desc: 'Zoptymalizowano pobieranie danych w tle, zmniejszono obciążenie przeglądarki i wyeliminowano błędy nawigacji.' },
  ],
  pt: [
    { num: '01', title: 'Expansão de níveis de 1–10 para 1–20', desc: 'O sistema de níveis foi expandido de 10 para 20 divisões competitivas com novos emblemas e faixas precisas de ELO.' },
    { num: '02', title: 'Card dedicado de classificação no perfil', desc: 'A divisão atual e o nível expandido agora são exibidos em um card exclusivo diretamente no perfil.' },
    { num: '03', title: 'Classificação HLTV 2.0 no histórico de partidas', desc: 'Adicionado o cálculo de rating competitivo HLTV 2.0 por partida na tabela de histórico.' },
    { num: '04', title: 'Variação detalhada de ELO por jogo', desc: 'O rastreador rápido inclui setas intuitivas e números exatos de ELO ganho ou perdido a cada partida.' },
    { num: '05', title: 'Barra de progresso para a próxima patente', desc: 'Indicador visual que exibe exatamente quantos pontos de ELO faltam para subir de divisão.' },
    { num: '06', title: 'Nível real da partida nas estatísticas', desc: 'O bloco de partidas recentes agora exibe o nível expandido real do lobby em jogos de alto rating em vez do nível 10 padrão.' },
    { num: '07', title: 'Proteção contra cliques acidentais no auto-aceite', desc: 'O auto-aceite foi aprimorado para confirmar somente a prontidão da partida, ignorando pop-ups e convites externos.' },
    { num: '08', title: 'Correção de status de vitórias e derrotas', desc: 'Corrigido o erro que fazia com que o resultado da partida fosse destacado incorretamente em determinados dias.' },
    { num: '09', title: 'Acesso simplificado ao menu do perfil', desc: 'A janela flutuante de estatísticas não surge por engano nem cobre menus de perfil e configurações da FACEIT.' },
    { num: '10', title: 'Tabela de histórico de partidas limpa', desc: 'Bordas duplas e barras de rolagem desnecessárias foram removidas para uma integração perfeita à FACEIT.' },
    { num: '11', title: 'Maior estabilidade operacional', desc: 'Carregamento em segundo plano otimizado, menor consumo de memória e navegação sem travamentos.' },
  ],
  da: [
    { num: '01', title: 'Udvidede færdighedsniveauer fra 1–10 til 1–20', desc: 'Rangsystemet er udvidet fra 10 til 20 konkurrencedygtige divisioner med opdaterede rangikoner og præcise ELO-grænser.' },
    { num: '02', title: 'Dedikeret ratingkort i profilen', desc: 'Nuværende division og udvidet niveau vises nu overskueligt på et separat kort direkte på profilsiden.' },
    { num: '03', title: 'HLTV 2.0-rating i kamphistorikken', desc: 'Tilføjet beregning af spillerens HLTV 2.0-rating for hver spillet kamp i tabellen.' },
    { num: '04', title: 'Detaljeret ELO-ændring pr. kamp', desc: 'Hurtig-trackeren viser nu tydelige pile og præcise tal for optjent eller tabt rating pr. kamp.' },
    { num: '05', title: 'Fremskridtslinje til næste rang', desc: 'En visuel indikator viser præcist, hvor mange ELO-point der mangler til næste divisionsoprykning.' },
    { num: '06', title: 'Reelt lobby-niveau i statistikken', desc: 'Blokken med seneste kampe viser nu det sande udvidede lobby-niveau for højtratede spil i stedet for standardniveau 10.' },
    { num: '07', title: 'Beskyttelse mod utilsigtede klik ved auto-accept', desc: 'Auto-accept bekræfter kun kampklarhed og reagerer ikke længere på uvedkommende pop op-vinduer og invitationer.' },
    { num: '08', title: 'Rettelse af sejrs- og nederlagsstatus', desc: 'Rettet en fejl, hvor kampresultater på bestemte ugedage kunne fremstå forkert fremhævet.' },
    { num: '09', title: 'Ubesværet adgang til profilmenuen', desc: 'Statistikvinduet åbner ikke utilsigtet og dækker ikke profil-, support- eller indstillingsknapper på FACEIT.' },
    { num: '10', title: 'Ren kamphistoriktabel', desc: 'Fjernet overflødige rammer og rullepaneler, så tabellen falder naturligt ind i FACEITs brugerflade.' },
    { num: '11', title: 'Forbedret systemstabilitet', desc: 'Optimeret baggrundsindlæsning, reduceret browserbelastning og færre skjulte fejl ved sideskift.' },
  ],
  fi: [
    { num: '01', title: 'Taitotasojen laajennus tasoilta 1–10 tasoille 1–20', desc: 'Taitotasojärjestelmä on laajennettu 10 tasosta 20 kilpailulliseen divisioonaan päivitetyillä tunnuksilla ja tarkoilla ELO-rajoilla.' },
    { num: '02', title: 'Erillinen taitotasokortti profiilissa', desc: 'Nykyinen divisioona ja laajennettu taso näkyvät nyt selkeästi omassa kortissaan suoraan profiilisivulla.' },
    { num: '03', title: 'HLTV 2.0 -arvosana otteluhistoriassa', desc: 'Otteluhistoriataulukkoon on lisätty pelaajan HLTV 2.0 -kilpailuarvosana jokaisesta ottelusta.' },
    { num: '04', title: 'Yksityiskohtainen ELO-muutos ottelukohtaisesti', desc: 'Pikaseurannassa on nyt selkeät nuolet ja tarkat lukemat, jotka kertovat ottelusta saadun tai menetetyn ELO-määrän.' },
    { num: '05', title: 'Edistymispalkki seuraavalle tasolle', desc: 'Osoitin näyttää tarkasti, kuinka monta ELO-pistettä tarvitaan seuraavan divisioonatason saavuttamiseen.' },
    { num: '06', title: 'Todellinen aulataso tilastoissa', desc: 'Viimeaikaisten otteluiden lohkossa näkyy nyt aito laajennettu aulataso korkeatasoisille peleille vakiotason 10 sijaan.' },
    { num: '07', title: 'Automaattihyväksynnän suojaus virheklikkauksilta', desc: 'Automaattihyväksyntä vahvistaa vain otteluvalmiuden eikä reagoi ulkopuolisiin ponnahdusikkunoihin tai kutsuihin.' },
    { num: '08', title: 'Voitto- ja häviötilojen korjaus', desc: 'Korjattu virhe, jonka vuoksi ottelun tulos saattoi näkyä tai korostua virheellisesti tiettyinä viikonpäivinä.' },
    { num: '09', title: 'Profiilivalikon sujuva avaaminen', desc: 'Tilastoikkuna ei enää avaudu vahingossa eikä peitä FACEIT-profiilin, tuen tai asetusten painikkeita.' },
    { num: '10', title: 'Selkeä otteluhistoriataulukko', desc: 'Poistettu ylimääräiset reunukset ja vierityspalkit, sovittaen taulukko siististi osaksi FACEIT-käyttöliittymää.' },
    { num: '11', title: 'Toimintavarmuuden parannukset', desc: 'Optimoitu tilastojen taustalataus, pienennetty selaimen kuormitusta ja korjattu piilevät virheet sivujen välillä.' },
  ],
  sv: [
    { num: '01', title: 'Utökade färdighetsnivåer från 1–10 till 1–20', desc: 'Rankingsystemet har utökats från 10 till 20 tävlingsdivisioner med uppdaterade rangmärken och exakta ELO-gränser.' },
    { num: '02', title: 'Dedikerat betygskort i profilen', desc: 'Nuvarande division och utökad nivå visas nu tydligt på ett separat kort direkt på profilsidan.' },
    { num: '03', title: 'HLTV 2.0-betyg i matchhistoriken', desc: 'Beräkning av spelarens tävlingsbetyg HLTV 2.0 har lagts till för varje spelad match i tabellen.' },
    { num: '04', title: 'Detaljerad ELO-förändring per match', desc: 'Snabbspåraren visar nu tydliga pilar och exakta siffror för hur mycket ELO du vunnit eller förlorat.' },
    { num: '05', title: 'Förloppsindikator till nästa rang', desc: 'En visuell indikator visar exakt hur många ELO-poäng som krävs för att nå nästa division.' },
    { num: '06', title: 'Verklig lobbynivå i matchstatistiken', desc: 'De senaste matcherna visar nu den faktiska utökade lobbynivån för matcher med hög ranking istället för nivå 10.' },
    { num: '07', title: 'Skydd mot oavsiktliga klick vid autoacceptans', desc: 'Autoacceptans bekräftar endast matchberedskap och ignorerar irrelevanta popup-fönster och inbjudningar.' },
    { num: '08', title: 'Korrigering av vinst- och förluststatus', desc: 'Åtgärdat ett fel som gjorde att matchresultat kunde visas och markeras felaktigt under vissa veckodagar.' },
    { num: '09', title: 'Smidig åtkomst till profilmenyn', desc: 'Statistikfönstret öppnas inte oavsiktligt och blockerar inte längre profil-, support- eller inställningsknappar.' },
    { num: '10', title: 'Ren matchhistoriktabell', desc: 'Borttagna dubbla ramar och onödiga rullningslister för en sömlös integrering i FACEITs gränssnitt.' },
    { num: '11', title: 'Ökad stabilitet och prestanda', desc: 'Optimerad bakgrundshämtning, minskad belastning på webbläsaren och åtgärdade dolda navigeringsfel.' },
  ],
  tr: [
    { num: '01', title: '1–10 Seviyeleri 1–20 Olarak Genişletildi', desc: 'Yetenek seviyesi sistemi, güncellenmiş rütbe simgeleri ve net ELO aralıklarıyla geleneksel 10 kademeden 20 rekabetçi bölüme yükseltildi.' },
    { num: '02', title: 'Profilde Özel Derecelendirme Kartı', desc: 'Mevcut bölüm ve genişletilmiş seviye artık doğrudan profil sayfasında özel bir kartta net bir şekilde gösteriliyor.' },
    { num: '03', title: 'Maç Geçmişinde HLTV 2.0 Reytingi', desc: 'Oynanan maçlar tablosuna her maç için oyuncunun HLTV 2.0 rekabetçi performans puanı hesaplaması eklendi.' },
    { num: '04', title: 'Maç Başına Ayrıntılı ELO Değişimi', desc: 'Hızlı takip penceresinde maçta kazanılan veya kaybedilen puanı gösteren yön okları ve kesin ELO değerleri yer alıyor.' },
    { num: '05', title: 'Sonraki Rütbeye İlerleme Çubuğu', desc: 'Bir sonraki bölüme yükselmek için kaç ELO puanı gerektiğini tam olarak gösteren görsel bir ilerleme çubuğu eklendi.' },
    { num: '06', title: 'İstatistiklerde Gerçek Lobi Seviyesi', desc: 'Son maçlar bloğunda yüksek dereceli oyunlar için standart 10 seviye yerine gerçek genişletilmiş lobi seviyesi görüntüleniyor.' },
    { num: '07', title: 'Otomatik Kabulde Yanlış Tıklama Koruması', desc: 'Otomatik kabul geliştirildi: Artık yalnızca maç hazır kontrolünü onaylar, harici açılır pencerelere ve davetlere tepki vermez.' },
    { num: '08', title: 'Galibiyet ve Mağlubiyet Durumu Düzeltmesi', desc: 'Haftanın belirli günlerinde maç sonucunun yanlış renkle vurgulanmasına yol açan hata giderildi.' },
    { num: '09', title: 'Profil Menüsüne Rahat Erişim', desc: 'İstatistik penceresi artık yanlışlıkla açılmaz ve FACEIT profil, destek ve ayar butonlarını engellemez.' },
    { num: '10', title: 'Temiz Maç Geçmişi Tablosu', desc: 'Gereksiz kenarlıklar ve kaydırma çubukları kaldırılarak tablo standart FACEIT arayüzüne kusursuzca entegre edildi.' },
    { num: '11', title: 'Gelişmiş Çalışma Kararlılığı', desc: 'Arka plan veri yüklemesi optimize edildi, tarayıcı yükü azaltıldı ve sayfalar arası geçişlerdeki gizli çökmeler giderildi.' },
  ],
  ar: [
    { num: '01', title: 'توسيع مستويات المهارة من 1–10 إلى 1–20', desc: 'تم توسيع نظام تصنيف المهارة من 10 إلى 20 قسمًا تنافسيًا مع شارات رتب محدثة ونطاقات ELO دقيقة.' },
    { num: '02', title: 'بطاقة تصنيف مخصصة في الملف الشخصي', desc: 'يتم الآن عرض القسم الحالي والمستوى الموسع بوضوح في بطاقة مستقلة داخل صفحة الملف الشخصي.' },
    { num: '03', title: 'تقييم HLTV 2.0 في سجل المباريات', desc: 'تمت إضافة حساب تقييم أداء اللاعب بنظام HLTV 2.0 لكل مباراة في جدول المباريات السابقة.' },
    { num: '04', title: 'تفاصيل تغيير نقاط ELO بعد كل مباراة', desc: 'يعرض متتبع الأداء السريع أسهمًا واضحة وقيمًا دقيقة للنقاط المكتسبة أو المفقودة في المباراة.' },
    { num: '05', title: 'شريط التقدم نحو الرتبة التالية', desc: 'مؤشر مرئي يوضح بدقة عدد نقاط ELO المتبقية للترقية إلى القسم التنافسي التالي.' },
    { num: '06', title: 'المستوى الحقيقي لردهة المباراة في الإحصائيات', desc: 'تعرض قائمة المباريات الأخيرة الآن المستوى الفعلي الموسع لردهات التصنيف العالي بدلاً من التوقف عند المستوى 10.' },
    { num: '07', title: 'حماية القبول التلقائي من النقرات العرضية', desc: 'تم تحسين القبول التلقائي لتأكيد الاستعداد للمباراة فقط وتجاهل النوافذ المنبثقة والدعوات الخارجية.' },
    { num: '08', title: 'إصلاح حالة الفوز والهزيمة', desc: 'تم إصلاح خطأ كان يتسبب في تمييز وعرض نتائج المباريات بشكل غير صحيح في أيام معينة من الأسبوع.' },
    { num: '09', title: 'وصول مريح إلى قائمة الملف الشخصي', desc: 'لم تعد نافذة الإحصائيات المنبثقة تظهر بالخطأ أو تحجب أزرار الملف الشخصي والدعم والإعدادات على FACEIT.' },
    { num: '10', title: 'جدول سجل مباريات نقي ومتناسق', desc: 'تمت إزالة الحواف المزدوجة وأشرطة التمرير الزائدة لدمج الجدول بسلاسة داخل واجهة FACEIT.' },
    { num: '11', title: 'تعزيز استقرار وأداء النظام', desc: 'تحسين تحميل البيانات في الخلفية، وتقليل استهلاك موارد المتصفح، ومنع الأخطاء غير المتوقعة.' },
  ],
  ja: [
    { num: '01', title: 'スキルレベルを1–10から1–20へ拡張', desc: 'スキルレベル体系を従来の10段階から20の競技ディビジョンへ拡張し、刷新されたバッジと正確なELO境界を設定しました。' },
    { num: '02', title: 'プロフィールに独立したレートカードを追加', desc: '現在のディビジョンと拡張レベルが、プロフィールページ上の専用カードにわかりやすく表示されます。' },
    { num: '03', title: 'マッチ履歴にHLTV 2.0レーティングを表示', desc: '対戦履歴テーブルに、各マッチにおけるプレイヤーのHLTV 2.0競技レーティング算出値を追加しました。' },
    { num: '04', title: 'マッチごとの詳細なELO変動表示', desc: 'クイックトラッカーに直感的な矢印と正確な数値を導入し、試合ごとの獲得・喪失レートを一目で確認できます。' },
    { num: '05', title: '次ランクまでのプログレスバー', desc: '次のディビジョンへ昇格するまでに必要な残りELOポイント数を正確に示すインジケーターを追加しました。' },
    { num: '06', title: '統計におけるマッチの真のレベル表示', desc: '直近マッチブロックにおいて、高レート帯ゲームに対して標準の10ではなく誠実な拡張ロビーレベルを表示します。' },
    { num: '07', title: '自動承認の誤タップ保護', desc: '自動承認を強化：対戦準備完了のみを的確に承認し、無関係なポップアップやパーティ招待への誤反応を防止します。' },
    { num: '08', title: '勝敗ステータス表示の修正', desc: '特定の曜日に対戦結果が誤ってハイライトおよび表示される不具合を修正しました。' },
    { num: '09', title: 'プロフィールメニューへのスムーズなアクセス', desc: '統計オーバーレイが不意に表示されてFACEITのプロフィール、サポート、設定ボタンを遮ることがなくなりました。' },
    { num: '10', title: '無駄のないクリアなマッチ履歴テーブル', desc: '不要なスクロールバーや二重の枠線を排除し、FACEITの標準インターフェースに美しく調和させました。' },
    { num: '11', title: '動作安定性とパフォーマンスの向上', desc: 'バックグラウンドの統計読み込みを最適化し、ブラウザの負荷軽減とページ遷移時の安定性を高めました。' },
  ],
  ko: [
    { num: '01', title: '스킬 레벨 1–10에서 1–20으로 확장', desc: '스킬 레벨 시스템을 기존 10단계에서 20개 경쟁 디비전으로 대폭 확장하고, 새로워진 랭크 배지와 정밀한 ELO 범위를 적용했습니다.' },
    { num: '02', title: '프로필 전용 레이팅 카드', desc: '현재 디비전과 확장 레벨이 프로필 페이지 내 독립된 전용 카드에 명확하게 표시됩니다.' },
    { num: '03', title: '매치 기록 내 HLTV 2.0 레이팅 제공', desc: '전적 테이블에 매 경기 플레이어의 HLTV 2.0 경쟁 레이팅 산출 항목을 추가했습니다.' },
    { num: '04', title: '경기별 상세 ELO 변동 추적', desc: '빠른 트래커 창에 명확한 화살표와 수치를 도입하여 경기 후 획득하거나 손실한 정확한 ELO를 보여줍니다.' },
    { num: '05', title: '다음 랭크 달성 진행률 바', desc: '다음 디비전으로 승급하기까지 필요한 남은 ELO 포인트를 정확하게 알려주는 인디케이터가 추가되었습니다.' },
    { num: '06', title: '통계 내 실제 매치 로비 레벨 표기', desc: '최근 경기 블록에서 상위 랭크 게임의 경우 기본 10레벨 대신 실제 확장 로비 레벨을 정확히 표기합니다.' },
    { num: '07', title: '자동 수락 오작동 및 오클릭 방지', desc: '자동 수락 기능을 개선하여 매치 준비 완료 상태만 확인하고 무관한 팝업이나 초대창에는 반응하지 않습니다.' },
    { num: '08', title: '승패 상태 표시 오류 수정', desc: '특정 요일에 매치 결과가 잘못 강조 표시되거나 안내되던 오류를 해결했습니다.' },
    { num: '09', title: '편리한 프로필 메뉴 열기', desc: '통계 팝업이 예기치 않게 열려 FACEIT 프로필, 지원 및 설정 버튼을 가리는 현상을 방지했습니다.' },
    { num: '10', title: '정돈된 전적 테이블 인터페이스', desc: '불필요한 이중 테두리와 스크롤바를 정리하여 FACEIT 표준 UI에 자연스럽게 녹아들도록 개선했습니다.' },
    { num: '11', title: '시스템 안정성 및 구동 성능 강화', desc: '백그라운드 통계 동기화를 최적화하여 브라우저 부담을 줄이고 페이지 이동 간 충돌 요소를 제거했습니다.' },
  ],
  zh: [
    { num: '01', title: '技能等级从1–10级扩充至1–20级', desc: '段位系统由传统的10个层级扩展为20个竞技组别，并配备全新段位图标与精准的ELO积分区间。' },
    { num: '02', title: '个人资料页独立段位卡片', desc: '当前竞技组别与扩展等级如今在个人主页的独立专属卡片中一目了然地呈现。' },
    { num: '03', title: '比赛历史中引入HLTV 2.0评分', desc: '在对战记录表格中新增每场对局的选手HLTV 2.0竞技表现评分计算。' },
    { num: '04', title: '每场比赛详尽ELO变动指示', desc: '快速追踪面板新增清晰的升降指示箭头与精确数值，直观展示单场增减的积分。' },
    { num: '05', title: '晋升下一段位进度指示条', desc: '新增进度条，精准显示晋升至下一竞技组别还需获取的ELO分值。' },
    { num: '06', title: '对局数据呈现真实大厅等级', desc: '在近期战绩板块中，高水平对局不再统一封顶在10级，而是如实展示真实的扩展大厅等级。' },
    { num: '07', title: '自动接受防误触安全机制', desc: '优化自动接受机制：仅精准确认比赛准备状态，杜绝响应非预期的弹窗或组队邀请。' },
    { num: '08', title: '胜负状态高亮与判定修复', desc: '修正了特定星期几比赛结果可能出现错误高亮与显示异常的问题。' },
    { num: '09', title: '更便捷地开启个人中心菜单', desc: '数据悬浮层不再误触弹出，彻底消除遮挡FACEIT个人资料、客服支持及设置按钮的困扰。' },
    { num: '10', title: '清爽整洁的战绩历史表格', desc: '移除了多余的边框与滚动条，让对局列表与FACEIT原生界面浑然一体。' },
    { num: '11', title: '整体运行稳定性与性能飞跃', desc: '深度优化后台数据加载，降低浏览器资源占用，并消除页面切换过程中的潜在异常。' },
  ],
};

const changelog100Ru: ChangelogItem[] = [
  { num: '01', title: 'Первый публичный релиз в Google Chrome Web Store', desc: 'Полный набор тактического интерфейса и автоматизации для соревновательного FACEIT CS2.' },
  { num: '02', title: 'Радар маппула в лобби', desc: 'Отображает радар маппула команд в лобби матча на основе последних 30 игр.' },
  { num: '03', title: 'Статистика игроков в матче', desc: 'Отображает плашки со статистикой за 30 игр и раскладку по картам под каждым игроком.' },
  { num: '04', title: 'Плашка среднего ELO команд', desc: 'Отображает контрастные плашки среднего ELO со значком ранга в баннере счета.' },
  { num: '05', title: 'Автокопирование IP сервера', desc: 'Автоматически копирует команду connect в буфер при назначении сервера.' },
  { num: '06', title: 'Режим фокусировки лобби', desc: 'Скрывает ростеры игроков и баннер счета, оставляя карту, сервер и радар.' },
  { num: '07', title: 'Автопринятие матча', desc: 'Автоматически подтверждает готовность при нахождении матча с задержкой.' },
  { num: '08', title: 'Автопринятие инвайтов в группу', desc: 'Автоматически принимает входящие приглашения в группу с задержкой.' },
  { num: '09', title: 'Расширенная история матчей', desc: 'Добавляет в таблицу матчей показатели K/R, ADR, PCR и кнопку скачивания демозаписи (Demo).' },
  { num: '10', title: 'Виджет ELO в сайдбаре', desc: 'Отображает компактный 2-элементный блок ELO с иконкой ранга и счетом.' },
  { num: '11', title: 'Винрейт на карточках карт', desc: 'Отображает плашки винрейта прямо на плитках карт в очереди матча.' },
];

const changelog100En: ChangelogItem[] = [
  { num: '01', title: 'Initial public release in Google Chrome Web Store', desc: 'Full-featured tactical interface and automation suite for competitive FACEIT CS2.' },
  { num: '02', title: 'Map Pool Radar Chart', desc: 'Renders team map pool radar chart in matchroom based on last 30 matches.' },
  { num: '03', title: 'Match Player Stats Overlay', desc: 'Displays 30-match performance stats and map breakdown under each player in the matchroom.' },
  { num: '04', title: 'Team Average ELO Badge', desc: 'Displays high-contrast team average ELO pills with rank icons in match banner.' },
  { num: '05', title: 'Auto-Copy Server IP', desc: 'Automatically copies connect command to clipboard when IP is assigned.' },
  { num: '06', title: 'Lobby Focus Mode', desc: 'Hides team rosters and score banner, keeping server, map, and radar visible.' },
  { num: '07', title: 'Auto-Accept Match Check', desc: 'Automatically confirms ready check dialog upon match creation.' },
  { num: '08', title: 'Auto-Accept Party Invites', desc: 'Automatically accepts incoming party invitations with configurable delay.' },
  { num: '09', title: 'Enhanced Match History', desc: 'Adds K/R, ADR, PCR columns and a direct Demo download button to the match history table.' },
  { num: '10', title: 'Sidebar ELO Widget', desc: 'Displays compact 2-element ELO widget with skill level icon and live score in rail.' },
  { num: '11', title: 'Map Selector Win Rates', desc: 'Displays team and personal win rate badges directly on matchmaking queue map tiles.' },
];

function getVersion100Items(lang: Language): ChangelogItem[] {
  if (lang === 'ru') return changelog100Ru;
  if (lang === 'en') return changelog100En;

  const tLang: Translations = translations[lang] || translations.en;
  const initialItem: ChangelogItem = {
    num: '01',
    title: tLang.changelogPage.initialReleaseTitle || 'Initial public release in Google Chrome Web Store',
    desc: tLang.changelogPage.initialReleaseDesc || 'Full tactical interface and automation suite for competitive FACEIT CS2.',
  };
  const featureItems: ChangelogItem[] = (tLang.features?.items || []).map((item, idx) => ({
    num: String(idx + 2).padStart(2, '0'),
    title: item.title,
    desc: item.desc,
  }));
  return [initialItem, ...featureItems];
}

export const changelogReleases: ChangelogRelease[] = [
  {
    version: '1.1.0',
    getItems: (lang: Language) => changelog110[lang] || changelog110.en,
  },
  {
    version: '1.0.0',
    getItems: (lang: Language) => getVersion100Items(lang),
  },
];
