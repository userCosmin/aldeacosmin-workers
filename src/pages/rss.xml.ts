import type { APIRoute } from 'astro';
import { PERSON, SITE } from '../data/site';
import { STORIES } from '../data/stories';
import { cfImage } from '../lib/image';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = () => {
  const items = STORIES.map(
    (s) => `    <item>
      <title>${esc(s.title)}</title>
      <link>${SITE.url}/povesti/${s.slug}</link>
      <guid isPermaLink="true">${SITE.url}/povesti/${s.slug}</guid>
      <pubDate>${new Date(`${s.date}T08:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(s.massifName)}</category>
      <dc:creator>${esc(PERSON.name)}</dc:creator>
      <description>${esc(s.excerpt)}</description>
      <enclosure url="${esc(cfImage(s.image, { width: 1200, height: 675, format: 'jpeg' }))}" type="image/jpeg" length="0" />
    </item>`,
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Povești din Munte — ${esc(PERSON.shortName)}</title>
    <link>${SITE.url}/povesti</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Jurnale de drumeție și analize tehnice de traseu din munții României.</description>
    <language>ro-RO</language>
    <lastBuildDate>${new Date(`${STORIES[0].date}T08:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
