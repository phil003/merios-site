import type { ComparePost } from "@/lib/compare";
import Reveal from "@/components/ui/Reveal";
import CompareCard from "./CompareCard";

interface CompareGridProps {
  posts: ComparePost[];
}

/**
 * Compare index grid. Cards fade/slide in as they enter the viewport with a
 * light per-card stagger (0.06s). Uses the Motion-based <Reveal> primitive
 * (viewport-triggered, reduced-motion aware) to keep the /compare route's JS
 * footprint low on the index page.
 */
export default function CompareGrid({ posts }: CompareGridProps) {
  if (posts.length === 0) {
    return (
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          color: "var(--color-ink-tertiary)",
        }}
      >
        Comparisons coming soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal
          key={post.slug}
          delay={i * 0.06}
          amount={0.15}
          className="h-full"
        >
          <CompareCard post={post} />
        </Reveal>
      ))}
    </div>
  );
}
