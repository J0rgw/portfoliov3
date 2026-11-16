import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { earlierProjects, galleryProjects, projectCatalog, projects, selectProjects, projectBySlug, nextProject, projectHref, projectSummaries, summarizeProject } from '../src/config/projects';
import { chapters, chapterHref, pages } from '../src/config/navigation';
import { matchRoute, prerenderPaths, normalizePath } from '../src/routes';
import { hero } from '../src/config/hero';

assert.equal(new Set(projectCatalog.map((p) => p.id)).size, projectCatalog.length, 'IDs must be unique');
assert.equal(new Set(projectCatalog.map((p) => p.slug)).size, projectCatalog.length, 'Slugs must be unique');
for (const project of projectCatalog) {
  assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(project.title && project.summary && project.overview.length && project.seo.description);
  assert.ok(existsSync(`public${project.assets?.social ?? `/images/og/${project.slug}.jpg`}`), 'Social artwork must exist');
}
// ADR-003: featured releases first, newest first within each group, `order` breaks ties.
const source = [
  { ...projectCatalog[0], id: 'older', slug: 'older', featured: false, date: '2025-01-01', order: 1 },
  { ...projectCatalog[1], id: 'hidden', slug: 'hidden', featured: true, visible: false, date: '2027-01-01', order: 0 },
  { ...projectCatalog[2], id: 'tie-b', slug: 'tie-b', featured: false, date: '2026-03-01', order: 20 },
  { ...projectCatalog[3], id: 'tie-a', slug: 'tie-a', featured: false, date: '2026-03-01', order: 10 },
  { ...projectCatalog[4], id: 'picked', slug: 'picked', featured: true, date: '2020-01-01', order: 30 },
];
const snapshot = JSON.stringify(source);
assert.deepEqual(selectProjects(source).map((p) => [p.id, p.track]), [['picked', 1], ['tie-a', 2], ['tie-b', 3], ['older', 4]]);
assert.equal(JSON.stringify(source), snapshot, 'Selection must not mutate editorial data');
assert.deepEqual(selectProjects([]), []);
assert.deepEqual(selectProjects(source.map((p) => ({ ...p, visible: false }))), []);
assert.equal(selectProjects([source[0]])[0].track, 1);
for (const project of projects) {
  const href = projectHref(project.slug);
  assert.deepEqual(matchRoute(href), { page: 'project', path: href, slug: project.slug });
  assert.ok(prerenderPaths.includes(href));
  assert.equal(projectBySlug(project.slug)?.id, project.id);
  assert.equal(summarizeProject(project).shortDescription, project.tagline);
}
// The gallery holds the featured releases (or the newest three) and the private work; the rest follow on the page.
assert.deepEqual([...galleryProjects, ...earlierProjects].map((p) => p.id), projects.map((p) => p.id));
if (projects.some((p) => p.featured)) assert.ok(galleryProjects.every((p) => p.featured) && earlierProjects.every((p) => !p.featured));
for (const project of galleryProjects) assert.ok(projectSummaries.some((p) => p.id === project.id));
for (const project of earlierProjects) assert.ok(!projectSummaries.some((p) => p.id === project.id));
for (const page of pages) assert.notEqual(matchRoute(page.path).page, 'not-found', `${page.path} must be a route`);
assert.equal(projectHref('removed-project'), '/proyectos/');
assert.equal(matchRoute('/proyectos/removed-project/').page, 'not-found');
assert.equal(normalizePath('/proyectos/mathgeon/index.html?x=1'), '/proyectos/mathgeon/');
if (projects.length) assert.equal(nextProject(projects.at(-1)!.slug)?.id, projects[0].id);
assert.equal(chapterHref('unknown'), '/');
assert.equal(chapterHref('contacto'), '#contacto', 'The back cover closes every page');
assert.equal(chapterHref('proyectos'), '/proyectos/');
assert.equal(chapterHref('proceso'), '/servicios/#proceso');
assert.equal(hero.nameLines.join(' '), hero.name, 'The hero name lines must spell the full name');
assert.equal(new Set(chapters.map((chapter) => chapter.id)).size, chapters.length);
console.log('Config: IDs, slugs, ordering, visibility, empty/single catalogues, source parity, routes, social assets and navigation passed.');
