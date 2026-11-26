import Image from "next/image";
import styles from "./article.module.css";

interface ArticleAppCardProps {
  /**
   * Under a longer contents list: the line and the pill only, without the
   * app screen, so the list keeps the room it needs.
   */
  compact?: boolean;
}

/**
 * The small app card under the TOC in the article's sticky aside (Open Sky
 * mockup): the Merios blood panel screen (example data) on a dawn plate, one
 * line, and the ink "Get the app" pill. Desktop only (the aside is hidden
 * below 1080px). The screen is below the fold: lazy, explicit size. The page
 * picks the compact card, or none, when the contents list is long (see
 * estimateTocHeight in toc.ts).
 */
export default function ArticleAppCard({ compact = false }: ArticleAppCardProps) {
  return (
    <div className={styles.appCard} data-compact={compact ? "" : undefined}>
      {compact ? null : (
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
      )}
      <p className={styles.appTitle}>
        Read your own results, <em className={styles.nowrapWords}>over time.</em>
      </p>
      {compact ? null : (
        <p className={styles.appText}>
          Scan your lab report. Merios explains every line in plain English.
        </p>
      )}
      <a href="/early-access" className={`btn btn-ink ${styles.appCta}`}>
        Get the app
      </a>
    </div>
  );
}
