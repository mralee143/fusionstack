"use client";

import {
  TrendingUp,
  Wallet,
  Sparkles,
  Cpu,
  Eye,
  Boxes,
  Zap,
  Wind,
  Globe,
  Activity,
} from "lucide-react";

/**
 * Floating "trusted by" logo strip under the hero. No box — it sits on the page
 * background, uses the brand theme tokens, and auto-scrolls on a seamless CSS loop
 * (the list is rendered twice back-to-back). Swap the icons/names for real client
 * logos when you have them.
 */

const clients = [
  { name: "BestForex", Icon: TrendingUp },
  { name: "Ledger", Icon: Wallet },
  { name: "OpenAI", Icon: Sparkles },
  { name: "Xevo", Icon: Cpu },
  { name: "Fullview", Icon: Eye },
  { name: "Arcol", Icon: Boxes },
  { name: "Sprint", Icon: Zap },
  { name: "Northwind", Icon: Wind },
  { name: "Atlas", Icon: Globe },
  { name: "Cadence", Icon: Activity },
];

export default function LogoMarquee() {
  // Rendered twice so the second copy slides in seamlessly as the first exits.
  const row = [...clients, ...clients];

  return (
    <section aria-label="Trusted by" className="relative z-10 border-y border-border/70 py-10">
      <p className="logo-bar-label">
        Trusted by ambitious teams — the brands we design, build &amp; automate for
      </p>

      <div className="logo-track-mask">
        <ul className="logo-track" aria-hidden>
          {row.map(({ name, Icon }, i) => (
            <li key={`${name}-${i}`} className="logo-item">
              <Icon className="logo-item-icon" strokeWidth={1.75} aria-hidden />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
