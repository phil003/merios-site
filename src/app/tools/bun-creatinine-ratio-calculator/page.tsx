import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import BunCreatinineRatioCalculator from "@/components/calculators/BunCreatinineRatioCalculator";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "BUN Creatinine Ratio Calculator: High, Low, Normal";
const NAME = "BUN/Creatinine Ratio Calculator";
const DESCRIPTION =
  "Free BUN creatinine ratio calculator in US or SI units. See where your ratio sits against the usual 10:1 to 20:1 band and what a high or low ratio suggests.";

// Worked BUN/creatinine examples (values checked by hand, one decimal).
const BCR_EXAMPLES: [string, string, string, string][] = [
  ["15 mg/dL", "0.9 mg/dL", "15 ÷ 0.9", "16.7:1 (within the usual band)"],
  ["28 mg/dL", "1.0 mg/dL", "28 ÷ 1.0", "28.0:1 (high ratio, normal creatinine)"],
  ["22 mg/dL", "0.7 mg/dL", "22 ÷ 0.7", "31.4:1 (high ratio, both values in range)"],
  ["8 mg/dL", "1.1 mg/dL", "8 ÷ 1.1", "7.3:1 (low ratio)"],
  ["40 mg/dL", "2.0 mg/dL", "40 ÷ 2.0", "20.0:1 (usual ratio, both values high)"],
  ["5.4 mmol/L urea", "80 µmol/L", "(5.4 × 2.8) ÷ (80 ÷ 88.4)", "16.7:1 (same result from SI units)"],
];

