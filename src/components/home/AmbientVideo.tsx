"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
  /** Scenery loops; people play once (a loop's crossfade doubles them). */
  loop?: boolean;
  /** Play once, then hold this frame (seconds), before the loop crossfade. */
  stopAt?: number;
  preload?: "auto" | "metadata";
};

type NavigatorWithData = Navigator & { connection?: { saveData?: boolean } };

/**
 * A muted ambient film laid over its own still. The parent renders the still
 * with next/image (the LCP, and the whole view without JS, under
 * prefers-reduced-motion or Save-Data). The film mounts after hydration,
 * plays only while on screen and fades in on its first frame.
 */
export default function AmbientVideo({ src, className = "", loop = false, stopAt, preload = "metadata" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as NavigatorWithData).connection?.saveData === true;
    if (!reduce && !saveData) setEnabled(true);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!done.current) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={ref}
      className={`${className}${shown ? " is-on" : ""}`}
      src={src}
      muted
      playsInline
      loop={loop}
      preload={preload}
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setShown(true)}
      onTimeUpdate={(e) => {
        if (stopAt !== undefined && e.currentTarget.currentTime >= stopAt) {
          done.current = true;
          e.currentTarget.pause();
        }
      }}
      onEnded={() => {
        done.current = true;
      }}
    />
  );
}
