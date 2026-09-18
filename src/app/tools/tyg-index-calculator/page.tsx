import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import TyGIndexCalculator from "@/components/calculators/TyGIndexCalculator";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";

const FAQ_ITEMS = [
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
        eyebrow="TyG index — insulin resistance"
        title="Check your insulin resistance without a fasting insulin test."
        subline="The TyG index calculator runs the triglyceride-glucose formula on two numbers that are already on your standard panel — in mg/dL or mmol/L, no separate insulin draw required."
        align="left"
      />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <TyGIndexCalculator />

          <section className="mt-14 max-w-[720px]" style={{ fontFamily: "var(--font-sans)" }}>
            <h2 style={h2Style}>Why this exists</h2>
            <p style={pStyle}>
              The standard way to estimate insulin resistance is{" "}
              <Link href="/blog/homa-ir-insulin-resistance" style={linkStyle}>
                HOMA-IR
              </Link>
              , and it is a good measure — but it needs a fasting insulin result, which is rarely included on a routine
              panel and usually has to be requested specifically. Most people never have it.
            </p>
            <p style={pStyle}>
              The TyG index was developed to fill exactly that gap. It uses triglycerides and fasting glucose, two values
              that appear together on virtually every standard lipid and metabolic panel. If you have had blood work in
              the last year, you almost certainly already have both numbers — which means you can compute this today
              rather than after another draw.
            </p>

            <h2 style={h2Style}>What is a normal TyG index?</h2>
            <p style={pStyle}>
              There is no single agreed cutoff, and any calculator that hands you one without saying which version of the
              formula it came from is hiding the problem rather than solving it. On the natural-log, divide-by-2 version
              used here — the form from the original 2008 paper — the bands that recur most often in the literature are:
            </p>
            <ul style={ulStyle}>
              <li style={liStyle}>
                <strong>Under 8.0</strong> — low. Both inputs are in good territory, which usually tracks with preserved
                insulin sensitivity.
              </li>
              <li style={liStyle}>
                <strong>8.0 to 8.5</strong> — typical for a general adult population. Not a red flag on its own.
              </li>
              <li style={liStyle}>
                <strong>8.5 to 9.0</strong> — above the threshold most commonly cited for metabolic syndrome. Worth
                confirming with fasting insulin, and worth repeating after a few months rather than acting on one reading.
              </li>
              <li style={liStyle}>
                <strong>Above 9.0</strong> — high, driven by elevated triglycerides, elevated fasting glucose, or both.
                This is a conversation with your physician and a fuller metabolic workup, not a self-management project.
              </li>
            </ul>
            <p style={pStyle}>
              How wide is the disagreement? A 2024 review in <em>Lipids in Health and Disease</em> found published
              cut-offs ranging from 4.5 to 9.5, with the vast majority of studies at or above 8.0. That spread is not
              sloppy research — it reflects genuinely different formula variants and different populations. It is the
              same distinction as a lab reference range versus a functional range: the published line tells you where a
              population sits, your own series across repeat panels tells you where you are heading.
            </p>

            <h2 style={h2Style}>The formula, and the /2 that trips up other calculators</h2>
            <p style={pStyle}>
              TyG = ln[(triglycerides × fasting glucose) / 2], with both values in mg/dL. The division by two sits inside
              the logarithm. This is worth stating plainly because it is the most common implementation error in
              circulating calculators, and it produces a number that looks plausible while being wrong.
            </p>
            <p style={pStyle}>
              Two other variants are in print: some papers drop the /2 entirely, and some take log base 10 instead of the
              natural log. Dropping the /2 raises the result by ln 2, about 0.69. Switching to log base 10 divides it by
              about 2.30. Neither variant is wrong in itself, but a cutoff taken from a paper using one of them cannot be
              read against a number computed with another — which is most of the reason published thresholds span such a
              wide range. If you compare your number with a study, check which formula that study used first.
            </p>

            <h2 style={h2Style}>TyG index from mmol/L results</h2>
            <p style={pStyle}>
              If your lab reports in mmol/L, convert both values to mg/dL before applying the formula — the constant is
              defined in US units:
            </p>
            <ul style={ulStyle}>
              <li style={liStyle}>Triglycerides: mmol/L × 88.57 = mg/dL</li>
              <li style={liStyle}>Fasting glucose: mmol/L × 18.02 = mg/dL</li>
            </ul>
            <p style={pStyle}>
              Worked example: triglycerides of 1.3 mmol/L and fasting glucose of 5.2 mmol/L become roughly 115 and
              94 mg/dL. Multiplied and halved that is about 5,400, and the natural log of 5,400 is 8.59 — mid-range. The
              calculator above does this for you when you switch units, and prints the converted mg/dL values so you can
              check the arithmetic yourself.
            </p>

            <h2 style={h2Style}>How accurate is the TyG index?</h2>
            <p style={pStyle}>
              The index was proposed in 2008 and then compared against the euglycemic-hyperinsulinemic clamp — the
              reference method for measuring insulin sensitivity — in a 99-participant study published in 2010, where it
              identified insulin resistance with a reported sensitivity of 96.5% and a specificity of 85%. That is strong
              agreement for something computed from two numbers already sitting on a routine panel.
            </p>
            <p style={pStyle}>
              It is still one study in one population. TyG is a screening signal associated with insulin resistance, not a
              diagnostic test, and it is not a substitute for a clinician reading your full panel. Where fasting insulin
              is available, the two are best read together rather than one instead of the other.
            </p>

            <h2 style={h2Style}>How to read your number over time</h2>
            <p style={pStyle}>
              TyG is a continuous marker, not a verdict. The value that matters most is your own trend across repeat
              panels: a number climbing year over year is a more meaningful signal than a single reading sitting slightly
              above a published threshold.
            </p>
            <p style={pStyle}>
              Because both inputs move with diet and metabolic health, TyG responds to the same levers that move{" "}
              <Link href="/blog/how-to-lower-triglycerides" style={linkStyle}>
                triglycerides
              </Link>{" "}
              and{" "}
              <Link href="/blog/fasting-glucose-100-borderline" style={linkStyle}>
                fasting glucose
              </Link>
              . If you want the fuller picture, pair it with{" "}
              <Link href="/tools/homa-ir-calculator" style={linkStyle}>
                HOMA-IR
              </Link>{" "}
              when you do have{" "}
              <Link href="/blog/fasting-insulin-levels-chart" style={linkStyle}>
                fasting insulin
              </Link>
              , and with the{" "}
              <Link href="/tools/triglyceride-hdl-ratio" style={linkStyle}>
                triglyceride to HDL ratio
              </Link>
              .
            </p>

            <h2 style={h2Style}>Frequently asked questions</h2>
            <dl>
              {FAQ_ITEMS.map(({ q, a }) => (
                <div key={q} className="border-b py-5" style={{ borderColor: "var(--color-grid)" }}>
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
                  <dd className="mt-2" style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--color-ink-secondary)" }}>
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

            <div
              className="mt-12 rounded-xl p-6 md:p-7"
              style={{ background: "var(--color-canvas-alt, #ffffff)", border: "1px solid var(--color-grid)" }}
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
                One TyG index is a dot. Six are a direction.
              </p>
              <p className="mt-3" style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--color-ink-secondary)" }}>
                Merios recomputes the TyG index from every panel you upload and plots the curve next to your
                triglycerides and fasting glucose — so you can see which of the two is moving your number, and whether
                the direction is the one you wanted.
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
                href="/blog/homa-ir-insulin-resistance"
                className="mt-5 ml-3 inline-flex items-center gap-2 px-3 py-3 text-[14px] font-medium"
                style={{ color: "var(--color-ink-secondary)", fontFamily: "var(--font-sans)" }}
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

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.625rem, 2.4vw, 2rem)",
  fontWeight: 300,
  letterSpacing: "-0.02em",
  color: "var(--color-ink)",
  marginBottom: "0.75rem",
  marginTop: "3rem",
};
const pStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  color: "var(--color-ink-secondary)",
  marginBottom: "1.1rem",
};
const ulStyle: React.CSSProperties = {
  listStyle: "disc",
  paddingLeft: "1.25rem",
  marginBottom: "1.1rem",
};
const liStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  color: "var(--color-ink-secondary)",
  marginBottom: "0.5rem",
};
const linkStyle: React.CSSProperties = { color: "var(--color-green-deep)", textUnderlineOffset: "3px" };
