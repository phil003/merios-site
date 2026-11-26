import Link from "next/link";

import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import { keepHyphenated } from "./typeset";
import styles from "./blog.module.css";

// Every article on one page, grouped by topic hub, as plain links in the
// server HTML. The grid above loads 24 cards at a time ("Load more" is
// client-side), so without this list most of the journal was linked from
// /blog only through a JSON-LD ItemList, which passes no link signal.
//
// Layout: CSS columns (3 on desktop, 2 on tablets, 1 on phones), a topic
// never split across two columns. The topics are ordered so the three
// columns come out about the same height (longest topics first, each into
// the shortest column), instead of a grid whose rows leave tall gaps under
// the short lists.

type IndexPost = { slug: string; title: string; tag: string };
type Group = { key: string; title: string; href?: string; posts: IndexPost[] };

const COLUMNS = 3;

/** Rough height of a group, in list rows: the heading, then each title. */
function weight(group: Group): number {
  return 2 + group.posts.reduce((sum, p) => sum + Math.ceil(p.title.length / 54), 0);
}

/** Longest-first into the shortest column; the columns, read in order. */
function balance(groups: Group[]): Group[] {
  const columns: { height: number; groups: Group[] }[] = Array.from(
    { length: COLUMNS },
    () => ({ height: 0, groups: [] }),
  );
  const order = groups
    .map((group, i) => ({ group, i, w: weight(group) }))
    .sort((a, b) => b.w - a.w || a.i - b.i);
  for (const { group, w } of order) {
    const shortest = columns.reduce((min, col) => (col.height < min.height ? col : min));
    shortest.groups.push(group);
    shortest.height += w;
  }
  // Keep the hubs' own order inside each column.
  const rank = new Map(groups.map((g, i) => [g.key, i]));
  return columns.flatMap((col) =>
    col.groups.sort((a, b) => (rank.get(a.key) ?? 0) - (rank.get(b.key) ?? 0)),
  );
}

export default function ArticleIndex({ posts }: { posts: IndexPost[] }) {
  const groups: Group[] = BLOG_CATEGORIES.map((category) => ({
    key: category.slug,
    title: category.title,
    href: `/blog/category/${category.slug}`,
    posts: posts
      .filter((p) => category.tags.includes(p.tag))
      .sort((a, b) => a.title.localeCompare(b.title)),
  })).filter((g) => g.posts.length > 0);

  const grouped = new Set(groups.flatMap((g) => g.posts.map((p) => p.slug)));
  const other = posts
    .filter((p) => !grouped.has(p.slug))
    .sort((a, b) => a.title.localeCompare(b.title));
  if (other.length > 0) groups.push({ key: "more", title: "More", posts: other });

  return (
    <section aria-labelledby="all-articles" className={styles.articleIndex}>
      <h2 id="all-articles" className={`label ${styles.articleIndexLabel}`}>
        <span aria-hidden className="label-dot" />
        <span>Every article, by topic</span>
      </h2>
      <div className={styles.articleIndexGrid}>
        {balance(groups).map((group) => (
          <div key={group.key} className={styles.articleIndexGroup}>
            <h3 className={styles.articleIndexTopic}>
              {group.href ? <Link href={group.href}>{group.title}</Link> : group.title}
              <span className={styles.articleIndexCount}>{group.posts.length}</span>
            </h3>
            <ul className={styles.articleIndexList}>
              {group.posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{keepHyphenated(post.title)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
