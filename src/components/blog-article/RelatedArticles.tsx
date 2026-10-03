import type { CSSProperties } from "react";
import Link from "next/link";

import type { BlogPost } from "@/lib/blog";
import ArticleMeta from "@/components/ui/ArticleMeta";
import Reveal from "@/components/ui/Reveal";
import { CoverBackdrop } from "@/components/blog/ArticleCover";
import { getBlogToneHex } from "@/components/blog/gradients";
import styles from "./article.module.css";

interface RelatedArticlesProps {
  posts: BlogPost[];
}

function parseMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

/**
 * "Keep reading" grid — up to 3 related blog posts. Paper cards mirroring the
 * Journal index: an inset pop panel (the article's cover surface, text-free)
 * carrying its emoji, then tag, title, lead and meta.
 */
export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.container}>
        <Reveal>
          <div className={`label ${styles.relatedLabel}`}>
            <span aria-hidden className="label-dot label-dot--ink" />
            <span>Keep reading</span>
          </div>
          <h2 className={styles.relatedTitle}>More from the Journal</h2>
        </Reveal>

        <div className={styles.relatedGrid}>
          {posts.map((post) => (
            <RelatedArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedArticleCard({ post }: { post: BlogPost }) {
  const minutes = parseMinutes(post.readTime);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`blog-card group ${styles.relCard}`}
    >
      <div className={styles.relPanel}>
        <CoverBackdrop post={post} className={styles.relBackdrop} />
        <span aria-hidden className={styles.relEmoji}>
          {post.emoji}
        </span>
      </div>
      <div className={styles.relBody}>
        <div className={styles.relTag}>
          <span
            aria-hidden
            className="inline-block h-2 w-2 flex-none rounded-full"
            style={
              {
                background: getBlogToneHex(post.tag),
                boxShadow: "0 0 0 1.5px rgb(16 35 26 / 0.5)",
              } as CSSProperties
            }
          />
          <span>{post.tag}</span>
        </div>
        <h3 className={styles.relTitle}>{post.title}</h3>
        <p className={styles.relDesc}>{post.description}</p>
        <div className={styles.relMeta}>
          <div className={styles.relMetaRule}>
            <ArticleMeta date={post.date} readingTime={minutes} />
          </div>
        </div>
      </div>
    </Link>
  );
}
