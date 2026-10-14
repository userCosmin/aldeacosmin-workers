import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Code2, Mountain } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';

const ICONS = { arrow: ArrowUpRight, code: Code2, mountain: Mountain } as const;

interface Props {
  href: string;
  label: string;
  variant?: 'primary' | 'ghost';
  icon?: keyof typeof ICONS;
  /** Fraction of the cursor offset the button follows. */
  strength?: number;
  className?: string;
}

/** CTA that subtly follows the cursor (spring physics), with the label moving a bit further for depth. */
export default function MagneticButton({ href, label, variant = 'primary', icon = 'arrow', strength = 0.32, className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 16, mass: 0.5 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const lx = useTransform(sx, (v) => v * 0.45);
  const ly = useTransform(sy, (v) => v * 0.45);
  const Icon = ICONS[icon];

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-7 text-[0.95rem] font-semibold tracking-tight transition-colors duration-300 will-change-transform';
  const styles =
    variant === 'primary'
      ? 'bg-accent text-accent-ink shadow-[0_10px_40px_-10px_rgb(245_158_11/0.7)] hover:bg-accent-strong'
      : 'glass text-foreground hover:border-border-strong';

  return (
    <motion.a ref={ref} href={href} onPointerMove={onMove} onPointerLeave={reset} style={{ x: sx, y: sy }} className={`${base} ${styles} ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <motion.span style={{ x: lx, y: ly }} className="relative flex items-center gap-3">
        {label}
        <Icon aria-hidden="true" className="size-[18px] transition-transform duration-300 group-hover:rotate-12" />
      </motion.span>
    </motion.a>
  );
}
