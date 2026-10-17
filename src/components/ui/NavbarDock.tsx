import { MotionConfig, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../../data/site';
import { ICONS } from './Icon';
import ThemeToggle from './ThemeToggle';

/** Intrinsic size of /brand/mark*.svg (keeps the aspect ratio reserved before load). */
const MARK = { w: 316, h: 199 };
const normalize = (p: string) => p.replace(/\.html$/, '').replace(/\/$/, '') || '/';

/**
 * Floating glass dock. Persists across View Transitions (transition:persist), so the
 * active pill (layoutId="active-nav-pill") glides between items on navigation.
 * Desktop: top-centered with labels. Mobile: thumb-reachable bottom dock with icons.
 */
export default function NavbarDock({ initialPath }: { initialPath: string }) {
  const [path, setPath] = useState(() => normalize(initialPath));
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setCompact(v > 64));

  useEffect(() => {
    const onNav = () => setPath(normalize(location.pathname));
    document.addEventListener('astro:page-load', onNav);
    return () => document.removeEventListener('astro:page-load', onNav);
  }, []);

  const isActive = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));

  return (
    <MotionConfig reducedMotion="user">
      <header>
        {/* Mobile top bar: brand + theme */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-[max(env(safe-area-inset-top),1rem)] md:hidden">
          <a href="/" className="glass pointer-events-auto flex items-center gap-2.5 rounded-full py-2.5 pr-4 pl-3.5 shadow-float">
            <img src="/brand/mark.svg" alt="" width={MARK.w} height={MARK.h} className="h-6 w-auto dark:hidden" />
            <img src="/brand/mark-dark.svg" alt="" width={MARK.w} height={MARK.h} className="h-6 w-auto hidden dark:block" />
            <span className="text-[0.78rem] font-semibold tracking-[0.18em] uppercase">Aldea Cosmin</span>
          </a>
          <div className="glass pointer-events-auto rounded-full shadow-float">
            <ThemeToggle />
          </div>
        </div>

        <nav
          aria-label="Navigare principală"
          className="fixed bottom-[max(env(safe-area-inset-bottom),0.75rem)] left-1/2 z-50 -translate-x-1/2 md:top-5 md:bottom-auto"
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`flex items-center gap-1 rounded-full border border-white/10 bg-glass p-1.5 shadow-float backdrop-blur-xl backdrop-saturate-150 ${
              compact ? 'md:bg-background/80' : ''
            }`}
          >
            <a
              href="/"
              aria-label="Aldea Cosmin — acasă"
              className="mr-1 hidden h-11 shrink-0 items-center px-2.5 transition-transform hover:scale-105 md:flex"
            >
              <img src="/brand/mark.svg" alt="" width={MARK.w} height={MARK.h} className="h-7 w-auto dark:hidden" />
              <img src="/brand/mark-dark.svg" alt="" width={MARK.w} height={MARK.h} className="h-7 w-auto hidden dark:block" />
            </a>
            <ul className="flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                const Icon = ICONS[item.icon];
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative flex h-12 w-11 items-center justify-center rounded-full text-sm font-medium transition-colors md:h-11 md:w-auto md:px-3 lg:px-4 ${
                        active ? 'text-foreground' : 'text-foreground/65 hover:text-foreground'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-nav-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-foreground/10 ring-1 ring-foreground/15"
                        />
                      )}
                      <Icon aria-hidden="true" className="relative size-5 md:hidden" />
                      <span className="relative max-md:sr-only">{item.label}</span>
                      {item.badge && (
                        <>
                          <span className="absolute top-2.5 right-2.5 flex size-2 md:hidden" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                            <span className="relative inline-flex size-2 rounded-full bg-accent" />
                          </span>
                          <motion.span
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 18 }}
                            className="relative ml-1.5 hidden rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[0.6rem] tracking-wider text-accent uppercase ring-1 ring-accent/40 md:inline-block"
                          >
                            {item.badge}
                          </motion.span>
                        </>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="ml-1 hidden border-l border-border pl-1 md:block">
              <ThemeToggle />
            </div>
          </motion.div>
        </nav>
      </header>
    </MotionConfig>
  );
}
