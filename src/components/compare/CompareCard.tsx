import Link from "next/link";
import type { ComparePost } from "@/lib/compare";
import styles from "./compare.module.css";

interface CompareCardProps {
  post: ComparePost;
  /**
   * Three short labels shown under the description. Kept generic so the card
   * stays consistent across every comparison — the MDX layer owns detail.
   */
  tags?: readonly [string, string, string];
  /**
   * Position in the rendered list — picks the cover's pop tone so a grid
   * reads lime → lilac → sky → peach. Falls back to a stable slug hash.
   */
  index?: number;
}

const DEFAULT_TAGS: readonly [string, string, string] = [
  "Biomarkers",
  "Pricing",
  "iOS",
];

const TONES = ["lime", "lilac", "sky", "peach"] as const;
type Tone = (typeof TONES)[number];

function toneFor(slug: string, index?: number): Tone {
  if (typeof index === "number") return TONES[index % TONES.length];
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}

/**
 * Comparison card — white v3 card with a pop cover. Server component; the
 * hover lift/shadow is the global `.blog-card` rule, the arrow nudge and the
 * cover dot live in compare.module.css. Every text node (eyebrow, title,
 * description, tags, read time, "Read comparison") is unchanged.
 */
export default function CompareCard({
  post,
  tags = DEFAULT_TAGS,
  index,
}: CompareCardProps) {
  return (
    <Link href={`/compare/${post.slug}`} className={`blog-card ${styles.card}`}>
      {/* vs {competitor} — the eyebrow, set as the cover's headline */}
      <div className={styles.cover} data-tone={toneFor(post.slug, index)}>
        <svg
          className={styles.coverArt}
          aria-hidden
          focusable="false"
          viewBox="0 0 230 64"
          preserveAspectRatio="xMaxYMid meet"
        >
          <path
            d="M0 32 H128 L136 38 L147 12 L160 54 L168 32 H210"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.42"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            className={styles.coverDot}
            cx="216"
            cy="32"
            r="5.5"
            fill="#FFFFFF"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
        </svg>
        <div className={styles.vs}>
          <span className={styles.vsWord}>vs</span>{" "}
          <span className={styles.vsName}>{post.competitor}</span>
        </div>
      </div>

      <div className={styles.body}>
        {/* Title */}
        <h2 className={styles.title}>{post.title}</h2>

        {/* Description */}
        <p className={styles.desc}>{post.description}</p>

        {/* Tags */}
        <ul className={styles.tags} aria-label="Comparison topics">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {/* Spacer to push CTA to bottom */}
        <div className={styles.spacer} />

        {/* Footer meta + CTA */}
        <div className={styles.foot}>
          <span className={styles.readTime}>{post.readTime}</span>
          <span className={styles.more}>
            Read comparison
            <span aria-hidden className={styles.arrow}>
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
