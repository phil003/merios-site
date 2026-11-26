import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CtaScreen from "@/components/calculators/tool-page/CtaScreen";
import ToolHero from "@/components/calculators/tool-page/ToolHero";
import ToolFaq from "@/components/calculators/tool-page/ToolFaq";
import ToolRelated from "@/components/calculators/tool-page/ToolRelated";
import IronConverter from "@/components/calculators/IronConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "Iron Unit Converter: µg/dL to µmol/L (+ Ferritin)";
const NAME = "Iron Unit Converter";
const DESCRIPTION =
  "Iron conversion factor: µmol/L = µg/dL × 0.1791 (100 µg/dL = 17.9 µmol/L). Converter for iron, TIBC and ferritin, with a chart and why iron is not ferritin.";
const URL = "https://merios.life/tools/iron-unit-converter";

const FAQ_ITEMS = [
  { q: "What is the iron conversion factor?", a: "0.1791. Iron has a molar mass of 55.845 g/mol, so 1 µg/dL of serum iron equals 0.1791 µmol/L. Multiply µg/dL by 0.1791 to get µmol/L, or multiply µmol/L by 5.585 to get µg/dL. Labcorp's SI table rounds the factor to 0.179. TIBC uses the same factor, because it is expressed as the amount of iron transferrin can bind." },
  { q: "How do you convert iron from µg/dL to µmol/L?", a: "Multiply by 0.1791. A serum iron of 50 µg/dL is 9.0 µmol/L, 100 µg/dL is 17.9 µmol/L and 150 µg/dL is 26.9 µmol/L. mcg/dL is the same unit as µg/dL, written differently, so a result of 100 mcg/dL is also 17.9 µmol/L." },
  { q: "How do you convert iron from µmol/L to mg/dL?", a: "Multiply µmol/L by 5.585 to get µg/dL, then divide by 1,000 for mg/dL. In one step, multiply µmol/L by 0.005585. A serum iron of 18 µmol/L is about 101 µg/dL, or 0.101 mg/dL. Iron is rarely reported in mg/dL, so check that your report does not actually say µg/dL or mcg/dL." },
  { q: "Can you convert iron to ferritin?", a: "No. Serum iron and ferritin are different tests, not two units of the same number. Serum iron measures iron carried in the blood by transferrin and changes through the day; ferritin is a storage protein that reflects iron reserves and rises with inflammation. No formula turns one into the other. What you can convert is each test's own units: ferritin in ng/mL is the same number in µg/L, and 1 ng/mL is 2.247 pmol/L." },
  { q: "Is there an iron conversion chart?", a: "Yes, the chart on this page lists serum iron from 25 to 200 µg/dL with the matching µmol/L and mg/dL values, a reverse table from µmol/L, TIBC values and ferritin in ng/mL, µg/L and pmol/L. The values people check most: 50 µg/dL is 9.0 µmol/L, 100 µg/dL is 17.9 µmol/L and 150 µg/dL is 26.9 µmol/L." },
];

// MedlinePlus adult serum iron: women 37–145 µg/dL, men 59–158 µg/dL.
// µmol/L = µg/dL × 0.1791, one decimal.
const IRON_ROWS: [string, string, string, string][] = [
  ["25 µg/dL", "4.5 µmol/L", "0.025 mg/dL", "Below both adult ranges"],
  ["50 µg/dL", "9.0 µmol/L", "0.050 mg/dL", "Within the women's range, below the men's"],
  ["75 µg/dL", "13.4 µmol/L", "0.075 mg/dL", "Within both adult ranges"],
  ["100 µg/dL", "17.9 µmol/L", "0.100 mg/dL", "Within both adult ranges"],
  ["125 µg/dL", "22.4 µmol/L", "0.125 mg/dL", "Within both adult ranges"],
  ["150 µg/dL", "26.9 µmol/L", "0.150 mg/dL", "Above the women's range, within the men's"],
  ["175 µg/dL", "31.3 µmol/L", "0.175 mg/dL", "Above both adult ranges"],
  ["200 µg/dL", "35.8 µmol/L", "0.200 mg/dL", "Above both adult ranges"],
];

