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
 * cover tone follows its position so the grid reads lime → lilac → sky → peach.
 */
export default function CompareGrid({ posts }: CompareGridProps) {
  if (posts.length === 0) {
    return <p className={styles.empty}>Comparisons coming soon.</p>;
  }

  return (
    <div className={styles.grid}>
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
