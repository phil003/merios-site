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
 *   0.8  blog index + science
 *   0.7  /compare comparison pages
 *   0.7  about, faq, regular blog posts
 *   0.6  contact, security
 *   0.4  privacy, terms
 *
 * Note: /features and /support are 308 redirects (see next.config.ts) and
 * MUST NOT be listed here — Google treats sitemap entries pointing to
 * redirects as soft-404 signals.
 *
 * dateModified (from frontmatter) takes precedence over date when present.
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
// permanent redirects defined in next.config.ts (/features → /how-it-works,
// /support → /faq). Listing them in the sitemap would cause soft-404 signals.
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/how-it-works', priority: 0.9, changefreq: 'monthly' },
  { path: '/early-access', priority: 0.9, changefreq: 'monthly' },
  { path: '/science', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/compare', priority: 0.8, changefreq: 'monthly' },
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

function readMdxPostsFromDir(dir, urlPrefix, priority, changefreq) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const fm = parseFrontmatter(raw);
      const slug = file.replace(/\.mdx$/, '');
      const lastmod =
        toIsoDate(fm.dateModified) ||
        toIsoDate(fm.date) ||
        new Date().toISOString().split('T')[0];
      const isPillar = (fm.tag || '').toLowerCase() === 'pillar';
      return {
        path: `${urlPrefix}/${slug}`,
        lastmod,
        priority: isPillar ? 0.8 : priority,
        changefreq,
      };
    });
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const blogPosts = readMdxPostsFromDir(BLOG_DIR, '/blog', 0.7, 'monthly');
  const comparePages = readMdxPostsFromDir(COMPARE_DIR, '/compare', 0.7, 'monthly');

  const urls = [
    ...STATIC_ROUTES.map((route) => ({
      ...route,
      lastmod: today,
    })),
    ...blogPosts,
    ...comparePages,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
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
