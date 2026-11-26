import Link from "next/link";
import ToolCard from "./ToolCard";
import { spanStyles } from "./gridSpans";
import { relatedTools } from "./registry";
import css from "./toolPage.module.css";

/** "More calculators": three related tool cards and a link back to the hub. */
export default function ToolRelated({ slug }: { slug: string }) {
  const tools = relatedTools(slug);
  // Three cards: one row of three, never three in a four-column row.
  const spans = spanStyles(tools.map(() => false), 3);
  return (
    <section className={css.related} aria-labelledby="more-tools-title">
      <div className={css.relatedHead}>
        <h2 id="more-tools-title" className={css.relatedTitle}>
          More calculators
        </h2>
        <Link href="/tools" className={css.relatedAll}>
          All tools
        </Link>
      </div>
      <ul className={css.grid} data-max="3">
        {tools.map((tool, i) => (
          <li key={tool.slug} style={spans[i]}>
            <ToolCard tool={tool} heading="h3" size="small" />
          </li>
        ))}
      </ul>
    </section>
  );
}
