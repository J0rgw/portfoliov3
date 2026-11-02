import ts from 'typescript';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, extname } from 'node:path';
const root = resolve('src');
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(resolve(dir, entry.name)) : [resolve(dir, entry.name)]);
const files = walk(root).filter((file) => /\.(ts|tsx|css)$/.test(file));
const graph = new Map();
const failures = [];
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const here = relative(root, file);
  if (/kicker|eyebrow/i.test(source)) failures.push(`${here}: eyebrow/kicker labels above headings are banned (AGENTS.md)`);
  const imports = [];
  if (extname(file) === '.css') {
    for (const match of source.matchAll(/@import\s+['"]([^'"]+)['"]/g)) imports.push(match[1]);
  } else {
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const visit = (node) => {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.push(node.moduleSpecifier.text);
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && ts.isStringLiteral(node.arguments[0])) imports.push(node.arguments[0].text);
      ts.forEachChild(node, visit);
    };
    visit(ast);
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
