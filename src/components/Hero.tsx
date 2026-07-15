import React from 'react';
import './Hero.scss';

/**
 * Hero section — establishes the luxury aesthetic and sets the
 * visual tone for the entire page. Uses an animated reveal and
 * a full-viewport dark background with the event title.
 */
const Hero: React.FC = () => {
  return (
    <section className="hero section" aria-label="Welcome">
      <div className="hero__bg-grid" aria-hidden="true" />

      <div className="hero__inner section__inner">
        {/* Starburst decorative row */}
        <p className="hero__starburst fade-in-up fade-in-up--delay-1" aria-hidden="true">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>

        <span className="section__overline fade-in-up fade-in-up--delay-1">
          You are cordially invited
        </span>

        <h1 className="hero__title fade-in-up fade-in-up--delay-2">
          Shirley's
          <br />
          <em>Dinner Party</em>
        </h1>

        <div className="ornament fade-in-up fade-in-up--delay-3" aria-hidden="true">
          <span className="ornament__symbol">✦</span>
        </div>

        <p className="hero__date fade-in-up fade-in-up--delay-3">
          27 June &mdash; 18:00
        </p>

        <p className="hero__location-hint fade-in-up fade-in-up--delay-4">
          Gardens, Cape Town
        </p>

        <div className="hero__border fade-in-up fade-in-up--delay-4" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Hero;
