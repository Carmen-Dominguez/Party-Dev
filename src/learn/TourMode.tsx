import React from 'react';
import Hero from '../components/Hero';
import EventDetails from '../components/EventDetails';
import Pricing from '../components/Pricing';
import DressCode from '../components/DressCode';
import Location from '../components/Location';
import Contact from '../components/Contact';
import ArtDivider from '../components/ArtDivider';
import { useLearn } from './LearnContext';
import './TourMode.scss';

/**
 * Dinner-party brochure using learn-lab customizations on the hero.
 */
const TourMode: React.FC = () => {
  const { setView, ageMode, heroState } = useLearn();

  return (
    <>
      <div className="tour-banner">
        <p className="tour-banner__text">
          {ageMode === 'young'
            ? 'Your party page — with the changes you made in the lab!'
            : 'The finished invitation, including your hero customizations from Learn mode.'}
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
        <Hero customization={heroState} />
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
