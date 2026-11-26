import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CtaScreen from "@/components/calculators/tool-page/CtaScreen";
import ToolHero from "@/components/calculators/tool-page/ToolHero";
import ToolFaq from "@/components/calculators/tool-page/ToolFaq";
import ToolRelated from "@/components/calculators/tool-page/ToolRelated";
import CreatinineConverter from "@/components/calculators/CreatinineConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "Creatinine Unit Converter: µmol/L to mg/dL (88.4)";
const NAME = "Creatinine Unit Converter";
const DESCRIPTION =
  "Creatinine conversion factor: 1 mg/dL = 88.4 µmol/L. Divide µmol/L by 88.4 for mg/dL (80 µmol/L = 0.90 mg/dL). Free converter, 0.5-5.0 chart and US/SI ranges.";
const URL = "https://merios.life/tools/creatinine-unit-converter";

const FAQ_ITEMS = [
  { q: "What is the creatinine conversion factor?", a: "88.4. One mg/dL of creatinine equals 88.4 µmol/L, from its molar mass of 113.12 g/mol. Multiply mg/dL by 88.4 to get µmol/L, or divide µmol/L by 88.4 (the same as multiplying by 0.0113) to get mg/dL. For mmol/L, divide µmol/L by 1,000." },
  { q: "How do you convert creatinine from µmol/L to mg/dL?", a: "Divide by 88.4. A creatinine of 80 µmol/L is 0.90 mg/dL, 100 µmol/L is 1.13 mg/dL and 150 µmol/L is 1.70 mg/dL. A quick check in your head: 88 µmol/L is almost exactly 1.0 mg/dL." },
  { q: "How do you convert creatinine from mmol/L to mg/dL?", a: "Multiply by 1,000 to get µmol/L, then divide by 88.4. In one step, multiply mmol/L by 11.31. A result of 0.08 mmol/L is 80 µmol/L, or 0.90 mg/dL. mmol/L and µmol/L are the same scale, a factor of 1,000 apart, so 0.08 mmol/L is not 0.08 mg/dL." },
  { q: "Is there a creatinine conversion chart?", a: "Yes, the chart on this page lists 0.5 to 5.0 mg/dL with the matching µmol/L and mmol/L values, and a reverse table from µmol/L. The values people check most often: 0.7 mg/dL is 62 µmol/L, 1.0 mg/dL is 88 µmol/L, 1.2 mg/dL is 106 µmol/L, 1.5 mg/dL is 133 µmol/L and 2.0 mg/dL is 177 µmol/L." },
  { q: "Does creatine affect creatinine?", a: "It can. Creatine breaks down into creatinine, so creatine supplements may raise serum creatinine without any change in actual kidney function, according to a 2023 review in Nutrients. Mayo Clinic notes you may be asked to stop creatine before the test. Tell your clinician if you take it, especially if your result is above range." },
];

// Mayo Clinic adult reference intervals used for the "Where that sits" column.
// Women 0.59–1.04 mg/dL, men 0.74–1.35 mg/dL. µmol/L rounded to whole numbers.
const MG_ROWS: [string, string, string, string][] = [
  ["0.5 mg/dL", "44 µmol/L", "0.044 mmol/L", "Below both adult ranges"],
  ["0.6 mg/dL", "53 µmol/L", "0.053 mmol/L", "Within the women's range, below the men's"],
  ["0.7 mg/dL", "62 µmol/L", "0.062 mmol/L", "Within the women's range, below the men's"],
  ["0.8 mg/dL", "71 µmol/L", "0.071 mmol/L", "Within both adult ranges"],
  ["0.9 mg/dL", "80 µmol/L", "0.080 mmol/L", "Within both adult ranges"],
  ["1.0 mg/dL", "88 µmol/L", "0.088 mmol/L", "Within both adult ranges"],
  ["1.1 mg/dL", "97 µmol/L", "0.097 mmol/L", "Above the women's range, within the men's"],
  ["1.2 mg/dL", "106 µmol/L", "0.106 mmol/L", "Above the women's range, within the men's"],
  ["1.3 mg/dL", "115 µmol/L", "0.115 mmol/L", "Above the women's range, within the men's"],
  ["1.4 mg/dL", "124 µmol/L", "0.124 mmol/L", "Above both adult ranges"],
  ["1.5 mg/dL", "133 µmol/L", "0.133 mmol/L", "Above both adult ranges"],
  ["1.7 mg/dL", "150 µmol/L", "0.150 mmol/L", "Above both adult ranges"],
  ["2.0 mg/dL", "177 µmol/L", "0.177 mmol/L", "Above both adult ranges"],
  ["2.5 mg/dL", "221 µmol/L", "0.221 mmol/L", "Above both adult ranges"],
  ["3.0 mg/dL", "265 µmol/L", "0.265 mmol/L", "Above both adult ranges"],
  ["3.5 mg/dL", "309 µmol/L", "0.309 mmol/L", "Above both adult ranges"],
  ["4.0 mg/dL", "354 µmol/L", "0.354 mmol/L", "Above both adult ranges"],
  ["5.0 mg/dL", "442 µmol/L", "0.442 mmol/L", "Above both adult ranges"],
];

