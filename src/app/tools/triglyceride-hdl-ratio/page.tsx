import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import TrigHdlRatioCalculator from "@/components/calculators/TrigHdlRatioCalculator";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";

const FAQ_ITEMS = [
  {
    q: "What does the triglyceride / HDL ratio tell me?",
    a: "It's one of the strongest single-number predictors of insulin resistance and atherogenic dyslipidemia — the small-dense-LDL pattern that drives heart disease. A high ratio suggests your lipoprotein profile is shifted toward more atherogenic particles, even when LDL cholesterol looks normal.",
  },
  {
    q: "What's a healthy ratio?",
    a: "Below 1.5 — optimal (commonly seen in metabolically healthy lean individuals). 1.5 to 2.0 — good. 2.0 to 3.5 — elevated risk, often the first signal of insulin resistance. Above 3.5 — atherogenic dyslipidemia, strong correlate of cardiovascular risk and metabolic syndrome.",
  },
  {
    q: "Why is this often more useful than LDL alone?",
    a: "LDL-C measures cholesterol mass, not particle count. Two people with the same LDL can have very different numbers of LDL particles. A high trig/HDL ratio strongly correlates with high LDL particle count (LDL-P) and small-dense LDL — the most atherogenic subtype. So when ApoB or LDL-P isn't on your panel, trig/HDL is the best proxy.",
  },
  {
    q: "What units does the calculator expect?",
    a: "US units — both triglycerides and HDL in mg/dL. If your lab reports in mmol/L (most of Europe and Canada), multiply triglycerides by 88.57 and HDL by 38.67 to convert to mg/dL before entering. We don't auto-convert because the ratio depends on using the same units for both inputs.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device.",
  },
];

export const metadata: Metadata = {
  title: "Triglyceride / HDL Ratio Calculator (Free) | Merios",
  description:
    "Free triglyceride/HDL ratio calculator. One of the strongest single-number predictors of insulin resistance and small-dense LDL pattern. No signup.",
  alternates: { canonical: "https://merios.life/tools/triglyceride-hdl-ratio" },
  openGraph: {
    title: "Triglyceride / HDL Ratio Calculator — Free",
    description:
      "Best single-number predictor of insulin resistance and atherogenic dyslipidemia.",
    url: "https://merios.life/tools/triglyceride-hdl-ratio",
    type: "website",
  },
};

export default function TrigHdlRatioPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/triglyceride-hdl-ratio#tool",
    name: "Triglyceride / HDL Ratio Calculator",
    url: "https://merios.life/tools/triglyceride-hdl-ratio",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free triglyceride / HDL ratio calculator. Strong proxy for insulin resistance and small-dense LDL pattern.",
    isAccessibleForFree: true,
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          {
            name: "Triglyceride / HDL Ratio",
            url: "https://merios.life/tools/triglyceride-hdl-ratio",
          },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />

      <PageHero
        eyebrow="Triglyceride / HDL — Atherogenic Index"
        title="Two numbers. One of the best heart-risk signals on a lipid panel."
        subline="A high triglyceride / HDL ratio is one of the earliest signs of insulin resistance and the small-dense-LDL pattern. Cheap, fast, often more revealing than LDL alone."
        align="left"
      />

      <main
        className="pb-20 pt-2"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <TrigHdlRatioCalculator />

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
              Why the ratio beats either number alone
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
              }}
            >
              Triglycerides reflect short-term carbohydrate handling and liver
              fat. HDL reflects long-term metabolic resilience. The ratio
              captures both at once — and tracks tightly with LDL particle count
              and the small-dense-LDL phenotype. When trig/HDL drifts up, the
              fix is rarely a statin: it's sleep, fiber, weight, and resistance
              training. Use the ratio as a monthly compass.
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
                Watch the curve, not the snapshot.
              </p>
              <p
                className="mt-3"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Merios recalculates trig/HDL ratio with every lipid panel and tracks the trend over time alongside ApoB, LDL, HDL, and HOMA-IR.
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
                Join waitlist
              </Link>
              <Link
                href="/blog/triglyceride-hdl-ratio-calculator"
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
