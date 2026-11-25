import ArticleCover from "@/components/blog/ArticleCover";
import { getDrawnCover, type DrawnCover } from "@/lib/covers";
import styles from "./article.module.css";

/**
 * The wide drawn cover under the article masthead (Open Sky, V2 quinquies):
 * no photo, the subject itself — the Journal's own drawn cover
 * (<ArticleCover/>, data from getDrawnCover in src/lib/covers.ts), set wide
 * on the haze. The cover scales with its box (container units), so the
 * article hero, the Journal card and the related cards always match.
 *
 * The cover itself is decorative for assistive tech; this figure carries
 * the description (what the cover draws).
 */

interface ArticleHeroCoverProps {
  post: { slug: string; title: string; tag: string };
}

/** "Ferritin: 30 ng/mL, on its range. Iron status." — what the cover shows. */
export function describeCover(spec: DrawnCover): string {
  const main =
    spec.main.kind === "two"
      ? `${spec.main.left} ${spec.main.sep} ${spec.main.right}`
      : [spec.main.big, spec.main.unit].filter(Boolean).join(" ");
  const subject = main && main !== spec.kicker ? `${spec.kicker}: ${main}` : spec.kicker;
  const onRange = spec.band && spec.band.pins.length > 0 ? ", on its range" : "";
  const note = spec.note ? ` ${spec.note}.` : "";
  return `Cover illustration. ${subject}${onRange}.${note}`;
}

export default function ArticleHeroCover({ post }: ArticleHeroCoverProps) {
  const spec = getDrawnCover(post);
  return (
    <figure className={styles.cover} role="img" aria-label={describeCover(spec)}>
      <ArticleCover post={post} variant="wide" className={styles.coverArt} />
    </figure>
  );
}
