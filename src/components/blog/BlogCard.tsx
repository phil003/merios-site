import Link from "next/link";
import ArticleCover from "./ArticleCover";
import { formatPostDate, shortReadTime } from "./format";
import { keepHyphenated } from "./typeset";
import styles from "./blog.module.css";

export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  /**
   * Reader-facing topic: the hub title (getTopicTitle in
   * src/lib/blog-categories.ts), never the raw frontmatter tag. Passed in by
   * the server pages, since this card also renders inside the client grid.
   */
  topic: string;
  readTime: string;
}

interface BlogCardProps {
  post: BlogCardData;
}

/**
 * Journal card (Open Sky): the drawn cover on its own (no paper card around
 * it), then the meta line (topic · date · read time), the title and the
 * description. Used on /blog and on every category hub. The date and the
 * read time never break inside ("Nov 16, 2026", "9 min").
 */
export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <span className={styles.cardCover}>
        <ArticleCover post={post} className={styles.cardArt} />
      </span>
      <span className={styles.cardMeta}>
        {post.topic} ·{" "}
        <time dateTime={post.date} className={styles.nowrap}>
          {formatPostDate(post.date)}
        </time>{" "}
        · <span className={styles.nowrap}>{shortReadTime(post.readTime)}</span>
      </span>
      <h3 className={styles.cardTitle}>{keepHyphenated(post.title)}</h3>
      <p className={styles.cardDesc}>{keepHyphenated(post.description)}</p>
    </Link>
  );
}
