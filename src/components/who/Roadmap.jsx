import React, { useState } from 'react';
import roadmapData from '../../data/roadmap.json';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, CheckCircle2, Clock, Sparkles, X, ZoomIn, HeartHandshake, Layers } from 'lucide-react';

export default function Roadmap() {
  const { isHindi } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all'); // 'all' | 'done' | 'planned'
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [showFullGridModal, setShowFullGridModal] = useState(false);

  const filteredItems = roadmapData.filter((item) => {
    if (selectedYear !== 'all' && item.year.toString() !== selectedYear) return false;
    if (activeStatus === 'done' && item.status !== 'done') return false;
    if (activeStatus === 'planned' && item.status !== 'planned') return false;
    return true;
  });

  const allYears = ['all', ...roadmapData.map((d) => d.year.toString())];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-gray-100 overflow-hidden" id="roadmap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        {/* Section Header with Bilingual Sensitivity and Balanced Centered Spacing */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200 shadow-2xs mb-3">
            <HeartHandshake className="w-4 h-4 text-[#ea580c]" />
            <span>
              {isHindi
                ? 'खंड ग • सेवा यात्रा एवं कालक्रम (२००६ → २०३०)'
                : 'Section C • Moving Service Timeline (2006 → 2030)'}
            </span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight font-serif">
            {isHindi
              ? 'हमारी विकास यात्रा: २००६ से अब तक एवं २०३० का लक्ष्य'
              : 'Our Journey: Completed Milestones & 2030 Vision'}
          </h2>

          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isHindi
              ? 'विगत दो दशकों में धरातल पर हुए ऐतिहासिक सेवा कार्य। किसी भी कार्ड पर कर्सर ले जाएं—यात्रा तुरंत रुक जाएगी।'
              : 'Chronological progression of our grassroots milestones across two decades. Hover over any card to pause movement and inspect in detail.'}
          </p>

          {/* Controls & Grid View Button Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="inline-flex p-1 bg-gray-100 rounded-2xl border border-gray-200/80">
              <button
                onClick={() => setActiveStatus('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeStatus === 'all'
                    ? 'bg-[#0b5e34] text-white shadow-xs'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {isHindi ? 'समस्त कार्य' : 'All Milestones'}
              </button>
              <button
                onClick={() => setActiveStatus('done')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStatus === 'done'
                    ? 'bg-[#0b5e34] text-white shadow-xs'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isHindi ? 'सम्पन्न (2006–2024)' : 'Completed'}</span>
              </button>
              <button
                onClick={() => setActiveStatus('planned')}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStatus === 'planned'
                    ? 'bg-[#ea580c] text-white shadow-xs'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{isHindi ? 'आगामी (2026–2030)' : 'Planned Targets'}</span>
              </button>
            </div>

            {/* Button to open full grid view */}
            <button
              onClick={() => setShowFullGridModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#0b5e34] font-bold text-xs sm:text-sm border border-emerald-300 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#ea580c]" />
              <span>{isHindi ? 'ग्रिड में सभी देखें ↗' : 'Browse All Grid View ↗'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONTINUOUS MOVING ROADMAP ROW (ONE ROW, HOVER TO PAUSE) */}
      <div className="relative w-full py-6 overflow-hidden group">
        {/* Left & Right Edge Gradient Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-roadmap-marquee flex items-stretch gap-6 px-4">
          {/* Duplicate array twice for seamless continuous loop */}
          {[...filteredItems, ...filteredItems].map((item, index) => {
            const isDone = item.status === 'done';
            const title = isHindi ? item.titleHi || item.title : item.title || item.titleHi;
            const category = isHindi ? item.categoryHi || item.category : item.category || item.categoryHi;
            const highlightsList = isHindi ? item.highlightsHi || item.highlights : item.highlights || item.highlightsHi;

            return (
              <div
                key={`${item.year}-${index}`}
                onClick={() =>
                  item.image &&
                  setActiveModalImage({
                    url: item.image,
                    title: title,
                    descHindi: item.descHindi || item.desc,
                    descEnglish: item.descEnglish || item.descEn || item.descHindi,
                    year: item.year,
                  })
                }
                className="w-[360px] sm:w-[420px] shrink-0 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xs hover:shadow-2xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Badges: Year & Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#0b5e34] text-white text-xs font-black rounded-lg shadow-2xs tracking-wide">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-bold text-[#ea580c] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                        {category}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-2xs ${
                        isDone
                          ? 'bg-emerald-50 text-[#0b5e34] border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                      <span>{isDone ? (isHindi ? 'सम्पन्न' : 'Completed') : (isHindi ? 'संकल्प' : 'Planned')}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#0b5e34] transition-colors font-serif line-clamp-2">
                    {title}
                  </h3>

                  {/* 
                    HIGHLIGHTED PART IN BOTH HINDI AND ENGLISH / USE
                    As requested: "The highlighted part will be in hindi and english / use"
                  */}
                  <div className="bg-[#f4f9f6] border-l-4 border-[#0b5e34] p-3.5 rounded-r-2xl mb-4 shadow-2xs">
                    {/* Hindi Quote Section */}
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wide text-emerald-900 bg-emerald-200/60 px-1.5 py-0.5 rounded shrink-0">
                        हिंदी
                      </span>
                      <p className="text-gray-900 text-xs sm:text-sm font-medium leading-relaxed font-serif line-clamp-3">
                        "{item.descHindi || item.desc}"
                      </p>
                    </div>

                    {/* English Translation Section */}
                    <div className="pt-2 border-t border-emerald-200/60 flex items-start gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#ea580c] bg-orange-100 px-1.5 py-0.5 rounded shrink-0">
                        ENG
                      </span>
                      <p className="text-gray-700 text-xs leading-relaxed italic line-clamp-3">
                        "{item.descEnglish || item.descEn || item.descHindi}"
                      </p>
                    </div>
                  </div>

                  {/* Real Photo Container with zoom effect & Click-to-Expand */}
                  <div
                    className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-gray-50 border border-gray-200 transition-all ${
                      item.image ? 'hover:shadow-md' : 'border-dashed border-gray-300'
                    }`}
                  >
                    {item.image ? (
                      <>
                        <img
                          src={item.image}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                            <ZoomIn className="w-3.5 h-3.5 text-[#0b5e34]" />
                            <span>{isHindi ? 'बड़ी तस्वीर देखें' : 'View Full Image'}</span>
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0b5e34] flex items-center justify-center mb-1 shadow-2xs">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-gray-800 block">
                          {item.imagePlaceholder || `${item.year} Upcoming Target`}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium block mt-0.5">
                          {isHindi ? 'आगामी लक्ष्य हेतु कार्य योजना तैयार' : 'Action plan configured'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Highlights / Outcomes */}
                {highlightsList && highlightsList.length > 0 && (
                  <div className="pt-3 border-t border-gray-100 mt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      {isHindi ? 'मुख्य उपलब्धियां' : 'Key Outcomes'}
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {highlightsList.slice(0, 2).map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0 mt-1.5" />
                          <span className="leading-normal line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL GRID MODAL (BROWSE ALL MILESTONES) */}
      {showFullGridModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowFullGridModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#fcfdfc] shrink-0">
              <div>
                <h3 className="text-xl font-black text-gray-900 font-serif">
                  {isHindi ? 'समस्त विकास यात्रा मील के पत्थर (2006–2030)' : 'Complete Journey Milestones (2006–2030)'}
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  {isHindi ? 'सभी ऐतिहासिक वर्ष व आगामी योजनाएं' : 'All historical years and future vision'}
                </p>
              </div>
              <button
                onClick={() => setShowFullGridModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmapData.map((item) => {
                const isDone = item.status === 'done';
                const title = isHindi ? item.titleHi || item.title : item.title || item.titleHi;
                const category = isHindi ? item.categoryHi || item.category : item.category || item.categoryHi;

                return (
                  <div
                    key={item.year}
                    onClick={() => {
                      if (item.image) {
                        setActiveModalImage({
                          url: item.image,
                          title: title,
                          descHindi: item.descHindi || item.desc,
                          descEnglish: item.descEnglish || item.descEn || item.descHindi,
                          year: item.year,
                        });
                      }
                    }}
                    className="p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 bg-[#0b5e34] text-white text-xs font-black rounded-lg">
                          {item.year}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isDone ? 'bg-emerald-50 text-[#0b5e34]' : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {isDone ? (isHindi ? 'सम्पन्न' : 'Completed') : (isHindi ? 'संकल्प' : 'Planned')}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 mb-2 font-serif line-clamp-1">{title}</h4>
                      {item.image && (
                        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2 bg-gray-100">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <p className="text-xs text-gray-600 line-clamp-2 italic">
                        "{item.descEnglish || item.descHindi}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR SINGLE MILESTONE PHOTO */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#fcfdfc] shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-[#0b5e34] text-white text-xs font-bold rounded-lg">
                  {activeModalImage.year}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif">
                  {activeModalImage.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalImage(null)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="max-h-[58vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeModalImage.url}
                alt={activeModalImage.title}
                className="w-full h-auto max-h-[58vh] object-contain"
              />
            </div>

            {/* Modal Description Footer with Dual Hindi and English */}
            <div className="p-4 sm:p-5 bg-white border-t border-gray-100 space-y-2 shrink-0">
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                  हिंदी
                </span>
                <p className="text-xs sm:text-sm text-gray-900 font-serif font-medium leading-relaxed">
                  "{activeModalImage.descHindi}"
                </p>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase text-orange-800 bg-orange-100 px-1.5 py-0.5 rounded">
                  ENG
                </span>
                <p className="text-xs text-gray-600 italic leading-relaxed">
                  "{activeModalImage.descEnglish}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
