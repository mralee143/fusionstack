import type { CSSProperties, ReactNode } from "react";

/**
 * Seamless horizontal loop. The track holds the children twice and slides
 * exactly -50%, so the second copy lands where the first started. The copy is
 * aria-hidden so screen readers only ever announce the content once.
 */
export default function Marquee({
  children,
  reverse = false,
  duration = 30,
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div data-anim className={`overflow-hidden ${className}`}>
      <div
        className={`marquee ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
