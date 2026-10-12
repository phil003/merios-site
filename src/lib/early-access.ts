// /early-access variants. Shared by src/middleware.ts (which picks one per
// request) and the prerendered routes under src/app/early-access/[variant].
// Kept free of React imports so the edge middleware can import it.

export const EARLY_ACCESS_VARIANTS = ["us", "rest"] as const;

/** Meta description (and WebPage JSON-LD description) for /early-access. */
export const EARLY_ACCESS_DESCRIPTION =
  "Merios is live on the US App Store for iPhone, free to start. Rolling out worldwide: join the waitlist for priority access or read our monthly newsletter.";

export type EarlyAccessVariant = (typeof EARLY_ACCESS_VARIANTS)[number];

export function isEarlyAccessVariant(value: string): value is EarlyAccessVariant {
  return (EARLY_ACCESS_VARIANTS as readonly string[]).includes(value);
}

/**
 * Anything other than "us" resolves to "rest", the rest-of-world variant —
 * the one bots and every non-US visitor get, and the safe default.
 */
export function toEarlyAccessVariant(
  value: string | null | undefined,
): EarlyAccessVariant {
  return value === "us" ? "us" : "rest";
}
