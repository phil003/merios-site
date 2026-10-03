import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import TyGIndexCalculator from "@/components/calculators/TyGIndexCalculator";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const FAQ_ITEMS = [
  {
    q: "Is the TyG index the same as the triglyceride glucose index?",
    a: "Yes — two names for the same number. TyG is simply the abbreviation of triglyceride-glucose, so a triglyceride glucose index calculator and a TyG index calculator compute the same thing: ln[(triglycerides mg/dL × fasting glucose mg/dL) / 2]. You will also see it written as the triglyceride index, or occasionally the TyG ratio — the last one is a misnomer, since the formula multiplies the two values inside a logarithm rather than dividing one by the other.",
  },
  {
    q: "What is the TyG index formula?",
    a: "TyG = ln[(triglycerides mg/dL × fasting glucose mg/dL) / 2]. The division by 2 happens inside the natural logarithm — writing it as ln(triglycerides × glucose) / 2 gives a different and incorrect number, and that error is common enough that it has its own published correction literature.",
  },
  {
    q: "What is a normal TyG index?",
    a: "There is no single agreed cutoff. On the natural-log, divide-by-2 version used here, values under 8.0 are generally read as low, 8.0 to 8.5 as typical for a general adult population, and thresholds near 8.5 are the ones most often cited for metabolic syndrome. Cutoffs are population-derived and vary between studies and ethnic groups, so the trend in your own number over time is more informative than any fixed line.",
  },
  {
    q: "Why do published TyG cutoffs range from 4.5 to 9.5?",
    a: "Because more than one version of the formula is in circulation. A 2024 review in Lipids in Health and Disease reports published cut-offs ranging from 4.5 to 9.5, with the vast majority of studies at or above 8.0. Dropping the division by 2 raises the result by ln 2, about 0.69, and taking log base 10 instead of the natural log divides it by about 2.30. A threshold lifted from one paper cannot be read against a number computed the other way.",
  },
  {
    q: "How do I calculate the TyG index in mmol/L?",
    a: "Convert to mg/dL first, because the constant in the formula is defined in US units. Multiply triglycerides in mmol/L by 88.57 and glucose in mmol/L by 18.02. For example 1.3 mmol/L triglycerides and 5.2 mmol/L fasting glucose become about 115 and 94 mg/dL, which gives a TyG index of 8.59. The calculator on this page does that conversion for you when you switch units.",
  },
  {
    q: "Is the TyG index better than HOMA-IR?",
    a: "It is not strictly better, but it is far more available. HOMA-IR requires fasting insulin, which is rarely on a standard panel and often has to be ordered separately. TyG uses triglycerides and fasting glucose, which appear on almost every routine lipid and metabolic panel — so most people can compute it from lab work they already have.",
  },
  {
    q: "How accurate is the TyG index?",
    a: "In the study comparing it against the euglycemic-hyperinsulinemic clamp, the reference method for measuring insulin sensitivity, the index identified insulin resistance with a reported sensitivity of 96.5% and specificity of 85% in 99 participants (Guerrero-Romero et al., J Clin Endocrinol Metab 2010). That is strong agreement for a two-input surrogate, but it remains one study in one population, and the index is a screening signal associated with insulin resistance rather than a diagnostic test.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "TyG Index Calculator (Triglyceride-Glucose Index)",
  description:
    "Free TyG index calculator: ln[(triglycerides × fasting glucose) / 2], in mg/dL or mmol/L. An insulin resistance marker that needs no fasting insulin test.",
  alternates: { canonical: "https://merios.life/tools/tyg-index-calculator" },
  openGraph: {
    title: "TyG Index Calculator — Insulin Resistance Without Fasting Insulin",
    description:
      "Compute the triglyceride-glucose index from two values already on your standard panel. Free, no signup, mg/dL and mmol/L.",
    url: "https://merios.life/tools/tyg-index-calculator",
    type: "website",
  },
};

export default function TyGCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/tyg-index-calculator#tool",
    name: "TyG Index Calculator (Triglyceride-Glucose Index)",
    url: "https://merios.life/tools/tyg-index-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free triglyceride-glucose (TyG) index calculator for insulin resistance, using triglycerides and fasting glucose, in mg/dL or mmol/L.",
    isAccessibleForFree: true,
    dateModified: "2026-09-23",
    citation:
      "Simental-Mendia LE, Rodriguez-Moran M, Guerrero-Romero F. The product of fasting glucose and triglycerides as surrogate for identifying insulin resistance in apparently healthy subjects. Metab Syndr Relat Disord 2008;6(4):299-304.",
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "TyG Index Calculator", url: "https://merios.life/tools/tyg-index-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="Triglyceride-glucose index — insulin resistance"
        title="TyG index calculator"
        subline="Check your insulin resistance without a fasting insulin test. The triglyceride glucose index runs on two numbers already sitting on your standard panel — in mg/dL or mmol/L, no separate insulin draw required."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <TyGIndexCalculator />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>Why this exists</h2>
              <p>
                The standard way to estimate insulin resistance is{" "}
                <Link href="/blog/homa-ir-insulin-resistance">
                  HOMA-IR
                </Link>
                , and it is a good measure — but it needs a fasting insulin result, which is rarely included on a routine
                panel and usually has to be requested specifically. Most people never have it.
              </p>
              <p>
                The TyG index was developed to fill exactly that gap. It uses triglycerides and fasting glucose, two values
                that appear together on virtually every standard lipid and metabolic panel. If you have had blood work in
                the last year, you almost certainly already have both numbers — which means you can compute this today
                rather than after another draw.
              </p>

              <h2>What is a normal TyG index?</h2>
              <p>
                There is no single agreed cutoff, and any calculator that hands you one without saying which version of the
                formula it came from is hiding the problem rather than solving it. On the natural-log, divide-by-2 version
                used here — the form from the original 2008 paper — the bands that recur most often in the literature are:
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={t.captionNote}>
                    TyG index bands on the natural-log, divide-by-2 formula used by this calculator. Cutoffs are
                    population-derived and vary between studies.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>TyG index</th>
                      <th scope="col" className={t.colHead}>How it is usually read</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-tone="ok">
                      <th scope="row" className={t.rowHead}>Under 8.0</th>
                      <td className={t.cellNote}>
                        Low. Both inputs are in good territory, which usually tracks with preserved insulin sensitivity.
                      </td>
                    </tr>
                    <tr data-tone="ok">
                      <th scope="row" className={t.rowHead}>8.0 to 8.5</th>
                      <td className={t.cellNote}>
                        Typical for a general adult population. Not a red flag on its own.
                      </td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>8.5 to 9.0</th>
                      <td className={t.cellNote}>
                        Above the threshold most commonly cited for metabolic syndrome. Worth confirming with fasting
                        insulin, and worth repeating after a few months rather than acting on one reading.
                      </td>
                    </tr>
                    <tr data-tone="bad">
                      <th scope="row" className={t.rowHead}>Above 9.0</th>
                      <td className={t.cellNote}>
                        High, driven by elevated triglycerides, elevated fasting glucose, or both. This is a conversation
                        with your physician and a fuller metabolic workup, not a self-management project.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                How wide is the disagreement? A 2024 review in <em>Lipids in Health and Disease</em> found published
                cut-offs ranging from 4.5 to 9.5, with the vast majority of studies at or above 8.0. That spread is not
                sloppy research — it reflects genuinely different formula variants and different populations. It is the
                same distinction as a lab reference range versus a functional range: the published line tells you where a
                population sits, your own series across repeat panels tells you where you are heading.
              </p>

              <h2>The formula, and the /2 that trips up other calculators</h2>
              <p>
                TyG = ln[(triglycerides × fasting glucose) / 2], with both values in mg/dL. The division by two sits inside
                the logarithm. This is worth stating plainly because it is the most common implementation error in
                circulating calculators, and it produces a number that looks plausible while being wrong.
              </p>
              <p>
                Two other variants are in print: some papers drop the /2 entirely, and some take log base 10 instead of the
                natural log. Dropping the /2 raises the result by ln 2, about 0.69. Switching to log base 10 divides it by
                about 2.30. Neither variant is wrong in itself, but a cutoff taken from a paper using one of them cannot be
                read against a number computed with another — which is most of the reason published thresholds span such a
                wide range. If you compare your number with a study, check which formula that study used first.
              </p>

              <h2>TyG index from mmol/L results</h2>
              <p>
                If your lab reports in mmol/L, convert both values to mg/dL before applying the formula — the constant is
                defined in US units:
              </p>
              <ul>
                <li>Triglycerides: mmol/L × 88.57 = mg/dL</li>
                <li>Fasting glucose: mmol/L × 18.02 = mg/dL</li>
              </ul>
              <p>
                Worked example: triglycerides of 1.3 mmol/L and fasting glucose of 5.2 mmol/L become roughly 115 and
                94 mg/dL. Multiplied and halved that is about 5,400, and the natural log of 5,400 is 8.59 — mid-range. The
                calculator above does this for you when you switch units, and prints the converted mg/dL values so you can
                check the arithmetic yourself.
              </p>

              <h2>How accurate is the TyG index?</h2>
              <p>
                The index was proposed in 2008 and then compared against the euglycemic-hyperinsulinemic clamp — the
                reference method for measuring insulin sensitivity — in a 99-participant study published in 2010, where it
                identified insulin resistance with a reported sensitivity of 96.5% and a specificity of 85%. That is strong
                agreement for something computed from two numbers already sitting on a routine panel.
              </p>
              <p>
                It is still one study in one population. TyG is a screening signal associated with insulin resistance, not a
                diagnostic test, and it is not a substitute for a clinician reading your full panel. Where fasting insulin
                is available, the two are best read together rather than one instead of the other.
              </p>

              <h2>How to read your number over time</h2>
              <p>
                TyG is a continuous marker, not a verdict. The value that matters most is your own trend across repeat
                panels: a number climbing year over year is a more meaningful signal than a single reading sitting slightly
                above a published threshold.
              </p>
              <p>
                Because both inputs move with diet and metabolic health, TyG responds to the same levers that move{" "}
                <Link href="/blog/how-to-lower-triglycerides">
                  triglycerides
                </Link>{" "}
                and{" "}
                <Link href="/blog/fasting-glucose-100-borderline">
                  fasting glucose
                </Link>
                . If you want the fuller picture, pair it with{" "}
                <Link href="/tools/homa-ir-calculator">
                  HOMA-IR
                </Link>{" "}
                when you do have{" "}
                <Link href="/blog/fasting-insulin-levels-chart">
                  fasting insulin
                </Link>
                , and with the{" "}
                <Link href="/tools/triglyceride-hdl-ratio">
                  triglyceride to HDL ratio
                </Link>
                .
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
                References: Simental-Mendia LE, Rodriguez-Moran M, Guerrero-Romero F.{" "}
                <em>
                  The product of fasting glucose and triglycerides as surrogate for identifying insulin resistance in
                  apparently healthy subjects.
                </em>{" "}
                Metab Syndr Relat Disord 2008;6(4):299-304. · Guerrero-Romero F, Simental-Mendia LE, Gonzalez-Ortiz M, et
                al.{" "}
                <em>
                  The product of triglycerides and glucose, a simple measure of insulin sensitivity. Comparison with the
                  euglycemic-hyperinsulinemic clamp.
                </em>{" "}
                J Clin Endocrinol Metab 2010;95(7):3347-3351. · Gounden V, Devaraj S, Jialal I.{" "}
                <em>The role of the triglyceride-glucose index as a biomarker of cardio-metabolic syndromes.</em> Lipids
                Health Dis 2024;23:416.
              </p>
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={`chrome-text ${t.ctaQuote}`}>
                  One TyG index is a dot. Six are a direction.
                </p>
                <p className={t.ctaText}>
                  Merios recomputes the TyG index from every panel you upload and plots the curve next to your
                  triglycerides and fasting glucose — so you can see which of the two is moving your number, and whether
                  the direction is the one you wanted.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/homa-ir-insulin-resistance" className="btn btn-ghost-night">
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
