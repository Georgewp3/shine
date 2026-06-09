import logo from '../assets/logo.webp';
import heroImage from '../assets/image2.webp';
import { Translation } from '../data/translations';

type HeroProps = {
  t: Translation['hero'];
};

function Hero({ t }: HeroProps) {
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <img className="hero-bg" src={heroImage} alt="" aria-hidden="true" />
      <div className="container hero-content">
        <img className="hero-logo" src={logo} alt={t.logoAlt} />
        <h1 id="hero-title">
          <span>Shine Argyrou</span>
          <strong>CarWash</strong>
        </h1>
        <p className="hero-subtitle">{t.subtitle}</p>
        <a className="button button-primary" href="#book">
          {t.cta}
        </a>
      </div>
    </section>
  );
}

export default Hero;
