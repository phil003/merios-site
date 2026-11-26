import type { CSSProperties } from "react";
import Link from "next/link";
import { withSubs } from "../subscript";
import { getTool } from "./registry";
import css from "./toolPage.module.css";

/**
 * Dawn masthead for a /tools/* page (Open Sky, ToolPhenoAge mockup):
 * breadcrumb (Tools / topic), the H1 with its last words in Newsreader
 * italic, the lead, then chips. The first chip carries the page's former
 * eyebrow line word for word; the H1 text is `title` + " " + `em`, exactly
 * the shipped heading. Server component, no JS. The H1 and the lead paint at
 * parse time (LCP safe); only the breadcrumb and the chips rise in.
 */
export default function ToolHero({
  slug,
  eyebrow,
  title,
  em,
  subline,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  em?: string;
  subline?: string;
}) {
  const tool = getTool(slug);
  const full = em ? `${title} ${em}` : title;
  const len = full.length > 62 ? "long" : full.length > 38 ? "medium" : "short";
  const chips = [eyebrow, tool.inputs, "Free, no signup", "Runs in your browser"];

  return (
    <section className={css.hero} aria-labelledby="tool-title">
      <div className={css.inner}>
        <nav aria-label="Breadcrumb" className={css.rise}>
          <ol className={css.crumbs}>
            <li>
              <Link href="/tools">Tools</Link>
              <span aria-hidden className={css.crumbSep}>
                /
              </span>
            </li>
            <li>{tool.topic}</li>
          </ol>
        </nav>

        <h1 id="tool-title" className={css.title} data-len={len}>
          {em ? (
            <>
              {title} <em>{em}</em>
            </>
          ) : (
            title
          )}
        </h1>

        {subline ? (
          <p className={css.lead}>{withSubs(subline)}</p>
        ) : null}

        <ul className={`${css.chips} ${css.rise}`} style={{ "--rise-d": "220ms" } as CSSProperties}>
          {chips.map((c) => (
            <li key={c} className={css.chip}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
