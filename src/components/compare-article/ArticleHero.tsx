import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./compareArticle.module.css";

interface ArticleHeroProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  readTime: string;
  competitor: string;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Night masthead for a comparison: breadcrumb as the eyebrow, white display
 * H1, the description as the dek, then the dateline — with the logo's
 * heartbeat running along the lower edge (same drawing as PageHero).
 *
 * Server component. The entrance is the CSS `.he` keyframe, which plays at
 * parse time, so the H1 is never held at opacity 0 waiting for JavaScript.
 */
export default function ArticleHero({
  title,
  description,
  datePublished,
  dateModified,
  readTime,
  competitor,
}: ArticleHeroProps) {
  const showUpdated =
    dateModified && dateModified !== datePublished ? dateModified : null;

  return (
    <header className={`night ${styles.hero}`} data-nav="dark">
      <div className={styles.wrap}>
        <div className={styles.heroInner}>
          {/* Breadcrumb — mono eyebrow with the lime dot */}
          <nav aria-label="Breadcrumb" className={`he ${styles.crumbs}`}>
            <span aria-hidden className={`label-dot ${styles.crumbDot}`} />
            <ol>
              <li>
                <Link href="/" className={styles.crumbLink}>
                  Home
                </Link>
              </li>
              <li aria-hidden className={styles.crumbSep}>
                /
              </li>
              <li>
                <Link href="/compare" className={styles.crumbLink}>
                  Compare
                </Link>
              </li>
              <li aria-hidden className={styles.crumbSep}>
                /
              </li>
              <li aria-current="page" className={styles.crumbCurrent}>
                vs {competitor}
              </li>
            </ol>
          </nav>

          <h1
            className={`he ${styles.title}`}
            style={{ "--he-d": "0.06s" } as CSSProperties}
          >
            {title}
          </h1>

          <p
            className={`he ${styles.dek}`}
            style={{ "--he-d": "0.16s" } as CSSProperties}
          >
            {description}
          </p>

          <div
            className={`he ${styles.meta}`}
            style={{ "--he-d": "0.24s" } as CSSProperties}
          >
            <time dateTime={datePublished}>
              Published {formatDate(datePublished)}
            </time>
            {showUpdated ? (
              <>
                <span aria-hidden>·</span>
                <time dateTime={showUpdated}>
                  Updated {formatDate(showUpdated)}
                </time>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {/* The logo's heartbeat as the masthead's horizon */}
      <svg
        className={styles.horizon}
        aria-hidden
        focusable="false"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="compare-hero-pulse-fade"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
          >
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
          fill="none"
          stroke="url(#compare-hero-pulse-fade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className={styles.horizonDot} aria-hidden />
    </header>
  );
}
