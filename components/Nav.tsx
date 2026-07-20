"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Briefcase,
  LayoutGrid,
  MessageCircle,
  Linkedin,
  Facebook,
  Github,
} from "lucide-react";
import { site, services } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
import SearchDialog from "./SearchDialog";

const socials = [
  { icon: Linkedin, href: site.linkedin, label: "Fusion Stack on LinkedIn" },
  { icon: Facebook, href: site.facebook, label: "Fusion Stack on Facebook" },
  { icon: Github, href: site.github, label: "Fusion Stack on GitHub" },
];

type NavLink = { label: string; href: string; menu?: { label: string; href: string }[] };

/** Inline links shown directly in the bar on desktop. Items with `menu` open a dropdown. */
const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  {
    label: "Services",
    href: "#services",
    menu: services.map((s) => ({ label: s.title, href: "#services" })),
  },
  { label: "Portfolio", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/** Icon links that fill the mega-menu grid (mobile). */
const megaLinks = [
  { label: "Home", href: "#top", icon: Home, desc: "Back to the top" },
  { label: "Services", href: "#services", icon: Briefcase, desc: "Design · Develop · Automate · Grow" },
  { label: "Portfolio", href: "#work", icon: LayoutGrid, desc: "Selected client work" },
  { label: "Contact", href: "#contact", icon: MessageCircle, desc: "Start a project" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc closes the mega-menu; lock body scroll while it's open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border transition-shadow duration-300 ${
        scrolled
          ? "bg-background/85 shadow-[0_10px_30px_-20px_rgba(11,42,91,0.35)] backdrop-blur-xl"
          : "bg-background"
      }`}
    >
      {/* Flat bar — brand left; links, socials, theme, search right */}
      <nav className="flex h-16 items-center gap-1 px-4 sm:px-6" aria-label="Primary">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mega-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="-ml-1 mr-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-surface-2 lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.18 }}
              >
                <X size={22} aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.18 }}
              >
                <Menu size={22} aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Brand */}
        <Link
          href="#top"
          onClick={close}
          className="mr-auto flex min-w-0 items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <Image src="/logo.png" alt="" width={36} height={36} className="h-8 w-8" priority />
          <span className="whitespace-nowrap text-base font-bold tracking-[0.14em]">
            FUSION<span className="text-accent">STACK</span>
          </span>
        </Link>

        {/* Inline links (desktop) */}
        <ul className="hidden items-center lg:flex">
          {navLinks.map((item) =>
            item.menu ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu((m) => (m === item.label ? null : item.label))
                  }
                  aria-expanded={openMenu === item.label}
                  className="flex cursor-pointer items-center gap-1 px-3.5 py-2 text-sm font-medium text-foreground"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    aria-hidden
                    className={`transition-transform duration-200 ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openMenu === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="glass absolute left-1/2 top-full z-50 mt-2 w-60 -translate-x-1/2 overflow-hidden rounded-2xl p-2"
                    >
                      {item.menu.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            onClick={close}
                            className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-surface-2 hover:text-accent"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block px-3.5 py-2 text-sm font-medium text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Social icons (desktop) */}
        <div className="ml-2 hidden items-center gap-0.5 lg:flex">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-surface-2 hover:text-accent"
            >
              <Icon size={18} aria-hidden />
            </a>
          ))}
        </div>

        {/* Theme toggle */}
        <div className="ml-1 hidden sm:block">
          <ThemeToggle />
        </div>

        {/* Search */}
        <div className="ml-1">
          <SearchDialog />
        </div>
      </nav>

      {/* Mega-menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full h-screen cursor-default bg-midnight/40 backdrop-blur-sm"
            />

            <motion.div
              id="mega-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-full max-h-[calc(100vh-4rem)] w-full overflow-y-auto border-b border-r border-border bg-background sm:max-w-2xl sm:rounded-br-3xl"
            >
              <div className="p-6 sm:p-8">
                {/* Menu label */}
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <span aria-hidden className="h-2 w-2 bg-accent" /> Menu
                </div>

                {/* Icon-link grid — bordered table, cells share divider lines */}
                <ul className="mt-5 grid grid-cols-1 overflow-hidden rounded-2xl border-l border-t border-border sm:grid-cols-2">
                  {megaLinks.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        onClick={close}
                        className="group flex h-full items-center gap-3.5 border-b border-r border-border px-5 py-5 transition-colors duration-200 hover:bg-surface-2"
                      >
                        <Icon
                          size={20}
                          aria-hidden
                          className="shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent"
                        />
                        <span className="text-sm font-medium text-foreground">{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Explore heading */}
                <p className="mt-8 text-3xl font-bold leading-tight sm:text-4xl">
                  Let’s explore
                  <br />
                  <span className="text-accent">more {site.name}</span>
                </p>

                {/* Social */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <span aria-hidden className="h-2 w-2 bg-accent" /> Social Media
                  </div>
                  <ul className="mt-3 flex items-center gap-2">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                        >
                          <Icon size={18} aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
