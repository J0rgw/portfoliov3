import { chapters } from '../config/navigation';
import type { ComponentType } from 'react';
import About from '../sections/About/About';
import BonusTrack from '../sections/BonusTrack/BonusTrack';
import ChapterHold from '../components/ui/motion/ChapterHold';
import Contact from '../sections/Contact/Contact';
import Hero from '../sections/Hero/Hero';
import LinerNotes from '../sections/LinerNotes/LinerNotes';
import Projects from '../sections/Projects/Projects';
import Services from '../sections/Services/Services';

const sections: Record<string, ComponentType> = { proyectos: Projects, proceso: LinerNotes, servicios: Services, 'sobre-mi': About, libreria: BonusTrack, contacto: Contact };

/** Chapters whose hold has a job: Proceso's turns the iPod's songs (Jorge, 2026-11-12, ADR-002). */
const holding = new Set(['proceso']);

/**
 * The album, chapters 00–06 (docs/INFORMATION_ARCHITECTURE.md §3). Every
 * chapter's wrapper is a snap point; Proceso's also holds it at the top while
 * the scroll turns its playlist, the rest scroll straight on (MOTION_SYSTEM
 * §2.5).
 */
export function HomePage() {
  return (
    <>
      <Hero />
      {chapters.map((chapter) => {
        const Section = sections[chapter.id];
        return Section ? (
          <ChapterHold key={chapter.id} holds={holding.has(chapter.id)}>
            <Section />
          </ChapterHold>
        ) : null;
      })}
    </>
  );
}

export default HomePage;
