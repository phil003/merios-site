/**
 * Drawn article covers: pure data, no fs, safe in client bundles.
 *
 * Open Sky v2 « couvertures dessinées » (mockup Journal.dc.html, 21/11/2026,
 * chosen by Phil): every cover shows its subject, drawn in code on a soft
 * dawn plate. No photo, no mood picture. Seven kinds of cover:
 *  - the marker and its unit (MCHC g/dL, IGF-1 ng/mL…);
 *  - the value placed on its range, only where the cut-offs are established
 *    (ferritin from the article's table, total cholesterol NCEP ATP III,
 *    hs-CRP AHA/CDC, testosterone AUA, calcium score, HbA1c and fasting
 *    glucose ADA, LDL and triglycerides NCEP, vitamin D 20 / 30 ng/mL);
 *  - a comparison (ApoB vs LDL, ferritin vs TSAT…);
 *  - a count (10 biomarkers, 20 markers…);
 *  - a curve or bars, always marked "Illustration";
 *  - a lab-report extract, always marked "Example data";
 *  - a short list (prepare for a draw, coffee, order your own labs…).
 *
 * The 41 specs of the mockup are ported as they are; the other articles
 * follow the same rules, from their own title (numbers, units and lists come
 * from the article, never invented). Rendered by <ArticleCover/> through
 * getDrawnCover().
 *
 * The site v3 cover data (gauge / chart, getCoverSpec) is kept unchanged at
 * the end of this file for the call sites that still read it.
 */

/* ─── Plates: one soft gradient per topic family ─── */

export type CoverPlate =
  | "lavender"
  | "sky"
  | "apricot"
  | "peach"
  | "zenith"
  | "lilac"
  | "mist";

export interface PlateColors {
  /** Gradient start (135deg) */
  from: string;
  /** Gradient end */
  to: string;
  /** The family's mark colour (tag dots, small accents) */
  mark: string;
}

export const PLATES: Record<CoverPlate, PlateColors> = {
  lavender: { from: "#E4E0F8", to: "#EEF0FB", mark: "#C9C0F6" }, // blood tests
  sky: { from: "#DCE5FA", to: "#F1F2FB", mark: "#A8C2F4" }, // biomarkers, metabolic
  apricot: { from: "#FBDCCB", to: "#EFE9F8", mark: "#A65A2C" }, // iron, nutrients
  peach: { from: "#FCE3D6", to: "#F2EEF8", mark: "#FCD6C2" }, // heart and lipids
  zenith: { from: "#D2DFFA", to: "#E9EEFB", mark: "#6E8FE8" }, // wearables, HRV, sleep
  lilac: { from: "#DCD8F6", to: "#ECEAFB", mark: "#9A8BEA" }, // hormones, longevity
  mist: { from: "#E3DEF8", to: "#EEF0FB", mark: "#C9C0F6" }, // kidney, liver
};

const TAG_PLATE: Record<string, CoverPlate> = {
  "Blood Tests": "lavender",
  Pillar: "lavender",
  Biomarkers: "sky",
  "Metabolic Health": "sky",
  Iron: "apricot",
  Vitamins: "apricot",
  Supplements: "apricot",
  Nutrition: "apricot",
  Lipids: "peach",
  Cardiovascular: "peach",
  "Heart Health": "peach",
  "Heart Rate": "peach",
  Inflammation: "peach",
  HRV: "zenith",
  Fitness: "zenith",
  Wearables: "zenith",
  Sleep: "zenith",
  Hormones: "lilac",
  Thyroid: "lilac",
  Longevity: "lilac",
  Tools: "lilac",
  "Mental Health": "lilac",
  Kidney: "mist",
  Liver: "mist",
};

export function getTagPlate(tag: string): CoverPlate {
  return TAG_PLATE[tag] ?? "lavender";
}

/* ─── Public spec (what <ArticleCover/> draws) ─── */

export type CoverMain =
  | { kind: "one"; big: string; unit: string; size: number }
  | {
      kind: "two";
      left: string;
      right: string;
      /** Small caps word between the two sides ("vs", "and", "+") */
      sep: string;
      /** "left unit · right unit", empty when there is none */
      sub: string;
      size: number;
    };

export interface CoverBand {
  /** Range segments, in % of the axis */
  segs: { left: number; width: number; color: string }[];
  /** Pin positions (the article's value), in % */
  pins: number[];
  ticks: {
    at: number;
    label: string;
    align: "start" | "center" | "end";
    strong: boolean;
  }[];
}

export interface CoverCurve {
  /** Main line, zenith (viewBox 0 0 300 70) */
  path: string;
  /** Optional ghost line, ink at 45% */
  ghost?: string;
  ghostDash?: string;
}

export interface CoverRow {
  label: string;
  value: string;
  /** "H", "L", "✓", "?", "×", a step number or "" */
  flag: string;
}

export interface CoverBar {
  label: string;
  /** Fill, in % */
  pct: number;
  color: string;
}

export interface DrawnCover {
  /** Top-left label: the subject */
  kicker: string;
  /** Top-right label: "Illustration", "Example data" or a short context */
  note: string;
  plate: CoverPlate;
  main: CoverMain;
  band?: CoverBand;
  curve?: CoverCurve;
  dots?: number;
  rows?: CoverRow[];
  bars?: CoverBar[];
}

/* ─── Raw specs (same short form as the mockup's specs()) ─── */

