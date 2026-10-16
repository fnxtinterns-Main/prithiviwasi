import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import PledgeSection from './PledgeSection';
import MovementSections from './MovementSections';
import Footer from './Footer';
import PledgeAlertModal from './PledgeAlertModal';

const LOCAL_STORAGE_KEY = 'prithviwasi_pledge';
const PLEDGE_LANG_STORAGE_KEY = 'prithviwasi_pledge_lang';

/**
 * HomePage Component
 * Master Home Page orchestrating:
 * - First-time visitor Pledge Alert Modal (shown automatically if not registered)
 * - Already registered view (shows ONLY the pledge without the form)
 * - Entire website is strictly in English (Header, Movement Pillars, Footer)
 * - Pledge language changer for pledge only (defaults to Hindi, option to read in English)
 * - Header with Left Logo (Prithviwasi) & Right Logo (Agents of Change - Empowering the Future)
 * - Background watermark and navigation scroll spy
 */
export default function HomePage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('pledge');

  // Dedicated pledge language state (defaults to Hindi 'hi', user can toggle to English 'en')
  const [pledgeLanguage, setPledgeLanguage] = useState(() => {
    try {
      return localStorage.getItem(PLEDGE_LANG_STORAGE_KEY) || 'hi';
    } catch {
      return 'hi';
    }
  });

  // Registration state from localStorage
  const [pledgeRecord, setPledgeRecord] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isRegistered = Boolean(pledgeRecord && pledgeRecord.accepted);

  // Alert modal open state: Automatically open for first-time visitors who are not registered
  const [showModalAlert, setShowModalAlert] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return !saved; // Open if never registered
    } catch {
      return true;
    }
  });

  // Language changer strictly for pledge (Pledge section and Pledge modal ONLY)
  const handlePledgeLanguageChange = useCallback((newLang) => {
    setPledgeLanguage(newLang);
    try {
      localStorage.setItem(PLEDGE_LANG_STORAGE_KEY, newLang);
    } catch (err) {
      console.error('Error saving pledge language', err);
    }
  }, []);

  // Handle pledge submission (from modal or page)
  const handlePledgeSubmit = useCallback((record) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(record));
    } catch (err) {
      console.error('Error saving pledge', err);
    }
    setPledgeRecord(record);
  }, []);

  // Handle resetting / retaking pledge
  const handleResetPledge = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {}
    setPledgeRecord(null);
  }, []);

  // Automatic smooth scroll to #pledge or any hash fragment
  useEffect(() => {
    const targetHash = location.hash || window.location.hash;
    const targetId = targetHash ? targetHash.replace('#', '') : 'pledge';

    const timer = setTimeout(() => {
      if (targetId === 'pledge') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setActiveSection('pledge');
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 95;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setActiveSection(targetId);
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [location.hash]);

  // Scroll spy to update active section in header navigation
  useEffect(() => {
    const sectionIds = ['who', 'what', 'why', 'how', 'pledge'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-master-container">
      {/* Background Watermark Logo */}
      <div className="home-background-watermark" aria-hidden="true">
        <img
          src="/assets/logo.png"
          alt=""
          className="watermark-logo-image"
          draggable="false"
        />
      </div>

      {/* Subtle Environmental Texture Overlay */}
      <div className="home-environmental-grain" aria-hidden="true" />

      {/* Main Header with Dual Logos (English Navigation) */}
      <Header activeSection={activeSection} />

      {/* Main Content Flow */}
      <main className="home-main-content">
        {/* Central Pledge Section:
            - Independent Pledge Language (defaults to Hindi 'hi')
            - Changing pledge language changes ONLY the pledge, leaving website in English!
            - If already registered: Shows ONLY the pledge + honor status card
            - If not registered: Shows pledge + form connected with it
        */}
        <PledgeSection
          language={pledgeLanguage}
          onLanguageChange={handlePledgeLanguageChange}
          isRegistered={isRegistered}
          pledgeRecord={pledgeRecord}
          onPledgeSubmit={handlePledgeSubmit}
          onResetPledge={handleResetPledge}
          onOpenModalAlert={() => setShowModalAlert(true)}
        />

        {/* Movement Informational Pillars (Always in English) */}
        <MovementSections language="en" />
      </main>

      {/* Site Footer (Always in English) */}
      <Footer language="en" />

      {/* First-Time Visitor Alert Modal (Independent Pledge Language, defaults to Hindi 'hi') */}
      <PledgeAlertModal
        isOpen={showModalAlert}
        onClose={() => setShowModalAlert(false)}
        language={pledgeLanguage}
        onLanguageChange={handlePledgeLanguageChange}
        onSubmit={handlePledgeSubmit}
        pledgeRecord={pledgeRecord}
        onReset={handleResetPledge}
      />
    </div>
  );
}
