import type { ComparePost } from "@/lib/compare";
import Reveal from "@/components/ui/Reveal";
import CompareCard from "./CompareCard";
import styles from "./compare.module.css";

interface CompareGridProps {
  posts: ComparePost[];
}

/**
 * Compare index grid. Cards fade/slide in as they enter the viewport with a
 * light per-card stagger (0.06s) via <Reveal> (CSS + inline
 * IntersectionObserver, zero bundle JS, reduced-motion aware). Each card's
 * dawn plate follows its position so the grid reads sky → lilac → zenith →
 * peach (Open Sky).
 *
 * Rows are always full: when the count does not divide by the columns (2 on
 * tablets, 3 on desktop), the newest comparison spans the columns left
 * over (data-lead2 / data-lead3, read by compare.module.css).
 */
export default function CompareGrid({ posts }: CompareGridProps) {
  if (posts.length === 0) {
    return <p className={styles.empty}>Comparisons coming soon.</p>;
  }

  const n = posts.length;
  // 3 columns: n % 3 === 2 → the first card spans 2; === 1 → the whole row.
  const lead3 = n % 3 === 2 ? "2" : n % 3 === 1 && n > 1 ? "3" : undefined;
  // 2 columns: an odd count → the first card spans the row.
  const lead2 = n % 2 === 1 && n > 1 ? "2" : undefined;

  return (
    <div className={styles.grid} data-lead3={lead3} data-lead2={lead2}>
      {posts.map((post, i) => (
        <Reveal
          key={post.slug}
          delay={i * 0.06}
          amount={0.15}
          className="h-full"
        >
          <CompareCard post={post} index={i} />
        </Reveal>
      ))}
    </div>
  );
}