type Align = "s" | "c" | "e";
type RawTick = [at: number, label: string, align: Align, strong?: boolean];
interface RawBand {
  segs: [left: number, width: number, color: string][];
  pins: number[];
  ticks: RawTick[];
}
interface RawSpec {
  k: string;
  note?: string;
  plate?: CoverPlate;
  big?: string;
  unit?: string;
  size?: number;
  left?: string;
  right?: string;
  sep?: string;
  ls?: string;
  rs?: string;
  band?: RawBand;
  curve?: { p: string; p2?: string; dash2?: string };
  dots?: number;
  rows?: [label: string, value: string, flag: string][];
  bars?: [label: string, pct: number, color: string][];
}

/* Band colours: lavender = low, sky / zenith = in range, peach = high, warm =
   the far end (Open Sky: apricot #FFA472 is kept for one element per screen,
   so it never draws the "high" end of a range). */
const LAV = "#C9C0F6";
const LAV_SOFT = "#DDD7F9";
const SKY_SOFT = "#CBD9F7";
const SKY = "#A8C2F4";
const ZENITH = "#6E8FE8";
const PEACH = "#FCD6C2";
/** Warm #A65A2C at 60% on white: the far end reads as caution, never alarm. */
const WARM = "#CA9C80";
const HAZE = "#DDE4F8";

/** Ferritin, 0–220 ng/mL, from the ferritin articles' table. */
const FERRITIN_SEGS: RawBand["segs"] = [
  [0, 6.818, LAV],
  [6.818, 6.818, LAV_SOFT],
  [13.636, 9.091, SKY_SOFT],
  [22.727, 9.091, SKY],
  [31.818, 13.636, ZENITH],
  [45.455, 22.727, SKY_SOFT],
  [68.182, 22.727, PEACH],
  [90.909, 9.091, WARM],
];
const FERRITIN_TICKS: RawTick[] = [
  [6.818, "15", "c"],
  [13.636, "30", "c"],
  [31.818, "70", "c"],
  [68.182, "150", "c"],
];

/** Optimal inside normal (schematic). */
const NORMAL_OPTIMAL_TICKS: RawTick[] = [
  [6, "normal", "s"],
  [50, "optimal", "c"],
];

/** HbA1c, 4.5–7.5 %: ADA cut-offs 5.7 (prediabetes) and 6.5 (diabetes). */
const HBA1C_SEGS: RawBand["segs"] = [
  [0, 40, SKY],
  [40, 26.667, PEACH],
  [66.667, 33.333, WARM],
];
const HBA1C_TICKS: RawTick[] = [
  [40, "5.7", "c"],
  [66.667, "6.5", "c"],
];

/** Fasting glucose, 70–140 mg/dL: ADA cut-offs 100 and 126. */
const GLUCOSE_BAND: RawBand = {
  segs: [
    [0, 42.857, SKY],
    [42.857, 37.143, PEACH],
    [80, 20, WARM],
  ],
  pins: [42.857, 57.143],
  ticks: [
    [42.857, "100", "c"],
    [80, "126", "c"],
  ],
};

/** LDL, 40–200 mg/dL: NCEP ATP III cut-offs 100, 130, 160. */
const LDL_BAND: RawBand = {
  segs: [
    [0, 37.5, SKY],
    [37.5, 18.75, SKY_SOFT],
    [56.25, 18.75, PEACH],
    [75, 25, WARM],
  ],
  pins: [56.25],
  ticks: [
    [37.5, "100", "c"],
    [56.25, "130", "c"],
    [75, "160", "c"],
  ],
};

/** Triglycerides, 50–250 mg/dL: NCEP ATP III cut-offs 150 and 200. */
const TG_BAND: RawBand = {
  segs: [
    [0, 50, SKY],
    [50, 25, PEACH],
    [75, 25, WARM],
  ],
  pins: [65],
  ticks: [
    [50, "150", "c"],
    [75, "200", "c"],
  ],
};

/** Vitamin D (25-OH), 0–80 ng/mL: cut-offs 20 and 30. */
const VITD_SEGS: RawBand["segs"] = [
  [0, 25, LAV],
  [25, 12.5, LAV_SOFT],
  [37.5, 62.5, SKY],
];
const VITD_TICKS: RawTick[] = [
  [25, "20", "c"],
  [37.5, "30", "c"],
];

