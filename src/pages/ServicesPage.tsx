import ChapterHold from '../components/ui/motion/ChapterHold';
import LinerNotes from '../sections/LinerNotes/LinerNotes';
import Services from '../sections/Services/Services';

/**
 * /servicios/ (ADR-003, 2026-11-12): working with Jorge. What he can build
 * for you opens the page (its heading is the page's h1), then how he works:
 * Proceso, whose hold still turns the iPod's songs (MOTION_SYSTEM §2.5). The
 * back cover closes it (PageShell).
 */
export function ServicesPage() {
  return (
    <>
      <ChapterHold>
        <Services level={1} />
      </ChapterHold>
      <ChapterHold holds>
        <LinerNotes />
      </ChapterHold>
    </>
  );
}

export default ServicesPage;
