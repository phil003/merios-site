import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import StepSection from "@/components/howitworks/StepSection";
import StickyLateralNav from "@/components/howitworks/StickyLateralNav";
import UnderstandBoard from "@/components/howitworks/UnderstandBoard";
import {
  ActPlate,
  ConnectPlate,
  HeroArc,
  LoopDiagram,
  type ActPlateVariant,
  type ConnectPlateVariant,
} from "@/components/howitworks/Decor";
import styles from "@/components/howitworks/hiw.module.css";
import { WebApplicationSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://merios.life"),
  // Already names the brand: absolute, so the layout template does not
  // append a second "| Merios".
  title: { absolute: "Blood Test Tracking App: How Merios Works" },
  description:
    "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. $44/year after a 7-day free trial, on iPhone.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://merios.life/how-it-works" },
  openGraph: {
    title: "Blood Test Tracking App: How Merios Works",
    description:
      "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. $44/year after a 7-day free trial, on iPhone.",
    url: "https://merios.life/how-it-works",
    siteName: "Merios",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Test Tracking App: How Merios Works",
    description:
      "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. $44/year after a 7-day free trial, on iPhone.",
  },
};

// ─── JSON-LD HowTo structured data ────────────────────────────────────────
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to interpret your blood test results with Merios",
  description:
    "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. $44/year after a 7-day free trial, on iPhone.",
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
      text: "160+ biomarkers are compressed into one Merios Score, with every subsystem expanded into a clear, trend-first view.",
      url: "https://merios.life/how-it-works#understand",
    },
    {
      "@type": "HowToStep",
      name: "Act",
      text: "See what changed since your last test and read a plain-language monthly report. Merios describes your trends; it does not prescribe supplements, doses or treatments.",
      url: "https://merios.life/how-it-works#act",
    },
  ],
};

// ─── Content: Step 01 — Connect sub-blocks ────────────────────────────────
type ConnectBlock = {
  plate: ConnectPlateVariant;
  title: string;
  copy: string;
  meta: string;
};

const CONNECT_BLOCKS: ConnectBlock[] = [
  {
    plate: "apple-health",
    title: "Apple Health stream",
    copy: "Years of activity, sleep, resting heart rate and HRV flow in on first authorisation. Merios keeps syncing in the background — nothing to maintain.",
    meta: "One tap · continuous",
  },
  {
    plate: "ocr",
    title: "Labs OCR",
    copy: "Photograph or upload any blood test PDF. Markers, units and reference ranges are extracted in seconds, normalised across labs and dated correctly.",
    meta: "PDF · JPG · HEIC",
  },
  {
    plate: "manual",
    title: "Manual entry",
    copy: "Add a single marker, a blood pressure reading or a note. Everything you enter joins the same timeline as the imports — no second-class data.",
    meta: "Any marker · any unit",
  },
];

// ─── Content: Step 02 — Understand ────────────────────────────────────────
const UNDERSTAND_LINES = [
  "160+ biomarkers become one clear figure.",
  "Trends replace single-point anxiety.",
  "Every system graded, every outlier flagged.",
] as const;

const UNDERSTAND_NOTE =
  "The score is a signal, not a verdict — each subsystem stays legible on its own page, so you always know where the number comes from.";

// ─── Content: Step 03 — Act: what Merios actually does after a test ───────
// 27/10/2026 — the previous cards promised biomarker lifts (+18/+11/+7 %) and
// an omega-3 dose that the app never computes nor recommends (audit P0-06,
// decision D-4). Merios describes; it does not prescribe.
type ActStep = {
  plate: ActPlateVariant;
  title: string;
  copy: string;
  index: string;
  target: string;
};

const ACT_STEPS: ActStep[] = [
  {
    plate: "trend",
    title: "See what changed",
    copy: "Each new lab report lines up with the ones before it. Every marker shows its trend, the date it was drawn and where it sits against the reference range.",
    index: "01",
    target: "every new test",
  },
  {
    plate: "report",
    title: "Read your month in plain words",
    copy: "With Merios Plus, a monthly report sums up your sleep, activity, stress and blood markers in plain language. It describes what moved; it never prescribes.",
    index: "02",
    target: "monthly, with Plus",
  },
  {
    plate: "next-test",
    title: "Decide with your clinician",
    copy: "Merios doesn't recommend supplements, doses or treatments. Take the trend to your doctor, change what you choose to change, and let your next test show whether the marker moved.",
    index: "03",
    target: "your next test",
  },
];

const delay = (seconds: number) => ({ "--rv-delay": `${seconds}s` }) as CSSProperties;

