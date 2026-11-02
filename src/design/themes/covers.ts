export type CoverMotif = 'ring' | 'pipeline' | 'pixel' | 'disco' | 'terminal' | 'screen' | 'private';
export interface ProjectCover { motif: CoverMotif; field: string; ink: string; detail?: string }

export const coverThemes = {
  ring: { motif: 'ring', field: '#111216', ink: '#f3f1ec', detail: '#3d7bf5' },
  pipeline: { motif: 'pipeline', field: '#0d5c52', ink: '#f3f1ec', detail: '#9fe3d3' },
  pixel: { motif: 'pixel', field: '#3a2416', ink: '#e8b04a', detail: '#f0e2b6' },
  disco: { motif: 'disco', field: '#e4572e', ink: '#141414', detail: '#f3f1ec' },
  terminal: { motif: 'terminal', field: '#14263a', ink: '#f3f1ec', detail: '#8be28b' },
  screen: { motif: 'screen', field: '#d7d2c8', ink: '#141414', detail: '#1b62ae' },
  private: { motif: 'private', field: '#c8cbd2', ink: '#141414' },
} satisfies Record<CoverMotif, ProjectCover>;
export const defaultCover = coverThemes.ring;
