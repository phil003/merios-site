import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import styles from "./blog.module.css";

// Topic navigation: a link to every blog category hub, on /blog and on each
// category page. The /blog topic filter works in place and links nowhere, so
// without this row some hubs would have no inbound link at all. Same pill as
// the filter (Open Sky glass, Newsreader count); the current category is the
// white pill (aria-current="page").

interface CategoryNavProps {
  /** Visible heading (an H2 set as a label). */
  heading: string;
  /** Id for the heading, which also labels the nav landmark. */
  id: string;
  /** Article count per category slug (see getCategoryCounts). */
  counts: Record<string, number>;
  /** Slug of the category page this nav sits on, if any. */
  current?: string;
  align?: "start" | "center";
  className?: string;
}

export default function CategoryNav({
  heading,
  id,
  counts,
  current,
  align = "start",
  className,
}: CategoryNavProps) {
  return (
    <nav
      aria-labelledby={id}
      className={className ? `${styles.topics} ${className}` : styles.topics}
      data-align={align}
    >
      <h2 id={id} className={`label ${styles.topicsLabel}`}>
        <span aria-hidden className="label-dot" />
        <span>{heading}</span>
      </h2>
      <ul className={styles.topicList}>
        {BLOG_CATEGORIES.map((category) => {
          const active = category.slug === current;
          const count = counts[category.slug] ?? 0;
          return (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
                className={`${styles.chip} ${styles.chipLink}`}
                aria-current={active ? "page" : undefined}
              >
                {category.title}
                <span className={styles.chipCount}>
                  {count}
                  <span className="sr-only">
                    {count === 1 ? " article" : " articles"}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
