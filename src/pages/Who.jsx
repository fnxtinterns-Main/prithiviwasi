import React from 'react';
import WhoWeAre from '../components/who/WhoWeAre';
import ElevateSection from '../components/who/ElevateSection';
import FieldAlbumMarquee from '../components/who/FieldAlbumMarquee';
import Roadmap from '../components/who/Roadmap';
import HeroStory from '../components/who/HeroStory';
import InitiativesGrid from '../components/who/InitiativesGrid';
import { useLanguage } from '../context/LanguageContext';
import { Compass } from 'lucide-react';

export default function Who() {
  const { isHindi } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Authentic NGO Heritage Green Hero Banner with Rich 2-Column Visual Balance */}
      <section className="bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b-4 border-[#ea580c] shadow-lg">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heritage & Mission Overview (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-200 border border-orange-400/35 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-orange-300" />
              <span>
                {isHindi
                  ? 'पब्लिक चैरिटेबल ट्रस्ट धरोहर • स्थापना २००६'
                  : 'Public Charitable Trust Heritage • Estd. 2006'}
              </span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif">
              {isHindi ? 'हमारा परिचय एवं गौरवमयी इतिहास' : 'Who We Are • Our Heritage & Legacy'}
            </h1>

            <p className="text-amber-300 text-lg sm:text-xl font-serif font-bold">
              {isHindi
                ? 'पृथ्वीवासी सेवा और सुधार संगठन • मानव कल्याण एवं प्रकृति वंदन'
                : 'Prithiviwasi Seva aur Sudhar Sangathan • Manav Kalyan & Nature Stewardship'}
            </p>

            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed pt-1">
              {isHindi
                ? 'लावारिस शवों के ससम्मान अंतिम संस्कार (२००६) से लेकर विधिक पंजीकरण (२००८), गौशाला, वृद्धजन सेवा, गरीब बस्तियों में निःशुल्क शिक्षा-प्रशिक्षण तथा २०२६–२०३० के समग्र ग्राम विकास का प्रामाणिक इतिहास। (ट्रस्ट पंजी. सं. 19317/2344, रांची, झारखण्ड)'
                : 'From solemn last rites of unclaimed bodies (2006) to official trust incorporation (2008), cattle shelter, elder hospice care, free slum schools, and our 2030 model eco-village vision. (Trust Reg. No. 19317/2344, Ranchi, Jharkhand)'}
            </p>

            {/* Credential Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-semibold border border-white/20 backdrop-blur-xs">
                🏛️ Trust Reg: 19317/2344 (Ranchi, Jharkhand)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 text-emerald-200 text-xs font-semibold border border-white/20 backdrop-blur-xs">
                🌱 Estd. 2006 • 18+ Years Dedicated Service
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-200 text-xs font-semibold border border-orange-400/30 backdrop-blur-xs">
                🤝 Alliance Partner: Agents of Change
              </span>
            </div>
          </div>

          {/* Right Column: Visual Trust Emblem & Founders Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-md p-6 sm:p-7 border border-white/25 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

              {/* Photo Card of Trust Deed & Founders */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-white/30 shadow-md">
                <img
                  src="/assets/who_images/2008_trust_founders_press.jpeg"
                  alt="Trust Founders Holding Trust Deed"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#0b5e34]/90 text-white backdrop-blur-xs">
                  {isHindi ? 'विधिक ट्रस्ट विलेख • २००८' : 'Founding Trust Deed • 2008'}
                </span>
              </div>

              {/* Trust Details in Right Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/logo.png"
                    alt="Logo"
                    className="w-12 h-12 object-contain rounded-2xl bg-white p-1 shadow-sm shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white font-serif leading-tight">
                      Prithiviwasi Seva aur Sudhar Sangathan
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">
                      Sub-Registrar Office, Ranchi • Reg. No. 19317/2344
                    </p>
                  </div>
                </div>

                {/* Quick Impact Ticker Pills */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/15 text-center">
                  <div className="p-2 rounded-xl bg-black/20">
                    <span className="text-sm font-black text-amber-300 block">50,000+</span>
                    <span className="text-[10px] text-emerald-100 font-medium">Trees Planted</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/20">
                    <span className="text-sm font-black text-emerald-300 block">15,000+</span>
                    <span className="text-[10px] text-emerald-100 font-medium">Empowered</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/20">
                    <span className="text-sm font-black text-orange-300 block">220+</span>
                    <span className="text-[10px] text-emerald-100 font-medium">Field Photos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section A: Who We Are & Trust Charter */}
      <WhoWeAre />

      {/* Section B: Elevate Us (Vision, Honors, Impact) */}
      <ElevateSection />

      {/* Continuous Moving Grassroots Photo Album (One Row, Hover-to-Stop, 220+ Field Photos) */}
      <FieldAlbumMarquee />

      {/* Section C: Interactive Roadmap 2006 -> 2030 (Sample Image Style with Dual Hindi & English Highlighted Box) */}
      <Roadmap />

      {/* Section D: Hero Storyboard (Problem ➔ Action ➔ Resolution) */}
      <HeroStory />

      {/* Section E: Initiatives Grid */}
      <InitiativesGrid />
    </div>
  );
}
