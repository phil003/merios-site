import Link from "next/link";

import type { BlogPost } from "@/lib/blog";
import type { RelatedLink } from "@/lib/related";
import ArticleMeta from "@/components/ui/ArticleMeta";
import Reveal from "@/components/ui/Reveal";
import ArticleCover from "@/components/blog/ArticleCover";
import styles from "./article.module.css";

interface RelatedArticlesProps {
  posts: BlogPost[];
  /** Further reading on the same topic (and its calculator), as plain links. */
  more?: RelatedLink[];
}

function parseMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

/**
 * "Keep reading" — up to 3 related posts with their drawn covers (the same
 * art as their cards on /blog: the subject, never a photo), then topic, date
 * and reading time as a label, the title and the lead. Below, a quiet list of
 * further reading on the same topic (see src/lib/related.ts).
 */
export default function RelatedArticles({
  posts,
  more = [],
}: RelatedArticlesProps) {
  if (posts.length === 0 && more.length === 0) return null;

  return (
    <section className={styles.related} aria-labelledby="related-title">
      <div className={styles.container}>
        <Reveal>
          <div className={styles.relatedHead}>
            <div className={`label ${styles.relatedLabel}`}>
              <span aria-hidden className="label-dot" />
              <span>Keep reading</span>
            </div>
            <h2 id="related-title" className={styles.relatedTitle}>
              More from the Journal
            </h2>
          </div>
        </Reveal>

        {posts.length > 0 ? (
          <div className={styles.relatedGrid}>
            {posts.map((post) => (
              <RelatedArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : null}

        {more.length > 0 ? (
          <nav aria-labelledby="more-on-topic" className={styles.relatedMore}>
            <h3 id="more-on-topic" className={`label ${styles.relatedMoreLabel}`}>
              <span aria-hidden className="label-dot" />
              <span>More on this topic</span>
            </h3>
            <ul className={styles.relatedMoreList}>
              {more.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.relatedMoreLink}>
                    <span className={styles.relatedMoreKind}>{link.kind}</span>
                    <span className={styles.relatedMoreTitle}>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </section>
  );
}

function RelatedArticleCard({ post }: { post: BlogPost }) {
  const minutes = parseMinutes(post.readTime);

  return (
    <Link href={`/blog/${post.slug}`} className={styles.relCard}>
      <div aria-hidden className={styles.relCover}>
        <ArticleCover
          post={{ slug: post.slug, title: post.title, tag: post.tag }}
          className={styles.relCoverArt}
        />
      </div>
      <div className={styles.relMetaRow}>
        <span className={styles.relTag}>{post.tag}</span>
        <span aria-hidden className={styles.relDot} />
        <ArticleMeta date={post.date} readingTime={minutes} />
      </div>
      <h3 className={styles.relTitle}>{post.title}</h3>
      <p className={styles.relDesc}>{post.description}</p>
    </Link>
  );
}
