"use client";

import { useLenis } from "@/components/providers/LenisProvider";
import type { Heading } from "./toc";
import styles from "./article.module.css";

interface MobileTOCProps {
  headings: Heading[];
}

/**
 * Collapsible "Contents" card for mobile (<lg). Closed by default.
 * Uses native <details> for keyboard + a11y; the plus icon (ink disc, lime
 * glyph) turns into a cross via the CSS `.acc-icon` rule.
 */
export default function MobileTOC({ headings }: MobileTOCProps) {
  const lenis = useLenis();

  if (headings.length === 0) return null;

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, {
        offset: -96,
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
    (event.currentTarget.closest("details") as HTMLDetailsElement | null)?.removeAttribute("open");
  };

  return (
    <details className={`lg:hidden ${styles.mtoc}`}>
      <summary className={styles.mtocSummary}>
        <span className={styles.mtocLabel}>Contents</span>
        <span aria-hidden className={`acc-icon ${styles.mtocIcon}`}>
          +
        </span>
      </summary>
      <ol className={styles.mtocList}>
        {headings.map((h, i) => {
          const indent = h.level === 3 ? 16 : 0;
          return (
            <li key={h.id} style={{ marginLeft: indent }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                data-level={h.level}
                className={styles.mtocLink}
              >
                <span aria-hidden className={styles.mtocNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </details>
  );
}
