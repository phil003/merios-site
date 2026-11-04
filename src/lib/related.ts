import type { BlogPost } from "@/lib/blog";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

/**
 * Related reading for /blog/[slug], computed once for the whole journal.
 *
 * The old rule ("the three newest posts with the same tag") sent every
 * article's links to the same three recent posts: older articles received
 * none, and Google, which reads internal links as a page's importance,
 * left most of them out of its index. Two things change:
 *
 * - Relevance: articles are matched on what they are about (the biomarker or
 *   topic named in the slug and title), so an HbA1c page points to the other
 *   HbA1c and glucose pages first, not to whatever was published last.
 * - Coverage: besides the three cards, each article lists three more links,
 *   handed out so that every article is linked from at least
 *   MIN_INBOUND others — each time from the articles closest to it in topic.
 *
 * Deterministic (ties broken by slug), so a build always produces the same
 * links. Calculators get a link from the articles about their marker.
 */

type Marker = { key: string; cluster: string; weight: number; pattern: RegExp };

const MARKERS: Marker[] = [
  { key: "a1c", cluster: "metabolic", weight: 3, pattern: /a1c/ },
  { key: "glucose", cluster: "metabolic", weight: 3, pattern: /glucose|blood sugar|\bcgm\b/ },
  { key: "insulin", cluster: "metabolic", weight: 3, pattern: /insulin|homa|\btyg\b/ },
  { key: "diabetes", cluster: "metabolic", weight: 2, pattern: /diabet|\blada\b/ },
  { key: "ldl", cluster: "lipids", weight: 3, pattern: /\bldl\b/ },
  { key: "cholesterol", cluster: "lipids", weight: 3, pattern: /cholesterol|statin/ },
  { key: "apob", cluster: "lipids", weight: 3, pattern: /apob/ },
  { key: "lpa", cluster: "lipids", weight: 3, pattern: /lp\(a\)|\blp-a\b|lipoprotein/ },
  { key: "triglycerides", cluster: "lipids", weight: 3, pattern: /triglycerid/ },
  { key: "hdl", cluster: "lipids", weight: 2, pattern: /\bhdl\b/ },
  { key: "cac", cluster: "lipids", weight: 2, pattern: /\bcac\b|coronary/ },
  { key: "crp", cluster: "inflammation", weight: 3, pattern: /\bcrp\b|hs-crp|inflammat/ },
  { key: "homocysteine", cluster: "inflammation", weight: 3, pattern: /homocysteine/ },
  { key: "thyroid", cluster: "hormones", weight: 3, pattern: /\btsh\b|thyroid|\btpo\b|hashimoto/ },
  { key: "testosterone", cluster: "hormones", weight: 3, pattern: /testosterone|\bshbg\b|boron/ },
  { key: "cortisol", cluster: "hormones", weight: 3, pattern: /cortisol/ },
  { key: "igf", cluster: "hormones", weight: 3, pattern: /\bigf/ },
  { key: "iron", cluster: "blood", weight: 3, pattern: /ferritin|\biron\b|transferrin|lactoferrin/ },
  { key: "cbc", cluster: "blood", weight: 3, pattern: /hemoglobin|hematocrit|\bmcv\b|\bmch\b|\bcbc\b|white blood/ },
  { key: "liver", cluster: "organs", weight: 3, pattern: /\balt\b|\bast\b|\bggt\b|liver/ },
  { key: "kidney", cluster: "organs", weight: 3, pattern: /creatinine|cystatin|kidney|\buric\b/ },
  { key: "vitamin-d", cluster: "nutrition", weight: 3, pattern: /vitamin[ -]d\b|\bd3\b/ },
  { key: "b12", cluster: "nutrition", weight: 3, pattern: /\bb12\b/ },
  { key: "magnesium", cluster: "nutrition", weight: 3, pattern: /magnesium/ },
  { key: "omega-3", cluster: "nutrition", weight: 3, pattern: /omega/ },
  { key: "supplements", cluster: "nutrition", weight: 1, pattern: /supplement|\bstack\b|\bk2\b/ },
  { key: "hrv", cluster: "wearables", weight: 3, pattern: /\bhrv\b|heart rate variability/ },
  { key: "heart-rate", cluster: "wearables", weight: 2, pattern: /heart[ -]rate/ },
  { key: "sleep", cluster: "wearables", weight: 3, pattern: /sleep|\boura\b/ },
  { key: "vo2", cluster: "wearables", weight: 3, pattern: /vo2|zone[ -]2|\bcardio\b/ },
  { key: "wearable", cluster: "wearables", weight: 1, pattern: /apple watch|apple-watch|whoop|garmin|wearable/ },
  { key: "bio-age", cluster: "longevity", weight: 2, pattern: /biological[ -]age|phenoage|aging/ },
  { key: "longevity", cluster: "longevity", weight: 1, pattern: /longevity/ },
  { key: "muscle", cluster: "longevity", weight: 3, pattern: /muscle|sarcopenia|glp-1/ },
  { key: "blood-test", cluster: "basics", weight: 1, pattern: /blood[ -]tests?\b|blood[ -]work|lab results|test results/ },
  { key: "fasting", cluster: "basics", weight: 2, pattern: /fasting|\bfast\b|coffee/ },
  { key: "apps", cluster: "basics", weight: 1, pattern: /\bapps?\b/ },
];

