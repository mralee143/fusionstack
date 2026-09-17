import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/**
 * Browser and phone mockups for the live-site showcase on a case-study page.
 * Both are pure CSS frames — no mockup images to ship — and both scale down to
 * a phone screen: the browser frame keeps its 16:10 ratio at any width, and the
 * phone frame is capped by `max-w` rather than a fixed pixel size.
 */

/** Desktop screenshot inside a browser window. The whole frame opens the site. */
export function BrowserFrame({
  src,
  url,
  label,
}: {
  src: string;
  url: string;
  label: string;
}) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label} in a new tab`}
      className="group block overflow-hidden rounded-2xl border border-white/15 bg-[#0d1726] shadow-2xl shadow-black/40 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 focus-visible:-translate-y-1"
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="mx-auto max-w-[70%] truncate rounded-full bg-white/[0.07] px-3 py-1 text-[11px] text-white/50">
          {host}
        </span>
        <ArrowUpRight
          size={14}
          aria-hidden
          className="hidden shrink-0 text-white/30 transition-colors duration-300 group-hover:text-accent sm:block"
        />
      </div>

      {/* Screenshot */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
        <Image
          src={src}
          alt={`${label} website`}
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        />

        {/* Hover cue */}
        <div className="absolute inset-0 grid place-items-center bg-[#060f18]/0 transition-colors duration-500 group-hover:bg-[#060f18]/35">
          <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white opacity-0 shadow-lg shadow-accent/30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            Open website
            <ArrowUpRight size={16} aria-hidden />
          </span>
        </div>
      </div>
    </a>
  );
}

/** Mobile screenshot inside a phone body. `className` sets the width. */
export function PhoneFrame({
  src,
  label,
  className = "mx-auto w-full max-w-[190px] sm:max-w-[220px]",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative rounded-[2rem] border-[6px] border-[#11161f] bg-[#11161f] shadow-2xl shadow-black/50 ring-1 ring-white/10">
        {/* Notch */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1.5 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/70"
        />
        <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[1.6rem] bg-white">
          <Image
            src={src}
            alt={`${label} on mobile`}
            fill
            sizes="240px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
