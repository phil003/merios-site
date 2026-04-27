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

/**
 * PersonSchema — for Author / Medical Reviewer / Advisor pages.
 * Use on /about and any author pages so Google can attach E-E-A-T to the entity.
 *
 * Use `MedicallyReviewedSchema` for blog posts that have a medical reviewer.
 */
export function PersonSchema({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs,
  affiliation,
  alumniOf,
  knowsAbout,
}: {
  name: string;
  jobTitle: string;
  description?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  affiliation?: string;
  alumniOf?: string;
  knowsAbout?: string[];
}) {
  const personUrl =
    url ||
    `https://merios.life/about#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personUrl,
    name,
    jobTitle,
    url: personUrl,
    worksFor: {
      "@type": "Organization",
      name: "Merios",
      url: "https://merios.life",
    },
  };

  if (description) schema.description = description;
  if (image) schema.image = image.startsWith("http") ? image : `https://merios.life${image}`;
  if (sameAs?.length) schema.sameAs = sameAs;
  if (affiliation) {
    schema.affiliation = { "@type": "Organization", name: affiliation };
  }
  if (alumniOf) {
    schema.alumniOf = { "@type": "EducationalOrganization", name: alumniOf };
  }
  if (knowsAbout?.length) schema.knowsAbout = knowsAbout;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * MedicallyReviewedSchema — to embed inside ArticleSchema when an article
 * has been reviewed by a clinician. Adds reviewedBy + lastReviewed signals
 * critical for E-E-A-T on YMYL health content.
 *
 * Render alongside ArticleSchema (after) on YMYL blog posts.
 */
export function MedicallyReviewedSchema({
  reviewerName,
  reviewerJobTitle,
  reviewerCredentials,
  lastReviewed,
  articleSlug,
}: {
  reviewerName: string;
  reviewerJobTitle: string; // e.g. "Internal Medicine Physician, MD"
  reviewerCredentials?: string; // e.g. "Board-certified by ABIM"
  lastReviewed: string; // ISO date
  articleSlug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `https://merios.life/blog/${articleSlug}#medicalwebpage`,
    lastReviewed,
    reviewedBy: {
      "@type": "Person",
      name: reviewerName,
      jobTitle: reviewerJobTitle,
      ...(reviewerCredentials ? { honorificSuffix: reviewerCredentials } : {}),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * ProductComparisonSchema — for /compare/[slug] pages to surface
 * comparison-specific rich results.
 */
export function ProductComparisonSchema({
  products,
  url,
}: {
  products: {
    name: string;
    brand: string;
    description: string;
    price: number;
    priceCurrency?: string;
  }[];
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: { "@type": "Brand", name: p.brand },
        description: p.description,
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: p.priceCurrency || "USD",
        },
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
