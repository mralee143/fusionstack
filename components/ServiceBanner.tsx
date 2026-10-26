import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Bot, CalendarCheck, Database, Mail, MessageCircle, Search, Send, Megaphone, BarChart3, Play, Film, Palette, Sparkles } from "lucide-react";

/**
 * Card / hero art for service projects: a laptop over a dark brand backdrop,
 * its screen showing the service as a working UI — a growth dashboard for
 * marketing, an automation workflow for AI automation. Built in HTML/CSS so
 * it stays sharp and is our own artwork. Screen text scales with the screen
 * (container query units), so it reads the same on a phone and a desktop.
 */

export type BannerKind = "marketing" | "automation" | "video";

function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="rounded-t-[1.4cqw] border-[0.9cqw] border-b-0 border-[#1b2233] bg-[#1b2233] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.5cqw] bg-white [container-type:inline-size]">
          {children}
        </div>
      </div>
      {/* Base */}
      <div className="relative mx-[-6%] h-[2.2cqw] rounded-b-[1.6cqw] bg-gradient-to-b from-[#c9d1df] to-[#8c96a8]">
        <span className="absolute left-1/2 top-0 h-[0.7cqw] w-[16%] -translate-x-1/2 rounded-b-[0.6cqw] bg-[#a3acbc]" />
      </div>
    </div>
  );
}

/* Marketing ----------------------------------------------------------------- */

/** Each tile shows a small trend line rather than a figure. */
const kpis = [
  { label: "Organic traffic", icon: Search, line: "0,20 15,17 30,18 45,12 60,10 75,6 90,3" },
  { label: "Leads", icon: Megaphone, line: "0,19 15,18 30,14 45,15 60,10 75,8 90,5" },
  { label: "Ad return", icon: BarChart3, line: "0,16 15,17 30,13 45,11 60,12 75,7 90,6" },
  { label: "Email opens", icon: Mail, line: "0,18 15,15 30,16 45,12 60,9 75,9 90,4" },
];

function MarketingScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f4f7fc] p-[2.4cqw] text-[#0a1128]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1cqw]">
          <span className="h-[2.4cqw] w-[2.4cqw] rounded-[0.6cqw] bg-[#1e56e3]" />
          <span className="text-[2.2cqw] font-semibold">Growth Dashboard</span>
        </div>
        <div className="flex gap-[0.8cqw] text-[1.5cqw]">
          {["SEO", "Ads", "Social", "Email"].map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-[1.3cqw] py-[0.4cqw] ${i === 0 ? "bg-[#1e56e3] text-white" : "bg-white text-[#0a1128]/60"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[2cqw] grid grid-cols-4 gap-[1.4cqw]">
        {kpis.map(({ label, icon: Icon, line }) => (
          <div key={label} className="rounded-[1cqw] bg-white p-[1.4cqw] shadow-sm">
            <Icon className="h-[2cqw] w-[2cqw] text-[#1e56e3]" aria-hidden />
            <p className="mt-[0.8cqw] text-[1.3cqw] text-[#0a1128]/50">{label}</p>
            <svg viewBox="0 0 90 22" className="mt-[0.6cqw] h-[2.6cqw] w-full" aria-hidden>
              <polyline points={line} fill="none" stroke="#1e56e3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>

      <div className="mt-[1.6cqw] grid flex-1 grid-cols-[1.7fr_1fr] gap-[1.4cqw]">
        <div className="flex flex-col rounded-[1cqw] bg-white p-[1.4cqw] shadow-sm">
          <p className="text-[1.5cqw] font-medium">Traffic & leads</p>
          <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="mt-[1cqw] w-full flex-1">
            <defs>
              <linearGradient id="mk-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#1e56e3" stopOpacity="0.35" />
                <stop offset="1" stopColor="#1e56e3" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[22, 50, 78].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#0a1128" strokeOpacity="0.06" />
            ))}
            <path d="M0,92 C40,88 60,80 90,74 S150,60 180,48 S240,30 300,14 L300,110 L0,110Z" fill="url(#mk-fill)" />
            <path d="M0,92 C40,88 60,80 90,74 S150,60 180,48 S240,30 300,14" fill="none" stroke="#1e56e3" strokeWidth="3" />
            <path d="M0,100 C50,98 80,92 120,88 S200,76 300,62" fill="none" stroke="#F26522" strokeWidth="2.5" strokeDasharray="5 5" />
          </svg>
        </div>
        <div className="flex flex-col gap-[1cqw] rounded-[1cqw] bg-white p-[1.4cqw] shadow-sm">
          <p className="text-[1.5cqw] font-medium">Channels</p>
          {[
            ["Organic search", 78],
            ["Paid social", 62],
            ["Email", 45],
            ["Referral", 28],
          ].map(([name, pct]) => (
            <div key={name}>
              <div className="text-[1.2cqw] text-[#0a1128]/60">{name}</div>
              <div className="mt-[0.4cqw] h-[0.9cqw] rounded-full bg-[#e7edf8]">
                <div className="h-full rounded-full bg-[#1e56e3]" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Automation ---------------------------------------------------------------- */

/** Node positions are percentages of the screen. */
const nodes = [
  { x: 4, y: 40, icon: MessageCircle, title: "New lead", sub: "WhatsApp · Website form", tone: "#25D366" },
  { x: 29, y: 40, icon: Bot, title: "AI agent", sub: "Qualifies & replies", tone: "#1e56e3" },
  { x: 54, y: 16, icon: Database, title: "Update CRM", sub: "Contact + deal", tone: "#8b5cf6" },
  { x: 54, y: 64, icon: Send, title: "Send quote", sub: "Email + PDF", tone: "#F26522" },
  { x: 78, y: 40, icon: CalendarCheck, title: "Book call", sub: "Calendar invite", tone: "#0ea5e9" },
];
/** Connectors between node centres, in a 100×62.5 box (the screen's ratio). */
const links = [
  "M21,27.5 L29,27.5",
  "M46,27.5 C50,27.5 50,14 54,14",
  "M46,27.5 C50,27.5 50,43 54,43",
  "M71,14 C75,14 74,27.5 78,27.5",
  "M71,43 C75,43 74,27.5 78,27.5",
];

function AutomationScreen() {
  return (
    <div className="relative h-full bg-[#0b1220] text-white">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "2.6cqw 2.6cqw" }}
      />
      <div className="relative flex items-center justify-between border-b border-white/10 px-[2.4cqw] py-[1.6cqw]">
        <div className="flex items-center gap-[1cqw]">
          <Bot className="h-[2.4cqw] w-[2.4cqw] text-[#6d9bff]" aria-hidden />
          <span className="text-[2.1cqw] font-semibold">Lead → Reply automation</span>
        </div>
        <span className="flex items-center gap-[0.8cqw] rounded-full bg-[#25D366]/15 px-[1.4cqw] py-[0.5cqw] text-[1.4cqw] text-[#4ade80]">
          <span className="h-[0.9cqw] w-[0.9cqw] animate-pulse rounded-full bg-[#4ade80]" />
          Live
        </span>
      </div>

      <svg viewBox="0 0 100 62.5" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        {links.map((d) => (
          <path key={d} d={d} transform="translate(0,6)" className="banner-flow" fill="none" stroke="#6d9bff" strokeWidth="0.35" strokeDasharray="1.2 1.2" />
        ))}
      </svg>

      {nodes.map(({ x, y, icon: Icon, title, sub, tone }) => (
        <div
          key={title}
          className="absolute w-[17%] rounded-[1cqw] border border-white/10 bg-[#141c2e] p-[1.2cqw] shadow-lg"
          style={{ left: `${x}%`, top: `${y + 4}%` }}
        >
          <span className="grid h-[3.2cqw] w-[3.2cqw] place-content-center rounded-[0.8cqw]" style={{ background: `${tone}26`, color: tone }}>
            <Icon className="h-[1.9cqw] w-[1.9cqw]" aria-hidden />
          </span>
          <p className="mt-[0.9cqw] text-[1.6cqw] font-semibold leading-tight">{title}</p>
          <p className="text-[1.2cqw] leading-tight text-white/50">{sub}</p>
        </div>
      ))}

      <div className="absolute inset-x-[2.4cqw] bottom-[2cqw] flex items-center justify-between text-[1.3cqw] text-white/45">
        <span>Runs 24/7 · no manual copy-paste</span>
        <span>Last run: just now</span>
      </div>
    </div>
  );
}

/* Video ---------------------------------------------------------------------- */

/** Timeline tracks: clips as [start %, width %]. */
const tracks = [
  { name: "V2", color: "#8b5cf6", clips: [[8, 14], [40, 10], [70, 18]] },
  { name: "V1", color: "#1e56e3", clips: [[0, 26], [27, 22], [50, 30], [81, 19]] },
  { name: "A1", color: "#22c55e", clips: [[0, 100]] },
  { name: "FX", color: "#F26522", clips: [[22, 6], [58, 8]] },
];

function VideoScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0d1117] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-[2cqw] py-[1.2cqw] text-[1.5cqw]">
        <span className="flex items-center gap-[0.8cqw] font-semibold">
          <Film className="h-[2cqw] w-[2cqw] text-[#a78bfa]" aria-hidden />
          Promo_edit · 9:16 + 16:9
        </span>
        <span className="rounded-full bg-white/10 px-[1.2cqw] py-[0.3cqw] text-white/60">Export</span>
      </div>

      {/* Preview — one of our own posters stands in for the footage */}
      <div className="flex flex-1 items-center justify-center gap-[2cqw] bg-black/40 p-[1.6cqw]">
        <div className="relative h-full aspect-video overflow-hidden rounded-[0.6cqw]">
          <Image src="/work/branding-design/sports-25.jpg" alt="" fill sizes="30vw" className="object-cover" />
          <span className="absolute inset-0 m-auto grid h-[5cqw] w-[5cqw] place-content-center rounded-full bg-white/85 text-[#0d1117]">
            <Play className="h-[2.4cqw] w-[2.4cqw] translate-x-[0.2cqw]" aria-hidden />
          </span>
        </div>
        <div className="relative h-full aspect-[9/16] overflow-hidden rounded-[0.6cqw] ring-1 ring-white/20">
          <Image src="/work/branding-design/sports-25.jpg" alt="" fill sizes="12vw" className="object-cover" />
        </div>
      </div>

      {/* Timeline with a moving playhead */}
      <div className="relative border-t border-white/10 px-[2cqw] py-[1.4cqw]">
        <div className="space-y-[0.8cqw]">
          {tracks.map((t) => (
            <div key={t.name} className="flex items-center gap-[1cqw]">
              <span className="w-[2.6cqw] text-[1.2cqw] text-white/40">{t.name}</span>
              <div className="relative h-[2cqw] flex-1 rounded-[0.4cqw] bg-white/5">
                {t.clips.map(([x, w]) => (
                  <span
                    key={x}
                    className="absolute inset-y-0 rounded-[0.4cqw] border border-white/20"
                    style={{ left: `${x}%`, width: `${w}%`, background: `${t.color}b3` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <span className="banner-playhead absolute inset-y-[0.8cqw] left-[5.6cqw] w-[0.25cqw] bg-white" />
      </div>
    </div>
  );
}

/* Banner -------------------------------------------------------------------- */

/** Real social media posts we designed (Jocy Bakery, Burger Roots), floating round the laptop. */
const posts: { src: string; ratio: string; at: CSSProperties }[] = [
  { src: "/work/branding-design/social-new-01.jpg", ratio: "4 / 5", at: { left: "5%", top: "15%", width: "13%", rotate: "-8deg" } },
  { src: "/work/branding-design/social-new-11.jpg", ratio: "1 / 1", at: { left: "13%", top: "49%", width: "12%", rotate: "5deg" } },
  { src: "/work/branding-design/social-new-10.jpg", ratio: "1 / 1", at: { right: "5%", top: "15%", width: "13%", rotate: "7deg" } },
  { src: "/work/branding-design/social-new-04.jpg", ratio: "4 / 5", at: { right: "13%", top: "47%", width: "12%", rotate: "-5deg" } },
];

type Chip = { label: string; icon: typeof Mail; at: CSSProperties };

const kinds: Record<BannerKind, { glow: string; screen: ReactNode; chips: Chip[] }> = {
  marketing: {
    glow: "radial-gradient(55% 60% at 50% 35%, rgba(30,86,227,0.55), transparent 70%), radial-gradient(35% 45% at 85% 85%, rgba(242,101,34,0.3), transparent 70%)",
    screen: <MarketingScreen />,
    chips: [
      { label: "Social media", icon: Megaphone, at: { left: "5%", top: "82%" } },
      { label: "SEO", icon: Search, at: { right: "5%", top: "82%" } },
    ],
  },
  automation: {
    glow: "radial-gradient(55% 60% at 50% 35%, rgba(109,155,255,0.45), transparent 70%), radial-gradient(35% 45% at 12% 85%, rgba(37,211,102,0.22), transparent 70%)",
    screen: <AutomationScreen />,
    chips: [
      { label: "WhatsApp", icon: MessageCircle, at: { left: "9%", top: "22%" } },
      { label: "Email", icon: Mail, at: { right: "9%", top: "34%" } },
      { label: "CRM", icon: Database, at: { right: "14%", top: "60%" } },
    ],
  },
  video: {
    glow: "radial-gradient(55% 60% at 50% 35%, rgba(139,92,246,0.45), transparent 70%), radial-gradient(35% 45% at 88% 80%, rgba(242,101,34,0.28), transparent 70%)",
    screen: <VideoScreen />,
    chips: [
      { label: "Reels & Shorts", icon: Film, at: { left: "8%", top: "24%" } },
      { label: "Motion graphics", icon: Sparkles, at: { right: "7%", top: "18%" } },
      { label: "Colour grade", icon: Palette, at: { right: "12%", top: "58%" } },
    ],
  },
};

export default function ServiceBanner({ kind }: { kind: BannerKind }) {
  const { glow, screen, chips } = kinds[kind];
  return (
    <div data-anim className="absolute inset-0 overflow-hidden bg-[#070b1a] [container-type:size]">
      <div aria-hidden className="absolute inset-0" style={{ background: glow }} />

      {/* Laptop — centred, kept clear of the card's title at the bottom */}
      <div
        aria-hidden
        className="banner-float absolute left-1/2 top-[27%] w-[86%] -translate-x-1/2 sm:top-[8%] sm:w-[54%] xl:w-[46%]"
      >
        <Laptop>{screen}</Laptop>
      </div>

      {/* Marketing: our social posts floating either side */}
      {kind === "marketing" &&
        posts.map(({ src, ratio, at }, i) => (
          <div
            key={src}
            aria-hidden
            className="banner-float absolute hidden overflow-hidden rounded-xl border border-white/15 shadow-2xl sm:block"
            style={{ ...at, aspectRatio: ratio, animationDelay: `${-2 - i * 1.5}s` }}
          >
            <Image src={src} alt="" fill sizes="15vw" className="object-cover object-top" />
          </div>
        ))}

      {/* Floating capability chips */}
      {chips.map(({ label, icon: Icon, at }, i) => (
        <span
          key={label}
          aria-hidden
          className="banner-float absolute hidden items-center gap-2 rounded-full border border-white/15 bg-[#1a2238]/90 px-4 py-2 text-sm text-white sm:inline-flex"
          style={{ ...at, animationDelay: `${-1 - i * 1.7}s` }}
        >
          <Icon size={15} aria-hidden />
          {label}
        </span>
      ))}
    </div>
  );
}
