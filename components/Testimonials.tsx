"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { testimonials } from "@/lib/site";

/**
 * Same minimal, black-text treatment as the FAQ section — only the box SHAPE
 * changes between cards. `layout` picks a quote card or a centered profile card.
 */
const STYLES = [
  { layout: "quote" as const, shape: "rounded-[32px]" }, // big soft radius
  { layout: "profile" as const, shape: "rounded-none" }, // sharp rectangle
  {
    layout: "quote" as const,
    shape: "rounded-tl-[48px] rounded-br-[48px] rounded-tr-lg rounded-bl-lg",
  }, // asymmetric leaf
  { layout: "profile" as const, shape: "rounded-3xl rounded-br-none" }, // cut corner
  { layout: "quote" as const, shape: "rounded-2xl" }, // moderate radius
];

export default function Testimonials() {
  // Duplicate the list so the marquee can loop seamlessly (shifts by -50%).
  const loop = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="scroll-mt-24 py-28">
      <div className="container-x">
        <p className="mb-16 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-accent">
          <span aria-hidden className="h-2 w-2 bg-accent" />
          Testimonials
        </p>
      </div>

      <Reveal delay={0.1} className="logo-track-mask overflow-hidden">
        <ul className="testi-track">
          {loop.map((t, i) => {
            // Shape by base index so both marquee copies match (seamless loop).
            const base = i % testimonials.length;
            const s = STYLES[base % STYLES.length];
            const hidden = i >= testimonials.length;
            const card = `flex h-full flex-col border border-border bg-transparent p-8 ${s.shape}`;

            if (s.layout === "profile") {
              return (
                <li key={`${t.name}-${i}`} aria-hidden={hidden} className="w-[300px] shrink-0">
                  <figure className={`${card} items-center text-center`}>
                    <figcaption className="text-sm font-semibold text-foreground">
                      {t.headline}
                    </figcaption>
                    <Image
                      src={t.avatar}
                      alt=""
                      width={72}
                      height={72}
                      className="mt-6 h-16 w-16 rounded-full object-cover ring-1 ring-border"
                    />
                    <p className="mt-5 text-base font-semibold text-foreground">{t.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
                  </figure>
                </li>
              );
            }

            return (
              <li
                key={`${t.name}-${i}`}
                aria-hidden={hidden}
                className="w-[420px] shrink-0 sm:w-[440px]"
              >
                <figure className={card}>
                  <figcaption className="text-sm font-semibold text-foreground">
                    {t.headline}
                  </figcaption>
                  <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-8 flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-border"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </figure>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
