import Lenis from 'lenis';

/* ── Theme (dark by default, persisted) ─────────────────────────────────── */
const THEME_KEY = 'ac-theme';
function applyTheme() {
  let theme = 'dark';
  try {
    theme = localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    /* storage unavailable */
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.add('js');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f6f2' : '#090a0f');
}
// View Transitions replace <html> attributes with the incoming document's — restore them.
document.addEventListener('astro:after-swap', applyTheme);

/* ── Lenis smooth inertia scrolling ─────────────────────────────────────── */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | null = null;

function startLenis() {
  if (lenis || reduceMotion.matches) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -96 } });
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
}
startLenis();
reduceMotion.addEventListener('change', () => {
  if (reduceMotion.matches) {
    lenis?.destroy();
    lenis = null;
  } else startLenis();
});
document.addEventListener('astro:after-swap', () => {
  if (!lenis) return;
  lenis.resize();
  lenis.scrollTo(window.scrollY, { immediate: true, force: true });
});

/* ── Scroll reveal ──────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.setAttribute('data-revealed', '');
      revealObserver.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
);

function initReveal() {
  document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => revealObserver.observe(el));
}

/* ── Story table of contents: scroll spy ────────────────────────────────── */
let tocObserver: IntersectionObserver | null = null;
function initTocSpy() {
  tocObserver?.disconnect();
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-toc] a[href^="#"]');
  if (!links.length) return;
  const byId = new Map([...links].map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  tocObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((a) => a.removeAttribute('aria-current'));
        byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
      }
    },
    { rootMargin: '-20% 0px -70% 0px' },
  );
  byId.forEach((_, id) => {
    const h = document.getElementById(id);
    if (h) tocObserver?.observe(h);
  });
}

function onPageLoad() {
  applyTheme();
  initReveal();
  initTocSpy();
}
document.addEventListener('astro:page-load', onPageLoad);
onPageLoad();
