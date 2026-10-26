import Image from "next/image";
import Link from "next/link";
import WorkStack from "./WorkStack";
import DeviceCollage from "./DeviceCollage";
import PosterWall, { posterImages } from "./PosterWall";
import ServiceBanner from "./ServiceBanner";
import { projects, frameArt as frame } from "@/lib/projects";

/**
 * Portfolio: full-bleed rounded stills with the client name set oversized
 * across the bottom of each frame, category and year pinned to the corners.
 *
 * The frame art currently comes from public/tpl/portfolio/. To use a project's
 * own artwork instead, swap `frame(i)` below for `project.cover`.
 */

export default function Work() {
  return (
    <section id="work" className="scroll-mt-28 pb-[clamp(3rem,6vw,5rem)]">
      <div className="container-wide">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Selected Work</p>
            <h2 className="display text-[length:var(--text-section)] font-light text-ink">
              Projects we put our name on
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/50">
            Websites and apps, branding and design, automation, video and
            marketing, designed, built and handed over by one team.
          </p>
        </div>

        <WorkStack>
          {projects.map((project, i) => (
            // Later cards stack over earlier ones, so they need a higher z-index.
            <div key={project.slug} data-stack-card className="relative" style={{ zIndex: i + 1 }}>
              <Link
                href={`/work/${project.slug}`}
                className="group relative block overflow-hidden rounded-[var(--radius-card)]"
              >
                {/* Capped to the screen so a pinned card never hangs off the bottom. */}
                <div className="relative aspect-[4/5] max-h-[calc(100svh-120px)] w-full sm:aspect-[16/10] xl:aspect-[16/8]">
                  {project.showcase?.length ? (
                    // Live sites: every one at once, as floating browser windows.
                    <DeviceCollage sites={project.showcase} />
                  ) : project.banner ? (
                    <ServiceBanner kind={project.banner} />
                  ) : project.sections?.length ? (
                    // Portfolio pieces: a moving wall of posters.
                    <PosterWall images={posterImages(project.sections)} />
                  ) : (
                    <Image
                      src={frame(i)}
                      alt={`${project.client} — ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.03]"
                    />
                  )}
                  {/* Keeps the oversized title legible over any artwork. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128]/80 via-[#0a1128]/10 to-[#0a1128]/30" />
                </div>

                <div className="absolute left-5 right-24 top-5 flex flex-wrap gap-2 sm:left-[50px] sm:right-[160px] sm:top-[45px]">
                  <span className="tag-on-image">{project.category}</span>
                </div>
                <div className="absolute right-5 top-5 sm:right-[50px] sm:top-[45px]">
                  <span className="tag-on-image">{project.year}</span>
                </div>

                <div className="absolute inset-x-0 bottom-6 px-5 text-center sm:bottom-[50px]">
                  <h3 className="display text-[clamp(2.25rem,8.5vw,8.75rem)] font-semibold text-white">
                    {project.client}
                  </h3>
                  <p className="mt-2 text-sm text-white/75 sm:text-base">{project.title}</p>
                </div>

                {/* Darkens the card as the next one stacks over it (WorkStack). */}
                <div
                  aria-hidden
                  data-stack-shade
                  className="pointer-events-none absolute inset-0 bg-[#070b1a] opacity-0"
                />
              </Link>
            </div>
          ))}
        </WorkStack>
      </div>
    </section>
  );
}
