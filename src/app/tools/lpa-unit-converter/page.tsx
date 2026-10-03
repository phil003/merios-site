import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import LpaConverter from "@/components/calculators/LpaConverter";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const FAQ_ITEMS = [
  { q: "How do you convert Lp(a) from nmol/L to mg/dL?", a: "There is no exact conversion, and any calculator giving you a single number is overstating its precision. The two units measure different things: mg/dL is the mass of the particle and nmol/L is the number of particles, and apo(a) particle size varies between individuals. Commonly used approximations divide nmol/L by somewhere between 2.15 and 2.5, which is why this tool returns a range." },
  { q: "How do you convert mg/dL to nmol/L?", a: "Multiply by somewhere between 2.15 and 2.5. An Lp(a) of 50 mg/dL works out to roughly 108 to 125 nmol/L. The same caveat applies in this direction: the factor is a population average applied to one person, not a fixed constant." },
  { q: "What is 125 nmol/L of Lp(a) in mg/dL?", a: "Roughly 50 to 58 mg/dL. Those two numbers, 125 nmol/L and 50 mg/dL, are the values most guidelines quote for elevated Lp(a), which is why they are often treated as equivalent. That pairing comes from how the threshold was defined in each unit rather than from an exact conversion between them." },
  { q: "What Lp(a) level is considered high?", a: "The thresholds most often cited are roughly 125 nmol/L or 50 mg/dL, with an intermediate zone below that. Guidelines differ, and because the unit conversion is imprecise the two thresholds do not map onto each other perfectly. Interpret against the reference range printed on your own report." },
  { q: "Does the same nmol/L to mg/dL factor work for other blood tests?", a: "No. Every other analyte has a fixed factor set by its molecular weight: 25-OH vitamin D in nmol/L divides by about 2.5 to give ng/mL, total testosterone in nmol/L multiplies by 28.84 to give ng/dL, glucose in mmol/L multiplies by 18.02 to give mg/dL. Lp(a) is the exception, because the quantity that varies is the mass of the particle itself. The conversion table on this page covers the markers most often reported in both systems." },
  { q: "Why did my Lp(a) change between two tests?", a: "Most often it did not. Lp(a) is largely genetically determined and stable across adult life, so a different number between two labs is more likely to reflect a change in units or assay method than a real biological change. This is the main practical reason to stay with one lab and one unit when tracking it." },
  { q: "Should I retest my Lp(a)?", a: "Usually not. Because the level is inherited and stable, most guidance treats Lp(a) as a once-in-a-lifetime measurement rather than something to monitor. The exception is a clinician-directed retest, for example to confirm an unexpectedly high first result or on a different assay." },
  { q: "Does Merios store these numbers?", a: "No. The converter runs entirely in your browser. Your inputs never leave your device and are not sent to a server." }
];

// nmol/L -> mg/dL, using the two approximations in common use (divide by 2.5
// and by 2.15). Bands follow the thresholds the converter itself applies.
const NMOL_ROWS: [string, string, string][] = [
  ["25 nmol/L", "10.0 - 11.6 mg/dL", "Below common thresholds"],
  ["50 nmol/L", "20.0 - 23.3 mg/dL", "Below common thresholds"],
  ["75 nmol/L", "30.0 - 34.9 mg/dL", "Start of the intermediate zone"],
  ["100 nmol/L", "40.0 - 46.5 mg/dL", "Intermediate"],
  ["125 nmol/L", "50.0 - 58.1 mg/dL", "The commonly cited threshold"],
  ["150 nmol/L", "60.0 - 69.8 mg/dL", "Elevated"],
  ["200 nmol/L", "80.0 - 93.0 mg/dL", "Elevated"],
  ["250 nmol/L", "100.0 - 116.3 mg/dL", "Elevated"],
  ["300 nmol/L", "120.0 - 139.5 mg/dL", "Elevated"],
  ["400 nmol/L", "160.0 - 186.0 mg/dL", "Elevated"],
];

// mg/dL -> nmol/L, the same approximations run the other way (x2.15 to x2.5).
const MGDL_ROWS: [string, string, string][] = [
  ["10 mg/dL", "22 - 25 nmol/L", "Below common thresholds"],
  ["20 mg/dL", "43 - 50 nmol/L", "Below common thresholds"],
  ["30 mg/dL", "65 - 75 nmol/L", "Start of the intermediate zone"],
  ["40 mg/dL", "86 - 100 nmol/L", "Intermediate"],
  ["50 mg/dL", "108 - 125 nmol/L", "The commonly cited threshold"],
  ["60 mg/dL", "129 - 150 nmol/L", "Elevated"],
  ["75 mg/dL", "161 - 188 nmol/L", "Elevated"],
  ["100 mg/dL", "215 - 250 nmol/L", "Elevated"],
  ["150 mg/dL", "323 - 375 nmol/L", "Elevated"],
];

