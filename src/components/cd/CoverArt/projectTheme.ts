import { coverThemes, defaultCover, type ProjectCover } from '../../../design/themes/covers';

const themes: Record<string, ProjectCover> = {
  moneyman: coverThemes.ring,
  'client-leads': coverThemes.pipeline,
  mathgeon: coverThemes.pixel,
  'disco-download': coverThemes.disco,
  gitchange: coverThemes.terminal,
  'portfolio-v2': coverThemes.screen,
};
export const projectTheme = (id: string): ProjectCover => themes[id] ?? defaultCover;
