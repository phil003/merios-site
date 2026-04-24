import CompareCard from "@/components/compare/CompareCard";
import Reveal from "@/components/ui/Reveal";
import type { ComparePost } from "@/lib/compare";

interface RelatedComparisonsProps {
  posts: ComparePost[];
}

/**
 * "More comparisons" — up to 3 related compare posts rendered with the shared
 * CompareCard. Rendered below the article, before the final CTA.
 */
export default function RelatedComparisons({
  posts,
}: RelatedComparisonsProps) {
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
          <div className="flex items-end justify-between gap-6">
            <div>
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
                  More comparisons
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
                Keep exploring
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <CompareCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
