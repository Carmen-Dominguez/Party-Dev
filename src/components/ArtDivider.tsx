import React from 'react';
import './ArtDivider.scss';

type ArtDividerProps = {
  /** Vertical crop focus — tune per placement if needed */
  crop?: string;
  /** Load immediately when near the top of the page */
  priority?: boolean;
};

/**
 * Full-width decorative band cropped from Tretchikoff's Chrysanthemums.
 * Sits between sections as a visual breather.
 */
const ArtDivider: React.FC<ArtDividerProps> = ({
  crop = 'center 30%',
  priority = false,
}) => {
  return (
    <div className="art-divider" aria-hidden="true">
      <img
        src="/v-t-chrysanthemums.jpg"
        alt=""
        className="art-divider__image"
        style={{ objectPosition: crop }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
};

export default ArtDivider;
