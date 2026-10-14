import type { HumanFeatureData } from './types';

export const daFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Kortpulje Radardiagram i Lobby",
    "category": "KAMPRUM",
    "summary": "Viser holdenes banepulje-radar i kampens lobby baseret på de sidste 30 kampe.",
    "overview": "Under veto-afstemningen genererer Peekly et intuitivt radardiagram baseret på de seneste 30 konkurrencekampe for samtlige spillere i lobbyen. Du ser straks modstanderens stærke maps og svagheder. Holdets kaptajn fravælger sikkert fjendens signaturkort og styrer holdet mod jeres stærkeste bane.",
    "benefits": [
      {
        "title": "Hurtig kortpulje-analyse",
        "desc": "Direkte sammenligning af begge holds taktiske parathed på alle aktive CS2-kort."
      },
      {
        "title": "Undgå uønskede baner",
        "desc": "Beskytter mod utilsigtede kampe på baner, hvor modstanderne har over 80% sejrsrate."
      },
      {
        "title": "Taktisk forspring før start",
        "desc": "Hele holdet går ind på serveren med en klar plan og taktisk overskud."
      }
    ],
    "audience": "Holdkaptajner, 3–5 mands hold og ambitiøse solosøgende spillere."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Spillerstatistik Overlay i Kampen",
    "category": "KAMPRUM",
    "summary": "Viser 30-kamps præstationskort og baneopdeling direkte under hver spiller.",
    "overview": "Slut med at åbne 10 separate profilfaner i browseren. Peekly viser de vigtigste kampmålinger direkte under hver spillers kort: K/D-forhold, gennemsnitlig skade pr. runde (ADR), headshot-procent og sejrsrate for de sidste 30 kampe. På to sekunder ser du, hvem der er i topform, og hvem der kæmper med sigtet.",
    "benefits": [
      {
        "title": "Hurtig trusselsvurdering",
        "desc": "Identificér straks farlige entry-fraggers og modstanderens mest afgørende snipere."
      },
      {
        "title": "Samlet overblik ét sted",
        "desc": "Fuld præstationsoversigt samlet på én skærm uden at åbne eksterne profiler."
      },
      {
        "title": "Ren HUD-integration",
        "desc": "Elegant design, der integreres naturligt i lobbyen uden at forstyrre overblikket."
      }
    ],
    "audience": "Konkurrencespillere, der lægger vægt på grundig forberedelse før runden."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Gennemsnitlig Hold-ELO Badge",
    "category": "KAMPRUM",
    "summary": "Viser tydelige badges for gennemsnitlig hold-ELO med rangikon i resultatbanneret.",
    "overview": "Beregner og viser det sande gennemsnitlige ELO for begge hold direkte i kamprummets top med rangikoner. Du ser straks den reelle styrkebalance i lobbyen, så dit hold kan indstille sig mentalt på svære modstandere eller spille forsigtigt for at beskytte jeres rating.",
    "benefits": [
      {
        "title": "Klarhed over lobbybalancen",
        "desc": "Nøjagtig vurdering af niveauforskellen mellem holdene inden første runde."
      },
      {
        "title": "Forståelse for kampens indsats",
        "desc": "Forstå udfordringsniveauet og kampens betydning inden første runde."
      },
      {
        "title": "Taktisk indstilling",
        "desc": "Vurdering af modstanderens erfaring for at tilpasse holdets spiltempo."
      }
    ],
    "audience": "ELO-grindere, solospillere og hold, der sigter mod Level 10."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Automatisk Kopiering af Server-IP",
    "category": "KAMPRUM",
    "summary": "Kopierer automatisk connect-kommandoen til udklipsholderen, når serveren tildeles.",
    "overview": "Så snart FACEIT tildeler den dedikerede kampserver, kopieres den komplette connect-konsolkommando direkte til din udklipsholder. Du slipper for at lede efter adressen på siden: åbn CS2, åbn konsollen (~) og tryk Ctrl+V – du tilslutter før alle andre og kan varme sigtet op før knivrunden.",
    "benefits": [
      {
        "title": "Lynhurtig servertilslutning",
        "desc": "Tilslut til serveren på 3 sekunder uden at lede efter knapper på skærmen."
      },
      {
        "title": "Klar til indsættelse",
        "desc": "Komplet konsolstreng med IP, port og adgangskode klar til indsættelse."
      },
      {
        "title": "Fordel ved opvarmning",
        "desc": "Tidlig tilslutning for at opvarme dit sigte i god tid før pistolrunden."
      }
    ],
    "audience": "Alle konkurrenceprægede FACEIT CS2-spillere, der ønsker maksimal hastighed."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Lobby Fokus-Tilstand",
    "category": "KAMPRUM",
    "summary": "Skjuler holdlister og resultatbannere og viser kun server, kort og radar.",
    "overview": "Skjuler spillerlister og overflødige bannere i kamprummet, så kun det vigtigste forbliver synligt: den valgte bane, serverforbindelsen og det taktiske radardiagram. Reducerer browserens hukommelsesforbrug i baggrunden og sikrer maksimale FPS i CS2.",
    "benefits": [
      {
        "title": "Nul distraktioner",
        "desc": "100% fokus på bane, server og radar uden visuelle distraktioner."
      },
      {
        "title": "Lavt hukommelsesforbrug",
        "desc": "Mindre RAM-forbrug i browseren i baggrunden, mens CS2 kører."
      },
      {
        "title": "Skarp kontrast og overblik",
        "desc": "Mørkt, taktisk tema med høj kontrast designet til lynhurtig aflæsning."
      }
    ],
    "audience": "Spillere, der foretrækker en ren brugerflade og højest mulige FPS i CS2."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Automatisk Accept af Kamp",
    "category": "AUTOMATISERING",
    "summary": "Bekræfter automatisk klar-dialogen, når en kamp findes, med justerbar forsinkelse.",
    "overview": "Slip for kø-straf fordi du overså accept-knappen. Peekly bekræfter automatisk klar-dialogen, så snart en kamp oprettes, selv hvis du kortvarigt har forladt skrivebordet. En intuitiv skyder lader dig vælge en naturlig forsinkelse fra 0 til 10 sekunder.",
    "benefits": [
      {
        "title": "Undgå karrantæner i køen",
        "desc": "Total beskyttelse mod kø-karantæner forårsaget af et overset ready-check."
      },
      {
        "title": "Tryghed under ventetiden",
        "desc": "Ro i sindet ved lange ventetider i køen om natten."
      },
      {
        "title": "Indstillelig forsinkelse (0–10s)",
        "desc": "Justerbar skyder: fra øjeblikkelig 0s-respons til 10 sekunders forsinkelse."
      }
    ],
    "audience": "Alle med lange spilsessioner, der ønsker en sikker og pålidelig køoplevelse."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Automatisk Accept af Gruppeinvitationer",
    "category": "AUTOMATISERING",
    "summary": "Accepterer automatisk indkommende gruppeinvitationer med justerbar forsinkelse.",
    "overview": "Når holdkammerater eller din kaptajn sender en gruppeinvitation, accepterer Peekly den automatisk i baggrunden. Med en justerbar forsinkelse på 0 til 10 sekunder samles I lynhurtigt uden behov for at klikke på browsernotifikationer.",
    "benefits": [
      {
        "title": "Hurtig samling af holdet",
        "desc": "Dit 5-mands hold samles på sekunder uden at vente på manuelle klik."
      },
      {
        "title": "Fleksibelt svarinterval",
        "desc": "Tilpas svartiden fra 0 til 10 sekunder efter eget ønske."
      },
      {
        "title": "Stabil drift i baggrunden",
        "desc": "Stabil funktion i baggrunden, selv når browservinduet er minimeret."
      }
    ],
    "audience": "Faste hold, vennegrupper og turneringshold."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Udvidet Kamphistorik",
    "category": "PROFIL",
    "summary": "Tilføjer K/R-, ADR- og PCR-kolonner samt direkte Demo-download til kamptabellen.",
    "overview": "Forbedrer din FACEIT-kamphistorik med detaljerede målinger (K/R, ADR, PCR) og direkte et-kliks download af officielle kampdemoer (.DEM). PCR-målingen (Peekly Contribution Rating) viser en spillers procentvise bidrag til holdets sejre og erstatter det forældede RWS-system. Algoritmen beregner værdien ud fra drab, assists, ADR, åbningsdrab (entry frags), vundne clutches og effektiv utility. Summen af alle 5 spillere giver altid 100%, hvilket gør 20% til den ideelle baseline for en balanceret spiller. Filer downloades ved fuld CDN-hastighed uden mellemmænd.",
    "benefits": [
      {
        "title": "1-klik Demo Download",
        "desc": "Download officielle .DEM-filer med 1 klik direkte fra FACEITs hurtige CDN."
      },
      {
        "title": "PCR-bidragsmetrik (20% baseline)",
        "desc": "PCR erstatter RWS og måler reel impact (drab, ADR, entries, clutches, granater). Holdtotal er 100%, norm pr. spiller er 20%."
      },
      {
        "title": "Effektiv analyse efter kamp",
        "desc": "Hurtig gennemgang af vigtige runder, clutches og granatbrug umiddelbart efter kampen."
      }
    ],
    "audience": "Spillere der gennemgår demoer, taktiske trænere og skabere af highlights."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Sidebar ELO-Widget",
    "category": "PROFIL",
    "summary": "Viser kompakt 2-elements ELO-widget med færdighedsikon og aktuel score i sidemenuen.",
    "overview": "Integrerer en elegant 2-elements widget direkte i venstre sidemenu på FACEIT. Hold altid øje med dit præcise ELO-tal, rangmærke og fremskridt mod næste niveau uden at skulle navigere rundt mellem profilsider.",
    "benefits": [
      {
        "title": "Synligt ELO hele tiden",
        "desc": "Dit aktuelle ELO og rangmærke er altid synligt i sidemenuen."
      },
      {
        "title": "Kompakt 2-elements format",
        "desc": "Minimalistisk 2-elements format, der smelter naturligt sammen med FACEIT."
      },
      {
        "title": "Løbende fremgangssporing",
        "desc": "Løbende overblik over pointændringer umiddelbart efter hver spillet kamp."
      }
    ],
    "audience": "Alle spillere, der aktivt følger deres rating og fremgang på FACEIT."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Sejrsrate på Kortvælger",
    "category": "PROFIL",
    "summary": "Viser personlige og holdmæssige sejrsrater direkte på kortfelterne i matchkøen.",
    "overview": "Viser dine og holdets reelle sejrsrater direkte oven på kortfelterne i FACEIT-køen. Aftal på få sekunder med vennerne, hvilke kort der skal vælges, og undgå at søge kampe på baner, hvor jeres sejrsrate er lav.",
    "benefits": [
      {
        "title": "Klare sejrsprocenter",
        "desc": "Tydelig oversigt over reelle sejrsprocenter direkte på kortkortene i køen."
      },
      {
        "title": "Hurtig enighed i truppen",
        "desc": "Hurtig enighed på holdet om kortvalg, inden søgningen sættes i gang."
      },
      {
        "title": "Højere sejrsrate på sigt",
        "desc": "Spil udelukkende på jeres stærkeste baner for at stige hurtigere i rang."
      }
    ],
    "audience": "Spillere, der ønsker at optimere deres kortvalg baseret på konkrete statistikker."
  }
};
