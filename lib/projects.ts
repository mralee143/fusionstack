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
    slug: "northwind-branding",
    title: "Northwind Brand System",
    client: "Northwind",
    category: "Branding & Graphic Design",
    year: "2026",
    summary:
      "A full identity rebuild that gave a 12-year-old retailer one voice across every surface.",
    cover: img("northwind-branding", "cover.png"),
    gallery: [
      img("northwind-branding", "01.jpg"),
      img("northwind-branding", "02.jpg"),
      img("northwind-branding", "03.jpg"),
    ],
    services: ["Brand Strategy", "Visual Identity", "Packaging", "Guidelines"],
    stack: ["Figma", "Illustrator", "After Effects"],
    duration: "9 weeks",
    overview:
      "Northwind had grown from one store to eleven without ever revisiting the identity it launched with. Every location, deck and package looked like it came from a different company.",
    challenge:
      "The mark did not survive small sizes, the palette had drifted into six unofficial variants, and nobody internally could say what the brand stood for in a sentence.",
    solution:
      "We ran a positioning sprint with the leadership team, rebuilt the mark around a single geometric construction, and shipped a token-based system so the web team and the print supplier pull from the same source.",
    results: [
      { value: "11", label: "Locations rolled out" },
      { value: "1 week", label: "Asset turnaround, from 6" },
      { value: "+38%", label: "Brand recall in survey" },
    ],
  },
  {
    slug: "web-mobile",
    title: "Web & Mobile Applications",
    client: "NS Jewels · Best Forex",
    category: "Web & Mobile Applications",
    year: "2026",
    summary:
      "Live client builds — an online jewellery store, and a money-transfer platform with apps on both stores.",
    cover: img("web-mobile", "cover.png"),
    gallery: [],
    services: ["Web Development", "Mobile Applications", "Ecommerce", "Maintenance"],
    stack: ["Next.js", "React Native", "Node.js"],
    duration: "Ongoing",
    overview:
      "Two live products we designed, built and still maintain: a jewellery storefront and a cross-border money transfer platform that ships on web, iOS and Android.",
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
    ],
  },
  {
    slug: "cadence-automation",
    title: "Cadence Ops Automation Suite",
    client: "Cadence Ops",
    category: "AI Automation",
    year: "2025",
    summary:
      "AI agents that took 1,200 hours a year of quoting and triage off an ops team of nine.",
    cover: img("cadence-automation", "cover.png"),
    gallery: [
      img("cadence-automation", "01.jpg"),
      img("cadence-automation", "02.jpg"),
      img("cadence-automation", "03.jpg"),
    ],
    services: ["AI Agents", "Workflow Automation", "CRM Integration", "Data Pipelines"],
    stack: ["Next.js", "Claude API", "Postgres", "n8n"],
    duration: "11 weeks",
    overview:
      "Every inbound request at Cadence was read, classified and re-typed into the CRM by hand before anyone could quote it.",
    challenge:
      "Quotes took two days to leave the building, and roughly a fifth of inbound mail was never logged at all during busy weeks.",
    solution:
      "An agent now reads each thread, extracts the line items, drafts a quote against live pricing and files it in the CRM. A human approves rather than retypes, and every decision is logged for audit.",
    results: [
      { value: "1,200 hrs", label: "Saved per year" },
      { value: "4 hrs", label: "Quote turnaround, from 2 days" },
      { value: "100%", label: "Inbound logged" },
    ],
  },
  {
    slug: "verse-studio-film",
    title: "Verse Studio Launch Film",
    client: "Verse Studio",
    category: "Video Editing",
    year: "2025",
    summary:
      "A launch film plus 24 cut-downs that carried a product release across every channel.",
    cover: img("verse-studio-film", "cover.png"),
    gallery: [
      img("verse-studio-film", "01.jpg"),
      img("verse-studio-film", "02.jpg"),
      img("verse-studio-film", "03.jpg"),
    ],
    services: ["Edit", "Motion Graphics", "Colour Grading", "Reels & Shorts"],
    stack: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    duration: "6 weeks",
    overview:
      "Verse had three days of shot footage, a launch date four weeks out, and no through-line between the takes.",
    challenge:
      "The hero cut had to work as a 90-second stage film and survive being chopped into vertical ads without losing the story.",
    solution:
      "We cut the film around a single spoken thread, built the motion system so titles reflow between 16:9 and 9:16, and delivered a graded master with 24 platform-ready variants.",
    results: [
      { value: "2.4M", label: "Views in month one" },
      { value: "24", label: "Cut-downs delivered" },
      { value: "+61%", label: "Watch-through vs. last launch" },
    ],
  },
  {
    slug: "meridian-growth",
    title: "Meridian Growth Engine",
    client: "Meridian Health",
    category: "Digital Marketing & SEO",
    year: "2025",
    summary:
      "SEO, paid and lifecycle rebuilt around one measurement model that finally agreed with itself.",
    cover: img("meridian-growth", "cover.png"),
    gallery: [
      img("meridian-growth", "01.jpg"),
      img("meridian-growth", "02.jpg"),
      img("meridian-growth", "03.jpg"),
    ],
    services: ["SEO", "Paid Ads", "Email Lifecycle", "Analytics & CRO"],
    stack: ["GA4", "Google Ads", "Klaviyo", "Looker Studio"],
    duration: "6 months, ongoing",
    overview:
      "Three agencies each reported a different number for the same month, so nobody trusted any of them enough to shift budget.",
    challenge:
      "Attribution was double-counting, organic had no content engine behind it, and the email programme was a single monthly newsletter.",
    solution:
      "We rebuilt tracking into one server-side model, published against a clustered content plan, and replaced the newsletter with six triggered lifecycle flows.",
    results: [
      { value: "3.1×", label: "Organic sessions" },
      { value: "−44%", label: "Cost per qualified lead" },
      { value: "22%", label: "Revenue from email, from 4%" },
    ],
  },
  {
    slug: "helio-design-system",
    title: "Helio Product Design System",
    client: "Helio Fintech",
    category: "UI/UX Design",
    year: "2026",
    summary:
      "Research-led interface work and a design system that quadrupled how fast the team ships.",
    cover: img("helio-design-system", "cover.png"),
    gallery: [
      img("helio-design-system", "01.jpg"),
      img("helio-design-system", "02.jpg"),
      img("helio-design-system", "03.jpg"),
    ],
    services: ["User Research", "Design System", "Prototyping", "Usability Testing"],
    stack: ["Figma", "Storybook", "React", "Radix UI"],
    duration: "12 weeks",
    overview:
      "Helio's product had accumulated four button styles, three date pickers and no shared language between design and engineering.",
    challenge:
      "Each new screen was designed from scratch, and onboarding drop-off sat at 46% with nobody able to say which step lost people.",
    solution:
      "We ran moderated sessions on the live flow, rebuilt onboarding around the two steps that actually blocked users, and shipped a tokenised component library wired into Storybook.",
    results: [
      { value: "4×", label: "Shipping speed" },
      { value: "−29pts", label: "Onboarding drop-off" },
      { value: "62", label: "Components in the library" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
