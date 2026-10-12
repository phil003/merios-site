import { notFound } from "next/navigation";
import EarlyAccessPage from "@/components/early-access/EarlyAccessPage";
import {
  EARLY_ACCESS_VARIANTS,
  isEarlyAccessVariant,
} from "@/lib/early-access";

// Both /early-access variants, prerendered as static HTML at build time.
// Nobody is meant to land on /early-access/us or /early-access/rest directly:
// src/middleware.ts rewrites /early-access to one of them (US visitors → "us",
// everyone else and every crawler → "rest"), so the address bar keeps
// /early-access. Canonical (from ../layout.tsx) stays
// https://merios.life/early-access, and neither path is in the sitemap.
//
// The page used to read `searchParams`, which made the route dynamic
// (rendered per request, `private, no-store`) while every other route is
// static; the variant now comes from the path instead.

export const dynamicParams = false;

export function generateStaticParams() {
  return EARLY_ACCESS_VARIANTS.map((variant) => ({ variant }));
}

export default async function EarlyAccessVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  if (!isEarlyAccessVariant(variant)) notFound();
  return <EarlyAccessPage variant={variant} />;
}
