"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import PageHero from "@/components/ui/PageHero";
import { useLenis } from "@/components/providers/LenisProvider";
import { duration, easing } from "@/lib/motion";

export interface TocItem {
  id: string;
  label: string;
}

interface LegalPageLayoutProps {
  eyebrow?: string;
  title: string;
  subline?: string;
  lastUpdated: string;
  tocItems: TocItem[];
  children: ReactNode;
}

export default function LegalPageLayout({
  eyebrow = "Legal",
  title,
  subline,
  lastUpdated,
  tocItems,
  children,
}: LegalPageLayoutProps) {
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleTocClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setMobileOpen(false);
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -96,
        duration: 1.0,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (typeof window !== "undefined" && history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <main style={{ background: "var(--color-canvas)" }}>
      <PageHero eyebrow={eyebrow} title={title} subline={subline} />

      {/* Last updated bar */}
      <div
        className="border-y"
        style={{
          borderColor: "var(--color-grid)",
          background: "var(--color-canvas)",
        }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center gap-2.5 px-6 py-4 md:px-10">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-pulse)" }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-ink-tertiary)",
            }}
          >
            Last updated: {lastUpdated}
          </span>
        </div>
      </div>

      {/* Main content + TOC */}
      <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20">
        {/* Mobile TOC — accordion */}
        {tocItems.length > 0 ? (
          <div className="mb-10 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="legal-mobile-toc"
              className="flex w-full items-center justify-between rounded-md border px-4 py-3.5 text-left"
              style={{
                borderColor: "var(--color-grid)",
                background: "var(--color-canvas-alt)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
            >
              <span>Table of contents</span>
              <span
                aria-hidden
                className="transition-transform duration-300"
                style={{
                  transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)",
                  color: "var(--color-ink-tertiary)",
                }}
              >
                ▾
              </span>
            </button>
            {mobileOpen ? (
              <ul
                id="legal-mobile-toc"
                className="mt-3 space-y-2 rounded-md border px-4 py-4"
                style={{
                  borderColor: "var(--color-grid)",
                  background: "var(--color-canvas-alt)",
                }}
              >
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleTocClick(e, item.id)}
                      className="block py-1.5"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        color: "var(--color-ink-secondary)",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22%)_1fr] lg:gap-14">
          {/* Desktop TOC — sticky aside */}
          {tocItems.length > 0 ? (
            <aside
              className="hidden lg:block lg:sticky lg:self-start"
              style={{ top: "7rem" }}
              aria-label="Table of contents"
            >
              <div
                className="pb-3 mb-4 border-b"
                style={{
                  borderColor: "var(--color-grid)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                }}
              >
                Contents
              </div>
              <ol className="space-y-2.5">
                {tocItems.map((item, i) => (
                  <li key={item.id} className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--color-ink-tertiary)",
                        minWidth: "1.25rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleTocClick(e, item.id)}
                      className="toc-link transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        lineHeight: 1.4,
                        color: "var(--color-ink-secondary)",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          ) : null}

          {/* Main legal content */}
          <motion.article
            className="legal-prose max-w-[720px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
              letterSpacing: "-0.003em",
            }}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: prefersReducedMotion ? duration.quick : duration.normal,
              ease: easing.expo,
            }}
          >
            {children}
          </motion.article>
        </div>
      </div>

      {/* Contact footer link */}
      <div
        className="border-t"
        style={{
          borderColor: "var(--color-grid)",
          background: "var(--color-canvas)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-10 md:py-20">
          <Link
            href="/contact?type=general&subject=Legal%20question"
            className="inline-flex items-center gap-3 transition-transform duration-300 ease-out hover:translate-x-1"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
            }}
          >
            <span>Questions? Contact us</span>
            <span
              aria-hidden
              style={{ color: "var(--color-green-deep)" }}
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
