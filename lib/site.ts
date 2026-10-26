import { projects } from "./projects";

export const site = {
  name: "Fusion Stack",
  tagline: "Design · Develop · Automate · Grow",
  instagram: "https://www.instagram.com/fusionstackofficial/",
  instagramHandle: "fusionstackofficial",
  linkedin: "https://www.linkedin.com/in/fusionstackofficial",
  facebook: "https://www.facebook.com/profile.php?id=61590523869649",
  whatsapp: "https://wa.me/923127312721",
  whatsappDisplay: "+92 312 7312721",
  messenger: "https://m.me/61590523869649",
  email: "fusionstackofficial@gmail.com",
} as const;

/** Top-level nav. Items with `menu` render a dropdown. */
export const nav = [
  { label: "Home", href: "#top" },
  {
    label: "Services",
    href: "#services",
    menu: [
      { label: "Design", href: "#services", desc: "Brand systems & interfaces" },
      { label: "Develop", href: "#services", desc: "Next.js builds that scale" },
      { label: "Automate", href: "#services", desc: "AI agents & integrations" },
      { label: "Grow", href: "#services", desc: "SEO, analytics & CRO" },
    ],
  },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const values = [
  {
    icon: "users",
    title: "The people you meet are the people who build",
    body: "No account layer, no handoff to a junior team after you sign. You talk to the designers and engineers doing the work.",
  },
  {
    icon: "zap",
    title: "Shipped beats perfect",
    body: "Weekly increments in a shared channel. You see the real thing running early, and steer it while steering is still cheap.",
  },
  {
    icon: "shield",
    title: "Built to be handed over",
    body: "Documented, tested, and yours. No lock-in, no proprietary CMS you can't leave, no hostage code.",
  },
  {
    icon: "chart",
    title: "We stay for the compounding",
    body: "A launch is a starting line. We measure, automate and iterate so the system keeps returning value long after go-live.",
  },
] as const;

/**
 * The oversized centred statement in the About section. It reveals word by
 * word, so keep it to two or three sentences — longer and the reveal drags.
 */
export const about = {
  statement:
    "We design, build and automate digital products end to end — brand systems, web and mobile apps, AI workflows, and the growth engine around them. The people you meet are the people who build, and everything ships documented, tested and yours.",
} as const;

export const hero = {
  headline: ["Digital Products &", "Automation for Modern", "Brands"],
  kicker: "Pay for outcomes, not hours.",
  clients: "40+ Clients",
  /** The small stat beside the avatar stack. */
  stat: { value: "+40", label: "Clients and counting" },
  primaryCta: { label: "Get a free 48hr roadmap", href: "#contact" },
  secondaryCta: { label: "See 40+ client wins", href: "#work" },
  trust: ["Top 1% engineering talent", "100% on-time delivery", "Reply within 24h", "No spam"],
} as const;

/**
 * Client avatars in the hero. `src` files live in public/clients/ and are
 * PLACEHOLDERS — swap each for a real client photo or logo (square, 128px+),
 * keeping the filename, and they appear with no code change. `alt` should name
 * the actual person or company once they're real.
 */
export const clientAvatars = [
  { src: "/clients/client-1.png", alt: "Client" },
  { src: "/clients/client-2.png", alt: "Client" },
  { src: "/clients/client-3.png", alt: "Client" },
  { src: "/clients/client-4.png", alt: "Client" },
] as const;

/** The trailing bubble on the avatar stack. */
export const clientOverflow = "+36";

export const services = [
  {
    id: "branding",
    title: "Branding & Graphic Design",
    icon: "brand",
    summary: "Building impactful brand identities that resonate and endure.",
    points: ["Branding Strategy", "Rebrand", "Brand Position", "Graphic Design", "Packaging"],
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Applications",
    icon: "web",
    summary: "Fast, scalable web and mobile apps engineered end to end.",
    points: ["Next.js Web Apps", "iOS & Android", "Headless Commerce", "API Integration", "Progressive Web Apps"],
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    icon: "ai",
    summary: "AI agents and workflows that remove the work nobody should be doing.",
    points: ["AI Agents", "Workflow Automation", "Chatbots", "Data Pipelines", "CRM Automation"],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: "video",
    summary: "Scroll-stopping edits that turn footage into brand momentum.",
    points: ["Promo Videos", "Motion Graphics", "Reels & Shorts", "Color Grading", "Explainer Videos"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & SEO",
    icon: "marketing",
    summary: "Measurement and campaigns that compound growth month over month.",
    points: ["SEO", "Paid Ads", "Social Media", "Email Marketing", "Analytics & CRO"],
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    icon: "uiux",
    summary: "Research-led interfaces engineered around clarity and flow.",
    points: ["User Research", "Wireframing", "Design Systems", "Prototyping", "Usability Testing"],
  },
] as const;

/** Portfolio projects (with their images and case-study copy) live in lib/projects.ts. */

export const stats = [
  { value: "40+", label: "Products shipped" },
  { value: "12", label: "Industries served" },
  { value: "98", label: "Avg. Lighthouse score" },
  { value: "2 yrs", label: "Average client tenure" },
] as const;

export const testimonials = [
  {
    headline: "Amazing team!",
    quote: "They brought order to a chaotic launch. Their work has moved the numbers we actually care about.",
    name: "Adrian Lee",
    role: "President, Cesz Jsc",
    avatar: "/clients/client-1.png",
  },
  {
    headline: "Love to work on the next project",
    quote: "The Fusion Stack team truly amplified our messaging through their expert use of design and visuals.",
    name: "Zlatan Amberland",
    role: "PM at Dumar Inc",
    avatar: "/clients/client-2.png",
  },
  {
    headline: "Shipped faster than we thought possible",
    quote: "Weekly increments in a shared channel meant we steered the product while it was still cheap to steer. No surprises.",
    name: "Priya Nair",
    role: "Founder, Northwind",
    avatar: "/clients/client-3.png",
  },
  {
    headline: "Automation that paid for itself",
    quote: "The workflows they built saved us over a thousand hours a year. It kept returning value long after go-live.",
    name: "Marcus Feld",
    role: "COO, Cadence Ops",
    avatar: "/clients/client-4.png",
  },
  {
    headline: "Design and engineering in one room",
    quote: "The people who designed our product are the people who shipped it. That single accountable team changed everything.",
    name: "Sofia Alvarez",
    role: "Head of Product, Atlas",
    avatar: null,
  },
] as const;

export const faqs = [
  {
    q: "What services does Fusion Stack offer?",
    a: "Design, web and mobile development, AI automation, video editing, digital marketing and UI/UX — end to end. The people who design your product are the same people who build and maintain it.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most engagements ship a first working version within 2–4 weeks and iterate from there. We work in weekly increments in a shared channel, so you see the real thing running early.",
  },
  {
    q: "How much will my project cost?",
    a: "It depends on scope, but we price for outcomes rather than hours. Send a short brief and you'll get a clear, itemised estimate within one business day.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes. We're based in Pakistan and work with brands globally, across time zones, entirely remotely.",
  },
  {
    q: "Who owns the code and designs?",
    a: "You do. Everything is documented, tested and handed over — no lock-in, no proprietary CMS you can't leave, no hostage code.",
  },
  {
    q: "How do we get started?",
    a: "Send a brief through the contact form below. You'll get a real reply from the people who'd do the work, usually within one business day.",
  },
] as const;

/** Everything the ⌘K palette can jump to. */
export const searchIndex = [
  { label: "Home", href: "#top", group: "Pages" },
  { label: "Services", href: "#services", group: "Pages" },
  { label: "About us", href: "#about", group: "Pages" },
  { label: "Contact", href: "#contact", group: "Pages" },
  ...services.map((s) => ({ label: s.title, href: "#services", group: "Services" })),
  ...projects.map((p) => ({ label: p.title, href: `/work/${p.slug}`, group: "Work" })),
];
