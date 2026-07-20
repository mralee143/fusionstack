"use client";

import { motion } from "framer-motion";
import { Sparkles, MonitorSmartphone, Bot, Clapperboard, Megaphone, PenTool } from "lucide-react";
import Reveal, { RevealItem } from "./Reveal";
import { services } from "@/lib/site";

const icons = {
  brand: Sparkles,
  web: MonitorSmartphone,
  ai: Bot,
  video: Clapperboard,
  marketing: Megaphone,
  uiux: PenTool,
} as const;

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-28">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Services
          </h2>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <RevealItem key={service.id}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="service-card group"
                >
                  {/* Hover wash in the brand blues */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 50% 0%, rgba(30,86,227,0.08), transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/25 bg-surface-2 text-accent">
                      <Icon size={26} strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.summary}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {service.points.map((point) => (
                        <li key={point} className="service-pill">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
