export const SITE = {
  url: 'https://aldeacosmin.ro',
  name: 'Aldea Cosmin',
  title: 'Aldea Cosmin — Web Developer, AI entuziast & Vibe Coding · Fotograf Montan',
  description:
    'Aldea Cosmin — web developer, AI entuziast & vibe coding și fotograf montan din Alba Iulia, pasionat de securitate cibernetică. Platforme web rapide și soluții cu AI pentru branduri din Transilvania, plus jurnale de drumeție din munții României.',
  locale: 'ro_RO',
  lang: 'ro',
  gaId: 'G-VPTMQNJKKP',
  /** Self-hosted, cookieless Umami (server 38.79.154.74). */
  umami: {
    src: 'https://stats.aldeacosmin.ro/script.js',
    websiteId: 'f08fdb4d-7296-4a94-94c0-b17bfd4624b3',
    domains: 'aldeacosmin.ro',
  },
  defaultOgImage:
    'https://media.aldeacosmin.ro/cdn-cgi/image/width=1200,height=630,fit=cover,quality=80,format=jpeg/galerie/muntii-retezat-1.webp',
  heroImage: 'https://media.aldeacosmin.ro/galerie/muntii-retezat-1.webp',
  portraitImage: 'https://media.aldeacosmin.ro/general/imagine-povesti.webp',
  logo: 'https://media.aldeacosmin.ro/general/logo%20aldea%20cosmin%20alb.webp',
  twitterHandle: '@Aldea_Cosmin_',
} as const;

export const PERSON = {
  name: 'Aldea Cosmin',
  shortName: 'Aldea Cosmin',
  alternateName: ['Cosmin Aldea'],
  /** Short role — used where space is tight. */
  role: 'Web Developer, AI entuziast & Vibe Coding',
  jobTitle: 'Web Developer, AI Enthusiast & Vibe Coder · Mountain Photographer',
  jobTitleRo: 'Web Developer, AI entuziast & Vibe Coding · Fotograf Montan',
  city: 'Alba Iulia',
  region: 'Alba',
  country: 'RO',
  motto: 'have some fun before you die',
} as const;

export type SocialPlatform = 'instagram' | 'facebook' | 'youtube';

export interface SocialProfile {
  platform: SocialPlatform;
  label: string;
  handle: string;
  url: string;
  description: string;
}

/** Official profiles — rendered with rel="me noopener" for entity validation. */
export const SOCIALS: SocialProfile[] = [
  {
    platform: 'instagram',
    label: 'Instagram',
    handle: '@aldeacosmin.ro',
    url: 'https://www.instagram.com/aldeacosmin.ro/',
    description: 'Cadre de pe creste, răsărituri și momente din traseu.',
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    handle: 'aldeacosmin.ro',
    url: 'https://www.facebook.com/aldeacosmin.ro',
    description: 'Jurnale, anunțuri de ture și povești din munte.',
  },
  {
    platform: 'youtube',
    label: 'YouTube',
    handle: '@aldea.sorin.cosmin',
    url: 'https://www.youtube.com/@aldea.sorin.cosmin',
    description: 'Arhivă de peste 108 videoclipuri și jurnale video montane.',
  },
];

/** Other verified profiles (listed on the previous site) — used only in Schema.org sameAs. */
export const OTHER_PROFILES = [
  'https://x.com/Aldea_Cosmin_',
  'https://ro.linkedin.com/in/cosmin-aldea-75655454',
  'https://www.strava.com/athletes/aldeacosmin',
  'https://github.com/aldeacosmin',
];

export const SAME_AS = [...SOCIALS.map((s) => s.url), ...OTHER_PROFILES];

export const EMAIL = 'contact@aldeacosmin.ro';

export const YOUTUBE_CHANNEL_ID = 'UC246vdF8Fxxy_7d2acuYQcA';

export const HERO_STATS = [
  { value: 6, suffix: '+', label: 'Platforme web enterprise & HoReCa dezvoltate' },
  { value: 108, suffix: '+', label: 'Videoclipuri & jurnale video pe YouTube' },
  { value: 7, suffix: '+', label: 'Masive montane majore documentate' },
  { value: 1000, suffix: '+', label: 'km de poteci și zeci de mii de metri D+' },
];

export type NavIcon = 'home' | 'book' | 'mountain' | 'camera' | 'briefcase' | 'user' | 'mail';

export interface NavItem {
  href: string;
  label: string;
  icon: NavIcon;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Acasă', icon: 'home' },
  { href: '/povesti', label: 'Povești', icon: 'book' },
  { href: '/muntii', label: 'Munții', icon: 'mountain' },
  { href: '/galerie', label: 'Galerie', icon: 'camera' },
  { href: '/portofoliu', label: 'Portofoliu', icon: 'briefcase', badge: 'Nou' },
  { href: '/despre', label: 'Despre', icon: 'user' },
  { href: '/contact', label: 'Contact', icon: 'mail' },
];
