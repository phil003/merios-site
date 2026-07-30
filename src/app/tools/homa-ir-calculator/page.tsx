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
    a: "Generally accepted cutoffs (population-dependent): below 1.0 — optimal insulin sensitivity. 1.0-2.0 — normal. 2.0-2.9 — early insulin resistance. 3.0 and above — significant insulin resistance, strong predictor of type-2 diabetes risk. Athletes and very lean metabolically healthy individuals often score below 0.8.",
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
  title: "HOMA-IR Calculator (Free, Fasting Glucose + Insulin) | Merios",
  description:
    "Free HOMA-IR insulin resistance calculator. Enter fasting glucose and fasting insulin — get your score with interpretation band. Catches insulin resistance years before HbA1c.",
  alternates: { canonical: "https://merios.life/tools/homa-ir-calculator" },
  openGraph: {
    title: "HOMA-IR Calculator — Free Insulin Resistance Score",
    description:
      "Catches insulin resistance years before HbA1c. Free, no signup.",
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
      "Free HOMA-IR insulin resistance calculator. Matthews et al. 1985 formula.",
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
        title="Catch insulin resistance before it shows up in HbA1c."
        subline="The Matthews 1985 HOMA-IR formula in a free, interactive calculator. Two numbers in — fasting glucose, fasting insulin — and a clean score with interpretation band out."
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
              There is no single universal cutoff — labs and populations differ —
              but these are the interpretation bands most widely used in research
              and clinical practice. Read your score as a trend over time, not a
              one-off verdict.
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
                  range: "1.0 – 2.0",
                  label: "Normal",
                  note: "The typical healthy band. Hold it here with sleep, fiber, weight, and resistance training.",
                },
                {
                  dot: "var(--color-warm)",
                  range: "2.0 – 2.9",
                  label: "Early insulin resistance",
                  note: "The compensatory phase — insulin is climbing while fasting glucose still looks fine. The most reversible stage.",
                },
                {
                  dot: "#B4472F",
                  range: "3.0 and above",
                  label: "Significant insulin resistance",
                  note: "A strong predictor of type-2 diabetes risk. Worth discussing with your doctor and acting on now.",
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
