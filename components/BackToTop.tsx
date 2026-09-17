"use client";

import { useEffect, useState } from "react";

/** Appears after the first screen; returns to the top. */
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 left-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-white/90 text-ink backdrop-blur transition-all duration-300 hover:bg-ink hover:text-white ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden>
        <path
          d="M11 6 6 1 1 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
