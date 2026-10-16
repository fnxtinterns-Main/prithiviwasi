import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_FOOTER_TEXT } from '../data/pledgeData';

/**
 * Footer Component for Home Page
 * Dignified, environmental footer with Prithviwasi identity,
 * partner logo ("Agents of Change"), bilingual text, and navigation links.
 */
export default function Footer({ language = 'en' }) {
  const content = SITE_FOOTER_TEXT[language] || SITE_FOOTER_TEXT.en || SITE_FOOTER_TEXT.hi;

  return (
    <footer className="home-site-footer">
      <div className="footer-top-accent-line" aria-hidden="true" />
      <div className="footer-container">
        <div className="footer-branding-block">
          <div className="footer-brand-header">
            {/* Dual Logos in Footer */}
            <div className="footer-logos-duo">
              <img
                src="/assets/logo.png"
                alt="पृथ्वीवासी सेवा और सुधार संगठन"
                className="footer-logo-img"
              />
              <span className="footer-logo-divider">×</span>
              <img
                src="/assets/agents_of_change_logo.jpg"
                alt="Agents of Change - Empowering the Future"
                className="footer-logo-img footer-partner-img"
              />
            </div>

            <div className="footer-brand-text">
              <span className="footer-title-hi">{content.brandTitleHi}</span>
              <span className="footer-title-en">{content.brandTitleEn}</span>
              <span className="footer-collab-tag">{content.collabNotice}</span>
            </div>
          </div>
          <p className="footer-mission-lead">{content.missionLead}</p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">{content.linksTitle}</h4>
            <ul className="footer-links-list">
              {content.links.map((lnk) => (
                <li key={lnk.id}>
                  <a
                    href={`#${lnk.id}`}
                    className={lnk.id === 'pledge' ? 'footer-pledge-highlight' : ''}
                  >
                    {lnk.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{content.pillarsTitle}</h4>
            <ul className="footer-pillars-list">
              {content.pillars.map((pill, idx) => (
                <li key={idx}>{pill}</li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{content.actionTitle}</h4>
            <div className="footer-portal-buttons">
              <Link to="/" className="footer-hero-return-btn">
                <span>{content.returnBtn}</span>
              </Link>
              <a href="#pledge" className="footer-pledge-action-btn">
                <span>{content.pledgeBtn}</span>
              </a>
            </div>
            <p className="footer-quote-small">{content.quote}</p>
          </div>
        </div>

        <div className="footer-bottom-strip">
          <p className="footer-copyright">{content.copyright}</p>
          <p className="footer-motto-tag">{content.cleanIndia}</p>
        </div>
      </div>
    </footer>
  );
}
