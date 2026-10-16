import React from 'react';
import { useModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Heart, Award, CheckCircle2, MapPin, Calendar, Hash, Sparkles, Building2 } from 'lucide-react';

export default function WhoWeAre() {
  const { openRegModal } = useModal();
  const { isHindi } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-[#fcfdfc] border-b border-gray-100" id="who-we-are">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CENTERED Header & Narrative */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-14 sm:mb-18">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200/80 shadow-2xs mx-auto">
            <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
            <span>
              {isHindi ? 'खंड क • संस्था परिचय एवं ट्रस्ट संकल्प' : 'Section A • Trust Identity & Mission'}
            </span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight font-serif text-center">
            {isHindi ? (
              <>२००६ से निरंतर <span className="text-[#0b5e34]">मानव कल्याण</span> हेतु समर्पित एक वैधानिक चैरिटेबल ट्रस्ट</>
            ) : (
              <>A Registered Charitable Trust Dedicated to <span className="text-[#0b5e34]">Manav Kalyan</span> Since 2006</>
            )}
          </h2>

          <p className="text-[#ea580c] font-serif text-lg sm:text-xl font-bold leading-relaxed text-center">
            सेवा ही संकल्प, सुधार ही हमारा लक्ष्य • संघे शक्ति कलियुगे
          </p>

          <div className="max-w-3xl mx-auto space-y-3.5 text-gray-700 text-base sm:text-lg leading-relaxed text-center pt-2">
            {isHindi ? (
              <>
                <p>
                  <strong>पृथ्वीवासी सेवा और सुधार संगठन</strong> की नींव २००६ में एक धरातलीय मानवीय सेवा अभियान के रूप में रखी गई, जिसका आरंभ लावारिस शवों के ससम्मान अंतिम संस्कार और असहायों की सेवा से हुआ। २७ सितम्बर २००८ को इसे रांची, झारखण्ड में एक पब्लिक चैरिटेबल ट्रस्ट (पंजीकरण संख्या: <strong>19317/2344</strong>) के रूप में विधिवत पंजीकृत किया गया।
                </p>
                <p>
                  विगत दो दशकों से हमारा संगठन सुदूर वनवासी व ग्रामीण क्षेत्रों में शिक्षा, स्वास्थ्य, गो-संरक्षण, वृद्धजन सेवा, अन्नदान एवं पर्यावरण संरक्षण के क्षेत्र में पूरी निष्ठा व पारदर्शिता से निरंतर कार्य कर रहा है।
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Prithiviwasi Seva aur Sudhar Sangathan</strong> was founded in 2006 as a grassroots humanitarian mission, initiated with the solemn cremation of unclaimed bodies and community relief. On <strong>September 27, 2008</strong>, it was formally incorporated as a Public Charitable Trust in Ranchi, Jharkhand (Registration No. <strong>19317/2344</strong>).
                </p>
                <p>
                  For nearly two decades, our trust has worked on the ground to empower marginalized tribal families, provide outdoor nature education through <em>"Siksha on Trees"</em>, plant tens of thousands of indigenous trees, and protect vulnerable forest communities.
                </p>
              </>
            )}
          </div>
        </div>

        {/* CENTERED Core Values 4-Card Grid with Generous Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto my-12 sm:my-16">
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs hover:border-[#15803d] hover:shadow-md transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0b5e34] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2 font-serif">
              {isHindi ? 'सर्वोपरि मानव कल्याण' : 'Manav Kalyan First'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'हर असहाय व्यक्ति के भोजन, स्वास्थ्य, शिक्षा और मानवीय गरिमा की रक्षा हेतु समर्पित सेवा।'
                : 'Holistic human development, healthcare, and equal opportunity for every village family.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs hover:border-[#15803d] hover:shadow-md transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0b5e34] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2 font-serif">
              {isHindi ? 'प्रकृति वंदन व पर्यावरण' : 'Ecological Stewardship'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'सघन पौधरोपण, जल संरक्षण और प्राकृतिक जीवन शैली को बढ़ावा देकर धरती माता की सेवा।'
                : 'Revering Mother Nature (Prakriti Vandan) through dense afforestation and water rejuvenation.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs hover:border-[#15803d] hover:shadow-md transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0b5e34] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2 font-serif">
              {isHindi ? 'जनजातीय व ग्रामीण उत्थान' : 'Tribal & Rural Roots'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'झारखण्ड के अंतिम गांव और वनवासी परिवार तक सीधी सहायता, शिक्षा और रोजगार के साधन।'
                : 'Deep grassroots network directly serving remote forest settlements across Jharkhand.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs hover:border-[#15803d] hover:shadow-md transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0b5e34] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-gray-900 mb-2 font-serif">
              {isHindi ? 'संस्कार व चरित्र निर्माण' : 'Sanskar & Character'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {isHindi
                ? 'आने वाली पीढ़ियों को व्यसनमुक्त, संस्कारी, साहसी और राष्ट्र-समर्पित नागरिक बनाना।'
                : 'Instilling ancestral ethics, youth discipline, and community self-reliance.'}
            </p>
          </div>
        </div>

        {/* CENTERED Official Trust Credentials Card with Generous Margins */}
        <div className="max-w-3xl mx-auto my-12 sm:my-16">
          <div className="rounded-3xl bg-white border border-gray-200 border-t-4 border-t-[#ea580c] p-8 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header Centered */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 mb-6 border-b border-gray-100 relative z-10 text-center sm:text-left">
              <img
                src="/assets/logo.png"
                alt="पृथ्वीवासी"
                className="w-18 h-18 sm:w-20 sm:h-20 object-contain rounded-2xl bg-[#f4f9f6] p-2 border border-emerald-200 shadow-xs shrink-0"
              />
              <div>
                <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#0b5e34] mb-1.5">
                  {isHindi ? 'पब्लिक चैरिटेबल ट्रस्ट' : 'Public Charitable Trust'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight font-serif">
                  Prithiviwasi Seva aur Sudhar Sangathan
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0b5e34] mt-1">
                  {isHindi ? 'भारतीय ट्रस्ट अधिनियम के अंतर्गत पंजीकृत • स्थापना वर्ष २००६' : 'Registered Under Indian Trusts Act • Estd. 2006'}
                </p>
              </div>
            </div>

            {/* Statutory Data Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 relative z-10 text-sm mb-6">
              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-emerald-100/80 text-center">
                <span className="flex items-center justify-center gap-1.5 text-gray-600 text-xs font-semibold mb-1">
                  <Calendar className="w-4 h-4 text-[#0b5e34]" />
                  {isHindi ? 'पंजीकरण तिथि' : 'Registration Date'}
                </span>
                <span className="font-bold text-[#0b5e34] text-base">27/09/2008</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-emerald-100/80 text-center">
                <span className="flex items-center justify-center gap-1.5 text-gray-600 text-xs font-semibold mb-1">
                  <MapPin className="w-4 h-4 text-[#0b5e34]" />
                  {isHindi ? 'पंजीकरण स्थान' : 'Place'}
                </span>
                <span className="font-bold text-gray-900 text-base">Ranchi, Jharkhand</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
                <span className="flex items-center justify-center gap-1.5 text-gray-700 text-xs font-semibold mb-1">
                  <Hash className="w-4 h-4 text-[#0b5e34]" />
                  {isHindi ? 'पंजीकरण संख्या' : 'Registration No.'}
                </span>
                <span className="font-mono font-black text-[#0b5e34] text-base">
                  19317/2344
                </span>
              </div>
            </div>

            {/* Mission Charter Box */}
            <div className="p-5 rounded-2xl bg-[#eef7f2] border border-emerald-200 text-center sm:text-left relative z-10">
              <span className="text-xs font-bold text-[#0b5e34] uppercase tracking-wider block mb-1.5">
                {isHindi ? 'मूल संस्थापना उद्देश्य' : 'Foundational Mission Charter'}
              </span>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {isHindi
                  ? 'जाति, पंथ अथवा लिंग के किसी भी भेदभाव के बिना समाज के निर्धन, असहाय व वनवासी परिवारों का सर्वांगीण उत्थान, लावारिस शवों का अंतिम संस्कार, गो-संरक्षण, पर्यावरण चेतना एवं नैतिक संस्कारों का प्रसार।'
                  : 'Dedicated to social upliftment, education of forest-dwelling children, tree planting, clean water supply, and moral character building without discrimination of caste, creed, or gender.'}
              </p>
            </div>

            {/* Centered Button */}
            <div className="mt-7 pt-5 border-t border-gray-100 text-center">
              <button
                onClick={() => openRegModal('prithiviwasi')}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#0b5e34] hover:bg-[#073d22] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span>
                  {isHindi
                    ? 'विधिक ट्रस्ट प्रमाण पत्र एवं सम्पूर्ण पंजीकरण विवरण देखें ↗'
                    : 'Verify Trust Deed & Legal Registry (19317/2344) ↗'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
