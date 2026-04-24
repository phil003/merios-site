import type { BlogPost } from "@/lib/blog";

interface BlogJsonLdProps {
  posts: BlogPost[];
}

/**
 * Injects <Blog> + <ItemList> schema for /blog.
 * BreadcrumbList is rendered separately via StructuredData.BreadcrumbSchema
 * so the shared component handles positional indexing.
 */
export default function BlogJsonLd({ posts }: BlogJsonLdProps) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Merios Journal",
    url: "https://merios.life/blog",
    description:
      "Biomarker deep-dives, longevity science, and the research behind your Merios health score.",
    publisher: {
      "@type": "Organization",
      name: "Merios",
      url: "https://merios.life",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://merios.life/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
