"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import NewsletterForm from "./NewsletterForm";
import { appStoreUrl, campaignFromPath } from "@/lib/appStore";
import styles from "./earlyAccess.module.css";

// Merios on the US App Store (ascAppId 6760352598).
// Default campaign "web-early-access"; on click, the page the visitor came from
// (same-site referrer) becomes the campaign, so installs are attributed to it.
const APP_STORE_URL = appStoreUrl("web-early-access");

// Official Apple Media Services badge. 250x83 @1x renders at ~125x42 CSS px on
// retina. The black variant carries its own hairline, so it reads on the dawn.
const APP_STORE_BADGE =
  "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83";

// CSS-only entrance delay for the .he keyframe (globals.css): plays at parse
// time, never waits for JavaScript, and is skipped under reduced motion.
const delay = (s: string) => ({ "--he-d": s }) as CSSProperties;

/**
 * Open Sky: a dawn masthead. The copy and the App Store badge sit beside the
 * Today screen in a glass phone (example data, labelled as such); the H1
 * paints at parse time and the phone is the preloaded LCP image on desktop.
 * Then the rollout newsletter, on the page's one ink block.
 */
export default function VariantUS() {
  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        aria-label="Download Merios on the US App Store"
      >
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={`he ${styles.eyebrow}`}>Available on iOS</p>

              <h1 className={styles.title}>
                Your score, <em>in your pocket.</em>
              </h1>

              <p className={`he ${styles.lead}`} style={delay("0.12s")}>
                Merios is live on the US App Store. Upload a blood test, connect
                Apple Health, and read your body with clinical precision —
                right from your iPhone.
              </p>

              <div className={`he ${styles.actions}`} style={delay("0.2s")}>
                <a
                  href={APP_STORE_URL}
                  onClick={(e) => {
                    try {
                      const from = new URLSearchParams(window.location.search).get("from");
                      const ref = document.referrer ? new URL(document.referrer) : null;
                      if (from) {
                        e.currentTarget.href = appStoreUrl(`web-${from}`);
                      } else if (
                        ref &&
                        ref.host === window.location.host &&
                        !ref.pathname.startsWith("/early-access")
                      ) {
                        e.currentTarget.href = appStoreUrl(campaignFromPath(ref.pathname));
                      }
                    } catch {
                      // keep the default campaign
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.badge}
                  aria-label="Download Merios on the App Store"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={APP_STORE_BADGE}
                    alt="Download on the App Store"
                    width={165}
                    height={55}
                  />
                </a>

                <p className={styles.caption}>iPhone · iOS 15.1+ · Free to start</p>
              </div>

              {/* On a computer: 71 % of site visitors are on desktop (Vercel
                  Analytics, 13-20/11/2026). A QR code lets them install from the
                  phone in their pocket. Hidden on small screens. */}
              <div className={`he ${styles.qr}`} style={delay("0.28s")}>
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
                  <b>On a computer?</b>
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
              <figcaption className={styles.phoneCaption}>Example data</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ─── Newsletter: "Stay informed as the US rollout expands" ─── */}
      <section
        className={styles.newsSection}
        aria-label="Stay informed as Merios rolls out across the US"
      >
        <div className={styles.container}>
          <div className={`night ${styles.ink} ${styles.newsGrid}`} data-nav="dark">
            <div>
              <p className={`${styles.eyebrow} ${styles.inkEyebrow}`}>
                Rollout updates
              </p>

              <h2 className={`${styles.h2} ${styles.inkH2}`}>
                Stay informed as the US <em>rollout expands.</em>
              </h2>

              <p className={styles.inkText}>
                New lab integrations, new biomarkers, new coverage — once a month,
                in your inbox.
              </p>
            </div>

            <div>
              <NewsletterForm
                source="early-access-us"
                tone="dark"
                idleMessage="One email a month. Signal over noise."
                submitLabel="Subscribe"
              />
              <p className={styles.micro}>No spam. Unsubscribe in 1 click.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
