import Reveal from "@/components/ui/Reveal";
import styles from "./about.module.css";

const APP_STORE_URL = "https://apps.apple.com/app/merios/id6760352598?pt=128637372&ct=web-about&mt=8";

/**
 * Server component. Open Sky: the closing call is a dawn band (the same
 * band that ends /pricing), with the ink pill to the App Store.
 */
export default function FinalCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="about-cta-title">
      <div className={styles.container}>
        <Reveal>
          <div className={styles.band}>
            <div className={styles.bandCopy}>
              <p className={styles.eyebrow}>Now on the App Store</p>

              <h2 id="about-cta-title" className={styles.bandTitle}>
                Get Merios <em>on iPhone.</em>
              </h2>

              <p className={styles.bandText}>
                One composite score. Four pillars. A decade of health intelligence
                that stays yours. Free to download on iPhone (iOS 15.1 or later).
              </p>
            </div>

            <a
              className="btn btn-ink"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Merios on the App Store"
            >
              Download on the App Store
              <span aria-hidden className="btn-arrow">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
