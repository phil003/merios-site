import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ToolHero from "@/components/calculators/tool-page/ToolHero";
import ToolFaq from "@/components/calculators/tool-page/ToolFaq";
import ToolRelated from "@/components/calculators/tool-page/ToolRelated";
import TSATCalculator from "@/components/calculators/TSATCalculator";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "TSAT Calculator: Transferrin Saturation from TIBC";
const NAME = "TSAT Calculator (Transferrin Saturation)";
const DESCRIPTION =
  "Free TSAT calculator: serum iron ÷ TIBC × 100. Enter TIBC, UIBC or transferrin, get your saturation in seconds, with worked examples and the 20–50% range.";

// Sources (fetched 2026-11-23):
// - Adult reference TSAT: men 20–50%, women 15–45% — MedlinePlus https://medlineplus.gov/ency/article/003489.htm
//   (TIBC article) and https://medlineplus.gov/ency/article/003488.htm (serum iron article).
// - >45% as work-up threshold: ACG Clinical Guideline: Hereditary Hemochromatosis, Kowdley et al., Am J Gastroenterol
//   2019;114:1202–1218 (TS >45% identifies 97.9–100% of C282Y homozygotes; HFE testing when TS ≥45% and ferritin high).
//   https://www.thebloodproject.com/wp-content/uploads/2021/10/HH_ACG.pdf
// - <20% as iron-deficiency criterion (with ferritin 100–299 ng/mL, heart failure): JACC 2022;79:341–351
//   https://pubmed.ncbi.nlm.nih.gov/35086656/
// - µg/dL × 0.1791 = µmol/L (iron molar mass 55.845 g/mol), as on /tools/iron-unit-converter.
// 2026-11-23: unsourced "25–35% comfortable" and "20–25% borderline" bands removed; the 20–50% range is now sex-specific.

// Worked TSAT examples: serum iron ÷ TIBC × 100 (values checked by hand, one decimal).
const TSAT_EXAMPLES: [string, string, string, string][] = [
  ["40 µg/dL", "450 µg/dL", "40 ÷ 450 × 100", "8.9% (below the adult reference range)"],
  ["60 µg/dL", "400 µg/dL", "60 ÷ 400 × 100", "15.0% (below the adult reference range)"],
  ["90 µg/dL", "320 µg/dL", "90 ÷ 320 × 100", "28.1% (within the adult reference range)"],
  ["120 µg/dL", "300 µg/dL", "120 ÷ 300 × 100", "40.0% (within the adult reference range)"],
  ["180 µg/dL", "300 µg/dL", "180 ÷ 300 × 100", "60.0% (above the adult reference range)"],
  ["16 µmol/L", "57 µmol/L", "16 ÷ 57 × 100", "28.1% (same result in SI units)"],
  ["90 µg/dL", "UIBC 230 µg/dL", "90 ÷ (90 + 230) × 100", "28.1% (TIBC = iron + UIBC = 320)"],
];

