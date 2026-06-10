type ServiceAreaProps = {
  area: {
    title: string;
    text: string;
  };
};

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Larnaca%2C%20Kiti%20and%20Oroklini%2C%20Cyprus';
const embedUrl =
  'https://www.google.com/maps?q=Larnaca%2C%20Kiti%2C%20Oroklini%2C%20Cyprus&z=10&output=embed';

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
        </div>
      </div>
    </section>
  );
}

export default ServiceArea;
