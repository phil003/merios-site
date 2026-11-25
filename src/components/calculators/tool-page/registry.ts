/**
 * The tool list: one entry per calculator or converter on merios.life.
 *
 * Shared by the /tools hub (cards, topic filter, CollectionPage JSON-LD) and
 * by every /tools/* page (breadcrumb topic, hero chips, related cards).
 * Titles, eyebrows, descriptions and input counts are the hub's shipped copy.
 * `plate` / `plateSub` are what each card's plate shows: the tool's formula or
 * conversion factor (Open Sky rule: show the subject, never a mood photo).
 */

export type ToolTopic =
  | "Biological age"
  | "Metabolism and hormones"
  | "Heart and lipids"
  | "Kidney and electrolytes"
  | "Liver"
  | "Blood count and iron"
  | "Body and training"
  | "Unit converters";

export type Tool = {
  slug: string;
  /** Set when the calculator lives outside /tools (TG/HDL sits in its guide). */
  href?: string;
  topic: ToolTopic;
  eyebrow: string;
  title: string;
  description: string;
  inputs: string;
  plate: string;
  plateSub: string;
  /** Three tools shown under "More calculators" on this tool's page. */
  related?: [string, string, string];
};

export const TOPICS: ToolTopic[] = [
  "Biological age",
  "Metabolism and hormones",
  "Heart and lipids",
  "Kidney and electrolytes",
  "Liver",
  "Blood count and iron",
  "Body and training",
  "Unit converters",
];

