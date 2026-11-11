import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import PenMark from '../../components/graphics/PenMark/PenMark';
import { ArrowRight, ArrowUpRight } from '../../components/ui/Icon/Icon';
import { chapterById } from '../../config/navigation';
import { library } from '../../config/library';
import '../../design/sections/BonusTrack/BonusTrack.css';

const chapter = chapterById('libreria');

/**
 * Chapter 05, the bonus track (ADR-001). A small, honest teaser: the status
 * in the heading, who it is for in one line, and the action as the
 * oversized word itself ("Avísame*", a mailto link, never a fake form), its
 * footnote and the privacy note under it. The talk it grew from is the one
 * link out. References: CollectUI Subscribe, Matt Jinn's promo card.
 */
export function BonusTrack() {
  return (
    <section id={chapter.id} className="chapter chapter--frame bonus" aria-labelledby="bonus-title">
      <div className="container frame bonus__frame">
        <ChapterHeading
          id="bonus-title"
          title={<PenMark text={library.heading} mark={library.mark} />}
          lede={library.body}
        />

        <div className="bonus__action" data-reveal="up">
          <a className="bonus__headline" href={library.cta.href}>
            {library.headline}
            <span className="visually-hidden"> {library.headlineHidden}</span>
            <span className="bonus__asterisk" aria-hidden="true">*</span>
            <ArrowRight className="bonus__arrow" aria-hidden="true" />
          </a>
          <p className="bonus__footnote">
            <span aria-hidden="true">* </span>
            {library.footnote}
          </p>
          <p className="bonus__privacy">{library.privacy}</p>
        </div>

        <a className="bonus__talk" href={library.talk.href} target="_blank" rel="noopener noreferrer">
          {library.talk.label}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default BonusTrack;
