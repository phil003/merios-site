import Link from "next/link";
import styles from "./article.module.css";

/**
 * Fallback for an invalid /blog/[slug] (should never fire at runtime because
 * generateStaticParams enumerates all posts and dynamicParams is false, but
 * kept for defensive SSR). A dawn masthead like every page top.
 */
export default function ArticleNotFound() {
  return (
    <main className={styles.nf}>
      <div className={`${styles.container} ${styles.nfInner}`}>
        <p className={`label ${styles.nfLabel}`}>
          <span aria-hidden className="label-dot" />
          <span>Article not found</span>
        </p>
        <h1 className={styles.nfTitle}>
          We can&rsquo;t find <em>that post.</em>
        </h1>
        <p className={styles.nfLead}>
          The link may have moved or the article has been retired.
        </p>
        <Link href="/blog" className="btn btn-ink">
          Back to the Journal →
        </Link>
      </div>
    </main>
  );
}
