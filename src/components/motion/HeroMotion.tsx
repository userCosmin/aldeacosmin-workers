import { MotionConfig, motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MapPin } from 'lucide-react';
import { useRef, type CSSProperties } from 'react';
import AnimatedCounter from './AnimatedCounter';
import BlurFadeText from './BlurFadeText';
import MagneticButton from './MagneticButton';

interface Props {
  image: { src: string; srcSet: string; sizes: string; alt: string };
  stats: { value: number; suffix: string; label: string }[];
}

/** Layered ridgelines drawn over the photo — each layer moves at a different parallax speed. */
const RIDGE_BACK =
  'M0,210 L90,170 L160,190 L250,120 L330,165 L420,95 L500,150 L590,110 L680,160 L760,80 L850,140 L930,105 L1020,150 L1110,90 L1200,145 L1290,115 L1380,160 L1440,140 L1440,320 L0,320 Z';
const RIDGE_FRONT =
  'M0,250 L120,215 L210,240 L320,190 L410,230 L520,200 L610,245 L720,205 L820,240 L930,195 L1040,235 L1150,210 L1260,250 L1360,220 L1440,240 L1440,320 L0,320 Z';

/**
 * Cinematic hero: photo + aurora mist + parallax ridgelines, kinetic headline,
 * Ansel Adams quote, magnetic CTAs and number tickers.
 */
export default function HeroMotion({ image, stats }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const backY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden pt-28 pb-10 md:pt-36 md:pb-14">
        <motion.div style={{ y: photoY, scale: photoScale }} className="absolute inset-0 -z-30 will-change-transform">
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes}
            alt={image.alt}
            width={1600}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[50%_35%]"
          />
        </motion.div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background/75 via-background/35 to-background" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_20%_60%,var(--background),transparent_70%)] opacity-75" />
        <div className="aurora -z-20">
          <span />
          <span />
          <span />
        </div>
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ y: backY }}
          className="absolute inset-x-0 bottom-[18%] -z-10 h-[34vh] w-full fill-background/20"
        >
          <path d={RIDGE_BACK} />
        </motion.svg>
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ y: frontY }}
          className="absolute inset-x-0 -bottom-[6%] -z-10 h-[38vh] w-full fill-background/80"
        >
          <path d={RIDGE_FRONT} />
        </motion.svg>

        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-x relative">
          <p className="fade-up glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[0.7rem] tracking-[0.16em] text-foreground/85 uppercase">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <MapPin aria-hidden="true" className="size-3.5 text-accent" />
            Alba Iulia · Web Developer, AI entuziast & Vibe Coding
          </p>

          <BlurFadeText
            as="h1"
            text="Aldea Cosmin"
            highlight={['Cosmin']}
            delay={0.15}
            step={0.12}
            className="text-[clamp(3rem,1.6rem+7vw,7.5rem)] leading-[0.95] font-medium tracking-[-0.035em]"
          />

          <p className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl" style={{ '--d': '0.55s' } as CSSProperties}>
            Construiesc platforme web rapide și soluții cu AI pentru branduri din Transilvania, sunt pasionat de securitate cibernetică și documentez sălbăticia Carpaților — pas cu pas, cadru cu cadru.
          </p>

          <figure className="fade-up mt-8 max-w-xl border-l-2 border-accent/80 pl-5" style={{ '--d': '0.75s' } as CSSProperties}>
            <blockquote className="font-display text-[1.15rem] leading-relaxed font-light text-foreground/90 md:text-xl">
              „Când cuvintele devin neclare, mă concentrez pe fotografii. Când imaginile devin inadecvate, mă mulțumesc cu tăcerea.”
            </blockquote>
            <figcaption className="mt-2 font-mono text-xs tracking-[0.16em] text-muted uppercase">— Ansel Adams</figcaption>
          </figure>

          <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ '--d': '0.95s' } as CSSProperties}>
            <MagneticButton href="/portofoliu" label="Explorează Portofoliul Web" icon="code" />
            <MagneticButton href="/povesti" label="Citește Poveștile din Munte" icon="mountain" variant="ghost" />
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-3 md:mt-16 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="fade-up glass flex flex-col-reverse rounded-2xl px-5 py-4"
                style={{ '--d': `${1.1 + i * 0.1}s` } as CSSProperties}
              >
                <dt className="mt-2 text-[0.8rem] leading-snug text-muted">{s.label}</dt>
                <dd className="font-display text-[clamp(2rem,1.4rem+2vw,2.9rem)] leading-none font-medium text-foreground">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <a
          href="#identitate"
          aria-label="Derulează la secțiunea următoare"
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent md:block"
        >
          <ChevronDown aria-hidden="true" className="size-6 animate-bounce" />
        </a>
      </section>
    </MotionConfig>
  );
}
