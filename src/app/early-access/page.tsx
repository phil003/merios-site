import Footer from "@/components/Footer";
import VariantUS from "@/components/early-access/VariantUS";
import VariantRest from "@/components/early-access/VariantRest";

// Note: /early-access is a server component. The upstream middleware
// (src/middleware.ts) sets ?variant=us | ?variant=rest based on geo + bot UA.
// Googlebot and non-US visitors land on "rest"; US humans land on "us".
// Direct dev loads without middleware fall through to the "rest" default,
// which matches production Googlebot behavior (safe for SEO previews).

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type Variant = "us" | "rest";

function resolveVariant(raw: string | string[] | undefined): Variant {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === "us" ? "us" : "rest";
}

export default async function EarlyAccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const variant = resolveVariant(params.variant);

  // JSON-LD: WebPage + BreadcrumbList (Home → Early Access).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://merios.life/early-access#webpage",
        url: "https://merios.life/early-access",
        name: "Early Access — Merios",
        description:
          "Merios is now on the US App Store and rolling out worldwide. Get in.",
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

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- static server-rendered JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {variant === "us" ? <VariantUS /> : <VariantRest />}
      <Footer />
    </>
  );
}
