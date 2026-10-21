import React from 'react';
import SectionHeading from '../components/common/SectionHeading';
import programsData from '../data/programs.json';
import { useLanguage } from '../context/LanguageContext';

const sdgGoals = [
  {
    id: 1,
    title: 'No Poverty',
    image: '/assets/sdg-1-no-poverty.png',
    description: 'End poverty in all its forms by improving access to essential services, social protection and sustainable livelihood opportunities.',
    pillars: ['Social Protection', 'Basic Services', 'Economic Opportunities'],
    color: '#E5243B',
  },
  {
    id: 2,
    title: 'Zero Hunger',
    image: '/assets/sdg-2-zero-hunger.png',
    description: 'Improve food security and nutrition while supporting sustainable agriculture and access to nutritious food.',
    pillars: ['Food Security', 'Better Nutrition', 'Sustainable Agriculture'],
    color: '#DDA63A',
  },
  {
    id: 3,
    title: 'Good Health and Well-being',
    image: '/assets/sdg-3-good-health.png',
    description: 'Promote healthy lives through accessible healthcare, disease prevention and community well-being.',
    pillars: ['Healthcare Access', 'Disease Prevention', 'Well-being'],
    color: '#4C9F38',
  },
  {
    id: 4,
    title: 'Quality Education',
    image: '/assets/sdg-4-quality-education.png',
    description: 'Ensure inclusive and equitable quality education and lifelong learning opportunities for all.',
    pillars: ['Education Access', 'Learning Outcomes', 'Lifelong Learning'],
    color: '#C5192D',
  },
  {
    id: 5,
    title: 'Gender Equality',
    image: '/assets/sdg-5-gender-equality.png',
    description: 'Promote equal rights, women’s empowerment and opportunities for women and girls.',
    pillars: ['Equal Rights', 'Women’s Empowerment', 'Equal Opportunities'],
    color: '#FF3A21',
  },
  {
    id: 6,
    title: 'Clean Water and Sanitation',
    image: '/assets/sdg-6-clean-water.png',
    description: 'Improve access to safe drinking water, sanitation and sustainable water management.',
    pillars: ['Safe Drinking Water', 'Sanitation', 'Water Conservation'],
    color: '#26BDE2',
  },
  {
    id: 7,
    title: 'Affordable and Clean Energy',
    image: '/assets/sdg-7-clean-energy.png',
    description: 'Expand access to affordable, reliable and sustainable energy, including renewable energy.',
    pillars: ['Energy Access', 'Renewable Energy', 'Energy Efficiency'],
    color: '#FCC30B',
  },
  {
    id: 8,
    title: 'Decent Work and Economic Growth',
    image: '/assets/sdg-8-decent-work.png',
    description: 'Support inclusive economic growth, productive employment and decent work for all.',
    pillars: ['Employment', 'Worker Protection', 'Local Enterprise'],
    color: '#A21942',
  },
  {
    id: 9,
    title: 'Industry, Innovation and Infrastructure',
    image: '/assets/sdg-9-industry-innovation.png.jpeg',
    description: 'Build resilient infrastructure and support sustainable industry, innovation and technology.',
    pillars: ['Resilient Infrastructure', 'Innovation', 'Sustainable Industry'],
    color: '#FD6925',
  },
  {
    id: 10,
    title: 'Reduced Inequalities',
    image: '/assets/sdg-10-reduced-inequalities.png',
    description: 'Advance social inclusion and equal opportunities for disadvantaged and marginalized groups.',
    pillars: ['Social Inclusion', 'Equal Opportunity', 'Accessibility'],
    color: '#DD1367',
  },
  {
    id: 11,
    title: 'Sustainable Cities and Communities',
    image: '/assets/sdg-11-sustainable-cities.png',
    description: 'Create inclusive, safe and resilient communities through sustainable planning and local development.',
    pillars: ['Safe Communities', 'Sustainable Planning', 'Disaster Resilience'],
    color: '#FD9D24',
  },
  {
    id: 12,
    title: 'Responsible Consumption and Production',
    image: '/assets/sdg-12-responsible-consumption.png',
    description: 'Reduce waste and pollution through resource efficiency, reuse and responsible production.',
    pillars: ['Waste Reduction', 'Resource Efficiency', 'Responsible Production'],
    color: '#BF8B2E',
  },
  {
    id: 13,
    title: 'Climate Action',
    image: '/assets/sdg-13-climate-action.png',
    description: 'Strengthen climate resilience through awareness, environmental protection and local climate action.',
    pillars: ['Climate Resilience', 'Climate Awareness', 'Emission Reduction'],
    color: '#3F7E44',
  },
  {
    id: 14,
    title: 'Life Below Water',
    image: '/assets/sdg-14-life-below-water.png',
    description: 'Protect aquatic ecosystems and reduce water pollution to conserve marine and freshwater resources.',
    pillars: ['Water Pollution Control', 'Aquatic Conservation', 'Healthy Ecosystems'],
    color: '#0A97D9',
  },
  {
    id: 15,
    title: 'Life on Land',
    image: '/assets/sdg-15-life-on-land.png',
    description: 'Protect forests and biodiversity, restore degraded land and promote sustainable land management.',
    pillars: ['Afforestation', 'Biodiversity', 'Land Restoration'],
    color: '#56C02B',
  },
  {
    id: 16,
    title: 'Peace, Justice and Strong Institutions',
    image: '/assets/sdg-16-peace-justice.png',
    description: 'Promote peaceful communities, access to justice, transparency and accountable institutions.',
    pillars: ['Access to Justice', 'Transparency', 'Community Participation'],
    color: '#00689D',
  },
  {
    id: 17,
    title: 'Partnerships for the Goals',
    image: '/assets/sdg-17-partnerships.png',
    description: 'Strengthen partnerships among communities and organisations to achieve sustainable development.',
    pillars: ['Community Partnerships', 'Knowledge Sharing', 'Collective Action'],
    color: '#19486A',
  },
];

