/**
 * GSAP is only needed once someone opens the menu or hovers a project row, so
 * it is loaded on demand instead of shipping in the initial bundle
 * (docs/MOTION_SYSTEM.md §6). Components prefetch it when the browser is idle,
 * so by the first interaction it is normally already in memory.
 */
export type Gsap = (typeof import('gsap'))['gsap'];

let pending: Promise<Gsap> | null = null;

export const loadGsap = (): Promise<Gsap> => {
  pending ??= import('gsap').then((module) => module.gsap);
  return pending;
};

/** Start the download during idle time, without blocking anything. */
export const prefetchGsap = (): void => {
  if (typeof window === 'undefined' || pending) return;
  const run = () => void loadGsap();
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 });
  else globalThis.setTimeout(run, 2000);
};
