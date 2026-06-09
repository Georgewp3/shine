import { useState } from 'react';
import About from './components/About';
import BookingForm from './components/BookingForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Services from './components/Services';
import { Language, translations } from './data/translations';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'el' : 'en'));
  };

  return (
    <>
      <Header language={language} onToggleLanguage={toggleLanguage} t={t} />
      <main>
        <Hero t={t.hero} />
        <About t={t.about} />
        <Gallery t={t.gallery} />
        <Services t={t.services} />
        <Schedule t={t.schedule} />
        <BookingForm t={t.booking} services={t.services.items} />
        <section className="section section-compact" id="area" aria-labelledby="area-title">
          <div className="container narrow">
            <p className="eyebrow">{t.area.eyebrow}</p>
            <h2 id="area-title">{t.area.title}</h2>
            <p className="lead">{t.area.text}</p>
          </div>
        </section>
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}

export default App;
