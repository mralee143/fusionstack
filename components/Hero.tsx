"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import ShaderBackground from "./ShaderBackground";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease, delay },
});

const displayLine =
  "block text-[clamp(2rem,7vw,5rem)] font-bold leading-[0.9] tracking-tight";

/** The gradient headword cycles through these, in order, on a loop. */
const rotatingWords = ["Automation", "Development"] as const;

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % rotatingWords.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={rotatingWords[index]}
          className="text-gradient inline-block"
          initial={{ opacity: 0, y: "0.35em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.35em" }}
          transition={{ duration: 0.4, ease }}
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden"
    >
      {/* Animated shader background (Swirl → ChromaFlow → FlutedGlass → FilmGrain) */}
      <ShaderBackground />

      {/* 3D ring — centered above the headline, floating + spinning */}
      <div className="hero-ring-3d" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-ring.png" alt="" className="hero-ring-3d-img" />
      </div>

      {/* Content */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-24 pt-24 sm:pb-32 sm:pt-28">
       <div className="mx-auto w-full max-w-5xl">
        {/* Kicker + meta — stacked on mobile, spread on desktop */}
        <div className="mb-3 flex flex-col gap-3 sm:mb-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <motion.p
            {...rise(0.05)}
            className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-gray-900"
          >
            <span aria-hidden className="h-2.5 w-2.5 bg-gray-900" />
            Digital Product Studio
          </motion.p>

          <motion.div {...rise(0.15)} className="max-w-xs text-left lg:text-right">
            <p className="text-sm leading-relaxed text-gray-600">
              {site.name} builds digital products &amp; automation for modern brands.
            </p>
          </motion.div>
        </div>

        {/* Display headline — stacks left on mobile, spreads on desktop */}
        <div className="relative flex flex-col">
          <motion.h1 {...rise(0.1)} className="relative z-[2] self-start">
            <span className={`${displayLine} text-gray-900`}>Digital Products</span>
          </motion.h1>

          <motion.div {...rise(0.2)} className="relative z-[2] self-start sm:self-end">
            <span className={displayLine}>
              <span className="text-gray-500">&amp; </span>
              <RotatingWord />
            </span>
          </motion.div>
        </div>
       </div>

      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        {...rise(0.5)}
        aria-label="Scroll down to services"
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit cursor-pointer flex-col items-center"
      >
        <span className="hero-scroll">
          <span className="hero-scroll-dot" aria-hidden />
          <span className="hero-scroll-line" aria-hidden />
          <span className="text-sm font-medium text-accent">Scroll Down</span>
        </span>
      </motion.a>
    </section>
  );
}
