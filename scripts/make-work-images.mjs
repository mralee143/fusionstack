/**
 * Builds placeholder images for every project in lib/projects.ts into
 * public/work/<slug>/  (cover.png + 01.jpg, 02.jpg, 03.jpg).
 *
 *   npm run work-images
 *     -> writes only the files that are MISSING, so your uploaded photos are
 *        never overwritten. Add a project to lib/projects.ts, run this, and it
 *        has a full set of images until you drop the real ones in.
 *
 *   npm run work-images -- --force
 *     -> regenerates every placeholder, replacing whatever is there.
 *
 * Placeholders are brand-gradient panels labelled with the service name, so an
 * unfinished case study reads as "image pending" rather than as a broken layout.
 */
import sharp from "sharp";
import path from "node:path";
import { mkdirSync, existsSync, readFileSync } from "node:fs";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "work");
const force = process.argv.includes("--force");

// Parse slug/title/category straight out of the data file — no TS runtime needed.
const source = readFileSync(path.join(ROOT, "lib", "projects.ts"), "utf8");
const entries = [...source.matchAll(/slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*client:\s*"[^"]*",\s*\n\s*category:\s*"([^"]+)"/g)].map(
  ([, slug, title, category]) => ({ slug, title, category })
);

if (entries.length === 0) {
  console.error("No projects found in lib/projects.ts — did the shape change?");
  process.exit(1);
}

/** Brand blues, one pair per project, cycled. */
const ramps = [
  ["#0b2a5b", "#1e56e3"],
  ["#0a1128", "#3a8dff"],
  ["#122a63", "#1e56e3"],
  ["#0a1128", "#0b2a5b"],
  ["#173a7a", "#3a8dff"],
  ["#0b1b33", "#241041"],
];

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** One gradient panel carrying just the service name, over a soft blob and grid. */
function panel({ w, h, label, ramp, seed }) {
  const [from, to] = ramp;
  const labelSize = Math.round(w * 0.028);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="blob">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="${Math.round(w / 16)}" height="${Math.round(w / 16)}" patternUnits="userSpaceOnUse">
      <path d="M ${Math.round(w / 16)} 0 L 0 0 0 ${Math.round(w / 16)}" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <circle cx="${w * (0.2 + 0.15 * seed)}" cy="${h * 0.25}" r="${w * 0.38}" fill="url(#blob)"/>
  <circle cx="${w * 0.85}" cy="${h * (0.8 - 0.1 * seed)}" r="${w * 0.3}" fill="url(#blob)"/>
  <text x="${w * 0.07}" y="${h * 0.86}" font-family="Inter, Segoe UI, sans-serif" font-size="${labelSize}" font-weight="500" letter-spacing="${labelSize * 0.2}" fill="#ffffff" opacity="0.75">${escape(label.toUpperCase())}</text>
</svg>`);
}

let written = 0;
let kept = 0;

for (const [i, project] of entries.entries()) {
  const dir = path.join(OUT, project.slug);
  mkdirSync(dir, { recursive: true });
  const ramp = ramps[i % ramps.length];

  // The card shows the service name under the image, so the placeholder itself
  // carries only that name — no project title, no second line of copy.
  const files = [
    { name: "cover.png", w: 1440, h: 1440 },
    { name: "01.jpg", w: 1600, h: 1000 },
    { name: "02.jpg", w: 1600, h: 1000 },
    { name: "03.jpg", w: 1600, h: 1000 },
  ];

  for (const [j, file] of files.entries()) {
    const out = path.join(dir, file.name);
    if (existsSync(out) && !force) {
      kept += 1;
      continue;
    }
    const svg = panel({ w: file.w, h: file.h, label: project.category, ramp, seed: j });
    const pipeline = sharp(svg);
    await (file.name.endsWith(".png") ? pipeline.png({ compressionLevel: 9 }) : pipeline.jpeg({ quality: 86, mozjpeg: true })).toFile(out);
    written += 1;
  }
}

console.log(
  `work images: ${written} placeholder${written === 1 ? "" : "s"} written, ${kept} existing file${kept === 1 ? "" : "s"} left alone.` +
    (force ? "" : "  (use --force to regenerate everything)")
);
