import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ArticleMeta from "@/components/ui/ArticleMeta";

interface ArticleHeroProps {
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  readingMinutes: number;
  category: string;
  slug: string;
  image?: string;
}

/**
 * Editorial hero for the /blog/[slug] article.
 *
 * - Top-level breadcrumb (Home / Blog / [Title])
 * - Category eyebrow (pulse dot + mono uppercase, same spec as PageHero)
 * - Fraunces title (weight 300, -0.03em, line-height 1.02)
 * - Sans subline (Inter Tight, clamp 17 → 19px, line-height 1.6)
 * - ArticleMeta row (date · reading · category · author)
 * - Optional featured image (rounded-xl, 1200 × 675 target)
 *
 * Staggered fade-up via <Reveal delay={...}>.
 */
export default function ArticleHero({
  title,
  description,
  date,
  dateModified,
  readingMinutes,
  category,
  slug,
  image,
}: ArticleHeroProps) {
  return (
    <header
      className="relative pt-28 pb-12 md:pt-32 md:pb-16"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex flex-wrap items-center gap-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ol className="inline-flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="breadcrumb-link rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                }}
              >
                Home
              </Link>
            </li>
            <li aria-hidden style={{ color: "var(--color-ink-tertiary)" }}>
              /
            </li>
            <li>
              <Link
                href="/blog"
                className="breadcrumb-link rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                }}
              >
                Blog
              </Link>
            </li>
            <li aria-hidden style={{ color: "var(--color-ink-tertiary)" }}>
              /
            </li>
            <li
              aria-current="page"
              className="max-w-[240px] truncate"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-green-deep)",
                fontWeight: 500,
              }}
            >
              {title}
            </li>
          </ol>
        </nav>

        {/* Content stack */}
        <div className="mt-10 max-w-[900px]">
          <Reveal delay={0}>
            {/* Category chip (pulse dot + mono caps) */}
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
                {category}
              </span>
            </div>

            <h1
              className="mt-7"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--color-ink)",
              }}
            >
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className="mt-7 max-w-[720px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.0625rem, 1.2vw, 1.1875rem)",
                lineHeight: 1.6,
                color: "var(--color-ink-secondary)",
                letterSpacing: "-0.005em",
              }}
            >
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div
              className="mt-8 pt-7 border-t"
              style={{ borderColor: "var(--color-grid)" }}
            >
              <ArticleMeta
                date={dateModified && dateModified !== date ? dateModified : date}
                readingTime={readingMinutes}
                category={category}
                author="Merios Editorial"
              />
            </div>
          </Reveal>
        </div>

        {/* Featured image */}
        {image ? (
          <Reveal delay={0.4}>
            <figure
              className="mt-12 overflow-hidden rounded-xl"
              style={{
                border: "1px solid var(--color-grid)",
                background: "var(--color-canvas-alt)",
              }}
            >
              <Image
                src={image}
                alt={title}
                width={1200}
                height={675}
                priority={false}
                sizes="(min-width: 1200px) 1200px, 100vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </figure>
          </Reveal>
        ) : null}
      </div>

      <style>{`
        .breadcrumb-link:hover {
          color: var(--color-green-deep) !important;
        }
      `}</style>
    </header>
  );
}
