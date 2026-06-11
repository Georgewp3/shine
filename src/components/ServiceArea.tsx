// ServiceArea.tsx
import "./ServiceArea.css";

export default function ServiceArea() {
  return (
    <section id="service-area" className="service-area">
      <div className="service-area__inner">
        <header className="service-area__header">
          <h2>Our Service Area</h2>
          <p>We proudly serve Larnaca and the surrounding areas in Cyprus.</p>
        </header>

        <div className="service-area__map-card">
          <div className="service-area__map-label">
            <div className="service-area__map-label-text">
              <strong>Larnaca</strong>
              <span>Larnaca, Cyprus</span>
            </div>
            <div className="service-area__map-label-actions">
              <a
                href="https://www.google.com/maps/place/Larnaca,+Cyprus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in Google Maps"
                className="service-area__icon-btn"
              >
                ↗
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Larnaca,Cyprus"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions"
                className="service-area__icon-btn service-area__icon-btn--primary"
              >
                ➤
              </a>
            </div>
          </div>

          <iframe
            title="Larnaca service area map"
            src="https://www.google.com/maps?q=Larnaca,Cyprus&z=11&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
