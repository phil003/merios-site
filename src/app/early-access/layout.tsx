import type { Metadata } from "next";
import { EARLY_ACCESS_DESCRIPTION } from "@/lib/early-access";

// Metadata for /early-access, shared by both prerendered variants
// (./[variant]/page.tsx) so each declares the same canonical URL.
// og:image comes from ./opengraph-image.tsx (a branded card).
export const metadata: Metadata = {
  // Already names the brand: absolute, so the layout template does not
  // append a second "| Merios".
  title: { absolute: "Early Access — Merios" },
  description: EARLY_ACCESS_DESCRIPTION,
  alternates: {
    canonical: "https://merios.life/early-access",
  },
  openGraph: {
    title: "Early Access — Merios",
    description: EARLY_ACCESS_DESCRIPTION,
    url: "https://merios.life/early-access",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Early Access — Merios",
    description: EARLY_ACCESS_DESCRIPTION,
  },
};

export default function EarlyAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
