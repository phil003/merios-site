import Link from "next/link";
import { getCompareSubject, type ComparePost } from "@/lib/compare";
import { keepHyphenated } from "@/components/blog/typeset";
import styles from "./compare.module.css";

interface CompareCardProps {
  post: ComparePost;
  /**
   * Position in the rendered list — picks the cover's plate so a grid reads
   * sky → lilac → zenith → peach. Falls back to a stable slug hash.
   */
  index?: number;
}

const TONES = ["lime", "lilac", "sky", "peach"] as const;
type Tone = (typeof TONES)[number];

function toneFor(slug: string, index?: number): Tone {
  if (typeof index === "number") return TONES[index % TONES.length];
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}

/** Long subjects ("WHOOP Advanced Labs vs Oura Health Panels") set smaller. */
function subjectLength(text: string): "short" | "long" {
  return text.length > 30 ? "long" : "short";
}

/**
 * Comparison card — Open Sky: a white card, and on its soft dawn plate the
 * page's real subject as a headline with its italic word: both sides of a
 * comparison ("Lingo *vs* Stelo") or the one product and the page's angle
 * ("Function Health *review*", "*cost*", "*alternatives*"). Topic chips only
 * when the page has its own (frontmatter `tags:`). Server component; the
 * hover lift lives in compare.module.css (reduced-motion safe).
 */
export default function CompareCard({ post, index }: CompareCardProps) {
  const subject = getCompareSubject(post);
  const label =
    subject.kind === "versus"
      ? `${subject.left} vs ${subject.right}`
      : `${subject.name} ${subject.angle}`;

  return (
    <Link href={`/compare/${post.slug}`} className={styles.card}>
      <div className={styles.cover} data-tone={toneFor(post.slug, index)}>
        <p
          className={styles.subject}
          data-len={subjectLength(label)}
          aria-hidden="true"
        >
          {subject.kind === "versus" ? (
            <>
              {subject.left} <em>vs</em>
              {" "}
              {subject.right}
            </>
          ) : (
            <>
              {subject.name}
              {subject.angle ? (
                <>
                  {" "}
                  <em>{subject.angle}</em>
                </>
              ) : null}
            </>
          )}
        </p>
      </div>

      <div className={styles.body}>
        {/* Title */}
        <h2 className={styles.title}>{keepHyphenated(post.title)}</h2>

        {/* Description */}
        <p className={styles.desc}>{keepHyphenated(post.description)}</p>

        {/* Tags: the page's own, if it has any */}
        {post.tags && post.tags.length > 0 ? (
          <ul className={styles.tags} aria-label="Comparison topics">
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

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
