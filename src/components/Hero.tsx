import React, { useMemo } from 'react';
import type { HeroPreviewState } from '../learn/types';
import { darkenHex } from '../learn/types';
import './Hero.scss';

interface HeroProps {
  /** Learn-lab customizations — applied on the finished party tour. */
  customization?: HeroPreviewState;
}

/**
 * Hero section — establishes the luxury aesthetic and sets the
 * visual tone for the entire page. Uses an animated reveal and
 * a full-viewport dark background with the event title.
 */
const Hero: React.FC<HeroProps> = ({ customization }) => {
  const titleLine1 = customization?.titleLine1 ?? "Shirley's";
  const titleLine2 = customization?.titleLine2 ?? 'Dinner Party';

  const sectionStyle = useMemo(() => {
    if (!customization) return undefined;
    return {
      '--hero-bg': customization.bgColor,
      '--hero-bg-dark': darkenHex(customization.bgColor),
      '--hero-title-color': customization.titleColor,
      '--hero-accent-color': customization.accentColor,
      '--hero-title-size': `${customization.titleFontSize}rem`,
      '--hero-title-style': customization.titleItalic ? 'italic' : 'normal',
    } as React.CSSProperties;
  }, [customization]);

  const handleRsvp = () => {
    if (customization) {
      window.alert(customization.rsvpAlert);
    }
  };

  return (
    <section
      className={`hero section${customization ? ' hero--customized' : ''}`}
      aria-label="Welcome"
      style={sectionStyle}
    >
      <div className="hero__bg-grid" aria-hidden="true" />

      <div className="hero__inner section__inner">
        <p className="hero__starburst fade-in-up fade-in-up--delay-1" aria-hidden="true">
          ✦ &nbsp; ✦ &nbsp; ✦
        </p>

        <span className="section__overline fade-in-up fade-in-up--delay-1">
          You are cordially invited
        </span>

        <h1 className="hero__title fade-in-up fade-in-up--delay-2">
          {titleLine1}
          <br />
          <em>{titleLine2}</em>
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

        {customization && (
          <button
            type="button"
            className="hero__rsvp fade-in-up fade-in-up--delay-4"
            onClick={handleRsvp}
          >
            {customization.rsvpLabel}
          </button>
        )}

        <div className="hero__border fade-in-up fade-in-up--delay-4" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Hero;
