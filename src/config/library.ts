import { mailto } from './site';

/**
 * Bonus track: the upcoming component library. There is no waitlist backend,
 * so the action is an honest mailto: link (docs/IMPLEMENTATION_PLAN.md §5).
 * Distilled on 2026-11-10 (ADR-001): the status, the audience, one action, the
 * promise and the privacy note, each in a line; the talk is the one link out.
 */
export const library = {
  heading: 'Una librería de componentes React, en preparación',
  /** The phrase the marker underlines while the chapter holds (graphics/PenMark). */
  mark: 'en preparación',
  // Scope and name are still open (implementation plan, open question 7): describe only what is known.
  body: 'Todavía sin nombre ni fecha. Para equipos que construyen interfaces con React y quieren una base consistente.',
  /** The oversized word that is the action itself; the footnote's asterisk follows it. */
  headline: 'Avísame',
  /** Completes the headline's accessible name: "Avísame por email". */
  headlineHidden: 'por email',
  footnote: 'Te escribo una sola vez, cuando haya algo que probar.',
  privacy: 'Sin newsletter: uso tu email solo para avisarte del lanzamiento y lo borro cuando me lo pidas.',
  cta: {
    href: mailto(
      'Bonus track: librería de componentes',
      'Hola Jorge,\n\nAvísame cuando la librería de componentes esté lista para probar.\n',
    ),
  },
  talk: { label: 'Mi charla en DevFest 2025, «Deja de copiar y pegar componentes»', href: 'https://github.com/J0rgw/PonenciaCDD' },
};
