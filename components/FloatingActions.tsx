"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

/** WhatsApp + a contact launcher, pinned bottom-right like the reference. */
export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  // Hold them back until the visitor is past the hero — no pouncing on arrival.
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="glass w-64 rounded-2xl p-4"
              >
                <p className="text-sm font-semibold">Talk to a human</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  We usually reply within a few hours.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-xl border border-border px-3 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    <Mail size={16} aria-hidden />
                    {site.email}
                  </a>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-xl border border-border px-3 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    <Phone size={16} aria-hidden />
                    WhatsApp us
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message Fusion Stack on WhatsApp"
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105"
          >
            {/* WhatsApp isn't in lucide — official glyph, drawn inline */}
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
              <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close contact options" : "Open contact options"}
            className="glow-cobalt flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-navy to-cobalt text-white transition-transform duration-200 hover:scale-105"
          >
            {open ? <X size={22} aria-hidden /> : <MessageCircle size={22} aria-hidden />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
