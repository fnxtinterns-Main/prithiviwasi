import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, Heart, Shield, Sparkles, ArrowLeft, Globe } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openRegModal, openDonateModal } = useModal();
  const { language, isHindi, toggleLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Clean navigation links dynamically adapting to English / Hindi
  const navLinks = [
    {
      to: '/who',
      label: isHindi ? 'हमारा परिचय' : 'Who We Are',
      sub: isHindi ? 'Who We Are' : 'हम कौन हैं',
    },
    {
      to: '/what',
      label: isHindi ? 'कार्य क्षेत्र' : 'What We Do',
      sub: isHindi ? 'What We Do' : 'कार्य क्षेत्र',
    },
    {
      to: '/why',
      label: isHindi ? 'उद्देश्य' : 'Why It Matters',
      sub: isHindi ? 'Why It Matters' : 'उद्देश्य',
    },
    {
      to: '/how',
      label: isHindi ? 'सहयोग मार्ग' : 'How We Execute',
      sub: isHindi ? 'How We Execute' : 'सहयोग मार्ग',
    },
    {
      to: '/partners',
      label: isHindi ? 'सहयोगी' : 'Partners',
      sub: isHindi ? 'Partners' : 'सहयोगी',
    },
    {
      to: '/pledge',
      label: isHindi ? 'संकल्प' : 'Pledge',
      sub: isHindi ? 'Pledge' : 'संकल्प',
      isPledge: true,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100'
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-gray-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Left Brand: Prithiviwasi Clickable Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openRegModal('prithiviwasi')}
              className="group flex items-center gap-3 p-1.5 rounded-2xl hover:bg-emerald-50/70 transition-all cursor-pointer text-left"
              title="Click to view official Prithiviwasi Trust Registration Record (19317/2344)"
            >
              <div className="relative">
                <img
                  src="/assets/logo.png"
                  alt="Prithiviwasi Logo"
                  className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-full bg-white p-0.5 shadow-xs group-hover:scale-105 transition-transform"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-[#0b5e34] rounded-full text-white shadow-xs"
                  title="Verified Charitable Trust"
                >
                  <Shield className="w-3 h-3" />
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b5e34] block leading-none font-serif">
                  PRITHVIWASI
                </span>
                <span className="text-[11px] font-bold text-[#ea580c] tracking-wider block mt-0.5">
                  {isHindi ? 'सेवा और सुधार संगठन • स्थापना २००६' : 'Seva aur Sudhar Sangathan • Estd 2006'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.isPledge) {
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `relative px-3 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#ea580c] text-white shadow-xs'
                          : 'text-[#ea580c] hover:bg-orange-50'
                      }`
                    }
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0b5e34] text-white shadow-xs'
                        : 'text-gray-700 hover:text-[#0b5e34] hover:bg-emerald-50/60'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Cluster: Partner + Language Switcher + Donate CTA + Mobile Hamburger + Rightmost Return Arrow */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Clickable Alliance Partner Logo (Enlarged & Roomy) */}
            <button
              onClick={() => openRegModal('agentsOfChange')}
              className="group hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl border border-emerald-200/90 bg-white hover:border-emerald-400 hover:bg-emerald-50/70 shadow-xs hover:shadow-sm transition-all cursor-pointer"
              title={isHindi ? "आधिकारिक सहयोगी संस्था विवरण देखें" : "Click to view Agents of Change Partner Details"}
            >
              <img
                src="/assets/agents_of_change_logo.jpg"
                alt="Agents of Change"
                className="w-10 h-10 object-cover rounded-xl border border-gray-100 group-hover:scale-105 transition-transform shadow-2xs shrink-0"
              />
              <div className="text-left leading-tight">
                <span className="block text-sm font-black text-gray-900 group-hover:text-[#0b5e34] tracking-tight">
                  Agents of Change
                </span>
                <span className="block text-xs text-emerald-700 font-bold">
                  {isHindi ? 'आधिकारिक सहयोगी' : 'Official Alliance Partner'}
                </span>
              </div>
            </button>

            {/* 
              LANGUAGE SWITCHER BUTTON
              Switches the entire site between English and Hindi
            */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-2xs bg-white text-gray-800 border-gray-300 hover:border-[#0b5e34] hover:bg-emerald-50/70 shrink-0"
              title={isHindi ? 'Switch site language to English' : 'वेबसाइट को हिंदी में देखें (Switch to Hindi)'}
            >
              <Globe className="w-3.5 h-3.5 text-[#0b5e34]" />
              <span className="font-sans font-bold">{isHindi ? 'English' : 'हिंदी'}</span>
            </button>

            {/* Authentic NGO Green Donate CTA Button */}
            <button
              onClick={openDonateModal}
              className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 bg-[#0b5e34] hover:bg-[#073d22] active:bg-[#052b18] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
            >
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
              <span>{isHindi ? 'सहयोग / दान' : 'Donate'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-gray-700 hover:text-[#0b5e34] hover:bg-gray-100 rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Return to Cinematic Landing Scene (Arrow-only, Right-most Corner) */}
            <Link
              to="/"
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-[#0b5e34] bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 rounded-xl border border-emerald-200/90 hover:border-emerald-300 transition-all shadow-2xs hover:scale-105 active:scale-95 shrink-0 ml-0.5"
              title={isHindi ? 'मुख्य लैंडिंग दृश्य पर वापस जाएं' : 'Return to Landing Scene'}
              aria-label="Return to Landing Scene"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#0b5e34]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 px-5 pt-4 pb-8 space-y-2.5 shadow-xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-2 pb-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50/70 text-[#0b5e34] font-bold text-xs border border-emerald-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isHindi ? 'लैंडिंग दृश्य' : 'Landing Page'}</span>
            </Link>

            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 font-bold text-xs shadow-2xs"
            >
              <Globe className="w-4 h-4 text-[#0b5e34]" />
              <span>{isHindi ? 'English' : 'हिंदी'}</span>
            </button>
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                  isActive
                    ? 'bg-[#0b5e34] text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span>{link.label}</span>
              <span className={`text-xs ${link.to === location.pathname ? 'text-emerald-100' : 'text-gray-400'}`}>
                {link.sub}
              </span>
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
