import { ui } from '../../config/ui';
import { useCallback, useRef, useState } from 'react';
import { ArrowRight } from '../../components/ui/Icon/Icon';
import { chapterById } from '../../config/navigation';
import { projectSummaries } from '../../config/projects';
import { site } from '../../config/site';
import DiscGallery from '../../components/cd/DiscGallery/DiscGallery';
import PenMark from '../../components/graphics/PenMark/PenMark';
import QuickResume from '../../components/editorial/QuickResume/QuickResume';
import { useParallax } from '../../components/ui/motion/useParallax';
import '../../design/sections/Projects/Projects.css';

const chapter = chapterById('proyectos');

/**
 * Chapter 01: the releases as a collection of discs.
 * Contract: docs/INFORMATION_ARCHITECTURE.md §3. Primary reference: A24 by
 * Ravi Klaassens (composition, credits, discs on an arc, the pen loop on
 * hover); the blue marker arrow is Jorge's own image (public/images/gallery/).
 *
 * The heading links the full index (/proyectos/). The private work is the
 * last disc (a broken one, linking Contact), not a line under the gallery.
 *
 * The credits (QuickResume) always show the selected disc; the gallery owns
 * the selection and reports it here. The list at the end is the no-JavaScript
 * path to every case study. Scroll gives the frame depth (useParallax): the
 * credits trail the page, the discs run ahead of it, both at rest when the
 * chapter's top meets the viewport's.
 */
export function Projects() {
  const [selected, setSelected] = useState(0);
  const [animate, setAnimate] = useState(false);
  const project = projectSummaries[selected];
  const sectionRef = useRef<HTMLElement>(null);
  useParallax(sectionRef);

  const handleSelect = useCallback((index: number, restored: boolean) => {
    setSelected(index);
    setAnimate(!restored);
  }, []);

  return (
    <section id={chapter.id} className="chapter projects" aria-labelledby="projects-title" ref={sectionRef} data-ground="secondary">
      <div className="projects__frame">
        <header className="projects__info">
          <h2 id="projects-title" className="projects__heading">
            <a className="projects__heading-link" href="/proyectos/" title={ui.actions.projectIndex}>
              <PenMark text={ui.projects.heading} mark={ui.projects.headingMark} />{' '}
              <ArrowRight className="projects__heading-arrow" size={20} aria-hidden="true" />
            </a>
          </h2>
          {project ? <QuickResume key={project.id} project={project} animate={animate} /> : <p className="lede">{ui.projects.empty}</p>}
        </header>

        {project && <DiscGallery items={projectSummaries} catalog={site.catalog} onSelect={handleSelect} />}
      </div>

      <nav className="projects__all container" aria-label={ui.actions.allProjects}>
        <p className="label">{ui.projects.allTracks}</p>
        <ol role="list">
          {projectSummaries.map((item) => (
            <li key={item.slug}>
              <a href={item.href}>
                <span className="mono">{item.track}</span>
                <span className="projects__all-title">{item.title}</span>
                <span className="projects__all-tagline">{item.shortDescription}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}

export default Projects;
