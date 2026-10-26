"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { sectionHref } from "@/lib/links";

/**
 * Minimal header: wordmark left, "Menu" trigger right. Everything else lives
 * in the fullscreen offcanvas, matching the reference template.
 */

const menu = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-3"
      aria-label={`${site.name} — home`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={40}
        height={40}
        priority
        className="h-9 w-9 object-contain"
      />
      <span className="display text-[26px] font-medium tracking-tight text-ink">
        {site.name}
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const pathname = usePathname();

  /*
   * The bar stays visible on every section. It is transparent at the top of
   * the page and picks up a frosted white backdrop once you scroll.
   */
  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the overlay, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 py-6 transition-[background-color,padding,box-shadow] duration-500 ease-[var(--ease-brand)] md:pt-10 md:pb-6 ${
          floating ? "bg-white/90 shadow-[0_1px_0_rgba(10,17,40,0.06)] backdrop-blur-md md:pt-6" : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <Wordmark />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="offcanvas"
            className="group flex cursor-pointer items-center gap-3 text-[17px] font-medium tracking-tight text-ink"
          >
            <span>Menu</span>
            <span className="flex w-8 flex-col items-end gap-[6px]">
              <i className="block h-px w-8 bg-ink transition-[width] duration-300 group-hover:w-5" />
              <i className="block h-px w-5 bg-ink transition-[width] duration-300 group-hover:w-8" />
            </span>
          </button>
        </div>
      </header>

      {/* Offcanvas -------------------------------------------------------- */}
      <div
        id="offcanvas"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-[100] transition-[visibility] duration-500 ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Panels slide in from opposite edges so the split stays visible. */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-y-0 left-0 w-full bg-background transition-transform duration-[700ms] ease-[var(--ease-brand)] md:w-[calc(100%-420px)] ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 hidden w-[420px] bg-surface transition-transform duration-[700ms] ease-[var(--ease-brand)] md:block ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        />

        <div
          className={`relative flex h-full flex-col overflow-y-auto overscroll-contain transition-opacity duration-500 md:grid md:grid-cols-[1fr_420px] ${
            open ? "opacity-100 delay-200" : "opacity-0"
          }`}
        >
          {/* Left — menu */}
          <div className="flex flex-col px-6 py-8 md:px-[clamp(1.5rem,5vw,5rem)] md:py-10">
            <div className="flex items-center justify-between">
              <Wordmark onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer text-sm uppercase tracking-widest text-ink/60 transition-colors hover:text-ink md:hidden"
              >
                Close
              </button>
            </div>

            <nav className="mt-auto pt-16 md:pt-24">
              <ul>
                {menu.map((item, i) => (
                  <li key={item.label} className="border-b border-border/60">
                    <Link
                      href={sectionHref(item.href, pathname)}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-3 md:py-4"
                    >
                      <span className="w-8 shrink-0 font-sans text-xs text-ink/30">
                        0{i + 1}
                      </span>
                      <span className="display text-[clamp(2.25rem,6vw,4.5rem)] font-light text-ink/60 transition-colors duration-300 group-hover:text-ink">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right — contact details */}
          <div className="border-t border-border px-6 py-10 md:border-l md:border-t-0 md:px-10 md:py-10">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="hidden cursor-pointer text-ink/60 transition-colors hover:text-ink md:block"
              >
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden>
                  <path
                    d="M9.81 9.81 28.19 28.19M9.81 28.19 28.19 9.81"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="md:mt-32">
              <h2 className="display text-[40px] font-light text-ink">Get In Touch</h2>

              <div className="mt-10 space-y-8">
                <div>
                  <p className="eyebrow mb-2">WhatsApp</p>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line text-lg text-ink"
                  >
                    {site.whatsappDisplay}
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-2">Email</p>
                  <a href={`mailto:${site.email}`} className="link-line text-lg text-ink">
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-2">Instagram</p>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line text-lg text-ink"
                  >
                    {site.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/50">
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-line">
                  LinkedIn
                </a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="link-line">
                  Facebook
                </a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-line">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
