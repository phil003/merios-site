import type { CSSProperties } from "react";
import Link from "next/link";
import ArticleMeta from "@/components/ui/ArticleMeta";
import Reveal from "@/components/ui/Reveal";
import ArticleCover from "./ArticleCover";
import type { BlogCardData } from "./BlogCard";
import { getBlogToneHex } from "./gradients";
import styles from "./blog.module.css";

interface FeaturedCardProps {
  post: BlogCardData;
}

function parseReadingMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

/**
 * Latest article, set large: inset cover on the left (wide variant on mobile,
 * tall crop-safe variant on desktop), display title + lead on the right.
 */
export default function FeaturedCard({ post }: FeaturedCardProps) {
  const minutes = parseReadingMinutes(post.readTime);

  return (
    <section
      aria-label="Featured article"
      className={`relative ${styles.featuredSection}`}
      style={{ background: "var(--color-canvas)" }}
    >
      <div className={styles.container}>
        <Reveal amount={0.15}>
          {/* Mono eyebrow for the featured section */}
          <div className={`label ${styles.eyebrow}`}>
            <span aria-hidden className="label-dot label-dot--ink" />
            <span>Latest dispatch</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className={`featured-card group ${styles.featured}`}
          >
            {/* Cover panel — wide variant while the card is stacked (exact
                3:2 fit), tall crop-safe variant in the desktop column */}
            <div className={styles.featuredCover}>
              <div className={`absolute inset-0 ${styles.featuredArt}`}>
                <ArticleCover
                  post={post}
                  className="block h-full w-full lg:hidden"
                />
                <ArticleCover
                  post={post}
                  variant="tall"
                  className="absolute inset-0 hidden h-full w-full lg:block"
                />
              </div>
            </div>

            {/* Content */}
            <div className={styles.featuredBody}>
              <div className={styles.tag}>
                <span
                  aria-hidden
                  className={styles.tagDot}
                  style={{ "--tone": getBlogToneHex(post.tag) } as CSSProperties}
                />
                <span>{post.tag}</span>
              </div>

              <h2 className={styles.featuredTitle}>{post.title}</h2>

              <p className={styles.featuredDesc}>{post.description}</p>

              <div className={styles.featuredMeta}>
                <ArticleMeta
                  date={post.date}
                  readingTime={minutes}
                  category={post.tag}
                />
              </div>

              <span className={`btn btn-ink ${styles.featuredCta}`}>
                Read article
                <span
                  aria-hidden
                  className={`featured-card-arrow ${styles.featuredArrow}`}
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
