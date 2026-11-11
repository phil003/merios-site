import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import NonHdlCalculator from "@/components/calculators/NonHdlCalculator";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "Non-HDL Cholesterol Calculator and Normal Range";
const NAME = "Non-HDL Cholesterol Calculator";
const DESCRIPTION =
  "Free non-HDL cholesterol calculator: total cholesterol minus HDL, in mg/dL or mmol/L. See where you fall, from under 130 desirable to 220 and above very high.";

// Worked examples: total cholesterol − HDL (mg/dL), banded with the NLA 2014 classification.
const EXAMPLES: [string, string, string, string][] = [
  ["180 mg/dL", "55 mg/dL", "180 − 55", "125 mg/dL (desirable)"],
  ["200 mg/dL", "60 mg/dL", "200 − 60", "140 mg/dL (above desirable)"],
  ["220 mg/dL", "50 mg/dL", "220 − 50", "170 mg/dL (borderline high)"],
  ["250 mg/dL", "40 mg/dL", "250 − 40", "210 mg/dL (high)"],
  ["5.4 mmol/L", "1.3 mmol/L", "5.4 − 1.3", "4.1 mmol/L, about 159 mg/dL (above desirable)"],
];

const FAQ_ITEMS = [
  { q: "What is non-HDL cholesterol?", a: "Non-HDL cholesterol is your total cholesterol minus your HDL cholesterol. It counts the cholesterol carried by every particle that can contribute to plaque in the arteries: LDL, VLDL and its remnants, intermediate-density lipoprotein, chylomicron remnants and Lp(a). HDL is the only fraction left out." },
  { q: "What is a normal non-HDL cholesterol level?", a: "In the National Lipid Association classification for adults, below 130 mg/dL (3.36 mmol/L) is desirable, 130 to 159 is above desirable, 160 to 189 is borderline high, 190 to 219 is high and 220 mg/dL or more is very high. People at very high cardiovascular risk are usually given a lower goal, below 100 mg/dL." },
  { q: "How do you calculate non-HDL cholesterol?", a: "Subtract HDL from total cholesterol, with both values from the same panel and in the same unit. A total cholesterol of 220 mg/dL with an HDL of 50 mg/dL gives a non-HDL cholesterol of 170 mg/dL. In mmol/L, 5.4 minus 1.3 gives 4.1 mmol/L." },
  { q: "Is non-HDL cholesterol better than LDL?", a: "It captures more. The National Lipid Association notes that non-HDL cholesterol predicts cardiovascular disease more strongly than LDL cholesterol and tracks ApoB more closely, largely because it includes the cholesterol in triglyceride-rich particles. The difference matters most when triglycerides are high. It does not replace LDL; both are read together." },
  { q: "Do you need to fast for a non-HDL cholesterol test?", a: "No. Total cholesterol and HDL change little after a meal, so non-HDL cholesterol is reliable on a nonfasting sample. The National Lipid Association states that neither non-HDL cholesterol nor ApoB requires fasting for accurate assessment. Triglycerides, and LDL calculated from them, are the values a recent meal moves most." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/tools/non-hdl-cholesterol-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/tools/non-hdl-cholesterol-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/non-hdl-cholesterol-calculator#tool",
    name: NAME,
    alternateName: ["Non-HDL-C Calculator", "Non-HDL Cholesterol Calculation", "Total Cholesterol Minus HDL Calculator"],
    url: "https://merios.life/tools/non-hdl-cholesterol-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    isAccessibleForFree: true,
    citation: "Jacobson TA et al. National Lipid Association recommendations for patient-centered management of dyslipidemia: Part 1. J Clin Lipidol. 2014;8:473-488.",
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: NAME, url: "https://merios.life/tools/non-hdl-cholesterol-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="Non-HDL cholesterol — every atherogenic particle"
        title="Non-HDL Cholesterol Calculator"
        subline="Non-HDL cholesterol is total cholesterol minus HDL: the cholesterol in every particle that can build plaque, not just LDL. It is already on your lipid panel, needs no fasting, and often says more than LDL when triglycerides are high."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <NonHdlCalculator />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>What is non-HDL cholesterol?</h2>
              <p>
                HDL is the one lipoprotein on a standard panel that is not thought to drive plaque. Everything else
                that carries cholesterol through the blood, LDL, VLDL and its remnants, intermediate-density
                lipoprotein, chylomicron remnants and Lp(a), can enter the artery wall. Non-HDL cholesterol adds all of
                that up in a single number, which is why the National Lipid Association describes it as the
                cholesterol carried by all potentially atherogenic particles.
              </p>
              <p className={t.formula}>Non-HDL cholesterol = total cholesterol − HDL cholesterol</p>
              <p>
                Many labs do not print it, but it costs nothing to calculate: both inputs are on every basic lipid
                panel. Use values from the same draw and in the same unit. Because it is a subtraction, the unit does
                not change the arithmetic; mmol/L results convert to mg/dL with the cholesterol factor of 38.67.
              </p>

              <h2>Non-HDL cholesterol calculation: worked examples</h2>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Non-HDL cholesterol calculated from total cholesterol and HDL</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Total cholesterol</th>
                      <th scope="col" className={t.colHead}>HDL</th>
                      <th scope="col" className={t.colHead}>Calculation</th>
                      <th scope="col" className={t.colHead}>Non-HDL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXAMPLES.map(([tc, hdl, calc, out]) => (
                      <tr key={calc}>
                        <th scope="row" className={t.rowHead}>{tc}</th>
                        <td className={t.cell}>{hdl}</td>
                        <td className={t.cell}>{calc}</td>
                        <td className={t.cellNote}>{out}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Non-HDL cholesterol normal range</h2>
              <p>
                The categories below are the adult classification published by the National Lipid Association in its
                2014 recommendations for the management of dyslipidemia (Jacobson and colleagues, Journal of Clinical
                Lipidology). They are population categories, not personal targets.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={t.captionNote}>
                    Non-HDL cholesterol categories for adults, National Lipid Association (2014). mmol/L values
                    converted with 38.67 and rounded.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Non-HDL cholesterol</th>
                      <th scope="col" className={t.colHead}>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-tone="ok">
                      <th scope="row" className={t.rowHead}>Under 130 mg/dL (under 3.36 mmol/L)</th>
                      <td className={t.cellNote}>Desirable. Also the NLA goal for people at low, moderate and high risk.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>130–159 mg/dL (3.36–4.11 mmol/L)</th>
                      <td className={t.cellNote}>Above desirable.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>160–189 mg/dL (4.14–4.89 mmol/L)</th>
                      <td className={t.cellNote}>Borderline high.</td>
                    </tr>
                    <tr data-tone="bad">
                      <th scope="row" className={t.rowHead}>190–219 mg/dL (4.91–5.66 mmol/L)</th>
                      <td className={t.cellNote}>High. Listed as a risk-enhancing factor in the 2018 AHA/ACC cholesterol guideline.</td>
                    </tr>
                    <tr data-tone="bad">
                      <th scope="row" className={t.rowHead}>220 mg/dL and above (5.69 mmol/L and above)</th>
                      <td className={t.cellNote}>Very high.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Why non-HDL runs 30 mg/dL above LDL</h2>
              <p>
                The US National Cholesterol Education Program&rsquo;s Adult Treatment Panel III (2001) introduced
                non-HDL cholesterol as a secondary target for people with triglycerides of 200 mg/dL or more, and set
                each non-HDL goal 30 mg/dL above the matching LDL goal: 130 against 100, 160 against 130, 190 against
                160. The 30 mg/dL reflects the cholesterol normally carried in VLDL when triglycerides are in the
                normal range. The NLA bands follow the same logic, which is why each one sits 30 mg/dL above the
                familiar LDL category. A non-HDL of 160 to 189 mg/dL is the counterpart of the{" "}
                <Link href="/blog/ldl-130-borderline">borderline-high LDL of 130 to 159 mg/dL</Link>.
              </p>

              <h2>Reading your result</h2>
              <p>
                Non-HDL cholesterol is a risk marker, not a diagnosis, and the same number means different things for
                different people. The 2018 AHA/ACC multisociety cholesterol guideline (Grundy and colleagues,
                Circulation 2019) sets treatment decisions by overall risk, combining age, blood pressure, smoking,
                diabetes and other factors, with cholesterol as one input among several. A value of 150 mg/dL can be
                unremarkable in a 35-year-old with no other risk factors and above goal in someone who has already had
                a heart attack, for whom the NLA suggests below 100 mg/dL and the 2018 guideline uses 100 mg/dL as a
                threshold when considering added therapy.
              </p>
              <p>
                The gap between your non-HDL and your LDL is informative in its own right. When non-HDL is much more
                than 30 mg/dL above LDL, the extra cholesterol is usually in triglyceride-rich particles, the pattern
                that goes with high triglycerides, insulin resistance and excess liver fat. That is exactly when LDL
                alone tends to understate risk, and why a{" "}
                <Link href="/blog/cholesterol-220-high">total cholesterol of 220</Link> can mean very different things
                depending on what sits behind it. The{" "}
                <Link href="/blog/cholesterol-ratio-calculator">cholesterol ratio</Link> is another way of reading the
                same two inputs.
              </p>
              <p>
                It is also an imprecise number. Total cholesterol and HDL each carry analytical and biological
                variation, and subtracting one from the other does not cancel it, so a difference of 10 mg/dL between
                two panels can be noise. One reading is a snapshot; a trend across several draws, taken under similar
                conditions, is what carries weight.
              </p>

              <h2>No fasting needed</h2>
              <p>
                Total cholesterol and HDL barely change after a meal, so non-HDL is reliable on a nonfasting sample.
                The NLA notes that neither non-HDL cholesterol nor ApoB requires fasting for accurate assessment, and
                the 2018 AHA/ACC guideline accepts a nonfasting lipid profile for estimating risk in adults.
                Triglycerides, and an LDL calculated from them, are the values a recent meal moves.
              </p>

              <h2>Non-HDL cholesterol and ApoB</h2>
              <p>
                Every atherogenic particle carries one molecule of apolipoprotein B, so ApoB counts the particles while
                non-HDL cholesterol weighs the cholesterol inside them. The two are closely correlated, more closely
                than LDL and ApoB, which is why the NLA prefers non-HDL to LDL as a primary target and treats ApoB as
                an optional secondary one. They can still disagree, especially when particles are small and
                cholesterol-poor; in that case ApoB is the more direct measure. The detail is in{" "}
                <Link href="/blog/apob-heart-disease-risk">ApoB and heart disease risk</Link>. If your lab reports in
                mmol/L, the <Link href="/tools/cholesterol-unit-converter">cholesterol converter</Link> handles every
                lipid on the panel.
              </p>
              <p>
                Already have your bloodwork? <a href="https://apps.apple.com/us/app/merios/id6760352598?pt=128637372&ct=web-non-hdl-calc&mt=8">Merios</a> reads it next to your watch data.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
