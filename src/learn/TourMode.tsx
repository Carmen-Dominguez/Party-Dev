import React from 'react';
import Hero from '../components/Hero';
import EventDetails from '../components/EventDetails';
import Pricing from '../components/Pricing';
import DressCode from '../components/DressCode';
import Location from '../components/Location';
import Contact from '../components/Contact';
import ArtDivider from '../components/ArtDivider';
import { useLearn } from '../learn/LearnContext';
import './TourMode.scss';

/**
 * Original dinner-party brochure, with a banner to return to Learn mode.
 */
const TourMode: React.FC = () => {
  const { setView, ageMode } = useLearn();

  return (
    <>
      <div className="tour-banner">
        <p className="tour-banner__text">
          {ageMode === 'young'
            ? 'This is the finished party page — made with HTML, CSS, and a little JavaScript.'
            : 'Tour the finished invitation. Every section is HTML structure + CSS style.'}
        </p>
        <button
          type="button"
          className="tour-banner__btn"
          onClick={() => setView('learn')}
        >
          {ageMode === 'young' ? 'Back to the lab' : 'Back to Learn mode'}
        </button>
      </div>

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
      </main>
    </>
  );
};

export default TourMode;