const SPECS: Record<string, RawSpec> = {
  /* ── From the mockup (Journal.dc.html specs()) ── */
  "mchc-blood-test": { k: "Red cells", big: "MCHC", unit: "g/dL" },
  "mcv-blood-test": { k: "Red cells", big: "MCV", unit: "fL" },
  "mch-blood-test": { k: "Red cells", big: "MCH", unit: "pg" },
  "can-chatgpt-read-blood-test-results": {
    k: "Lab report",
    note: "Example data",
    big: "AI",
    unit: "reads your report?",
    size: 40,
    rows: [
      ["MCV", "78 fL", "L"],
      ["RDW", "15.2 %", "H"],
      ["Ferritin", "12 ng/mL", "L"],
    ],
  },
  "apple-watch-recovery-hrv-readiness-score": {
    k: "Readiness",
    left: "Recovery HRV",
    right: "HRV",
    ls: "ms",
    rs: "ms",
    size: 32,
  },
  "ferritin-vs-iron-saturation": {
    k: "Iron status",
    left: "Ferritin",
    right: "TSAT",
    ls: "ng/mL",
    rs: "%",
  },
  "can-you-drink-coffee-before-blood-test": {
    k: "Before the draw",
    big: "Coffee?",
    size: 40,
    rows: [
      ["Water", "", "✓"],
      ["Black coffee", "", "?"],
      ["Breakfast, if fasting", "", "×"],
    ],
  },
  "mcv-mch-blood-test-meaning": {
    k: "Red cells",
    left: "MCV",
    right: "MCH",
    ls: "fL",
    rs: "pg",
    size: 48,
  },
  "important-blood-biomarkers-explained": {
    k: "Biomarkers",
    big: "20",
    unit: "markers, explained",
    dots: 20,
  },
  "how-to-prepare-for-blood-test": {
    k: "Before the draw",
    big: "Checklist",
    size: 38,
    rows: [
      ["Fast if your test needs it", "", "✓"],
      ["Drink water", "", "✓"],
      ["Bring your medication list", "", "✓"],
    ],
  },
  "is-my-blood-test-result-bad": {
    k: "Flags",
    note: "Example data",
    big: "H or L?",
    size: 38,
    rows: [
      ["Glucose", "104 mg/dL", "H"],
      ["Potassium", "3.4 mmol/L", "L"],
      ["Sodium", "139 mmol/L", ""],
    ],
  },
  "optimal-vs-normal-blood-test-ranges": {
    k: "Ranges",
    big: "Optimal",
    unit: "inside normal",
    size: 48,
    band: {
      segs: [
        [6, 88, SKY_SOFT],
        [34, 32, ZENITH],
      ],
      pins: [],
      ticks: NORMAL_OPTIMAL_TICKS,
    },
  },
  "blood-tests-normal-but-feel-terrible": {
    k: "Ranges",
    big: "“Normal”",
    unit: "yet you feel terrible",
    size: 44,
    band: {
      segs: [
        [6, 88, SKY_SOFT],
        [34, 32, SKY],
      ],
      pins: [14],
      ticks: NORMAL_OPTIMAL_TICKS,
    },
  },
  "apob-90-borderline": { k: "ApoB", big: "90", unit: "mg/dL" },
  "ferritin-level-15": {
    k: "Ferritin",
    big: "15",
    unit: "ng/mL",
    band: { segs: FERRITIN_SEGS, pins: [6.818], ticks: FERRITIN_TICKS },
  },
  "hematocrit-levels-high-low-meaning": {
    k: "Red cells",
    big: "Hct",
    unit: "%, hematocrit",
  },
  "hemoglobin-14-normal": { k: "Hemoglobin", big: "14", unit: "g/dL" },
  "cac-score-coronary-calcium-scan": {
    k: "Coronary calcium",
    big: "CAC",
    unit: "Agatston score",
    size: 56,
    band: {
      segs: [
        [0, 25, SKY],
        [25, 25, SKY_SOFT],
        [50, 25, PEACH],
        [75, 25, WARM],
      ],
      pins: [],
      ticks: [
        [12.5, "0", "c"],
        [37.5, "1–99", "c"],
        [62.5, "100–399", "c"],
        [87.5, "400+", "c"],
      ],
    },
  },
  "testosterone-400-normal": {
    k: "Total testosterone",
    big: "400–500",
    unit: "ng/dL",
    size: 48,
    band: {
      segs: [
        [0, 20, LAV_SOFT],
        [20, 80, SKY],
      ],
      pins: [40, 50, 60],
      ticks: [
        [20, "300", "c"],
        [40, "400", "c"],
        [60, "500", "c"],
      ],
    },
  },
  "creatinine-1-2-normal": { k: "Creatinine", big: "1.2", unit: "mg/dL" },
  "cholesterol-220-high": {
    k: "Total cholesterol",
    big: "220",
    unit: "mg/dL",
    band: {
      segs: [
        [0, 42.857, SKY],
        [42.857, 28.571, PEACH],
        [71.429, 28.571, WARM],
      ],
      pins: [57.143],
      ticks: [
        [42.857, "200", "c"],
        [71.429, "240", "c"],
      ],
    },
  },
  "cbc-blood-test-results-explained": {
    k: "Complete blood count",
    big: "CBC",
    unit: "red cells · white cells · platelets",
  },
  "white-blood-cell-count-high-low": {
    k: "White cells",
    big: "WBC",
    unit: "×10³/µL",
  },
  "igf-1-levels-meaning": { k: "Growth factor", big: "IGF-1", unit: "ng/mL" },
  "cystatin-c-kidney-function": {
    k: "Kidney",
    left: "Cystatin C",
    right: "Creatinine",
    ls: "mg/L",
    rs: "mg/dL",
  },
  "blood-test-without-doctor": {
    k: "Your own labs",
    big: "Order",
    unit: "without a doctor",
    size: 40,
    rows: [
      ["Order the test", "", "1"],
      ["Get your blood drawn", "", "2"],
      ["Read your results", "", "3"],
    ],
  },
  "iron-supplements-not-working": {
    k: "Iron",
    note: "Illustration",
    big: "12 weeks",
    unit: "of iron, no change?",
    size: 40,
    curve: {
      p: "M0 58 C 80 57, 170 56, 300 54",
      p2: "M0 58 C 90 52, 180 32, 300 10",
      dash2: "5 6",
    },
  },
  "apob-heart-disease-risk": {
    k: "Heart risk",
    left: "ApoB",
    right: "LDL",
    ls: "particles",
    rs: "cholesterol",
    size: 48,
  },
  "biomarkers-to-track-for-longevity": {
    k: "Longevity",
    big: "10",
    unit: "biomarkers to track",
    dots: 10,
  },
  "resting-heart-rate-suddenly-high": {
    k: "Resting heart rate",
    note: "Illustration",
    big: "RHR",
    unit: "bpm, suddenly higher",
    size: 56,
    curve: { p: "M0 52 L 175 52 C 196 52, 206 22, 228 20 L 300 20" },
  },
  "how-to-read-blood-test-results": {
    k: "Lab report",
    note: "Example data",
    big: "Line by line",
    size: 34,
    rows: [
      ["Glucose", "90 mg/dL", ""],
      ["Ferritin", "30 ng/mL", ""],
      ["ALT", "52 U/L", "H"],
    ],
  },
  "apple-watch-hrv-by-age": {
    k: "Apple Watch HRV",
    note: "Illustration",
    big: "HRV",
    unit: "ms, by age",
    size: 56,
    curve: { p: "M0 12 C 60 16, 120 28, 180 40 S 260 56, 300 60" },
  },
  "low-ferritin-normal-hemoglobin": {
    k: "Iron",
    note: "Illustration",
    big: "Ferritin ↓",
    unit: "hemoglobin normal",
    size: 40,
    bars: [
      ["Hemoglobin", 82, SKY],
      ["Ferritin", 22, LAV],
    ],
  },
  "understanding-crp-inflammation": {
    k: "Inflammation",
    big: "CRP",
    unit: "mg/L, C-reactive protein",
  },
  "apple-watch-vo2-max-accuracy": {
    k: "VO₂ max",
    left: "Watch",
    right: "Lab",
    ls: "estimate",
    rs: "measured",
    size: 48,
  },
  "crp-level-above-3-heart-risk": {
    k: "hs-CRP",
    big: "> 3",
    unit: "mg/L",
    band: {
      segs: [
        [0, 16.667, SKY],
        [16.667, 33.333, SKY_SOFT],
        [50, 50, PEACH],
      ],
      pins: [55],
      ticks: [
        [16.667, "1", "c"],
        [50, "3", "c"],
      ],
    },
  },
  "high-homocysteine-heart-risk": {
    k: "Homocysteine",
    big: "Hcy",
    unit: "µmol/L",
  },
  "testosterone-levels-by-age": {
    k: "Testosterone",
    note: "Illustration",
    big: "by age",
    unit: "ng/dL",
    size: 52,
    curve: { p: "M0 18 C 70 18, 120 22, 180 30 S 260 42, 300 46" },
  },
  "how-often-blood-work": {
    k: "Blood work",
    big: "How often?",
    size: 40,
    band: {
      segs: [[0, 100, HAZE]],
      pins: [],
      ticks: [
        [10, "20s", "c"],
        [30, "30s", "c"],
        [50, "40s", "c"],
        [70, "50s", "c"],
        [90, "60s+", "c"],
      ],
    },
  },
  "heart-rate-variability-explained": {
    k: "HRV",
    left: "Recovery HRV",
    right: "Watch HRV",
    ls: "ms",
    rs: "ms",
    size: 32,
  },
  /* The mockup's featured cover (Ferritin 30): the full ferritin scale. */
  "ferritin-30-low-normal": {
    k: "Ferritin",
    note: "Iron status",
    big: "30",
    unit: "ng/mL",
    band: {
      segs: FERRITIN_SEGS,
      pins: [13.636],
      ticks: [
        [6.818, "15", "c"],
        [13.636, "30", "c", true],
        [22.727, "50", "c"],
        [31.818, "70", "c"],
        [45.455, "100", "c"],
        [68.182, "150", "c"],
        [90.909, "200", "c"],
      ],
    },
  },

  /* ── The rest of the journal, same rules ── */

  // A value on an established range
  "hba1c-5-6-normal": {
    k: "HbA1c",
    big: "5.6",
    unit: "%",
    band: { segs: HBA1C_SEGS, pins: [36.667], ticks: HBA1C_TICKS },
  },
  "hba1c-5-7-pre-diabetic": {
    k: "HbA1c",
    big: "5.7–5.9",
    unit: "%",
    size: 52,
    band: { segs: HBA1C_SEGS, pins: [43.333], ticks: HBA1C_TICKS },
  },
  "hba1c-6-5-diabetes": {
    k: "HbA1c",
    big: "6.5",
    unit: "%",
    band: { segs: HBA1C_SEGS, pins: [66.667], ticks: HBA1C_TICKS },
  },
  "fasting-glucose-100-borderline": {
    k: "Fasting glucose",
    big: "100–110",
    unit: "mg/dL",
    size: 52,
    band: GLUCOSE_BAND,
  },
  "ldl-130-borderline": {
    k: "LDL cholesterol",
    big: "130",
    unit: "mg/dL",
    band: LDL_BAND,
  },
  "triglycerides-180-high": {
    k: "Triglycerides",
    big: "180",
    unit: "mg/dL",
    band: TG_BAND,
  },
  "vitamin-d-level-20": {
    k: "Vitamin D",
    big: "20",
    unit: "ng/mL",
    band: { segs: VITD_SEGS, pins: [25], ticks: VITD_TICKS },
  },
  "vitamin-d-30-low": {
    k: "Vitamin D",
    big: "30",
    unit: "ng/mL",
    band: { segs: VITD_SEGS, pins: [37.5], ticks: VITD_TICKS },
  },
  "vitamin-d-deficiency": {
    k: "Vitamin D",
    big: "Vitamin D",
    unit: "deficiency",
    size: 48,
    band: { segs: VITD_SEGS, pins: [], ticks: VITD_TICKS },
  },
  "blood-test-results-normal-range-chart": {
    k: "Reference ranges",
    big: "Ranges",
    unit: "the complete chart",
    size: 52,
    band: {
      segs: [
        [6, 88, SKY_SOFT],
        [30, 40, SKY],
      ],
      pins: [],
      ticks: [
        [6, "low", "s"],
        [50, "normal", "c"],
        [94, "high", "e"],
      ],
    },
  },

  // The marker and its unit
  "vitamin-b12-level-300": { k: "Vitamin B12", big: "300", unit: "pg/mL" },
  "alt-level-40-high": { k: "ALT", big: "40", unit: "U/L" },
  "tsh-4-5-normal-or-high": {
    k: "TSH",
    big: "3.0–4.5",
    unit: "mIU/L",
    size: 52,
  },
  "how-to-lower-triglycerides": {
    k: "Triglycerides",
    big: "> 150",
    unit: "mg/dL",
  },
  "lp-a-lipoprotein-a-high": {
    k: "Lipoprotein(a)",
    big: "Lp(a)",
    unit: "nmol/L",
  },
  "lp-a-treatment-after-pelacarsen": {
    k: "Lipoprotein(a)",
    big: "Lp(a)",
    unit: "after pelacarsen",
    size: 56,
  },
  "ggt-levels-high-meaning": { k: "Liver", big: "GGT", unit: "U/L" },
  "uric-acid-levels-high": {
    k: "Metabolism",
    big: "Uric acid",
    unit: "mg/dL",
    size: 48,
  },
  "fasting-insulin-levels-chart": {
    k: "Fasting insulin",
    big: "Insulin",
    unit: "µIU/mL",
    size: 52,
  },
  "anti-tpo-antibodies-high-hashimotos": {
    k: "Thyroid antibodies",
    big: "Anti-TPO",
    unit: "IU/mL",
    size: 48,
  },
  "omega-3-index-test": {
    k: "Omega-3 index",
    big: "EPA+DHA",
    unit: "% in red cells",
    size: 44,
  },
  "how-to-improve-vo2-max": {
    k: "Cardio fitness",
    big: "VO₂ max",
    unit: "mL/kg/min",
    size: 52,
  },
  "high-cortisol-symptoms-blood-work": {
    k: "Stress hormone",
    big: "Cortisol",
    unit: "µg/dL",
    size: 52,
  },
  "cgm-without-diabetes": {
    k: "Glucose monitor",
    big: "CGM",
    unit: "without diabetes?",
  },
  "how-to-lower-a1c-naturally": {
    k: "Blood sugar",
    big: "A1C",
    unit: "%, how to lower it",
  },
  "ldl-cholesterol-high-healthy-diet": {
    k: "LDL cholesterol",
    big: "LDL",
    unit: "high on a healthy diet?",
  },
  "magnesium-deficiency-symptoms-women": {
    k: "Magnesium",
    big: "Mg",
    unit: "deficiency in women",
  },
  "homa-ir-insulin-resistance": {
    k: "Insulin resistance",
    big: "HOMA-IR",
    unit: "glucose × insulin ÷ 405",
    size: 44,
  },
  "triglyceride-hdl-ratio-calculator": {
    k: "Ratio calculator",
    big: "TG/HDL",
    unit: "triglycerides ÷ HDL",
    size: 48,
  },
  "cholesterol-ratio-calculator": {
    k: "Ratio calculator",
    big: "TC/HDL",
    unit: "LDL/HDL · TG/HDL",
    size: 48,
  },
  "glp-1-muscle-loss-peptides": {
    k: "Weight loss",
    big: "GLP-1",
    unit: "and muscle loss",
    size: 56,
  },
  "muscle-mass-and-longevity": {
    k: "Longevity",
    big: "Strength",
    unit: "predicts lifespan",
    size: 48,
  },
  "how-to-lower-biological-age": {
    k: "Biological age",
    big: "Bio age",
    unit: "how to lower it",
    size: 52,
  },
  "best-foods-for-longevity": {
    k: "Longevity",
    big: "Food",
    unit: "what to eat to live longer",
    size: 56,
  },
  "statins-side-effects-when-to-stop": {
    k: "Cholesterol drugs",
    big: "Statins",
    unit: "side effects",
    size: 52,
  },
  "brain-aging-biomarkers-cognitive-decline": {
    k: "Brain aging",
    big: "Brain",
    unit: "blood biomarkers",
  },
  "boron-supplement-testosterone-benefits": {
    k: "Supplements",
    big: "Boron",
    unit: "and testosterone",
    size: 56,
  },
  "best-supplement-stack-men-health": {
    k: "Supplements",
    big: "Stack",
    unit: "for men",
  },
  "does-coffee-break-a-fast": {
    k: "Fasting",
    big: "Coffee?",
    unit: "and your fast",
    size: 48,
  },

  // A comparison
  "type-2-diabetes-vs-lada-blood-test": {
    k: "Diabetes type",
    left: "Type 2",
    right: "LADA",
    ls: "insulin resistance",
    rs: "autoimmune",
  },
  "biological-age-vs-chronological-age": {
    k: "Biological age",
    left: "Biological",
    right: "Chronological",
    ls: "years",
    rs: "years",
    size: 32,
  },
  "apple-watch-sleep-vs-oura-ring": {
    k: "Sleep tracking",
    left: "Apple Watch",
    right: "Oura",
    ls: "wrist",
    rs: "ring",
    size: 34,
  },
  "lactoferrin-iron-absorption-supplement": {
    k: "Iron absorption",
    left: "Lactoferrin",
    right: "Iron pills",
    size: 32,
  },
  "vitamin-d-b12-deficiency-together": {
    k: "Vitamins",
    left: "Vitamin D",
    right: "B12",
    sep: "and",
    ls: "ng/mL",
    rs: "pg/mL",
    size: 36,
  },
  "vitamin-k2-d3-together": {
    k: "Vitamins",
    left: "K2",
    right: "D3",
    sep: "and",
    size: 56,
  },
  "combine-wearable-data-with-blood-tests": {
    k: "Wearables + labs",
    left: "Wearable",
    right: "Labs",
    sep: "+",
    ls: "daily data",
    rs: "blood tests",
  },

  // A count
  "how-to-lower-cholesterol-without-medication": {
    k: "Cholesterol",
    big: "10",
    unit: "strategies, no medication",
    dots: 10,
  },
  "deep-sleep-how-to-increase": {
    k: "Deep sleep",
    big: "12",
    unit: "strategies",
    dots: 12,
  },
  "biological-age-calculator-blood-test": {
    k: "PhenoAge",
    big: "9",
    unit: "markers + your age",
    dots: 9,
  },
  "best-blood-test-tracking-apps": {
    k: "Tracker apps",
    big: "8",
    unit: "apps, compared",
    dots: 8,
  },

  // A curve, marked as an illustration
  "heart-rate-spike-while-sleeping": {
    k: "Heart rate at night",
    note: "Illustration",
    big: "Spike",
    unit: "bpm, while sleeping",
    size: 48,
    curve: {
      p: "M0 50 L 118 50 C 132 50, 138 16, 150 14 C 162 16, 168 50, 182 50 L 300 50",
    },
  },

  // A short list (straight from the article's sections)
  "full-thyroid-panel-test": {
    k: "Thyroid panel",
    big: "Beyond TSH",
    size: 38,
    rows: [
      ["TSH", "", "✓"],
      ["Free T4", "", "✓"],
      ["Free T3", "", "✓"],
    ],
  },
  "blood-tests-before-starting-supplements": {
    k: "Before supplements",
    big: "Test first",
    size: 38,
    rows: [
      ["Vitamin D", "", "✓"],
      ["B12 and folate", "", "✓"],
      ["Iron panel", "", "✓"],
    ],
  },
  "longevity-blood-panel": {
    k: "Longevity panel",
    big: "Panel",
    unit: "which tests to order",
    size: 40,
    rows: [
      ["Cardiovascular", "", "✓"],
      ["Metabolic", "", "✓"],
      ["Inflammation", "", "✓"],
    ],
  },
  "best-longevity-apps": {
    k: "Longevity apps",
    big: "Age score?",
    size: 40,
    rows: [
      ["Wearables", "", "1"],
      ["Epigenetic tests", "", "2"],
      ["Blood panels", "", "3"],
    ],
  },
  "magnesium-types-compared": {
    k: "Magnesium",
    big: "Mg",
    unit: "which form?",
    size: 40,
    rows: [
      ["Glycinate", "", ""],
      ["L-threonate", "", ""],
      ["Citrate", "", ""],
    ],
  },
};

