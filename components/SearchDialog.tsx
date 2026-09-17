"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft } from "lucide-react";
import { searchIndex } from "@/lib/site";
import { scrollToHash } from "./SmoothScroll";

/**
 * ⌘K / Ctrl-K palette that jumps to any section. `showTrigger` renders the
 * visible search button; the shortcut works either way, so pages with a
 * minimal header can mount this with the trigger off.
 */
export default function SearchDialog({ showTrigger = true }: { showTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchIndex;
    return searchIndex.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // Focus after the dialog paints so the caret lands in the field.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function go(href: string) {
    setOpen(false);
    // Route entries (/work/...) navigate; section entries scroll — but only
    // when the section is on the page we are currently on.
    if (!href.startsWith("#")) {
      router.push(href);
      return;
    }
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    scrollToHash(href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  }

  return (
    <>
      {showTrigger && (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm text-muted-foreground transition-colors duration-200 hover:border-accent/50 sm:w-56 sm:justify-between sm:px-4"
      >
        <span className="flex items-center gap-2">
          <Search size={16} aria-hidden />
          <span className="hidden sm:inline">Search…</span>
        </span>
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Scrim strong enough to isolate the dialog in both themes */}
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="panel relative w-full max-w-lg overflow-hidden rounded-2xl"
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search size={18} className="text-muted-foreground" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="Search services, work, sections…"
                  aria-label="Search query"
                  className="min-h-[52px] w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
              </div>

              <ul className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                    Nothing matches “{query}”. Try “automate” or “work”.
                  </li>
                )}
                {results.map((item, i) => (
                  <li key={`${item.group}-${item.label}`}>
                    <button
                      type="button"
                      onClick={() => go(item.href)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex min-h-[44px] w-full cursor-pointer items-center justify-between rounded-xl px-3 text-left text-sm transition-colors ${
                        i === active ? "bg-surface-2 text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">{item.group}</span>
                        {i === active && (
                          <CornerDownLeft size={13} className="text-accent" aria-hidden />
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
