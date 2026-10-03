"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";

type NavLink = { label: string; href: string };

// Top-level links to the real content hubs (not homepage anchors) so the blog,
// tools, science and compare pages are reachable from every page — and crawlable
// as internal links. Ordered tech/methodology → health.
const LINKS: NavLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Science", href: "/science" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "Compare", href: "/compare" },
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

/**
 * Floating liquid-glass bar. It reads the stage underneath: over any element
 * marked data-nav="dark" (night heroes, night sections) it turns dark glass
 * with light text; elsewhere it is white glass with ink text.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch a thin band where the bar floats; dark if any night stage crosses it.
  useEffect(() => {
    const darks = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) darks.add(e.target);
          else darks.delete(e.target);
        }
        setDark(darks.size > 0);
      },
      { rootMargin: "-28px 0px -92% 0px", threshold: 0 },
    );
    const els = document.querySelectorAll('[data-nav="dark"]');
    els.forEach((el) => io.observe(el));
    if (els.length === 0) setDark(false);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const theme = menuOpen || dark ? "dark" : "light";

  return (
    <>
      <header
        className="v3-nav"
        data-theme={theme}
        data-compact={compact ? "true" : "false"}
      >
        <div className="v3-nav__bar">
          <a href="/" className="v3-nav__brand" aria-label="Merios home">
            <Logo size="1.55rem" cut={theme === "dark" ? "#12171B" : "#F4F6F3"} />
          </a>

          <nav className="v3-nav__links" aria-label="Primary">
            {LINKS.map((l) => {
              const active = pathname === l.href || pathname?.startsWith(`${l.href}/`);
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleAnchorClick(e, l.href)}
                  className="v3-nav__link"
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="v3-nav__end">
            <a href="/early-access" className="btn btn-lime v3-nav__cta">
              <svg width="14" height="17" viewBox="0 0 17 20" aria-hidden focusable="false">
                <path
                  fill="currentColor"
                  d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM11.6 3c.7-.9 1.2-2 1-3.2-1 .1-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"
                />
              </svg>
              Get the app
            </a>
            <button
              type="button"
              className="v3-nav__burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="v3-nav-sheet"
            >
              <span aria-hidden data-open={menuOpen ? "true" : "false"} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="v3-nav-sheet"
        className="v3-nav-sheet night"
        data-open={menuOpen ? "true" : "false"}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav className="v3-nav-sheet__links" aria-label="Primary mobile">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleAnchorClick(e, l.href, () => setMenuOpen(false))}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="/early-access"
          onClick={() => setMenuOpen(false)}
          className="btn btn-lime v3-nav-sheet__cta"
        >
          Get the app
        </a>
      </div>
    </>
  );
}
