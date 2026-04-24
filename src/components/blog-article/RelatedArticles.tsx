import Link from "next/link";

import type { BlogPost } from "@/lib/blog";
import ArticleMeta from "@/components/ui/ArticleMeta";
import Reveal from "@/components/ui/Reveal";
import { getBlogGradient } from "@/components/blog/gradients";

interface RelatedArticlesProps {
  posts: BlogPost[];
}

function parseMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

/**
 * "Keep reading" grid — up to 3 related blog posts. Local card, mirroring
 * the BlogCard visual (gradient panel + emoji + tag + title + meta) but kept
 * independent so Subagent A's /blog index card can evolve without coupling.
 */
export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section
      className="border-t"
      style={{
        background: "var(--color-canvas)",
        borderColor: "var(--color-grid)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <div
            className="inline-flex items-center gap-2.5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-pulse)" }}
            />
            <span
              style={{
                fontSize: 10.5,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-green-deep)",
                fontWeight: 500,
              }}
            >
              Keep reading
            </span>
          </div>
          <h2
            className="mt-5"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
            }}
          >
            More from the Journal
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <RelatedArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <style>{`
        .related-card {
          transition:
            transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 400ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .related-card:hover,
        .related-card:focus-visible {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--color-green-deep) 30%, var(--color-grid));
          box-shadow: 0 20px 40px -8px color-mix(in srgb, var(--color-ink) 22%, transparent);
        }
        .related-card:focus-visible {
          outline: 2px solid var(--color-green-deep);
          outline-offset: 3px;
        }
        .related-card .related-emoji {
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .related-card:hover .related-emoji,
        .related-card:focus-visible .related-emoji {
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .related-card,
          .related-card .related-emoji {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function RelatedArticleCard({ post }: { post: BlogPost }) {
  const gradient = getBlogGradient(post.tag);
  const minutes = parseMinutes(post.readTime);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="related-card group relative flex h-full flex-col overflow-hidden rounded-2xl"
      style={{
        background: "var(--color-canvas-alt)",
        border: "1px solid var(--color-grid)",
      }}
      aria-label={`Read article: ${post.title}`}
    >
      <div
        className={`flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
      >
        <span
          aria-hidden
          className="related-emoji block text-4xl"
          style={{
            filter:
              "drop-shadow(0 4px 14px color-mix(in srgb, var(--color-ink) 12%, transparent))",
          }}
        >
          {post.emoji}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div
          className="inline-flex items-center gap-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            style={{
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-green-deep)",
              fontWeight: 500,
            }}
          >
            {post.tag}
          </span>
        </div>
        <h3
          className="mt-3"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.125rem",
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
            color: "var(--color-ink)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </h3>
        <p
          className="mt-2.5"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            lineHeight: 1.55,
            color: "var(--color-ink-secondary)",
            letterSpacing: "-0.003em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.description}
        </p>
        <div className="flex-1" />
        <div
          className="mt-5 pt-4"
          style={{ borderTop: "1px solid var(--color-grid)" }}
        >
          <ArticleMeta date={post.date} readingTime={minutes} />
        </div>
      </div>
    </Link>
  );
}
