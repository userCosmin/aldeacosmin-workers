import { AnimatePresence, MotionConfig, motion, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, Play, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cfImage } from '../../lib/image';
import { trackEvent, type AnalyticsEvent } from '../../lib/analytics';

export interface GalleryItem {
  src: string;
  title: string;
  caption?: string;
  type?: 'image' | 'video';
  massif?: string;
}

interface Props {
  items: GalleryItem[];
  /** Optional massif filter chips (used on /galerie). */
  filters?: { slug: string; name: string }[];
  initialCount?: number;
  step?: number;
  label?: string;
}

type Lenis = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: Lenis }).__lenis;

/** Thumbnail grid + accessible lightbox (keyboard, swipe, focus return, video support). */
export default function GalleryLightbox({ items, filters, initialCount = 12, step = 12, label = 'Galerie foto' }: Props) {
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState(initialCount);
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const list = useMemo(() => (filter === 'all' ? items : items.filter((i) => i.massif === filter)), [items, filter]);
  const open = index !== null ? list[index] : null;

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const go = useCallback(
    (delta: number) => {
      setDir(delta);
      setIndex((i) => (i === null ? i : (i + delta + list.length) % list.length));
    },
    [list.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    lenis()?.stop();
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis()?.start();
    };
  }, [index === null, close, go]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  const selectFilter = (slug: string, name: string) => {
    setFilter(slug);
    setShown(initialCount);
    trackEvent<Extract<AnalyticsEvent, { name: 'mountain_filter_select' }>>('mountain_filter_select', { massif_name: name, location: 'galerie' });
  };

  return (
    <MotionConfig reducedMotion="user">
      {filters && (
        <div role="group" aria-label="Filtrează fotografiile după masiv" className="mb-8 flex flex-wrap gap-2">
          {[{ slug: 'all', name: 'Toate' }, ...filters].map((f) => {
            const active = filter === f.slug;
            return (
              <button
                key={f.slug}
                type="button"
                aria-pressed={active}
                onClick={() => selectFilter(f.slug, f.name)}
                className={`relative h-10 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors ${
                  active ? 'text-accent-ink' : 'border border-border text-foreground/75 hover:border-border-strong hover:text-foreground'
                }`}
              >
                {active && (
                  <motion.span layoutId="gallery-filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{f.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <ul aria-label={label} className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {list.slice(0, shown).map((item, i) => (
          <li key={`${item.src}-${i}`} className={i % 7 === 0 ? 'col-span-2 row-span-2' : ''}>
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setDir(0);
                setIndex(i);
              }}
              aria-label={`Mărește: ${item.title}${item.type === 'video' ? ' (video)' : ''}`}
              className="group relative block aspect-[4/3] h-full w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-surface"
            >
              {item.type === 'video' ? (
                <>
                  <video src={`${item.src}#t=0.5`} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 grid place-items-center bg-black/25">
                    <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-ink">
                      <Play aria-hidden="true" className="size-5" />
                    </span>
                  </span>
                </>
              ) : (
                <img
                  src={cfImage(item.src, { width: i % 7 === 0 ? 900 : 480, height: i % 7 === 0 ? 675 : 360 })}
                  alt=""
                  width={480}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.07]"
                />
              )}
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="line-clamp-1">{item.title}</span>
                <Expand aria-hidden="true" className="size-3.5 shrink-0" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shown < list.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + step)}
            className="h-12 cursor-pointer rounded-full border border-border-strong px-6 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Încarcă mai multe <span className="font-mono text-muted">({list.length - shown})</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {open && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${open.title} — ${index + 1} din ${list.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col bg-black/92 backdrop-blur-md"
            onClick={close}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between gap-4 p-4 text-white/85" onClick={(e) => e.stopPropagation()}>
              <p className="font-mono text-xs tracking-wider">
                {index + 1} / {list.length}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Închide galeria"
                className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 md:px-20">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.figure
                  key={open.src}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 80, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: dir * -80, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                  drag={list.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={onDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className="flex max-h-full flex-col items-center"
                >
                  {open.type === 'video' ? (
                    <video src={open.src} controls autoPlay playsInline className="max-h-[78vh] max-w-full rounded-xl" />
                  ) : (
                    <img
                      src={cfImage(open.src, { width: 1920, fit: 'scale-down', quality: 82 })}
                      alt={open.title}
                      draggable={false}
                      className="max-h-[78vh] max-w-full rounded-xl object-contain select-none"
                    />
                  )}
                  <figcaption className="mt-4 max-w-2xl px-4 text-center text-sm text-white/80">
                    {open.title}
                    {open.caption && <span className="block text-xs text-white/50">{open.caption}</span>}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
              {list.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(-1);
                    }}
                    aria-label="Fotografia anterioară"
                    className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:grid"
                  >
                    <ChevronLeft aria-hidden="true" className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(1);
                    }}
                    aria-label="Fotografia următoare"
                    className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:grid"
                  >
                    <ChevronRight aria-hidden="true" className="size-6" />
                  </button>
                </>
              )}
            </div>
            <p className="p-4 text-center font-mono text-[0.65rem] tracking-wider text-white/40 md:hidden">Glisează pentru următoarea fotografie</p>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
