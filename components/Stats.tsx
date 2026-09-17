"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { stats } from "@/lib/site";

/**
 * "Numbers that Speak Volumes" — a tall parallax banner, then counters that
 * run up once when the block scrolls into view.
 */

const asides = ["[ Nice! ]", "[ Holy Moly! ]", "[ Ho Ho! ]", "[ Still going ]"];

/** Splits "2 yrs" into 2 and " yrs" so only the number animates. */
function splitValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] };
}

function Counter({ value, run }: { value: string; run: boolean }) {
  const { target, suffix } = splitValue(value);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run || target === 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(target);
      return;
    }

    const duration = 1400;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic — fast start, gentle landing
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  return (
    <span className="display block text-[length:var(--text-huge)] font-medium text-ink">
      {target === 0 ? value : `${n}${suffix}`}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="pb-[clamp(6rem,14vw,12.5rem)]">
      <div className="relative h-[clamp(320px,55vw,800px)] overflow-hidden">
        <Image
          src="/tpl/project/project-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-[#0a1128]/10" />
      </div>

      <div className="container-mid">
        <div className="grid gap-8 pt-[clamp(3.5rem,9vw,8.75rem)] pb-[clamp(2.5rem,6vw,5.625rem)] lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4">Fun Facts</p>
            <h2 className="display text-[length:var(--text-section)] font-light text-ink">
              Numbers that Speak Volumes
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink/60">
            We are a small team of designers and engineers who would rather ship
            than pitch. Every number below is work we did ourselves, for clients
            who are still with us.
          </p>
        </div>

        <div ref={ref}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="mb-10 border-b border-border pb-6 lg:ml-auto lg:w-1/2 lg:px-[25px]"
            >
              <div className="flex items-center gap-6">
                <div className="min-w-[4ch] lg:min-w-[380px]">
                  <Counter value={stat.value} run={run} />
                </div>
                <div>
                  <span className="text-sm font-medium text-ink/50">
                    {asides[i % asides.length]}
                  </span>
                  <h3 className="display text-[clamp(1.5rem,3vw,2.875rem)] font-light leading-tight text-ink">
                    {stat.label}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
