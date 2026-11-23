import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import DheaConverter from "@/components/calculators/DheaConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const TITLE = "DHEA-S Unit Converter: µg/dL to µmol/L (+ DHEA)";
const NAME = "DHEA Unit Converter";
const DESCRIPTION =
  "DHEA-S conversion: µmol/L = µg/dL × 0.02714, so 200 µg/dL is 5.43 µmol/L. DHEA: ng/mL × 3.467 = nmol/L. Charts, age ranges, and why DHEA is not DHEA-S.";
const URL = "https://merios.life/tools/dhea-unit-converter";

const FAQ_ITEMS = [
  { q: "How do you convert DHEA-S from µg/dL to µmol/L?", a: "Multiply by 0.02714. DHEA sulfate has a molar mass of 368.5 g/mol, so 1 µg/dL equals 0.02714 µmol/L. A DHEA-S of 100 µg/dL is 2.71 µmol/L, 200 µg/dL is 5.43 µmol/L and 300 µg/dL is 8.14 µmol/L. mcg/dL is the same unit as µg/dL, written differently. Mayo Clinic Laboratories rounds the factor to 0.027." },
  { q: "How do you convert DHEA-S from µmol/L to µg/dL?", a: "Multiply by 36.85. A DHEA-S of 5 µmol/L is about 184 µg/dL and 10 µmol/L is about 368 µg/dL. Labcorp's SI table uses a rounded factor of 38 in this direction (0.026 the other way), so results converted with different tables can differ by about 4%." },
  { q: "Is DHEA the same as DHEA-S?", a: "No. DHEA-S (DHEA sulfate) is the form the adrenal glands secrete most of, and it circulates at more than 100 times the concentration of unconjugated DHEA, according to Mayo Clinic Laboratories. They are separate tests with separate ranges and units: DHEA-S is usually in µg/dL or µmol/L, DHEA in ng/mL, ng/dL or nmol/L. Clinically both reflect adrenal androgen production, but a DHEA number cannot be converted into a DHEA-S number or compared with a DHEA-S range." },
  { q: "What is a normal DHEA-S level?", a: "It depends on age and sex, and on the lab. Mayo Clinic Laboratories lists 105 to 728 µg/dL for men aged 18 to 30 and 83 to 377 µg/dL for women of the same age, falling with each decade to 6.6 to 162 µg/dL for men and 5.3 to 124 µg/dL for women aged 71 and older. MedlinePlus lists somewhat different values, which is why the range printed on your own report is the one that applies." },
  { q: "Why does my lab's µmol/L not match the converter exactly?", a: "Usually rounding or a different factor. The factor from the molar mass of DHEA sulfate is 0.02714; Mayo Clinic Laboratories prints 0.027 and Labcorp prints 0.026. On a DHEA-S of 300 µg/dL that gives 8.14, 8.1 or 7.8 µmol/L. The gap is a convention, not a different result. If the difference is much larger, check that both numbers are DHEA-S and not one DHEA and one DHEA-S." },
];

// DHEA-S µg/dL -> µmol/L (× 10 / 368.5, PubChem CID 12594) and µg/mL (÷ 100).
const DHEAS_ROWS: [string, string, string][] = [
  ["25 µg/dL", "0.68 µmol/L", "0.25 µg/mL"],
  ["50 µg/dL", "1.36 µmol/L", "0.50 µg/mL"],
  ["100 µg/dL", "2.71 µmol/L", "1.00 µg/mL"],
  ["150 µg/dL", "4.07 µmol/L", "1.50 µg/mL"],
  ["200 µg/dL", "5.43 µmol/L", "2.00 µg/mL"],
  ["250 µg/dL", "6.78 µmol/L", "2.50 µg/mL"],
  ["300 µg/dL", "8.14 µmol/L", "3.00 µg/mL"],
  ["400 µg/dL", "10.85 µmol/L", "4.00 µg/mL"],
  ["500 µg/dL", "13.57 µmol/L", "5.00 µg/mL"],
  ["600 µg/dL", "16.28 µmol/L", "6.00 µg/mL"],
];

