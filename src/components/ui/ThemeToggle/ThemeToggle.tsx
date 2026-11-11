import { useEffect } from 'react';
import { ui } from '../../../config/ui';
import { Moon, Sun } from '../Icon/Icon';
import { setTheme, syncThemeColor, useShownTheme } from '../theme/theme';
import '../../../design/components/ThemeToggle/ThemeToggle.css';

/**
 * Light/dark switch in the header (added for debugging the two themes, kept as
 * a real control). A toggle button: pressed means dark. Both icons are always
 * rendered and the `--theme-dark` token shows one (moon in light, sun in dark),
 * so the prerendered HTML is already right and nothing changes on hydration.
 * Without JavaScript it is hidden and the page simply follows the system.
 */
export function ThemeToggle() {
  const theme = useShownTheme();

  // A theme forced on an earlier page is already on <html>; align theme-color with it.
  useEffect(syncThemeColor, []);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={ui.theme.dark}
      title={ui.theme.dark}
      aria-pressed={theme === 'dark'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Moon className="theme-toggle__icon theme-toggle__icon--moon" size={20} aria-hidden="true" />
      <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={20} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
