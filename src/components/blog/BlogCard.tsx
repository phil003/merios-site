import Link from "next/link";
import ArticleMeta from "@/components/ui/ArticleMeta";
import ArticleCover from "./ArticleCover";

export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  emoji: string;
  readTime: string;
}

interface BlogCardProps {
  post: BlogCardData;
}

function parseReadingMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

export default function BlogCard({ post }: BlogCardProps) {
  const minutes = parseReadingMinutes(post.readTime);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card group relative flex h-full flex-col overflow-hidden rounded-2xl"
      style={{
        background: "var(--color-canvas-alt)",
        border: "1px solid var(--color-grid)",
      }}
    >
      {/* Generative cover — 3:2 matches the SVG viewBox exactly */}
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <ArticleCover post={post} className="block h-full w-full" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-7">
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
