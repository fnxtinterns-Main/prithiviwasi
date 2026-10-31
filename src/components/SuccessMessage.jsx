import React from 'react';
import ShareButtons from './common/ShareButtons';
import { PLEDGE_DATA } from '../data/pledgeData';
import { Mail, CheckCircle2 } from 'lucide-react';

/**
 * SuccessMessage Component
 * Displays the verified, meaningful pledge confirmation card
 * with personalized greetings, certificate details, email confirmation notice,
 * and the complete multi-platform social sharing suite.
 */
export default function SuccessMessage({ pledgeRecord, language = 'en', onReset }) {
  const data = (PLEDGE_DATA[language] || PLEDGE_DATA.en).success;

  if (!pledgeRecord) return null;

  const formattedDate = new Date(pledgeRecord.timestamp || Date.now()).toLocaleDateString(
    language === 'hi' ? 'hi-IN' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  return (
    <div className="pledge-success-wrapper" role="region" aria-live="polite">
      <div className="pledge-success-card">
        {/* Top Celebration Emblem */}
        <div className="success-badge-cluster">
          <div className="success-emblem-ring">
            <span className="success-leaf-icon" aria-hidden="true">🌱</span>
          </div>
          <span className="success-pill-badge">{data.badge}</span>
        </div>

        {/* Personalized Main Heading */}
        <h3 className="success-main-title">🌿 {data.title}</h3>
        <h4 className="success-greeting">{data.greeting(pledgeRecord.name)}</h4>

        <p className="success-lead-message">
          "{data.mainMessage}"
        </p>

        {/* Email Dispatched Confirmation Notice */}
        <div className="my-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-emerald-900">
          <Mail className="w-4 h-4 text-emerald-700" />
          <span>
            {language === 'hi'
              ? `प्रमाणपत्र की प्रति आपके ईमेल (${pledgeRecord.email}) पर भेज दी गई है!`
              : `A copy of your official pledge certificate was dispatched to ${pledgeRecord.email}!`}
          </span>
        </div>

        {/* Sacred Mission Tagline */}
        <div className="success-sacred-quote">
          <span className="sacred-quote-text">{data.tagline}</span>
        </div>

        {/* Certificate / Receipt Meta Block */}
        <div className="success-meta-grid">
          <div className="meta-item">
            <span className="meta-label">{data.certificateIdLabel}</span>
            <span className="meta-value certificate-code">
              PRITHVI-{pledgeRecord.id || '2026-EN-0801'}
            </span>
          </div>

          <div className="meta-item">
            <span className="meta-label">भूमिका / Role:</span>
            <span className="meta-value">{pledgeRecord.role}</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">{data.dateLabel}</span>
            <span className="meta-value">{formattedDate}</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">ईमेल / Email:</span>
            <span className="meta-value">{pledgeRecord.email}</span>
          </div>
        </div>

        {/* Comprehensive Multi-Platform Share Tools */}
        <ShareButtons pledgeRecord={pledgeRecord} />

        {/* One-Time Verified Pledge Badge */}
        <div className="mt-3 p-2.5 bg-emerald-100/80 border border-emerald-300 rounded-xl text-center text-xs font-bold text-emerald-950 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>
            {language === 'hi' 
              ? 'आधिकारिक पर्यावरण संरक्षण संकल्प सक्रिय (प्रत्येक नागरिक हेतु एक बार मान्य)' 
              : 'Verified Environmental Pledge Active (One pledge per citizen)'}
          </span>
        </div>

        <p className="success-storage-note">
          {language === 'hi'
            ? '✓ आपका संकल्प आपके इस ब्राउज़र में सुरक्षित रूप से दर्ज कर लिया गया है।'
            : '✓ Your pledge commitment is safely stored and recorded on this device.'}
        </p>
      </div>
    </div>
  );
}
