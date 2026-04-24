import Reveal from "@/components/ui/Reveal";

interface ArticleVerdictProps {
  text: string;
}

/**
 * Editorial "Our take" box — dark editorial section at the end of the article.
 * Ink background, canvas text, Fraunces headline.
 */
export default function ArticleVerdict({ text }: ArticleVerdictProps) {
  return (
    <aside
      className="mt-20 rounded-2xl px-7 py-10 md:px-10 md:py-12"
      style={{
        background: "var(--color-ink)",
        color: "var(--color-canvas)",
      }}
    >
      <Reveal amount={0.3}>
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
              color: "var(--color-pulse)",
              fontWeight: 500,
            }}
          >
            Our take
          </span>
        </div>
        <p
          className="mt-5 max-w-[620px]"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
            fontWeight: 300,
            lineHeight: 1.35,
            letterSpacing: "-0.015em",
            color: "var(--color-canvas)",
          }}
        >
          {text}
        </p>
      </Reveal>
    </aside>
  );
}
