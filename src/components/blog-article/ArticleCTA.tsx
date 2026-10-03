import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import styles from "./article.module.css";

/**
 * Closing CTA band for the /blog/[slug] article — a night stage with a chrome
 * display headline, the lime primary button and the logo's heartbeat as its
 * horizon. Links to /early-access (no inline form here — the app is the
 * conversion path; the Substack card above is the newsletter fallback).
 */
export default function ArticleCTA() {
  return (
    <section className={`night ${styles.cta}`} data-nav="dark">
      <div className={styles.ctaInner}>
        <Reveal className={styles.ctaStack}>
          <div className={`label ${styles.ctaLabel}`}>
            <span aria-hidden className="label-dot" />
            <span>Newsletter</span>
          </div>

          <h2 className={`display chrome-text ${styles.ctaTitle}`}>
            Like this? Get the next one in your inbox.
          </h2>

          <p className={styles.ctaLead}>
            Merios is live on the US App Store — plus a weekly briefing with new
            biomarker deep-dives and plain-English study breakdowns.
          </p>

          <div className={styles.ctaActions}>
            <Link href="/early-access" className="btn btn-lime">
              Get the app
              <span aria-hidden className="btn-arrow">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* The logo's heartbeat, closing the article */}
      <svg
        className={styles.ctaPulse}
        aria-hidden
        focusable="false"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="article-cta-pulse-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.4" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
          fill="none"
          stroke="url(#article-cta-pulse-fade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span aria-hidden className={styles.ctaDot} />
    </section>
  );
}
