import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CONSENT_EVENT, CONSENT_KEY, OPEN_CONSENT_EVENT, type ConsentState } from '../../lib/analytics';

/** Non-blocking glass consent card. GA4 loads only after "Accept" (Consent Mode v2). */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      /* storage unavailable */
    }
    // Non-intrusive: appear on the visitor's first interaction (or after a while), never over the first paint.
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    let timer: number | undefined;
    const show = () => {
      setOpen(true);
      cleanupTriggers();
    };
    const cleanupTriggers = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, show));
    };
    if (!stored) {
      events.forEach((e) => window.addEventListener(e, show, { once: true, passive: true }));
      timer = window.setTimeout(show, 8000);
    }
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => {
      cleanupTriggers();
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
    };
  }, []);

  const decide = (state: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_KEY, state);
    } catch {
      /* storage unavailable */
    }
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    gtag?.('consent', 'update', { analytics_storage: state });
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
    setOpen(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-labelledby="cookie-title"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="glass fixed right-4 bottom-[calc(max(env(safe-area-inset-bottom),0.75rem)+4.75rem)] left-4 z-[70] rounded-3xl p-5 shadow-float md:right-6 md:bottom-6 md:left-auto md:w-[25rem]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Închide"
              className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
            <div className="flex items-start gap-3 pr-8">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/30">
                <Cookie aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 id="cookie-title" className="font-sans text-[0.95rem] font-semibold tracking-normal">
                  Cookie-uri, pe scurt
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Folosesc Google Analytics doar dacă ești de acord, ca să înțeleg ce povești și proiecte vă interesează. Detalii în{' '}
                  <a href="/confidentialitate" className="text-foreground underline underline-offset-2 hover:text-accent">
                    politica de confidențialitate
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => decide('denied')}
                className="h-11 flex-1 cursor-pointer rounded-full border border-border-strong text-sm font-medium transition-colors hover:bg-foreground/5"
              >
                Refuz
              </button>
              <button
                type="button"
                onClick={() => decide('granted')}
                className="h-11 flex-1 cursor-pointer rounded-full bg-accent text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
              >
                Accept
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
