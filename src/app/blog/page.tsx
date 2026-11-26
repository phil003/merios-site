import type { Metadata } from "next";

import Footer from "@/components/Footer";
import { BreadcrumbSchema } from "@/components/StructuredData";
import BlogJsonLd from "@/components/blog/BlogJsonLd";
import FeaturedCard from "@/components/blog/FeaturedCard";
import BlogFilterGrid from "@/components/blog/BlogFilterGrid";
import CategoryNav from "@/components/blog/CategoryNav";
import ArticleIndex from "@/components/blog/ArticleIndex";
import JournalCta from "@/components/blog/JournalCta";
import JournalMasthead, { MastheadCopy } from "@/components/blog/JournalMasthead";
import styles from "@/components/blog/blog.module.css";
import { getListedPosts } from "@/lib/blog";
import { BLOG_CATEGORIES, getCategoryCounts, getTopicTitle } from "@/lib/blog-categories";

const DESCRIPTION =
  "Expert articles on blood biomarkers, biological age and longevity. Learn what your blood test results mean and how to improve your health score.";

export const metadata: Metadata = {
  title: "Blog — Health, Biomarkers & Longevity Insights",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://merios.life/blog",
  },
  // og:image comes from ./opengraph-image.tsx (a branded card).
  openGraph: {
    title: "Blog — Health, Biomarkers & Longevity Insights",
    description: DESCRIPTION,
    url: "https://merios.life/blog",
    type: "website",
  },
};

const EYEBROW = "Journal";
const TITLE = (
  <>
    Notes from <em>the lab.</em>
  </>
);
const LEAD =
  "Biomarker deep-dives, longevity science, and the research behind your Merios health score.";

export default function BlogPage() {
  const posts = getListedPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    tag: p.tag,
    topic: getTopicTitle(p.tag),
    readTime: p.readTime,
  }));
  const featured = posts[0];
  const topics = BLOG_CATEGORIES.map((c) => ({
    slug: c.slug,
    title: c.title,
    tags: c.tags,
  }));

  return (
    <>
      <BlogJsonLd posts={posts} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Blog", url: "https://merios.life/blog" },
        ]}
      />

      <main style={{ background: "var(--color-canvas)" }}>
        {posts.length === 0 ? (
          <>
            <JournalMasthead eyebrow={EYEBROW} title={TITLE} lead={LEAD} />
            <section className="py-24 md:py-32">
              <div className={styles.container}>
                <p className={styles.catEmpty}>Articles coming soon.</p>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Masthead + topic filter, featured card, grid (client part;
                the masthead copy and the featured card are server HTML) */}
            <BlogFilterGrid
              posts={posts}
              topics={topics}
              masthead={<MastheadCopy eyebrow={EYEBROW} title={TITLE} lead={LEAD} />}
              featured={featured ? <FeaturedCard post={featured} /> : null}
            />

            <div className={styles.browse}>
              <div className={styles.container}>
                {/* Category hubs. The filter above works in place; these
                    link to each topic page (/blog/category/*). */}
                <CategoryNav
                  heading="Browse by topic"
                  id="browse-by-topic"
                  counts={getCategoryCounts(posts)}
                  className={styles.topicsAfterGrid}
                />

                {/* The full journal as crawlable links (the grid above loads
                    24 cards at a time, client-side). */}
                <ArticleIndex posts={posts} />
              </div>
            </div>

            <JournalCta />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
