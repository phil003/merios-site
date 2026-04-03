/**
 * Sitemap Generator for Merios Site
 * Reads all MDX blog posts + static routes and generates sitemap.xml
 * Run: node scripts/generate-sitemap.mjs
 * Automatically runs before each build via "prebuild" script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'content/blog');
const OUTPUT = path.join(ROOT, 'public/sitemap.xml');
const SITE_URL = 'https://merios.life';

// Static routes with their priorities and change frequencies
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/features', priority: 0.9, changefreq: 'monthly' },
  { path: '/how-it-works', priority: 0.9, changefreq: 'monthly' },
  { path: '/science', priority: 0.8, changefreq: 'monthly' },
  { path: '/pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/early-access', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/privacy', priority: 0.4, changefreq: 'yearly' },
  { path: '/terms', priority: 0.4, changefreq: 'yearly' },
];

function getBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const dateMatch = content.match(/date:\s*["'](.+?)["']/);
      const slug = file.replace(/\.mdx$/, '');
      return {
        path: `/blog/${slug}`,
        lastmod: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
        priority: 0.7,
        changefreq: 'monthly',
      };
    });
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const blogPosts = getBlogPosts();

  const urls = [
    ...STATIC_ROUTES.map(route => ({
      ...route,
      lastmod: today,
    })),
    ...blogPosts,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${SITE_URL}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  fs.writeFileSync(OUTPUT, xml);
  console.log(`✅ Sitemap generated: ${urls.length} URLs (${STATIC_ROUTES.length} static + ${blogPosts.length} blog posts)`);
}

generateSitemap();
