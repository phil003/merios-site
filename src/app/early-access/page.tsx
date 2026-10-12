import EarlyAccessPage from "@/components/early-access/EarlyAccessPage";

// Fallback only. Every request for /early-access goes through
// src/middleware.ts, which rewrites it to the prerendered /early-access/us or
// /early-access/rest (see ./[variant]/page.tsx), so this page is not served in
// normal operation. It keeps /early-access answering — with the
// rest-of-world variant, the one crawlers get — if the middleware ever does
// not run. Static, like the variants.
export default function EarlyAccessFallbackPage() {
  return <EarlyAccessPage variant="rest" />;
}
