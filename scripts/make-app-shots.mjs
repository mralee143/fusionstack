/**
 * Imports mobile-app screenshots into the Web & Mobile case study.
 *
 *   npm run app-shots -- "C:/path/screen1.png" "C:/path/screen2.png" ...
 *
 * Each file is resized to 780px wide and written as app-01.jpg, app-02.jpg …
 * in public/work/web-mobile/, in the order you list them — which is the order
 * they appear in the phone-frame row on the page.
 *
 * Pass a folder instead and every image inside it is imported, sorted by name:
 *
 *   npm run app-shots -- "C:/Users/ali/Downloads/bestforex-app"
 *
 * If you add or remove screens, update `appScreens` in lib/projects.ts to match.
 */
import sharp from "sharp";
import path from "node:path";
import { mkdirSync, existsSync, statSync, readdirSync } from "node:fs";

const OUT = path.join(process.cwd(), "public", "work", "web-mobile");
mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    'Usage: npm run app-shots -- "C:/path/screen1.png" "C:/path/screen2.png" …\n' +
      '   or: npm run app-shots -- "C:/path/folder-of-screenshots"'
  );
  process.exit(1);
}

/** Expand any folder argument into the image files inside it. */
const files = args.flatMap((arg) => {
  if (!existsSync(arg)) {
    console.error(`Not found: ${arg}`);
    process.exit(1);
  }
  if (statSync(arg).isDirectory()) {
    return readdirSync(arg)
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .sort()
      .map((f) => path.join(arg, f));
  }
  return [arg];
});

for (const [i, file] of files.entries()) {
  const out = path.join(OUT, `app-${String(i + 1).padStart(2, "0")}.jpg`);
  await sharp(file)
    .resize({ width: 780, withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);
  console.log(`✓ ${path.basename(file)} → ${path.relative(process.cwd(), out)}`);
}

console.log(
  `\n${files.length} app screen${files.length === 1 ? "" : "s"} imported. ` +
    "Make sure appScreens in lib/projects.ts lists the same number."
);
