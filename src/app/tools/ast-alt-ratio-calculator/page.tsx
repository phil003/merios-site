import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CtaScreen from "@/components/calculators/tool-page/CtaScreen";
import ToolHero from "@/components/calculators/tool-page/ToolHero";
import ToolRelated from "@/components/calculators/tool-page/ToolRelated";
import AstAltRatioCalculator from "@/components/calculators/AstAltRatioCalculator";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const TITLE = "AST/ALT Ratio Calculator (De Ritis Ratio)";
const NAME = "AST/ALT Ratio Calculator";
const DESCRIPTION =
  "Free AST/ALT ratio calculator: divide AST by ALT (U/L) for the De Ritis ratio, then see what below 1, above 1 and above 2 are linked to, with sources.";

// Common AST/ALT pairs (checked by hand, two decimals). Bands as in the calculator.
const RATIO_EXAMPLES: [string, string, string, string][] = [
  ["20", "25", "0.80", "AST lower than ALT"],
  ["25", "20", "1.25", "AST higher than ALT, both often in range"],
  ["30", "45", "0.67", "AST lower than ALT, ALT mildly raised"],
  ["60", "90", "0.67", "AST lower than ALT, both raised"],
  ["80", "50", "1.60", "AST higher than ALT, both raised"],
  ["120", "50", "2.40", "AST more than twice ALT, both raised"],
  ["150", "60", "2.50", "AST more than twice ALT, both raised"],
  ["18", "9", "2.00", "AST twice ALT, but both low: arithmetic only"],
];

