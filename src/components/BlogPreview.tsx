import Reveal from "./ui/Reveal";
import ArticleCover from "./blog/ArticleCover";
import { getAllPosts, type BlogPost } from "@/lib/blog";

/**
 * Home « Journal » section — server component.
 *
 * Previously a hardcoded trio of placeholder articles left over from the
 * redesign mockups (their slugs 404'd). Now pulls the three most recent
 * real posts at build time and renders generative covers (ArticleCover),
 * so the section updates itself with every publish.
 */

function formatMonth(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function shortReadTime(rt: string): string {
  return rt.replace(/\s*read\s*$/i, "");
}

export default function BlogPreview() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <section
      id="journal"
      className="relative py-24 md:py-32"
      style={{ background: "var(--color-canvas)" }}
      aria-label="Merios Journal"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-[680px]">
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
                className="text-[10.5px] uppercase"
                style={{
                  color: "var(--color-green-deep)",
                  letterSpacing: "0.22em",
                  fontWeight: 500,
                }}
              >
                Journal
              </span>
            </div>

            <h2
              className="mt-6"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-display-m)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
              }}
            >
              Essays on the body,
              <br />
              written for grown-ups.
            </h2>
          </div>

          <a
            href="/blog"
            className="group inline-flex items-center gap-2 self-start transition-colors md:self-end"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-green-deep)",
              fontWeight: 500,
            }}
          >
            <span>All articles</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <Reveal staggerChildren={0.1} amount={0.15}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
            {latest.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl"
      style={{ background: "var(--color-canvas-alt)" }}
    >
      {/* thumb — generative cover, 3:2 (matches the SVG viewBox: no crop) */}
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "var(--ease-expo)" }}
        >
          <ArticleCover post={post} className="block h-full w-full" />
        </div>
      </div>

      {/* body */}
      <div className="p-6 md:p-7">
        <h3
          className="group-hover:[&>span]:bg-[length:100%_1px]"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            color: "var(--color-ink)",
          }}
        >
          <span
            className="bg-gradient-to-r from-[var(--color-ink)] to-[var(--color-ink)] bg-[length:0%_1px] bg-[position:0_92%] bg-no-repeat transition-[background-size] duration-500"
            style={{ transitionTimingFunction: "var(--ease-expo)" }}
          >
            {post.title}
          </span>
        </h3>

        <div
          className="mt-5 flex items-center gap-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "var(--color-ink-tertiary)",
          }}
        >
          <span>{formatMonth(post.date)}</span>
          <span
            aria-hidden
            className="inline-block h-px w-3"
            style={{ background: "var(--color-grid)" }}
          />
          <span>{shortReadTime(post.readTime)}</span>
        </div>
      </div>
    </a>
  );
}
