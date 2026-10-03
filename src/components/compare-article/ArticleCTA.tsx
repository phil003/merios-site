import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import styles from "./compareArticle.module.css";

/**
 * Final article CTA — "Try Merios →" linking to /early-access.
 * Night band: chrome display headline, centred, and the lime button sitting
 * on the logo's heartbeat line (decorative, aria-hidden).
 */
export default function ArticleCTA() {
  return (
    <section className={`night ${styles.cta}`} data-nav="dark">
      <div className={styles.wrap}>
        <Reveal>
          <div className={styles.ctaInner}>
            <div className={`label ${styles.ctaLabel}`}>
              <span aria-hidden className="label-dot" />
              <span>Ready to decide?</span>
            </div>
            <h2 className={`display chrome-text ${styles.ctaTitle}`}>
              See your health in one clear score.
            </h2>
            <div className={styles.ctaRow}>
              <svg
                className={styles.ctaPulse}
                aria-hidden
                focusable="false"
                viewBox="0 0 1440 96"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="compare-cta-pulse"
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="0"
                  >
                    <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0.16" />
                    <stop offset="0.62" stopColor="#FFFFFF" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 48 H1100 L1114 60 L1132 10 L1156 88 L1170 48 H1320"
                  fill="none"
                  stroke="url(#compare-cta-pulse)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span aria-hidden className={styles.ctaPulseDot} />
              <Link
                href="/early-access"
                className={`btn btn-lime ${styles.ctaButton}`}
              >
                Try Merios
                <span aria-hidden className="btn-arrow">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
