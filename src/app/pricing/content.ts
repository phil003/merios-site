/**
 * /pricing — the plan sheet and the price chart, as data.
 *
 * Every word and figure comes from the shipped page (page.tsx before the
 * Open Sky port, Nov 25, 2026): the table rows became the three plan cards,
 * the comparison paragraph became the chart. Prices are held in cents so the
 * toggle's equivalents are computed, not typed. When the price changes, edit
 * BILLING, the Merios row of PRICE_CHART, and every "$44" in page.tsx (H1,
 * prose, FAQ, metadata, JSON-LD).
 */

export type BillingId = "annual" | "monthly" | "weekly";

export type Billing = {
  label: string;
  /** Price per period, in US cents. */
  cents: number;
  per: string;
};

export const BILLING_ORDER: readonly BillingId[] = ["annual", "monthly", "weekly"];

export const BILLING: Record<BillingId, Billing> = {
  annual: { label: "Annual", cents: 4400, per: "/ year" },
  monthly: { label: "Monthly", cents: 1299, per: "/ month" },
  weekly: { label: "Weekly", cents: 499, per: "/ week" },
};

export type Screen = {
  src: string;
  alt: string;
};

export const PLAN_SHEET = {
  eyebrow: "Free and Plus",
  /** Rendered as the H2's italic word. */
  heading: "Plans",
  toggleLabel: "Billing period for Merios Plus",
  caption:
    "Prices in US dollars, as on the US App Store. The App Store shows the price for your country, and that figure governs if it differs from this page.",
  columns: ["Plan", "Price", "What you get"],
  /** Shown above each app screen: the screens hold example data. */
  screenTag: "Example data",
  free: {
    name: "Merios",
    price: "Free",
    note: "for good",
    lead: "The daily side of the app.",
    features: [
      "Your daily Merios Score",
      "The Activity, Recovery and Zen pillars",
      "The live monitor, the journal and cycle logging",
      "Blood markers entered by hand, each in its range",
      "Reports already written stay readable",
    ],
    screen: {
      src: "/images/v2/screens/today.jpg",
      alt: "The Merios Today screen, example data: 7h24 of sleep and a recovery score of 76.",
    } satisfies Screen,
  },
  plus: {
    name: "Merios Plus",
    trial: "3-day free trial",
    trialElsewhere: "Trial on annual only",
    includes: "Everything in Merios, plus:",
    features: [
      "Lab report scans, from a PDF or a photo",
      "Blood in depth: trends, history and systems",
      "Your PhenoAge biological age",
      "Insights and the monthly report",
    ],
    screen: {
      src: "/images/v2/screens/blood-panel.jpg",
      alt: "The Merios blood panel screen, example data: 42 markers, 38 inside the lab's ranges, grouped by system.",
    } satisfies Screen,
  },
  lab: {
    name: "Blood work",
    price: "Not included",
    lead: "You arrange it; Merios reads it.",
    costs: [
      { amount: "$0", note: "Often, when your doctor orders the panel and insurance covers it." },
      { amount: "$60–$300", note: "Roughly, for a direct‑to‑consumer panel." },
    ],
    /** What happens to the panel: Merios reads it, you check the values. */
    screen: {
      src: "/images/v2/screens/scan-check.jpg",
      alt: "The Merios scan check screen, example data: 42 values read from a Quest Diagnostics report, 2 of them to check.",
    } satisfies Screen,
  },
} as const;

// ─── The chart: what each price buys ───────────────────────────────────────
// Competitor list prices exactly as the page's own prose cites them.

export type ChartMark =
  /** Merios Plus itself: reads panels you already have. */
  | { kind: "reads"; from: number; to: number }
  /** Your own panel on top, $0 to about $300. */
  | { kind: "ownPanel"; from: number; to: number }
  /** A price range that includes the blood draw. */
  | { kind: "draw"; from: number; to: number }
  /** A single price that includes the blood draw. */
  | { kind: "drawPoint"; at: number }
  /** A membership price before any test is bought. */
  | { kind: "membership"; at: number };

export type ChartRow = {
  name: string;
  note: string;
  marks: readonly ChartMark[];
};

export const PRICE_CHART = {
  scaleMax: 1400,
  ticks: [0, 250, 500, 750, 1000, 1250],
  legend: {
    reads: "Reads panels you already have",
    draw: "Blood draw included",
    ownPanel: "Plus your own panel",
    membership: "Membership, tests extra",
  },
  rows: [
    {
      name: "Merios Plus",
      note: "$44 a year, + $0 to ~$300 for your own panel",
      marks: [
        { kind: "reads", from: 0, to: 44 },
        { kind: "ownPanel", from: 44, to: 344 },
      ],
    },
    {
      name: "SiPhox Health",
      note: "About $99 to $245 per kit, draw included",
      marks: [{ kind: "draw", from: 99, to: 245 }],
    },
    {
      name: "Function Health",
      note: "$365 a year, two panels included",
      marks: [{ kind: "drawPoint", at: 365 }],
    },
    {
      name: "InsideTracker",
      note: "$149 membership, then $489 to $1,305 bundles",
      marks: [
        { kind: "membership", at: 149 },
        { kind: "draw", from: 489, to: 1305 },
      ],
    },
  ] satisfies readonly ChartRow[],
  caption:
    "List prices in US dollars, as checked on Nov 24, 2026. The scale runs from $0 to $1,400.",
} as const;
