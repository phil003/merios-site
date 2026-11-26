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
    "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. $44/year after a 3-day free trial, on iPhone.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://merios.life/how-it-works" },
  openGraph: {
    title: "Blood Test Tracking App: How Merios Works",
    description:
      "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. $44/year after a 3-day free trial, on iPhone.",
    url: "https://merios.life/how-it-works",
    siteName: "Merios",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Test Tracking App: How Merios Works",
    description:
      "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. $44/year after a 3-day free trial, on iPhone.",
  },
};

// ─── JSON-LD HowTo structured data ────────────────────────────────────────
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to interpret your blood test results with Merios",
  description:
    "Merios is a blood test tracking app: upload a lab report, track every biomarker over time, and see what changed. $44/year after a 3-day free trial, on iPhone.",
  step: [
    {
      "@type": "HowToStep",
      name: "Connect",
      text: "Stream your last 365 days from Apple Health, scan a lab report with Merios Plus, or enter markers manually. Merios meets your data where it already lives.",
      url: "https://merios.life/how-it-works#connect",
    },
    {
      "@type": "HowToStep",
      name: "Understand",
      text: "The Merios Score has four quarters: Activity, Recovery and Zen from your daily Apple Health data, plus Blood, where 160+ biomarkers across 11 systems are read. Each quarter opens into a clear, trend-first view.",
      url: "https://merios.life/how-it-works#understand",
    },
    {
      "@type": "HowToStep",
      name: "Act",
      text: "With Merios Plus, see what changed since your last test and read a plain-language monthly report. Merios describes your trends; it does not prescribe supplements, doses or treatments.",
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
  /** Part of Merios Plus (home "Free and Plus": photo and PDF scans). */
  plus?: boolean;
};

const CONNECT_BLOCKS: ConnectBlock[] = [
  {
    plate: "apple-health",
    title: "Apple Health stream",
    copy: "Your last 365 days of activity, sleep, resting heart rate and HRV flow in on first authorization. Merios keeps syncing in the background — nothing to maintain.",
    meta: "One tap · continuous",
  },
  {
    plate: "ocr",
    title: "Lab report scan",
    copy: "Photograph a report or upload its PDF. Each marker is read with its unit and date, and its reference range stays exactly as your lab printed it. Nothing joins your timeline until you check it.",
    meta: "PDF · JPG · HEIC",
    plus: true,
  },
  {
    plate: "manual",
    title: "Manual entry",
    // U+2011 non-breaking hyphens: a hyphenated term never splits across lines.
    copy: "Add a single marker, a blood pressure reading or a note. Everything you enter joins the same timeline as the imports — no second\u2011class data.",
    meta: "Any marker · any unit",
  },
];

// ─── Content: Step 02 — Understand ────────────────────────────────────────
// The Merios Score has four quarters: Activity, Recovery and Zen every day,
// plus Blood. The 160+ biomarkers (11 systems) feed the Blood quarter only.
const UNDERSTAND_LINES = [
  "160+ biomarkers across 11 systems fill the Blood quarter.",
  "Trends replace single\u2011point anxiety.", // U+2011: never split
  "Every system in plain words: information, not a warning.",
] as const;

const UNDERSTAND_NOTE =
  "The score is a signal, not a verdict — each quarter stays legible on its own page, so you always know where the number comes from.";

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
    // Report-to-report tracking is Merios Plus (home Scan step 03, Plans).
    target: "every new test, with Plus",
  },
  {
    plate: "report",
    title: "Read your month in plain words",
    copy: "With Merios Plus, a monthly report sums up your Activity, Recovery and Zen, and your blood markers, in plain language. It describes what moved; it never prescribes.",
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
 * cards) → the quarterly loop in the frame's one ink block. Metadata and every
 * href are unchanged. Nov 26, 2026: the copy and the HowTo JSON-LD now say
 * what the score is (four quarters; the 160+ biomarkers feed Blood) and which
 * steps are Merios Plus.
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
              From blood tests to action, <em>in&nbsp;three calm steps.</em>
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
                  lead="Three import paths — streaming, scanning, manual — so nothing about your health history is locked in a drawer or a provider silo."
                >
                  <ol className={styles.cardGrid}>
                    {CONNECT_BLOCKS.map((block, i) => (
                      <li key={block.title} className={styles.card} data-rv="" style={delay(i * 0.08)}>
                        <ConnectPlate variant={block.plate} />
                        <div className={styles.metaRow}>
                          <p className={styles.meta}>{block.meta}</p>
                          {block.plus ? <span className={styles.plusTag}>Merios Plus</span> : null}
                        </div>
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
                  lead="The Merios Score has four quarters: Activity, Recovery and Zen from your days, plus Blood, where 160+ biomarkers across 11 systems are read. Each quarter opens back into the trends behind it."
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
