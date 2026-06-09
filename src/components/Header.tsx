import { useState } from 'react';
import logo from '../assets/logo.webp';
import { Language, Translation } from '../data/translations';

type HeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
  t: Translation;
};

function Header({ language, onToggleLanguage, t }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.schedule, href: '#schedule' },
    { label: t.nav.book, href: '#book' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">
            <img src={logo} alt="Shine Argyrou CarWash logo" />
          </span>
          <span>Shine Argyrou</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul id="primary-navigation" className={`nav-links ${isOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="language-toggle"
              type="button"
              aria-label={t.switchLabel}
              aria-pressed={language === 'el'}
              onClick={() => {
                onToggleLanguage();
                closeMenu();
              }}
            >
              {t.languageLabel}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
