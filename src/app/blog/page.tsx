import type { Metadata } from "next";

import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { BreadcrumbSchema } from "@/components/StructuredData";
import BlogJsonLd from "@/components/blog/BlogJsonLd";
import FeaturedCard from "@/components/blog/FeaturedCard";
import BlogFilterGrid from "@/components/blog/BlogFilterGrid";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Health, Biomarkers & Longevity Insights",
  description:
    "Expert articles on blood biomarkers, biological age, health optimization, and longevity. Learn how to understand your blood test results and improve your health score.",
  alternates: {
    canonical: "https://merios.life/blog",
  },
  openGraph: {
    title: "Blog — Health, Biomarkers & Longevity Insights",
    description:
      "Expert articles on blood biomarkers, biological age, health optimization, and longevity. Learn how to understand your blood test results and improve your health score.",
    url: "https://merios.life/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
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
            <div className="mx-auto max-w-[1200px] px-6 md:px-10">
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
              <div className="mx-auto max-w-[1200px] px-6 md:px-10">
                <BlogFilterGrid posts={rest} />
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
