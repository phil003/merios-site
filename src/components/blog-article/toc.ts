/**
 * Headings extraction + slugify helpers for the /blog/[slug] article.
 *
 * - `slugify(raw)` produces a stable, URL-safe, ASCII-lowercase id used both
 *   by the sticky TOC and by the MDX `h2` / `h3` components so anchor
 *   navigation resolves correctly.
 * - `extractHeadings(markdown)` scans the raw MDX source for `##` / `###`
 *   lines (ignoring code fences) and returns them in document order with
 *   pre-computed slug ids — so the TOC can be rendered on the server and
 *   shipped to the client as a static array.
 */

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/['\u2018\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const FENCE_RE = /^```/;
const HEADING_RE = /^(#{2,3})\s+(.+?)\s*$/;

/**
 * Strip inline markdown syntax (bold, italic, code spans, links) from a heading
 * text so the slug + visible label reads cleanly.
 */
function stripInlineMarkdown(raw: string): string {
  return raw
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split(/\r?\n/);
  const out: Heading[] = [];
  const seen = new Map<string, number>();
  let inFence = false;

  for (const line of lines) {
    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = HEADING_RE.exec(line);
    if (!match) continue;

    const hashes = match[1];
    const text = stripInlineMarkdown(match[2]);
    if (!text) continue;

    const level = (hashes.length === 2 ? 2 : 3) as 2 | 3;
    const base = slugify(text);
    if (!base) continue;

    // De-dupe repeated headings by appending -2, -3 …
    const count = seen.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count + 1}`;
    seen.set(base, count + 1);

    out.push({ id, text, level });
  }

  return out;
}
