import type { CSSProperties } from "react";
import Link from "next/link";
import a from "@/components/blog-article/article.module.css";

/** Defensive fallback for an unknown /compare/[slug] — a dawn masthead. */
export default function ArticleNotFound() {
  return (
    <main className={a.nf}>
      <div className={`${a.container} ${a.nfInner}`}>
        <div className={`he label ${a.nfLabel}`}>
          <span aria-hidden className="label-dot" />
          <span>Not found</span>
        </div>
        <h1
          className={`he ${a.nfTitle}`}
          style={{ "--he-d": "0.06s" } as CSSProperties}
        >
          Comparison <em>not found</em>
        </h1>
        <p
          className={`he ${a.nfLead}`}
          style={{ "--he-d": "0.14s" } as CSSProperties}
        >
          The comparison you&apos;re looking for has moved or doesn&apos;t
          exist. Browse every comparison Merios has written.
        </p>
        <div className="he" style={{ "--he-d": "0.22s", marginTop: 10 } as CSSProperties}>
          <Link href="/compare" className="btn btn-ink">
            Back to comparisons
            <span aria-hidden className="btn-arrow">
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
