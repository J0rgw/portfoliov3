import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { projectCatalog, projects, selectProjects, projectBySlug, nextProject, projectHref, projectSummaries } from '../src/config/projects';
import { chapters, chapterHref } from '../src/config/navigation';
import { matchRoute, prerenderPaths, normalizePath } from '../src/routes';
import { hero } from '../src/config/hero';
import { processIntro } from '../src/config/process';
import { servicesIntro } from '../src/config/services';
import { aboutIntro } from '../src/config/about';
import { library } from '../src/config/library';
import { ui } from '../src/config/ui';

assert.equal(new Set(projectCatalog.map((p) => p.id)).size, projectCatalog.length, 'IDs must be unique');
assert.equal(new Set(projectCatalog.map((p) => p.slug)).size, projectCatalog.length, 'Slugs must be unique');
for (const project of projectCatalog) {
  assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(project.title && project.summary && project.overview.length && project.seo.description);
  assert.ok(existsSync(`public${project.assets?.social ?? `/images/og/${project.slug}.jpg`}`), 'Social artwork must exist');
}
const source = [
  { ...projectCatalog[0], id: 'later', slug: 'later', order: 20 },
  { ...projectCatalog[1], id: 'hidden', slug: 'hidden', visible: false, order: 0 },
  { ...projectCatalog[2], id: 'first', slug: 'first', order: 10 },
];
const snapshot = JSON.stringify(source);
assert.deepEqual(selectProjects(source).map((p) => [p.id, p.track]), [['first', 1], ['later', 2]]);
assert.equal(JSON.stringify(source), snapshot, 'Selection must not mutate editorial data');
assert.deepEqual(selectProjects([]), []);
assert.deepEqual(selectProjects(source.map((p) => ({ ...p, visible: false }))), []);
assert.equal(selectProjects([source[0]])[0].track, 1);
for (const project of projects) {
  const href = projectHref(project.slug);
  assert.deepEqual(matchRoute(href), { page: 'project', path: href, slug: project.slug });
  assert.ok(prerenderPaths.includes(href));
  assert.equal(projectBySlug(project.slug)?.id, project.id);
  assert.equal(projectSummaries.find((p) => p.id === project.id)?.shortDescription, project.tagline);
}
assert.equal(projectHref('removed-project'), '/proyectos/');
assert.equal(matchRoute('/proyectos/removed-project/').page, 'not-found');
assert.equal(normalizePath('/proyectos/mathgeon/index.html?x=1'), '/proyectos/mathgeon/');
if (projects.length) assert.equal(nextProject(projects.at(-1)!.slug)?.id, projects[0].id);
assert.equal(chapterHref('unknown'), '/#inicio');
assert.equal(hero.nameLines.join(' '), hero.name, 'The hero name lines must spell the full name');
assert.equal(new Set(chapters.map((chapter) => chapter.id)).size, chapters.length);
// The marker underlines a phrase of the copy (graphics/PenMark): it must still be in it.
for (const [text, mark] of [
  [processIntro.lede, processIntro.mark],
  [servicesIntro.lede, servicesIntro.mark],
  [aboutIntro.heading, aboutIntro.mark],
  [library.heading, library.mark],
  [ui.projects.heading, ui.projects.headingMark],
]) assert.ok(text.includes(mark), `Pen mark "${mark}" must be part of "${text}"`);
console.log('Config: IDs, slugs, ordering, visibility, empty/single catalogues, source parity, routes, social assets, navigation and pen marks passed.');
