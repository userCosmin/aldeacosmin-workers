import { STORIES } from './stories';
import { GALLERY } from './gallery';

export interface Massif {
  slug: string;
  name: string;
  fullName: string;
  range: string;
  counties: string;
  tagline: string;
  intro: string[];
  highlights: { title: string; text: string }[];
  image: string;
  /** Representative coordinates (summit or documented trailhead). */
  geo: { lat: number; lng: number };
  /** YouTube video IDs from the official channel. */
  videos: { id: string; title: string }[];
}

export const MASSIFS: Massif[] = [
  {
    slug: 'retezat',
    name: 'Retezat',
    fullName: 'Munții Retezat',
    range: 'Carpații Meridionali',
    counties: 'Hunedoara',
    tagline: 'Lacuri glaciare, vârfuri abrupte și o sălbăticie carpatică pură.',
    intro: [
      'Retezatul este masivul cu cel mai spectaculos relief glaciar din România: circuri, morene și peste 80 de lacuri glaciare, adăpostite de o creastă principală care trece de 2.500 m. Aici a fost înființat primul parc național al țării.',
      'Jurnalele de aici merg de la ascensiunea solitară pe Vârful Peleaga, prin furtună și întâlniri cu marmotele, până la circuitul alpin pe Custura Păpușii, cu urcare pe la Tăul Țapului.',
      'În sud, Retezatul Mic schimbă granitul pe calcar: circuitul din Valea Iarului urcă pe platoul carstic până pe Piatra Iorgovanului (2.014 m) și coboară prin Valea Soarbele — 14,3 km și +1.106 m, toamna, deasupra unei mări de nori.',
    ],
    highlights: [
      { title: 'Lacuri glaciare', text: 'Peste 80 de oglinzi de apă — Tăul Țapului, Lacul Pietrele și căldările de sub creastă.' },
      { title: 'Vârful Peleaga', text: 'Cel mai înalt punct al masivului, atins într-o tură de peste 23 km din zona Carnic.' },
      { title: 'Tăul Țapului', text: 'Lacul de sub Custura Păpușii, pe circuitul din Stâna de Râu spre Vârful Păpușa.' },
    ],
    image: 'https://media.aldeacosmin.ro/galerie/muntii-retezat-1.webp',
    geo: { lat: 45.365, lng: 22.89 },
    videos: [
      { id: '4IKMy7UYW9A', title: 'Tăul Țapului - Munții Retezat' },
      { id: 'Xwnt_cBHcd8', title: 'Lacul Pietrele - Munții Retezat' },
    ],
  },
  {
    slug: 'fagaras',
    name: 'Făgăraș',
    fullName: 'Munții Făgăraș',
    range: 'Carpații Meridionali',
    counties: 'Sibiu, Brașov, Argeș',
    tagline: 'Creasta cea mai înaltă a Carpaților românești.',
    intro: [
      'Făgărașul formează cel mai înalt lanț muntos din România, aliniat pe aproape 70 de kilometri de-a lungul frontierei istorice dintre Transilvania și Muntenia. Moldoveanu (2.544 m) și Negoiu (2.535 m) sunt reperele cele mai cunoscute.',
      'Turele documentate pleacă din Ferma de Cerbi, pe la Cabana Bârcaciu, spre Vârful Scara și Vârful Ciortea Vest, cu coborâre pe la Lacul Avrig — zile lungi, cu aproape 2.000 m diferență de nivel.',
      'La polul opus, circuitul scurt de la Bâlea Lac urcă prin Șaua Văiugii pe Vânătarea lui Buteanu (2.507 m) și Capra, cu coborâre pe la Lacul Capra — 6,9 km și +614 m, în întregime în golul alpin.',
      'Pe versantul nordic, traversarea de pe Muchia Drăgușului coboară pe lângă cascade în Valea Sâmbetei, până la Cabana Valea Sâmbetei — 21,4 km și +1.451 m, printre bujori de munte și ceață.',
    ],
    highlights: [
      { title: 'Vârful Scara', text: '22,81 km și +1.797 m pe ultimul segment de creastă, cu gradient de până la 34%.' },
      { title: 'Ciortea Vest & Lacul Avrig', text: 'Circuit de 24,80 km cu peste 2.000 m ascensiune, din Ferma de Cerbi.' },
      { title: 'Vârful Negoiu', text: 'Al doilea vârf al României, surprins în jurnalele video de pe canal.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/varful-scara-cu-florin/traseu-varful-scara.webp',
    geo: { lat: 45.6, lng: 24.736 },
    videos: [
      { id: 'n0eGIvhfDzg', title: 'Vârful Negoiu din Munții Făgăraș' },
      { id: 's4Uf8hxqmvo', title: 'Vârful Negoiu' },
    ],
  },
  {
    slug: 'apuseni',
    name: 'Apuseni',
    fullName: 'Munții Apuseni',
    range: 'Carpații Occidentali',
    counties: 'Alba, Cluj, Bihor',
    tagline: 'Pășuni nesfârșite, peșteri și sate de poveste.',
    intro: [
      'Apusenii sunt munții de acasă — aproape de Alba Iulia, accesibili tot anul și surprinzător de variați: platouri carstice, păduri dese, lacuri de acumulare și sate risipite pe culmi.',
      'De la potecile din Gilău și Lacul Tarnița, la Piatra Șoimului din Mărișel și ascensiunea de iarnă pe Vârful Bihor, fiecare anotimp are aici traseul lui.',
    ],
    highlights: [
      { title: 'Potecile din Gilău', text: 'O zi de primăvară de 12,74 km, cu Lacul Gilău și Lacul Tarnița ca repere.' },
      { title: 'Lacul Tarnița', text: 'Oglinda de apă care însoțește traseele din zona Gilău, la 20–25 de minute de Cluj.' },
      { title: 'Vârful Bihor în iarnă', text: '13,35 km și +954 m prin zăpadă, din Arieșeni până la Stația Meteo.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/piatra-soimului/traseu-piatra-soimului.webp',
    geo: { lat: 46.443, lng: 22.69 },
    videos: [{ id: 'GW4Cgixgi5k', title: 'Lacul Tarnita' }],
  },
  {
    slug: 'rodnei',
    name: 'Rodnei',
    fullName: 'Munții Rodnei',
    range: 'Carpații Orientali',
    counties: 'Maramureș, Bistrița-Năsăud',
    tagline: 'Coloși împăduriți cu lacuri ascunse și ceață.',
    intro: [
      'Munții Rodnei ridică cea mai înaltă creastă din Carpații Orientali, deasupra Borșei și a Maramureșului istoric — păduri boreale, tufărișuri alpine și o creastă principală care se vede de la mare distanță.',
      'Tura documentată urcă din Borșa până pe Vârful Gărgălău (2.158 m), cu o panoramă largă peste creasta principală.',
    ],
    highlights: [
      { title: 'Vârful Gărgălău', text: '14,81 km și +1.005 m din Borșa, prin păduri boreale și tufărișuri alpine.' },
      { title: 'Creasta principală', text: 'Panoramă vastă spre Pietrosul Rodnei și Maramureșul istoric.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/gargalau-muntii-rodnei/gargalau-muntii-rodnei-46.webp',
    geo: { lat: 47.6012, lng: 24.8 },
    videos: [],
  },
  {
    slug: 'trascau',
    name: 'Trascău',
    fullName: 'Munții Trascăului',
    range: 'Munții Apuseni',
    counties: 'Alba',
    tagline: 'Stânci calcaroase și brâne sălbatice.',
    intro: [
      'Trascăul este peretele de calcar de lângă Alba Iulia și Aiud — chei, abrupturi și creste scurte, dar surprinzător de solicitante, cu gradienți care trec de 40%.',
      'Analizele tehnice de aici urmăresc urcarea spre Piatra Cetii din Râcani și circuitul de 22 km până la Releul de la Dealu Stanii, plecat direct din Alba Iulia.',
    ],
    highlights: [
      { title: 'Piatra Cetii', text: '9,29 km cu +813 m și un gradient maxim de 40% pe segmentul final.' },
      { title: 'Releul Dealu Stanii', text: 'Circuit de 22,19 km și +1.069 m, plecat pe jos din Alba Iulia.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/mamut-releu-dealul-stanii/releu-dealul-stanii.webp',
    geo: { lat: 46.2469, lng: 23.4822 },
    videos: [],
  },
  {
    slug: 'maramures',
    name: 'Maramureș',
    fullName: 'Munții Maramureșului',
    range: 'Carpații Orientali',
    counties: 'Maramureș',
    tagline: 'Munți blânzi, păduri dese și tradiție vie.',
    intro: [
      'Munții Maramureșului păstrează una dintre cele mai autentice sălbăticii din nordul României: păduri seculare, creste puțin umblate și sate în care tradiția e încă vie.',
      'Ascensiunea pe Toroioaga — 16 km și peste 1.100 m diferență de nivel — se încheie cu o panoramă de 360° peste tot Maramureșul.',
    ],
    highlights: [
      { title: 'Toroioaga', text: '16,09 km, +1.126 m și o panoramă de 360° de pe vârf.' },
      { title: 'Păduri seculare', text: 'Urcare lungă prin pădure până la crestele sălbatice ale masivului.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/toroioaga-muntii-maramures/toroioaga-muntii-maramures-32.webp',
    geo: { lat: 47.7129, lng: 24.7323 },
    videos: [],
  },
  {
    slug: 'cindrel',
    name: 'Cindrel',
    fullName: 'Munții Cindrel',
    range: 'Carpații Meridionali',
    counties: 'Sibiu',
    tagline: 'Creasta înaltă a Cindrelului, cu păduri boreale și panoramă spre Parâng și Făgăraș.',
    intro: [
      'Cindrelul se ridică deasupra Păltinișului, cu o creastă lungă, rotunjită, de pe care se văd în zilele senine Parângul și Făgărașul.',
      'Tura Păltiniș – Vârful Cindrel a însemnat aproape 33 km pe creastă, într-o zi de mai, alături de doi prieteni.',
    ],
    highlights: [
      { title: 'Vârful Cindrel', text: '2.244 m, atins într-o tură de 32,89 km din Păltiniș.' },
      { title: 'Panorame', text: 'Parângul și Făgărașul la orizont, de pe creasta largă a masivului.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/varful-cindrel/Varful-Cindrel%20(6%20of%2017).webp',
    geo: { lat: 45.577, lng: 23.795 },
    videos: [],
  },
  {
    slug: 'tarcu',
    name: 'Țarcu',
    fullName: 'Munții Țarcu',
    range: 'Carpații Meridionali',
    counties: 'Caraș-Severin',
    tagline: 'Munții ciobanilor — pășuni întinse și o potcoavă de creastă peste 2.000 m.',
    intro: [
      'Țarcu sunt „munții ciobanilor”: pășuni întinse, puține trasee marcate pe creastă și o sălbăticie greu de găsit în alte zone ale Carpaților.',
      'Circuitul din Șaua Jigoriei a adunat într-o singură zi 26 km, +1.534 m ascensiune și cinci vârfuri de peste 2.000 m: Sadovanu, Țarcu, Bodea, Căleanu și Brusturu.',
    ],
    highlights: [
      { title: 'Cinci vârfuri', text: 'Sadovanu, Țarcu, Bodea, Căleanu și Brusturu — într-un singur circuit.' },
      { title: '26 km · +1.534 m', text: 'Circuit de zi din Șaua Jigoriei, cu Căleanu (2.196 m) ca punct culminant.' },
      { title: 'Stația meteo Țarcu', text: 'Reperul vizibil de departe de pe creasta potcoavei.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/muntii_tarcu_iunie_2026/muntiitarcu23.webp',
    geo: { lat: 45.283, lng: 22.533 },
    videos: [{ id: '3YuwX8THWcE', title: 'Varful Țarcu - Muntii Tarcu' }],
  },
  {
    slug: 'cetati-dacice',
    name: 'Cetăți Dacice',
    fullName: 'Cetățile Dacice din Munții Orăștiei',
    range: 'Munții Șureanu',
    counties: 'Hunedoara',
    tagline: 'Poteci printre istorie: peșteri paleolitice și cetăți dacice în Munții Șureanu.',
    intro: [
      'Dealurile verzi ale Munților Șureanu ascund unele dintre cele mai importante situri ale Daciei antice. Drumețiile de aici leagă natura de istorie.',
      'Traseul de 1 Mai pornește de la peștera paleolitică Cioclovina și urcă până la cetatea dacică Piatra Roșie — 14,59 km cu 895 m ascensiune.',
    ],
    highlights: [
      { title: 'Peștera Cioclovina', text: 'Peștera paleolitică de la care pornește traseul spre cetate.' },
      { title: 'Cetatea Piatra Roșie', text: 'Cetate dacică pe culme, la capătul a 14,59 km de potecă.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/cioclovina-piatra-rosie/traseu-pestera-cioclovina.webp',
    geo: { lat: 45.5979, lng: 23.1461 },
    videos: [],
  },
  {
    slug: 'parang',
    name: 'Parâng',
    fullName: 'Munții Parâng',
    range: 'Carpații Meridionali',
    counties: 'Hunedoara, Gorj, Vâlcea',
    tagline: 'Lacuri glaciare, bujori de munte și o creastă lungă peste 2.400 m.',
    intro: [
      'Parângul ridică una dintre cele mai lungi creste ale Carpaților Meridionali, deasupra Văii Jiului, cu Parângul Mare (2.519 m) drept cel mai înalt punct. Sub creastă se înșiră căldări glaciare cu lacuri de toate mărimile.',
      'Prima tură documentată pleacă din stațiunea Parâng și leagă lacurile Mija, Cârja și Verde de Vârful Cârja (2.405 m) — 18,4 km și +1.368 m la început de iunie, între bujori de munte și zăpadă.',
      'A doua urcă de pe Valea Lotrului la Lacul Gâlcescu, cel mai mare lac glaciar din masiv, apoi pe Setea Mare (2.365 m) și Piatra Tăiată, cu coborâre pe la Lacul Zănoaga Mare — 14,6 km și +1.008 m la sfârșit de august.',
    ],
    highlights: [
      { title: 'Lacurile glaciare', text: 'Gâlcescu, Mija, Cârja, Lacul Verde și Zănoaga Mare, plus Tăul Înghețat văzut de pe creastă.' },
      { title: 'Vârful Cârja', text: '2.405 m, atins la finalul unui circuit de 18,4 km din stațiunea Parâng.' },
      { title: 'Bujorii de munte', text: 'La început de iunie, versanții de sub creastă sunt acoperiți de flori.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/parangul-lacurilor-2024/parangul-lacurilor-56.webp',
    geo: { lat: 45.3627, lng: 23.521 },
    videos: [],
  },
  {
    slug: 'ceahlau',
    name: 'Ceahlău',
    fullName: 'Masivul Ceahlău',
    range: 'Carpații Orientali',
    counties: 'Neamț',
    tagline: 'Cetatea de conglomerate de deasupra Lacului Izvorul Muntelui.',
    intro: [
      'Ceahlăul se ridică izolat deasupra Lacului Izvorul Muntelui, cu un platou înalt înconjurat de abrupturi și turnuri de conglomerat. Ocolașul Mare (1.907 m) este cel mai înalt punct, iar Vârful Toaca (1.904 m) este vârful emblematic al masivului, ocrotit de Parcul Național Ceahlău.',
      'Tura documentată urcă de la Cabana Izvorul Muntelui pe bandă albastră, pe la Polița cu Crini, Piatra cu Apă și Detunate, până la Cabana Dochia și pe scările Vârfului Toaca — 15,3 km și +1.268 m în august.',
    ],
    highlights: [
      { title: 'Vârful Toaca', text: '1.904 m, cu stația meteo, scări metalice și Stânca Panaghia alături.' },
      { title: 'Detunatele', text: 'Blocuri uriașe de conglomerat prăbușite, chiar sub platou.' },
      { title: 'Cabana Dochia', text: 'Prima cabană turistică din Carpații Orientali, ridicată în 1913.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/ceahlau-toaca-dochia-2023/ceahlau-toaca-dochia-23.webp',
    geo: { lat: 46.9775, lng: 25.9498 },
    videos: [],
  },
  {
    slug: 'bucegi',
    name: 'Bucegi',
    fullName: 'Munții Bucegi',
    range: 'Carpații Meridionali',
    counties: 'Brașov, Prahova, Dâmbovița',
    tagline: 'Abrupturi de calcar și conglomerat deasupra culoarului Rucăr–Bran.',
    intro: [
      'Bucegii închid spre est Carpații Meridionali, cu un platou înalt mărginit de abrupturi de conglomerat și calcar și cu Vârful Omu, de peste 2.500 m, drept cel mai înalt punct. Latura lor vestică, spre Moieciu și Bran, este cea mai sălbatică și mai puțin umblată.',
      'Tura documentată urcă din Moieciu de Sus pe Vârful Bucșa (1.848 m) și continuă pe muchie până la Strungile Mici și refugiul din Șaua Strunga — 13,8 km și +935 m, în sezonul afinelor.',
    ],
    highlights: [
      { title: 'Vârful Bucșa', text: '1.848 m, vârful înierbat de la capătul muchiei care urcă din Moieciu de Sus.' },
      { title: 'Strungile Mici', text: 'Pereți și colți de calcar la aproape 1.960 m, deasupra abrupturilor vestice.' },
      { title: 'Refugiul Șaua Strunga', text: 'Adăpost de lemn într-una dintre trecătorile clasice ale Bucegilor.' },
    ],
    image: 'https://media.aldeacosmin.ro/articole/bucegi-bucsa-2025/bucegi-bucsa-9.webp',
    geo: { lat: 45.3907, lng: 25.4082 },
    videos: [],
  },
];

export const getMassif = (slug: string) => MASSIFS.find((m) => m.slug === slug);

export interface MassifStats {
  stories: number;
  distanceKm: number;
  ascentM: number;
  summits: string[];
  maxAltitudeM: number;
  readingMinutes: number;
  photos: number;
  videos: number;
}

export function massifStats(slug: string): MassifStats {
  const stories = STORIES.filter((s) => s.massif === slug);
  const massif = getMassif(slug);
  const galleryPhotos = GALLERY.filter((g) => g.massif === slug).length;
  return {
    stories: stories.length,
    distanceKm: stories.reduce((n, s) => n + s.metrics.distanceKm, 0),
    ascentM: stories.reduce((n, s) => n + s.metrics.ascentM, 0),
    summits: [...new Set(stories.flatMap((s) => s.summits))],
    maxAltitudeM: Math.max(0, ...stories.map((s) => s.metrics.maxAltitudeM)),
    readingMinutes: stories.reduce((n, s) => n + s.readingMinutes, 0),
    photos: galleryPhotos,
    videos: (massif?.videos.length ?? 0) + stories.reduce((n, s) => n + s.gallery.filter((g) => g.type === 'video').length, 0),
  };
}
