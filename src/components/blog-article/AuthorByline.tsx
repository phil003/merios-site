import Link from "next/link";
import styles from "./article.module.css";

/**
 * Author byline rendered at the end of the article body — a paper card with a
 * night monogram (Newsreader "M", lime dot like the logo), name, a short mono
 * line, and an E-E-A-T trust row linking to the scoring methodology
 * (/science) — YMYL content should always expose its editorial standards one
 * click away.
 */
export default function AuthorByline() {
  return (
    <div className={styles.byline}>
      <span aria-hidden className={styles.avatar}>
        M
      </span>
      <div className="flex min-w-0 flex-col">
        <span className={styles.bylineName}>Merios Editorial</span>
        <span className={styles.bylineMeta}>
          Editorially reviewed · Sources cited inline
        </span>
        <span className={styles.bylineBio}>
          Research-backed health insights from the Merios team.{" "}
          <Link href="/science">Read our methodology</Link>
        </span>
      </div>
    </div>
  );
}
