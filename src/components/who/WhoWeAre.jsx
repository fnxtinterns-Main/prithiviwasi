import React from 'react';
import { useModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Heart, Award, CheckCircle2, MapPin, Calendar, Hash, Sparkles, Building2 } from 'lucide-react';
import womensPowerImg from '../../assets/womens_power.jpg';
import youthPowerImg from '../../assets/youth_power.jpg';

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

        {/* ======================================================== */}
        {/* DEDICATED SECTION: WOMEN'S POWER & YOUTH POWER           */}
        {/* ======================================================== */}
        <div className="my-16 sm:my-20">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#0b5e34] border border-emerald-200 shadow-2xs mx-auto">
              <Sparkles className="w-4 h-4 text-[#0b5e34]" />
              <span>
                {isHindi
                  ? 'राष्ट्र निर्माण के दो मुख्य स्तंभ'
                  : 'Two Pillars of Nation Building'}
              </span>
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight font-serif">
              {isHindi ? (
                <>
                  <span className="text-[#ea580c]">महिला शक्ति</span> एवं{' '}
                  <span className="text-[#0b5e34]">युवा शक्ति</span> का सशक्तिकरण
                </>
              ) : (
                <>
                  Empowering <span className="text-[#ea580c]">Women's Power</span> &amp;{' '}
                  <span className="text-[#0b5e34]">Youth Power</span>
                </>
              )}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-2xl mx-auto">
              {isHindi
                ? 'सशक्त नारी, जाग्रत युवा — आत्मनिर्भर, संस्कारित व समृद्ध भारत की आधारशिला।'
                : 'Empowered women, awakened youth — the bedrock of a self-reliant and resilient nation.'}
            </p>
          </div>

          {/* Equal Importance 2-Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* CARD A: WOMEN'S POWER (महिला शक्ति) */}
            <div className="group rounded-3xl bg-white border border-rose-100 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300 overflow-hidden flex flex-col">
              {/* Image Container with Badge */}
              <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden bg-rose-50">
                <img
                  src={womensPowerImg}
                  alt={isHindi ? 'महिला शक्ति' : "Women's Power"}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-rose-800 backdrop-blur-xs shadow-md">
                    <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                    <span>{isHindi ? 'मातृशक्ति वंदन' : "Women's Empowerment"}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-serif text-xs sm:text-sm font-semibold tracking-wide text-rose-100 italic">
                    {isHindi
                      ? '“यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः”'
                      : '"Where women are honored, divinity blossoms"'}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                      {isHindi ? 'आत्मनिर्भरता एवं स्वावलंबन' : 'Leadership & Independence'}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 font-serif mb-3">
                    {isHindi ? 'महिला शक्ति (Women\'s Power)' : 'Women\'s Power & Leadership'}
                  </h4>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {isHindi
                      ? 'ग्रामीण व वनवासी महिलाओं को सशक्त, आत्मविश्वासी और आत्मनिर्भर बनाना हमारे संगठन का प्रमुख उद्देश्य है। शिक्षा, स्वास्थ्य और आजीविका के माध्यम से महिलाएं समाज व राष्ट्र निर्माण में अग्रणी भूमिका निभा रही हैं।'
                      : 'Nurturing self-reliance, confidence, and leadership among rural and tribal women. Through education, vocational mastery, and maternal care, women actively spearhead community transformation.'}
                  </p>
                </div>

                {/* Key Highlights Bullet List */}
                <div className="space-y-3 pt-4 border-t border-rose-50 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>{isHindi ? 'सशक्तिकरण एवं नेतृत्व:' : 'Empowerment & Leadership:'}</strong>{' '}
                      {isHindi
                        ? 'पंचायतों और ग्रामीण विकास निर्णयों में महिलाओं की समान भागीदारी और नेतृत्व क्षमता का विकास।'
                        : 'Fostering equal participation and leadership in local community governance.'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>{isHindi ? 'शिक्षा एवं जागरूकता:' : 'Education & Awareness:'}</strong>{' '}
                      {isHindi
                        ? 'बालिका शिक्षा, पोषण, स्वच्छता एवं विधिक अधिकारों के प्रति जागरूकता अभियान।'
                        : 'Comprehensive girl child education, healthcare awareness, and legal literacy.'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>{isHindi ? 'स्वरोजगार व स्वावलंबन:' : 'Vocational Self-Reliance:'}</strong>{' '}
                      {isHindi
                        ? 'हस्तशिल्प, लघु उद्योग और कौशल प्रशिक्षण से माताओं-बहनों को आर्थिक रूप से आत्मनिर्भर बनाना।'
                        : 'Skill training and cottage entrepreneurship for financial self-reliance.'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>{isHindi ? 'राष्ट्र निर्माण में योगदान:' : 'Nation Building:'}</strong>{' '}
                      {isHindi
                        ? 'परिवार के संस्कारों से लेकर समाज की प्रगति में महिलाओं के अमूल्य योगदान का सम्मान।'
                        : 'Honoring and amplifying women’s indispensable contribution to our shared future.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD B: YOUTH POWER (युवा शक्ति) */}
            <div className="group rounded-3xl bg-white border border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 overflow-hidden flex flex-col">
              {/* Image Container with Badge */}
              <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden bg-emerald-50">
                <img
                  src={youthPowerImg}
                  alt={isHindi ? 'युवा शक्ति' : "Youth Power"}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-emerald-800 backdrop-blur-xs shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isHindi ? 'जाग्रत युवा' : "Youth Leadership"}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-serif text-xs sm:text-sm font-semibold tracking-wide text-emerald-100 italic">
                    {isHindi
                      ? '“उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत”'
                      : '"Arise, awake, and stop not till the goal is reached"'}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      {isHindi ? 'ऊर्जा, नवाचार एवं संस्कार' : 'Innovation & Social Service'}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 font-serif mb-3">
                    {isHindi ? 'युवा शक्ति (Youth Power)' : 'Youth Power & Innovation'}
                  </h4>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {isHindi
                      ? 'युवा पीढ़ी ही राष्ट्र के नव-निर्माण की सबसे बड़ी प्रेरक शक्ति है। संगठन युवाओं को व्यसनमुक्त जीवन, आधुनिक कौशल, नैतिक संस्कार और पर्यावरण संरक्षण के कार्यों से जोड़कर राष्ट्र सेवा हेतु तैयार करता है।'
                      : 'Channeling youth energy into constructive nation-building. Inspiring young citizens through addiction-free living, technological skills, civic responsibility, and environmental activism.'}
                  </p>
                </div>

                {/* Key Highlights Bullet List */}
                <div className="space-y-3 pt-4 border-t border-emerald-50 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>{isHindi ? 'नेतृत्व एवं सहभागिता:' : 'Youth Leadership:'}</strong>{' '}
                      {isHindi
                        ? 'ग्राम उत्थान, आपदा राहत और सामाजिक सुधार में युवाओं का अग्रिम पंक्ति में नेतृत्व।'
                        : 'Equipping youth to lead frontline village transformation and civic relief efforts.'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>{isHindi ? 'शिक्षा, कौशल व नवाचार:' : 'Skills & Innovation:'}</strong>{' '}
                      {isHindi
                        ? 'आधुनिक तकनीकी ज्ञान, सौर ऊर्जा, पर्यावरण विज्ञान और स्वरोजगार कौशल प्रशिक्षण।'
                        : 'Imparting practical skills in clean solar technology, digital learning, and green trades.'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>{isHindi ? 'पर्यावरण संरक्षण में योगदान:' : 'Eco-Protection Action:'}</strong>{' '}
                      {isHindi
                        ? 'सघन वृक्षारोपण, जल स्रोत पुनर्जीवन एवं एकल-उपयोग प्लास्टिक मुक्ति का महा-अभियान।'
                        : 'Active stewardship in native afforestation, water body restoration, and plastic cleanup.'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong>{isHindi ? 'सामाजिक दायित्व व चरित्र:' : 'Character & Ethics:'}</strong>{' '}
                      {isHindi
                        ? 'संस्कारित, नशामुक्त और राष्ट्र-प्रथम की भावना से ओतप्रोत जिम्मेदार युवा नागरिक तैयार करना।'
                        : 'Cultivating ethical character, nation-first commitment, and substance-free lifestyle.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
