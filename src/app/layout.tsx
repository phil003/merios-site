import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import {
  OrganizationSchema,
  SiteNavigationSchema,
} from "@/components/StructuredData";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

// Open Sky type system — Figtree (display, UI and labels) and Newsreader
// (numbers, long reads, and the italic human word in headlines). Figtree is
// the LCP face, so it is the only one preloaded.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

// Newsreader is preloaded too: in Open Sky the italic human word ends every
// H1 and the big numbers on covers are set in it, so it is often part of the
// LCP element.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const GA_MEASUREMENT_ID = "G-R9RBJ2Z14K";

// Homepage title and description (the defaults below). Titles stay within 60
// characters and descriptions within 155, so neither is cut off in results.
const HOME_TITLE = "Merios — Health Score App | Blood Test & Biomarker Tracking";
const HOME_DESCRIPTION =
  "Track 160+ biomarkers, calculate your biological age and get a personalized health score. Upload blood tests, sync Apple Health. Free to start.";

export const metadata: Metadata = {
  metadataBase: new URL("https://merios.life"),
  // A page whose own title already names the brand sets `title.absolute`, so
  // the template never produces "… — Merios | Merios".
  title: {
    default: HOME_TITLE,
    template: "%s | Merios",
  },
  description: HOME_DESCRIPTION,
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
  // Pages that set their own `openGraph` replace this whole object (Next
  // merges metadata one key deep), so each of them gets its image from an
  // opengraph-image.tsx next to its page.tsx rather than from here. A page
  // with neither (e.g. /phil) falls back to the homepage's Open Sky card
  // (src/app/opengraph-image.tsx), not the retired v3 /og-image.png.
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "https://merios.life",
    siteName: "Merios",
    type: "website",
    locale: "en_US",
    countryName: "United States",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Merios: your health, finally readable.",
        type: "image/png",
      },
    ],
  },
  // Card type only. With no title, description or image here, Next fills
  // each page's Twitter card from that page's own Open Graph values; spelling
  // them out at the root made every page that sets no `twitter` key inherit
  // the homepage's title and image.
  twitter: {
    card: "summary_large_image",
  },
  // One icon set, all in public/ (no favicon/icon/apple-icon files in
  // src/app, which would add their own tags and shadow these paths). The
  // provisional mark: the wordmark's lowercase "m", ink on haze. The .ico
  // holds three PNG entries; the SVG is the same mark as a path.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
      className={`${figtree.variable} ${newsreader.variable}`}
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