// DHEA-S µmol/L -> µg/dL (× 36.85), whole numbers.
const UMOL_ROWS: [string, string][] = [
  ["1 µmol/L", "37 µg/dL"],
  ["2 µmol/L", "74 µg/dL"],
  ["3 µmol/L", "111 µg/dL"],
  ["4 µmol/L", "147 µg/dL"],
  ["5 µmol/L", "184 µg/dL"],
  ["6 µmol/L", "221 µg/dL"],
  ["8 µmol/L", "295 µg/dL"],
  ["10 µmol/L", "368 µg/dL"],
  ["12 µmol/L", "442 µg/dL"],
  ["15 µmol/L", "553 µg/dL"],
];

// Unconjugated DHEA: ng/dL = ng/mL × 100; nmol/L = ng/mL × 3.467 (molar mass 288.4, PubChem CID 5881).
const DHEA_ROWS: [string, string, string][] = [
  ["1 ng/mL", "100 ng/dL", "3.5 nmol/L"],
  ["2 ng/mL", "200 ng/dL", "6.9 nmol/L"],
  ["3 ng/mL", "300 ng/dL", "10.4 nmol/L"],
  ["5 ng/mL", "500 ng/dL", "17.3 nmol/L"],
  ["8 ng/mL", "800 ng/dL", "27.7 nmol/L"],
  ["10 ng/mL", "1,000 ng/dL", "34.7 nmol/L"],
  ["13 ng/mL", "1,300 ng/dL", "45.1 nmol/L"],
  ["15 ng/mL", "1,500 ng/dL", "52.0 nmol/L"],
];

// Mayo Clinic Laboratories, test DHES1 (Dehydroepiandrosterone Sulfate, Serum), adult reference values in mcg/dL,
// https://www.mayocliniclabs.com/test-catalog/overview/113595 (checked 23 Nov 2026). SI = µg/dL × 0.02714.
const DHEAS_RANGE_ROWS: [string, string, string, string, string][] = [
  ["18–30", "105–728 µg/dL", "2.8–19.8 µmol/L", "83–377 µg/dL", "2.3–10.2 µmol/L"],
  ["31–40", "57–522 µg/dL", "1.5–14.2 µmol/L", "45–295 µg/dL", "1.2–8.0 µmol/L"],
  ["41–50", "34–395 µg/dL", "0.92–10.7 µmol/L", "27–240 µg/dL", "0.73–6.5 µmol/L"],
  ["51–60", "20–299 µg/dL", "0.54–8.1 µmol/L", "16–195 µg/dL", "0.43–5.3 µmol/L"],
  ["61–70", "12–227 µg/dL", "0.33–6.2 µmol/L", "9.7–159 µg/dL", "0.26–4.3 µmol/L"],
  ["71 and older", "6.6–162 µg/dL", "0.18–4.4 µmol/L", "5.3–124 µg/dL", "0.14–3.4 µmol/L"],
];

