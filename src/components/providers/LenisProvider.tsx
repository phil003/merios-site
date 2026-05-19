"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// Lenis + GSAP + ScrollTrigger are imported dynamically inside useEffect so
// they ship as a separate chunk and never enter the initial JS bundle on
// routes that never need smooth scroll or scroll-triggered animations
// (e.g. /privacy, /terms, /security, /contact). Combined initial savings
// on those routes: ~65 KB gzipped.

type LenisScrollToOptions = {
  offset?: number;
  immediate?: boolean;
  lock?: boolean;
  duration?: number;
  easing?: (t: number) => number;
  lerp?: number;
  force?: boolean;
  onComplete?: () => void;
};

type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    opts?: LenisScrollToOptions,
  ) => void;
  raf: (time: number) => void;
  on: (event: string, cb: (...args: unknown[]) => void) => void;
  off: (event: string, cb: (...args: unknown[]) => void) => void;
  destroy: () => void;
};

const LenisContext = createContext<LenisLike | null>(null);

/**
 * useLenis — returns the active Lenis instance (or null when Lenis is not
 * mounted: SSR, before mount, on mobile/coarse-pointer devices, or when
 * prefers-reduced-motion is set).
 *
 * Anchor navigation pattern:
 *
 *   const lenis = useLenis();
 *   const onClick = (e) => {
 *     e.preventDefault();
 *     lenis?.scrollTo("#connect", {
 *       offset: -96,
 *       duration: 1.1,
 *       easing: (t) => 1 - Math.pow(1 - t, 3),
 *     });
 *   };
 *
 * When lenis is null (reduced-motion / mobile / SSR), fall back to a native
 * anchor jump via `location.hash = "#connect"` or let the default link
 * behaviour run.
 */
export function useLenis(): LenisLike | null {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisLike | null>(null);
  // Expose instance via state so consumers re-render once Lenis is ready.
  const [lenis, setLenis] = useState<LenisLike | null>(null);

  useEffect(() => {
    // Bail on touch/mobile devices — native iOS/Android scroll is already
    // hardware-accelerated and Lenis adds jank on coarse pointers.
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.matchMedia("(max-width: 767px)").matches;
    if (isCoarsePointer || isNarrow) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const [{ default: Lenis }, gsapMod, scrollTriggerMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const gsap = gsapMod.gsap;
      const ScrollTrigger = scrollTriggerMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const instance = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
      }) as unknown as LenisLike;
      lenisRef.current = instance;
      setLenis(instance);

      const onScroll = () => ScrollTrigger.update();
      instance.on("scroll", onScroll);

      const raf = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(raf);
        instance.off("scroll", onScroll);
        instance.destroy();
        lenisRef.current = null;
        setLenis(null);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
