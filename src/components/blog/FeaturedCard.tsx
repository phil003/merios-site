import Link from "next/link";
import ArticleCover from "./ArticleCover";
import type { BlogCardData } from "./BlogCard";
import { formatPostDate } from "./format";
import { keepHyphenated } from "./typeset";
import styles from "./blog.module.css";

interface FeaturedCardProps {
  post: BlogCardData;
}

/**
 * The latest article, set large (Open Sky): a glass card with the drawn cover
 * at 16:9 on the left and the copy on the right; the two wrap into one column
 * on narrow screens.
 */
export default function FeaturedCard({ post }: FeaturedCardProps) {
  return (
    <section aria-label="Featured article" className={styles.featuredSection}>
      <div className={styles.container}>
        <Link href={`/blog/${post.slug}`} className={styles.featured}>
          <span className={styles.featuredCover}>
            <ArticleCover post={post} variant="feature" className={styles.featuredArt} />
          </span>
          <span className={styles.featuredBody}>
            <span className={styles.featuredKicker}>
              Latest dispatch · {post.topic} ·{" "}
              <time dateTime={post.date} className={styles.nowrap}>
                {formatPostDate(post.date)}
              </time>{" "}
              · <span className={styles.nowrap}>{post.readTime}</span>
            </span>
            <h2 className={styles.featuredTitle}>{keepHyphenated(post.title)}</h2>
            <p className={styles.featuredDesc}>{keepHyphenated(post.description)}</p>
            <span className={styles.featuredCta}>
              Read article
              <svg
                className={styles.featuredArrow}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