const sdgTranslationsHi = {
  1: {
    title: 'शून्य गरीबी',
    description: 'बुनियादी सेवाओं, सामाजिक सुरक्षा और आजीविका के अवसरों तक पहुंच बढ़ाकर गरीबी के सभी रूपों को समाप्त करना।',
    pillars: ['सामाजिक सुरक्षा', 'मूलभूत सेवाएं', 'आर्थिक अवसर'],
  },
  2: {
    title: 'भुखमरी से मुक्ति',
    description: 'खाद्य सुरक्षा और पोषण में सुधार के साथ टिकाऊ कृषि और पौष्टिक भोजन तक सबकी पहुंच सुनिश्चित करना।',
    pillars: ['खाद्य सुरक्षा', 'उत्कृष्ट पोषण', 'टिकाऊ कृषि'],
  },
  3: {
    title: 'उत्कृष्ट स्वास्थ्य एवं कल्याण',
    description: 'सुलभ स्वास्थ्य सेवा, रोग निवारण और सामुदायिक कल्याण के माध्यम से सभी के लिए स्वस्थ जीवन को बढ़ावा देना।',
    pillars: ['स्वास्थ्य सेवा पहुंच', 'रोग निवारण', 'सामुदायिक कल्याण'],
  },
  4: {
    title: 'गुणवत्तापूर्ण शिक्षा',
    description: 'सभी के लिए समावेशी, समान व गुणवत्तापूर्ण शिक्षा और पर्यावरण संस्कार आधारित आजीवन सीखने के अवसर।',
    pillars: ['शिक्षा सुलभता', 'सीखने के परिणाम', 'संस्कारयुक्त शिक्षा'],
  },
  5: {
    title: 'लैंगिक समानता',
    description: 'समान अधिकार, महिला सशक्तिकरण और ग्रामीण मातृशक्ति के लिए सम्मानजनक सामाजिक व आर्थिक अवसर।',
    pillars: ['समान अधिकार', 'महिला सशक्तिकरण', 'समान अवसर'],
  },
  6: {
    title: 'स्वच्छ जल एवं स्वच्छता',
    description: 'सुरक्षित पेयजल, स्वच्छता सुविधाएं और ग्रामीण व वनवासी क्षेत्रों में जल संरक्षण व प्रबंधन।',
    pillars: ['सुरक्षित पेयजल', 'स्वच्छता प्रबंधन', 'जल संरक्षण'],
  },
  7: {
    title: 'सस्ती एवं स्वच्छ ऊर्जा',
    description: 'सौर ऊर्जा और नवीकरणीय ऊर्जा स्रोतों के माध्यम से किफायती व पर्यावरण-अनुकूल ऊर्जा का विस्तार।',
    pillars: ['ऊर्जा पहुंच', 'सौर नवीकरणीय ऊर्जा', 'ऊर्जा दक्षता'],
  },
  8: {
    title: 'सम्मानजनक कार्य एवं आर्थिक वृद्धि',
    description: 'कौशल विकास, स्थानीय स्वरोजगार और सुरक्षित आजीविका के साथ समावेशी आर्थिक प्रगति को बढ़ावा देना।',
    pillars: ['स्थानीय रोजगार', 'कामगार सुरक्षा', 'ग्रामीण उद्यम'],
  },
  9: {
    title: 'उद्योग, नवाचार एवं बुनियादी ढांचा',
    description: 'स्थानीय चुनौतियों के समाधान के लिए अनुकूल तकनीक, टिकाऊ नवाचार और मजबूत ग्रामीण बुनियादी ढांचा।',
    pillars: ['टिकाऊ ढांचा', 'पर्यावरण नवाचार', 'अनुकूल तकनीक'],
  },
  10: {
    title: 'असमानता में कमी',
    description: 'दिव्यांगजनों, वनवासियों और हाशिए पर खड़े वर्गों के लिए सामाजिक समावेशन और समान अवसर।',
    pillars: ['सामाजिक समावेशन', 'समान अवसर', 'दिव्यांग सुगमता'],
  },
  11: {
    title: 'टिकाऊ शहर एवं समुदाय',
    description: 'स्वच्छ परिवेश, हरित सार्वजनिक स्थल और सुरक्षित गांवों व शहरों का पर्यावरण-अनुकूल निर्माण।',
    pillars: ['सुरक्षित समुदाय', 'पर्यावरण नियोजन', 'पारंपरिक गांव'],
  },
  12: {
    title: 'जिम्मेदार उपभोग एवं उत्पादन',
    description: 'कचरा न्यूनीकरण, पुनर्चक्रण, प्राकृतिक संसाधनों का संरक्षण और जिम्मेदार उपभोग की आदतें।',
    pillars: ['कचरा प्रबंधन', 'संसाधन दक्षता', 'जिम्मेदार उपभोग'],
  },
  13: {
    title: 'जलवायु परिवर्तन पर कार्यवाही',
    description: 'व्यापक सघन वृक्षारोपण, पर्यावरण जनजागरण और जलवायु संतुलन हेतु प्रत्यक्ष धरातलीय कार्य।',
    pillars: ['जलवायु संतुलन', 'पर्यावरण जागरण', 'हरित आवरण'],
  },
  14: {
    title: 'जल के नीचे जीवन',
    description: 'नदियों, तालाबों और जलीय पारिस्थितिकी तंत्र को प्रदूषण से मुक्त रखना और जलजीवों का संरक्षण।',
    pillars: ['जल प्रदूषण नियंत्रण', 'जलीय संरक्षण', 'स्वस्थ जल निकाय'],
  },
  15: {
    title: 'भूमि पर जीवन (वन एवं वन्यजीव)',
    description: 'वनों की सुरक्षा, बंजर भूमि का पुनरुद्धार, जैव विविधता संरक्षण और देशी प्रजाति के वृक्षों का रोपण।',
    pillars: ['देशी वृक्षारोपण', 'जैव विविधता', 'भू-संरक्षण'],
  },
  16: {
    title: 'शांति, न्याय एवं मजबूत संस्थाएं',
    description: 'पारदर्शी प्रबंधन, अधिकारों के प्रति जागरूकता, सामाजिक समरसता और जवाबदेह संस्थागत कार्यप्रणाली।',
    pillars: ['न्याय व अधिकार', 'पारदर्शिता', 'सामुदायिक सहभागिता'],
  },
  17: {
    title: 'लक्ष्यों हेतु साझेदारी',
    description: 'सामुदायिक संगठनों, युवाओं, शैक्षणिक संस्थानों और सहयोगियों का साझा मंच ताकि बड़ा प्रभाव बन सके।',
    pillars: ['सामुदायिक भागीदारी', 'सहयोगी नेटवर्क', 'सामूहिक प्रयास'],
  },
};

