import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { FAQItem } from './blog';

const COMPARE_DIR = path.join(process.cwd(), 'content/compare');

export interface ComparePost {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  competitor: string;
  date: string;
  dateModified?: string;
  readTime: string;
  image?: string;
  faq?: FAQItem[];
  /**
   * The editor's closing verdict ("Our take"), from the frontmatter
   * `verdict:`. Optional: without it the page shows no verdict block (the
   * description is already the hero's subtitle, so it is never reused).
   */
  verdict?: string;
  /** Topic chips for the comparison card (frontmatter `tags:`), if any. */
  tags?: string[];
  content: string;
}

function parseCompare(slug: string, raw: string): ComparePost {
  const { data, content } = matter(raw);
  const verdict = typeof data.verdict === 'string' ? data.verdict.trim() : '';
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t: unknown): t is string => typeof t === 'string' && t.trim() !== '')
    : [];
  return {
    slug,
    title: data.title || '',
    seoTitle: data.seoTitle || undefined,
    description: data.description || '',
    competitor: data.competitor || '',
    date: data.date || '',
    dateModified: data.dateModified || data.date || '',
    readTime: data.readTime || '8 min read',
    image: data.image || undefined,
    faq: Array.isArray(data.faq) ? data.faq : undefined,
    verdict: verdict || undefined,
    tags: tags.length > 0 ? tags : undefined,
    content,
  };
}

// Compare pages that are now 308 permanent redirects in next.config.ts. Their
// .mdx files are kept for history, but the slugs must not be surfaced anywhere
// that produces a link: the /compare hub grid, its ItemList JSON-LD, and
// generateStaticParams all read from here. Kept in sync with
// REDIRECTED_COMPARE in scripts/generate-sitemap.mjs.
const REDIRECTED_SLUGS = new Set([
  'merios-vs-function-health',
  'merios-vs-whoop-advanced-labs',
]);

export function getAllCompareSlugs(): string[] {
  if (!fs.existsSync(COMPARE_DIR)) return [];
  return fs
    .readdirSync(COMPARE_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .filter((slug) => !REDIRECTED_SLUGS.has(slug));
}

export function getComparePostBySlug(slug: string): ComparePost | null {
  const filePath = path.join(COMPARE_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return parseCompare(slug, raw);
}

export function getAllComparePosts(): ComparePost[] {
  return getAllCompareSlugs()
    .map((slug) => getComparePostBySlug(slug))
    .filter((p): p is ComparePost => p !== null)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/* ─── What a comparison is about ───────────────────────────────────────────
   Most pages compare two third parties ("Lingo vs Stelo"); a few look at
   one product ("Function Health Review / Cost / Alternatives"). The subject
   is read from the title's head (before its "(2026)" or ":"), so the card
   cover and the breadcrumb always name the page's real subject. */

export type CompareSubject =
  | { kind: 'versus'; left: string; right: string }
  | { kind: 'single'; name: string; /** "review", "cost", "alternatives"… */ angle: string };

export function getCompareSubject(
  post: Pick<ComparePost, 'title' | 'competitor'>,
): CompareSubject {
  const head = post.title.split(/\s\(|:\s/)[0].trim();
  const sides = head.split(/\s+vs\.?\s+/i);
  if (sides.length === 2 && sides[0] && sides[1]) {
    return { kind: 'versus', left: sides[0].trim(), right: sides[1].trim() };
  }
  const angle = head.match(/^(.*\S)\s+(review|cost|costs|price|pricing|alternatives?)$/i);
  if (angle) {
    return { kind: 'single', name: angle[1], angle: angle[2].toLowerCase() };
  }
  return { kind: 'single', name: post.competitor || head, angle: '' };
}

/** "Lingo vs Stelo", "Function Health review": the breadcrumb's last item. */
export function compareSubjectLabel(subject: CompareSubject): string {
  if (subject.kind === 'versus') return `${subject.left} vs ${subject.right}`;
  return subject.angle ? `${subject.name} ${subject.angle}` : subject.name;
}

function subjectNames(post: ComparePost): string[] {
  const subject = getCompareSubject(post);
  const names = subject.kind === 'versus' ? [subject.left, subject.right] : [subject.name];
  return names.map((n) => n.toLowerCase());
}

/**
 * "Keep exploring" under a comparison: the pages that share a product with
 * this one first (Function Health review → its cost and alternatives pages,
 * then the other Function Health comparisons), then shared tags, then the
 * newest. Deterministic: ties go to the newer page, then the slug.
 */
export function getRelatedComparePosts(
  post: ComparePost,
  posts: ComparePost[] = getAllComparePosts(),
  limit = 3,
): ComparePost[] {
  const mine = new Set(subjectNames(post));
  const myTags = new Set((post.tags ?? []).map((t) => t.toLowerCase()));
  const score = (other: ComparePost): number => {
    let s = 0;
    for (const name of subjectNames(other)) if (mine.has(name)) s += 2;
    if (other.competitor && other.competitor === post.competitor) s += 1;
    for (const tag of other.tags ?? []) if (myTags.has(tag.toLowerCase())) s += 0.5;
    return s;
  };
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, s: score(p), t: new Date(p.date).getTime() }))
    .sort((a, b) => b.s - a.s || b.t - a.t || a.p.slug.localeCompare(b.p.slug))
    .slice(0, limit)
    .map(({ p }) => p);
}