/** Free calculators, linked from the articles about their marker (first match wins). */
const TOOLS: { markers: string[]; href: string; title: string }[] = [
  { markers: ["a1c", "glucose", "diabetes"], href: "/tools/a1c-calculator", title: "A1C to average blood sugar calculator" },
  { markers: ["insulin"], href: "/tools/homa-ir-calculator", title: "HOMA-IR calculator" },
  { markers: ["triglycerides", "hdl"], href: "/tools/tyg-index-calculator", title: "TyG index calculator" },
  { markers: ["lpa"], href: "/tools/lpa-unit-converter", title: "Lp(a) unit converter" },
  { markers: ["testosterone"], href: "/tools/free-testosterone-calculator", title: "Free testosterone calculator" },
  { markers: ["iron"], href: "/tools/transferrin-saturation-calculator", title: "Transferrin saturation calculator" },
  { markers: ["bio-age"], href: "/tools/phenoage-calculator", title: "PhenoAge biological age calculator" },
  { markers: ["muscle"], href: "/tools/sarcopenia-index-calculator", title: "Sarcopenia index calculator" },
  { markers: ["vo2", "heart-rate"], href: "/tools/zone-2-calculator", title: "Zone 2 heart rate calculator" },
];

const CARDS = 3;
const MORE = 3;
const MIN_INBOUND = 4;

export type RelatedLink = {
  href: string;
  title: string;
  /** Tag of an article, or "Calculator". */
  kind: string;
};

export type Related = { cards: BlogPost[]; more: RelatedLink[] };

function markersOf(post: BlogPost): Set<string> {
  const text = `${post.slug.replace(/-/g, " ")} ${post.slug} ${post.title}`.toLowerCase();
  return new Set(MARKERS.filter((m) => m.pattern.test(text)).map((m) => m.key));
}

function categoryOf(tag: string): string | undefined {
  return BLOG_CATEGORIES.find((c) => c.tags.includes(tag))?.slug;
}

let cache: { key: string; map: Map<string, Related> } | null = null;

export function getRelated(slug: string, posts: BlogPost[]): Related {
  const key = posts.map((p) => p.slug).join(",");
  if (!cache || cache.key !== key) cache = { key, map: build(posts) };
  return cache.map.get(slug) ?? { cards: [], more: [] };
}

