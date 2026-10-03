import Reveal from "@/components/ui/Reveal";
import styles from "./compareArticle.module.css";

interface ArticleVerdictProps {
  text: string;
}

/**
 * Editorial "Our take" box at the end of the article — a night card with a
 * slow chrome rim (the homepage's Plus-plan card), the summary set in
 * Newsreader, the logo's heartbeat along its lower edge. Purely decorative
 * ornaments (aria-hidden); the text is rendered exactly as given.
 */
export default function ArticleVerdict({ text }: ArticleVerdictProps) {
  return (
    <aside className={`night ${styles.verdict}`}>
      <span aria-hidden className={styles.verdictOrb} />
      <Reveal amount={0.3}>
        <div className={styles.verdictInner}>
          <div className={`label ${styles.verdictLabel}`}>
            <span aria-hidden className="label-dot" />
            <span>Our take</span>
          </div>
          <p className={styles.verdictText}>{text}</p>
        </div>
      </Reveal>

      <svg
        className={styles.verdictPulse}
        aria-hidden
        focusable="false"
        viewBox="0 0 1000 56"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="compare-verdict-pulse" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.46" />
          </linearGradient>
        </defs>
        <path
          d="M0 28 H700 L712 35 L726 6 L744 50 L756 28 H880"
          fill="none"
          stroke="url(#compare-verdict-pulse)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span aria-hidden className={styles.verdictDot} />
    </aside>
  );
}
