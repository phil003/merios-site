import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";

const APP_STORE_URL = "https://apps.apple.com/us/app/merios/id6760352598";

const TITLE = "Merios Pricing";
const DESCRIPTION =
  "Merios is free to download on the US App Store. Merios Pro is $44/year with a 7-day free trial. Lab work is not included — you bring panels you already have.";

/**
 * A real pricing page, restored.
 *
 * This route used to 308 to /early-access, decided before the App Store launch
 * while the price was unsettled. The app has shipped and the price is settled,
 * so the redirect was stating something false — and it cost more than tidiness:
 * a page that says plainly what a product costs is one of the few pages an
 * assistant will quote when someone asks "how much is X". With no such page,
 * and with the blog still describing Merios as pre-launch, Perplexity cited
 * merios.life three times on a category question in September 2026 and then
 * recommended four other apps. Stating the price is the fix.
 */
const FAQ_ITEMS = [
  {
    q: "How much does Merios cost?",
    a: "Merios is free to download from the US App Store. Merios Pro is $44.00 per year and includes a 7-day free trial. Monthly and weekly options also exist; the App Store always shows the current price for your region, which is the figure that governs.",
  },
  {
    q: "Is there a free version of Merios?",
    a: "Yes. The app is free to download and you can upload a panel and see your results without paying. Merios Pro removes the upload limit and unlocks the full longitudinal view. There is no ad-supported tier — the product is paid, so it does not need to monetise your health data.",
  },
  {
    q: "Does the price include blood tests?",
    a: "No, and this is the most important thing to understand before comparing prices. Merios reads panels you already have; it does not sell or arrange blood draws. Your lab cost sits outside the $44: often $0 when your doctor orders the panel and insurance covers it, or roughly $60 to $300 for a direct-to-consumer panel. A service that bundles the draw, such as Function Health at $365 per year, is buying you something Merios does not provide.",
  },
  {
    q: "Is Merios available outside the United States?",
    a: "Not yet. The App Store listing is US-only, so the app cannot be downloaded from other storefronts, and there is no Android app and no web version. Merios requires iOS 17.0 or later.",
  },
  {
    q: "Can I cancel Merios Pro?",
    a: "Yes. Merios Pro is an Apple subscription, so it is cancelled from your iPhone's own subscription settings rather than through Merios, and it will not renew after you cancel. The 7-day trial can be cancelled before it converts.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://merios.life/pricing" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://merios.life/pricing",
    type: "website",
  },
};

