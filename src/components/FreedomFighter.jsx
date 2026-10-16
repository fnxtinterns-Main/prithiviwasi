import React, { useState, useEffect } from 'react';
import { FREEDOM_FIGHTERS, ROTATION_INTERVAL_MS } from '../data/freedomFighters';

/**
 * FreedomFighter component
 * Displays high-resolution, razor-sharp transparent artwork of freedom fighters.
 * Integrates an automatic 3-second cross-fade slider with preloading,
 * zero layout shift, and an integrated waving Indian flag backdrop.
 */
export default function FreedomFighter({ isMobile = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload all high-res fighter images immediately upon mount
  useEffect(() => {
    FREEDOM_FIGHTERS.forEach((f) => {
      const img = new Image();
      img.src = f.image;
    });
  }, []);

  // Automatic 3-second rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % FREEDOM_FIGHTERS.length);
        setIsTransitioning(false);
      }, 250);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const currentFighter = FREEDOM_FIGHTERS[currentIndex];

  if (isMobile) {
    return (
      <div className="mobile-slider-quote-cluster">
        {/* Waving Indian Flag Ambient Backdrop */}
        <div className="mobile-flag-bg" aria-hidden="true">
          <img
            src="/assets/india_flag_waving.svg"
            alt=""
            className="mobile-flag-svg"
            draggable="false"
          />
        </div>

        {/* Razor-Sharp Fighter Cutout */}
        <div className="mobile-fighter-img-wrap">
          <img
            src={currentFighter.image}
            alt={currentFighter.name_hi}
            className={`seamless-fighter-img mobile-fighter-img ${
              isTransitioning ? 'fade-out' : 'fade-in'
            }`}
            draggable="false"
            loading="eager"
            width={1024}
            height={1024}
          />
        </div>

        {/* Patriotic Hindi Heading */}
        <div className="mobile-heading-wrap">
          <h1 className="mobile-heading-hi">पृथ्वी का कर्ज कब चुकाओगे?</h1>
          <div className="mobile-tricolor-accent" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <aside
      className="fighters-desktop-anchor desktop-only-anchor"
      aria-label="राष्ट्रनायक वंदना"
    >
      <div className="seamless-fighter-stage">
        {/* Subtle Waving Indian Flag Backdrop on Desktop */}
        <div className="desktop-flag-bg" aria-hidden="true">
          <img
            src="/assets/india_flag_waving.svg"
            alt=""
            className="desktop-flag-svg"
            draggable="false"
          />
        </div>

        {/* Razor-Sharp Fighter Cutout */}
        <div className="seamless-image-wrap">
          <img
            src={currentFighter.image}
            alt={currentFighter.name_hi}
            className={`seamless-fighter-img ${
              isTransitioning ? 'fade-out' : 'fade-in'
            }`}
            id="desktopFighterImg"
            draggable="false"
            loading="eager"
            width={1024}
            height={1024}
          />
        </div>
      </div>
    </aside>
  );
}
