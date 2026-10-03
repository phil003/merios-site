import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, IBM_Plex_Mono, Caveat } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import {
  OrganizationSchema,
  WebApplicationSchema,
  SiteNavigationSchema,
} from "@/components/StructuredData";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

// v3 type system — Bricolage Grotesque (display + UI), Newsreader (long reads,
// numerals, the wordmark), IBM Plex Mono (lab data, labels), Caveat (rare
// hand-written annotations). Bricolage keeps its opsz axis: optical sizing
// shapes the display cuts of large headings.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

// Newsreader and Plex Mono are not preloaded: only the display face (the
// LCP headline) competes for the first bytes. Newsreader carries no opsz axis
// (half the weight per file) and its italic is fetched only by pages that
// actually set italic text.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: false,
});

// Homepage annotations only: not preloaded, so it never competes with the
// faces above the fold on other routes.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["700"],
  preload: false,
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
    countryName: "United States",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Merios — Your health, one score.",
        type: "image/png",
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
  // Smart App Banner — Safari iOS shows a native "Open in App Store" banner.
  itunes: {
    appId: "6760352598",
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
      className={`${bricolage.variable} ${newsreader.variable} ${plexMono.variable} ${caveat.variable}`}
      // The inline reveal bootstrap sets html[data-anim] before hydration.
      suppressHydrationWarning
    >
      <head>
        {/* Scroll-reveal v2 bootstrap — inline so reveals never wait for the
            framework bundle. Sets html[data-anim] (arming hidden states) and
            reveals [data-rv] elements via IntersectionObserver from
            DOMContentLoaded. MutationObserver keeps SPA navigations covered.
            Reduced-motion users never get the hidden state at all.
            threshold 0 + a bottom margin: an element reveals as soon as its
            top enters the viewport, whatever its height (a ratio threshold
            could never be met by elements taller than ~8 viewports, which
            left the privacy policy invisible). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.setAttribute('data-anim','');var init=function(){var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){if(es[i].isIntersecting){es[i].target.classList.add('rv-in');io.unobserve(es[i].target);}}},{rootMargin:'0px 0px -8% 0px',threshold:0});var watch=function(root){var els=root.querySelectorAll?root.querySelectorAll('[data-rv]:not(.rv-in)'):[];for(var i=0;i<els.length;i++)io.observe(els[i]);};watch(document);new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var ns=ms[i].addedNodes;for(var j=0;j<ns.length;j++){var n=ns[j];if(n.nodeType===1){if(n.hasAttribute&&n.hasAttribute('data-rv')&&!n.classList.contains('rv-in'))io.observe(n);watch(n);}}}}).observe(document.body,{childList:true,subtree:true});};if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);}catch(e){d.removeAttribute('data-anim');}})();`,
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <LenisProvider>
          <OrganizationSchema />
          <WebApplicationSchema />
          <SiteNavigationSchema />
          <Navbar />
          {children}
        </LenisProvider>
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
