/**
 * The disc to reopen the gallery on: the last case study seen in this tab.
 * Session storage only (a per-tab convenience); every access is guarded, as
 * storage can be unavailable (private windows, blocked site data).
 */
const KEY = 'jrg:projects:selected';

export const rememberProject = (slug: string): void => {
  try {
    sessionStorage.setItem(KEY, slug);
  } catch {
    // Not essential: the gallery then starts at the first disc.
  }
};

export const rememberedProject = (): string | null => {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
};
