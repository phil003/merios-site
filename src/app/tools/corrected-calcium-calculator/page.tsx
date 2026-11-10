import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import CorrectedCalciumCalculator from "@/components/calculators/CorrectedCalciumCalculator";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const TITLE = "Corrected Calcium Calculator (Albumin-Adjusted)";
const DESCRIPTION =
  "Free corrected calcium calculator in mg/dL or mmol/L. Adjusts total calcium for low albumin, shows the usual range and when ionized calcium is the better test.";
const URL = "https://merios.life/tools/corrected-calcium-calculator";

const FAQ_ITEMS = [
  { q: "How do you calculate corrected calcium?", a: "Add 0.8 mg/dL to the measured total calcium for every 1 g/dL that albumin sits below 4.0 g/dL: corrected calcium = measured calcium + 0.8 × (4.0 − albumin). A calcium of 8.0 mg/dL with an albumin of 3.0 g/dL corrects to 8.8 mg/dL. This is the albumin adjustment usually attributed to Payne and colleagues (BMJ, 1973)." },
  { q: "What is a normal corrected calcium level?", a: "Corrected calcium is read against the same range as total calcium. A common adult reference range is about 8.5 to 10.2 mg/dL, or 2.12 to 2.55 mmol/L. Ranges vary slightly between labs, so the one printed on your own report is the one that applies." },
  { q: "When should you correct calcium for albumin?", a: "When albumin is low, roughly below 4.0 g/dL (40 g/L). About 40 percent of calcium in blood is bound to protein, mostly albumin, so a low albumin pulls the total calcium down even when the active, ionized calcium is normal. When albumin is normal, the correction changes little or nothing, and many labs and clinicians simply read the measured value." },
  { q: "Is corrected calcium accurate?", a: "It is a rough estimate. Studies comparing it with measured ionized calcium have found that it can misclassify calcium status, especially in critical illness, kidney disease and at very low or very high albumin. When an accurate answer matters, many labs and newer guidance prefer a direct ionized calcium measurement over any formula." },
  { q: "What is corrected calcium in mmol/L?", a: "In SI units the formula is corrected calcium (mmol/L) = measured calcium + 0.02 × (40 − albumin in g/L). A calcium of 2.10 mmol/L with an albumin of 30 g/L corrects to 2.30 mmol/L. To convert calcium between units, 1 mmol/L equals 4.008 mg/dL, so 2.30 mmol/L is about 9.2 mg/dL." },
  { q: "Does Merios store these numbers?", a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

// [measured calcium, albumin, corrected, same corrected in the other unit, band]
const EXAMPLES: [string, string, string, string, string][] = [
  ["8.0 mg/dL", "3.0 g/dL", "8.8 mg/dL", "2.20 mmol/L", "Within the usual adult range"],
  ["9.0 mg/dL", "2.5 g/dL", "10.2 mg/dL", "2.54 mmol/L", "At the top of the usual range"],
  ["8.4 mg/dL", "4.0 g/dL", "8.4 mg/dL", "2.10 mmol/L", "Below the usual range"],
  ["2.10 mmol/L", "30 g/L", "2.30 mmol/L", "9.2 mg/dL", "Within the usual adult range"],
];

/* Row status dot (presentation only), the same bands the calculator applies. */
function toneOf(band: string): "ok" | "warn" | "bad" {
  if (band.startsWith("Below") || band.startsWith("Above")) return "warn";
  return "ok";
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${URL}#tool`,
    name: TITLE,
    url: URL,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    featureList: [
      "Albumin-corrected calcium in mg/dL (US units)",
      "Albumin-corrected calcium in mmol/L (SI units)",
      "Result shown in both units against a common adult reference range",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation:
      "Payne RB, et al. Interpretation of serum calcium in patients with abnormal serum proteins. Br Med J 1973;4:643-646.",
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: TITLE, url: URL },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="Calcium — adjusted for albumin"
        title="Corrected Calcium Calculator"
        subline="A low albumin can make a normal calcium look low. Enter total calcium and albumin, in mg/dL or mmol/L, and see the corrected value in both units."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <CorrectedCalciumCalculator />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The formula, in words</h2>
              <p>
                About 40 percent of the calcium in your blood is bound to protein, mostly albumin, the main protein in plasma. A standard
                calcium test measures the total, bound and free together, so when albumin is low the total reads low
                even if the active, free (ionized) calcium is fine. Corrected calcium puts that missing share back.
              </p>
              <p>
                For every 1 g/dL that albumin sits below 4.0 g/dL, add 0.8 mg/dL to the measured calcium. In SI units,
                for every 1 g/L of albumin below 40 g/L, add 0.02 mmol/L. When albumin is above 4.0 g/dL the same
                arithmetic subtracts a little, which is why the correction matters mostly when albumin is low.
              </p>

              <h2>Worked examples</h2>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Corrected calcium for four measured calcium and albumin pairs</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Measured calcium</th>
                      <th scope="col" className={t.colHead}>Albumin</th>
                      <th scope="col" className={t.colHead}>Corrected calcium</th>
                      <th scope="col" className={t.colHead}>Other unit</th>
                      <th scope="col" className={t.colHead}>Where that sits (adults)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXAMPLES.map(([caM, alb, corr, other, band]) => (
                      <tr key={`${caM}-${alb}`} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{caM}</th>
                        <td className={t.cell}>{alb}</td>
                        <td className={t.cell}>{corr}</td>
                        <td className={t.cell}>{other}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                The third row is the one people miss: with a normal albumin of 4.0 g/dL there is nothing to correct, so
                a calcium of 8.4 mg/dL stays just below the usual range.
              </p>

              <h2>What a low or high corrected calcium can mean</h2>
              <p>
                <strong>Below about 8.5 mg/dL (2.12 mmol/L).</strong> A low corrected calcium can be associated with
                low vitamin D, low magnesium, kidney disease or low parathyroid hormone, among other causes. If your
                vitamin D is also on the report, the{" "}
                <Link href="/tools/vitamin-d-unit-converter">vitamin D converter</Link> shows where it sits, and the{" "}
                <Link href="/blog/vitamin-d-deficiency">guide to vitamin D deficiency</Link> covers what low levels
                look like.
              </p>
              <p>
                <strong>Above about 10.2 mg/dL (2.55 mmol/L).</strong> A high corrected calcium is often
                parathyroid-related, and it can also be associated with certain medications or with too much vitamin D
                or calcium from supplements. Either way, a result outside the range is worth talking over with your
                clinician, who may repeat it or order further tests.
              </p>

              <h2>When ionized calcium is the better test</h2>
              <p>
                The albumin correction is an estimate from a population average, and studies comparing it with measured
                ionized calcium show it can misclassify calcium status. It is least reliable in critical illness, in
                kidney disease and at very low or very high albumin. In those situations, and whenever an exact answer
                matters, many labs and newer guidance prefer a direct ionized calcium measurement. Some labs will not
                report a corrected value at all for that reason.
              </p>
              <p>
                To see calcium and albumin next to the rest of a standard panel, use the{" "}
                <Link href="/blog/blood-test-results-normal-range-chart">blood test normal range chart</Link>, and for a
                walkthrough of a full report, see{" "}
                <Link href="/blog/how-to-read-blood-test-results">how to read blood test results</Link>.
              </p>
            </div>

            <div className={t.faq} data-rv="">
              <h2 className={t.faqTitle}>Frequently asked questions</h2>
              <dl className={t.faqList}>
                {FAQ_ITEMS.map(({ q, a }) => (
                  <div key={q} className={t.faqItem}>
                    <dt className={t.faqQ}>{q}</dt>
                    <dd className={t.faqA}>{a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={`chrome-text ${t.ctaQuote}`}>
                  Already have your bloodwork? Merios reads it next to your watch data.
                </p>
                <p className={t.ctaText}>
                  Scan a lab report and Merios keeps calcium, albumin and the rest of your markers on one timeline,
                  beside the sleep, heart rate and activity your Apple Watch already records. The Daily tier is free;
                  lab report scanning is part of Merios Plus, $44 a year with a 7-day free trial. iPhone, iOS 15.1 or
                  later, on the US App Store.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=corrected-calcium-calculator" className="btn btn-lime">
                  Get the app
                </Link>
              </div>
              <CtaPulse />
            </div>

            <p className={`${t.reference} ${t.sources}`}>
              References: Payne RB, et al.{" "}
              <em>Interpretation of serum calcium in patients with abnormal serum proteins.</em> Br Med J
              1973;4:643-646. · MedlinePlus,{" "}
              <a href="https://medlineplus.gov/lab-tests/calcium-blood-test/">
                <em>Calcium blood test</em>
              </a>
              , U.S. National Library of Medicine. · Educational tool, not a diagnosis; interpret any result with the
              reference range printed on your own report and with your physician.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
