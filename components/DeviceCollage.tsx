"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";

/**
 * Card art for a project with live sites: every site at once, as browser
 * windows floating in layers over a dark branded backdrop. Each window drifts
 * on its own loop, the stack follows the pointer with depth, and hovering the
 * card fans the windows apart.
 *
 * Positions are percentages of the card. `m*` values are the portrait
 * (phone) layout, the rest are used from `sm` up.
 */

type Site = { name: string; url: string; desktop: string };

type Slot = {
  x: number; y: number; w: number; r: number; // desktop: left, top, width (%), rotation (deg)
  mx: number; my: number; mw: number; mr: number; // phone
  z: number; // stacking order, also parallax depth
  sx: number; sy: number; // fan-out on hover (px)
};

const SLOTS: Slot[] = [
  { x: 3, y: 26, w: 33, r: -8, mx: -8, my: 4, mw: 62, mr: -7, z: 1, sx: -28, sy: 10 },
  { x: 18, y: 7, w: 33, r: -3, mx: 44, my: 6, mw: 62, mr: 6, z: 2, sx: -16, sy: -14 },
  { x: 33, y: 20, w: 36, r: 0, mx: 12, my: 18, mw: 76, mr: 0, z: 5, sx: 0, sy: -6 },
  { x: 59, y: 5, w: 32, r: 5, mx: -6, my: 36, mw: 60, mr: -5, z: 3, sx: 18, sy: -14 },
  { x: 66, y: 29, w: 31, r: 9, mx: 46, my: 38, mw: 60, mr: 7, z: 4, sx: 28, sy: 10 },
];

/** Slot for each site, in showcase order — Best Forex (2nd) takes the centre. */
const ORDER = [1, 2, 3, 4, 0];

export default function DeviceCollage({ sites }: { sites: Site[] }) {
  const ref = useRef<HTMLDivElement>(null);

  // Pointer position as -1…1 on each axis, read by the windows in CSS.
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--px", String(((e.clientX - box.left) / box.width) * 2 - 1));
    ref.current.style.setProperty("--py", String(((e.clientY - box.top) / box.height) * 2 - 1));
  }

  function onLeave() {
    ref.current?.style.setProperty("--px", "0");
    ref.current?.style.setProperty("--py", "0");
  }

  const placed = sites.slice(0, SLOTS.length).map((site, i) => ({
    site,
    slot: SLOTS[ORDER[i] ?? i],
  }));

  return (
    <div
      ref={ref}
      data-anim
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="collage absolute inset-0 isolate overflow-hidden bg-[#0a1128]"
    >
      {/* Backdrop: brand glow + faint grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 30%, rgba(30,86,227,0.55), transparent 70%), radial-gradient(40% 50% at 90% 90%, rgba(242,101,34,0.25), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {placed.map(({ site, slot }, i) => (
        <div
          key={site.url}
          className="collage-slot absolute transition-[translate] duration-700 ease-[var(--ease-brand)]"
          style={
            {
              "--x": `${slot.x}%`, "--y": `${slot.y}%`, "--w": `${slot.w}%`, "--r": `${slot.r}deg`,
              "--mx": `${slot.mx}%`, "--my": `${slot.my}%`, "--mw": `${slot.mw}%`, "--mr": `${slot.mr}deg`,
              "--sx": `${slot.sx}px`, "--sy": `${slot.sy}px`,
              "--depth": slot.z,
              zIndex: slot.z,
            } as CSSProperties
          }
        >
          {/* Drift loop, offset per window so they never move in step */}
          <div className="collage-drift" style={{ animationDelay: `${i * -1.3}s` }}>
            {/* Pointer parallax — nearer windows move more */}
            <div className="collage-parallax overflow-hidden rounded-[10px] border border-white/15 bg-[#0d1726] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-1.5" aria-hidden>
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 truncate text-[9px] text-white/45 sm:text-[10px]">
                  {site.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </span>
              </div>
              <div className="relative aspect-[16/10] bg-white">
                <Image
                  src={site.desktop}
                  alt={`${site.name} website`}
                  fill
                  sizes="(min-width: 640px) 36vw, 74vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
