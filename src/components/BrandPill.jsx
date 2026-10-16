import React from 'react';

/**
 * BrandPill component
 * Displays the top brand pill badge with status indicator,
 * Hindi organization title, and English brand slug.
 */
export default function BrandPill({ className = '' }) {
  return (
    <div className={`top-brand-pill ${className}`}>
      <span className="live-status-dot" aria-hidden="true" />
      <span className="brand-name-hi">पृथ्वीवासी सेवा और सुधार संगठन</span>
      <span className="brand-sep" aria-hidden="true">•</span>
      <span className="brand-slug-en">prithviwasi</span>
    </div>
  );
}
