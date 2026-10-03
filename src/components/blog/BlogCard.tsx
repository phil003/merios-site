import type { CSSProperties } from "react";
import Link from "next/link";
import ArticleMeta from "@/components/ui/ArticleMeta";
import ArticleCover from "./ArticleCover";
import { getBlogToneHex } from "./gradients";
import styles from "./blog.module.css";

export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  emoji: string;
  readTime: string;
}

interface BlogCardProps {
  post: BlogCardData;
}

function parseReadingMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

/**
 * Journal card — white paper with the generative cover inset (pop surface or
 * night gauge), mono topic label, Bricolage title, mono meta.
 */
export default function BlogCard({ post }: BlogCardProps) {
  const minutes = parseReadingMinutes(post.readTime);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`blog-card group ${styles.card}`}
    >
      {/* Generative cover — 3:2 matches the SVG viewBox exactly */}
      <div className={styles.cover}>
        <ArticleCover post={post} className={styles.coverArt} />
      </div>

      {/* Content */}
      <div className={styles.body}>
        <div className={styles.tag}>
          <span
            aria-hidden
            className={styles.tagDot}
            style={{ "--tone": getBlogToneHex(post.tag) } as CSSProperties}
          />
          <span>{post.tag}</span>
        </div>

        <h3 className={styles.title}>{post.title}</h3>

        <p className={styles.desc}>{post.description}</p>

        <div className={styles.meta}>
          <div className={styles.metaRule}>
            <ArticleMeta date={post.date} readingTime={minutes} />
          </div>
        </div>
      </div>
    </Link>
  );
}