const FAQ_ITEMS = [
  { q: "What is a normal AST/ALT ratio?", a: "There is no single agreed normal value. The ratio matters mainly when AST, ALT or both are above your lab's reference range; with both enzymes in range, a ratio a little above or below 1 is common and says little on its own. When enzymes are raised, a ratio below 1 (ALT higher than AST) is the usual pattern in common non-alcoholic causes such as fatty liver disease, while a ratio above 1, and especially above 2, points toward different patterns that a clinician will want to look at." },
  { q: "What does an AST/ALT ratio above 2 mean?", a: "With raised liver enzymes, an AST/ALT ratio above 2 is classically associated with alcohol-related liver disease: Cohen and Kaplan (Digestive Diseases and Sciences, 1979) found it in 70% of patients with alcoholic hepatitis and cirrhosis versus 4% with viral hepatitis, and the American College of Gastroenterology's 2017 guideline on abnormal liver chemistries still cites AST higher than ALT as a clue to alcohol-related liver disease. It is not specific or diagnostic: muscle injury, intense exercise and other conditions can raise AST more than ALT, and a very low ALT can make the ratio high for purely arithmetic reasons." },
  { q: "What does it mean when AST is higher than ALT?", a: "AST higher than ALT gives a ratio above 1. In people with nonalcoholic chronic liver disease, a ratio above 1 was associated with cirrhosis (Williams and Hoofnagle, Gastroenterology, 1988). But AST is also found in muscle, heart and red blood cells, so a hard workout before the draw, a muscle injury or a hemolyzed sample can raise it. With both values in range, AST slightly above ALT is common. If either enzyme is raised, talk to your clinician." },
  { q: "Is the AST/ALT ratio related to alcohol?", a: "Yes, it is one of the classic clues. In alcohol-related liver disease AST is typically higher than ALT, and a ratio above 2 is the pattern most often linked to it (Cohen and Kaplan, 1979), and the ACG guideline (Kwo et al., 2017) flags AST higher than ALT in heavy drinkers as a risk sign. A low ratio does not rule out alcohol-related harm, and a high ratio does not prove it. GGT, the history and repeat testing are part of how clinicians read it." },
  { q: "What is the De Ritis ratio?", a: "The De Ritis ratio is another name for the AST/ALT ratio. It is named after the Italian physician Fernando De Ritis, who described the ratio of the two transaminases in viral hepatitis in 1957. Older reports call the enzymes SGOT (AST) and SGPT (ALT), so SGOT/SGPT ratio means the same thing." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/tools/ast-alt-ratio-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/tools/ast-alt-ratio-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/ast-alt-ratio-calculator#tool",
    name: NAME,
    alternateName: ["De Ritis Ratio Calculator", "AST to ALT Ratio Calculator", "SGOT/SGPT Ratio Calculator"],
    url: "https://merios.life/tools/ast-alt-ratio-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    isAccessibleForFree: true,
    citation: [
      "Kwo PY, Cohen SM, Lim JK. ACG Clinical Guideline: Evaluation of Abnormal Liver Chemistries. Am J Gastroenterol. 2017;112(1):18-35. doi:10.1038/ajg.2016.517",
      "Cohen JA, Kaplan MM. The SGOT/SGPT ratio: an indicator of alcoholic liver disease. Dig Dis Sci. 1979;24(11):835-838. doi:10.1007/BF01324898",
      "Williams AL, Hoofnagle JH. Ratio of serum aspartate to alanine aminotransferase in chronic hepatitis. Relationship to cirrhosis. Gastroenterology. 1988;95(3):734-739. doi:10.1016/S0016-5085(88)80022-2",
      "De Ritis F, Coltorti M, Giusti G. An enzymic test for the diagnosis of viral hepatitis: the transaminase serum activities. Clin Chim Acta. 1957;2(1):70-74.",
    ],
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: NAME, url: "https://merios.life/tools/ast-alt-ratio-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <ToolHero
        slug="ast-alt-ratio-calculator"
        eyebrow="De Ritis ratio — two liver enzymes, one ratio"
        title="AST/ALT Ratio"
        em="Calculator"
        subline="The AST/ALT ratio is AST divided by ALT, both in U/L. It mostly means something when one or both enzymes are raised: below 1, above 1 and above 2 are linked to different patterns."
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <AstAltRatioCalculator />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>How the AST/ALT ratio is calculated</h2>
              <p>
                AST (aspartate aminotransferase) and ALT (alanine aminotransferase) are the two transaminases on a
                liver panel or comprehensive metabolic panel. The ratio is a simple division:
              </p>
              <p className={t.formula}>AST/ALT ratio = AST (U/L) ÷ ALT (U/L)</p>
              <p>
                Both enzymes use the same unit, U/L or IU/L, so the unit cancels out and the ratio has none. It is
                also called the De Ritis ratio, after Fernando De Ritis, who described it in viral hepatitis in
                1957, and older reports write it as SGOT/SGPT. For what a raised ALT on its own means, see{" "}
                <Link href="/blog/alt-level-40-high">whether an ALT of 40 is high</Link>.
              </p>

              <h2>Common AST/ALT ratio values</h2>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>AST/ALT ratio for common liver enzyme values (U/L)</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>AST</th>
                      <th scope="col" className={t.colHead}>ALT</th>
                      <th scope="col" className={t.colHead}>Ratio</th>
                      <th scope="col" className={t.colHead}>Where it sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RATIO_EXAMPLES.map(([a, l, r, note]) => (
                      <tr key={`${a}-${l}`}>
                        <th scope="row" className={t.rowHead}>{a}</th>
                        <td className={t.cell}>{l}</td>
                        <td className={t.cell}>{r}</td>
                        <td className={t.cellNote}>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>What the AST/ALT ratio thresholds mean</h2>
              <p>
                The 1 and 2 cut-offs come from studies of people whose liver enzymes were raised, cited below. The
                American College of Gastroenterology&apos;s guideline on abnormal liver chemistries (
                <a href="https://doi.org/10.1038/ajg.2016.517" rel="noopener">Kwo et al., American Journal of Gastroenterology, 2017</a>
                ) notes that AST higher than ALT in people with heavy alcohol intake should raise concern for
                alcohol-related liver disease, but it does not set a diagnostic ratio cut-off. A ratio below 1, with ALT higher than AST, is the usual pattern in common non-alcoholic causes of
                mild elevation such as fatty liver disease (MASLD, formerly NAFLD) and viral hepatitis. In nonalcoholic
                chronic liver disease, a ratio above 1 has been associated with cirrhosis (
                <a href="https://doi.org/10.1016/S0016-5085(88)80022-2" rel="noopener">Williams and Hoofnagle, Gastroenterology, 1988</a>
                ), which is one reason AST and ALT both feed fibrosis scores such as FIB-4 and the NAFLD fibrosis
                score. A ratio above 2 is classically associated with alcohol-related liver disease (
                <a href="https://doi.org/10.1007/BF01324898" rel="noopener">Cohen and Kaplan, Digestive Diseases and Sciences, 1979</a>
                ), and the ACG guideline lists AST higher than ALT among the clues to it.
              </p>

              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={t.captionNote}>
                    AST/ALT ratio bands used by this calculator. They apply mainly when AST, ALT or both are above
                    your lab&apos;s range. They orient, they do not diagnose.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Ratio</th>
                      <th scope="col" className={t.colHead}>How it is usually read</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-tone="ok">
                      <th scope="row" className={t.rowHead}>Under 1</th>
                      <td className={t.cellNote}>ALT higher than AST. The usual pattern in fatty liver disease and viral hepatitis when enzymes are raised.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>1 to 2</th>
                      <td className={t.cellNote}>AST higher than ALT. In nonalcoholic chronic liver disease, associated with cirrhosis; also raised by muscle sources.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>Above 2</th>
                      <td className={t.cellNote}>AST more than twice ALT. Classically associated with alcohol-related liver disease; not specific.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>When the ratio is not worth reading into</h2>
              <p>
                With both enzymes inside your lab&apos;s reference range, the ratio is weakly informative: an AST of
                25 and an ALT of 20 give 1.25, and that is common in healthy people. Very low values distort it too,
                since an AST of 18 over an ALT of 9 gives 2.00 without saying anything about the liver. Ranges also
                differ by lab; the ACG guideline puts a healthy upper limit for ALT at about 29 to 33 U/L in men and
                19 to 25 U/L in women, lower than many printed ranges, a gap covered in{" "}
                <Link href="/blog/optimal-vs-normal-blood-test-ranges">optimal versus normal ranges</Link>.
              </p>
              <p>
                AST is less liver-specific than ALT. It is also found in muscle, heart and red blood cells, so a
                heavy workout in the days before the draw, a muscle injury or a sample that hemolyzed in the tube
                can raise AST and the ratio, which is why{" "}
                <Link href="/blog/how-to-prepare-for-blood-test">preparing for a blood test</Link> includes skipping
                hard training. Clinicians read the ratio next to the rest of the panel:{" "}
                <Link href="/blog/ggt-levels-high-meaning">GGT</Link>, alkaline phosphatase and bilirubin, which the{" "}
                <Link href="/tools/bilirubin-unit-converter">bilirubin unit converter</Link> translates between
                mg/dL and µmol/L. This page is educational and not a diagnosis; any raised liver enzyme is worth
                talking to your clinician about, whatever the ratio.
              </p>
              <p>
                Already have your bloodwork? <a href="https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-ast-alt-ratio-calculator&mt=8">Merios</a> reads
                it next to your watch data, so an AST bump after a hard training week sits beside the workouts that
                explain it.
              </p>
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={t.ctaQuote}>
                  One liver panel is a snapshot. <em>A trend shows what is normal for you.</em>
                </p>
                <p className={t.ctaText}>
                  Merios reads your liver enzymes next to your Apple Watch activity and sleep data, so an AST rise
                  after a long run looks different from one that stays up across panels.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=ast-alt-ratio-calculator" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/alt-level-40-high" className="btn btn-ghost-night">
                  Is an ALT of 40 high? →
                </Link>
              </div>
              <CtaScreen screen="blood-panel" />
            </div>
          </section>

          <ToolRelated slug="ast-alt-ratio-calculator" />
        </div>
      </main>
      <Footer />
    </>
  );
}