/* ─── Public API ─── */

const ALIGN: Record<Align, "start" | "center" | "end"> = {
  s: "start",
  c: "center",
  e: "end",
};

function fallbackSpec(tag: string): RawSpec {
  const label = tag || "Journal";
  return { k: label, big: label, size: label.length > 10 ? 40 : 52 };
}

/** The drawn cover of an article (any slug; unknown ones fall back to their tag). */
export function getDrawnCover(post: {
  slug: string;
  title?: string;
  tag: string;
}): DrawnCover {
  const raw = SPECS[post.slug] ?? fallbackSpec(post.tag);
  const two = Boolean(raw.left);

  const main: CoverMain = two
    ? {
        kind: "two",
        left: raw.left ?? "",
        right: raw.right ?? "",
        sep: raw.sep ?? "vs",
        // One unit when both sides share it ("ms", never "ms · ms")
        sub:
          raw.ls && raw.ls === raw.rs
            ? raw.ls
            : [raw.ls, raw.rs].filter(Boolean).join(" · "),
        size: raw.size ?? 40,
      }
    : {
        kind: "one",
        big: raw.big ?? "",
        unit: raw.unit ?? "",
        size: raw.size ?? 64,
      };

  const spec: DrawnCover = {
    kicker: raw.k,
    note: raw.note ?? "",
    plate: raw.plate ?? getTagPlate(post.tag),
    main,
  };

  if (raw.band) {
    spec.band = {
      segs: raw.band.segs.map(([left, width, color]) => ({ left, width, color })),
      pins: raw.band.pins,
      ticks: raw.band.ticks.map(([at, label, align, strong]) => ({
        at,
        label,
        align: ALIGN[align],
        strong: strong === true,
      })),
    };
  }
  if (raw.curve) {
    spec.curve = {
      path: raw.curve.p,
      ghost: raw.curve.p2,
      ghostDash: raw.curve.dash2,
    };
  }
  if (raw.dots) spec.dots = raw.dots;
  if (raw.rows) {
    spec.rows = raw.rows.map(([label, value, flag]) => ({ label, value, flag }));
  }
  if (raw.bars) {
    spec.bars = raw.bars.map(([label, pct, color]) => ({ label, pct, color }));
  }
  return spec;
}

