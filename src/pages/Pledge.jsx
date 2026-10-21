import React, { useState, useEffect, useCallback } from 'react';
import PledgeSection from '../components/PledgeSection';
import PledgeAlertModal from '../components/PledgeAlertModal';
import { useLanguage } from '../context/LanguageContext';

const LOCAL_STORAGE_KEY = 'prithviwasi_pledge';
const PLEDGE_LANG_STORAGE_KEY = 'prithviwasi_pledge_lang';

export default function Pledge() {
  const { isHindi } = useLanguage();

  const [pledgeLanguage, setPledgeLanguage] = useState(() => {
    try {
      return localStorage.getItem(PLEDGE_LANG_STORAGE_KEY) || (isHindi ? 'hi' : 'en');
    } catch {
      return isHindi ? 'hi' : 'en';
    }
  });

  // Sync pledge language whenever the global site language toggle is clicked
  useEffect(() => {
    setPledgeLanguage(isHindi ? 'hi' : 'en');
  }, [isHindi]);

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
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* Authentic NGO Heritage Green Hero Banner with Saffron Accents & Balanced Spacing */}
      <section className="bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b-4 border-[#ea580c] shadow-md">
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-200 border border-orange-400/35 shadow-xs mb-1">
            {isHindi ? 'राष्ट्रीय पर्यावरण अभियान' : 'National Environmental Campaign'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif">
            {isHindi ? 'राष्ट्रीय पर्यावरण संरक्षण प्रतिज्ञा' : 'National Environmental Protection Pledge'}
          </h1>
          <p className="text-amber-300 text-lg sm:text-xl font-serif font-bold">
            {isHindi ? '१० पवित्र संकल्प • जल, थल, नभ एवं प्रकृति वंदन' : 'राष्ट्रीय पर्यावरण संरक्षण प्रतिज्ञा अभियान'}
          </p>
          <div className="h-1 w-20 mx-auto my-2 bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e] rounded-full shadow-xs" />
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            {isHindi
              ? 'जल, वायु, मिट्टी, वन और जैव विविधता की रक्षा के लिए पवित्र १० सूत्रीय पर्यावरण प्रतिज्ञा लें।'
              : 'Take the sacred 10-line environmental oath to protect water, air, soil, forests, and biodiversity for future generations.'}
          </p>
        </div>
      </section>

      {/* Main Pledge Interactive Section */}
      <div className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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

      {/* Pledge Alert Modal */}
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
