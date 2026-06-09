import { Translation } from '../data/translations';

type ContactProps = {
  t: Translation['contact'];
};

function Contact({ t }: ContactProps) {
  const contactLinks = [
    { label: t.links.call, href: 'tel:+35799668535' },
    { label: t.links.viber, href: 'viber://chat?number=%2B35799668535' },
    { label: t.links.whatsapp, href: 'https://wa.me/35799668535' },
    { label: t.links.instagram, href: 'https://www.instagram.com/shineargyrou/' },
  ];

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="contact-title">{t.title}</h2>
        <div className="contact-grid">
          {contactLinks.map((link) => (
            <a className="contact-card" href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="contact-details">
          <p>
            <strong>{t.phone}:</strong> +357 99668535
          </p>
          <p>
            <strong>{t.location}:</strong> {t.locationValue}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
