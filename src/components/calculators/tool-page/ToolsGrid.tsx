"use client";

import { useState } from "react";
import ToolCard from "./ToolCard";
import { TOOLS, TOPICS, type ToolTopic } from "./registry";
import css from "./toolPage.module.css";
import g from "./toolsGrid.module.css";

type Filter = "All" | ToolTopic;

/**
 * The /tools hub: topic chips (in the dawn masthead) and the card grid.
 * Server-rendered with every card ("All"), so the full list is in the HTML;
 * the chips only filter what is shown.
 */
export default function ToolsGrid() {
  const tools = TOOLS;
  const [topic, setTopic] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...TOPICS.filter((x) => tools.some((t) => t.topic === x))];
  const shown = topic === "All" ? tools : tools.filter((t) => t.topic === topic);

  return (
    <>
      <div className={g.chipsWrap}>
        <div role="group" aria-label="Filter tools by topic" className={g.chips}>
          {filters.map((f) => {
            const count = f === "All" ? tools.length : tools.filter((t) => t.topic === f).length;
            return (
              <button
                key={f}
                type="button"
                className={g.chip}
                aria-pressed={f === topic}
                onClick={() => setTopic(f)}
              >
                {f} <span className={g.chipCount}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section aria-label="Tools" className={g.section}>
        <div className={g.inner}>
          <div className={g.head}>
            <p className={g.heading}>{topic === "All" ? "All tools" : topic}</p>
            <p className={g.count} aria-live="polite">
              <span className={g.countNum}>{shown.length}</span> {shown.length === 1 ? "tool" : "tools"}
            </p>
          </div>
          <ul className={css.grid}>
            {shown.map((tool) => {
              const wide = tool.slug === "phenoage-calculator";
              return (
                <li key={tool.slug} className={wide ? css.wide : undefined}>
                  <ToolCard tool={tool} wide={wide} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