const FAQ_ITEMS = [
  { q: "How do you calculate TSAT (tsat calculation)?", a: "Transferrin saturation equals serum iron divided by total iron-binding capacity (TIBC), multiplied by 100, with both values in the same unit. A serum iron of 90 µg/dL with a TIBC of 320 µg/dL gives 90 divided by 320, or 28.1 percent. In SI units, 16 µmol/L over 57 µmol/L gives the same 28.1 percent, because the units cancel. If your panel reports UIBC instead of TIBC, add UIBC to serum iron to get TIBC first." },
  { q: "How do you calculate transferrin saturation from UIBC?", a: "Add UIBC to serum iron to get TIBC, then divide serum iron by that TIBC and multiply by 100. For serum iron 90 µg/dL and UIBC 230 µg/dL, TIBC is 320 µg/dL and TSAT is 90 ÷ 320 × 100 = 28.1 percent. Use the same unit for both numbers. If your report gives transferrin in g/L instead, multiply by 125 to get TIBC in µg/dL." },
  { q: "Can I calculate TSAT with iron and TIBC in µmol/L?", a: "Yes. The ratio is the same in µmol/L as in µg/dL as long as serum iron and TIBC use the same unit. 1 µg/dL equals 0.1791 µmol/L for both iron and TIBC, so converting both leaves the percentage unchanged. Switch the units toggle above to µmol/L, or use the iron unit converter for single values." },
  { q: "What is a normal transferrin saturation?", a: "MedlinePlus lists 20 to 50 percent for adult men and 15 to 45 percent for adult women. Reference intervals differ between laboratories, so compare against the range printed on your own report. TSAT is a ratio that moves with the time of day, recent iron intake and fasting status, so one value is a snapshot." },
  { q: "What does a low or high TSAT mean?", a: "A TSAT below the reference range is associated with iron deficiency and can appear before hemoglobin falls; some clinical definitions use under 20 percent together with ferritin. A TSAT above 45 percent is the level the American College of Gastroenterology hemochromatosis guideline uses to prompt further testing, usually on a repeat fasting sample. Neither is a diagnosis on its own; a clinician reads the result with ferritin and your history." },
  { q: "TSAT vs ferritin: why can ferritin be normal while TSAT is low?", a: "Ferritin reflects stored iron but also rises with inflammation, infection, obesity and liver disease, so it can look reassuring while iron supply is low. TSAT measures how much of transferrin's carrying capacity currently holds iron and is less tied to inflammation, although serum iron itself varies through the day. A low TSAT beside a normal ferritin is worth raising with a clinician. Ferritin and saturation answer different questions and are read together." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/tools/transferrin-saturation-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/tools/transferrin-saturation-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/transferrin-saturation-calculator#tool",
    name: NAME,
    alternateName: ["Transferrin Saturation Calculator", "Iron Saturation Calculator", "TSAT Calculation"],
    url: "https://merios.life/tools/transferrin-saturation-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    isAccessibleForFree: true,
    citation: "StatPearls. Iron-Binding Capacity. NCBI Bookshelf NBK559119.",
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: NAME, url: "https://merios.life/tools/transferrin-saturation-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <main className={t.main}>
        <ToolHero
          slug="transferrin-saturation-calculator"
          eyebrow="Transferrin saturation — iron in transit"
          title="TSAT calculator"
          em="(transferrin saturation)"
          subline="TSAT (or T sat) is serum iron divided by TIBC, times 100. Enter what your panel actually printed — TIBC, UIBC or transferrin — and get your saturation. Iron and TIBC can be entered in µg/dL or µmol/L. Ferritin can look fine while this number does not."
        />

        <div className={t.wrap}>
          <TSATCalculator />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <p>
                <strong>TSAT = serum iron ÷ TIBC × 100.</strong> Example: iron 90 µg/dL ÷ TIBC 320 µg/dL × 100 = 28.1%.
                MedlinePlus lists 20–50% for adult men and 15–45% for adult women; a value above 45% is the level the
                ACG hemochromatosis guideline uses to prompt further testing.
              </p>

              <h2>How to calculate TSAT</h2>
              <p>
                Transferrin saturation is not measured directly. It is a ratio, calculated from two numbers your lab
                already printed:
              </p>
              <p className={t.formula}>TSAT (%) = serum iron ÷ TIBC × 100</p>
              <p>
                Both values must use the same unit: micrograms per deciliter on a US panel, micromoles per liter on many SI reports. A serum iron of 90 with a TIBC of 320 gives
                90 ÷ 320 = 0.281, so a saturation of 28.1 percent. That is the whole calculation — the difficulty is
                almost never the arithmetic, it is that your report may not contain a line called TIBC at all.
              </p>

              <h2>TSAT calculation: worked examples</h2>
              <p>
                Five common panels plus one in SI units and one starting from UIBC, worked through with the same formula. Serum iron and TIBC are in micrograms per
                deciliter, as on a US report; the last row shows that a panel in micromoles per liter gives the same
                percentage, because the units cancel.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Transferrin saturation calculated from serum iron and TIBC</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Serum iron</th>
                      <th scope="col" className={t.colHead}>TIBC</th>
                      <th scope="col" className={t.colHead}>Calculation</th>
                      <th scope="col" className={t.colHead}>TSAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TSAT_EXAMPLES.map(([iron, tibc, calc, pct]) => (
                      <tr key={calc}>
                        <th scope="row" className={t.rowHead}>{iron}</th>
                        <td className={t.cell}>{tibc}</td>
                        <td className={t.cell}>{calc}</td>
                        <td className={t.cellNote}>{pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>When your lab prints UIBC or transferrin instead</h2>
              <p>
                Three assays are in common use, and most calculators only handle the first one. All three get you to
                the same place:
              </p>
              <p>
                <strong>TIBC</strong> — use it directly. <strong>UIBC</strong>, the unsaturated portion, adds to serum
                iron to give TIBC: 90 + 230 = 320. <strong>Transferrin</strong> in grams per liter converts with a
                factor of 125, because one milligram per deciliter of transferrin binds about 1.25 micrograms per
                deciliter of iron and one gram per liter is 100 milligrams per deciliter: 2.56 × 125 = 320.
              </p>
              <p>
                A factor of about 25 also circulates for the transferrin path, and it is correct in its own context:
                it gives TIBC in micromoles per liter, for use with a serum iron also reported in micromoles per liter.
                Applied to a US panel, where serum iron is in micrograms per deciliter, it produces saturations far
                above 100 percent — physiologically impossible, and a common way to frighten yourself over nothing. The
                toggle above picks the right path so the question does not arise.
              </p>

              <h2>Reading the percentage you get</h2>
              <p>
                MedlinePlus lists 20 to 50 percent for adult men and 15 to 45 percent for adult women. Laboratories
                set their own intervals, so the range printed on your report takes precedence over any table here.
              </p>

              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={t.captionNote}>
                    Transferrin saturation bands in adults. Sources: MedlinePlus (reference ranges), ACG hereditary
                    hemochromatosis guideline 2019 (45% threshold). Intervals differ between laboratories.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>TSAT</th>
                      <th scope="col" className={t.colHead}>How it is usually read</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-tone="bad">
                      <th scope="row" className={t.rowHead}>Under 15%</th>
                      <td className={t.cellNote}>Below the reference range for both sexes. Associated with iron deficiency and can appear before hemoglobin falls.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>15–20%</th>
                      <td className={t.cellNote}>Below the male range, inside the female range. Not diagnostic alone; read with ferritin and symptoms.</td>
                    </tr>
                    <tr data-tone="ok">
                      <th scope="row" className={t.rowHead}>20–45%</th>
                      <td className={t.cellNote}>Inside the adult reference ranges for both sexes.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>45–50%</th>
                      <td className={t.cellNote}>Inside the male range but above the female one, and above the 45% level that prompts hemochromatosis work-up in the ACG guideline. A repeat fasting sample is the usual next step.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>Above 50%</th>
                      <td className={t.cellNote}>Above the reference range for both sexes. Associated with iron overload when it persists; worth discussing with a clinician.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Two things move the number without your iron stores having changed: a non-fasting draw or a recent iron
                supplement pushes it up, and anything that shifts transferrin, such as pregnancy, oral contraceptives
                or liver disease, moves the ratio from the denominator. A fasting morning draw is the one worth
                comparing over time.
              </p>

              <h2>TSAT vs ferritin</h2>
              <p>
                Ferritin reflects stored iron; TSAT reflects iron in transit relative to transferrin capacity. Each can
                be misleading alone, so panels are read with both. The full comparison is in{" "}
                <Link href="/blog/ferritin-vs-iron-saturation">ferritin versus iron saturation</Link>.
              </p>

              <h2>Why TSAT catches what ferritin misses</h2>
              <p>
                Ferritin is the marker most people know, and it is a good one — but it has a well-documented blind spot.
                Ferritin is an acute-phase reactant, meaning it rises with inflammation, infection, obesity and liver
                disease regardless of how much iron you actually have. That is how someone can be told their{" "}
                <Link href="/blog/ferritin-30-low-normal">ferritin is normal</Link> while being
                genuinely iron deficient. Transferrin saturation is not distorted the same way, so a low TSAT alongside
                a normal-looking ferritin is one of the most informative patterns on a panel — the case covered in{" "}
                <Link href="/blog/ferritin-vs-iron-saturation">ferritin versus iron saturation</Link>.
              </p>

              <h2>Reading it alongside the rest of your panel</h2>
              <p>
                TSAT is rarely interpreted alone. Low TSAT with{" "}
                <Link href="/blog/low-ferritin-normal-hemoglobin">normal hemoglobin</Link> suggests
                depletion that has not yet become anemia. Low TSAT with a low{" "}
                <Link href="/blog/mcv-mch-blood-test-meaning">MCV and MCH</Link> points toward
                established iron-deficiency anemia. If you have been supplementing without improvement, the reasons are
                covered in{" "}
                <Link href="/blog/iron-supplements-not-working">why iron supplements stop working</Link>.
              </p>
              <p>
                If you want a single value converted between µg/dL and µmol/L, the{" "}
                <Link href="/tools/iron-unit-converter">iron unit converter</Link> also handles TIBC and ferritin units.
              </p>
              <p>
                One saturation is a snapshot of a value that moves. The pattern worth having is the same fasting draw
                tracked across several panels, with ferritin beside it — which is what{" "}
                <a href="https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-transferrin-saturation-calculator&mt=8">Merios</a> is built to do from the reports you already
                have.
              </p>
            </div>

            <div className={t.faq} data-rv="">
              <h2 className={t.faqTitle}>Frequently asked questions</h2>
              <ToolFaq items={FAQ_ITEMS} />
            </div>
          </section>

          <ToolRelated slug="transferrin-saturation-calculator" />
        </div>
      </main>
      <Footer />
    </>
  );
}
