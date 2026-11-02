import { mailto } from './site';

/**
 * Bonus track: the upcoming component library. There is no waitlist backend,
 * so the action is an honest mailto: link (docs/IMPLEMENTATION_PLAN.md §5).
 */
export const library = {
  heading: 'Una librería de componentes React, en preparación',
  headline: 'Avísame',
  footnote: 'Te escribo una sola vez, cuando haya algo que probar.',
  // Scope and name are still open (implementation plan, open question 7): describe only what is known.
  body: 'Estoy preparando una librería de componentes para React. Todavía no tiene nombre público ni fecha: si quieres enterarte cuando haya algo que probar, avísame. Sobre cómo entiendo los componentes, hablé en el DevFest 2025 en «Deja de copiar y pegar componentes».',
  audience: 'Para equipos y desarrolladores que construyen interfaces con React y quieren una base consistente.',
  status: 'En preparación · sin fecha de lanzamiento',
  cta: {
    label: 'Avísame por email',
    href: mailto(
      'Bonus track: librería de componentes',
      'Hola Jorge,\n\nAvísame cuando la librería de componentes esté lista para probar.\n',
    ),
  },
  talk: { label: 'Repositorio de la charla', href: 'https://github.com/J0rgw/PonenciaCDD' },
  privacy:
    'Sin newsletter ni listas automáticas: me escribes tú y te respondo yo. Usaré tu email solo para avisarte del lanzamiento, y puedes pedirme que lo borre cuando quieras.',
};