/**
 * v2 "Open Sky" (mockup HowItWorks.dc.html, Nov 25, 2026): dawn masthead with
 * the sunrise arc carrying the three steps → sticky step list beside
 * Connect (three glass cards, a drawn plate each) · Understand (the white
 * board: four quarters of the score and three trends) · Act (three glass
 * cards) → the quarterly loop in the frame's one ink block. Metadata, JSON-LD,
 * every word and every href are unchanged.
 */
export default function HowItWorksPage() {
  return (
    <>
      {/* JSON-LD — HowTo structured data, plus the app itself */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <WebApplicationSchema />

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
        {/* Dawn masthead. CSS-only entrance so the H1 paints at parse time;
            the arc carries the three steps. */}
        <section aria-labelledby="hiw-hero-headline" className={styles.hero}>
          <div className={styles.container}>
            <div className={`he label ${styles.heroEyebrow}`}>
              <span aria-hidden className="label-dot label-dot--ink" />
              <span>How it works</span>
            </div>

            <h1
              id="hiw-hero-headline"
              className={`he ${styles.heroTitle}`}
              style={{ "--he-d": "0.06s" } as CSSProperties}
            >
              From blood tests to action, <em>in three calm steps.</em>
            </h1>

            <p
              className={`he ${styles.heroSub}`}
              style={{ "--he-d": "0.16s" } as CSSProperties}
            >
              Connect every source, read one score, and see what changed
              since your last test. Merios makes the loop between result and
              response short — and obvious.
            </p>

            <HeroArc />
          </div>
        </section>

        {/* ─────────────────────────── STEPS WITH STICKY NAV ───────────── */}
        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.bodyGrid}>
              <StickyLateralNav />

              <div className={styles.steps}>
                {/* ────────── Step 01 — Connect ────────── */}
                <StepSection
                  id="connect"
                  eyebrow="Connect"
                  stepNumber={1}
                  headline={
                    <>
                      Bring in the data <em>that already exists.</em>
                    </>
                  }
                  lead="Three import paths — streaming, OCR, manual — so nothing about your health history is locked in a drawer or a provider silo."
                >
                  <ol className={styles.cardGrid}>
                    {CONNECT_BLOCKS.map((block, i) => (
                      <li key={block.title} className={styles.card} data-rv="" style={delay(i * 0.08)}>
                        <ConnectPlate variant={block.plate} />
                        <p className={styles.meta}>{block.meta}</p>
                        <h3 className={styles.cardTitle}>{block.title}</h3>
                        <p className={styles.cardCopy}>{block.copy}</p>
                      </li>
                    ))}
                  </ol>
                </StepSection>

                {/* ────────── Step 02 — Understand ────────── */}
                <StepSection
                  id="understand"
                  eyebrow="Understand"
                  stepNumber={2}
                  headline={
                    <>
                      One score. Every marker. <em>Clear trends.</em>
                    </>
                  }
                  lead="Merios compresses 160+ biomarkers into a single number — then expands them back into the trend view your body actually needs."
                >
                  <UnderstandBoard lines={UNDERSTAND_LINES} note={UNDERSTAND_NOTE} />
                </StepSection>

                {/* ────────── Step 03 — Act ────────── */}
                <StepSection
                  id="act"
                  eyebrow="Act"
                  stepNumber={3}
                  headline={
                    <>
                      See what changed, <em>then decide.</em>
                    </>
                  }
                  lead="Merios shows what changed and leaves the decision with you — no protocols, no doses, no promised gains."
                >
                  <ol className={styles.cardGrid}>
                    {ACT_STEPS.map((step, i) => (
                      <li key={step.title} className={styles.card} data-rv="" style={delay(i * 0.08)}>
                        <ActPlate variant={step.plate} />
                        <div className={styles.actHead}>
                          <h3 className={styles.cardTitle}>{step.title}</h3>
                          <span aria-hidden className={styles.actIndex}>
                            {step.index}
                          </span>
                        </div>
                        <p className={styles.cardCopy}>{step.copy}</p>
                        <p className={styles.followup}>Follow-up · {step.target}</p>
                      </li>
                    ))}
                  </ol>
                </StepSection>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────── CLOSING ────────────────────────── */}
        {/* The frame's one ink block: the quarterly loop. */}
        <section aria-label="Next steps" className={styles.closing}>
          <div className={styles.container}>
            <div className={`night ${styles.loopBlock}`} data-nav="dark" data-rv="">
              <div className={styles.loopCopy}>
                <p className={styles.closingStatement}>
                  The same loop, every quarter — <em>see it, understand it, do the
                  one next thing.</em>
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
              </div>

              <LoopDiagram />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
