import Button from '../../components/Button/Button';
import ChapterHeading from '../../components/ChapterHeading/ChapterHeading';
import { chapterById } from '../../content/chapters';
import { library } from '../../content/library';
import './BonusTrack.css';

const chapter = chapterById('libreria');

/**
 * Chapter 05: the bonus track. A small, honest teaser: real status, a mailto
 * action instead of a fake subscription form, and a privacy note.
 * References: CollectUI Subscribe, Matt Jinn's promo card.
 */
export function BonusTrack() {
  return (
    <section id={chapter.id} className="chapter bonus" aria-labelledby="bonus-title">
      <div className="container bonus__grid">
        <div className="bonus__intro">
          <ChapterHeading id="bonus-title" kicker={chapter.kicker} title={library.heading} handwriting="Bonus" />
          <p className="bonus__body" data-reveal="up">
            {library.body}
          </p>
          <p className="bonus__audience" data-reveal="up">
            {library.audience}
          </p>
          <p className="bonus__status" data-reveal="up">
            <span className="bonus__status-label">Estado</span>
            {library.status}
          </p>
        </div>

        <div className="bonus__card" data-reveal="up">
          <span className="bonus__sticker" aria-hidden="true">
            <span>Bonus</span>
            <span>track</span>
          </span>
          <p className="bonus__headline" aria-hidden="true">
            {library.headline}
            <span className="bonus__asterisk">*</span>
          </p>
          <div className="bonus__actions">
            <Button href={library.cta.href} icon="mail">
              {library.cta.label}
            </Button>
            <Button href={library.talk.href} variant="secondary" icon="arrow-up-right" external>
              {library.talk.label}
            </Button>
          </div>
          <p className="bonus__footnote">
            <span aria-hidden="true">* </span>
            {library.footnote}
          </p>
          <p className="bonus__privacy">{library.privacy}</p>
        </div>
      </div>
    </section>
  );
}

export default BonusTrack;
