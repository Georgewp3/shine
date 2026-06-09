import { Translation } from '../data/translations';

type AboutProps = {
  t: Translation['about'];
};

function About({ t }: AboutProps) {
  const titleParts = t.title.split(' ');
  const highlight = titleParts.pop();

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container narrow">
        <h2 className="section-title" id="about-title">
          {titleParts.join(' ')} <span>{highlight}</span>
        </h2>
        {t.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default About;
