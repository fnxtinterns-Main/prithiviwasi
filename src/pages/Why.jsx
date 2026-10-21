import React from 'react';
import SectionHeading from '../components/common/SectionHeading';
import { useLanguage } from '../context/LanguageContext';

export default function Why() {
  const { isHindi } = useLanguage();

  const whyPointsEn = [
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
    {
      title: 'Quality Education',
      desc: 'Access to inclusive and quality education helps children and communities develop knowledge, practical skills, environmental awareness, and opportunities for a better future.',
      stat: 'SDG 4: Quality Education',
    },
    {
      title: 'Gender Equality',
      desc: 'Equal opportunities for women and girls strengthen families and communities. Education, healthcare access, safety, and participation help build a fairer society.',
      stat: 'SDG 5: Gender Equality',
    },
    {
      title: 'Clean Water and Sanitation',
      desc: 'Safe drinking water, sanitation facilities, and responsible water management are essential for public health, dignity, and sustainable rural development.',
      stat: 'SDG 6: Clean Water and Sanitation',
    },
    {
      title: 'Affordable and Clean Energy',
      desc: 'Promoting renewable energy and energy-efficient practices can reduce pollution, improve energy access, and support sustainable development in underserved communities.',
      stat: 'SDG 7: Affordable and Clean Energy',
    },
    {
      title: 'Decent Work and Economic Growth',
      desc: 'Skill development, fair employment, and support for local livelihoods help families improve their economic stability while encouraging responsible growth.',
      stat: 'SDG 8: Decent Work and Economic Growth',
    },
    {
      title: 'Industry, Innovation and Infrastructure',
      desc: 'Reliable infrastructure, appropriate technology, and sustainable innovation can improve access to essential services and create solutions to local challenges.',
      stat: 'SDG 9: Industry, Innovation and Infrastructure',
    },
    {
      title: 'Reduced Inequalities',
      desc: 'People from marginalized communities need fair access to education, healthcare, opportunities, and public services regardless of their social or economic background.',
      stat: 'SDG 10: Reduced Inequalities',
    },
    {
      title: 'Sustainable Cities and Communities',
      desc: 'Cleaner surroundings, accessible public spaces, green areas, and resilient infrastructure help make villages and cities healthier and more sustainable.',
      stat: 'SDG 11: Sustainable Cities and Communities',
    },
    {
      title: 'Responsible Consumption and Production',
      desc: 'Reducing waste, reusing materials, conserving natural resources, and adopting responsible consumption habits help protect the environment for future generations.',
      stat: 'SDG 12: Responsible Consumption and Production',
    },
    {
      title: 'Climate Action',
      desc: 'Tree plantation, ecosystem restoration, climate awareness, and sustainable practices can contribute to climate resilience and help communities prepare for environmental change.',
      stat: 'SDG 13: Climate Action',
    },
    {
      title: 'Life Below Water',
      desc: 'Protecting rivers, lakes, and other aquatic ecosystems from pollution helps conserve biodiversity and maintain the natural resources on which communities depend.',
      stat: 'SDG 14: Life Below Water',
    },
    {
      title: 'Life on Land',
      desc: 'Protecting forests, restoring degraded land, conserving biodiversity, and planting suitable native trees support healthier ecosystems and wildlife habitats.',
      stat: 'SDG 15: Life on Land',
    },
    {
      title: 'Peace, Justice and Strong Institutions',
      desc: 'Transparent governance, equal access to justice, community participation, and accountable institutions help build trust and support inclusive social development.',
      stat: 'SDG 16: Peace, Justice and Strong Institutions',
    },
    {
      title: 'Partnerships for the Goals',
      desc: 'Collaboration between communities, educational institutions, volunteers, government bodies, and responsible organizations can help expand the impact of sustainable development initiatives.',
      stat: 'SDG 17: Partnerships for the Goals',
    },
  ];

  const whyPointsHi = [
    {
      title: 'तीव्र होता पर्यावरणीय संकट',
      desc: 'पूर्वी भारत में भूजल स्तर तेजी से गिर रहा है, जबकि मिट्टी का क्षरण और अनियमित वर्षा ग्रामीण खाद्य सुरक्षा के लिए गंभीर खतरा बन चुकी है। सघन देशी वृक्षारोपण ही एकमात्र प्राकृतिक सुरक्षा ढाल है।',
      stat: 'भारत के ५४% से अधिक क्षेत्र में गंभीर जल संकट',
    },
    {
      title: 'हाशिए पर खड़े वनवासी एवं खनन क्षेत्र समुदाय',
      desc: 'खनिज उत्खनन क्षेत्रों के निकट रहने वाले ग्रामीण न्यूनतम बुनियादी सुविधाओं के साथ औद्योगिक प्रदूषण का भारी दंश झेलते हैं। लक्षित स्वास्थ्य जांच, सुरक्षा किट और स्वच्छ जल शुद्धिकरण अनमोल जीवन बचाते हैं।',
      stat: 'औद्योगिक धूल व प्रदूषण से लाखों लोग प्रभावित',
    },
    {
      title: 'संस्कार एवं पर्यावरण शिक्षा का अभाव',
      desc: 'पारंपरिक शिक्षा पद्धति में अक्सर पर्यावरण चेतना और नैतिक संस्कारों का अभाव रहता है। "पेड़ों की छांव में शिक्षा" (Siksha on Trees) बच्चों में बौद्धिक विकास के साथ प्रकृति वंदन का भाव जागृत करती है।',
      stat: 'प्राकृतिक परिवेश में सीखने से स्मरण शक्ति ३०% बढ़ती है',
    },
    {
      title: 'गुणवत्तापूर्ण एवं संस्कारयुक्त शिक्षा',
      desc: 'ग्रामीण व निर्धन बच्चों को समावेशी व व्यावहारिक शिक्षा उपलब्ध कराकर उन्हें आत्मनिर्भर बनाना तथा प्रकृति के प्रति उनकी जिम्मेदारी का बोध कराना।',
      stat: 'एसडीजी ४: गुणवत्तापूर्ण शिक्षा',
    },
    {
      title: 'लैंगिक समानता एवं मातृशक्ति सम्मान',
      desc: 'ग्रामीण मातृशक्ति को समान अधिकार, स्वास्थ्य सुरक्षा और स्वरोजगार के अवसर प्रदान कर आत्मनिर्भर व सशक्त बनाना।',
      stat: 'एसडीजी ५: लैंगिक समानता',
    },
    {
      title: 'स्वच्छ जल एवं स्वच्छता अभियान',
      desc: 'प्रत्येक गांव व बस्ती में सुरक्षित पेयजल, शौचालय सुविधा और पारंपरिक जल स्रोतों का संरक्षण जनस्वास्थ्य के लिए अनिवार्य है।',
      stat: 'एसडीजी ६: स्वच्छ जल एवं स्वच्छता',
    },
    {
      title: 'सस्ती एवं पर्यावरण-अनुकूल स्वच्छ ऊर्जा',
      desc: 'सुदूर वनवासी बस्तियों में सौर ऊर्जा संयंत्रों को बढ़ावा देकर प्रदूषण कम करना और ऊर्जा की निर्भरता सुनिश्चित करना।',
      stat: 'एसडीजी ७: किफायती एवं स्वच्छ ऊर्जा',
    },
    {
      title: 'सम्मानजनक आजीविका एवं आर्थिक प्रगति',
      desc: 'ग्रामीण युवाओं और महिलाओं को कौशल प्रशिक्षण देकर स्थानीय स्तर पर ही स्वावलंबी बनाना और पलायन रोकना।',
      stat: 'एसडीजी ८: सम्मानजनक कार्य एवं आर्थिक वृद्धि',
    },
    {
      title: 'उद्योग, नवाचार एवं स्थानीय बुनियादी ढांचा',
      desc: 'पर्यावरण-अनुकूल स्थानीय तकनीक, नवाचार और मजबूत ग्रामीण बुनियादी ढांचे का विकास जिससे जनजीवन सरल बने।',
      stat: 'एसडीजी ९: उद्योग, नवाचार एवं बुनियादी ढांचा',
    },
    {
      title: 'सामाजिक असमानता में कमी',
      desc: 'दिव्यांगजनों, वनवासियों और आर्थिक रूप से कमजोर परिवारों को समाज की मुख्यधारा में सम्मानजनक स्थान दिलाना।',
      stat: 'एसडीजी १०: असमानता में कमी',
    },
    {
      title: 'टिकाऊ, स्वच्छ एवं आत्मनिर्भर समुदाय',
      desc: 'स्वच्छ गांव, हरित परिसर और सुरक्षित सामुदायिक स्थल बनाकर भावी पीढ़ियों के लिए आदर्श पर्यावरण तैयार करना।',
      stat: 'एसडीजी ११: टिकाऊ समुदाय एवं ग्राम',
    },
    {
      title: 'जिम्मेदार उपभोग एवं प्राकृतिक संतुलन',
      desc: 'कचरा प्रबंधन, प्लास्टिक निषेध और प्राकृतिक संसाधनों के विवेकपूर्ण उपयोग की आदतें जन-जन में विकसित करना।',
      stat: 'एसडीजी १२: जिम्मेदार उपभोग एवं उत्पादन',
    },
    {
      title: 'जलवायु परिवर्तन पर ठोस धरातलीय कदम',
      desc: 'व्यापक स्तर पर पीपल, बरगद, नीम जैसे प्राणवायु देने वाले वृक्षों का रोपण और पर्यावरण संरक्षण का जनजागरण।',
      stat: 'एसडीजी १३: जलवायु परिवर्तन पर कार्यवाही',
    },
    {
      title: 'जलीय पारिस्थितिकी एवं जलजीव संरक्षण',
      desc: 'नदियों, प्राकृतिक जलप्रपातों और तालाबों को प्रदूषण से मुक्त रखना तथा जलीय जैव विविधता की रक्षा करना।',
      stat: 'एसडीजी १४: जलीय जीवन का संरक्षण',
    },
    {
      title: 'भूमि, वन संपदा एवं गोवंश संरक्षण',
      desc: 'पवित्र गोवंश की रक्षा, गौशाला संचालन, वनों की अवैध कटाई की रोकथाम और बंजर भूमि पर हरियाली का विस्तार।',
      stat: 'एसडीजी १५: भूमि पर जीवन एवं गौ संरक्षण',
    },
    {
      title: 'शांति, न्याय एवं सुदृढ़ सामाजिक संस्थाएं',
      desc: 'पारदर्शी ट्रस्ट प्रबंधन, सत्यनिष्ठा और असहायों को विधिक सहायता व संरक्षण प्रदान कर सामाजिक न्याय सुदृढ़ करना।',
      stat: 'एसडीजी १६: शांति, न्याय एवं मजबूत संस्थाएं',
    },
    {
      title: 'सत्कार्यों हेतु सामूहिक भागीदारी व साझेदारी',
      desc: 'समस्त सामाजिक संगठनों, शिक्षण संस्थानों और जागरूक नागरिकों को एकजुट कर राष्ट्र एवं प्रकृति सेवा का महाअभियान चलाना।',
      stat: 'एसडीजी १७: जन-भागीदारी एवं सहयोग',
    },
  ];

  const whyPoints = isHindi ? whyPointsHi : whyPointsEn;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fcfdfc]">
      {/* Hero Banner */}
      <section className="relative flex w-full items-center justify-center overflow-hidden border-b-4 border-[#ea580c] bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] px-4 py-12 text-center text-white shadow-md sm:px-6 sm:py-16 lg:px-8">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-3 text-center">
          <span className="mb-1 inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/35 bg-orange-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200 shadow-sm">
            {isHindi ? 'उद्देश्य एवं अनिवार्य आवश्यकता' : 'The Rationale & Urgent Need'}
          </span>

          <h1 className="m-0 w-full text-center font-serif text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {isHindi ? 'यह क्यों आवश्यक है?' : 'Why It Matters'}
          </h1>

          <p className="m-0 w-full text-center font-serif text-lg font-bold leading-relaxed text-amber-300 sm:text-xl">
            {isHindi ? 'पृथ्वी का कर्ज कब चुकाओगे? • हमारा उद्देश्य एवं आवश्यकता' : 'पृथ्वी का कर्ज कब चुकाओगे? • Why It Matters'}
          </p>

          <div className="my-2 h-1 w-20 shrink-0 rounded-full bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e]" />

          <p className="m-0 mx-auto w-full max-w-3xl text-center text-sm leading-relaxed text-emerald-100/90 sm:text-base">
            {isHindi
              ? 'मानव कल्याण, पर्यावरण पुनर्जीवन, गो-संरक्षण और भावी पीढ़ी में संस्कारों का बीजारोपण आज क्यों सर्वाधिक आवश्यक है।'
              : 'Understanding why human development, environmental rejuvenation, and cultural character building are urgently needed today.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        {/* Centered Section Heading */}
        <section className="mx-auto mb-8 flex w-full flex-col items-center text-center">
          <div className="w-full text-center [&_*]:text-center">
            <SectionHeading
              badge={isHindi ? 'वर्तमान आवश्यकता' : 'The Need'}
              title={isHindi ? 'यह सेवा कार्य आज सबसे अधिक महत्वपूर्ण क्यों है?' : 'Why This Work Matters More Than Ever'}
              subtitle={isHindi ? 'पर्यावरणीय संकट, ग्रामीण धरातल की चुनौतियां और भावी पीढ़ियों के प्रति हमारा साझा उत्तरदायित्व।' : 'A breakdown of ecological urgency, rural realities, and our shared responsibility toward future generations.'}
              align="center"
            />
          </div>
        </section>

        {/* Centered Factors Grid */}
        <div className="mx-auto mb-12 grid w-full max-w-[1500px] grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((item, idx) => (
            <article
              key={item.title}
              className="group flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 border-t-4 border-t-[#0b5e34] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#15803d] hover:shadow-lg sm:p-6"
            >
              <div>
                <span className="mb-2 block text-xs font-mono font-bold uppercase tracking-widest text-[#ea580c]">
                  {isHindi ? `प्रमुख बिंदु ${String(idx + 1).padStart(2, '0')}` : `Factor ${String(idx + 1).padStart(2, '0')}`}
                </span>

                <h3 className="mb-3 break-words font-serif text-lg font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-[#0b5e34]">
                  {item.title}
                </h3>

                <p className="mb-5 break-words text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>

              <div className="mt-auto border-t border-gray-100 pt-4">
                <span className="block whitespace-normal break-words rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-center text-xs font-bold leading-relaxed text-[#0b5e34]">
                  {item.stat}
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
