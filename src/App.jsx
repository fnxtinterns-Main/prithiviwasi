import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import DonateButton from './components/common/DonateButton';
import RegistrationModal from './components/common/RegistrationModal';
import DonationModal from './components/common/DonationModal';
import PledgeAlertModal from './components/PledgeAlertModal';
import { sendPledgeEmail } from './services/emailService';

// Initial Entry: Cinematic Landing Page
import LandingPage from './components/LandingPage';

// Complete Requirement Pages (No "Home" page)
import Who from './pages/Who';
import What from './pages/What';
import Why from './pages/Why';
import How from './pages/How';
import Partners from './pages/Partners';
import Pledge from './pages/Pledge';

const PLEDGE_STORAGE_KEY = 'prithviwasi_pledge';
const PLEDGE_DISMISSED_KEY = 'prithviwasi_first_login_pledge_dismissed';
const PLEDGE_LANG_KEY = 'prithviwasi_pledge_lang';



export default function App() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </LanguageProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isLanding =
    location.pathname === '/' ||
    location.pathname === '/landing' ||
    location.pathname === '/welcome';

  // Pledge language state
  const [pledgeLanguage, setPledgeLanguage] = useState(() => {
    try {
      return localStorage.getItem(PLEDGE_LANG_KEY) || 'hi';
    } catch {
      return 'hi';
    }
  });

  // User pledge record
  const [pledgeRecord, setPledgeRecord] = useState(() => {
    try {
      const saved = localStorage.getItem(PLEDGE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // First-time entry popup state: Show once upon entering, and never again
  const [showFirstVisitPledgeModal, setShowFirstVisitPledgeModal] = useState(false);

  useEffect(() => {
    if (!isLanding) {
      try {
        const hasPledged = localStorage.getItem(PLEDGE_STORAGE_KEY);
        const dismissed = localStorage.getItem(PLEDGE_DISMISSED_KEY);
        if (!hasPledged && !dismissed) {
          // Trigger first-login popup with a subtle delay
          const timer = setTimeout(() => {
            setShowFirstVisitPledgeModal(true);
          }, 600);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [isLanding]);

  const handleDismissPledgeModal = useCallback(() => {
    setShowFirstVisitPledgeModal(false);
    try {
      localStorage.setItem(PLEDGE_DISMISSED_KEY, 'true');
    } catch (e) {}
  }, []);

  const handlePledgeSubmit = useCallback(async (record) => {
    try {
      localStorage.setItem(PLEDGE_STORAGE_KEY, JSON.stringify(record));
      localStorage.setItem(PLEDGE_DISMISSED_KEY, 'true');
    } catch (err) {
      console.error(err);
    }
    setPledgeRecord(record);

    // Dispatch official email certificate
    try {
      await sendPledgeEmail(record);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleResetPledge = useCallback(() => {
    try {
      localStorage.removeItem(PLEDGE_STORAGE_KEY);
    } catch {}
    setPledgeRecord(null);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8faf9] text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <ScrollToTop />

      {/* Show Navbar on ALL pages EXCEPT the full-screen cinematic landing poster */}
      {!isLanding && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* 1. CINEMATIC LANDING POSTER (Initial Entry with Gandhi Blur, Quotes & ENTER button) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/welcome" element={<LandingPage />} />

          {/* 2. CORE ARCHITECTURAL PAGES (No "Home" page) */}
          <Route path="/who" element={<Who />} />
          <Route path="/what" element={<What />} />
          <Route path="/why" element={<Why />} />
          <Route path="/how" element={<How />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/pledge" element={<Pledge />} />

          {/* Fallbacks directly to Who */}
          <Route path="/home" element={<Navigate to="/who" replace />} />
          <Route path="/portal" element={<Navigate to="/who" replace />} />
          <Route path="*" element={<Navigate to="/who" replace />} />
        </Routes>
      </main>

      {/* Show Footer and Floating Donate Button on all pages except the landing poster */}
      {!isLanding && <Footer />}
      {!isLanding && <DonateButton />}

      {/* Global Modals: Trust Registration Details & Donation */}
      <RegistrationModal />
      <DonationModal />

      {/* First-Time Login Pledge Popup (Shows once upon first entry, then never again) */}
      <PledgeAlertModal
        isOpen={showFirstVisitPledgeModal}
        onClose={handleDismissPledgeModal}
        language={pledgeLanguage}
        onLanguageChange={setPledgeLanguage}
        onSubmit={handlePledgeSubmit}
        pledgeRecord={pledgeRecord}
        onReset={handleResetPledge}
      />
    </div>
  );
}
