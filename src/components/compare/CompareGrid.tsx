"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { ComparePost } from "@/lib/compare";
import CompareCard from "./CompareCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CompareGridProps {
  posts: ComparePost[];
}

export default function CompareGrid({ posts }: CompareGridProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll<HTMLElement>(".compare-card"),
      );
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const reduced = context.conditions?.reduced;

          if (reduced) {
            gsap.set(cards, { opacity: 1, y: 0 });
            return;
          }

          gsap.set(cards, { opacity: 0, y: 24 });

          ScrollTrigger.batch(cards, {
            start: "top 88%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "expo.out",
                stagger: 0.06,
                overwrite: "auto",
              });
            },
          });
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: container, dependencies: [posts.length] },
  );

  if (posts.length === 0) {
    return (
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          color: "var(--color-ink-tertiary)",
        }}
      >
        Comparisons coming soon.
      </p>
    );
  }

  return (
    <div
      ref={container}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <CompareCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