// µmol/L -> µg/dL (× 5.585), whole numbers.
const UMOL_ROWS: [string, string, string][] = [
  ["5 µmol/L", "28 µg/dL", "Below both adult ranges"],
  ["10 µmol/L", "56 µg/dL", "Within the women's range, below the men's"],
  ["15 µmol/L", "84 µg/dL", "Within both adult ranges"],
  ["20 µmol/L", "112 µg/dL", "Within both adult ranges"],
  ["25 µmol/L", "140 µg/dL", "Within both adult ranges"],
  ["30 µmol/L", "168 µg/dL", "Above both adult ranges"],
];

// TIBC, same factor as iron.
const TIBC_ROWS: [string, string][] = [
  ["250 µg/dL", "44.8 µmol/L"],
  ["300 µg/dL", "53.7 µmol/L"],
  ["350 µg/dL", "62.7 µmol/L"],
  ["400 µg/dL", "71.6 µmol/L"],
  ["450 µg/dL", "80.6 µmol/L"],
  ["500 µg/dL", "89.5 µmol/L"],
];

// Ferritin: ng/mL = µg/L; pmol/L = ng/mL × 2.247.
const FERRITIN_ROWS: [string, string, string][] = [
  ["15 ng/mL", "15 µg/L", "34 pmol/L"],
  ["30 ng/mL", "30 µg/L", "67 pmol/L"],
  ["50 ng/mL", "50 µg/L", "112 pmol/L"],
  ["100 ng/mL", "100 µg/L", "225 pmol/L"],
  ["150 ng/mL", "150 µg/L", "337 pmol/L"],
  ["300 ng/mL", "300 µg/L", "674 pmol/L"],
];

// MedlinePlus adult values (articles 003488/003489 and 003490).
const RANGE_ROWS: [string, string, string, string][] = [
  ["Serum iron", "Men", "59–158 µg/dL", "10.6–28.3 µmol/L"],
  ["Serum iron", "Women", "37–145 µg/dL", "6.6–25.9 µmol/L"],
  ["TIBC", "Men", "171–505 µg/dL", "30.6–90.3 µmol/L"],
  ["TIBC", "Women", "149–492 µg/dL", "26.7–88.0 µmol/L"],
  ["Transferrin saturation", "Men", "20%–50%", "same"],
  ["Transferrin saturation", "Women", "15%–45%", "same"],
  ["Ferritin", "Men", "30–400 ng/mL", "30–400 µg/L"],
  ["Ferritin", "Women", "13–150 ng/mL", "13–150 µg/L"],
];

