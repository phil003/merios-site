import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import ArticleMeta from "@/components/ui/ArticleMeta";
import { getBlogGradient } from "./gradients";

interface BlogCardProps {
  post: BlogPost;
}

const CARD_STYLES = `
.blog-card {
  transition:
    transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 400ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}
.blog-card:hover,
.blog-card:focus-visible {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--color-green-deep) 30%, var(--color-grid));
  box-shadow: 0 20px 40px -8px color-mix(in srgb, var(--color-ink) 22%, transparent);
}
.blog-card:focus-visible {
  outline: 2px solid var(--color-green-deep);
  outline-offset: 3px;
}
.blog-card .blog-card-emoji {
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.blog-card:hover .blog-card-emoji,
.blog-card:focus-visible .blog-card-emoji {
  transform: scale(1.04);
}
@media (prefers-reduced-motion: reduce) {
  .blog-card,
  .blog-card .blog-card-emoji {
    transition: none !important;
    transform: none !important;
  }
  .blog-card:hover,
  .blog-card:focus-visible {
    transform: none !important;
  }
}
`;

function parseReadingMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

export default function BlogCard({ post }: BlogCardProps) {
  const gradient = getBlogGradient(post.tag);
  const minutes = parseReadingMinutes(post.readTime);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CARD_STYLES }} />
      <Link
        href={`/blog/${post.slug}`}
        className="blog-card group relative flex h-full flex-col overflow-hidden rounded-2xl"
        style={{
          background: "var(--color-canvas-alt)",
          border: "1px solid var(--color-grid)",
        }}
        aria-label={`Read article: ${post.title}`}
      >
        {/* Gradient panel */}
        <div
          className={`flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
        >
          <span
            aria-hidden
            className="blog-card-emoji block text-4xl"
            style={{
              filter:
                "drop-shadow(0 4px 14px color-mix(in srgb, var(--color-ink) 12%, transparent))",
            }}
          >
            {post.emoji}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-7">
          {/* Tag */}
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

          {/* Title */}
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

          {/* Description */}
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

          {/* Spacer */}
          <div className="flex-1" />

          {/* Meta */}
          <div
            className="mt-5 pt-4"
            style={{ borderTop: "1px solid var(--color-grid)" }}
          >
            <ArticleMeta date={post.date} readingTime={minutes} />
          </div>
        </div>
      </Link>
    </>
  );
}
