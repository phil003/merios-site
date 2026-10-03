"use client";

import { useState } from "react";
import styles from "./article.module.css";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

/**
 * Row of share buttons (X, LinkedIn, copy-link) for a /blog/[slug] article.
 *
 * - Three 44×44 paper discs, ink glyphs; on hover they turn ink with a lime
 *   glyph. Focus uses the global :focus-visible ring.
 * - Copy-link uses `navigator.clipboard.writeText(window.location.href)` and
 *   shows a CSS-transition "Copied" toast for ~1.8s (motion-free).
 * - External buttons open in a new tab with rel="noopener".
 */
export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url = `https://merios.life/blog/${slug}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(url)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url,
  )}`;

  const handleCopy = async () => {
    const target =
      typeof window !== "undefined" ? window.location.href : url;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(target);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={styles.share}>
      <span className={styles.shareLabel}>Share</span>

      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share on X: ${title}`}
        className={styles.shareBtn}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
        </svg>
      </a>

      <a
        href={liUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share on LinkedIn: ${title}`}
        className={styles.shareBtn}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5C0 2.12 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.44 0h4.37v1.91h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v7.46h-4.55v-6.6c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.49V22H7.66V8z" />
        </svg>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={styles.shareBtn}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
          <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
        </svg>
      </button>

      <span
        aria-live="polite"
        data-show={copied ? "true" : "false"}
        className={`share-toast ${styles.toast}`}
      >
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}
