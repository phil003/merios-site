import EarlyAccessPage from "@/components/early-access/EarlyAccessPage";

// /early-access: one static page for every country and every crawler, the
// App Store page. The old geo variants (/early-access/us, /early-access/rest)
// are permanent redirects to this URL, see next.config.ts.
export default function EarlyAccessRoute() {
  return <EarlyAccessPage />;
}
