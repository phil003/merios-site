import Link from "next/link";
import styles from "./article.module.css";

/**
 * Fallback for an invalid /blog/[slug] (should never fire at runtime because
 * generateStaticParams enumerates all posts and dynamicParams is false, but
 * kept for defensive SSR). A night stage like every masthead.
 */
export default function ArticleNotFound() {
  return (
    <main
      className={`v3-hero night ${styles.nf}`}
      data-nav="dark"
    >
      <div className={`${styles.container} ${styles.nfInner}`}>
        <p className={`label ${styles.nfLabel}`}>
          <span aria-hidden className={styles.warmDot} />
          <span>Article not found</span>
        </p>
        <h1 className={`display ${styles.nfTitle}`}>
          We can&rsquo;t find that post.
        </h1>
        <p className={styles.nfLead}>
          The link may have moved or the article has been retired.
        </p>
        <Link href="/blog" className="btn btn-lime">
          Back to the Journal →
        </Link>
      </div>
    </main>
  );
}
