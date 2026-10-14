const MEDIA_HOST = 'https://media.aldeacosmin.ro';

interface ImageOptions {
  width: number;
  height?: number;
  quality?: number;
  fit?: 'cover' | 'contain' | 'scale-down';
  format?: 'auto' | 'jpeg' | 'webp';
}

/**
 * Cloudflare Image Resizing on media.aldeacosmin.ro (/cdn-cgi/image/…).
 * format=auto serves AVIF/WebP based on the browser's Accept header.
 * URLs from other hosts are returned unchanged.
 */
export function cfImage(src: string, { width, height, quality = 72, fit = 'cover', format = 'auto' }: ImageOptions): string {
  if (!src.startsWith(MEDIA_HOST + '/')) return src;
  const path = src.slice(MEDIA_HOST.length + 1);
  const opts = [`width=${width}`, height ? `height=${height}` : '', `fit=${fit}`, `quality=${quality}`, `format=${format}`]
    .filter(Boolean)
    .join(',');
  return `${MEDIA_HOST}/cdn-cgi/image/${opts}/${path}`;
}

export function cfSrcSet(src: string, widths: number[], opts: Omit<ImageOptions, 'width'> & { ratio?: number } = {}): string {
  const { ratio, ...rest } = opts;
  return widths
    .map((w) => `${cfImage(src, { ...rest, width: w, height: ratio ? Math.round(w / ratio) : undefined })} ${w}w`)
    .join(', ');
}

export const ogImage = (src: string) => cfImage(src, { width: 1200, height: 630, quality: 80, format: 'jpeg' });
