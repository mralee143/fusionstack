import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiGoogleplay, SiAppstore } from "react-icons/si";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import BackToTop from "@/components/BackToTop";
import { BrowserFrame, PhoneFrame } from "@/components/ShowcaseFrames";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import SmoothScroll from "@/components/SmoothScroll";
import { projects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

/** One route per project in lib/projects.ts, all static. */
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: `Project not found — ${site.name}` };
  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary,
  };
}

/** Matches the frame art used for this project's card on the home page. */
const frame = (i: number) => `/tpl/portfolio/portfolio-${(i % 6) + 1}.jpg`;

function MetaItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-5">
      <p className="eyebrow mb-3">{label}</p>
      <div className="text-sm leading-relaxed text-ink/70">{children}</div>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const showcase = project.showcase ?? [];
  const narrative = [
    { label: "Overview", body: project.overview },
    { label: "The challenge", body: project.challenge },
    { label: "What we did", body: project.solution },
  ].filter((block) => block.body);

  return (
    <>
      <Header />

      <SmoothScroll>
        <main id="main">
          {/* Hero ------------------------------------------------------------ */}
          <section className="pt-[clamp(8rem,16vw,11rem)] pb-[clamp(2.5rem,6vw,4rem)]">
            <div className="container-mid">
              <Link
                href="/#work"
                className="group inline-flex w-fit items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink"
              >
                <ArrowLeft
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                Back to work
              </Link>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="tag">{project.category}</span>
                <span className="tag">{project.year}</span>
              </div>

              <h1 className="display mt-6 text-[clamp(3rem,11vw,10rem)] font-semibold text-ink">
                {project.client}
              </h1>
              <p className="display mt-2 text-[clamp(1.5rem,3.4vw,2.875rem)] font-light text-ink/70">
                {project.title}
              </p>

              {project.summary && (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/50 sm:text-lg">
                  {project.summary}
                </p>
              )}
            </div>
          </section>

          {/* Key image ------------------------------------------------------- */}
          <section className="pb-[clamp(3rem,7vw,5rem)]">
            <div className="container-mid">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[16/9]">
                <Image
                  src={frame(index)}
                  alt={`${project.client} — ${project.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Meta strip ------------------------------------------------------ */}
          <section className="pb-[clamp(3rem,8vw,6rem)]">
            <div className="container-mid grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <MetaItem label="Services">
                <ul className="space-y-1">
                  {project.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </MetaItem>
              <MetaItem label="Stack">
                <ul className="space-y-1">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </MetaItem>
              <MetaItem label="Duration">{project.duration}</MetaItem>
              <MetaItem label="Status">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line inline-flex items-center gap-1 text-ink"
                  >
                    Visit site
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                ) : (
                  "Delivered and handed over"
                )}
              </MetaItem>
            </div>
          </section>

          {/* Narrative ------------------------------------------------------- */}
          {narrative.length > 0 && (
            <section className="pb-[clamp(3rem,8vw,6rem)]">
              <div className="container-mid space-y-12">
                {narrative.map((block) => (
                  <Reveal
                    key={block.label}
                    className="grid gap-4 lg:grid-cols-[280px_1fr] lg:gap-14"
                  >
                    <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)] font-light text-ink">
                      {block.label}
                    </h2>
                    <p className="max-w-3xl text-base leading-relaxed text-ink/60 sm:text-lg">
                      {block.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Results --------------------------------------------------------- */}
          {project.results.length > 0 && (
            <section className="pb-[clamp(3rem,8vw,6rem)]">
              <div className="container-mid grid gap-px border-t border-border sm:grid-cols-3">
                {project.results.map((result) => (
                  <div
                    key={result.label}
                    className="border-b border-border py-8 sm:border-b-0"
                  >
                    <span className="display block text-[clamp(2.5rem,6vw,5rem)] font-medium text-ink">
                      {result.value}
                    </span>
                    <p className="mt-2 text-sm text-ink/50">{result.label}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery --------------------------------------------------------- */}
          {project.gallery.length > 0 && (
            <section className="pb-[clamp(3rem,8vw,6rem)]">
              <div className="container-mid space-y-[30px]">
                {project.gallery.map((src, i) => (
                  <Reveal key={src}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]">
                      <Image
                        src={src}
                        alt={`${project.title} — image ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Live work ------------------------------------------------------- */}
          {showcase.length > 0 && (
            <section className="pb-[clamp(4rem,10vw,8rem)]">
              <div className="container-mid space-y-20 lg:space-y-28">
                {showcase.map((item, i) => (
                  <Reveal
                    key={item.url}
                    className="border-t border-border pt-12 lg:pt-16"
                  >
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14">
                      <div>
                        <BrowserFrame
                          src={item.desktop}
                          url={item.url}
                          label={item.name}
                        />
                      </div>

                      <div>
                        <span className="eyebrow">
                          {String(i + 1).padStart(2, "0")} · {item.kind}
                        </span>
                        <h2 className="display mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-light text-ink">
                          {item.name}
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-ink/50 sm:text-base">
                          {item.blurb}
                        </p>

                        <ul className="mt-6 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <li key={tag} className="tag normal-case">
                              {tag}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-3">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
                          >
                            Visit website
                            <ArrowUpRight size={16} aria-hidden />
                          </a>

                          {item.stores?.android && (
                            <a
                              href={item.stores.android}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-ink/80 transition-colors duration-300 hover:border-ink/40 hover:text-ink"
                            >
                              <SiGoogleplay size={15} aria-hidden />
                              Google Play
                            </a>
                          )}

                          {item.stores?.ios && (
                            <a
                              href={item.stores.ios}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-ink/80 transition-colors duration-300 hover:border-ink/40 hover:text-ink"
                            >
                              <SiAppstore size={15} aria-hidden />
                              App Store
                            </a>
                          )}
                        </div>

                        {/* Website on mobile — only when the project has no app of its own */}
                        {!item.appScreens?.length && (
                          <div className="mt-10 flex flex-col gap-5 min-[420px]:flex-row min-[420px]:items-end">
                            <PhoneFrame src={item.mobile} label={item.name} />
                            <p className="max-w-[15rem] text-xs leading-relaxed text-ink/40 min-[420px]:pb-3">
                              Built responsive — the same site, rebuilt for the
                              phone rather than shrunk onto it.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* The mobile app itself — real screens, side by side */}
                    {item.appScreens && item.appScreens.length > 0 && (
                      <div className="mt-14">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <h3 className="eyebrow">The mobile app</h3>
                          <p className="text-xs text-ink/40">
                            iOS &amp; Android · built by us
                          </p>
                        </div>

                        {/*
                         * Scrolls sideways on a phone, lays the screens out evenly
                         * from small tablets up.
                         */}
                        <ul className="-mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-5">
                          {item.appScreens.map((screen, screenIndex) => (
                            <li
                              key={screen}
                              className="w-[150px] shrink-0 snap-center sm:w-auto"
                            >
                              <PhoneFrame
                                src={screen}
                                label={`${item.name} app screen ${screenIndex + 1}`}
                                className="w-full"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Next project + CTA ---------------------------------------------- */}
          <section className="border-t border-border py-[clamp(3rem,8vw,6rem)]">
            <div className="container-mid flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="display max-w-lg text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight text-ink">
                Want something like this built for your business?
              </p>
              <Link href="/#contact" className="btn-border shrink-0">
                Start a project
                <Arrow />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </SmoothScroll>
      <FloatingActions />
      <BackToTop />
    </>
  );
}
