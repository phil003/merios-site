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
  // Absolute: the title already names the brand, and with the template's
  // "| Merios" it ran to 74 characters. Trimmed to 55 by dropping
  // "Composite"; the social title below keeps the full wording.
  title: {
    absolute: "The Science — Merios | Biomarker Index & Biological Age",
  },
  description:
    "How Merios turns 160+ peer-reviewed blood biomarkers into a single composite health score, grounded in preventive medicine literature.",
  alternates: {
    canonical: "https://merios.life/science",
  },
  openGraph: {
    title:
      "The Science — Merios | Composite Biomarker Index & Biological Age",
    description:
      "How Merios turns 160+ peer-reviewed blood biomarkers into a single composite health score, grounded in preventive medicine literature.",
    url: "https://merios.life/science",
    type: "article",
  },
};

// ── JSON-LD (MedicalWebPage) ────────────────────────────────────────────────
// `reviewedBy` and `lastReviewed` are intentionally omitted: no clinician has
// reviewed this page yet (section 05 says so). Add both, with the reviewer's
// real name and date, only once a review is actually done. `dateModified`
// is the last content change.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The Science behind Merios",
  url: "https://merios.life/science",
  description:
    "How Merios turns 160+ peer-reviewed blood biomarkers into a single composite health score, grounded in preventive medicine literature.",
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
  dateModified: "2026-11-26",
};

export default function SciencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className={styles.page}>
        {/* 1 · Hero — full-bleed dawn masthead, TOC not yet visible */}
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

        {/* 8 · Closing CTA — NOT a waitlist form. A dawn card (mockup
            Science.dc.html) that hands over to the light footer. */}
        <section
          id="next"
          aria-labelledby="science-next-heading"
          className={styles.next}
        >
          <div className={styles.container}>
            <Reveal amount={0.2}>
              <div className={styles.nextCard}>
                <div className={styles.nextCopy}>
                  <span className={`label ${styles.eyebrow}`}>
                    <span aria-hidden className="label-dot label-dot--ink" />
                    <span>Next</span>
                  </span>

                  <h2 id="science-next-heading" className={styles.nextTitle}>
                    Get <em>Merios</em>&nbsp;<span className={styles.nextArrow}>→</span>
                  </h2>
                </div>

                <div className={styles.nextActions}>
                  <Link href="/early-access?from=science" className="btn btn-ink">
                    Get the app
                    <span aria-hidden className="btn-arrow">→</span>
                  </Link>

                  <Link href="/blog" className="btn btn-ghost">
                    Read the journal
                    <span aria-hidden className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
