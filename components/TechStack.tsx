"use client";

import {
  SiFigma,
  SiFramer,
  SiWebflow,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFlutter,
  SiJavascript,
  SiVuedotjs,
  SiSwift,
  SiKotlin,
  SiMongodb,
  SiFirebase,
  SiGooglegemini,
  SiClaude,
  SiPython,
  SiZapier,
  SiN8N,
  SiDavinciresolve,
  SiGoogleanalytics,
  SiMeta,
  SiGoogleads,
  SiHubspot,
  SiSemrush,
  SiShopify,
  SiWordpress,
  SiGithub,
  SiVercel,
  SiNotion,
  SiStripe,
} from "react-icons/si";
import type { IconType } from "react-icons";
import Reveal, { RevealItem } from "./Reveal";

/** Adobe logo — react-icons dropped the Adobe set, so inline the official path. */
const SiAdobe: IconType = ({ className, style, ...rest }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z" />
  </svg>
);

/** Every tool we reach for across branding, build, AI, video, marketing & UI/UX. */
const tech: { name: string; Icon: IconType; color: string }[] = [
  // Design & branding
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Adobe", Icon: SiAdobe, color: "#FF0000" },
  { name: "Framer", Icon: SiFramer, color: "#0055FF" },
  { name: "Webflow", Icon: SiWebflow, color: "#146EF5" },
  // Web & mobile
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#0A1128" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#E6B800" },
  { name: "Vue.js", Icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
  { name: "Swift", Icon: SiSwift, color: "#F05138" },
  { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFA000" },
  // AI & automation
  { name: "Gemini", Icon: SiGooglegemini, color: "#8E75F8" },
  { name: "Claude", Icon: SiClaude, color: "#D97757" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Zapier", Icon: SiZapier, color: "#FF4F00" },
  { name: "n8n", Icon: SiN8N, color: "#EA4B71" },
  // Video
  { name: "DaVinci Resolve", Icon: SiDavinciresolve, color: "#233A51" },
  // Marketing
  { name: "Google Analytics", Icon: SiGoogleanalytics, color: "#E37400" },
  { name: "Meta", Icon: SiMeta, color: "#0467DF" },
  { name: "Google Ads", Icon: SiGoogleads, color: "#4285F4" },
  { name: "HubSpot", Icon: SiHubspot, color: "#FF7A59" },
  { name: "Semrush", Icon: SiSemrush, color: "#FF642D" },
  { name: "Shopify", Icon: SiShopify, color: "#5E8E3E" },
  { name: "WordPress", Icon: SiWordpress, color: "#21759B" },
  // Tools
  { name: "GitHub", Icon: SiGithub, color: "#181717" },
  { name: "Vercel", Icon: SiVercel, color: "#0A1128" },
  { name: "Notion", Icon: SiNotion, color: "#0A1128" },
  { name: "Stripe", Icon: SiStripe, color: "#635BFF" },
];

export default function TechStack() {
  return (
    <section id="tech" className="relative scroll-mt-24 py-28">
      <div className="container-x">
        <Reveal className="text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our <span className="text-gradient">Tech Stack</span>
          </h2>
        </Reveal>

        <Reveal stagger className="mt-16 flex flex-wrap justify-center gap-5 sm:gap-7">
          {tech.map(({ name, Icon, color }, i) => (
            <RevealItem key={name}>
              <div
                className="tech-badge"
                title={name}
                style={{ animationDelay: `${(i % 6) * 0.4}s` }}
              >
                <Icon className="tech-badge-icon" style={{ color }} aria-label={name} />
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
