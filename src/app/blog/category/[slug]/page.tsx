import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { BreadcrumbSchema } from "@/components/StructuredData";
import CategoryNav from "@/components/blog/CategoryNav";
import { getBlogGradient } from "@/components/blog/gradients";
import styles from "@/components/blog/blog.module.css";
import { getAllPosts } from "@/lib/blog";
import {
  BLOG_CATEGORIES,
  getBlogCategory,
  getCategoryCounts,
  getPostsInCategory,
} from "@/lib/blog-categories";

// Category configuration (slugs, titles, descriptions, tag mapping) lives in
// src/lib/blog-categories.ts, shared with the topic navigation and the
// per-category Open Graph card.

const SITE_URL = "https://merios.life";

// ── Static params ───────────────────────────────────────────────────────────
export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

// ── Metadata ────────────────────────────────────────────────────────────────
// og:image (and, through it, twitter:image) comes from ./opengraph-image.tsx.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) return { title: "Category Not Found" };

  const url = `${SITE_URL}/blog/category/${category.slug}`;
  return {
    title: `${category.title} — Articles & Guides`,
    description: category.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.title} — Articles & Guides | Merios`,
      description: category.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} — Articles & Guides | Merios`,
      description: category.metaDescription,
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) notFound();

  const allPosts = getAllPosts();
  const posts = getPostsInCategory(category, allPosts);
  const counts = getCategoryCounts(allPosts);
  const url = `${SITE_URL}/blog/category/${category.slug}`;

  // CollectionPage + ItemList JSON-LD
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} — Articles & Guides`,
    url,
    description: category.metaDescription,
    isPartOf: {
      "@type": "WebSite",
      name: "Merios",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
        description: post.description,
      })),
    },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: category.title, url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <main style={{ background: "var(--color-canvas)" }}>
        <PageHero
          eyebrow={`Category — ${posts.length} articles`}
          title={category.title}
          subline={category.description}
        />

        <section
          aria-labelledby="category-articles"
          className={`pb-24 md:pb-32 ${styles.catSection}`}
        >
          <div className={styles.container}>
            {/* The list's heading: visually hidden (the hero already says what
                this is), but it keeps the outline H1 → H2 → H3 card titles
                instead of skipping a level. */}
            <h2 id="category-articles" className="sr-only">
              {category.title} articles
            </h2>
            {posts.length === 0 ? (
              <p className={styles.catEmpty}>
                Articles coming soon. In the meantime, see our{" "}
                <Link href="/blog">full blog index</Link>.
              </p>
            ) : (
              <ul className={styles.catGrid}>
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`blog-card group ${styles.catCard}`}
                    >
                      <div className={styles.catTop}>
                        <span
                          className={styles.sticker}
                          style={{ background: getBlogGradient(post.tag) }}
                        >
                          {post.emoji}
                        </span>{" "}
                        <span>{post.tag}</span>
                      </div>
                      <h3 className={styles.catTitle}>{post.title}</h3>
                      <p className={styles.catDesc}>{post.description}</p>
                      <div className={styles.catRead}>
                        <span className={styles.catReadInner}>
                          {post.readTime}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <CategoryNav
              heading="More topics"
              id="more-topics"
              counts={counts}
              current={category.slug}
              align="center"
              className={styles.topicsAfterCat}
            />

            <div className={styles.backRow}>
              <Link href="/blog" className="btn btn-ghost">
                ← Back to all articles
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
