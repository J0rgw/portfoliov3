import { ui } from '../../config/ui';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/ui/Button/Button';
import CreditsTable from '../../components/editorial/CreditsTable/CreditsTable';
import Disc from '../../components/cd/Disc/Disc';
import { chapterById } from '../../config/navigation';
import { mailto, site, socials } from '../../config/site';
import '../../design/sections/Contact/Contact.css';

const chapter = chapterById('contacto');

/**
 * Chapter 06: the back cover. The primary action of the whole site.
 * References: The Romans (oversized statement with an inline object),
 * Kerimov (spec rows), Kyoosang Choi (contact as an object), Huy Phan.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard can be blocked; the address stays visible and selectable.
      setCopied(false);
      setCopyFailed(true);
    }
  };

  const linkedIn = socials.find((social) => social.icon === 'linkedin');
  const gitHub = socials.find((social) => social.icon === 'github');

  return (
    <section id={chapter.id} className="chapter contact on-night" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__statement" aria-hidden="true">
          <span className="contact__hand">{ui.navigation.talk}</span>
          <span className="contact__inline-disc">
            <Disc variant="cdr" handwriting={site.signature} />
          </span>
        </div>

        <div className="contact__grid">
          <div className="contact__main">
            <h2 id="contact-title" className="contact__title">{ui.contact.heading} </h2>
            <p className="contact__lede lede">{ui.contact.body} </p>
            <div className="contact__actions">
              <Button href={mailto(site.contact.subject, site.contact.body)} icon="mail">{ui.actions.write} </Button>
              <Button variant="secondary" icon="copy" onClick={copyEmail}>
                {copied ? ui.contact.copied : ui.contact.copy}
              </Button>
            </div>
            <p className="contact__email mono">{site.email}</p>
            <p className="visually-hidden" role="status" aria-live="polite">
              {copied ? ui.contact.copySuccess : copyFailed ? ui.contact.copyFailed : ''}
            </p>
          </div>

          <div className="contact__spec">
            <CreditsTable
              rows={[
                { label: ui.labels.status, value: site.availability.open ? site.availability.label : ui.contact.closed },
                { label: ui.labels.base, value: site.location },
                { label: ui.labels.languages, value: site.languages },
                {
                  label: ui.labels.linkedin,
                  value: linkedIn ? (
                    <a href={linkedIn.href} target="_blank" rel="noopener noreferrer">
                      {linkedIn.detail}
                    </a>
                  ) : null,
                },
                {
                  label: ui.labels.github,
                  value: gitHub ? (
                    <a href={gitHub.href} target="_blank" rel="noopener noreferrer">
                      {gitHub.detail}
                    </a>
                  ) : null,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
