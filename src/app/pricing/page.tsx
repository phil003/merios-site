import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/StructuredData";
import { AppleGlyph } from "@/components/home/icons";
import s from "./pricing.module.css";

const APP_STORE_URL = "https://apps.apple.com/us/app/merios/id6760352598";

const TITLE = "Merios Pricing";
const DESCRIPTION =
  "Merios is free to download on the US App Store; the daily score is free for good. Merios Plus is $44/year with a 7-day free trial. Lab work is not included.";

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
 *
 * Presentation (site v3): night masthead (PageHero) → fog body with the price
 * sheet, the reading column and the questions → night footer. Styles live in
 * pricing.module.css; every text node, href and the JSON-LD are unchanged.
 */
const FAQ_ITEMS = [
  {
    q: "How much does Merios cost?",
    a: "Merios is free to download from the US App Store. Merios Plus is $44.00 per year, with a 7-day free trial on the annual plan; it is also sold at $12.99 per month and $4.99 per week. The App Store always shows the current price for your region, which is the figure that governs.",
  },
  {
    q: "Is there a free version of Merios?",
    a: "Yes. The daily side of the app is free for good: your daily Merios Score, the Activity, Recovery and Zen pillars, the live monitor, the journal and cycle logging. You can also enter blood markers by hand and see each one in its range, and any report already written for you stays readable. Scanning a lab report, the in-depth blood view with biological age, and Insights are part of Merios Plus. There is no ad-supported tier — Plus pays for the product, so it does not need to monetise your health data.",
  },
  {
    q: "Does the price include blood tests?",
    a: "No, and this is the most important thing to understand before comparing prices. Merios reads panels you already have; it does not sell or arrange blood draws. Your lab cost sits outside the $44: often $0 when your doctor orders the panel and insurance covers it, or roughly $60 to $300 for a direct-to-consumer panel. A service that bundles the draw, such as Function Health at $365 per year, is buying you something Merios does not provide.",
  },
  {
    q: "Is Merios available outside the United States?",
    a: "Not yet. The App Store listing is US-only, so the app cannot be downloaded from other storefronts, and there is no Android app and no web version. Merios runs on iPhone and requires iOS 15.1 or later.",
  },
  {
    q: "Can I cancel Merios Plus?",
    a: "Yes. Merios Plus is an Apple subscription, so it is cancelled from your iPhone's own subscription settings rather than through Merios, and it will not renew after you cancel. The 7-day trial on the annual plan can be cancelled before it converts.",
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
        description:
          "Free to download. The daily Merios Score, the Activity, Recovery and Zen pillars, the journal and manual marker entry are free for good. iPhone, iOS 15.1 or later, US App Store.",
      },
      {
        "@type": "Offer",
        name: "Merios Plus",
        price: "44.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: APP_STORE_URL,
        description:
          "Lab report scans, blood in depth with biological age, Insights and the monthly report. Billed yearly, with a 7-day free trial.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "44.00",
          priceCurrency: "USD",
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "ANN",
        },
      },
      // Same plan, other billing periods. Same Offer shape as the annual one,
      // with the UN/CEFACT unit code for the period (MON, WEE).
      {
        "@type": "Offer",
        name: "Merios Plus (monthly)",
        price: "12.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: APP_STORE_URL,
        description: "Merios Plus, billed monthly.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "12.99",
          priceCurrency: "USD",
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "MON",
        },
      },
      {
        "@type": "Offer",
        name: "Merios Plus (weekly)",
        price: "4.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: APP_STORE_URL,
        description: "Merios Plus, billed weekly.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "4.99",
          priceCurrency: "USD",
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: "WEE",
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
        title="Merios Plus is $44 a year."
        subline="The app is free to download on the US App Store, and the daily score is free for good. Plus costs $44/year with a 7-day free trial on the annual plan. Blood work is not included — Merios reads panels you already have."
        align="left"
      />

      <main className={s.main}>
        <div className={s.wrap}>
          <section className={s.body}>
            <div className={s.sheet}>
              <table className={s.table}>
                <caption className={s.caption}>
                  Prices in US dollars, as listed on the US App Store. The App Store shows the
                  current price for your region, and that figure governs if it differs from this
                  page.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className={s.colHead}>Plan</th>
                    <th scope="col" className={s.colHead}>Price</th>
                    <th scope="col" className={s.colHead}>What you get</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={s.row} data-plan="free">
                    <th scope="row" className={s.plan}>Merios</th>
                    <td className={s.price}>Free</td>
                    <td className={s.what}>
                      The daily side of the app, free for good: your daily Merios Score, the
                      Activity, Recovery and Zen pillars, the live monitor, the journal and cycle
                      logging. You can also enter blood markers by hand and see each one in its
                      range, and reports already written stay readable.
                    </td>
                  </tr>
                  <tr className={s.row} data-plan="plus">
                    <th scope="row" className={s.plan}>Merios Plus</th>
                    <td className={s.price}>$44 / year</td>
                    <td className={s.what}>
                      Lab report scans from a PDF or a photo, and blood in depth: trends, history,
                      systems and your PhenoAge biological age. Insights and the monthly report.
                      7-day free trial on the annual plan. Also sold at $12.99 a month or $4.99 a
                      week.
                    </td>
                  </tr>
                  <tr className={s.row} data-plan="lab">
                    <th scope="row" className={s.plan}>Blood work</th>
                    <td className={s.price}>Not included</td>
                    <td className={s.what}>
                      Often $0 when your doctor orders the panel and insurance covers it, or roughly
                      $60–$300 for a direct-to-consumer panel. You arrange it; Merios reads it.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={`editorial-prose ${s.prose}`}>
              <h2>Why the sticker price is misleading</h2>
              <p>
                Merios costs less than every service it gets compared to, and that comparison is
                unfair in Merios&rsquo; favour. Function Health is $365 a year and{" "}
                <Link href="/compare/merios-vs-function-health">
                  includes two panels
                </Link>
                . InsideTracker&rsquo;s membership is $149 before test bundles that run $489 to
                $1,305.{" "}
                <Link href="/compare/merios-vs-siphox-health">
                  SiPhox
                </Link>{" "}
                sells kits from about $99 to $245, draw included. Those prices buy blood. The $44 buys
                the reading of it.
              </p>
              <p>
                So the question that decides it is not which number is smaller. It is whether getting
                a panel is already solved for you. If your doctor orders blood work, or you have years
                of PDFs sitting in a drawer, Merios is the cheap way to make them mean something. If
                arranging a draw is the hard part, a bundled service is solving a problem Merios does
                not touch — and the cheaper line is the wrong one to optimise.
              </p>

              <h2>What you are not paying for</h2>
              <p>
                There is no ad-supported tier, and there will not be one. A paid product does not need
                to sell attention or data to survive, which is the only arrangement that makes sense
                for a blood panel. How the data is handled is set out under{" "}
                <Link href="/security">security</Link> and in the{" "}
                <Link href="/privacy">privacy policy</Link>.
              </p>

              <h2>Availability</h2>
              <p>
                Merios is live on the{" "}
                <a href={APP_STORE_URL}>US App Store</a> and runs on iPhone with
                iOS 15.1 or later. It is US-only for now: there is no other storefront, no Android
                app and no web version. If you are outside the US, the honest answer is that you
                cannot use it yet.
              </p>
            </div>

            <div className={s.faq} data-rv="">
              <h2 className={s.faqTitle}>Questions</h2>
              <dl className={s.faqList}>
                {FAQ_ITEMS.map((item) => (
                  <div key={item.q} className={s.faqItem}>
                    <dt className={s.faqQ}>
                      {item.q}
                    </dt>
                    <dd className={s.faqA}>{item.a}</dd>
                  </div>
                ))}
              </dl>

              <p className={s.cta}>
                <a href={APP_STORE_URL} className={`btn btn-ink ${s.ctaBtn}`}>
                  <AppleGlyph size={15} />
                  Download Merios on the App Store <span className="btn-arrow">→</span>
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
