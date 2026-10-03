import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./compareArticle.module.css";

export default function ArticleNotFound() {
  return (
    <main className={`night ${styles.notFound}`} data-nav="dark">
      <div className={styles.wrap}>
        <div className={styles.notFoundInner}>
          <div className={`he label ${styles.notFoundLabel}`}>
            <span aria-hidden className={`label-dot ${styles.notFoundDot}`} />
            <span>Not found</span>
          </div>
          <h1
            className={`he display ${styles.notFoundTitle}`}
            style={{ "--he-d": "0.06s" } as CSSProperties}
          >
            Comparison not found
          </h1>
          <p
            className={`he ${styles.notFoundText}`}
            style={{ "--he-d": "0.14s" } as CSSProperties}
          >
            The comparison you&apos;re looking for has moved or doesn&apos;t
            exist. Browse every comparison Merios has written.
          </p>
          <div className="he" style={{ "--he-d": "0.22s", marginTop: 10 } as CSSProperties}>
            <Link href="/compare" className="btn btn-lime">
              Back to comparisons
              <span aria-hidden className="btn-arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
