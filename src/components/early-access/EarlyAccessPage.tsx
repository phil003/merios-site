import type { CSSProperties } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import { WebApplicationSchema } from "@/components/StructuredData";
import AppStoreBadge from "@/components/early-access/AppStoreBadge";
import { EARLY_ACCESS_DESCRIPTION } from "@/lib/early-access";
import styles from "./earlyAccess.module.css";

// The /early-access page: one static page for every country (the app is on
// the App Store in 174 countries and regions since Nov 25, 2026). Server
// component; the App Store badge is the only client code.

// JSON-LD: WebPage + BreadcrumbList (Home → Early Access), pointing at the
// canonical URL.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://merios.life/early-access#webpage",
      url: "https://merios.life/early-access",
      name: "Early Access — Merios",
      description: EARLY_ACCESS_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": "https://merios.life/#website" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://merios.life/early-access#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://merios.life",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Early Access",
          item: "https://merios.life/early-access",
        },
      ],
    },
  ],
};

// CSS-only entrance delay for the .he keyframe (globals.css): plays at parse
// time, never waits for JavaScript, and is skipped under reduced motion.
const delay = (s: string) => ({ "--he-d": s }) as CSSProperties;

/**
 * Open Sky: a dawn masthead. The copy and the App Store badge sit beside the
 * Today screen in a glass phone (example data, labelled as such); the H1
 * paints at parse time and the phone is the preloaded LCP image on desktop.
 * Then Baseline, the newsletter, for visitors not ready to install.
 * Apple names (iOS, iPhone, App Store) are never uppercased.
 */
export default function EarlyAccessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- static server-rendered JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* A page about the app itself: carries the MobileApplication entity. */}
      <WebApplicationSchema />

      <main className={styles.page}>
        <section
          className={styles.hero}
          aria-label="Download Merios on the App Store"
        >
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={`he ${styles.eyebrow}`}>
                  <span>
                    Available on <span className={styles.keepCase}>iOS</span>
                  </span>
                </p>

                <h1 className={styles.title}>
                  Your score, <em>in your pocket.</em>
                </h1>

                <p className={`he ${styles.lead}`} style={delay("0.12s")}>
                  Merios is available on the App Store in 174 countries and
                  regions. Upload a blood test, connect Apple Health, and turn
                  your numbers into one readable score, right from your iPhone.
                </p>

                <div className={`he ${styles.actions}`} style={delay("0.2s")}>
                  <AppStoreBadge />
                  <p className={styles.caption}>
                    iPhone · iOS 15.1 or later · Free to start
                  </p>
                </div>

                {/* On a computer: 71 % of site visitors are on desktop (Vercel
                    Analytics, 13-20/11/2026). A QR code lets them install from
                    the phone in their pocket. Hidden on small screens. Its
                    entrance is the data-rv reveal, not the .he keyframe: a
                    keyframe restarts from opacity 0 whenever the card goes
                    from display:none back to shown (a resize, a full-page
                    capture), which left it invisible. */}
                <div
                  className={styles.qr}
                  data-rv=""
                  style={{ "--rv-delay": "0.28s" } as CSSProperties}
                  // the inline reveal script adds .rv-in before hydration
                  suppressHydrationWarning
                >
                  <span className={styles.qrCode}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/v3/qr-app-store.svg"
                      alt="QR code that opens Merios on the App Store"
                      width={64}
                      height={64}
                    />
                  </span>
                  <span className={styles.qrText}>
                    <b>On a computer?</b>{" "}
                    Point your iPhone camera here.
                  </span>
                </div>
              </div>

              <figure className={styles.phone}>
                <span aria-hidden className={styles.phoneGlow} />
                <div className={styles.phoneFrame}>
                  <Image
                    src="/images/v2/screens/today.jpg"
                    alt="The Merios Today screen, with example data: 7h24 of sleep and a recovery score of 76."
                    width={780}
                    height={1688}
                    preload
                    sizes="(min-width: 1320px) 316px, (min-width: 984px) 24vw, 236px"
                    className={styles.phoneImg}
                  />
                </div>
                <figcaption className={styles.phoneCaption}>
                  Example data
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Not ready to install: Baseline, the newsletter on Substack. */}
        <div className={styles.newsSection}>
          <div className={styles.container}>
            <SubstackSubscribe />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
