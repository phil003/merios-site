"use client";

import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

const LINKS: NavLink[] = [
  { label: "Science", href: "/#science" },
  { label: "Journal", href: "/#journal" },
  { label: "Waitlist", href: "/#waitlist" },
];

function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  close?: () => void,
) {
  if (!href.includes("#")) return;
  const hash = href.slice(href.indexOf("#") + 1);
  const target = document.getElementById(hash);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  close?.();
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          height: 64,
          background: scrolled
            ? "rgba(247,245,239,0.82)"
            : "rgba(247,245,239,0.55)",
          backdropFilter: "saturate(140%) blur(14px)",
          WebkitBackdropFilter: "saturate(140%) blur(14px)",
          borderBottom: scrolled
            ? "1px solid rgba(14,20,18,0.08)"
            : "1px solid transparent",
          transition:
            "background 300ms var(--ease-smooth), border-color 300ms var(--ease-smooth)",
        }}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 md:px-10">
          {/* Brand */}
          <a
            href="/"
            className="group inline-flex items-center gap-2.5"
            aria-label="Merios home"
          >
            <span
              aria-hidden
              className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-pulse)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-ink)",
              }}
            >
              Merios
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-10"
            aria-label="Primary"
          >
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleAnchorClick(e, l.href)}
                className="transition-colors"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12.5,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-secondary)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-ink)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "var(--color-ink-secondary)")
                }
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/#waitlist"
            onClick={(e) => handleAnchorClick(e, "/#waitlist")}
            className="group hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 transition-transform motion-reduce:transform-none hover:-translate-y-0.5"
            style={{
              background: "var(--color-pulse)",
              color: "var(--color-ink)",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.01em",
              boxShadow: "0 8px 24px -12px rgba(159,191,0,0.55)",
            }}
          >
            <span
              aria-hidden
              className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-ink)" }}
            />
            Join waitlist
          </a>

          {/* Mobile burger */}
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              aria-hidden
              className="absolute block h-px w-6 transition-transform motion-reduce:transition-none"
              style={{
                background: "var(--color-ink)",
                transform: menuOpen
                  ? "translateY(0) rotate(45deg)"
                  : "translateY(-5px)",
              }}
            />
            <span
              aria-hidden
              className="absolute block h-px w-6 transition-opacity motion-reduce:transition-none"
              style={{
                background: "var(--color-ink)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              aria-hidden
              className="absolute block h-px w-6 transition-transform motion-reduce:transition-none"
              style={{
                background: "var(--color-ink)",
                transform: menuOpen
                  ? "translateY(0) rotate(-45deg)"
                  : "translateY(5px)",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          background: "var(--color-canvas)",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 280ms var(--ease-smooth)",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-[88px]">
          <nav
            className="flex flex-col gap-7"
            aria-label="Primary mobile"
          >
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) =>
                  handleAnchorClick(e, l.href, () => setMenuOpen(false))
                }
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="/#waitlist"
            onClick={(e) =>
              handleAnchorClick(e, "/#waitlist", () => setMenuOpen(false))
            }
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-4"
            style={{
              background: "var(--color-pulse)",
              color: "var(--color-ink)",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            <span
              aria-hidden
              className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--color-ink)" }}
            />
            Join waitlist
          </a>
        </div>
      </div>
    </>
  );
}
