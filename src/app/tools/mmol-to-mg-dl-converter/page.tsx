import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import MmolMgdlConverter from "@/components/calculators/MmolMgdlConverter";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "mmol/L to mg/dL Converter: Glucose, Cholesterol, BUN";
const NAME = "mmol/L to mg/dL Converter";
const DESCRIPTION =
  "Convert mmol/L to mg/dL and back for glucose, cholesterol, triglycerides, BUN, calcium, uric acid, creatinine and bilirubin, each with its own exact factor.";

// Quick-reference factors: [marker, SI unit, SI → mg/dL, mg/dL → SI, molar mass]
// Factor = molar mass ÷ 10 for mmol/L markers; checked against the MSD Manual
// SI conversion table and Laposata's SI Unit Conversion Guide. 4 significant figures.
const FACTORS: [string, string, string, string, string][] = [
  ["Glucose", "mmol/L", "× 18.02", "× 0.05551", "180.16 g/mol"],
  ["Total, LDL, HDL and non-HDL cholesterol", "mmol/L", "× 38.67", "× 0.02586", "386.65 g/mol"],
  ["Triglycerides", "mmol/L", "× 88.57", "× 0.01129", "about 886 g/mol (as triolein)"],
  ["Urea (mmol/L) to BUN (mg/dL)", "mmol/L", "× 2.801", "× 0.3570", "28.01 g/mol of urea nitrogen"],
  ["Calcium", "mmol/L", "× 4.008", "× 0.2495", "40.078 g/mol"],
  ["Uric acid", "µmol/L", "÷ 59.48", "× 59.48", "168.11 g/mol"],
  ["Creatinine", "µmol/L", "÷ 88.40", "× 88.40", "113.12 g/mol"],
  ["Bilirubin", "µmol/L", "÷ 17.10", "× 17.10", "584.66 g/mol"],
];

// Worked examples, computed with the factors above and rounded as a US report would print them.
const EXAMPLES: [string, string, string][] = [
  ["Glucose 5.6 mmol/L", "5.6 × 18.02", "101 mg/dL"],
  ["Glucose 7.0 mmol/L", "7.0 × 18.02", "126 mg/dL"],
  ["Total cholesterol 5.2 mmol/L", "5.2 × 38.67", "201 mg/dL"],
  ["Triglycerides 1.7 mmol/L", "1.7 × 88.57", "151 mg/dL"],
  ["Urea 5.0 mmol/L", "5.0 × 2.801", "BUN 14.0 mg/dL"],
  ["Creatinine 88 µmol/L", "88 ÷ 88.40", "1.00 mg/dL"],
];

