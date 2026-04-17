import { NextResponse, type NextRequest } from "next/server";

// Geo smart router for /early-access.
// US visitors land on the App Store variant; everyone else gets the waitlist
// + newsletter variant. Both variants render at the same canonical URL so
// SEO credit consolidates on /early-access. Googlebot (and other major
// crawlers) are forced onto the `rest` variant for global indexing.

export const config = {
  matcher: "/early-access",
};

const BOT_UA =
  /googlebot|bingbot|yandex|baiduspider|duckduckbot|applebot|slurp|facebot|linkedinbot|twitterbot/i;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Allow explicit override for debugging & for the two Playwright snapshots.
  if (url.searchParams.has("variant")) {
    return NextResponse.next();
  }

  const ua = request.headers.get("user-agent") ?? "";
  const country = request.headers.get("x-vercel-ip-country") ?? "XX";

  const variant = BOT_UA.test(ua) || country !== "US" ? "rest" : "us";

  url.searchParams.set("variant", variant);
  return NextResponse.rewrite(url);
}
