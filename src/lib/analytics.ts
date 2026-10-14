/**
 * GA4 (G-VPTMQNJKKP) event helpers. gtag is stubbed in <head> by GoogleAnalytics.astro;
 * events are queued in dataLayer and only leave the browser after cookie consent.
 */
export type AnalyticsEvent =
  | { name: 'portfolio_project_click'; params: { project_domain: string; location?: string } }
  | { name: 'social_profile_click'; params: { platform: 'instagram' | 'facebook' | 'youtube'; location?: string } }
  | { name: 'mountain_filter_select'; params: { massif_name: string; location?: string } }
  | { name: 'whatsapp_click'; params: { location: string } };

type Gtag = (...args: unknown[]) => void;

export function trackEvent<E extends AnalyticsEvent>(name: E['name'], params: E['params']): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.('event', name, params);
}

/** data-* attributes picked up by the delegated click listener in src/scripts/analytics.ts */
export function trackAttrs(name: AnalyticsEvent['name'], params: Record<string, string>): Record<string, string> {
  const attrs: Record<string, string> = { 'data-track': name };
  for (const [k, v] of Object.entries(params)) attrs[`data-track-${k.replace(/_/g, '-')}`] = v;
  return attrs;
}

export const CONSENT_KEY = 'ac-consent';
export const CONSENT_EVENT = 'ac:consent';
export const OPEN_CONSENT_EVENT = 'ac:open-consent';
export type ConsentState = 'granted' | 'denied';
