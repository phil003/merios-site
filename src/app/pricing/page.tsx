import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  BreadcrumbSchema,
  FAQPageSchema,
  WebApplicationSchema,
} from "@/components/StructuredData";
import { AppleGlyph } from "@/components/home/icons";
import PlanSheet from "./PlanSheet";
import PriceChart from "./PriceChart";
import s from "./pricing.module.css";

const APP_STORE_URL = "https://apps.apple.com/app/merios/id6760352598";
// Tracked link for the buttons (the schema keeps the canonical URL above).
const APP_STORE_LINK = "https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-pricing&mt=8";

const TITLE = "Merios Pricing";
const DESCRIPTION =
  "Merios is free to download on the App Store; the daily score is free for good. Merios Plus is $44/year with a 7-day free trial. Lab work is not included.";

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
 * Presentation (v2 "Open Sky", Nov 25, 2026): dawn masthead → the plan sheet
 * (billing toggle + the price table drawn as three cards, PlanSheet.tsx) →
 * what each price buys (the comparison prose beside a price chart,
 * PriceChart.tsx) → what you are not paying for and availability → the
 * questions → a dawn call to action. Styles live in pricing.module.css, data
 * for the sheet and the chart in content.ts. Since Nov 26, 2026 the copy says
 * what is true worldwide: the App Store in 174 countries and regions, prices
 * in US dollars as on the US App Store.
 */
/**
 * Display only: hyphenated terms ("7-day", "ad-supported") never split across
 * two lines. U+2011 is the non-breaking hyphen (Figtree and Newsreader both
 * carry it). The data keeps plain hyphens, since it also feeds the JSON-LD.
 */
const keepHyphens = (text: string) => text.replace(/(\w)-(\w)/g, "$1\u2011$2");

const FAQ_ITEMS = [
  {
    q: "How much does Merios cost?",
    a: "Merios is free to download from the App Store. Merios Plus is $44 a year, with a 7-day free trial on the annual plan; it is also sold at $12.99 a month and $4.99 a week. The App Store always shows the current price for your country, which is the figure that governs.",
  },
  {
    q: "Is there a free version of Merios?",
    a: "Yes. The daily side of the app is free for good: your daily Merios Score, the Activity, Recovery and Zen pillars, the live monitor, the journal and cycle logging. You can also enter blood markers by hand and see each one in its range, and any report already written for you stays readable. Scanning a lab report, the in-depth blood view with biological age, and Insights are part of Merios Plus. There is no ad-supported tier — Plus pays for the product, so it does not need to monetize your health data.",
  },
  {
    q: "Does the price include blood tests?",
    a: "No, and this is the most important thing to understand before comparing prices. Merios reads panels you already have; it does not sell or arrange blood draws. Your lab cost sits outside the $44: often $0 when your doctor orders the panel and insurance covers it, or roughly $60 to $300 for a direct-to-consumer panel. A service that bundles the draw, such as Function Health at $365 per year, is buying you something Merios does not provide.",
  },
  {
    q: "Is Merios available outside the United States?",
    a: "Yes. Merios is available on the App Store in 174 countries and regions, on iPhone with iOS 15.1 or later. Prices on this page are in US dollars, as on the US App Store; the App Store in your country shows your price. There is no Android app and no web version.",
  },
  {
    q: "Can I cancel Merios Plus?",
    a: "Yes. Merios Plus is an Apple subscription, so it is canceled from your iPhone's own subscription settings rather than through Merios, and it will not renew after you cancel. The 7-day trial on the annual plan can be canceled before it converts.",
  },
];

