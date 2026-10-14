export type PortfolioFilter = 'corporate' | 'hospitality' | 'entertainment';

export const PORTFOLIO_FILTERS: { id: 'all' | PortfolioFilter; label: string }[] = [
  { id: 'all', label: 'Toate' },
  { id: 'corporate', label: 'Corporate & Industrial' },
  { id: 'hospitality', label: 'Ospitalitate & Turism' },
  { id: 'entertainment', label: 'Entertainment & VR' },
];

export interface PortfolioProject {
  slug: string;
  domain: string;
  url: string;
  /** Client / brand name */
  client: string;
  title: string;
  filter: PortfolioFilter;
  category: string;
  summary: string;
  description: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  /** What was delivered — described by outcome, not by technology. */
  services: string[];
  /** Base name of the screenshot in /public/portfolio ({shot}-640.webp, {shot}-1280.webp). */
  shot: string;
  accent: string;
  featured: boolean;
}

export const PROJECTS: PortfolioProject[] = [
  {
    slug: 'florea-grup',
    domain: 'floreagrup.ro',
    url: 'https://floreagrup.ro',
    client: 'Florea Grup',
    title: 'Florea Grup — 30 de ani de excelență românească',
    filter: 'corporate',
    category: 'Corporate & Industrial',
    summary:
      'Platformă corporate bilingvă pentru aniversarea a trei decenii (1996–2026) a unuia dintre liderii naționali în construcții, producție și infrastructură.',
    description:
      'Platformă corporate bilingvă (RO/EN) creată pentru aniversarea a trei decenii (1996–2026) a unuia dintre liderii naționali în construcții, producție și infrastructură. Arhitectură informațională pentru 9 divizii integrate — Betoane, Prefabricate Petra Pavaje, Mixturi Asfaltice, Agregate de Carieră, Construcții civile și industriale, Florea Oil (11 stații), Ospitalitate, Închirieri Utilaje (flotă de 320+ utilaje) și Laborator Construcții — un portofoliu de lucrări de referință (Reabilitarea Cetății Alba Iulia, Centura Sibiu) și o secțiune de sustenabilitate: 7 parcuri fotovoltaice, flotă electrică și peste 42.000 de puieți plantați.',
    highlights: ['Bilingv RO/EN', 'Arhitectură pentru 9 divizii', 'UI/UX corporate modern', 'SEO tehnic'],
    metrics: [
      { value: '30 ani', label: '1996–2026' },
      { value: '9', label: 'divizii integrate' },
      { value: '42.000+', label: 'puieți plantați' },
    ],
    services: ['Design UI/UX', 'Site bilingv RO/EN', 'Arhitectură pentru 9 divizii', 'SEO tehnic'],
    shot: 'floreagrup',
    accent: '#E11D2E',
    featured: true,
  },
  {
    slug: 'petra-pavaje',
    domain: 'petrapavaje.ro',
    url: 'https://petrapavaje.ro',
    client: 'Petra Pavaje',
    title: 'Petra Pavaje — Lider în Prefabricate din Beton',
    filter: 'corporate',
    category: 'Industrial & Catalog Produse',
    summary:
      'Catalog digital avansat pentru peste 800 de produse și cele 4 fabrici Petra Pavaje din România, parte a Florea Grup, în parteneriat cu HESS GROUP.',
    description:
      'Platformă digitală și catalog avansat de produse pentru Petra Pavaje (parte a Florea Grup, în parteneriat cu HESS GROUP). Structurată pentru a prezenta peste 800 de produse — pavaje premium, dale, borduri și elemente de arhitectură — și cele 4 fabrici din România (Alba Iulia, Arad, Prahova, Roman/Neamț), fiecare cu o capacitate de 6.000 mp/zi, alături de grădini expoziționale și ghiduri de amenajare.',
    highlights: ['Catalog 800+ produse', 'Pagini regionale pentru 4 fabrici', 'Optimizare viteză', 'Conversii Google Ads / GA4'],
    metrics: [
      { value: '800+', label: 'produse în catalog' },
      { value: '4', label: 'fabrici în România' },
      { value: '6.000', label: 'mp/zi per fabrică' },
    ],
    services: ['Catalog de produse', 'Pagini regionale', 'Cereri de ofertă', 'Măsurare conversii'],
    shot: 'petrapavaje',
    accent: '#C8102E',
    featured: true,
  },
  {
    slug: 'hotel-astoria',
    domain: 'astoriahotels.ro',
    url: 'https://astoriahotels.ro',
    client: 'Hotel Astoria Alba Iulia',
    title: 'Hotel Astoria & Astoria Pool Park — Eleganță și Confort în Transilvania',
    filter: 'hospitality',
    category: 'Ospitalitate & Evenimente',
    summary:
      'Website de prezentare și conversie pentru Hotel Astoria Alba Iulia: 30 de camere, restaurant internațional, Astoria Pool Park și o divizie dedicată evenimentelor.',
    description:
      'Website de prezentare și conversie pentru Hotel Astoria Alba Iulia (DN 1, km 387). Pune în valoare cele 30 de camere confortabile, restaurantul internațional, zona de agrement Astoria Pool Park și divizia de evenimente — nunți, botezuri și conferințe corporate cu lumini arhitecturale și sonorizare dedicată.',
    highlights: ['Prezentare vizuală imersivă', 'Pagini dedicate evenimentelor', 'Astoria Pool Park', 'Optimizare mobilă'],
    metrics: [
      { value: '30', label: 'camere' },
      { value: 'DN 1', label: 'km 387, Alba Iulia' },
      { value: 'Pool Park', label: 'zonă de agrement' },
    ],
    services: ['Prezentare imersivă', 'Pagini evenimente', 'Galerii foto', 'Optimizare mobilă'],
    shot: 'astoriahotels',
    accent: '#C9A45C',
    featured: true,
  },
  {
    slug: 'hotel-cetate',
    domain: 'hotelcetate.ro',
    url: 'https://hotelcetate.ro',
    client: 'Hotel Cetate Alba Iulia',
    title: 'Hotel Cetate Alba Iulia — „Stay above the fortress”',
    filter: 'hospitality',
    category: 'Ospitalitate & Patrimoniu',
    summary:
      'Rebranding digital pentru un hotel-simbol al orașului: aproape 50 de ani de istorie și 10 etaje cu panoramă asupra Cetății Alba Carolina.',
    description:
      'Rebranding digital pentru un hotel simbol din inima orașului Alba Iulia, cu o poveste de aproape 50 de ani și 10 etaje ce oferă o panoramă unică asupra Cetății Alba Carolina și a Munților Șureanu / Piatra Craivii. Include prezentarea tipurilor de camere (Buget, Standard, Suită Standard, Superioară, Apartament Superior), secțiuni de gastronomie locală, conferințe de până la 70 de persoane, recenzii TripAdvisor/Booking și un ghid de explorare a zonei — Cetatea Vauban, Podgoria Aiudului, Apuseni.',
    highlights: ['Storytelling vizual', 'Ghid turistic integrat', 'SEO local', 'Flux de rezervări'],
    metrics: [
      { value: '~50 ani', label: 'de ospitalitate' },
      { value: '10', label: 'etaje cu panoramă' },
      { value: '70', label: 'locuri conferințe' },
    ],
    services: ['Rebranding digital', 'Storytelling vizual', 'Ghid turistic', 'SEO local'],
    shot: 'hotelcetate',
    accent: '#C8A46E',
    featured: false,
  },
  {
    slug: 'hotel-alba-iulia',
    domain: 'hotelalbaiulia.ro',
    url: 'https://hotelalbaiulia.ro',
    client: 'Hotel Alba Iulia',
    title: 'Hotel Alba Iulia — Portalul Cazărilor de Top din „Cealaltă Capitală”',
    filter: 'hospitality',
    category: 'Portal Turistic & HoReCa',
    summary:
      'Hub turistic care ghidează călătorii către hotelurile Transilvania, Cetate și Astoria și promovează patrimoniul istoric al orașului.',
    description:
      'Hub turistic și portal dedicat celor mai primitoare hoteluri din Alba Iulia — Hotel Transilvania, Hotel Cetate și Hotel Astoria — creat pentru a ghida turiștii și călătorii de business către opțiunea ideală de cazare și pentru a promova patrimoniul istoric al orașului.',
    highlights: ['Arhitectură SEO & GEO', 'Interogări turistice regionale', 'Comparare unități', 'Ghid de oraș'],
    metrics: [
      { value: '3', label: 'hoteluri reunite' },
      { value: 'SEO + GEO', label: 'interogări regionale' },
      { value: 'Alba Iulia', label: '„Cealaltă Capitală”' },
    ],
    services: ['Portal turistic', 'Comparare hoteluri', 'SEO & GEO', 'Ghid de oraș'],
    shot: 'hotelalbaiulia',
    accent: '#9A8A3A',
    featured: false,
  },
  {
    slug: 'arena-play',
    domain: 'arenaplay.ro',
    url: 'https://arenaplay.ro',
    client: 'Arena Play Alba Iulia',
    title: 'Arena Play Alba Iulia — Centru de Recreere & Arena VR Mobilă',
    filter: 'entertainment',
    category: 'Entertainment & VR',
    summary:
      'Website energic pentru centrul de divertisment Arena Play: realitate virtuală, Arena VR Mobilă pentru evenimente, afterschool și rezervare online rapidă.',
    description:
      'Website energic și interactiv pentru centrul de divertisment Arena Play din Alba Iulia (Str. Tudor Vladimirescu nr. 50A). Prezintă experiențele de realitate virtuală, conceptul inovator Arena VR Mobilă pentru festivaluri și evenimente private, programele afterschool și fluxul rapid de rezervare online + WhatsApp.',
    highlights: ['Design dinamic gaming/VR', 'Rezervare rapidă online', 'Pagini evenimente mobile', 'WhatsApp direct'],
    metrics: [
      { value: 'VR & XR', label: 'experiențe' },
      { value: '4', label: 'servicii sub un acoperiș' },
      { value: '1 click', label: 'rezervare + WhatsApp' },
    ],
    services: ['Design gaming/VR', 'Rezervare online', 'WhatsApp direct', 'Pagini evenimente'],
    shot: 'arenaplay',
    accent: '#22D3EE',
    featured: false,
  },
];