/** The plate colours of a cover (gradient + mark), for panels and tag dots. */
export function getCoverPlate(post: { slug: string; tag: string }): PlateColors {
  const raw = SPECS[post.slug];
  return PLATES[raw?.plate ?? getTagPlate(post.tag)];
}

/* ═══════════════════════════════════════════════════════════════════════════
   Legacy: site v3 cover data (gauge / chart), unchanged. Read by call sites
   written before the drawn covers (getCoverSpec). New code: getDrawnCover().
   ═══════════════════════════════════════════════════════════════════════════ */

/** Pop surface of a chart cover — one per topic family. */
export type CoverTone = "lime" | "lilac" | "sky" | "peach";

export interface GaugeSpec {
  kind: "gauge";
  cat: string;
  tone: CoverTone;
  /** Biomarker short label, e.g. "HbA1c" */
  label: string;
  unit: string;
  value: number;
  /** Axis bounds for the range bar */
  min: number;
  max: number;
  /** Optimal band [start, end] in axis units — drawn lime */
  optimal: [number, number];
  /** Text shown in the arc, defaults to value */
  display?: string;
}

export interface ChartSpec {
  kind: "chart";
  cat: string;
  tone: CoverTone;
  /** Big display motif, ≤ 8 chars (auto-shrinks with length) */
  big: string;
  /** Small italic suffix rendered after `big` (e.g. "%", "ng") */
  suffix?: string;
  /** Curve shape */
  curve: "rise" | "fall" | "dotted" | "wave";
}

