import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import CtaPulse from "@/app/tools/CtaPulse";
import HomaIRCalculator from "@/components/calculators/HomaIRCalculator";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";
import t from "../tools.module.css";

const FAQ_ITEMS = [
  {
    q: "What is HOMA-IR?",
    a: "HOMA-IR — Homeostatic Model Assessment for Insulin Resistance — is a single number computed from fasting glucose and fasting insulin that estimates how resistant your tissues are to insulin. It was introduced by Matthews et al. (Diabetologia, 1985) and remains one of the most cited insulin-resistance estimators in clinical research.",
  },
  {
    q: "What's the formula?",
    a: "HOMA-IR = (fasting insulin in µIU/mL × fasting glucose in mg/dL) ÷ 405. Both values must come from the same fasted blood draw (at least 8 hours, water only).",
  },
  {
    q: "What's a healthy range?",
    a: "There is no single universal cutoff — thresholds shift with the population and the insulin assay. The bands most widely used in practice: below 1.0 — optimal insulin sensitivity. 1.0-1.9 — normal. 2.0-2.5 — borderline. Above 2.5 — insulin resistance. For scale, the EPIRCE general-population study derived cutoffs between the 70th and 75th percentiles: 3.46 on a 90th-percentile criterion, but 2.05 once metabolic-syndrome components were taken into account. Athletes and very lean metabolically healthy individuals often score below 0.8.",
  },
  {
    q: "My lab reports glucose in mmol/L — which formula applies?",
    a: "Both are the same model with a different constant. With glucose in mg/dL, divide by 405. With glucose in mmol/L, divide by 22.5. Switch the unit toggle on the calculator and it applies the matching denominator, so you never have to convert by hand. Insulin is in µIU/mL (numerically equal to mIU/L) either way.",
  },
  {
    q: "How often should I retest?",
    a: "If you are acting on an elevated score, every 3 to 6 months is enough to see whether an intervention is working — insulin sensitivity responds to training, fibre, sleep and weight change over weeks to months, not days. Once the number is stable, an annual check alongside your usual panel is reasonable. Read it as a trend across several draws, since a single fasting insulin is a noisy measurement.",
  },
  {
    q: "Does HOMA-IR apply to type 1 diabetes?",
    a: "No. The model assumes a pancreas still secreting insulin and back-calculates resistance from that secretion. In type 1 diabetes, insulin-producing beta cells are largely destroyed and circulating insulin mostly reflects injected doses, so the score is not interpretable. It is also unreliable in anyone on exogenous insulin, for the same reason.",
  },
  {
    q: "Can HOMA-IR be normal while something is still wrong?",
    a: "Yes, and this is its main limitation. HOMA-IR is built from fasting values, so it reflects mainly hepatic insulin resistance. Muscle and fat tissue can be resistant while fasting glucose and insulin still look unremarkable — that shows up after a meal, not in the fasted state. This is why HOMA-IR is read alongside the triglyceride-HDL ratio, HbA1c and waist circumference rather than on its own.",
  },
  {
    q: "Why measure insulin resistance if my fasting glucose is normal?",
    a: "Fasting glucose stays normal long after insulin resistance starts. The pancreas compensates by secreting more insulin to keep glucose in range — so fasting glucose looks fine while insulin is silently climbing. HOMA-IR catches that compensatory phase years before HbA1c rises, which is why endocrinologists increasingly request fasting insulin alongside glucose.",
  },
  {
    q: "Does Merios store these numbers?",
    a: "No. The calculator runs entirely in your browser. Your inputs never leave your device and are not sent to a server.",
  },
];

export const metadata: Metadata = {
  title: "HOMA-IR Calculator (Free, Fasting Glucose + Insulin)",
  description:
    "Free HOMA-IR insulin resistance calculator. Enter fasting glucose and fasting insulin in mg/dL or mmol/L — get your score, the formula, and the interpretation bands. Catches insulin resistance years before HbA1c.",
  alternates: { canonical: "https://merios.life/tools/homa-ir-calculator" },
  openGraph: {
    title: "HOMA-IR Calculator — Free Insulin Resistance Score",
    description:
      "Fasting glucose and insulin in, HOMA-IR out — in mg/dL or mmol/L. Free, no signup.",
    url: "https://merios.life/tools/homa-ir-calculator",
    type: "website",
  },
};