const FAQ_ITEMS = [
  { q: "How do you convert mmol/L to mg/dL?", a: "Multiply by the factor for that specific marker, which is its molar mass divided by 10. For glucose the factor is 18.02, so 5.6 mmol/L is about 101 mg/dL. For cholesterol it is 38.67, so 5.2 mmol/L is about 201 mg/dL. For triglycerides it is 88.57. There is no single factor that works for every test." },
  { q: "How do you convert mg/dL to mmol/L?", a: "Divide by the same marker-specific factor, or multiply by its reciprocal. Glucose in mg/dL times 0.05551 gives mmol/L, so 100 mg/dL is 5.6 mmol/L. Cholesterol in mg/dL times 0.02586 gives mmol/L, so 200 mg/dL is 5.17 mmol/L. Triglycerides in mg/dL times 0.01129 gives mmol/L." },
  { q: "Is the mmol/L to mg/dL conversion the same for glucose and cholesterol?", a: "No. The factor depends on how heavy the molecule is. Glucose weighs 180.16 grams per mole and uses 18.02; cholesterol weighs 386.65 grams per mole and uses 38.67; a triglyceride is heavier still and uses 88.57. Using the glucose factor on a cholesterol result understates it by more than half." },
  { q: "What is 7 mmol/L in mg/dL?", a: "For glucose, 7.0 mmol/L is 126 mg/dL, which is the fasting threshold the American Diabetes Association uses for diabetes. For total or LDL cholesterol, 7.0 mmol/L is about 271 mg/dL. For triglycerides it is about 620 mg/dL. The same number means very different things depending on the marker." },
  { q: "Why are creatinine, uric acid and bilirubin in µmol/L instead of mmol/L?", a: "Their concentrations in blood are small, so laboratories outside the US report them in micromoles per litre to avoid long decimals. The conversion still comes from molar mass: 1 mg/dL is 88.4 µmol/L for creatinine, 59.48 µmol/L for uric acid and 17.10 µmol/L for bilirubin." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/tools/mmol-to-mg-dl-converter" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/tools/mmol-to-mg-dl-converter",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/mmol-to-mg-dl-converter#tool",
    name: NAME,
    alternateName: ["mg/dL to mmol/L Converter", "mmol to mg/dL Calculator", "Lab Unit Converter"],
    url: "https://merios.life/tools/mmol-to-mg-dl-converter",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    isAccessibleForFree: true,
    citation: "Laposata M. SI Unit Conversion Guide. NEJM Books, 1992; MSD Manual, SI conversion calculator.",
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: NAME, url: "https://merios.life/tools/mmol-to-mg-dl-converter" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="Lab units — mmol/L, µmol/L and mg/dL"
        title="mmol/L to mg/dL Converter"
        subline="There is no single mmol/L to mg/dL factor. Glucose, cholesterol and triglycerides each convert differently, because each molecule has a different weight. Pick the marker, enter the number, get the value your report would print in the other system."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <MmolMgdlConverter />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>How to convert mmol/L to mg/dL</h2>
              <p>
                A result in millimoles per litre counts molecules. A result in milligrams per deciliter weighs them.
                To move from one to the other you need the weight of one mole of the molecule, its molar mass:
              </p>
              <p className={t.formula}>mg/dL = mmol/L × (molar mass ÷ 10)</p>
              <p>
                The division by 10 converts litres to deciliters. Glucose has a molar mass of 180.16 grams per mole,
                so its factor is 18.02: a fasting glucose of 5.6 mmol/L is about 101 mg/dL. Going the other way, you
                divide by the same factor. For markers reported in micromoles per litre, such as creatinine, the
                factor is 1,000 times larger, which is why creatinine uses 88.4 rather than 0.0884.
              </p>

              <h2>Why there is no universal conversion factor</h2>
              <p>
                The most common conversion mistake is to treat 18 as the mmol/L to mg/dL factor for everything. It is
                the factor for glucose only. Cholesterol is a heavier molecule, at 386.65 grams per mole, so a
                cholesterol result of 5.2 mmol/L is 201 mg/dL, not 94. A triglyceride, built from three fatty acids on a
                glycerol backbone, is heavier again, which gives a factor of 88.57. The same printed number, 2.0 mmol/L,
                is 36 mg/dL of glucose, 77 mg/dL of cholesterol and 177 mg/dL of triglycerides.
              </p>
              <p>
                Urea is a special case. US laboratories report blood urea nitrogen, the weight of only the two nitrogen
                atoms in each urea molecule, while most other countries report urea itself in mmol/L. Urea in mmol/L
                multiplied by 2.801 gives BUN in mg/dL.
              </p>

              <h2>Quick-reference conversion factors</h2>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>mmol/L and µmol/L to mg/dL factors, four significant figures</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Marker</th>
                      <th scope="col" className={t.colHead}>SI unit</th>
                      <th scope="col" className={t.colHead}>SI to mg/dL</th>
                      <th scope="col" className={t.colHead}>mg/dL to SI</th>
                      <th scope="col" className={t.colHead}>Molar mass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FACTORS.map(([marker, unit, toMg, toSi, mm]) => (
                      <tr key={marker}>
                        <th scope="row" className={t.rowHead}>{marker}</th>
                        <td className={t.cell}>{unit}</td>
                        <td className={t.cell}>{toMg}</td>
                        <td className={t.cell}>{toSi}</td>
                        <td className={t.cellNote}>{mm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Triglycerides are a mixture of molecules rather than one compound, so their factor is a convention
                based on triolein, a typical triglyceride. That makes it slightly less exact than the glucose or
                cholesterol factor, though the difference is far smaller than normal day-to-day variation.
              </p>

              <h2>Worked examples</h2>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Common SI results converted to US units</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Result</th>
                      <th scope="col" className={t.colHead}>Calculation</th>
                      <th scope="col" className={t.colHead}>US units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXAMPLES.map(([res, calc, out]) => (
                      <tr key={res}>
                        <th scope="row" className={t.rowHead}>{res}</th>
                        <td className={t.cell}>{calc}</td>
                        <td className={t.cellNote}>{out}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Reading a converted result</h2>
              <p>
                A conversion changes the unit, not the meaning, and it is only as precise as the number you started
                with. Labs round their printed results, so converting 5.6 mmol/L of glucose gives 101 mg/dL even though
                the analyzer may have measured anything from about 100 to 102 mg/dL. Laboratories also round factors
                differently: some use 18 for glucose, 0.25 for calcium or 60 for uric acid. A one-point difference
                between your conversion and a printed value is almost always rounding, not an error.
              </p>
              <p>
                Reference ranges deserve more care than the numbers. A range set in one country is not always the
                converted version of a range set in another, and some cut-offs are defined differently rather than just
                expressed in other units. The fasting glucose threshold for diabetes, 126 mg/dL, does convert cleanly to
                7.0 mmol/L, but for markers such as creatinine, uric acid and calcium, intervals vary by laboratory,
                method, age and sex. Compare a converted value against the range printed on your own report, or against
                a guideline written in the unit you are using. What a glucose of 100 mg/dL or a triglyceride level of
                180 mg/dL suggests is covered in{" "}
                <Link href="/blog/fasting-glucose-100-borderline">fasting glucose at 100 mg/dL</Link> and{" "}
                <Link href="/blog/triglycerides-180-high">triglycerides at 180 mg/dL</Link>, and the borderline LDL
                band in <Link href="/blog/ldl-130-borderline">LDL at 130 mg/dL</Link>.
              </p>
              <p>
                Finally, check that the unit is what you think it is. A converted value far outside anything seen in
                blood, such as a glucose of 1,800 mg/dL, nearly always means the number was entered in the other unit.
                The converter above flags that case rather than presenting it as a result.
              </p>

              <h2>Converters for individual markers</h2>
              <p>
                Some markers have their own converter with ranges and extra context:{" "}
                <Link href="/tools/cholesterol-unit-converter">cholesterol and ApoB</Link>,{" "}
                <Link href="/tools/uric-acid-unit-converter">uric acid</Link>,{" "}
                <Link href="/tools/bilirubin-unit-converter">bilirubin</Link>,{" "}
                <Link href="/tools/vitamin-d-unit-converter">vitamin D (ng/mL and nmol/L)</Link>,{" "}
                <Link href="/tools/testosterone-unit-converter">testosterone (ng/dL and nmol/L)</Link>,{" "}
                <Link href="/tools/lpa-unit-converter">Lp(a), which has no exact conversion</Link>, and the{" "}
                <Link href="/tools/a1c-calculator">A1C calculator</Link> to turn an HbA1c percentage into
                estimated average glucose. For the usual ranges of a full panel side by side, see the{" "}
                <Link href="/blog/blood-test-results-normal-range-chart">blood test normal range chart</Link>.
              </p>
              <p>
                Already have your bloodwork? <a href="https://apps.apple.com/us/app/merios/id6760352598?pt=128637372&ct=web-mmol-mgdl-converter&mt=8">Merios</a> reads it next to your watch data.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
