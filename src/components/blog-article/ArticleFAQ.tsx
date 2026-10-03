import styles from "./article.module.css";

interface FaqItem {
  q: string;
  a: string;
}

interface ArticleFAQProps {
  items: FaqItem[];
}

/**
 * Editorial FAQ for the /blog/[slug] article — display heading (sticky on
 * desktop) beside a stack of paper cards.
 *
 * Native <details>/<summary> for keyboard + a11y. The + turns into × (and its
 * disc fills lime) via CSS (`.acc-icon` in globals.css) — no client JS,
 * renders on the server.
 */
export default function ArticleFAQ({ items }: ArticleFAQProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="article-faq-heading" className={styles.faq}>
      <div className={`${styles.container} ${styles.faqGrid}`}>
        <h2 id="article-faq-heading" className={styles.faqTitle}>
          Frequently asked questions
        </h2>
        <ul className={styles.faqList}>
          {items.map((item, idx) => (
            <li key={`${idx}-${item.q}`} className={styles.faqItem}>
              <details>
                <summary className={styles.faqSummary}>
                  <span>{item.q}</span>
                  <span aria-hidden className={`acc-icon ${styles.faqIcon}`}>
                    +
                  </span>
                </summary>
                <div className={styles.faqAnswer}>{item.a}</div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
