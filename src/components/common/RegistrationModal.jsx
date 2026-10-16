import React, { useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import registrationData from '../../data/registration.json';
import { X, CheckCircle2, ShieldCheck, Building2, Calendar, MapPin, Hash, Sparkles, CreditCard, Award, FileText } from 'lucide-react';

export default function RegistrationModal() {
  const { isRegModalOpen, activeOrgKey, closeRegModal, openRegModal } = useModal();
  const { isHindi } = useLanguage();

  useEffect(() => {
    if (isRegModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeRegModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isRegModalOpen, closeRegModal]);

  if (!isRegModalOpen) return null;

  const currentOrg = registrationData[activeOrgKey] || registrationData.prithiviwasi;
  const isPrithvi = activeOrgKey === 'prithiviwasi';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeRegModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200">
        {/* Top NGO Heritage Header */}
        <div className="bg-gradient-to-r from-[#0b5e34] via-[#094b2a] to-[#0b5e34] text-white p-6 sm:p-7 relative border-b-4 border-b-[#ea580c]">
          <button
            onClick={closeRegModal}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-500/20 border border-orange-400/35 text-orange-200">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-300" />
              {isHindi ? 'प्रमाणित वैधानिक अभिलेख' : 'Verified Statutory Record'}
            </span>
          </div>

          <h2 id="reg-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
            {isHindi ? 'आधिकारिक पंजीकरण विवरण' : 'Official Registration Details'}
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 leading-relaxed">
            {isHindi
              ? 'ट्रस्ट एवं सहयोगी संस्था के वैधानिक पंजीकरण, आयकर 12A/12AA एवं प्रशासनिक विवरण।'
              : 'Statutory credentials, legal status, and governance records of the trust and partner entities.'}
          </p>

          {/* Org Selector Tabs */}
          <div className="flex gap-2.5 mt-5">
            <button
              onClick={() => openRegModal('prithiviwasi')}
              className={`flex-1 py-2.5 px-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeOrgKey === 'prithiviwasi'
                  ? 'bg-white text-[#0b5e34] shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <img src="/assets/logo.png" alt="" className="w-5 h-5 object-contain rounded-full" />
              <span>{isHindi ? 'पृथ्वीवासी ट्रस्ट' : 'Prithiviwasi Trust'}</span>
            </button>
            <button
              onClick={() => openRegModal('agentsOfChange')}
              className={`flex-1 py-2.5 px-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeOrgKey === 'agentsOfChange'
                  ? 'bg-white text-[#0b5e34] shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <img src="/assets/agents_of_change_logo.jpg" alt="" className="w-5 h-5 object-contain rounded-lg" />
              <span>{isHindi ? 'एजेंट्स ऑफ चेंज' : 'Agents of Change'}</span>
            </button>
          </div>
        </div>

        {/* Content Body with Generous Spacing */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto space-y-6">
          {/* Organization Banner */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f4f9f6] border border-emerald-100">
            <img
              src={currentOrg.logo}
              alt={currentOrg.name}
              className="w-16 h-16 object-contain rounded-2xl bg-white p-1.5 border border-emerald-200 shadow-2xs shrink-0"
            />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-serif">{currentOrg.name}</h3>
              <p className="text-[#0b5e34] font-serif font-semibold text-sm mt-0.5">{currentOrg.hindiName}</p>
              <p className="text-xs text-gray-600 mt-1">{currentOrg.subtitle}</p>
              <span className="inline-block mt-2 text-xs font-bold px-3 py-1 bg-emerald-100 text-[#0b5e34] rounded-lg">
                {currentOrg.trustType}
              </span>
            </div>
          </div>

          {/* Statutory Registration Table with Clean Credentials */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#0b5e34]" />
              {isHindi ? 'वैधानिक पंजीकरण विवरण' : 'Official Statutory Records'}
            </h4>

            <div className="overflow-hidden border border-gray-200/90 rounded-2xl shadow-2xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f8faf9] text-gray-600 text-xs uppercase font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-5">{isHindi ? 'वैधानिक विवरण' : 'Statutory Field'}</th>
                    <th className="py-3 px-5">{isHindi ? 'आधिकारिक मूल्य' : 'Official Credential'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {/* Legal Entity Status */}
                  <tr className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#0b5e34]" />
                      {isHindi ? 'संस्था का वैधानिक स्वरूप' : 'Legal Entity Status'}
                    </td>
                    <td className="py-3 px-5 font-bold text-gray-900">{currentOrg.legalStatus}</td>
                  </tr>

                  {/* Date of Registration / Constitution */}
                  <tr className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0b5e34]" />
                      {isHindi ? 'पंजीकरण / गठन तिथि' : 'Date of Registration / Constitution'}
                    </td>
                    <td className="py-3 px-5 font-bold text-[#0b5e34]">{currentOrg.date}</td>
                  </tr>

                  {/* Place of Registration */}
                  <tr className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0b5e34]" />
                      {isHindi ? 'पंजीकरण स्थान' : 'Place of Registration'}
                    </td>
                    <td className="py-3 px-5 font-bold text-gray-900">{currentOrg.place}</td>
                  </tr>

                  {/* Registration / Register Serial Number */}
                  <tr className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                      <Hash className="w-4 h-4 text-[#0b5e34]" />
                      {isHindi ? 'पंजीकरण / आदेश क्रमांक' : 'Registration / Serial Number'}
                    </td>
                    <td className="py-3 px-5 font-mono font-black text-[#0b5e34] text-sm bg-emerald-50/50">
                      {currentOrg.regNo}
                    </td>
                  </tr>

                  {/* PAN Number (if available) */}
                  {currentOrg.panNo && (
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#ea580c]" />
                        {isHindi ? 'पैन (PAN) संख्या' : 'Permanent Account Number (PAN)'}
                      </td>
                      <td className="py-3 px-5 font-mono font-bold text-gray-900">
                        {currentOrg.panNo} {currentOrg.girNo ? `(GIR: ${currentOrg.girNo})` : ''}
                      </td>
                    </tr>
                  )}

                  {/* Income Tax 12A / 12AA Status (if available) */}
                  {currentOrg.taxExemption && (
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#0b5e34]" />
                        {isHindi ? 'आयकर छूट स्थिति (12A)' : 'Income Tax Status (12A/12AA)'}
                      </td>
                      <td className="py-3 px-5 text-xs font-bold text-[#0b5e34]">
                        {currentOrg.taxExemption}
                      </td>
                    </tr>
                  )}

                  {/* Approving Authority */}
                  {currentOrg.authority && (
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        {isHindi ? 'अधिकृत प्राधिकारी' : 'Competent Authority'}
                      </td>
                      <td className="py-3 px-5 text-xs font-semibold text-gray-800">
                        {currentOrg.authority}
                      </td>
                    </tr>
                  )}

                  {/* Registered Address */}
                  {currentOrg.address && (
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {isHindi ? 'पंजीकृत पता' : 'Registered Office Address'}
                      </td>
                      <td className="py-3 px-5 text-xs text-gray-700">
                        {currentOrg.address}
                      </td>
                    </tr>
                  )}

                  {/* Status Pill */}
                  <tr className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-5 font-semibold text-gray-600 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0b5e34]" />
                      {isHindi ? 'सत्यापन स्थिति' : 'Verification Status'}
                    </td>
                    <td className="py-3 px-5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#0b5e34]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {currentOrg.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Charter Objectives */}
          {currentOrg.objectives && currentOrg.objectives.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0b5e34]" />
                {isHindi ? 'मूल उद्देश्य एवं कार्यक्षेत्र' : 'Charter Objectives'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
                {(isHindi && currentOrg.objectivesHi ? currentOrg.objectivesHi : currentOrg.objectives).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8faf9] border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#0b5e34] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer with Generous Padding */}
        <div className="bg-[#f8faf9] p-4 sm:p-5 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            {isPrithvi
              ? (isHindi ? 'भारतीय ट्रस्ट अधिनियम के अंतर्गत पंजीकृत • रांची, झारखण्ड' : 'Registered Under Indian Trusts Act • Ranchi, Jharkhand')
              : (isHindi ? 'सोसायटी पंजीकरण अधिनियम एवं आयकर धारा 12A/12AA • नई दिल्ली' : 'Registered Society Under Societies Act & IT Act 12A/12AA • New Delhi')}
          </p>
          <button
            onClick={closeRegModal}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            {isHindi ? 'बंद करें' : 'Close Details'}
          </button>
        </div>
      </div>
    </div>
  );
}
