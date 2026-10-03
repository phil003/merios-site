import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
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

// ─── Hero word ───────────────────────────────────────────────────────────────
// "Clear answers." resolves from motion blur into focus (the .rd-word CSS
// keyframe from globals.css — plays at parse time, no JS). Each word is its
// own inline-block so the H1 still wraps at word boundaries and its text stays
// exactly "Clear answers. No marketing noise." for crawlers.
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

      <main
        className="relative"
        style={{
          background: "var(--color-canvas)",
          color: "var(--color-ink)",
        }}
      >
        {/* ─── Hero — night masthead (same stage as PageHero; the H1 keeps
            its plain-text + <br /> structure) ─────────────────────────────── */}
        <section className="v3-hero night" data-nav="dark">
          <div className="v3-hero__inner">
            <div className="v3-hero__copy">
              <div className="he label v3-hero__eyebrow">
                <span aria-hidden className="label-dot" />
                <span>FAQ</span>
              </div>

              <h1
                className="page-hero-title display"
                style={{ fontSize: "var(--text-display-l)" }}
              >
                <HeroWord d={0.05}>Clear</HeroWord>{" "}
                <HeroWord d={0.13}>answers.</HeroWord>
                <br />
                <HeroWord d={0.24}>No</HeroWord>{" "}
                <HeroWord d={0.31}>marketing</HeroWord>{" "}
                <HeroWord d={0.38}>noise.</HeroWord>
              </h1>

              <p
                className="he page-hero-subline"
                style={{ "--he-d": "0.3s" } as CSSProperties}
              >
                Everything worth asking about Merios — how the score is built,
                what we measure, how we handle your data, and how to start.
              </p>
            </div>
          </div>

          {/* The logo's heartbeat as the masthead's horizon */}
          <svg
            className="v3-hero__pulse"
            aria-hidden
            focusable="false"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="faq-hero-pulse-fade" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.22" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path
              d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
              fill="none"
              stroke="url(#faq-hero-pulse-fade)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="v3-hero__dot" aria-hidden />
        </section>

        {/* ─── Accordion ─────────────────────────────────────────────────── */}
        <section
          className="px-[var(--spacing-container)]"
          style={{
            paddingTop: "clamp(56px, 7vw, 104px)",
            paddingBottom: "clamp(72px, 9vw, 136px)",
          }}
        >
          <div className="mx-auto max-w-[1320px]">
            <FaqAccordion groups={groups} showFilter />
          </div>
        </section>

        {/* ─── Closing CTA — a night card set into the fog ───────────────── */}
        <section
          className="px-[var(--spacing-container)]"
          style={{ paddingBottom: "clamp(72px, 9vw, 128px)" }}
        >
          <div
            className="night relative mx-auto max-w-[1320px] overflow-hidden text-center"
            data-nav="dark"
            style={{
              borderRadius: "clamp(26px, 3vw, 36px)",
              padding:
                "clamp(64px, 9vw, 128px) clamp(22px, 5vw, 80px) clamp(104px, 11vw, 150px)",
            }}
          >
            <Reveal>
              <div
                className="label"
                style={{ color: "var(--color-on-night-2)" }}
              >
                <span aria-hidden className="label-dot" />
                <span>Still curious?</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="display chrome-text mx-auto mt-6 max-w-[16ch]"
                style={{ fontSize: "var(--text-display-m)" }}
              >
                Ready when you are.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link href="/early-access" className="btn btn-lime">
                  Get Merios
                  <span aria-hidden className="btn-arrow">→</span>
                </Link>
                <Link href="/contact" className="btn btn-ghost-night">
                  Contact us
                  <span aria-hidden className="btn-arrow">→</span>
                </Link>
              </div>
            </Reveal>

            {/* Decorative heartbeat running under the card's copy */}
            <svg
              aria-hidden
              focusable="false"
              className="pointer-events-none absolute inset-x-0 bottom-4 h-14 w-full md:bottom-8 md:h-16"
              viewBox="0 0 1240 80"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="faq-cta-pulse-fade" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.26" />
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 40 H560 L572 48 L588 12 L608 72 L620 40 H1240"
                fill="none"
                stroke="url(#faq-cta-pulse-fade)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
