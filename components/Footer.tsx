import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Closing panel: a bordered, textured card carrying the oversized "Contact Us"
 * CTA, with the meta rows above and below it.
 */
const socials = [
  { label: "Instagram", href: site.instagram },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Facebook", href: site.facebook },
  { label: "WhatsApp", href: site.whatsapp },
];

export default function Footer() {
  return (
    <footer className="pb-[15px]">
      <div className="px-[15px]">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-surface-2 px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(3rem,7vw,5rem)] pb-[clamp(5.5rem,8vw,5rem)] text-center">
          {/* The texture only tints the ice-blue panel — it never carries the type. */}
          <Image
            src="/tpl/footer/footer-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover opacity-[0.12]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-transparent to-[#cde7ff]/60" />

          {/* Top meta */}
          <div className="mb-[clamp(3rem,10vw,9.375rem)] flex flex-col items-center justify-between gap-6 md:flex-row">
            <span className="text-lg text-ink">{site.tagline}</span>
            <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
              <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
              <span className="display text-2xl font-medium text-ink">{site.name}</span>
            </Link>
            <span className="text-lg text-ink">Based in Pakistan</span>
          </div>

          {/* CTA */}
          <div className="pb-[clamp(2.5rem,6vw,4.375rem)]">
            <span className="text-base text-ink/70">
              Contact us and let&rsquo;s bring your vision to life
            </span>
            <h2 className="display mt-2">
              <Link
                href="#contact"
                className="inline-block text-[length:var(--text-mega)] font-normal uppercase tracking-[-0.01em] text-ink transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.03]"
              >
                Contact Us
              </Link>
            </h2>
          </div>

          {/* Bottom meta */}
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <span className="text-sm text-ink/60">
              Built in-house by {site.name}
            </span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-sm text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <span className="text-sm text-ink/60">
              Copyright &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
