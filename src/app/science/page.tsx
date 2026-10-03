import Link from "next/link";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";

import ScienceHero from "@/components/science/Hero";
import ScienceThesis from "@/components/science/Thesis";
import BiomarkerCoverage from "@/components/science/BiomarkerCoverage";
import ScienceModelDiagram from "@/components/science/ModelDiagram";
import ScienceBioAge from "@/components/science/BioAge";
import ScienceAdvisoryBoard from "@/components/science/AdvisoryBoard";
import ScienceCitations from "@/components/science/Citations";
import { CITATIONS } from "@/components/science/data";
import ScienceStickyTOC from "@/components/science/StickyTOC";
import styles from "@/components/science/science.module.css";

export const metadata: Metadata = {
  title:
    "The Science — Merios | Composite Biomarker Index & Biological Age",
  description:
    "How Merios turns 150+ peer-reviewed blood biomarkers into a single composite health score, grounded in preventive medicine literature.",
  alternates: {
    canonical: "https://merios.life/science",
  },
  openGraph: {
    title:
      "The Science — Merios | Composite Biomarker Index & Biological Age",
    description:
      "How Merios turns 150+ peer-reviewed blood biomarkers into a single composite health score, grounded in preventive medicine literature.",
    url: "https://merios.life/science",
    type: "article",
  },
};

// ── JSON-LD (MedicalWebPage) ────────────────────────────────────────────────
// `reviewedBy` is intentionally omitted until named clinical advisors are
// signed in. Putting fictional or generic entities in `reviewedBy` would
// signal weak E-E-A-T to Google for YMYL content.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The Science behind Merios",
  url: "https://merios.life/science",
  description:
    "How Merios turns 150+ peer-reviewed blood biomarkers into a single composite health score, grounded in preventive medicine literature.",
  about: [
    "Biomarker interpretation",
    "Composite health score",
    "Biological age",
  ],
  citation: CITATIONS.map((c) => ({
    "@type": "CreativeWork",
    name: c.title,
    author: c.authors,
    publisher: c.journal,
    datePublished: String(c.year),
    ...(c.doi ? { identifier: c.doi } : {}),
  })),
  lastReviewed: "2026-04-17",
};

export default function SciencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className={styles.page}>
        {/* 1 · Hero — full-bleed night masthead, TOC not yet visible */}
        <ScienceHero />

        {/* 2+ · Editorial body with sticky TOC on lg+ */}
        <div className={styles.container}>
          <div className={styles.bodyGrid}>
            <aside className={`hidden lg:block ${styles.tocAside}`}>
              <ScienceStickyTOC />
            </aside>

            {/* Body column — sections render full-width inside this column */}
            <div className="min-w-0">
              <ScienceThesis />
              <BiomarkerCoverage />
              <ScienceModelDiagram />
              <ScienceBioAge />
              <ScienceAdvisoryBoard />
              <ScienceCitations />
            </div>
          </div>
        </div>

        {/* 8 · Closing CTA — NOT a waitlist form. A night band that hands
            over to the night footer, the heartbeat along its lower edge. */}
        <section
          id="next"
          aria-labelledby="science-next-heading"
          className={`night ${styles.next}`}
          data-nav="dark"
        >
          <div className={styles.container}>
            <Reveal amount={0.2}>
              <span className="label" style={{ color: "var(--color-on-night-2)" }}>
                <span aria-hidden className="label-dot" />
                <span>Next</span>
              </span>
            </Reveal>

            <Reveal amount={0.2} delay={0.1}>
              <h2 id="science-next-heading" className={styles.nextTitle}>
                Get Merios&nbsp;<span className={styles.nextArrow}>→</span>
              </h2>
            </Reveal>

            <Reveal amount={0.2} delay={0.2}>
              <div className={styles.nextActions}>
                <Link href="/early-access" className="btn btn-lime">
                  Get the app
                  <span aria-hidden className="btn-arrow">→</span>
                </Link>

                <Link href="/blog" className="btn btn-ghost-night">
                  Read the journal
                  <span aria-hidden className="btn-arrow">→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <svg
            className="v3-hero__pulse"
            aria-hidden
            focusable="false"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="sci-next-pulse-fade" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.22" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path
              d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
              fill="none"
              stroke="url(#sci-next-pulse-fade)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="v3-hero__dot" aria-hidden />
        </section>
      </main>
      <Footer />
    </>
  );
}
