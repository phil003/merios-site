/**
 * Sitemap Generator for Merios Site
 * Reads all MDX blog posts + static routes and generates sitemap.xml
 * Run: node scripts/generate-sitemap.mjs
 * Automatically runs before each build via "prebuild" script
 *
 * Priority scheme:
 *   1.0  home
 *   0.9  top landing pages (how-it-works, early-access)
 *   0.8  pillar blog posts (tag === 'Pillar')
 *   0.8  blog index + science + tools hub
 *   0.7  /compare comparison pages, /tools/* calculators
 *   0.7  about, faq, regular blog posts
 *   0.6  contact, security
 *   0.4  privacy, terms
 *
 * Note: /features and /support are permanent redirects and MUST NOT be listed
 * here — Google treats sitemap entries pointing to redirects as soft-404
 * signals. Both are 308s in next.config.ts (/features → /how-it-works,
 * /support → /faq).
 *
 * /pricing used to be excluded for the same reason, with a comment claiming
 * the redirect lived in the Vercel dashboard rather than in code. It did not:
 * the project has no routing rules configured at all, and bulk redirects are
 * not even available on its plan. The only /pricing redirect was the one in
 * next.config.ts, now removed — /pricing is a real page again and belongs in
 * the sitemap.
 *
 * dateModified (from frontmatter) takes precedence over date when present.
 *
 * lastmod has to be true or Google stops reading it. Articles carry their own
 * date; /blog and each category hub take the newest date among the articles
 * they list. Other static pages carry no lastmod rather than the build date:
 * stamping every page "modified today" on each deploy taught Google to ignore
 * the field, including on articles that really did change.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'content/blog');
const COMPARE_DIR = path.join(ROOT, 'content/compare');
const OUTPUT = path.join(ROOT, 'public/sitemap.xml');
const SITE_URL = 'https://merios.life';

// Static routes with their priorities and change frequencies
// NOTE: /features and /support are intentionally excluded — they are 308
// permanent redirects in next.config.ts (/features → /how-it-works,
// /support → /faq). Listing a redirect in the sitemap creates a soft-404
// signal.
// NOTE: /early-access/us and /early-access/rest are intentionally excluded
// too. They are the prerendered variants that src/middleware.ts serves at
// /early-access, both canonicalised to /early-access; only that URL belongs
// here.
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/how-it-works', priority: 0.9, changefreq: 'monthly' },
  { path: '/early-access', priority: 0.9, changefreq: 'monthly' },
  { path: '/pricing', priority: 0.9, changefreq: 'monthly' },
  { path: '/science', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/compare', priority: 0.8, changefreq: 'monthly' },
  { path: '/tools', priority: 0.8, changefreq: 'monthly' },
  { path: '/tools/phenoage-calculator', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/homa-ir-calculator', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/a1c-calculator', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/zone-2-calculator', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/free-testosterone-calculator', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/tyg-index-calculator', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/transferrin-saturation-calculator', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/sarcopenia-index-calculator', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/lpa-unit-converter', priority: 0.7, changefreq: 'monthly' },
  { path: '/tools/vitamin-d-unit-converter', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/category/blood-tests', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/biomarkers', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/wearables', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/longevity', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/hormones', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/nutrition', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/metabolic-health', priority: 0.7, changefreq: 'weekly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/security', priority: 0.6, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.4, changefreq: 'yearly' },
  { path: '/terms', priority: 0.4, changefreq: 'yearly' },
];

/**
 * Very small YAML-ish frontmatter parser: pulls scalar string values
 * from a --- ... --- header. Good enough for our use case and avoids
 * pulling in gray-matter at build-script time.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return data;
}

function toIsoDate(input) {
  if (!input) return null;
  // Accept YYYY-MM-DD or ISO timestamp; return YYYY-MM-DD
  const d = new Date(input);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split('T')[0];
}

// Compare pages that are now 308 redirects in next.config.ts. Their .mdx files
// are kept for history but the URLs must NOT appear here — a sitemap entry that
// points at a redirect is read by Google as a soft-404 signal.
const REDIRECTED_COMPARE = new Set([
  'merios-vs-function-health',
  'merios-vs-whoop-advanced-labs',
]);

function readMdxPostsFromDir(dir, urlPrefix, priority, changefreq) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .filter((f) => !(urlPrefix === '/compare' && REDIRECTED_COMPARE.has(f.replace(/\.mdx$/, ''))))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      return { file, raw, fm: parseFrontmatter(raw) };
    })
    // `noindex: true` articles stay online but out of the index: a sitemap
    // entry for a noindex page sends Google two opposite signals.
    .filter(({ fm }) => fm.noindex !== 'true')
    .map(({ file, fm }) => {
      const slug = file.replace(/\.mdx$/, '');
      const lastmod =
        toIsoDate(fm.dateModified) ||
        toIsoDate(fm.date) ||
        new Date().toISOString().split('T')[0];
      const isPillar = (fm.tag || '').toLowerCase() === 'pillar';
      return {
        tag: fm.tag || '',
        path: `${urlPrefix}/${slug}`,
        lastmod,
        priority: isPillar ? 0.8 : priority,
        changefreq,
      };
    });
}

// Category slug -> frontmatter tags, read from src/lib/blog-categories.ts
// (the single source for the hubs) so a hub's lastmod follows its articles.
function readCategoryTags() {
  const src = fs.readFileSync(path.join(ROOT, 'src/lib/blog-categories.ts'), 'utf-8');
  const map = {};
  for (const m of src.matchAll(/slug:\s*"([^"]+)"[\s\S]*?tags:\s*\[([^\]]*)\]/g)) {
    map[m[1]] = [...m[2].matchAll(/"([^"]+)"/g)].map((t) => t[1]);
  }
  return map;
}

const newest = (dates) => dates.filter(Boolean).sort().at(-1);

function generateSitemap() {
  const blogPosts = readMdxPostsFromDir(BLOG_DIR, '/blog', 0.7, 'monthly');
  const comparePages = readMdxPostsFromDir(COMPARE_DIR, '/compare', 0.7, 'monthly');
  const categoryTags = readCategoryTags();

  const lastmodFor = (route) => {
    if (route.path === '/blog') return newest(blogPosts.map((p) => p.lastmod));
    const hub = route.path.match(/^\/blog\/category\/(.+)$/);
    if (hub) {
      const tags = categoryTags[hub[1]] ?? [];
      return newest(blogPosts.filter((p) => tags.includes(p.tag)).map((p) => p.lastmod));
    }
    if (route.path === '/compare') return newest(comparePages.map((p) => p.lastmod));
    return undefined;
  };

  const urls = [
    ...STATIC_ROUTES.map((route) => ({ ...route, lastmod: lastmodFor(route) })),
    ...blogPosts,
    ...comparePages,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url.path}</loc>${url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(OUTPUT, xml);
  console.log(
    `✅ Sitemap generated: ${urls.length} URLs (${STATIC_ROUTES.length} static + ${blogPosts.length} blog + ${comparePages.length} compare)`
  );
}

generateSitemap();
