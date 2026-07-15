import React from 'react';
import './Location.scss';

/** Venue details for the event */
const VENUE = {
  street: '10 Derwent Road',
  suburb: 'Bowbells 24',
  city: 'Gardens, Cape Town',
  arrivalTime: '18:00',
  date: 'Saturday, 27 June',
} as const;

/**
 * Location section — provides the venue address and arrival time
 * in a clear, structured format with a decorative border treatment.
 */
const Location: React.FC = () => {
  // Encode address for Google Maps link
  const mapsQuery = encodeURIComponent(
    `${VENUE.street}, ${VENUE.suburb}, ${VENUE.city}`,
  );
  const mapsHref = `https://maps.google.com/?q=${mapsQuery}`;

  return (
    <section className="location section bg-pattern" aria-labelledby="location-heading">
      <div className="section__inner">
        <span className="section__overline">Find Us</span>
        <h2 className="section__heading" id="location-heading">
          Location &amp; Time
        </h2>

        <div className="divider" aria-hidden="true" />

        <div className="location__card" role="group" aria-label="Venue details">
          <div className="location__block">
            <h3 className="location__label">Venue</h3>
            <address className="location__address">
              {VENUE.street}
              <br />
              {VENUE.suburb}
              <br />
              {VENUE.city}
            </address>
            <a
              href={mapsHref}
              className="location__map-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open venue in Google Maps"
            >
              View on Map &rarr;
            </a>
          </div>

          <div className="location__separator" aria-hidden="true" />

          <div className="location__block">
            <h3 className="location__label">Arrive</h3>
            <p className="location__time">{VENUE.arrivalTime}</p>
            <p className="location__date">{VENUE.date}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
