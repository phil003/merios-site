import Link from "next/link";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { BreadcrumbSchema } from "@/components/StructuredData";
import CompareGrid from "@/components/compare/CompareGrid";
import { getAllComparePosts } from "@/lib/compare";

export const metadata: Metadata = {
  title: "Compare Merios vs Other Health Apps | Merios",
  description:
    "Side-by-side comparisons of Merios against Function Health, InsideTracker, WHOOP Advanced Labs, SiPhox Health and more. Find the blood biomarker platform that fits your health goals.",
  alternates: {
    canonical: "https://merios.life/compare",
  },
  openGraph: {
    title: "Compare Merios vs Other Health Apps",
    description:
      "Side-by-side comparisons of Merios against Function Health, InsideTracker, WHOOP Advanced Labs, SiPhox Health and more.",
    url: "https://merios.life/compare",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
};

export default function CompareIndexPage() {
  const posts = getAllComparePosts();

  // ── JSON-LD: CollectionPage + ItemList ──────────────────────────────────
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Compare Merios vs Other Health Apps",
    url: "https://merios.life/compare",
    description:
      "Side-by-side comparisons of Merios against Function Health, InsideTracker, WHOOP Advanced Labs, SiPhox Health and more.",
    isPartOf: {
      "@type": "WebSite",
      name: "Merios",
      url: "https://merios.life",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://merios.life/compare/${post.slug}`,
        name: post.title,
        description: post.description,
      })),
    },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Compare", url: "https://merios.life/compare" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <main style={{ background: "var(--color-canvas)" }}>
        <PageHero
          eyebrow="Compare"
          title="Merios vs the rest."
          subline="Honest, side-by-side breakdowns."
        />

        {/* Intro editorial */}
        <section
          aria-labelledby="compare-intro"
          className="relative pb-6 md:pb-10"
          style={{ background: "var(--color-canvas)" }}
        >
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <Reveal amount={0.3}>
              <div className="max-w-[680px]">
                <h2 id="compare-intro" className="sr-only">
                  About these comparisons
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.25rem, 1.5vw, 1.5rem)",
                    lineHeight: 1.35,
                    letterSpacing: "-0.015em",
                    color: "var(--color-ink)",
                    fontWeight: 350,
                  }}
                >
                  Detailed, honest comparisons of Merios against the health
                  platforms people most often evaluate alongside us.
                </p>
                <p
                  className="mt-5"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: "var(--color-ink-secondary)",
                    letterSpacing: "-0.003em",
                  }}
                >
                  No marketing fluff — just what each product actually does,
                  where it wins, and who it&rsquo;s for. Pricing, biomarker
                  coverage, data ownership, and the clinical depth of each
                  platform, compared on a single page.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Comparisons grid */}
        <section
          aria-label="Comparisons"
          className="relative pt-6 pb-24 md:pt-10 md:pb-32"
          style={{ background: "var(--color-canvas)" }}
        >
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <CompareGrid posts={posts} />
          </div>
        </section>

        {/* Final CTA banner */}
        <section
          aria-labelledby="compare-cta"
          className="relative border-t py-20 md:py-28"
          style={{
            background: "var(--color-canvas-alt)",
            borderColor: "var(--color-grid)",
          }}
        >
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <Reveal amount={0.3}>
              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                <div className="max-w-[560px]">
                  <span
                    className="inline-flex items-center gap-2.5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--color-pulse)" }}
                    />
                    <span
                      style={{
                        fontSize: 10.5,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--color-green-deep)",
                        fontWeight: 500,
                      }}
                    >
                      Request a comparison
                    </span>
                  </span>
                  <h2
                    id="compare-cta"
                    className="mt-6"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      fontWeight: 300,
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      color: "var(--color-ink)",
                    }}
                  >
                    Didn&rsquo;t find a comparison?
                  </h2>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: "var(--color-ink-secondary)",
                      letterSpacing: "-0.003em",
                    }}
                  >
                    Tell us which platform you&rsquo;re evaluating Merios
                    against and we&rsquo;ll publish a side-by-side.
                  </p>
                </div>
                <Link
                  href="/contact?type=general&subject=Suggest%20a%20comparison"
                  className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 transition-transform duration-300 ease-out hover:-translate-y-0.5"
                  style={{
                    background: "var(--color-green-deep)",
                    color: "var(--color-canvas)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: "-0.005em",
                  }}
                >
                  Suggest one
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
