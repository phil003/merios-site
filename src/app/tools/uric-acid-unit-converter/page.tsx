import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import UricAcidConverter from "@/components/calculators/UricAcidConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const TITLE = "Uric Acid Conversion: mg/dL to µmol/L";
const DESCRIPTION =
  "Convert uric acid between mg/dL, µmol/L and mmol/L (1 mg/dL = 59.48 µmol/L), with tables in both directions and what 6, 6.8 and 7 mg/dL mean.";
const URL = "https://merios.life/tools/uric-acid-unit-converter";

const FAQ_ITEMS = [
  { q: "How do you convert uric acid from mg/dL to µmol/L?", a: "Multiply by 59.48. A uric acid level of 6 mg/dL is 356.9 µmol/L, usually rounded to 357. The factor comes from the molar mass of uric acid, 168.11 g/mol. Many labs and quick references round it to 59.5 or 60, which is why you will also see 6 mg/dL written as 360 µmol/L." },
  { q: "How do you convert uric acid from µmol/L to mg/dL?", a: "Divide by 59.48, or multiply by 0.0168. A level of 360 µmol/L is 6.05 mg/dL, 300 µmol/L is 5.04 mg/dL and 420 µmol/L is 7.06 mg/dL. Dividing by 60 in your head gets you within about one percent." },
  { q: "How do you convert uric acid from mmol/L to mg/dL?", a: "Multiply by 1,000 to get µmol/L, then divide by 59.48. In one step, multiply mmol/L by 16.81. A result of 0.36 mmol/L is 6.05 mg/dL, and 0.42 mmol/L is 7.06 mg/dL. mmol/L and µmol/L are the same scale, a factor of 1,000 apart." },
  { q: "Is 360 µmol/L the same as 6 mg/dL?", a: "Almost. Exactly, 360 µmol/L is 6.05 mg/dL and 6 mg/dL is 356.9 µmol/L. Gout guidelines and many labs treat 360 µmol/L and 6 mg/dL as the same threshold because they round the factor to 60. The difference is well within normal lab variation." },
  { q: "What is a normal uric acid level in µmol/L?", a: "It depends on the lab, your sex and the assay. MedlinePlus lists normal values of 3.0 to 7.1 mg/dL for women (about 180 to 420 µmol/L) and 4.0 to 8.6 mg/dL for men (about 240 to 510 µmol/L), while other labs print upper limits closer to 6.0 and 7.2 mg/dL. Always read your result against the range on your own report." },
  { q: "What uric acid level is considered high?", a: "Above about 6.8 mg/dL (405 µmol/L), urate exceeds its solubility in body fluids, which is the most common definition of hyperuricemia. Separately, gout guidelines from the American College of Rheumatology and EULAR aim for below 6 mg/dL (360 µmol/L) in people treated for gout. A high result is associated with gout and kidney stones but does not by itself mean you have either; discuss it with your clinician." },
  { q: "Does Merios store these numbers?", a: "No. The converter runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

// mg/dL -> µmol/L (x 59.48), rounded to the nearest whole number.
const MG_ROWS: [string, string, string][] = [
  ["1 mg/dL", "59 µmol/L", "Below most lab ranges"],
  ["2 mg/dL", "119 µmol/L", "Low end, uncommon below this"],
  ["3 mg/dL", "178 µmol/L", "Within usual adult ranges"],
  ["4 mg/dL", "238 µmol/L", "Within usual adult ranges"],
  ["5 mg/dL", "297 µmol/L", "Severe gout target line (EULAR)"],
  ["6 mg/dL", "357 µmol/L", "Gout treat-to-target line (ACR, EULAR)"],
  ["6.8 mg/dL", "404 µmol/L", "Urate saturation point"],
  ["7 mg/dL", "416 µmol/L", "Above saturation"],
  ["8 mg/dL", "476 µmol/L", "Above saturation"],
  ["9 mg/dL", "535 µmol/L", "Above most lab ranges"],
  ["10 mg/dL", "595 µmol/L", "Above most lab ranges"],
  ["12 mg/dL", "714 µmol/L", "Above most lab ranges"],
];

// µmol/L -> mg/dL (divide by 59.48), two decimals.
const UMOL_ROWS: [string, string, string][] = [
  ["120 µmol/L", "2.02 mg/dL", "Low end, uncommon below this"],
  ["180 µmol/L", "3.03 mg/dL", "Within usual adult ranges"],
  ["240 µmol/L", "4.03 mg/dL", "Within usual adult ranges"],
  ["300 µmol/L", "5.04 mg/dL", "Severe gout target line (EULAR)"],
  ["360 µmol/L", "6.05 mg/dL", "Gout treat-to-target line (ACR, EULAR)"],
  ["400 µmol/L", "6.72 mg/dL", "Close to saturation"],
  ["405 µmol/L", "6.81 mg/dL", "Urate saturation point"],
  ["420 µmol/L", "7.06 mg/dL", "Above saturation"],
  ["480 µmol/L", "8.07 mg/dL", "Above saturation"],
  ["540 µmol/L", "9.08 mg/dL", "Above most lab ranges"],
  ["600 µmol/L", "10.09 mg/dL", "Above most lab ranges"],
];

/* Row status dot (presentation only), the same bands the converter applies. */
function toneOf(band: string): "ok" | "warn" | "bad" {
  if (band === "Above most lab ranges") return "bad";
  if (band === "Below most lab ranges" || band.startsWith("Low end") || band.startsWith("Urate") || band.startsWith("Above") || band.startsWith("Close")) return "warn";
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
      "mmol/L to mg/dL conversion",
      "Reference tables for both directions",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "Uric acid: 1 mg/dL = 59.48 µmol/L (molar mass 168.11 g/mol).",
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
        eyebrow="Uric acid — mg/dL, µmol/L and mmol/L"
        title="Uric acid conversion: mg/dL to µmol/L"
        subline="6 on one report, 357 on another, and it is the same result. Convert uric acid in any direction, including mmol/L, and see where the number sits."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <UricAcidConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The conversion, in one line</h2>
              <p>
                To go from mg/dL to µmol/L, multiply by 59.48. To go from µmol/L to mg/dL, divide by 59.48. For mmol/L,
                move the decimal point three places: 357 µmol/L is 0.357 mmol/L. The factor is not an estimate. Micromoles
                count molecules and milligrams weigh them, and one mole of uric acid weighs 168.11 grams, so 1 mg/dL (10
                mg per liter) works out to 59.48 µmol/L.
              </p>
              <p>
                In practice you will see rounder numbers. Many labs, guidelines and quick-reference cards use 59.5 or 60,
                which is why 6 mg/dL and 360 µmol/L are treated as the same line. The gap is under one percent, smaller
                than the day-to-day variation in uric acid itself, so it never changes how a result is read.
              </p>

              <h2>mg/dL to µmol/L: the reference table</h2>
              <p>
                The values people most often arrive with. The right-hand column uses the same reference points as the
                converter above: the gout treat-to-target lines from the American College of Rheumatology (2020) and
                EULAR (2016), the urate saturation point, and the upper end of commonly printed lab ranges.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Uric acid in mg/dL converted to µmol/L, 1 to 12 mg/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Uric acid in mg/dL</th>
                      <th scope="col" className={t.colHead}>Same level in µmol/L</th>
                      <th scope="col" className={t.colHead}>Where that sits</th>
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
                If your lab is in the UK, Europe, Australia or much of Asia, your report is in µmol/L (or mmol/L, the same
                number divided by 1,000), while most articles written in the US quote mg/dL. This is the direction you
                need to read one against the other.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Uric acid in µmol/L converted to mg/dL, 120 to 600 µmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Uric acid in µmol/L</th>
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

              <h2>What the thresholds mean</h2>
              <p>
                <strong>Lab reference ranges.</strong> These describe where most healthy people fall, and they vary by
                lab, sex and assay. MedlinePlus currently lists 3.0 to 7.1 mg/dL for women and 4.0 to 8.6 mg/dL for men;
                many labs print tighter limits closer to 6.0 mg/dL for women and 7.2 mg/dL for men. Levels tend to rise in
                women after menopause. The range printed on your own report is the one that applies to your result.
              </p>
              <p>
                <strong>About 6.8 mg/dL (405 µmol/L).</strong> Above this concentration, urate exceeds its solubility in
                body fluids and crystals can form. It is the most common definition of hyperuricemia. Many people above it
                never develop gout, but the risk of gout and kidney stones is associated with how high and how long the
                level stays raised.
              </p>
              <p>
                <strong>6 mg/dL (360 µmol/L) and 5 mg/dL (300 µmol/L).</strong> These are treatment targets, not
                diagnostic cut-offs. For people on urate-lowering therapy for gout, the American College of Rheumatology
                2020 guideline and the EULAR 2016 recommendations aim for below 6 mg/dL, and EULAR aims for below 5 mg/dL
                in severe gout, such as when tophi are present. Those targets are set by the treating clinician.
              </p>
              <p>
                <strong>Below about 2 mg/dL (120 µmol/L).</strong> Low uric acid is uncommon. It can reflect medication,
                diet or how the kidneys handle urate, and it is usually read alongside the rest of the panel.
              </p>
              <p>
                What a raised result is associated with beyond gout, from blood pressure to metabolic and kidney risk, is
                covered in <Link href="/blog/uric-acid-levels-high">high uric acid levels</Link>. Because the kidneys clear
                most of the body&apos;s urate, it is often read next to{" "}
                <Link href="/blog/creatinine-1-2-normal">creatinine</Link> and{" "}
                <Link href="/blog/cystatin-c-kidney-function">cystatin C</Link>.
              </p>

              <h2>Two mix-ups to avoid</h2>
              <p>
                <strong>Blood versus urine.</strong> This converter handles serum or plasma uric acid. A 24-hour urine
                uric acid test is reported as a daily amount (mg per 24 hours or mmol per 24 hours) and is read on a
                completely different scale.
              </p>
              <p>
                <strong>µmol/L versus mmol/L.</strong> Some reports print 0.36 mmol/L instead of 360 µmol/L. They are
                the same value, a factor of 1,000 apart, so 0.36 mmol/L is about 6 mg/dL, not 0.006. If you are converting
                other markers from the same panel, the{" "}
                <Link href="/tools/cholesterol-unit-converter">cholesterol converter</Link> covers mg/dL and mmol/L for
                lipids, and the table at the bottom of the{" "}
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
                  One uric acid curve, whatever unit each lab used.
                </p>
                <p className={t.ctaText}>
                  Merios reads the units off each report you upload and keeps every marker on one scale, so a result in
                  µmol/L from one lab and one in mg/dL from another sit on the same line instead of looking like two
                  different people.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=uric-acid-unit-converter" className="btn btn-lime">
                  Get the app
                </Link>
              </div>
              <CtaPulse />
            </div>

            <p className={`${t.reference} ${t.sources}`}>
              References: FitzGerald JD, Dalbeth N, Mikuls T, et al.{" "}
              <em>2020 American College of Rheumatology Guideline for the Management of Gout.</em>{" "}
              Arthritis Care Res 2020;72(6):744-760. · Richette P, Doherty M, Pascual E, et al.{" "}
              <em>2016 updated EULAR evidence-based recommendations for the management of gout.</em>{" "}
              Ann Rheum Dis 2017;76(1):29-42. · MedlinePlus, <em>Uric acid - blood</em>, U.S. National Library of
              Medicine. · Educational tool, not a diagnosis; interpret any result with the reference range printed on
              your own report and with your physician.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