export default function PricingPage() {
  // An Offer per purchasable thing, so the price is machine-readable rather
  // than buried in a description string. `price: "0"` alone reads as "free",
  // which is exactly the misreading this page exists to correct.
  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://merios.life/pricing#product",
    name: "Merios",
    description:
      "iOS app that reads any blood test PDF, extracts 130+ biomarkers, computes PhenoAge biological age, and tracks trends alongside Apple Health data.",
    brand: { "@type": "Brand", name: "Merios" },
    url: "https://merios.life/pricing",
    offers: [
      {
        "@type": "Offer",
        name: "Merios (free)",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: APP_STORE_URL,
        description: "Free to download and upload a panel. iOS 17.0 or later, US App Store.",
      },
      {
        "@type": "Offer",
        name: "Merios Pro",
        price: "44.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: APP_STORE_URL,
        description:
          "Unlimited panel uploads and the full longitudinal view. Billed yearly, with a 7-day free trial.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "44.00",
          priceCurrency: "USD",
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "ANN",
        },
      },
    ],
  };

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Pricing", url: "https://merios.life/pricing" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />

      <PageHero
        eyebrow="Pricing"
        title="Merios Pro is $44 a year."
        subline="The app is free to download on the US App Store. Pro costs $44/year with a 7-day free trial. Blood work is not included — Merios reads panels you already have."
        align="left"
      />

      <main className="pb-20 pt-2" style={{ background: "var(--color-canvas)" }}>
        <div className="mx-auto max-w-[920px] px-6 md:px-10">
          <section style={{ fontFamily: "var(--font-sans)" }}>
            <div style={tableWrapStyle}>
              <table style={tableStyle}>
                <caption style={captionStyle}>
                  Prices in US dollars, as listed on the US App Store. The App Store shows the
                  current price for your region, and that figure governs if it differs from this
                  page.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" style={thStyle}>Plan</th>
                    <th scope="col" style={thStyle}>Price</th>
                    <th scope="col" style={thStyle}>What you get</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" style={tdKeyStyle}>Merios</th>
                    <td style={tdStyle}>Free</td>
                    <td style={tdStyle}>
                      Download, upload a blood test PDF, see your biomarkers read against standard
                      and longevity-optimised ranges, and get your PhenoAge biological age.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" style={tdKeyStyle}>Merios Pro</th>
                    <td style={tdStyle}>$44 / year</td>
                    <td style={tdStyle}>
                      Unlimited panel uploads and the full longitudinal view across every panel you
                      have ever had, with Apple Health data alongside. 7-day free trial. Monthly and
                      weekly options exist on the App Store.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" style={tdKeyStyle}>Blood work</th>
                    <td style={tdStyle}>Not included</td>
                    <td style={tdStyle}>
                      Often $0 when your doctor orders the panel and insurance covers it, or roughly
                      $60–$300 for a direct-to-consumer panel. You arrange it; Merios reads it.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={h2Style}>Why the sticker price is misleading</h2>
            <p style={pStyle}>
              Merios costs less than every service it gets compared to, and that comparison is
              unfair in Merios&rsquo; favour. Function Health is $365 a year and{" "}
              <Link href="/compare/merios-vs-function-health" style={linkStyle}>
                includes two panels
              </Link>
              . InsideTracker&rsquo;s membership is $149 before test bundles that run $489 to
              $1,305.{" "}
              <Link href="/compare/merios-vs-siphox-health" style={linkStyle}>
                SiPhox
              </Link>{" "}
              sells kits from about $99 to $245, draw included. Those prices buy blood. The $44 buys
              the reading of it.
            </p>
            <p style={pStyle}>
              So the question that decides it is not which number is smaller. It is whether getting
              a panel is already solved for you. If your doctor orders blood work, or you have years
              of PDFs sitting in a drawer, Merios is the cheap way to make them mean something. If
              arranging a draw is the hard part, a bundled service is solving a problem Merios does
              not touch — and the cheaper line is the wrong one to optimise.
            </p>

            <h2 style={h2Style}>What you are not paying for</h2>
            <p style={pStyle}>
              There is no ad-supported tier, and there will not be one. A paid product does not need
              to sell attention or data to survive, which is the only arrangement that makes sense
              for a blood panel. How the data is handled is set out under{" "}
              <Link href="/security" style={linkStyle}>security</Link> and in the{" "}
              <Link href="/privacy" style={linkStyle}>privacy policy</Link>.
            </p>

            <h2 style={h2Style}>Availability</h2>
            <p style={pStyle}>
              Merios is live on the{" "}
              <a href={APP_STORE_URL} style={linkStyle}>US App Store</a> and requires iOS 17.0 or
              later. It is US-only for now: there is no other storefront, no Android app and no web
              version. If you are outside the US, the honest answer is that you cannot use it yet.
            </p>

            <h2 style={h2Style}>Questions</h2>
            <dl>
              {FAQ_ITEMS.map((item) => (
                <div key={item.q} style={{ marginBottom: "1.4rem" }}>
                  <dt
                    style={{
                      fontSize: 16.5,
                      fontWeight: 500,
                      color: "var(--color-ink)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.q}
                  </dt>
                  <dd style={{ ...pStyle, margin: 0 }}>{item.a}</dd>
                </div>
              ))}
            </dl>

            <p style={{ ...pStyle, marginTop: "2.5rem" }}>
              <a href={APP_STORE_URL} style={ctaStyle}>Download Merios on the App Store →</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-serif)", fontSize: "clamp(1.625rem, 2.4vw, 2rem)", fontWeight: 300,
  letterSpacing: "-0.02em", color: "var(--color-ink)", marginBottom: "0.75rem", marginTop: "3rem",
};
const pStyle: React.CSSProperties = {
  fontSize: 16, lineHeight: 1.7, color: "var(--color-ink-secondary)", marginBottom: "1.1rem",
  maxWidth: "720px",
};
const linkStyle: React.CSSProperties = { color: "var(--color-green-deep)", textUnderlineOffset: "3px" };
const ctaStyle: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "0.5rem",
  background: "var(--color-green-deep)", color: "var(--color-canvas)",
  borderRadius: 999, padding: "0.85rem 1.5rem", fontSize: 14.5, fontWeight: 500,
};
const tableWrapStyle: React.CSSProperties = { overflowX: "auto", marginBottom: "1.4rem" };
const tableStyle: React.CSSProperties = {
  width: "100%", borderCollapse: "collapse", fontSize: 15, lineHeight: 1.55,
};
const captionStyle: React.CSSProperties = {
  captionSide: "bottom", textAlign: "left", fontSize: "0.8125rem",
  color: "var(--color-ink-tertiary)", paddingTop: "0.6rem", lineHeight: 1.5, maxWidth: "620px",
};
const thStyle: React.CSSProperties = {
  textAlign: "left", fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.18em",
  textTransform: "uppercase", color: "var(--color-ink-tertiary)", fontWeight: 500,
  padding: "0.5rem 0.75rem 0.5rem 0", borderBottom: "1px solid var(--color-grid)",
};
const tdKeyStyle: React.CSSProperties = {
  textAlign: "left", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-ink)",
  fontWeight: 500, whiteSpace: "nowrap", verticalAlign: "top",
  padding: "0.7rem 1rem 0.7rem 0", borderBottom: "1px solid var(--color-grid)",
};
const tdStyle: React.CSSProperties = {
  fontSize: 15, lineHeight: 1.55, color: "var(--color-ink-secondary)", verticalAlign: "top",
  padding: "0.7rem 1rem 0.7rem 0", borderBottom: "1px solid var(--color-grid)",
};
