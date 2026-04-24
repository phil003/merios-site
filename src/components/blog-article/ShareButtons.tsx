"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { duration, easing } from "@/lib/motion";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

/**
 * Row of share buttons (X, LinkedIn, copy-link) for a /blog/[slug] article.
 *
 * - Three circular 40×40 buttons, canvas border, green-deep on hover.
 * - Copy-link uses `navigator.clipboard.writeText(window.location.href)` and
 *   shows a Motion-animated "Copied" toast for ~1.8s.
 * - External buttons open in a new tab with rel="noopener".
 * - Reduced motion disables the toast transition.
 */
export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const prefersReducedMotion = useReducedMotion();
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
    <div className="relative flex items-center gap-3">
      <span
        className="mr-1"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-ink-tertiary)",
          fontWeight: 500,
        }}
      >
        Share
      </span>

      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share on X: ${title}`}
        className="share-btn"
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
        className="share-btn"
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
        className="share-btn"
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

      <AnimatePresence>
        {copied ? (
          <motion.span
            key="copied-toast"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: duration.quick, ease: easing.expo }
            }
            className="pointer-events-none absolute right-0 -bottom-8 inline-flex items-center gap-2 rounded-full px-3 py-1"
            style={{
              background: "var(--color-ink)",
              color: "var(--color-canvas)",
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Copied
          </motion.span>
        ) : null}
      </AnimatePresence>

      <style>{`
        .share-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          background: transparent;
          border: 1px solid var(--color-grid);
          color: var(--color-ink-secondary);
          transition:
            color 240ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
            background 240ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .share-btn:hover,
        .share-btn:focus-visible {
          color: var(--color-green-deep);
          border-color: var(--color-green-deep);
          background: var(--color-canvas-alt);
          outline: none;
        }
        .share-btn:focus-visible {
          box-shadow: 0 0 0 2px var(--color-green-deep);
          box-shadow: 0 0 0 2px var(--color-green-deep), 0 0 0 4px var(--color-canvas);
        }
        @media (prefers-reduced-motion: reduce) {
          .share-btn {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
