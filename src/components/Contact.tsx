import React from 'react';
import './Contact.scss';

/**
 * Contact section — informational only. Displays Carmen & Shirley's
 * details so guests can reach out directly for RSVPs and enquiries.
 */
const Contact: React.FC = () => {
  return (
    <footer className="contact section" aria-labelledby="contact-heading">
      <div className="section__inner">
        <div className="ornament" aria-hidden="true">
          <span className="ornament__symbol">✦</span>
        </div>

        <span className="section__overline">Get in Touch</span>
        <h2 className="section__heading" id="contact-heading">
          Contact
        </h2>

        <div className="divider" aria-hidden="true" />

        <p className="section__body contact__intro">
          For RSVPs, dietary requirements, or any enquiries, please reach out
          directly to our hosts.
        </p>

        <div className="contact__hosts" role="list" aria-label="Host contacts">
          <div className="contact__host" role="listitem">
            <span className="contact__host-name">
              <a href="https://wa.me/27782600964?text=Hi%20Carmen%2C%20I'd%20like%20to%20RSVP">
                Carmen
              </a>
          </span>
          </div>
          <div className="contact__host-divider" aria-hidden="true">&amp;</div>
          <div className="contact__host" role="listitem">
            <span className="contact__host-name">Shirley</span>
          </div>
        </div>

        <p className="section__body contact__note">
          All logistics — including RSVPs, dietary requirements, and seating —
          will be handled personally by Carmen &amp; Shirley.
        </p>

        <div className="contact__footer-ornament" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        <p className="contact__copyright">
          &copy; Shirley's Party {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Contact;
