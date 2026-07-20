"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal, { RevealItem } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { faqs } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Common Questions"
          title={
            <>
              Questions, <span className="text-foreground">answered.</span>
            </>
          }
          body="The things people usually ask before starting. Can't find yours? Send it through the form below."
        />

        <Reveal
          stagger
          className="mx-auto mt-16 max-w-3xl divide-y divide-border border-y border-border"
        >
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <RevealItem key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-lg font-semibold text-foreground">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-accent"
                      aria-hidden
                    >
                      <Plus size={22} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 leading-relaxed text-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
