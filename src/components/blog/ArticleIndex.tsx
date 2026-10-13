import Link from "next/link";

import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import styles from "./blog.module.css";

// Every article on one page, grouped by topic hub, as plain links in the
// server HTML. The grid above loads 18 cards at a time ("Load more" is
// client-side), so without this list most of the journal was linked from
// /blog only through a JSON-LD ItemList, which passes no link signal.

type IndexPost = { slug: string; title: string; tag: string };

export default function ArticleIndex({ posts }: { posts: IndexPost[] }) {
  const groups = BLOG_CATEGORIES.map((category) => ({
    category,
    posts: posts
      .filter((p) => category.tags.includes(p.tag))
      .sort((a, b) => a.title.localeCompare(b.title)),
  })).filter((g) => g.posts.length > 0);

  const grouped = new Set(groups.flatMap((g) => g.posts.map((p) => p.slug)));
  const other = posts
    .filter((p) => !grouped.has(p.slug))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section aria-labelledby="all-articles" className={styles.articleIndex}>
      <h2 id="all-articles" className={`label ${styles.articleIndexLabel}`}>
        <span aria-hidden className="label-dot" />
        <span>Every article, by topic</span>
      </h2>
      <div className={styles.articleIndexGrid}>
        {groups.map(({ category, posts: list }) => (
          <div key={category.slug} className={styles.articleIndexGroup}>
            <h3 className={styles.articleIndexTopic}>
              <Link href={`/blog/category/${category.slug}`}>
                {category.title}
              </Link>
              <span className={styles.articleIndexCount}>{list.length}</span>
            </h3>
            <ul className={styles.articleIndexList}>
              {list.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {other.length > 0 ? (
          <div className={styles.articleIndexGroup}>
            <h3 className={styles.articleIndexTopic}>More</h3>
            <ul className={styles.articleIndexList}>
              {other.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
