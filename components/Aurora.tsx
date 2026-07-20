"use client";

/**
 * Animated gradient-mesh backdrop: five oversized, heavily-blurred colour fields
 * drifting on independent loops. Only `transform` is animated (never width/height
 * or filter), so it stays on the compositor and costs nothing per frame.
 *
 * Blur this heavy is expensive to repaint, so the blobs are painted once and only
 * moved — and `prefers-reduced-motion` (handled globally in globals.css) freezes
 * them into a still gradient rather than removing the colour.
 */
export default function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      <span className="aurora-blob aurora-1" />
      <span className="aurora-blob aurora-2" />
      <span className="aurora-blob aurora-3" />
      <span className="aurora-blob aurora-4" />
      <span className="aurora-blob aurora-5" />
      <span className="aurora-grain" />
    </div>
  );
}
