import About from '../sections/About/About';
import ChapterHold from '../components/ui/motion/ChapterHold';
import CoverArt from '../components/cd/CoverArt/CoverArt';
import Disc from '../components/cd/Disc/Disc';
import Hero from '../sections/Hero/Hero';
import NextTrack from '../components/editorial/NextTrack/NextTrack';
import { chapterHref } from '../config/navigation';
import { galleryProjects } from '../config/projects';
import { projectTheme } from '../components/cd/CoverArt/projectTheme';
import { site } from '../config/site';
import { messages, ui } from '../config/ui';

/**
 * The cover and the person (ADR-003, 2026-11-12): the hero, then Sobre mí;
 * the back cover that closes every page follows (PageShell). Everything else
 * is a page of its own, so the home is read whole. Its next track (Jorge's
 * pick, Q57) hands the gallery's first disc on to Proyectos, where the
 * gallery opens on the same disc (its view-transition name travels with it).
 */
export function HomePage() {
  const first = galleryProjects[0];
  return (
    <>
      <Hero />
      <ChapterHold>
        <About />
      </ChapterHold>
      {first && (
        <NextTrack
          href={chapterHref('proyectos')}
          label={ui.navigation.projects}
          note={ui.detail.nextTrack}
          title={ui.navigation.projects}
          tagline={messages.featuredProjects(galleryProjects.map((project) => project.title))}
          disc={
            <Disc variant="pressed" transitionName={`disc-${first.slug}`}>
              <CoverArt cover={projectTheme(first.id)} assets={first.assets} title={first.title} catalog={site.catalog} shape="disc" artSize="8rem" />
            </Disc>
          }
        />
      )}
    </>
  );
}

export default HomePage;
