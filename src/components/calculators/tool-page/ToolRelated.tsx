import Link from "next/link";
import ToolCard from "./ToolCard";
import { relatedTools } from "./registry";
import css from "./toolPage.module.css";

/** "More calculators": three related tool cards and a link back to the hub. */
export default function ToolRelated({ slug }: { slug: string }) {
  const tools = relatedTools(slug);
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
      <ul className={css.grid}>
        {tools.map((tool) => (
          <li key={tool.slug}>
            <ToolCard tool={tool} heading="h3" size="small" />
          </li>
        ))}
      </ul>
    </section>
  );
}
