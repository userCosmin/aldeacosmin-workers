import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { STORIES } from '../data/stories';
import { MASSIFS } from '../data/massifs';

/** Single /sitemap.xml (same URL as the previous site, no index file or redirect needed). */
export const GET: APIRoute = () => {
  const latest = STORIES[0]?.date;
  const pages: { path: string; lastmod?: string }[] = [
    { path: '/', lastmod: latest },
    { path: '/povesti', lastmod: latest },
    { path: '/muntii', lastmod: latest },
    { path: '/portofoliu' },
    { path: '/galerie' },
    { path: '/despre' },
    { path: '/contact' },
    { path: '/confidentialitate' },
    ...STORIES.map((s) => ({ path: `/povesti/${s.slug}`, lastmod: s.date })),
    ...MASSIFS.map((m) => ({ path: `/muntii/${m.slug}` })),
  ];

  const urls = pages
    .map(({ path, lastmod }) => {
      const loc = path === '/' ? SITE.url : `${SITE.url}${path}`;
      return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
