import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import VitaminDConverter from "@/components/calculators/VitaminDConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const TITLE = "Vitamin D Converter (ng/mL to nmol/L)";
const DESCRIPTION =
  "Convert 25-OH vitamin D between ng/mL and nmol/L. The factor is exact (1 ng/mL = 2.496 nmol/L), with a full table and what each level means.";
const URL = "https://merios.life/tools/vitamin-d-unit-converter";

const FAQ_ITEMS = [
  { q: "How do you convert vitamin D from ng/mL to nmol/L?", a: "Multiply by 2.496. A 25-hydroxyvitamin D level of 30 ng/mL is 74.9 nmol/L, usually rounded to 75. The factor is exact because it comes from the weight of the vitamin D molecule, so unlike some other blood tests there is no approximation involved." },
  { q: "How do you convert vitamin D from nmol/L to ng/mL?", a: "Divide by 2.496, or multiply by 0.4006. A level of 75 nmol/L is 30 ng/mL, 50 nmol/L is 20 ng/mL and 125 nmol/L is 50 ng/mL. If you only need a quick estimate, dividing by 2.5 gets you within a fraction of a unit." },
  { q: "Is 75 nmol/L the same as 30 ng/mL?", a: "Yes. 75 nmol/L and 30 ng/mL are the same vitamin D level written in two unit systems. US labs report ng/mL, while labs in the UK, Canada, Australia and most of Europe report nmol/L, which is why the same person can see 30 on one report and 75 on another." },
  { q: "What is a normal vitamin D level in nmol/L?", a: "By the Institute of Medicine definition, 50 nmol/L (20 ng/mL) and above is adequate for bone health in nearly everyone, and below 30 nmol/L (12 ng/mL) is associated with deficiency. Levels above 125 nmol/L (50 ng/mL) have been linked to potential adverse effects. UK guidance uses 25 nmol/L as its deficiency threshold. Always read your result against the range on your own report." },
  { q: "Can I convert my vitamin D blood level to IU?", a: "No. IU (international units) measures a dose of vitamin D in a supplement or food, not the concentration in your blood. 1 microgram of vitamin D3 is 40 IU, but there is no fixed link between the IU you take and the ng/mL or nmol/L you end up with: the response varies with body weight, starting level and absorption." },
  { q: "Does this converter work for 1,25-dihydroxyvitamin D?", a: "No. This tool converts 25-hydroxyvitamin D, the standard test for vitamin D status. 1,25-dihydroxyvitamin D is the active hormone, measured in much smaller amounts in pg/mL or pmol/L, and it is not used to judge whether you have enough vitamin D." },
  { q: "Does Merios store these numbers?", a: "No. The converter runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

// ng/mL -> nmol/L (x 2.496), rounded to the nearest whole number.
const NG_ROWS: [string, string, string][] = [
  ["10 ng/mL", "25 nmol/L", "Deficient (UK deficiency line)"],
  ["12 ng/mL", "30 nmol/L", "Deficiency threshold (IOM)"],
  ["15 ng/mL", "37 nmol/L", "Inadequate for some people"],
  ["20 ng/mL", "50 nmol/L", "Adequate (IOM)"],
  ["25 ng/mL", "62 nmol/L", "Adequate (IOM)"],
  ["30 ng/mL", "75 nmol/L", "Sufficient (old Endocrine Society line)"],
  ["40 ng/mL", "100 nmol/L", "Sufficient"],
  ["50 ng/mL", "125 nmol/L", "Upper end of the IOM range"],
  ["60 ng/mL", "150 nmol/L", "Above 50 ng/mL"],
  ["80 ng/mL", "200 nmol/L", "Above 50 ng/mL"],
  ["100 ng/mL", "250 nmol/L", "Top of most lab ranges"],
  ["150 ng/mL", "374 nmol/L", "Toxicity reported above this"],
];

// nmol/L -> ng/mL (divide by 2.496), one decimal.
const NMOL_ROWS: [string, string, string][] = [
  ["25 nmol/L", "10.0 ng/mL", "Deficient (UK deficiency line)"],
  ["30 nmol/L", "12.0 ng/mL", "Deficiency threshold (IOM)"],
  ["40 nmol/L", "16.0 ng/mL", "Inadequate for some people"],
  ["50 nmol/L", "20.0 ng/mL", "Adequate (IOM)"],
  ["60 nmol/L", "24.0 ng/mL", "Adequate (IOM)"],
  ["75 nmol/L", "30.0 ng/mL", "Sufficient (old Endocrine Society line)"],
  ["100 nmol/L", "40.1 ng/mL", "Sufficient"],
  ["125 nmol/L", "50.1 ng/mL", "Upper end of the IOM range"],
  ["150 nmol/L", "60.1 ng/mL", "Above 50 ng/mL"],
  ["200 nmol/L", "80.1 ng/mL", "Above 50 ng/mL"],
  ["250 nmol/L", "100.2 ng/mL", "Top of most lab ranges"],
];

/* Row status dot (presentation only), the same bands the converter applies. */
function toneOf(band: string): "ok" | "warn" | "bad" {
  if (band.startsWith("Deficient")) return "bad";
  if (band === "Toxicity reported above this") return "bad";
  if (band === "Deficiency threshold (IOM)" || band === "Inadequate for some people" || band === "Above 50 ng/mL" || band === "Top of most lab ranges") return "warn";
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
      "ng/mL to nmol/L conversion",
      "nmol/L to ng/mL conversion",
      "Reference tables for both directions",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "25-hydroxyvitamin D: 1 ng/mL = 2.496 nmol/L (molar mass approximately 400.6 g/mol).",
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
        eyebrow="Vitamin D — ng/mL and nmol/L"
        title="Vitamin D converter: ng/mL to nmol/L"
        subline="30 on one report, 75 on another, and it is the same result. Convert 25-OH vitamin D in either direction, exactly, and see where the number sits."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <VitaminDConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The conversion, in one line</h2>
              <p>
                To go from ng/mL to nmol/L, multiply by 2.496. To go from nmol/L to ng/mL, divide by 2.496. That factor
                is not an estimate: nanomoles count molecules and nanograms weigh them, and one mole of
                25-hydroxyvitamin D weighs about 400.6 grams, so the two units are locked together. Dividing by 2.5 is a
                fine shortcut in your head, it is off by less than a fifth of a percent.
              </p>
              <p>
                That is the opposite of the situation with Lp(a), where no exact conversion exists because the particle
                itself varies in size from person to person. If you landed here from a cholesterol report, the{" "}
                <Link href="/tools/lpa-unit-converter">Lp(a) converter</Link> explains why that one has to return a
                range.
              </p>

              <h2>ng/mL to nmol/L: the reference table</h2>
              <p>
                The values most people arrive with. The right-hand column uses the same cut-points as the converter
                above: the Institute of Medicine (IOM) bands as summarised by the NIH Office of Dietary Supplements, the
                UK deficiency line, and the 30 ng/mL &ldquo;sufficient&rdquo; threshold from the Endocrine Society&apos;s
                2011 guideline.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>25-OH vitamin D in ng/mL converted to nmol/L, 10 to 150 ng/mL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Vitamin D in ng/mL</th>
                      <th scope="col" className={t.colHead}>Same level in nmol/L</th>
                      <th scope="col" className={t.colHead}>Where that sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NG_ROWS.map(([from, to, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>nmol/L to ng/mL: the same table in reverse</h2>
              <p>
                If your lab is in the UK, Canada, Australia or most of Europe, your report is in nmol/L, while most
                articles and supplement advice written in the US quote ng/mL. This is the direction you need to read one
                against the other.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>25-OH vitamin D in nmol/L converted to ng/mL, 25 to 250 nmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Vitamin D in nmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in ng/mL</th>
                      <th scope="col" className={t.colHead}>Where that sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NMOL_ROWS.map(([from, to, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Why the cut-offs disagree</h2>
              <p>
                The unit is the easy part. The harder part is that the people who set the thresholds do not agree on
                them. The IOM, which set the US dietary reference intakes in 2011, considers 20 ng/mL (50 nmol/L) enough
                for bone health in nearly everyone. The Endocrine Society&apos;s 2011 guideline called below 20 ng/mL (50
                nmol/L) &ldquo;deficient&rdquo;, 21 to 29 ng/mL &ldquo;insufficient&rdquo; and 30 ng/mL (75 nmol/L) and
                above &ldquo;sufficient&rdquo;, and many US lab reports still print that 30 to 100 ng/mL range. In 2024 the Society published a new guideline that no longer
                endorses a specific sufficiency level and advises against routine vitamin D testing in healthy adults
                under 75. The UK uses a lower deficiency line again, 25 nmol/L.
              </p>
              <p>
                So a result of 25 ng/mL (62 nmol/L) is &ldquo;adequate&rdquo; by one definition and
                &ldquo;insufficient&rdquo; by another, without anyone being wrong about the arithmetic. What 30 means in
                practice, and what the trials say about going higher, is covered in{" "}
                <Link href="/blog/vitamin-d-30-low">vitamin D at 30 ng/mL</Link>; a lower result is covered in{" "}
                <Link href="/blog/vitamin-d-level-20">vitamin D at 20 ng/mL</Link>, and the wider picture in{" "}
                <Link href="/blog/vitamin-d-deficiency">vitamin D deficiency</Link>.
              </p>

              <h2>Three conversions that trip people up</h2>
              <p>
                <strong>Blood level versus dose.</strong> IU measures how much vitamin D is in a supplement, not how much
                is in your blood. 1 microgram of vitamin D3 is 40 IU, so 25 micrograms is 1,000 IU, but there is no
                formula from the IU you take to the ng/mL you end up with: the same dose raises levels differently with
                body weight and starting level.
              </p>
              <p>
                <strong>The wrong vitamin D test.</strong> 25-hydroxyvitamin D is the test that measures your status, and
                it is what this converter handles. 1,25-dihydroxyvitamin D is the active hormone, present in a thousand
                times smaller amounts, reported in pg/mL or pmol/L, and it can be normal or even high while you are
                deficient. Its own factor is different (1 pg/mL is about 2.4 pmol/L).
              </p>
              <p>
                <strong>µg/L and ng/mL.</strong> Some reports write µg/L. It is the same quantity as ng/mL, so 30 µg/L
                is 30 ng/mL and 75 nmol/L. No conversion needed.
              </p>
              <p>
                If you are comparing vitamin D with other markers on the same panel, the factors for testosterone,
                glucose, triglycerides, cholesterol, insulin and creatinine are listed in the table at the bottom of the{" "}
                <Link href="/tools/lpa-unit-converter">Lp(a) converter</Link>.
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
                  One vitamin D curve, whatever unit each lab used.
                </p>
                <p className={t.ctaText}>
                  Merios reads the units off each report you upload and keeps every marker on one scale, so a result in
                  nmol/L from one lab and one in ng/mL from another sit on the same line instead of looking like two
                  different people.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access" className="btn btn-lime">
                  Get the app
                </Link>
              </div>
              <CtaPulse />
            </div>

            <p className={`${t.reference} ${t.sources}`}>
              References: Ross AC, Manson JE, Abrams SA, et al.{" "}
              <em>
                The 2011 report on dietary reference intakes for calcium and vitamin D from the Institute of Medicine:
                what clinicians need to know.
              </em>{" "}
              J Clin Endocrinol Metab 2011;96(1):53-58. · Holick MF, Binkley NC, Bischoff-Ferrari HA, et al.{" "}
              <em>Evaluation, treatment, and prevention of vitamin D deficiency: an Endocrine Society clinical practice guideline.</em>{" "}
              J Clin Endocrinol Metab 2011;96(7):1911-1930. · Demay MB, Pittas AG, Bikle DD, et al.{" "}
              <em>Vitamin D for the prevention of disease: an Endocrine Society clinical practice guideline.</em>{" "}
              J Clin Endocrinol Metab 2024;109(8):1907-1947. · NIH Office of Dietary Supplements,{" "}
              <em>Vitamin D: Fact Sheet for Health Professionals.</em> · Scientific Advisory Committee on Nutrition,{" "}
              <em>Vitamin D and Health</em>, 2016. · Educational tool, not a diagnosis; interpret any result with the
              reference range printed on your own report and with your physician.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
