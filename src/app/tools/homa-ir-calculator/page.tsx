import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import HomaIRCalculator from "@/components/calculators/HomaIRCalculator";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";

const FAQ_ITEMS = [
  {
    q: "What is HOMA-IR?",
    a: "HOMA-IR — Homeostatic Model Assessment for Insulin Resistance — is a single number computed from fasting glucose and fasting insulin that estimates how resistant your tissues are to insulin. It was introduced by Matthews et al. (Diabetologia, 1985) and remains one of the most cited insulin-resistance estimators in clinical research.",
  },
  {
    q: "What's the formula?",
    a: "HOMA-IR = (fasting insulin in µIU/mL × fasting glucose in mg/dL) ÷ 405. Both values must come from the same fasted blood draw (at least 8 hours, water only).",
  },
  {
    q: "What's a healthy range?",
    a: "There is no single universal cutoff — thresholds shift with the population and the insulin assay. The bands most widely used in practice: below 1.0 — optimal insulin sensitivity. 1.0-1.9 — normal. 2.0-2.5 — borderline. Above 2.5 — insulin resistance. For scale, the EPIRCE general-population study derived cutoffs between the 70th and 75th percentiles: 3.46 on a 90th-percentile criterion, but 2.05 once metabolic-syndrome components were taken into account. Athletes and very lean metabolically healthy individuals often score below 0.8.",
  },
  {
    q: "My lab reports glucose in mmol/L — which formula applies?",
    a: "Both are the same model with a different constant. With glucose in mg/dL, divide by 405. With glucose in mmol/L, divide by 22.5. Switch the unit toggle on the calculator and it applies the matching denominator, so you never have to convert by hand. Insulin is in µIU/mL (numerically equal to mIU/L) either way.",
  },
  {
    q: "How often should I retest?",
    a: "If you are acting on an elevated score, every 3 to 6 months is enough to see whether an intervention is working — insulin sensitivity responds to training, fibre, sleep and weight change over weeks to months, not days. Once the number is stable, an annual check alongside your usual panel is reasonable. Read it as a trend across several draws, since a single fasting insulin is a noisy measurement.",
  },
  {
    q: "Does HOMA-IR apply to type 1 diabetes?",
    a: "No. The model assumes a pancreas still secreting insulin and back-calculates resistance from that secretion. In type 1 diabetes, insulin-producing beta cells are largely destroyed and circulating insulin mostly reflects injected doses, so the score is not interpretable. It is also unreliable in anyone on exogenous insulin, for the same reason.",
  },
  {
    q: "Can HOMA-IR be normal while something is still wrong?",
    a: "Yes, and this is its main limitation. HOMA-IR is built from fasting values, so it reflects mainly hepatic insulin resistance. Muscle and fat tissue can be resistant while fasting glucose and insulin still look unremarkable — that shows up after a meal, not in the fasted state. This is why HOMA-IR is read alongside the triglyceride-HDL ratio, HbA1c and waist circumference rather than on its own.",
  },
  {
    q: "Why measure insulin resistance if my fasting glucose is normal?",
    a: "Fasting glucose stays normal long after insulin resistance starts. The pancreas compensates by secreting more insulin to keep glucose in range — so fasting glucose looks fine while insulin is silently climbing. HOMA-IR catches that compensatory phase years before HbA1c rises, which is why endocrinologists increasingly request fasting insulin alongside glucose.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "HOMA-IR Calculator (Free, Fasting Glucose + Insulin)",
  description:
    "Free HOMA-IR insulin resistance calculator. Enter fasting glucose and fasting insulin in mg/dL or mmol/L — get your score, the formula, and the interpretation bands. Catches insulin resistance years before HbA1c.",
  alternates: { canonical: "https://merios.life/tools/homa-ir-calculator" },
  openGraph: {
    title: "HOMA-IR Calculator — Free Insulin Resistance Score",
    description:
      "Fasting glucose and insulin in, HOMA-IR out — in mg/dL or mmol/L. Free, no signup.",
    url: "https://merios.life/tools/homa-ir-calculator",
    type: "website",
  },
};

export default function HomaIRCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/homa-ir-calculator#tool",
    name: "HOMA-IR Calculator",
    url: "https://merios.life/tools/homa-ir-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free HOMA-IR insulin resistance calculator. Matthews et al. 1985 formula, accepting fasting glucose in mg/dL or mmol/L.",
    isAccessibleForFree: true,
    citation:
      "Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment. Diabetologia 1985;28(7):412-419.",
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "HOMA-IR Calculator", url: "https://merios.life/tools/homa-ir-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />

      <PageHero
        eyebrow="HOMA-IR — Matthews 1985"
        title="HOMA-IR calculator"
        subline="Catch insulin resistance before it shows up in HbA1c. The Matthews 1985 formula on two numbers from your panel — fasting glucose and fasting insulin, in mg/dL or mmol/L — with the score and its interpretation band."
        align="left"
      />

      <main
        className="pb-20 pt-2"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <HomaIRCalculator />

          <section
            className="mt-14 max-w-[720px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.625rem, 2.4vw, 2rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              What your HOMA-IR score means
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              There is no single universal cutoff, and it is worth being blunt
              about how wide the disagreement is. In the EPIRCE general-population
              study, the threshold moved from 3.46 on a 90th-percentile criterion
              to 2.05 once metabolic-syndrome components were taken into account —
              with every derived cutoff landing between the 70th and 75th
              percentiles of that population. The bands below are the ones most
              widely used in practice, and they are what this calculator reports.
              Read your score as a trend across several draws, not a one-off
              verdict.
            </p>
            <div
              style={{
                border: "1px solid var(--color-grid)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {[
                {
                  dot: "var(--color-pulse)",
                  range: "Below 1.0",
                  label: "Optimal",
                  note: "High insulin sensitivity. Common in lean, active, metabolically healthy people — athletes often score below 0.8.",
                },
                {
                  dot: "var(--color-green-deep)",
                  range: "1.0 – 1.9",
                  label: "Normal",
                  note: "The typical healthy band. Hold it here with sleep, fiber, weight, and resistance training.",
                },
                {
                  dot: "var(--color-warm)",
                  range: "2.0 – 2.5",
                  label: "Borderline",
                  note: "The compensatory phase — insulin is climbing while fasting glucose still looks fine. The most reversible stage, and the one where the lab's own reference range will usually still call you normal.",
                },
                {
                  dot: "#B4472F",
                  range: "Above 2.5",
                  label: "Insulin resistance",
                  note: "Associated with markedly higher type-2 diabetes and metabolic-syndrome risk in cohort studies. Worth discussing with your doctor and acting on now.",
                },
              ].map((b, i) => (
                <div
                  key={b.range}
                  className="flex gap-4 px-5 py-4"
                  style={{
                    borderTop:
                      i === 0 ? undefined : "1px solid var(--color-grid)",
                  }}
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: b.dot }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        color: "var(--color-ink)",
                      }}
                    >
                      {b.range} — {b.label}
                    </div>
                    <div
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: "var(--color-ink-secondary)",
                        marginTop: 2,
                      }}
                    >
                      {b.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
              How HOMA-IR is calculated
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
                marginTop: "1rem",
              }}
            >
              The model has one equation and two constants, and which constant you
              use depends only on the unit your lab printed for glucose. Insulin is
              in µIU/mL in both cases (numerically the same as mIU/L).
            </p>
            <div
              className="mt-5 rounded-xl px-5 py-4"
              style={{
                border: "1px solid var(--color-grid)",
                background: "var(--color-canvas-alt, #ffffff)",
                fontFamily: "var(--font-mono)",
                fontSize: 13.5,
                lineHeight: 1.9,
                color: "var(--color-ink)",
                overflowX: "auto",
              }}
            >
              HOMA-IR = (fasting insulin [µIU/mL] × fasting glucose [mg/dL]) ÷ 405
              <br />
              HOMA-IR = (fasting insulin [µIU/mL] × fasting glucose [mmol/L]) ÷ 22.5
            </div>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
                marginTop: "1rem",
              }}
            >
              The denominators are not arbitrary: each represents the product of
              normal fasting glucose and normal fasting insulin in that unit
              system, so a perfectly insulin-sensitive person lands near 1.0. The
              two forms are the same model — 405 and 22.5 differ only by the
              18.0 mg/dL-per-mmol/L glucose conversion. The calculator above
              applies whichever matches the toggle you select.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
                marginTop: "1rem",
              }}
            >
              A worked example. Fasting glucose 95 mg/dL, fasting insulin
              8 µIU/mL: 8 × 95 = 760, and 760 ÷ 405 = 1.88. That falls in the
              normal band but above the optimal one — insulin is doing more work
              than it needs to while glucose still reads as unremarkable.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
                marginTop: "1rem",
              }}
            >
              Both values must come from the same draw, fasted at least 8 hours,
              water only. A non-fasted insulin will inflate the score enough to
              make it meaningless.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
                marginTop: "1rem",
              }}
            >
              One caveat the literature is clear about: the score&rsquo;s accuracy is
              not constant across people. In EPIRCE, the cutoff that best
              identified metabolic syndrome was 1.85 in non-diabetic men and 2.07
              in non-diabetic women at age 50, and its discriminating power in
              women fell steadily with age — an area under the curve of 0.82 at
              age 30 against 0.58 at age 70. HOMA-IR is a screening signal to act
              on and re-measure, not a diagnosis.
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
              Why this is the first metabolic marker that drifts
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
              }}
            >
              Fasting glucose is a lagging indicator. By the time it rises above
              100 mg/dL, the pancreas has been over-secreting insulin for years.
              HOMA-IR catches that compensatory phase early — when the trajectory
              can still be reversed with sleep, weight, fiber, and resistance
              training, with no medication. It is the cheapest, most underrated
              early-warning system in a routine blood panel.
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
              Reference: Matthews DR, Hosker JP, Rudenski AS, Naylor BA,
              Treacher DF, Turner RC. <em>Homeostasis model assessment: insulin
              resistance and beta-cell function from fasting plasma glucose and
              insulin concentrations in man.</em> Diabetologia 1985;28(7):412-419.
              <br />
              Cutoffs: Gayoso-Diz P, Otero-Gonz&aacute;lez A, Rodriguez-Alvarez MX, et
              al. <em>Insulin resistance (HOMA-IR) cut-off values and the metabolic
              syndrome in a general adult population: effect of gender and age:
              EPIRCE cross-sectional study.</em> BMC Endocrine Disorders
              2013;13:47.
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
                A single HOMA-IR is a snapshot. Twelve are a story.
              </p>
              <p
                className="mt-3"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Merios recalculates HOMA-IR every time you upload a blood panel and overlays the curve with sleep, weight, and check-ins — so you can see what's actually moving the needle.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <Link
                  href="/early-access"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-all hover:-translate-y-0.5"
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
                  className="inline-flex items-center gap-2 px-3 py-3 text-[14px] font-medium"
                  style={{
                    color: "var(--color-ink-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Read the primer →
                </Link>
              </div>
            </div>

            <div className="mt-10">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  marginBottom: "0.75rem",
                }}
              >
                Read next
              </p>
              <ul
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.8,
                  color: "var(--color-ink-secondary)",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                <li>
                  <Link href="/tools/tyg-index-calculator" style={{ textDecoration: "underline" }}>
                    TyG index calculator
                  </Link>{" "}
                  — no fasting insulin on your report? This estimates insulin
                  resistance from triglycerides and glucose alone.
                </li>
                <li>
                  <Link href="/blog/fasting-insulin-levels-chart" style={{ textDecoration: "underline" }}>
                    Fasting insulin levels chart
                  </Link>{" "}
                  — what the insulin value on its own is telling you.
                </li>
                <li>
                  <Link href="/tools/triglyceride-hdl-ratio" style={{ textDecoration: "underline" }}>
                    Triglyceride-HDL ratio calculator
                  </Link>{" "}
                  — the marker most worth reading alongside HOMA-IR.
                </li>
                <li>
                  <Link href="/tools/a1c-calculator" style={{ textDecoration: "underline" }}>
                    A1C to average glucose calculator
                  </Link>{" "}
                  — the three-month view that HOMA-IR precedes by years.
                </li>
                <li>
                  <Link href="/blog/fasting-glucose-100-borderline" style={{ textDecoration: "underline" }}>
                    Fasting glucose 100 mg/dL
                  </Link>{" "}
                  — why a borderline glucose is worth a HOMA-IR.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
