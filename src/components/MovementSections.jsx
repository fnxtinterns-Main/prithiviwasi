import React from 'react';
import { MOVEMENT_SECTIONS } from '../data/pledgeData';

/**
 * MovementSections Component
 * Fully bilingual informational sections corresponding to navigation anchors #who, #what, #why, #how.
 */
export default function MovementSections({ language = 'en' }) {
  return (
    <div className="movement-sections-container">
      {MOVEMENT_SECTIONS.map((sec, idx) => {
        const content = sec[language] || sec.en || sec.hi;
        return (
          <section
            key={sec.id}
            id={sec.id}
            className={`movement-section-block block-${sec.id} ${idx % 2 === 1 ? 'block-alternate' : ''}`}
            aria-labelledby={`heading-${sec.id}`}
          >
            <div className="movement-section-inner">
              <div className="movement-text-col">
                <div className="section-pill-tag">
                  <span className="pill-dot" aria-hidden="true" />
                  <span className="pill-tag-label">{content.tag}</span>
                </div>

                <h3 className="section-main-heading" id={`heading-${sec.id}`}>
                  <span className="section-icon-inline" aria-hidden="true">{sec.icon}</span>
                  <span>{content.title}</span>
                </h3>

                <p className="section-lead-desc">{content.desc}</p>

                <ul className="section-points-list">
                  {content.points.map((pt, pIdx) => (
                    <li key={pIdx} className="point-item">
                      <span className="point-check" aria-hidden="true">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="section-bottom-action">
                  <a href="#pledge" className="section-pledge-jump-btn">
                    <span>{content.jumpBtn}</span>
                  </a>
                </div>
              </div>

              <div className="movement-visual-col">
                <div className="movement-stat-card">
                  <div className="stat-card-glow" aria-hidden="true" />
                  <div className="stat-icon-large" aria-hidden="true">{sec.icon}</div>
                  <div className="stat-number-callout">{content.stat}</div>
                  <div className="stat-label-sub">{content.statLabel}</div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
