import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

interface ArticleHeroProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  readTime: string;
  competitor: string;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleHero({
  title,
  description,
  datePublished,
  dateModified,
  readTime,
  competitor,
}: ArticleHeroProps) {
  const showUpdated =
    dateModified && dateModified !== datePublished ? dateModified : null;

  return (
    <header
      className="relative pt-32 pb-12 md:pt-40 md:pb-16"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="max-w-[880px]">
            {/* Breadcrumb — mono small */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex flex-wrap items-center gap-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <ol className="inline-flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
                    href="/compare"
                    className="rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--color-ink-tertiary)",
                      fontWeight: 500,
                    }}
                  >
                    Compare
                  </Link>
                </li>
                <li aria-hidden style={{ color: "var(--color-ink-tertiary)" }}>
                  /
                </li>
                <li
                  aria-current="page"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--color-green-deep)",
                    fontWeight: 500,
                  }}
                >
                  vs {competitor}
                </li>
              </ol>
            </nav>

            {/* Title */}
            <h1
              className="mt-8"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-display-m)",
                fontWeight: 300,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "var(--color-ink)",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              className="mt-7 max-w-[640px]"
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

            {/* Mono meta row */}
            <div
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-ink-tertiary)",
                fontWeight: 500,
              }}
            >
              <time dateTime={datePublished}>
                Published {formatDate(datePublished)}
              </time>
              {showUpdated ? (
                <>
                  <span aria-hidden>·</span>
                  <time dateTime={showUpdated}>
                    Updated {formatDate(showUpdated)}
                  </time>
                </>
              ) : null}
              <span aria-hidden>·</span>
              <span>{readTime}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
