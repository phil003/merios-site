import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ToolHero from "@/components/calculators/tool-page/ToolHero";
import ToolFaq from "@/components/calculators/tool-page/ToolFaq";
import ToolRelated from "@/components/calculators/tool-page/ToolRelated";
import FreeAndrogenIndexCalculator from "@/components/calculators/FreeAndrogenIndexCalculator";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import t from "../tools.module.css";

const URL = "https://merios.life/tools/free-androgen-index-calculator";

const FAQ_ITEMS = [
  {
    q: "How is the free androgen index calculated?",
    a: "FAI is total testosterone divided by SHBG, multiplied by 100, with both values in nmol/L. If your testosterone is reported in ng/dL, divide it by 28.84 first to get nmol/L (or multiply ng/mL by 3.467). For example, 50 ng/dL is 1.73 nmol/L, and with an SHBG of 40 nmol/L the FAI is 1.73 divided by 40, times 100, or about 4.3.",
  },
  {
    q: "What is a normal free androgen index for women?",
    a: "There is no single universal cutoff. Many laboratories print an upper limit for premenopausal women somewhere around 4.5 to 5, but intervals depend on the lab, the testosterone assay and the population the lab used to set its range. The interval printed on your own report is the one to compare against.",
  },
  {
    q: "What does a high free androgen index mean?",
    a: "A high FAI suggests that more testosterone is circulating unbound relative to SHBG, either because testosterone is raised or, very often, because SHBG is low. It is one of the measures used to assess biochemical hyperandrogenism, which is one of the criteria considered when polycystic ovary syndrome (PCOS) is evaluated. A high FAI on its own is not a diagnosis of PCOS or of anything else.",
  },
  {
    q: "What is the difference between FAI and free testosterone?",
    a: "Free testosterone is an estimate of the actual concentration of unbound hormone, usually calculated with the Vermeulen equation from total testosterone, SHBG and albumin, or measured by equilibrium dialysis. FAI is a simple ratio with no unit. In women the two track each other reasonably well; in men they diverge, which is why calculated free testosterone is preferred for men.",
  },
  {
    q: "Can I use testosterone in ng/dL for the free androgen index?",
    a: "Yes, as long as it is converted to nmol/L first, because SHBG is reported in nmol/L and the ratio only works with matching units. Dividing ng/dL by 28.84 gives nmol/L. Entering ng/dL straight into the formula inflates the result about 29-fold, which is the most common error on calculators that do not ask for units. This calculator converts for you.",
  },
];

export const metadata: Metadata = {
  title: "Free Androgen Index Calculator (FAI) in ng/dL",
  description:
    "Free androgen index calculator: enter total testosterone in ng/dL, nmol/L or ng/mL and SHBG to get FAI, the formula worked out, and what it means for women.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Free Androgen Index Calculator (FAI)",
    description:
      "Calculate FAI from total testosterone and SHBG, in US or SI units, with an honest read of what the number means in women and why it misleads in men.",
    url: URL,
    type: "website",
  },
};

// The status dot follows the calculator's female bands (under 4.5, 4.5 to 5, above 5).
function faiTone(fai: string): "ok" | "warn" | "bad" {
  const x = parseFloat(fai);
  return x < 4.5 ? "ok" : x <= 5 ? "warn" : "bad";
}

const EXAMPLES: [string, string, string, string][] = [
  ["50 ng/dL", "40 nmol/L", "1.73 ÷ 40 × 100", "4.3"],
  ["50 ng/dL", "20 nmol/L", "1.73 ÷ 20 × 100", "8.7"],
  ["50 ng/dL", "80 nmol/L", "1.73 ÷ 80 × 100", "2.2"],
  ["0.7 ng/mL", "30 nmol/L", "2.43 ÷ 30 × 100", "8.1"],
];

