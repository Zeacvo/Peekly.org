import type { HumanFeatureData } from './types';

export const plFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Wykres radarowy map w lobby",
    "category": "POKÓJ MECZOWY",
    "summary": "Wyświetla radar puli map drużyn w pokoju meczowym na podstawie ostatnich 30 gier.",
    "overview": "Podczas fazy banowania map na FACEIT, Peekly generuje przejrzysty wykres radarowy na podstawie ostatnich 30 meczów turniejowych każdego gracza w lobby. Błyskawicznie dostrzegasz mocne strony i słabości rywali. Wasz kapitan bez wahania odrzuca najgroźniejsze mapy przeciwników i prowadzi drużynę na waszą najsilniejszą lokację.",
    "benefits": [
      {
        "title": "Szybka analiza puli map",
        "desc": "Bezpośrednie porównanie gotowości bojowej obu drużyn na wszystkich aktywnych mapach CS2."
      },
      {
        "title": "Unikanie niekorzystnych map",
        "desc": "Ochrona przed przypadkowym wyborem mapy, na której rywale mają ponad 80% współczynnika wygranych."
      },
      {
        "title": "Pewność przed startem meczu",
        "desc": "Cały zespół wchodzi na serwer ze spójnym planem gry i przewagą taktyczną."
      }
    ],
    "audience": "Kapitanowie drużyn, 3-5 osobowe składy oraz ambitni gracze solo."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Nakładka statystyk graczy w meczu",
    "category": "POKÓJ MECZOWY",
    "summary": "Wyświetla statystyki z ostatnich 30 gier i zestawienie map pod każdym graczem.",
    "overview": "Koniec z otwieraniem 10 osobnych kart w przeglądarce. Peekly wyświetla najważniejsze wskaźniki bojowe bezpośrednio pod kartą każdego gracza: współczynnik K/D, średnie obrażenia na rundę (ADR), procent trafień w głowę oraz winrate z ostatnich 30 meczów. W dwie sekundy zorientujesz się, kto u rywali jest w życiowej formie, a kto gra niestabilnie.",
    "benefits": [
      {
        "title": "Identyfikacja kluczowych zagrożeń",
        "desc": "Natychmiastowa identyfikacja groźnych entry fraggerów i snajperów przeciwnika."
      },
      {
        "title": "Kompletny panel w jednym miejscu",
        "desc": "Kompletny przegląd formy wszystkich graczy na jednym ekranie bez klikania w profile."
      },
      {
        "title": "Przejrzysta integracja HUD",
        "desc": "Dopracowana integracja z interfejsem lobby bez zaśmiecania ekranu zbędnymi elementami."
      }
    ],
    "audience": "Gracze turniejowi, dla których przygotowanie przed rundą ma kluczowe znaczenie."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Średnie ELO drużyn",
    "category": "POKÓJ MECZOWY",
    "summary": "Wyświetla kontrastowe plakietki średniego ELO z ikoną rangi na banerze wyniku.",
    "overview": "Oblicza i wyświetla rzeczywiste średnie ELO obu składów bezpośrednio w nagłówku meczu wraz z ikonami rang. Od razu widzisz bilans sił w lobby, co pozwala właściwie nastawić się psychicznie na wymagających rywali lub grać ostrożnie, chroniąc punkty rankingowe.",
    "benefits": [
      {
        "title": "Jasny bilans sił w lobby",
        "desc": "Precyzyjne rozeznanie w różnicy poziomów obu zespołów przed pierwszą rundą."
      },
      {
        "title": "Świadomość stawki meczu",
        "desc": "Poznaj poziom wyzwania i stawkę pojedynku przed rozpoczęciem pierwszej rundy."
      },
      {
        "title": "Nastawienie taktyczne",
        "desc": "Ocena doświadczenia rywali i dopasowanie drużynowej dyscypliny taktycznej."
      }
    ],
    "audience": "Gracze grindujący punkty ELO, zawodnicy solo oraz drużyny dążące do 10. poziomu."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Automatyczne kopiowanie IP serwera",
    "category": "POKÓJ MECZOWY",
    "summary": "Automatycznie kopiuje polecenie connect do schowka po przydzieleniu serwera.",
    "overview": "Gdy tylko FACEIT przydzieli serwer meczowy, gotowa komenda konsoli connect trafia od razu do Twojego schowka. Nie musisz szukać adresu na stronie: uruchom CS2, otwórz konsolę (~) i wciśnij Ctrl+V – dołączasz jako pierwszy i masz czas na rozgrzanie celownika przed rundą pistoletową.",
    "benefits": [
      {
        "title": "Ekspresowe wejście na serwer",
        "desc": "Połączenie z serwerem w 3 sekundy bez konieczności szukania przycisków na stronie."
      },
      {
        "title": "Gotowa komenda w schowku",
        "desc": "Kompletna komenda konsoli z adresem IP, portem i hasłem natychmiast gotowa do wklejenia."
      },
      {
        "title": "Przewaga podczas rozgrzewki",
        "desc": "Wcześniejsze dołączenie do gry dające czas na spokojną rozgrzewkę celownika."
      }
    ],
    "audience": "Wszyscy gracze FACEIT CS2 ceniący szybkość i wygodę dołączania do meczu."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Tryb skupienia w lobby",
    "category": "POKÓJ MECZOWY",
    "summary": "Ukrywa składy i banery wyników, pozostawiając serwer, mapę oraz radar.",
    "overview": "Ukrywa listy graczy i zbędne banery w pokoju meczowym, eksponując wyłącznie najważniejsze elementy: wylosowaną mapę, dane serwera oraz taktyczny radar puli map. Zmniejsza zużycie pamięci przeglądarki w tle i pozwala w pełni skoncentrować się na grze.",
    "benefits": [
      {
        "title": "Zero zbędnych bodźców",
        "desc": "Pełne skupienie na mapie, serwerze i radarze bez rozpraszających elementów."
      },
      {
        "title": "Niskie obciążenie pamięci",
        "desc": "Mniejsze zużycie pamięci RAM przez przeglądarkę podczas działania CS2."
      },
      {
        "title": "Wysoki kontrast i czytelność",
        "desc": "Czytelny, ciemny motyw o wysokim kontraście zaprojektowany do błyskawicznej analizy."
      }
    ],
    "audience": "Gracze preferujący czysty, minimalistyczny interfejs i maksymalną liczbę FPS w grze."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Automatyczne potwierdzanie meczu",
    "category": "AUTOMATYZACJA",
    "summary": "Automatycznie zatwierdza gotowość do meczu po jego znalezieniu z konfigurowalnym opóźnieniem.",
    "overview": "Nigdy więcej kar czasowych w kolejce za przeoczenie przycisku akceptacji. Peekly automatycznie potwierdza gotowość w momencie znalezienia meczu, nawet jeśli na chwilę odszedłeś od komputera. Intuicyjny suwak pozwala ustawić naturalne opóźnienie od 0 do 10 sekund.",
    "benefits": [
      {
        "title": "Ochrona przed karami kolejki",
        "desc": "Całkowita ochrona przed karami czasowymi w kolejce za niepotwierdzenie gotowości."
      },
      {
        "title": "Spokój podczas oczekiwania",
        "desc": "Spokój ducha podczas długiego oczekiwania na mecz w późnych godzinach nocnych."
      },
      {
        "title": "Regulowany suwak (0–10s)",
        "desc": "Płynna regulacja suwaka: od natychmiastowej reakcji (0s) do naturalnego opóźnienia do 10s."
      }
    ],
    "audience": "Osoby rozgrywające długie sesje ceniące bezpieczeństwo w kolejce meczowej."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Automatyczne przyjmowanie zaproszeń do grupy",
    "category": "AUTOMATYZACJA",
    "summary": "Automatycznie akceptuje zaproszenia do lobby z możliwością ustawienia opóźnienia.",
    "overview": "Gdy znajomi lub kapitan wyślą Ci zaproszenie do grupy, Peekly natychmiast przyjmuje je w tle. Dzięki regulowanemu opóźnieniu od 0 do 10 sekund dołączasz do drużyny bez konieczności wypatrywania i klikania powiadomień.",
    "benefits": [
      {
        "title": "Ekspresowe zbieranie składu",
        "desc": "Wasz pełny 5-osobowy skład zbiera się w kilka sekund bez czekania na ręczne potwierdzenia."
      },
      {
        "title": "Elastyczny czas odpowiedzi",
        "desc": "Regulowany czas reakcji od 0 do 10 sekund dopasowany do Twoich preferencji."
      },
      {
        "title": "Niezawodne działanie w tle",
        "desc": "Niezawodne działanie w tle, nawet gdy okno przeglądarki jest zminimalizowane."
      }
    ],
    "audience": "Zgrane piątki, paczki znajomych oraz drużyny turniejowe."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Rozszerzona historia meczów",
    "category": "PROFIL",
    "summary": "Dodaje kolumny K/R, ADR, PCR oraz przycisk bezpośredniego pobierania dema do tabeli.",
    "overview": "Wzbogaca standardową historię meczów FACEIT o szczegółowe wskaźniki (K/R, ADR, PCR) oraz pobieranie oficjalnych powtórek (.DEM) jednym kliknięciem. Wskaźnik PCR (Peekly Contribution Rating) mierzy procentowy wkład gracza w wygrane rundy zespołu, zastępując przestarzały system RWS. Algorytm uwzględnia zabójstwa, asysty, średnie obrażenia na rundę (ADR), entry fragi, wygrane clutche oraz efektywne użycie granatów (utility). Suma punktów wszystkich 5 graczy wynosi zawsze 100%, co oznacza, że norma dla zbalansowanego gracza to dokładnie 20%. Pliki demo pobierają się natychmiast z pełną prędkością CDN.",
    "benefits": [
      {
        "title": "Pobieranie dema 1 kliknięciem",
        "desc": "Błyskawiczne pobieranie oficjalnych plików .DEM z szybkich serwerów CDN FACEIT."
      },
      {
        "title": "Wskaźnik wkładu PCR (norma 20%)",
        "desc": "PCR zastępuje RWS, oceniając realny wpływ (zabójstwa, ADR, wejścia, clutche, granaty). Suma drużyny to 100%, norma na gracza to 20%."
      },
      {
        "title": "Szybka analiza meczu",
        "desc": "Szybka analiza zagrań, kluczowych rund i użycia granatów natychmiast po meczu."
      }
    ],
    "audience": "Gracze analizujący swoje demka, trenerzy taktyczni i twórcy materiałów wideo."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Widżet ELO w pasku bocznym",
    "category": "PROFIL",
    "summary": "Wyświetla kompaktowy, 2-elementowy widżet ELO z ikoną poziomu i aktualnym wynikiem.",
    "overview": "Integruje estetyczny 2-elementowy widżet bezpośrednio w bocznym menu FACEIT. Sprawdzaj swoją dokładną liczbę punktów ELO, odznakę poziomu oraz postęp do kolejnej rangi na bieżąco, bez przechodzenia między podstronami profilu.",
    "benefits": [
      {
        "title": "Stała widoczność ELO",
        "desc": "Twój aktualny rating ELO oraz ranga są zawsze widoczne w pasku bocznym."
      },
      {
        "title": "Kompaktowy format 2-elementowy",
        "desc": "Minimalistyczny, 2-elementowy układ idealnie dopasowany do natywnego wyglądu FACEIT."
      },
      {
        "title": "Śledzenie postępów na bieżąco",
        "desc": "Bieżące monitorowanie zysków i strat punktowych po każdym rozegranym spotkaniu."
      }
    ],
    "audience": "Wszyscy gracze aktywnie śledzący swoje postępy i rozwój rangi na FACEIT."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Wskaźnik wygranych przy wyborze map",
    "category": "PROFIL",
    "summary": "Wyświetla plakietki z procentem wygranych drużyny i gracza na kafelkach map w kolejce.",
    "overview": "Nakłada realne wskaźniki zwycięstw Twoje i Twojej drużyny bezpośrednio na kafelki wyboru map w kolejce FACEIT. W kilka sekund uzgodnijcie ze znajomymi optymalny zestaw map i unikajcie grania na lokacjach, na których notujecie słabsze wyniki.",
    "benefits": [
      {
        "title": "Przejrzyste statystyki zwycięstw",
        "desc": "Rzeczywisty procent zwycięstw widoczny bezpośrednio na kartach map w kolejce."
      },
      {
        "title": "Szybki konsensus drużyny",
        "desc": "Szybkie porozumienie w zespole co do wyboru map przed uruchomieniem wyszukiwania."
      },
      {
        "title": "Wzrost ogólnego winrate'u",
        "desc": "Gra wyłącznie na najlepszych mapach sprzyjająca szybszemu wbijaniu wyższej rangi."
      }
    ],
    "audience": "Gracze stawiający na przemyślany dobór map w oparciu o rzetelne statystyki."
  }
};
