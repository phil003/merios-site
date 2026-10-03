import styles from "./compareArticle.module.css";

interface FaqItem {
  q: string;
  a: string;
}

interface ArticleFAQProps {
  items: FaqItem[];
}

/**
 * Editorial FAQ accordion for the compare article.
 *
 * Native <details>/<summary> for semantics + keyboard + a11y — server-rendered,
 * no client JS. White v3 cards on fog; the question number is a CSS counter
 * (presentation only, not in the HTML), the chevron flips via `.acc-icon-flip`
 * and the answer eases open where `::details-content` is supported.
 */
export default function ArticleFAQ({ items }: ArticleFAQProps) {
  return (
    <section className={styles.faq}>
      <h2 className={styles.faqTitle}>Frequently asked questions</h2>
      <ul className={styles.faqList}>
        {items.map((item, idx) => (
          <FaqRow key={`${idx}-${item.q}`} item={item} />
        ))}
      </ul>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  return (
    <li className={styles.faqItem}>
      <details className={styles.faqDetails}>
        <summary className={styles.faqSummary}>
          <span>{item.q}</span>
          <span aria-hidden className={`acc-icon-flip ${styles.faqIcon}`}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 5l4 4 4-4" />
            </svg>
          </span>
        </summary>
        <div className={styles.faqAnswer}>{item.a}</div>
      </details>
    </li>
  );
}