const FAQ_ITEMS = [
  { q: "What is a normal BUN/creatinine ratio?", a: "Many US laboratories and references treat a ratio of roughly 10:1 to 20:1 as the usual band, though there is no single agreed cutoff and some labs print slightly different limits. The ratio is most useful when BUN or creatinine is outside its own range. With both values normal, a ratio a little outside the band is rarely meaningful on its own." },
  { q: "What does a high BUN/creatinine ratio mean?", a: "A ratio above about 20:1 means urea nitrogen is high relative to creatinine. It is classically associated with reduced blood flow to the kidneys, as in dehydration or heart failure, and also with a high-protein diet, bleeding in the upper digestive tract, catabolic states such as fever or infection, and corticosteroid medicines. With a normal creatinine it often reflects hydration or diet. With a raised creatinine it is worth reviewing with a clinician." },
  { q: "What does a low BUN/creatinine ratio mean?", a: "A ratio below about 10:1 is associated with low protein intake, reduced urea production in advanced liver disease, and higher creatinine production from a large muscle mass or muscle breakdown. When both BUN and creatinine are within their ranges, a low ratio is usually not significant by itself." },
  { q: "How do you calculate the BUN/creatinine ratio in SI units?", a: "Convert both values to mg/dL first. Urea in mmol/L times 2.8 gives BUN in mg/dL, and creatinine in µmol/L divided by 88.4 gives creatinine in mg/dL. A urea of 5.4 mmol/L and creatinine of 80 µmol/L become 15.1 and 0.90 mg/dL, a ratio of about 16.7:1. Dividing the SI numbers directly gives a different figure on a different scale." },
  { q: "Does Merios store these numbers?", a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/tools/bun-creatinine-ratio-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/tools/bun-creatinine-ratio-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/bun-creatinine-ratio-calculator#tool",
    name: NAME,
    alternateName: ["BUN Creatinine Ratio Calculator", "B/Cr Ratio Calculator", "Urea Creatinine Ratio Calculator"],
    url: "https://merios.life/tools/bun-creatinine-ratio-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    isAccessibleForFree: true,
    citation: "Hosten AO. BUN and Creatinine. In: Walker HK, Hall WD, Hurst JW, eds. Clinical Methods. 3rd ed. Butterworths; 1990. NCBI Bookshelf NBK305.",
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: NAME, url: "https://merios.life/tools/bun-creatinine-ratio-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="BUN to creatinine — two kidney markers, one ratio"
        title="BUN/Creatinine Ratio Calculator"
        subline="Divide BUN by creatinine, in US or SI units. A high B/Cr ratio with a normal creatinine usually points to hydration or diet rather than the kidneys; this page shows how to tell the difference."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <BunCreatinineRatioCalculator />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>How the BUN/creatinine ratio is calculated</h2>
              <p>
                Both numbers come from the same basic or comprehensive metabolic panel. The ratio is a simple
                division:
              </p>
              <p className={t.formula}>BUN/creatinine ratio = BUN (mg/dL) ÷ creatinine (mg/dL)</p>
              <p>
                A BUN of 15 with a creatinine of 0.9 gives 16.7, usually written 16.7:1. Outside the US, reports
                often give urea in mmol/L and creatinine in µmol/L. Convert first: urea in mmol/L times 2.8 gives
                BUN in mg/dL, because each millimole of urea carries 28 mg of nitrogen, and creatinine in µmol/L
                divided by 88.4 gives mg/dL. If your report gives urea in mg/dL rather than urea nitrogen, divide it
                by 2.14 to get BUN. Some UK and European labs print a urea-to-creatinine ratio from the SI numbers;
                that is a different scale and cannot be compared with the 10:1 to 20:1 band.
              </p>

              <h2>BUN/creatinine ratio: worked examples</h2>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>BUN/creatinine ratio calculated from metabolic panel values</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>BUN</th>
                      <th scope="col" className={t.colHead}>Creatinine</th>
                      <th scope="col" className={t.colHead}>Calculation</th>
                      <th scope="col" className={t.colHead}>Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BCR_EXAMPLES.map(([bun, cr, calc, ratio]) => (
                      <tr key={calc}>
                        <th scope="row" className={t.rowHead}>{bun}</th>
                        <td className={t.cell}>{cr}</td>
                        <td className={t.cell}>{calc}</td>
                        <td className={t.cellNote}>{ratio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                The fifth row is the one to remember. A BUN of 40 with a creatinine of 2.0 gives a perfectly ordinary
                ratio of 20:1, while both values are clearly raised. A normal ratio says nothing about whether kidney
                function is normal; in moderate to advanced kidney failure, BUN and creatinine tend to rise together
                and keep the ratio near 10:1.
              </p>

              <h2>Normal BUN/creatinine ratio</h2>
              <p>
                Many US laboratories and references treat roughly 10:1 to 20:1 as the usual band. It is a convention
                rather than a standard: there is no single agreed cutoff, some labs print slightly different limits,
                and many do not print the ratio at all. For context, a classic clinical reference gives adult BUN as
                about 5 to 20 mg/dL and creatinine as about 0.6 to 1.2 mg/dL in men and 0.5 to 1.1 mg/dL in women (
                <a href="https://www.ncbi.nlm.nih.gov/books/NBK305/" rel="noopener">Hosten, Clinical Methods, NCBI Bookshelf</a>
                ). Current lab ranges vary, so use the ones on your report.
              </p>

              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={t.captionNote}>
                    BUN/creatinine ratio bands commonly used in adults. The ratio is most informative when BUN or
                    creatinine is itself outside its range. Laboratories differ; compare against your own report.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Ratio</th>
                      <th scope="col" className={t.colHead}>How it is usually read</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>Under 10:1</th>
                      <td className={t.cellNote}>Low. Associated with low protein intake, advanced liver disease or high creatinine production.</td>
                    </tr>
                    <tr data-tone="ok">
                      <th scope="row" className={t.rowHead}>10:1–20:1</th>
                      <td className={t.cellNote}>The usual band. Still read creatinine and eGFR on their own.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>Above 20:1</th>
                      <td className={t.cellNote}>High. Classically associated with dehydration or reduced kidney blood flow, high protein intake, upper GI bleeding or corticosteroids.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>What a high BUN/creatinine ratio suggests</h2>
              <p>
                Urea is filtered by the kidneys and then partly reabsorbed, and that reabsorption increases when the
                body is short of fluid or blood flow to the kidneys falls. Creatinine is not reabsorbed the same way,
                so BUN rises faster than creatinine. That is why a ratio above 20:1 is classically associated with
                dehydration, vomiting or diarrhea, and heart failure. BUN also rises, without any change in the
                kidneys, when more protein is broken down: a high-protein diet, blood digested from a bleed in the
                upper digestive tract, fever or infection, and corticosteroid medicines all push it up.
              </p>
              <p>
                The practical reading depends on creatinine. A high ratio with a normal{" "}
                <Link href="/blog/creatinine-1-2-normal">creatinine</Link> on a routine panel most often reflects
                hydration on the morning of the draw or a protein-rich diet, and it is worth a repeat panel taken
                well hydrated before reading much into it. A high ratio with a raised creatinine, or with symptoms
                such as black stools, is a different conversation and one to have with a clinician promptly.
              </p>

              <h2>What a low BUN/creatinine ratio suggests</h2>
              <p>
                A ratio under 10:1 means BUN is low relative to creatinine. It is associated with low protein intake,
                reduced urea production in advanced liver disease, and higher creatinine production, as in people
                with a large muscle mass or with muscle breakdown. A muscular person with a high-normal creatinine and
                a modest protein intake can sit here with healthy kidneys. Muscle mass is also the reason{" "}
                <Link href="/blog/cystatin-c-kidney-function">cystatin C</Link> is used as a muscle-independent check
                on kidney filtration, and the{" "}
                <Link href="/tools/sarcopenia-index-calculator">sarcopenia index calculator</Link> combines
                the two.
              </p>

              <h2>When the ratio matters, and when it does not</h2>
              <p>
                The ratio is a pattern-reading tool, not a measure of kidney function. When BUN and creatinine are
                both inside their ranges, a ratio slightly outside 10:1 to 20:1 rarely means anything. The number
                that describes kidney filtration is eGFR, calculated from creatinine, and it is the one to follow
                over time. The other electrolytes on the same panel can be turned into an{" "}
                <Link href="/tools/anion-gap-calculator">anion gap</Link>, and{" "}
                <Link href="/blog/how-often-blood-work">how often to get blood work</Link> covers how often a metabolic
                panel is worth repeating.
              </p>
              <p>
                Already have your bloodwork? <a href="https://apps.apple.com/us/app/merios/id6760352598?pt=128637372&ct=web-bun-cr-ratio&mt=8">Merios</a> reads
                it next to your watch data, so a ratio like this sits beside your creatinine and eGFR trend across
                panels.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
