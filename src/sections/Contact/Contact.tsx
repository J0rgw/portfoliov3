import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import CreditsTable from '../../components/CreditsTable/CreditsTable';
import Disc from '../../components/Disc/Disc';
import { chapterById } from '../../content/chapters';
import { mailto, site, socials } from '../../content/site';
import './Contact.css';

const chapter = chapterById('contacto');

/**
 * Chapter 06: the back cover. The primary action of the whole site.
 * References: The Romans (oversized statement with an inline object),
 * Kerimov (spec rows), Kyoosang Choi (contact as an object), Huy Phan.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard can be blocked; the address stays visible and selectable.
      setCopied(false);
    }
  };

  const linkedIn = socials.find((social) => social.icon === 'linkedin');
  const gitHub = socials.find((social) => social.icon === 'github');

  return (
    <section id={chapter.id} className="chapter contact on-night" aria-labelledby="contact-title">
      <div className="container">
        <p className="contact__kicker label">{chapter.kicker}</p>

        <div className="contact__statement" aria-hidden="true">
          <span className="contact__hand">Hablemos</span>
          <span className="contact__inline-disc">
            <Disc variant="cdr" handwriting="Jarcas" />
          </span>
        </div>

        <div className="contact__grid">
          <div className="contact__main">
            <h2 id="contact-title" className="contact__title">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="contact__lede lede">
              Cuéntame qué necesitas, en qué punto está y qué plazo tienes. Te respondo personalmente.
            </p>
            <div className="contact__actions">
              <Button href={mailto(site.contact.subject, site.contact.body)} icon="mail">
                Escríbeme
              </Button>
              <Button variant="secondary" icon="copy" onClick={copyEmail}>
                {copied ? 'Email copiado' : 'Copiar email'}
              </Button>
            </div>
            <p className="contact__email mono">{site.email}</p>
            <p className="visually-hidden" role="status" aria-live="polite">
              {copied ? 'Email copiado al portapapeles' : ''}
            </p>
          </div>

          <div className="contact__spec">
            <CreditsTable
              rows={[
                { label: 'Estado', value: site.availability.open ? site.availability.label : 'Agenda completa' },
                { label: 'Base', value: site.location },
                { label: 'Idiomas', value: site.languages },
                {
                  label: 'LinkedIn',
                  value: linkedIn ? (
                    <a href={linkedIn.href} target="_blank" rel="noopener noreferrer">
                      {linkedIn.detail}
                    </a>
                  ) : null,
                },
                {
                  label: 'GitHub',
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
