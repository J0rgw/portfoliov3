#!/usr/bin/env node
/**
 * Fails the build when a referenced public asset does not exist on disk.
 *
 * Scans src/ and index.html for absolute asset paths (/images/..., /fonts/...)
 * and asserts each one resolves under public/. This is the guard that keeps
 * "no missing images" true instead of being a one-time cleanup.
 *
 * Paths listed in PENDING are known-missing content the author still owes.
 * They warn loudly but do not fail, so the build stays usable while content
 * is being gathered. Empty this list before shipping.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

const PENDING = new Set([]);

const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html']);
const ASSET_PATTERN = /["'`(]\s*(\/(?:images|fonts)\/[A-Za-z0-9_\-./]+?\.[A-Za-z0-9]{2,5})\s*["'`)]/g;

/** Recursively collect scannable source files. */
function collectFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectFiles(full));
    } else if (SCAN_EXTENSIONS.has(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

const targets = [...collectFiles(join(ROOT, 'src')), join(ROOT, 'index.html')];

/** @type {Map<string, Set<string>>} asset path -> files referencing it */
const references = new Map();

for (const file of targets) {
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(ASSET_PATTERN)) {
    const assetPath = match[1];
    if (!references.has(assetPath)) references.set(assetPath, new Set());
    references.get(assetPath).add(file.replace(`${ROOT}/`, ''));
  }
}

const missing = [];
const pending = [];

for (const [assetPath, sources] of [...references].sort()) {
  if (existsSync(join(PUBLIC, assetPath))) continue;
  (PENDING.has(assetPath) ? pending : missing).push({ assetPath, sources: [...sources] });
}

const checked = references.size;

if (pending.length > 0) {
  console.warn(`\n  ${pending.length} asset(s) pending, content still owed:`);
  for (const { assetPath, sources } of pending) {
    console.warn(`    ${assetPath}\n      referenced by ${sources.join(', ')}`);
  }
}

if (missing.length > 0) {
  console.error(`\n  ${missing.length} referenced asset(s) missing from public/:\n`);
  for (const { assetPath, sources } of missing) {
    console.error(`    ${assetPath}`);
    for (const source of sources) console.error(`      referenced by ${source}`);
  }
  console.error(`\n  Add the file(s) under public/, or correct the reference.\n`);
  process.exit(1);
}

console.log(`  assets ok: ${checked} reference(s) checked, all resolve under public/`);
