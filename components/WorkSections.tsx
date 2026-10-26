import Image from "next/image";
import Reveal from "./Reveal";
import type { Project } from "@/lib/projects";

/**
 * A project's work as numbered steps (01 Brand Identity → 02 … ), each a
 * masonry of its images at their natural proportions. Very long presentation
 * images sit in a scrollable frame so they don't take over the page. Every
 * image opens full size in a new tab.
 */
export default function WorkSections({
  sections,
  name,
}: {
  sections: NonNullable<Project["sections"]>;
  name: string;
}) {
  return (
    <section className="pb-[clamp(4rem,10vw,8rem)]">
      {/* Step index */}
      <nav aria-label="Sections" className="container-mid mb-14">
        <ol className="flex flex-wrap gap-2">
          {sections.map((s, i) => (
            <li key={s.title}>
              <a
                href={`#step-${i + 1}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-ink/70 transition-colors duration-300 hover:border-ink/40 hover:text-ink"
              >
                <span className="text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="container-mid space-y-[clamp(4rem,9vw,7rem)]">
        {sections.map((s, i) => (
          <div key={s.title} id={`step-${i + 1}`} className="scroll-mt-28">
            <Reveal className="mb-10 flex flex-col gap-6 border-t border-ink/15 pt-8 lg:flex-row lg:items-end lg:gap-14">
              {/* Oversized outlined step number */}
              <span
                aria-hidden
                className="display shrink-0 text-[clamp(5rem,13vw,11rem)] font-semibold leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--color-accent)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <span className="eyebrow">
                  Step {String(i + 1).padStart(2, "0")} · {s.images.length} piece
                  {s.images.length === 1 ? "" : "s"}
                </span>
                <h2 className="display mt-2 text-[clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.02] text-ink">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/60">{s.blurb}</p>
              </div>
            </Reveal>

            <div className="gap-4 [column-fill:_balance] columns-1 sm:columns-2 lg:columns-3">
              {s.images.map((im, n) => {
                const tall = im.h / im.w > 2.2;
                const alt = `${name} — ${s.title} ${n + 1}`;
                return (
                  <a
                    key={im.src}
                    href={im.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${alt} (open full size)`}
                    className="group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-border bg-surface"
                  >
                    {tall ? (
                      // Long presentations: scroll inside a portrait frame.
                      <div
                        className="aspect-[4/5] overflow-y-auto overscroll-contain"
                      >
                        <Image
                          src={im.src}
                          alt={alt}
                          width={im.w}
                          height={im.h}
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          className="h-auto w-full"
                        />
                      </div>
                    ) : (
                      <Image
                        src={im.src}
                        alt={alt}
                        width={im.w}
                        height={im.h}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="h-auto w-full transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.02]"
                      />
                    )}
                    {tall && (
                      <span className="block border-t border-border px-4 py-2 text-xs text-ink/45">
                        Scroll to see the full presentation
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
