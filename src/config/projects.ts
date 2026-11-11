import { chapterHref } from './navigation';
import type { PrivateWork, Project, ProjectSummary } from './types';

/**
 * Releases and their case studies.
 *
 * Every statement below comes from the project's public README, its commit
 * history or the repository contents (checked 2026-10-26). If you add a claim,
 * add its source to docs/INFORMATION_ARCHITECTURE.md §6. No invented metrics,
 * clients, quotes or outcomes.
 */
export const projectCatalog: Project[] = [
  {
    id: 'moneyman',
    slug: 'moneyman',
    order: 1,
    visible: true,
    assets: { label: ['barcode'] },
    title: 'MoneyMan',
    tagline: 'Finanzas personales sin conectar el banco ni enviar datos a un servidor',
    summary:
      'Aplicación web progresiva para entender en qué se va el dinero cada mes y cómo afecta a tus metas de ahorro. Todo se procesa en el navegador: sin backend, sin cuentas y sin conexión bancaria.',
    projectType: 'product',
    typeLabel: 'Producto propio',
    role: 'Producto, interfaz y desarrollo',
    status: { kind: 'in-progress', label: 'En desarrollo, sin desplegar' },
    year: '2026',
    technologies: ['React 19', 'TypeScript', 'Vite', 'CSS Modules', 'Motion', 'PapaParse', 'vite-plugin-pwa'],
    services: ['apps', 'frontend'],

    overview: [
      'MoneyMan nace de una necesidad propia: saber a dónde va el dinero cada mes y cuánto queda de verdad para ahorrar, sin entregar los datos bancarios a nadie.',
      'Registra ingresos y gastos a mano o importando el CSV del banco, muestra el gasto del mes como porcentaje del ingreso o del presupuesto disponible, lo desglosa por categorías con gráficos SVG propios y estima la trayectoria de ahorro frente a metas a 1, 3, 6 o 12 meses.',
    ],
    challenge: [
      'Entender el gasto y su efecto en el ahorro sin conectar una cuenta bancaria ni enviar datos financieros a un servidor. Eso descarta el camino habitual (cuentas de usuario, sincronización, agregadores bancarios) y obliga a que el navegador lo haga todo.',
    ],
    goals: [
      'Sin backend, cuentas ni analítica: transacciones, ajustes y CSV se procesan en el navegador.',
      'Importar el CSV de cualquier banco con vista previa y mapeo de columnas editable.',
      'Poder probarla sin introducir un solo dato personal.',
      'Interfaz mobile-first con tema claro u oscuro según el sistema.',
    ],
    responsibilities: [
      'Proyecto personal de principio a fin: definición del producto, diseño de la interfaz, desarrollo y documentación.',
    ],
    architecture: {
      summary: [
        'La lógica de cálculo, las pantallas y la persistencia viven separadas en src/domain, src/features y src/store. Los datos personales se guardan en localStorage; la demo, en sessionStorage.',
        'Incluye manifest, service worker y caché del shell para uso sin conexión. La instalación como PWA está pendiente de sus iconos.',
      ],
      stack: [
        { label: 'Interfaz', items: ['React 19', 'TypeScript', 'CSS Modules', 'Motion', 'Reicon'] },
        { label: 'Datos', items: ['localStorage', 'sessionStorage', 'PapaParse (CSV)'] },
        { label: 'Plataforma', items: ['Vite', 'vite-plugin-pwa'] },
      ],
    },
    decisions: [
      {
        title: 'Una demo que no puede romper lo real',
        body: 'El modo demo usa su propia clave en sessionStorage, separada de los datos personales en localStorage. Importar, editar metas o restablecer la demo nunca sobrescribe tus registros.',
      },
      {
        title: 'Importación CSV con vista previa',
        body: 'Cada banco exporta columnas distintas. El importador enseña una vista previa, deja mapear las columnas y convierte los importes negativos en gastos y los positivos en ingresos.',
      },
      {
        title: 'El presupuesto sale de las metas',
        body: 'El presupuesto disponible es el ingreso menos el ahorro mensual que exigen tus metas. Se presenta como ayuda para planificar, no como un saldo bancario ni una previsión financiera.',
      },
      {
        title: 'Límites por escrito',
        body: 'La documentación deja claro lo que falta: iconos de instalación, despliegue HTTPS, detección de duplicados y tests automatizados. Nada se da por hecho solo porque el build pase.',
      },
    ],
    outcome: [
      'Funciona en local con un modo demo de datos sintéticos (12 movimientos, ocho categorías y metas generales y con nombre).',
      'Pendiente: iconos de la PWA y despliegue público. La siguiente fase añade tests de cálculo y de importación CSV, CI y una auditoría de accesibilidad y rendimiento.',
    ],
    evidence: [
      {
        kind: 'image',
        src: '/images/projects/moneyman/dashboard-desktop.webp',
        width: 1440,
        height: 900,
        alt: 'Panel de MoneyMan en escritorio con datos de demostración: un anillo indica que el gasto del mes es el 45 % del ingreso.',
        caption: 'Panel con datos sintéticos del modo demo. Captura del repositorio.',
      },
      {
        kind: 'image',
        src: '/images/projects/moneyman/dashboard-mobile.webp',
        width: 390,
        height: 844,
        alt: 'La misma vista del panel de MoneyMan en un móvil, con la navegación inferior.',
        caption: 'La interfaz es mobile-first. Captura del repositorio.',
      },
      {
        kind: 'code',
        title: 'Dónde vive cada dato',
        language: 'text',
        code: 'Datos personales  → localStorage   "moneyman-estado-v1"\nModo demo         → sessionStorage "moneyman-demo-v1"\nCSV importados    → se procesan en el navegador, no se suben',
        caption: 'Claves de almacenamiento documentadas en el README.',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/myFinancesApp' },
    seo: {
      title: 'MoneyMan, finanzas personales sin servidor · Jorge Arcas',
      description:
        'Caso de estudio: PWA de finanzas personales en React y TypeScript que procesa todo en el navegador, con importación CSV, metas de ahorro y una demo aislada.',
    },
  },
  {
    id: 'client-leads',
    slug: 'client-leads',
    order: 2,
    visible: true,
    assets: { label: ['pin'] },
    title: 'Client Leads',
    tagline: 'Prospección B2B: de Google Maps a Twenty CRM con evidencias y puntuación',
    summary:
      'Pipeline en Python que importa instalaciones industriales, identifica las organizaciones que hay detrás, extrae evidencias de sus webs, puntúa el encaje comercial y sincroniza con Twenty CRM solo cuando se le pide.',
    projectType: 'internal-tool',
    typeLabel: 'Herramienta interna',
    role: 'Diseño y desarrollo completos',
    status: { kind: 'in-progress', label: 'En desarrollo activo' },
    year: '2026',
    technologies: ['Python 3.11', 'SQLite', 'httpx', 'Apify', 'Twenty CRM', 'pytest'],
    services: ['automation'],

    overview: [
      'Client Leads automatiza la prospección comercial en el sector industrial. Parte de datos de Google Maps obtenidos con Apify, separa la empresa de sus instalaciones físicas, busca evidencias en webs corporativas y fuentes oficiales, puntúa el encaje comercial y, solo con una orden explícita, lleva el resultado a Twenty CRM.',
      'Es una herramienta de línea de comandos con 59 comandos documentados, pensada para operarse con cuidado: cada comando dice si lee, escribe en la base de datos, hace peticiones de red o toca el CRM.',
    ],
    context: [
      'Nace de una necesidad comercial real: encontrar fabricantes y operadores del ciclo del agua en regiones españolas y priorizarlos antes de que lleguen al CRM.',
    ],
    challenge: [
      'Google Maps sirve para descubrir, no para decidir. Una categoría o la mención de un PLC no prueban que exista una planta; mezclar empresa e instalación, o deduplicar por nombre, llena el CRM de registros dudosos.',
    ],
    goals: [
      'Separar la Organización (la empresa) de la Instalación (el sitio físico).',
      'Guardar fuente, cita y procedencia de cada dato.',
      'Puntuación determinista y explicable, separada de la cualificación.',
      'Ninguna escritura en el CRM sin un paso explícito.',
    ],
    responsibilities: [
      'Proyecto en solitario: modelo de datos, crawler, políticas de puntuación, integraciones con Apify y Twenty, interfaz de línea de comandos y documentación.',
    ],
    architecture: {
      summary: [
        'SQLite guarda organizaciones, instalaciones, sus relaciones, páginas y evidencias (esquema 16, con migraciones propias). Un crawler secuencial con caché de siete días, reintentos acotados y reglas de robots.txt alimenta las evidencias.',
        'La puntuación y la cualificación se calculan y se aplican por separado, y la sincronización con el CRM es un paso aparte.',
      ],
      stack: [
        { label: 'Lenguaje', items: ['Python ≥ 3.11'] },
        { label: 'Datos', items: ['SQLite (WAL)', 'caché HTTP en disco'] },
        { label: 'Integraciones', items: ['Apify (descubrimiento)', 'Twenty CRM (API REST)'] },
        { label: 'Calidad', items: ['pytest', 'datos sintéticos de ejemplo'] },
      ],
    },
    decisions: [
      {
        title: 'Organización e instalación son cosas distintas',
        body: 'Una empresa puede tener varias plantas y una web puede compartirse. La identidad de una instalación prioriza los identificadores de la fuente: compartir dominio nunca basta para fusionar.',
      },
      {
        title: 'Cada hecho con su procedencia',
        body: 'Las evidencias guardan fuente, cita y confianza, y distinguen el producto que una empresa vende de su propio proceso productivo.',
      },
      {
        title: 'Escribir siempre es explícito',
        body: 'Sin un modo explícito, el crawler solo muestra el plan. Lo que escribe en SQLite, hace peticiones o toca el CRM se activa con --apply, y la documentación lo marca en cada comando.',
      },
      {
        title: 'Identidad en el CRM sin adivinar',
        body: 'El enlace con Twenty es su identificador, apoyado en dominio y CIF. Una colisión de identidad bloquea la sincronización en lugar de resolverse por parecido de nombre.',
      },
    ],
    outcome: [
      'Se puede ejecutar desde cero, sin red ni credenciales, con un ejemplo sintético. La importación JSON y la puntuación y cualificación locales (v2) están resueltas.',
      'Siguiente: conectar el descubrimiento directo con las organizaciones y hacer reutilizable la sincronización v2 con el CRM.',
    ],
    evidence: [
      {
        kind: 'diagram',
        title: 'Del dato en bruto al CRM',
        steps: [
          { label: 'Google Maps vía Apify', detail: 'Descubrimiento' },
          { label: 'Importación local', detail: 'Deduplicación y enlace' },
          { label: 'Organizaciones e instalaciones', detail: 'SQLite' },
          { label: 'Crawler industrial', detail: 'Páginas y citas' },
          { label: 'Evidencias atribuidas', detail: 'Revisión' },
          { label: 'Puntuación y cualificación', detail: 'Políticas separadas' },
          { label: 'Twenty CRM', detail: 'Solo con --apply' },
        ],
        caption: 'Flujo de datos descrito en la documentación de arquitectura del repositorio.',
      },
      {
        kind: 'code',
        title: 'Arranque sin red, con datos sintéticos',
        language: 'bash',
        code: 'python -m client_leads db init\npython -m client_leads datasets import examples/manufacturing.synthetic.json \\\n  --profile manufacturing --region murcia --apply\npython -m client_leads organizations list\npython -m client_leads manufacturing crawl --plan --limit 5',
        caption: 'Del README. El último comando solo muestra el plan: no visita ninguna web.',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/clientScrapper' },
    seo: {
      title: 'Client Leads, prospección B2B con Twenty CRM · Jorge Arcas',
      description:
        'Caso de estudio: pipeline en Python que convierte datos de Google Maps en empresas cualificadas, con evidencias, puntuación explicable y sincronización con Twenty CRM.',
    },
  },
  {
    id: 'mathgeon',
    slug: 'mathgeon',
    order: 3,
    visible: true,
    assets: { label: ['skull'] },
    title: 'Mathgeon',
    tagline: 'Roguelite web de matemáticas para un aprendizaje gamificado',
    summary:
      'Juego web de estética pixel-art en el que avanzas por mazmorras resolviendo ecuaciones, con cuentas de usuario, progreso y clasificaciones. Proyecto en equipo de dos personas.',
    projectType: 'team',
    typeLabel: 'Proyecto en equipo',
    role: 'Arquitectura inicial del frontend e interfaz',
    team: ['Jorge Arcas', 'A31Nesta'],
    status: { kind: 'archived', label: 'Versión funcional' },
    year: '2025',
    technologies: ['React 19', 'TypeScript', 'Vite', 'React Router', 'Firebase Auth', 'Realtime Database'],
    services: ['apps', 'frontend'],

    overview: [
      'Mathgeon convierte la práctica de matemáticas en un roguelite: cada sala de la mazmorra plantea una ecuación, los aciertos seguidos encadenan combos y las vidas son limitadas. El repositorio lo describe como un juego para el aprendizaje gamificado de personas dentro del espectro autista.',
      'Incluye registro e inicio de sesión, progreso por mazmorra, clasificaciones y un panel de administración para configurar el contenido.',
    ],
    context: ['Lo desarrollamos entre dos personas entre mayo y junio de 2025.'],
    responsibilities: [
      'Puse en marcha el proyecto: React con TypeScript, rutas, servicio de Firebase y autenticación.',
      'Construí la interfaz de libro en pixel-art, con su animación de paso de página y la navegación entre páginas.',
      'Creé los componentes base del juego (botones, campos y avisos) y la lógica y las pantallas de vidas, victoria y derrota.',
      'El panel de administración, la gestión de mazmorras y las mejoras de accesibilidad son trabajo de mi compañero, A31Nesta.',
    ],
    architecture: {
      summary: [
        'Aplicación de una sola página con rutas, autenticación por email y contraseña con Firebase Auth y datos en Firebase Realtime Database: usuarios, mazmorras, progreso y clasificaciones.',
        'Las ecuaciones se generan y se resuelven con lógica propia apoyada en Mathsteps.',
      ],
      stack: [
        { label: 'Interfaz', items: ['React 19', 'TypeScript', 'CSS', 'React Router'] },
        { label: 'Datos', items: ['Firebase Auth', 'Firebase Realtime Database'] },
        { label: 'Juego', items: ['Generador de ecuaciones', 'Mathsteps'] },
      ],
    },
    decisions: [
      {
        title: 'La interfaz es un objeto',
        body: 'El menú es un libro que pasa páginas: una hoja de sprites con los fotogramas del giro y una barra de progreso, en lugar de un panel genérico.',
      },
      {
        title: 'Componentes con la estética del juego',
        body: 'Botones, campos y avisos concentran el estilo pixel-art, de modo que todas las pantallas comparten aspecto y comportamiento.',
      },
      {
        title: 'Un aviso para cada caso',
        body: 'El componente de avisos nació para resolver los nombres de usuario repetidos y se pensó para reutilizarse en el resto de pantallas.',
      },
    ],
    outcome: [
      'Versión funcional con cuentas, progreso, combos, vidas y clasificaciones. El README deja pendiente el diseño responsive para móvil.',
    ],
    evidence: [
      {
        kind: 'image',
        src: '/images/projects/mathgeon/book-ui.webp',
        width: 1400,
        height: 1085,
        alt: 'Pantalla de inicio de Mathgeon: un libro abierto en pixel-art con el título, el botón Enter the Dungeon y el lema del juego.',
        caption: 'La interfaz de libro con su barra de páginas. Captura del portfolio anterior.',
      },
      {
        kind: 'image',
        src: '/images/projects/mathgeon/book-sprite.webp',
        width: 1600,
        height: 500,
        alt: 'Hoja de sprites con siete fotogramas de un libro abierto mientras una página gira.',
        caption: 'Fotogramas del paso de página que anima el libro. Asset del repositorio.',
      },
      {
        kind: 'image',
        src: '/images/projects/mathgeon/win-screen.webp',
        width: 167,
        height: 289,
        alt: 'Sprite en pixel-art de la pantalla de victoria.',
        caption: 'Sprite de la pantalla de victoria, de la parte de vidas y final de partida.',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/mathgeon' },
    seo: {
      title: 'Mathgeon, roguelite web en React y Firebase · Jorge Arcas',
      description:
        'Caso de estudio: juego web en equipo con React, TypeScript y Firebase. Mi parte: arquitectura inicial del frontend, interfaz de libro en pixel-art y lógica de vidas.',
    },
  },
  {
    id: 'disco-download',
    slug: 'disco-download',
    order: 4,
    visible: true,
    assets: { label: ['headphones', 'knob'] },
    title: 'Disco Download',
    tagline: 'Audio de YouTube a MP3 o WAV, con el BPM ya en la etiqueta',
    summary:
      'Aplicación web local en Flask que descarga audio a MP3 o WAV, detecta el BPM de cada canción y lo guarda en la etiqueta del MP3, con estados en tiempo real y soporte para listas completas.',
    projectType: 'tool',
    typeLabel: 'Herramienta personal',
    role: 'Diseño y desarrollo completos',
    status: { kind: 'working', label: 'Funcional' },
    year: '2026',
    technologies: ['Python', 'Flask', 'yt-dlp', 'ffmpeg', 'librosa', 'mutagen', 'uv'],
    services: ['automation', 'apps'],

    overview: [
      'Disco Download pone una interfaz sencilla encima de herramientas de terminal: pegas enlaces, uno por línea, eliges MP3 o WAV y pulsas el botón dorado «A BAILAR». La app descarga, convierte, calcula el BPM y lo escribe como etiqueta ID3 para que el software de DJ o el reproductor lo lean directamente.',
      'Está pensada para gente no técnica: el README guía la instalación paso a paso en Windows y un .bat arranca todo.',
    ],
    challenge: [
      'yt-dlp y ffmpeg resuelven la descarga y la conversión, pero desde la terminal. La idea era que cualquiera pudiera usarlos sin escribir un comando y obtener, además, el tempo de cada canción.',
    ],
    responsibilities: ['Proyecto personal: servidor en Flask, integración de las herramientas de audio, interfaz y documentación.'],
    architecture: {
      summary: [
        'Un servidor Flask local (puerto 5555) gestiona la cola. yt-dlp obtiene el audio, ffmpeg lo convierte, librosa estima el tempo y mutagen escribe la etiqueta. La página consulta el estado cada dos segundos.',
      ],
      stack: [
        { label: 'Servidor', items: ['Python', 'Flask'] },
        { label: 'Audio', items: ['yt-dlp', 'ffmpeg', 'librosa (BPM)', 'mutagen (ID3)'] },
        { label: 'Entorno', items: ['uv', 'lanzador .bat para Windows'] },
      ],
    },
    decisions: [
      {
        title: 'Estados visibles, no esperas a ciegas',
        body: 'Cada enlace pasa por estados explícitos (en cola, descargando, analizando BPM, listo o error) y el error muestra el motivo. En listas, el resumen final da el número de pistas y el BPM medio.',
      },
      {
        title: 'Formato según el uso',
        body: 'MP3 guarda el BPM en su etiqueta ID3. WAV prioriza la calidad sin compresión y, como el formato no admite esa etiqueta, el BPM solo se muestra en pantalla.',
      },
      {
        title: 'Instalación para no programadores',
        body: 'uv gestiona Python y las dependencias, y el .bat instala Flask, librosa y mutagen al arrancar. La guía cubre los errores habituales paso a paso.',
      },
      {
        title: 'En la red de casa',
        body: 'Cualquiera conectado a la misma wifi puede usarla desde el móvil entrando en la IP del ordenador.',
      },
    ],
    outcome: [
      'Funciona en Windows siguiendo la guía del README. Uso responsable: la propia guía pide descargar solo música sobre la que se tengan derechos.',
    ],
    evidence: [
      {
        kind: 'states',
        title: 'Lo que ves mientras descarga',
        rows: [
          { state: 'en cola', meaning: 'Esperando su turno' },
          { state: 'descargando…', meaning: 'Bajando el audio' },
          { state: 'analizando BPM…', meaning: 'Calculando los pulsos por minuto' },
          { state: 'listo · 128 BPM', meaning: 'Descargado y etiquetado' },
          { state: 'error', meaning: 'Algo fue mal, con el motivo' },
        ],
        caption: 'Estados documentados en el README. En listas: «12 tracks · avg 102 BPM».',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/DiscoDescargas' },
    seo: {
      title: 'Disco Download, descarga de audio con BPM · Jorge Arcas',
      description:
        'Caso de estudio: herramienta web local en Python y Flask que descarga audio a MP3 o WAV, detecta el BPM con librosa y lo escribe en las etiquetas ID3.',
    },
  },
  {
    id: 'gitchange',
    slug: 'gitchange',
    order: 5,
    visible: true,
    assets: { label: ['hash'] },
    title: 'gitchange',
    tagline: 'Cambia de cuenta de GitHub con un solo comando',
    summary:
      'Utilidad de terminal que agrupa la identidad de los commits, la clave SSH y la sesión de GitHub CLI en perfiles y los aplica por repositorio, para no volver a hacer push con la cuenta equivocada.',
    projectType: 'tool',
    typeLabel: 'Herramienta de desarrollo',
    role: 'Diseño y desarrollo',
    status: { kind: 'working', label: 'Funcional' },
    year: '2026',
    technologies: ['Bash', 'Git', 'OpenSSH', 'GitHub CLI'],
    services: ['automation'],

    overview: [
      'Con varias cuentas de GitHub (la personal y la del trabajo, por ejemplo) acabas con commits firmados con el email equivocado, errores «Permission denied» al hacer push o pull requests abiertas desde el usuario que no era. gitchange lo resuelve con perfiles.',
    ],
    challenge: [
      '«Tu cuenta de GitHub» no es una sola cosa: son tres piezas que viven en sitios distintos (la identidad de los commits, la clave SSH y la sesión de gh) y hay que cambiarlas a la vez.',
    ],
    responsibilities: ['Proyecto personal: diseño de los comandos, implementación en Bash y documentación.'],
    architecture: {
      summary: [
        'Cada perfil guarda nombre, email, usuario de GitHub y la ruta de su clave. Aplicarlo escribe tres valores de configuración de git en el repositorio y, si gh está instalado, cambia también su sesión.',
      ],
      stack: [
        { label: 'Lenguaje', items: ['Bash'] },
        { label: 'Integra', items: ['git config', 'OpenSSH', 'GitHub CLI (gh)'] },
      ],
    },
    decisions: [
      {
        title: 'IdentitiesOnly=yes',
        body: 'Por defecto SSH ofrece todas tus claves hasta que una funciona, y GitHub te identifica con la primera válida aunque sea de otra cuenta. Forzar una sola clave por repositorio elimina los errores de permisos.',
      },
      {
        title: 'La cuenta vive en el repositorio',
        body: 'Sin -g, el perfil se escribe en el .git/config del propio proyecto: cada repo recuerda su cuenta para siempre y no hay que volver a activar nada.',
      },
      {
        title: 'Convive con includeIf',
        body: 'La configuración local del repositorio tiene prioridad sobre las reglas includeIf por carpeta, así que los dos sistemas se complementan.',
      },
      {
        title: 'Claves, no contraseñas',
        body: 'GitHub eliminó el inicio de sesión con contraseña para git en 2021. La herramienta gestiona claves SSH y puede generarlas y subirlas con gh.',
      },
    ],
    outcome: [
      'Comandos para crear, listar, aplicar (en el repositorio o de forma global), consultar y borrar perfiles, pasar el remoto de HTTPS a SSH y clonar directamente con la cuenta correcta.',
    ],
    evidence: [
      {
        kind: 'code',
        title: 'Aplicar un perfil',
        language: 'bash',
        code: "$ gitchange add trabajo\n$ cd ~/proyectos/algo\n$ gitchange trabajo\n→ gh: sesión activa → mi-usuario-trabajo\n✓ Perfil 'trabajo' aplicado en este repo → Jorge <jorge@empresa.com>",
        caption: 'Del README del proyecto.',
      },
      {
        kind: 'code',
        title: 'Lo que hace por debajo',
        language: 'bash',
        code: 'git config user.name  "Jorge"\ngit config user.email "jorge@empresa.com"\ngit config core.sshCommand "ssh -i ~/.ssh/id_ed25519_trabajo -o IdentitiesOnly=yes"\ngh auth switch --user mi-usuario-trabajo',
        caption: 'Tres valores de configuración y, si hay gh, el cambio de sesión.',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/gitchangeUserCommand' },
    seo: {
      title: 'gitchange, cuentas de GitHub por repositorio · Jorge Arcas',
      description:
        'Caso de estudio: utilidad en Bash que agrupa identidad de git, clave SSH y sesión de GitHub CLI en perfiles y los aplica por repositorio.',
    },
  },
  {
    id: 'portfolio-v2',
    slug: 'portfolio-v2',
    order: 6,
    visible: true,
    assets: { label: ['https'] },
    title: 'Portfolio v2',
    tagline: 'La versión anterior de este portfolio: HTML, CSS y JavaScript con GSAP',
    summary:
      'Segunda versión de mi portfolio, sin framework, mobile-first y con animaciones de scroll en GSAP, publicada en GitHub Pages.',
    projectType: 'portfolio',
    typeLabel: 'Portfolio anterior',
    role: 'Diseño y desarrollo',
    status: { kind: 'archived', label: 'Sustituido por JRG-003' },
    year: '2023–2024',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'ScrollTrigger', 'jQuery'],
    services: ['web', 'frontend'],

    overview: [
      'Mi segundo portfolio: una sola página con portada, sobre mí, proyectos, experiencia y formación, habilidades y contacto, hecha con HTML, CSS y JavaScript sin framework y desplegada en GitHub Pages.',
    ],
    context: ['La construí entre 2023 y 2024, en la primera época de la IA generativa, con GSAP como protagonista de las animaciones.'],
    decisions: [
      {
        title: 'Sin framework',
        body: 'HTML, CSS y JavaScript sin dependencias de framework, para que la página fuera ligera y se publicara tal cual en GitHub Pages.',
      },
      {
        title: 'Mobile-first',
        body: 'Los estilos se escribieron primero para móvil y crecen hacia escritorio con Grid, Flexbox y custom properties.',
      },
      {
        title: 'Dos formas de navegar',
        body: 'Una cabecera tradicional y un menú superpuesto a pantalla completa.',
      },
    ],
    outcome: [
      'Lo que cambia en esta tercera edición: contenido verificable en lugar de barras de porcentaje por tecnología, una página propia para cada proyecto, HTML prerenderizado para buscadores y un sistema de diseño compartido entre todas las secciones.',
    ],
    evidence: [
      {
        kind: 'image',
        src: '/images/projects/portfolio-v2/hero-desktop.webp',
        width: 1440,
        height: 900,
        alt: 'Portada del portfolio v2: el nombre Jorge Arcas en grande, el rol y una etiqueta #OpenForWork bajo una barra de navegación negra.',
        caption: 'Portada en escritorio. Captura del sitio publicado (octubre de 2026).',
      },
      {
        kind: 'image',
        src: '/images/projects/portfolio-v2/projects-desktop.webp',
        width: 1440,
        height: 900,
        alt: 'Sección de proyectos del portfolio v2 con cuatro tarjetas: Mathgeon, SoundTown, Portfolio V1 y TDD Cypress Login.',
        caption: 'Sección de proyectos en tarjetas.',
      },
      {
        kind: 'image',
        src: '/images/projects/portfolio-v2/hero-mobile.webp',
        width: 390,
        height: 844,
        alt: 'Portada del portfolio v2 en un móvil, con la navegación en una cápsula negra.',
        caption: 'La misma portada en móvil.',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/portfoliov2' },
    seo: {
      title: 'Portfolio v2, HTML, CSS y GSAP · Jorge Arcas',
      description:
        'Caso de estudio: la segunda versión de mi portfolio, sin framework, mobile-first y con animaciones de scroll en GSAP, y qué cambia en la tercera.',
    },
  },
];

/** From the previous config: "Plenty more I cannot publish, happy to talk it through". */
export const privateWork: PrivateWork = {
  title: 'Trabajo privado y bajo NDA',
  tagline: 'Hay más trabajo que no puedo publicar. Te lo cuento en una conversación.',
  meta: 'Privado · NDA',
  note: 'pregúntame',
  disc: { src: '/images/projects/private/broken-disc.webp', width: 800, height: 800 },
  prop: 'phone',
  visible: true,
};

/** Stable sorting never mutates the editable catalogue. Tracks are derived, not IDs. */
export const selectProjects = (catalog: readonly Project[]) => catalog
  .filter((project) => project.visible)
  .slice()
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
  .map((project, index) => ({ ...project, track: index + 1 }));

export const projects = selectProjects(projectCatalog);

export const projectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const projectHref = (slug: string): string =>
  projects.some((project) => project.slug === slug) ? `/proyectos/${slug}/` : '/proyectos/';

/** The next release in tracklist order, wrapping to the first. */
export const nextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};

/** Total tracks shown as "01 / 07": the releases plus the private row. */
export const trackTotal = projects.length + Number(privateWork.visible);

export const formatTrack = (track: number): string => String(track).padStart(2, '0');

/** What the Projects gallery shows of a release: same source as its case study. */
export const summarizeProject = (project: (typeof projects)[number]): ProjectSummary => ({
  id: project.id,
  slug: project.slug,
  track: formatTrack(project.track),
  title: project.title,
  shortDescription: project.tagline,
  stack: project.technologies.slice(0, 3),
  year: project.year,
  href: projectHref(project.slug),
  assets: project.assets,
});

/** The private work closes the gallery as its last track: a broken disc that opens Contact. */
const privateSummary: ProjectSummary = {
  id: 'private',
  slug: 'privado',
  track: formatTrack(trackTotal),
  title: privateWork.title,
  shortDescription: privateWork.tagline,
  stack: [],
  year: '',
  href: chapterHref('contacto'),
  assets: { disc: privateWork.disc, prop: privateWork.prop },
  kind: 'private',
  hint: privateWork.note,
};

export const projectSummaries: ProjectSummary[] = [
  ...projects.map(summarizeProject),
  ...(privateWork.visible ? [privateSummary] : []),
];
