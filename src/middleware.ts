import { NextResponse, type NextRequest } from "next/server";
import { toEarlyAccessVariant, type EarlyAccessVariant } from "@/lib/early-access";

// Geo smart router for /early-access.
// US visitors land on the App Store variant; everyone else gets the waitlist
// + newsletter variant. Both variants are prerendered as static HTML at
// /early-access/us and /early-access/rest (src/app/early-access/[variant]),
// and this rewrite serves one of them at the same canonical URL, so SEO
// credit consolidates on /early-access. Googlebot (and other major crawlers)
// are forced onto the `rest` variant for global indexing.

export const config = {
  matcher: "/early-access",
};

const BOT_UA =
  /googlebot|bingbot|yandex|baiduspider|duckduckbot|applebot|slurp|facebot|linkedinbot|twitterbot/i;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Explicit override for debugging & for the two Playwright snapshots:
  // ?variant=us serves the US page, any other value the rest-of-world one.
  const override = url.searchParams.get("variant");

  let variant: EarlyAccessVariant;
  if (override !== null) {
    variant = toEarlyAccessVariant(override);
  } else {
    const ua = request.headers.get("user-agent") ?? "";
    const country = request.headers.get("x-vercel-ip-country") ?? "XX";
    variant = BOT_UA.test(ua) || country !== "US" ? "rest" : "us";
  }

  url.pathname = `/early-access/${variant}`;
  return NextResponse.rewrite(url);
}
