import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://merios.life"),
  title: "Merios — Understand Your Body. Act on Your Health.",
  description:
    "Merios transforms blood tests, Apple Health data, and daily check-ins into one clear health score with personalized action plans. Understand your biomarkers. Track your health systems. Take control.",
  keywords: ["health analytics", "biomarkers", "blood test analysis", "Apple Health", "health score", "wellness", "health app", "biological age", "health tracking"],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://merios.life",
  },
  openGraph: {
    title: "Merios — Understand Your Body. Act on Your Health.",
    description:
      "Transform blood tests, Apple Health data, and daily check-ins into one unified health score with actionable insights.",
    url: "https://merios.life",
    siteName: "Merios",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merios — Understand Your Body. Act on Your Health.",
    description:
      "Transform blood tests, Apple Health data, and daily check-ins into one unified health score with actionable insights.",
  },
  verification: {
    google: "55YlC0T47ZzU-V0k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
