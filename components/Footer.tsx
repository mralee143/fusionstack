import Image from "next/image";
import Link from "next/link";
import { Linkedin, Facebook, Github } from "lucide-react";
import { services, site } from "@/lib/site";

const serviceLinks = services.map((s) => ({ label: s.title, href: "#services" }));

const company = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const helpful = [
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "License", href: "#" },
];

const socials = [
  { icon: Linkedin, href: site.linkedin, label: "Fusion Stack on LinkedIn" },
  { icon: Facebook, href: site.facebook, label: "Fusion Stack on Facebook" },
  { icon: Github, href: site.github, label: "Fusion Stack on GitHub" },
];

function FooterCol({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pb-8 pt-16">
      <div className="container-x">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="#top"
              className="flex items-center gap-2.5"
              aria-label={`${site.name} — home`}
            >
              <Image src="/logo.png" alt="" width={40} height={40} className="h-9 w-9" />
              <span className="text-lg font-bold tracking-[0.14em]">
                FUSION<span className="text-accent">STACK</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Fusion Stack is a digital product studio specializing in brand, web
              &amp; mobile engineering, and AI automation — building measurable
              products for modern brands. Our work is built on craft, teamwork and
              delivering real impact.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground transition-colors duration-200 hover:text-accent"
                >
                  <Icon size={20} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Services" links={serviceLinks} className="lg:col-span-4" />
          <FooterCol title="Company" links={company} className="lg:col-span-2" />
          <FooterCol title="Helpful Links" links={helpful} className="lg:col-span-2" />
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-border pt-8 text-center">
          <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden>🇵🇰</span>
            Proudly Made in Pakistan — Innovative Tech, Global Impact
            <span aria-hidden>🇵🇰</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            © {year}.{" "}
            <Link href="#top" className="text-accent hover:underline">
              {site.name}
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
