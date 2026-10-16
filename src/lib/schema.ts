import { EMAIL, PERSON, SAME_AS, SITE } from '../data/site';
import type { Story } from '../data/stories';
import type { Massif } from '../data/massifs';
import type { PortfolioProject } from '../data/portfolio';
import { ogImage } from './image';

export type SchemaNode = Record<string, unknown>;
export interface Crumb {
  name: string;
  href: string;
}

export const PERSON_ID = `${SITE.url}/#person`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const abs = (href: string) => new URL(href, SITE.url).toString().replace(/\/$/, '') || SITE.url;

export const personNode = (): SchemaNode => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON.name,
  alternateName: [...PERSON.alternateName],
  url: SITE.url,
  image: SITE.portraitImage,
  jobTitle: PERSON.jobTitle,
  description:
    'Web developer, AI entuziast & vibe coding și fotograf montan din Alba Iulia, pasionat de securitate cibernetică. Construiește platforme web rapide și soluții cu AI pentru branduri din Transilvania și documentează munții României în jurnale, fotografii și videoclipuri.',
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: PERSON.city,
    addressRegion: PERSON.region,
    addressCountry: PERSON.country,
  },
  homeLocation: { '@type': 'Place', name: 'Alba Iulia, România' },
  knowsAbout: [
    'Web Development',
    'Inteligență artificială',
    'Integrări AI și LLM',
    'Vibe Coding',
    'Securitate cibernetică',
    'Performanță web',
    'SEO tehnic',
    'Generative Engine Optimization',
    'Google Analytics 4',
    'Marketing online',
    'Fotografie de peisaj',
    'Videografie outdoor',
    'Drumeții montane',
    'Carpații României',
  ],
  sameAs: SAME_AS,
});

export const websiteNode = (): SchemaNode => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'ro-RO',
  description: SITE.description,
  publisher: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/povesti?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
});

export const breadcrumbNode = (crumbs: Crumb[]): SchemaNode => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.href),
  })),
});

export const placeNode = (m: Massif): SchemaNode => ({
  '@type': m.slug === 'cetati-dacice' ? ['Place', 'TouristAttraction'] : 'Mountain',
  '@id': `${SITE.url}/muntii/${m.slug}#place`,
  name: m.fullName,
  description: m.tagline,
  url: `${SITE.url}/muntii/${m.slug}`,
  image: ogImage(m.image),
  geo: { '@type': 'GeoCoordinates', latitude: m.geo.lat, longitude: m.geo.lng },
  containedInPlace: { '@type': 'Place', name: `${m.range}, România` },
  address: { '@type': 'PostalAddress', addressRegion: m.counties, addressCountry: 'RO' },
});

export const blogPostingNode = (s: Story, massif?: Massif): SchemaNode => ({
  '@type': 'BlogPosting',
  '@id': `${SITE.url}/povesti/${s.slug}#article`,
  headline: s.title,
  description: s.excerpt,
  url: `${SITE.url}/povesti/${s.slug}`,
  mainEntityOfPage: `${SITE.url}/povesti/${s.slug}`,
  image: [ogImage(s.image)],
  datePublished: s.date,
  dateModified: s.date,
  inLanguage: 'ro-RO',
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  isPartOf: { '@id': WEBSITE_ID },
  articleSection: s.massifName,
  timeRequired: `PT${s.readingMinutes}M`,
  keywords: [s.massifName, ...s.summits.map((p) => `Vârful ${p}`), 'drumeție', 'traseu montan', 'România'].join(', '),
  contentLocation: massif ? { '@id': `${SITE.url}/muntii/${massif.slug}#place` } : { '@type': 'Place', name: s.hike.startPoint },
  about: s.summits.map((p) => ({ '@type': 'Mountain', name: `Vârful ${p}` })),
  ...(s.videos.length
    ? {
        video: s.videos.map((v) => ({
          '@type': 'VideoObject',
          name: v.title,
          embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
          thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
          uploadDate: s.date,
          description: `${v.title} — jurnal video din ${s.massifName}.`,
        })),
      }
    : {}),
});

export const portfolioListNode = (projects: PortfolioProject[]): SchemaNode => ({
  '@type': 'ItemList',
  '@id': `${SITE.url}/portofoliu#projects`,
  name: 'Portofoliu web — Aldea Cosmin',
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': ['CreativeWork', 'WebSite'],
      name: p.title,
      url: p.url,
      description: p.description,
      genre: p.category,
      keywords: [...p.highlights, ...p.services].join(', '),
      inLanguage: 'ro-RO',
      image: `${SITE.url}/portfolio/${p.shot}-1280.webp`,
      creator: { '@id': PERSON_ID },
      about: { '@type': 'Organization', name: p.client, url: p.url },
    },
  })),
});

export const collectionPageNode = (url: string, name: string, description: string): SchemaNode => ({
  '@type': 'CollectionPage',
  '@id': `${abs(url)}#webpage`,
  url: abs(url),
  name,
  description,
  inLanguage: 'ro-RO',
  isPartOf: { '@id': WEBSITE_ID },
  author: { '@id': PERSON_ID },
});
