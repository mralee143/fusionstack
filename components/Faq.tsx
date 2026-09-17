"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";

/**
 * FAQ as bordered rows. Native buttons
 * plus aria-expanded so the accordion works from the keyboard and reads
 * correctly to assistive tech.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 pb-[clamp(6rem,14vw,10rem)]">
      <div className="container-mid">
        <p className="eyebrow mb-4">FAQ</p>
        <h2 className="display mb-12 text-[length:var(--text-section)] font-light text-ink">
          Questions we get asked
        </h2>

        <div className="border-t border-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-7 text-left"
                  >
                    <span
                      className={`display text-[clamp(1.5rem,3.2vw,2.75rem)] font-light transition-colors duration-300 ${
                        isOpen ? "text-ink" : "text-ink/50 hover:text-ink"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-2 shrink-0 text-ink/60 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path
                          d="M11 1v20M1 11h20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="max-w-3xl pb-8 text-base leading-relaxed text-ink/60"
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
