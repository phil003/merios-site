import type { CSSProperties } from "react";
import Link from "next/link";
import { formatShortDate, splitTitle } from "@/components/blog-article/splitTitle";
import { keepHyphenated } from "@/components/blog/typeset";
import a from "@/components/blog-article/article.module.css";

interface ArticleHeroProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  readTime: string;
  /** The page's subject, last breadcrumb: "Lingo vs Stelo", "Function Health review". */
  crumb: string;
}

/** Display size by title length, as in the article masthead. */
function titleLength(title: string): "short" | "mid" | "long" | "xlong" {
  if (title.length > 92) return "xlong";
  if (title.length > 64) return "long";
  if (title.length > 38) return "mid";
  return "short";
}

/**
 * Dawn masthead for a comparison (Open Sky, the same system as the article
 * template): breadcrumb (Home / Compare / the page's subject, e.g. "Lingo vs
 * Stelo" or "Function Health review"), the H1 with its italic human words
 * (text content = the exact title), the description as the dek, then the
 * dateline.
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
  crumb,
}: ArticleHeroProps) {
  const showUpdated =
    dateModified && dateModified !== datePublished ? dateModified : null;
  const { head, sep, tail } = splitTitle(title);

  return (
    <header className={a.hero}>
      <div className={a.heroInner}>
        <nav aria-label="Breadcrumb" className={`he ${a.crumbs}`}>
          <ol>
            <li>
              <Link href="/" className={a.crumbLink}>
                Home
              </Link>
            </li>
            <li aria-hidden className={a.crumbSep}>
              /
            </li>
            <li>
              <Link href="/compare" className={a.crumbLink}>
                Compare
              </Link>
            </li>
            <li aria-hidden className={a.crumbSep}>
              /
            </li>
            <li aria-current="page" className={a.crumbCurrent}>
              {crumb}
            </li>
          </ol>
        </nav>

        <h1
          className={`he ${a.heroTitle}`}
          data-len={titleLength(title)}
          style={{ "--he-d": "0.06s" } as CSSProperties}
        >
          {keepHyphenated(head)}
          {tail ? (
            <>
              {sep}
              <em>{keepHyphenated(tail)}</em>
            </>
          ) : null}
        </h1>

        <p
          className={`he ${a.heroLead}`}
          style={{ "--he-d": "0.14s" } as CSSProperties}
        >
          {keepHyphenated(description)}
        </p>

        <div
          className={`he ${a.heroMeta}`}
          style={{ "--he-d": "0.22s" } as CSSProperties}
        >
          <span>
            <time dateTime={datePublished}>
              Published {formatShortDate(datePublished)}
            </time>
            {showUpdated ? (
              <>
                {" · "}
                <time dateTime={showUpdated}>
                  Updated {formatShortDate(showUpdated)}
                </time>
              </>
            ) : null}
          </span>
          <span>{readTime}</span>
        </div>
      </div>
    </header>
  );
}
