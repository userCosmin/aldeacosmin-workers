/**
 * <lite-youtube videoid="…" title="…"> — click-to-load YouTube facade.
 * Shows the poster only (lazy, via IntersectionObserver) and swaps in a youtube-nocookie
 * iframe on click, so no third-party JS or cookies load until the visitor asks for the video.
 */
const PLAY_ICON =
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.9-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z"/></svg>';

let warmed = false;
function warmConnections() {
  if (warmed) return;
  warmed = true;
  for (const href of ['https://www.youtube-nocookie.com', 'https://www.google.com', 'https://i.ytimg.com']) {
    const l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = href;
    document.head.append(l);
  }
}

const posterObserver =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.style.backgroundImage = `url("https://i.ytimg.com/vi/${el.getAttribute('videoid')}/hqdefault.jpg")`;
            posterObserver?.unobserve(el);
          }
        },
        { rootMargin: '300px' },
      )
    : null;

class LiteYouTube extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = '1';
    const id = this.getAttribute('videoid');
    if (!id) return;
    const title = this.getAttribute('title') || 'Video YouTube';

    const label = document.createElement('span');
    label.className = 'lty-title';
    label.textContent = title;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `Redă video: ${title}`);
    btn.innerHTML = PLAY_ICON;

    this.append(label, btn);
    if (posterObserver) posterObserver.observe(this);
    else this.style.backgroundImage = `url("https://i.ytimg.com/vi/${id}/hqdefault.jpg")`;

    this.addEventListener('pointerover', warmConnections, { once: true });
    this.addEventListener('click', () => this.activate(id, title), { once: true });
  }

  activate(id: string, title: string) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&playsinline=1`;
    iframe.title = title;
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    this.classList.add('lty-active');
    this.append(iframe);
    iframe.focus();
  }
}

if (!customElements.get('lite-youtube')) customElements.define('lite-youtube', LiteYouTube);