// µmol/L -> mg/dL (divide by 88.4), two decimals.
const UMOL_ROWS: [string, string, string][] = [
  ["44 µmol/L", "0.50 mg/dL", "Below both adult ranges"],
  ["60 µmol/L", "0.68 mg/dL", "Within the women's range, below the men's"],
  ["70 µmol/L", "0.79 mg/dL", "Within both adult ranges"],
  ["80 µmol/L", "0.90 mg/dL", "Within both adult ranges"],
  ["88 µmol/L", "1.00 mg/dL", "Within both adult ranges"],
  ["100 µmol/L", "1.13 mg/dL", "Above the women's range, within the men's"],
  ["110 µmol/L", "1.24 mg/dL", "Above the women's range, within the men's"],
  ["120 µmol/L", "1.36 mg/dL", "Above both adult ranges"],
  ["133 µmol/L", "1.50 mg/dL", "Above both adult ranges"],
  ["150 µmol/L", "1.70 mg/dL", "Above both adult ranges"],
  ["177 µmol/L", "2.00 mg/dL", "Above both adult ranges"],
  ["200 µmol/L", "2.26 mg/dL", "Above both adult ranges"],
  ["265 µmol/L", "3.00 mg/dL", "Above both adult ranges"],
  ["354 µmol/L", "4.00 mg/dL", "Above both adult ranges"],
  ["442 µmol/L", "5.00 mg/dL", "Above both adult ranges"],
];

