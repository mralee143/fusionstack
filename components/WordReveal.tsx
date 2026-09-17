"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Fades a paragraph in word by word once it enters the viewport. The words are
 * real text nodes in order, so selection and screen readers are unaffected.
 */
export default function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p ref={ref} className={`word-reveal ${shown ? "is-in" : ""} ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} style={{ "--i": i } as CSSProperties}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
