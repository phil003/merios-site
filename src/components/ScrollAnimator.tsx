"use client";

import { useEffect, useRef } from "react";

export default function ScrollAnimator() {
  const ticking = useRef(false);

  useEffect(() => {
    function reveal() {
      const vh = window.innerHeight;
      document.querySelectorAll(".fade-in:not(.visible)").forEach((el, i) => {
        const top = el.getBoundingClientRect().top;
        if (top < vh - 40) {
          // Stagger siblings slightly
          setTimeout(() => el.classList.add("visible"), i * 60);
        }
      });
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(reveal);
      }
    }

    // Fire immediately, then on every scroll
    reveal();
    setTimeout(reveal, 100);
    setTimeout(reveal, 300);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
