import CompareCard from "@/components/compare/CompareCard";
import Reveal from "@/components/ui/Reveal";
import type { ComparePost } from "@/lib/compare";
import styles from "./compareArticle.module.css";

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
    <section className={styles.related}>
      <div className={styles.wrap}>
        <Reveal>
          <div className={styles.sectionHead}>
            <div className={`label ${styles.sectionLabel}`}>
              <span aria-hidden className="label-dot label-dot--ink" />
              <span>More comparisons</span>
            </div>
            <h2 className={styles.sectionTitle}>Keep exploring</h2>
          </div>
        </Reveal>

        <div className={styles.relatedGrid}>
          {posts.map((post, i) => (
            <CompareCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
