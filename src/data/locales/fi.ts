import type { HumanFeatureData } from './types';

export const fiFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Karttavalikoiman Tutkakaavio Aulassa",
    "category": "OTTELUHUONE",
    "summary": "Näyttää joukkueiden karttavalikoiman tutkan otteluaulassa viimeisen 30 ottelun perusteella.",
    "overview": "FACEITin karttaveto-äänestyksen aikana Peekly muodostaa selkeän tutkakaavion kummankin joukkueen pelaajien viimeisen 30 kilpailullisen ottelun perusteella. Huomaat heti vastustajan mukavuusalueet ja taktiset heikkoudet. Kapteeni voi varmuudella sulkea pois vastustajan vahvimmat kartat ja ohjata oman joukkueensa parhaalle pelialustalleen.",
    "benefits": [
      {
        "title": "Nopea karttavalikoiman arviointi",
        "desc": "Molempien joukkueiden karttavalmiuden suora vertailu kaikissa CS2:n aktiivisissa kilpailukartoissa."
      },
      {
        "title": "Epäsuotuisten karttojen välttäminen",
        "desc": "Suojaa vahinkovalinnoilta karttoihin, joissa vastustajalla on yli 80 %:n voittoprosentti."
      },
      {
        "title": "Taktinen valmius ennen aloitusta",
        "desc": "Koko joukkue saapuu palvelimelle selkeän pelisuunnitelman ja taktisen edun turvin."
      }
    ],
    "audience": "Joukkueen kapteenit, 3–5 hengen ryhmät ja tavoitteelliset soolopelaajat."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Pelaajatilastojen Overlay Ottelussa",
    "category": "OTTELUHUONE",
    "summary": "Näyttää 30 ottelun tilastolaatat ja karttakohtaiset tiedot kunkin pelaajan alla.",
    "overview": "Sinun ei tarvitse enää avata kymmentä erillistä profiilisivua selaimeen. Peekly tuo tärkeimmät ottelutilastot suoraan jokaisen pelaajakortin alle: K/D-suhteen, keskimääräisen vahingon kierroksella (ADR), pääosumaprosentin ja viimeisten 30 ottelun voittoprosentin. Näet kahdessa sekunnissa vastustajan kuumimmat suorittajat ja ailahtelevat tähtääjät.",
    "benefits": [
      {
        "title": "Tärkeimpien uhkien tunnistaminen",
        "desc": "Tunnista vastustajan vaaralliset entry-pelaajat ja tehokkaimmat tarkka-ampujat heti."
      },
      {
        "title": "Kaikki tilastot samassa näkymässä",
        "desc": "Kaikkien pelaajien tilastot yhdellä silmäyksellä ilman profiilien erillistä selaamista."
      },
      {
        "title": "Harkittu HUD-integraatio",
        "desc": "Sulava integrointi otteluhuoneen näkymään ilman turhaa visuaalista kuormitusta."
      }
    ],
    "audience": "Kilpailulliset pelaajat, jotka arvostavat perusteellista otteluun valmistautumista."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Joukkueen Keskimääräinen ELO-Merkki",
    "category": "OTTELUHUONE",
    "summary": "Näyttää selkeät keskimääräisen ELO-arvon laatikot arvoasteikon kuvakkeella tulospalkissa.",
    "overview": "Laskee ja näyttää kummankin joukkueen todellisen keskimääräisen ELO-tason suoraan otteluhuoneen otsikossa arvoasteikon kuvakkeilla. Näet aulan voimasuhteet heti, jotta joukkueesi voi virittäytyä kovaan taisteluun tai pelata varovaisesti suojellakseen pisteytystään.",
    "benefits": [
      {
        "title": "Selkeys aulan tasapainosta",
        "desc": "Tarkka käsitys joukkueiden taitoerosta ja aulan tasapainosta ennen ensimmäistä kierrosta."
      },
      {
        "title": "Ottelun panosten ymmärtäminen",
        "desc": "Ymmärrä haasteen taso ja kamppailun merkitys ennen ensimmäistä kierrosta."
      },
      {
        "title": "Taktinen valmistautuminen",
        "desc": "Vastustajien kokemustason arviointi ja joukkueen pelitempon oikea säätäminen."
      }
    ],
    "audience": "ELO-pisteitä keräävät, soolopelaajat ja tasolle 10 tähtäävät tiimit."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Palvelimen IP:n Automaattinen Kopiointi",
    "category": "OTTELUHUONE",
    "summary": "Kopioi connect-komennon automaattisesti leikepöydälle, kun palvelin on määritetty.",
    "overview": "Heti kun FACEIT määrittää ottelupalvelimen, valmis konsolin connect-komento kopioituu suoraan leikepöydällesi. Osoitteita ei tarvitse etsiä näytöltä: avaa CS2, avaa konsoli (~) ja paina Ctrl+V – yhdistät peliin ensimmäisenä ja ehdit lämmitellä tähtäystä ennen puukkokierrosta.",
    "benefits": [
      {
        "title": "Yhdistäminen sekunneissa",
        "desc": "Yhdistä palvelimelle 3 sekunnissa ilman osoitteiden tai painikkeiden etsimistä."
      },
      {
        "title": "Konsoli valmiina leikepöydällä",
        "desc": "Täydellinen konsolikomento IP-osoitteella, portilla ja salasanalla heti liitettävissä."
      },
      {
        "title": "Etu alkulämmittelyssä",
        "desc": "Ennakkoyhdistämisen etu laadukkaan tähtäyslämmittelyn takaamiseksi ennen pistoolikierrosta."
      }
    ],
    "audience": "Kaikki nopeutta ja helppoutta arvostavat kilpailulliset FACEIT CS2 -pelaajat."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Aulan Keskittymistila",
    "category": "OTTELUHUONE",
    "summary": "Piilottaa pelaajalistat ja tulospalkit, pitäen palvelimen, kartan ja tutkan näkyvillä.",
    "overview": "Kätkee otteluhuoneesta pelaajalistat ja kookkaat tulospalkit jättäen näkyviin vain olennaisen: valitun kartan, palvelintiedot ja taktisen karttavalikoiman tutkakaavion. Vähentää selaimen muistin käyttöä taustalla ja takaa parhaat FPS-lukemat CS2-pelissä.",
    "benefits": [
      {
        "title": "Täysi keskittyminen",
        "desc": "Täysi keskittyminen karttaan, palvelimeen ja tutkaan ilman häiriötekijöitä."
      },
      {
        "title": "Matala muistinkulutus",
        "desc": "Selaimen matala RAM-muistin kuormitus CS2-pelin pyöriessä etualalla."
      },
      {
        "title": "Korkeakontrastinen näkymä",
        "desc": "Selkeä, taktisen tumma teema nopeaa ja vaivatonta vilkaisua varten."
      }
    ],
    "audience": "Pelaajat, jotka arvostavat puhdasta käyttöliittymää ja korkeimpia pelinsisäisiä ruudunpäivitysnopeuksia."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Ottelun Automaattinen Hyväksyntä",
    "category": "AUTOMAATIO",
    "summary": "Vahvistaa valmiustilan automaattisesti ottelun löydyttyä säädettävällä viiveellä.",
    "overview": "Vältä jonotusjäähyt, jotka johtuvat hyväksymispainikkeen huomaamatta jättämisestä. Peekly vahvistaa ottelun valmiustilan automaattisesti heti sen löydyttyä, vaikka olisit hetkeksi poistunut näytön äärestä. Liukusäätimellä voit määrittää luonnollisen 0–10 sekunnin viiveen.",
    "benefits": [
      {
        "title": "Suojaus jonotussanktioilta",
        "desc": "Täysi suoja ottelujonon jäähyjä vastaan ready-checkin vahinkomyöhästymisissä."
      },
      {
        "title": "Mielenrauha jonottaessa",
        "desc": "Mielenrauha pitkien myöhäisillan otteluhakujen aikana."
      },
      {
        "title": "Säädettävä viive (0–10s)",
        "desc": "Säädettävä liukukytkin välittömästä 0s-reaktiosta inhimilliseen 10s-viiveeseen."
      }
    ],
    "audience": "Pitkiä pelisessioita pelaavat, jotka haluavat varmistaa vaivattoman jonotuksen."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Ryhmäkutsujen Automaattinen Hyväksyntä",
    "category": "AUTOMAATIO",
    "summary": "Hyväksyy saapuvat ryhmäkutsut automaattisesti taustalla säädettävällä viiveellä.",
    "overview": "Kun joukkuetoverisi tai kapteenisi lähettää ryhmäkutsun, Peekly hyväksyy sen välittömästi taustalla. 0–10 sekunnin säädettävän viiveen ansiosta liityt tiimiin automaattisesti ilman selainilmoitusten klikkailua.",
    "benefits": [
      {
        "title": "Joukkue kasaan sekunneissa",
        "desc": "Viiden pelaajan tiimi kokoontuu hetkessä ilman manuaalisten klikkausten odottelua."
      },
      {
        "title": "Mukautettava vastausaika",
        "desc": "Mukautettava 0–10 sekunnin vastausviive omien mieltymysten mukaan."
      },
      {
        "title": "Luotettavuus taustalla",
        "desc": "Luotettava toiminta taustalla myös silloin, kun selainikkuna on pienennettynä."
      }
    ],
    "audience": "Vakioryhmät, kaveriporukat ja turnausjoukkueet."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Laajennettu Otteluhistoria",
    "category": "PROFIILI",
    "summary": "Lisää K/R-, ADR- ja PCR-sarakkeet sekä suoran Demo-latauspainikkeen ottelutaulukkoon.",
    "overview": "Laajentaa FACEIT-otteluhistoriaa tarkoilla kilpailumittareilla (K/R, ADR, PCR) ja virallisten .DEM-tallenteiden suoralla latauspainikkeella. PCR-mittari (Peekly Contribution Rating) mittaa pelaajan prosentuaalista osuutta joukkueen voittoihin ja korvaa vanhentuneen RWS-järjestelmän. Algoritmi laskee pisteytyksen tappojen, syöttöjen, ADR:n, avaustappojen (entry frags), voitettujen clutchien ja kranaattihyödyn perusteella. Joukkueen 5 pelaajan summa on aina 100%, jolloin tasapainoisen pelaajan normi on tasan 20%. Demot latautuvat huippunopeudella ilman kolmannen osapuolen sivustoja.",
    "benefits": [
      {
        "title": "Demon lataus 1 napsautuksella",
        "desc": "Virallisten .DEM-tiedostojen suora lataus yhdellä klikkauksella nopeasta CDN-verkosta."
      },
      {
        "title": "PCR-osuusmittari (20% perustaso)",
        "desc": "PCR korvaa RWS:n ja mittaa todellista vaikutusta (tapot, ADR, entryt, clutchit, utility). Joukkueen summa 100%, normi 20%."
      },
      {
        "title": "Nopea jälkipuinti",
        "desc": "Nopea kierrosten, clutch-tilanteiden ja kranaattien analysointi heti ottelun jälkeen."
      }
    ],
    "audience": "Demoja analysoivat pelaajat, taktiikkavalmentajat ja videokoosteiden tekijät."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Sivupalkin ELO-Widget",
    "category": "PROFIILI",
    "summary": "Näyttää kompaktin 2-elementtisen ELO-widgetin taitotasolla ja reaaliaikaisilla pisteillä.",
    "overview": "Upottaa tyylikkään 2-elementtisen widgetin suoraan FACEITin vasempaan sivupalkkiin. Näet tarkan ELO-pisteesi, taitotasosi merkin ja etenemisesi kohti seuraavaa tasoa yhdellä silmäyksellä ilman profiilisivujen latailua.",
    "benefits": [
      {
        "title": "Jatkuva ELO-näkyvyys",
        "desc": "Nykyinen ELO-taso ja arvoasteikon merkki ovat aina näkyvillä sivupalkissa."
      },
      {
        "title": "Kompakti 2-elementtinen ulkoasu",
        "desc": "Kompakti 2-elementtinen rakenne sulautuu saumattomasti FACEITin omaan ilmeeseen."
      },
      {
        "title": "Pistemuutosten välitön seuranta",
        "desc": "Pistemuutosten välitön seuranta jokaisen pelatun ottelun jälkeen."
      }
    ],
    "audience": "Kaikki pelaajat, jotka seuraavat aktiivisesti omaa FACEIT CS2 -luokitustaan."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Voittoprosentit Karttavalitsimessa",
    "category": "PROFIILI",
    "summary": "Näyttää henkilökohtaiset ja joukkueen voittoprosentit suoraan ottelujonon karttalaatoilla.",
    "overview": "Tuo omat ja joukkueesi todelliset voittoprosentit suoraan ottelujonon karttavalintaruutujen päälle. Sovi kavereiden kanssa sekunneissa pelattavat kartat ja vältä hakeutumasta karttoihin, joissa voittoprosenttinne on alhainen.",
    "benefits": [
      {
        "title": "Selkeät voittoprosentit",
        "desc": "Selkeät voittoprosentit näkyvillä suoraan jonotusvaiheen karttakorteissa."
      },
      {
        "title": "Nopea päätös ryhmässä",
        "desc": "Nopea yhteisymmärrys karttavalinnoista ennen otteluhaun käynnistämistä."
      },
      {
        "title": "Voittosuhteen vakaa kasvu",
        "desc": "Pelaa vain vahvimpia karttojasi ja nouse tasoilla nopeammin ja varmemmin."
      }
    ],
    "audience": "Pelaajat, jotka haluavat optimoida karttavalikoimansa todellisen datan pohjalta."
  }
};
