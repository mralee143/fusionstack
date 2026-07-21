"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { services } from "@/lib/site";

/** One distinct colour per stacked card. */
const cardBg = [
  "#0b2a5b",
  "#1e56e3",
  "#F26522",
  "#0a1128",
  "#0e5a4f",
  "#3a2b6b",
] as const;

function ServiceCard({
  service,
  i,
  total,
  progress,
  bg,
}: {
  service: (typeof services)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
  bg: string;
}) {
  // Cards below the top of the stack shrink slightly as the next one arrives.
  const targetScale = 1 - (total - i) * 0.03;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{ scale, top: `${i * 26}px`, backgroundColor: bg }}
        className="relative flex h-[80vh] w-[92%] max-w-5xl overflow-hidden rounded-[32px] text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] lg:h-screen lg:w-full lg:max-w-none lg:rounded-none"
      >
        <div className="container-x flex h-full w-full flex-col justify-between py-8 sm:py-12 lg:py-16">
        <div className="flex items-center justify-between text-sm text-white/70">
          <span className="font-medium uppercase tracking-[0.2em]">Service</span>
          <span className="tabular-nums">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div>
          <h3 className="text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight">
            {service.title}
          </h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {service.summary}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {service.points.map((point) => (
              <li
                key={point}
                className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Work() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="relative scroll-mt-24 py-20">
      <div className="container-x">
        <p className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-accent">
          <span aria-hidden className="h-2 w-2 bg-accent" />
          Portfolio
        </p>
      </div>

      <div ref={container} className="relative mt-8">
        {services.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            i={i}
            total={services.length}
            progress={scrollYProgress}
            bg={cardBg[i % cardBg.length]}
          />
        ))}
      </div>
    </section>
  );
}
