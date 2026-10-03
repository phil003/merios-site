import type { CSSProperties } from "react";
import Link from "next/link";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { BreadcrumbSchema } from "@/components/StructuredData";
import CompareGrid from "@/components/compare/CompareGrid";
import styles from "@/components/compare/compare.module.css";
import { getAllComparePosts } from "@/lib/compare";

export const metadata: Metadata = {
  title: "Compare Merios vs Other Health Apps",
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

        {/* Intro editorial — above the fold on desktop, so it enters with
            the parse-time CSS keyframe rather than the scroll reveal */}
        <section aria-labelledby="compare-intro" className={styles.intro}>
          <div className={styles.wrap}>
            <div
              className={`he ${styles.introGrid}`}
              style={{ "--he-d": "0.3s" } as CSSProperties}
            >
              <h2 id="compare-intro" className="sr-only">
                About these comparisons
              </h2>
              <p className={styles.introLead}>
                Detailed, honest comparisons of Merios against the health
                platforms people most often evaluate alongside us.
              </p>
              <p className={styles.introBody}>
                No marketing fluff — just what each product actually does,
                where it wins, and who it&rsquo;s for. Pricing, biomarker
                coverage, data ownership, and the clinical depth of each
                platform, compared on a single page.
              </p>
            </div>
          </div>
        </section>

        {/* Comparisons grid */}
        <section aria-label="Comparisons" className={styles.gridSection}>
          <div className={styles.wrap}>
            <CompareGrid posts={posts} />
          </div>
        </section>

        {/* Final CTA — a white card on fog, the heartbeat along its base */}
        <section aria-labelledby="compare-cta" className={styles.request}>
          <div className={styles.wrap}>
            <Reveal amount={0.3}>
              <div className={styles.requestCard}>
                <div>
                  <span className={`label ${styles.requestLabel}`}>
                    <span aria-hidden className="label-dot label-dot--ink" />
                    <span>Request a comparison</span>
                  </span>
                  <h2 id="compare-cta" className={styles.requestTitle}>
                    Didn&rsquo;t find a comparison?
                  </h2>
                  <p className={styles.requestText}>
                    Tell us which platform you&rsquo;re evaluating Merios
                    against and we&rsquo;ll publish a side-by-side.
                  </p>
                </div>
                <Link
                  href="/contact?type=general&subject=Suggest%20a%20comparison"
                  className={`btn btn-ink ${styles.requestAction}`}
                >
                  Suggest one
                  <span aria-hidden className="btn-arrow">
                    →
                  </span>
                </Link>

                <svg
                  className={styles.requestPulse}
                  aria-hidden
                  focusable="false"
                  viewBox="0 0 1000 60"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="compare-request-pulse"
                      x1="0"
                      x2="1"
                      y1="0"
                      y2="0"
                    >
                      <stop offset="0" stopColor="#10231A" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#10231A" stopOpacity="0.16" />
                      <stop offset="1" stopColor="#10231A" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 30 H760 L772 37 L786 7 L804 53 L816 30 H900"
                    fill="none"
                    stroke="url(#compare-request-pulse)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <span aria-hidden className={styles.requestDot} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
