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
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

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
  title: "PhenoAge Calculator (Free, Levine 2018 Formula)",
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

      <main className={t.main}>
        <div className={t.wrap}>
          <PhenoAgeCalculator />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>
                What does the result mean?
              </h2>
              <p>
                PhenoAge is an <em>estimate</em> of how your body has aged
                biologically, derived from 9 inflammation, metabolic, kidney,
                liver, and hematology markers. If your PhenoAge is lower than your
                chronological age, you are aging more slowly than average for your
                cohort. If higher, the model is flagging measurable wear: chronic
                inflammation, glycation, kidney stress, or red-cell volume drift.
                None of this is destiny — every biomarker is modifiable.
              </p>
            </div>

            <div className={t.faq} data-rv="">
              <h2 className={t.faqTitle}>Frequently asked questions</h2>
              <dl className={t.faqList}>
                {FAQ_ITEMS.map(({ q, a }) => (
                  <div key={q} className={t.faqItem}>
                    <dt className={t.faqQ}>
                      {q}
                    </dt>
                    <dd className={t.faqA}>
                      {a}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className={t.reference}>
                Reference: Levine ME, Lu AT, Quach A, et al. <em>An epigenetic
                biomarker of aging for lifespan and healthspan.</em> Aging
                (Albany NY). 2018;10(4):573-591.
                doi:10.18632/aging.101414
              </p>
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={`chrome-text ${t.ctaQuote}`}>
                  One PhenoAge today is information. Twelve PhenoAges over a year is a trend.
                </p>
                <p className={t.ctaText}>
                  Merios reads your blood tests automatically, recalculates PhenoAge with each upload, and tracks the curve — so you can see if a protocol is actually moving the needle.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/biological-age-calculator-blood-test" className="btn btn-ghost-night">
                  Read the primer →
                </Link>
              </div>
              <CtaPulse />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