const programTranslationsHi = {
  'coal-mining': {
    title: 'कोयला खनन क्षेत्र सामुदायिक पुनर्वास',
    subtitle: 'औद्योगिक गलियारों में जीवन और हरियाली की पुनर्स्थापना',
    description: 'खुले कोयला खदानों के समीप रहने वाले परिवारों के लिए व्यापक स्वास्थ्य सुरक्षा, ग्रीन बफर जोन और स्वच्छ वैकल्पिक आजीविका।',
    sdgBadges: ['एसडीजी ३: उत्तम स्वास्थ्य', 'एसडीजी ८: सम्मानजनक कार्य', 'एसडीजी १५: भूमि पर जीवन'],
    pillars: ['स्वास्थ्य', 'शिक्षा', 'पर्यावरण'],
  },
  'rural-development': {
    title: 'समग्र ग्रामीण एवं वनवासी विकास',
    subtitle: 'पारंपरिक ग्रामीण पारिस्थितिकी तंत्र का पुनर्जीवन',
    description: 'सौर माइक्रोग्रिड, पारंपरिक तालाब जीर्णोद्धार और जैविक कृषि के माध्यम से आत्मनिर्भर और सशक्त ग्राम अर्थव्यवस्था का निर्माण।',
    sdgBadges: ['एसडीजी ६: स्वच्छ जल', 'एसडीजी ७: स्वच्छ ऊर्जा', 'एसडीजी ११: टिकाऊ समुदाय'],
    pillars: ['ग्राम विकास', 'स्वास्थ्य', 'शिक्षा', 'पर्यावरण'],
  },
  'women-empowerment': {
    title: 'महिला सशक्तिकरण एवं स्वावलंबन',
    subtitle: 'ग्रामीण मातृशक्ति का सम्मान और आर्थिक संबल',
    description: 'आजीविका कौशल केंद्र, कानूनी साक्षरता कार्यशालाएं और मातृ स्वास्थ्य अभियान जिससे ग्रामीण महिलाएं आत्मनिर्भर बन सकें।',
    sdgBadges: ['एसडीजी ५: लैंगिक समानता', 'एसडीजी ८: सम्मानजनक कार्य', 'एसडीजी १०: असमानता में कमी'],
    pillars: ['स्वास्थ्य', 'शिक्षा', 'आजीविका'],
  },
  'handicap-empowerment': {
    title: 'दिव्यांगजन सशक्तिकरण एवं स्वावलंबन',
    subtitle: 'ससम्मान सुगमता, समावेशन एवं आत्मनिर्भरता',
    description: 'सहायक उपकरण वितरण, सुगम्य बुनियादी ढांचा निर्माण और दिव्यांगजनों हेतु विशेष व्यावसायिक कौशल मार्गदर्शन।',
    sdgBadges: ['एसडीजी १०: असमानता में कमी', 'एसडीजी ४: गुणवत्तापूर्ण शिक्षा', 'एसडीजी ११: टिकाऊ समुदाय'],
    pillars: ['स्वास्थ्य', 'शिक्षा', 'सुगमता'],
  },
};

