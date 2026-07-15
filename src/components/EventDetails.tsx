import React from 'react';
import './EventDetails.scss';

/**
 * EventDetails section — presents the key highlights of the evening
 * in a clean, scannable layout with ornamental separators.
 */
const EventDetails: React.FC = () => {
  return (
    <section className="event-details section" aria-labelledby="event-details-heading">
      <div className="section__inner">
        <span className="section__overline">The Evening</span>
        <h2 className="section__heading" id="event-details-heading">
          A Night of Fun!
        </h2>

        <div className="divider" aria-hidden="true" />

        <p className="section__body event-details__intro">
          Join us for an intimate dinner experience — an evening of fine food,
          flowing conversation, and cherished company in the heart of Cape Town.
        </p>

        <div className="event-details__grid" role="list">
          <div className="event-details__item" role="listitem">
            <span className="event-details__item-icon" aria-hidden="true">✦</span>
            <h3 className="event-details__item-label">Date</h3>
            <p className="event-details__item-value">Saturday, 27 June</p>
          </div>

          <div className="event-details__item" role="listitem">
            <span className="event-details__item-icon" aria-hidden="true">✦</span>
            <h3 className="event-details__item-label">Arrival</h3>
            <p className="event-details__item-value">18:00</p>
          </div>

          <div className="event-details__item" role="listitem">
            <span className="event-details__item-icon" aria-hidden="true">✦</span>
            <h3 className="event-details__item-label">Venue</h3>
            <p className="event-details__item-value">Gardens, Cape Town</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