export type CoverSpec = GaugeSpec | ChartSpec;

/* ─── Pop tone per tag — four topic families, so a colour means a subject
   (Longevity lilac, Metabolic lime, Blood tests peach, as in the approved
   homepage mockup). Shared by covers, related-article panels and the
   category cards. ─── */

const TAG_TONE: Record<string, CoverTone> = {
  // metabolism & movement
  "Metabolic Health": "lime",
  Fitness: "lime",
  HRV: "lime",
  "Heart Rate": "lime",
  Wearables: "lime",
  Tools: "lime",
  // longevity, hormones, sleep, mind
  Longevity: "lilac",
  Pillar: "lilac",
  Hormones: "lilac",
  Thyroid: "lilac",
  Sleep: "lilac",
  "Mental Health": "lilac",
  // the lab: blood, inflammation, organs
  "Blood Tests": "peach",
  Inflammation: "peach",
  Liver: "peach",
  Iron: "peach",
  Kidney: "peach",
  // heart, lipids, nutrients
  Lipids: "sky",
  "Heart Health": "sky",
  Cardiovascular: "sky",
  Biomarkers: "sky",
  Vitamins: "sky",
  Supplements: "sky",
  Nutrition: "sky",
};

/** Surface colours of the four tones (globals.css v3 tokens, as hex for SVG). */
export const TONE_HEX: Record<CoverTone, string> = {
  lime: "#A8C2F4",
  lilac: "#C9C0F6",
  sky: "#A8C2F4",
  peach: "#FCD6C2",
};

