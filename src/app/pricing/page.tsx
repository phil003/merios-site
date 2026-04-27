import Link from "next/link";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import {
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";

const SITE_URL = "https://merios.life";

// ── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Pricing — Free Plan + Pro at $14.99/month",
  description:
    "Merios pricing — free Basic plan with biomarker tracking, or Pro at $14.99/month for unlimited blood test uploads, biological age, and wearable integration.",
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: "Merios Pricing — Free Plan + Pro at $14.99/month",
    description:
      "Free Basic plan + Pro at $14.99/month. Bring your own blood tests. No surprise lab fees, no per-test charges.",
    url: `${SITE_URL}/pricing`,
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merios Pricing — Free Plan + Pro at $14.99/month",
    description:
      "Free Basic plan + Pro at $14.99/month. Bring your own blood tests. No surprise lab fees.",
    images: ["/og-image.png"],
  },
};

// ── FAQ data ────────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: "Is Merios actually free?",
    a: "Yes. The Basic plan is free forever and includes core biomarker tracking, blood test PDF upload (limited per year), and Apple Health basic sync. Pro at $14.99/month unlocks unlimited uploads, biological age (PhenoAge), the Merios Score, full wearable integration, and AI-powered explanations.",
  },
  {
    q: "What about the cost of the actual blood tests?",
    a: "Lab work is separate. We don't markup labs. You can use insurance-covered labs ($0–$50), DTC providers like Quest's QuestDirect or Pixel by LabCorp ($60–$300), or upload an existing panel from Function Health or InsideTracker. Bring your own labs is the model.",
  },
  {
    q: "How is Merios cheaper than Function Health, InsideTracker, or WHOOP Advanced Labs?",
    a: "Most competitors bundle annual lab fees into a flat $300–$700/year price. Merios is $99–$180/year for the software, and you pay separately for whatever lab cadence makes sense for you. Over 3 years, this is typically 50–70% cheaper for users who run 1–2 panels per year using insurance or DTC.",
  },
  {
    q: "Is there a free trial of Pro?",
    a: "Yes, every new account gets a 14-day Pro trial automatically. No credit card required to start. After the trial, you can downgrade to Basic free, or continue with Pro at $14.99/month.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your account settings in one click. No phone calls, no retention pitches. Your data stays with you and you can export it as CSV or PDF anytime, even on the free Basic plan.",
  },
  {
    q: "Is my data private?",
    a: "Merios is HIPAA-compliant, EU-hosted on Supabase EU, and GDPR-compliant by default. We don't sell your data. We don't use your data to train external models. Your blood test data is yours, encrypted at rest (AES-256) and in transit (TLS 1.3).",
  },
];

// ── Pricing Plans ───────────────────────────────────────────────────────────
const FREE_FEATURES = [
  "Upload up to 2 blood test PDFs per year",
  "Core biomarker dashboard",
  "Basic Apple Health sync",
  "Manual marker interpretation",
  "CSV / PDF export",
];

const PRO_FEATURES = [
  "Unlimited blood test uploads",
  "Merios Score (0–100) across 4 health pillars",
  "PhenoAge biological age + trend",
  "Full wearable integration (Apple Watch, Garmin, Oura, WHOOP)",
  "AI explanations + cross-panel correlation",
  "Personalized action plans",
  "API access for advanced users",
  "Priority email support",
];

