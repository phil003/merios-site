import Link from "next/link";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import { BreadcrumbSchema } from "@/components/StructuredData";
import CompareGrid from "@/components/compare/CompareGrid";
import CompareMasthead from "@/components/compare/CompareMasthead";
import styles from "@/components/compare/compare.module.css";
import { getAllComparePosts } from "@/lib/compare";

export const metadata: Metadata = {
  // Already names the brand: absolute, so the layout template does not
  // append a second "| Merios".
  title: { absolute: "Compare Merios vs Other Health Apps" },
  description:
    "Side-by-side comparisons of Merios against Function Health, InsideTracker, WHOOP Advanced Labs, SiPhox Health and more blood biomarker platforms.",
  alternates: {
    canonical: "https://merios.life/compare",
  },
  // og:image comes from ./opengraph-image.tsx (a branded card).
  openGraph: {
    title: "Compare Merios vs Other Health Apps",
    description:
      "Side-by-side comparisons of Merios against Function Health, InsideTracker, WHOOP Advanced Labs, SiPhox Health and more.",
    url: "https://merios.life/compare",
    type: "website",
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
        {/* The H1's words are kept (the hub changed on 25 Nov 2026, SEO
            cooldown); the subtitle says what the pages really compare: most
            of them put two other products side by side. */}
        <CompareMasthead
          eyebrow="Compare"
          title="Merios vs"
          italic="the rest."
          subline="Honest breakdowns, side by side, of blood test services, home test kits, glucose monitors and lab report apps, Merios included: what each one costs, what it measures and who it suits."
        />

        {/* Comparisons grid */}
        <section aria-label="Comparisons" className={styles.gridSection}>
          <div className={styles.wrap}>
            <CompareGrid posts={posts} />
          </div>
        </section>

        {/* Final CTA — the page's one ink block */}
        <section aria-labelledby="compare-cta" className={styles.request}>
          <div className={styles.wrap}>
            <Reveal amount={0.3}>
              <div className={`night ${styles.requestCard}`} data-nav="dark">
                <div>
                  <span className={`label ${styles.requestLabel}`}>
                    <span aria-hidden className="label-dot" />
                    <span>Request a comparison</span>
                  </span>
                  <h2 id="compare-cta" className={styles.requestTitle}>
                    Didn&rsquo;t find <em>a comparison?</em>
                  </h2>
                  <p className={styles.requestText}>
                    Tell us which platform you&rsquo;re evaluating Merios
                    against and we&rsquo;ll publish a side-by-side.
                  </p>
                </div>
                <Link
                  href="/contact#subject=Suggest%20a%20comparison&type=general"
                  className={`btn btn-lime ${styles.requestAction}`}
                >
                  Suggest one
                  <span aria-hidden className="btn-arrow">
                    →
                  </span>
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
