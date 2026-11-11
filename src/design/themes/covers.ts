export type CoverMotif = 'ring' | 'pipeline' | 'pixel' | 'disco' | 'terminal' | 'screen' | 'private';

/**
 * Where a cut-out is printed on a label, on CoverArt's 400×400 grid: its centre, its
 * width and its turn. On a disc the hub covers r < 39 (the hero disc's measured clear
 * hub, 19.5 % of the radius) and the rim r > 193; a cut-out may run under either, as
 * a print does.
 */
export interface LabelSlot {
  x: number;
  y: number;
  w: number;
  r?: number;
}

/** Paints for a printed cover, as CSS colours read from design tokens. */
export interface ProjectCover {
  motif: CoverMotif;
  field: string;
  ink: string;
  detail?: string;
  /** Slots for the release's label cut-outs (config: `assets.label`), in order. A
   *  project without cut-outs prints the generated motif instead. */
  label?: LabelSlot[];
}

/*
 * Printed covers use the print inks, which stay put in both themes, and the
 * theme accent, which turns blue → orange with the rest of the CD identity
 * (DESIGN.md "Palette and material"). Variety comes from which of the three takes
 * the field and from the photographed cut-out printed on it, which keeps its own
 * colours (Jorge's decision, 2026-11-09). The title sits in the top band; the
 * cut-outs below it and over its edge, like the photo in front of "ARCAS" on the
 * hero cover.
 */
const dark = 'var(--print-dark)';
const light = 'var(--print-light)';
const silver = 'var(--print-silver)';
const accent = 'var(--accent)';

export const coverThemes = {
  // A torn price label across the lower band.
  ring: { motif: 'ring', field: dark, ink: light, detail: accent, label: [{ x: 204, y: 292, w: 236, r: -7 }] },
  // A pin dropped on the map, its point towards the hub.
  pipeline: { motif: 'pipeline', field: accent, ink: dark, detail: dark, label: [{ x: 268, y: 268, w: 128, r: 14 }] },
  // The game's sprite, pixel for pixel.
  pixel: { motif: 'pixel', field: dark, ink: accent, detail: light, label: [{ x: 200, y: 292, w: 74 }] },
  // Headphones round the lower left of the hub, the volume knob beside them.
  disco: {
    motif: 'disco',
    field: accent,
    ink: dark,
    detail: light,
    label: [
      { x: 132, y: 262, w: 142, r: -16 },
      { x: 296, y: 300, w: 78, r: 10 },
    ],
  },
  // A paper hash, large, off centre.
  terminal: { motif: 'terminal', field: light, ink: dark, detail: accent, label: [{ x: 262, y: 270, w: 150, r: 8 }] },
  // The address sticker across the lower band.
  screen: { motif: 'screen', field: silver, ink: dark, detail: accent, label: [{ x: 200, y: 300, w: 222, r: -6 }] },
  private: { motif: 'private', field: silver, ink: dark },
} satisfies Record<CoverMotif, ProjectCover>;
export const defaultCover = coverThemes.ring;
