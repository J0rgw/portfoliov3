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
  /* Sobre mí (ADR-004, 2026-11-19): from Jorge's photos and his own cut-outs
     (private/originals/me/; the audit of every one is in the ADR). The pass's portrait that
     stood in the chapter until then (`jorge`) left with it. */
  /** The album's cover photo, in colour (Gordale Scar, 2026-10-03). */
  'jorge-sitting': {
    src: '/images/cutouts/jorge-sitting-300.webp',
    srcSet: '/images/cutouts/jorge-sitting-300.webp 300w, /images/cutouts/jorge-sitting-460.webp 460w, /images/cutouts/jorge-sitting-600.webp 600w',
    width: 600, height: 1099,
  },
  /** Two more takes from the cover's afternoon: the page's first easter egg. */
  'jorge-laughing': {
    src: '/images/cutouts/jorge-laughing-300.webp',
    srcSet: '/images/cutouts/jorge-laughing-300.webp 300w, /images/cutouts/jorge-laughing-460.webp 460w, /images/cutouts/jorge-laughing-600.webp 600w',
    width: 600, height: 1165,
  },
  'jorge-smiling': {
    src: '/images/cutouts/jorge-smiling-260.webp',
    srcSet: '/images/cutouts/jorge-smiling-260.webp 260w, /images/cutouts/jorge-smiling-400.webp 400w, /images/cutouts/jorge-smiling-520.webp 520w',
    width: 520, height: 1245,
  },
  /** Odaiba, 2025-11-17, shading his eyes: he comes out to look up at Godzilla. */
  'jorge-looking': {
    src: '/images/cutouts/jorge-looking-160.webp',
    srcSet: '/images/cutouts/jorge-looking-160.webp 160w, /images/cutouts/jorge-looking-320.webp 320w',
    width: 320, height: 417,
  },
  /** For whoever types the Konami code. */
  'jorge-tongue': {
    src: '/images/cutouts/jorge-tongue-220.webp',
    srcSet: '/images/cutouts/jorge-tongue-220.webp 220w, /images/cutouts/jorge-tongue-440.webp 440w',
    width: 440, height: 684,
  },
  /** ATLAXIA's Santander X Award (UCAM HiTech, 2026-06-25), cut out of the group photo. */
  cheque: {
    src: '/images/cutouts/cheque-160.webp',
    srcSet: '/images/cutouts/cheque-160.webp 160w, /images/cutouts/cheque-320.webp 320w, /images/cutouts/cheque-467.webp 467w',
    width: 467, height: 302,
  },
  /** His DIATIC26 badge, in his hand (Murcia, 2026-05-14). */
  badge: {
    src: '/images/cutouts/badge-100.webp',
    srcSet: '/images/cutouts/badge-100.webp 100w, /images/cutouts/badge-200.webp 200w, /images/cutouts/badge-400.webp 400w',
    width: 400, height: 554,
  },
  /** VDS 2026 at the Ciudad de las Artes y las Ciencias (Valencia, 2026-10-21): a print. */
  vds: {
    src: '/images/cutouts/vds-240.webp',
    srcSet: '/images/cutouts/vds-240.webp 240w, /images/cutouts/vds-400.webp 400w',
    width: 400, height: 526,
  },
  /** The Godzilla head over Shinjuku (2025-11-17), without the cinema sign under it. */
  godzilla: {
    src: '/images/cutouts/godzilla-160.webp',
    srcSet: '/images/cutouts/godzilla-160.webp 160w, /images/cutouts/godzilla-320.webp 320w, /images/cutouts/godzilla-600.webp 600w',
    width: 600, height: 554,
  },
  /** The Gundam at the Ciudad de las Artes y las Ciencias (Valencia, 2026-09-05), Jorge's
   *  photo: its head lifted against the sky, cut by the photo's frame at the sides and foot. */
  gundam: {
    src: '/images/cutouts/gundam-120.webp',
    srcSet: '/images/cutouts/gundam-120.webp 120w, /images/cutouts/gundam-240.webp 240w, /images/cutouts/gundam-420.webp 420w',
    width: 420, height: 541,
  },
  /** The same Gundam a few seconds before, with the building behind it: a print, hidden. */
  'gundam-valencia': {
    src: '/images/cutouts/gundam-valencia-240.webp',
    srcSet: '/images/cutouts/gundam-valencia-240.webp 240w, /images/cutouts/gundam-valencia-400.webp 400w',
    width: 400, height: 304,
  },
  /** August's peppers and cucumbers in their bucket (2026-08-11), the chair taken out. */
  peppers: {
    src: '/images/cutouts/peppers-160.webp',
    srcSet: '/images/cutouts/peppers-160.webp 160w, /images/cutouts/peppers-320.webp 320w, /images/cutouts/peppers-600.webp 600w',
    width: 600, height: 534,
  },
  /** Where the cover was taken: the whole photo, as a print. */
  gordale: {
    src: '/images/cutouts/gordale-240.webp',
    srcSet: '/images/cutouts/gordale-240.webp 240w, /images/cutouts/gordale-480.webp 480w',
    width: 480, height: 633,
  },
  /** Mathgeon's own win screen sprite, not a supplied cut-out. */
  skull: {
    src: '/images/projects/mathgeon/win-screen.webp',
    srcSet: '/images/projects/mathgeon/win-screen.webp 167w',
    width: 167, height: 289,
    pixel: true,
  },
};
