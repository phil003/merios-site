import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import ArticleHeroCover from "./ArticleHeroCover";
import { formatShortDate, splitTitle } from "./splitTitle";
import styles from "./article.module.css";

interface ArticleHeroProps {
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  readingMinutes: number;
  category: string;
  /** Topic hub (/blog/category/*) the article belongs to, shown as a crumb. */
  hub?: { title: string; href: string };
  slug: string;
  /** Kept for API compatibility — the cover renders via the `cover` slot. */
  image?: string;
  /** Number of numbered sources; the meta row links to #sources. */
  sourcesCount?: number;
  /** The wide drawn cover, set on the haze right under the masthead. */
  cover?: ReactNode;
}

/** Display size by title length — long SEO titles stay at 3–4 lines. */
function titleLength(title: string): "short" | "mid" | "long" | "xlong" {
  if (title.length > 92) return "xlong";
  if (title.length > 64) return "long";
  if (title.length > 38) return "mid";
  return "short";
}

/**
 * Dawn masthead for the /blog/[slug] article (Open Sky v2).
 *
 * - Breadcrumb (Home / Blog / [Topic hub] / [Title]), ink on the dawn
 * - H1 in Figtree 600, its last words in Newsreader italic (see splitTitle:
 *   the text content is the exact title)
 * - Lead paragraph, then the meta row: topic chip · reading time · dates ·
 *   author · number of sources (anchor to the list)
 * - The drawn cover follows the header, on the haze
 *
 * Staggered fade-up via the CSS `.he` keyframes (plays at parse time, never
 * gated behind hydration; reduced motion honoured by globals.css).
 */
export default function ArticleHero({
  title,
  description,
  date,
  dateModified,
  readingMinutes,
  category,
  hub,
  sourcesCount = 0,
  cover,
}: ArticleHeroProps) {
  const { head, sep, tail } = splitTitle(title);
  const updated = dateModified && dateModified !== date ? dateModified : null;

  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
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
              {hub ? (
                <>
                  <li>
                    <Link href={hub.href} className={styles.crumbLink}>
                      {hub.title}
                    </Link>
                  </li>
                  <li aria-hidden className={styles.crumbSep}>
                    /
                  </li>
                </>
              ) : null}
              <li aria-current="page" className={styles.crumbCurrent}>
                {title}
              </li>
            </ol>
          </nav>

          <h1
            className={`he ${styles.heroTitle}`}
            data-len={titleLength(title)}
            style={{ "--he-d": "0.06s" } as CSSProperties}
          >
            {head}
            {tail ? (
              <>
                {sep}
                <em>{tail}</em>
              </>
            ) : null}
          </h1>

          <p
            className={`he ${styles.heroLead}`}
            style={{ "--he-d": "0.14s" } as CSSProperties}
          >
            {description}
          </p>

          <div
            className={`he ${styles.heroMeta}`}
            style={{ "--he-d": "0.22s" } as CSSProperties}
          >
            <span className={styles.heroChip}>{category}</span>
            <span>{readingMinutes} min read</span>
            <span>
              <time dateTime={date}>Published {formatShortDate(date)}</time>
              {updated ? (
                <>
                  {" · "}
                  <time dateTime={updated}>
                    Updated {formatShortDate(updated)}
                  </time>
                </>
              ) : null}
            </span>
            <span>Merios Editorial</span>
            {sourcesCount > 0 ? (
              <a href="#sources" className={styles.heroSources}>
                <span className={styles.heroSourcesNum}>{sourcesCount}</span>{" "}
                {sourcesCount === 1 ? "source" : "sources"}
              </a>
            ) : null}
          </div>
        </div>
      </header>

      {cover ? <div className={styles.coverWrap}>{cover}</div> : null}
    </>
  );
}

/**
 * The article's featured image (frontmatter `image`). Most articles carry the
 * site-wide share card (`/og-image.png`), which reads as a banner inside an
 * article, so that case shows the article's own drawn cover instead (the
 * Journal's art). A genuine per-article image still renders as a photo.
 */
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
    return <ArticleHeroCover post={{ slug, title, tag }} />;
  }
  return (
    <figure className={styles.figure}>
      <Image
        src={image}
        alt={title}
        width={1200}
        height={675}
        sizes="(min-width: 1360px) 1312px, 100vw"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </figure>
  );
}
