import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import styles from "./article.module.css";

/**
 * Closing band for the /blog/[slug] article — Open Sky: a sunrise that rises
 * into the lavender footer (not an ink block: the article's one ink block is
 * its "How Merios…" section), the headline with its italic human words, the
 * ink pill, and the app's Today screen (example data). Links to /early-access
 * (no inline form here — the app is the conversion path; the Substack card
 * above is the newsletter fallback).
 */
export default function ArticleCTA() {
  return (
    <section className={styles.cta} aria-labelledby="article-cta-title">
      <div className={styles.ctaInner}>
        <Reveal className={styles.ctaCopy}>
          <div className={`label ${styles.ctaLabel}`}>
            <span aria-hidden className="label-dot" />
            <span>Newsletter</span>
          </div>

          <h2 id="article-cta-title" className={styles.ctaTitle}>
            Like this? <em>Get the next one in your inbox.</em>
          </h2>

          <p className={styles.ctaLead}>
            Merios is live on the US App Store — plus a weekly briefing with new
            biomarker deep-dives and plain-English study breakdowns.
          </p>

          <div className={styles.ctaActions}>
            <a href="/early-access" className="btn btn-ink">
              Get the app
              <span aria-hidden className="btn-arrow">
                →
              </span>
            </a>
          </div>
        </Reveal>

        <div className={styles.ctaScreen}>
          <Image
            src="/images/v2/screens/today.jpg"
            alt="The Merios Today screen, with example data: sleep 7h24, recovery 76."
            width={780}
            height={1688}
            sizes="(min-width: 900px) 260px, 200px"
            className={styles.ctaShot}
          />
          <span className={styles.ctaTag}>Example data</span>
        </div>
      </div>
    </section>
  );
}
