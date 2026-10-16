import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Target, Award, Users, Quote, Sparkles, TrendingUp, Heart } from 'lucide-react';

export default function ElevateSection() {
  const { isHindi } = useLanguage();

  const impactStats = [
    {
      number: '50,000+',
      label: isHindi ? 'वृक्षारोपण एवं संरक्षण' : 'Trees Planted & Nurtured',
      sub: isHindi ? 'सुदूर वन क्षेत्रों एवं खनन प्रभावित इलाकों में' : 'Across degraded forest and mining fringes',
    },
    {
      number: '15,000+',
      label: isHindi ? 'लाभान्वित बच्चे व माताएं' : 'Children & Mothers Empowered',
      sub: isHindi ? 'निःशुल्क शिक्षा, कौशल व संस्कार पाठशाला' : 'Under tree classrooms & skill circles',
    },
    {
      number: '120+',
      label: isHindi ? 'सहयोगी गांव व बस्तियां' : 'Villages Supported',
      sub: isHindi ? 'झारखण्ड के ग्रामीण व जनजातीय अंचल' : 'In rural Jharkhand and adjacent belts',
    },
    {
      number: '18+ Yrs',
      label: isHindi ? 'अविराम सेवा समर्पण' : 'Continuous Dedication',
      sub: isHindi ? 'वर्ष २००६ से धरातल पर निरंतर कार्यरत' : 'Serving communities since 2006',
    },
  ];

  const testimonials = [
    {
      name: isHindi ? 'रामेश्वर सोरेन' : 'Rameshwar Soren',
      role: isHindi ? 'ग्राम प्रमुख, बोकारो अंचल' : 'Village Elder, Bokaro Fringes',
      quote: isHindi
        ? 'पृथ्वीवासी संस्था ने हमारी बस्ती के बच्चों को नई दिशा दी है। जहां पहले स्कूल का नाम तक नहीं था, आज वहां बच्चे पुस्तकें पढ़ते हैं और संस्कार सीखते हैं।'
        : 'Prithiviwasi brought light to our settlement. Before the tree school was established, our children had never held notebooks. Today they read, write, and plant saplings with pride.',
    },
    {
      name: isHindi ? 'डॉ. सुनीता मुर्मू' : 'Dr. Sunita Murmu',
      role: isHindi ? 'ग्रामीण स्वास्थ्य अधिकारी' : 'Rural Health Officer',
      quote: isHindi
        ? 'खनन प्रभावित क्षेत्रों और रातू प्रखण्ड में संस्था द्वारा आयोजित निःशुल्क स्वास्थ्य जांच व दवा वितरण शिविरों से सैकड़ों बुजुर्गों और माताओं को नया जीवन मिला।'
        : 'The mobile clinics and healthcare checkups in the mining belts and Ratu saved hundreds of elderly citizens and mothers from chronic ailments.',
    },
    {
      name: isHindi ? 'अमित कुमार' : 'Amit Kumar',
      role: isHindi ? 'युवा पर्यावरण स्वयंसेवक' : 'Youth Climate Volunteer',
      quote: isHindi
        ? 'पृथ्वीवासी संगठन के साथ जुड़कर लावारिस शवों के दाह संस्कार से लेकर वृक्षारोपण तक में भाग लेने पर समझ आया कि सच्ची राष्ट्रसेवा धरातल पर निस्वार्थ कर्म करने में है।'
        : 'Working with Prithiviwasi and Agents of Change showed me that true activism starts from empathy, cremation of the abandoned, and nurturing the living earth.',
    },
  ];

  return (
    <div id="elevate-us">
      {/* Sub-Section 1: Foundational Vision Charter with Standalone Dignified Spacing */}
      <section className="py-16 sm:py-24 lg:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200/80 mb-3 shadow-2xs">
              <Target className="w-4 h-4 text-[#ea580c]" />
              <span>
                {isHindi ? 'संस्था का मूल दृष्टि-पत्र' : 'Foundational Vision Charter'}
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight font-serif">
              {isHindi ? 'हमारा दूरदर्शी संकल्प एवं ध्येय' : 'Our Guiding Vision & Moral Compass'}
            </h2>
          </div>

          {/* Standalone Vision Manifesto Card with Centered Symmetrical Styling */}
          <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-[#084727] via-[#0b5e34] to-[#073d22] text-white shadow-xl relative overflow-hidden border border-emerald-500/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 relative z-10">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/20 text-amber-300 shrink-0 shadow-sm">
                <Target className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div className="text-center md:text-left space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-200 block">
                  {isHindi ? 'सार्वजनिक ट्रस्ट संकल्प' : 'Public Charitable Trust Resolution'}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed font-serif">
                  {isHindi
                    ? '"एक ऐसे संवेदनशील, प्रकृति-समर्पित और स्वावलंबी समाज का निर्माण, जहां नैतिक संस्कार, पर्यावरण संरक्षण और सामाजिक समरसता साथ-साथ फलें-फूलें।"'
                    : '"To awaken an ecologically conscious, self-reliant human civilization where moral values, forest health, and social equity flourish hand in hand."'}
                </h3>
                <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-4xl pt-1">
                  {isHindi
                    ? 'पर्यावरण का विनाश और समाज की निर्धनता दोनों एक ही मानवीय असंवेदनशीलता की उपज हैं। जब तक हम अपनी धरती मां और समाज के अंतिम व्यक्ति के प्रति संवेदनशील नहीं होंगे, तब तक वास्तविक विकास अधूरा है।'
                    : 'We believe that environmental degradation and societal poverty stem from the same root disconnect. By healing our bond with Mother Earth, we restore community dignity.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Section 2: Measured Grassroots Impact & Official Recognitions */}
      <section className="py-20 sm:py-28 bg-[#f8faf9] border-b border-emerald-100/70 relative overflow-hidden" id="impact-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#0b5e34] border border-emerald-200 mb-3 shadow-2xs">
              <TrendingUp className="w-4 h-4 text-[#0b5e34]" />
              <span>
                {isHindi ? 'खंड ख • धरातलीय प्रभाव एवं सम्मान' : 'Section B • Verified Ground Impact'}
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight font-serif">
              {isHindi ? 'दो दशकों का धरातलीय प्रभाव' : 'Two Decades of Measurable Change'}
            </h2>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'झारखण्ड के ग्रामीण, वनवासी व खनन प्रभावित क्षेत्रों में वर्ष २००६ से दर्ज प्रामाणिक आंकड़े।'
                : 'Verified field statistics across Jharkhand\'s rural and mining fringes since 2006.'}
            </p>
          </div>

          {/* 4 Spacious Impact Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {impactStats.map((stat, idx) => (
              <div
                key={idx}
                className="pt-10 sm:pt-12 pb-8 px-7 sm:px-8 rounded-3xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 text-center border-t-4 border-t-[#0b5e34] flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#0b5e34] mt-3 sm:mt-4 mb-3 font-serif tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 leading-relaxed pt-2 border-t border-gray-100">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Official Awards & Citations with Generous Separation */}
          <div className="mt-16 sm:mt-24 pt-12 border-t border-gray-200/80">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block mb-1">
                {isHindi ? 'सराहना एवं प्रशस्ति' : 'State & Community Honors'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">
                {isHindi ? 'आधिकारिक नागरिक एवं सामाजिक सम्मान' : 'Public Citations & Recognitions'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-7 rounded-2xl bg-white border border-gray-200/90 shadow-2xs flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900">
                    {isHindi ? 'ग्रामीण सेवा सम्मान' : 'Gramin Seva Samman'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {isHindi ? 'राज्य स्तरीय उत्कृष्ट ग्रामीण सेवा' : 'State Rural Excellence Recognition'}
                  </p>
                </div>
              </div>

              <div className="p-7 rounded-2xl bg-white border border-gray-200/90 shadow-2xs flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0b5e34] shadow-2xs shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900">
                    {isHindi ? 'प्रकृति रक्षक सम्मान' : 'Prakriti Rakshak Shield'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {isHindi ? 'सघन वृक्षारोपण एवं पर्यावरण चेतना' : 'Environmental Afforestation Citation'}
                  </p>
                </div>
              </div>

              <div className="p-7 rounded-2xl bg-white border border-gray-200/90 shadow-2xs flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#ea580c] shadow-2xs shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900">
                    {isHindi ? 'जनजातीय कल्याण प्रशस्ति' : 'Tribal Welfare Citation'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {isHindi ? 'वनवासी स्वास्थ्य एवं बाल शिक्षा संवर्धन' : 'Community Health & Literacy'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Section 3: Voices From the Ground (Community Testimonials) Standalone */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-100 relative overflow-hidden" id="community-voices">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200/80 mb-3 shadow-2xs">
              <Quote className="w-4 h-4 text-[#ea580c]" />
              <span>
                {isHindi ? 'धरातलीय प्रत्यक्ष अनुभव' : 'Authentic Field Reflections'}
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight font-serif">
              {isHindi ? 'धरातल से गूंजती आवाजें' : 'Voices From the Ground'}
            </h2>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'गांव के मुखिया, स्वास्थ्य अधिकारियों व जमीनी स्वयंसेवकों के सीधे अनुभव।'
                : 'Direct reflections from village elders, healthcare officers, and grassroots youth.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-[#fcfdfc] border border-emerald-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative mb-8">
                  <Quote className="w-8 h-8 text-emerald-200 mb-3" />
                  <p className="text-base text-gray-800 italic leading-relaxed font-serif">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 text-base">{t.name}</h4>
                  <p className="text-xs sm:text-sm text-[#0b5e34] font-bold mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
