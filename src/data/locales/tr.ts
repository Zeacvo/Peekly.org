import type { HumanFeatureData } from './types';

export const trFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Harita Havuzu Radar Grafiği",
    "category": "MAÇ ODASI",
    "summary": "Son 30 maça dayalı olarak maç lobisinde takımların harita havuzu radarını gösterir.",
    "overview": "FACEIT harita oylama aşamasında Peekly, lobideki her oyuncunun son 30 rekabetçi maçına dayalı sezgisel bir radar grafiği oluşturur. Rakiplerin güçlü olduğu haritaları ve zayıf noktalarını anında tespit edin. Takım kaptanınız rakiplerin tehlikeli haritalarını güvenle yasaklar ve takımınızı en yüksek kazanma oranına sahip olduğunuz haritaya taşır.",
    "benefits": [
      {
        "title": "Hızlı harita havuzu analizi",
        "desc": "CS2 aktif görev havuzundaki tüm haritalarda her iki takımın taktiksel hazırlığını anında kıyaslama."
      },
      {
        "title": "İstenmeyen haritalardan kaçınma",
        "desc": "Rakiplerin %80'in üzerinde kazanma oranına sahip olduğu imza haritalarına yanlışlıkla girmeyi engelleme."
      },
      {
        "title": "Maç öncesi taktiksel güven",
        "desc": "Sunucuya net bir oyun planı ve taktiksel üstünlük bilinciyle girme."
      }
    ],
    "audience": "Takım kaptanları, 3-5 kişilik hazır ekipler ve rekabetçi solo oyuncular."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Maç İçi Oyuncu İstatistikleri Katmanı",
    "category": "MAÇ ODASI",
    "summary": "Her oyuncunun altında 30 maçlık performans plakalarını ve harita dağılımını gösterir.",
    "overview": "Tarayıcıda 10 ayrı profil sekmesi açma zahmetine son. Peekly, temel savaş istatistiklerini doğrudan her oyuncu kartının altında gösterir: K/D oranı, raunt başına ortalama hasar (ADR), kafadan vuruş yüzdesi ve son 30 maçlık galibiyet oranı. İki saniye içinde rakiplerin formda oyuncularını ve istikrarsız nişancılarını kolayca ayırt edin.",
    "benefits": [
      {
        "title": "Kritik tehditleri saniyeler içinde görme",
        "desc": "Rakibin tehlikeli giriş fragcilerini ve yüksek etkili keskin nişancılarını anında tespit etme."
      },
      {
        "title": "Tek ekranda tam genel bakış",
        "desc": "Profillere tek tek tıklamadan tüm oyuncu verilerini tek ekranda görme."
      },
      {
        "title": "Sade ve şık HUD entegrasyonu",
        "desc": "Maç odası arayüzüne görsel kalabalık yaratmadan uyum sağlayan şık tasarım."
      }
    ],
    "audience": "Raunt öncesinde rakip analizi ve taktiksel hazırlığa önem veren oyuncular."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Takım Ortalama ELO Rozeti",
    "category": "MAÇ ODASI",
    "summary": "Skor başlığında rütbe simgesiyle birlikte yüksek kontrastlı takım ortalama ELO haplarını gösterir.",
    "overview": "Her iki takımın gerçek ortalama ELO derecesini rütbe simgeleriyle birlikte doğrudan maç odası başlığında hesaplar ve gösterir. Lobideki güç dengesini anında görerek zorlu rakiplere karşı doğru zihinsel hazırlığı yapabilir veya puanlarınızı korumak için dikkatli bir tempo belirleyebilirsiniz.",
    "benefits": [
      {
        "title": "Lobi güç dengesini netleştirme",
        "desc": "İlk raunttan önce takımlar arasındaki seviye farkını ve lobi dengesini net şekilde anlama."
      },
      {
        "title": "Maçın ciddiyetini kavrama",
        "desc": "İlk raunt başlamadan önce karşılaşmanın zorluk derecesini ve önemini anlayın."
      },
      {
        "title": "Taktiksel zihniyet geliştirme",
        "desc": "Rakibin tecrübesine göre takımın oyun disiplinini ve temposunu optimize etme."
      }
    ],
    "audience": "ELO kasanlar, solo oyuncular ve 10. seviyeyi hedefleyen takımlar."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Sunucu IP'sini Otomatik Kopyalama",
    "category": "MAÇ ODASI",
    "summary": "Sunucu atandığında konsol connect komutunu panoya otomatik olarak kopyalar.",
    "overview": "FACEIT maç sunucusunu atadığı anda, tam konsol connect komutu doğrudan panonuza kopyalanır. Sayfada IP aramakla vakit kaybetmeyin: CS2'yi açın, konsolu (~) açıp Ctrl+V tuşlarına basın; herkesten önce sunucuya bağlanıp bıçak raundu öncesinde nişangahınızı ısıtın.",
    "benefits": [
      {
        "title": "Hızlı sunucu bağlantısı",
        "desc": "Ekrandaki butonları aramadan 3 saniye içinde sunucuya bağlanma."
      },
      {
        "title": "Panoda hazır konsol komutu",
        "desc": "IP, port ve şifreyi içeren eksiksiz konsol komutunu anında yapıştırmaya hazır tutma."
      },
      {
        "title": "Erken ısınma avantajı",
        "desc": "Tabanca raundu öncesinde erkenden girip ısınma avantajı yakalama."
      }
    ],
    "audience": "Hızlı ve konforlu şekilde sunucuya bağlanmak isteyen tüm FACEIT CS2 oyuncuları."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Lobi Odaklanma Modu",
    "category": "MAÇ ODASI",
    "summary": "Oyuncu kadrolarını ve skor panolarını gizler, sunucu, harita ve radarı görünür tutar.",
    "overview": "Maç odasındaki oyuncu listelerini ve gereksiz banner'ları gizleyerek yalnızca kritik unsurları odakta tutar: seçilen harita, sunucu bağlantısı ve taktiksel harita havuzu radarı. Arka planda tarayıcı bellek kullanımını azaltır ve CS2 içinde maksimum FPS elde etmenizi sağlar.",
    "benefits": [
      {
        "title": "Sıfır dikkat dağınıklığı",
        "desc": "Görsel dikkat dağınıklığı olmadan sadece harita, sunucu ve radara odaklanma."
      },
      {
        "title": "Düşük RAM tüketimi",
        "desc": "CS2 çalışırken arka plandaki tarayıcının RAM tüketimini minimumda tutma."
      },
      {
        "title": "Yüksek kontrastlı taktiksel görünüm",
        "desc": "Hızlı okuma için tasarlanmış yüksek kontrastlı taktiksel karanlık tema."
      }
    ],
    "audience": "Sade arayüzleri ve CS2 içinde en yüksek FPS değerlerini hedefleyen oyuncular."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Maç Kontrolünü Otomatik Kabul Etme",
    "category": "OTOMASYON",
    "summary": "Maç bulunduğunda hazır kontrol penceresini ayarlanabilir gecikmeyle otomatik onaylar.",
    "overview": "Kabul et butonunu kaçırdığınız için maç arama cezası alma korkusuna son. Peekly, maç bulunduğunda siz masadan kısa süreliğine ayrılsanız bile hazır onayını otomatik olarak verir. Sezgisel kaydırıcı ile 0 saniyeden 10 saniyeye kadar doğal bir gecikme belirleyebilirsiniz.",
    "benefits": [
      {
        "title": "Bekleme cezalarına tam koruma",
        "desc": "Beklenmedik bir hazır kontrolünü kaçırmaktan kaynaklanan sıra cezalarından tam koruma."
      },
      {
        "title": "Sıra bekleme huzuru",
        "desc": "Gece saatlerindeki uzun maç arama sıralarında masadan güvenle ayrılabilme rahatlığı."
      },
      {
        "title": "Ayarlanabilir gecikme (0–10s)",
        "desc": "Anında 0s tepkiden insani 10s gecikmeye kadar ayarlanabilir kaydırıcı."
      }
    ],
    "audience": "Uzun oyun seansları yapan ve sıra güvenliğine önem veren tüm oyuncular."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Grup Davetlerini Otomatik Kabul Etme",
    "category": "OTOMASYON",
    "summary": "Gelen grup davetlerini ayarlanabilir gecikmeyle arka planda otomatik olarak kabul eder.",
    "overview": "Takım arkadaşlarınız veya kaptanınız grup daveti gönderdiğinde Peekly daveti arka planda hemen kabul eder. 0 ila 10 saniyelik ayarlanabilir yanıt aralığıyla bildirimleri aramak zorunda kalmadan ekibinize katılırsınız.",
    "benefits": [
      {
        "title": "Ekibin hızla toplanması",
        "desc": "5 kişilik ekibiniz manuel tıklamalar beklemeden saniyeler içinde lobide toplanır."
      },
      {
        "title": "Özelleştirilebilir yanıt aralığı",
        "desc": "0 ila 10 saniye arasında dilediğiniz gibi özelleştirilebilir yanıt gecikmesi."
      },
      {
        "title": "Arka planda kararlı çalışma",
        "desc": "Tarayıcı simge durumuna küçültülmüş olsa bile arka planda sorunsuz çalışma."
      }
    ],
    "audience": "Hazır takımlar, arkadaş grupları ve turnuva ekipleri."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Gelişmiş Maç Geçmişi",
    "category": "PROFİL",
    "summary": "Maç tablosuna K/R, ADR, PCR sütunlarını ve doğrudan Demo indirme düğmesini ekler.",
    "overview": "Standart FACEIT maç geçmişini detaylı rekabetçi göstergeler (K/R, ADR, PCR) ve tek tıkla resmi demo (.DEM) indirme butonuyla zenginleştirir. PCR (Peekly Contribution Rating) metriği, oyuncunun takım galibiyetine yaptığı yüzde katkıyı gösterir ve eski RWS sisteminin yerini alır. Algoritma; skorlar, asistler, raunt başına ortalama hasar (ADR), açılış skorları, kazanılan clutch durumları ve bomba kullanımını (utility) harmanlar. 5 kişilik takımın toplam PCR değeri her zaman %100'dür; dolayısıyla dengeli bir oyuncunun hedef normu tam %20'dir. Demolar harici sitelere yönlendirilmeden en yüksek CDN hızında indirilir.",
    "benefits": [
      {
        "title": "Tek tıkla demo indirme",
        "desc": "Resmi CS2 .DEM kayıtlarına FACEIT CDN üzerinden tek tıkla tam hızda erişim."
      },
      {
        "title": "PCR Katkı Metriği (%20 Standart)",
        "desc": "PCR, RWS'nin yerini alarak gerçek etkiyi (skor, ADR, entry, clutch, utility) tartar. Takım toplamı %100, oyuncu normu %20'dir."
      },
      {
        "title": "Maç sonrası hızlı analiz",
        "desc": "Maç biter bitmez kritik rauntları, clutch anlarını ve bomba kullanımlarını hızlıca inceleme."
      }
    ],
    "audience": "Gelişim için demoları izleyen oyuncular, taktiksel koçlar ve içerik üreticileri."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Kenar Çubuğu ELO Bileşeni",
    "category": "PROFİL",
    "summary": "FACEIT rayında beceri seviyesi simgesi ve canlı puan ile kompakt 2 elemanlı ELO bileşeni gösterir.",
    "overview": "FACEIT sol kenar çubuğuna doğrudan 2 elemanlı şık bir bileşen entegre eder. Birden fazla profil sayfasını dolaşmadan kesin ELO puanınızı, seviye rozetinizi ve bir sonraki seviyeye olan ilerlemenizi her an tek bakışta görün.",
    "benefits": [
      {
        "title": "Sürekli ELO görünürlüğü",
        "desc": "Güncel ELO puanınız ve rütbe rozetiniz kenar çubuğunda her zaman görünür kalır."
      },
      {
        "title": "Minimalist 2 elemanlı düzen",
        "desc": "FACEIT'in orijinal arayüzüne mükemmel şekilde uyum sağlayan minimalist 2 elemanlı yapı."
      },
      {
        "title": "Canlı ilerleme takibi",
        "desc": "Her maç sonrasında kazanılan veya kaybedilen puanları anında takip edebilme."
      }
    ],
    "audience": "FACEIT CS2 derecesini ve kişisel gelişimini aktif olarak takip eden tüm oyuncular."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Harita Seçicide Kazanma Oranları",
    "category": "PROFİL",
    "summary": "Eşleştirme sırası harita karolarında doğrudan kişisel ve takım kazanma oranı rozetlerini gösterir.",
    "overview": "FACEIT eşleştirme sırasındaki harita seçim karolarının üzerine kişisel ve takım kazanma oranlarınızı doğrudan yansıtır. Arkadaşlarınızla saniyeler içinde hangi haritaların seçileceğine karar verin ve kazanma oranınızın düşük olduğu haritalara denk gelmekten kaçının.",
    "benefits": [
      {
        "title": "Net kazanma yüzdeleri",
        "desc": "Sıradaki harita kartları üzerinde gerçek kazanma yüzdelerini açıkça görme."
      },
      {
        "title": "Ekip içi hızlı mutabakat",
        "desc": "Aramaya başlamadan önce arkadaşlarla harita seçiminde saniyeler içinde mutabakat sağlama."
      },
      {
        "title": "Uzun vadeli kazanma oranını artırma",
        "desc": "Yalnızca en güçlü olduğunuz haritalarda oynayarak rütbenizi daha hızlı yükseltme."
      }
    ],
    "audience": "Harita havuzunu verilere dayalı stratejik şekilde yönetmek isteyen oyuncular."
  }
};