/* Row status dot (presentation only) — the converter's own bands:
   below 75 nmol/L in range, 75–125 intermediate, 125 and above elevated. */
function toneOf(band: string): "ok" | "warn" | "bad" {
  if (band === "Below common thresholds") return "ok";
  if (band === "Start of the intermediate zone" || band === "Intermediate") return "warn";
  return "bad";
}

export const metadata: Metadata = {
  title: "Lp(a) Unit Converter (nmol/L to mg/dL)",
  description:
    "Convert Lp(a) between nmol/L and mg/dL. Returns a range rather than a false single number, because no exact conversion between these units exists.",
  alternates: { canonical: "https://merios.life/tools/lpa-unit-converter" },
  openGraph: {
    title: "Lp(a) Unit Converter (nmol/L to mg/dL)",
    description: "Convert Lp(a) between nmol/L and mg/dL. Returns a range rather than a false single number, because no exact conversion between these units exists.",
    url: "https://merios.life/tools/lpa-unit-converter",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/lpa-unit-converter#tool",
    name: "Lp(a) Unit Converter (nmol/L to mg/dL)",
    url: "https://merios.life/tools/lpa-unit-converter",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: "Convert Lp(a) between nmol/L and mg/dL. Returns a range rather than a false single number, because no exact conversion between these units exists.",
    featureList: [
      "nmol/L to mg/dL conversion",
      "mg/dL to nmol/L conversion",
      "Reference table for both directions",
      "Runs entirely in the browser, no data sent to a server",
    ],
    isAccessibleForFree: true,
    citation: "Lp(a) mass and particle concentration are not interconvertible exactly; apo(a) isoform size varies between individuals.",
    inLanguage: "en",
  };
  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "Lp(a) Unit Converter (nmol/L to mg/dL)", url: "https://merios.life/tools/lpa-unit-converter" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="Lp(a) — nmol/L and mg/dL"
        title="Lp(a) unit converter: nmol/L to mg/dL"
        subline="Two labs, two numbers, one lipoprotein. Convert in either direction and get a range rather than a false single number, because no exact conversion between these units exists."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <LpaConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>Why there is no exact conversion</h2>
              <p>
                This is the part every other converter skips. Milligrams per deciliter measures the total mass of Lp(a)
                in your blood. Nanomoles per litre counts how many Lp(a) particles are there. Converting between them
                requires knowing the mass of one particle — and that is not a constant, because the apo(a) protein comes
                in different sizes from person to person, determined genetically.
              </p>
              <p>
                So a conversion factor is a population average applied to an individual. It gets you in the right
                neighbourhood, which is genuinely useful when you are staring at a number in an unfamiliar unit, but it
                is not a translation. Presenting one decimal place of false precision would be worse than showing the
                range honestly.
              </p>

              <h2>nmol/L to mg/dL: the reference table</h2>
              <p>
                The converter above handles any value you type. The table below covers the reference points most people
                arrive with, using the two approximations in common circulation — dividing by 2.5 at one end and by 2.15
                at the other. Read the span, not either edge.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Lp(a) in nmol/L converted to mg/dL, 25 to 400 nmol/L</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Lp(a) in nmol/L</th>
                      <th scope="col" className={t.colHead}>Approximate mg/dL</th>
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

              <h2>mg/dL to nmol/L: the same table in reverse</h2>
              <p>
                US labs still report Lp(a) in mg/dL, while newer assays and most European labs report nmol/L. If your
                older result is in mg/dL and your new one is not, this is the direction you need — multiply by 2.15 to
                2.5. It is the same approximation, with the same limits.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableRange}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Lp(a) in mg/dL converted to nmol/L, 10 to 150 mg/dL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Lp(a) in mg/dL</th>
                      <th scope="col" className={t.colHead}>Approximate nmol/L</th>
                      <th scope="col" className={t.colHead}>Where that sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MGDL_ROWS.map(([from, to, band]) => (
                      <tr key={from} data-tone={toneOf(band)}>
                        <th scope="row" className={t.rowHead}>{from}</th>
                        <td className={t.cell}>{to}</td>
                        <td className={t.cellNote}>{band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                One consequence worth stating plainly: because the conversion is a range, a result that lands near the
                threshold in one unit can land on the other side of it in the other. An Lp(a) of 120 nmol/L converts to
                roughly 48 to 56 mg/dL — below the 50 mg/dL line, or above it, depending which factor you pick. That is
                a limit of the units, not of the measurement, and it is a reason to read a borderline Lp(a) alongside the
                rest of your cardiovascular picture rather than as a pass or fail.
              </p>

              <h2>Converting other markers between nmol/L, mmol/L and mg/dL</h2>
              <p>
                If you landed here for a different blood test, the good news is that your conversion is exact. Every
                other analyte has a fixed factor, set by its molecular weight — which is precisely what Lp(a) lacks. The
                factors below are the standard ones:
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Standard unit conversions for markers reported in both systems</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Marker</th>
                      <th scope="col" className={t.colHead}>Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" className={t.rowHead}>25-OH vitamin D</th>
                      <td className={t.cellText}>nmol/L divided by 2.496 = ng/mL. A level of 75 nmol/L is 30 ng/mL —{" "}
                        <Link href="/blog/vitamin-d-level-30">what 30 actually means</Link>.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className={t.rowHead}>Total testosterone</th>
                      <td className={t.cellText}>nmol/L multiplied by 28.84 = ng/dL. Feeds the{" "}
                        <Link href="/tools/free-testosterone-calculator">free testosterone calculator</Link>.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className={t.rowHead}>Fasting glucose</th>
                      <td className={t.cellText}>mmol/L multiplied by 18.02 = mg/dL.</td>
                    </tr>
                    <tr>
                      <th scope="row" className={t.rowHead}>Triglycerides</th>
                      <td className={t.cellText}>mmol/L multiplied by 88.57 = mg/dL. Both are inputs to the{" "}
                        <Link href="/tools/tyg-index-calculator">TyG index calculator</Link>.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className={t.rowHead}>Total, LDL and HDL cholesterol</th>
                      <td className={t.cellText}>mmol/L multiplied by 38.67 = mg/dL.</td>
                    </tr>
                    <tr>
                      <th scope="row" className={t.rowHead}>Fasting insulin</th>
                      <td className={t.cellText}>pmol/L divided by 6.00 = µIU/mL, the unit the{" "}
                        <Link href="/tools/homa-ir-calculator">HOMA-IR calculator</Link> expects.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className={t.rowHead}>Creatinine</th>
                      <td className={t.cellText}>µmol/L multiplied by 0.0113 = mg/dL.</td>
                    </tr>
                    <tr>
                      <th scope="row" className={t.rowHead}>Ferritin</th>
                      <td className={t.cellText}>No conversion needed: 1 µg/L and 1 ng/mL are the same quantity.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>What actually matters about Lp(a)</h2>
              <p>
                Lp(a) is an independent, largely inherited cardiovascular risk factor — the fuller picture is in{" "}
                <Link href="/blog/lp-a-lipoprotein-a-high">what a high Lp(a) means</Link>. Because you
                cannot change it much through lifestyle, an elevated result is best read as a reason to be more
                deliberate about the risks you can change:{" "}
                <Link href="/blog/apob-heart-disease-risk">ApoB</Link>, blood pressure, and the rest
                of the{" "}
                <Link href="/blog/how-to-lower-cholesterol-without-medication">modifiable lipid picture</Link>.
                It is also worth knowing that an elevated Lp(a) is a reason for first-degree relatives to be tested.
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
                  Stop converting the same number by hand every time you change labs.
                </p>
                <p className={t.ctaText}>
                  Merios reads the units off each report you upload and keeps every marker on one scale, so a panel in
                  nmol/L and a panel in mg/dL sit on the same curve instead of looking like two different people.
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
              References: Kronenberg F, Mora S, Stroes ESG, et al.{" "}
              <em>
                Lipoprotein(a) in atherosclerotic cardiovascular disease and aortic valve stenosis: a European
                Atherosclerosis Society consensus statement.
              </em>{" "}
              Eur Heart J 2022;43(39):3925-3946. · Marcovina SM, Albers JJ.{" "}
              <em>Lipoprotein (a) measurements for clinical application.</em> J Lipid Res 2016;57(4):526-537. ·
              Tsimikas S. <em>A test in context: lipoprotein(a).</em> J Am Coll Cardiol 2017;69(6):692-711. ·
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