function build(input: BlogPost[]): Map<string, Related> {
  const posts = [...input].sort((a, b) => a.slug.localeCompare(b.slug));
  const n = posts.length;
  const marks = posts.map(markersOf);
  const weight = new Map(MARKERS.map((m) => [m.key, m.weight]));
  const cluster = new Map(MARKERS.map((m) => [m.key, m.cluster]));
  const clusters = marks.map((ms) => new Set([...ms].map((k) => cluster.get(k))));
  const cats = posts.map((p) => categoryOf(p.tag));

  const sim: number[][] = posts.map((_, i) =>
    posts.map((__, j) => {
      if (i === j) return -Infinity;
      let s = 0;
      for (const k of marks[i]) if (marks[j].has(k)) s += weight.get(k) ?? 1;
      if ([...clusters[i]].some((c) => clusters[j].has(c))) s += 1.5;
      if (cats[i] && cats[i] === cats[j]) s += 1;
      if (posts[i].tag === posts[j].tag) s += 0.5;
      return s;
    }),
  );

  const inbound = new Array<number>(n).fill(0);
  const links: Set<number>[] = posts.map(() => new Set());
  const cards: number[][] = posts.map(() => []);
  const more: number[][] = posts.map(() => []);
  // Equal scores go to the less-linked article, then alphabetical order.
  const byScore = (i: number) => (a: number, b: number) =>
    sim[i][b] - sim[i][a] || inbound[a] - inbound[b] || a - b;

  // Articles marked `noindex` keep their own related links (readers who land
  // there still get somewhere useful) but are never picked as a target: the
  // site should not spend its internal links on pages kept out of the index.
  const linkable = (j: number) => !posts[j].noindex;

  // 1. Cards: the three closest articles.
  for (let i = 0; i < n; i++) {
    const picks = posts
      .map((_, j) => j)
      .filter((j) => j !== i && linkable(j))
      .sort(byScore(i))
      .slice(0, CARDS);
    for (const j of picks) {
      cards[i].push(j);
      links[i].add(j);
      inbound[j]++;
    }
  }

  // 2. Coverage: the least-linked article gets a link from the closest
  //    article that still has a free slot, until all reach MIN_INBOUND.
  for (;;) {
    const order = posts.map((_, j) => j).filter((j) => linkable(j) && inbound[j] < MIN_INBOUND);
    if (order.length === 0) break;
    order.sort((a, b) => inbound[a] - inbound[b] || a - b);
    let assigned = false;
    for (const t of order) {
      const source = posts
        .map((_, i) => i)
        .filter((i) => i !== t && more[i].length < MORE && !links[i].has(t) && sim[i][t] > 0)
        .sort((a, b) => sim[b][t] - sim[a][t] || a - b)[0];
      if (source === undefined) continue;
      more[source].push(t);
      links[source].add(t);
      inbound[t]++;
      assigned = true;
      break;
    }
    if (!assigned) break;
  }

  // 3. Remaining slots: next closest articles.
  for (let i = 0; i < n; i++) {
    const picks = posts
      .map((_, j) => j)
      .filter((j) => j !== i && linkable(j) && !links[i].has(j))
      .sort(byScore(i))
      .slice(0, MORE - more[i].length);
    for (const j of picks) {
      more[i].push(j);
      links[i].add(j);
      inbound[j]++;
    }
  }

  const result = new Map<string, Related>();
  posts.forEach((post, i) => {
    const tool = TOOLS.find((t) => t.markers.some((m) => marks[i].has(m)));
    const moreLinks: RelatedLink[] = more[i]
      .sort((a, b) => sim[i][b] - sim[i][a] || a - b)
      .map((j) => ({ href: `/blog/${posts[j].slug}`, title: posts[j].title, kind: posts[j].tag }));
    if (tool) moreLinks.unshift({ href: tool.href, title: tool.title, kind: "Calculator" });
    result.set(post.slug, { cards: cards[i].map((j) => posts[j]), more: moreLinks });
  });
  return result;
}
