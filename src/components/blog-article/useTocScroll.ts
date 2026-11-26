"use client";

import { useEffect, useState, type RefObject } from "react";

/** Which end of the contents list hides rows ("none" when it all fits). */
export type TocFade = "none" | "start" | "end" | "both";

/**
 * The sticky contents list scrolls inside its own box when it is taller than
 * the screen allows. This hook reports which end still hides rows (the CSS
 * fades that end, so a cut row never looks like the end of the list) and
 * keeps the row being read in view as the reader moves down the article.
 */
export function useTocScroll(
  ref: RefObject<HTMLElement | null>,
  activeId: string | null,
  /** Changes when the list (re)renders its rows, e.g. their count. */
  rows: number = 0,
): TocFade {
  const [fade, setFade] = useState<TocFade>("none");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 2) {
        setFade("none");
        return;
      }
      const above = el.scrollTop > 2;
      const below = el.scrollTop < max - 2;
      setFade(above && below ? "both" : above ? "start" : "end");
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [ref, rows]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !activeId) return;
    const link = el.querySelector<HTMLElement>(`a[href="#${CSS.escape(activeId)}"]`);
    if (!link) return;
    const margin = 28;
    const top = link.offsetTop;
    const bottom = top + link.offsetHeight;
    if (top - margin < el.scrollTop) {
      el.scrollTop = Math.max(0, top - margin);
    } else if (bottom + margin > el.scrollTop + el.clientHeight) {
      el.scrollTop = bottom + margin - el.clientHeight;
    }
  }, [ref, activeId]);

  return fade;
}
