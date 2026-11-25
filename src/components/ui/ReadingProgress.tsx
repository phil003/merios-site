"use client";

import { useEffect, useRef } from "react";

/**
 * Reading-progress bar. Fixed top of the viewport, scales with scroll.
 * Open Sky: a thin sky-to-zenith line, no glow — it reads on the dawn
 * masthead and on the haze reading surface alike.
 *
 * Vanilla rAF-throttled scroll listener (the blog route ships no animation
 * runtime). Hidden under prefers-reduced-motion via the `.reading-progress`
 * CSS rule in globals.css.
 */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="reading-progress pointer-events-none fixed top-0 left-0 right-0 z-40 h-[3px]"
      style={{
        background:
          "linear-gradient(90deg, var(--color-sky, #A8C2F4) 0%, var(--color-zenith, #6E8FE8) 100%)",
      }}
    />
  );
}
