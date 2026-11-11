import { site } from './site';

/**
 * The hidden track (pista oculta), like the unlisted song at the end of a 2000s CD:
 * an ASCII disc and a note printed once in the browser console, for whoever opens it.
 * Decorative; nothing here is needed to use the site. Spanish, like the rest of it.
 */
export const hiddenTrack = {
  art: [
    "       _..-------------.._",
    "    .-'       JORGE       '-.",
    "  .'          ARCAS          '.",
    " /        .-'''''''''-.        \\",
    ";         /    .-.    \\         ;",
    "|         |   ( o )   |         |",
    ";         \\    '-'    /         ;",
    " \\        '-._______.-'        /",
    "  '.         VOL. 01         .'",
    "    '-.      " + site.catalog + "      .-'",
    "       ''--...........--''",
  ].join('\n'),
  lines: [
    `Pista oculta · ${site.catalog}`,
    'Si has abierto la consola, ya hablamos el mismo idioma.',
    `Escríbeme: ${site.email}`,
  ],
};
