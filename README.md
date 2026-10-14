# aldeacosmin.ro

Site-ul personal al lui **Aldea Cosmin** — web developer, AI entuziast & vibe coding și fotograf montan din Alba Iulia.
Astro 7 (Islands + View Transitions) · React 19 · Tailwind CSS 4 · Motion · Lenis · Cloudflare Workers (Static Assets).

## Comenzi

| Comandă             | Ce face                                                      |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Server de dezvoltare Astro                                   |
| `npm run check`     | `astro check` (TypeScript + Astro)                           |
| `npm run build`     | Build static în `dist/client` (+ config Worker generat)      |
| `npm run preview`   | Build + `wrangler dev` (runtime-ul real Cloudflare, :8787)   |
| `npm run deploy`    | Build + `wrangler deploy` manual                             |

## Deploy

Push pe `main` → `.github/workflows/deploy.yml` rulează `npm ci`, `npm run check`, `npm run build` și
`cloudflare/wrangler-action@v3` (`wrangler deploy`). Secrete necesare în GitHub:
`CLOUDFLARE_API_TOKEN` (permisiune *Workers Scripts: Edit*) și `CLOUDFLARE_ACCOUNT_ID`.

Site-ul este integral prerandat, așa că adapterul generează un Worker doar cu assets
(`dist/client/wrangler.json`, folosit automat prin `.wrangler/deploy/config.json`). Domeniul
`aldeacosmin.ro` se atașează Worker-ului `aldeacosmin-ro` din dashboard (Custom Domains / Routes).

## Structură

```
src/
  data/          site.ts, portfolio.ts, stories(.json/.ts), massifs.ts, gallery(.json/.ts), videos.ts
  layouts/       BaseLayout.astro — head SEO, JSON-LD, GA4, ClientRouter, dock, footer, consent
  components/
    motion/      HeroMotion, BlurFadeText, AnimatedCounter, MagneticButton,
                 SpotlightBento, PortfolioCard3D, ElevationScrollBar
    ui/          NavbarDock, StoryExplorer, PortfolioGrid, GalleryLightbox, StoryCard, StatBadges,
                 CookieConsent, ThemeToggle, SocialCards, VideoShowcase …
    seo/         SEOHead, SchemaOrg (@graph Person/WebSite/BlogPosting/Mountain/ItemList), Breadcrumbs
    analytics/   GoogleAnalytics.astro (G-VPTMQNJKKP, Consent Mode v2)
  scripts/       site.ts (Lenis, temă, reveal, cuprins), analytics.ts (page_view + data-track), lite-youtube.ts
  pages/         /, /portofoliu, /povesti, /povesti/[slug], /muntii, /muntii/[slug], /galerie,
                 /despre, /contact, /confidentialitate, 404, llms.txt, llms-full.txt, rss.xml
public/          robots.txt, _headers, portfolio/ (capturi ale site-urilor), favicon & icons
```

## Conținut

- **Povești**: `src/data/stories.json` — cele 15 jurnale migrate de pe vechiul site (HTML păstrat, iframe-uri
  YouTube înlocuite cu `<lite-youtube>`, ancore pe `h2` pentru cuprins). Câmpurile `summits` și `videos`
  alimentează badge-urile „Vârfuri atinse” și „Video”.
- **Imagini**: servite de pe `media.aldeacosmin.ro` prin Cloudflare Image Resizing (`/cdn-cgi/image/…`),
  vezi `src/lib/image.ts`.
- **Portofoliu**: `src/data/portfolio.ts`; capturile din `public/portfolio/{slug}-{640|1280}.webp`.

## Analytics (GA4)

`gtag.js` se încarcă doar după acceptul din bannerul de cookies. Evenimente: `page_view` la fiecare
navigare View Transitions, `portfolio_project_click` (`project_domain`), `social_profile_click`
(`platform`), `mountain_filter_select` (`massif_name`). Orice element cu `data-track="…"` și
`data-track-*` trimite automat evenimentul.
