import Image from "next/image";
import styles from "./article.module.css";

/**
 * The small app screen under the TOC in the article's sticky aside (Open Sky
 * mockup): the Merios blood panel screen (example data) on a dawn plate, one
 * line, and the ink "Get the app" pill. Desktop only (the aside is hidden
 * below 1080px). The screen is below the fold: lazy, explicit size.
 */
export default function ArticleAppCard() {
  return (
    <div className={styles.appCard}>
      <div className={styles.appPlate}>
        <Image
          src="/images/v2/screens/blood-panel.jpg"
          alt="The Merios blood panel screen, with example data."
          width={780}
          height={1688}
          sizes="150px"
          className={styles.appShot}
        />
        <span className={styles.appTag}>Example data</span>
      </div>
      <p className={styles.appTitle}>
        Read your own results, <em>over time.</em>
      </p>
      <p className={styles.appText}>
        Scan your lab report. Merios explains every line in plain English.
      </p>
      <a href="/early-access" className={`btn btn-ink ${styles.appCta}`}>
        Get the app
      </a>
    </div>
  );
}
