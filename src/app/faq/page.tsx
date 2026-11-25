import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion, {
  type FaqGroup,
} from "@/components/faq/FaqAccordion";
import { FAQ_ENTRIES, FAQ_GROUPS, getEntriesByGroup } from "@/content/faq";
import styles from "@/components/faq/faq.module.css";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // Already names the brand: absolute, so the layout template does not
  // append a second "| Merios".
  title: { absolute: "FAQ — Merios" },
  description:
    "Everything worth asking about Merios: how the score is built, what we measure, how we handle your data, and how to start.",
  alternates: {
    canonical: "https://merios.life/faq",
  },
  openGraph: {
    title: "FAQ — Merios",
    description:
      "Everything worth asking about Merios: how the score is built, what we measure, how we handle your data, and how to start.",
    url: "https://merios.life/faq",
    type: "website",
  },
};

// ─── Hero word ───────────────────────────────────────────────────────────────
// Each word resolves from motion blur into focus (the .rd-word CSS keyframe
// from globals.css — plays at parse time, no JS, skipped under reduced
// motion). Each word is its own inline-block so the H1 still wraps at word
// boundaries and its text stays exactly "Clear answers. No marketing noise."
// for crawlers; the second sentence is the Open Sky italic human words.
function HeroWord({ d, children }: { d: number; children: ReactNode }) {
  return (
    <span
      className="rd-word"
      style={{ "--rd-d": `${d}s` } as CSSProperties}
    >
      {children}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function FAQPage() {
  // Build the group → entries shape consumed by the accordion client component.
  const groups: FaqGroup[] = FAQ_GROUPS.map((meta) => ({
    meta,
    entries: getEntriesByGroup(meta.key),
  }));

  // Flat JSON-LD — every Q/A pair, ignoring groups. Google cares about the
  // flat list; groups are a UI concept only.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className={styles.page}>
        {/* ─── Open Sky masthead: dawn, eyebrow, H1 ending on the italic
            human words, lead ───────────────────────────────────────────── */}
        <section className={styles.hero} aria-labelledby="faq-title">
          <div className={styles.container}>
            <p className={`he ${styles.eyebrow}`}>FAQ</p>

            <h1 id="faq-title" className={styles.title}>
              <HeroWord d={0.05}>Clear</HeroWord>{" "}
              <HeroWord d={0.13}>answers.</HeroWord>{" "}
              <br />
              <em>
                <HeroWord d={0.24}>No</HeroWord>{" "}
                <HeroWord d={0.31}>marketing</HeroWord>{" "}
                <HeroWord d={0.38}>noise.</HeroWord>
              </em>
            </h1>

            <p
              className={`he ${styles.lead}`}
              style={{ "--he-d": "0.3s" } as CSSProperties}
            >
              Everything worth asking about Merios — how the score is built,
              what we measure, how we handle your data, and how to start.
            </p>
          </div>
        </section>

        {/* ─── Accordion ─────────────────────────────────────────────────── */}
        <section className={styles.accSection}>
          <div className={styles.container}>
            <FaqAccordion groups={groups} showFilter />
          </div>
        </section>

        {/* ─── Closing CTA — the page's one ink block ────────────────────── */}
        <section className={styles.ctaSection} aria-labelledby="faq-cta-title">
          <div className={styles.container}>
            <div className={`night ${styles.ink}`} data-nav="dark">
              <div className={styles.ctaCopy}>
                <Reveal>
                  <p className={`${styles.eyebrow} ${styles.inkEyebrow}`}>
                    Still curious?
                  </p>
                </Reveal>

                <Reveal delay={0.05}>
                  <h2 id="faq-cta-title" className={styles.ctaTitle}>
                    Ready <em>when you are.</em>
                  </h2>
                </Reveal>
              </div>

              <Reveal delay={0.1} className={styles.ctaActions}>
                <Link href="/early-access?from=faq" className="btn btn-lime">
                  Get Merios
                  <span aria-hidden className="btn-arrow">→</span>
                </Link>
                <Link href="/contact" className="btn btn-ghost-night">
                  Contact us
                  <span aria-hidden className="btn-arrow">→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
