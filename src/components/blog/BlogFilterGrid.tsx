"use client";

// Pagination strategy: client-side "Load more" (18 per batch). The server
// serializes only card-level fields (not the MDX body) so the initial HTML
// stays lean while SEO payload (JSON-LD ItemList + prefetched hrefs) remains
// complete.
//
// Card animation (motion/react-free): entering cards remount with a CSS
// keyframe entrance (.bfg-card-in) staggered at 40ms/card (capped at 8).
// The grid is keyed by the active category so a filter change replays the
// entrance for the whole set; "Load more" only animates the newly appended
// batch. Nothing animates on initial page load — the server HTML is visible
// by default. Removed cards exit immediately (no exit animation).

import { useMemo, useState } from "react";
import BlogCard, { type BlogCardData } from "./BlogCard";

interface BlogFilterGridProps {
  posts: BlogCardData[];
}

const PAGE_SIZE = 18;
const ALL = "All";

export default function BlogFilterGrid({ posts }: BlogFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  // Index from which cards should play the entrance animation. `null` until
  // the first interaction so the initial render ships zero animation.
  const [animateFrom, setAnimateFrom] = useState<number | null>(null);

  const categories = useMemo<string[]>(() => {
    const unique = Array.from(new Set(posts.map((p) => p.tag))).filter(Boolean);
    unique.sort((a, b) => a.localeCompare(b));
    return [ALL, ...unique];
  }, [posts]);

  const filtered = useMemo<BlogCardData[]>(() => {
    if (activeCategory === ALL) return posts;
    return posts.filter((p) => p.tag === activeCategory);
  }, [posts, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  function handleCategoryChange(cat: string): void {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setAnimateFrom(0);
  }

  function handleLoadMore(): void {
    setAnimateFrom(visibleCount);
    setVisibleCount((n) => n + PAGE_SIZE);
  }

  return (
    <div>
      {/* Category filter bar */}
      <div
        className="flex flex-wrap items-center gap-2.5"
        role="tablist"
        aria-label="Filter articles by category"
      >
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              data-active={active}
              onClick={() => handleCategoryChange(cat)}
              className="blog-chip inline-flex items-center rounded-full px-4 py-2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 500,
                background: active
                  ? "var(--color-green-deep)"
                  : "var(--color-canvas-alt)",
                color: active
                  ? "var(--color-canvas)"
                  : "var(--color-ink-secondary)",
                border: "1px solid",
                borderColor: active
                  ? "var(--color-green-deep)"
                  : "var(--color-grid)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p
        className="mt-6"
        aria-live="polite"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-ink-tertiary)",
        }}
      >
        {filtered.length}{" "}
        {filtered.length === 1 ? "article" : "articles"}
        {activeCategory !== ALL ? ` · ${activeCategory}` : ""}
      </p>

      {/* Grid — keyed by category so a filter change remounts (and re-animates)
          the full card set */}
      <div
        key={activeCategory}
        className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((post, index) => {
          const animate = animateFrom !== null && index >= animateFrom;
          return (
            <div
              key={post.slug}
              className={animate ? "bfg-card-in" : undefined}
              style={
                animate
                  ? {
                      // Stagger capped at 40ms/card × min(index, 8) to stay
                      // well under the 100ms/element budget.
                      animationDelay: `${(Math.min(index, 8) * 0.04).toFixed(2)}s`,
                    }
                  : undefined
              }
            >
              <BlogCard post={post} />
            </div>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p
          className="py-16 text-center"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: "var(--color-ink-tertiary)",
          }}
        >
          No articles in this category yet.
        </p>
      ) : null}

      {/* Load more */}
      {canLoadMore ? (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="blog-loadmore inline-flex items-center gap-3 rounded-full px-7 py-3.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "var(--color-ink)",
              background: "var(--color-canvas-alt)",
              border: "1px solid var(--color-grid)",
            }}
          >
            Load more
            <span aria-hidden>↓</span>
          </button>
        </div>
      ) : null}

      <style>{styles}</style>
    </div>
  );
}

// ─── Scoped animation styles ─────────────────────────────────────────────────
// CSS keyframe entrance replacing the previous AnimatePresence mount
// animation (0.6s expo, y 16 → 0). The global prefers-reduced-motion rule in
// globals.css collapses it to 0.01ms.
const styles = `
@keyframes bfgCardIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.bfg-card-in {
  animation: bfgCardIn 600ms var(--ease-expo) both;
}
@media (prefers-reduced-motion: reduce) {
  .bfg-card-in {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
  }
}
`;
