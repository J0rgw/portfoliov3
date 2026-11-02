#!/usr/bin/env node
/**
 * Fails the build when a prerendered page breaks the SEO contract
 * (docs/INFORMATION_ARCHITECTURE.md §7, AGENTS.md §10): language, one h1,
 * title, description, canonical, Open Graph (with an existing image),
 * Twitter card, valid JSON-LD, no placeholder copy.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const BASE_URL = 'https://portfolio.jarcas.dev';

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return entry.endsWith('.html') ? [full] : [];
  });

const attr = (html, pattern) => html.match(pattern)?.[1]?.trim() ?? '';
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const errors = [];
const titles = new Map();
const files = htmlFiles(DIST);

for (const file of files) {
  const rel = file.replace(`${DIST}/`, '');
  const html = readFileSync(file, 'utf8');
  const fail = (message) => errors.push(`${rel}: ${message}`);
  const isNotFound = rel === '404.html';

  if (!/<html lang="es"/.test(html)) fail('missing <html lang="es">');

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) fail(`expected exactly one <h1>, found ${h1Count}`);

  const title = decode(attr(html, /<title>([^<]*)<\/title>/));
  if (!title) fail('missing <title>');
  else if (!isNotFound) {
    if (titles.has(title)) fail(`duplicate title, also used by ${titles.get(title)}`);
    titles.set(title, rel);
  }
  if (title.length > 70) fail(`title is ${title.length} characters (max 70)`);

  const description = decode(attr(html, /<meta name="description" content="([^"]*)"/));
  if (description.length < 50 || description.length > 170) {
    fail(`meta description is ${description.length} characters (expected 50–170)`);
  }

  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  if (!canonical.startsWith(BASE_URL)) fail(`canonical must be absolute on ${BASE_URL}`);

  const robots = attr(html, /<meta name="robots" content="([^"]*)"/);
  if (isNotFound && !robots.includes('noindex')) fail('404 must be noindex');
  if (!isNotFound && robots.includes('noindex')) fail('indexable page marked noindex');

  for (const property of ['og:title', 'og:description', 'og:url', 'og:image']) {
    if (!attr(html, new RegExp(`<meta property="${property}" content="([^"]*)"`))) fail(`missing ${property}`);
  }
  if (!/<meta name="twitter:card" content="summary_large_image"/.test(html)) fail('missing twitter:card');

  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (ogImage.startsWith(BASE_URL)) {
    const local = join(DIST, ogImage.slice(BASE_URL.length));
    if (!existsSync(local)) fail(`og:image does not exist: ${ogImage.slice(BASE_URL.length)}`);
  } else if (ogImage) {
    fail('og:image must be an absolute URL on the site');
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch {
      fail('invalid JSON-LD');
    }
  }

  if (/lorem ipsum|placeholder/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) fail('placeholder copy found');
}

if (errors.length > 0) {
  console.error(`\n  SEO check failed (${errors.length}):`);
  for (const error of errors) console.error(`    ${error}`);
  console.error('');
  process.exit(1);
}

console.log(`  seo ok: ${files.length} page(s) checked`);
