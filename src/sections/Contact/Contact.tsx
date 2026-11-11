import { useEffect, useRef, useState } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import Disc from '../../components/cd/Disc/Disc';
import { ArrowRight, ArrowUpRight, Copy } from '../../components/ui/Icon/Icon';
import { chapterById } from '../../config/navigation';
import { mailto, site, socials } from '../../config/site';
import { ui } from '../../config/ui';
import '../../design/sections/Contact/Contact.css';

const chapter = chapterById('contacto');

/**
 * Chapter 06: the back cover, the primary action of the whole site (ADR-001).
 * The oversized "Hablemos", with the CD-R set inline, is the email link
 * itself (The Romans: an object between words); under it, one line of
 * details: the address with a copy button, LinkedIn, GitHub and whether
 * Jorge is taking work. No spec table, no buttons stacked under a lede.
 * References: The Romans, Kyoosang Choi (contact as an object), Huy Phan.
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

  const profiles = socials.filter((social) => social.icon === 'linkedin' || social.icon === 'github');

  return (
    <section id={chapter.id} className="chapter chapter--frame contact on-night" aria-labelledby="contact-title">
      <div className="container frame contact__frame">
        <ChapterHeading id="contact-title" title={ui.contact.heading} lede={ui.contact.body} />

        <a className="contact__talk" href={mailto(site.contact.subject, site.contact.body)} data-reveal="up">
          <span className="contact__word">{ui.navigation.talk}</span>
          <span className="visually-hidden"> {ui.contact.talkHidden}</span>
          <span className="contact__disc" aria-hidden="true">
            <Disc variant="cdr" handwriting={site.signature} />
          </span>
          <ArrowRight className="contact__arrow" aria-hidden="true" />
        </a>

        <div className="contact__details">
          <p className="contact__email">
            <span className="contact__address">{site.email}</span>
            <button type="button" className="contact__copy" onClick={copyEmail}>
              <Copy size={16} aria-hidden="true" />
              {copied ? ui.contact.copied : ui.contact.copy}
            </button>
          </p>
          <ul className="contact__links" role="list">
            {profiles.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="contact__status">
            {site.availability.open && <span className="contact__dot" aria-hidden="true" />}
            {site.availability.open ? site.availability.label : ui.contact.closed}
          </p>
        </div>

        <p className="visually-hidden" role="status" aria-live="polite">
          {copied ? ui.contact.copySuccess : copyFailed ? ui.contact.copyFailed : ''}
        </p>
      </div>
    </section>
  );
}

export default Contact;
