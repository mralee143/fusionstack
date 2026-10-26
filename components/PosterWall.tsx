import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * Card / hero art for a project with `sections`: its portrait posters in
 * tilted columns that drift up and down in opposite directions, endlessly,
 * over a dark backdrop. Pure CSS animation — it pauses for reduced motion.
 * Phones show the first three columns.
 */

/** Portrait pieces (posters, ads) — presentations and wide mockups are skipped. */
export function posterImages(sections: NonNullable<Project["sections"]>) {
  return sections
    .flatMap((s) => s.images)
    .filter((im) => im.h / im.w >= 1.1 && im.h / im.w <= 1.7)
    .map((im) => im.src);
}

const COLUMNS = 5;
/** Posters per column — enough to fill the loop without loading the whole portfolio. */
const PER_COLUMN = 4;

export default function PosterWall({ images, priority = false }: { images: string[]; priority?: boolean }) {
  // Spread picks across the whole list (not just the first few), then deal
  // them round-robin so neighbouring columns differ.
  const step = Math.max(1, images.length / (COLUMNS * PER_COLUMN));
  const picked = Array.from({ length: Math.min(images.length, COLUMNS * PER_COLUMN) }, (_, i) => images[Math.floor(i * step)]);
  const columns = Array.from({ length: COLUMNS }, (_, c) => picked.filter((_, i) => i % COLUMNS === c));

  return (
    <div aria-hidden data-anim className="absolute inset-0 overflow-hidden bg-[#070b1a]">
      <div className="poster-wall absolute -inset-x-[10%] -inset-y-1/4 flex gap-3 sm:gap-4">
        {columns.map((col, c) => (
          <div key={c} className={`flex-1 ${c >= 3 ? "hidden sm:block" : ""}`}>
            <div
              className="poster-col flex flex-col gap-3 sm:gap-4"
              style={{
                animationDuration: `${38 + c * 6}s`,
                animationDirection: c % 2 ? "reverse" : "normal",
              }}
            >
              {/* Twice over, so the loop has no seam. */}
              {[...col, ...col].map((src, i) => (
                <div key={`${src}-${i}`} className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt=""
                    fill
                    priority={priority && i < 2}
                    sizes="(min-width: 640px) 20vw, 34vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Edge fade + vignette keep the title on top readable. */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_55%,transparent,rgba(7,11,26,0.85))]" />
    </div>
  );
}
