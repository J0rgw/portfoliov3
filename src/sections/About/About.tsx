import type { CSSProperties } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import Cutout from '../../components/graphics/Cutout/Cutout';
import PenMark from '../../components/graphics/PenMark/PenMark';
import { aboutBio, aboutIntro, instruments, milestones } from '../../config/about';
import { chapterById } from '../../config/navigation';
import { site } from '../../config/site';
import { ui } from '../../config/ui';
import '../../design/sections/About/About.css';

const chapter = chapterById('sobre-mi');

/** "A, B y C", the way Spanish writes a list (DESIGN.md "Typography"). */
const listFormat = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}` : items.join('');

/**
 * Chapter 04, Sobre mí (ADR-001): the person behind the record. Jorge's
 * portrait as a photographed cut-out (it was the pass's photo), one paragraph
 * signed like liner notes, and the credits: the timeline newest first and the
 * instruments, each a line. References: Kyoosang Choi (his own artefacts),
 * A24 (credits), Huy Phan (positioning). Contract:
 * docs/INFORMATION_ARCHITECTURE.md §3.
 */
export function About() {
  return (
    <section id={chapter.id} className="chapter chapter--frame about" aria-labelledby="about-title">
      <div className="container frame about__frame">
        <ChapterHeading id="about-title" title={<PenMark text={aboutIntro.heading} mark={aboutIntro.mark} />} />

        <div className="about__portrait" data-reveal="fade">
          <Cutout id="jorge" sizes="(min-width: 1024px) and (orientation: landscape) min(23rem, 26vw), 11rem" />
        </div>

        {/* Liner notes, signed at the foot like the ones in a booklet. */}
        <div className="about__notes" data-reveal="up">
          <p className="about__bio">{aboutBio}</p>
          <p className="about__signature handwriting" aria-hidden="true">
            {site.name.split(' ')[0]}
          </p>
        </div>

        {/* The credits: the timeline, then the instruments and languages, one
            line each, on the same columns. */}
        <div className="about__credits">
          <h3 className="about__subhead">{ui.about.timeline}</h3>
          <ol className="about__milestones" role="list">
            {milestones.map((milestone, index) => (
              <li
                key={`${milestone.period}-${milestone.title}`}
                className="about__milestone"
                data-reveal="up"
                style={{ '--reveal-index': index % 4 } as CSSProperties}
              >
                {/* When, the role, where: hierarchy by type, no separators. */}
                <span className="about__milestone-period mono">{milestone.period}</span>
                <span className="about__milestone-title">{milestone.title}</span>
                <span className="about__milestone-org">{milestone.org}</span>
              </li>
            ))}
          </ol>
          <dl className="about__instruments">
            <div className="about__instrument-group">
              <dt>{ui.about.instruments}</dt>
              <dd>{listFormat(instruments.flatMap((group) => group.items))}</dd>
            </div>
            <div className="about__instrument-group">
              <dt>{ui.labels.languages}</dt>
              <dd>{site.languages}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export default About;
