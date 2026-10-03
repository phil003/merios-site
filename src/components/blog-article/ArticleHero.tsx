import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import ArticleCover from "@/components/blog/ArticleCover";
import ArticleMeta from "@/components/ui/ArticleMeta";
import styles from "./article.module.css";

interface ArticleHeroProps {
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  readingMinutes: number;
  category: string;
  slug: string;
  /** Kept for API compatibility — the image renders via <ArticleFigure />. */
  image?: string;
}

/** Display size by title length — long SEO titles stay at 3–4 lines. */
function titleSize(title: string): string {
  if (title.length > 92) return "clamp(2rem, 1.1rem + 2.15vw, 3.3rem)";
  if (title.length > 64) return "clamp(2.1rem, 1.1rem + 2.6vw, 3.75rem)";
  if (title.length > 38) return "clamp(2.3rem, 1.15rem + 3.1vw, 4.4rem)";
  return "var(--text-display-l)";
}

/**
 * Night masthead for the /blog/[slug] article (site v3).
 *
 * - Breadcrumb (Home / Blog / [Title]) in mono caps on the night stage
 * - Category eyebrow (.label + lime dot)
 * - Display H1 in Bricolage, white, tight tracking — kept as one plain text
 *   node (no per-character spans) so crawlers read the exact title
 * - Lead paragraph + mono meta row (date · reading · category · author)
 * - The logo's heartbeat as the masthead horizon, like PageHero
 *
 * Staggered fade-up via CSS `.he` keyframes (LCP-safe: plays at parse time,
 * never gated behind JS hydration — see globals.css).
 */
export default function ArticleHero({
  title,
  description,
  date,
  dateModified,
  readingMinutes,
  category,
}: ArticleHeroProps) {
  return (
    <header className="v3-hero night relative" data-nav="dark">
      <div className={`${styles.container} ${styles.heroInner}`}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className={`he ${styles.crumbs}`}>
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
              <Link href="/blog" className={styles.crumbLink}>
                Blog
              </Link>
            </li>
            <li aria-hidden className={styles.crumbSep}>
              /
            </li>
            <li aria-current="page" className={styles.crumbCurrent}>
              {title}
            </li>
          </ol>
        </nav>

        {/* Content stack */}
        <div className={styles.heroCopy}>
          <div
            className={`he label ${styles.heroEyebrow}`}
            style={{ "--he-d": "0.04s" } as CSSProperties}
          >
            <span aria-hidden className="label-dot" />
            <span>{category}</span>
          </div>

          <h1
            className={`he display ${styles.heroTitle}`}
            style={
              {
                fontSize: titleSize(title),
                "--he-d": "0.08s",
              } as CSSProperties
            }
          >
            {title}
          </h1>

          <p
            className={`he ${styles.heroLead}`}
            style={{ "--he-d": "0.18s" } as CSSProperties}
          >
            {description}
          </p>

          <div
            className={`he ${styles.heroMeta}`}
            style={{ "--he-d": "0.28s" } as CSSProperties}
          >
            <ArticleMeta
              tone="night"
              date={dateModified && dateModified !== date ? dateModified : date}
              readingTime={readingMinutes}
              category={category}
              author="Merios Editorial"
            />
          </div>
        </div>
      </div>

      {/* The logo's heartbeat as the masthead's horizon */}
      <svg
        className="v3-hero__pulse"
        aria-hidden
        focusable="false"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="article-hero-pulse-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
          fill="none"
          stroke="url(#article-hero-pulse-fade)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="v3-hero__dot" aria-hidden />
    </header>
  );
}

/**
 * The article's featured image (frontmatter `image`), set as a rounded plate
 * at the head of the reading column, below the masthead.
 */
// Most articles carry the site-wide share card as their "featured image"
// (frontmatter `image: "/og-image.png"`). Inside an article that card reads
// as a banner, so the slot shows the article's own cover instead — the same
// art as its card on /blog — keeping the image role and its alt (the title).
// A genuine per-article image still renders as a photo.
const SITE_SHARE_CARD = "/og-image.png";

export function ArticleFigure({
  image,
  title,
  slug,
  tag,
}: {
  image: string;
  title: string;
  slug: string;
  tag: string;
}) {
  if (image === SITE_SHARE_CARD) {
    return (
      <figure className={`${styles.figure} ${styles.figureCover}`} role="img" aria-label={title}>
        <ArticleCover post={{ slug, title, tag }} className="block h-full w-full" />
      </figure>
    );
  }
  return (
    <figure className={styles.figure}>
      <Image
        src={image}
        alt={title}
        width={1200}
        height={675}
        priority={false}
        sizes="(min-width: 1024px) 680px, 100vw"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </figure>
  );
}
