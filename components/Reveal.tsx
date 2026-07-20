"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Scroll reveal. Children stagger at 60ms so lists enter as a sequence,
 * not all at once. Framer's `useReducedMotion` is respected globally via the
 * reduced-motion CSS override, and `once` keeps it from re-firing on scroll-up.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={
        stagger
          ? { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }
          : { ...variants, show: { ...variants.show, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } } }
      }
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
