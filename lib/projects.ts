/**
 * Portfolio projects — the source of truth for the Work section on the home
 * page and for every /work/[slug] route (those pages are still empty).
 *
 * EVERYTHING HERE IS A PLACEHOLDER. To publish a real project:
 *
 *   1. Drop your images into  public/work/<slug>/  as
 *        cover.png              — the card image (square, 1440×1440)
 *        01.jpg, 02.jpg, 03.jpg — gallery shots (landscape, 1600×1000+)
 *      Keep the filenames and nothing in the code needs to change.
 *      `npm run work-images` regenerates placeholders for any that are missing.
 *   2. Edit the text below. `slug` becomes the URL (/work/<slug>) and the folder
 *      name, so if you rename it, rename the folder in public/work/ too.
 */
export type Project = {
  /** URL segment AND the folder name under public/work/. */
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  /** One line, shown on the card and in the case-study hero. */
  summary: string;
  /** Card + hero image. */
  cover: string;
  /** Case-study gallery, in order. Add or remove freely. */
  gallery: string[];
  /** Meta strip on the case study. */
  services: string[];
  stack: string[];
  duration: string;
  overview: string;
  challenge: string;
  solution: string;
  /** Headline numbers. Keep to three — the grid is built for three. */
  results: { value: string; label: string }[];
  /**
   * Portfolio work grouped into ordered steps, rendered as numbered sections
   * on the case-study page. w/h are the image's pixel size.
   */
  sections?: {
    title: string;
    blurb: string;
    images: { src: string; w: number; h: number }[];
  }[];
  /** Card and hero art drawn in code (components/ServiceBanner.tsx) instead of an image. */
  banner?: "marketing" | "automation" | "video";
  /** Optional live URL. Omit it and the "Visit site" button is not rendered. */
  live?: string;
  /**
   * Live sites/apps to show on the case-study page, each inside a browser and
   * phone frame. A project with no `showcase` renders an empty page.
   */
  showcase?: {
    name: string;
    /** Small label above the name, e.g. "Ecommerce Website". */
    kind: string;
    /** Clicking the browser frame (or the button) opens this. */
    url: string;
    blurb: string;
    /** Screenshots — regenerate with `npm run shots`. */
    desktop: string;
    mobile: string;
    /**
     * Real screens from the mobile app, shown in a row of phone frames.
     * Import them with `npm run app-shots -- <files…>`. When present, these
     * replace the website-on-mobile shot.
     */
    appScreens?: string[];
    tags: string[];
    /** App store links; each button only renders if its link is present. */
    stores?: { android?: string; ios?: string };
  }[];
};

const img = (slug: string, file: string) => `/work/${slug}/${file}`;

