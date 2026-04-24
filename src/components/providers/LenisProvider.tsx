"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisContext = createContext<Lenis | null>(null);

/**
 * useLenis — returns the active Lenis instance (or null when Lenis is not
 * mounted: SSR, before mount, or when prefers-reduced-motion is set).
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
 * When lenis is null (reduced-motion / SSR), fall back to a native
 * anchor jump via `location.hash = "#connect"` or let the default link
 * behaviour run.
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  // Expose instance via state so consumers re-render once Lenis is ready.
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const instance = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = instance;
    setLenis(instance);

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
