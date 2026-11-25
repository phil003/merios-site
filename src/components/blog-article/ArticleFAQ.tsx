import styles from "./article.module.css";

interface FaqItem {
  q: string;
  a: string;
}

interface ArticleFAQProps {
  items: FaqItem[];
}

/**
 * FAQ for the /blog/[slug] article, set in the reading column after the body
 * (Open Sky mockup): one glass card, a hairline between questions, a +/– disc
 * on haze. The first question is open.
 *
 * Native <details>/<summary>: keyboard + a11y for free, answers in the HTML
 * (the FAQPage JSON-LD is rendered separately by the page). No client JS.
 * `id="faq"` is the TOC anchor.
 */
export default function ArticleFAQ({ items }: ArticleFAQProps) {
  if (items.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="article-faq-heading" className={styles.faq}>
      <h2 id="article-faq-heading" className={styles.blockTitle}>
        Frequently asked questions
      </h2>
      <div className={styles.faqList}>
        {items.map((item, idx) => (
          <details
            key={`${idx}-${item.q}`}
            className={styles.faqItem}
            open={idx === 0}
          >
            <summary className={styles.faqSummary}>
              <span>{item.q}</span>
              <span aria-hidden className={styles.sign} />
            </summary>
            <div className={styles.faqAnswer}>{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
