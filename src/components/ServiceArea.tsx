import type { Translation } from '../data/translations';
import './ServiceArea.css';

type ServiceAreaProps = {
  t: Translation['area'];
};

export default function ServiceArea({ t }: ServiceAreaProps) {
  return (
    <section id="service-area" className="service-area">
      <div className="service-area__inner">
        <header className="service-area__header">
          <span className="section-eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
        </header>

        <div className="service-area__map-card">
          <div className="service-area__map-label">
            <div className="service-area__map-label-text">
              <strong>{t.mapTitle}</strong>
              <span>{t.mapLocation}</span>
            </div>
            <div className="service-area__map-label-actions">
              <a
                href="https://www.google.com/maps/place/Larnaca,+Cyprus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.openMap}
                className="service-area__icon-btn"
              >
                ↗
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Larnaca,Cyprus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.getDirections}
                className="service-area__icon-btn service-area__icon-btn--primary"
              >
                ➤
              </a>
            </div>
          </div>

          <iframe
            title={t.mapLocation}
            src="https://www.openstreetmap.org/export/embed.html?bbox=33.47%2C34.80%2C33.77%2C35.04&layer=mapnik&marker=34.9182%2C33.6201"
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