// ── Page ────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  // Schema: WebPage + Offer (linked to existing WebApplication in layout.tsx)
  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Merios Pro",
    description:
      "Unlimited blood test uploads, biological age, Merios Score, wearable integration, and AI explanations.",
    brand: { "@type": "Brand", name: "Merios" },
    offers: [
      {
        "@type": "Offer",
        name: "Basic (Free)",
        price: 0,
        priceCurrency: "USD",
        url: `${SITE_URL}/early-access`,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: 14.99,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 14.99,
          priceCurrency: "USD",
          unitText: "MONTH",
        },
        url: `${SITE_URL}/early-access`,
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Pricing", url: `${SITE_URL}/pricing` },
        ]}
      />
      <FAQPageSchema questions={FAQ} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }}
      />

      <main style={{ background: "var(--color-canvas)" }}>
        <PageHero
          eyebrow="Pricing"
          title="Pay for the software, not the labs."
          subline="Free Basic plan or Pro at $14.99/month. Bring your own blood tests — no markup, no surprise lab fees, no per-test charges."
        />

        {/* Plans */}
        <section className="px-6 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Basic */}
            <div
              style={{
                background: "var(--color-canvas-alt, #ffffff)",
                border: "1px solid var(--color-grid)",
                borderRadius: "16px",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                }}
              >
                Basic
              </div>
              <h2
                className="mt-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2.5rem",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                }}
              >
                Free<span style={{ fontSize: "1rem", color: "var(--color-ink-tertiary)" }}>{" "}forever</span>
              </h2>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  color: "var(--color-ink-secondary)",
                }}
              >
                Get started with core biomarker tracking. Perfect for one annual blood draw and basic Apple Health.
              </p>
              <ul className="mt-6 space-y-3">
                {FREE_FEATURES.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      color: "var(--color-ink)",
                      paddingLeft: "1.5rem",
                      position: "relative",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
                        width: "6px",
                        height: "6px",
                        background: "var(--color-pulse)",
                        borderRadius: "50%",
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/early-access"
                className="mt-8 inline-block"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12.5px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-green-deep)",
                  borderBottom: "1px solid var(--color-green-deep)",
                  paddingBottom: "2px",
                }}
              >
                Get started free →
              </Link>
            </div>

            {/* Pro */}
            <div
              style={{
                background: "var(--color-green-deep)",
                color: "var(--color-canvas)",
                border: "1px solid var(--color-green-deep)",
                borderRadius: "16px",
                padding: "2rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-pulse)",
                  fontWeight: 500,
                }}
              >
                Pro · Recommended
              </div>
              <h2
                className="mt-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2.5rem",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--color-canvas)",
                }}
              >
                $14.99<span style={{ fontSize: "1rem", opacity: 0.8 }}>{" "}/ month</span>
              </h2>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  opacity: 0.85,
                }}
              >
                Unlimited uploads, biological age, the Merios Score, and full wearable integration. 14-day free trial.
              </p>
              <ul className="mt-6 space-y-3">
                {PRO_FEATURES.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      paddingLeft: "1.5rem",
                      position: "relative",
                      opacity: 0.95,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
                        width: "6px",
                        height: "6px",
                        background: "var(--color-pulse)",
                        borderRadius: "50%",
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/early-access"
                className="mt-8 inline-block"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12.5px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  background: "var(--color-pulse)",
                  color: "var(--color-ink)",
                  padding: "12px 20px",
                  borderRadius: "8px",
                }}
              >
                Start 14-day free trial →
              </Link>
            </div>
          </div>
        </section>

        {/* Compare */}
        <section className="px-6 pb-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-[1100px]">
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-display-m, 2rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
              }}
            >
              Compare with the alternatives
            </h2>
            <p
              className="mt-3 max-w-[60ch]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.5,
                color: "var(--color-ink-secondary)",
              }}
            >
              Most consumer biomarker platforms bundle lab fees into a flat annual price. Merios is unbundled — you pay for the software, not the labs.
            </p>

            <div className="mt-8 overflow-x-auto">
              <table
                style={{
                  width: "100%",
                  minWidth: "560px",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-grid)" }}>
                    <th align="left" style={{ padding: "0.75rem 0", color: "var(--color-ink-tertiary)" }}>Platform</th>
                    <th align="left" style={{ padding: "0.75rem 1rem", color: "var(--color-ink-tertiary)" }}>Annual cost</th>
                    <th align="left" style={{ padding: "0.75rem 1rem", color: "var(--color-ink-tertiary)" }}>Labs included</th>
                    <th align="left" style={{ padding: "0.75rem 1rem", color: "var(--color-ink-tertiary)" }}>Wearables</th>
                    <th align="left" style={{ padding: "0.75rem 1rem", color: "var(--color-ink-tertiary)" }}>Biological age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--color-grid)" }}>
                    <td style={{ padding: "0.85rem 0", fontWeight: 600 }}>Merios Pro</td>
                    <td style={{ padding: "0.85rem 1rem" }}>$180 (software only)</td>
                    <td style={{ padding: "0.85rem 1rem" }}>BYO — any lab</td>
                    <td style={{ padding: "0.85rem 1rem" }}>Apple, Garmin, Oura, WHOOP</td>
                    <td style={{ padding: "0.85rem 1rem" }}>PhenoAge (peer-reviewed)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--color-grid)" }}>
                    <td style={{ padding: "0.85rem 0" }}>Function Health</td>
                    <td style={{ padding: "0.85rem 1rem" }}>$365 (bundled)</td>
                    <td style={{ padding: "0.85rem 1rem" }}>2 panels (Quest)</td>
                    <td style={{ padding: "0.85rem 1rem" }}>None</td>
                    <td style={{ padding: "0.85rem 1rem" }}>Proprietary</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--color-grid)" }}>
                    <td style={{ padding: "0.85rem 0" }}>InsideTracker Ultimate</td>
                    <td style={{ padding: "0.85rem 1rem" }}>$589 (per panel)</td>
                    <td style={{ padding: "0.85rem 1rem" }}>1 panel</td>
                    <td style={{ padding: "0.85rem 1rem" }}>Limited</td>
                    <td style={{ padding: "0.85rem 1rem" }}>InnerAge (proprietary)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--color-grid)" }}>
                    <td style={{ padding: "0.85rem 0" }}>WHOOP Advanced Labs</td>
                    <td style={{ padding: "0.85rem 1rem" }}>~$660 (membership + labs)</td>
                    <td style={{ padding: "0.85rem 1rem" }}>2 panels</td>
                    <td style={{ padding: "0.85rem 1rem" }}>WHOOP only</td>
                    <td style={{ padding: "0.85rem 1rem" }}>Not flagship</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.85rem 0" }}>SiPhox Health</td>
                    <td style={{ padding: "0.85rem 1rem" }}>$99–$245 per kit</td>
                    <td style={{ padding: "0.85rem 1rem" }}>1 kit / order</td>
                    <td style={{ padding: "0.85rem 1rem" }}>Limited</td>
                    <td style={{ padding: "0.85rem 1rem" }}>Internal score</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p
              className="mt-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                color: "var(--color-ink-tertiary)",
                letterSpacing: "0.06em",
              }}
            >
              Detailed comparisons:{" "}
              <Link
                href="/compare/merios-vs-function-health"
                style={{ color: "var(--color-green-deep)", borderBottom: "1px solid var(--color-green-deep)" }}
              >
                vs Function Health
              </Link>{" · "}
              <Link
                href="/compare/merios-vs-insidetracker"
                style={{ color: "var(--color-green-deep)", borderBottom: "1px solid var(--color-green-deep)" }}
              >
                vs InsideTracker
              </Link>{" · "}
              <Link
                href="/compare/merios-vs-whoop-advanced-labs"
                style={{ color: "var(--color-green-deep)", borderBottom: "1px solid var(--color-green-deep)" }}
              >
                vs WHOOP
              </Link>{" · "}
              <Link
                href="/compare/merios-vs-siphox-health"
                style={{ color: "var(--color-green-deep)", borderBottom: "1px solid var(--color-green-deep)" }}
              >
                vs SiPhox
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 pb-20 md:px-10 md:pb-32" aria-labelledby="pricing-faq">
          <div className="mx-auto max-w-[820px]">
            <h2
              id="pricing-faq"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-display-m, 2rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
              }}
            >
              Frequently asked questions
            </h2>
            <ul className="mt-8 space-y-8">
              {FAQ.map((item) => (
                <li key={item.q}>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.25rem",
                      lineHeight: 1.3,
                      color: "var(--color-ink)",
                    }}
                  >
                    {item.q}
                  </h3>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: "var(--color-ink-secondary)",
                    }}
                  >
                    {item.a}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
