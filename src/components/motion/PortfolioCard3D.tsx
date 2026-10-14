import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Lock, RotateCw } from 'lucide-react';
import { useRef, type PointerEvent } from 'react';
import type { PortfolioProject } from '../../data/portfolio';

interface Props {
  project: PortfolioProject;
  priority?: boolean;
}

const spring = { stiffness: 160, damping: 18, mass: 0.6 };

/** 3D perspective card: tilts on X/Y with the cursor, framed as a macOS browser window. */
export default function PortfolioCard3D({ project, priority = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), spring);
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgb(255 255 255 / 0.13), transparent 45%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const track = {
    'data-track': 'portfolio_project_click',
    'data-track-project-domain': project.domain,
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-float transition-colors duration-500 [transform-style:preserve-3d] hover:border-border-strong"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-surface/80 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-1.5 font-mono text-[0.72rem] text-muted">
          <Lock aria-hidden="true" className="size-3 shrink-0 text-pine-bright" />
          <span className="truncate">
            https://<span className="text-foreground">{project.domain}</span>
          </span>
        </div>
        <RotateCw aria-hidden="true" className="size-3.5 text-muted transition-transform duration-700 group-hover:rotate-180" />
      </div>

      {/* Screenshot */}
      <a href={project.url} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden bg-surface" {...track}>
        <img
          src={`/portfolio/${project.shot}-640.webp`}
          srcSet={`/portfolio/${project.shot}-640.webp 640w, /portfolio/${project.shot}-1280.webp 1280w`}
          sizes="(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
          width={1280}
          height={800}
          alt={`Captură a paginii principale ${project.domain}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
        <span
          className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[0.68rem] tracking-wide text-white backdrop-blur"
          style={{ transform: 'translateZ(30px)' }}
        >
          {project.category}
        </span>
      </a>

      {/* Body */}
      <div className="relative flex flex-1 flex-col gap-4 p-6" style={{ transform: 'translateZ(24px)' }}>
        <h3 className="text-[1.45rem] leading-snug font-medium">{project.title}</h3>
        <p className="text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>

        <dl className="grid grid-cols-3 gap-2">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse rounded-xl border border-border bg-surface/60 px-3 py-2.5">
              <dt className="mt-0.5 text-[0.68rem] leading-tight text-muted">{m.label}</dt>
              <dd className="font-mono text-[0.95rem] leading-tight text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-1.5" aria-label="Ce am livrat">
          {project.services.map((s) => (
            <li key={s} className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.68rem] text-foreground/75">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm font-semibold transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink"
            {...track}
          >
            Vizitează Website-ul Live
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(se deschide {project.domain} într-o filă nouă)</span>
          </a>
        </div>
      </div>

      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glare }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} />
    </motion.article>
  );
}
