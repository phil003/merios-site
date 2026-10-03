import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import StepSection from "@/components/howitworks/StepSection";
import StickyLateralNav from "@/components/howitworks/StickyLateralNav";
import SvgPictogram, {
  type PictogramVariant,
} from "@/components/howitworks/SvgPictogram";
import UnderstandPinned from "@/components/howitworks/UnderstandPinned";
import {
  ConnectViz,
  HeroHorizon,
  LoopEmblem,
} from "@/components/howitworks/Decor";
import styles from "@/components/howitworks/hiw.module.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://merios.life"),
  title: "Blood Test Tracking App: How Merios Works",
  description:
    "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. Free to download, on iPhone.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://merios.life/how-it-works" },
  openGraph: {
    title: "Blood Test Tracking App: How Merios Works",
    description:
      "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. Free to download, on iPhone.",
    url: "https://merios.life/how-it-works",
    siteName: "Merios",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Test Tracking App: How Merios Works",
    description:
      "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. Free to download, on iPhone.",
  },
};

// ─── JSON-LD HowTo structured data ────────────────────────────────────────
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to interpret your blood test results with Merios",
  description:
    "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. Free to download, on iPhone.",
  step: [
    {
      "@type": "HowToStep",
      name: "Connect",
      text: "Stream Apple Health, scan existing lab PDFs with OCR, or enter markers manually. Merios meets your data where it already lives.",
      url: "https://merios.life/how-it-works#connect",
    },
    {
      "@type": "HowToStep",
      name: "Understand",
      text: "150+ biomarkers are compressed into one Merios Score, with every subsystem expanded into a clear, trend-first view.",
      url: "https://merios.life/how-it-works#understand",
    },
    {
      "@type": "HowToStep",
      name: "Act",
      text: "A short list of ranked protocols, each with its expected biomarker lift and a scheduled follow-up lab to verify the change.",
      url: "https://merios.life/how-it-works#act",
    },
  ],
};

// ─── Content: Step 01 — Connect sub-blocks ────────────────────────────────
type ConnectBlock = {
  variant: PictogramVariant;
  title: string;
  copy: string;
  meta: string;
};

const CONNECT_BLOCKS: ConnectBlock[] = [
  {
    variant: "apple-health",
    title: "Apple Health stream",
    copy: "Years of activity, sleep, resting heart rate and HRV flow in on first authorisation. Merios keeps syncing in the background — nothing to maintain.",
    meta: "One tap · continuous",
  },
  {
    variant: "ocr",
    title: "Labs OCR",
    copy: "Photograph or upload any blood test PDF. Markers, units and reference ranges are extracted in seconds, normalised across labs and dated correctly.",
    meta: "PDF · JPG · HEIC",
  },
  {
    variant: "manual",
    title: "Manual entry",
    copy: "Add a single marker, a blood pressure reading or a note. Everything you enter joins the same timeline as the imports — no second-class data.",
    meta: "Any marker · any unit",
  },
];

// Pop tile behind each import path's pictogram (presentation only).
const CONNECT_TILE: Partial<Record<PictogramVariant, string>> = {
  "apple-health": styles.tilePeach,
  ocr: styles.tileSky,
  manual: styles.tileLilac,
};

// ─── Content: Step 03 — Act protocols + follow-up ─────────────────────────
type ActProtocol = {
  variant: PictogramVariant;
  title: string;
  copy: string;
  lift: string;
  target: string;
};

