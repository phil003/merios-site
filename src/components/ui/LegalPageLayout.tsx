import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import LegalToc, { type TocItem } from "@/components/legal/LegalToc";
import styles from "@/components/legal/legalLayout.module.css";

export type { TocItem };

interface LegalPageLayoutProps {
  eyebrow?: string;
  title: string;
  subline?: string;
  lastUpdated: string;
  tocItems: TocItem[];
  children: ReactNode;
  /** Optional figure under the masthead copy (the /security data map). */
  heroVisual?: ReactNode;
  /**
   * "reading" (default) keeps a 720px measure for long policy text;
   * "wide" opens the column for figure-rich pages (/security).
   */
  width?: "reading" | "wide";
}

/**
 * Legal page layout — /privacy, /terms, /security (v2 "Open Sky").
 *
 * A dawn masthead (the glass nav floats over it) with the H1's last word as
 * the Newsreader italic "human word", the last-updated line, then a body grid:
 * the sticky numbered contents rail on the left from 1024px, the article on
 * the right. Ends on a dawn card that carries the contact link. Server
 * component; only the contents (Lenis scroll, mobile accordion) is client.
 * The article is never behind a scroll reveal: it is long, it must simply be
 * there.
 */
export default function LegalPageLayout({
  eyebrow = "Legal",
  title,
  subline,
  lastUpdated,
  tocItems,
  children,
  heroVisual,
  width = "reading",
}: LegalPageLayoutProps) {
  const words = title.trim().split(" ");
  const last = words.pop() ?? "";
  const head = words.join(" ");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <p className={`he label ${styles.eyebrow}`}>
            <span aria-hidden className="label-dot label-dot--ink" />
            <span>{eyebrow}</span>
          </p>

          <h1 className={styles.title}>
            {head ? `${head} ` : null}
            <em>{last}</em>
          </h1>

          {subline ? (
            <p
              className={`he ${styles.subline}`}
              style={{ "--he-d": "0.12s" } as CSSProperties}
            >
              {subline}
            </p>
          ) : null}

          <p
            className={`he ${styles.updated}`}
            style={{ "--he-d": "0.2s" } as CSSProperties}
          >
            <span aria-hidden className={styles.updatedDot} />
            <span>Last updated: {lastUpdated}</span>
          </p>

          {heroVisual ? (
            <div
              className={`he ${styles.heroVisual}`}
              style={{ "--he-d": "0.28s" } as CSSProperties}
            >
              {heroVisual}
            </div>
          ) : null}
        </div>
      </section>

      <div className={styles.body}>
        <div className={`${styles.inner} ${styles.grid}`} data-width={width}>
          <LegalToc items={tocItems} />
          <article className={styles.article}>{children}</article>
        </div>
      </div>

      <div className={styles.closing}>
        <div className={styles.inner}>
          <div className={styles.closingCard}>
            <Link
              href="/contact#subject=Legal%20question&type=general"
              className={styles.closingLink}
            >
              <span>
                Questions? <em>Contact us</em>
              </span>
              <span aria-hidden className={styles.closingArrow}>
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
