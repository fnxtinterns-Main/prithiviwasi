import React, { useState } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import partnersData from '../data/partners.json';
import { useModal } from '../context/ModalContext';
import { useLanguage } from '../context/LanguageContext';
import { Users, Building2, GraduationCap, CheckCircle, Send, Sparkles, ShieldCheck } from 'lucide-react';

const partnerCategoriesHi = {
  'agents-of-change': 'रणनीतिक सहयोगी',
  'gramin-vikas-trust': 'ग्रामीण सहयोगी',
  'prakriti-rakshak': 'पर्यावरण संरक्षण',
  'jharkhand-youth-forum': 'युवा संजाल',
  'manav-seva-mission': 'मानवीय सेवा',
};

export default function Partners() {
  const { isHindi } = useLanguage();
  const [partnerType, setPartnerType] = useState('individual'); // 'individual' | 'organization' | 'institute'
  const [submitted, setSubmitted] = useState(false);
  const { openRegModal } = useModal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organizationName: '',
    purpose: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* 1. Authentic NGO Heritage Green Hero Banner with Saffron Accents & Balanced Spacing */}
      <section className="bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b-4 border-[#ea580c] shadow-md">
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-200 border border-orange-400/35 shadow-xs mb-1">
            {isHindi ? 'साझेदारी एवं सामूहिक प्रभाव' : 'Synergy & Collective Impact'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif">
            {isHindi ? 'सहयोगी संस्थाएं एवं संगठन' : 'Partner Movement'}
          </h1>
          <p className="text-amber-300 text-lg sm:text-xl font-serif font-bold">
            {isHindi
              ? 'संघे शक्ति कलियुगे • सामूहिक उद्देश्य में अपार शक्ति'
              : 'संघे शक्ति कलियुगे • Strength in Collaborative Purpose'}
          </p>
          <div className="h-1 w-20 mx-auto my-2 bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e] rounded-full shadow-xs" />
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-1">
            {isHindi
              ? 'अग्रणी युवा आंदोलनों, शिक्षण संस्थानों, सीएसआर पहलों और सामाजिक कार्यकर्ताओं के साथ मिलकर धरातलीय प्रभाव को व्यापक बनाना।'
              : 'Collaborating with leading youth movements, academic institutions, CSR initiatives, and local community leaders to multiply our ground impact.'}
          </p>
        </div>
      </section>

      {/* 2. Featured Alliance Partner Banner: Agents of Change */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 border-t-3 border-t-[#ea580c] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/assets/agents_of_change_logo.jpg"
              alt="Agents of Change"
              className="w-16 h-16 object-cover rounded-xl shadow-xs border border-gray-100 shrink-0"
            />
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-[#ea580c] border border-orange-200 uppercase tracking-wide">
                {isHindi ? 'प्रमुख सहयोगी संस्था' : 'Primary Alliance Partner'}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1 font-serif">Agents of Change</h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {isHindi
                  ? 'भविष्य का सशक्तिकरण • युवा एवं पर्यावरण वकालत नेटवर्क'
                  : 'Empowering the Future • Youth & Climate Advocacy Network'}
              </p>
            </div>
          </div>
          <button
            onClick={() => openRegModal('agentsOfChange')}
            className="px-5 py-2.5 bg-[#0b5e34] hover:bg-[#073d22] text-white rounded-xl text-sm font-bold shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>{isHindi ? 'सहयोग क्रेडेंशियल देखें' : 'View Alliance Credentials'}</span>
          </button>
        </div>
      </div>

      {/* 3. Partner Logo Grid with Grayscale to Color Hover */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <SectionHeading
          badge={isHindi ? 'सहयोगी नेटवर्क' : 'Network of Allies'}
          title={isHindi ? 'हमारा सहयोगी एवं धरातलीय संगठन संजाल' : 'Our Alliance & Grassroots Network'}
          subtitle={isHindi ? 'समस्त भारत में पृथ्वीवासी संस्था के साथ कंधे से कंधा मिलाकर खड़े सहयोगी एवं संस्थागत साथी।' : 'Allies and institutional partners standing shoulder-to-shoulder with Prithiviwasi across India.'}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
          {partnersData.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center hover:border-[#15803d]"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="w-14 h-14 object-contain rounded-xl grayscale group-hover:grayscale-0 opacity-75 group-hover:opacity-100 transition-all duration-300 mb-2.5"
              />
              <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#0b5e34] transition-colors">
                {p.name}
              </h4>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                {isHindi ? (partnerCategoriesHi[p.id] || p.category) : p.category}
              </p>
            </div>
          ))}
        </div>

        {/* 4. Multi-Tab Partner Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 border-t-4 border-t-[#0b5e34] shadow-lg">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-[#ea580c] border border-orange-200 uppercase tracking-wider mb-2">
              {isHindi ? 'सहयोग हेतु जुड़ें' : 'Join Hands'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
              {isHindi ? 'पृथ्वीवासी के साथ साझेदारी करें' : 'Partner With Prithiviwasi'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {isHindi
                ? 'अपनी संस्था या व्यक्तिगत श्रेणी चुनें और साझेदारी हेतु अपना विवरण भेजें।'
                : 'Select your affiliation type and submit your collaboration interest.'}
            </p>

            {/* 3 Tabs */}
            <div className="grid grid-cols-3 gap-2 mt-6 p-1.5 bg-gray-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setPartnerType('individual')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  partnerType === 'individual' ? 'bg-white text-emerald-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{isHindi ? 'व्यक्तिगत' : 'Individual'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPartnerType('organization')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  partnerType === 'organization' ? 'bg-white text-emerald-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{isHindi ? 'संस्था / NGO' : 'Organization / NGO'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPartnerType('institute')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  partnerType === 'institute' ? 'bg-white text-emerald-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>{isHindi ? 'संस्थान / स्कूल' : 'Institute / School'}</span>
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-emerald-900">
                {isHindi ? 'साझेदारी में रुचि दिखाने के लिए धन्यवाद!' : 'Thank You for Your Partnership Interest!'}
              </h4>
              <p className="text-sm text-emerald-800 max-w-md mx-auto">
                {isHindi
                  ? 'पृथ्वीवासी संस्था की टीम आपके प्रस्ताव की समीक्षा करेगी और शीघ्र ही सहयोग के अवसरों पर चर्चा के लिए आपसे संपर्क करेगी।'
                  : 'Our team at Prithiviwasi will review your submission and reach out shortly to discuss collaboration opportunities.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs font-bold text-emerald-700 underline cursor-pointer"
              >
                {isHindi ? 'एक और पूछताछ दर्ज करें' : 'Submit another inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    {isHindi ? 'पूरा नाम' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isHindi ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    {isHindi ? 'ईमेल पता' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={isHindi ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    {isHindi ? 'फ़ोन नंबर' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    placeholder={isHindi ? 'फ़ोन नंबर दर्ज करें' : 'Enter phone number'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    {partnerType === 'individual'
                      ? (isHindi ? 'व्यवसाय / शहर' : 'Profession / City')
                      : (isHindi ? 'संस्था / संगठन का नाम' : 'Organization / Institute Name')}
                  </label>
                  <input
                    type="text"
                    placeholder={isHindi ? 'विवरण दर्ज करें' : 'Enter details'}
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  {isHindi ? 'साझेदारी का मुख्य उद्देश्य' : 'Purpose of Partnership'}
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  <option value="">{isHindi ? 'सहयोग क्षेत्र चुनें' : 'Select collaboration area'}</option>
                  <option value="tree-planting">
                    {isHindi ? 'सघन देशी वृक्षारोपण एवं हरित आवरण' : 'Afforestation & Tree Plantation'}
                  </option>
                  <option value="education">
                    {isHindi ? 'पेड़ों की छांव में शिक्षा एवं ग्रामीण अध्ययन केंद्र' : 'Siksha on Trees & Rural Classrooms'}
                  </option>
                  <option value="coal-mining">
                    {isHindi ? 'खनन क्षेत्र में स्वास्थ्य रक्षा एवं राहत' : 'Coal Mining Belt Healthcare & Relief'}
                  </option>
                  <option value="csr">
                    {isHindi ? 'सीएसआर अनुदान एवं कॉर्पोरेट सहयोग' : 'CSR Grants & Corporate Sponsorship'}
                  </option>
                  <option value="volunteering">
                    {isHindi ? 'युवा एवं छात्र स्वयंसेवा अभियान' : 'Youth & Student Volunteering'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  {isHindi ? 'संदेश / विस्तृत विवरण' : 'Message / Details'}
                </label>
                <textarea
                  rows="3"
                  placeholder={isHindi ? 'बताएं कि हम मिलकर कैसे कार्य कर सकते हैं...' : 'Tell us about how we can work together...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isHindi ? 'साझेदारी प्रस्ताव भेजें' : 'Submit Partnership Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
