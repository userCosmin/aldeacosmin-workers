import type { APIRoute } from 'astro';
import { EMAIL, PERSON, SITE, SOCIALS } from '../data/site';
import { PROJECTS } from '../data/portfolio';
import { STORIES } from '../data/stories';
import { MASSIFS, massifStats } from '../data/massifs';
import { formatAscent, formatKm } from '../lib/format';
import { htmlToMarkdown } from '../lib/markdown';

/** llms-full.txt — the whole site as clean Markdown, generated at build time. */
export const GET: APIRoute = () => {
  const projects = PROJECTS.map(
    (p) => `### ${p.title}

- URL: ${p.url}
- Client: ${p.client}
- Categorie: ${p.category}
- Realizat de: ${PERSON.name}
- Highlights: ${p.highlights.join('; ')}
- Metrici: ${p.metrics.map((m) => `${m.value} ${m.label}`).join('; ')}
- Ce s-a livrat: ${p.services.join(', ')}

${p.description}`,
  ).join('\n\n');

  const massifs = MASSIFS.map((m) => {
    const st = massifStats(m.slug);
    return `### ${m.fullName}

- URL: ${SITE.url}/muntii/${m.slug}
- Lanț: ${m.range} · Județe: ${m.counties}
- Coordonate de referință: ${m.geo.lat}, ${m.geo.lng}
- Documentat: ${st.stories} jurnale, ${formatKm(Math.round(st.distanceKm * 10) / 10)}, ${formatAscent(st.ascentM)}${st.summits.length ? `, vârfuri: ${st.summits.join(', ')}` : ''}

${m.intro.join('\n\n')}

${m.highlights.map((h) => `- **${h.title}:** ${h.text}`).join('\n')}`;
  }).join('\n\n');

  const stories = STORIES.map(
    (s) => `## ${s.title}

- URL: ${SITE.url}/povesti/${s.slug}
- Autor: ${PERSON.name}
- Data: ${s.date} · Masiv: ${s.massifName} · Timp de citire: ${s.readingMinutes} min
- Dificultate: ${s.hike.difficulty} · Durată: ${s.hike.duration}
- Distanță: ${s.hike.distance} · Diferență de nivel: ${s.hike.elevation} · Altitudine maximă: ${s.hike.maxAltitude}
- Punct de start: ${s.hike.startPoint} · Sezon recomandat: ${s.hike.season}${s.hike.markings ? ` · Marcaje: ${s.hike.markings}` : ''}
${s.summits.length ? `- Vârfuri atinse: ${s.summits.join(', ')}\n` : ''}${s.videos.length ? `- Video: ${s.videos.map((v) => `https://www.youtube.com/watch?v=${v.id}`).join(', ')}\n` : ''}
> ${s.excerpt}

${htmlToMarkdown(s.content)}`,
  ).join('\n\n---\n\n');

  const body = `# ${PERSON.name} — conținut complet aldeacosmin.ro

> ${PERSON.name} (${PERSON.alternateName.join(', ')}) este web developer, AI entuziast & vibe coding și fotograf montan din ${PERSON.city}, județul ${PERSON.region}, România. Specialist în web development, implementări AI (vibe coding, integrări LLM), infrastructură digitală și marketing online; pasionat de securitate cibernetică, munte, fotografie de peisaj și videografie outdoor.

## Identitate

- Nume: ${PERSON.name}
- Rol: ${PERSON.jobTitle} (${PERSON.jobTitleRo})
- Locație: ${PERSON.city}, ${PERSON.region}, România
- Site: ${SITE.url}
- Email: ${EMAIL}
- Profiluri oficiale: ${SOCIALS.map((s) => `${s.label} ${s.url}`).join(' · ')}
- YouTube: arhivă de peste 108 videoclipuri și jurnale video montane

# Portofoliu web

${projects}

# Masive montane

${massifs}

# Povești din munte

${stories}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
