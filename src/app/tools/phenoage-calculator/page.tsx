import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CtaScreen from "@/components/calculators/tool-page/CtaScreen";
import ToolHero from "@/components/calculators/tool-page/ToolHero";
import ToolFaq from "@/components/calculators/tool-page/ToolFaq";
import ToolRelated from "@/components/calculators/tool-page/ToolRelated";
import PhenoAgeCalculator from "@/components/calculators/PhenoAgeCalculator";
import {
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";
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
    a: "Ten inputs total: chronological age, albumin (g/dL), creatinine (mg/dL), fasting glucose (mg/dL), high-sensitivity CRP (mg/L), lymphocyte percentage (%), mean cell volume / MCV (fL), red-cell distribution width / RDW (%), alkaline phosphatase / ALP (U/L), and white blood cell count (1000 cells/µL). A CBC with differential gives the lymphocyte percentage, MCV, RDW and white cell count; a comprehensive metabolic panel (CMP) gives albumin, creatinine, glucose and alkaline phosphatase; hs-CRP is a separate test that often has to be requested.",
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

// Every term of the Levine 2018 weighted sum, as PhenoAgeCalculator.tsx
// computes it (US inputs converted first: albumin × 10, creatinine × 88.4,
// glucose × 0.0555; hs-CRP ÷ 10 in every case, since Table 1 takes CRP in
// mg/dL and labs print hs-CRP in mg/L).
const COEFFICIENTS: [string, string, string][] = [
  ["Intercept", "−19.9067", ""],
  ["Chronological age", "+0.0804", "years"],
  ["Albumin", "−0.0336", "g/L"],
  ["Creatinine", "+0.0095", "µmol/L"],
  ["Glucose", "+0.1953", "mmol/L"],
  ["ln(hs-CRP)", "+0.0954", "mg/dL"],
  ["Lymphocytes", "−0.0120", "%"],
  ["MCV", "+0.0268", "fL"],
  ["RDW", "+0.3306", "%"],
  ["Alkaline phosphatase", "+0.0019", "U/L"],
  ["White blood cells", "+0.0554", "1000 cells/\u2060µL"], // word joiner: never "cells/" | "µL"
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

      <main className={t.main}>
        <ToolHero
          slug="phenoage-calculator"
          eyebrow="PhenoAge — Levine 2018"
          title="Calculate your biological age"
          em="from a blood test."
          subline="The peer-reviewed PhenoAge formula in a free, interactive calculator. Type 9 standard blood markers + your age — get your phenotypic age and the delta versus chronology."
        />

        <div className={t.wrap}>
          <PhenoAgeCalculator />

          <section className={t.formulaSection} aria-labelledby="formula-title">
            <div className={t.formulaIntro}>
              <p className={t.eyebrow}>The formula</p>
              <h2 id="formula-title" className={t.h2}>
                Every coefficient, <em>on the page.</em>
              </h2>
              <p className={t.formulaText}>
                A weighted sum of your markers gives a mortality score, which
                converts back into years. The calculator first turns your units
                into the ones the formula uses: from US units, albumin × 10,
                creatinine × 88.4 and glucose × 0.0555; and hs-CRP ÷ 10, because
                the paper takes CRP in mg/dL while labs print hs-CRP in mg/L.
              </p>
              <p className={t.reference}>
                Reference: Levine ME, Lu AT, Quach A, et al. <em>An epigenetic
                biomarker of aging for lifespan and healthspan.</em> Aging
                (Albany NY). 2018;10(4):573-591.
                doi:10.18632/aging.101414
              </p>
            </div>
            <div className={t.coefCard}>
              <table className={t.coefTable}>
                <caption>PhenoAge coefficients, Levine 2018</caption>
                <thead>
                  <tr>
                    <th scope="col">Term</th>
                    <th scope="col" className={t.coefWeight}>Weight</th>
                    <th scope="col" className={t.coefUnit}>Unit used</th>
                  </tr>
                </thead>
                <tbody>
                  {COEFFICIENTS.map(([term, weight, unit]) => (
                    <tr key={term}>
                      <th scope="row">{term}</th>
                      <td className={t.coefWeight}>{weight}</td>
                      <td className={t.coefUnit}>{unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={t.formulaPlate}>
                {/* each span stays on one line: a narrow screen breaks the
                    formula only between them, never inside ln(1 − M) */}
                <p>
                  <span>M =</span> <span>1 − exp(−exp(xb) ×</span>{" "}
                  <span>(exp(120 × 0.0076927) − 1)</span> <span>÷ 0.0076927)</span>
                </p>
                <p>
                  <span>PhenoAge =</span> <span>141.50 + ln(−0.00553 ×</span>{" "}
                  <span>ln(1 − M))</span> <span>÷ 0.09165</span>
                </p>
              </div>
            </div>
          </section>

          <section className={t.meaning}>
            <div className={`editorial-prose ${t.prose} ${t.meaningText}`}>
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

            <div className={t.meaningFaq} data-rv="">
              <h2 className={t.faqTitle}>Frequently asked questions</h2>
              <ToolFaq items={FAQ_ITEMS} />
            </div>
          </section>

          <div>
            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={t.ctaQuote}>
                  One PhenoAge today is information. <em>Twelve PhenoAges over a year is a trend.</em>
                </p>
                <p className={t.ctaText}>
                  Merios reads your blood tests automatically, recalculates PhenoAge with each upload, and tracks the curve — so you can see if a protocol is actually moving the needle.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=phenoage-calculator" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/biological-age-calculator-blood-test" className="btn btn-ghost-night">
                  Read the primer →
                </Link>
              </div>
              <CtaScreen screen="bio-age" />
            </div>
          </div>

          <ToolRelated slug="phenoage-calculator" />
        </div>
      </main>
      <Footer />
    </>
  );
}
