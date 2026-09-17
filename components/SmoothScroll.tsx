"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/** Offset that keeps a jumped-to section clear of the fixed header. */
const HEADER_OFFSET = "top 100px";

/**
 * Scrolls to `#id`. Goes through ScrollSmoother when it is running — a native
 * jump would land in the wrong place, because the content is moved with
 * transforms rather than by the browser.
 */
export function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return false;
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(target, true, HEADER_OFFSET);
  else target.scrollIntoView({ behavior: "smooth" });
  return true;
}

/**
 * The template's smooth scroll (GSAP ScrollSmoother, same settings). Anything
 * `position: fixed` — header, chat buttons, dialogs — must render outside this
 * wrapper, or it would scroll with the content.
 *
 * Uses a layout effect on purpose: children set up their ScrollTriggers in
 * passive effects, which run after this, so the smoother always exists first.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = reduced
      ? null
      : ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.35,
          effects: true,
          smoothTouch: 0.1,
          ignoreMobileResize: true,
        });

    // Same-page anchor links ("#work", or "/#work" while on the home page).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest("a");
      const href = link?.getAttribute("href");
      if (!href) return;
      const hash = href.startsWith("#") ? href : pathname === "/" && href.startsWith("/#") ? href.slice(1) : null;
      if (!hash || hash === "#") return;
      if (!document.querySelector(hash)) return;
      e.preventDefault();
      history.replaceState(null, "", hash);
      // Let an open menu release its scroll lock first.
      requestAnimationFrame(() => scrollToHash(hash));
    };
    document.addEventListener("click", onClick, true);

    // Arriving with a hash, e.g. "Back to work" from a case study.
    let arrival: number | undefined;
    if (window.location.hash) {
      const hash = window.location.hash;
      arrival = window.setTimeout(() => {
        ScrollTrigger.refresh();
        scrollToHash(hash);
      }, 150);
    }

    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(arrival);
      smoother?.kill();
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
