"use client";

// The journal's interactive part (Open Sky, mockup Journal.dc.html): the dawn
// masthead with its topic filter, the featured card, and the grid.
//
// - The masthead copy and the featured card are server-rendered and passed in
//   as slots, so the H1 and the featured article are plain server HTML.
// - Topics are the category hubs (src/lib/blog-categories.ts), each with its
//   article count. Under "All", the newest article is the featured card and
//   the grid holds the rest; under a topic, the featured card steps aside and
//   the grid holds every article of that topic, right under the filter.
// - Pagination: client-side "Load more" (24 per batch, full rows in 2, 3 or 4
//   columns). The full journal stays crawlable through ArticleIndex and the
//   JSON-LD ItemList on the page.
// - Motion: nothing animates on first load (the server HTML is visible as
//   is). A filter change replays a short entrance on the grid; "Load more"
//   animates the new batch only; 40ms stagger, capped. Reduced motion: none.
// - Phones: the topic filter is one row that scrolls sideways (no 4-row
//   block of pills); a fade on the side that hides more pills is the cue.

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import BlogCard, { type BlogCardData } from "./BlogCard";
import { withItalicEnd } from "./JournalMasthead";
import styles from "./blog.module.css";

type Overflow = "none" | "start" | "middle" | "end";

/** Which side of a sideways-scrolling row still hides content. */
function readOverflow(el: HTMLElement): Overflow {
  const max = el.scrollWidth - el.clientWidth;
  if (max <= 2) return "none";
  if (el.scrollLeft <= 2) return "start";
  if (el.scrollLeft >= max - 2) return "end";
  return "middle";
}

export interface JournalTopic {
  slug: string;
  title: string;
  tags: readonly string[];
}

interface BlogFilterGridProps {
  /** Every listed article, newest first; the first one is the featured card. */
  posts: BlogCardData[];
  topics: JournalTopic[];
  /** Server-rendered masthead copy (eyebrow, H1, lead). */
  masthead: ReactNode;
  /** Server-rendered featured card for posts[0], shown under "All". */
  featured?: ReactNode;
}

const PAGE_SIZE = 24;
const ALL = "all";
const GRID_ID = "journal-grid";

export default function BlogFilterGrid({
  posts,
  topics,
  masthead,
  featured,
}: BlogFilterGridProps) {
  const [active, setActive] = useState<string>(ALL);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  // Index from which cards play the entrance; null until the first
  // interaction, so the first render ships no animation at all.
  const [animateFrom, setAnimateFrom] = useState<number | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const focusFrom = useRef<number | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [chipsOverflow, setChipsOverflow] = useState<Overflow>("none");

  // The filter row scrolls sideways on phones: track which edge hides pills.
  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    const update = () => setChipsOverflow(readOverflow(el));
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const hasFeatured = Boolean(featured) && posts.length > 0;
  const topic = topics.find((t) => t.slug === active) ?? null;

  const counts = useMemo<Record<string, number>>(() => {
    const out: Record<string, number> = {};
    for (const t of topics) {
      out[t.slug] = posts.filter((p) => t.tags.includes(p.tag)).length;
    }
    return out;
  }, [posts, topics]);

  const list = useMemo<BlogCardData[]>(() => {
    if (!topic) return hasFeatured ? posts.slice(1) : posts;
    return posts.filter((p) => topic.tags.includes(p.tag));
  }, [posts, topic, hasFeatured]);

  const shown = topic ? list.length : posts.length;
  const visible = list.slice(0, visibleCount);
  const canLoadMore = visibleCount < list.length;

  // After "Load more", move keyboard focus to the first new card (the button
  // may disappear with the last batch).
  useEffect(() => {
    const from = focusFrom.current;
    if (from === null) return;
    focusFrom.current = null;
    const link = gridRef.current?.querySelectorAll<HTMLAnchorElement>("a")[from];
    link?.focus();
  }, [visibleCount]);

  function pick(slug: string): void {
    if (slug === active) return;
    setActive(slug);
    setVisibleCount(PAGE_SIZE);
    setAnimateFrom(0);
  }

  function loadMore(): void {
    focusFrom.current = visibleCount;
    setAnimateFrom(visibleCount);
    setVisibleCount((n) => n + PAGE_SIZE);
  }

  return (
    <>
      <header className={styles.masthead}>
        <div className={styles.container}>
          {masthead}
          <div
            ref={chipsRef}
            role="group"
            aria-label="Filter articles by topic"
            className={`he ${styles.chips}`}
            data-overflow={chipsOverflow}
            style={{ "--he-d": "0.16s" } as CSSProperties}
          >
            <TopicChip
              label="All"
              count={posts.length}
              pressed={!topic}
              onPick={() => pick(ALL)}
            />
            {topics.map((t) => (
              <TopicChip
                key={t.slug}
                label={t.title}
                count={counts[t.slug] ?? 0}
                pressed={active === t.slug}
                onPick={() => pick(t.slug)}
              />
            ))}
          </div>
        </div>
      </header>

      {!topic && hasFeatured ? featured : null}

      <section aria-labelledby="journal-grid-title" className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.gridHead}>
            <div className={styles.gridHeadCopy}>
              <p className={`label ${styles.gridEyebrow}`}>
                <span aria-hidden className="label-dot" />
                <span>Newest first</span>
              </p>
              <h2 id="journal-grid-title" className={styles.gridTitle}>
                {topic ? (
                  withItalicEnd(topic.title)
                ) : (
                  <>
                    All <em>articles</em>
                  </>
                )}
              </h2>
            </div>
            <p className={styles.gridCount} aria-live="polite">
              <span className={styles.gridCountNum}>{shown}</span>{" "}
              {shown === 1 ? "article" : "articles"}
            </p>
          </div>

          {/* Keyed by topic: a filter change remounts (and re-animates) the set */}
          <ul key={active} id={GRID_ID} ref={gridRef} className={styles.grid}>
            {visible.map((post, index) => {
              const animate = animateFrom !== null && index >= animateFrom;
              return (
                <li
                  key={post.slug}
                  className={animate ? styles.cardIn : undefined}
                  style={
                    animate && animateFrom !== null
                      ? { animationDelay: `${Math.min(index - animateFrom, 8) * 40}ms` }
                      : undefined
                  }
                >
                  <BlogCard post={post} />
                </li>
              );
            })}
          </ul>

          {list.length === 0 ? (
            <p className={styles.empty}>No articles in this category yet.</p>
          ) : null}

          {canLoadMore ? (
            <div className={styles.loadMoreRow}>
              <button type="button" onClick={loadMore} className={styles.loadMore}>
                Load more
                <span aria-hidden>↓</span>
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function TopicChip({
  label,
  count,
  pressed,
  onPick,
}: {
  label: string;
  count: number;
  pressed: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.chip}
      aria-pressed={pressed}
      aria-controls={GRID_ID}
      onClick={onPick}
    >
      {label}
      <span className={styles.chipCount}>
        {count}
        <span className="sr-only">{count === 1 ? " article" : " articles"}</span>
      </span>
    </button>
  );
}
