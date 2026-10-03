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
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

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

      <main className={t.main}>
        <div className={t.wrap}>
          <A1CConverter />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>
                A1C to average blood sugar chart
              </h2>
              <p>
                Every A1C percentage maps to an estimated average glucose (eAG). The
                calculator above is exact for any value you type; the chart below
                covers the common reference points, from optimal through the
                diabetes range.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={t.caption}>
                    A1C to estimated average glucose (eAG), from 4.0% to 14.0%
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>A1C</th>
                      <th scope="col" className={t.colHead}>eAG (mg/dL)</th>
                      <th scope="col" className={t.colHead}>eAG (mmol/L)</th>
                      <th scope="col" className={t.colHead}>Band</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr key="4.0" data-tone="ok"><th scope="row" className={t.rowHead}>4.0%</th><td className={t.cell}>68 mg/dL</td><td className={t.cell}>3.8 mmol/L</td><td className={t.cellNote}>Low end of normal</td></tr>
                      <tr key="4.5" data-tone="ok"><th scope="row" className={t.rowHead}>4.5%</th><td className={t.cell}>82 mg/dL</td><td className={t.cell}>4.6 mmol/L</td><td className={t.cellNote}>Normal</td></tr>
                      <tr key="5.0" data-tone="ok"><th scope="row" className={t.rowHead}>5.0%</th><td className={t.cell}>97 mg/dL</td><td className={t.cell}>5.4 mmol/L</td><td className={t.cellNote}>Optimal</td></tr>
                      <tr key="5.5" data-tone="ok"><th scope="row" className={t.rowHead}>5.5%</th><td className={t.cell}>111 mg/dL</td><td className={t.cell}>6.2 mmol/L</td><td className={t.cellNote}>Normal</td></tr>
                      <tr key="5.7" data-tone="warn"><th scope="row" className={t.rowHead}>5.7%</th><td className={t.cell}>117 mg/dL</td><td className={t.cell}>6.5 mmol/L</td><td className={t.cellNote}>Prediabetes starts</td></tr>
                      <tr key="6.0" data-tone="warn"><th scope="row" className={t.rowHead}>6.0%</th><td className={t.cell}>126 mg/dL</td><td className={t.cell}>7.0 mmol/L</td><td className={t.cellNote}>Prediabetes</td></tr>
                      <tr key="6.4" data-tone="warn"><th scope="row" className={t.rowHead}>6.4%</th><td className={t.cell}>137 mg/dL</td><td className={t.cell}>7.6 mmol/L</td><td className={t.cellNote}>Top of prediabetes</td></tr>
                      <tr key="6.5" data-tone="bad"><th scope="row" className={t.rowHead}>6.5%</th><td className={t.cell}>140 mg/dL</td><td className={t.cell}>7.8 mmol/L</td><td className={t.cellNote}>Diabetes threshold</td></tr>
                      <tr key="7.0" data-tone="bad"><th scope="row" className={t.rowHead}>7.0%</th><td className={t.cell}>154 mg/dL</td><td className={t.cell}>8.6 mmol/L</td><td className={t.cellNote}>Common treatment target</td></tr>
                      <tr key="7.5" data-tone="bad"><th scope="row" className={t.rowHead}>7.5%</th><td className={t.cell}>169 mg/dL</td><td className={t.cell}>9.4 mmol/L</td><td className={t.cellNote}>Above target</td></tr>
                      <tr key="8.0" data-tone="bad"><th scope="row" className={t.rowHead}>8.0%</th><td className={t.cell}>183 mg/dL</td><td className={t.cell}>10.2 mmol/L</td><td className={t.cellNote}>Above target</td></tr>
                      <tr key="8.5" data-tone="bad"><th scope="row" className={t.rowHead}>8.5%</th><td className={t.cell}>197 mg/dL</td><td className={t.cell}>11.0 mmol/L</td><td className={t.cellNote}>Above target</td></tr>
                      <tr key="9.0" data-tone="bad"><th scope="row" className={t.rowHead}>9.0%</th><td className={t.cell}>212 mg/dL</td><td className={t.cell}>11.8 mmol/L</td><td className={t.cellNote}>Well above target</td></tr>
                      <tr key="9.5" data-tone="bad"><th scope="row" className={t.rowHead}>9.5%</th><td className={t.cell}>226 mg/dL</td><td className={t.cell}>12.6 mmol/L</td><td className={t.cellNote}>Well above target</td></tr>
                      <tr key="10.0" data-tone="bad"><th scope="row" className={t.rowHead}>10.0%</th><td className={t.cell}>240 mg/dL</td><td className={t.cell}>13.4 mmol/L</td><td className={t.cellNote}>Well above target</td></tr>
                      <tr key="11.0" data-tone="bad"><th scope="row" className={t.rowHead}>11.0%</th><td className={t.cell}>269 mg/dL</td><td className={t.cell}>14.9 mmol/L</td><td className={t.cellNote}>Very high</td></tr>
                      <tr key="12.0" data-tone="bad"><th scope="row" className={t.rowHead}>12.0%</th><td className={t.cell}>298 mg/dL</td><td className={t.cell}>16.5 mmol/L</td><td className={t.cellNote}>Very high</td></tr>
                      <tr key="13.0" data-tone="bad"><th scope="row" className={t.rowHead}>13.0%</th><td className={t.cell}>326 mg/dL</td><td className={t.cell}>18.1 mmol/L</td><td className={t.cellNote}>Very high</td></tr>
                      <tr key="14.0" data-tone="bad"><th scope="row" className={t.rowHead}>14.0%</th><td className={t.cell}>355 mg/dL</td><td className={t.cell}>19.7 mmol/L</td><td className={t.cellNote}>Very high</td></tr>
                  </tbody>
                </table>
              </div>

              <h2>
                Why A1C and average glucose tell different stories
              </h2>
              <p>
                A1C measures the fraction of your hemoglobin that has sugar attached
                to it, which reflects your average glucose over the 2–3 month
                lifespan of a red blood cell. A fasting glucose reading, by contrast,
                is a single morning snapshot. eAG bridges the two: it restates A1C in
                the mg/dL units your meter shows, so a lab result and a home reading
                finally speak the same language. When the two diverge sharply, it is
                worth looking at red-blood-cell turnover — anemia and recent blood
                loss can move A1C on their own.
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
                Reference: Nathan DM, Kuenen J, Borg R, Zheng H, Schoenfeld D,
                Heine RJ. <em>Translating the A1C assay into estimated average
                glucose values.</em> Diabetes Care 2008;31(8):1473-1478.
              </p>
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={`chrome-text ${t.ctaQuote}`}>
                  One A1C is a number. A trend line is a warning — or an all-clear.
                </p>
                <p className={t.ctaText}>
                  Merios converts every A1C you upload to eAG automatically and plots
                  it against your fasting glucose, weight, and sleep — so you can see
                  whether the line is bending the right way.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/hba1c-5-7-pre-diabetic" className="btn btn-ghost-night">
                  What an A1C of 5.7% means →
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
