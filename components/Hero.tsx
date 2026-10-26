"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero, clientAvatars } from "@/lib/site";
import Arrow from "./Arrow";

/**
 * Hero, built 1:1 on the reference template's "tp-hero-2":
 *
 *  - The headline block and its backdrop are pinned while the column of
 *    rotated stills underneath scrolls up past it. The side stills pass over
 *    the headline; the blurred centre still passes behind it.
 *  - Subtitle, title, and the bottom row fade up on load at 0.3s / 0.5s / 0.7s
 *    (CSS, so they are never invisible while JavaScript loads).
 *  - Below 768px there is no pin and no stills, exactly as in the template.
 *
 * All sizes and offsets live in globals.css under "Hero".
 */

const boxes = [
  { one: "hero-1.jpg", two: "hero-2.jpg", three: "hero-3.png" },
  { one: "hero-4.jpg", two: "hero-5.jpg", three: "hero-3.png" },
  { one: "hero-6.jpg", two: "hero-7.jpg" },
];

/** Stills render at their natural size, as in the template. */
function Still({ file }: { file: string }) {
  const blurred = file.endsWith(".png");
  return (
    <Image
      src={`/tpl/hero/${file}`}
      alt=""
      width={blurred ? 301 : 200}
      height={blurred ? 301 : 230}
    />
  );
}

export default function Hero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Passive effect on purpose — SmoothScroll (a layout effect) must exist first.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // The backdrop is its own layer (see the markup), sized to the headline block.
    const wrapper = wrapperRef.current;
    const area = areaRef.current;
    let lastHeight = 0;
    const syncHeight = () => {
      const h = area?.offsetHeight ?? 0;
      if (!wrapper || h === lastHeight) return false;
      lastHeight = h;
      wrapper.style.setProperty("--hero-h", `${h}px`);
      return true;
    };
    syncHeight();
    const resize = new ResizeObserver(() => {
      if (syncHeight()) ScrollTrigger.refresh();
    });
    if (area) resize.observe(area);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          const { motion, desktop } = context.conditions as Record<string, boolean>;
          if (!motion || !desktop) return;

          // Backdrop and headline are pinned with identical settings, so they
          // move as one while the blurred still passes between them.
          [bgRef.current, areaRef.current].forEach((pin) =>
            ScrollTrigger.create({
              trigger: wrapperRef.current,
              pin,
              scrub: 1,
              start: "top 0",
              end: "bottom 0%",
              endTrigger: wrapperRef.current,
              pinSpacing: false,
            }),
          );
        },
      );
    }, wrapperRef);

    return () => {
      resize.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section id="top" ref={wrapperRef} className="hero-wrapper">
        {/*
         * Layer order, bottom to top: backdrop (0) → blurred centre still (1)
         * → headline (2) → side stills (3). The backdrop takes no space: it is
         * as tall as the headline block and pulls it back up over itself.
         */}
        <div ref={bgRef} aria-hidden className="hero-bg" />

        <div ref={areaRef} className="hero-area">
          <div className="hero-container">
            <div className="mb-[25px] text-center">
              <span className="tp-fade hero-subtitle" style={{ "--tp-delay": "0.3s" } as CSSProperties}>
                Design, engineering and automation <br /> for brands that intend to lead
              </span>
              <h1 className="tp-fade hero-title" style={{ "--tp-delay": "0.5s" } as CSSProperties}>
                Fusion Stack
              </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2">
                <div
                  className="tp-fade mb-[30px] flex items-center justify-center md:mb-0 md:justify-start"
                  style={{ "--tp-delay": "0.7s" } as CSSProperties}
                >
                  <div className="flex items-center">
                    {clientAvatars.slice(0, 3).map((a, i) => (
                      <Image
                        key={a.src}
                        src={a.src}
                        alt={a.alt}
                        width={100}
                        height={100}
                        className={`h-[50px] w-[50px] rounded-full border-[3px] border-white object-cover ${i > 0 ? "-ml-[18px]" : ""}`}
                      />
                    ))}
                    <span className="-ml-[18px] flex h-[50px] w-[50px] items-center justify-center rounded-full border-[3px] border-white bg-ink text-white">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </div>
                  <div className="ml-[10px] text-[16px] leading-[1.25] tracking-[-0.01em]">
                    <h4 className="font-bold text-ink">{hero.stat.value}</h4>
                    <span className="text-[15px] text-muted-foreground md:text-[16px]">
                      {hero.stat.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <div
                  className="tp-fade text-center md:text-right"
                  style={{ "--tp-delay": "0.7s" } as CSSProperties}
                >
                  <Link href={hero.secondaryCta.href} className="btn-border">
                    Explore Our Projects
                    <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden className="hero-img-wrap">
          <div className="hero-container hero-container-1230">
            {boxes.map((box, i) => (
              <div key={i} className={`hero-img-box ${i === boxes.length - 1 ? "is-last" : ""}`}>
                <div className="hero-img-1">
                  <Still file={box.one} />
                </div>
                <div className="hero-img-2">
                  <Still file={box.two} />
                </div>
                {box.three && (
                  <div className="hero-img-3">
                    <Still file={box.three} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
       * In the template the last box's 900px bottom margin collapses out of the
       * wrapper, so the pin ends 900px before the next section starts. This
       * spacer reproduces that gap explicitly.
       */}
      <div aria-hidden className="hero-tail" />
    </>
  );
}
