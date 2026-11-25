/**
 * Open Sky headline: the last words of an H1 are set in Newsreader italic
 * ("Ferritin 30 ng/mL: *Low Normal or Iron Deficient?*"). Presentation only:
 * `head + sep + tail` is exactly the original title, so the H1's text content
 * (what crawlers and screen readers read) never changes.
 *
 * Split, in order of preference: after the first ": ", after the first "? "
 * (a question followed by its answer), around " — ", else before the last two
 * words of a title of five words or more. Short titles stay roman.
 */
export interface TitleParts {
  head: string;
  /** Text between head and tail (usually a single space). */
  sep: string;
  tail: string | null;
}

export function splitTitle(title: string): TitleParts {
  for (const mark of [": ", "? "]) {
    const i = title.indexOf(mark);
    if (i > 0 && i + mark.length < title.length) {
      return { head: title.slice(0, i + 1), sep: " ", tail: title.slice(i + 2) };
    }
  }
  const dash = title.indexOf(" — ");
  if (dash > 0 && dash + 3 < title.length) {
    return { head: title.slice(0, dash), sep: " — ", tail: title.slice(dash + 3) };
  }
  const words = title.split(" ");
  if (words.length >= 5) {
    return {
      head: words.slice(0, -2).join(" "),
      sep: " ",
      tail: words.slice(-2).join(" "),
    };
  }
  return { head: title, sep: "", tail: null };
}

/** "Apr 30, 2026" from an ISO date ("2026-04-30"), read in UTC. */
export function formatShortDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
