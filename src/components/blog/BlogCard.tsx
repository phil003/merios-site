import Link from "next/link";
import ArticleCover from "./ArticleCover";
import { formatPostDate } from "./format";
import styles from "./blog.module.css";

export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  readTime: string;
}

interface BlogCardProps {
  post: BlogCardData;
}

/**
 * Journal card (Open Sky): the drawn cover on its own (no paper card around
 * it), then the meta line (topic · date · read time), the title and the
 * description. Used on /blog and on every category hub.
 */
export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <span className={styles.cardCover}>
        <ArticleCover post={post} className={styles.cardArt} />
      </span>
      <span className={styles.cardMeta}>
        {post.tag} · <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
        {post.readTime}
      </span>
      <h3 className={styles.cardTitle}>{post.title}</h3>
      <p className={styles.cardDesc}>{post.description}</p>
    </Link>
  );
}
