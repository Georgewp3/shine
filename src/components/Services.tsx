import { Translation } from '../data/translations';

type ServicesProps = {
  t: Translation['services'];
};

function Services({ t }: ServicesProps) {
  const titleParts = t.title.split(' ');
  const highlight = titleParts.pop();

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <h2 className="section-title" id="services-title">
          {titleParts.join(' ')} <span>{highlight}</span>
        </h2>
        <div className="service-grid">
          {t.items.map((service) => (
            <article className="service-card" key={service.name}>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <strong>{service.price}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
