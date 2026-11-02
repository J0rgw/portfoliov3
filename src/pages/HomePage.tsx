import { chapters } from '../config/navigation';
import type { ComponentType } from 'react';
import About from '../sections/About/About';
import BonusTrack from '../sections/BonusTrack/BonusTrack';
import Contact from '../sections/Contact/Contact';
import Hero from '../sections/Hero/Hero';
import LinerNotes from '../sections/LinerNotes/LinerNotes';
import Projects from '../sections/Projects/Projects';
import Services from '../sections/Services/Services';

const sections: Record<string, ComponentType> = { proyectos: Projects, proceso: LinerNotes, servicios: Services, 'sobre-mi': About, libreria: BonusTrack, contacto: Contact };

/** The album, chapters 00–06 (docs/INFORMATION_ARCHITECTURE.md §3). */
export function HomePage() {
  return (
    <>
      <Hero />
      {chapters.map((chapter) => {
        const Section = sections[chapter.id];
        return Section ? <Section key={chapter.id} /> : null;
      })}
    </>
  );
}

export default HomePage;
