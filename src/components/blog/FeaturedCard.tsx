import Link from "next/link";
import ArticleMeta from "@/components/ui/ArticleMeta";
import Reveal from "@/components/ui/Reveal";
import { getBlogGradient } from "./gradients";
import type { BlogCardData } from "./BlogCard";

interface FeaturedCardProps {
  post: BlogCardData;
}

function parseReadingMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

export default function FeaturedCard({ post }: FeaturedCardProps) {
  const gradient = getBlogGradient(post.tag);
  const minutes = parseReadingMinutes(post.readTime);

  return (
    <section
      aria-label="Featured article"
      className="relative"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal amount={0.15}>
          {/* Mono eyebrow for the featured section */}
          <div
            className="mb-6 inline-flex items-center gap-2.5"
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
              Latest dispatch
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="featured-card group relative grid grid-cols-1 overflow-hidden rounded-[20px] md:grid-cols-12"
            style={{
              background: "var(--color-canvas-alt)",
              border: "1px solid var(--color-grid)",
            }}
            aria-label={`Read article: ${post.title}`}
          >
            {/* Left gradient panel */}
            <div
              className={`relative flex min-h-[260px] items-center justify-center overflow-hidden bg-gradient-to-br md:col-span-5 md:min-h-[420px] lg:col-span-4 ${gradient}`}
            >
              <span
                aria-hidden
                className="featured-card-emoji block text-[96px] leading-none md:text-[120px]"
                style={{
                  filter:
                    "drop-shadow(0 8px 24px color-mix(in srgb, var(--color-ink) 18%, transparent))",
                }}
              >
                {post.emoji}
              </span>
              {/* Subtle inner border */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  borderRight: "1px solid var(--color-grid)",
                }}
              />
            </div>

            {/* Right content */}
            <div className="flex flex-col justify-center p-7 md:col-span-7 md:p-10 lg:col-span-8 lg:p-12">
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

              <h2
                className="mt-5"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3.2vw, 3rem)",
                  fontWeight: 300,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: "var(--color-ink)",
                }}
              >
                {post.title}
              </h2>

              <p
                className="mt-5 max-w-[56ch]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.0625rem, 1.2vw, 1.1875rem)",
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                  letterSpacing: "-0.005em",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.description}
              </p>

              <div className="mt-7">
                <ArticleMeta
                  date={post.date}
                  readingTime={minutes}
                  category={post.tag}
                />
              </div>

              <span
                className="mt-8 inline-flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "var(--color-green-deep)",
                  letterSpacing: "-0.005em",
                }}
              >
                Read article
                <span
                  aria-hidden
                  className="featured-card-arrow inline-block"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
