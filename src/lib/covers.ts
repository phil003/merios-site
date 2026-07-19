/**
 * Generative article-cover specs — pure data, no fs, safe in client bundles.
 *
 * Two directions (picked per article, chosen with Phil 19/07):
 *  - "gauge" (direction C, « rapport de labo ») — for articles centered on a
 *    specific biomarker value: green-deep panel, arc gauge at the article's
 *    value, canvas band with the clinical range bar + marker.
 *  - "chart" (direction A, « data editorial ») — for guides and broader
 *    topics: canvas panel, fine grid, trend curve, big Fraunces motif.
 *
 * Rendered by <ArticleCover/> as inline SVG — zero image bytes, crisp at any
 * size, brand fonts inherited from the page (var(--font-serif) etc.).
 */

export type CoverAccent = "pulse" | "warm" | "sage" | "deep";

export interface GaugeSpec {
  kind: "gauge";
  cat: string;
  accent: CoverAccent;
  /** Biomarker short label, e.g. "HbA1c" */
  label: string;
  unit: string;
  value: number;
  /** Axis bounds for the range bar */
  min: number;
  max: number;
  /** Optimal band [start, end] in axis units — drawn pulse-green */
  optimal: [number, number];
  /** Text shown in the arc, defaults to value */
  display?: string;
}

export interface ChartSpec {
  kind: "chart";
  cat: string;
  accent: CoverAccent;
  /** Big Fraunces motif, ≤ 8 chars (auto-shrinks with length) */
  big: string;
  /** Small italic suffix rendered after `big` (e.g. "%", "ng") */
  suffix?: string;
  /** Curve shape */
  curve: "rise" | "fall" | "dotted" | "wave";
}

export type CoverSpec = GaugeSpec | ChartSpec;

/* ─── Accent per tag (palette tokens resolved in the component) ─── */

const TAG_ACCENT: Record<string, CoverAccent> = {
  "Metabolic Health": "pulse",
  Lipids: "deep",
  "Blood Tests": "pulse",
  Vitamins: "warm",
  Supplements: "warm",
  Hormones: "sage",
  Tools: "deep",
  Thyroid: "sage",
  Sleep: "deep",
  Liver: "warm",
  Iron: "warm",
  Inflammation: "warm",
  Kidney: "sage",
  Fitness: "pulse",
  Pillar: "pulse",
  Nutrition: "sage",
  Biomarkers: "pulse",
  Longevity: "sage",
  "Heart Rate": "pulse",
  "Heart Health": "deep",
  HRV: "pulse",
  Cardiovascular: "deep",
  "Mental Health": "sage",
};

/* ─── Clinical ranges for gauge covers ───
   Axis bounds chosen for readable markers, optimal band per common adult
   reference ranges (US units, matching the articles' own guidance). */

interface Biomarker {
  label: string;
  unit: string;
  min: number;
  max: number;
  optimal: [number, number];
}

const BIO: Record<string, Biomarker> = {
  hba1c: { label: "HbA1c", unit: "%", min: 4, max: 6.5, optimal: [4, 5.7] },
  glucose: { label: "Fasting glucose", unit: "mg/dL", min: 70, max: 126, optimal: [70, 100] },
  ferritin: { label: "Ferritin", unit: "ng/mL", min: 0, max: 200, optimal: [30, 150] },
  vitd: { label: "Vitamin D", unit: "ng/mL", min: 0, max: 80, optimal: [30, 60] },
  b12: { label: "Vitamin B12", unit: "pg/mL", min: 0, max: 900, optimal: [400, 900] },
  apob: { label: "ApoB", unit: "mg/dL", min: 0, max: 130, optimal: [0, 90] },
  ldl: { label: "LDL-C", unit: "mg/dL", min: 0, max: 190, optimal: [0, 100] },
  chol: { label: "Total cholesterol", unit: "mg/dL", min: 100, max: 280, optimal: [100, 200] },
  trig: { label: "Triglycerides", unit: "mg/dL", min: 0, max: 250, optimal: [0, 150] },
  crp: { label: "hs-CRP", unit: "mg/L", min: 0, max: 10, optimal: [0, 1] },
  tsh: { label: "TSH", unit: "mIU/L", min: 0, max: 10, optimal: [0.4, 2.5] },
  alt: { label: "ALT", unit: "U/L", min: 0, max: 80, optimal: [0, 30] },
  creat: { label: "Creatinine", unit: "mg/dL", min: 0.4, max: 1.6, optimal: [0.6, 1.2] },
  testo: { label: "Testosterone", unit: "ng/dL", min: 200, max: 1000, optimal: [500, 900] },
  hgb: { label: "Hemoglobin", unit: "g/dL", min: 10, max: 18, optimal: [12.5, 17] },
};

