import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { formatInt } from '../../lib/format';

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/** Number ticker that counts up once when it enters the viewport. */
export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2.2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${prefix}${formatInt(value)}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${formatInt(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, suffix, prefix, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{`${prefix}${formatInt(value)}${suffix}`}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {`${prefix}0${suffix}`}
      </span>
    </span>
  );
}
