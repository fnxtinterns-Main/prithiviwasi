import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_HEADER_TEXT } from '../data/pledgeData';
import { useModal } from '../context/ModalContext';

/**
 * Header Component
 * Implements the hand-drawn layout with requested enhancements:
 * - Left Logo: Prithviwasi Official Logo
 * - Center: PRITHVIWASI title + Localized subtitle + Navigation
 * - Right Logo: AGENTS OF CHANGE ("Empowering the Future") Official Partner Logo
 * - Full bilingual sync with global website language
 * - Responsive mobile drawer with zero overflow
 */
export default function Header({
  activeSection = 'pledge'
}) {
  const { openRegModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Website header content is always English
  const headerText = SITE_HEADER_TEXT.en;

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (targetId === 'pledge') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#pledge');
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 95;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <header className={`home-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-outer-container">
        {/* Left Logo: Prithviwasi (Clickable to open Registration Modal) */}
        <div className="header-logo-col header-logo-left">
          <button
            type="button"
            onClick={() => openRegModal('prithiviwasi')}
            className="header-logo-link cursor-pointer bg-transparent border-0 p-0"
            title="Click to view Official Prithviwasi Trust Registration Record (19317/2344)"
          >
            <img
              src="/assets/logo.png"
              alt="पृथ्वीवासी संगठन लोगो / Prithviwasi Logo (Left)"
              className="header-brand-logo hover:scale-105 transition-transform"
            />
          </button>
        </div>


        {/* Center Title & Navigation Core */}
        <div className="header-center-core">
          <div className="header-brand-headline">
            <h1 className="header-main-title">{headerText.title}</h1>
            <span className="header-title-sub">{headerText.subtitle}</span>
          </div>

          {/* Desktop Navigation Row directly beneath title */}
          <nav className="header-desktop-nav" aria-label={headerText.menuLabel}>
            <ul className="nav-list">
              {headerText.nav.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="nav-item">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`nav-link-btn ${item.isPledge ? 'nav-pledge-accent' : ''} ${isActive ? 'active-nav' : ''}`}
                      id={`nav-${item.id}`}
                    >
                      {item.isPledge && <span className="nav-leaf-icon" aria-hidden="true">🌿</span>}
                      <span className="nav-link-text">{item.label}</span>
                      {isActive && <span className="active-nav-glow" aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right Logo: AGENTS OF CHANGE ("Empowering the Future") */}
        <div className="header-logo-col header-logo-right">
          <button
            type="button"
            onClick={() => openRegModal('agentsOfChange')}
            className="header-partner-logo-wrapper cursor-pointer bg-transparent border-0 p-0"
            title="Click to view Agents of Change Partner Details"
          >
            <img
              src="/assets/agents_of_change_logo.jpg"
              alt="Agents of Change - Empowering the Future (Right Logo)"
              className="header-brand-logo header-partner-logo hover:scale-105 transition-transform"
            />
          </button>

          {/* Mobile Hamburger Toggle */}

          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label={headerText.menuLabel}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-title">{headerText.menuLabel}</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={headerText.closeLabel}
            >
              ✕
            </button>
          </div>

          <ul className="mobile-drawer-list">
            {headerText.nav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`mobile-drawer-link ${item.isPledge ? 'mobile-pledge-highlight' : ''} ${isActive ? 'active' : ''}`}
                  >
                    <span className="mobile-item-title">
                      {item.isPledge && '🌿 '}
                      {item.label}
                    </span>
                    <span className="mobile-item-sub">{item.full}</span>
                  </a>
                </li>
              );
            })}
            <li className="mobile-drawer-return">
              <Link to="/" className="mobile-return-link" onClick={() => setMobileMenuOpen(false)}>
                {headerText.returnHero}
              </Link>
            </li>
          </ul>

          {/* Partner logos in mobile drawer footer */}
          <div className="mobile-drawer-logos-foot">
            <img src="/assets/logo.png" alt="Prithviwasi" className="foot-drawer-logo" />
            <span className="logos-foot-x">+</span>
            <img src="/assets/agents_of_change_logo.jpg" alt="Agents of Change" className="foot-drawer-logo foot-partner" />
          </div>
        </div>
      </div>
    </header>
  );
}
