import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Early Access to Merios — Join the Waitlist",
  description:
    "Join the Merios waitlist for early access to the health score app that analyzes blood tests, syncs Apple Health, and calculates your biological age. Be the first to try it.",
  alternates: {
    canonical: "https://merios.life/early-access",
  },
  openGraph: {
    title: "Get Early Access to Merios — Join the Waitlist",
    description:
      "Join the Merios waitlist for early access to the health score app that analyzes blood tests, syncs Apple Health, and calculates your biological age.",
    url: "https://merios.life/early-access",
    type: "website",
  },
};

export default function EarlyAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
