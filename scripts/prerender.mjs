#!/usr/bin/env node
/**
 * Static prerendering (docs/INFORMATION_ARCHITECTURE.md §2).
 *
 * Takes the client build's dist/index.html as a template, renders every route
 * from src/routes.ts with the SSR bundle (dist-ssr/entry-server.js), and writes
 * dist/<route>/index.html with its own <head>. Then writes sitemap.xml.
 * Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const template = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !/<!--app-head-->[\s\S]*?<!--\/app-head-->/.test(template)) {
  console.error('  prerender: dist/index.html is missing the <!--app-head--> or <!--app-html--> markers.');
  process.exit(1);
}

const { render, prerenderPaths, site } = await import(pathToFileURL(join(ROOT, 'dist-ssr', 'entry-server.js')).href);

// Inline the stylesheet: it is render-blocking and small (~13 kB gzip), and
// removing the round trip measurably lowers LCP on slow connections.
const stylesheet = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
const inlined = stylesheet
  ? template.replace(stylesheet[0], () => `<style>${readFileSync(join(DIST, stylesheet[1]), 'utf8')}</style>`)
  : template;

const written = [];
for (const path of prerenderPaths) {
  const { html, head, key } = render(path);
  const page = inlined
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, () => head)
    .replace('<div id="root">', () => `<div id="root" data-route="${key}">`)
    .replace('<!--app-html-->', () => html);
  const file = path.endsWith('.html') ? join(DIST, path) : join(DIST, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  written.push(file.replace(`${ROOT}/`, ''));
}

const indexable = prerenderPaths.filter((path) => !path.endsWith('.html'));
const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable.map((path) => `  <url><loc>${site.baseUrl}${path}</loc><lastmod>${lastmod}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.baseUrl}/sitemap.xml\n`);

console.log(`  prerendered ${written.length} page(s):`);
for (const file of written) console.log(`    ${file}`);
console.log(`  sitemap.xml: ${indexable.length} url(s)`);
