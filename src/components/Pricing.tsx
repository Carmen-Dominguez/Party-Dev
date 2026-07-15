import React from 'react';
import './Pricing.scss';

/** Individual pricing item data shape */
interface PricingItem {
  label: string;
  price: string;
  note?: string;
}

/** All pricing tiers for the evening */
const PRICING_ITEMS: PricingItem[] = [
  { label: 'Dinner', price: 'R200', note: 'per person' },
  { label: 'Wine', price: 'R30', note: 'per glass' },
  { label: 'Champagne', price: 'R40', note: 'per glass' },
];

/**
 * Pricing section — displays dinner and beverage costs in an
 * elegant card-style layout with clear typographic hierarchy.
 */
const Pricing: React.FC = () => {
  return (
    <section className="pricing section bg-pattern" aria-labelledby="pricing-heading">
      <div className="section__inner">
        <span className="section__overline">What to Expect</span>
        <h2 className="section__heading" id="pricing-heading">
          Pricing
        </h2>

        <div className="divider" aria-hidden="true" />

        <ul className="pricing__list" aria-label="Pricing information">
          {PRICING_ITEMS.map(({ label, price, note }) => (
            <li key={label} className="pricing__item">
              <span className="pricing__label">{label}</span>
              <span className="pricing__dots" aria-hidden="true" />
              <span className="pricing__amount">
                {price}
                {note && <span className="pricing__note">{note}</span>}
              </span>
            </li>
          ))}
        </ul>

        <p className="pricing__disclaimer section__body">
          Payment on or before 24th June 2026. Please contact Carmen or Shirley regarding
          any dietary requirements in advance.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
