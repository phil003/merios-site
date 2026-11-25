import css from "./toolPage.module.css";

/**
 * The FAQ as an accordion (<details>, no JS): every answer stays in the
 * HTML, word for word the same as the FAQPage JSON-LD. The first one opens.
 */
export default function ToolFaq({ items, name = "tool-faq" }: { items: { q: string; a: string }[]; name?: string }) {
  return (
    <div className={css.faqList}>
      {items.map(({ q, a }, i) => (
        <details key={q} className={css.faqItem} name={name} open={i === 0}>
          <summary className={css.faqQ}>
            <span>{q}</span>
            <span aria-hidden className={css.faqSign} />
          </summary>
          <p className={css.faqA}>{a}</p>
        </details>
      ))}
    </div>
  );
}
