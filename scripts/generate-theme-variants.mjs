#!/usr/bin/env node
/**
 * Generates the dark-theme variants of the blue raster artwork: the hero disc
 * and cover, the marker arrow and the hero's scribble.
 *
 * `complement` (printed art): each pixel takes its HSL complement,
 * c' = max(r, g, b) + min(r, g, b) - c. That is an exact 180° hue turn which
 * keeps lightness and saturation, so the brand blue #409de8 lands exactly on
 * the dark accent #e88b40, greys and whites stay as they are, and texture,
 * grain and alpha are untouched.
 *
 * `ink` (the marker arrow, the hero's scribble): a stroke of dark translucent blue (median
 * lightness 0.25, hue 222°), which would vanish on the carbon ground and turn
 * olive if rotated. Every pixel takes the dark accent's hue and saturation,
 * and its lightness is lifted so the median stroke lands on the accent; the
 * alpha and the tonal variation of the stroke are kept.
 *
 * `defringe` (the hand photo used until 2026-11-10): not blue, but it was cut
 * out of a white ground and keeps a 1 px light fringe that only shows on the
 * carbon ground. Edge pixels take the colour of their most opaque neighbour
 * and the matte is choked by one pixel; the hand itself is unchanged. The
 * arm that replaced it is defringed at the source (scripts/prepare-hero-art.py)
 * and needs no dark file.
 *
 * The originals are never modified; the variants sit next to them as
 * *-dark.webp and are served by <picture> under prefers-color-scheme: dark
 * (DESIGN.md "Palette and material").
 *
 * Needs Playwright's driver, which is not a project dependency (Chrome does
 * the WebP decoding and encoding):
 *
 *   npm i --no-save playwright-core     # or set PLAYWRIGHT_CORE=/path/to/playwright-core/index.mjs
 *   node scripts/generate-theme-variants.mjs                                 # every source
 *   node scripts/generate-theme-variants.mjs /images/cutouts/scribble-460.webp   # only these
 *
 * Re-run whenever one of the sources below is replaced.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
/** WebP quality for the re-encode: the sources are already lossy. */
const QUALITY = 0.8;

/** The dark accent (tokens.css --palette-orange), the target of `ink`. */
const DARK_ACCENT = '#e88b40';

const SOURCES = [
  { path: '/images/hero/disc-560.webp', mode: 'complement' },
  { path: '/images/hero/disc-800.webp', mode: 'complement' },
  { path: '/images/hero/disc-1190.webp', mode: 'complement' },
  { path: '/images/hero/cover-480.webp', mode: 'complement' },
  { path: '/images/hero/cover-720.webp', mode: 'complement' },
  { path: '/images/hero/cover-880.webp', mode: 'complement' },
  { path: '/images/hero/cover-1024.webp', mode: 'complement' },
  { path: '/images/hero/cover-1200.webp', mode: 'complement' },
  { path: '/images/gallery/marker-arrow.webp', mode: 'ink' },
  { path: '/images/cutouts/scribble-460.webp', mode: 'ink' },
];

const darkPath = (path) => path.replace(/\.webp$/, '-dark.webp');

let chromium;
try {
  ({ chromium } = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core'));
} catch {
  console.error('  theme variants: playwright-core is not installed. Run `npm i --no-save playwright-core` or set PLAYWRIGHT_CORE.');
  process.exit(1);
}

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();

const only = process.argv.slice(2);
const unknown = only.filter((path) => !SOURCES.some((entry) => entry.path === path));
if (unknown.length) {
  console.error(`  theme variants: not a source: ${unknown.join(', ')}`);
  process.exit(1);
}

for (const { path: source, mode } of SOURCES.filter((entry) => !only.length || only.includes(entry.path))) {
  const input = readFileSync(join(PUBLIC, source)).toString('base64');
  const output = await page.evaluate(
    async ({ input, quality, mode, accent }) => {
      const toHsl = (r, g, b) => {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        const d = max - min;
        if (d === 0) return [0, 0, l];
        const s = d / (1 - Math.abs(2 * l - 1));
        let h;
        if (max === r) h = ((g - b) / d + 6) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        return [h * 60, s, l];
      };
      const toRgb = (h, s, l) => {
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        const [r, g, b] =
          h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
        return [r + m, g + m, b + m].map((v) => Math.round(v * 255));
      };
      const image = new Image();
      image.src = `data:image/webp;base64,${input}`;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true, colorSpace: 'srgb' });
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = pixels.data;
      if (mode === 'complement') {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const sum = Math.max(r, g, b) + Math.min(r, g, b);
          data[i] = sum - r;
          data[i + 1] = sum - g;
          data[i + 2] = sum - b;
        }
      } else if (mode === 'defringe') {
        const { width, height } = canvas;
        const source = new Uint8ClampedArray(data);
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            if (source[i + 3] === 0) continue;
            let minAlpha = 255;
            let best = i;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                const nx = Math.min(width - 1, Math.max(0, x + dx));
                const ny = Math.min(height - 1, Math.max(0, y + dy));
                const n = (ny * width + nx) * 4;
                minAlpha = Math.min(minAlpha, source[n + 3]);
                if (source[n + 3] > source[best + 3]) best = n;
              }
            }
            if (source[i + 3] < 255) {
              data[i] = source[best];
              data[i + 1] = source[best + 1];
              data[i + 2] = source[best + 2];
            }
            data[i + 3] = minAlpha;
          }
        }
      } else {
        const [th, ts, tl] = toHsl(...[1, 3, 5].map((at) => parseInt(accent.slice(at, at + 2), 16) / 255));
        // Median lightness of the solid stroke: the part that reads as the ink.
        const solid = [];
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] >= 200) solid.push(toHsl(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255)[2]);
        }
        solid.sort((a, b) => a - b);
        const lift = tl - solid[Math.floor(solid.length / 2)];
        for (let i = 0; i < data.length; i += 4) {
          const [, , l] = toHsl(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255);
          const [r, g, b] = toRgb(th, ts, Math.min(1, Math.max(0, l + lift)));
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
        }
      }
      context.putImageData(pixels, 0, 0);
      const blob = await new Promise((done) => canvas.toBlob(done, 'image/webp', quality));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);
      return { data: btoa(binary), width: canvas.width, height: canvas.height };
    },
    { input, quality: QUALITY, mode, accent: DARK_ACCENT },
  );
  const target = darkPath(source);
  writeFileSync(join(PUBLIC, target), Buffer.from(output.data, 'base64'));
  console.log(`  ${target} (${output.width}×${output.height}, ${mode})`);
}

await browser.close();
