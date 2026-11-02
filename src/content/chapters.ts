import type { Chapter } from './types';

/**
 * Home chapters in narrative order (docs/INFORMATION_ARCHITECTURE.md §3).
 * Drives the menu panel and the footer tracklist.
 * Chapter 00 (the cover) is the hero and is not listed.
 */
const allChapters: Chapter[] = [
  { id: 'proyectos', number: '01', label: 'Proyectos', kicker: 'Pista 01 · Selección', ready: true },
  { id: 'proceso', number: '02', label: 'Proceso', kicker: 'Pista 02 · Notas del libreto', ready: true },
  { id: 'servicios', number: '03', label: 'Servicios', kicker: 'Pista 03 · Servicios', ready: true },
  { id: 'sobre-mi', number: '04', label: 'Sobre mí', kicker: 'Pista 04 · Créditos', ready: true },
  { id: 'libreria', number: '05', label: 'Bonus', kicker: 'Bonus track', ready: true },
  { id: 'contacto', number: '06', label: 'Contacto', kicker: 'Contraportada', ready: true },
];

export const chapters = allChapters.filter((chapter) => chapter.ready);

export const chapterById = (id: string): Chapter => {
  const chapter = allChapters.find((c) => c.id === id);
  if (!chapter) throw new Error(`Unknown chapter: ${id}`);
  return chapter;
};

/** Absolute link to a home chapter, valid from any page. */
export const chapterHref = (id: string): string => `/#${id}`;
