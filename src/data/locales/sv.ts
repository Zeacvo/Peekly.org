import type { HumanFeatureData } from './types';

export const svFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Kartpools Radardiagram i Lobby",
    "category": "MATCHRUM",
    "summary": "Visar lagens kartpoolsradar i matchlobbyn baserat på de senaste 30 matcherna.",
    "overview": "Under kartvetoomröstningen genererar Peekly ett intuitivt radardiagram baserat på de senaste 30 tävlingsmatcherna för samtliga spelare i lobbyn. Du ser direkt motståndarnas favoritkartor och svagheter. Kaptenen kan tryggt banna motståndarnas starkaste val och leda laget till er mest vinstrika karta.",
    "benefits": [
      {
        "title": "Snabb överblick av kartpoolen",
        "desc": "Direkt jämförelse av båda lagens taktiska beredskap på alla aktiva CS2-kartor."
      },
      {
        "title": "Undvik oönskade kartor",
        "desc": "Förhindrar oavsiktliga matcher på kartor där motståndarna har över 80 % vinstgrad."
      },
      {
        "title": "Taktiskt övertag från start",
        "desc": "Hela laget kliver in på servern med en tydlig matchplan och mentalt övertag."
      }
    ],
    "audience": "Lagkaptener, 3–5 spelar-stacks och ambitiösa solospelare."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Spelarstatistik Overlay i Matchen",
    "category": "MATCHRUM",
    "summary": "Visar statistikbrickor för 30 matcher och kartuppdelning under varje spelare.",
    "overview": "Slipp öppna 10 separata webbläsarflikar för profiler. Peekly visar de viktigaste stridsmåtten direkt under varje spelarkort: K/D-kvot, genomsnittlig skada per runda (ADR), headshot-procent och vinstgrad under de senaste 30 matcherna. På två sekunder ser du vem som är i toppform och vem som har en svag siktessvacka.",
    "benefits": [
      {
        "title": "Snabb hotidentifiering",
        "desc": "Identifiera direkt farliga entry-fraggers och avgörande krypskyttar hos motståndaren."
      },
      {
        "title": "Allt samlat på en skärm",
        "desc": "Fullständig spelarstatistik samlad på en skärm utan att klicka på externa profillänkar."
      },
      {
        "title": "Ren HUD-integration",
        "desc": "Smidig HUD-integration i matchrummet som smälter in utan visuell rörighet."
      }
    ],
    "audience": "Tävlingsinriktade spelare som värdesätter noggranna förberedelser inför varje runda."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Genomsnittlig Lag-ELO Badge",
    "category": "MATCHRUM",
    "summary": "Visar kontrastrika brickor för lagets genomsnittliga ELO med rankikon i resultatbannern.",
    "overview": "Beräknar och visar båda lagens verkliga genomsnittliga ELO direkt i matchrummets sidhuvud med rankikoner. Se lobbyns styrkebalans omedelbart, vilket hjälper er att ladda upp mentalt inför tuffa motståndare eller spela taktiskt för att försvara er rating.",
    "benefits": [
      {
        "title": "Tydlig balans i lobbyn",
        "desc": "Tydlig insikt i nivåskillnaden mellan lagen innan den första rundan startar."
      },
      {
        "title": "Medvetenhet om matchinsatser",
        "desc": "Förstå utmaningens nivå och matchens tyngd innan första rundan börjar."
      },
      {
        "title": "Taktiskt fokus",
        "desc": "Bedöm motståndarnas erfarenhet och kalibrera lagets taktiska matchtempo."
      }
    ],
    "audience": "ELO-grinders, solospelare och lag med siktet inställt på Level 10."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Automatisk Kopiering av Server-IP",
    "category": "MATCHRUM",
    "summary": "Kopierar automatiskt connect-kommandot till urklipp när servern har tilldelats.",
    "overview": "Så fort FACEIT tilldelar er matchserver kopieras det kompletta connect-konsolkommandot direkt till urklipp. Du behöver inte leta efter IP-adressen på sidan: öppna CS2, ta fram konsolen (~) och tryck Ctrl+V – du ansluter först av alla och hinner värma upp siktet innan knivrundan.",
    "benefits": [
      {
        "title": "Blixtsnabb anslutning",
        "desc": "Anslut till servern på 3 sekunder utan att leta efter knappar eller adresser."
      },
      {
        "title": "Redo att klistra in",
        "desc": "Komplett konsolrad med IP, port och lösenord direkt redo att klistras in."
      },
      {
        "title": "Uppvärmningsförsprång",
        "desc": "Gå in tidigt på servern och få upp siktet i god tid före pistolrundan."
      }
    ],
    "audience": "Alla tävlingsspelare på FACEIT CS2 som vill ansluta snabbt och effektivt."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Lobby Fokusläge",
    "category": "MATCHRUM",
    "summary": "Döljer laguppställningar och poängbannrar och behåller server, karta och radar synliga.",
    "overview": "Döljer spelarlistor och skrymmande poängbannrar i matchrummet och lämnar endast det viktigaste i fokus: vald karta, serveranslutning och den taktiska kartpoolradarn. Minskar webbläsarens minnesanvändning i bakgrunden och optimerar din FPS i CS2.",
    "benefits": [
      {
        "title": "Noll distraktioner",
        "desc": "Fullt fokus på karta, server och radar utan onödiga visuella distraktioner."
      },
      {
        "title": "Låg minnesanvändning",
        "desc": "Låg minnesbelastning från webbläsaren i bakgrunden medan CS2 körs."
      },
      {
        "title": "Högkontrastvy",
        "desc": "Mörkt, taktiskt tema med hög kontrast optimerat för blixtsnabb avläsning."
      }
    ],
    "audience": "Spelare som föredrar ett stilrent gränssnitt och högsta möjliga FPS i CS2."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Acceptera Match Automatiskt",
    "category": "AUTOMATION",
    "summary": "Bekräftar automatiskt matchkontrollen när match hittas med inställbar fördröjning.",
    "overview": "Slipp köspärrar orsakade av att du missat bekräfta matchen. Peekly bekräftar dialogrutan automatiskt så fort matchen skapas, även om du tillfälligt lämnat skärmen. Ett intuitivt skjutreglage låter dig välja en naturlig fördröjning från 0 till 10 sekunder.",
    "benefits": [
      {
        "title": "Skydd mot köcooldowns",
        "desc": "Fullständigt skydd mot köspärrar och cooldowns vid missad matchkontroll."
      },
      {
        "title": "Sinnesro vid sena köer",
        "desc": "Trygghet att kunna kliva ifrån under långa matchningsköer sena kvällar."
      },
      {
        "title": "Justerbart reglage (0–10s)",
        "desc": "Inställbart reglage från omedelbar respons (0s) upp till 10 sekunders fördröjning."
      }
    ],
    "audience": "Alla som spelar längre pass och vill säkerställa smidig matchning i kön."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Acceptera Gruppinbjudningar Automatiskt",
    "category": "AUTOMATION",
    "summary": "Accepterar automatiskt inkommande gruppinbjudningar med anpassningsbar fördröjning.",
    "overview": "När lagkamrater eller din kapten skickar en inbjudan till gruppen accepterar Peekly den direkt i bakgrunden. Med en anpassningsbar fördröjning på 0 till 10 sekunder ansluter du till truppen utan att behöva leta efter webbläsarnotiser.",
    "benefits": [
      {
        "title": "Snabb truppsamling",
        "desc": "Hela din 5-mannatrupp samlas på några sekunder utan manuella klick."
      },
      {
        "title": "Anpassningsbar fördröjning",
        "desc": "Anpassa svarstiden från 0 till 10 sekunder efter eget önskemål."
      },
      {
        "title": "Pålitlig bakgrundsdrift",
        "desc": "Pålitlig funktion i bakgrunden även när webbläsarfönstret är minimerat."
      }
    ],
    "audience": "Fasta lag, kompisgäng och turneringslag."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Förbättrad Matchhistorik",
    "category": "PROFIL",
    "summary": "Lägger till K/R-, ADR- och PCR-kolumner samt direkt demo-nedladdning i matchtabellen.",
    "overview": "Förbättrar matchhistoriken på FACEIT med mätvärden (K/R, ADR, PCR) och direkt nedladdning av officiella demos (.DEM) med ett klick. Mätvärdet PCR (Peekly Contribution Rating) mäter spelarens procentuella bidrag till lagets framgång och ersätter gamla RWS. Algoritmen väger in kills, assists, genomsnittlig skada (ADR), entry kills, vunna clutches och granatnytta. Lagets 5 spelare summerar alltid till 100%, vilket innebär att referensvärdet för en balanserad spelare är exakt 20%. Repriser laddas ner med full CDN-fart utan externa omvägar.",
    "benefits": [
      {
        "title": "Demo-nedladdning med 1 klick",
        "desc": "Ladda ner officiella .DEM-filer med 1 klick direkt från FACEITs snabba CDN."
      },
      {
        "title": "PCR-bidragsmetrik (20% riktmärke)",
        "desc": "PCR ersätter RWS och mäter verklig inverkan (kills, ADR, entries, clutches, utility). Lagsumman är 100%, norm per spelare är 20%."
      },
      {
        "title": "Snabb matchutvärdering",
        "desc": "Snabb genomgång av avgörande rundor, clutches och granatanvändning efter matchen."
      }
    ],
    "audience": "Spelare som granskar demor för utveckling, taktiska coacher och highlight-skapare."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Sidebar ELO-Widget",
    "category": "PROFIL",
    "summary": "Visar kompakt 2-elements ELO-widget med skicklighetsikon och livescore i sidopanelen.",
    "overview": "Integrerar en snygg 2-elements widget direkt i FACEITs vänstra sidopanel. Håll alltid koll på ditt exakta ELO-betyg, rankmärke och framsteg mot nästa nivå med en snabb blick, utan att behöva bläddra mellan profilsidor.",
    "benefits": [
      {
        "title": "Konstant ELO-synlighet",
        "desc": "Ditt aktuella ELO och rankmärke är alltid synliga i sidopanelen."
      },
      {
        "title": "Minimalistiskt 2-elementsformat",
        "desc": "Kompakt 2-elementsformat som smälter in naturligt i FACEITs gränssnitt."
      },
      {
        "title": "Följ din rating i realtid",
        "desc": "Följ poängförändringar direkt efter varje avslutad match."
      }
    ],
    "audience": "Alla spelare som aktivt följer sin ratingutveckling på FACEIT CS2."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Vinstgrad i Kartväljaren",
    "category": "PROFIL",
    "summary": "Visar personliga och lagets vinstgradsmärken direkt på kartbrickorna i matchningskön.",
    "overview": "Visar dina och lagets verkliga vinstgrader direkt ovanpå kartvalskorten i FACEIT-kön. Kom överens med vännerna på några sekunder om vilka kartor som ska väljas och undvik att köa på kartor där ni har låg vinstchans.",
    "benefits": [
      {
        "title": "Tydliga vinstprocent",
        "desc": "Tydliga vinstprocent visas direkt på kartkorten i matchningskön."
      },
      {
        "title": "Snabbt konsensus i truppen",
        "desc": "Snabbt samförstånd i laget om kartvalet innan sökningen påbörjas."
      },
      {
        "title": "Öka långsiktig vinstgrad",
        "desc": "Klättra snabbare i rank genom att uteslutande spela på era starkaste kartor."
      }
    ],
    "audience": "Spelare som vill hantera sin kartpool strategiskt med stöd av tillförlitlig data."
  }
};
