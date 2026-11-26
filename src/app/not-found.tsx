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
 * Open Sky: a dawn stage. The H1 ends on the italic human words; the Journal
 * and the tools are the two places to start, and the home page is one link
 * away. A plain horizon line runs across and breaks off where the
 * missing page should be (decorative, aria-hidden). CSS-only entrance
 * (`.he`), so the H1 paints at parse time.
 */
export default function NotFound() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.inner}>
          <p className={`he ${styles.eyebrow}`}>404 — page not found</p>

          <h1 className={styles.title}>
            We can&rsquo;t find <em>that page.</em>
          </h1>

          <p
            className={`he ${styles.copy}`}
            style={{ "--he-d": "0.1s" } as CSSProperties}
          >
            The link may have moved, or the page has been retired. The two
            places worth starting from:
          </p>

          <div
            className={`he ${styles.actions}`}
            style={{ "--he-d": "0.18s" } as CSSProperties}
          >
            <Link href="/blog" className="btn btn-ink">
              Read the Journal
              <span aria-hidden className="btn-arrow">→</span>
            </Link>
            <Link href="/tools" className="btn btn-ghost">
              Free calculators
              <span aria-hidden className="btn-arrow">→</span>
            </Link>
          </div>

          <p
            className={`he ${styles.home}`}
            style={{ "--he-d": "0.24s" } as CSSProperties}
          >
            Or go back to the <Link href="/">home page</Link>.
          </p>
        </div>

        {/* The horizon, broken where the page should be */}
        <svg
          className={styles.horizon}
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
              <stop offset="0" stopColor="#6E8FE8" stopOpacity="0" />
              <stop offset="0.45" stopColor="#6E8FE8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#6E8FE8" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            className={styles.line}
            d="M0 60 H612"
            stroke="url(#nf-pulse-fade)"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className={styles.gap}
            d="M640 60 H812"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className={styles.line}
            d="M840 60 H1294"
            stroke="url(#nf-pulse-fade)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span aria-hidden className={styles.sun} />
      </main>
      <Footer />
    </>
  );
}
