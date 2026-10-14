import { useCallback, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ICONS, type IconName } from '../ui/Icon';

export interface BentoItem {
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  eyebrow?: string;
  icon?: IconName;
  /** Pre-sized background image URL (see lib/image.ts). */
  image?: string;
  imageSrcSet?: string;
  imageAlt?: string;
  stats?: { value: string; label: string }[];
  tags?: string[];
  /** Grid placement classes, e.g. "md:col-span-2 md:row-span-2". */
  className?: string;
  /** data-track-* attributes for GA4. */
  track?: Record<string, string>;
}

/** Writes the cursor position into CSS variables — no React re-render per mouse move. */
function useSpotlight() {
  return useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
}

export function SpotlightCard({
  children,
  className = '',
  href,
  external,
  style,
  track,
  label,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  style?: CSSProperties;
  track?: Record<string, string>;
  label?: string;
}) {
  const onMove = useSpotlight();
  const cls = `spotlight-card group block ${className}`;
  if (href) {
    return (
      <a
        href={href}
        onPointerMove={onMove}
        className={cls}
        style={style}
        aria-label={label}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
        {...track}
      >
        {children}
      </a>
    );
  }
  return (
    <div onPointerMove={onMove} className={cls} style={style}>
      {children}
    </div>
  );
}

/** Bento grid of spotlight cards: a radial halo follows the cursor on the background and the border. */
export default function SpotlightBento({ items, className = '' }: { items: BentoItem[]; className?: string }) {
  return (
    <div className={`grid auto-rows-[minmax(15rem,auto)] grid-cols-1 gap-4 md:grid-cols-4 ${className}`}>
      {items.map((item, i) => {
        const Icon = item.icon ? ICONS[item.icon] : null;
        return (
          <SpotlightCard
            key={item.title}
            href={item.href}
            external={item.external}
            track={item.track}
            className={`flex min-h-[15rem] flex-col justify-end p-6 md:p-7 ${item.className ?? 'md:col-span-2'}`}
            style={{ '--reveal-i': i } as CSSProperties}
          >
            {item.image && (
              <>
                <img
                  src={item.image}
                  srcSet={item.imageSrcSet}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  alt={item.imageAlt ?? ''}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70 transition duration-[1.2s] ease-out group-hover:scale-[1.06] group-hover:opacity-90"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-card via-card/75 to-card/10" />
              </>
            )}
            <div className="relative z-[3] flex h-full flex-col">
              <div className="mb-auto flex items-start justify-between gap-4 pb-8">
                {Icon ? (
                  <span className="grid size-12 place-items-center rounded-2xl border border-border bg-surface/80 text-accent backdrop-blur">
                    <Icon aria-hidden="true" className="size-[22px]" />
                  </span>
                ) : (
                  <span />
                )}
                {item.href && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                )}
              </div>
              {item.eyebrow && <p className="eyebrow mb-2">{item.eyebrow}</p>}
              <h3 className="text-2xl leading-tight font-medium md:text-[1.7rem]">{item.title}</h3>
              <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
              {item.stats && (
                <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {item.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase">{s.label}</dt>
                      <dd className="font-mono text-lg text-foreground">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {item.tags && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-[0.7rem] text-foreground/80">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
