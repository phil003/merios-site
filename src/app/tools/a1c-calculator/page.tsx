import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import A1CConverter from "@/components/calculators/A1CConverter";
import {
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const FAQ_ITEMS = [
  {
    q: "How do you calculate A1C from average glucose?",
    a: "Use the ADAG study equation: A1C (%) = (average glucose in mg/dL + 46.7) ÷ 28.7. If your average is in mmol/L, multiply by 18 first. An average of 154 mg/dL gives (154 + 46.7) ÷ 28.7 = 7.0%. This only works with a true multi-week average, such as a CGM average, not a single fasting reading.",
  },
  {
    q: "How do you convert A1C to average blood sugar (eAG)?",
    a: "Estimated average glucose (eAG) in mg/dL = 28.7 × A1C − 46.7. To get mmol/L, divide the mg/dL result by 18. For example, an A1C of 7.0% gives 28.7 × 7.0 − 46.7 = 154 mg/dL, or about 8.6 mmol/L.",
  },
  {
    q: "What average glucose is an A1C of 5.7?",
    a: "About 117 mg/dL (6.5 mmol/L). That is the lower edge of the ADA prediabetes range (5.7% to 6.4%). An A1C of 6.0% works out to about 126 mg/dL (7.0 mmol/L) and 6.5% to about 140 mg/dL (7.8 mmol/L).",
  },
  {
    q: "Why doesn't my eAG match my fasting glucose or my meter?",
    a: "eAG is an estimate of your average over roughly the last 2 to 3 months, across all hours of the day, including post-meal peaks. A fasting reading is a single morning snapshot, so it is usually lower. A large gap can also come from conditions that change A1C independently of glucose, such as anemia, recent blood loss or transfusion, hemoglobin variants, pregnancy or kidney disease.",
  },
  {
    q: "What is the difference between A1C in % and in mmol/mol?",
    a: "They are the same measurement in two unit systems. NGSP reports A1C as a percentage (used in the US), IFCC as mmol/mol (used in many other countries). The conversion is mmol/mol = (A1C % − 2.15) × 10.929, so 6.5% is about 48 mmol/mol and 5.7% is about 39 mmol/mol.",
  },
  {
    q: "Is this the same as the ADA A1C calculator?",
    a: "It uses the same equation. The ADA's eAG converter is built on the ADAG study (Nathan et al., Diabetes Care 2008). This page also runs the conversion in reverse and shows the IFCC value. Results are an educational estimate, not a diagnosis.",
  },
];

export const metadata: Metadata = {
  title: "A1C Calculator: A1C to Average Glucose Chart (eAG)",
  description:
    "Free A1C calculator: convert A1C to average glucose (eAG) in mg/dL and mmol/L, or average glucose to estimated A1C. Includes an A1C chart from 5% to 12%.",
  alternates: { canonical: "https://merios.life/tools/a1c-calculator" },
  openGraph: {
    title: "A1C Calculator: A1C to Average Glucose Chart (eAG)",
    description:
      "Free A1C calculator: A1C to average glucose in mg/dL and mmol/L, and average glucose to A1C. No signup. ADAG formula.",
    url: "https://merios.life/tools/a1c-calculator",
    type: "website",
  },
};

export default function A1CCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/a1c-calculator#tool",
    name: "A1C Calculator",
    alternateName: ["Hemoglobin A1C Calculator", "A1C to Average Glucose Calculator", "eAG Calculator", "Glucose to A1C Calculator"],
    url: "https://merios.life/tools/a1c-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free A1C calculator: A1C to estimated average glucose (eAG) and average glucose to estimated A1C, with IFCC mmol/mol. ADAG study formula, mg/dL and mmol/L.",
    isAccessibleForFree: true,
    citation:
      "Nathan DM, Kuenen J, Borg R, et al. Translating the A1C assay into estimated average glucose values. Diabetes Care 2008;31(8):1473-1478.",
    inLanguage: "en",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
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
        eyebrow="A1C ↔ average glucose — ADAG 2008"
        title="A1C calculator"
        subline="Convert A1C to estimated average glucose (eAG) in mg/dL and mmol/L, or enter an average glucose and get the estimated A1C. Both directions use the ADAG study formula."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <A1CConverter />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>
                A1C to average glucose chart (A1C 5% to 12%)
              </h2>
              <p>
                Each A1C percentage maps to an estimated average glucose (eAG) using
                eAG (mg/dL) = 28.7 × A1C − 46.7, and mmol/L = mg/dL ÷ 18. The
                calculator above is exact for any value you type; this chart lists the
                common reference points. The last column is the same A1C in IFCC units.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={t.caption}>
                    A1C to estimated average glucose (eAG), from 5.0% to 12.0%
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>A1C</th>
                      <th scope="col" className={t.colHead}>eAG (mg/dL)</th>
                      <th scope="col" className={t.colHead}>eAG (mmol/L)</th>
                      <th scope="col" className={t.colHead}>IFCC</th>
                      <th scope="col" className={t.colHead}>ADA category</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr key="5.0" data-tone="ok"><th scope="row" className={t.rowHead}>5.0%</th><td className={t.cell}>97 mg/dL</td><td className={t.cell}>5.4 mmol/L</td><td className={t.cell}>31 mmol/mol</td><td className={t.cellNote}>Normal</td></tr>
                      <tr key="5.5" data-tone="ok"><th scope="row" className={t.rowHead}>5.5%</th><td className={t.cell}>111 mg/dL</td><td className={t.cell}>6.2 mmol/L</td><td className={t.cell}>37 mmol/mol</td><td className={t.cellNote}>Normal</td></tr>
                      <tr key="5.7" data-tone="warn"><th scope="row" className={t.rowHead}>5.7%</th><td className={t.cell}>117 mg/dL</td><td className={t.cell}>6.5 mmol/L</td><td className={t.cell}>39 mmol/mol</td><td className={t.cellNote}>Prediabetes range starts</td></tr>
                      <tr key="6.0" data-tone="warn"><th scope="row" className={t.rowHead}>6.0%</th><td className={t.cell}>126 mg/dL</td><td className={t.cell}>7.0 mmol/L</td><td className={t.cell}>42 mmol/mol</td><td className={t.cellNote}>Prediabetes range</td></tr>
                      <tr key="6.4" data-tone="warn"><th scope="row" className={t.rowHead}>6.4%</th><td className={t.cell}>137 mg/dL</td><td className={t.cell}>7.6 mmol/L</td><td className={t.cell}>46 mmol/mol</td><td className={t.cellNote}>Top of prediabetes range</td></tr>
                      <tr key="6.5" data-tone="bad"><th scope="row" className={t.rowHead}>6.5%</th><td className={t.cell}>140 mg/dL</td><td className={t.cell}>7.8 mmol/L</td><td className={t.cell}>48 mmol/mol</td><td className={t.cellNote}>Diabetes range starts</td></tr>
                      <tr key="7.0" data-tone="bad"><th scope="row" className={t.rowHead}>7.0%</th><td className={t.cell}>154 mg/dL</td><td className={t.cell}>8.6 mmol/L</td><td className={t.cell}>53 mmol/mol</td><td className={t.cellNote}>Common target for many adults with diabetes</td></tr>
                      <tr key="7.5" data-tone="bad"><th scope="row" className={t.rowHead}>7.5%</th><td className={t.cell}>169 mg/dL</td><td className={t.cell}>9.4 mmol/L</td><td className={t.cell}>58 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="8.0" data-tone="bad"><th scope="row" className={t.rowHead}>8.0%</th><td className={t.cell}>183 mg/dL</td><td className={t.cell}>10.2 mmol/L</td><td className={t.cell}>64 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="8.5" data-tone="bad"><th scope="row" className={t.rowHead}>8.5%</th><td className={t.cell}>197 mg/dL</td><td className={t.cell}>11.0 mmol/L</td><td className={t.cell}>69 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="9.0" data-tone="bad"><th scope="row" className={t.rowHead}>9.0%</th><td className={t.cell}>212 mg/dL</td><td className={t.cell}>11.8 mmol/L</td><td className={t.cell}>75 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="9.5" data-tone="bad"><th scope="row" className={t.rowHead}>9.5%</th><td className={t.cell}>226 mg/dL</td><td className={t.cell}>12.6 mmol/L</td><td className={t.cell}>80 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="10.0" data-tone="bad"><th scope="row" className={t.rowHead}>10.0%</th><td className={t.cell}>240 mg/dL</td><td className={t.cell}>13.4 mmol/L</td><td className={t.cell}>86 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="10.5" data-tone="bad"><th scope="row" className={t.rowHead}>10.5%</th><td className={t.cell}>255 mg/dL</td><td className={t.cell}>14.1 mmol/L</td><td className={t.cell}>91 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="11.0" data-tone="bad"><th scope="row" className={t.rowHead}>11.0%</th><td className={t.cell}>269 mg/dL</td><td className={t.cell}>14.9 mmol/L</td><td className={t.cell}>97 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="11.5" data-tone="bad"><th scope="row" className={t.rowHead}>11.5%</th><td className={t.cell}>283 mg/dL</td><td className={t.cell}>15.7 mmol/L</td><td className={t.cell}>102 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                      <tr key="12.0" data-tone="bad"><th scope="row" className={t.rowHead}>12.0%</th><td className={t.cell}>298 mg/dL</td><td className={t.cell}>16.5 mmol/L</td><td className={t.cell}>108 mmol/mol</td><td className={t.cellNote}>—</td></tr>
                  </tbody>
                </table>
              </div>

              <h2>
                What your A1C result means
              </h2>
              <p>
                The American Diabetes Association (Standards of Care) places an A1C
                below 5.7% in the normal range, 5.7% to 6.4% in the prediabetes range,
                and 6.5% or higher in the diabetes range. A diagnosis is made by a
                clinician, usually with a repeat test, not by a calculator.
              </p>
              <p>
                eAG is an estimate of your average over about 2 to 3 months, not a
                reading. Anemia, recent blood loss or transfusion, hemoglobin variants,
                pregnancy and kidney disease can make A1C misleading, so it can
                disagree with your meter. A continuous glucose monitor (CGM) shows the
                day-to-day pattern that an average hides; see{" "}
                <Link href="/blog/cgm-without-diabetes">CGM without diabetes</Link> and{" "}
                <Link href="/compare/lingo-vs-stelo">Lingo vs Stelo</Link>. For context
                on a specific result, read{" "}
                <Link href="/blog/hba1c-5-7-pre-diabetic">what an A1C of 5.7% means</Link>.
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
                  One A1C is a number. A trend line shows where it is heading.
                </p>
                <p className={t.ctaText}>
                  Merios is for people who already have blood work and want to track
                  A1C and fasting glucose over time next to their Apple Watch data.
                </p>
              </div>
              <div className={t.ctaActions}>
                <a
                  href="https://apps.apple.com/us/app/merios/id6760352598?pt=128637372&ct=web-a1c-calculator&mt=8"
                  className="btn btn-lime"
                >
                  Get the app
                </a>
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
