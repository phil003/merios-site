import Image from "next/image";
import styles from "./blog.module.css";

/**
 * Closing band of the journal (Open Sky mockup): a dawn plate with the
 * eyebrow, the H2 and its italic human words, the ink pill, and the app's
 * check screen after a scan, the subject of the line (instead of the
 * mockup's lake video: the journal shows the subject, not a mood). The
 * screen carries example data, and says so. "Get the app" goes through
 * /early-access, like the nav, so the US / rest-of-world routing applies.
 */
export default function JournalCta() {
  return (
    <section aria-labelledby="journal-cta-title" className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.cta}>
          <div className={styles.ctaCopy}>
            <p className={`label ${styles.ctaEyebrow}`}>
              <span aria-hidden className="label-dot" />
              <span>Merios for iPhone</span>
            </p>
            <h2 id="journal-cta-title" className={styles.ctaTitle}>
              Read your own numbers, <em>not just the articles.</em>
            </h2>
            <p className={styles.ctaLead}>
              Scan your lab report and Merios explains every line, in your lab’s
              own range, next to your days.
            </p>
            <a href="/early-access" className={`btn btn-ink ${styles.ctaBtn}`}>
              Get the app
              <span aria-hidden className="btn-arrow">
                →
              </span>
            </a>
          </div>
          <div className={styles.ctaPhoneWrap}>
            <div className={styles.ctaPhone}>
              <Image
                src="/images/v2/screens/scan-check.jpg"
                alt="The Merios check screen after a scan, with example data: 42 values read, 2 to check."
                width={780}
                height={1688}
                sizes="(min-width: 900px) 280px, 240px"
                className={styles.ctaShot}
              />
            </div>
            <span className={styles.ctaTag}>Example data</span>
          </div>
        </div>
      </div>
    </section>
  );
}
