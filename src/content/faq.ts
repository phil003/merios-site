// ─── FAQ dataset ─────────────────────────────────────────────────────────────
// Groups are a UI concept only. The JSON-LD schema in the page flattens every
// entry into a single mainEntity list (see src/app/faq/page.tsx).
//
// Placeholder-plausible copy for Sprint 5 Phase 3.2 scaffold. Phase 4 will
// polish wording, trim length, and confirm product claims with Phil.

export type FaqGroupKey =
  | "product"
  | "science"
  | "privacy"
  | "pricing"
  | "support";

export interface FaqGroupMeta {
  key: FaqGroupKey;
  eyebrow: string;
  title: string;
}

export interface FaqEntry {
  id: string;
  group: FaqGroupKey;
  q: string;
  a: string;
}

// Rendering order for group sections on the page.
export const FAQ_GROUPS: FaqGroupMeta[] = [
  { key: "product", eyebrow: "01 — Product", title: "The product" },
  { key: "science", eyebrow: "02 — Science", title: "The science" },
  { key: "privacy", eyebrow: "03 — Privacy", title: "Your data" },
  { key: "pricing", eyebrow: "04 — Pricing", title: "Access & pricing" },
  { key: "support", eyebrow: "05 — Support", title: "Support" },
];

export const FAQ_ENTRIES: FaqEntry[] = [
  // ─── Product ──────────────────────────────────────────────────────────────
  {
    id: "what-is-merios",
    group: "product",
    q: "What is Merios?",
    a: "Merios is a health intelligence platform. It turns your blood tests, wearable data, and daily check-ins into a single score and a clear set of priorities — without the wellness theatre.",
  },
  {
    id: "what-does-merios-measure",
    group: "product",
    q: "What does Merios actually measure?",
    a: "More than 150 biomarkers across four pillars — metabolic, cardiovascular, hormonal and inflammatory — combined with sleep, recovery and activity signals from Apple Health. Every reading is contextualised against reference ranges and your personal baseline.",
  },
  {
    id: "who-is-merios-for",
    group: "product",
    q: "Who is Merios built for?",
    a: "People who already take their health seriously and want a precise, calm view of the signal inside their data. It assumes you've got labs, a wearable, or both — and you want more than a colour-coded dashboard.",
  },

  // ─── Science ──────────────────────────────────────────────────────────────
  {
    id: "how-is-the-score-built",
    group: "science",
    q: "How is the Merios score built?",
    a: "The score aggregates weighted inputs across four pillars, using models validated against peer-reviewed reference ranges and longitudinal cohort data. Each pillar is visible and auditable — you see how your score is constructed, not just the final number.",
  },
  {
    id: "who-reviews-the-methodology",
    group: "science",
    q: "Who reviews the methodology?",
    a: "Our methodology is reviewed by an internal board of medical doctors and clinical researchers, with external peer review for each major model update. Reference ranges follow current clinical consensus; where evidence is limited, we say so.",
  },
  {
    id: "is-merios-a-medical-device",
    group: "science",
    q: "Is Merios a medical device?",
    a: "No. Merios is an analytical tool for people who already have access to their own health data. It is not a diagnostic product and does not replace medical advice — it's built to help you ask sharper questions of your clinician.",
  },

  // ─── Privacy ──────────────────────────────────────────────────────────────
  {
    id: "where-is-my-data-stored",
    group: "privacy",
    q: "Where is my data stored?",
    a: "Data is encrypted at rest with AES-256 and in transit with TLS 1.3, held on EU-hosted infrastructure with access audits and role-based permissions. Biomarker data is segregated from identity data at the database layer.",
  },
  {
    id: "do-you-sell-my-data",
    group: "privacy",
    q: "Do you ever sell or share my data?",
    a: "No. We don't sell, rent, or share your personal health data with advertisers, insurers, or third-party brokers. Our business model is a paid subscription — nothing else.",
  },
  {
    id: "can-i-delete-everything",
    group: "privacy",
    q: "Can I delete everything?",
    a: "Yes. One action in settings deletes your account and every data point attached to it. Backups are purged within 30 days. You can also export a full copy of your data at any point, in an open JSON format.",
  },

  // ─── Pricing ──────────────────────────────────────────────────────────────
  {
    id: "how-much-does-merios-cost",
    group: "pricing",
    q: "How much does Merios cost?",
    a: "Pricing is finalised at launch. Early access members get founding-rate pricing, locked in for the lifetime of their subscription. There is no free ad-supported tier — the product is paid and independent by design.",
  },
  {
    id: "is-there-a-trial",
    group: "pricing",
    q: "Is there a trial?",
    a: "Yes. You can trial the full product for 14 days. Cancel any time during that window and you won't be charged. No dark patterns, no friction — one tap to cancel.",
  },
  {
    id: "do-you-bill-by-test",
    group: "pricing",
    q: "Do you bill per blood test?",
    a: "No. The subscription covers unlimited biomarker uploads, score recalculations, and historical analysis. You bring the labs; we do the rest.",
  },

  // ─── Support ──────────────────────────────────────────────────────────────
  {
    id: "which-platforms",
    group: "support",
    q: "Which platforms does Merios run on?",
    a: "Merios launches on iOS first, with Apple Health as the core integration. A web companion is available at launch for uploading lab PDFs from desktop. Android is planned for a subsequent release.",
  },
  {
    id: "which-labs-are-supported",
    group: "support",
    q: "Which labs are supported?",
    a: "Most major private and public labs are supported via PDF upload — our OCR parses results from a growing library of lab templates. If your provider isn't recognised, we'll add it within a few working days.",
  },
  {
    id: "how-do-i-get-help",
    group: "support",
    q: "How do I reach support?",
    a: "Every member has a direct line to our support team inside the app, with a target response time of under 24 hours on weekdays. For anything pre-purchase, use the contact link in the footer.",
  },
];

// Convenience helper used by the page + JSON-LD.
export function getEntriesByGroup(group: FaqGroupKey): FaqEntry[] {
  return FAQ_ENTRIES.filter((entry) => entry.group === group);
}
