import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'motion/react';
import { useState } from 'react';
import { PORTFOLIO_FILTERS, type PortfolioFilter, type PortfolioProject } from '../../data/portfolio';
import PortfolioCard3D from '../motion/PortfolioCard3D';

interface Props {
  projects: PortfolioProject[];
  showFilters?: boolean;
}

/** Portfolio grid with animated category filtering (layout + AnimatePresence). */
export default function PortfolioGrid({ projects, showFilters = true }: Props) {
  const [filter, setFilter] = useState<'all' | PortfolioFilter>('all');
  const visible = filter === 'all' ? projects : projects.filter((p) => p.filter === filter);
  const count = (id: 'all' | PortfolioFilter) => (id === 'all' ? projects.length : projects.filter((p) => p.filter === id).length);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        {showFilters && (
          <div role="group" aria-label="Filtrează proiectele" className="mb-10 flex flex-wrap gap-2">
            {PORTFOLIO_FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative h-11 cursor-pointer rounded-full px-5 text-sm font-medium transition-colors ${
                    active ? 'text-accent-ink' : 'border border-border text-foreground/75 hover:border-border-strong hover:text-foreground'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="portfolio-filter-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-accent"
                    />
                  )}
                  <span className="relative">
                    {f.label}
                    <span className={`ml-2 font-mono text-[0.7rem] ${active ? 'text-accent-ink/70' : 'text-muted'}`}>{count(f.id)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
        <motion.ul layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 220, damping: 26, delay: i * 0.04 }}
                className="[perspective:1400px]"
              >
                <PortfolioCard3D project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </MotionConfig>
  );
}
