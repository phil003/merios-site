import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import BilirubinConverter from "@/components/calculators/BilirubinConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const TITLE = "Bilirubin Conversion: mg/dL to µmol/L";
const DESCRIPTION =
  "Convert bilirubin between mg/dL and µmol/L (1 mg/dL = 17.1 µmol/L), with tables in both directions and what 1.2, 2 and 3 mg/dL mean for adult results.";
const URL = "https://merios.life/tools/bilirubin-unit-converter";

const FAQ_ITEMS = [
  { q: "How do you convert bilirubin from mg/dL to µmol/L?", a: "Multiply by 17.1. A total bilirubin of 1.2 mg/dL is 20.5 µmol/L, and 2 mg/dL is 34.2 µmol/L. The factor comes from the molar mass of bilirubin, 584.66 g/mol, which gives 17.104 µmol/L per mg/dL. Most labs and references round it to 17.1." },
  { q: "How do you convert bilirubin from µmol/L to mg/dL?", a: "Divide by 17.1, or multiply by 0.0585. A level of 17 µmol/L is 0.99 mg/dL, 34 µmol/L is 1.99 mg/dL and 51 µmol/L is 2.98 mg/dL. Dividing by 17 in your head gets you within about one percent." },
  { q: "Is 20 µmol/L bilirubin normal?", a: "For total bilirubin in an adult, usually yes. 20 µmol/L is 1.17 mg/dL, and MedlinePlus lists a normal total bilirubin of 0.1 to 1.2 mg/dL, or 1.71 to 20.5 µmol/L. The range on your own report is the one that applies." },
  { q: "What bilirubin level causes jaundice?", a: "MedlinePlus notes that a blood bilirubin level of about 2.0 mg/dL (34 µmol/L) can cause jaundice, the yellowing of the skin and the whites of the eyes. It becomes more obvious as the level rises. Jaundice is a sign, not a diagnosis, and a new yellow tint is worth raising with a clinician promptly." },
  { q: "Is the conversion factor different for direct and total bilirubin?", a: "No. Direct (conjugated), indirect (unconjugated) and total bilirubin all convert with the same factor, 17.1, because the molecule being counted is the same. What differs is the reference range: MedlinePlus lists direct bilirubin as less than 0.3 mg/dL, or less than 5.1 µmol/L." },
  { q: "Can I use this converter for a newborn's bilirubin?", a: "The unit math is the same, so it will convert a newborn result correctly. It does not interpret it. Newborn jaundice is read on charts that depend on the baby's age in hours, gestational age and risk factors, as set out in the American Academy of Pediatrics 2022 guideline. Your baby's care team reads those levels." },
  { q: "Does Merios store these numbers?", a: "No. The converter runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

// mg/dL -> µmol/L (x 17.104), one decimal.
const MG_ROWS: [string, string, string][] = [
  ["0.1 mg/dL", "1.7 µmol/L", "Lower end of the usual adult range"],
  ["0.3 mg/dL", "5.1 µmol/L", "Usual range (upper limit for direct)"],
  ["0.5 mg/dL", "8.6 µmol/L", "Within the usual adult range"],
  ["0.8 mg/dL", "13.7 µmol/L", "Within the usual adult range"],
  ["1.0 mg/dL", "17.1 µmol/L", "Within the usual adult range"],
  ["1.2 mg/dL", "20.5 µmol/L", "Upper limit of the usual adult range"],
  ["1.5 mg/dL", "25.7 µmol/L", "Mildly above the range"],
  ["2 mg/dL", "34.2 µmol/L", "Mildly above, jaundice can appear"],
  ["3 mg/dL", "51.3 µmol/L", "Well above the range"],
  ["5 mg/dL", "85.5 µmol/L", "Well above the range"],
  ["10 mg/dL", "171.0 µmol/L", "Well above the range"],
  ["15 mg/dL", "256.6 µmol/L", "Well above the range"],
  ["20 mg/dL", "342.1 µmol/L", "Well above the range"],
];

// µmol/L -> mg/dL (divide by 17.104), two decimals.
const UMOL_ROWS: [string, string, string][] = [
  ["2 µmol/L", "0.12 mg/dL", "Lower end of the usual adult range"],
  ["5 µmol/L", "0.29 mg/dL", "Usual range (upper limit for direct)"],
  ["10 µmol/L", "0.58 mg/dL", "Within the usual adult range"],
  ["17 µmol/L", "0.99 mg/dL", "Within the usual adult range"],
  ["20.5 µmol/L", "1.20 mg/dL", "Upper limit of the usual adult range"],
  ["25 µmol/L", "1.46 mg/dL", "Mildly above the range"],
  ["34 µmol/L", "1.99 mg/dL", "Mildly above, jaundice can appear"],
  ["51 µmol/L", "2.98 mg/dL", "Mildly above, close to 3 mg/dL"],
  ["85 µmol/L", "4.97 mg/dL", "Well above the range"],
  ["171 µmol/L", "10.00 mg/dL", "Well above the range"],
  ["256 µmol/L", "14.97 mg/dL", "Well above the range"],
  ["342 µmol/L", "20.00 mg/dL", "Well above the range"],
];

/* Row status dot (presentation only), the same bands the converter applies. */
function toneOf(band: string): "ok" | "warn" | "bad" {
  if (band.startsWith("Well above")) return "bad";
  if (band.startsWith("Mildly")) return "warn";
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
      "mg/dL to µmol/L conversion",
      "µmol/L to mg/dL conversion",
      "Reference tables for both directions",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "Bilirubin: 1 mg/dL = 17.1 µmol/L (molar mass 584.66 g/mol).",
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
        eyebrow="Bilirubin — mg/dL and µmol/L"
        title="Bilirubin conversion: mg/dL to µmol/L"
        subline="1.2 on one report, 20.5 on another, and it is the same result. Convert total or direct bilirubin in either direction and see where the number sits."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <BilirubinConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The conversion, in one line</h2>
              <p>
                To go from mg/dL to µmol/L, multiply by 17.1. To go from µmol/L to mg/dL, divide by 17.1. The factor is
                not an estimate. Micromoles count molecules and milligrams weigh them, and one mole of bilirubin weighs
                584.66 grams, so 1 mg/dL (10 mg per liter) works out to 17.104 µmol/L.
              </p>
              <p>
                In practice everyone uses 17.1, and some quick references round to 17. The gap is well under one
                percent, smaller than the day-to-day variation in bilirubin itself, so it never changes how a result is
                read. The same factor applies to total, direct and indirect bilirubin.
              </p>

              <h2>mg/dL to µmol/L: the reference table</h2>
              <p>
                The values people most often arrive with. The right-hand column uses the same adult reference points as
                the converter above: the MedlinePlus range for total bilirubin (0.1 to 1.2 mg/dL), the upper limit for
                direct bilirubin (0.3 mg/dL), and the level around which jaundice can appear.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Total bilirubin in mg/dL converted to µmol/L, 0.1 to 20 mg/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Bilirubin in mg/dL</th>
                      <th scope="col" className={t.colHead}>Same level in µmol/L</th>
                      <th scope="col" className={t.colHead}>Where that sits (adults)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MG_ROWS.map(([from, to, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>µmol/L to mg/dL: the same table in reverse</h2>
              <p>
                If your lab is in the UK, Europe, Australia or much of Asia, your report is in µmol/L, while most articles
                written in the US quote mg/dL. This is the direction you need to read one against the other.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Total bilirubin in µmol/L converted to mg/dL, 2 to 342 µmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Bilirubin in µmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in mg/dL</th>
                      <th scope="col" className={t.colHead}>Where that sits (adults)</th>
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

              <h2>What the thresholds mean</h2>
              <p>
                <strong>Total bilirubin, 0.1 to 1.2 mg/dL (1.71 to 20.5 µmol/L).</strong> This is the normal adult range
                MedlinePlus lists, and most labs print something close to it. Ranges vary slightly between labs, so the
                one printed on your own report is the one that applies to your result.
              </p>
              <p>
                <strong>Direct bilirubin, under 0.3 mg/dL (5.1 µmol/L).</strong> Direct, or conjugated, bilirubin is the
                form the liver has already processed for excretion into bile. A raised direct fraction is more often
                associated with a liver or bile-flow problem, which is why it is read next to{" "}
                <Link href="/blog/alt-level-40-high">ALT</Link>, AST, ALP and{" "}
                <Link href="/blog/ggt-levels-high-meaning">GGT</Link>.
              </p>
              <p>
                <strong>Mildly above the range, 1.2 to 3 mg/dL (20.5 to 51 µmol/L).</strong> A mild rise that is mostly
                indirect is often seen with Gilbert syndrome, an inherited trait that MedlinePlus Genetics estimates
                affects 3 to 7 percent of Americans. It is generally a mild condition, and levels tend to go up with fasting,
                dehydration, illness or intense exercise. Other causes are possible, so a result in this band is worth
                reviewing with a clinician.
              </p>
              <p>
                <strong>About 2 mg/dL (34 µmol/L) and above.</strong> MedlinePlus notes that a level of about 2.0 mg/dL
                can cause jaundice, a yellow tint to the skin and the whites of the eyes. At 3 mg/dL (51 µmol/L) and
                above, a result is well beyond the usual range and can be associated with liver, bile duct or red blood
                cell conditions. Review it with your clinician promptly.
              </p>
              <p>
                <strong>Newborns are different.</strong> Newborn jaundice is common, and it is not read against the adult
                range. The American Academy of Pediatrics 2022 guideline sets thresholds by the baby&apos;s age in hours,
                gestational age and risk factors, using hour-specific charts. This converter changes the unit of a newborn
                result but does not interpret it; that is the job of the baby&apos;s care team.
              </p>
              <p>
                Where bilirubin sits on a full panel, next to the other liver markers, is shown in the{" "}
                <Link href="/blog/blood-test-results-normal-range-chart">blood test normal range chart</Link>.
              </p>

              <h2>Two mix-ups to avoid</h2>
              <p>
                <strong>Total versus direct and indirect.</strong> Many reports print total and direct bilirubin, and
                some add indirect. Indirect bilirubin is usually calculated rather than measured: total minus direct. A
                total of 1.5 mg/dL with a direct of 0.2 mg/dL means an indirect of 1.3 mg/dL. Compare each line with its
                own range, not with the total range.
              </p>
              <p>
                <strong>mg/dL versus mg/L.</strong> A deciliter is a tenth of a liter, so 1.2 mg/dL is 12 mg/L. If a
                number looks ten times too high, check which unit the report uses before converting. If you are converting
                other markers from the same panel, the{" "}
                <Link href="/tools/uric-acid-unit-converter">uric acid converter</Link> covers mg/dL and µmol/L for urate,
                and the table at the bottom of the{" "}
                <Link href="/tools/lpa-unit-converter">Lp(a) converter</Link> lists factors for glucose, triglycerides,
                creatinine and more.
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
                  One bilirubin curve, whatever unit each lab used.
                </p>
                <p className={t.ctaText}>
                  Merios reads the units off each report you upload and keeps every marker on one scale, so a result in
                  µmol/L from one lab and one in mg/dL from another sit on the same line instead of looking like two
                  different people.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=bilirubin-unit-converter" className="btn btn-lime">
                  Get the app
                </Link>
              </div>
              <CtaPulse />
            </div>

            <p className={`${t.reference} ${t.sources}`}>
              References: MedlinePlus, <em>Bilirubin blood test</em>, U.S. National Library of Medicine. · MedlinePlus
              Genetics, <em>Gilbert syndrome</em>, U.S. National Library of Medicine. · Kemper AR, Newman TB, Slaughter
              JL, et al.{" "}
              <em>Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More
              Weeks of Gestation.</em>{" "}
              Pediatrics 2022;150(3):e2022058859. · Educational tool, not a diagnosis; interpret any result with the
              reference range printed on your own report and with your physician.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
