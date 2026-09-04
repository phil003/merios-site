import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

/**
 * /tools — Free Health Calculator Hub.
 *
 * SEO play: backlink-magnet hub for free, formula-based calculators.
 * Each tool earns natural links from wellness blogs, .edu pages, and clinical
 * reference sites. Tools live at clean /tools/[slug] URLs (vs. embedded in blog
 * posts) so they can rank as standalone resources for "X calculator" queries.
 *
 * Three tools shipped in batch 7 (May 2026):
 *   - /tools/phenoage-calculator (Levine 2018, top backlink target)
 *   - /tools/homa-ir-calculator (insulin resistance)
 *   - /tools/triglyceride-hdl-ratio (heart-risk single-number)
 */

export const metadata: Metadata = {
  title: "Free Health Calculators | PhenoAge, HOMA-IR, Trig/HDL — Merios",
  description:
    "Free interactive health calculators based on peer-reviewed formulas: PhenoAge biological age (Levine 2018), HOMA-IR insulin resistance, Triglyceride/HDL cardiovascular ratio. No signup required.",
  alternates: { canonical: "https://merios.life/tools" },
  openGraph: {
    title: "Free Health Calculators — Merios",
    description:
      "PhenoAge biological age, HOMA-IR insulin resistance, Trig/HDL ratio. Peer-reviewed formulas. Free, no signup.",
    url: "https://merios.life/tools",
    type: "website",
  },
};

const TOOLS = [
  {
    slug: "phenoage-calculator",
    eyebrow: "Levine 2018",
    title: "PhenoAge Calculator",
    description:
      "Estimate your biological age from 9 standard blood biomarkers using the peer-reviewed Levine 2018 formula. Free, no signup.",
    inputs: "10 inputs",
    formula: "Levine ME, Aging (Albany NY) 2018",
  },
  {
    slug: "homa-ir-calculator",
    eyebrow: "Insulin Resistance",
    title: "HOMA-IR Calculator",
    description:
      "Calculate Homeostatic Model Assessment for Insulin Resistance from fasting glucose and insulin. Key marker for metabolic health.",
    inputs: "2 inputs",
    formula: "Matthews et al., Diabetologia 1985",
  },
  {
    slug: "triglyceride-hdl-ratio",
    eyebrow: "Cardiovascular Risk",
    title: "Triglyceride / HDL Ratio",
    description:
      "One of the strongest single-number predictors of insulin resistance and atherogenic dyslipidemia. Often more revealing than LDL alone.",
    inputs: "2 inputs",
    formula: "Triglycerides ÷ HDL (mg/dL)",
  },
  {
    slug: "a1c-calculator",
    eyebrow: "A1C → eAG",
    title: "A1C to Blood Sugar",
    description:
      "Convert your A1C to estimated average glucose (eAG) in mg/dL and mmol/L, with the full conversion chart from optimal to the diabetes range.",
    inputs: "1 input",
    formula: "ADAG study, Diabetes Care 2008",
  },
  {
    slug: "free-testosterone-calculator",
    eyebrow: "Vermeulen 1999",
    title: "Free Testosterone Calculator",
    description:
      "Total testosterone can look normal while the free fraction is low. Calculate free and bioavailable T from total T, SHBG and albumin, plus the free androgen index.",
    inputs: "3 inputs",
    formula: "Vermeulen, J Clin Endocrinol Metab 1999",
  },
  {
    slug: "tyg-index-calculator",
    eyebrow: "Insulin Resistance",
    title: "TyG Index Calculator",
    description:
      "The triglyceride-glucose index estimates insulin resistance from two values already on your standard panel — no fasting insulin draw needed.",
    inputs: "2 inputs",
    formula: "ln[(TG × glucose) / 2]",
  },
  {
    slug: "zone-2-calculator",
    eyebrow: "Zone 2 Training",
    title: "Zone 2 Heart Rate",
    description:
      "Get your Zone 2 training band in bpm from your age — the low-intensity zone that builds aerobic base and raises VO2 max with the least fatigue.",
    inputs: "1 input",
    formula: "Tanaka max-HR, JACC 2001",
  },
];

export default function ToolsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://merios.life/tools#collection",
    url: "https://merios.life/tools",
    name: "Free Health Calculators — Merios",
    description:
      "Free interactive health calculators based on peer-reviewed formulas.",
    inLanguage: "en",
    isPartOf: { "@id": "https://merios.life/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: TOOLS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://merios.life/tools/${t.slug}`,
        name: t.title,
      })),
    },
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Tools", url: "https://merios.life/tools" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <PageHero
        eyebrow="Free Tools"
        title="Health calculators, backed by published research."
        subline="Peer-reviewed formulas turned into clean, free, interactive calculators. No signup. No email gate. Just type your numbers."
        align="left"
      />

      <main
        className="pb-24 pt-2"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group flex h-full flex-col rounded-xl p-6 transition-colors"
                  style={{
                    border: "1px solid var(--color-grid)",
                    background: "var(--color-canvas-alt, #ffffff)",
                  }}
                >
                  <div
                    className="inline-flex items-center gap-2.5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--color-pulse)" }}
                    />
                    <span
                      style={{
                        fontSize: 10.5,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--color-green-deep)",
                        fontWeight: 500,
                      }}
                    >
                      {tool.eyebrow}
                    </span>
                  </div>

                  <h2
                    className="mt-5"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.5rem, 2vw, 1.875rem)",
                      fontWeight: 300,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: "var(--color-ink)",
                    }}
                  >
                    {tool.title}
                  </h2>

                  <p
                    className="mt-3 flex-1"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "var(--color-ink-secondary)",
                    }}
                  >
                    {tool.description}
                  </p>

                  <div
                    className="mt-6 flex items-center justify-between border-t pt-4"
                    style={{
                      borderColor: "var(--color-grid)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-ink-tertiary)",
                    }}
                  >
                    <span>{tool.inputs}</span>
                    <span
                      className="inline-flex items-center gap-1.5 transition-transform group-hover:translate-x-0.5"
                      style={{ color: "var(--color-green-deep)" }}
                    >
                      Open
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p
            className="mt-12 max-w-[640px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--color-ink-tertiary)",
            }}
          >
            These tools are educational, not diagnostic. Calculators implement
            the formulas exactly as published. They do not replace a clinical
            evaluation. If a result concerns you, talk to a physician.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
