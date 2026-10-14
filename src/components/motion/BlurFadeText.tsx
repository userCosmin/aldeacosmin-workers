import type { CSSProperties, JSX } from 'react';

interface Props {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  step?: number;
  /** Words rendered with the glacier→amber gradient. */
  highlight?: string[];
}

/**
 * Kinetic word-by-word blur/fade reveal (SplitTextReveal).
 * Pure CSS animation (.bf-word in global.css) so it runs at first paint without hydration,
 * and is disabled by prefers-reduced-motion.
 */
export default function BlurFadeText({ text, as = 'span', className, delay = 0, step = 0.08, highlight = [] }: Props) {
  const Tag = as as 'span';
  const words = text.split(/\s+/);
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            className={`bf-word${highlight.includes(word) ? ' text-gradient' : ''}`}
            style={{ '--bf-i': i, '--bf-delay': `${delay}s`, '--bf-step': `${step}s` } as CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
