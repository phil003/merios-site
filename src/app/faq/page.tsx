import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion, {
  type FaqGroup,
} from "@/components/faq/FaqAccordion";
import { FAQ_ENTRIES, FAQ_GROUPS, getEntriesByGroup } from "@/content/faq";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "FAQ — Merios",
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

      <main
        className="relative"
        style={{
          background: "var(--color-canvas)",
          color: "var(--color-ink)",
        }}
      >
        {/* ─── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <div
                className="mb-6 flex items-center gap-2.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span
                  aria-hidden
                  className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
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
                  FAQ
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                className="max-w-[18ch]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-display-m)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                  fontWeight: 400,
                }}
              >
                Clear answers.
                <br />
                No marketing noise.
              </h1>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="mt-8 max-w-[52ch]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body-l)",
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Everything worth asking about Merios — how the score is built,
                what we measure, how we handle your data, and how to start.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ─── Accordion ─────────────────────────────────────────────────── */}
        <section
          className="px-6 pb-24 md:px-10 md:pb-32"
          style={{
            borderTop: "1px solid var(--color-grid)",
            paddingTop: "var(--spacing-section)",
          }}
        >
          <div className="mx-auto max-w-[880px]">
            <FaqAccordion groups={groups} showFilter />
          </div>
        </section>

        {/* ─── Closing CTA ───────────────────────────────────────────────── */}
        <section
          className="px-6 pb-32 md:px-10"
          style={{
            borderTop: "1px solid var(--color-grid)",
            paddingTop: "var(--spacing-section)",
          }}
        >
          <div className="mx-auto max-w-[880px] text-center">
            <Reveal>
              <div
                className="mb-6 inline-flex items-center gap-2.5"
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
                  Still curious?
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="mx-auto max-w-[20ch]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-display-m)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                  fontWeight: 400,
                }}
              >
                Ready when you are.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <Link
                  href="/early-access"
                  className="faq-cta-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5"
                  style={{
                    background: "var(--color-green-deep)",
                    color: "var(--color-canvas)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    letterSpacing: "-0.005em",
                  }}
                >
                  Get Merios
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/contact"
                  className="faq-cta-ghost inline-flex items-center gap-2"
                  style={{
                    color: "var(--color-ink)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    letterSpacing: "-0.005em",
                    borderBottom: "1px solid var(--color-ink)",
                    paddingBottom: "2px",
                  }}
                >
                  Contact us
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
