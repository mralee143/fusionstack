/**
 * Builds the brand-blue Fusion Stack mark from the source render.
 * Recolors the gold metal into the brand's cobalt/azure chrome, retints the
 * dark body to midnight/navy, and knocks the white studio background out to alpha.
 *
 * Usage: npm run logo -- "C:\path\to\source.png"
 */
import sharp from "sharp";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const SRC =
  process.argv[2] ??
  "C:/Users/ali/Downloads/ChatGPT Image Jul 11, 2026, 05_53_17 PM.png";

const OUT_DIR = path.join(process.cwd(), "public");
const APP_DIR = path.join(process.cwd(), "app");

// Brand palette (brand board 02-04)
const MIDNIGHT = [0x0a, 0x11, 0x28];
const NAVY = [0x0b, 0x2a, 0x5b];
const COBALT = [0x1e, 0x56, 0xe3];
const AZURE = [0x3a, 0x8d, 0xff];
const SKY = [0xcd, 0xe7, 0xff];

const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

function toHsv(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max / 255 };
}

if (!existsSync(SRC)) {
  console.error(`Source render not found: ${SRC}`);
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

/**
 * The white studio backdrop and its drop shadow are *outside* the mark, while the
 * metal's specular catch-lights are just as bright but *inside* it. A brightness
 * threshold can't tell them apart (that's what haloed the first pass), so flood-fill
 * the pale, low-saturation region inwards from the canvas edges: whatever the fill
 * reaches is backdrop, whatever it can't reach is the logo.
 */
const exterior = new Uint8Array(width * height);
const isPale = (px) => {
  const { s, v } = toHsv(data[px * channels], data[px * channels + 1], data[px * channels + 2]);
  return v > 0.78 && s < 0.24;
};

const queue = [];
for (let x = 0; x < width; x++) {
  queue.push(x, (height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  queue.push(y * width, y * width + width - 1);
}

while (queue.length) {
  const px = queue.pop();
  if (exterior[px] || !isPale(px)) continue;
  exterior[px] = 1;
  const x = px % width;
  const y = (px / width) | 0;
  if (x > 0) queue.push(px - 1);
  if (x < width - 1) queue.push(px + 1);
  if (y > 0) queue.push(px - width);
  if (y < height - 1) queue.push(px + width);
}

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const { h, s, v } = toHsv(r, g, b);

  let rgb;
  let alpha = 255;

  if (exterior[i / channels]) {
    // Backdrop and drop shadow: drop out entirely, so no halo survives onto a dark page.
    alpha = 0;
    rgb = MIDNIGHT;
  } else if (s < 0.14 && v <= 0.42) {
    // Near-black body of the mark -> midnight, lifting toward navy on its lit edges.
    rgb = mix(MIDNIGHT, NAVY, clamp(v / 0.42, 0, 1));
  } else if (s < 0.14) {
    // Neutral sheen / specular ramp on the metal -> icy sky highlight.
    rgb = mix(AZURE, SKY, clamp((v - 0.42) / 0.44, 0, 1));
  } else {
    // The gold metal itself: rotate hue into the brand blues, keep the shading ramp.
    const t = clamp((v - 0.2) / 0.75, 0, 1); // dark metal -> bright metal
    const base =
      t < 0.5
        ? mix(NAVY, COBALT, t / 0.5)
        : mix(COBALT, AZURE, (t - 0.5) / 0.5);
    // Warmest (most saturated) gold reads as the brightest chrome catch-light.
    const sheen = clamp((s - 0.14) / 0.7, 0, 1);
    const hueBias = clamp((h - 25) / 40, 0, 1); // keeps the metal's own hue ramp
    rgb = mix(base, mix(base, SKY, 0.55 * hueBias), sheen * 0.45);
  }

  data[i] = clamp(Math.round(rgb[0]), 0, 255);
  data[i + 1] = clamp(Math.round(rgb[1]), 0, 255);
  data[i + 2] = clamp(Math.round(rgb[2]), 0, 255);
  data[i + 3] = Math.round(alpha);
}

const recolored = sharp(data, { raw: { width, height, channels } }).png();

await recolored
  .clone()
  .trim({ threshold: 8 })
  .resize(1024, 1024, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toFile(path.join(OUT_DIR, "logo.png"));

await recolored
  .clone()
  .trim({ threshold: 8 })
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toFile(path.join(APP_DIR, "icon.png"));

console.log("Wrote public/logo.png and app/icon.png");
