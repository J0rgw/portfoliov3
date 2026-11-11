#!/usr/bin/env node
/**
 * Generates the 1200×630 social preview images in public/images/og/ from the
 * site's own components (src/seo/OgCard.tsx), fonts and built CSS.
 *
 * Needs a previous `npm run build` (for dist/assets/*.css and dist-ssr/) and
 * Playwright's browser driver, which is not a project dependency:
 *
 *   npm i --no-save playwright-core     # or set PLAYWRIGHT_CORE=/path/to/playwright-core/index.mjs
 *   npm run og                          # CHROME_PATH overrides the Chrome binary
 *
 * Re-run whenever a project's title, tagline, cover or the hero copy changes,
 * then rebuild so the check-seo step sees the new files. Social cards are always
 * rendered in the light theme (blue identity), whatever the machine prefers.
 *
 * The cards carry real images (the printed discs' hub, rim and wear, their label
 * cut-outs): the page gets a base URL whose /images/… requests are served from
 * public/, and every image is decoded before the capture.
 */
import { mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'images', 'og');
const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let chromium;
try {
  ({ chromium } = await import(process.env.PLAYWRIGHT_CORE ?? 'playwright-core'));
} catch {
  console.error('  og: playwright-core is not installed. Run `npm i --no-save playwright-core` or set PLAYWRIGHT_CORE.');
  process.exit(1);
}

const { renderOgCard, ogKeys } = await import(pathToFileURL(join(ROOT, 'dist-ssr', 'entry-server.js')).href);

const cssFile = readdirSync(join(ROOT, 'dist', 'assets')).find((file) => file.endsWith('.css'));
const siteCss = readFileSync(join(ROOT, 'dist', 'assets', cssFile), 'utf8');
const ogCss = readFileSync(join(ROOT, 'src', 'design', 'seo', 'og.css'), 'utf8');

// Inline the fonts: the card is loaded with setContent, so relative URLs would not resolve.
const font = (file) => `data:font/woff2;base64,${readFileSync(join(ROOT, 'public', 'fonts', file)).toString('base64')}`;
const fontFaces = [
  ['Estrella', 400, 'estrella-early.woff2'],
  ['Poppins', 400, 'poppins-regular-latin.woff2'],
  ['Poppins', 600, 'poppins-semibold-latin.woff2'],
  ['Poppins', 700, 'poppins-bold-latin.woff2'],
  ['Poppins', 800, 'poppins-extrabold-latin.woff2'],
]
  .map(([family, weight, file]) => `@font-face{font-family:'${family}';font-weight:${weight};src:url(${font(file)}) format('woff2');font-display:block}`)
  .join('\n');

mkdirSync(OUT, { recursive: true });
const ORIGIN = 'http://og.local';
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, colorScheme: 'light' });
await context.route(`${ORIGIN}/**`, (route) => route.fulfill({ path: join(ROOT, 'public', decodeURIComponent(new URL(route.request().url()).pathname)) }));
const page = await context.newPage();

for (const key of ogKeys) {
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><base href="${ORIGIN}/"><style>${siteCss}\n${fontFaces}\n${ogCss}</style></head><body>${renderOgCard(key)}</body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map((image) => image.decode().catch(() => {}))));
  const file = join(OUT, `${key}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 86 });
  console.log(`  og: public/images/og/${key}.jpg`);
}

await browser.close();
