import type { Metadata } from "next";

import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { BreadcrumbSchema } from "@/components/StructuredData";
import BlogJsonLd from "@/components/blog/BlogJsonLd";
import FeaturedCard from "@/components/blog/FeaturedCard";
import BlogFilterGrid from "@/components/blog/BlogFilterGrid";
import CategoryNav from "@/components/blog/CategoryNav";
import ArticleIndex from "@/components/blog/ArticleIndex";
import styles from "@/components/blog/blog.module.css";
import { getListedPosts } from "@/lib/blog";
import { getCategoryCounts } from "@/lib/blog-categories";

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

export default function BlogPage() {
  const posts = getListedPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    tag: p.tag,
    emoji: p.emoji,
    readTime: p.readTime,
  }));
  const featured = posts[0];
  const rest = posts.slice(1);

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
        <PageHero
          eyebrow="Journal"
          title="Notes from the lab."
          subline="Biomarker deep-dives, longevity science, and the research behind your Merios health score."
          align="left"
        />

        {posts.length === 0 ? (
          <section
            className="py-24 md:py-32"
            style={{ background: "var(--color-canvas)" }}
          >
            <div className={styles.container}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 16,
                  color: "var(--color-ink-tertiary)",
                }}
              >
                Articles coming soon.
              </p>
            </div>
          </section>
        ) : (
          <>
            {/* Featured article */}
            <div className="pb-12 md:pb-20">
              {featured ? <FeaturedCard post={featured} /> : null}
            </div>

            {/* Filter + grid */}
            <section
              aria-label="All articles"
              className="relative pb-24 md:pb-32"
              style={{ background: "var(--color-canvas)" }}
            >
              <div className={styles.container}>
                <BlogFilterGrid posts={rest} />

                {/* Category hubs. The chips above filter in place; these
                    link to each topic page (/blog/category/*). */}
                <CategoryNav
                  heading="Browse by topic"
                  id="browse-by-topic"
                  counts={getCategoryCounts(posts)}
                  className={styles.topicsAfterGrid}
                />

                {/* The full journal as crawlable links (the grid above loads
                    18 cards at a time, client-side). */}
                <ArticleIndex posts={posts} />
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
