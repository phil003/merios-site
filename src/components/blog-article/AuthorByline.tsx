import Link from "next/link";

/**
 * Author byline rendered at the end of the article body.
 * Placeholder avatar (40px circle, grid background, Fraunces "M"), name,
 * a short mono bio line, and an E-E-A-T trust row linking to the scoring
 * methodology (/science) — YMLY content should always expose its editorial
 * standards one click away.
 */
export default function AuthorByline() {
  return (
    <div
      className="mt-14 flex items-center gap-4 pt-8"
      style={{ borderTop: "1px solid var(--color-grid)" }}
    >
      <span
        aria-hidden
        className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full"
        style={{
          background: "var(--color-grid)",
          color: "var(--color-green-deep)",
          fontFamily: "var(--font-serif)",
          fontSize: 20,
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        M
      </span>
      <div className="flex flex-col">
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 18,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "var(--color-ink)",
            lineHeight: 1.2,
          }}
        >
          Merios Editorial
        </span>
        <span
          className="mt-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-ink-tertiary)",
          }}
        >
          Editorially reviewed · Sources cited inline
        </span>
        <span
          className="mt-1.5"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "var(--color-ink-secondary)",
            letterSpacing: "-0.003em",
          }}
        >
          Research-backed health insights from the Merios team.{" "}
          <Link
            href="/science"
            style={{
              color: "var(--color-green-deep)",
              textDecoration: "underline",
              textDecorationThickness: 1,
              textUnderlineOffset: 3,
            }}
          >
            Read our methodology
          </Link>
        </span>
      </div>
    </div>
  );
}
