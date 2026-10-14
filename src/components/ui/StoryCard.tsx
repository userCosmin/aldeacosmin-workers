import type { StoryCardData } from '../../data/stories';
import { cfImage, cfSrcSet } from '../../lib/image';
import { formatAscent, formatKm } from '../../lib/format';
import StatBadges, { type StatBadge } from './StatBadges';

export function storyBadges(s: Pick<StoryCardData, 'distanceKm' | 'ascentM' | 'summits' | 'readingMinutes' | 'photos' | 'videos'>): StatBadge[] {
  const badges: StatBadge[] = [
    { icon: 'route', label: 'Distanță', value: formatKm(s.distanceKm) },
    { icon: 'ascent', label: 'Ascensiune', value: formatAscent(s.ascentM) },
  ];
  if (s.summits.length) badges.push({ icon: 'summit', label: 'Vârfuri atinse', value: `${s.summits.length} ${s.summits.length === 1 ? 'vârf' : 'vârfuri'}` });
  badges.push({ icon: 'clock', label: 'Timp de citire', value: `${s.readingMinutes} min` });
  if (s.videos) badges.push({ icon: 'video', label: 'Video', value: `${s.videos} video` });
  else if (s.photos) badges.push({ icon: 'camera', label: 'Galerie foto', value: `${s.photos} foto` });
  return badges;
}

/** Story card — rendered statically from Astro and inside the StoryExplorer island. */
export default function StoryCard({ story, priority = false }: { story: StoryCardData; priority?: boolean }) {
  return (
    <a
      href={`/povesti/${story.slug}`}
      className="spotlight-card group flex h-full flex-col transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={cfImage(story.image, { width: 720, height: 450 })}
          srcSet={cfSrcSet(story.image, [480, 720, 960], { ratio: 1.6 })}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          width={720}
          height={450}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
        <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[0.68rem] tracking-wide text-white backdrop-blur">
          {story.massifName}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-accent/90 px-2.5 py-1 font-mono text-[0.62rem] font-semibold tracking-wide text-accent-ink uppercase">
          {story.difficulty}
        </span>
      </div>
      <div className="relative z-[3] flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
          <time dateTime={story.date}>{story.dateLabel}</time>
        </p>
        <h3 className="text-[1.3rem] leading-snug font-medium transition-colors group-hover:text-accent">{story.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{story.excerpt}</p>
        <StatBadges badges={storyBadges(story)} className="mt-auto pt-2" />
      </div>
    </a>
  );
}
