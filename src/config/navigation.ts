import type { Chapter } from './types';

/**
 * Home chapters in narrative order (docs/INFORMATION_ARCHITECTURE.md §3).
 * Drives the menu panel and the footer tracklist.
 * Chapter 00 (the cover) is the hero and is not listed.
 */
export const allChapters: Chapter[] = [
  { id: 'proyectos', number: '01', label: 'Proyectos', ready: true },
  { id: 'proceso', number: '02', label: 'Proceso', ready: true },
  { id: 'servicios', number: '03', label: 'Servicios', ready: true },
  { id: 'sobre-mi', number: '04', label: 'Sobre mí', ready: true },
  { id: 'libreria', number: '05', label: 'Bonus', ready: true },
  { id: 'contacto', number: '06', label: 'Contacto', ready: true },
];

export const chapters = allChapters.filter((chapter) => chapter.ready);

export const chapterById = (id: string): Chapter => {
  const chapter = allChapters.find((c) => c.id === id);
  if (!chapter) throw new Error(`Unknown chapter: ${id}`);
  return chapter;
};

/** Absolute link to a home chapter, valid from any page. */
export const chapterHref = (id: string): string => chapters.some((chapter) => chapter.id === id) ? `/#${id}` : '/#inicio';
