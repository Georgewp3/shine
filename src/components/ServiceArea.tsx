type ServiceAreaProps = {
  area: {
    title: string;
    text: string;
  };
};

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Larnaca%2C%20Oroklini%2C%20Kiti%2C%20Cyprus';
const embedUrl = 'https://www.google.com/maps?q=34.905%2C33.620&z=12&output=embed';

function ServiceArea({ area }: ServiceAreaProps) {
  const titleParts = area.title.split(' ');
  const accentWord = titleParts.pop();
  const titleStart = titleParts.join(' ');

  return (
    <section className="section service-area" id="area" aria-labelledby="area-title">
      <div className="container">
        <div className="service-area-heading">
          <h2 id="area-title">
            {titleStart} <span>{accentWord}</span>
          </h2>
          <p>{area.text}</p>
        </div>
        <div className="service-map">
          <a className="map-open-link" href={mapsUrl} target="_blank" rel="noreferrer">
            Open in Maps
          </a>
          <iframe
            title="Google map showing Larnaca, Kiti and Oroklini service area"
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <svg
            className="service-area-outline"
            viewBox="0 0 1000 460"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M 573 8 C 604 38 604 88 636 113 C 676 145 738 132 770 169 C 801 207 771 254 722 268 C 666 284 671 333 704 363 C 724 383 713 418 681 435 C 641 455 592 432 557 392 C 523 354 478 356 451 393 C 418 438 342 426 311 378 C 282 334 302 292 350 264 C 392 240 388 202 344 178 C 295 151 235 161 212 127 C 190 94 233 58 287 74 C 349 92 401 76 438 38 C 478 -2 535 -25 573 8 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default ServiceArea;