/** A lighter companion of each tone, for gradients and sheen. */
export const TONE_LIGHT: Record<CoverTone, string> = {
  lime: "#D9E4FA",
  lilac: "#E3DEF8",
  sky: "#D9E4FA",
  peach: "#FCD6C2",
};

export function getTagTone(tag: string): CoverTone {
  return TAG_TONE[tag] ?? "lilac";
}

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
  "hba1c-6-5-diabetes": { bio: "hba1c", value: 6.5 },
  "fasting-glucose-100-borderline": { bio: "glucose", value: 100 },
  "ferritin-level-15": { bio: "ferritin", value: 15 },
  "ferritin-30-low-normal": { bio: "ferritin", value: 30 },
  "vitamin-d-30-low": { bio: "vitd", value: 30 },
  "vitamin-d-level-20": { bio: "vitd", value: 20 },
  "vitamin-b12-level-300": { bio: "b12", value: 300 },
  "apob-90-borderline": { bio: "apob", value: 90 },
  "ldl-130-borderline": { bio: "ldl", value: 130 },
  "cholesterol-220-high": { bio: "chol", value: 220 },
  "triglycerides-180-high": { bio: "trig", value: 180 },
  "crp-level-above-3-heart-risk": { bio: "crp", value: 3, display: ">3" },
  "tsh-4-5-normal-or-high": { bio: "tsh", value: 4.5 },
  "alt-level-40-high": { bio: "alt", value: 40 },
  "creatinine-1-2-normal": { bio: "creat", value: 1.2 },
  "testosterone-400-normal": { bio: "testo", value: 400 },
  "hemoglobin-14-normal": { bio: "hgb", value: 14 },
};

/* ─── Chart motifs for the rest (big display text + curve shape) ───
   "how to lower / reduce" articles get a falling curve; growth and
   improvement topics rise; reference charts are dotted. */