/* ─── Gauge assignments: slug → biomarker + article value ─── */

const GAUGE: Record<string, { bio: keyof typeof BIO; value: number; display?: string }> = {
  "hba1c-5-6-normal": { bio: "hba1c", value: 5.6 },
  "hba1c-5-7-pre-diabetic": { bio: "hba1c", value: 5.7 },
  "hba1c-5-8-prediabetes": { bio: "hba1c", value: 5.8 },
  "hba1c-6-0-prediabetes": { bio: "hba1c", value: 6.0 },
  "hba1c-6-5-diabetes": { bio: "hba1c", value: 6.5 },
  "fasting-glucose-100-borderline": { bio: "glucose", value: 100 },
  "fasting-glucose-110": { bio: "glucose", value: 110 },
  "ferritin-level-15": { bio: "ferritin", value: 15 },
  "ferritin-30-low-normal": { bio: "ferritin", value: 30 },
  "vitamin-d-30-low": { bio: "vitd", value: 30 },
  "vitamin-d-level-20": { bio: "vitd", value: 20 },
  "vitamin-d-level-30": { bio: "vitd", value: 30 },
  "vitamin-b12-level-300": { bio: "b12", value: 300 },
  "apob-90-borderline": { bio: "apob", value: 90 },
  "ldl-130-borderline": { bio: "ldl", value: 130 },
  "ldl-cholesterol-130": { bio: "ldl", value: 130 },
  "cholesterol-220-high": { bio: "chol", value: 220 },
  "triglycerides-180-high": { bio: "trig", value: 180 },
  "crp-3-elevated": { bio: "crp", value: 3 },
  "crp-level-above-3-heart-risk": { bio: "crp", value: 3, display: ">3" },
  "tsh-4-5-normal-or-high": { bio: "tsh", value: 4.5 },
  "tsh-level-3": { bio: "tsh", value: 3 },
  "alt-level-40-high": { bio: "alt", value: 40 },
  "creatinine-1-2-normal": { bio: "creat", value: 1.2 },
  "testosterone-400-normal": { bio: "testo", value: 400 },
  "hemoglobin-14-normal": { bio: "hgb", value: 14 },
};

/* ─── Chart motifs for the rest (big Fraunces text + curve shape) ───
   "how to lower / reduce" articles get a falling curve; growth and
   improvement topics rise; reference charts are dotted. */

