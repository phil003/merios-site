// ─── FAQ dataset ─────────────────────────────────────────────────────────────
// Groups are a UI concept only. The JSON-LD schema in the page flattens every
// entry into a single mainEntity list (see src/app/faq/page.tsx), so the
// questions keep their wording; the answers restate what /privacy, /pricing
// and /contact say (checked Nov 26, 2026).

export type FaqGroupKey =
  | "product"
  | "science"
  | "privacy"
  | "pricing"
  | "support";

export interface FaqGroupMeta {
  key: FaqGroupKey;
  eyebrow: string;
  /** H2 and filter chip label. The H2 sets its last word in italic. */
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
  { key: "privacy", eyebrow: "03 — Data", title: "Your data" },
  { key: "pricing", eyebrow: "04 — Access & pricing", title: "Access & pricing" },
  { key: "support", eyebrow: "05 — Support", title: "Support" },
];

export const FAQ_ENTRIES: FaqEntry[] = [
  // ─── Product ──────────────────────────────────────────────────────────────
  {
    id: "what-is-merios",
    group: "product",
    q: "What is Merios?",
    a: "Merios is a preventive health platform for iPhone. It turns your blood tests, wearable data, and daily check-ins into a single score and a clear set of priorities — without the wellness theater.",
  },
  {
    id: "what-does-merios-measure",
    group: "product",
    q: "What does Merios actually measure?",
    a: "More than 160 blood biomarkers read from your lab reports, combined with sleep, recovery and activity signals from Apple Health. Every reading is contextualized against reference ranges and your personal baseline.",
  },
  {
    id: "who-is-merios-for",
    group: "product",
    q: "Who is Merios built for?",
    a: "People who already take their health seriously and want a precise, calm view of the signal inside their data. It assumes you've got labs, a wearable, or both — and you want more than a color-coded dashboard.",
  },

  // ─── Science ──────────────────────────────────────────────────────────────
  {
    id: "how-is-the-score-built",
    group: "science",
    q: "How is the Merios score built?",
    a: "The score combines four pillars, each computed from your own data and shown next to the total, so you see more than the final number. It is an algorithmic wellness indicator: it has not been clinically validated.",
  },
  {
    id: "who-reviews-the-methodology",
    group: "science",
    q: "Who reviews the methodology?",
    a: "No one outside Merios yet: no clinician has reviewed Merios's scoring rules or reference ranges. The method and the research behind it are public on our Science page (merios.life/science), so you can check them yourself. If a clinician reviews it, we will publish their name and the date of the review there. Merios does not diagnose and does not replace your doctor.",
  },
  {
    id: "is-merios-a-medical-device",
    group: "science",
    q: "Is Merios a medical device?",
    a: "No. Merios is a preventive health platform, not a medical device. It is not a diagnostic product and does not replace medical advice — it's built to help you ask sharper questions of your clinician.",
  },

  // ─── Privacy ──────────────────────────────────────────────────────────────
  {
    id: "where-is-my-data-stored",
    group: "privacy",
    q: "Where is my data stored?",
    a: "In the European Union: your account and health data are hosted on Supabase in Ireland, encrypted in transit (TLS 1.2 or higher) and at rest (AES-256). Row Level Security means each row in the database can be read only by the account it belongs to, and file storage is private.",
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
    a: "Yes. Settings › Delete my account permanently deletes your account and all its data; residual copies in encrypted backups are erased as those backups expire. Two records outlive it: consent records, kept 3 years after deletion to prove what you agreed to, and AI request logs, which hold no content, kept 12 months. Before you delete, Settings › Export my data gives you a full copy in JSON.",
  },

  // ─── Pricing ──────────────────────────────────────────────────────────────
  {
    id: "how-much-does-merios-cost",
    group: "pricing",
    q: "How much does Merios cost?",
    a: "Merios is free to download, and the daily score is free for good. Merios Plus is $44 a year with a 3-day free trial on the annual plan, or a monthly and weekly option — you choose on the App Store, where the current price for your country is always shown. There are no ads and no ad-supported tier: Plus pays for the product, which keeps it independent by design.",
  },
  {
    id: "is-there-a-trial",
    group: "pricing",
    q: "Is there a trial?",
    a: "Yes. The annual plan includes a 3-day free trial of Merios Plus. It converts to a paid subscription when it ends unless you cancel at least 24 hours before, in your iPhone's Settings › [your name] › Subscriptions. No dark patterns: you cancel in Apple's own subscription settings, not through Merios.",
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
    a: "iPhone, with iOS 15.1 or later: Merios is on the App Store in 174 countries and regions. Apple Health is the core integration.",
  },
  {
    id: "which-labs-are-supported",
    group: "support",
    q: "Which labs are supported?",
    a: "Any lab. Take a photo of your report or upload the PDF: an AI model reads the values, and you confirm every value before it is saved. Merios does not keep the photo or PDF; the AI provider may keep the request for up to 30 days for abuse monitoring, never for training.",
  },
  {
    id: "how-do-i-get-help",
    group: "support",
    q: "How do I reach support?",
    a: "Through the contact form at merios.life/contact, or by email at hello@merios.life. A human reads every message, and we reply within 24 hours, Monday to Friday (CET).",
  },
];

// Convenience helper used by the page + JSON-LD.
export function getEntriesByGroup(group: FaqGroupKey): FaqEntry[] {
  return FAQ_ENTRIES.filter((entry) => entry.group === group);
}
