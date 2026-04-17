// Canonical Merios product model.
// Pillar and system are DIFFERENT concepts — see CLAUDE.md "Product model".
// 4 pillars compose the overall health score; the 11 blood systems are the
// sub-structure of the Blood pillar only. No detail route per system — they
// surface as cards only.

export const PILLARS = [
  {
    slug: "blood",
    label: "Blood",
    tagline: "[placeholder — biomarker composite signal]",
  },
  {
    slug: "movement",
    label: "Movement",
    tagline: "[placeholder — activity, load, cardio capacity]",
  },
  {
    slug: "sleep",
    label: "Sleep",
    tagline: "[placeholder — architecture, consistency, recovery]",
  },
  {
    slug: "stress",
    label: "Stress",
    tagline: "[placeholder — HRV, cortisol rhythm, resilience]",
  },
] as const;

export type Pillar = (typeof PILLARS)[number];
export type PillarSlug = Pillar["slug"];

export const BLOOD_SYSTEMS = [
  {
    slug: "heart-cv",
    label: "Heart & Cardiovascular",
    description: "[placeholder — lipids, Apo-B, Lp(a), homocysteine]",
  },
  {
    slug: "metabolism-glucose",
    label: "Metabolism & Glucose",
    description: "[placeholder — glucose, HbA1c, insulin, HOMA-IR]",
  },
  {
    slug: "inflammation-immunity",
    label: "Inflammation & Immunity",
    description: "[placeholder — hs-CRP, IL-6, ferritin, WBC lineage]",
  },
  {
    slug: "hematology",
    label: "Hematology",
    description: "[placeholder — CBC, RBC indices, platelets]",
  },
  {
    slug: "liver",
    label: "Liver",
    description: "[placeholder — ALT, AST, GGT, bilirubin, albumin]",
  },
  {
    slug: "kidney-electrolytes",
    label: "Kidney & Electrolytes",
    description: "[placeholder — creatinine, eGFR, Na/K/Cl, urate]",
  },
  {
    slug: "hormonal",
    label: "Hormonal",
    description: "[placeholder — sex steroids, SHBG, cortisol, DHEA-S]",
  },
  {
    slug: "thyroid",
    label: "Thyroid",
    description: "[placeholder — TSH, fT4, fT3, reverse T3, antibodies]",
  },
  {
    slug: "vitamins-minerals",
    label: "Vitamins & Minerals",
    description: "[placeholder — D, B12, folate, Mg, Zn, Se]",
  },
  {
    slug: "performance-recovery",
    label: "Performance & Recovery",
    description: "[placeholder — CK, lactate, omega-3 index]",
  },
  {
    slug: "autoimmune-systemic",
    label: "Autoimmune & Systemic",
    description: "[placeholder — ANA, anti-TPO, complement panel]",
  },
] as const;

export type BloodSystem = (typeof BLOOD_SYSTEMS)[number];
export type BloodSystemSlug = BloodSystem["slug"];