// Mayo Clinic Laboratories, test DHEA_ (Dehydroepiandrosterone, Serum), adult upper limits in ng/mL, same for both
// sexes, https://www.mayocliniclabs.com/test-catalog/overview/81405 (checked 23 Nov 2026). nmol/L = ng/mL × 3.467.
const DHEA_RANGE_ROWS: [string, string, string, string][] = [
  ["19–30", "under 13 ng/mL", "under 1,300 ng/dL", "under 45.1 nmol/L"],
  ["31–40", "under 10 ng/mL", "under 1,000 ng/dL", "under 34.7 nmol/L"],
  ["41–50", "under 8.0 ng/mL", "under 800 ng/dL", "under 27.7 nmol/L"],
  ["51–60", "under 6.0 ng/mL", "under 600 ng/dL", "under 20.8 nmol/L"],
  ["61 and older", "under 5.0 ng/mL", "under 500 ng/dL", "under 17.3 nmol/L"],
];

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
    name: NAME,
    alternateName: ["DHEA Conversion Calculator", "DHEA-S µg/dL to µmol/L Converter", "DHEA Sulfate Converter", "DHEA-S Unit Converter"],
    url: URL,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    featureList: [
      "DHEA-S µg/dL (mcg/dL) to µmol/L and µg/mL conversion",
      "DHEA-S µmol/L to µg/dL conversion",
      "Unconjugated DHEA ng/mL, ng/dL and nmol/L conversion",
      "Comparison with adult reference values by age and sex",
      "Unit check that flags a DHEA result entered as DHEA-S and the reverse",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "DHEA-S: 1 µg/dL = 0.02714 µmol/L (molar mass 368.5 g/mol, PubChem CID 12594); Mayo Clinic Laboratories SI conversion 0.027. DHEA: 1 ng/mL = 3.467 nmol/L (molar mass 288.4 g/mol, PubChem CID 5881). Reference values: Mayo Clinic Laboratories tests DHES1 and DHEA_.",
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: NAME, url: URL },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="DHEA-S and DHEA — µg/dL, µmol/L, ng/mL, nmol/L"
        title="DHEA Unit Converter"
        subline="For DHEA-S, multiply µg/dL by 0.02714 for µmol/L, or µmol/L by 36.85 for µg/dL: 200 µg/dL is 5.43 µmol/L. For plain DHEA, 1 ng/mL is 3.467 nmol/L. Two different tests, two different scales."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <DheaConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The DHEA-S conversion formula</h2>
              <p className={t.formula}>µmol/L = µg/dL × 0.02714 · µg/dL = µmol/L × 36.85 · µg/mL = µg/dL ÷ 100</p>
              <p>
                The factor comes from the molar mass of DHEA sulfate, 368.5 g/mol (PubChem). 1 µg/dL is 10 µg per
                liter, and 10 divided by 368.5 is 0.02714 µmol/L. Mayo Clinic Laboratories&apos; SI conversion table
                prints the same factor rounded to 0.027. mcg/dL and µg/dL are the same unit written two ways. A few
                labs report DHEA-S in µg/mL or ng/mL: 1 µg/dL is 0.01 µg/mL, or 10 ng/mL, so a DHEA-S of 200 µg/dL
                is 2.0 µg/mL and 2,000 ng/mL.
              </p>

              <h2>Why your lab&apos;s µmol/L can differ by about 4%</h2>
              <p>
                Not every table uses the same factor. Labcorp&apos;s SI conversion table lists 0.026 for DHEA sulfate
                (and 38 in the other direction), a value close to what the molar mass of the sodium salt, 390.5
                g/mol, would give. Mayo prints 0.027, and the molar mass of DHEA sulfate itself gives 0.02714. On a
                DHEA-S of 300 µg/dL, that is 7.8, 8.1 or 8.14 µmol/L depending on the table. If a European report
                and a US report of the same person seem slightly out of step, this is the most likely reason. A gap
                much larger than a few percent usually means two different tests are being compared.
              </p>

              <h2>DHEA-S conversion chart: µg/dL to µmol/L</h2>
              <p>
                Values from 25 to 600 µg/dL cover the adult ranges Mayo Clinic Laboratories lists across all ages.
                µmol/L is rounded to two decimals.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>DHEA-S in µg/dL converted to µmol/L and µg/mL, 25 to 600 µg/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>DHEA-S in µg/dL (mcg/dL)</th>
                      <th scope="col" className={t.colHead}>µmol/L</th>
                      <th scope="col" className={t.colHead}>µg/mL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DHEAS_ROWS.map(([from, to, ugml]) => (
                      <tr key={from}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cell}>{ugml}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>DHEA-S µmol/L to µg/dL: the reverse chart</h2>
              <p>
                Labs in the UK, Europe, Canada and Australia usually report DHEA-S in µmol/L, while most US reports
                and articles use µg/dL. Use this direction to read one against the other.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>DHEA-S in µmol/L converted to µg/dL, 1 to 15 µmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>DHEA-S in µmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in µg/dL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UMOL_ROWS.map(([from, to]) => (
                      <tr key={from}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>DHEA vs DHEA-S: why the numbers are hundreds of times apart</h2>
              <p>
                This is the mix-up behind most searches for a DHEA conversion. DHEA and DHEA-S are related hormones
                made mainly by the adrenal glands, but they are measured by two separate tests. Mayo Clinic
                Laboratories notes that most of the hormone is secreted as the sulfate, DHEA-S, which circulates at
                more than 100 times the concentration of unconjugated DHEA and is held more tightly by albumin. The
                body can convert DHEA-S back into DHEA in tissues, and Mayo considers either test usable in most
                clinical situations, but their numbers live on different scales.
              </p>
              <p>
                An example: a DHEA-S of 200 µg/dL is 2,000 ng/mL. A plain DHEA of 5 ng/mL is a typical adult value.
                Put either one into the other test&apos;s range and it looks absurdly high or absurdly low. No
                factor turns a DHEA result into a DHEA-S result, so the first step is always to read the exact test
                name on your report: &ldquo;DHEA sulfate&rdquo;, &ldquo;DHEA-S&rdquo; or &ldquo;DHEAS&rdquo; is
                the sulfate; &ldquo;DHEA&rdquo; or &ldquo;DHEA, unconjugated&rdquo; on its own is not.
              </p>

              <h2>Is my number DHEA or DHEA-S? A quick unit check</h2>
              <p>
                If the test name is cut off on a printout, the unit and the size of the number are good clues.
                Adult DHEA-S usually reads in the tens to hundreds in µg/dL, or roughly 0.1 to 20 in µmol/L. Adult
                DHEA usually reads in single digits in ng/mL, or in the hundreds in ng/dL. That overlap is the trap:
                a value of 300 could be DHEA-S in µg/dL or DHEA in ng/dL. The unit settles it. The converter above
                flags entries that sit far outside every adult range for the test you picked, which is usually a
                sign the wrong test or unit was selected.
              </p>

              <h2>Unconjugated DHEA: ng/mL, ng/dL and nmol/L</h2>
              <p>
                DHEA has a molar mass of 288.4 g/mol, the same as testosterone, so the factors are the same: 1 ng/mL
                is 3.467 nmol/L and 1 ng/dL is 0.03467 nmol/L. Mayo Clinic Laboratories reports DHEA in ng/mL;
                Labcorp&apos;s table lists it in ng/dL. For testosterone itself, use the{" "}
                <Link href="/tools/testosterone-unit-converter">testosterone unit converter</Link>.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Unconjugated DHEA in ng/mL converted to ng/dL and nmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>DHEA in ng/mL</th>
                      <th scope="col" className={t.colHead}>ng/dL</th>
                      <th scope="col" className={t.colHead}>nmol/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DHEA_ROWS.map(([from, ngdl, nmol]) => (
                      <tr key={from}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{ngdl}</td>
                        <td className={t.cell}>{nmol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Normal DHEA-S levels by age and sex</h2>
              <p>
                These are the adult reference values Mayo Clinic Laboratories publishes for its DHEA-S test, with
                the µmol/L equivalents calculated on this page. Mayo notes that DHEA-S rises after adrenarche until
                about age 20, then declines over the following decades to roughly 20% of its peak, which is why each
                band is lower than the one before. Ranges vary by laboratory: MedlinePlus, for example, lists 45 to
                320 µg/dL for women aged 18 to 29. The range printed on your own report is the one that applies.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Adult DHEA-S reference values by age and sex (Mayo Clinic Laboratories)</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Age</th>
                      <th scope="col" className={t.colHead}>Men, µg/dL</th>
                      <th scope="col" className={t.colHead}>Men, µmol/L</th>
                      <th scope="col" className={t.colHead}>Women, µg/dL</th>
                      <th scope="col" className={t.colHead}>Women, µmol/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DHEAS_RANGE_ROWS.map(([age, mUs, mSi, fUs, fSi]) => (
                      <tr key={age}>
                        <th scope="row" className={t.rowHead}>{age}</th>
                        <td className={t.cell}>{mUs}</td>
                        <td className={t.cell}>{mSi}</td>
                        <td className={t.cell}>{fUs}</td>
                        <td className={t.cell}>{fSi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                For plain DHEA, Mayo lists only upper limits, the same for women and men:
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Adult unconjugated DHEA reference values by age (Mayo Clinic Laboratories)</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Age</th>
                      <th scope="col" className={t.colHead}>ng/mL</th>
                      <th scope="col" className={t.colHead}>ng/dL</th>
                      <th scope="col" className={t.colHead}>nmol/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DHEA_RANGE_ROWS.map(([age, ngml, ngdl, nmol]) => (
                      <tr key={age}>
                        <th scope="row" className={t.rowHead}>{age}</th>
                        <td className={t.cell}>{ngml}</td>
                        <td className={t.cell}>{ngdl}</td>
                        <td className={t.cell}>{nmol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>What your DHEA-S result may suggest</h2>
              <p>
                <strong>Age comes first.</strong> A DHEA-S that would sit low for a 25-year-old can be squarely
                within range at 60. Before reading anything into a number, compare it with the band for your age
                and sex, ideally the one on your own report. Mayo describes the clinical meaning of the normal
                age-related decline as unknown.
              </p>
              <p>
                <strong>Higher values</strong> can follow a DHEA or DHEA-S supplement, which is why MedlinePlus asks
                you to tell your provider about any you take before the test. Outside of supplements, higher
                DHEA-S is associated with polycystic ovary syndrome, congenital adrenal hyperplasia and adrenal
                tumors, so clinicians read it with other hormones such as testosterone.
              </p>
              <p>
                <strong>Lower values</strong> are associated with glucocorticoid medicines, adrenal insufficiency and
                reduced pituitary function, according to MedlinePlus.
              </p>
              <p>
                None of these patterns is a diagnosis. A single DHEA-S value is a snapshot; if yours sits outside
                your lab&apos;s range or has moved a lot since an earlier panel, talk to your clinician before
                starting or stopping any supplement. For why DHEA-S appears on longevity panels at all, see{" "}
                <Link href="/blog/biomarkers-to-track-for-longevity">biomarkers to track for longevity</Link>. To
                estimate the share of testosterone that is unbound, use the{" "}
                <Link href="/tools/free-testosterone-calculator">free testosterone calculator</Link>, and the{" "}
                <Link href="/blog/blood-test-results-normal-range-chart">blood test normal range chart</Link> puts
                DHEA-S next to every other common marker.
              </p>
              <p>
                Already have your bloodwork?{" "}
                <a href="https://apps.apple.com/us/app/merios/id6760352598?pt=128637372&ct=web-dhea-unit-converter&mt=8">Merios</a>{" "}
                reads it next to your Apple Watch data, so a DHEA-S trend sits beside the sleep, training load and
                resting heart rate around each draw. The lab-report scan is part of Merios Plus ($44/year, 7-day
                free trial on the annual plan); the Daily is free. iPhone, iOS 15.1 or later.
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
                  One DHEA-S curve, whatever unit each lab used.
                </p>
                <p className={t.ctaText}>
                  Already have your bloodwork? Merios reads it next to your watch data, keeping DHEA-S on one scale
                  whether a report used µg/dL or µmol/L, beside the sleep and training data around each draw.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=dhea-unit-converter" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/tools/testosterone-unit-converter" className="btn btn-ghost-night">
                  Testosterone unit converter →
                </Link>
              </div>
              <CtaPulse />
            </div>

            <p className={`${t.reference} ${t.sources}`}>
              Sources: Mayo Clinic Laboratories, <em>Dehydroepiandrosterone Sulfate, Serum (DHES1)</em> and{" "}
              <em>Dehydroepiandrosterone (DHEA), Serum (DHEA_)</em>, test catalog. · Mayo Clinic Laboratories,{" "}
              <em>SI Unit Conversion</em>. · Labcorp, <em>SI Unit Conversion Table</em>. · PubChem, U.S. National
              Library of Medicine, <em>Dehydroepiandrosterone sulfate</em> (CID 12594) and{" "}
              <em>Dehydroepiandrosterone</em> (CID 5881). · MedlinePlus, <em>DHEA-sulfate test</em>. · Educational
              tool, not a diagnosis; interpret any result with the reference range printed on your own report and
              with your clinician.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
