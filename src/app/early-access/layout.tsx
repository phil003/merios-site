import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Early Access — Merios",
  description:
    "Merios is now on the US App Store and rolling out worldwide. Get in.",
  alternates: {
    canonical: "https://merios.life/early-access",
  },
  openGraph: {
    title: "Early Access — Merios",
    description:
      "Merios is now on the US App Store and rolling out worldwide. Get in.",
    url: "https://merios.life/early-access",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Early Access — Merios",
    description:
      "Merios is now on the US App Store and rolling out worldwide. Get in.",
  },
};

export default function EarlyAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
