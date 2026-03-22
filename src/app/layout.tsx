import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merios — Comprends ton corps. Agis pour ta santé.",
  description:
    "Merios transforme tes analyses de sang, tes données Apple Health et ton ressenti quotidien en une vision claire de ta santé — avec un plan d'action personnalisé.",
  keywords: ["santé", "biomarqueurs", "analyses de sang", "Apple Health", "score santé", "bien-être"],
  openGraph: {
    title: "Merios — Comprends ton corps. Agis pour ta santé.",
    description:
      "Tes analyses de sang, tes données Apple Health, ton ressenti quotidien — enfin réunis en une vision claire de ta santé.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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
