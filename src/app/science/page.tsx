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
import { ADVISORS, CITATIONS } from "@/components/science/data";
import ScienceStickyTOC from "@/components/science/StickyTOC";

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
// Phase 4: confirm advisor affiliations and swap placeholder citations once
// the real bibliography is finalised.
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
  reviewedBy: ADVISORS.map((a) => ({
    "@type": "Person",
    name: `${a.name}, ${a.credentials}`,
    jobTitle: a.specialty,
    affiliation: {
      "@type": "Organization",
      name: a.affiliation,
    },
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

      <main style={{ background: "var(--color-canvas)" }}>
        {/* 1 · Hero — full-bleed, TOC not yet visible to avoid visual noise */}
        <ScienceHero />

        {/* 2+ · Editorial body with sticky TOC on lg+ */}
        <div
          className="relative"
          style={{ background: "var(--color-canvas)" }}
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-10 px-6 md:px-10 lg:grid-cols-[200px_1fr] lg:gap-x-12">
            <aside
              className="hidden lg:block"
              style={{
                // Ensure the sticky TOC sits below the navbar
                paddingTop: "7rem",
              }}
            >
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

              {/* 8 · Closing CTA — NOT a waitlist form. */}
              <section
                id="next"
                aria-labelledby="science-next-heading"
                className="relative border-t py-28 md:py-36"
                style={{
                  background: "var(--color-canvas)",
                  borderColor: "var(--color-grid)",
                }}
              >
                <div className="mx-auto max-w-[960px]">
                  <Reveal amount={0.2}>
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
                        className="text-[10.5px] uppercase"
                        style={{
                          color: "var(--color-green-deep)",
                          letterSpacing: "0.22em",
                          fontWeight: 500,
                        }}
                      >
                        Next
                      </span>
                    </span>
                  </Reveal>

                  <Reveal amount={0.2} delay={0.1}>
                    <h2
                      id="science-next-heading"
                      className="mt-6 max-w-[18ch]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-display-l)",
                        fontWeight: 300,
                        lineHeight: 1.02,
                        letterSpacing: "-0.03em",
                        color: "var(--color-ink)",
                      }}
                    >
                      Get Merios&nbsp;→
                    </h2>
                  </Reveal>

                  <Reveal amount={0.2} delay={0.2}>
                    <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
                      <Link
                        href="/early-access"
                        className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 transition-colors"
                        style={{
                          background: "var(--color-green-deep)",
                          color: "var(--color-canvas)",
                          fontFamily: "var(--font-sans)",
                          fontSize: 15,
                          fontWeight: 500,
                          letterSpacing: "-0.005em",
                        }}
                      >
                        Request early access
                        <span aria-hidden>→</span>
                      </Link>

                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 transition-colors"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 15,
                          color: "var(--color-ink)",
                          letterSpacing: "-0.005em",
                          borderBottom:
                            "1px solid var(--color-grid)",
                          paddingBottom: 2,
                        }}
                      >
                        Read the journal
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
