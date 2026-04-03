import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import {
  OrganizationSchema,
  WebApplicationSchema,
} from "@/components/StructuredData";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-R9RBJ2Z14K";

export const metadata: Metadata = {
  metadataBase: new URL("https://merios.life"),
  title: {
    default:
      "Merios — Health Score App | Blood Test Analysis & Biomarker Tracking",
    template: "%s | Merios",
  },
  description:
    "Track 130+ biomarkers, calculate your biological age, and get a personalized health score. Upload blood tests with OCR, sync Apple Health, and optimize your longevity. Free to start.",
  keywords: [
    "health score app",
    "blood test analysis app",
    "biomarker tracking app",
    "biological age calculator",
    "blood test results app",
    "health optimization app",
    "personal health dashboard",
    "Apple Health blood test",
    "biomarker tracking for longevity",
    "health analytics",
    "InsideTracker alternative",
    "Function Health alternative",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://merios.life",
  },
  openGraph: {
    title: "Merios — Health Score App | Blood Test Analysis & Biomarker Tracking",
    description:
      "Track 130+ biomarkers, calculate your biological age, and get a personalized health score. Upload blood tests, sync Apple Health, optimize your longevity.",
    url: "https://merios.life",
    siteName: "Merios",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merios — Health Score App | Blood Test Analysis & Biomarker Tracking",
    description:
      "Track 130+ biomarkers, calculate your biological age, and get a personalized health score. Upload blood tests, sync Apple Health, optimize your longevity.",
  },
  verification: {
    google: "55YlC0T47ZzU-V0khkPxvaeAmGCjRKwmap7vHiZt9do",
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
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
      <body className="overflow-x-hidden">
          <OrganizationSchema />
          <WebApplicationSchema />
          {children}
          <Analytics />
        </body>
    </html>
  );
}
