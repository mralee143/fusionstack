/**
 * Builds the hero's client avatars into public/clients/.
 *
 * Two modes:
 *
 *   npm run avatars
 *     -> regenerates the generic placeholder silhouettes.
 *
 *   npm run avatars -- "C:/path/photo1.jpg" "C:/path/logo2.png" ...
 *     -> uses YOUR images: centre-crops each to a square, resizes to 128px,
 *        and writes them as client-1.png, client-2.png, … in order.
 *
 * Placeholders are deliberately generic silhouettes rather than stock faces —
 * a stranger's photo in a "40+ Clients" stack is a claim about a client you
 * may not have. Swap in real client photos or company logos before launch.
 */
import sharp from "sharp";
import path from "node:path";
import { mkdirSync, existsSync } from "node:fs";

const OUT = path.join(process.cwd(), "public", "clients");
mkdirSync(OUT, { recursive: true });

const inputs = process.argv.slice(2);

if (inputs.length > 0) {
  const missing = inputs.filter((f) => !existsSync(f));
  if (missing.length) {
    console.error("Could not find:\n  " + missing.join("\n  "));
    process.exit(1);
  }

  const BG = [0xea, 0xf2, 0xff]; // brand light surface, behind every head

  for (const [i, file] of inputs.entries()) {
    const out = path.join(OUT, `client-${i + 1}.png`);

    // 1. Flatten any real alpha, then let `attention` find the face rather than
    //    the geometric centre (which on a full-body shot lands on the torso).
    const square = await sharp(file)
      .flatten({ background: "#eaf2ff" })
      .resize(360, 360, { fit: "cover", position: sharp.strategy.attention })
      .png()
      .toBuffer();

    // 2. Zoom in on the head, as a separate pass. At 44px on screen a torso is
    //    unreadable anyway, and it keeps the shirt (often white) out of the
    //    background cleanup below. Chaining extract onto the resize above trips
    //    sharp's single-extract-per-pipeline rule.
    const framed = await sharp(square)
      .extract({ left: 54, top: 18, width: 252, height: 252 })
      .resize(256, 256)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = framed;
    const { width, height, channels } = info;

    /*
     * 3. Kill the backdrop. Several of these were exported with a transparency
     *    checkerboard rendered INTO the pixels, so it's real image data, not alpha.
     *    Flood-fill the pale region inward from the top and side edges: it eats the
     *    checker and any white studio wall, and stops at hair/skin. The bottom edge
     *    is deliberately not seeded — that's where a white shirt sits, and seeding
     *    there would let the fill bleed straight through the clothing.
     */
    const pale = (px) => {
      const r = data[px * channels];
      const g = data[px * channels + 1];
      const b = data[px * channels + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      return max / 255 > 0.72 && sat < 0.14;
    };

    const seen = new Uint8Array(width * height);
    const queue = [];
    for (let x = 0; x < width; x++) queue.push(x); // top edge
    for (let y = 0; y < height; y++) queue.push(y * width, y * width + width - 1); // sides

    while (queue.length) {
      const px = queue.pop();
      if (seen[px] || !pale(px)) continue;
      seen[px] = 1;
      data[px * channels] = BG[0];
      data[px * channels + 1] = BG[1];
      data[px * channels + 2] = BG[2];

      const x = px % width;
      const y = (px / width) | 0;
      if (x > 0) queue.push(px - 1);
      if (x < width - 1) queue.push(px + 1);
      if (y > 0) queue.push(px - width);
      if (y < height - 1) queue.push(px + width);
    }

    await sharp(data, { raw: { width, height, channels } }).png().toFile(out);
    console.log(`client-${i + 1}.png  <-  ${path.basename(file)}`);
  }

  console.log(
    `\nDone — ${inputs.length} avatar(s) written to public/clients/.\n` +
      `If you passed a different number than before, update clientAvatars in lib/site.ts.`
  );
  process.exit(0);
}

// Brand-blue pairs so the stack reads as one family
const AVATARS = [
  { file: "client-1.png", from: "#0b2a5b", to: "#1e56e3" },
  { file: "client-2.png", from: "#1e56e3", to: "#3a8dff" },
  { file: "client-3.png", from: "#3a8dff", to: "#0b2a5b" },
  { file: "client-4.png", from: "#0a1128", to: "#1e56e3" },
];

const SIZE = 128;

const svg = ({ from, to }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <clipPath id="c"><circle cx="64" cy="64" r="64"/></clipPath>
  </defs>
  <g clip-path="url(#c)">
    <rect width="128" height="128" fill="url(#g)"/>
    <!-- generic person silhouette: head + shoulders -->
    <circle cx="64" cy="50" r="20" fill="#ffffff" fill-opacity="0.85"/>
    <path d="M64 76c-20 0-36 13-36 30v22h72V106c0-17-16-30-36-30z" fill="#ffffff" fill-opacity="0.85"/>
  </g>
</svg>`;

for (const a of AVATARS) {
  await sharp(Buffer.from(svg(a))).png().toFile(path.join(OUT, a.file));
}

console.log(`Wrote ${AVATARS.length} placeholder avatars to public/clients/`);
