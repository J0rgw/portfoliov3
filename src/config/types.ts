/**
 * Content model. Every piece of copy on the site is typed here and lives in
 * src/config/*. Schema rationale: docs/INFORMATION_ARCHITECTURE.md §5.
 */

export type SocialIcon = 'mail' | 'github' | 'linkedin';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface Chapter {
  /** Anchor id on its page. */
  id: string;
  /** Two-digit track number. */
  number: string;
  /** Short navigation label. */
  label: string;
  /** Unready chapters are never linked (no dead entries). */
  ready: boolean;
  /** The page it lives on ('/', '/servicios/'). Empty: it closes every page (the back cover). */
  page: string;
  /** It opens its page (its heading is the page's h1): links lead to the page, not to an anchor. */
  opens?: boolean;
}

/** One of the site's pages (ADR-003): the menu, the header and the footer list them. */
export interface SitePage {
  id: string;
  label: string;
  path: string;
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
  // Sobre mí (ADR-004, 2026-11-19): Jorge, the things in his sentence and what they hide.
  | 'jorge-sitting'
  | 'jorge-laughing'
  | 'jorge-smiling'
  | 'jorge-looking'
  | 'jorge-tongue'
  | 'cheque'
  | 'badge'
  | 'vds'
  | 'godzilla'
  | 'gundam'
  | 'gundam-valencia'
  | 'peppers'
  | 'gordale';

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
  /** In the gallery that opens /proyectos/ (ADR-003, Q62): Jorge's choice, three of them. */
  featured: boolean;
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
  /** When it went public, ISO: its repository's first commit (GitHub, checked 2026-11-12), or
   *  its stated year when the work predates its repository. Orders the catalogue newest first
   *  within the featured releases and within the rest (ADR-003); `order` only breaks ties. */
  date: string;
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

/* ---- Sobre mí, the page (ADR-004) ---------------------------------------------- */

/** One of Jorge's things, set right after the word it stands for in his sentence. */
export interface AboutThing {
  /** The cut-out shown in the sentence. */
  cutout: CutoutId;
  /** What it is, where and when: the button's name, and the tag shown when it is picked up. */
  caption: string;
  /** A second cut-out that only comes out when the thing is picked up. */
  hidden?: CutoutId;
}

/** A run of the sentence: plain words, or a word with its thing after it. */
export type AboutRun = string | { words: string; thing: AboutThing };

/** One take of Jorge from the cover's afternoon (the easter egg cycles them). */
export interface AboutTake {
  cutout: CutoutId;
  /** Read by assistive technology, and shown in the tag. */
  caption: string;
}

