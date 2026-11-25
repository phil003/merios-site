import a from "@/components/blog-article/article.module.css";

interface FaqItem {
  q: string;
  a: string;
}

interface ArticleFAQProps {
  items: FaqItem[];
}

/**
 * FAQ accordion for the compare article — the article template's glass card
 * (Open Sky): a hairline between questions, a +/– disc, the first question
 * open. Native <details>/<summary>, server-rendered, answers in the HTML
 * (the FAQPage JSON-LD is rendered separately by the page).
 */
export default function ArticleFAQ({ items }: ArticleFAQProps) {
  if (items.length === 0) return null;
  return (
    <section id="faq" aria-labelledby="compare-faq-heading" className={a.faq}>
      <h2 id="compare-faq-heading" className={a.blockTitle}>
        Frequently asked questions
      </h2>
      <div className={a.faqList}>
        {items.map((item, idx) => (
          <details
            key={`${idx}-${item.q}`}
            className={a.faqItem}
            open={idx === 0}
          >
            <summary className={a.faqSummary}>
              <span>{item.q}</span>
              <span aria-hidden className={a.sign} />
            </summary>
            <div className={a.faqAnswer}>{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
