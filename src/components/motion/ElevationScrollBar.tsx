import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'motion/react';
import { formatInt } from '../../lib/format';

/** Deterministic ridge profile (0–1000 × 0–40), highest summit around 70% of the page. */
const N = 120;
const POINTS = Array.from({ length: N + 1 }, (_, i) => {
  const t = i / N;
  const ridge =
    0.42 * Math.sin(t * Math.PI * 0.92) +
    0.16 * Math.sin(t * 17.3 + 1.2) +
    0.09 * Math.sin(t * 41.7 + 0.4) +
    0.05 * Math.sin(t * 83.1) +
    0.32 * Math.exp(-((t - 0.71) ** 2) / 0.006) +
    0.14 * Math.exp(-((t - 0.33) ** 2) / 0.004);
  return { x: t * 1000, h: Math.max(0.04, Math.min(1, ridge * 0.95 + 0.08)) };
});
const toY = (h: number) => 40 - h * 36;
const LINE = POINTS.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${toY(p.h).toFixed(2)}`).join(' ');
const AREA = `${LINE} L1000,40 L0,40 Z`;

const MIN_ALT = 620;
const MAX_ALT = 2544; // Vârful Moldoveanu

function heightAt(progress: number) {
  const f = Math.min(1, Math.max(0, progress)) * N;
  const i = Math.floor(f);
  const a = POINTS[i];
  const b = POINTS[Math.min(N, i + 1)];
  return a.h + (b.h - a.h) * (f - i);
}

/** Scroll progress drawn as an altitude profile, with a hiker marker and live altitude readout. */
export default function ElevationScrollBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const clipRight = useTransform(progress, (p) => `${(1 - p) * 100}%`);
  const clip = useMotionTemplate`inset(0 ${clipRight} 0 0)`;
  const left = useTransform(progress, (p) => `${p * 100}%`);
  const top = useTransform(progress, (p) => `${(toY(heightAt(p)) / 40) * 100}%`);
  const altitude = useTransform(progress, (p) => `▲ ${formatInt(MIN_ALT + heightAt(p) * (MAX_ALT - MIN_ALT))} m`);
  const opacity = useTransform(scrollYProgress, [0, 0.015], [0, 1]);

  return (
    <motion.div aria-hidden="true" style={{ opacity }} className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-3 md:h-4">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={AREA} className="fill-foreground/[0.06]" />
        <path d={LINE} className="fill-none stroke-foreground/15" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <motion.svg viewBox="0 0 1000 40" preserveAspectRatio="none" style={{ clipPath: clip }} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="elev-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1f5c3f" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d={AREA} fill="url(#elev-fill)" />
        <path d={LINE} fill="none" stroke="#f59e0b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </motion.svg>
      <motion.span style={{ left, top }} className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_rgb(245_158_11/0.7)]" />
      <motion.span className="absolute top-full right-3 mt-1 hidden rounded-full bg-background/70 px-2 py-0.5 font-mono text-[0.62rem] text-accent backdrop-blur lg:block">
        {altitude}
      </motion.span>
    </motion.div>
  );
}
