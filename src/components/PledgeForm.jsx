import React, { useState } from 'react';
import { PLEDGE_DATA } from '../data/pledgeData';

/**
 * PledgeForm Component
 * Renders the clean responsive inputs for Name, Email, Role,
 * the required acceptance checkbox, and the conditional submit button.
 */
export default function PledgeForm({ language = 'en', onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    accepted: false
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    role: false,
    accepted: false
  });

  const [submittedAttempt, setSubmittedAttempt] = useState(false);

  const t = PLEDGE_DATA[language].form;
  const roles = PLEDGE_DATA[language].roles;

  // Real-time validation checks
  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isRoleValid = Boolean(formData.role);
  const isAcceptedChecked = Boolean(formData.accepted);

  const isFormValid = isNameValid && isEmailValid && isRoleValid && isAcceptedChecked;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedAttempt(true);

    if (isFormValid) {
      const generatedId = `${Date.now().toString().slice(-6)}`;
      onSubmit({
        ...formData,
        id: generatedId,
        language,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <form className="pledge-form-container" onSubmit={handleSubmit} noValidate>
      <div className="form-header-strip">
        <h3 className="form-heading">{t.title}</h3>
        <p className="form-subheading">{t.subtitle}</p>
      </div>

      {/* Responsive Input Fields Row (Desktop: 3 columns, Mobile: stacked) */}
      <div className="form-fields-grid">
        {/* Name Field */}
        <div className={`form-field-group ${touched.name && !isNameValid ? 'has-error' : ''}`}>
          <label htmlFor="pledge-name" className="field-label">
            {t.nameLabel} <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <span className="input-icon" aria-hidden="true">👤</span>
            <input
              type="text"
              id="pledge-name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder={t.namePlaceholder}
              className="form-text-input"
              required
              aria-required="true"
              aria-invalid={touched.name && !isNameValid}
            />
          </div>
          {touched.name && !isNameValid && (
            <span className="field-error-msg" role="alert">
              {t.validationName}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className={`form-field-group ${touched.email && !isEmailValid ? 'has-error' : ''}`}>
          <label htmlFor="pledge-email" className="field-label">
            {t.emailLabel} <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <span className="input-icon" aria-hidden="true">✉️</span>
            <input
              type="email"
              id="pledge-email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder={t.emailPlaceholder}
              className="form-text-input"
              required
              aria-required="true"
              aria-invalid={touched.email && !isEmailValid}
            />
          </div>
          {touched.email && !isEmailValid && (
            <span className="field-error-msg" role="alert">
              {t.validationEmail}
            </span>
          )}
        </div>

        {/* Role Select Field */}
        <div className={`form-field-group ${touched.role && !isRoleValid ? 'has-error' : ''}`}>
          <label htmlFor="pledge-role" className="field-label">
            {t.roleLabel} <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <span className="input-icon" aria-hidden="true">🏷️</span>
            <select
              id="pledge-role"
              name="role"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              onBlur={() => handleBlur('role')}
              className="form-select-input"
              required
              aria-required="true"
              aria-invalid={touched.role && !isRoleValid}
            >
              <option value="" disabled>
                {t.rolePlaceholder}
              </option>
              {roles.map((r) => (
                <option key={r.id} value={r.label}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          {touched.role && !isRoleValid && (
            <span className="field-error-msg" role="alert">
              {t.validationRole}
            </span>
          )}
        </div>
      </div>

      {/* Required Commitment Checkbox */}
      <div className={`form-checkbox-row ${submittedAttempt && !isAcceptedChecked ? 'has-error' : ''}`}>
        <label className="checkbox-custom-label" htmlFor="pledge-accept-checkbox">
          <input
            type="checkbox"
            id="pledge-accept-checkbox"
            name="accepted"
            checked={formData.accepted}
            onChange={(e) => handleChange('accepted', e.target.checked)}
            className="hidden-native-checkbox"
            required
            aria-required="true"
          />
          <span className="custom-check-box" aria-hidden="true">
            {formData.accepted && <span className="check-mark">✓</span>}
          </span>
          <span className="checkbox-text-content">
            {t.checkboxLabel}
          </span>
        </label>
        {submittedAttempt && !isAcceptedChecked && (
          <span className="field-error-msg checkbox-error" role="alert">
            {t.validationCheckbox}
          </span>
        )}
      </div>

      {/* Acceptance Submit Button */}
      <div className="form-submit-block">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`pledge-accept-button ${isFormValid ? 'btn-enabled' : 'btn-disabled'}`}
          id="accept-pledge-submit-btn"
          aria-label={t.submitBtn}
        >
          <span className="btn-leaf-icon" aria-hidden="true">🌿</span>
          <span className="btn-label-text">{t.submitBtn}</span>
          <span className="btn-arrow-right" aria-hidden="true">→</span>
        </button>

        {!isFormValid && (
          <p className="btn-hint-text">
            {t.submitBtnDisabled}
          </p>
        )}
      </div>
    </form>
  );
}
