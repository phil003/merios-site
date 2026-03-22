"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-400 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-xl border-b border-green-primary/6 py-3 px-6 md:px-12"
          : "py-5 px-6 md:px-12"
      }`}
      style={scrolled ? { backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" } : {}}
    >
      <a href="#" className="font-serif text-2xl font-semibold text-green-deep tracking-tight">
        merios
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex gap-9 items-center">
        <a href="#concept" className="text-sm font-medium text-text-secondary hover:text-green-primary transition-colors tracking-wide">
          L&apos;idée
        </a>
        <a href="#fonctionnement" className="text-sm font-medium text-text-secondary hover:text-green-primary transition-colors tracking-wide">
          Comment ça marche
        </a>
        <a href="#blog" className="text-sm font-medium text-text-secondary hover:text-green-primary transition-colors tracking-wide">
          Journal
        </a>
        <a
          href="#waitlist"
          className="bg-green-deep text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-primary hover:-translate-y-0.5 transition-all duration-300"
        >
          Accès anticipé
        </a>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={`w-6 h-0.5 bg-green-deep transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-0.5 bg-green-deep transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 bg-green-deep transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream/95 backdrop-blur-xl border-b border-green-primary/10 p-6 flex flex-col gap-4 md:hidden">
          <a href="#concept" onClick={() => setMenuOpen(false)} className="text-base font-medium text-text-secondary">L&apos;idée</a>
          <a href="#fonctionnement" onClick={() => setMenuOpen(false)} className="text-base font-medium text-text-secondary">Comment ça marche</a>
          <a href="#blog" onClick={() => setMenuOpen(false)} className="text-base font-medium text-text-secondary">Journal</a>
          <a href="#waitlist" onClick={() => setMenuOpen(false)} className="bg-green-deep text-white px-6 py-3 rounded-full text-sm font-semibold text-center">
            Accès anticipé
          </a>
        </div>
      )}
    </nav>
  );
}
