import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import t from "./tools.module.css";

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
    slug: "transferrin-saturation-calculator",
    eyebrow: "Iron Status",
    title: "TSAT Calculator (Transferrin Saturation)",
    description:
      "Ferritin rises with inflammation and can look normal while iron stores are empty. TSAT is the marker that does not. Accepts TIBC, UIBC or transferrin.",
    inputs: "2 inputs",
    formula: "Iron ÷ TIBC × 100",
  },
  {
    slug: "sarcopenia-index-calculator",
    eyebrow: "Muscle Proxy",
    title: "Sarcopenia Index",
    description:
      "Creatinine comes from muscle, cystatin C does not — so their ratio carries a muscle signal neither marker shows alone. Shown without a false cutoff.",
    inputs: "2 inputs",
    formula: "Creatinine ÷ cystatin C × 100",
  },
  {
    slug: "lpa-unit-converter",
    eyebrow: "Lp(a) Units",
    title: "Lp(a) Unit Converter",
    description:
      "US labs report mg/dL, most others nmol/L. Converts between them and returns a range, because no exact conversion between the two actually exists.",
    inputs: "1 input",
    formula: "No exact conversion — range shown",
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

      <main className={t.main}>
        <div className={t.wrap} style={{ paddingTop: "clamp(28px, 4vw, 56px)" }}>
          <ul className={t.grid}>
            {TOOLS.map((tool, i) => {
              const wide = i === 0 || i === TOOLS.length - 1;
              const pop = i === 0 ? "lilac" : i === TOOLS.length - 1 ? "peach" : undefined;
              const [band, span, dot] = GLYPHS[i % GLYPHS.length];
              return (
                <li
                  key={tool.slug}
                  className={wide ? t.wide : undefined}
                  data-rv=""
                  style={{ "--rv-delay": `${(i % 4) * 0.06}s` } as CSSProperties}
                >
                  <Link href={`/tools/${tool.slug}`} className={t.card} data-pop={pop}>
                    <div className={t.cardTop}>
                      <div className={`label ${t.cardEyebrow}`}>
                        <span aria-hidden className={`label-dot ${t.cardDot}`} />
                        <span>{tool.eyebrow}</span>
                      </div>
                      <span aria-hidden className={t.glyph}>
                        <i style={{ left: `${band}%`, width: `${span}%` }} />
                        <b style={{ left: `${dot}%` }} />
                      </span>
                    </div>

                    <h2 className={t.cardTitle}>{tool.title}</h2>

                    <p className={t.cardDesc}>{tool.description}</p>

                    <div className={t.cardMeta}>
                      <span>{tool.inputs}</span>
                      <span className={t.cardOpen}>
                        Open
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>

                    {wide ? (
                      <span aria-hidden className={t.art}>
                        {i === 0 ? <AgeRing /> : <ZoneBars />}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className={t.disclaimer}>
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

/* ─── Decorative instruments (aria-hidden, no text) ──────────────────────── */

// [band left %, band width %, dot left %] — each card's tiny range bar
const GLYPHS: [number, number, number][] = [
  [18, 40, 30], [10, 34, 52], [24, 30, 36], [30, 40, 62], [14, 44, 40],
  [22, 36, 48], [26, 30, 70], [12, 42, 28], [20, 38, 58], [16, 40, 44],
];

/** PhenoAge: the app's score ring — biological age set against the calendar. */
function AgeRing() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
      <circle cx="120" cy="120" r="78" fill="none" stroke="rgb(16 35 26 / 0.12)" strokeWidth="14" />
      <circle
        cx="120"
        cy="120"
        r="78"
        fill="none"
        stroke="#24503A"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="350 490"
        transform="rotate(-90 120 120)"
      />
      <circle cx="120" cy="120" r="52" fill="none" stroke="rgb(16 35 26 / 0.18)" strokeWidth="1.5" strokeDasharray="2 6" />
      <circle cx="44" cy="137.4" r="9" fill="#D6F050" stroke="#10231A" strokeWidth="3" />
      <path d="M78 120 H100 L106 128 L114 98 L124 144 L130 120 H162" fill="none" stroke="#10231A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Zone 2: five heart-rate zones, the second one lit. */
function ZoneBars() {
  const h = [34, 52, 70, 88, 106];
  return (
    <svg viewBox="0 0 240 200" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
      {h.map((v, i) => (
        <rect
          key={v}
          x={22 + i * 42}
          y={156 - v}
          width="30"
          height={v}
          rx="8"
          fill={i === 1 ? "#10231A" : "rgb(255 255 255 / 0.62)"}
          stroke={i === 1 ? "#D6F050" : "rgb(16 35 26 / 0.12)"}
          strokeWidth={i === 1 ? 3 : 1}
        />
      ))}
      <path d="M14 178 H92 L100 186 L110 160 L122 196 L130 178 H226" fill="none" stroke="#10231A" strokeOpacity="0.55" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="226" cy="178" r="5.5" fill="#D6F050" stroke="#10231A" strokeWidth="1.6" />
    </svg>
  );
}
