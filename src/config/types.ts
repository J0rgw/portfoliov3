/**
 * Content model. Every piece of copy on the site is typed here and lives in
 * src/config/*. Schema rationale: docs/INFORMATION_ARCHITECTURE.md §5.
 */

export type SocialIcon = 'mail' | 'github' | 'linkedin';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
  /** Shown next to the label in lists, e.g. the handle. */
  detail?: string;
}

export interface Chapter {
  /** Anchor id on the home page. */
  id: string;
  /** Two-digit track number. */
  number: string;
  /** Short navigation label. */
  label: string;
  /** Unready chapters are never linked (no dead entries). */
  ready: boolean;
}

/* ---- Evidence --------------------------------------------------------------- */

export interface ImageMedia {
  kind: 'image';
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface CodeExcerpt {
  kind: 'code';
  title: string;
  language: string;
  code: string;
  caption?: string;
}

export interface DiagramStep {
  label: string;
  detail?: string;
}

export interface Diagram {
  kind: 'diagram';
  title: string;
  steps: DiagramStep[];
  caption?: string;
}

export interface StatesTable {
  kind: 'states';
  title: string;
  rows: { state: string; meaning: string }[];
  caption?: string;
}

export type Evidence = ImageMedia | CodeExcerpt | Diagram | StatesTable;

/* ---- Projects --------------------------------------------------------------- */

export type ProjectType = 'product' | 'internal-tool' | 'team' | 'tool' | 'portfolio';

export type ServiceId = 'web' | 'apps' | 'automation' | 'frontend';

/* ---- Cut-outs ---------------------------------------------------------------- */

/** Jorge's photographed cut-outs (public/images/cutouts/, scripts/extract-cutouts.py),
 *  plus Mathgeon's own sprite. Registered in config/assets.ts. */
export type CutoutId =
  | 'not-ai'
  | 'scribble'
  | 'bang'
  | 'headphones'
  | 'knob'
  | 'phone'
  | 'pin'
  | 'https'
  | 'hash'
  | 'barcode'
  | 'skull'
  | 'ipod'
  | 'jorge';

export interface Cutout {
  /** The smallest file; `srcSet` lists every width. */
  src: string;
  srcSet: string;
  /** Intrinsic size of the largest file: every file shares its aspect ratio. */
  width: number;
  height: number;
  /** Generated dark-theme ink (scripts/generate-theme-variants.mjs), for ink only. */
  dark?: { src: string; srcSet?: string };
  /** Pixel art: scaled without smoothing. */
  pixel?: boolean;
}

export interface ProjectAssets {
  disc?: { src: string; width: number; height: number };
  sleeve?: { src: string; width: number; height: number };
  social?: string;
  /** Cut-outs printed on the release's label, in the order of its cover theme's slots. */
  label?: CutoutId[];
  /** An object that comes with the disc in the gallery (the private disc's phone). */
  prop?: CutoutId;
}

export interface Project {
  id: string;
  slug: string;
  order: number;
  visible: boolean;
  assets?: ProjectAssets;
  title: string;
  /** One line, used in rows and the menu. */
  tagline: string;
  /** One or two sentences, used in the index and as the case-study lede. */
  summary: string;
  projectType: ProjectType;
  typeLabel: string;
  role: string;
  /** Collaborators, credited by their public handle. */
  team?: string[];
  status: { kind: 'in-progress' | 'working' | 'archived'; label: string };
  year: string;
  technologies: string[];
  services: ServiceId[];
  /* The case study's sections: prose, one paragraph per string. No lists or
     numbered items (2026-11-11); the stack is named inside the architecture's
     sentences. */
  overview: string[];
  context?: string[];
  challenge?: string[];
  goals?: string[];
  responsibilities?: string[];
  architecture?: string[];
  decisions?: string[];
  outcome?: string[];
  /** Real screenshots, command excerpts, diagrams and state tables. */
  evidence?: Evidence[];
  links: { repo?: string; live?: string };
  seo: { title: string; description: string };
}

/**
 * A release as the Projects gallery shows it. Derived from `Project` by
 * `summarizeProject` (src/config/projects.ts), never written by hand, so the
 * gallery and the case study always read the same source. ID is stable; slug
 * defines the URL and view-transition name. Track position is derived.
 */
export interface ProjectSummary {
  id: string;
  slug: string;
  /** Two-digit track number. */
  track: string;
  title: string;
  /** One sentence (the tagline). */
  shortDescription: string;
  /** The main technologies, at most three. */
  stack: string[];
  year: string;
  /** The case study. */
  href: string;
  /** Original optional artwork; the renderer supplies a generated fallback. */
  assets?: ProjectAssets;
  /** `private`: the closing NDA disc. No case study, no stack; it opens Contact. */
  kind?: 'release' | 'private';
  /** Replaces the gallery's "click to learn more" annotation. */
  hint?: string;
}

export interface PrivateWork {
  title: string;
  tagline: string;
  meta: string;
  note: string;
  /** The broken disc that closes the gallery (a cut-out photo, transparent ground). */
  disc: { src: string; width: number; height: number };
  /** Hangs beside the broken disc when it is selected: the phone, "call me". */
  prop?: CutoutId;
  visible: boolean;
}

/* ---- Services, process, about, library ------------------------------------- */

export interface Service {
  id: ServiceId;
  title: string;
  /** What the client gets, in one line (also the offer's JSON-LD description). */
  outcome: string;
  evidence: { label: string; href: string }[];
  cta: { label: string; subject: string };
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
  note: { text: string; source: { label: string; href: string } };
}

export interface Milestone {
  period: string;
  title: string;
  org: string;
  kind: 'education' | 'community' | 'work' | 'talk' | 'projects';
}

