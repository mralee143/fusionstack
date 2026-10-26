"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Gap kept above a pinned card, clear of the fixed header. */
const TOP = 96;

/**
 * Stacking cards for the Work section: each `[data-stack-card]` pins under
 * the header while the next one scrolls up over it, and the card underneath
 * eases back to 92%.
 *
 * Done with ScrollTrigger pins rather than `position: sticky` — ScrollSmoother
 * moves the page with transforms, which sticky cannot follow. Without motion
 * preference the cards are a plain list.
 */
export default function WorkStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        const last = cards[cards.length - 1];

        cards.forEach((card, i) => {
          if (card === last) return;

          ScrollTrigger.create({
            trigger: card,
            start: `top top+=${TOP}`,
            endTrigger: last,
            end: `top top+=${TOP}`,
            pin: true,
            pinSpacing: false,
          });

          // Scale the card and fade in a dark shade over it — both run on the
          // compositor. (Animating `filter` repainted the whole card per frame.)
          const trigger = {
            trigger: cards[i + 1],
            start: "top bottom",
            end: `top top+=${TOP}`,
            scrub: true,
          };
          gsap.fromTo(card.firstElementChild, { scale: 1 }, { scale: 0.92, ease: "none", scrollTrigger: trigger });
          gsap.fromTo(
            card.querySelector("[data-stack-shade]"),
            { opacity: 0 },
            { opacity: 0.4, ease: "none", scrollTrigger: { ...trigger } },
          );
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-[30px]">
      {children}
    </div>
  );
}
