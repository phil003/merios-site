// Canonical Merios product model.
// Pillar and system are DIFFERENT concepts — see CLAUDE.md "Product model".
// 4 pillars compose the overall health score; the 11 blood systems are the
// sub-structure of the Blood pillar only. No detail route per system — they
// surface as cards only.

export const PILLARS = [
  {
    slug: "blood",
    label: "Blood",
    tagline: "The deepest signal — 130+ biomarkers across 11 systems.",
  },
  {
    slug: "movement",
    label: "Movement",
    tagline: "Daily load, recovery capacity, cardiorespiratory fitness.",
  },
  {
    slug: "sleep",
    label: "Sleep",
    tagline: "Architecture, regularity, restoration over weeks.",
  },
  {
    slug: "stress",
    label: "Stress",
    tagline: "Autonomic balance, HRV, cortisol rhythm, resilience.",
  },
] as const;

export type Pillar = (typeof PILLARS)[number];
export type PillarSlug = Pillar["slug"];

export const BLOOD_SYSTEMS = [
  {
    slug: "heart-cv",
    label: "Heart & Cardiovascular",
    description:
      "Apo-B, Lp(a), LDL particle number, homocysteine, lipid sub-fractions.",
  },
  {
    slug: "metabolism-glucose",
    label: "Metabolism & Glucose",
    description:
      "Fasting glucose, HbA1c, fasting insulin, HOMA-IR, C-peptide.",
  },
  {
    slug: "inflammation-immunity",
    label: "Inflammation & Immunity",
    description:
      "hs-CRP, IL-6, ferritin, fibrinogen, WBC differential, neutrophil-lymphocyte ratio.",
  },
  {
    slug: "hematology",
    label: "Hematology",
    description:
      "Full CBC, RBC indices (MCV, MCH, RDW), hemoglobin, platelet count.",
  },
  {
    slug: "liver",
    label: "Liver",
    description:
      "ALT, AST, GGT, ALP, total and direct bilirubin, albumin, total protein.",
  },
  {
    slug: "kidney-electrolytes",
    label: "Kidney & Electrolytes",
    description:
      "Creatinine, cystatin-C, eGFR, urea, sodium, potassium, chloride, uric acid.",
  },
  {
    slug: "hormonal",
    label: "Hormonal",
    description:
      "Testosterone (total and free), estradiol, SHBG, DHEA-S, cortisol, prolactin.",
  },
  {
    slug: "thyroid",
    label: "Thyroid",
    description:
      "TSH, free T4, free T3, reverse T3, anti-TPO, anti-thyroglobulin antibodies.",
  },
  {
    slug: "vitamins-minerals",
    label: "Vitamins & Minerals",
    description:
      "25-OH Vitamin D, B12, folate, magnesium, zinc, selenium, iron panel.",
  },
  {
    slug: "performance-recovery",
    label: "Performance & Recovery",
    description:
      "Creatine kinase, lactate, omega-3 index, IGF-1, vitamin D status.",
  },
  {
    slug: "autoimmune-systemic",
    label: "Autoimmune & Systemic",
    description:
      "ANA, anti-CCP, rheumatoid factor, complement (C3/C4), ESR.",
  },
] as const;

export type BloodSystem = (typeof BLOOD_SYSTEMS)[number];
export type BloodSystemSlug = BloodSystem["slug"];
