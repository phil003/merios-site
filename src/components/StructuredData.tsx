// JSON-LD Structured Data for SEO
// Organization + WebApplication schemas injected site-wide

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Merios",
    url: "https://merios.life",
    logo: "https://merios.life/logo.png",
    description:
      "Merios is a health analytics app that transforms blood tests, Apple Health data, and daily check-ins into one clear health score with personalized action plans.",
    foundingDate: "2026",
    sameAs: [
      "https://twitter.com/merios_health",
      "https://www.linkedin.com/company/merios",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://merios.life/contact",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Merios",
    url: "https://merios.life",
    description:
      "Health score app that analyzes 130+ blood biomarkers, Apple Health data, and daily check-ins. Calculate your biological age and optimize your health.",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free Basic plan available. Pro plan at $14.99/month.",
    },
    featureList: [
      "Blood test OCR analysis (130+ biomarkers)",
      "Apple Health integration",
      "Biological age calculation (PhenoAge)",
      "Merios Health Score (4 pillars)",
      "11 health system tracking",
      "Daily wellness check-ins",
      "Personalized action plans",
    ],
    screenshot: "https://merios.life/app-preview.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageSchema({
  questions,
}: {
  questions: { q: string; a: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  slug,
  urlPath,
  image,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  /**
   * Optional URL path override. Defaults to `/blog/{slug}`.
   * Use e.g. `/compare/merios-vs-function-health` for comparison pages.
   */
  urlPath?: string;
  image?: string;
}) {
  const imageUrl = image
    ? (image.startsWith("http") ? image : `https://merios.life${image}`)
    : "https://merios.life/og-image.png";

  const pagePath = urlPath || `/blog/${slug}`;
  const pageUrl = `https://merios.life${pagePath}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    image: [imageUrl],
    url: pageUrl,
    author: {
      "@type": "Organization",
      name: "Merios",
      url: "https://merios.life",
    },
    publisher: {
      "@type": "Organization",
      name: "Merios",
      url: "https://merios.life",
      logo: {
        "@type": "ImageObject",
        url: "https://merios.life/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
