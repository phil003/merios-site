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
    a: "Generally accepted cutoffs (population-dependent): below 1.0 — optimal insulin sensitivity. 1.0-2.0 — normal. 2.0-2.9 — early insulin resistance. 3.0 and above — significant insulin resistance, strong predictor of type-2 diabetes risk. Athletes and very lean metabolically healthy individuals often score below 0.8.",
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
    "Free HOMA-IR insulin resistance calculator. Enter fasting glucose and fasting insulin — get your score with interpretation band. Catches insulin resistance years before HbA1c.",
  alternates: { canonical: "https://merios.life/tools/homa-ir-calculator" },
  openGraph: {
    title: "HOMA-IR Calculator — Free Insulin Resistance Score",
    description:
      "Catches insulin resistance years before HbA1c. Free, no signup.",
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
      "Free HOMA-IR insulin resistance calculator. Matthews et al. 1985 formula.",
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
        title="Catch insulin resistance before it shows up in HbA1c."
        subline="The Matthews 1985 HOMA-IR formula in a free, interactive calculator. Two numbers in — fasting glucose, fasting insulin — and a clean score with interpretation band out."
        align="left"
      />

      <main className={t.main}>
        <div className={t.wrap}>
          <HomaIRCalculator />

          <section className={t.after}>
            <div className={`editorial-prose ${t.prose}`}>
              <h2>What your HOMA-IR score means</h2>
              <p>
                There is no single universal cutoff — labs and populations differ —
                but these are the interpretation bands most widely used in research
                and clinical practice. Read your score as a trend over time, not a
                one-off verdict.
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
                    range: "1.0 – 2.0",
                    label: "Normal",
                    note: "The typical healthy band. Hold it here with sleep, fiber, weight, and resistance training.",
                  },
                  {
                    dot: "warn",
                    from: 2,
                    to: 3,
                    range: "2.0 – 2.9",
                    label: "Early insulin resistance",
                    note: "The compensatory phase — insulin is climbing while fasting glucose still looks fine. The most reversible stage.",
                  },
                  {
                    dot: "bad",
                    from: 3,
                    to: 4,
                    range: "3.0 and above",
                    label: "Significant insulin resistance",
                    note: "A strong predictor of type-2 diabetes risk. Worth discussing with your doctor and acting on now.",
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
                <Link href="/tools/tyg-index-calculator" className={t.ctaTextLink}>
                  No insulin on your report? Use the TyG index instead →
                </Link>
                <Link href="/blog/homa-ir-insulin-resistance" className="btn btn-ghost-night">
                  Read the primer →
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
