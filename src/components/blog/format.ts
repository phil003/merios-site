/**
 * "Nov 16, 2026" from a frontmatter date ("2026-11-16"). Formatted in UTC so
 * the server HTML and the client render (the journal grid is a client
 * component) always print the same day, whatever the reader's time zone.
 */
export function formatPostDate(input: string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
