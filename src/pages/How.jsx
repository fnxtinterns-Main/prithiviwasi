import React, { useState } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import programsData from '../data/programs.json';
import { Heart } from 'lucide-react';
import { useModal } from '../context/ModalContext';


export default function How() {
  const [activeTab, setActiveTab] = useState('all');
  const { openDonateModal } = useModal();

  const tabs = [
    { id: 'all', label: 'All Programs' },
    { id: 'coal-mining', label: 'Coal Mining' },
    { id: 'rural-development', label: 'Rural Development' },
    { id: 'women-empowerment', label: 'Women Empowerment' },
    { id: 'handicap-empowerment', label: 'Handicap Empowerment' },
  ];

  const filteredPrograms =
    activeTab === 'all'
      ? programsData
      : programsData.filter((p) => p.id === activeTab);

  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* Authentic NGO Heritage Green Hero Banner with Saffron Accents & Balanced Spacing */}
      <section className="bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b-4 border-[#ea580c] shadow-md">
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-200 border border-orange-400/35 shadow-xs mb-1">
            Participation & Program Tabs
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif">
            How You Can Help & How We Execute
          </h1>
          <p className="text-amber-300 text-lg sm:text-xl font-serif font-bold">
            सहयोग मार्ग: विभिन्न कार्य-स्तंभों में सहभागिता
          </p>
          <div className="h-1 w-20 mx-auto my-2 bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e] rounded-full shadow-xs" />
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            Discover each specialized development vertical and find out how you can contribute through donations, volunteering, or organizational partnerships.
          </p>
        </div>
      </section>

      {/* Program Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0b5e34] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Cards Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredPrograms.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-2xs hover:shadow-md hover:border-[#15803d] transition-all flex flex-col justify-between border-t-3 border-t-[#0b5e34]"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-0.5 font-serif">{p.title}</h3>
                <p className="text-[#ea580c] text-xs font-bold mb-2.5">{p.subtitle}</p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{p.description}</p>

                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Key Pillars of Intervention
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.pillars.map((pillar, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-green-50 text-[#0b5e34] border border-green-200"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={openDonateModal}
                  className="px-4 py-2 rounded-xl bg-[#0b5e34] hover:bg-[#073d22] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                  <span>Support This Program</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
