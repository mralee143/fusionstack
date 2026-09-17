"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "./Marquee";
import { services } from "@/lib/site";

/**
 * Services as oversized scrolling type. Each row sits at 10% opacity until you
 * hover it, when it lifts to full ink and a shape follows the cursor —
 * the reveal interaction from the reference template.
 */

const shapes = [
  "/tpl/shape/shape-1.png",
  "/tpl/shape/shape-3.png",
  "/tpl/shape/shape-2.png",
  "/tpl/shape/shape-4.png",
];

function ServiceRow({
  title,
  shape,
  reverse,
}: {
  title: string;
  shape: string;
  reverse: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={rowRef}
      onPointerMove={(e) => {
        const box = rowRef.current?.getBoundingClientRect();
        if (!box) return;
        setPointer({ x: e.clientX - box.left, y: e.clientY - box.top });
      }}
      onPointerLeave={() => setPointer(null)}
      className="group relative"
    >
      <Link href="#contact" aria-label={`${title} — start a project`} className="block">
        <Marquee duration={reverse ? 26 : 22} reverse={reverse}>
          {[0, 1, 2, 3].map((n) => (
            <span
              key={n}
              className="display whitespace-nowrap pr-[0.4em] text-[length:var(--text-marquee-sm)] font-light text-ink/10 transition-colors duration-300 group-hover:text-ink"
            >
              {title}
            </span>
          ))}
        </Marquee>
      </Link>

      {/* Cursor-following shape. Hidden on touch, where there is no hover. */}
      {pointer && (
        <div
          aria-hidden
          style={{ left: pointer.x, top: pointer.y }}
          className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <Image
            src={shape}
            alt=""
            width={260}
            height={260}
            className="h-[180px] w-[180px] object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      )}
    </div>
  );
}

function Label({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <div className="relative z-10 text-center">
      <span
        className={`display inline-block bg-background px-[clamp(1.5rem,6vw,4.375rem)] text-ink ${
          small ? "text-[clamp(1.25rem,2.4vw,2rem)]" : "text-[length:var(--text-section)]"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-[1] scroll-mt-28 pt-[clamp(5rem,14vw,12.5rem)] pb-[clamp(3rem,6vw,3.75rem)]"
    >
      <div className="text-center">
        <Label text="We can help you with" />
        <p className="mt-3 text-sm text-ink/50">
          Six disciplines, handled by one accountable team
        </p>
      </div>

      <div className="mt-8 space-y-[clamp(1rem,3vw,2.5rem)]">
        {services.map((service, i) => (
          <div key={service.id}>
            {i > 0 && <Label text="Click to start a project" small />}
            <ServiceRow
              title={service.title}
              shape={shapes[i % shapes.length]}
              reverse={i % 2 === 1}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
