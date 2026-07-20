"use client";

import { motion } from "framer-motion";
import { Users, Zap, ShieldCheck, LineChart } from "lucide-react";
import Reveal, { RevealItem } from "./Reveal";
import { values } from "@/lib/site";

const icons = {
  users: Users,
  zap: Zap,
  shield: ShieldCheck,
  chart: LineChart,
} as const;

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-28">
      <div className="container-x">
        {/* Editorial intro — heading + narrative */}
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-foreground">
            <span aria-hidden className="h-px w-8 bg-foreground/40" />
            About us
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            One team, one stack, one accountable outcome.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/70">
            Fusion Stack was built on a simple idea: design, engineering and
            automation shouldn&apos;t live in separate buildings. The people who
            design your product are the people who ship it — and the people who
            keep it running.
          </p>
        </Reveal>

        {/* Value cards — numbered, flat black */}
        <Reveal stagger className="mt-16 grid gap-6 md:grid-cols-2">
          {values.map((value, i) => {
            const Icon = icons[value.icon];
            return (
              <RevealItem key={value.title}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group h-full rounded-[var(--radius-card)] border border-border p-8 transition-colors duration-300 hover:border-foreground/30"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border text-foreground">
                      <Icon size={24} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="select-none text-5xl font-bold tabular-nums text-foreground/10 sm:text-6xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    {value.body}
                  </p>
                </motion.article>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
