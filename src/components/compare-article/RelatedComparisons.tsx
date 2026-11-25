import CompareCard from "@/components/compare/CompareCard";
import Reveal from "@/components/ui/Reveal";
import type { ComparePost } from "@/lib/compare";
import a from "@/components/blog-article/article.module.css";

interface RelatedComparisonsProps {
  posts: ComparePost[];
}

/**
 * "More comparisons" — up to 3 related compare posts rendered with the shared
 * CompareCard, under the article template's "keep reading" head. Rendered
 * below the article, before the final CTA.
 */
export default function RelatedComparisons({
  posts,
}: RelatedComparisonsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={a.related} aria-labelledby="related-compare-title">
      <div className={a.container}>
        <Reveal>
          <div className={a.relatedHead}>
            <div className={`label ${a.relatedLabel}`}>
              <span aria-hidden className="label-dot" />
              <span>More comparisons</span>
            </div>
            <h2 id="related-compare-title" className={a.relatedTitle}>
              Keep exploring
            </h2>
          </div>
        </Reveal>

        <div className={a.relatedGrid}>
          {posts.map((post, i) => (
            <CompareCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
