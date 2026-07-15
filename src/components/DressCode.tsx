import React from 'react';
import './DressCode.scss';

/**
 * DressCode section — communicates the attire expectation with
 * restrained elegance, reinforcing the sophisticated tone of the event.
 */
const DressCode: React.FC = () => {
  return (
    <section className="dress-code section" aria-labelledby="dress-code-heading">
      <div className="section__inner">
        <div className="ornament" aria-hidden="true">
          <span className="ornament__symbol">✦</span>
        </div>

        <span className="section__overline">Attire</span>
        <h2 className="section__heading" id="dress-code-heading">
          Dress Code
        </h2>

        <div className="divider" aria-hidden="true" />

        <p className="dress-code__code">Smart Casual</p>

        <p className="section__body dress-code__description">
          We invite you to dress with understated refinement — smart casual
          attire that reflects the comfortable elegance of the evening.
        </p>
      </div>
    </section>
  );
};

export default DressCode;
