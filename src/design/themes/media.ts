export const mediaThemes = {
  browser: { frame: 'browser', pixelated: false },
  phone: { frame: 'phone', pixelated: false },
  plain: { frame: 'none', pixelated: false },
  pixel: { frame: 'none', pixelated: true },
} as const;
export type MediaTheme = (typeof mediaThemes)[keyof typeof mediaThemes];
