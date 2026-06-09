import { Translation } from '../data/translations';

type FooterProps = {
  t: Translation['footer'];
};

function Footer({ t }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>{t.rights}</p>
        <p>{t.tagline}</p>
      </div>
    </footer>
  );
}

export default Footer;
