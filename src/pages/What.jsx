import React from 'react';
import SectionHeading from '../components/common/SectionHeading';
import programsData from '../data/programs.json';
export default function What() {

  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* Authentic NGO Heritage Green Hero Banner with Saffron Accents & Balanced Spacing */}
      <section className="bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b-4 border-[#ea580c] shadow-md">
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-200 border border-orange-400/35 shadow-xs mb-1">
            Impact Sectors & SDG-30
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif">
            What We Do
          </h1>
          <p className="text-amber-300 text-lg sm:text-xl font-serif font-bold">
            हमारा कार्य: धरातलीय समाज कल्याण, पर्यावरण संरक्षण एवं पुनर्वास
          </p>
          <div className="h-1 w-20 mx-auto my-2 bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e] rounded-full shadow-xs" />
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            Our targeted development programs align grassroots action in mining, rural, and tribal areas with the United Nations Sustainable Development Goals (SDG-30).
          </p>
        </div>
      </section>

      {/* Program Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <SectionHeading
          badge="Focus Areas"
          title="Programs Addressing Key Human & Environmental Needs"
          subtitle="Direct on-ground interventions delivering healthcare, education, clean water, and self-reliance."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {programsData.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-2xs hover:shadow-md hover:border-[#15803d] transition-all duration-300 flex flex-col justify-between border-t-3 border-t-[#0b5e34]"
            >
              <div>
                {/* SDG Badges Row */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {prog.sdgBadges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-orange-50 text-[#ea580c] border border-orange-200"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-0.5 font-serif">{prog.title}</h3>
                <p className="text-xs font-bold text-[#ea580c] mb-2.5">{prog.subtitle}</p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{prog.description}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {prog.pillars.map((pillar, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
