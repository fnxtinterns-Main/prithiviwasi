import React, { useEffect } from 'react';
import PledgeForm from './PledgeForm';
import SuccessMessage from './SuccessMessage';
import { PLEDGE_DATA } from '../data/pledgeData';

/**
 * PledgeAlertModal Component
 * Automatically displays for first-time visitors who have not registered yet.
 * Contains:
 * - Welcoming environmental alert header
 * - Language changer strictly for pledge (defaults to Hindi, option to read in English)
 * - Exact 10-line pledge reading
 * - The pledge commitment form connected directly with it
 * - Verified success state upon submission
 * - Dismiss/close capability so user can explore site freely
 */
export default function PledgeAlertModal({
  isOpen,
  onClose,
  language = 'hi',
  onLanguageChange,
  onSubmit,
  pledgeRecord,
  onReset
}) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentContent = PLEDGE_DATA[language] || PLEDGE_DATA.hi;
  const modalInfo = currentContent.modalAlert;

  return (
    <div
      className="pledge-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-pledge-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pledge-modal-dialog">
        {/* Modal Alert Header Bar */}
        <div className="modal-alert-header">
          <div className="modal-badge-row">
            <span className="modal-alert-pill">
              <span className="pill-bell-icon">🔔</span>
              <span>{modalInfo.badge}</span>
            </span>

            <button
              type="button"
              className="modal-dismiss-btn"
              onClick={onClose}
              aria-label={language === 'hi' ? 'अलर्ट बंद करें' : 'Dismiss alert'}
              title={language === 'hi' ? 'वेबसाइट ब्राउज़ करें' : 'Browse website'}
            >
              ✕
            </button>
          </div>

          <h2 className="modal-alert-title" id="modal-pledge-title">
            🌿 {currentContent.title} 🌿
          </h2>

          <p className="modal-alert-intro">{modalInfo.intro}</p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-scroll-body">
          {/* Pledge Reading Card */}
          <div className="modal-pledge-reading-card">
            <div className="modal-ribbon-tag">
              <span>🍃</span>
              <span>{currentContent.ribbonText}</span>
              <span>🍃</span>
            </div>

            <ol className={`modal-paragraphs-list ${language === 'hi' ? 'font-devanagari' : 'font-english'}`}>
              {currentContent.paragraphs.map((para, index) => (
                <li key={index} className="modal-para-item">
                  <span className="modal-leaf-bullet" aria-hidden="true">🌱</span>
                  <p className="modal-para-text">{para}</p>
                </li>
              ))}
            </ol>

            {/* Bottom Quick Language Changer for Pledge Modal */}
            <div className="pledge-end-convert-bar">
              <span className="convert-prompt-label">
                {language === 'hi' ? 'प्रतिज्ञा भाषा विकल्प (Pledge Language):' : 'Pledge Language Option:'}
              </span>
              <button
                type="button"
                className="pledge-convert-action-btn"
                onClick={() => onLanguageChange && onLanguageChange(language === 'hi' ? 'en' : 'hi')}
                id="modal-convert-pledge-btn"
              >
                {language === 'hi'
                  ? '🌐 Read Pledge in English / अंग्रेज़ी में पढ़ें'
                  : '🇮🇳 Read Pledge in Hindi / हिंदी में पढ़ें'}
              </button>
              <span className="convert-hint-sub">
                {language === 'hi'
                  ? '(केवल प्रतिज्ञा की भाषा अंग्रेज़ी में बदलेगी)'
                  : '(Changes language for the pledge only)'}
              </span>
            </div>
          </div>

          {/* Connected Action Area: Form OR Success Card */}
          <div className="modal-form-section">
            {pledgeRecord ? (
              <div className="modal-success-container">
                <SuccessMessage
                  pledgeRecord={pledgeRecord}
                  language={language}
                  onReset={onReset}
                />
                <div className="modal-continue-wrap">
                  <button
                    type="button"
                    className="modal-enter-site-btn"
                    onClick={onClose}
                  >
                    {language === 'hi' ? 'वेबसाइट पर जाएं →' : 'Continue to Website →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-form-wrapper">
                <div className="modal-step-lead">
                  <span className="step-num">2</span>
                  <span className="step-text">{modalInfo.acceptStep}</span>
                </div>
                <PledgeForm
                  language={language}
                  onSubmit={onSubmit}
                />
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer Strip */}
        <div className="modal-dialog-footer">
          <span className="modal-foot-brand">
            🌿 Prithviwasi Movement × Agents of Change
          </span>
          <button
            type="button"
            className="modal-explore-site-link"
            onClick={onClose}
          >
            {modalInfo.exploreBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
