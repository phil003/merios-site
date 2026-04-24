"use client";

import Reveal from "./ui/Reveal";

type Article = {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  accent: string;
};

const ARTICLES: Article[] = [
  {
    slug: "hdl-ldl-ratio",
    category: "Lipids",
    title: "What your HDL/LDL ratio actually means.",
    date: "Mar 2026",
    readTime: "7 min",
    accent:
      "radial-gradient(130% 100% at 10% 90%, rgba(159,191,0,0.42), transparent 58%)",
  },
  {
    slug: "ferritin-paradox",
    category: "Minerals",
    title: "The ferritin paradox in trained athletes.",
    date: "Feb 2026",
    readTime: "9 min",
    accent:
      "radial-gradient(120% 100% at 90% 10%, rgba(196,136,47,0.55), transparent 60%)",
  },
  {
    slug: "why-we-built-merios",
    category: "Manifesto",
    title: "Why we built Merios.",
    date: "Jan 2026",
    readTime: "5 min",
    accent:
      "radial-gradient(140% 100% at 50% 100%, rgba(159,191,0,0.38), transparent 62%)",
  },
];

export default function BlogPreview() {
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
            {ARTICLES.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={`/blog/${article.slug}`}
      className="group block overflow-hidden rounded-2xl"
      style={{ background: "var(--color-canvas-alt)" }}
    >
      {/* thumb */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 3", background: "var(--color-green-deep)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
          style={{
            background: article.accent,
            transitionTimingFunction: "var(--ease-expo)",
          }}
        />
        <span
          className="absolute left-5 top-5 inline-flex items-center gap-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-canvas)",
          }}
        >
          <span
            aria-hidden
            className="inline-block h-1 w-1 rounded-full"
            style={{ background: "var(--color-pulse)" }}
          />
          {article.category}
        </span>
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
            {article.title}
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
          <span>{article.date}</span>
          <span
            aria-hidden
            className="inline-block h-px w-3"
            style={{ background: "var(--color-grid)" }}
          />
          <span>{article.readTime}</span>
        </div>
      </div>
    </a>
  );
}