export default function HomaIRCalculatorPage() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://merios.life/tools/homa-ir-calculator#tool",
    name: "HOMA-IR Calculator",
    url: "https://merios.life/tools/homa-ir-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "Free HOMA-IR insulin resistance calculator. Matthews et al. 1985 formula, accepting fasting glucose in mg/dL or mmol/L.",
    isAccessibleForFree: true,
    citation:
      "Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment. Diabetologia 1985;28(7):412-419.",
    inLanguage: "en",
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
          { name: "HOMA-IR Calculator", url: "https://merios.life/tools/homa-ir-calculator" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />

      <PageHero
        eyebrow="HOMA-IR — Matthews 1985"
        title="HOMA-IR calculator"
        subline="Catch insulin resistance before it shows up in HbA1c. The Matthews 1985 formula on two numbers from your panel — fasting glucose and fasting insulin, in mg/dL or mmol/L — with the score and its interpretation band."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <HomaIRCalculator />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>What your HOMA-IR score means</h2>
              <p>
                There is no single universal cutoff, and it is worth being blunt
                about how wide the disagreement is. In the EPIRCE general-population
                study, the threshold moved from 3.46 on a 90th-percentile criterion
                to 2.05 once metabolic-syndrome components were taken into account —
                with every derived cutoff landing between the 70th and 75th
                percentiles of that population. The bands below are the ones most
                widely used in practice, and they are what this calculator reports.
                Read your score as a trend across several draws, not a one-off
                verdict.
              </p>
              <div className={t.bands} data-rv="">
                {[
                  {
                    dot: "lime",
                    from: 0,
                    to: 1,
                    range: "Below 1.0",
                    label: "Optimal",
                    note: "High insulin sensitivity. Common in lean, active, metabolically healthy people — athletes often score below 0.8.",
                  },
                  {
                    dot: "ok",
                    from: 1,
                    to: 2,
                    range: "1.0 – 1.9",
                    label: "Normal",
                    note: "The typical healthy band. Hold it here with sleep, fiber, weight, and resistance training.",
                  },
                  {
                    dot: "warn",
                    from: 2,
                    to: 2.5,
                    range: "2.0 – 2.5",
                    label: "Borderline",
                    note: "The compensatory phase — insulin is climbing while fasting glucose still looks fine. The most reversible stage, and the one where the lab's own reference range will usually still call you normal.",
                  },
                  {
                    dot: "bad",
                    from: 2.5,
                    to: 4,
                    range: "Above 2.5",
                    label: "Insulin resistance",
                    note: "Associated with markedly higher type-2 diabetes and metabolic-syndrome risk in cohort studies. Worth discussing with your doctor and acting on now.",
                  },
                ].map((b) => (
                  <div key={b.range} className={t.bandRow}>
                    <span aria-hidden className={t.bandDot} data-tone={b.dot} />
                    <div className={t.bandBody}>
                      <div className={t.bandHead}>
                        {b.range} — {b.label}
                      </div>
                      <div className={t.bandNote}>{b.note}</div>
                    </div>
                    <span aria-hidden className={t.bandScale}>
                      <span
                        data-tone={b.dot}
                        style={{ left: `${(b.from / 4) * 100}%`, width: `${((b.to - b.from) / 4) * 100}%` }}
                      />
                    </span>
                  </div>
                ))}
              </div>

              <h2>How HOMA-IR is calculated</h2>
              <p>
                The model has one equation and two constants, and which constant you
                use depends only on the unit your lab printed for glucose. Insulin is
                in µIU/mL in both cases (numerically the same as mIU/L).
              </p>
              <div className={`${t.formula} ${t.formulaPair}`}>
                <span>HOMA-IR = (fasting insulin [µIU/mL] × fasting glucose [mg/dL]) ÷ 405</span>
                <br />
                <span>HOMA-IR = (fasting insulin [µIU/mL] × fasting glucose [mmol/L]) ÷ 22.5</span>
              </div>
              <p>
                The denominators are not arbitrary: each represents the product of
                normal fasting glucose and normal fasting insulin in that unit
                system, so a perfectly insulin-sensitive person lands near 1.0. The
                two forms are the same model — 405 and 22.5 differ only by the
                18.0 mg/dL-per-mmol/L glucose conversion. The calculator above
                applies whichever matches the toggle you select.
              </p>
              <p>
                A worked example. Fasting glucose 95 mg/dL, fasting insulin
                8 µIU/mL: 8 × 95 = 760, and 760 ÷ 405 = 1.88. That falls in the
                normal band but above the optimal one — insulin is doing more work
                than it needs to while glucose still reads as unremarkable.
              </p>
              <p>
                Both values must come from the same draw, fasted at least 8 hours,
                water only. A non-fasted insulin will inflate the score enough to
                make it meaningless.
              </p>
              <p>
                One caveat the literature is clear about: the score&rsquo;s accuracy is
                not constant across people. In EPIRCE, the cutoff that best
                identified metabolic syndrome was 1.85 in non-diabetic men and 2.07
                in non-diabetic women at age 50, and its discriminating power in
                women fell steadily with age — an area under the curve of 0.82 at
                age 30 against 0.58 at age 70. HOMA-IR is a screening signal to act
                on and re-measure, not a diagnosis.
              </p>

              <h2>Why this is the first metabolic marker that drifts</h2>
              <p>
                Fasting glucose is a lagging indicator. By the time it rises above
                100 mg/dL, the pancreas has been over-secreting insulin for years.
                HOMA-IR catches that compensatory phase early — when the trajectory
                can still be reversed with sleep, weight, fiber, and resistance
                training, with no medication. It is the cheapest, most underrated
                early-warning system in a routine blood panel.
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

              <p className={t.reference}>
                Reference: Matthews DR, Hosker JP, Rudenski AS, Naylor BA,
                Treacher DF, Turner RC. <em>Homeostasis model assessment: insulin
                resistance and beta-cell function from fasting plasma glucose and
                insulin concentrations in man.</em> Diabetologia 1985;28(7):412-419.
                <br />
                Cutoffs: Gayoso-Diz P, Otero-Gonz&aacute;lez A, Rodriguez-Alvarez MX, et
                al. <em>Insulin resistance (HOMA-IR) cut-off values and the metabolic
                syndrome in a general adult population: effect of gender and age:
                EPIRCE cross-sectional study.</em> BMC Endocrine Disorders
                2013;13:47.
              </p>
            </div>

            <div className={`night ${t.cta}`} data-nav="dark" data-rv="">
              <div className={t.ctaCopy}>
                <p className={`label ${t.ctaEyebrow}`}>
                  <span aria-hidden className="label-dot" />
                  Track this in Merios
                </p>
                <p className={`chrome-text ${t.ctaQuote}`}>
                  A single HOMA-IR is a snapshot. Twelve are a story.
                </p>
                <p className={t.ctaText}>
                  Merios recalculates HOMA-IR every time you upload a blood panel and overlays the curve with sleep, weight, and check-ins — so you can see what's actually moving the needle.
                </p>
              </div>
              <div className={t.ctaActions}>
                <Link href="/early-access" className="btn btn-lime">
                  Get the app
                </Link>
                <Link href="/blog/homa-ir-insulin-resistance" className="btn btn-ghost-night">
                  Read the primer →
                </Link>
              </div>
              <CtaPulse />
            </div>

            <div className={t.next} data-rv="">
              <p className={`label ${t.nextLabel}`}>
                <span aria-hidden className={`label-dot ${t.nextDot}`} />
                Read next
              </p>
              <ul className={t.nextList}>
                <li className={t.nextItem}>
                  <Link href="/tools/tyg-index-calculator" className={t.nextLink}>
                    TyG index calculator
                  </Link>{" "}
                  — no fasting insulin on your report? This estimates insulin
                  resistance from triglycerides and glucose alone.
                </li>
                <li className={t.nextItem}>
                  <Link href="/blog/fasting-insulin-levels-chart" className={t.nextLink}>
                    Fasting insulin levels chart
                  </Link>{" "}
                  — what the insulin value on its own is telling you.
                </li>
                <li className={t.nextItem}>
                  <Link href="/tools/triglyceride-hdl-ratio" className={t.nextLink}>
                    Triglyceride-HDL ratio calculator
                  </Link>{" "}
                  — the marker most worth reading alongside HOMA-IR.
                </li>
                <li className={t.nextItem}>
                  <Link href="/tools/a1c-calculator" className={t.nextLink}>
                    A1C to average glucose calculator
                  </Link>{" "}
                  — the three-month view that HOMA-IR precedes by years.
                </li>
                <li className={t.nextItem}>
                  <Link href="/blog/fasting-glucose-100-borderline" className={t.nextLink}>
                    Fasting glucose 100 mg/dL
                  </Link>{" "}
                  — why a borderline glucose is worth a HOMA-IR.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
