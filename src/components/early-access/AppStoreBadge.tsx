"use client";

import { appStoreUrl, campaignFromPath } from "@/lib/appStore";
import styles from "./earlyAccess.module.css";

// Merios on the App Store (ascAppId 6760352598). The link is country-neutral:
// it opens the visitor's own storefront.
// Default campaign "web-early-access"; on click, ?from=… or the page the
// visitor came from (same-site referrer) becomes the campaign, so installs
// are attributed to it.
const APP_STORE_URL = appStoreUrl("web-early-access");

// Official Apple Media Services badge. 250x83 @1x renders at ~125x42 CSS px on
// retina. The black variant carries its own hairline, so it reads on the dawn.
const APP_STORE_BADGE =
  "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83";

/** The App Store badge of /early-access, the only client code on the page. */
export default function AppStoreBadge() {
  return (
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
  );
}
