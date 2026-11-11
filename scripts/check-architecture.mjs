import ts from 'typescript';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, extname } from 'node:path';
const root = resolve('src');
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(resolve(dir, entry.name)) : [resolve(dir, entry.name)]);
const files = walk(root).filter((file) => /\.(ts|tsx|css)$/.test(file));
const graph = new Map();
const failures = [];
// Middots between on-page data are banned (DESIGN.md "Typography"): lists take commas or a
// line each, and hierarchy takes type and space. Exempt: print on an object (a disc's rim,
// the CD-R's capacity line), document titles, social cards, the console's hidden track, and
// the project data, whose SEO titles and quoted README output keep theirs. The Projects
// pages lost their exemption with ADR-001 (2026-11-10): their copy separates like the rest.
const MIDDOT_FILES = new Set([
  'components/cd/Disc/Disc.tsx',
  'config/seo.ts',
  'config/hiddenTrack.ts',
  'seo/OgCard.tsx',
  'seo/head.ts',
  'seo/schema.ts',
  'config/projects.ts',
]);
const MIDDOT_PRINT = new Set(['80 min · 700 MB']);
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const here = relative(root, file);
  if (/kicker|eyebrow/i.test(source)) failures.push(`${here}: eyebrow/kicker labels above headings are banned (AGENTS.md)`);
  // Colour has one source (DESIGN.md "Palette and material"): raw values and palette
  // primitives live in design/tokens.css only. The disc's neutral material greys are the
  // documented exception.
  if (here !== 'design/tokens.css') {
    if (/#[0-9a-fA-F]{3,8}\b/.test(source)) failures.push(`${here}: raw hex colour; use a role from design/tokens.css`);
    if (/--palette-/.test(source)) failures.push(`${here}: --palette-* primitives are private to design/tokens.css`);
    if (extname(file) === '.css' && here !== 'design/components/Disc/Disc.css' && /\b(rgba?|hsla?)\(/.test(source))
      failures.push(`${here}: raw rgb()/hsl() colour; use a role from design/tokens.css`);
    if (extname(file) === '.css' && /prefers-color-scheme/.test(source))
      failures.push(`${here}: components never query the theme; make the value a token in design/tokens.css`);
  } else {
    // The dark mapping is written twice (system preference, forced data-theme): keep them identical.
    const block = (selector) => {
      const at = source.indexOf(selector + ' {');
      if (at < 0) return null;
      const open = at + selector.length + 2;
      return source.slice(open, source.indexOf('}', open)).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
    };
    const system = block(":root:not([data-theme='light'])");
    const forced = block(":root[data-theme='dark']");
    if (!system || !forced || system !== forced) failures.push(`${here}: the two dark-theme blocks differ; edit both`);
  }
  const imports = [];
  if (extname(file) === '.css') {
    for (const match of source.matchAll(/@import\s+['"]([^'"]+)['"]/g)) imports.push(match[1]);
  } else {
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const texts = [];
    const visit = (node) => {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.push(node.moduleSpecifier.text);
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && ts.isStringLiteral(node.arguments[0])) imports.push(node.arguments[0].text);
      // Copy, not comments: string and template literals and JSX text.
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node)) texts.push(node.text);
      if (ts.isTemplateExpression(node)) texts.push(node.head.text, ...node.templateSpans.map((span) => span.literal.text));
      ts.forEachChild(node, visit);
    };
    visit(ast);
    if (!MIDDOT_FILES.has(here))
      for (const text of texts.filter((text) => text.includes('·') && !MIDDOT_PRINT.has(text)))
        failures.push(`${here}: middot in "${text.trim()}"; separate data with type, space or a list (DESIGN.md "Typography")`);
  }
  const targets = [];
  for (const spec of imports.filter((spec) => spec.startsWith('.'))) {
    const base = resolve(dirname(file), spec);
    const target = [base, base + '.ts', base + '.tsx', base + '.css'].find(existsSync);
    if (!target) { failures.push(`${here}: unresolved ${spec}`); continue; }
    targets.push(target);
    const there = relative(root, target);
    const layer = here.split('/')[0];
    if (['config', 'design'].includes(layer) && !there.startsWith(layer + '/')) failures.push(`${here} must not import ${there}`);
    if (layer === 'components' && /^(sections|pages)\//.test(there)) failures.push(`${here} imports higher layer ${there}`);
    if (layer === 'sections' && there.startsWith('pages/')) failures.push(`${here} imports a page`);
  }
  graph.set(file, targets);
}
const visited = new Set(), active = new Set();
function visit(file, chain = []) {
  if (active.has(file)) { failures.push('Cycle: ' + [...chain, file].map((f) => relative(root, f)).join(' → ')); return; }
  if (visited.has(file)) return;
  active.add(file);
  for (const next of graph.get(file) ?? []) visit(next, [...chain, file]);
  active.delete(file); visited.add(file);
}
for (const file of files) visit(file);
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Architecture: ${files.length} files, resolved imports, no cycles or forbidden layer dependencies.`);
