import React from 'react';
import SectionHeading from '../components/common/SectionHeading';
import { AlertCircle, HelpCircle, ShieldAlert, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function Why() {
  const whyPoints = [
    {
      title: 'Accelerating Ecological Crisis',
      desc: 'Groundwater tables are falling rapidly in eastern India, while soil degradation and erratic rainfall threaten rural food security. Direct afforestation is the only sustainable natural shield.',
      stat: '54% of India faces high water stress',
    },
    {
      title: 'Marginalized Tribal & Mining Communities',
      desc: 'Communities living near mineral extraction zones carry the heaviest burden of industrial pollution with minimal basic amenities. Targeted healthcare, masks, and water purification save lives.',
      stat: 'Millions impacted by industrial particulate matter',
    },
    {
      title: 'The Literacy & Values Gap',
      desc: 'Standard educational models often lack ecological consciousness and cultural grounding. "Siksha on Trees" nurtures intellectual growth while cementing moral Sanskar and nature reverence.',
      stat: 'Outdoor learning boosts retention by over 30%',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* Authentic NGO Heritage Green Hero Banner with Saffron Accents & Balanced Spacing */}
      <section className="bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b-4 border-[#ea580c] shadow-md">
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-200 border border-orange-400/35 shadow-xs mb-1">
            The Rationale & Urgent Need
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif">
            Why It Matters
          </h1>
          <p className="text-amber-300 text-lg sm:text-xl font-serif font-bold">
            पृथ्वी का कर्ज कब चुकाओगे? • हमारा उद्देश्य एवं आवश्यकता
          </p>
          <div className="h-1 w-20 mx-auto my-2 bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e] rounded-full shadow-xs" />
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            Understanding why human development, environmental rejuvenation, and cultural character building are urgently needed today.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <SectionHeading
          badge="The Need"
          title="Why This Work Matters More Than Ever"
          subtitle="A breakdown of ecological urgency, rural realities, and our shared responsibility toward future generations."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {whyPoints.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs hover:shadow-md hover:border-[#15803d] transition-all flex flex-col justify-between border-t-3 border-t-[#0b5e34]"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#ea580c] uppercase tracking-widest block mb-1.5">
                  Factor 0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
              </div>

              <div className="pt-3.5 border-t border-gray-100">
                <span className="text-xs font-bold text-[#0b5e34] bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg block text-center">
                  {item.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
