"use client";

import { useEffect } from "react";

/**
 * The homepage's colour stage: fixed layers (night, lime, mist, lilac, fog)
 * that crossfade as each section reaches the middle of the viewport. Sections
 * declare their ground with data-stage; until this runs they paint it
 * themselves (no-JS and first paint stay correct). Content that would sit on
 * the wrong ground (dark text on night, light text on lime…) fades out with
 * the crossfade, so every scene stays readable while it hands over.
 */
export default function HomeStage() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".hv3 [data-stage]"));
    if (!sections.length) return;

    root.classList.add("hv3-staged");
    root.dataset.scene = "night";
    root.dataset.ground = "dark";

    // scrollspy on the viewport's centre line: exactly one section holds it
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const scene = (e.target as HTMLElement).dataset.stage;
          if (scene && root.dataset.scene !== scene) {
            root.dataset.scene = scene;
            root.dataset.ground = scene === "night" ? "dark" : "light";
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      io.disconnect();
      root.classList.remove("hv3-staged");
      delete root.dataset.scene;
      delete root.dataset.ground;
    };
  }, []);

  return (
    <div className="hv3-stage" aria-hidden>
      <div className="hv3-stage__layer hv3-stage__layer--night" />
      <div className="hv3-stage__layer hv3-stage__layer--lime" />
      <div className="hv3-stage__layer hv3-stage__layer--mist" />
      <div className="hv3-stage__layer hv3-stage__layer--lilac" />
      <div className="hv3-stage__layer hv3-stage__layer--fog" />
      <div className="hv3-stage__grain" />
    </div>
  );
}
