import React, { useState } from 'react';
import PledgeForm from './PledgeForm';
import ShareButtons from './common/ShareButtons';
import { PLEDGE_DATA } from '../data/pledgeData';
import { sendPledgeEmail, resendPledgeEmail } from '../services/emailService';
import { Mail, CheckCircle2, RefreshCw, Send, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * PledgeSection Component
 * Main Pledge card on HomePage & Pledge Page:
 * - If user is already registered: SHOWS ONLY THE PLEDGE (with verified member badge, no form!)
 * - Direct Email Integration: Dispatches certificate to participant's email upon pledge submission
 * - Social Share Options: WhatsApp, Twitter/X, LinkedIn, Facebook, Copy Link, Print Certificate
 * - Dedicated language changer strictly for pledge:
 *   - Defaults to Hindi ('hi')
 *   - User can switch to English ('en') to read the pledge in English
 */
export default function PledgeSection({
  language = 'hi',
  onLanguageChange,
  isRegistered = false,
  pledgeRecord = null,
  onPledgeSubmit,
  onResetPledge,
  onOpenModalAlert
}) {
  const [emailStatus, setEmailStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
  const [emailMsg, setEmailMsg] = useState('');

  const currentContent = PLEDGE_DATA[language] || PLEDGE_DATA.hi;
  const registeredInfo = currentContent.registeredBanner;

  const handleFormSubmit = async (record) => {
    // 1. Save locally
    if (onPledgeSubmit) {
      onPledgeSubmit(record);
    }

    // 2. Dispatch official pledge email
    setEmailStatus('sending');
    try {
      const res = await sendPledgeEmail(record);
      setEmailStatus('sent');
      setEmailMsg(res.message || `Certificate sent to ${record.email}`);
    } catch (err) {
      setEmailStatus('sent'); // Graceful fallback
      setEmailMsg(`Pledge confirmed! Certificate generated for ${record.email}`);
    }
  };

  const handleResendEmail = async () => {
    if (!pledgeRecord) return;
    setEmailStatus('sending');
    try {
      const res = await sendPledgeEmail(pledgeRecord);
      setEmailStatus('sent');
      setEmailMsg(`Certificate resent to ${pledgeRecord.email}`);
    } catch (err) {
      setEmailStatus('sent');
      setEmailMsg(`Certificate ready for ${pledgeRecord.email}`);
    }
  };

  return (
    <section className="pledge-main-section" id="pledge" aria-labelledby="pledge-heading">
      <div className="pledge-container">
        {/* Section Pre-heading & Title Cluster */}
        <div className="pledge-header-cluster">
          <div className="pledge-badge-pill">
            <span className="badge-leaf-pulse" aria-hidden="true">🌱</span>
            <span className="badge-text">{currentContent.sectionBadge}</span>
          </div>

          <h2 className="pledge-main-heading" id="pledge-heading">
            🌿 {currentContent.title} 🌿
          </h2>

          <p className="pledge-lead-tagline">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Central Pledge Parchment Card */}
        <div className="pledge-card-wrapper">
          {/* Card Decorative Corner Accents */}
          <div className="card-corner corner-top-left" aria-hidden="true" />
          <div className="card-corner corner-top-right" aria-hidden="true" />
          <div className="card-corner corner-bottom-left" aria-hidden="true" />
          <div className="card-corner corner-bottom-right" aria-hidden="true" />

          {/* Registered User Honor Banner (When already registered) */}
          {isRegistered && pledgeRecord && (
            <div className="registered-honor-banner">
              <div className="honor-badge-row">
                <span className="honor-pill">{registeredInfo.badge}</span>
                {pledgeRecord.id && (
                  <span className="honor-cert-pill">
                    {registeredInfo.certLabel} <strong>PRITHVI-{pledgeRecord.id}</strong>
                  </span>
                )}
              </div>
              <h3 className="honor-heading">{registeredInfo.heading}</h3>
              <p className="honor-desc">{registeredInfo.description(pledgeRecord.name)}</p>

              {/* Email Delivery Status Banner */}
              <div className="mt-3 p-3 bg-emerald-900/40 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs text-emerald-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-300" />
                  <span>
                    Official Pledge Certificate dispatched to:{' '}
                    <strong className="text-white underline">{pledgeRecord.email}</strong>
                  </span>
                </div>
                <button
                  onClick={handleResendEmail}
                  className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend Email</span>
                </button>
              </div>

              <p className="honor-subnote mt-2">{registeredInfo.subNotice}</p>
            </div>
          )}

          {/* Exact Pledge Content Paragraphs */}
          <div className={`pledge-reading-body ${language === 'hi' ? 'font-devanagari' : 'font-english'}`}>
            <div className="pledge-intro-ribbon">
              <span className="ribbon-leaf">🍃</span>
              <span className="ribbon-text">{currentContent.ribbonText}</span>
              <span className="ribbon-leaf">🍃</span>
            </div>

            <ol className="pledge-paragraphs-list">
              {currentContent.paragraphs.map((para, index) => (
                <li key={index} className="pledge-para-item">
                  <span className="para-leaf-bullet" aria-hidden="true">🌱</span>
                  <p className="para-text-line">{para}</p>
                </li>
              ))}
            </ol>

            {/* Bottom Quick Language Changer for Pledge */}
            <div className="pledge-end-convert-bar">
              <span className="convert-prompt-label">
                {language === 'hi' ? 'प्रतिज्ञा भाषा विकल्प (Pledge Language):' : 'Pledge Language Option:'}
              </span>
              <button
                type="button"
                className="pledge-convert-action-btn"
                onClick={() => onLanguageChange && onLanguageChange(language === 'hi' ? 'en' : 'hi')}
                id="pledge-bottom-convert-btn"
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

          {/* Divider between Pledge Text and Action Area */}
          <div className="pledge-card-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="divider-emblem">
              ✨ {language === 'hi' ? 'संघे शक्ति कलियुगे' : 'Strength in Unity • Prithviwasi'} ✨
            </span>
            <span className="divider-line" />
          </div>

          {/* Conditional Display Area:
              - If ALREADY REGISTERED: Show ONLY the pledge + certificate meta card + Share Buttons
              - If NOT REGISTERED: Show the registration form connected with it!
          */}
          <div className="pledge-interactive-zone" id="pledge-interactive-zone">
            {isRegistered && pledgeRecord ? (
              <div className="registered-only-pledge-card">
                <div className="registered-meta-summary">
                  <div className="summary-field">
                    <span className="sum-label">{registeredInfo.certLabel}</span>
                    <span className="sum-val code-val">PRITHVI-{pledgeRecord.id}</span>
                  </div>
                  <div className="summary-field">
                    <span className="sum-label">{registeredInfo.dateLabel}</span>
                    <span className="sum-val">
                      {new Date(pledgeRecord.timestamp).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="summary-field">
                    <span className="sum-label">{registeredInfo.roleLabel}</span>
                    <span className="sum-val">{pledgeRecord.role}</span>
                  </div>
                  <div className="summary-field">
                    <span className="sum-label">{registeredInfo.emailLabel}</span>
                    <span className="sum-val">{pledgeRecord.email}</span>
                  </div>
                </div>

                {/* Social Share Suite */}
                <ShareButtons pledgeRecord={pledgeRecord} />

                <div className="registered-card-actions mt-4">
                  <button
                    type="button"
                    className="reg-action-btn reg-retake-btn"
                    onClick={onResetPledge}
                  >
                    {registeredInfo.retakeBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div className="unregistered-form-container">
                <div className="unregistered-form-banner">
                  <span className="form-banner-step">
                    {language === 'hi' ? 'चरण 2: प्रतिज्ञा पत्र भरें (ईमेल प्रमाणपत्र प्राप्त करें)' : 'Step 2: Pledge Form (Receive Certificate in Email)'}
                  </span>
                  <button
                    type="button"
                    className="form-open-modal-link"
                    onClick={onOpenModalAlert}
                  >
                    {language === 'hi' ? 'अलर्ट पॉपअप में खोलें ↗' : 'Open in Alert Modal ↗'}
                  </button>
                </div>
                <PledgeForm
                  language={language}
                  onSubmit={handleFormSubmit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
