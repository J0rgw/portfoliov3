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
      'Aplicación web progresiva para entender en qué se va el dinero cada mes y cómo afecta eso a tus metas de ahorro; todo se procesa en el navegador, sin servidor, sin cuentas y sin conectar el banco.',
    projectType: 'product',
    typeLabel: 'Producto propio',
    role: 'Producto, interfaz y desarrollo',
    status: { kind: 'in-progress', label: 'En desarrollo, sin desplegar' },
    year: '2026',
    technologies: ['React 19', 'TypeScript', 'Vite', 'CSS Modules', 'Motion', 'PapaParse', 'vite-plugin-pwa'],
    services: ['apps', 'frontend'],

    overview: [
      'MoneyMan nace de una necesidad propia: saber a dónde se va el dinero cada mes y cuánto queda de verdad para ahorrar, sin entregarle a nadie los datos del banco.',
      'Los ingresos y los gastos se apuntan a mano o se importan desde el CSV del banco. Con ellos, la aplicación calcula qué porcentaje del ingreso, o del presupuesto disponible, se ha gastado ya en el mes; reparte ese gasto por categorías en gráficos SVG propios y estima cómo irá el ahorro frente a tus metas a uno, tres, seis o doce meses.',
    ],
    challenge: [
      'Había que entender el gasto y lo que supone para el ahorro sin conectar ninguna cuenta bancaria ni enviar datos financieros a un servidor. Eso descarta el camino habitual, el de las cuentas de usuario, la sincronización y los agregadores bancarios, y obliga a que el navegador lo haga todo.',
    ],
    goals: [
      'No podía haber servidor, cuentas ni analítica: los movimientos, los ajustes y los CSV se procesan en el navegador. El importador tenía que aceptar el CSV de cualquier banco, con vista previa y columnas que se pudieran reasignar; la aplicación, poder probarse sin introducir un solo dato personal; y la interfaz, pensada primero para el móvil, seguir el tema claro u oscuro del sistema.',
    ],
    responsibilities: [
      'Es un proyecto personal que he llevado de principio a fin: la definición del producto, el diseño de la interfaz, el desarrollo y la documentación.',
    ],
    architecture: [
      'La lógica de cálculo, las pantallas y la persistencia viven separadas, en src/domain, src/features y src/store. Los datos personales se guardan en localStorage y los de la demo en sessionStorage; los CSV se leen con PapaParse.',
      'La interfaz está hecha con React 19 y TypeScript, con CSS Modules, Motion para las animaciones y los iconos de Reicon; el proyecto se compila con Vite y vite-plugin-pwa. Incluye manifest, service worker y caché del shell para poder usar la aplicación sin conexión; la instalación como PWA está pendiente de sus iconos.',
    ],
    decisions: [
      'El modo demo guarda sus datos con una clave propia en sessionStorage, aparte de los personales, que viven en localStorage; así, importar, tocar las metas o restablecer la demo nunca pisa tus registros.',
      'Como cada banco exporta las columnas a su manera, el importador enseña antes una vista previa y deja asignar cada columna; luego convierte los importes negativos en gastos y los positivos en ingresos.',
      'El presupuesto disponible es el ingreso menos lo que tus metas piden ahorrar cada mes. Se presenta como una ayuda para planificar: no es un saldo bancario ni pretende ser una previsión financiera.',
      'La documentación, además, deja claro lo que falta: los iconos de instalación, el despliegue con HTTPS, la detección de duplicados y los tests automáticos. Que compile no significa que esté terminado.',
    ],
    outcome: [
      'De momento funciona en local, con un modo demo de datos sintéticos que trae doce movimientos, ocho categorías y metas, unas generales y otras con nombre.',
      'Faltan los iconos de la PWA y el despliegue público; la siguiente fase añade tests del cálculo y de la importación de CSV, integración continua y una auditoría de accesibilidad y rendimiento.',
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
        caption: 'La interfaz está pensada primero para el móvil. Captura del repositorio.',
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
      title: 'MoneyMan, finanzas personales sin servidor',
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
      'Herramienta en Python que importa instalaciones industriales, averigua qué empresa hay detrás de cada una, reúne evidencias en sus webs y puntúa su encaje comercial; con Twenty CRM solo sincroniza cuando se le pide.',
    projectType: 'internal-tool',
    typeLabel: 'Herramienta interna',
    role: 'Diseño y desarrollo completos',
    status: { kind: 'in-progress', label: 'En desarrollo activo' },
    year: '2026',
    technologies: ['Python 3.11', 'SQLite', 'httpx', 'Apify', 'Twenty CRM', 'pytest'],
    services: ['automation'],

    overview: [
      'Client Leads automatiza la prospección comercial en el sector industrial. Parte de los datos de Google Maps que se obtienen con Apify, separa cada empresa de sus instalaciones físicas, busca evidencias en webs corporativas y fuentes oficiales y puntúa el encaje comercial; el resultado solo llega a Twenty CRM cuando se da la orden de forma explícita.',
      'Es una herramienta de terminal, con 59 comandos documentados, pensada para usarse con cuidado: cada comando avisa de si lee, si escribe en la base de datos, si hace peticiones de red o si toca el CRM.',
    ],
    context: [
      'Nace de una necesidad comercial real: encontrar fabricantes y operadores del ciclo del agua en regiones de España y priorizarlos antes de que lleguen al CRM.',
    ],
    challenge: [
      'Google Maps sirve para descubrir, pero no para decidir. Que una ficha tenga cierta categoría o mencione un PLC no demuestra que exista una planta; y si se mezclan empresa e instalación, o se buscan duplicados solo por el nombre, el CRM se llena de registros dudosos.',
    ],
    goals: [
      'Había que separar la organización, es decir, la empresa, de la instalación, que es el sitio físico. Cada dato tenía que guardar su fuente, la cita que lo respalda y su procedencia; la puntuación, ser determinista y explicable y quedar separada de la cualificación; y en el CRM no podía escribirse nada sin un paso explícito.',
    ],
    responsibilities: [
      'Lo he hecho yo solo: el modelo de datos, el crawler, las políticas de puntuación, las integraciones con Apify y con Twenty, la interfaz de línea de comandos y la documentación.',
    ],
    architecture: [
      'Está escrito en Python 3.11 o superior. Una base de datos SQLite en modo WAL guarda las organizaciones, las instalaciones, sus relaciones, las páginas y las evidencias, con un esquema que va por la versión 16 y migraciones propias.',
      'Las evidencias las alimenta un crawler secuencial que respeta las reglas de robots.txt, guarda en disco una caché HTTP de siete días y limita los reintentos. Apify se encarga del descubrimiento, y con Twenty CRM se habla a través de su API REST.',
      'La puntuación y la cualificación se calculan y se aplican por separado, y la sincronización con el CRM es un paso aparte. Los tests están escritos con pytest, y el repositorio incluye datos sintéticos de ejemplo.',
    ],
    decisions: [
      'Una organización y una instalación son cosas distintas: una empresa puede tener varias plantas, y una misma web puede compartirse. Por eso la identidad de una instalación se basa primero en los identificadores de la fuente, y compartir dominio nunca basta para fusionar dos registros.',
      'Cada hecho se guarda con su procedencia; las evidencias llevan fuente, cita y grado de confianza, y distinguen el producto que una empresa vende de su propio proceso productivo.',
      'Nada se escribe sin pedirlo. Si no se activa un modo explícito, el crawler solo muestra el plan; todo lo que escribe en SQLite, hace peticiones o toca el CRM necesita --apply, y la documentación lo señala en cada comando.',
      'Tampoco se adivina la identidad en el CRM. El enlace con Twenty es su propio identificador, apoyado en el dominio y el CIF; si hay una colisión de identidad, la sincronización se bloquea en lugar de resolverse por el parecido del nombre.',
    ],
    outcome: [
      'Se puede ejecutar desde cero, sin red ni credenciales, con un ejemplo de datos sintéticos, y ya están resueltas la importación de JSON y la puntuación y la cualificación en local (v2).',
      'El siguiente paso es conectar el descubrimiento directo con las organizaciones y hacer reutilizable la sincronización v2 con el CRM.',
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
      title: 'Client Leads, prospección B2B con Twenty CRM',
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
    tagline: 'Roguelite web para aprender matemáticas jugando',
    summary:
      'Juego web de estética pixel art en el que avanzas por mazmorras resolviendo ecuaciones, con cuentas de usuario, progreso y clasificaciones; lo hicimos entre dos personas.',
    projectType: 'team',
    typeLabel: 'Proyecto en equipo',
    role: 'Arquitectura inicial del frontend e interfaz',
    team: ['Jorge Arcas', 'A31Nesta'],
    status: { kind: 'archived', label: 'Versión funcional' },
    year: '2025',
    technologies: ['React 19', 'TypeScript', 'Vite', 'React Router', 'Firebase Auth', 'Realtime Database'],
    services: ['apps', 'frontend'],

    overview: [
      'Mathgeon convierte la práctica de matemáticas en un roguelite: cada sala de la mazmorra plantea una ecuación, los aciertos seguidos encadenan combos y las vidas son limitadas. Su repositorio lo presenta como un juego para que las personas dentro del espectro autista aprendan jugando.',
      'Tiene registro e inicio de sesión, progreso por mazmorra, clasificaciones y un panel de administración desde el que se configura el contenido.',
    ],
    context: ['Lo desarrollamos entre dos personas de mayo a junio de 2025.'],
    responsibilities: [
      'Puse en marcha el proyecto y monté su base: React con TypeScript, las rutas, el servicio de Firebase y la autenticación. También construí la interfaz de libro en pixel art, con su animación de paso de página y la navegación entre páginas. Los componentes base del juego, que son los botones, los campos y los avisos, son míos, igual que la lógica y las pantallas de vidas, victoria y derrota.',
      'El panel de administración, la gestión de las mazmorras y las mejoras de accesibilidad son trabajo de mi compañero, A31Nesta.',
    ],
    architecture: [
      'Es una aplicación de una sola página hecha con React 19, TypeScript, CSS y React Router. Los usuarios entran con email y contraseña a través de Firebase Auth, y Firebase Realtime Database guarda los usuarios, las mazmorras, el progreso y las clasificaciones.',
      'Las ecuaciones se generan y se resuelven con lógica propia que se apoya en Mathsteps.',
    ],
    decisions: [
      'En lugar de un panel genérico, el menú es un libro que pasa páginas; lo anima una hoja de sprites con los fotogramas del giro, y lo acompaña una barra de progreso.',
      'Los botones, los campos y los avisos concentran la estética pixel art, de modo que todas las pantallas comparten aspecto y comportamiento.',
      'El componente de avisos nació para resolver los nombres de usuario repetidos, y lo diseñé para que el resto de pantallas también pudiera usarlo.',
    ],
    outcome: [
      'Es una versión funcional, con cuentas, progreso, combos, vidas y clasificaciones; el README deja pendiente adaptar el diseño al móvil.',
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
        caption: 'Fotogramas del paso de página que anima el libro, sacados del repositorio.',
      },
      {
        kind: 'image',
        src: '/images/projects/mathgeon/win-screen.webp',
        width: 167,
        height: 289,
        alt: 'Sprite en pixel-art de la pantalla de victoria.',
        caption: 'Sprite de la pantalla de victoria, de la parte de vidas y final de partida que me tocó.',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/mathgeon' },
    seo: {
      title: 'Mathgeon, roguelite web en React y Firebase',
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
      'Aplicación web en Flask, para usar en local, que descarga audio en MP3 o WAV, detecta el BPM de cada canción y lo guarda en la etiqueta del MP3; enseña en todo momento cómo va cada descarga y admite listas enteras.',
    projectType: 'tool',
    typeLabel: 'Herramienta personal',
    role: 'Diseño y desarrollo completos',
    status: { kind: 'working', label: 'Funcional' },
    year: '2026',
    technologies: ['Python', 'Flask', 'yt-dlp', 'ffmpeg', 'librosa', 'mutagen', 'uv'],
    services: ['automation', 'apps'],

    overview: [
      'Disco Download pone una interfaz sencilla encima de herramientas de terminal. Pegas los enlaces, uno por línea, eliges MP3 o WAV y pulsas el botón dorado, «A BAILAR»; la aplicación descarga, convierte, calcula el BPM y lo escribe como etiqueta ID3 para que el programa de DJ o el reproductor lo lean directamente.',
      'Está pensada para gente que no programa: el README explica paso a paso la instalación en Windows, y un .bat lo arranca todo.',
    ],
    challenge: [
      'yt-dlp y ffmpeg ya resuelven la descarga y la conversión, pero desde la terminal. La idea era que cualquiera pudiera usarlos sin escribir un solo comando y que, de paso, se llevara el tempo de cada canción.',
    ],
    responsibilities: [
      'Es un proyecto personal y me he encargado de todo: el servidor en Flask, la integración de las herramientas de audio, la interfaz y la documentación.',
    ],
    architecture: [
      'Un servidor Flask local, en el puerto 5555, gestiona la cola. yt-dlp obtiene el audio, ffmpeg lo convierte, librosa estima el tempo y mutagen escribe la etiqueta; mientras tanto, la página consulta el estado cada dos segundos.',
    ],
    decisions: [
      'Nada de esperar a ciegas: cada enlace pasa por estados explícitos (en cola, descargando, analizando el BPM, listo o error), y cuando algo falla se explica el motivo. Si es una lista, el resumen final da el número de pistas y el BPM medio.',
      'El formato depende del uso. El MP3 guarda el BPM en su etiqueta ID3; el WAV, en cambio, prioriza la calidad sin compresión y, como no admite esa etiqueta, el BPM solo se ve en pantalla.',
      'La instalación está pensada para quien no programa: uv gestiona Python y las dependencias, el .bat instala Flask, librosa y mutagen al arrancar y la guía repasa paso a paso los errores más habituales.',
      'Además, funciona en la red de casa: cualquiera conectado a la misma wifi puede usarla desde el móvil escribiendo la IP del ordenador.',
    ],
    outcome: [
      'Funciona en Windows siguiendo la guía del README, que también pide un uso responsable: descargar solo música sobre la que se tengan derechos.',
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
          { state: 'error', meaning: 'Algo ha fallado, y dice por qué' },
        ],
        caption: 'Estados documentados en el README; al terminar una lista, el resumen dice «12 tracks · avg 102 BPM».',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/DiscoDescargas' },
    seo: {
      title: 'Disco Download, descarga de audio con BPM',
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
      'Utilidad de terminal que agrupa en perfiles la identidad de los commits, la clave SSH y la sesión de GitHub CLI y los aplica en cada repositorio, para no volver a hacer push con la cuenta que no toca.',
    projectType: 'tool',
    typeLabel: 'Herramienta de desarrollo',
    role: 'Diseño y desarrollo',
    status: { kind: 'working', label: 'Funcional' },
    year: '2026',
    technologies: ['Bash', 'Git', 'OpenSSH', 'GitHub CLI'],
    services: ['automation'],

    overview: [
      'Si tienes varias cuentas de GitHub, la personal y la del trabajo, por ejemplo, acabas firmando commits con el email equivocado, topándote con errores «Permission denied» al hacer push o abriendo pull requests desde el usuario que no era. gitchange lo resuelve con perfiles.',
    ],
    challenge: [
      '«Tu cuenta de GitHub» no es una sola cosa, sino tres piezas que viven en sitios distintos: la identidad de los commits, la clave SSH y la sesión de gh. Hay que cambiar las tres a la vez.',
    ],
    responsibilities: ['Es un proyecto personal: diseñé los comandos, los programé en Bash y escribí la documentación.'],
    architecture: [
      'Está escrito en Bash y tira de git config, OpenSSH y GitHub CLI. Cada perfil guarda un nombre, un email, el usuario de GitHub y la ruta de su clave; al aplicarlo, escribe tres valores en la configuración de git del repositorio y, si gh está instalado, cambia también su sesión.',
    ],
    decisions: [
      'Lo primero es forzar IdentitiesOnly=yes. Por defecto, SSH ofrece todas tus claves hasta que una funciona, y GitHub te identifica con la primera válida aunque sea de otra cuenta; si se le obliga a usar una sola clave por repositorio, se acabaron los errores de permisos.',
      'Sin -g, el perfil se escribe en el .git/config del propio proyecto, así que cada repositorio recuerda su cuenta para siempre y no hay que volver a activar nada.',
      'Esa configuración local tiene prioridad sobre las reglas includeIf por carpeta, de modo que los dos sistemas conviven y se complementan.',
      'Todo funciona con claves SSH, porque GitHub dejó de aceptar contraseñas para git en 2021; la herramienta las gestiona y puede generarlas y subirlas con gh.',
    ],
    outcome: [
      'Tiene comandos para crear, listar, aplicar (en el repositorio o de forma global), consultar y borrar perfiles, para pasar el remoto de HTTPS a SSH y para clonar directamente con la cuenta correcta.',
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
        title: 'Lo que hace por dentro',
        language: 'bash',
        code: 'git config user.name  "Jorge"\ngit config user.email "jorge@empresa.com"\ngit config core.sshCommand "ssh -i ~/.ssh/id_ed25519_trabajo -o IdentitiesOnly=yes"\ngh auth switch --user mi-usuario-trabajo',
        caption: 'Tres valores de configuración y, si hay gh, el cambio de sesión.',
      },
    ],
    links: { repo: 'https://github.com/J0rgw/gitchangeUserCommand' },
    seo: {
      title: 'gitchange, cuentas de GitHub por repositorio',
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
      'Segunda versión de mi portfolio, hecha sin framework y pensada primero para el móvil, con animaciones de scroll en GSAP; la publiqué en GitHub Pages.',
    projectType: 'portfolio',
    typeLabel: 'Portfolio anterior',
    role: 'Diseño y desarrollo',
    status: { kind: 'archived', label: 'Sustituido por JRG-003' },
    year: '2023–2024',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'ScrollTrigger', 'jQuery'],
    services: ['web', 'frontend'],

    overview: [
      'Fue mi segundo portfolio: una sola página con portada, sobre mí, proyectos, experiencia y formación, habilidades y contacto, hecha con HTML, CSS y JavaScript sin ningún framework y desplegada en GitHub Pages.',
    ],
    context: ['La construí entre 2023 y 2024, cuando la IA generativa daba sus primeros pasos, y GSAP era el protagonista de las animaciones.'],
    decisions: [
      'Prescindí de frameworks para que la página fuera ligera y pudiera publicarse tal cual en GitHub Pages.',
      'Los estilos se escribieron primero para el móvil y crecen hacia el escritorio con Grid, Flexbox y variables CSS.',
      'Para moverse por la página había dos caminos: una cabecera de las de siempre y un menú superpuesto a pantalla completa.',
    ],
    outcome: [
      'En esta tercera edición cambian varias cosas: el contenido se puede comprobar, en lugar de barras de porcentaje por tecnología; cada proyecto tiene su propia página; el HTML llega prerenderizado a los buscadores; y todas las secciones comparten un mismo sistema de diseño.',
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
      title: 'Portfolio v2, HTML, CSS y GSAP',
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
