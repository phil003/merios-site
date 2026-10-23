import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import CholesterolConverter from "@/components/calculators/CholesterolConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const TITLE = "Cholesterol Converter (mg/dL to mmol/L)";
const DESCRIPTION =
  "Convert total, LDL, HDL and non-HDL cholesterol, triglycerides and ApoB between mg/dL, mmol/L and g/L, with the right factor for each marker.";
const URL = "https://merios.life/tools/cholesterol-unit-converter";

const FAQ_ITEMS = [
  { q: "How do you convert cholesterol from mmol/L to mg/dL?", a: "Multiply by 38.67. This works for total, LDL, HDL and non-HDL cholesterol: an LDL of 3.0 mmol/L is 116 mg/dL and a total cholesterol of 5.2 mmol/L is 201 mg/dL. To go the other way, divide mg/dL by 38.67." },
  { q: "How do you convert triglycerides from mmol/L to mg/dL?", a: "Multiply by 88.57, not by 38.67. Triglycerides have their own factor because a triglyceride molecule is more than twice as heavy as a cholesterol molecule. A triglyceride level of 1.7 mmol/L is 151 mg/dL; using the cholesterol factor by mistake would give 66, a completely different result." },
  { q: "How do you convert ApoB from g/L to mg/dL?", a: "Multiply by 100. ApoB is reported by mass in both systems, so 0.9 g/L is 90 mg/dL and 1.3 g/L is 130 mg/dL. No molar mass is involved." },
  { q: "What is a normal LDL in mmol/L?", a: "In the US categories, an LDL below 100 mg/dL (2.6 mmol/L) is optimal and 100 to 129 mg/dL (2.6 to 3.3 mmol/L) near optimal. European guidelines set an LDL goal of below 3.0 mmol/L (116 mg/dL) for people at low risk. People at high cardiovascular risk are given lower targets, typically below 1.8 or 1.4 mmol/L (70 or 55 mg/dL)." },
  { q: "Can I convert Lp(a) the same way?", a: "No. Lp(a) is the one lipid marker with no exact conversion between mg/dL and nmol/L, because the size of the Lp(a) particle varies from person to person. It needs its own converter, which returns a range." },
  { q: "Does Merios store these numbers?", a: "No. The converter runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

// Total / LDL / HDL / non-HDL cholesterol: mg/dL = mmol/L x 38.67.
const CHOL_ROWS: [string, string][] = [
  ["1.0 mmol/L", "39 mg/dL"],
  ["1.4 mmol/L", "54 mg/dL"],
  ["1.8 mmol/L", "70 mg/dL"],
  ["2.0 mmol/L", "77 mg/dL"],
  ["2.6 mmol/L", "101 mg/dL"],
  ["3.0 mmol/L", "116 mg/dL"],
  ["3.4 mmol/L", "131 mg/dL"],
  ["4.0 mmol/L", "155 mg/dL"],
  ["4.9 mmol/L", "189 mg/dL"],
  ["5.2 mmol/L", "201 mg/dL"],
  ["6.2 mmol/L", "240 mg/dL"],
  ["7.0 mmol/L", "271 mg/dL"],
];

// Triglycerides: mg/dL = mmol/L x 88.57.
const TG_ROWS: [string, string, string][] = [
  ["0.5 mmol/L", "44 mg/dL", "Normal"],
  ["1.0 mmol/L", "89 mg/dL", "Normal"],
  ["1.5 mmol/L", "133 mg/dL", "Normal"],
  ["1.7 mmol/L", "151 mg/dL", "Borderline high"],
  ["2.0 mmol/L", "177 mg/dL", "Borderline high"],
  ["2.3 mmol/L", "204 mg/dL", "High"],
  ["3.0 mmol/L", "266 mg/dL", "High"],
  ["5.0 mmol/L", "443 mg/dL", "High"],
  ["5.7 mmol/L", "505 mg/dL", "Very high"],
];

// ApoB: mg/dL = g/L x 100.
const APOB_ROWS: [string, string, string][] = [
  ["0.65 g/L", "65 mg/dL", "ESC/EAS very-high-risk goal"],
  ["0.80 g/L", "80 mg/dL", "ESC/EAS high-risk goal"],
  ["0.90 g/L", "90 mg/dL", "NLA threshold at borderline-to-intermediate risk"],
  ["1.00 g/L", "100 mg/dL", "ESC/EAS moderate-risk goal"],
  ["1.30 g/L", "130 mg/dL", "US risk-enhancing factor (2018 AHA/ACC)"],
];

function tgTone(band: string): "ok" | "warn" | "bad" {
  if (band === "Normal") return "ok";
  if (band === "Borderline high") return "warn";
  return "bad";
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
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
      "Total, LDL, HDL and non-HDL cholesterol: mg/dL and mmol/L",
      "Triglycerides: mg/dL and mmol/L, with their own factor",
      "ApoB: mg/dL and g/L",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "Cholesterol: 1 mmol/L = 38.67 mg/dL. Triglycerides: 1 mmol/L = 88.57 mg/dL. ApoB: 1 g/L = 100 mg/dL.",
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
        eyebrow="Lipids — mg/dL, mmol/L and g/L"
        title="Cholesterol converter: mg/dL to mmol/L"
        subline="Your LDL, HDL, triglycerides and ApoB in the other unit system, each with its own factor, because the one most converters use for everything is wrong for triglycerides."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <CholesterolConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>Three factors, not one</h2>
              <p>
                Converting a lipid panel takes three different numbers. Total, LDL, HDL and non-HDL cholesterol all
                measure cholesterol, so they share one factor: multiply mmol/L by 38.67 to get mg/dL. Triglycerides are
                a different molecule, more than twice as heavy, so the factor is 88.57. ApoB is a protein usually
                reported by weight in both systems, so it only moves the decimal point: g/L times 100 is mg/dL.
              </p>
              <p>
                The common mistake is to run triglycerides through the cholesterol factor. A triglyceride level of 1.7
                mmol/L is 151 mg/dL, right at the US borderline; with the wrong factor it would come out as 66 mg/dL and
                look reassuringly low. Lp(a) is the one lipid with no exact conversion at all, which is why it has its
                own <Link href="/tools/lpa-unit-converter">Lp(a) converter</Link> that returns a range.
              </p>

              <h2>Cholesterol: mmol/L to mg/dL</h2>
              <p>
                For total, LDL, HDL and non-HDL cholesterol. The values include the targets and cut-offs most often
                quoted in both systems: 1.4 and 1.8 mmol/L (the European LDL goals for very high and high risk), 2.6
                mmol/L (the US optimal LDL line), 4.9 mmol/L (just under the US very-high LDL line of 190 mg/dL) and 5.2
                and 6.2 mmol/L (the US borderline and high lines for total cholesterol).
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Total, LDL, HDL or non-HDL cholesterol, mmol/L converted to mg/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Cholesterol in mmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in mg/dL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CHOL_ROWS.map(([from, to]) => (
                      <tr key={from}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Triglycerides: mmol/L to mg/dL</h2>
              <p>
                With the US categories: normal below 150 mg/dL, borderline high 150 to 199, high 200 to 499, very high
                500 and above. Triglycerides move with your last meal and with alcohol more than any other lipid, so
                compare fasting results with fasting results.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Triglycerides, mmol/L converted to mg/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Triglycerides in mmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in mg/dL</th>
                      <th scope="col" className={t.colHead}>US category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TG_ROWS.map(([from, to, band]) => (
                      <tr key={from} data-tone={tgTone(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>ApoB: g/L to mg/dL</h2>
              <p>
                ApoB counts atherogenic particles rather than the cholesterol they carry, which is why it is
                increasingly used to settle a borderline LDL. The thresholds below come from three bodies that do not
                use the same numbers, so read them as a map of where the lines sit, not as your personal target. More on
                what it measures in <Link href="/blog/apob-heart-disease-risk">ApoB and heart disease risk</Link>.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>ApoB, g/L converted to mg/dL, with the guideline lines</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>ApoB in g/L</th>
                      <th scope="col" className={t.colHead}>Same level in mg/dL</th>
                      <th scope="col" className={t.colHead}>Which line it is</th>
                    </tr>
                  </thead>
                  <tbody>
                    {APOB_ROWS.map(([from, to, band]) => (
                      <tr key={from}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cellText}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Reading the converted number</h2>
              <p>
                Once your result is in familiar units, the categories are only the start. An LDL of 130 mg/dL is read
                differently in a 35-year-old non-smoker than in someone with diabetes, and US and European guidelines
                set different targets for the same person. For specific values, see{" "}
                <Link href="/blog/ldl-130-borderline">LDL at 130 mg/dL</Link>,{" "}
                <Link href="/blog/cholesterol-220-high">total cholesterol at 220</Link> and{" "}
                <Link href="/blog/triglycerides-180-high">triglycerides at 180</Link>; the ratio of the last two to HDL
                is in the <Link href="/blog/triglyceride-hdl-ratio-calculator">triglyceride-to-HDL calculator</Link>.
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
                  Every lipid panel on one scale, whichever lab ran it.
                </p>
                <p className={t.ctaText}>
                  Merios reads the units off each report you upload and keeps every marker on one scale, so a panel in
                  mmol/L and one in mg/dL sit on the same curve instead of looking like two different people.
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
              References: National Cholesterol Education Program (NCEP) Expert Panel.{" "}
              <em>Third Report of the NCEP Expert Panel on Detection, Evaluation, and Treatment of High Blood Cholesterol in Adults (Adult Treatment Panel III).</em>{" "}
              Circulation 2002;106(25):3143-3421. · Grundy SM, Stone NJ, Bailey AL, et al.{" "}
              <em>2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA guideline on the management of blood cholesterol.</em>{" "}
              Circulation 2019;139(25):e1082-e1143. · Mach F, Baigent C, Catapano AL, et al.{" "}
              <em>2019 ESC/EAS guidelines for the management of dyslipidaemias.</em> Eur Heart J 2020;41(1):111-188. ·
              Educational tool, not a diagnosis; interpret any result with the reference range printed on your own
              report and with your physician.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
