import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import PhenoAgeCalculator from "@/components/calculators/PhenoAgeCalculator";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";

/**
 * Standalone /tools/phenoage-calculator page.
 *
 * Pure backlink magnet at a clean URL. The same calculator is also embedded
 * in /blog/biological-age-calculator-blood-test for blog-intent traffic; this
 * standalone version targets "phenoage calculator" / "biological age calculator
 * free" head terms and is built to be cited and linked from wellness blogs and
 * clinical reference sites.
 *
 * Formula: Levine ME et al. An epigenetic biomarker of aging for lifespan and
 * healthspan. Aging (Albany NY) 2018.
 */

const FAQ_ITEMS = [
  {
    q: "What is PhenoAge?",
    a: "PhenoAge is a biological-age estimate published by Morgan Levine and colleagues in 2018 (Aging, Albany NY). It combines 9 standard blood biomarkers plus chronological age into a single number — your estimated phenotypic age — using a peer-reviewed Cox-regression mortality model. A PhenoAge below your chronological age suggests slower-than-average biological aging.",
  },
  {
    q: "What blood markers do I need?",
    a: "Ten inputs total: chronological age, albumin (g/dL), creatinine (mg/dL), fasting glucose (mg/dL), high-sensitivity CRP (mg/L), lymphocyte percentage (%), mean cell volume / MCV (fL), red-cell distribution width / RDW (%), alkaline phosphatase / ALP (U/L), and white blood cell count (1000 cells/µL). Every input comes from a standard CBC and basic metabolic panel — most are on a routine annual blood test.",
  },
  {
    q: "How accurate is PhenoAge?",
    a: "The PhenoAge model was trained on NHANES III and validated on NHANES IV. In the original paper, it predicted 10-year all-cause mortality with a hazard ratio of ~1.09 per year of accelerated PhenoAge, after adjusting for chronological age and other risk factors. It outperformed earlier blood-based biological age clocks. It's a population-level estimator — a single result is informative, but trend over time is more actionable.",
  },
  {
    q: "Is this the same calculator embedded in your blog post?",
    a: "Yes. The same React component powers the calculator on /blog/biological-age-calculator-blood-test (where it sits in a fuller editorial article). This /tools page is the standalone version — same formula, same accuracy, no surrounding article. Use whichever context you prefer.",
  },
  {
    q: "Does Merios store my numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server. Reload the page and the values are cleared.",
  },
];

export const metadata: Metadata = {
  title: "PhenoAge Calculator (Free, Levine 2018 Formula) | Merios",
  description:
    "Free PhenoAge biological age calculator using the peer-reviewed Levine 2018 formula. Enter 9 blood markers + your age. Result in seconds. No signup.",
  alternates: { canonical: "https://merios.life/tools/phenoage-calculator" },
  openGraph: {
    title: "PhenoAge Calculator — Free, Levine 2018",
    description:
      "Peer-reviewed biological age formula. 9 blood markers in, your PhenoAge out.",
    url: "https://merios.life/tools/phenoage-calculator",
    type: "website",
  },
};

export default function PhenoAgeCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/phenoage-calculator#tool",
    name: "PhenoAge Calculator",
    url: "https://merios.life/tools/phenoage-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free interactive PhenoAge biological age calculator (Levine 2018 formula). 9 blood biomarkers + chronological age.",
    isAccessibleForFree: true,
    citation:
      "Levine ME et al. An epigenetic biomarker of aging for lifespan and healthspan. Aging (Albany NY) 2018.",
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "PhenoAge Calculator", url: "https://merios.life/tools/phenoage-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />

      <PageHero
        eyebrow="PhenoAge — Levine 2018"
        title="Calculate your biological age from a blood test."
        subline="The peer-reviewed PhenoAge formula in a free, interactive calculator. Type 9 standard blood markers + your age — get your phenotypic age and the delta versus chronology."
        align="left"
      />

      <main
        className="pb-20 pt-2"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <PhenoAgeCalculator />

          <section
            className="mt-16 max-w-[720px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 2.4vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              What does the result mean?
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
              }}
            >
              PhenoAge is an <em>estimate</em> of how your body has aged
              biologically, derived from 9 inflammation, metabolic, kidney,
              liver, and hematology markers. If your PhenoAge is lower than your
              chronological age, you are aging more slowly than average for your
              cohort. If higher, the model is flagging measurable wear: chronic
              inflammation, glycation, kidney stress, or red-cell volume drift.
              None of this is destiny — every biomarker is modifiable.
            </p>

            <h2
              className="mt-12"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 2.4vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              Frequently asked questions
            </h2>
            <dl>
              {FAQ_ITEMS.map(({ q, a }) => (
                <div
                  key={q}
                  className="border-b py-5"
                  style={{ borderColor: "var(--color-grid)" }}
                >
                  <dt
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 19,
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: "var(--color-ink)",
                    }}
                  >
                    {q}
                  </dt>
                  <dd
                    className="mt-2"
                    style={{
                      fontSize: 15.5,
                      lineHeight: 1.65,
                      color: "var(--color-ink-secondary)",
                    }}
                  >
                    {a}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              className="mt-10"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                lineHeight: 1.7,
                color: "var(--color-ink-tertiary)",
              }}
            >
              Reference: Levine ME, Lu AT, Quach A, et al. <em>An epigenetic
              biomarker of aging for lifespan and healthspan.</em> Aging
              (Albany NY). 2018;10(4):573-591.
              doi:10.18632/aging.101414
            </p>

            <div
              className="mt-12 rounded-xl p-6 md:p-7"
              style={{
                background: "var(--color-canvas-alt, #ffffff)",
                border: "1px solid var(--color-grid)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-green-deep)",
                  fontWeight: 500,
                }}
              >
                Track this in Merios
              </p>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                  lineHeight: 1.25,
                }}
              >
                One PhenoAge today is information. Twelve PhenoAges over a year is a trend.
              </p>
              <p
                className="mt-3"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Merios reads your blood tests automatically, recalculates PhenoAge with each upload, and tracks the curve — so you can see if a protocol is actually moving the needle.
              </p>
              <Link
                href="/early-access"
                className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-all hover:-translate-y-0.5"
                style={{
                  background: "var(--color-green-deep)",
                  color: "var(--color-canvas)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Get the app
              </Link>
              <Link
                href="/blog/biological-age-calculator-blood-test"
                className="mt-5 ml-3 inline-flex items-center gap-2 px-3 py-3 text-[14px] font-medium"
                style={{
                  color: "var(--color-ink-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Read the primer →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
