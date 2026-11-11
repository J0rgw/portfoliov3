import { instrumentLogos } from './about';

export interface TechLogo {
  src: string;
  alt: string;
  /** A light version for the dark theme, for marks that are black. */
  darkSrc?: string;
}

/** Marks used only in the projects' stacks (not in the About logo strip).
 *  Devicon "original" SVGs (MIT, devicon 2.18.0); the -dark files are the
 *  same drawing with the black (or navy) fill turned to the light ground colour.
 *  httpx (http-icon) and OpenSSH (ssh-icon): UXWing, free use, no attribution,
 *  redistribution not allowed; their -dark files swap black and white.
 *  yt-dlp: homarr-labs dashboard-icons (Apache-2.0); its original white
 *  prompt is the dark file, the light file prints it dark. */
const stackLogos: TechLogo[] = [
  { src: '/images/logo/bash.svg', darkSrc: '/images/logo/bash-dark.svg', alt: 'Bash' },
  { src: '/images/logo/git.svg', alt: 'Git' },
  { src: '/images/logo/sqlite.svg', darkSrc: '/images/logo/sqlite-dark.svg', alt: 'SQLite' },
  { src: '/images/logo/flask.svg', darkSrc: '/images/logo/flask-dark.svg', alt: 'Flask' },
  { src: '/images/logo/html5.svg', alt: 'HTML' },
  { src: '/images/logo/css3.svg', alt: 'CSS' },
  { src: '/images/logo/httpx.svg', darkSrc: '/images/logo/httpx-dark.svg', alt: 'httpx' },
  { src: '/images/logo/openssh.svg', darkSrc: '/images/logo/openssh-dark.svg', alt: 'OpenSSH' },
  { src: '/images/logo/yt-dlp.svg', darkSrc: '/images/logo/yt-dlp-dark.svg', alt: 'yt-dlp' },
];

const logos: TechLogo[] = [...instrumentLogos, ...stackLogos];

/** A technology's mark. A trailing version is ignored ("React 19",
 *  "Python 3.11"); no mark, undefined. */
export const techLogo = (name: string): TechLogo | undefined => {
  const base = name.replace(/\s+\d+(\.\d+)*$/, '').toLowerCase();
  return logos.find((logo) => logo.alt.toLowerCase() === base);
};
