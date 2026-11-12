import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import AnionGapCalculator from "@/components/calculators/AnionGapCalculator";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "Anion Gap Calculator: High, Low and Normal Range";
const NAME = "Anion Gap Calculator";
const DESCRIPTION =
  "Free anion gap calculator: sodium minus chloride and bicarbonate, with optional potassium and albumin correction. See what high, low and normal values suggest.";

// Worked anion gap examples (values checked by hand). Units are mEq/L, identical to mmol/L for these ions.
const AG_EXAMPLES: [string, string, string][] = [
  ["Na 140, Cl 104, HCO3 24", "140 − (104 + 24)", "12 (top of the usual modern range)"],
  ["Na 138, Cl 103, HCO3 27", "138 − (103 + 27)", "8 (within the usual range)"],
  ["Na 137, Cl 108, HCO3 26", "137 − (108 + 26)", "3 (low end; check albumin)"],
  ["Na 140, Cl 100, HCO3 14", "140 − (100 + 14)", "26 (clearly high)"],
  ["Na 139, Cl 105, HCO3 26, albumin 2.4 g/dL", "8 + 2.5 × (4.0 − 2.4)", "12 corrected, from 8 uncorrected"],
  ["Na 140, K 4.0, Cl 104, HCO3 24", "140 + 4.0 − (104 + 24)", "16 (with potassium; compare to a K-inclusive range)"],
];

