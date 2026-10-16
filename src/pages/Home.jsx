import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PledgeSection from '../components/PledgeSection';
import PledgeAlertModal from '../components/PledgeAlertModal';
import QuickLinks from '../components/home/QuickLinks';
import { useModal } from '../context/ModalContext';
import { ShieldCheck, Heart, Sparkles, ArrowRight, TreePine, Users, Award, BookOpen, Compass } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'prithviwasi_pledge';
const PLEDGE_LANG_STORAGE_KEY = 'prithviwasi_pledge_lang';

export default function Home() {
  const { openRegModal, openDonateModal } = useModal();

  const [pledgeLanguage, setPledgeLanguage] = useState(() => {
    try {
      return localStorage.getItem(PLEDGE_LANG_STORAGE_KEY) || 'hi';
    } catch {
      return 'hi';
    }
  });

  const [pledgeRecord, setPledgeRecord] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isRegistered = Boolean(pledgeRecord && pledgeRecord.accepted);
  const [showModalAlert, setShowModalAlert] = useState(false);

  const handlePledgeLanguageChange = useCallback((newLang) => {
    setPledgeLanguage(newLang);
    try {
      localStorage.setItem(PLEDGE_LANG_STORAGE_KEY, newLang);
    } catch (err) {
      console.error('Error saving pledge language', err);
    }
  }, []);

  const handlePledgeSubmit = useCallback((record) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(record));
    } catch (err) {
      console.error('Error saving pledge', err);
    }
    setPledgeRecord(record);
  }, []);

  const handleResetPledge = useCallback(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {}
    setPledgeRecord(null);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Welcome Portal Hero Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-green-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>संघे शक्ति कलियुगे • सेवा ही संकल्प, सुधार ही हमारा लक्ष्य</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            PRITHVIWASI <span className="text-emerald-400">SEVA & SUDHAR</span>
          </h1>

          <p className="text-lg sm:text-2xl text-emerald-200 font-serif font-medium">
            मानव कल्याण (Human Development) Since 2006 • Registered Charitable Trust
          </p>

          <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
            Welcome to the official portal of Prithiviwasi Seva aur Sudhar Sangathan (Trust Reg. No. 19317/2344, Ranchi).
            In strategic alliance with <strong>Agents of Change</strong>, we mobilize youth, restore forest ecosystems, and uplift rural communities.
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pledge"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
            >
              <TreePine className="w-4 h-4" />
              <span>Take the Environmental Pledge</span>
            </a>

            <Link
              to="/who"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-emerald-400/40 text-white font-bold text-sm rounded-xl backdrop-blur-md shadow-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Who We Are</span>
            </Link>

            <button
              onClick={() => openRegModal('prithiviwasi')}
              className="px-5 py-3 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-600/60 text-emerald-200 font-bold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Trust Registry (#19317/2344)</span>
            </button>
          </div>

          {/* Key Impact Numbers */}
          <div className="pt-8 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">2006</div>
              <div className="text-xs text-emerald-200 mt-0.5">Foundational Year</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">50,000+</div>
              <div className="text-xs text-emerald-200 mt-0.5">Trees Planted</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">120+</div>
              <div className="text-xs text-emerald-200 mt-0.5">Villages Supported</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-emerald-200 mt-0.5">Dedicated Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Central Pledge Section (With Direct Email Dispatch & Social Sharing!) */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto" id="pledge">
        <PledgeSection
          language={pledgeLanguage}
          onLanguageChange={handlePledgeLanguageChange}
          isRegistered={isRegistered}
          pledgeRecord={pledgeRecord}
          onPledgeSubmit={handlePledgeSubmit}
          onResetPledge={handleResetPledge}
          onOpenModalAlert={() => setShowModalAlert(true)}
        />
      </div>

      {/* 3. Program & Initiative Highlights */}
      <QuickLinks />

      {/* 4. First-Time Visitor Alert Modal */}
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
