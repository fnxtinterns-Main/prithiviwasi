import React from 'react';

/**
 * LanguageToggle Component
 * Allows instant, smooth switching between Hindi and English
 * without reloading the page.
 */
export default function LanguageToggle({ language, onLanguageChange }) {
  return (
    <div className="language-toggle-wrapper" role="radiogroup" aria-label="भाषा चुनें / Select Language">
      <div className="language-toggle-track">
        <button
          type="button"
          role="radio"
          aria-checked={language === 'hi'}
          className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
          onClick={() => onLanguageChange('hi')}
          id="lang-toggle-hi"
        >
          <span className="lang-icon">🇮🇳</span>
          <span className="lang-label">हिंदी</span>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={language === 'en'}
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => onLanguageChange('en')}
          id="lang-toggle-en"
        >
          <span className="lang-icon">🌐</span>
          <span className="lang-label">English</span>
        </button>

        {/* Sliding active pill indicator */}
        <span
          className={`lang-slider-pill ${language === 'en' ? 'slide-right' : 'slide-left'}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