export default function FreeAndrogenIndexCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${URL}#tool`,
    name: "Free Androgen Index Calculator (FAI)",
    url: URL,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free androgen index calculator: 100 × total testosterone ÷ SHBG, with testosterone in ng/dL, nmol/L or ng/mL and SHBG in nmol/L.",
    isAccessibleForFree: true,
    citation: [
      "Vermeulen A, Verdonck L, Kaufman JM. A critical evaluation of simple methods for the estimation of free testosterone in serum. J Clin Endocrinol Metab 1999;84(10):3666-3672.",
      "Teede HJ, Tay CT, Laven JJE, et al. Recommendations from the 2023 International Evidence-based Guideline for the Assessment and Management of Polycystic Ovary Syndrome. J Clin Endocrinol Metab 2023;108(10):2447-2469.",
    ],
    inLanguage: "en-US",
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "Free Androgen Index Calculator", url: URL },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <main className={t.main}>
        <ToolHero
          slug="free-androgen-index-calculator"
          eyebrow="PCOS · Hyperandrogenism"
          title="Free Androgen Index"
          em="Calculator"
          subline="Testosterone in ng/dL, SHBG in nmol/L: most FAI calculators silently mix the two. Enter your report as printed and get the index, the formula worked out, and what it means for women, and why it misleads in men."
        />

        <div className={t.wrap}>
          <FreeAndrogenIndexCalculator />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>How the free androgen index is calculated</h2>
              <p>
                The free androgen index is total testosterone divided by sex hormone-binding globulin (SHBG), times 100,
                with both in nmol/L. SHBG binds testosterone tightly, so the ratio is a rough gauge of how much
                testosterone is left unbound. US labs report testosterone in ng/dL, so it has to be converted first:
                divide by 28.84 (or multiply ng/mL by 3.467).
              </p>
              <p>
                Worked example: a total testosterone of 50 ng/dL is 50 ÷ 28.84 = 1.73 nmol/L. With an SHBG of 40 nmol/L,
                FAI = 1.73 ÷ 40 × 100 ≈ 4.3. Halve the SHBG and the index doubles, with testosterone unchanged.
              </p>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>
                    Free androgen index from US-unit testosterone and SHBG
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Total T</th>
                      <th scope="col" className={t.colHead}>SHBG</th>
                      <th scope="col" className={t.colHead}>Calculation (nmol/L)</th>
                      <th scope="col" className={t.colHead}>FAI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXAMPLES.map(([tt, sh, calc, fai]) => (
                      <tr key={`${tt}-${sh}`} data-tone={faiTone(fai)}>
                        <th scope="row" className={t.rowHead}>{tt}</th>
                        <td className={t.cell}>{sh}</td>
                        <td className={t.cell}>{calc}</td>
                        <td className={t.cellNote}>{fai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>What a normal FAI looks like in women</h2>
              <p>
                There is no guideline cutoff that applies everywhere. Many laboratories print an upper limit for
                premenopausal women of roughly 4.5 to 5, but ranges are lab- and assay-dependent: testosterone measured
                by mass spectrometry reads differently from immunoassay at the low concentrations found in women. The
                2023 International PCOS Guideline recommends using total and free testosterone to assess biochemical
                hyperandrogenism, notes that free testosterone can be estimated by the calculated free androgen index,
                and asks that normal values come from a well-characterized healthy reference population. Use the
                interval on your report.
              </p>

              <h2>My testosterone is normal but my FAI is high</h2>
              <p>
                This is the pattern FAI exists to catch, and the usual reason is a low SHBG. SHBG is lower with insulin
                resistance and higher insulin levels, with higher body weight, and with an underactive thyroid. In the
                second row of the table, the same 50 ng/dL testosterone gives an FAI of 8.7 simply because SHBG is 20
                instead of 40. If your SHBG is low, a fasting glucose and insulin are worth a look; the{" "}
                <Link href="/tools/homa-ir-calculator">HOMA-IR calculator</Link> turns them into an insulin resistance
                score, and{" "}
                the <Link href="/blog/fasting-insulin-levels-chart">fasting insulin levels chart</Link> explains why PCOS
                and insulin resistance so often travel together.
              </p>

              <h2>Does birth control change FAI?</h2>
              <p>
                Yes, often a lot. Estrogen-containing contraceptives raise SHBG and suppress ovarian androgen production,
                so FAI usually falls while you take them, which can hide a high baseline. PCOS guidelines note that
                androgen results are hard to interpret during hormonal contraception. If you have periods, many
                clinicians prefer a morning draw early in the cycle (the early follicular phase), and the same timing on
                repeat tests.
              </p>

              <h2>Why FAI is not used for men</h2>
              <p>
                In women, testosterone is far below the binding capacity of SHBG, and the ratio tracks the unbound
                fraction reasonably well. In men the two are of similar magnitude, SHBG binding is closer to saturation,
                and the relation stops being linear. Vermeulen and colleagues (1999), comparing simple methods with
                equilibrium dialysis, concluded that the testosterone-to-SHBG ratio is not a reliable index of free
                testosterone. Because of the non-linear binding described above, that mismatch matters most in men. For men, use the{" "}
                <Link href="/tools/free-testosterone-calculator">free testosterone calculator</Link>, which applies the
                Vermeulen equation with albumin; for context on totals, see{" "}
                <Link href="/blog/testosterone-levels-by-age">testosterone levels by age</Link>. To convert a single
                value between ng/dL and nmol/L, the{" "}
                <Link href="/tools/testosterone-unit-converter">testosterone unit converter</Link> does it directly.
              </p>

              <p>
                One FAI is a snapshot of two values that both move. Already have your bloodwork?{" "}
                <a href="https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-free-androgen-index&mt=8">
                  Merios
                </a>{" "}
                reads it next to your watch data.
              </p>
            </div>

            <div className={t.faq} data-rv="">
              <h2 className={t.faqTitle}>Frequently asked questions</h2>
              <ToolFaq items={FAQ_ITEMS} />

              <p className={t.reference}>
                References: Vermeulen A, Verdonck L, Kaufman JM. <em>A critical evaluation of simple methods for the
                estimation of free testosterone in serum.</em> J Clin Endocrinol Metab 1999;84(10):3666-3672. Teede HJ,
                Tay CT, Laven JJE, et al. <em>Recommendations from the 2023 International Evidence-based Guideline for
                the Assessment and Management of Polycystic Ovary Syndrome.</em> J Clin Endocrinol Metab
                2023;108(10):2447-2469.
              </p>
            </div>
          </section>

          <ToolRelated slug="free-androgen-index-calculator" />
        </div>
      </main>
      <Footer />
    </>
  );
}
