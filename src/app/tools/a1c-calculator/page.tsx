import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import A1CConverter from "@/components/calculators/A1CConverter";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";

const FAQ_ITEMS = [
  {
    q: "How do you convert A1C to average blood sugar?",
    a: "The ADAG study formula is: estimated average glucose (eAG) in mg/dL = 28.7 × A1C − 46.7. To get mmol/L, divide the mg/dL result by 18. For example, an A1C of 5.7% works out to about 117 mg/dL (6.5 mmol/L).",
  },
  {
    q: "What is estimated average glucose (eAG)?",
    a: "eAG translates your A1C percentage into the same mg/dL (or mmol/L) units your glucose meter uses. It represents your average blood sugar over the previous 2–3 months — the lifespan of a red blood cell — so it smooths out the day-to-day spikes a single fasting reading can't capture.",
  },
  {
    q: "What blood sugar is an A1C of 5.7, 6.0, or 6.5?",
    a: "Using the ADAG formula: 5.7% ≈ 117 mg/dL (6.5 mmol/L), the start of the prediabetes range; 6.0% ≈ 126 mg/dL (7.0 mmol/L); 6.5% ≈ 140 mg/dL (7.8 mmol/L), the diabetes threshold. The calculator above gives the exact number for any A1C you enter.",
  },
  {
    q: "Why doesn't my eAG match my fasting glucose?",
    a: "eAG is a 2–3 month average across all hours of the day, while a fasting reading is a single morning snapshot. eAG includes post-meal peaks, so it is usually higher than fasting glucose. A large gap between the two can also point to unusual red-blood-cell turnover (anemia, recent blood loss), which affects A1C independently of glucose.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "A1C to Average Blood Sugar Calculator (eAG Chart) | Merios",
  description:
    "Free A1C to average blood sugar converter. Enter your A1C — get estimated average glucose (eAG) in mg/dL and mmol/L, plus the full conversion chart. ADAG formula.",
  alternates: { canonical: "https://merios.life/tools/a1c-calculator" },
  openGraph: {
    title: "A1C → Average Blood Sugar Calculator (eAG)",
    description:
      "Convert A1C to estimated average glucose in mg/dL and mmol/L. Free, no signup. ADAG 2008 formula.",
    url: "https://merios.life/tools/a1c-calculator",
    type: "website",
  },
};

export default function A1CCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/a1c-calculator#tool",
    name: "A1C to Average Blood Sugar Calculator",
    url: "https://merios.life/tools/a1c-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free A1C to estimated average glucose (eAG) converter. ADAG study formula, mg/dL and mmol/L.",
    isAccessibleForFree: true,
    citation:
      "Nathan DM, Kuenen J, Borg R, et al. Translating the A1C assay into estimated average glucose values. Diabetes Care 2008;31(8):1473-1478.",
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "A1C Calculator", url: "https://merios.life/tools/a1c-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />

      <PageHero
        eyebrow="A1C → eAG — ADAG 2008"
        title="Turn your A1C into an average blood sugar you can actually read."
        subline="Enter one number — your A1C percentage — and get your estimated average glucose in both mg/dL and mmol/L, using the ADAG study formula clinicians use."
        align="left"
      />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <A1CConverter />

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
              A1C to average blood sugar chart
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              Every A1C percentage maps to an estimated average glucose (eAG). The
              calculator above is exact for any value you type; the chart below
              covers the common reference points, from optimal through the
              diabetes range.
            </p>
            <div
              style={{
                border: "1px solid var(--color-grid)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {[
                { a1c: "5.0%", mgdl: "97 mg/dL", mmol: "5.4 mmol/L", band: "Optimal", dot: "var(--color-pulse)" },
                { a1c: "5.7%", mgdl: "117 mg/dL", mmol: "6.5 mmol/L", band: "Prediabetes starts", dot: "var(--color-green-deep)" },
                { a1c: "6.0%", mgdl: "126 mg/dL", mmol: "7.0 mmol/L", band: "Prediabetes", dot: "var(--color-warm)" },
                { a1c: "6.5%", mgdl: "140 mg/dL", mmol: "7.8 mmol/L", band: "Diabetes threshold", dot: "#B4472F" },
                { a1c: "7.0%", mgdl: "154 mg/dL", mmol: "8.6 mmol/L", band: "Common treatment target", dot: "#B4472F" },
                { a1c: "8.0%", mgdl: "183 mg/dL", mmol: "10.2 mmol/L", band: "Above target", dot: "#B4472F" },
              ].map((r, i) => (
                <div
                  key={r.a1c}
                  className="flex gap-4 px-5 py-4"
                  style={{ borderTop: i === 0 ? undefined : "1px solid var(--color-grid)" }}
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: r.dot }}
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
                      A1C {r.a1c} — {r.mgdl} ({r.mmol})
                    </div>
                    <div
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.6,
                        color: "var(--color-ink-secondary)",
                        marginTop: 2,
                      }}
                    >
                      {r.band}
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
              Why A1C and average glucose tell different stories
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-ink-secondary)",
              }}
            >
              A1C measures the fraction of your hemoglobin that has sugar attached
              to it, which reflects your average glucose over the 2–3 month
              lifespan of a red blood cell. A fasting glucose reading, by contrast,
              is a single morning snapshot. eAG bridges the two: it restates A1C in
              the mg/dL units your meter shows, so a lab result and a home reading
              finally speak the same language. When the two diverge sharply, it is
              worth looking at red-blood-cell turnover — anemia and recent blood
              loss can move A1C on their own.
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
              Reference: Nathan DM, Kuenen J, Borg R, Zheng H, Schoenfeld D,
              Heine RJ. <em>Translating the A1C assay into estimated average
              glucose values.</em> Diabetes Care 2008;31(8):1473-1478.
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
                One A1C is a number. A trend line is a warning — or an all-clear.
              </p>
              <p
                className="mt-3"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Merios converts every A1C you upload to eAG automatically and plots
                it against your fasting glucose, weight, and sleep — so you can see
                whether the line is bending the right way.
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
                href="/blog/a1c-to-blood-sugar-chart"
                className="mt-5 ml-3 inline-flex items-center gap-2 px-3 py-3 text-[14px] font-medium"
                style={{
                  color: "var(--color-ink-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Read the full chart →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