// Adult serum creatinine reference intervals as published by each source.
const RANGE_ROWS: [string, string, string, string][] = [
  ["Mayo Clinic", "Men", "0.74–1.35 mg/dL", "65–119 µmol/L"],
  ["Mayo Clinic", "Women", "0.59–1.04 mg/dL", "52–92 µmol/L"],
  ["MedlinePlus (NIH)", "Men", "0.7–1.3 mg/dL", "62–115 µmol/L"],
  ["MedlinePlus (NIH)", "Women", "0.5–0.95 mg/dL", "44–84 µmol/L"],
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
    alternateName: ["Creatinine Conversion Calculator", "Creatinine µmol/L to mg/dL Converter", "Creatinine Converter"],
    url: URL,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    featureList: [
      "µmol/L to mg/dL conversion",
      "mg/dL to µmol/L conversion",
      "mmol/L to mg/dL conversion",
      "Comparison with adult reference ranges for women and men",
      "Conversion chart from 0.5 to 5.0 mg/dL",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "Creatinine: 1 mg/dL = 88.4 µmol/L (molar mass 113.12 g/mol). Labcorp SI Unit Conversion Table.",
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
          slug="creatinine-unit-converter"
          eyebrow="Creatinine — µmol/L, mg/dL and mmol/L"
          title="Creatinine"
          em="Unit Converter"
          subline="Conversion factor 88.4: divide µmol/L by 88.4 to get mg/dL, or multiply mg/dL by 88.4 for µmol/L. 80 µmol/L is 0.90 mg/dL. Works in any direction, with the adult range for women and men."
        />

        <div className={t.wrap}>
          <CreatinineConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The creatinine conversion formula</h2>
              <p className={t.formula}>mg/dL = µmol/L ÷ 88.4 · µmol/L = mg/dL × 88.4 · mmol/L = µmol/L ÷ 1,000</p>
              <p>
                The factor is not an estimate. Micromoles count molecules and milligrams weigh them, and one mole of
                creatinine weighs 113.12 grams, so 1 mg/dL (10 mg per liter) works out to 88.4 µmol/L. Dividing by
                88.4 is the same as multiplying by 0.0113, the inverse factor printed in Labcorp&apos;s SI conversion
                table. For mmol/L, move the decimal point three places: 88 µmol/L is 0.088 mmol/L, and in one step
                mmol/L × 11.31 gives mg/dL.
              </p>

              <h2>Creatinine conversion chart: 0.5 to 5.0 mg/dL</h2>
              <p>
                The values people most often arrive with. The right-hand column compares each value with the adult
                reference ranges Mayo Clinic publishes, 0.59 to 1.04 mg/dL for women and 0.74 to 1.35 mg/dL for men.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Creatinine in mg/dL converted to µmol/L and mmol/L, 0.5 to 5.0 mg/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Creatinine in mg/dL</th>
                      <th scope="col" className={t.colHead}>µmol/L</th>
                      <th scope="col" className={t.colHead}>mmol/L</th>
                      <th scope="col" className={t.colHead}>Where that sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MG_ROWS.map(([from, to, mmol, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cell}>{mmol}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Creatinine µmol/L to mg/dL: the same chart in reverse</h2>
              <p>
                If your lab is in the UK, Europe, Canada, Australia or much of Asia, your report is in µmol/L, while
                most articles and eGFR references written in the US quote mg/dL. This is the direction you need to
                read one against the other.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Creatinine in µmol/L converted to mg/dL, 44 to 442 µmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Creatinine in µmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in mg/dL</th>
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

              <h2>Normal creatinine range in US and SI units</h2>
              <p>
                Reference ranges describe where most healthy adults fall, and they vary by lab, method, sex, age and
                muscle mass. Two widely used public sources print slightly different limits:
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Adult serum creatinine reference ranges by sex</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Source</th>
                      <th scope="col" className={t.colHead}>Sex</th>
                      <th scope="col" className={t.colHead}>US units</th>
                      <th scope="col" className={t.colHead}>SI units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RANGE_ROWS.map(([src, sex, us, si]) => (
                      <tr key={`${src}-${sex}`}>
                        <th scope="row" className={t.rowHead}>{src}</th>
                        <td className={t.cell}>{sex}</td>
                        <td className={t.cell}>{us}</td>
                        <td className={t.cell}>{si}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Women usually run lower than men because they tend to carry less muscle. The range printed on your own
                report is the one that applies to your result. Whether 1.2 mg/dL is fine depends on who you are, which
                is the subject of <Link href="/blog/creatinine-1-2-normal">is a creatinine of 1.2 normal</Link>.
              </p>

              <h2>What moves creatinine besides the kidneys</h2>
              <p>
                Creatinine is a waste product of muscle, made at a fairly steady rate and cleared by the kidneys. That
                makes it a useful filter marker, but an imprecise one, because anything that changes how much is made
                or how concentrated your blood is moves the number too.
              </p>
              <p>
                <strong>Muscle mass.</strong> More muscle means more creatinine. A muscular man may sit above a printed
                range with normal kidneys, while a small or older person with little muscle may look reassuringly low
                even when filtering is reduced.
              </p>
              <p>
                <strong>Creatine supplements.</strong> Creatine breaks down into creatinine, so supplements may raise
                serum creatinine without harming the kidneys, a 2023 review in <em>Nutrients</em> concluded. Mayo Clinic
                notes you may be asked to stop creatine before the test.
              </p>
              <p>
                <strong>Cooked meat.</strong> In a 2016 study of healthy volunteers, meals with cooked meat were
                associated with creatinine rising from about 0.9 to 1.3 mg/dL within hours, which is why Mayo Clinic
                notes you may be asked to avoid meat before the test.
              </p>
              <p>
                <strong>Intense exercise and hydration.</strong> A systematic review of marathon and ultramarathon
                studies found creatinine rose by about 29 µmol/L (0.3 mg/dL) after the race and returned to baseline
                within 48 hours. Dehydration concentrates the blood and can push creatinine up as well. The tips in{" "}
                <Link href="/blog/how-to-prepare-for-blood-test">how to prepare for a blood test</Link> cover both.
              </p>

              <h2>Creatinine is not the whole kidney story: eGFR</h2>
              <p>
                Kidney function is judged by the estimated glomerular filtration rate (eGFR), which your lab calculates
                from creatinine, age and sex. In 2021 the National Kidney Foundation and the American Society of
                Nephrology recommended the race-free CKD-EPI 2021 equation, and more use of{" "}
                <Link href="/blog/cystatin-c-kidney-function">cystatin C</Link>, a marker that does not depend on
                muscle, to confirm the estimate. This page converts units; it does not estimate eGFR. If your creatinine
                is above your lab&apos;s range, or higher than your previous results, talk to your clinician rather than
                reading the number alone.
              </p>
              <p>
                Creatinine is often read next to urea nitrogen: the{" "}
                <Link href="/tools/bun-creatinine-ratio-calculator">BUN/creatinine ratio calculator</Link> accepts
                µmol/L directly. For the other markers on the same panel, the{" "}
                <Link href="/tools/mmol-to-mg-dl-converter">mmol/L to mg/dL converter</Link> covers glucose,
                cholesterol and more, and the <Link href="/tools/uric-acid-unit-converter">uric acid converter</Link>{" "}
                handles the other kidney-cleared marker reported in µmol/L.
              </p>
              <p>
                Already have your bloodwork?{" "}
                <a href="https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-creatinine-converter&mt=8">Merios</a>{" "}
                reads your lab reports next to your Apple Watch data, so a creatinine bump the morning after a long run
                sits beside the workout that explains it. The lab-report scan is part of Merios Plus ($44/year, 3-day
                free trial on the annual plan); the Daily is free. iPhone, iOS 15.1 or later.
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
                  One creatinine curve, <em>whatever unit each lab used.</em>
                </p>
                <p className={t.ctaText}>
                  Merios reads the units off each report you scan and keeps every marker on one scale, so a result in
                  µmol/L from one lab and one in mg/dL from another sit on the same line, next to the training and
                  sleep data that can move them.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=creatinine-unit-converter" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/creatinine-1-2-normal" className="btn btn-ghost-night">
                  Is a creatinine of 1.2 normal? →
                </Link>
              </div>
              <CtaScreen screen="compare" />
            </div>

            <p className={`${t.reference} ${t.sources}`}>
              References: Mayo Clinic, <em>Creatinine test</em>. · MedlinePlus, <em>Creatinine blood test</em>, U.S.
              National Library of Medicine. · Labcorp, <em>SI Unit Conversion Table</em>. · Longobardi I, Gualano B,
              Seguro AC, Roschel H, et al. <em>Is It Time for a Requiem for Creatine Supplementation-Induced Kidney Failure? A
              Narrative Review.</em> Nutrients 2023;15(6):1466. · Pimenta E, Jensen M, Jung D, et al.{" "}
              <em>Effect of Diet on Serum Creatinine in Healthy Subjects During a Phase I Study.</em> J Clin Med Res
              2016;8(11):836-839. · Hodgson LE, Walter E, Venn RM, et al.{" "}
              <em>Acute kidney injury associated with endurance events: is it a cause for concern? A systematic
              review.</em> BMJ Open Sport Exerc Med 2017;3(1):e000093. · National Kidney Foundation and American
              Society of Nephrology, 2021 task force recommendation on eGFR. · Educational tool, not a diagnosis;
              interpret any result with the reference range printed on your own report and with your clinician.
            </p>
          </section>

          <ToolRelated slug="creatinine-unit-converter" />
        </div>
      </main>
      <Footer />
    </>
  );
}
