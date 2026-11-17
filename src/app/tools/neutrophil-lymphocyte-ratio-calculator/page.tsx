import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import NeutrophilLymphocyteRatioCalculator from "@/components/calculators/NeutrophilLymphocyteRatioCalculator";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import CtaPulse from "../CtaPulse";
import t from "../tools.module.css";

const TITLE = "Neutrophil Lymphocyte Ratio (NLR) Calculator";
const NAME = "Neutrophil-to-Lymphocyte Ratio Calculator";
const DESCRIPTION =
  "Free NLR calculator: divide neutrophils by lymphocytes, from absolute counts or CBC percentages. Healthy adults sit around 0.78 to 3.53 (Forget et al., 2017).";

// Common NLR values (checked by hand, two decimals). Bands as in the calculator.
const NLR_EXAMPLES: [string, string, string, string][] = [
  ["3.0", "2.0", "1.50", "Typical adult range"],
  ["3.6", "2.0", "1.80", "Typical adult range"],
  ["4.0", "2.0", "2.00", "Typical adult range"],
  ["5.0", "2.0", "2.50", "Typical range, upper part"],
  ["2.0", "3.0", "0.67", "Below typical range"],
  ["6.0", "1.5", "4.00", "Above typical range"],
  ["8.0", "1.0", "8.00", "Above typical range"],
  ["60%", "30%", "2.00", "Typical adult range (from percentages)"],
  ["70%", "20%", "3.50", "Typical range, upper part (from percentages)"],
  ["80%", "12%", "6.67", "Above typical range (from percentages)"],
];

const FAQ_ITEMS = [
  { q: "What is a normal neutrophil to lymphocyte ratio?", a: "In 413 healthy working adults aged 21 to 66, Forget and colleagues (BMC Research Notes, 2017) found a mean NLR of 1.65 and a normal range of about 0.78 to 3.53. In a national US sample of 9,427 adults (NHANES 2007 to 2010), Azab and colleagues (PLoS One, 2014) reported a mean of 2.15, with lower values in non-Hispanic Black adults (mean 1.76). Labs rarely print a reference range for NLR, so these studies are the usual reference." },
  { q: "What does a high NLR mean?", a: "A high NLR means neutrophils are high relative to lymphocytes. It is associated with bacterial infection, physical or psychological stress, surgery, hard exercise in the hours before the draw and steroid medicines, and in research with inflammation in many chronic conditions. It is a non-specific marker, not a diagnosis. A high value with fever or symptoms, or one far above the typical range, is worth discussing with a clinician promptly; otherwise a repeat CBC when you are well gives a fairer picture." },
  { q: "What does a low NLR mean?", a: "An NLR below about 0.78 means relatively few neutrophils compared with lymphocytes. It can reflect a naturally lower neutrophil count, such as the common Duffy-null pattern, which is more frequent in people of African descent, or a temporary rise in lymphocytes, as during some viral illnesses. If the absolute neutrophil and lymphocyte counts are within your lab's ranges, a low ratio on its own is rarely meaningful." },
  { q: "How do you calculate NLR from percentages?", a: "Divide the neutrophil percentage by the lymphocyte percentage. A differential of 60% neutrophils and 30% lymphocytes gives an NLR of 2.00. The total white blood cell count is not needed, because both percentages are shares of the same total and it cancels out. You only need the total WBC if you also want the absolute counts: WBC times the percentage divided by 100." },
  { q: "Can stress or exercise change NLR?", a: "Yes. Stress hormones such as cortisol and adrenaline push neutrophils up and lymphocytes down, which is why Zahorec first described NLR as a stress index in critically ill patients (Bratislava Medical Journal, 2001). Hard or long exercise, a recent infection, poor sleep and steroid medicines can all raise NLR for a while, so one result reflects the day of the draw. Comparing CBCs taken under similar conditions, when you feel well, is the fairest way to read a trend." },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/tools/neutrophil-lymphocyte-ratio-calculator" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/tools/neutrophil-lymphocyte-ratio-calculator",
    type: "website",
  },
};

