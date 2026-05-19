import { redirect } from "next/navigation";

// /pricing has been retired pre App-Store-launch (pricing model not
// finalised yet). The 308 permanent redirect lives in next.config.ts and
// preserves SEO equity for any external links that still reach this path.
// This file remains as a server-side guard in case the next.config redirect
// is bypassed (e.g. by an internal RSC fetch).
export default function PricingPage() {
  redirect("/early-access");
}