/* Row status dot (presentation only). */
function toneOf(band: string): "ok" | "warn" | "bad" {
  if (band === "Within both adult ranges") return "ok";
  return "warn";
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
    name: NAME,
    alternateName: ["Iron Conversion Calculator", "Iron µg/dL to µmol/L Converter", "Iron Converter", "Ferritin Unit Converter"],
    url: URL,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    featureList: [
      "Serum iron µg/dL (mcg/dL) to µmol/L and mg/dL conversion",
      "Serum iron µmol/L to µg/dL conversion",
      "TIBC unit conversion",
      "Ferritin ng/mL, µg/L and pmol/L conversion",
      "Comparison with adult reference ranges for women and men",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "Iron and TIBC: 1 µg/dL = 0.1791 µmol/L (molar mass 55.845 g/mol); Labcorp SI Unit Conversion Table. Ferritin: 1 ng/mL = 1 µg/L = 2.247 pmol/L.",
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

      <main className={t.main}>
        <ToolHero
          slug="iron-unit-converter"
          eyebrow="Iron, TIBC and ferritin — µg/dL, µmol/L, ng/mL"
          title="Iron"
          em="Unit Converter"
          subline="Multiply µg/dL by 0.1791 for µmol/L, or µmol/L by 5.585 for µg/dL: 100 µg/dL is 17.9 µmol/L. Converts TIBC and ferritin too, and explains why serum iron can never be converted into ferritin."
        />

        <div className={t.wrap}>
          <IronConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The iron conversion formula</h2>
              <p className={t.formula}>µmol/L = µg/dL × 0.1791 · µg/dL = µmol/L × 5.585 · mg/dL = µg/dL ÷ 1,000</p>
              <p>
                The factor comes from chemistry, not from a lookup table. Micromoles count atoms and micrograms weigh
                them, and one mole of iron weighs 55.845 grams, so 1 µg/dL (10 µg per liter) is 0.1791 µmol/L.
                Labcorp&apos;s SI conversion table prints the same factor rounded to 0.179, for serum iron and for
                total iron-binding capacity (TIBC). mcg/dL and µg/dL are the same unit written two ways. mg/dL is a
                thousand times larger, which is why iron almost never appears in it: 100 µg/dL is just 0.100 mg/dL.
              </p>
              <p>
                A note on rounding: this page keeps one decimal in µmol/L and whole numbers in µg/dL. Because labs
                use 0.179 or 0.1791 and round differently, a converted value can sit 0.1 µmol/L or 1 µg/dL away from
                the number on a printout. That gap is rounding, not a different result.
              </p>

              <h2>Iron conversion chart: µg/dL to µmol/L</h2>
              <p>
                The right-hand column compares each value with the adult serum iron values MedlinePlus lists, 37 to
                145 µg/dL for women and 59 to 158 µg/dL for men.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Serum iron in µg/dL converted to µmol/L and mg/dL, 25 to 200 µg/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Iron in µg/dL (mcg/dL)</th>
                      <th scope="col" className={t.colHead}>µmol/L</th>
                      <th scope="col" className={t.colHead}>mg/dL</th>
                      <th scope="col" className={t.colHead}>Where that sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {IRON_ROWS.map(([from, to, mg, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cell}>{mg}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Iron µmol/L to µg/dL: the reverse chart</h2>
              <p>
                Labs in the UK, Europe, Canada and Australia report iron in µmol/L, while most US articles quote
                µg/dL. Use this direction to read one against the other.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Serum iron in µmol/L converted to µg/dL, 5 to 30 µmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Iron in µmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in µg/dL</th>
                      <th scope="col" className={t.colHead}>Where that sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UMOL_ROWS.map(([from, to, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>TIBC and ferritin units</h2>
              <p>
                TIBC converts with exactly the same factor as iron. Ferritin is simpler still: ng/mL and µg/L are the
                same number, so 50 ng/mL is 50 µg/L. A few labs report ferritin in pmol/L, where 1 ng/mL is 2.247
                pmol/L.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>TIBC in µg/dL converted to µmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>TIBC in µg/dL</th>
                      <th scope="col" className={t.colHead}>µmol/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TIBC_ROWS.map(([from, to]) => (
                      <tr key={from}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Ferritin in ng/mL, µg/L and pmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Ferritin in ng/mL</th>
                      <th scope="col" className={t.colHead}>µg/L</th>
                      <th scope="col" className={t.colHead}>pmol/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FERRITIN_ROWS.map(([from, ugl, pmol]) => (
                      <tr key={from}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{ugl}</td>
                        <td className={t.cell}>{pmol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Can you convert iron to ferritin?</h2>
              <p>
                No, and it is the most common mix-up behind searches for an iron-to-ferritin conversion. Serum iron and
                ferritin are two different tests that measure two different things. Serum iron is the iron
                circulating in your blood, bound to transferrin, at the moment of the draw. Ferritin is a storage
                protein; the small amount in blood reflects how much iron you have in reserve. A person can have a
                normal serum iron with nearly empty stores, or a high ferritin from inflammation with little usable
                iron. There is no factor that turns one number into the other, and any calculator that claims to is
                guessing. The difference is covered in{" "}
                <Link href="/blog/ferritin-vs-iron-saturation">ferritin versus iron saturation</Link>.
              </p>

              <h2>Iron plus TIBC gives transferrin saturation</h2>
              <p>
                What you can calculate from serum iron is transferrin saturation (TSAT): serum iron divided by TIBC,
                times 100. Both must be in the same unit, which is why converting first matters if your report mixes
                them. A serum iron of 90 µg/dL with a TIBC of 350 µg/dL gives a saturation of about 26%. MedlinePlus
                lists 20% to 50% for men and 15% to 45% for women. The{" "}
                <Link href="/tools/transferrin-saturation-calculator">transferrin saturation calculator</Link> does the
                division for you and explains each band. It accepts iron and TIBC in µmol/L as well, so a report in SI units goes straight in without converting first.
              </p>

              <h2>Normal iron, TIBC and ferritin ranges in US and SI units</h2>
              <p>
                These are the adult values MedlinePlus lists as common measurements. Ranges vary by laboratory and
                method, so the range printed on your own report is the one that applies to your result.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Adult iron panel reference values by sex (MedlinePlus)</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Test</th>
                      <th scope="col" className={t.colHead}>Sex</th>
                      <th scope="col" className={t.colHead}>US units</th>
                      <th scope="col" className={t.colHead}>SI units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RANGE_ROWS.map(([test, sex, us, si]) => (
                      <tr key={`${test}-${sex}`}>
                        <th scope="row" className={t.rowHead}>{test}</th>
                        <td className={t.cell}>{sex}</td>
                        <td className={t.cell}>{us}</td>
                        <td className={t.cell}>{si}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>What your iron numbers may suggest</h2>
              <p>
                <strong>Serum iron moves a lot.</strong> It is typically higher in the morning, rises for hours after a
                meal or an iron supplement, and drops during infection or inflammation. A single value is a snapshot,
                which is why a fasting morning draw is the one worth comparing over time.
              </p>
              <p>
                <strong>Low iron with high TIBC</strong> is the pattern most associated with low iron stores: the body
                makes more transferrin when iron is scarce, so TIBC rises while saturation falls. Low ferritin usually
                confirms it. Fatigue can start before anemia does, the situation described in{" "}
                <Link href="/blog/low-ferritin-normal-hemoglobin">low ferritin with normal hemoglobin</Link>.
              </p>
              <p>
                <strong>Low iron with low or normal TIBC</strong> and a normal or high ferritin is more often
                associated with inflammation, where iron is held back in storage rather than missing.
              </p>
              <p>
                <strong>High iron with high saturation</strong>{" "}may follow a recent supplement, but if it persists on a
                fasting draw it can suggest iron overload, and clinicians may look further. None of these patterns is a
                diagnosis on its own: if your values sit outside your lab&apos;s range, or have changed from earlier
                panels, talk to your clinician before starting or stopping iron.
              </p>
              <p>
                For the rest of the panel, the{" "}
                <Link href="/tools/mmol-to-mg-dl-converter">mmol/L to mg/dL converter</Link> handles glucose,
                cholesterol and other markers, and the{" "}
                <Link href="/blog/blood-test-results-normal-range-chart">blood test normal range chart</Link> puts
                iron and ferritin next to every other common marker.
              </p>
              <p>
                Already have your bloodwork?{" "}
                <a href="https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-iron-unit-converter&mt=8">Merios</a>{" "}
                reads it next to your Apple Watch data, so a ferritin trend sits beside the training load, sleep and
                resting heart rate around it. The lab-report scan is part of Merios Plus ($44/year, 3-day free trial on
                the annual plan); the Daily is free. iPhone, iOS 15.1 or later.
              </p>
            </div>

            <div className={t.faq} data-rv="">
              <h2 className={t.faqTitle}>Frequently asked questions</h2>
              <ToolFaq items={FAQ_ITEMS} />
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={t.ctaQuote}>
                  One iron curve, <em>whatever unit each lab used.</em>
                </p>
                <p className={t.ctaText}>
                  Already have your bloodwork? Merios reads it next to your watch data, keeping iron, TIBC and
                  ferritin on one scale whether a report used µg/dL or µmol/L, beside the training and sleep data
                  around each draw.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=iron-unit-converter" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/tools/transferrin-saturation-calculator" className="btn btn-ghost-night">
                  Transferrin saturation calculator →
                </Link>
              </div>
              <CtaScreen screen="compare" />
            </div>

            <p className={`${t.reference} ${t.sources}`}>
              References: MedlinePlus, <em>Serum iron test</em> and <em>Total iron binding capacity</em>, U.S.
              National Library of Medicine. · MedlinePlus, <em>Ferritin blood test</em>. · Labcorp, <em>SI Unit
              Conversion Table</em>. · GlobalRPh, <em>Conventional Units – International Units</em>. · Educational
              tool, not a diagnosis; interpret any result with the reference range printed on your own report and with
              your clinician.
            </p>
          </section>

          <ToolRelated slug="iron-unit-converter" />
        </div>
      </main>
      <Footer />
    </>
  );
}
