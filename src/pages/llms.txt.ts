import type { APIRoute } from 'astro';
import { EMAIL, PERSON, SITE, SOCIALS, WHATSAPP } from '../data/site';
import { PROJECTS } from '../data/portfolio';
import { STORIES, STORY_TOTALS } from '../data/stories';
import { MASSIFS } from '../data/massifs';
import { formatInt, formatKm } from '../lib/format';

/** llms.txt (https://llmstxt.org) — concise, link-rich map of the site for LLMs and AI search. */
export const GET: APIRoute = () => {
  const body = `# ${PERSON.name}

> ${PERSON.name} este web developer, AI entuziast & vibe coding și fotograf montan din ${PERSON.city}, România, pasionat de securitate cibernetică. Construiește platforme web rapide, soluții cu AI și site-uri optimizate SEO/GEO pentru branduri din Transilvania (${PROJECTS.map((p) => p.domain).join(', ')}) și documentează munții României în ${STORY_TOTALS.stories} jurnale de drumeție (${formatKm(Math.round(STORY_TOTALS.distanceKm))}, +${formatInt(STORY_TOTALS.ascentM)} m ascensiune), fotografii și peste 108 videoclipuri pe YouTube.

Site oficial: ${SITE.url} · Limba conținutului: română · Motto: „${PERSON.motto}”

## Despre

- [Despre ${PERSON.name}](${SITE.url}/despre): profil dublu — web development, AI & vibe coding, securitate cibernetică, infrastructură digitală și marketing online; munte, fotografie de peisaj și videografie outdoor.
- [Contact](${SITE.url}/contact): întrebări despre trasee și ture montane — email ${EMAIL} sau WhatsApp ${WHATSAPP.display} (${WHATSAPP.e164}).

## Portofoliu web (proiecte realizate de ${PERSON.name})

- [Portofoliu](${SITE.url}/portofoliu): toate proiectele, cu descriere, metrici și ce s-a livrat.
${PROJECTS.map((p) => `- [${p.client} — ${p.domain}](${p.url}): ${p.summary} Categorie: ${p.category}. Livrat: ${p.services.join(', ')}.`).join('\n')}

## Povești din munte (jurnale de drumeție)

${STORIES.map((s) => `- [${s.title}](${SITE.url}/povesti/${s.slug}): ${s.massifName}, ${s.dateLabel}. ${s.hike.distance}, ${s.hike.elevation}, altitudine maximă ${s.hike.maxAltitude}, dificultate ${s.hike.difficulty}.`).join('\n')}

## Masive montane documentate

${MASSIFS.map((m) => `- [${m.fullName}](${SITE.url}/muntii/${m.slug}): ${m.tagline} (${m.range}; ${m.counties}).`).join('\n')}

## Profiluri oficiale

${SOCIALS.map((s) => `- [${s.label} ${s.handle}](${s.url}): ${s.description}`).join('\n')}

## Optional

- [llms-full.txt](${SITE.url}/llms-full.txt): conținutul complet al site-ului în Markdown (proiecte, masive și toate jurnalele).
- [Galerie foto](${SITE.url}/galerie): fotografii de peisaj din munții României.
- [Sitemap](${SITE.url}/sitemap.xml)
- [RSS](${SITE.url}/rss.xml)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
