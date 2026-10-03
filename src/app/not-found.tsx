import type { CSSProperties } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import styles from "./not-found.module.css";

/**
 * Global 404.
 *
 * This exists because of a real bug: `/blog/[slug]` and `/compare/[slug]` used
 * to render a "not found" component from inside the page, which returns
 * **HTTP 200**. Google reads a 200 response whose body says "not found" as a
 * soft 404, and it applied to the whole `/blog/*` and `/compare/*` namespace,
 * not to one URL. The routes now set `dynamicParams = false`, so an unknown
 * slug is refused at the routing layer with a genuine 404 status, and Next
 * renders this page.
 *
 * v3: a night stage. The logo's heartbeat runs along the horizon and breaks
 * off where the missing page should be (decorative, aria-hidden). CSS-only
 * entrance (`.he`), so the H1 paints at parse time.
 */
export default function NotFound() {
  return (
    <>
      <main className={`night ${styles.main}`} data-nav="dark">
        <span aria-hidden className={styles.glow} />

        <div className={styles.inner}>
          <p className={`label he ${styles.eyebrow}`}>
            <span aria-hidden className={styles.dot} />
            <span>404 — page not found</span>
          </p>

          <h1
            className={`display he ${styles.title}`}
            style={{ "--he-d": "0.06s" } as CSSProperties}
          >
            We can&rsquo;t find that page.
          </h1>

          <p
            className={`he ${styles.copy}`}
            style={{ "--he-d": "0.14s" } as CSSProperties}
          >
            The link may have moved, or the page has been retired. The two
            places worth starting from:
          </p>

          <div
            className={`he ${styles.actions}`}
            style={{ "--he-d": "0.22s" } as CSSProperties}
          >
            <Link href="/blog" className="btn btn-lime">
              Read the Journal →
            </Link>
            <Link href="/tools" className="btn btn-ghost-night">
              Free calculators →
            </Link>
          </div>
        </div>

        {/* The heartbeat, broken where the page should be */}
        <svg
          className="v3-hero__pulse"
          aria-hidden
          focusable="false"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="nf-pulse-fade"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="1440"
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.28" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 H612"
            fill="none"
            stroke="url(#nf-pulse-fade)"
            strokeWidth="1.6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M640 60 H812"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.22"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="2 9"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M840 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
            fill="none"
            stroke="url(#nf-pulse-fade)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="v3-hero__dot" aria-hidden />
      </main>
      <Footer />
    </>
  );
}
