import Reveal from "@/components/ui/Reveal";
import styles from "./compareArticle.module.css";

interface ArticleVerdictProps {
  text: string;
}

/**
 * Editorial "Our take" box at the end of the comparison — the page's one ink
 * block (Open Sky): lavender label, the summary as a white Figtree
 * statement. The text is rendered exactly as given.
 */
export default function ArticleVerdict({ text }: ArticleVerdictProps) {
  return (
    <aside
      className={`night ${styles.verdict}`}
      data-nav="dark"
      aria-labelledby="compare-verdict-label"
    >
      <Reveal amount={0.3}>
        <div className={styles.verdictInner}>
          <div id="compare-verdict-label" className={`label ${styles.verdictLabel}`}>
            <span aria-hidden className="label-dot" />
            <span>Our take</span>
          </div>
          <p className={styles.verdictText}>{text}</p>
        </div>
      </Reveal>
    </aside>
  );
}
