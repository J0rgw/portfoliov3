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

export interface ProjectAssets {
  disc?: { src: string; width: number; height: number };
  sleeve?: { src: string; width: number; height: number };
  social?: string;
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
  overview: string[];
  context?: string[];
  challenge?: string[];
  goals?: string[];
  responsibilities?: string[];
  architecture?: {
    summary: string[];
    stack: { label: string; items: string[] }[];
  };
  decisions?: { title: string; body: string }[];
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
}

export interface PrivateWork {
  title: string;
  tagline: string;
  meta: string;
  note: string;
  visible: boolean;
}

/* ---- Services, process, about, library ------------------------------------- */

export interface Service {
  id: ServiceId;
  title: string;
  /** The client's problem, in their words. */
  problem: string;
  outcome: string;
  scope: string[];
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
  detail?: string;
  kind: 'education' | 'community' | 'work' | 'talk' | 'projects';
}

export interface Principle {
  title: string;
  body: string;
}
