/**
 * Captures desktop + mobile screenshots of the live client sites shown in the
 * Web & Mobile case study, into public/work/web-mobile/.
 *
 *   npm run shots            # re-capture every site in SHOTS below
 *   npm run shots nsjewels   # only the entries whose key contains "nsjewels"
 *
 * It drives the copy of Chrome (or Edge) already installed on this machine
 * through puppeteer-core, so there is no bundled Chromium to download.
 * Re-run it whenever a client site is redesigned and the page updates itself.
 */
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import path from "node:path";
import { mkdirSync, existsSync } from "node:fs";

const OUT = path.join(process.cwd(), "public", "work", "web-mobile");
mkdirSync(OUT, { recursive: true });

/** Sites to shoot. `key` prefixes the output filenames. */
const SHOTS = [
  { key: "nsjewels", url: "https://nsjewelspk.com/" },
  { key: "bestforex", url: "https://bestforex.net.au/" },
  { key: "catproxies", url: "https://catproxies.com/" },
  { key: "melodia", url: "https://melodiatravel.com/" },
  { key: "engelvoelkers", url: "https://www.engelvoelkers.com/" },
];

const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];

const executablePath = BROWSERS.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome or Edge found — install one, or add its path to BROWSERS.");
  process.exit(1);
}

const filter = process.argv.slice(2);
const targets = filter.length
  ? SHOTS.filter((s) => filter.some((f) => s.key.includes(f)))
  : SHOTS;

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, mobile: false, out: 1600 },
  { name: "mobile", width: 390, height: 844, mobile: true, out: 780 },
];

/** Wait out "Checking your browser…" interstitials (up to ~20s). */
async function passBotCheck(page) {
  for (let i = 0; i < 20; i++) {
    const blocked = await page
      .evaluate(() => /checking your browser|just a moment/i.test(document.body?.innerText ?? ""))
      .catch(() => true); // mid-navigation — try again
    if (!blocked) {
      await page.waitForSelector("body", { timeout: 15_000 }).catch(() => {});
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}

/** Click away cookie-consent banners so they don't cover the shot. */
async function dismissConsent(page) {
  const clicked = await page.evaluate(() => {
    const re = /^(accept all|accept|allow all|accept cookies|i agree|agree|got it|ok|reject all)$/i;
    const button = [...document.querySelectorAll("button, a[role=button]")].find((el) =>
      re.test(el.textContent.trim())
    );
    button?.click();
    return Boolean(button);
  });
  if (clicked) await new Promise((r) => setTimeout(r, 800));
}

/** Let lazy-loaded imagery paint before the shutter. */
async function settle(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < (document.body?.scrollHeight ?? 0) && y < 12000) setTimeout(step, 120);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 600);
        }
      };
      step();
    });
  });
  await new Promise((r) => setTimeout(r, 1200));
}

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars", "--disable-features=IsolateOrigins,site-per-process"],
});

for (const shot of targets) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
    });

    try {
      // Some sites never go network-idle (chat widgets, trackers) — shoot
      // whatever has loaded by then rather than failing.
      await page
        .goto(shot.url, { waitUntil: "networkidle2", timeout: 60_000 })
        .catch((error) => {
          if (error.name !== "TimeoutError") throw error;
          console.warn(`… ${shot.key} ${vp.name}: not idle after 60s, shooting anyway`);
        });
      await passBotCheck(page);
      await dismissConsent(page);
      await settle(page);

      // Just the fold — these sit inside a browser/phone frame on the page.
      const buffer = await page.screenshot({ type: "png", captureBeyondViewport: false });
      const out = path.join(OUT, `${shot.key}-${vp.name}.jpg`);
      await sharp(buffer).resize({ width: vp.out }).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
      console.log(`✓ ${shot.key} ${vp.name} → ${path.relative(process.cwd(), out)}`);
    } catch (error) {
      console.error(`✗ ${shot.key} ${vp.name}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
