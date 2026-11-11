import { useSyncExternalStore } from 'react';

/**
 * Colour theme (DESIGN.md "Palette and material"). The page follows the
 * system; `data-theme` on <html> forces one. The forced choice lives in
 * sessionStorage, so it survives navigation in the tab and resets when the tab
 * closes. index.html restores it before first paint (CSS never flashes); this
 * module keeps React in step: <picture> sources, theme-color and the toggle.
 */
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';
const listeners = new Set<() => void>();

const forcedTheme = (): Theme | null => {
  const value = document.documentElement.dataset.theme;
  return value === 'light' || value === 'dark' ? value : null;
};

const systemTheme = (): Theme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

const shownTheme = (): Theme => forcedTheme() ?? systemTheme();

function subscribe(listener: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  listeners.add(listener);
  media.addEventListener('change', listener);
  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', listener);
  };
}

/** The media of a `<source>` that holds a dark variant. */
export const darkSourceMedia = (forced: Theme | null) => (forced ? (forced === 'dark' ? 'all' : 'not all') : DARK_QUERY);

/** Points each per-scheme theme-color meta (index.html) at the forced theme, or back at the system. */
export function syncThemeColor() {
  const forced = forcedTheme();
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"][data-scheme]').forEach((meta) => {
    const scheme = meta.dataset.scheme;
    meta.media = forced ? (scheme === forced ? 'all' : 'not all') : `(prefers-color-scheme: ${scheme})`;
  });
}

/** Shows `theme`. Choosing the system's own theme drops the override instead of forcing it. */
export function setTheme(theme: Theme) {
  const forced = theme === systemTheme() ? null : theme;
  const root = document.documentElement;
  if (forced) root.dataset.theme = forced;
  else delete root.dataset.theme;
  try {
    if (forced) sessionStorage.setItem(STORAGE_KEY, forced);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked: the choice simply lasts until the next page load.
  }
  syncThemeColor();
  listeners.forEach((listener) => listener());
}

/** The forced theme, or null while following the system (always null on the server). */
export const useForcedTheme = () => useSyncExternalStore(subscribe, forcedTheme, () => null);

/** The theme on screen ('light' on the server; corrected right after hydration). */
export const useShownTheme = () => useSyncExternalStore(subscribe, shownTheme, (): Theme => 'light');