export const TOOLS: Tool[] = [
  {
    slug: "phenoage-calculator",
    topic: "Biological age",
    eyebrow: "Levine 2018",
    title: "PhenoAge Calculator",
    description:
      "Estimate your biological age from 9 standard blood biomarkers using the peer-reviewed Levine 2018 formula. Free, no signup.",
    inputs: "10 inputs",
    plate: "9 blood markers + age",
    plateSub: "Levine 2018 · years",
    related: ["homa-ir-calculator", "neutrophil-lymphocyte-ratio-calculator", "tyg-index-calculator"],
  },
  {
    slug: "homa-ir-calculator",
    topic: "Metabolism and hormones",
    eyebrow: "Insulin Resistance",
    title: "HOMA-IR Calculator",
    description:
      "Calculate Homeostatic Model Assessment for Insulin Resistance from fasting glucose and insulin. Key marker for metabolic health.",
    inputs: "2 inputs",
    plate: "glucose × insulin ÷ 405",
    plateSub: "Matthews 1985 · mg/dL",
    related: ["tyg-index-calculator", "a1c-calculator", "non-hdl-cholesterol-calculator"],
  },
  {
    slug: "transferrin-saturation-calculator",
    topic: "Blood count and iron",
    eyebrow: "Iron Status",
    title: "TSAT Calculator (Transferrin Saturation)",
    description:
      "Ferritin rises with inflammation and can look normal while iron stores are empty. TSAT is the marker that does not. Accepts TIBC, UIBC or transferrin.",
    inputs: "2 inputs",
    plate: "iron ÷ TIBC × 100",
    plateSub: "transferrin saturation, %",
    related: ["iron-unit-converter", "neutrophil-lymphocyte-ratio-calculator", "phenoage-calculator"],
  },
  {
    slug: "a1c-calculator",
    topic: "Metabolism and hormones",
    eyebrow: "A1C → eAG",
    title: "A1C to Blood Sugar",
    description:
      "Convert your A1C to estimated average glucose (eAG) in mg/dL and mmol/L, with the full conversion chart from optimal to the diabetes range.",
    inputs: "1 input",
    plate: "eAG = 28.7 × A1C − 46.7",
    plateSub: "ADAG study 2008 · mg/dL",
    related: ["homa-ir-calculator", "tyg-index-calculator", "mmol-to-mg-dl-converter"],
  },
  {
    slug: "non-hdl-cholesterol-calculator",
    topic: "Heart and lipids",
    eyebrow: "Lipids",
    title: "Non-HDL Cholesterol Calculator",
    description:
      "Total cholesterol minus HDL: the cholesterol carried by every particle that can build plaque, not just LDL. No fasting needed, and closer to ApoB than LDL is.",
    inputs: "2 inputs",
    plate: "total − HDL",
    plateSub: "NLA 2014",
    related: ["cholesterol-unit-converter", "lpa-unit-converter", "triglyceride-hdl-ratio"],
  },
  {
    slug: "tyg-index-calculator",
    topic: "Metabolism and hormones",
    eyebrow: "Insulin Resistance",
    title: "TyG Index Calculator",
    description:
      "The triglyceride-glucose index estimates insulin resistance from two values already on your standard panel — no fasting insulin draw needed.",
    inputs: "2 inputs",
    plate: "ln[(TG × glucose) ÷ 2]",
    plateSub: "mg/dL",
    related: ["homa-ir-calculator", "triglyceride-hdl-ratio", "a1c-calculator"],
  },
  {
    slug: "free-testosterone-calculator",
    topic: "Metabolism and hormones",
    eyebrow: "Vermeulen 1999",
    title: "Free Testosterone Calculator",
    description:
      "Total testosterone can look normal while the free fraction is low. Calculate free and bioavailable T from total T, SHBG and albumin, plus the free androgen index.",
    inputs: "3 inputs",
    plate: "total T, SHBG, albumin → free T",
    plateSub: "Vermeulen 1999",
    related: ["testosterone-unit-converter", "dhea-unit-converter", "phenoage-calculator"],
  },
  {
    slug: "neutrophil-lymphocyte-ratio-calculator",
    topic: "Blood count and iron",
    eyebrow: "Inflammation Pattern",
    title: "Neutrophil-to-Lymphocyte Ratio Calculator",
    description:
      "NLR from your CBC differential, using absolute counts or percentages, placed on the range seen in healthy adults. Explains why one result can swing.",
    inputs: "2–3 inputs",
    plate: "neutrophils ÷ lymphocytes",
    plateSub: "from your CBC",
    related: ["phenoage-calculator", "transferrin-saturation-calculator", "ast-alt-ratio-calculator"],
  },
  {
    slug: "anion-gap-calculator",
    topic: "Kidney and electrolytes",
    eyebrow: "Acid-Base",
    title: "Anion Gap Calculator",
    description:
      "A value calculated from three electrolytes on your metabolic panel. Low albumin can hide a raised gap, so this one applies the Figge correction when you add it.",
    inputs: "3–5 inputs",
    plate: "Na − (Cl + HCO₃)",
    plateSub: "mEq/L",
    related: ["bun-creatinine-ratio-calculator", "corrected-calcium-calculator", "creatinine-unit-converter"],
  },
  {
    slug: "bun-creatinine-ratio-calculator",
    topic: "Kidney and electrolytes",
    eyebrow: "Kidney Pattern",
    title: "BUN/Creatinine Ratio Calculator",
    description:
      "A high ratio with a normal creatinine often points to hydration or diet rather than the kidneys. Accepts US units or SI urea and creatinine.",
    inputs: "2 inputs",
    plate: "BUN ÷ creatinine",
    plateSub: "US or SI units",
    related: ["creatinine-unit-converter", "anion-gap-calculator", "sarcopenia-index-calculator"],
  },
  {
    slug: "corrected-calcium-calculator",
    topic: "Kidney and electrolytes",
    eyebrow: "Calcium + Albumin",
    title: "Corrected Calcium Calculator",
    description:
      "A low albumin can make a normal calcium look low. Adjusts total calcium for albumin in mg/dL or mmol/L and shows the result in both units.",
    inputs: "2 inputs",
    plate: "Ca + 0.8 × (4 − albumin)",
    plateSub: "Payne 1973 · mg/dL",
    related: ["anion-gap-calculator", "bun-creatinine-ratio-calculator", "mmol-to-mg-dl-converter"],
  },
  {
    slug: "ast-alt-ratio-calculator",
    topic: "Liver",
    eyebrow: "Liver Pattern",
    title: "AST/ALT Ratio Calculator",
    description:
      "The De Ritis ratio from your liver panel, with what below 1, above 1 and above 2 are linked to. Explains when the ratio is not worth reading into.",
    inputs: "2 inputs",
    plate: "AST ÷ ALT",
    plateSub: "De Ritis ratio",
    related: ["bilirubin-unit-converter", "bun-creatinine-ratio-calculator", "neutrophil-lymphocyte-ratio-calculator"],
  },
  {
    slug: "sarcopenia-index-calculator",
    topic: "Body and training",
    eyebrow: "Muscle Proxy",
    title: "Sarcopenia Index",
    description:
      "Creatinine comes from muscle, cystatin C does not — so their ratio carries a muscle signal neither marker shows alone. Shown without a false cutoff.",
    inputs: "2 inputs",
    plate: "creatinine ÷ cystatin C × 100",
    plateSub: "a muscle signal",
    related: ["creatinine-unit-converter", "zone-2-calculator", "phenoage-calculator"],
  },
  {
    slug: "zone-2-calculator",
    topic: "Body and training",
    eyebrow: "Zone 2 Training",
    title: "Zone 2 Heart Rate",
    description:
      "Get your Zone 2 training band in bpm from your age — the low-intensity zone that builds aerobic base and raises VO2 max with the least fatigue.",
    inputs: "1 input",
    plate: "max HR = 208 − 0.7 × age",
    plateSub: "Tanaka 2001 · bpm",
    related: ["sarcopenia-index-calculator", "phenoage-calculator", "homa-ir-calculator"],
  },
  {
    slug: "triglyceride-hdl-ratio",
    // The calculator lives in its full guide (the thin /tools page was merged
    // into it and now redirects there, see next.config.ts).
    href: "/blog/triglyceride-hdl-ratio-calculator",
    topic: "Heart and lipids",
    eyebrow: "Cardiovascular Risk",
    title: "Triglyceride / HDL Ratio",
    description:
      "One of the strongest single-number predictors of insulin resistance and atherogenic dyslipidemia. Often more revealing than LDL alone.",
    inputs: "2 inputs",
    plate: "triglycerides ÷ HDL",
    plateSub: "mg/dL",
  },
  {
    slug: "vitamin-d-unit-converter",
    topic: "Unit converters",
    eyebrow: "Vitamin D Units",
    title: "Vitamin D Converter",
    description:
      "US labs report 25-OH vitamin D in ng/mL, the UK, Canada and Europe in nmol/L. Converts exactly in both directions and shows where your level sits.",
    inputs: "1 input",
    plate: "1 ng/mL = 2.496 nmol/L",
    plateSub: "25-OH vitamin D",
    related: ["mmol-to-mg-dl-converter", "testosterone-unit-converter", "lpa-unit-converter"],
  },
  {
    slug: "mmol-to-mg-dl-converter",
    topic: "Unit converters",
    eyebrow: "Lab Units",
    title: "mmol/L to mg/dL Converter",
    description:
      "There is no single factor: glucose, cholesterol and triglycerides each convert differently. Eight markers, each with its exact molar-mass factor, both directions.",
    inputs: "1 input",
    plate: "mmol/L × molar mass ÷ 10",
    plateSub: "eight markers",
    related: ["cholesterol-unit-converter", "creatinine-unit-converter", "uric-acid-unit-converter"],
  },
  {
    slug: "cholesterol-unit-converter",
    topic: "Unit converters",
    eyebrow: "Lipid Units",
    title: "Cholesterol Converter",
    description:
      "LDL, HDL, total and non-HDL cholesterol, triglycerides and ApoB between mg/dL, mmol/L and g/L, with the right factor for each marker.",
    inputs: "1 input",
    plate: "× 38.67 · × 88.57",
    plateSub: "cholesterol · triglycerides",
    related: ["non-hdl-cholesterol-calculator", "lpa-unit-converter", "mmol-to-mg-dl-converter"],
  },
  {
    slug: "testosterone-unit-converter",
    topic: "Unit converters",
    eyebrow: "Testosterone Units",
    title: "Testosterone Converter",
    description:
      "US labs report total testosterone in ng/dL, most others in nmol/L. Converts exactly both ways and shows where the number sits for adult men.",
    inputs: "1 input",
    plate: "1 nmol/L = 28.84 ng/dL",
    plateSub: "total testosterone",
    related: ["free-testosterone-calculator", "dhea-unit-converter", "vitamin-d-unit-converter"],
  },
  {
    slug: "lpa-unit-converter",
    topic: "Unit converters",
    eyebrow: "Lp(a) Units",
    title: "Lp(a) Unit Converter",
    description:
      "US labs report mg/dL, most others nmol/L. Converts between them and returns a range, because no exact conversion between the two actually exists.",
    inputs: "1 input",
    plate: "mg/dL ↔ nmol/L",
    plateSub: "a range, never one factor",
    related: ["cholesterol-unit-converter", "non-hdl-cholesterol-calculator", "vitamin-d-unit-converter"],
  },
  {
    slug: "creatinine-unit-converter",
    topic: "Unit converters",
    eyebrow: "Lab Units",
    title: "Creatinine Unit Converter",
    description:
      "µmol/L to mg/dL and back with the exact 88.4 factor, a 0.5–5.0 mg/dL chart, adult ranges for women and men, and what moves creatinine besides the kidneys.",
    inputs: "1 input",
    plate: "1 mg/dL = 88.4 µmol/L",
    plateSub: "serum creatinine",
    related: ["bun-creatinine-ratio-calculator", "sarcopenia-index-calculator", "mmol-to-mg-dl-converter"],
  },
  {
    slug: "iron-unit-converter",
    topic: "Unit converters",
    eyebrow: "Lab Units",
    title: "Iron Unit Converter",
    description:
      "Serum iron and TIBC from µg/dL to µmol/L with the 0.1791 factor, ferritin in ng/mL, µg/L and pmol/L, a conversion chart, and why iron cannot be converted into ferritin.",
    inputs: "1 input",
    plate: "1 µg/dL = 0.1791 µmol/L",
    plateSub: "serum iron and TIBC",
    related: ["transferrin-saturation-calculator", "mmol-to-mg-dl-converter", "vitamin-d-unit-converter"],
  },
  {
    slug: "dhea-unit-converter",
    topic: "Unit converters",
    eyebrow: "Lab Units",
    title: "DHEA Unit Converter",
    description:
      "DHEA-S from µg/dL to µmol/L with the 0.02714 factor, plain DHEA in ng/mL, ng/dL and nmol/L, age and sex ranges, and why DHEA and DHEA-S never convert into each other.",
    inputs: "1 input",
    plate: "1 µg/dL = 0.02714 µmol/L",
    plateSub: "DHEA-S",
    related: ["testosterone-unit-converter", "free-testosterone-calculator", "vitamin-d-unit-converter"],
  },
  {
    // Has had its own page since launch; the v2 hub lists it (it was missing).
    slug: "bilirubin-unit-converter",
    topic: "Unit converters",
    eyebrow: "Bilirubin Units",
    title: "Bilirubin Converter",
    description:
      "Total and direct bilirubin between mg/dL and µmol/L, in both directions. One factor for both, from bilirubin’s molar mass.",
    inputs: "1 input",
    plate: "1 mg/dL = 17.1 µmol/L",
    plateSub: "total and direct bilirubin",
    related: ["ast-alt-ratio-calculator", "uric-acid-unit-converter", "mmol-to-mg-dl-converter"],
  },
  {
    // Same: a live page the v3 hub did not list.
    slug: "uric-acid-unit-converter",
    topic: "Unit converters",
    eyebrow: "Uric Acid Units",
    title: "Uric Acid Converter",
    description:
      "Uric acid between mg/dL, µmol/L and mmol/L, with tables in both directions and what 6, 6.8 and 7 mg/dL mean.",
    inputs: "1 input",
    plate: "1 mg/dL = 59.48 µmol/L",
    plateSub: "uric acid",
    related: ["mmol-to-mg-dl-converter", "creatinine-unit-converter", "bilirubin-unit-converter"],
  },
];

export function toolHref(tool: Tool): string {
  return tool.href ?? `/tools/${tool.slug}`;
}

export function getTool(slug: string): Tool {
  const tool = TOOLS.find((x) => x.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

/** The three related tools for a page (falls back to the same topic). */
export function relatedTools(slug: string): Tool[] {
  const tool = getTool(slug);
  if (tool.related) return tool.related.map(getTool);
  return TOOLS.filter((x) => x.slug !== slug && x.topic === tool.topic).slice(0, 3);
}
