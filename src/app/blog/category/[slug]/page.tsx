import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { getBlogGradient } from "@/components/blog/gradients";
import styles from "@/components/blog/blog.module.css";
import { getAllPosts, type BlogPost } from "@/lib/blog";

// ── Category configuration ──────────────────────────────────────────────────
// Each category aggregates one or more frontmatter `tag` values. Slugs are
// kebab-case for SEO clarity; tag matching is case-sensitive against the
// values used in content/blog/*.mdx frontmatter.
type CategoryConfig = {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  tags: string[];
  hookKeyword: string;
};

const CATEGORIES: CategoryConfig[] = [
  {
    slug: "blood-tests",
    title: "Blood Tests",
    description:
      "Everything you need to interpret your blood work — from CBC and CMP to advanced lipid panels, ApoB, and Lp(a).",
    metaDescription:
      "Blood test guides, biomarker explanations, and lab result interpretation. Learn what your numbers mean and how to optimize them.",
    tags: ["Blood Tests"],
    hookKeyword: "blood test",
  },
  {
    slug: "biomarkers",
    title: "Biomarkers",
    description:
      "Decoded biomarkers across cardiovascular, metabolic, inflammatory, and organ-system clusters — with optimal ranges that go beyond lab reference intervals.",
    metaDescription:
      "Comprehensive guides on biomarkers — ApoB, hs-CRP, ALT, ferritin, and more. Optimal vs reference ranges for serious health optimizers.",
    tags: ["Biomarkers", "Lipids", "Inflammation", "Iron", "Liver", "Kidney", "Cardiovascular", "Heart Health"],
    hookKeyword: "biomarker",
  },
  {
    slug: "wearables",
    title: "Wearables & Lifestyle",
    description:
      "How to read what your Apple Watch, Oura, WHOOP, and Garmin actually measure — HRV, sleep, recovery, and zone-2 cardio interpretation.",
    metaDescription:
      "Wearable data decoded: Apple Watch HRV, Oura sleep scores, WHOOP recovery, zone-2 cardio. Turn daily metrics into actionable insights.",
    tags: ["Sleep", "HRV", "Heart Rate", "Fitness", "Wearables"],
    hookKeyword: "wearable",
  },
  {
    slug: "metabolic-health",
    title: "Metabolic Health",
    description:
      "Blood sugar, insulin resistance, and the metabolic markers that drift years before a diagnosis — HbA1c, fasting insulin, HOMA-IR, and what actually moves them.",
    metaDescription:
      "Metabolic health decoded: HbA1c, fasting glucose, insulin resistance, HOMA-IR, and prediabetes. What your numbers mean and how to reverse the drift.",
    tags: ["Metabolic Health"],
    hookKeyword: "metabolic health",
  },
  {
    slug: "longevity",
    title: "Longevity",
    description:
      "Biological age, lifespan biomarkers, and the evidence-based interventions that actually move the needle on healthspan.",
    metaDescription:
      "Biological age, PhenoAge, longevity biomarkers, and proven interventions to extend healthspan. Backed by peer-reviewed research.",
    tags: ["Longevity", "Pillar", "Tools"],
    hookKeyword: "longevity",
  },
  {
    slug: "hormones",
    title: "Hormones",
    description:
      "Thyroid, testosterone, cortisol, and the rest — what to test, what's optimal, and what to do when numbers drift.",
    metaDescription:
      "Hormone testing decoded: thyroid (TSH, T3, T4), testosterone, cortisol, IGF-1. Optimal ranges for men and women, and what to do about deficiencies.",
    tags: ["Hormones", "Thyroid"],
    hookKeyword: "hormone",
  },
  {
    slug: "nutrition",
    title: "Nutrition & Supplements",
    description:
      "Vitamin D, B12, magnesium, omega-3 — what your blood tests reveal about nutrient status and which supplements actually fix it.",
    metaDescription:
      "Nutrient deficiency decoded: vitamin D, B12, magnesium, omega-3, iron. What your blood work shows and how to supplement effectively.",
    tags: ["Vitamins", "Supplements", "Nutrition", "Mental Health"],
    hookKeyword: "supplement",
  },
];

const SITE_URL = "https://merios.life";

// ── Static params ───────────────────────────────────────────────────────────
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

function getCategory(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

function getPostsInCategory(category: CategoryConfig): BlogPost[] {
  return getAllPosts().filter((p) => category.tags.includes(p.tag));
}

// ── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category Not Found" };

  const url = `${SITE_URL}/blog/category/${category.slug}`;
  return {
    title: `${category.title} — Articles & Guides`,
    description: category.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.title} — Articles & Guides | Merios`,
      description: category.metaDescription,
      url,
      type: "website",
      images: [{ url: "/og-image.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} — Articles & Guides | Merios`,
      description: category.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = getPostsInCategory(category);
  const url = `${SITE_URL}/blog/category/${category.slug}`;

  // CollectionPage + ItemList JSON-LD
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} — Articles & Guides`,
    url,
    description: category.metaDescription,
    isPartOf: {
      "@type": "WebSite",
      name: "Merios",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
        description: post.description,
      })),
    },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: category.title, url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <main style={{ background: "var(--color-canvas)" }}>
        <PageHero
          eyebrow={`Category — ${posts.length} articles`}
          title={category.title}
          subline={category.description}
        />

        <section className={`pb-24 md:pb-32 ${styles.catSection}`}>
          <div className={styles.container}>
            {posts.length === 0 ? (
              <p className={styles.catEmpty}>
                Articles coming soon. In the meantime, see our{" "}
                <Link href="/blog">full blog index</Link>.
              </p>
            ) : (
              <ul className={styles.catGrid}>
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`blog-card group ${styles.catCard}`}
                    >
                      <div className={styles.catTop}>
                        <span
                          className={styles.sticker}
                          style={{ background: getBlogGradient(post.tag) }}
                        >
                          {post.emoji}
                        </span>{" "}
                        <span>{post.tag}</span>
                      </div>
                      <h3 className={styles.catTitle}>{post.title}</h3>
                      <p className={styles.catDesc}>{post.description}</p>
                      <div className={styles.catRead}>
                        <span className={styles.catReadInner}>
                          {post.readTime}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.backRow}>
              <Link href="/blog" className="btn btn-ghost">
                ← Back to all articles
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