export default function Page() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/neutrophil-lymphocyte-ratio-calculator#tool",
    name: NAME,
    alternateName: ["NLR Calculator", "Neutrophil Lymphocyte Ratio Calculator", "Neutrophil to Lymphocyte Ratio Calculator"],
    url: "https://merios.life/tools/neutrophil-lymphocyte-ratio-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: DESCRIPTION,
    isAccessibleForFree: true,
    citation: [
      "Forget P, Khalifa C, Defour JP, Latinne D, Van Pel MC, De Kock M. What is the normal value of the neutrophil-to-lymphocyte ratio? BMC Res Notes. 2017;10:12. doi:10.1186/s13104-016-2335-5",
      "Azab B, Camacho-Rivera M, Taioli E. Average values and racial differences of neutrophil lymphocyte ratio among a nationally representative sample of United States subjects. PLoS One. 2014;9(11):e112361. doi:10.1371/journal.pone.0112361",
      "Zahorec R. Neutrophil-to-lymphocyte ratio, past, present and future perspectives. Bratisl Lek Listy. 2021;122(7):474-488. doi:10.4149/BLL_2021_078",
    ],
    inLanguage: "en",
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: NAME, url: "https://merios.life/tools/neutrophil-lymphocyte-ratio-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />

      <PageHero
        eyebrow="NLR — two white cell counts, one ratio"
        title="Neutrophil-to-lymphocyte ratio calculator"
        subline="NLR is your neutrophil count divided by your lymphocyte count; healthy adults mostly sit between about 0.78 and 3.53. Use absolute counts or the percentages from your CBC differential."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <NeutrophilLymphocyteRatioCalculator />
          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>How the neutrophil-to-lymphocyte ratio is calculated</h2>
              <p>
                Both numbers come from the white cell differential of a{" "}
                <Link href="/blog/cbc-blood-test-results-explained">complete blood count</Link>. The ratio is a
                simple division:
              </p>
              <p className={t.formula}>NLR = absolute neutrophils ÷ absolute lymphocytes = neutrophil % ÷ lymphocyte %</p>
              <p>
                Absolute counts in ×10³/µL and ×10⁹/L are the same number, and any unit works as long as both counts
                use it. If your report only shows percentages, divide one by the other: both are shares of the same{" "}
                <Link href="/blog/white-blood-cell-count-high-low">total white blood cell count</Link>, so the total
                cancels out and is not needed for the ratio.
              </p>

              <h2>Common NLR values</h2>
              <div className={t.tableWrap} data-rv="">
                <table className={t.table}>
                  <caption className={`${t.caption} ${t.captionPlain}`}>Neutrophil-to-lymphocyte ratio for common CBC values (counts in ×10³/µL)</caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>Neutrophils</th>
                      <th scope="col" className={t.colHead}>Lymphocytes</th>
                      <th scope="col" className={t.colHead}>NLR</th>
                      <th scope="col" className={t.colHead}>Where it sits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NLR_EXAMPLES.map(([n, l, r, note]) => (
                      <tr key={`${n}-${l}`}>
                        <th scope="row" className={t.rowHead}>{n}</th>
                        <td className={t.cell}>{l}</td>
                        <td className={t.cell}>{r}</td>
                        <td className={t.cellNote}>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Normal neutrophil-to-lymphocyte ratio</h2>
              <p>
                Most labs do not print an NLR or a range for it, so published studies of healthy people are the
                reference. In 413 healthy working adults aged 21 to 66, Forget and colleagues found a mean of 1.65
                and a normal range of 0.78 to 3.53 (
                <a href="https://doi.org/10.1186/s13104-016-2335-5" rel="noopener">BMC Research Notes, 2017</a>
                ). In 9,427 US adults from NHANES 2007 to 2010, Azab and colleagues reported a mean of 2.15, with
                2.24 in non-Hispanic White, 2.08 in Hispanic and 1.76 in non-Hispanic Black adults; NLR also rose
                with age (
                <a href="https://doi.org/10.1371/journal.pone.0112361" rel="noopener">PLoS One, 2014</a>
                ). Zahorec&apos;s 2021 review describes 2.3 to 3.0 as a grey zone that may be an early sign of
                low-grade inflammation or stress (
                <a href="https://doi.org/10.4149/BLL_2021_078" rel="noopener">Bratislava Medical Journal, 2021</a>
                ).
              </p>

              <div className={t.tableWrap} data-rv="">
                <table className={`${t.table} ${t.tableKey}`}>
                  <caption className={t.captionNote}>
                    NLR bands used by this calculator, from the healthy-adult range in Forget et al. (2017). They
                    orient, they do not diagnose, and they may not fit older adults, children or pregnancy.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className={t.colHead}>NLR</th>
                      <th scope="col" className={t.colHead}>How it is usually read</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>Under 0.78</th>
                      <td className={t.cellNote}>Below typical range. Often a naturally lower neutrophil count or a temporary rise in lymphocytes.</td>
                    </tr>
                    <tr data-tone="ok">
                      <th scope="row" className={t.rowHead}>0.78–3.53</th>
                      <td className={t.cellNote}>Typical adult range. The upper part, from about 2.3, is a grey zone in Zahorec&apos;s review.</td>
                    </tr>
                    <tr data-tone="warn">
                      <th scope="row" className={t.rowHead}>Above 3.53</th>
                      <td className={t.cellNote}>Above typical range. Associated with infection, physical stress, hard exercise or steroids; non-specific.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>What a high or low NLR suggests</h2>
              <p>
                A high NLR means neutrophils are up, lymphocytes are down, or both. It is associated with bacterial
                infection, surgery, physical or psychological stress and steroid medicines, and in research with
                inflammation across many chronic conditions, alongside markers such as{" "}
                <Link href="/blog/understanding-crp-inflammation">CRP</Link>. It is a non-specific marker: it can
                say that something is stirring the immune system, never what. A low NLR is often a naturally lower
                neutrophil count, including the common Duffy-null pattern, or a temporary rise in lymphocytes after
                a viral illness. A high value with fever or feeling unwell, or one far above the range, is worth
                discussing with a clinician promptly.
              </p>

              <h2>Why a single NLR swings</h2>
              <p>
                Neutrophils respond within hours. Zahorec first proposed the ratio as a stress index after seeing
                neutrophils rise and lymphocytes fall in critically ill patients after surgery and in sepsis (
                <a href="https://pubmed.ncbi.nlm.nih.gov/11723675/" rel="noopener">Bratislava Medical Journal, 2001</a>
                ). Smaller versions of the same response follow a cold, a hard or long workout, a stressful week or
                a course of prednisone, and{" "}
                <Link href="/blog/high-cortisol-symptoms-blood-work">high cortisol</Link> pushes in the same
                direction. The analyzer matters less: Forget found the ratio stable for 48 hours in the tube and
                consistent across five analyzers. So the fairest reading compares draws taken under similar
                conditions, when you feel well, which is part of{" "}
                <Link href="/blog/how-often-blood-work">how often to get blood work</Link>.
              </p>
              <p>
                Already have your bloodwork? <a href="https://apps.apple.com/us/app/merios/id6760352598?pt=128637372&ct=web-nlr-calculator&mt=8">Merios</a> reads
                it next to your watch data, so an NLR sits beside your sleep and recovery around the day of the draw.
              </p>
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={`chrome-text ${t.ctaQuote}`}>
                  One NLR is a snapshot of one morning. A trend shows what is normal for you.
                </p>
                <p className={t.ctaText}>
                  Merios reads your CBC next to your Apple Watch sleep and recovery data, so a high ratio
                  after a rough week looks different from one that stays high across panels.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access?from=neutrophil-lymphocyte-ratio-calculator" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/white-blood-cell-count-high-low" className="btn btn-ghost-night">
                  What a high or low WBC means →
                </Link>
              </div>
              <CtaPulse />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
