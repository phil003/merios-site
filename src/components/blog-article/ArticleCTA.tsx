import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import styles from "./article.module.css";

/**
 * Closing band for the /blog/[slug] article — Open Sky: a sunrise that rises
 * into the lavender footer (not an ink block: the article's one ink block is
 * its "How Merios…" section), the app's eyebrow, the headline with its
 * italic human words, the ink pill, and the app's Today screen (example
 * data, labelled on the frame). A plain "get the app" band linking to
 * /early-access, the App Store page for every country; the Substack card
 * above is the newsletter.
 */
export default function ArticleCTA() {
  return (
    <section className={styles.cta} aria-labelledby="article-cta-title">
      <div className={styles.ctaInner}>
        <Reveal className={styles.ctaCopy}>
          <div className={`label ${styles.ctaLabel}`}>
            <span aria-hidden className="label-dot" />
            <span>Merios for iPhone</span>
          </div>

          <h2 id="article-cta-title" className={styles.ctaTitle}>
            Your own results, <em>finally readable.</em>
          </h2>

          <p className={styles.ctaLead}>
            Merios is on the App Store. Scan your lab report and it explains
            every line in plain English, in your lab’s own range, next to your
            days.
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

        <div className={styles.ctaFigure}>
          <div className={styles.ctaScreen}>
            <Image
              src="/images/v2/screens/today.jpg"
              alt="The Merios Today screen, with example data: sleep 7h24, recovery 76."
              width={780}
              height={1688}
              sizes="(min-width: 900px) 260px, 200px"
              className={styles.ctaShot}
            />
          </div>
          <span className={styles.ctaTag}>Example data</span>
        </div>
      </div>
    </section>
  );
}
