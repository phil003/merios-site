import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import StepSection from "@/components/howitworks/StepSection";
import StickyLateralNav from "@/components/howitworks/StickyLateralNav";
import SvgPictogram, {
  type PictogramVariant,
} from "@/components/howitworks/SvgPictogram";
import UnderstandPinned from "@/components/howitworks/UnderstandPinned";

export const metadata: Metadata = {
  metadataBase: new URL("https://merios.life"),
  title: "How Merios Works — From Blood Tests to Action",
  description:
    "How Merios turns your blood tests and wearables into one score, clear trends, and the next move worth making.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://merios.life/how-it-works" },
  openGraph: {
    title: "How Merios Works — From Blood Tests to Action",
    description:
      "How Merios turns your blood tests and wearables into one score, clear trends, and the next move worth making.",
    url: "https://merios.life/how-it-works",
    siteName: "Merios",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Merios Works — From Blood Tests to Action",
    description:
      "How Merios turns your blood tests and wearables into one score, clear trends, and the next move worth making.",
  },
};

// ─── JSON-LD HowTo structured data ────────────────────────────────────────
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to interpret your blood test results with Merios",
  description:
    "How Merios turns your blood tests and wearables into one score, clear trends, and the next move worth making.",
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

      <main
        id="main-content"
        style={{ background: "var(--color-canvas)" }}
      >
        {/* ───────────────────────────────── HERO ──────────────────────── */}
        <section
          aria-labelledby="hiw-hero-headline"
          className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-[10%] h-[700px]"
            style={{
              background:
                "radial-gradient(55% 55% at 30% 20%, rgba(30,61,42,0.05), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
            <Reveal>
              <div
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
                  How it works
                </span>
              </div>

              <h1
                id="hiw-hero-headline"
                className="mt-8 max-w-[980px]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-display-l)",
                  fontWeight: 300,
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                }}
              >
                From blood tests to action,
                <br aria-hidden />
                in three calm steps.
              </h1>

              <p
                className="mt-8 max-w-[600px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body-l)",
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Connect every source, read one score, act on the handful of
                moves that actually matter. Merios makes the loop between
                result and response short — and obvious.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ─────────────────────────── GRID WITH STICKY NAV ────────────── */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
            <StickyLateralNav />

            <div>
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
                <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                  {CONNECT_BLOCKS.map((block, i) => (
                    <li key={block.title} className="list-none">
                      <Reveal
                        delay={i * 0.08}
                        className="flex flex-col gap-5"
                      >
                        <div
                          style={{ color: "var(--color-green-deep)" }}
                          className="opacity-90"
                        >
                          <SvgPictogram variant={block.variant} />
                        </div>
                        <div>
                          <span
                            className="block"
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 10.5,
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                              color: "var(--color-ink-tertiary)",
                              fontWeight: 500,
                            }}
                          >
                            {block.meta}
                          </span>
                          <h3
                            className="mt-3"
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "clamp(1.375rem, 2vw, 1.625rem)",
                              fontWeight: 400,
                              lineHeight: 1.15,
                              letterSpacing: "-0.02em",
                              color: "var(--color-ink)",
                            }}
                          >
                            {block.title}
                          </h3>
                          <p
                            className="mt-3"
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: 15,
                              lineHeight: 1.6,
                              color: "var(--color-ink-secondary)",
                            }}
                          >
                            {block.copy}
                          </p>
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
                <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {ACT_PROTOCOLS.map((p, i) => (
                    <li
                      key={p.title}
                      className="list-none rounded-2xl p-6 md:p-7"
                      style={{
                        background: "var(--color-canvas-alt)",
                        border: "1px solid var(--color-grid)",
                      }}
                    >
                      <Reveal delay={i * 0.08} className="flex flex-col gap-5">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            style={{ color: "var(--color-green-deep)" }}
                            className="opacity-90"
                          >
                            <SvgPictogram variant={p.variant} />
                          </div>
                          <span
                            className="tabular-nums"
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 13,
                              fontWeight: 500,
                              letterSpacing: "0.05em",
                              color: "var(--color-green-deep)",
                              background: "rgba(159,191,0,0.12)",
                              padding: "4px 10px",
                              borderRadius: 999,
                            }}
                          >
                            {p.lift}
                          </span>
                        </div>
                        <div>
                          <h3
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                              fontWeight: 400,
                              lineHeight: 1.15,
                              letterSpacing: "-0.015em",
                              color: "var(--color-ink)",
                            }}
                          >
                            {p.title}
                          </h3>
                          <p
                            className="mt-3"
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: 14.5,
                              lineHeight: 1.6,
                              color: "var(--color-ink-secondary)",
                            }}
                          >
                            {p.copy}
                          </p>
                        </div>
                        <div
                          className="mt-auto flex items-center gap-2 pt-3"
                          style={{
                            borderTop: "1px solid var(--color-grid)",
                          }}
                        >
                          <span
                            aria-hidden
                            style={{
                              color: "var(--color-ink-tertiary)",
                              display: "inline-flex",
                            }}
                          >
                            <SvgPictogram
                              variant="followup"
                              width={18}
                              height={18}
                            />
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "var(--color-ink-tertiary)",
                            }}
                          >
                            Follow-up · {p.target}
                          </span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </StepSection>
            </div>
          </div>
        </div>

        {/* ─────────────────────────── CLOSING ────────────────────────── */}
        <section
          aria-label="Next steps"
          className="relative pb-32 pt-10 md:pb-40"
        >
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            <Reveal>
              <div className="flex flex-col items-start gap-10 border-t pt-16 md:pt-20"
                style={{ borderColor: "var(--color-grid)" }}
              >
                <p
                  className="max-w-[520px]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.75rem, 3.2vw, 2.25rem)",
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                  }}
                >
                  The same loop, every quarter — see it, understand it, do the
                  one next thing.
                </p>

                <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8">
                  <a
                    href="/early-access"
                    className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "var(--color-green-deep)",
                      color: "var(--color-canvas)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Get Merios
                    <span aria-hidden>→</span>
                  </a>

                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 transition-colors"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      color: "var(--color-ink-secondary)",
                    }}
                  >
                    Read the journal
                    <span aria-hidden>→</span>
                  </a>
                </div>

                <a
                  href="/faq"
                  className="inline-flex items-center gap-2 transition-colors"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "var(--color-ink-tertiary)",
                  }}
                >
                  Still wondering? Read the FAQ
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
