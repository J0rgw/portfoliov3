import { mediaThemes, type MediaTheme } from '../../../design/themes/media';
const themes: Record<string, MediaTheme> = {
  '/images/projects/moneyman/dashboard-desktop.webp': mediaThemes.browser,
  '/images/projects/moneyman/dashboard-mobile.webp': mediaThemes.phone,
  '/images/projects/mathgeon/book-ui.webp': mediaThemes.pixel,
  '/images/projects/mathgeon/book-sprite.webp': mediaThemes.plain,
  '/images/projects/mathgeon/win-screen.webp': mediaThemes.pixel,
  '/images/projects/portfolio-v2/hero-desktop.webp': mediaThemes.browser,
  '/images/projects/portfolio-v2/projects-desktop.webp': mediaThemes.browser,
  '/images/projects/portfolio-v2/hero-mobile.webp': mediaThemes.phone,
};
export const mediaTheme = (src: string): MediaTheme => themes[src] ?? mediaThemes.plain;