const MOTIF: Record<string, { big: string; suffix?: string; curve?: ChartSpec["curve"] }> = {
  "a1c-to-blood-sugar-chart": { big: "A1c", curve: "dotted" },
  "alt-ast-liver-enzymes-high": { big: "ALT", suffix: "AST" },
  "anti-tpo-antibodies-high-hashimotos": { big: "TPO" },
  "apob-heart-disease-risk": { big: "ApoB" },
  "apple-watch-hrv-by-age": { big: "HRV", curve: "wave" },
  "apple-watch-sleep-vs-oura-ring": { big: "vs", curve: "wave" },
  "apple-watch-vo2-max-accuracy": { big: "VO2", suffix: "max" },
  "best-blood-test-tracking-apps": { big: "Apps", curve: "dotted" },
  "best-supplement-stack-men-health": { big: "Stack" },
  "biological-age-calculator-blood-test": { big: "Bio", suffix: "age" },
  "biological-age-vs-chronological-age": { big: "−4.2", suffix: "yrs", curve: "fall" },
  "biomarkers-to-track-for-longevity": { big: "130+", curve: "dotted" },
  "blood-test-analysis-complete-guide": { big: "Guide" },
  "blood-test-results-normal-range-chart": { big: "Ranges", curve: "dotted" },
  "blood-test-without-doctor": { big: "DIY" },
  "blood-tests-before-starting-supplements": { big: "First" },
  "blood-tests-normal-but-feel-terrible": { big: "Gap", curve: "wave" },
  "boron-supplement-testosterone-benefits": { big: "B", suffix: "boron" },
  "brain-aging-biomarkers-cognitive-decline": { big: "Brain", curve: "fall" },
  "cac-score-coronary-calcium-scan": { big: "CAC" },
  "cbc-blood-test-results-explained": { big: "CBC", curve: "dotted" },
  "cholesterol-ratio-calculator": { big: "TC/H", curve: "dotted" },
  "cystatin-c-kidney-function": { big: "CysC" },
  "deep-sleep-how-to-increase": { big: "N3", curve: "rise" },
  "does-coffee-break-a-fast": { big: "Fast?" },
  "fasting-before-blood-test": { big: "12h" },
  "fasting-insulin-levels-chart": { big: "Insulin", curve: "dotted" },
  "free-testosterone-vs-total-testosterone": { big: "Free", suffix: "vs T" },
  "full-thyroid-panel-test": { big: "T3 T4" },
  "ggt-levels-high-meaning": { big: "GGT" },
  "heart-rate-spike-while-sleeping": { big: "Spike", curve: "wave" },
  "heart-rate-variability-explained": { big: "HRV", curve: "wave" },
  "hematocrit-levels-high-low-meaning": { big: "Hct" },
  "high-cortisol-symptoms-blood-work": { big: "AM", suffix: "cortisol" },
  "high-homocysteine-heart-risk": { big: "Hcy" },
  "homa-ir-calculator": { big: "HOMA", curve: "dotted" },
  "homa-ir-insulin-resistance": { big: "IR" },
  "how-often-blood-work": { big: "2×/yr", curve: "dotted" },
  "how-to-lower-a1c-naturally": { big: "A1c", curve: "fall" },
  "how-to-lower-cholesterol-without-medication": { big: "LDL", curve: "fall" },
  "how-to-lower-crp-levels": { big: "CRP", curve: "fall" },
  "how-to-lower-triglycerides": { big: "TG", curve: "fall" },
  "how-to-read-blood-test-results": { big: "Read" },
  "igf-1-levels-meaning": { big: "IGF-1" },
  "iron-supplements-not-working": { big: "Fe", suffix: "?" },
  "lactoferrin-iron-absorption-supplement": { big: "Fe", suffix: "+" },
  "ldl-cholesterol-high-healthy-diet": { big: "LDL", suffix: "?" },
  "low-ferritin-normal-hemoglobin": { big: "Fe", suffix: "low" },
  "low-testosterone-young-men-under-30": { big: "Low T", curve: "fall" },
  "lp-a-lipoprotein-a-high": { big: "Lp(a)" },
  "magnesium-deficiency-symptoms-women": { big: "Mg", suffix: "low" },
  "magnesium-types-compared": { big: "Mg", suffix: "×8", curve: "dotted" },
  "omega-3-index-test": { big: "Ω-3" },
  "resting-heart-rate-suddenly-high": { big: "RHR", curve: "rise" },
  "shbg-high-low-meaning": { big: "SHBG" },
  "statins-side-effects-when-to-stop": { big: "Statins" },
  "testosterone-levels-by-age": { big: "T", suffix: "by age", curve: "fall" },
  "triglyceride-hdl-ratio-calculator": { big: "TG/H", curve: "dotted" },
  "type-2-diabetes-vs-lada-blood-test": { big: "LADA" },
  "understanding-crp-inflammation": { big: "CRP" },
  "uric-acid-levels-high": { big: "UA" },
  "vitamin-d-b12-deficiency-together": { big: "D+B12" },
  "vitamin-d-deficiency": { big: "Vit D", suffix: "low" },
  "vitamin-k2-d3-together": { big: "K2+D3" },
  "white-blood-cell-count-high-low": { big: "WBC" },
  "zone-2-cardio-heart-rate": { big: "Z2", curve: "wave" },
};

/* ─── Public API ─── */

export function getCoverSpec(post: {
  slug: string;
  title?: string;
  tag: string;
}): CoverSpec {
  const cat = post.tag || "Journal";
  const accent = TAG_ACCENT[post.tag] ?? "deep";

  const g = GAUGE[post.slug];
  if (g) {
    const b = BIO[g.bio];
    return {
      kind: "gauge",
      cat,
      accent,
      label: b.label,
      unit: b.unit,
      value: g.value,
      min: b.min,
      max: b.max,
      optimal: b.optimal,
      display: g.display,
    };
  }

  const m = MOTIF[post.slug];
  const slugHash = post.slug
    .split("")
    .reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const curves: ChartSpec["curve"][] = ["rise", "fall", "dotted", "wave"];
  return {
    kind: "chart",
    cat,
    accent,
    big: m?.big ?? cat.split(" ")[0],
    suffix: m?.suffix,
    curve: m?.curve ?? curves[slugHash % curves.length],
  };
}
