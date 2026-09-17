import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import A1CConverter from "@/components/calculators/A1CConverter";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";

const CELL: React.CSSProperties = {
  padding: "0.6rem 1.1rem",
  borderTop: "1px solid var(--color-grid)",
  fontFamily: "var(--font-mono)",
  fontSize: 13.5,
  color: "var(--color-ink)",
  whiteSpace: "nowrap",
};
const CELL_H: React.CSSProperties = { ...CELL, fontWeight: 600, textAlign: "left" };
const CELL_N: React.CSSProperties = { ...CELL, fontFamily: "var(--font-sans)", color: "var(--color-ink-secondary)", whiteSpace: "normal" };

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
    q: "How do you convert blood glucose back to A1C?",
    a: "Rearrange the same ADAG equation: A1C = (average glucose in mg/dL + 46.7) ÷ 28.7. An average of 154 mg/dL comes back to about 7.0%. Switch the converter above to 'Glucose to A1C' and it does it for you, in mg/dL or mmol/L. One caveat: this works on a true average across the whole day, not on a single fasting reading, which runs lower than the average and will understate the A1C.",
  },
  {
    q: "Is this the same as the ADA A1C calculator?",
    a: "It uses the same equation. The American Diabetes Association's converter is built on the ADAG study (Nathan et al., 2008), the same regression used here, so the numbers match. The difference is that this page also prints the full chart and runs the conversion in reverse.",
  },
  {
    q: "What A1C range does the chart cover?",
    a: "From 4.0% to 14.0%, which spans the low end of normal through poorly controlled diabetes. Below 4% and above 14% the ADAG regression becomes extrapolation rather than conversion, so the converter declines to give a number there rather than inventing one.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "A1C to Average Glucose Chart (eAG Calculator)",
  description:
    "Full A1C to average glucose chart, 4.0% to 14.0%, in mg/dL and mmol/L — and it converts both ways, glucose back to A1C included. ADAG formula, free.",
  alternates: { canonical: "https://merios.life/tools/a1c-calculator" },
  openGraph: {
    title: "A1C to Average Glucose Chart & Converter (eAG)",
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
            <div style={{ border: "1px solid var(--color-grid)", borderRadius: "12px", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14.5 }}>
                <caption style={{ captionSide: "top", textAlign: "left", padding: "0.85rem 1.1rem 0.35rem", fontSize: 13.5, color: "var(--color-ink-tertiary)" }}>
                  A1C to estimated average glucose (eAG), from 4.0% to 14.0%
                </caption>
                <thead>
                  <tr>
                    <th scope="col" style={CELL_H}>A1C</th>
                    <th scope="col" style={CELL_H}>eAG (mg/dL)</th>
                    <th scope="col" style={CELL_H}>eAG (mmol/L)</th>
                    <th scope="col" style={CELL_H}>Band</th>
                  </tr>
                </thead>
                <tbody>
                    <tr key="4.0"><th scope="row" style={CELL_H}>4.0%</th><td style={CELL}>68 mg/dL</td><td style={CELL}>3.8 mmol/L</td><td style={CELL_N}>Low end of normal</td></tr>
                    <tr key="4.5"><th scope="row" style={CELL_H}>4.5%</th><td style={CELL}>82 mg/dL</td><td style={CELL}>4.6 mmol/L</td><td style={CELL_N}>Normal</td></tr>
                    <tr key="5.0"><th scope="row" style={CELL_H}>5.0%</th><td style={CELL}>97 mg/dL</td><td style={CELL}>5.4 mmol/L</td><td style={CELL_N}>Optimal</td></tr>
                    <tr key="5.5"><th scope="row" style={CELL_H}>5.5%</th><td style={CELL}>111 mg/dL</td><td style={CELL}>6.2 mmol/L</td><td style={CELL_N}>Normal</td></tr>
                    <tr key="5.7"><th scope="row" style={CELL_H}>5.7%</th><td style={CELL}>117 mg/dL</td><td style={CELL}>6.5 mmol/L</td><td style={CELL_N}>Prediabetes starts</td></tr>
                    <tr key="6.0"><th scope="row" style={CELL_H}>6.0%</th><td style={CELL}>126 mg/dL</td><td style={CELL}>7.0 mmol/L</td><td style={CELL_N}>Prediabetes</td></tr>
                    <tr key="6.4"><th scope="row" style={CELL_H}>6.4%</th><td style={CELL}>137 mg/dL</td><td style={CELL}>7.6 mmol/L</td><td style={CELL_N}>Top of prediabetes</td></tr>
                    <tr key="6.5"><th scope="row" style={CELL_H}>6.5%</th><td style={CELL}>140 mg/dL</td><td style={CELL}>7.8 mmol/L</td><td style={CELL_N}>Diabetes threshold</td></tr>
                    <tr key="7.0"><th scope="row" style={CELL_H}>7.0%</th><td style={CELL}>154 mg/dL</td><td style={CELL}>8.6 mmol/L</td><td style={CELL_N}>Common treatment target</td></tr>
                    <tr key="7.5"><th scope="row" style={CELL_H}>7.5%</th><td style={CELL}>169 mg/dL</td><td style={CELL}>9.4 mmol/L</td><td style={CELL_N}>Above target</td></tr>
                    <tr key="8.0"><th scope="row" style={CELL_H}>8.0%</th><td style={CELL}>183 mg/dL</td><td style={CELL}>10.2 mmol/L</td><td style={CELL_N}>Above target</td></tr>
                    <tr key="8.5"><th scope="row" style={CELL_H}>8.5%</th><td style={CELL}>197 mg/dL</td><td style={CELL}>11.0 mmol/L</td><td style={CELL_N}>Above target</td></tr>
                    <tr key="9.0"><th scope="row" style={CELL_H}>9.0%</th><td style={CELL}>212 mg/dL</td><td style={CELL}>11.8 mmol/L</td><td style={CELL_N}>Well above target</td></tr>
                    <tr key="9.5"><th scope="row" style={CELL_H}>9.5%</th><td style={CELL}>226 mg/dL</td><td style={CELL}>12.6 mmol/L</td><td style={CELL_N}>Well above target</td></tr>
                    <tr key="10.0"><th scope="row" style={CELL_H}>10.0%</th><td style={CELL}>240 mg/dL</td><td style={CELL}>13.4 mmol/L</td><td style={CELL_N}>Well above target</td></tr>
                    <tr key="11.0"><th scope="row" style={CELL_H}>11.0%</th><td style={CELL}>269 mg/dL</td><td style={CELL}>14.9 mmol/L</td><td style={CELL_N}>Very high</td></tr>
                    <tr key="12.0"><th scope="row" style={CELL_H}>12.0%</th><td style={CELL}>298 mg/dL</td><td style={CELL}>16.5 mmol/L</td><td style={CELL_N}>Very high</td></tr>
                    <tr key="13.0"><th scope="row" style={CELL_H}>13.0%</th><td style={CELL}>326 mg/dL</td><td style={CELL}>18.1 mmol/L</td><td style={CELL_N}>Very high</td></tr>
                    <tr key="14.0"><th scope="row" style={CELL_H}>14.0%</th><td style={CELL}>355 mg/dL</td><td style={CELL}>19.7 mmol/L</td><td style={CELL_N}>Very high</td></tr>
                </tbody>
              </table>
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
                href="/blog/hba1c-5-7-pre-diabetic"
                className="mt-5 ml-3 inline-flex items-center gap-2 px-3 py-3 text-[14px] font-medium"
                style={{
                  color: "var(--color-ink-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                What an A1C of 5.7% means →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