export const metadata: Metadata = {
  // Already names the brand: absolute, so the layout template does not
  // append a second "| Merios".
  title: { absolute: TITLE },
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
      "Preventive health platform for iPhone that reads any blood test, from a PDF or a photo, extracts 160+ biomarkers, computes PhenoAge biological age, and tracks trends alongside Apple Health data.",
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
          "Free to download. The daily Merios Score, the Activity, Recovery and Zen pillars, the journal and manual marker entry are free for good. iPhone, iOS 15.1 or later, on the App Store in 174 countries and regions.",
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
      <WebApplicationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Pricing", url: "https://merios.life/pricing" },
        ]}
      />
      <FAQPageSchema questions={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />

      <main className={s.page}>
        {/* ─── Dawn masthead ─── */}
        <section aria-labelledby="pricing-title" className={s.hero}>
          <div className={s.wrap}>
            <p className={`label he ${s.eyebrow}`}>
              <span aria-hidden className="label-dot label-dot--ink" />
              <span>Pricing</span>
            </p>
            <h1
              id="pricing-title"
              className={`he ${s.h1}`}
              style={{ "--he-d": "0.06s" } as CSSProperties}
            >
              Merios Plus is <em>$44 a year.</em>
            </h1>
            <p className={`he ${s.lede}`} style={{ "--he-d": "0.16s" } as CSSProperties}>
              The app is free to download on the App Store, and the daily score is free for
              good. Plus costs $44/year with a 7‑day free trial on the annual plan. Blood work is
              not included — Merios reads panels you already have.
            </p>
          </div>
        </section>

        {/* ─── The plan sheet: billing toggle + the price table as cards ─── */}
        <PlanSheet />

        {/* ─── What each price buys ─── */}
        <section aria-labelledby="buys-title" className={s.buys}>
          <div className={s.wrap}>
            <div className={s.buysGrid}>
              <div className={s.buysCopy} data-rv="">
                <p className={`label ${s.eyebrow}`}>
                  <span aria-hidden className="label-dot label-dot--ink" />
                  <span>What each price buys</span>
                </p>
                <h2 id="buys-title" className={s.h2}>
                  Why the sticker price <em>is misleading</em>
                </h2>
                <p className={s.body}>
                  Merios costs less than every service it gets compared to, and that comparison is
                  unfair in Merios&rsquo; favor. Function Health is $365 a year and{" "}
                  <Link href="/compare/function-health-vs-superpower">
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
                <p className={s.body}>
                  So the question that decides it is not which number is smaller. It is whether getting
                  a panel is already solved for you. If your doctor orders blood work, or you have years
                  of PDFs sitting in a drawer, Merios is the cheap way to make them mean something. If
                  arranging a draw is the hard part, a bundled service is solving a problem Merios does
                  not touch — and the cheaper line is the wrong one to optimize.
                </p>
              </div>
              <PriceChart />
            </div>
          </div>
        </section>

        {/* ─── What you are not paying for · Availability ─── */}
        <section aria-label="What you are not paying for, and availability" className={s.facts}>
          <div className={s.wrap}>
            <div className={s.factsGrid}>
              <div className={s.fact} data-rv="">
                <p className={`label ${s.eyebrow} ${s.factEyebrow}`}>
                  <span aria-hidden className="label-dot label-dot--ink" />
                  <span>Business model</span>
                </p>
                <h2 className={s.factTitle}>
                  What you are not <em>paying for</em>
                </h2>
                <p className={s.factText}>
                  There is no ad‑supported tier, and there will not be one. A paid product does not need
                  to sell attention or data to survive, which is the only arrangement that makes sense
                  for a blood panel. How the data is handled is set out under{" "}
                  <Link href="/security">security</Link> and in the{" "}
                  <Link href="/privacy">privacy policy</Link>.
                </p>
              </div>
              <div className={s.fact} data-rv="" style={{ "--rv-delay": "0.08s" } as CSSProperties}>
                <p className={`label ${s.eyebrow} ${s.factEyebrow}`}>
                  <span aria-hidden className="label-dot label-dot--ink" />
                  <span>Where it runs</span>
                </p>
                <h2 className={s.factTitle}>
                  <em>Availability</em>
                </h2>
                <p className={s.factText}>
                  Merios is available on the <a href={APP_STORE_LINK}>App Store</a> in 174
                  countries and regions and runs on iPhone with iOS 15.1 or later. There is no
                  Android app and no web version.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Questions: one open at a time (exclusive <details>), no JS ─── */}
        <section aria-labelledby="faq-title" className={s.faq}>
          <div className={s.wrap}>
            <div className={s.faqGrid}>
              <div className={s.faqTitle}>
                <p className={`label ${s.eyebrow}`}>
                  <span aria-hidden className="label-dot label-dot--ink" />
                  <span>Before you subscribe</span>
                </p>
                <h2 id="faq-title" className={s.h2}>
                  <em>Questions</em>
                </h2>
              </div>
              <div className={s.faqList} data-rv="">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={item.q} name="pricing-faq" open={i === 0} className={s.faqItem}>
                    <summary className={s.faqQ}>
                      <span>{item.q}</span>
                      <span aria-hidden className={s.faqSign} />
                    </summary>
                    <p className={s.faqA}>{keepHyphens(item.a)}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Dawn call to action ─── */}
        <section aria-labelledby="get-title" className={s.get}>
          <div className={s.wrap}>
            <div className={s.getBand} data-rv="">
              <div className={s.getCopy}>
                <p className={`label ${s.eyebrow}`}>
                  <span aria-hidden className="label-dot label-dot--ink" />
                  <span>Get the app</span>
                </p>
                <h2 id="get-title" className={s.getTitle}>
                  Start free. <em>Add Plus when your blood test lands.</em>
                </h2>
                <p className={s.getMeta}>
                  iPhone · iOS 15.1 or later · On the App Store in 174 countries and regions
                </p>
              </div>
              <a
                href={APP_STORE_LINK}
                className={`btn btn-ink ${s.ctaBtn}`}
                aria-label="Download Merios on the App Store"
              >
                <AppleGlyph size={15} />
                <span>Download on the App Store</span>
                <span aria-hidden className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
