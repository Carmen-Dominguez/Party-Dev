import React from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import Pricing from './components/Pricing';
import DressCode from './components/DressCode';
import Location from './components/Location';
import Contact from './components/Contact';
import ArtDivider from './components/ArtDivider';
import { Analytics } from '@vercel/analytics/react';

/**
 * Root application component.
 * Renders all sections of the Shirley's Party brochure site
 * in a seamless, single-page layout.
 */
const App: React.FC = () => {
  return (
    <main className="app">
      <Hero />
      <ArtDivider priority crop="center 28%" />
      <EventDetails />
      <ArtDivider crop="center 32%" />
      <Pricing />
      <ArtDivider crop="center 26%" />
      <DressCode />
      <ArtDivider crop="center 34%" />
      <Location />
      <ArtDivider crop="center 30%" />
      <Contact />
      <Analytics />
    </main>
  );
};

export default App;
