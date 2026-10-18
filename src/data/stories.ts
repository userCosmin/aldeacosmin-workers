import raw from './stories.json';

export interface HikeInfo {
  difficulty: string;
  duration: string;
  distance: string;
  elevation: string;
  maxAltitude: string;
  startPoint: string;
  season: string;
  markings?: string;
}

export interface StoryMedia {
  src: string;
  title: string;
  caption: string;
  type: 'image' | 'video';
  wide: boolean;
}

export interface Story {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  dateLabel: string;
  massif: string;
  massifName: string;
  image: string;
  excerpt: string;
  readingMinutes: number;
  hike: HikeInfo;
  metrics: { distanceKm: number; ascentM: number; descentM: number; maxAltitudeM: number };
  summits: string[];
  videos: { id: string; title: string }[];
  gallery: StoryMedia[];
  references: { title: string; url: string }[];
  toc: { id: string; text: string }[];
  /** Trusted HTML migrated from the previous site (see scripts in the repo history). */
  content: string;
}

/** Card-sized projection, safe to serialize into React island props. */
export interface StoryCardData {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  massif: string;
  massifName: string;
  image: string;
  excerpt: string;
  readingMinutes: number;
  difficulty: string;
  distanceKm: number;
  ascentM: number;
  summits: string[];
  photos: number;
  videos: number;
}

export const STORIES: Story[] = (raw as Story[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export const toCard = (s: Story): StoryCardData => ({
  slug: s.slug,
  title: s.title,
  date: s.date,
  dateLabel: s.dateLabel,
  massif: s.massif,
  massifName: s.massifName,
  image: s.image,
  excerpt: s.excerpt,
  readingMinutes: s.readingMinutes,
  difficulty: s.hike.difficulty,
  distanceKm: s.metrics.distanceKm,
  ascentM: s.metrics.ascentM,
  summits: s.summits,
  photos: s.gallery.filter((g) => g.type === 'image').length,
  videos: s.videos.length + s.gallery.filter((g) => g.type === 'video').length,
});

export const getStory = (slug: string) => STORIES.find((s) => s.slug === slug);
export const storiesByMassif = (massif: string) => STORIES.filter((s) => s.massif === massif);

export const STORY_TOTALS = {
  stories: STORIES.length,
  distanceKm: STORIES.reduce((n, s) => n + s.metrics.distanceKm, 0),
  ascentM: STORIES.reduce((n, s) => n + s.metrics.ascentM, 0),
  summits: new Set(STORIES.flatMap((s) => s.summits)).size,
};
