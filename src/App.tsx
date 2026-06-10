import { useState } from 'react';
import About from './components/About';
import BookingForm from './components/BookingForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import ServiceArea from './components/ServiceArea';
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
        <ServiceArea area={t.area} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}

export default App;