const ACT_PROTOCOLS: ActProtocol[] = [
  {
    variant: "leverage",
    title: "Tighten sleep window",
    copy: "Shift lights-out by 40 minutes to raise deep-sleep share — the single biggest nudge on morning HRV for your current pattern.",
    lift: "+18%",
    target: "HRV · 8 weeks",
  },
  {
    variant: "protocol",
    title: "Add omega-3 protocol",
    copy: "Daily EPA/DHA at 2g to move triglycerides into the safer band while nudging LDL-particle size toward large-buoyant.",
    lift: "+11%",
    target: "Lipids · 12 weeks",
  },
  {
    variant: "trend",
    title: "Strength sessions × 3",
    copy: "Three short resistance sessions a week to lift fasting glucose stability and grip strength — a high-leverage pair for your age window.",
    lift: "+7%",
    target: "Glucose · 10 weeks",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* JSON-LD — HowTo structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Skip-link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-[color:var(--color-ink)] focus:px-5 focus:py-2 focus:text-[color:var(--color-canvas)]"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
        }}
      >
        Skip to content
      </a>

      <main id="main-content" className={styles.page}>
        {/* ───────────────────────────────── HERO ──────────────────────── */}
        {/* Night masthead (shared .v3-hero geometry). CSS-only entrance so the
            H1 paints at parse time; the horizon carries the three steps. */}
        <section
          aria-labelledby="hiw-hero-headline"
          className="v3-hero night"
          data-nav="dark"
        >
          <div className="v3-hero__inner">
            <div className="v3-hero__copy">
              <div className="he label v3-hero__eyebrow">
                <span aria-hidden className="label-dot" />
                <span>How it works</span>
              </div>

              <h1
                id="hiw-hero-headline"
                className={`display he ${styles.heroTitle}`}
                style={{ "--he-d": "0.06s" } as CSSProperties}
              >
                From blood tests to action,
                <br aria-hidden />
                <span className="chrome-text">in three calm steps.</span>
              </h1>

              <p
                className={`he ${styles.heroSub}`}
                style={{ "--he-d": "0.16s" } as CSSProperties}
              >
                Connect every source, read one score, act on the handful of
                moves that actually matter. Merios makes the loop between
                result and response short — and obvious.
              </p>
            </div>
          </div>

          <HeroHorizon />
        </section>

        {/* ─────────────────────────── GRID WITH STICKY NAV ────────────── */}
        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.bodyGrid}>
              <StickyLateralNav />

              <div className="min-w-0">
                {/* ────────── Step 01 — Connect ────────── */}
                <StepSection
                  id="connect"
                  eyebrow="Connect"
                  stepNumber={1}
                  headline={
                    <>
                      Bring in the data
                      <br aria-hidden /> that already exists.
                    </>
                  }
                  lead="Three import paths — streaming, OCR, manual — so nothing about your health history is locked in a drawer or a provider silo."
                >
                  <ol className={styles.cardGrid}>
                    {CONNECT_BLOCKS.map((block, i) => (
                      <li key={block.title} className={styles.cardItem}>
                        <Reveal delay={i * 0.08} className={styles.cardReveal}>
                          <div className={styles.card}>
                            <span
                              className={`${styles.tile} ${CONNECT_TILE[block.variant] ?? styles.tileSky}`}
                            >
                              <SvgPictogram variant={block.variant} />
                            </span>
                            <span className={styles.meta}>{block.meta}</span>
                            <h3 className={styles.cardTitle}>{block.title}</h3>
                            <p className={styles.cardCopy}>{block.copy}</p>
                            <ConnectViz variant={block.variant} />
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ol>
                </StepSection>

                {/* ────────── Step 02 — Understand (pinned scrub) ────────── */}
                <UnderstandPinned />

                {/* ────────── Step 03 — Act ────────── */}
                <StepSection
                  id="act"
                  eyebrow="Act"
                  stepNumber={3}
                  headline={
                    <>
                      The three moves
                      <br aria-hidden /> worth making next.
                    </>
                  }
                  lead="Protocols are ranked by leverage, not noise — each one lists the expected biomarker lift and the follow-up lab that will confirm it."
                >
                  <ol className={styles.cardGrid}>
                    {ACT_PROTOCOLS.map((p, i) => (
                      <li key={p.title} className={styles.cardItem}>
                        <Reveal delay={i * 0.08} className={styles.cardReveal}>
                          <div className={styles.card}>
                            <div className={styles.actHead}>
                              <span className={`${styles.tile} ${styles.tileInk}`}>
                                <SvgPictogram variant={p.variant} />
                              </span>
                              <span className={styles.lift}>{p.lift}</span>
                            </div>
                            <div className={styles.actBody}>
                              <h3 className={styles.cardTitle}>{p.title}</h3>
                              <p className={styles.cardCopy}>{p.copy}</p>
                            </div>
                            <div className={styles.followup}>
                              <span aria-hidden className={styles.followupIcon}>
                                <SvgPictogram
                                  variant="followup"
                                  width={18}
                                  height={18}
                                />
                              </span>
                              <span className={styles.followupText}>
                                Follow-up · {p.target}
                              </span>
                            </div>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ol>
                </StepSection>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────── CLOSING ────────────────────────── */}
        {/* Night CTA band: the heartbeat bent into a quarterly loop. */}
        <section
          aria-label="Next steps"
          className={`night ${styles.closing}`}
          data-nav="dark"
        >
          <div className={styles.container}>
            <div className={styles.closingGrid}>
              <Reveal className={styles.closingCopy}>
                <p className={styles.closingStatement}>
                  The same loop, every quarter — see it, understand it, do the
                  one next thing.
                </p>

                <div className={styles.closingActions}>
                  <a href="/early-access" className="btn btn-lime">
                    Get Merios
                    <span aria-hidden className="btn-arrow">→</span>
                  </a>

                  <a href="/blog" className="btn btn-ghost-night">
                    Read the journal
                    <span aria-hidden className="btn-arrow">→</span>
                  </a>
                </div>

                <a href="/faq" className={styles.faqLink}>
                  Still wondering? Read the FAQ
                  <span aria-hidden>→</span>
                </a>
              </Reveal>

              <LoopEmblem />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
