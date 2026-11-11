import type { Cutout, CutoutId } from './types';

/** Original and derived files are preserved under public/. See DESIGN.md for provenance.
 *  `*Dark` entries are the dark-theme variants from scripts/generate-theme-variants.mjs. */
export const assets = {
  // The header's "Jorgw" wordmark (logo-jorgw*.webp) gave way to the JA monogram on
  // 2026-11-10 (graphics/Monogram); the files stay in public/images/brand/.
  markerArrow: '/images/gallery/marker-arrow.webp',
  markerArrowDark: '/images/gallery/marker-arrow-dark.webp',
  hero: {
    /** Jorge's printed CD at 1200 px (2026-11-10), cut out of its black ground by
     *  scripts/prepare-hero-art.py. */
    disc: '/images/hero/disc-560.webp',
    discSet: '/images/hero/disc-560.webp 560w, /images/hero/disc-800.webp 800w, /images/hero/disc-1190.webp 1190w',
    discAvifSet: '/images/hero/disc-560.avif 560w, /images/hero/disc-800.avif 800w, /images/hero/disc-1190.avif 1190w',
    discDark: '/images/hero/disc-560-dark.webp',
    discDarkSet: '/images/hero/disc-560-dark.webp 560w, /images/hero/disc-800-dark.webp 800w, /images/hero/disc-1190-dark.webp 1190w',
    discSize: 1190,
    /** From Jorge's 1200 px print (scripts/prepare-hero-art.py, 2026-11-10). */
    cover: '/images/hero/cover-720.webp',
    coverSet: '/images/hero/cover-480.webp 480w, /images/hero/cover-720.webp 720w, /images/hero/cover-880.webp 880w, /images/hero/cover-1024.webp 1024w, /images/hero/cover-1200.webp 1200w',
    coverDark: '/images/hero/cover-720-dark.webp',
    coverDarkSet: '/images/hero/cover-480-dark.webp 480w, /images/hero/cover-720-dark.webp 720w, /images/hero/cover-880-dark.webp 880w, /images/hero/cover-1024-dark.webp 1024w, /images/hero/cover-1200-dark.webp 1200w',
    film: '/images/hero/film-1024.webp', filmSet: '/images/hero/film-640.webp 640w, /images/hero/film-1024.webp 1024w',
    /** Jorge's own hand holding a real case (2026-11-10), the case cut away by
     *  scripts/prepare-hero-art.py. Not blue and clean-edged: one file for both themes. */
    arm: '/images/hero/arm-760.webp',
    armSet: '/images/hero/arm-760.webp 760w, /images/hero/arm-1260.webp 1260w',
    armWidth: 1260,
    armHeight: 1030,
  },
  /** The printed discs' photographic finish (scripts/generate-disc-finish.py): the hero
   *  disc's real hub and rim, and real scratches from the broken disc. */
  disc: {
    shell: '/images/disc/shell.webp',
    wear: '/images/disc/wear.webp',
  },
};

/**
 * Jorge's cut-outs (private/originals/assets/, supplied 2026-11-09), keyed out of their
 * grounds by scripts/extract-cutouts.py: widths and sizes here match its recipes.
 * Natural colours: they are photographed objects (DESIGN.md "Palette and material");
 * only the scribble, which is ink, has a dark-theme file.
 */
export const cutouts: Record<CutoutId, Cutout> = {
  'not-ai': {
    src: '/images/cutouts/not-ai-200.webp',
    srcSet: '/images/cutouts/not-ai-200.webp 200w, /images/cutouts/not-ai-300.webp 300w, /images/cutouts/not-ai-400.webp 400w',
    width: 400, height: 394,
  },
  scribble: {
    src: '/images/cutouts/scribble-460.webp',
    srcSet: '/images/cutouts/scribble-460.webp 460w',
    width: 460, height: 255,
    dark: { src: '/images/cutouts/scribble-460-dark.webp' },
  },
  bang: {
    src: '/images/cutouts/bang-120.webp',
    srcSet: '/images/cutouts/bang-120.webp 120w, /images/cutouts/bang-240.webp 240w',
    width: 240, height: 310,
  },
  headphones: {
    src: '/images/cutouts/headphones-360.webp',
    srcSet: '/images/cutouts/headphones-360.webp 360w, /images/cutouts/headphones-540.webp 540w, /images/cutouts/headphones-720.webp 720w',
    width: 720, height: 1068,
  },
  knob: {
    src: '/images/cutouts/knob-180.webp',
    srcSet: '/images/cutouts/knob-180.webp 180w, /images/cutouts/knob-270.webp 270w, /images/cutouts/knob-360.webp 360w',
    width: 360, height: 363,
  },
  phone: {
    src: '/images/cutouts/phone-100.webp',
    srcSet: '/images/cutouts/phone-100.webp 100w, /images/cutouts/phone-200.webp 200w',
    width: 200, height: 778,
  },
  pin: {
    src: '/images/cutouts/pin-180.webp',
    srcSet: '/images/cutouts/pin-180.webp 180w, /images/cutouts/pin-340.webp 340w',
    width: 340, height: 445,
  },
  https: {
    src: '/images/cutouts/https-260.webp',
    srcSet: '/images/cutouts/https-260.webp 260w, /images/cutouts/https-520.webp 520w',
    width: 520, height: 227,
  },
  hash: {
    src: '/images/cutouts/hash-200.webp',
    srcSet: '/images/cutouts/hash-200.webp 200w, /images/cutouts/hash-400.webp 400w',
    width: 400, height: 432,
  },
  barcode: {
    src: '/images/cutouts/barcode-280.webp',
    srcSet: '/images/cutouts/barcode-280.webp 280w, /images/cutouts/barcode-560.webp 560w',
    width: 560, height: 244,
  },
  /** Proceso's object (ADR-001): the iPod whose screen prints the playlist of steps.
   *  The screen's box in the file, in %, lives with its styling (LinerNotes.css). */
  ipod: {
    src: '/images/cutouts/ipod-460.webp',
    srcSet: '/images/cutouts/ipod-460.webp 460w, /images/cutouts/ipod-760.webp 760w, /images/cutouts/ipod-920.webp 920w',
    width: 920, height: 1513,
  },
  /** Sobre mí's object (ADR-001): Jorge's portrait, the pass's photo, with a scissor margin. */
  jorge: {
    src: '/images/cutouts/jorge-320.webp',
    srcSet: '/images/cutouts/jorge-320.webp 320w, /images/cutouts/jorge-480.webp 480w',
    width: 480, height: 565,
  },
  /** Mathgeon's own win screen sprite, not a supplied cut-out. */
  skull: {
    src: '/images/projects/mathgeon/win-screen.webp',
    srcSet: '/images/projects/mathgeon/win-screen.webp 167w',
    width: 167, height: 289,
    pixel: true,
  },
};