const MOTIF: Record<string, { big: string; suffix?: string; curve?: ChartSpec["curve"] }> = {
  "alt-ast-liver-enzymes-high": { big: "ALT", suffix: "AST" },
  "anti-tpo-antibodies-high-hashimotos": { big: "TPO" },
  "apob-heart-disease-risk": { big: "ApoB" },
  "apple-watch-hrv-by-age": { big: "HRV", curve: "wave" },
  "apple-watch-recovery-hrv-readiness-score": { big: "Ready", curve: "rise" },
  "apple-watch-sleep-vs-oura-ring": { big: "vs", curve: "wave" },
  "apple-watch-vo2-max-accuracy": { big: "VO2", suffix: "max" },
  "best-blood-test-tracking-apps": { big: "Apps", curve: "dotted" },
  "best-supplement-stack-men-health": { big: "Stack" },
  "biological-age-calculator-blood-test": { big: "Bio", suffix: "age" },
  "biological-age-vs-chronological-age": { big: "−4.2", suffix: "yrs", curve: "fall" },
  "biomarkers-to-track-for-longevity": { big: "160+", curve: "dotted" },
  "best-foods-for-longevity": { big: "Eat", curve: "rise" },
  "how-to-lower-biological-age": { big: "Reset", curve: "fall" },
  "how-to-improve-vo2-max": { big: "VO2", suffix: "max", curve: "rise" },
  "muscle-mass-and-longevity": { big: "Muscle", curve: "rise" },
  "glp-1-muscle-loss-peptides": { big: "GLP-1", curve: "fall" },
  "blood-test-results-normal-range-chart": { big: "Ranges", curve: "dotted" },
  "blood-test-without-doctor": { big: "DIY" },
  "blood-tests-before-starting-supplements": { big: "First" },
  "blood-tests-normal-but-feel-terrible": { big: "Gap", curve: "wave" },
  "how-to-prepare-for-blood-test": { big: "Prep", curve: "dotted" },
  "is-my-blood-test-result-bad": { big: "OK", suffix: "?", curve: "wave" },
  "cgm-without-diabetes": { big: "CGM", curve: "wave" },
  "optimal-vs-normal-blood-test-ranges": { big: "Opt", suffix: "vs N", curve: "dotted" },
  "inflammation-markers-silent-threat": { big: "CRP", curve: "rise" },
  "important-blood-biomarkers-explained": { big: "20", curve: "dotted" },
  "boron-supplement-testosterone-benefits": { big: "B", suffix: "boron" },
  "brain-aging-biomarkers-cognitive-decline": { big: "Brain", curve: "fall" },
  "cac-score-coronary-calcium-scan": { big: "CAC" },
  "can-chatgpt-read-blood-test-results": { big: "AI", curve: "dotted" },
  "cbc-blood-test-results-explained": { big: "CBC", curve: "dotted" },
  "cholesterol-ratio-calculator": { big: "TC/H", curve: "dotted" },
  "cystatin-c-kidney-function": { big: "CysC" },
  "deep-sleep-how-to-increase": { big: "N3", curve: "rise" },
  "does-coffee-break-a-fast": { big: "Fast?" },
  "can-you-drink-coffee-before-blood-test": { big: "Coffee", suffix: "?" },
  "combine-wearable-data-with-blood-tests": { big: "Sync", curve: "dotted" },
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
  "homa-ir-insulin-resistance": { big: "IR" },
  "how-often-blood-work": { big: "2×/yr", curve: "dotted" },
  "how-to-lower-a1c-naturally": { big: "A1c", curve: "fall" },
  "how-to-lower-cholesterol-without-medication": { big: "LDL", curve: "fall" },
  "how-to-lower-crp-levels": { big: "CRP", curve: "fall" },
  "how-to-lower-triglycerides": { big: "TG", curve: "fall" },
  "how-to-read-blood-test-results": { big: "Read" },
  "igf-1-levels-meaning": { big: "IGF-1" },
  "iron-supplements-not-working": { big: "Fe", suffix: "?" },
  "ferritin-vs-iron-saturation": { big: "Fe", suffix: "vs TSAT" },
  "lactoferrin-iron-absorption-supplement": { big: "Fe", suffix: "+" },
  "ldl-cholesterol-high-healthy-diet": { big: "LDL", suffix: "?" },
  "low-ferritin-normal-hemoglobin": { big: "Fe", suffix: "low" },
  "low-testosterone-young-men-under-30": { big: "Low T", curve: "fall" },
  "lp-a-lipoprotein-a-high": { big: "Lp(a)" },
  "lp-a-treatment-after-pelacarsen": { big: "Lp(a)", curve: "fall" },
  "longevity-blood-panel": { big: "Panel", curve: "dotted" },
  "magnesium-deficiency-symptoms-women": { big: "Mg", suffix: "low" },
  "magnesium-types-compared": { big: "Mg", suffix: "×8", curve: "dotted" },
  "mcv-mch-blood-test-meaning": { big: "MCV", suffix: "MCH" },
  "mch-blood-test": { big: "MCH", suffix: "pg" },
  "mcv-blood-test": { big: "MCV", suffix: "fL" },
  "mchc-blood-test": { big: "MCHC", suffix: "g/dL" },
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
  const tone = getTagTone(post.tag);

  const g = GAUGE[post.slug];
  if (g) {
    const b = BIO[g.bio];
    return {
      kind: "gauge",
      cat,
      tone,
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
    tone,
    big: m?.big ?? cat.split(" ")[0],
    suffix: m?.suffix,
    curve: m?.curve ?? curves[slugHash % curves.length],
  };
}
