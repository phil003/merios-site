import type { CSSProperties, ReactNode } from "react";
import styles from "./blog.module.css";

/**
 * Journal masthead copy (Open Sky): eyebrow with its hairline, the H1 with its
 * last words in Newsreader italic (pass them as <em>), and the lead.
 */
export function MastheadCopy({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  /** H1 content; wrap the human words in <em>. */
  title: ReactNode;
  lead?: string;
}) {
  return (
    <>
      <p className={`label ${styles.eyebrow}`}>
        <span aria-hidden className="label-dot" />
        <span>{eyebrow}</span>
      </p>
      <h1 className={styles.h1}>{title}</h1>
      {lead ? (
        <p className={`he ${styles.lead}`} style={{ "--he-d": "0.08s" } as CSSProperties}>
          {lead}
        </p>
      ) : null}
    </>
  );
}

/**
 * The dawn masthead of the journal pages (/blog, /blog/category/*). The glass
 * nav floats over it; the dawn melts into the haze of the page below.
 * `children` sits under the lead (the topic filter on /blog).
 */
export default function JournalMasthead({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className={styles.masthead}>
      <div className={styles.container}>
        <MastheadCopy eyebrow={eyebrow} title={title} lead={lead} />
        {children}
      </div>
    </header>
  );
}

/** Sets the last word of a title in the italic human voice: "Blood <em>Tests</em>". */
export function withItalicEnd(title: string): ReactNode {
  const cut = title.lastIndexOf(" ");
  if (cut <= 0) return title;
  return (
    <>
      {title.slice(0, cut + 1)}
      <em>{title.slice(cut + 1)}</em>
    </>
  );
}
