const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };

const decode = (s: string) => s.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m);
const inline = (s: string) =>
  decode(
    s
      .replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, '**$2**')
      .replace(/<(em|i)>([\s\S]*?)<\/\1>/g, '*$2*')
      .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)')
      .replace(/<br\s*\/?>/g, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
  );

/** Converts the migrated story HTML into clean Markdown for /llms-full.txt (charts and embeds dropped). */
export function htmlToMarkdown(html: string): string {
  const out: string[] = [];
  const cleaned = html
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/g, '')
    .replace(/<lite-youtube videoid="([\w-]+)" title="([^"]*)"><\/lite-youtube>/g, '<p>Video: [$2](https://www.youtube.com/watch?v=$1)</p>');

  const blockRe = /<(h2|h3|p|li|blockquote|tr)[^>]*>([\s\S]*?)<\/\1>/g;
  for (const m of cleaned.matchAll(blockRe)) {
    const [, tag, body] = m;
    if (tag === 'tr') {
      const cells = [...body.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => inline(c[1]));
      if (cells.length) out.push(`| ${cells.join(' | ')} |`);
      continue;
    }
    const text = inline(body);
    if (!text) continue;
    if (tag === 'h2') out.push(`\n### ${text}\n`);
    else if (tag === 'h3') out.push(`\n#### ${text}\n`);
    else if (tag === 'li') out.push(`- ${text}`);
    else if (tag === 'blockquote') out.push(`> ${text}\n`);
    else out.push(`${text}\n`);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
