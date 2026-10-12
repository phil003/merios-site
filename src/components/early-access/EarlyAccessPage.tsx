import Footer from "@/components/Footer";
import { WebApplicationSchema } from "@/components/StructuredData";
import VariantUS from "@/components/early-access/VariantUS";
import VariantRest from "@/components/early-access/VariantRest";
import {
  EARLY_ACCESS_DESCRIPTION,
  type EarlyAccessVariant,
} from "@/lib/early-access";

// The /early-access page body, shared by both prerendered variants
// (src/app/early-access/[variant]/page.tsx). src/middleware.ts rewrites each
// request for /early-access to one of them — US visitors to "us" (App Store),
// everyone else and every crawler to "rest" (waitlist + newsletter) — so both
// are served as static HTML at the one canonical URL.

// JSON-LD: WebPage + BreadcrumbList (Home → Early Access). Identical for both
// variants, and always pointing at the canonical URL.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://merios.life/early-access#webpage",
      url: "https://merios.life/early-access",
      name: "Early Access — Merios",
      description: EARLY_ACCESS_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": "https://merios.life/#website" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://merios.life/early-access#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://merios.life",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Early Access",
          item: "https://merios.life/early-access",
        },
      ],
    },
  ],
};

export default function EarlyAccessPage({
  variant,
}: {
  variant: EarlyAccessVariant;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- static server-rendered JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* A page about the app itself: carries the MobileApplication entity. */}
      <WebApplicationSchema />
      {variant === "us" ? <VariantUS /> : <VariantRest />}
      <Footer />
    </>
  );
}