export const projects: Project[] = [
  {
    slug: "web-mobile",
    title: "Web, Mobile & UI/UX Design",
    client: "Websites, Apps & UI/UX",
    category: "Web, Mobile & UI/UX",
    year: "2026",
    summary:
      "Live client builds — a money-transfer platform with apps on both stores, a jewellery store, a proxy provider, a travel agency and a luxury real-estate brand.",
    cover: img("web-mobile", "cover.png"),
    gallery: [],
    services: ["UI/UX Design", "Web Development", "Mobile Applications", "Ecommerce", "Maintenance"],
    stack: ["Figma", "Next.js", "React Native", "Node.js"],
    duration: "Ongoing",
    overview:
      "Live products we designed in Figma, built and still maintain — from a cross-border money transfer platform on web, iOS and Android to storefronts, SaaS and service businesses.",
    challenge: "",
    solution: "",
    results: [],
    /* Rendered as the case-study page. Screenshots come from `npm run shots`. */
    showcase: [
      {
        name: "NS Jewels",
        kind: "Ecommerce Website",
        url: "https://nsjewelspk.com/",
        blurb:
          "An online jewellery store — full catalogue, collections and checkout, built to stay fast on a phone.",
        desktop: img("web-mobile", "nsjewels-desktop.jpg"),
        mobile: img("web-mobile", "nsjewels-mobile.jpg"),
        tags: ["Ecommerce", "Responsive", "Checkout"],
      },
      {
        name: "Best Forex",
        kind: "Website + iOS & Android App",
        url: "https://bestforex.net.au/",
        blurb:
          "A worldwide money transfer platform with live exchange rates on the web, and native apps on both stores.",
        desktop: img("web-mobile", "bestforex-desktop.jpg"),
        mobile: img("web-mobile", "bestforex-mobile.jpg"),
        /*
         * Real app screens, in the order they appear in the phone-frame row.
         * Re-import with `npm run app-shots -- <files…>` and keep this list
         * the same length as what the script writes.
         */
        appScreens: [
          img("web-mobile", "app-01.jpg"), // Splash
          img("web-mobile", "app-02.jpg"), // Welcome
          img("web-mobile", "app-03.jpg"), // Login
          img("web-mobile", "app-04.jpg"), // Home / balance
          img("web-mobile", "app-05.jpg"), // KYC verification
        ],
        tags: ["Live Rates", "Transfers", "iOS & Android"],
        stores: {
          android: "https://play.google.com/store/apps/details?id=net.bestforex.app",
          ios: "https://apps.apple.com/au/app/best-forex/id6787967522",
        },
      },
      {
        name: "CatProxies",
        kind: "SaaS Website",
        url: "https://catproxies.com/",
        blurb:
          "A residential proxy provider — 20M+ IPs across 195 countries, with pricing, use cases and a customer dashboard.",
        desktop: img("web-mobile", "catproxies-desktop.jpg"),
        mobile: img("web-mobile", "catproxies-mobile.jpg"),
        tags: ["SaaS", "Pricing", "Dashboard"],
      },
      {
        name: "Melodia Travels",
        kind: "Travel Agency Website",
        url: "https://melodiatravel.com/",
        blurb:
          "A travel agency site for Umrah packages, ticketing, visit visas and worldwide tours, with WhatsApp enquiries built in.",
        desktop: img("web-mobile", "melodia-desktop.jpg"),
        mobile: img("web-mobile", "melodia-mobile.jpg"),
        tags: ["Travel", "Packages", "Lead Capture"],
      },
      {
        name: "Engel & Völkers",
        kind: "Real Estate Website",
        url: "https://www.engelvoelkers.com/",
        blurb:
          "A global luxury real-estate portal that routes buyers and sellers to the right country across 35 markets.",
        desktop: img("web-mobile", "engelvoelkers-desktop.jpg"),
        mobile: img("web-mobile", "engelvoelkers-mobile.jpg"),
        tags: ["Real Estate", "Multi-country", "Luxury"],
      },
    ],
  },
  {
    slug: "branding-design",
    title: "Brand Identity, Social Media & Posters",
    client: "Branding & Design",
    category: "Branding & Graphic Design",
    year: "2026",
    summary:
      "Identity systems, logos, social media campaigns and poster design — arranged below from brand foundations to finished campaigns.",
    cover: img("branding-design", "sports-01.jpg"),
    gallery: [],
    services: ["Brand Identity", "Logo Design", "Social Media Design", "Poster Design", "Thumbnails"],
    stack: ["Photoshop", "Illustrator", "Lightroom", "After Effects", "Figma"],
    duration: "Ongoing",
    overview:
      "A selection of our branding and graphic design work, in the order a brand is built: the identity first, then the layouts and social content that carry it, then posters and key art.",
    challenge: "",
    solution: "",
    results: [],
    /* Rendered step by step on the case-study page. Images live in public/work/branding-design/. */
    sections: [
      {
        title: "Brand Identity",
        blurb:
          "Complete identity systems — logo construction, colour palettes, typography and real-world mockups — plus a collection of marks for food, tech and real-estate brands.",
        images: [
          { src: img("branding-design", "identity-01.jpg"), w: 1200, h: 7741 },
          { src: img("branding-design", "identity-02.jpg"), w: 500, h: 1323 },
          { src: img("branding-design", "identity-03.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "identity-04.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "identity-05.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "identity-06.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "identity-07.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "identity-08.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "identity-09.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "identity-10.jpg"), w: 1600, h: 1200 },
          { src: img("branding-design", "identity-11.jpg"), w: 1600, h: 900 },
        ],
      },
      {
        title: "Cavo Coffee — Full Brand",
        blurb:
          "A complete café identity, from the logo and brand guide to uniforms, cups, packaging, storefront signage, menus and stationery.",
        images: [
          { src: img("branding-design", "cavo-01.jpg"), w: 1254, h: 1254 },
          { src: img("branding-design", "cavo-02.jpg"), w: 1402, h: 1122 },
          { src: img("branding-design", "cavo-03.jpg"), w: 1402, h: 1122 },
          { src: img("branding-design", "cavo-04.jpg"), w: 1535, h: 1024 },
          { src: img("branding-design", "cavo-05.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "cavo-06.jpg"), w: 1402, h: 1122 },
          { src: img("branding-design", "cavo-07.jpg"), w: 1402, h: 1122 },
          { src: img("branding-design", "cavo-08.jpg"), w: 1535, h: 1024 },
          { src: img("branding-design", "cavo-09.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "cavo-10.jpg"), w: 1024, h: 1535 },
          { src: img("branding-design", "cavo-11.jpg"), w: 1086, h: 1448 },
          { src: img("branding-design", "cavo-12.jpg"), w: 1402, h: 1122 },
          { src: img("branding-design", "cavo-13.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "cavo-14.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-15.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-16.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-17.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-18.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-19.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-20.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-21.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-22.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-23.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-24.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-25.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-26.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-27.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-28.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-29.jpg"), w: 1024, h: 1024 },
          { src: img("branding-design", "cavo-30.jpg"), w: 1535, h: 1024 },
          { src: img("branding-design", "cavo-31.jpg"), w: 1535, h: 1024 },
          { src: img("branding-design", "cavo-32.jpg"), w: 1535, h: 1024 },
          { src: img("branding-design", "cavo-33.jpg"), w: 1024, h: 1536 },
        ],
      },
      {
        title: "Burger Roots — Full Brand",
        blurb:
          "A bold burger brand built around roots: logo variations, colours, typography, patterns, packaging, labels, menus and in-store graphics.",
        images: [
          { src: img("branding-design", "burger-01.jpg"), w: 1254, h: 1254 },
          { src: img("branding-design", "burger-02.jpg"), w: 1254, h: 1254 },
          { src: img("branding-design", "burger-03.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-04.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-05.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-06.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-07.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-08.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-09.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-10.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-11.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-12.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-13.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-14.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-15.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-16.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-17.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-18.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-19.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-20.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-21.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "burger-22.jpg"), w: 1024, h: 1536 },
          { src: img("branding-design", "burger-23.jpg"), w: 1536, h: 1024 },
        ],
      },
      {
        title: "Personal Brand & Web Layouts",
        blurb:
          "A self-branding portfolio layout and a landing page design, built as long-form scrolling pages.",
        images: [
          { src: img("branding-design", "layouts-01.jpg"), w: 1200, h: 4062 },
          { src: img("branding-design", "layouts-02.jpg"), w: 1200, h: 4339 },
        ],
      },
      {
        title: "Social Media Design",
        blurb:
          "Instagram posts and stories for burger and café brands, carousel series for gym, travel, tech-retail, food and agency clients, plus LinkedIn content, thumbnails and print ads.",
        images: [
          { src: img("branding-design", "social-new-10.jpg"), w: 1254, h: 1254 },
          { src: img("branding-design", "social-new-11.jpg"), w: 1254, h: 1254 },
          { src: img("branding-design", "social-new-12.jpg"), w: 1254, h: 1254 },
          { src: img("branding-design", "social-new-13.jpg"), w: 900, h: 1600 },
          { src: img("branding-design", "social-new-14.jpg"), w: 1024, h: 1536 },
          { src: img("branding-design", "social-new-15.jpg"), w: 1536, h: 1024 },
          { src: img("branding-design", "social-new-16.jpg"), w: 1054, h: 1492 },
          { src: img("branding-design", "social-new-17.jpg"), w: 1535, h: 1024 },
          { src: img("branding-design", "social-01.jpg"), w: 1600, h: 2500 },
          { src: img("branding-design", "social-02.jpg"), w: 1600, h: 2500 },
          { src: img("branding-design", "social-03.jpg"), w: 1600, h: 2500 },
          { src: img("branding-design", "social-04.jpg"), w: 842, h: 1264 },
          { src: img("branding-design", "social-05.jpg"), w: 921, h: 1152 },
          { src: img("branding-design", "social-06.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "social-07.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "social-08.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-09.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-10.jpg"), w: 1080, h: 1350 },
        ],
      },
      {
        title: "Sports Posters",
        blurb:
          "Matchday, celebration and fight-night posters across football, cricket, UFC, WWE, F1 and esports.",
        images: [
          { src: img("branding-design", "sports-01.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-02.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-03.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-04.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-05.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-06.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-07.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "sports-08.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-09.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-10.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-11.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-12.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-13.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-14.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-15.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-16.jpg"), w: 1600, h: 1757 },
          { src: img("branding-design", "sports-17.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-18.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-19.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-20.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-21.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-22.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "sports-23.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-24.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-25.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-26.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-27.jpg"), w: 1600, h: 900 },
          { src: img("branding-design", "sports-28.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-29.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "sports-30.jpg"), w: 1080, h: 1350 },
        ],
      },
      {
        title: "Entertainment & Culture",
        blurb:
          "Film key art, celebrity portraits and festive designs for Eid and Hajj.",
        images: [
          { src: img("branding-design", "culture-01.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "culture-02.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "culture-03.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "culture-04.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "culture-05.jpg"), w: 1080, h: 1350 },
        ],
      },
    ],
  },
  {
    slug: "cadence-automation",
    title: "Agents & workflows that run the busywork",
    client: "AI Automation",
    category: "AI Automation",
    banner: "automation",
    year: "2026",
    summary:
      "AI agents and automations that answer leads, update your CRM and send follow-ups, so your team stops copy-pasting.",
    cover: img("cadence-automation", "cover.png"),
    gallery: [],
    services: ["AI Agents", "Workflow Automation", "Chatbots", "CRM Integration"],
    stack: ["n8n", "Zapier", "Claude API", "WhatsApp API"],
    duration: "Per project or monthly",
    overview:
      "We map the repetitive work in your business, then build automations that handle it: replying to new leads on WhatsApp or email, qualifying them with an AI agent, logging them in your CRM, sending quotes and booking calls. Every step is visible and you approve what matters.",
    challenge: "",
    solution: "",
    results: [],
  },
  {
    slug: "verse-studio-film",
    title: "Edits, reels & motion graphics",
    client: "Video Editing",
    category: "Video Editing",
    banner: "video",
    year: "2026",
    summary:
      "Promo videos, reels and shorts cut for every platform, with motion graphics and colour grading.",
    cover: img("verse-studio-film", "cover.png"),
    gallery: [],
    services: ["Promo Videos", "Reels & Shorts", "Motion Graphics", "Colour Grading"],
    stack: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    duration: "Per project or monthly",
    overview:
      "We turn raw footage into videos that hold attention: a main edit with a clear story, then vertical cut-downs for Reels, Shorts and TikTok, with titles, motion graphics and a consistent colour grade.",
    challenge: "",
    solution: "",
    results: [],
  },
  {
    slug: "meridian-growth",
    title: "SEO, ads & social that compound",
    client: "Digital Marketing & SEO",
    category: "Digital Marketing & SEO",
    banner: "marketing",
    year: "2026",
    summary:
      "Search, paid ads, social media and email working from one plan, with reporting you can actually read.",
    cover: img("meridian-growth", "cover.png"),
    gallery: [],
    services: ["SEO", "Paid Ads", "Social Media", "Email Marketing", "Analytics"],
    stack: ["Google Analytics", "Google Ads", "Meta Ads", "Search Console"],
    duration: "Per project or monthly",
    overview:
      "We set up proper tracking first, then grow traffic and leads through SEO content, paid campaigns on Google and Meta, social media design and email. You get a monthly report that shows what worked and where the budget goes next.",
    challenge: "",
    solution: "",
    results: [],
    /* Real social media work for clients, shown as steps on the project page. */
    sections: [
      {
        title: "Jocy Bakery — Instagram Campaign",
        blurb:
          "A full Instagram feed for a home bakery: launch posts, best-seller highlights, a sweet-or-savory poll, a why-choose-us post and a thank-you note, all in one soft blue-and-cream look.",
        images: [
          { src: img("branding-design", "social-new-01.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-new-02.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-new-03.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-new-04.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-new-05.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-new-06.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-new-07.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-new-08.jpg"), w: 1080, h: 1350 },
          { src: img("branding-design", "social-new-09.jpg"), w: 1080, h: 1350 },
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/**
 * Template frame art from public/tpl/portfolio/, picked by the project's
 * position. portfolio-2.jpg was removed, so that slot borrows portfolio-1.
 * Projects with a `showcase` show their own screenshots instead.
 */
const FRAMES = [1, 1, 3, 4, 5, 6];
export const frameArt = (i: number) => `/tpl/portfolio/portfolio-${FRAMES[i % FRAMES.length]}.jpg`;
