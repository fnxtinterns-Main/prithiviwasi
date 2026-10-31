import React from 'react';
import { motion } from 'framer-motion';
import BrandPill from './BrandPill';
import FreedomFighter from './FreedomFighter';
import EnterButton from './EnterButton';
import NatureCanvas from './NatureCanvas';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

/**
 * LandingPage component
 * Recreates the complete Prithviwasi cinematic landing page with:
 * - Desktop scenic poster scene (Gandhi, central emblem, quotes, nature)
 * - Initial 2-second blur-to-sharp focus animation on the background, Gandhi, and emblem
 * - Right-side high-resolution sharp freedom fighter rotation
 * - Dedicated responsive mobile stage (zero horizontal overflow)
 * - Interactive floating nature leaves & spores canvas
 * - Language Switcher (English / Hindi)
 * - Genuinely functional, accessible React ENTER button linking to the main portal
 */
export default function LandingPage() {
  const { isHindi, toggleLanguage } = useLanguage();

  return (
    <div className="landing-master-wrapper">
      {/* Top-Right Language Switcher on Landing Page */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-gray-900 text-xs font-bold shadow-lg border border-white/50 backdrop-blur-md transition-all cursor-pointer"
          title={isHindi ? 'Switch site language to English' : 'वेबसाइट को हिंदी में देखें'}
        >
          <Globe className="w-3.5 h-3.5 text-[#0b5e34]" />
          <span className="font-sans">{isHindi ? 'English' : 'हिंदी'}</span>
        </button>
      </div>

      {/* ======================================================================
          A. DESKTOP VIEWPORT PRESENTATION (WIDESCREEN & LAPTOPS >= 769px)
          ====================================================================== */}
      <div
        className="desktop-hero-scene"
        aria-hidden="true"
      />

      {/* Top-Left Crisp Vector Brand Pill for Desktop */}
      <BrandPill className="desktop-only-pill" />

      {/* Floating Nature Leaves & Spores Canvas Layer */}
      <NatureCanvas />

      {/* Desktop Seamless Freedom Fighters Showcase */}
      <FreedomFighter isMobile={false} />

      {/* ======================================================================
          B. MOBILE VIEWPORT PRESENTATION (SCREENS <= 768px)
          ====================================================================== */}
      <div className="mobile-hero-scene" aria-hidden="true">
        {/* Background Scenic Backdrop with Blur-to-Focus Animation */}
        <motion.div
          className="mobile-scenic-backdrop"
          initial={{ filter: 'blur(20px)', opacity: 0.8 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Top-Left Pill for Mobile */}
        <BrandPill className="mobile-pill" />

        {/* Top-Right Freedom Fighter Slider & Quote Cluster */}
        <FreedomFighter isMobile={true} />

        {/* Central Emblem & Sacred Taglines with Blur Animation */}
        <motion.div
          className="mobile-center-emblem-block"
          initial={{ filter: 'blur(16px)', opacity: 0.7 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <img
            src="/assets/logo.png"
            alt="पृथ्वीवासी सेवा और सुधार संगठन"
            className="mobile-emblem-img"
            draggable="false"
          />
          <h2 className="mobile-tagline-hi">संघे शक्ति कलियुगे</h2>
          <p className="mobile-pillars-hi">सेवा • सहयोग • संस्कार • सुधार • समर्पण</p>
        </motion.div>

        {/* Gandhi Ji Silhouette on Lower Left with Blur Animation */}
        <motion.div
          className="mobile-gandhi-cluster"
          initial={{ filter: 'blur(20px)', opacity: 0.6 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <img
            src="/assets/gandhi_cutout.png"
            alt="महात्मा गांधी"
            className="mobile-gandhi-img"
            draggable="false"
          />
        </motion.div>
      </div>

      {/* ======================================================================
          C. UNIFIED FUNCTIONAL GREEN ENTER BUTTON DOCK (DESKTOP & MOBILE)
          ====================================================================== */}
      <footer className="bottom-dock-container">
        <div className="bottom-action-dock">
          <EnterButton to="/who" />
        </div>
      </footer>
    </div>
  );
}
