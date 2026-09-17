"use client";

import { motion } from "framer-motion";
import { SiWhatsapp, SiMessenger } from "react-icons/si";
import { site } from "@/lib/site";

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

/** WhatsApp + Messenger, always visible bottom-right. */
export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <motion.a
        href={site.messenger}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Fusion Stack on Messenger"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0084FF] text-white shadow-lg transition-transform duration-200 hover:scale-105"
      >
        <SiMessenger size={26} aria-hidden />
      </motion.a>

      <motion.a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Fusion Stack on WhatsApp"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={spring}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105"
      >
        <SiWhatsapp size={26} aria-hidden />
      </motion.a>
    </div>
  );
}
