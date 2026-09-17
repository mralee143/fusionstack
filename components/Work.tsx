import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { projects } from "@/lib/projects";

/**
 * Portfolio: full-bleed rounded stills with the client name set oversized
 * across the bottom of each frame, category and year pinned to the corners.
 *
 * The frame art currently comes from public/tpl/portfolio/. To use a project's
 * own artwork instead, swap `frame(i)` below for `project.cover`.
 */
const frame = (i: number) => `/tpl/portfolio/portfolio-${(i % 6) + 1}.jpg`;

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
            Six engagements, one team. Every case study below was designed,
            built and handed over by the same people you would be talking to.
          </p>
        </div>

        <div className="space-y-[30px]">
          {projects.map((project, i) => (
            <Reveal key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group relative block overflow-hidden rounded-[var(--radius-card)]"
              >
                <div className="relative aspect-[4/5] sm:aspect-[16/10] xl:aspect-[16/8]">
                  <Image
                    src={frame(i)}
                    alt={`${project.client} — ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.03]"
                  />
                  {/* Keeps the oversized title legible over any artwork. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128]/80 via-[#0a1128]/10 to-[#0a1128]/30" />
                </div>

                <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-[50px] sm:top-[45px]">
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
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
