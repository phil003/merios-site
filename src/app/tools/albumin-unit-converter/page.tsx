import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CtaScreen from "@/components/calculators/tool-page/CtaScreen";
import ToolHero from "@/components/calculators/tool-page/ToolHero";
import ToolFaq from "@/components/calculators/tool-page/ToolFaq";
import ToolRelated from "@/components/calculators/tool-page/ToolRelated";
import AlbuminConverter from "@/components/calculators/AlbuminConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "Albumin Conversion: g/dL to g/L and µmol/L";
const DESCRIPTION =
  "Albumin conversion factor: 1 g/dL = 10 g/L = 150.5 µmol/L. Multiply g/dL by 10 for g/L (4.2 g/dL = 42 g/L), divide g/L by 10 for g/dL. Free converter.";
const URL = "https://merios.life/tools/albumin-unit-converter";
const APP_STORE = "https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-albumin-unit-converter&mt=8";

const FAQ_ITEMS = [
  { q: "What is the albumin conversion factor?", a: "For mass units it is 10: 1 g/dL equals 10 g/L, exactly, and 1 g/dL is also 1,000 mg/dL. For molar units it is about 15.05: 1 g/L of albumin is 15.05 µmol/L and 1 g/dL is 150.5 µmol/L, using a molar mass of 66,438 g/mol for human serum albumin. References that use 66,500 g/mol get 15.04, a difference of about 0.1 percent." },
  { q: "How do you convert albumin from g/dL to g/L?", a: "Multiply by 10. An albumin of 4.2 g/dL is 42 g/L, 3.5 g/dL is 35 g/L and 3.0 g/dL is 30 g/L. A deciliter is a tenth of a liter, so the same amount of protein per liter is ten times the number per deciliter. Nothing about the molecule is involved, so the factor is exact." },
  { q: "How do you convert albumin from g/L to g/dL?", a: "Divide by 10. An albumin of 40 g/L is 4.0 g/dL, 34 g/L is 3.4 g/dL and 28 g/L is 2.8 g/dL. If you are entering a UK or European result into a US calculator, this is the step most often missed: 40 entered as g/dL would be ten times too high." },
  { q: "How do you convert albumin from µmol/L to g/dL?", a: "Divide by 150.5. An albumin of 600 µmol/L is about 3.99 g/dL and 650 µmol/L is about 4.32 g/dL. To get g/L instead, divide µmol/L by 15.05. Because the factor depends on the molar mass the lab assumed, expect the last digit to differ slightly between references." },
  { q: "How do you convert albumin from g/L or mg/L to mg/dL?", a: "For blood albumin, 1 g/L is 100 mg/dL, so 42 g/L is 4,200 mg/dL. For mg/L, divide by 10: 30 mg/L is 3 mg/dL. Blood albumin is almost never printed in mg/dL, though. Results in mg/L are usually urine albumin, a different test read on a different scale." },
  { q: "What is a normal albumin level in g/L?", a: "MedlinePlus lists a normal range of 3.4 to 5.4 g/dL, which is 34 to 54 g/L. Many labs print a tighter range, around 3.5 to 5.0 g/dL (35 to 50 g/L). Ranges vary by lab and method, so read your result against the range printed on your own report." },
  { q: "Does Merios store these numbers?", a: "No. The converter runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

// g/dL -> g/L (x 10) -> µmol/L (x 150.5, molar mass 66,438 g/mol), whole numbers.
const GDL_ROWS: [string, string, string, string][] = [
  ["2.0 g/dL", "20 g/L", "301 µmol/L", "Well below the usual range"],
  ["2.5 g/dL", "25 g/L", "376 µmol/L", "Below the usual range"],
  ["3.0 g/dL", "30 g/L", "452 µmol/L", "Below the usual range"],
  ["3.4 g/dL", "34 g/L", "512 µmol/L", "Lower limit (MedlinePlus)"],
  ["3.5 g/dL", "35 g/L", "527 µmol/L", "Lower limit at many labs"],
  ["4.0 g/dL", "40 g/L", "602 µmol/L", "Within the usual range"],
  ["4.3 g/dL", "43 g/L", "647 µmol/L", "Within the usual range"],
  ["4.5 g/dL", "45 g/L", "677 µmol/L", "Within the usual range"],
  ["5.0 g/dL", "50 g/L", "753 µmol/L", "Upper limit at many labs"],
  ["5.4 g/dL", "54 g/L", "813 µmol/L", "Upper limit (MedlinePlus)"],
  ["6.0 g/dL", "60 g/L", "903 µmol/L", "Above the usual range"],
];

// µmol/L -> g/dL (divide by 150.5), two decimals.
const UMOL_ROWS: [string, string, string][] = [
  ["400 µmol/L", "2.66 g/dL", "Below the usual range"],
  ["450 µmol/L", "2.99 g/dL", "Below the usual range"],
  ["500 µmol/L", "3.32 g/dL", "Below the usual range"],
  ["550 µmol/L", "3.65 g/dL", "Within the usual range"],
  ["600 µmol/L", "3.99 g/dL", "Within the usual range"],
  ["650 µmol/L", "4.32 g/dL", "Within the usual range"],
  ["700 µmol/L", "4.65 g/dL", "Within the usual range"],
  ["750 µmol/L", "4.98 g/dL", "Within the usual range"],
  ["800 µmol/L", "5.32 g/dL", "Within the usual range"],
];

/* Row status dot (presentation only), the same bands the converter applies. */
function toneOf(band: string): "ok" | "warn" | "bad" {
  if (band.startsWith("Well below")) return "bad";
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
      "g/dL to g/L conversion",
      "g/L to g/dL conversion",
      "g/dL and g/L to µmol/L conversion",
      "mg/dL and mg/L readout",
      "Reference tables for both directions",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation:
      "Albumin: 1 g/dL = 10 g/L; 1 g/L = 15.05 µmol/L (human serum albumin, molar mass 66,438 g/mol, UniProt P02768).",
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

      <main className={t.main}>
        <ToolHero
          slug="albumin-unit-converter"
          eyebrow="Albumin — g/dL, g/L and µmol/L"
          title="Albumin conversion:"
          em="g/dL to g/L and µmol/L"
          subline="Conversion factor 10: multiply g/dL by 10 to get g/L, or divide g/L by 10 to get g/dL. 4.2 g/dL and 42 g/L are the same result on two reports. For µmol/L, 1 g/dL is about 150.5."
        />

        <div className={t.wrap}>
          <AlbuminConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The conversion, in one line</h2>
              <p>
                To go from g/dL to g/L, multiply by 10. To go from g/L to g/dL, divide by 10. That factor is exact: a
                deciliter is a tenth of a liter, so 4.2 grams of albumin in every deciliter is 42 grams in every liter.
                The same logic gives mg/dL (multiply g/dL by 1,000) and mg/L (multiply g/L by 1,000), although blood
                albumin is almost never reported in either.
              </p>
              <p>
                US labs print albumin in g/dL, usually around 4. Labs in the UK, Europe, Australia and many other
                countries print g/L, usually around 40. Both describe the same amount of protein, which is why a result
                of 42 on one report and 4.2 on another can be identical.
              </p>

              <h2>g/dL to g/L and µmol/L: the reference table</h2>
              <p>
                The values people most often arrive with. The right-hand column uses the same reference points as the
                converter above: the 3.4 to 5.4 g/dL normal range MedlinePlus lists, and the tighter 3.5 to 5.0 g/dL range
                many labs print. µmol/L is rounded to the nearest whole number.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Albumin in g/dL converted to g/L and µmol/L, 2.0 to 6.0 g/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Albumin in g/dL</th>
                      <th scope="col" className={t.colHead}>Same level in g/L</th>
                      <th scope="col" className={t.colHead}>In µmol/L</th>
                      <th scope="col" className={t.colHead}>Where that sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GDL_ROWS.map(([from, gl, umol, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{gl}</td>
                        <td className={t.cell}>{umol}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>µmol/L to g/dL: the same table in reverse</h2>
              <p>
                A few labs, and many research papers, report albumin as a molar concentration. Divide µmol/L by 150.5 to
                get g/dL, or by 15.05 to get g/L.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Albumin in µmol/L converted to g/dL, 400 to 800 µmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Albumin in µmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in g/dL</th>
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

              <h2>Why µmol/L depends on the molar mass</h2>
              <p>
                Grams weigh albumin; micromoles count its molecules. To turn one into the other you divide by the weight
                of one mole of albumin, and references do not all use the same figure. The mature human serum albumin
                chain has 585 amino acids (UniProt entry P02768). From its sequence it weighs 66,472 daltons, and 66,438
                once its 17 disulfide bonds are formed. This page uses 66,438 g/mol, which gives 1 g/L = 15.05 µmol/L
                and 1 g/dL = 150.5 µmol/L.
              </p>
              <p>
                Many references round to 66,500 g/mol (15.04 µmol/L per g/L), and some texts quote about 69,000, close to the
                69,367 daltons of the unprocessed precursor listed in the same UniProt entry, which gives about 14.5. The gap between 66,438 and 66,500 is about 0.1 percent,
                far smaller than the day-to-day variation in albumin itself, but it explains why two converters can
                disagree in the last digit. The g/dL to g/L factor has no such uncertainty.
              </p>

              <h2>Which calculators need albumin, and in which unit</h2>
              <p>
                <strong>PhenoAge uses g/L.</strong> Levine&apos;s biological age formula was fitted with albumin in g/L,
                so a US result in g/dL is multiplied by 10 first. The{" "}
                <Link href="/tools/phenoage-calculator">PhenoAge calculator</Link> does that step for you.
              </p>
              <p>
                <strong>Corrected calcium uses g/dL (or g/L in SI units).</strong> The usual US formula adds 0.8 mg/dL of
                calcium for every 1 g/dL that albumin sits below 4.0 g/dL; the SI version uses 40 g/L. Mixing the two
                units gives a corrected calcium that is badly wrong, so check the unit before you enter it in the{" "}
                <Link href="/tools/corrected-calcium-calculator">corrected calcium calculator</Link>.
              </p>
              <p>
                <strong>Free testosterone takes g/dL or g/L.</strong> The Vermeulen equation works internally in moles
                per liter, using a molar mass for albumin. The{" "}
                <Link href="/tools/free-testosterone-calculator">free testosterone calculator</Link> accepts either unit
                and converts it; entering 43 as g/dL instead of g/L is the most common way to get a plausible but wrong
                answer.
              </p>

              <h2>What a low or high albumin is associated with</h2>
              <p>
                Albumin is the main protein in blood plasma, made by the liver. MedlinePlus lists a normal range of 3.4 to
                5.4 g/dL (34 to 54 g/L); many labs print 3.5 to 5.0 g/dL. The range on your own report is the one that
                applies to your result.
              </p>
              <p>
                A <strong>low albumin</strong> is associated with liver disease, kidney disease, inflammation and poor
                nutrient intake or absorption. A <strong>high albumin</strong> is uncommon and most often reflects
                dehydration; it can also follow a tourniquet left on too long during the blood draw. Neither is a
                diagnosis by itself: albumin is read alongside the rest of the panel, and a result outside the range is
                worth discussing with your clinician. To see albumin next to the other markers of a standard panel, use
                the <Link href="/blog/blood-test-results-normal-range-chart">blood test normal range chart</Link>.
              </p>

              <h2>Two mix-ups to avoid</h2>
              <p>
                <strong>Blood versus urine.</strong> This converter handles serum or plasma albumin. Urine albumin
                (microalbumin) and the urine albumin-to-creatinine ratio (UACR) are separate kidney tests, reported in
                mg/L or mg/g of creatinine, with their own cut-offs. Do not convert a urine result here.
              </p>
              <p>
                <strong>Albumin versus total protein.</strong> Total protein (around 6 to 8 g/dL) includes albumin and
                the globulins. It converts the same way, g/dL × 10 = g/L, but it is a different result and should not be
                entered as albumin. For the other markers on the same report, the{" "}
                <Link href="/tools/mmol-to-mg-dl-converter">mmol/L to mg/dL converter</Link> covers glucose,
                cholesterol, triglycerides and more.
              </p>
              <p>
                Already have your bloodwork? <a href={APP_STORE}>Merios</a> reads your lab reports next to your Apple
                Health and Apple Watch data, across 160+ biomarkers. The lab-report scan is part of Merios Plus
                ($44/year); the Daily is free. iPhone, iOS 15.1 or later.
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
                  One albumin curve, <em>whatever unit each lab used.</em>
                </p>
                <p className={t.ctaText}>
                  Merios reads the units off each report you upload and keeps every marker on one scale, so a result in
                  g/L from one lab and one in g/dL from another sit on the same line instead of looking ten times apart.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=albumin-unit-converter" className="btn btn-lime">
                  Get the app
                </Link>
              </div>
              <CtaScreen screen="compare" />
            </div>

            <p className={`${t.reference} ${t.sources}`}>
              References: MedlinePlus, <em>Albumin blood (serum) test</em>, U.S. National Library of Medicine. ·
              UniProt, <em>P02768 · ALBU_HUMAN, Albumin</em> (mature chain, residues 25-609). · Educational tool, not a
              diagnosis; interpret any result with the reference range printed on your own report and with your
              physician.
            </p>
          </section>

          <ToolRelated slug="albumin-unit-converter" />
        </div>
      </main>
      <Footer />
    </>
  );
}
