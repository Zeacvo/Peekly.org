import type { HumanFeatureData } from './types';

export const deFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Map-Pool Radar-Diagramm",
    "category": "MATCHROOM",
    "summary": "Zeigt das Map-Pool-Radar der Teams im Matchroom basierend auf den letzten 30 Spielen an.",
    "overview": "Während der Map-Veto-Phase generiert Peekly ein intuitives Radar-Diagramm basierend auf den letzten 30 Wettkampfspielen jedes Spielers in der Lobby. Sie erkennen sofort die Stärken und ausnutzbaren Schwächen des Gegners. Ihr Kapitän bannt gefährliche Signature-Maps der Kontrahenten zielsicher und führt Ihr Team auf Ihre stärkste Map.",
    "benefits": [
      {
        "title": "Schnelle Map-Pool-Analyse",
        "desc": "Direkter Vergleich der Bereitschaft beider Teams auf allen aktiven CS2-Wettkampfkarten."
      },
      {
        "title": "Ungewollte Picks vermeiden",
        "desc": "Verhindert versehentliche Matches auf Karten, auf denen der Gegner eine Siegquote von über 80% hält."
      },
      {
        "title": "Taktischer Vorsprung vor Rundenstart",
        "desc": "Das gesamte Team betritt den Server mit einem klaren Spielplan und taktischem Selbstvertrauen."
      }
    ],
    "audience": "Teamkapitäne, 3–5er Premade-Lobbys und ambitionierte Solo-Spieler."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Spieler-Statistiken Overlay",
    "category": "MATCHROOM",
    "summary": "Zeigt 30-Spiele-Leistungskarten und Map-Statistiken direkt unter jedem Spieler an.",
    "overview": "Kein Öffnen von 10 separaten Browser-Tabs mehr nötig. Peekly blendet wichtige Kampfwerte direkt unter jeder Spielerkarte ein: K/D-Verhältnis, durchschnittlicher Schaden pro Runde (ADR), Headshot-Quote und die Siegquote der letzten 30 Matches. In zwei Sekunden erkennen Sie gefährliche Top-Performer und instabile Schützen des Gegners.",
    "benefits": [
      {
        "title": "Schlüsseldrohungen sofort erkennen",
        "desc": "Gefährliche Entry-Fragger und treffsichere Sniper des gegnerischen Teams sofort identifizieren."
      },
      {
        "title": "Zentrale Leistungsübersicht",
        "desc": "Alle Spielerdaten übersichtlich auf einem Bildschirm, ohne Profile einzeln aufzurufen."
      },
      {
        "title": "Nahtlose HUD-Integration",
        "desc": "Nahtlose Einbindung in das Interface des Matchrooms ohne visuelle Überladung."
      }
    ],
    "audience": "Wettkampfspieler, die vor Rundenbeginn Wert auf taktische Vorbereitung legen."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Team-Durchschnitts-ELO Badge",
    "category": "MATCHROOM",
    "summary": "Zeigt kontrastreiche Badges des durchschnittlichen Team-ELOs mit Rang-Icon im Matchbanner an.",
    "overview": "Berechnet und zeigt das tatsächliche durchschnittliche ELO beider Teams direkt in der Matchroom-Kopfzeile mit Rang-Symbolen an. Sie sehen sofort das reale Kräfteverhältnis in der Lobby, was Ihnen hilft, sich mental auf starke Gegner vorzubereiten oder vorsichtig zu spielen, um Ihre Wertung zu schützen.",
    "benefits": [
      {
        "title": "Transparenz der Teamstärke",
        "desc": "Genaue Einschätzung des Kräfteverhältnisses und Bewertungsunterschieds vor der ersten Runde."
      },
      {
        "title": "Gefühl für Match-Einsätze",
        "desc": "Sie verstehen die Herausforderung und die Tragweite der Begegnung vorab."
      },
      {
        "title": "Taktisches Mindset",
        "desc": "Die Erfahrung des Gegners einschätzen und das taktische Tempo des Teams anpassen."
      }
    ],
    "audience": "ELO-Grinder, Solo-Spieler und Teams auf dem Weg zu Level 10."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Server-IP automatisch kopieren",
    "category": "MATCHROOM",
    "summary": "Kopiert den connect-Befehl automatisch in die Zwischenablage, sobald der Server zugewiesen ist.",
    "overview": "Sobald FACEIT den dedizierten Match-Server bereitstellt, wird der vollständige connect-Konsolenbefehl automatisch in Ihre Zwischenablage kopiert. Sie müssen keine Adressen auf der Seite suchen. Öffnen Sie einfach CS2, rufen Sie die Konsole (~) auf und drücken Sie Strg+V – Sie verbinden als Erster und können sich vor der Messerrunde einspielen.",
    "benefits": [
      {
        "title": "Blitzschneller Serverbeitritt",
        "desc": "In 3 Sekunden auf den Server verbinden, ohne nach Adressfeldern zu suchen."
      },
      {
        "title": "Einfügebereite Konsole",
        "desc": "Vollständige Konsolenzeile mit IP, Port und Passwort sofort einfügebereit."
      },
      {
        "title": "Vorteil beim Warmup",
        "desc": "Frühzeitiger Serverbeitritt für ein effektives Aim-Warmup vor der Pistolenrunde."
      }
    ],
    "audience": "Alle wettbewerbsorientierten FACEIT CS2-Spieler."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Lobby-Fokusmodus",
    "category": "MATCHROOM",
    "summary": "Blendet Roster und Punktebanner aus und behält Server, Map und Radar im Blick.",
    "overview": "Versteckt Spielerlisten und große Scorebanner im Matchroom und behält ausschließlich das Wesentliche im Fokus: die gewählte Map, die Serververbindung und das taktische Map-Pool-Radar. Reduziert die Speicherlast des Browsers und lenkt Ihre volle Konzentration auf das bevorstehende Match.",
    "benefits": [
      {
        "title": "Fokus ohne Ablenkung",
        "desc": "Volle Konzentration auf Map, Server und Radar ohne unnötige Ablenkung."
      },
      {
        "title": "Geringe Speicherlast",
        "desc": "Geringere Speicherauslastung des Browsers im Hintergrund während CS2 läuft."
      },
      {
        "title": "Kontrastreiche Ansicht",
        "desc": "Kontrastreiches, minimalistisches Dark-Theme für schnelle Lesbarkeit."
      }
    ],
    "audience": "Spieler, die Wert auf eine aufgeräumte Oberfläche und maximale Ingame-FPS legen."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Matchannahme-Check automatisch bestätigen",
    "category": "AUTOMATISIERUNG",
    "summary": "Bestätigt den Bereitschaftsdialog bei Matcherstellung automatisch mit konfigurierbarer Verzögerung.",
    "overview": "Verpassen Sie nie wieder einen Ready-Check und vermeiden Sie nervige Warteschlangen-Cooldowns. Peekly bestätigt den Annahme-Dialog automatisch, selbst wenn Sie kurz abgelenkt sind oder ein anderes Tab geöffnet haben. Ein praktischer Schieberegler ermöglicht die Einstellung einer natürlichen Verzögerung von 0 bis 10 Sekunden.",
    "benefits": [
      {
        "title": "Schutz vor Warteschlangensperren",
        "desc": "Zuverlässiger Schutz vor Queue-Sperren durch unbemerktes Verpassen des Ready-Checks."
      },
      {
        "title": "Sorgenfreies Warten",
        "desc": "Entspanntes Warten auch bei langen nächtlichen Matchmaking-Wartezeiten."
      },
      {
        "title": "Einstellbarer Schieberegler (0–10s)",
        "desc": "Flexibler Schieberegler von sofortiger 0s-Reaktion bis zu menschlicher 10s-Verzögerung."
      }
    ],
    "audience": "Alle Vielspieler, die eine verlässliche und sichere Matchannahme schätzen."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Party-Einladungen automatisch annehmen",
    "category": "AUTOMATISIERUNG",
    "summary": "Nimmt eingehende Party-Einladungen automatisch mit einstellbarer Verzögerung an.",
    "overview": "Wenn Teamkollegen oder Ihr Kapitän eine Gruppeneinladung senden, nimmt Peekly diese sofort im Hintergrund an. Dank der anpassbaren Verzögerung von 0 bis 10 Sekunden treten Sie Ihrer Gruppe automatisch bei, ohne Benachrichtigungen manuell suchen und anklicken zu müssen.",
    "benefits": [
      {
        "title": "Schnelle Teamaufstellung",
        "desc": "Ihr 5er-Team formiert sich in Sekunden, ohne auf manuelle Klicks zu warten."
      },
      {
        "title": "Anpassbare Verzögerung (0–10s)",
        "desc": "Individuell einstellbare Reaktionszeit von 0 bis 10 Sekunden."
      },
      {
        "title": "Zuverlässig im Hintergrund",
        "desc": "Zuverlässige Annahme von Einladungen im Hintergrund, selbst wenn der Browser minimiert ist."
      }
    ],
    "audience": "Premade-Teams, Freundesgruppen und Turniermannschaften."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Erweiterte Match-Historie",
    "category": "PROFIL",
    "summary": "Fügt der Match-Tabelle K/R-, ADR- und PCR-Werte sowie einen direkten Demo-Download hinzu.",
    "overview": "Erweitert die standardmäßige FACEIT-Match-Historie um detaillierte Wettbewerbsmetriken (K/R, ADR, PCR) und 1-Klick-Direktdownloads offizieller Demos (.DEM). Die PCR-Metrik (Peekly Contribution Rating) misst den prozentualen Beitrag eines Spielers zum Teamerfolg und ersetzt das veraltete RWS-System. Der Algorithmus berechnet diesen Wert auf Basis von Kills, Assists, ADR, Entry-Frags, gewonnenen Clutches und Utility-Einsatz. Die Summe aller 5 Teammitglieder beträgt immer 100%, sodass der ideale Richtwert für einen einzelnen Spieler genau 20% beträgt. Demo-Dateien werden direkt mit voller CDN-Geschwindigkeit ohne Drittanbieter-Weiterleitungen heruntergeladen.",
    "benefits": [
      {
        "title": "1-Klick-Demo-Download",
        "desc": "Direkter 1-Klick-Zugriff auf offizielle CS2 .DEM-Dateien von den schnellen FACEIT-CDNs."
      },
      {
        "title": "PCR-Beitragsmetrik (20% Richtwert)",
        "desc": "PCR ersetzt RWS und bewertet den wahren Impact (Kills, ADR, Entrys, Clutches, Utility). Team-Summe ist 100%, Norm pro Spieler ist 20%."
      },
      {
        "title": "Schnelle Rundenanalyse",
        "desc": "Schnelle Analyse von Rundenabläufen, Clutches und Utility-Einsatz direkt nach dem Spiel."
      }
    ],
    "audience": "Spieler zur Demo-Analyse, taktische Coaches und Highlight-Ersteller."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Sidebar ELO-Widget",
    "category": "PROFIL",
    "summary": "Zeigt ein kompaktes 2-Element-Widget mit Rang-Icon und Live-Score in der FACEIT-Leiste.",
    "overview": "Integriert ein kompaktes 2-Element-Widget direkt in die linke Seitenleiste von FACEIT. Behalten Sie Ihr exaktes ELO-Rating, das Level-Badge und den Fortschritt zum nächsten Rang stets im Blick, ohne mehrere Unterseiten aufrufen zu müssen.",
    "benefits": [
      {
        "title": "Permanente ELO-Sichtbarkeit",
        "desc": "Aktuelles Rating und Rangabzeichen sind in der Seitenleiste permanent sichtbar."
      },
      {
        "title": "Kompaktes 2-Element-Layout",
        "desc": "Kompaktes Design, das sich nahtlos in das originale FACEIT-Layout einfügt."
      },
      {
        "title": "Echtzeit-Fortschrittsüberwachung",
        "desc": "Punktgewinne und -verluste nach jedem Spiel direkt und mühelos verfolgen."
      }
    ],
    "audience": "Alle Spieler, die ihren Rangfortschritt auf FACEIT aktiv im Auge behalten."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Map-Auswahl Siegquoten",
    "category": "PROFIL",
    "summary": "Zeigt Siegquoten-Badges für Sie und Ihr Team direkt auf den Map-Kacheln der Queue an.",
    "overview": "Blendet Ihre persönlichen und teambezogenen Siegquoten direkt auf den Kartenauswahl-Kacheln der Matchmaking-Warteschlange ein. Stimmen Sie die Kartenauswahl mit Ihrem Team in Sekundenschnelle ab und vermeiden Sie Lobbys auf Karten mit niedriger Gewinnrate.",
    "benefits": [
      {
        "title": "Klare Siegprozentsätze",
        "desc": "Echte Gewinnquoten direkt auf den Kartenkacheln der Warteschlange ablesen."
      },
      {
        "title": "Schneller Team-Konsens",
        "desc": "Schnelle Übereinkunft mit Freunden über die Kartenauswahl vor dem Start der Suche."
      },
      {
        "title": "Langfristige Winrate steigern",
        "desc": "Nur auf den stärksten Karten spielen und langfristig schneller im Rang aufsteigen."
      }
    ],
    "audience": "Spieler, die ihren Map-Pool datengestützt und strategisch optimieren möchten."
  }
};
