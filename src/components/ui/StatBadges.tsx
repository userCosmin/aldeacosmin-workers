import type { CSSProperties } from 'react';
import { ICONS, type IconName } from './Icon';

export interface StatBadge {
  icon: IconName;
  label: string;
  value: string;
}

interface Props {
  badges: StatBadge[];
  size?: 'sm' | 'lg';
  className?: string;
}

/** Animated metric chips: distance, D+, summits, reading time, media. Stagger-in via CSS (.stat-badge). */
export default function StatBadges({ badges, size = 'sm', className = '' }: Props) {
  if (size === 'lg') {
    return (
      <ul className={`grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 ${className}`}>
        {badges.map((b, i) => {
          const Icon = ICONS[b.icon];
          return (
            <li
              key={b.label}
              className="stat-badge glass group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-colors hover:border-accent/50"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]">
                <Icon aria-hidden="true" className="size-[18px]" />
              </span>
              <div className="min-w-0">
                <span className="sr-only">{b.label}: </span>
                <span className="block truncate font-mono text-[1.02rem] leading-tight text-foreground" title={b.value}>
                  {b.value}
                </span>
                <span aria-hidden="true" className="mt-0.5 block text-[0.7rem] tracking-wide text-muted uppercase">
                  {b.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {badges.map((b, i) => {
        const Icon = ICONS[b.icon];
        return (
          <li
            key={b.label}
            title={b.label}
            className="stat-badge inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-2.5 py-1 font-mono text-[0.7rem] text-foreground/85 transition-transform duration-300 group-hover:-translate-y-0.5"
            style={{ '--i': i, transitionDelay: `${i * 40}ms` } as CSSProperties}
          >
            <Icon aria-hidden="true" className="size-3.5 text-accent" />
            <span className="sr-only">{b.label}: </span>
            {b.value}
          </li>
        );
      })}
    </ul>
  );
}