const FAQ_ITEMS = [
  { q: "How do you calculate the anion gap?", a: "The anion gap is sodium minus the sum of chloride and bicarbonate, all in mEq/L (the same numbers as mmol/L). With a sodium of 140, chloride of 104 and bicarbonate of 24, the gap is 140 minus 128, or 12. Some laboratories add potassium to the sodium side, which raises the result by roughly 4 mEq/L, so always check which version your report uses. Bicarbonate usually appears on a metabolic panel as CO2 or total CO2." },
  { q: "What does a high anion gap mean?", a: "A clearly raised anion gap suggests that the blood contains more unmeasured acids than usual, which is the pattern of a high anion gap metabolic acidosis. It is associated with ketoacidosis, lactic acidosis, advanced kidney failure and certain toxins such as methanol, ethylene glycol or large amounts of aspirin. A mildly raised value can also come from dehydration, lab variation or a reference range from an older analyzer. The gap itself does not identify the cause; a clinician reads it with pH, bicarbonate, kidney function and symptoms." },
  { q: "What does a low anion gap mean?", a: "The usual reasons for a low anion gap are laboratory error and low albumin, because albumin is the main unmeasured anion in blood. Rarer causes include high levels of abnormal antibodies (paraproteins, as seen in multiple myeloma) and exposure to lithium or bromide. A single low value with otherwise normal results is usually repeated before anything else is done." },
  { q: "What is the normal anion gap range?", a: "It depends on the analyzer. Older references, based on flame photometry, quoted roughly 8 to 16 mEq/L. Modern ion-selective electrode analyzers give lower values, commonly cited as about 3 to 10 or 4 to 12 mEq/L without potassium. Ranges that include potassium run about 4 mEq/L higher. Because of this spread, the range printed on your own report is the one to use." },
  { q: "Does Merios store these numbers?", a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/tools/anion-gap-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/tools/anion-gap-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/anion-gap-calculator#tool",
    name: NAME,
    alternateName: ["Anion Gap Calculation", "Albumin-Corrected Anion Gap Calculator", "Serum Anion Gap Calculator"],
    url: "https://merios.life/tools/anion-gap-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    isAccessibleForFree: true,
    citation: [
      "Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2(1):162-174.",
      "Figge J, Jabor A, Kazda A, Fencl V. Anion gap and hypoalbuminemia. Crit Care Med. 1998;26(11):1807-1810.",
    ],
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: NAME, url: "https://merios.life/tools/anion-gap-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="Anion gap — the value your panel implies"
        title="Anion Gap Calculator"
        subline="Sodium minus chloride and bicarbonate. Enter three numbers from your metabolic panel, add albumin if you have it, and see whether a high or low anion gap is real or an artifact of low albumin."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <AnionGapCalculator />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>How the anion gap is calculated</h2>
              <p>
                The anion gap is not measured by the lab. It is calculated from electrolytes already on a basic or
                comprehensive metabolic panel (BMP or CMP):
              </p>
              <p className={t.formula}>Anion gap = Na − (Cl + HCO3)</p>
              <p>
                All three are in mEq/L, which for these ions is the same number as mmol/L, so the formula works on a
                US or a European report without conversion. Bicarbonate is usually printed as CO2 or total CO2. Blood
                is electrically neutral; the gap exists because the routine panel measures the main positive ion,
                sodium, but leaves out several negative ones, above all albumin, along with phosphate, sulfate and
                organic acids. The gap is a rough measure of those unmeasured anions.
              </p>
              <p>
                Some laboratories include potassium: Na + K − (Cl + HCO3). Because potassium is normally around 3.5
                to 5 mEq/L, that version reads roughly 4 points higher and needs its own reference range. The toggle
                above switches between the two.
              </p>

              <h2>Anion gap calculation: worked examples</h2>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Anion gap calculated from metabolic panel electrolytes (mEq/L)</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Panel values</th>
                      <th scope="col" className={t.colHead}>Calculation</th>
                      <th scope="col" className={t.colHead}>Anion gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AG_EXAMPLES.map(([vals, calc, res]) => (
                      <tr key={calc}>
                        <th scope="row" className={t.rowHead}>{vals}</th>
                        <td className={t.cell}>{calc}</td>
                        <td className={t.cellNote}>{res}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Anion gap normal range: why it depends on the lab</h2>
              <p>
                There is no single normal anion gap. The value depends on how the lab measures chloride and sodium,
                and the range has drifted down as analyzers changed. Older references, from the flame-photometry
                era, quoted roughly 8 to 16 mEq/L. Modern ion-selective electrode analyzers read chloride slightly
                higher, so their ranges are lower, commonly cited as about 3 to 10 or 4 to 12 mEq/L. A review in the
                Clinical Journal of the American Society of Nephrology notes that the normal value varies widely,
                both between methods and between individuals (
                <a href="https://doi.org/10.2215/CJN.03020906" rel="noopener">Kraut and Madias, 2007</a>
                ). In practice, this means a gap of 14 can be flagged high by one lab and pass without comment at
                another. The range printed next to your result is the one that applies.
              </p>

              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={t.captionNote}>
                    Broad orientation bands for the anion gap without potassium. Add about 4 for a potassium-inclusive
                    gap. Reference intervals differ between laboratories and analyzers; compare against the range
                    printed on your own report.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Anion gap</th>
                      <th scope="col" className={t.colHead}>How it is usually read</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>Under 3 mEq/L</th>
                      <td className={t.cellNote}>Low. Most often low albumin or a lab artifact; rarely paraproteins or lithium or bromide exposure.</td>
                    </tr>
                    <tr data-tone="ok">
                      <th scope="row" className={t.rowHead}>3–12 mEq/L</th>
                      <td className={t.cellNote}>Within the range most modern analyzers report. Check albumin before reading it as reassuring.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>12–16 mEq/L</th>
                      <td className={t.cellNote}>Above many modern ranges but inside the older 8–16 reference. Your lab&apos;s range decides which applies.</td>
                    </tr>
                    <tr data-tone="bad">
                      <th scope="row" className={t.rowHead}>Above 16 mEq/L</th>
                      <td className={t.cellNote}>High on almost any reference range. Associated with metabolic acidosis from unmeasured acids.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>What a high anion gap suggests</h2>
              <p>
                A clearly raised gap suggests that acids the routine panel does not measure have accumulated, using
                up bicarbonate. This is the pattern called high anion gap metabolic acidosis, and it is associated
                with diabetic or alcoholic ketoacidosis, lactic acidosis (from severe infection, shock or poor
                circulation), advanced kidney failure, and certain poisonings, including methanol, ethylene glycol
                and large doses of aspirin. These are conditions people are usually unwell with, and they are
                diagnosed by a clinician with pH, blood gases and other tests, not from the gap alone.
              </p>
              <p>
                A mildly raised gap on a routine panel from someone who feels fine is a different situation. Mild
                dehydration, lab variation and an older reference range explain many of these, and the lab itself
                can be the source: Kraut and Madias list laboratory error alongside metabolic causes. A repeat
                panel, ideally drawn the same way, is the usual next step. Kidney function belongs in the same
                reading, so the{" "}
                <Link href="/blog/creatinine-1-2-normal">creatinine</Link> and eGFR lines on the same report matter,
                and the{" "}
                <Link href="/tools/bun-creatinine-ratio-calculator">BUN/creatinine ratio calculator</Link> uses two
                more numbers from it.
              </p>

              <h2>What a low anion gap suggests</h2>
              <p>
                Low values are less common and usually less dramatic. Albumin carries a large share of the negative
                charge the panel does not measure, so when albumin falls, the gap falls with it. Two causes
                dominate a low anion gap: lab error and low albumin. Rarer causes include high levels of
                positively charged abnormal antibodies (paraproteins, as in multiple myeloma) and exposure to
                lithium, bromide or iodide.
              </p>

              <h2>Why albumin correction matters</h2>
              <p>
                The same albumin effect works in the other direction: a low albumin can hide a raised gap by pulling
                it back into the normal band. Figge and colleagues measured this in intensive care patients and
                found that each 1 g/dL drop in albumin lowers the gap by about 2.5 mEq/L (
                <a href="https://doi.org/10.1097/00003246-199811000-00019" rel="noopener">Figge et al., Crit Care Med 1998</a>
                ). The correction this calculator applies is:
              </p>
              <p className={t.formula}>Corrected gap = gap + 2.5 × (4.0 − albumin in g/dL)</p>
              <p>
                Figge's own reference albumin was 4.4 g/dL; many calculators round to 4.0, and 4.4 would raise
                the corrected value by about 1 mEq/L. The correction matters most when albumin is well below normal, as in
                serious illness, liver disease or significant protein loss. With an albumin around 4, it changes
                almost nothing.
              </p>

              <h2>Reading it on a routine panel</h2>
              <p>
                For most people, the anion gap shows up as one more flagged line on an annual CMP. It is
                interpreted, not acted on alone, and a single value tells you less than the same value on two
                panels drawn the same way. Preparation affects electrolytes too; the essentials are in{" "}
                <Link href="/blog/how-to-prepare-for-blood-test">how to prepare for a blood test</Link>, and{" "}
                <Link href="/blog/how-often-blood-work">how often to get blood work</Link> covers how often a metabolic
                panel is worth repeating.
              </p>
              <p>
                Already have your bloodwork? <a href="https://apps.apple.com/us/app/merios/id6760352598?pt=128637372&ct=web-anion-gap-calc&mt=8">Merios</a> reads
                it next to your watch data, so a value like this sits in the context of your other markers and how
                it has moved between panels.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
