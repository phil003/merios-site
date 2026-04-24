"use client";

// Pagination strategy: client-side "Load more" (18 per batch). The server
// serializes only card-level fields (not the MDX body) so the initial HTML
// stays lean while SEO payload (JSON-LD ItemList + prefetched hrefs) remains
// complete.

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import BlogCard, { type BlogCardData } from "./BlogCard";
import { easing, duration } from "@/lib/motion";

interface BlogFilterGridProps {
  posts: BlogCardData[];
}

const PAGE_SIZE = 18;
const ALL = "All";

export default function BlogFilterGrid({ posts }: BlogFilterGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

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
  }

  function handleLoadMore(): void {
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

      {/* Grid */}
      <motion.div
        layout={!prefersReducedMotion}
        className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post, index) => (
            <motion.div
              key={post.slug}
              layout={!prefersReducedMotion}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16 }
              }
              animate={
                prefersReducedMotion
                  ? {
                      opacity: 1,
                      transition: {
                        duration: duration.quick,
                      },
                    }
                  : {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: duration.normal,
                        ease: easing.expo,
                        // Stagger capped at 40ms/card × min(index, 8) to stay
                        // well under the 100ms/element budget.
                        delay: Math.min(index, 8) * 0.04,
                      },
                    }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0, transition: { duration: duration.quick } }
                  : {
                      opacity: 0,
                      y: -8,
                      transition: {
                        duration: duration.quick,
                        ease: easing.smooth,
                      },
                    }
              }
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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
    </div>
  );
}
