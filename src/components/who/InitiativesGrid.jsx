import React from 'react';
import initiativesData from '../../data/initiatives.json';
import { useLanguage } from '../../context/LanguageContext';
import { TreePine, BookOpen, HeartHandshake, Apple, Wrench, Users, Sparkles } from 'lucide-react';

const iconMap = {
  TreePine,
  BookOpen,
  HeartHandshake,
  Apple,
  Wrench,
  Users,
};

export default function InitiativesGrid() {
  const { isHindi } = useLanguage();

  const englishTitles = {
    'siksha-on-trees': {
      title: 'Siksha on Trees',
      sub: 'Nature-Integrated Classrooms',
      badge: 'Flagship Program',
      desc: 'Revolutionary open-air nature classrooms where children study under ancient sacred trees, cultivating botanical wisdom alongside standard foundational academics.',
      impact: '45+ Villages Active',
      pillars: ['Outdoor Classrooms', 'Ecological Awareness', 'Free Study Materials'],
    },
    'padhi-aur-siksha': {
      title: 'Padhi (Foundational Literacy)',
      sub: 'Every Child Literate',
      badge: 'Core Education',
      desc: 'Remedial learning and foundational numeracy programs targeting first-generation learners in remote forest and mining settlements across Jharkhand.',
      impact: '12,000+ Students Mentored',
      pillars: ['Basic Mathematics', 'Mother-Tongue Learning', 'School Bag Kits'],
    },
    'sanskar-awakening': {
      title: 'Sanskar & Moral Awakening',
      sub: 'Ethical Citizenship',
      badge: 'Value Education',
      desc: 'Fostering ancestral values of reverence for Nature (Prakriti Vandan), elder respect, community brotherhood, addiction-free living, and physical self-defense.',
      impact: '100+ Youth Assemblies',
      pillars: ['Prakriti Vandan', 'De-Addiction Pledges', 'Traditional Athletics'],
    },
    'poshan-nutrition': {
      title: 'Poshan & Herbal Nutrition',
      sub: 'Combating Malnutrition',
      badge: 'Health & Vitality',
      desc: 'Eliminating malnutrition among rural tribal mothers and children through indigenous millets, free cooked hot meals, and preventative medicine distribution.',
      impact: '8,500+ Health Kits Distributed',
      pillars: ['Annapurna Meal Seva', 'Maternal Nutrition', 'Free Medical Camps'],
    },
    'skill-development': {
      title: 'Gramin Skill Development',
      sub: 'Vocational Self-Reliance',
      badge: 'Livelihood',
      desc: 'Free vocational training in tailoring, sewing, bamboo handicrafts, and self-employment avenues to help women and young girls become financially independent.',
      impact: '3,400+ Women Certified',
      pillars: ['Free Tailoring Centers', 'Handicraft Making', 'Micro-Enterprise Guidance'],
    },
    'women-tribal-empowerment': {
      title: 'Matri Shakti & Self Help Groups',
      sub: 'Women Leadership',
      badge: 'Community Leadership',
      desc: 'Organizing rural women into robust Self Help Groups (SHGs) with micro-credit links, financial literacy, and community leadership roles.',
      impact: '150+ Women SHGs Formed',
      pillars: ['Financial Autonomy', 'Mutual Support Networks', 'Community Advocacy'],
    },
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-gray-100 relative" id="initiatives">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200/80 shadow-2xs mb-2.5">
            <Sparkles className="w-4 h-4 text-[#ea580c]" />
            <span>
              {isHindi ? 'खंड ङ • हमारे प्रमुख सेवा आयाम' : 'Section E • Grassroots Initiatives'}
            </span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight font-serif">
            {isHindi
              ? 'धरातलीय अभियान एवं समाज निर्माण के स्तम्भ'
              : 'Flagship Programs & Community Pillars'}
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
            {isHindi
              ? '"वृक्षों की छांव में शिक्षा" से लेकर नैतिक संस्कार जागरण, गो-सेवा और महिलाओं के हुनर विकास तक—हमारी प्रत्येक पहल समाज के उत्थान को समर्पित है।'
              : 'From "Siksha on Trees" to moral Sanskar awakening, cattle protection, and women\'s vocational autonomy—our initiatives touch every facet of rural life.'}
          </p>
        </div>

        {/* Initiatives Grid with Generous Spacing and Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {initiativesData.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const enData = englishTitles[item.id] || {};

            const title = isHindi ? item.title : enData.title || item.title;
            const sub = isHindi ? item.hindiTitle : enData.sub || item.hindiTitle;
            const badge = isHindi ? item.badge : enData.badge || item.badge;
            const desc = isHindi ? item.description : enData.desc || item.description;
            const impact = isHindi ? item.impact : enData.impact || item.impact;
            const pillars = isHindi ? item.pillars : enData.pillars || item.pillars;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-md hover:shadow-2xl hover:border-[#0b5e34] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[480px] sm:min-h-[520px]"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0b5e34] shadow-xs">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-orange-50 text-[#ea580c] border border-orange-200 shadow-2xs">
                      {badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 font-serif leading-snug">{title}</h3>
                  <p className="text-[#ea580c] font-serif font-bold text-sm mb-3.5">
                    {sub}
                  </p>

                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                <div>
                  {/* Impact Callout */}
                  <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between mb-4">
                    <span className="text-xs sm:text-sm text-[#0b5e34] font-bold uppercase tracking-wider">
                      {isHindi ? 'धरातलीय प्रभाव:' : 'Ground Impact:'}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#0b5e34]">
                      {impact}
                    </span>
                  </div>

                  {/* Pillars Tags */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                    {pillars.map((pillar, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
