import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { StoryCardData } from '../../data/stories';
import { trackEvent, type AnalyticsEvent } from '../../lib/analytics';
import StoryCard from './StoryCard';

interface Props {
  stories: StoryCardData[];
  massifs: { slug: string; name: string; count: number }[];
}

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Animated filtering (massif chips + search) for /povesti. SSR renders every story. */
export default function StoryExplorer({ stories, massifs }: Props) {
  const [massif, setMassif] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const m = params.get('masiv');
    if (m && massifs.some((x) => x.slug === m)) setMassif(m);
    const q = params.get('q');
    if (q) setQuery(q);
  }, [massifs]);

  const syncUrl = (m: string, q: string) => {
    const params = new URLSearchParams();
    if (m !== 'all') params.set('masiv', m);
    if (q.trim()) params.set('q', q.trim());
    const qs = params.toString();
    history.replaceState(history.state, '', qs ? `?${qs}` : location.pathname);
  };

  const select = (slug: string) => {
    setMassif(slug);
    syncUrl(slug, query);
    const name = slug === 'all' ? 'Toate' : (massifs.find((m) => m.slug === slug)?.name ?? slug);
    trackEvent<Extract<AnalyticsEvent, { name: 'mountain_filter_select' }>>('mountain_filter_select', { massif_name: name, location: 'povesti' });
  };

  const visible = useMemo(() => {
    const q = fold(query.trim());
    return stories.filter((s) => {
      if (massif !== 'all' && s.massif !== massif) return false;
      if (!q) return true;
      return fold(`${s.title} ${s.excerpt} ${s.massifName} ${s.summits.join(' ')}`).includes(q);
    });
  }, [stories, massif, query]);

  const chips = [{ slug: 'all', name: 'Toate', count: stories.length }, ...massifs];

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filtrează după masiv" className="flex flex-wrap gap-2">
            {chips.map((c) => {
              const active = massif === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(c.slug)}
                  className={`relative h-10 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors ${
                    active ? 'text-accent-ink' : 'border border-border text-foreground/75 hover:border-border-strong hover:text-foreground'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="story-filter-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-accent"
                    />
                  )}
                  <span className="relative">
                    {c.name}
                    <span className={`ml-1.5 font-mono text-[0.7rem] ${active ? 'text-accent-ink/70' : 'text-muted'}`}>{c.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Caută în povești</span>
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                syncUrl(massif, e.target.value);
              }}
              placeholder="Caută vârf, masiv, traseu…"
              className="h-11 w-full rounded-full border border-border bg-surface/60 pr-10 pl-11 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  syncUrl(massif, '');
                }}
                aria-label="Șterge căutarea"
                className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted hover:text-foreground"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </label>
        </div>

        <p aria-live="polite" className="mt-6 font-mono text-xs tracking-[0.14em] text-muted uppercase">
          {visible.length} {visible.length === 1 ? 'poveste' : 'povești'}
        </p>

        <motion.ul layout className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((s, i) => (
              <motion.li
                key={s.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 260, damping: 28, delay: Math.min(i, 6) * 0.03 }}
              >
                <StoryCard story={s} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {visible.length === 0 && (
          <p className="mt-10 rounded-3xl border border-dashed border-border p-10 text-center text-muted">
            Nicio poveste pentru acest filtru. Încearcă alt masiv sau alt termen.
          </p>
        )}
      </LayoutGroup>
    </MotionConfig>
  );
}
