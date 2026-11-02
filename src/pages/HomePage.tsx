import About from '../sections/About/About';
import BonusTrack from '../sections/BonusTrack/BonusTrack';
import Contact from '../sections/Contact/Contact';
import Hero from '../sections/Hero/Hero';
import LinerNotes from '../sections/LinerNotes/LinerNotes';
import Projects from '../sections/Projects/Projects';
import Services from '../sections/Services/Services';

/** The album, chapters 00–06 (docs/INFORMATION_ARCHITECTURE.md §3). */
export function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <LinerNotes />
      <Services />
      <About />
      <BonusTrack />
      <Contact />
    </>
  );
}

export default HomePage;
