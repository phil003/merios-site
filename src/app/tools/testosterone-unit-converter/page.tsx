import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import TestosteroneConverter from "@/components/calculators/TestosteroneConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const TITLE = "Testosterone Converter (ng/dL to nmol/L)";
const DESCRIPTION =
  "Convert total testosterone between ng/dL and nmol/L. Exact factor (1 nmol/L = 28.84 ng/dL), a full table, and where your number sits for adult men.";
const URL = "https://merios.life/tools/testosterone-unit-converter";

const FAQ_ITEMS = [
  { q: "How do you convert testosterone from ng/dL to nmol/L?", a: "Divide by 28.84, or multiply by 0.0347. A total testosterone of 450 ng/dL is 15.6 nmol/L, and 300 ng/dL is 10.4 nmol/L. The factor is exact because it comes from the molar mass of testosterone, 288.4 grams per mole." },
  { q: "How do you convert testosterone from nmol/L to ng/dL?", a: "Multiply by 28.84. A result of 10 nmol/L is 288 ng/dL, 15 nmol/L is 433 ng/dL and 20 nmol/L is 577 ng/dL. Labs in the UK, Canada, Australia and most of Europe report nmol/L, US labs report ng/dL." },
  { q: "What is 450 ng/dL of testosterone in nmol/L?", a: "15.6 nmol/L. For an adult man that sits in the middle of the CDC-harmonized reference range of 264 to 916 ng/dL (9.2 to 31.8 nmol/L) and above the 300 ng/dL cut-off the American Urological Association uses to define low testosterone." },
  { q: "What testosterone level is considered low in nmol/L?", a: "The Endocrine Society recommends the harmonized lower limit of 264 ng/dL, which is 9.2 nmol/L, and the American Urological Association uses 300 ng/dL, which is 10.4 nmol/L. Both bodies require two morning measurements and symptoms before calling testosterone low, so one number is not a diagnosis." },
  { q: "How do you convert free testosterone units?", a: "Free testosterone is reported in much smaller units. 1 ng/dL is 10 pg/mL, and 1 pg/mL is 3.467 pmol/L, so a free testosterone of 9 ng/dL is 90 pg/mL or 312 pmol/L. If your report only gives total testosterone, the free fraction can be estimated from total testosterone, SHBG and albumin." },
  { q: "Does Merios store these numbers?", a: "No. The converter runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

// ng/dL -> nmol/L (divide by 28.84), one decimal. Bands are for adult men.
const NGDL_ROWS: [string, string, string][] = [
  ["200 ng/dL", "6.9 nmol/L", "Below the harmonized range"],
  ["250 ng/dL", "8.7 nmol/L", "Below the harmonized range"],
  ["264 ng/dL", "9.2 nmol/L", "Harmonized lower limit"],
  ["300 ng/dL", "10.4 nmol/L", "AUA low-testosterone cut-off"],
  ["350 ng/dL", "12.1 nmol/L", "Within the reference range"],
  ["400 ng/dL", "13.9 nmol/L", "Within the reference range"],
  ["450 ng/dL", "15.6 nmol/L", "Within the reference range"],
  ["500 ng/dL", "17.3 nmol/L", "Within the reference range"],
  ["600 ng/dL", "20.8 nmol/L", "Within the reference range"],
  ["700 ng/dL", "24.3 nmol/L", "Within the reference range"],
  ["800 ng/dL", "27.7 nmol/L", "Within the reference range"],
  ["916 ng/dL", "31.8 nmol/L", "Harmonized upper limit"],
  ["1,000 ng/dL", "34.7 nmol/L", "Above the reference range"],
];

// nmol/L -> ng/dL (multiply by 28.84), whole numbers.
const NMOL_ROWS: [string, string, string][] = [
  ["5 nmol/L", "144 ng/dL", "Below the harmonized range"],
  ["8 nmol/L", "231 ng/dL", "Below the harmonized range"],
  ["10 nmol/L", "288 ng/dL", "Borderline"],
  ["12 nmol/L", "346 ng/dL", "Within the reference range"],
  ["15 nmol/L", "433 ng/dL", "Within the reference range"],
  ["20 nmol/L", "577 ng/dL", "Within the reference range"],
  ["25 nmol/L", "721 ng/dL", "Within the reference range"],
  ["30 nmol/L", "865 ng/dL", "Within the reference range"],
  ["35 nmol/L", "1,009 ng/dL", "Above the reference range"],
];

function toneOf(band: string): "ok" | "warn" | "bad" {
  if (band === "Below the harmonized range") return "bad";
  if (band === "Within the reference range" || band === "Harmonized upper limit" || band === "AUA low-testosterone cut-off") return "ok";
  return "warn";
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
      "ng/dL to nmol/L conversion",
      "nmol/L to ng/dL conversion",
      "Reference tables for both directions",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "Testosterone: 1 nmol/L = 28.84 ng/dL (molar mass 288.4 g/mol).",
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
        eyebrow="Testosterone — ng/dL and nmol/L"
        title="Testosterone converter: ng/dL to nmol/L"
        subline="450 on a US report, 15.6 on a European one, and it is the same level. Convert total testosterone exactly, in either direction, and see where it sits."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <TestosteroneConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>The conversion, in one line</h2>
              <p>
                To go from nmol/L to ng/dL, multiply by 28.84. To go from ng/dL to nmol/L, divide by 28.84 (or multiply
                by 0.0347). The factor is fixed: one mole of testosterone weighs 288.4 grams, so a count of molecules
                and a weight of them are locked together. If you need it in your head, dividing ng/dL by 29 gets you
                within about half a percent (450 ng/dL comes out at 15.5 instead of 15.6).
              </p>

              <h2>ng/dL to nmol/L: the reference table</h2>
              <p>
                The right-hand column is for adult men and uses two published lines: the CDC-harmonized reference range
                of 264 to 916 ng/dL, derived from healthy non-obese men aged 19 to 39 and recommended by the Endocrine
                Society, and the 300 ng/dL cut-off the American Urological Association uses to define low testosterone.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Total testosterone in ng/dL converted to nmol/L, adult men</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Testosterone in ng/dL</th>
                      <th scope="col" className={t.colHead}>Same level in nmol/L</th>
                      <th scope="col" className={t.colHead}>Where that sits (men)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NGDL_ROWS.map(([from, to, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>nmol/L to ng/dL: the same table in reverse</h2>
              <p>
                For results from labs in the UK, Canada, Australia or most of Europe, read against articles and
                guidelines that quote ng/dL.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Total testosterone in nmol/L converted to ng/dL, adult men</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Testosterone in nmol/L</th>
                      <th scope="col" className={t.colHead}>Same level in ng/dL</th>
                      <th scope="col" className={t.colHead}>Where that sits (men)</th>
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

              <h2>Total, free and bioavailable: three different numbers</h2>
              <p>
                Most reports give <strong>total testosterone</strong>, which is what this converter handles. Most of it
                is bound to SHBG and albumin; only about 2 percent circulates free. When SHBG is high, a normal-looking
                total can hide a low free fraction, and when SHBG is low the opposite happens. That is why the{" "}
                <Link href="/tools/free-testosterone-calculator">free testosterone calculator</Link> asks for SHBG and
                albumin as well, and why{" "}
                <Link href="/blog/free-testosterone-vs-total-testosterone">free versus total testosterone</Link> is
                worth understanding before reading too much into a single total.
              </p>
              <p>
                Bioavailable testosterone is the free fraction plus the part loosely bound to albumin, which can still
                reach tissues; routine panels rarely report it, but the free testosterone calculator estimates it.
              </p>
              <p>
                Free testosterone comes in smaller units: 1 ng/dL is 10 pg/mL, and 1 pg/mL is 3.467 pmol/L. So a free
                testosterone of 9 ng/dL is 90 pg/mL, or about 312 pmol/L.
              </p>

              <h2>Before you read anything into one number</h2>
              <p>
                Testosterone peaks in the morning and is measurably lower by late afternoon, especially in younger men,
                and it falls with poor sleep, acute illness, heavy training blocks and weight gain. Both the Endocrine
                Society and the American Urological Association ask for at least two early-morning measurements, along
                with symptoms, before calling testosterone low. What a level around 400 means in practice is covered in{" "}
                <Link href="/blog/testosterone-400-normal">testosterone at 400 ng/dL</Link>, and how ranges shift with
                age in <Link href="/blog/testosterone-levels-by-age">testosterone levels by age</Link>.
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
                  Two reports, two units, one testosterone curve.
                </p>
                <p className={t.ctaText}>
                  Merios reads the units off each report you upload and keeps every marker on one scale, so a result in
                  nmol/L and one in ng/dL sit on the same line, next to your sleep and training data from Apple Health.
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
              References: Travison TG, Vesper HW, Orwoll E, et al.{" "}
              <em>
                Harmonized reference ranges for circulating testosterone levels in men of four cohort studies in the
                United States and Europe.
              </em>{" "}
              J Clin Endocrinol Metab 2017;102(4):1161-1173. · Bhasin S, Brito JP, Cunningham GR, et al.{" "}
              <em>Testosterone therapy in men with hypogonadism: an Endocrine Society clinical practice guideline.</em>{" "}
              J Clin Endocrinol Metab 2018;103(5):1715-1744. · Mulhall JP, Trost LW, Brannigan RE, et al.{" "}
              <em>Evaluation and management of testosterone deficiency: AUA guideline.</em> J Urol 2018;200(2):423-432. ·
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
