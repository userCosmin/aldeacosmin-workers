import { CONSENT_EVENT, CONSENT_KEY, type ConsentState } from '../lib/analytics';

type Gtag = (...args: unknown[]) => void;
interface AnalyticsWindow extends Window {
  gtag?: Gtag;
  __acAnalytics?: { id: string; loaded: boolean };
}
const w = window as AnalyticsWindow;

function loadGtag() {
  const state = w.__acAnalytics;
  if (!state || state.loaded) return;
  state.loaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${state.id}`;
  document.head.appendChild(s);
}

function storedConsent(): ConsentState | null {
  try {
    return localStorage.getItem(CONSENT_KEY) as ConsentState | null;
  } catch {
    return null;
  }
}

// page_view on first load and on every Astro View Transitions navigation.
let lastPath = '';
function trackPageView() {
  const path = location.pathname + location.search;
  if (path === lastPath) return;
  lastPath = path;
  w.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: location.href,
    page_path: location.pathname,
  });
}
document.addEventListener('astro:page-load', trackPageView);
trackPageView();

if (storedConsent() === 'granted') {
  const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500));
  if (document.readyState === 'complete') idle(loadGtag);
  else window.addEventListener('load', () => idle(loadGtag), { once: true });
}

window.addEventListener(CONSENT_EVENT, (e) => {
  if ((e as CustomEvent<ConsentState>).detail === 'granted') loadGtag();
});

// Delegated tracking: <a data-track="portfolio_project_click" data-track-project-domain="petrapavaje.ro">
document.addEventListener(
  'click',
  (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    const params: Record<string, string> = {};
    for (const [key, value] of Object.entries(el.dataset)) {
      if (key === 'track' || !key.startsWith('track') || value === undefined) continue;
      const name = key.slice(5).replace(/^[A-Z]/, (c) => c.toLowerCase()).replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
      params[name] = value;
    }
    w.gtag?.('event', el.dataset.track, params);
  },
  { capture: true },
);
