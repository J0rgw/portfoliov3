import type { Chapter, SitePage } from './types';

/**
 * The site's pages (ADR-003, 2026-11-12): the album split into short pages so
 * each one is read, every one ending on the back cover. In album order: the
 * cover with the person (all of him since ADR-004, 2026-11-19), the releases,
 * the offer with the method, the bonus (a page listed in the menu and the footer,
 * never in the header). Drives the menu panel, the header and the footer tracklist.
 */
export const pages: SitePage[] = [
  { id: 'inicio', label: 'Inicio', path: '/' },
  { id: 'proyectos', label: 'Proyectos', path: '/proyectos/' },
  { id: 'servicios', label: 'Servicios', path: '/servicios/' },
  { id: 'libreria', label: 'Bonus', path: '/libreria/' },
];

/**
 * Chapters in album order, each on its page (docs/INFORMATION_ARCHITECTURE.md
 * §3). The cover (the hero) opens the home page and is not listed. Contact is
 * the back cover that closes every page.
 */
export const allChapters: Chapter[] = [
  { id: 'sobre-mi', number: '01', label: 'Sobre mí', ready: true, page: '/' },
  { id: 'proyectos', number: '02', label: 'Proyectos', ready: true, page: '/proyectos/', opens: true },
  { id: 'servicios', number: '03', label: 'Servicios', ready: true, page: '/servicios/', opens: true },
  { id: 'proceso', number: '04', label: 'Proceso', ready: true, page: '/servicios/' },
  { id: 'libreria', number: '05', label: 'Bonus', ready: true, page: '/libreria/', opens: true },
  { id: 'contacto', number: '06', label: 'Contacto', ready: true, page: '' },
];

export const chapters = allChapters.filter((chapter) => chapter.ready);

export const chapterById = (id: string): Chapter => {
  const chapter = allChapters.find((c) => c.id === id);
  if (!chapter) throw new Error(`Unknown chapter: ${id}`);
  return chapter;
};

/**
 * Link to a chapter, valid from any page: the page itself for a chapter that
 * opens it, an anchor on its page otherwise, and a same-page anchor for the
 * back cover, which closes every page. Unknown or hidden chapters lead home.
 */
export const chapterHref = (id: string): string => {
  const chapter = chapters.find((c) => c.id === id);
  if (!chapter) return '/';
  if (!chapter.page) return `#${chapter.id}`;
  return chapter.opens ? chapter.page : `${chapter.page}#${chapter.id}`;
};