function getProgramImage(title = '') {
  const name = title.toLowerCase();

  if (name.includes('coal mining')) {
    return {
      src: '/assets/sdg-3-8-15.png',
      alt: 'SDG 3, 8 and 15',
    };
  }

  if (name.includes('women empowerment')) {
    return {
      src: '/assets/sdg-5-8-10.png',
      alt: 'SDG 5, 8 and 10',
    };
  }

  if (
    name.includes('holistic rural') ||
    name.includes('tribal development')
  ) {
    return {
      src: '/assets/sdg-6-7-11.png',
      alt: 'SDG 6, 7 and 11',
    };
  }

  if (
    name.includes('divyangjan') ||
    name.includes('differently-abled') ||
    name.includes('differently abled') ||
    name.includes('divyang')
  ) {
    return {
      src: '/assets/sdg-10-4-11.png.jpeg',
      alt: 'SDG 10, 4 and 11',
    };
  }

  return null;
}

function ProgramCard({ prog, isHindi }) {
  const image = getProgramImage(prog.title);
  const hi = programTranslationsHi[prog.id];

  const title = isHindi && hi ? hi.title : prog.title;
  const subtitle = isHindi && hi ? hi.subtitle : prog.subtitle;
  const description = isHindi && hi ? hi.description : prog.description;
  const sdgBadges = isHindi && hi ? hi.sdgBadges : prog.sdgBadges;
  const pillars = isHindi && hi ? hi.pillars : prog.pillars;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 border-t-4 border-t-[#0b5e34] bg-white shadow-sm transition-all duration-300 hover:border-[#15803d] hover:shadow-md">
      <div className="min-w-0 p-4 sm:p-5">
        {image && (
          <div className="float-right mb-2 ml-3 flex h-[48px] w-[145px] shrink-0 items-center justify-end sm:h-[52px] sm:w-[150px]">
            <img
              src={image.src}
              alt={image.alt}
              className="block h-full w-full object-contain object-right"
              loading="lazy"
            />
          </div>
        )}

        <div className="mb-2 flex flex-wrap items-start gap-1.5">
          {(sdgBadges || []).map((badge) => (
            <span
              key={badge}
              className="max-w-full whitespace-normal break-words rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[10px] font-bold leading-snug text-[#ea580c] sm:text-[11px]"
            >
              {badge}
            </span>
          ))}
        </div>

        <h3 className="mb-2 min-w-0 break-words font-serif text-lg font-bold leading-snug text-gray-900 sm:text-xl">
          {title}
        </h3>

        {subtitle && (
          <p className="mb-2 break-words text-xs font-bold leading-relaxed text-[#ea580c] sm:text-sm">
            {subtitle}
          </p>
        )}

        <p className="clear-both break-words text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>

      <div className="border-t border-gray-100 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {(pillars || []).map((pillar) => (
            <span
              key={pillar}
              className="break-words text-xs font-semibold leading-relaxed text-gray-700 sm:text-sm"
            >
              {pillar}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function SDGCard({ goal, isHindi }) {
  const hi = sdgTranslationsHi[goal.id];
  const title = isHindi && hi ? hi.title : goal.title;
  const description = isHindi && hi ? hi.description : goal.description;
  const pillars = isHindi && hi ? hi.pillars : goal.pillars;

  return (
    <article
      className="flex min-w-0 flex-col self-start overflow-hidden rounded-2xl border border-gray-200 border-t-4 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ borderTopColor: goal.color }}
    >
      <div className="p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-bold uppercase leading-snug tracking-wide text-[#ea580c]">
              {isHindi ? `सतत विकास लक्ष्य ${goal.id}` : `Sustainable Development Goal ${goal.id}`}
            </p>

            <h3 className="break-words font-serif text-lg font-bold leading-snug text-gray-900 sm:text-xl">
              {title}
            </h3>
          </div>

          <img
            src={goal.image}
            alt={`SDG ${goal.id}: ${title}`}
            className="h-[68px] w-[68px] shrink-0 rounded-lg object-contain sm:h-[76px] sm:w-[76px]"
            loading="lazy"
            onError={(event) => {
              console.error(
                `SDG ${goal.id} image not found:`,
                event.currentTarget.src
              );
            }}
          />
        </div>

        <p className="mt-3 break-words text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        {/* Pillar names */}
        <div className="mt-3 border-t border-gray-100 pt-3">
          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
            {pillars.map((pillar) => (
              <span
                key={pillar}
                className="max-w-full break-words rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-semibold leading-relaxed text-gray-700"
              >
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function What() {
  const { isHindi } = useLanguage();

  const mainPrograms = programsData.filter(
    (prog) => prog.id !== 'sdg-30-alignment'
  );

  return (
    <div className="what-page min-h-screen w-full bg-[#fcfdfc]">
      {/* Hero Banner */}
      <section className="relative flex w-full justify-center overflow-hidden border-b-4 border-[#ea580c] bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] px-4 py-12 text-center text-white shadow-md sm:px-6 sm:py-16 lg:px-8">
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-3">
          <span className="rounded-full border border-orange-400/35 bg-orange-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">
            {isHindi ? 'प्रभाव क्षेत्र एवं एसडीजी-३० लक्ष्य' : 'Impact Sectors & SDG-30'}
          </span>

          <h1 className="w-full text-center font-serif text-3xl font-black sm:text-4xl lg:text-5xl">
            {isHindi ? 'हमारा कार्य एवं प्रभाव क्षेत्र' : 'What We Do'}
          </h1>

          <p className="text-center font-serif text-lg font-bold text-amber-300 sm:text-xl">
            {isHindi ? 'धरातलीय समाज कल्याण, पर्यावरण संरक्षण एवं पुनर्वास' : 'हमारा कार्य: धरातलीय समाज कल्याण, पर्यावरण संरक्षण एवं पुनर्वास'}
          </p>

          <div className="my-2 h-1 w-20 rounded-full bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e]" />

          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-emerald-100/90 sm:text-base">
            {isHindi
              ? 'हमारे लक्षित विकास कार्यक्रम खनन, ग्रामीण और वनवासी क्षेत्रों में संयुक्त राष्ट्र के सतत विकास लक्ष्यों (एसडीजी-२०३०) के अनुरूप धरातलीय मानवीय सेवा और पर्यावरण संरक्षण सुनिश्चित करते हैं।'
              : 'Our targeted development programs align grassroots action in mining, rural, and tribal areas with the United Nations Sustainable Development Goals (SDG-30).'}
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {/* Main Programs Heading */}
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            badge={isHindi ? 'प्रमुख कार्य क्षेत्र' : 'Focus Areas'}
            title={isHindi ? 'मानव कल्याण एवं पर्यावरणीय आवश्यकताओं हेतु समर्पित कार्यक्रम' : 'Programs Addressing Key Human & Environmental Needs'}
            subtitle={isHindi ? 'स्वास्थ्य, शिक्षा, स्वच्छ जल, गो-संरक्षण और आत्मनिर्भरता प्रदान करने वाले प्रत्यक्ष धरातलीय अभियान।' : 'Direct on-ground interventions delivering healthcare, education, clean water, and self-reliance.'}
            align="center"
          />
        </div>

        {/* Four Main Program Cards */}
        <div className="mx-auto mb-6 grid w-full max-w-7xl grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2">
          {mainPrograms.map((prog) => (
            <ProgramCard key={prog.id} prog={prog} isHindi={isHindi} />
          ))}
        </div>

        {/* SDG 1–17 Heading */}
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            badge={isHindi ? 'संयुक्त राष्ट्र सतत विकास लक्ष्य' : 'United Nations Sustainable Development Goals'}
            title={isHindi ? 'एसडीजी २०३० के प्रति हमारा संकल्प' : 'Our Commitment to SDG 2030'}
            subtitle={isHindi ? 'टिकाऊ सामुदायिक विकास के लिए प्रत्येक लक्ष्य, उसका उद्देश्य और मुख्य स्तंभ।' : 'Explore each goal, its purpose and three key pillars for sustainable community development.'}
            align="center"
          />

          {/* Compact SDG Cards */}
          <div className="mx-auto grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2">
            {sdgGoals.map((goal) => (
              <SDGCard key={goal.id} goal={goal} isHindi={isHindi} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
