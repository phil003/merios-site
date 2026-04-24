import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import {
  OrganizationSchema,
  WebApplicationSchema,
} from "@/components/StructuredData";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Merios — Your health, one score.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merios — Health Score App | Blood Test Analysis & Biomarker Tracking",
    description:
      "Track 130+ biomarkers, calculate your biological age, and get a personalized health score. Upload blood tests, sync Apple Health, optimize your longevity.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
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
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <LenisProvider>
          <OrganizationSchema />
          <WebApplicationSchema />
          <Navbar />
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
