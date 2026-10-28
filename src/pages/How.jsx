
import React, { useState } from 'react';
import programsData from '../data/programs.json';
import {
  Heart,
  ClipboardList,
  Users,
  Activity,
  Handshake,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Target,
  Droplets,
  Sun,
  BriefcaseBusiness,
  Recycle,
  Accessibility,
  Utensils,
  HeartPulse,
  Lightbulb,
  Building2,
  Fish,
  ShieldCheck,
  Globe,
  Leaf,
  Sprout,
  GraduationCap,
} from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useLanguage } from '../context/LanguageContext';

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

const executionPlans = {
  'coal-mining': {
    steps: [
      'Assess community needs and identify priority issues.',
      'Coordinate healthcare, environmental and livelihood initiatives.',
      'Work with local communities and partner organizations.',
      'Track completed activities and community outcomes.',
    ],
    outcomes:
      'Improved access to support services, environmental awareness and livelihood opportunities.',
  },
  'rural-development': {
    steps: [
      'Assess village needs, water resources and livelihood challenges.',
      'Prepare community-led water, clean-energy and agriculture plans.',
      'Coordinate restoration and sustainable development activities.',
      'Review progress with residents and identify improvements.',
    ],
    outcomes:
      'Stronger local participation, improved resource management and sustainable rural livelihoods.',
  },
  'women-empowerment': {
    steps: [
      'Identify training needs and barriers faced by local women.',
      'Organize skill development, health awareness and legal literacy activities.',
      'Connect participants with livelihood resources and support networks.',
      'Follow up on participation, skills and livelihood progress.',
    ],
    outcomes:
      'Improved access to skills, awareness, support networks and economic opportunities.',
  },
  'handicap-empowerment': {
    steps: [
      'Identify accessibility barriers and individual support requirements.',
      'Coordinate accessible services and assistive support where available.',
      'Facilitate inclusive vocational training and community participation.',
      'Review accessibility improvements and participant feedback.',
    ],
    outcomes:
      'More inclusive participation, improved accessibility awareness and better access to development opportunities.',
  },
};

const executionPlansHi = {
  'coal-mining': {
    steps: [
      'खनन प्रभावित गांवों की प्राथमिक स्वास्थ्य एवं पर्यावरणीय आवश्यकताओं का धरातलीय सर्वेक्षण।',
      'निःशुल्क स्वास्थ्य शिविर, सुरक्षा किट वितरण, ग्रीन बफर जोन और वैकल्पिक आजीविका का समन्वय।',
      'स्थानीय ग्राम पंचायतों, स्वयंसेवकों और सहयोगी संस्थाओं के साथ सक्रिय भागीदारी।',
      'स्वास्थ्य सुधार, वायु गुणवत्ता राहत और आजीविका परिणामों का निरंतर मूल्यांकन।',
    ],
    outcomes:
      'सुलभ स्वास्थ्य सेवाएं, पर्यावरण सुरक्षा चेतना और खनन प्रभावित परिवारों के लिए सम्मानजनक आजीविका।',
  },
  'rural-development': {
    steps: [
      'गांवों की जल समस्या, सौर ऊर्जा आवश्यकता और कृषि चुनौतियों का समग्र आकलन।',
      'सामुदायिक नेतृत्व में तालाब जीर्णोद्धार, सौर ऊर्जा और जैविक खेती की कार्ययोजना।',
      'पारंपरिक जल संरचनाओं के संरक्षण और सतत ग्राम विकास का क्रियान्वयन।',
      'ग्रामीणों के साथ मासिक समीक्षा और स्वावलंबन की दिशा में निरंतर कदम।',
    ],
    outcomes:
      'सशक्त ग्राम सहभागिता, प्राकृतिक संसाधनों का संरक्षण और आत्मनिर्भर ग्रामीण अर्थव्यवस्था।',
  },
  'women-empowerment': {
    steps: [
      'ग्रामीण मातृशक्ति की कौशल आवश्यकताओं और आजीविका संबंधी बाधाओं की पहचान।',
      'सिलाई, हस्तशिल्प, प्राथमिक स्वास्थ्य और कानूनी साक्षरता कार्यशालाओं का आयोजन।',
      'प्रशिक्षित बहनों को स्व-सहायता समूहों और स्थानीय बाजार से जोड़ना।',
      'आर्थिक आत्मनिर्भरता और पारिवारिक स्तर पर जीवन सुधार का निरंतर अनुवर्तन।',
    ],
    outcomes:
      'व्यावहारिक कौशल, कानूनी व स्वास्थ्य जागरूकता और महिलाओं के लिए सुरक्षित व सम्मानजनक स्वरोजगार।',
  },
  'handicap-empowerment': {
    steps: [
      'दिव्यांग भाई-बहनों की शारीरिक सुगमता की चुनौतियों और व्यक्तिगत आवश्यकताओं का सर्वेक्षण।',
      'सहायक उपकरण (व्हीलचेयर, ट्राइसाइकिल, श्रवण यंत्र) और सुगम्य सुविधाओं का समन्वय।',
      'समावेशी व्यावसायिक कौशल मार्गदर्शन और समाज में सम्मानजनक भागीदारी को प्रोत्साहन।',
      'सुगमता सुधार और लाभार्थियों की प्रतिक्रिया के आधार पर निरंतर सहायता विस्तार।',
    ],
    outcomes:
      'ससम्मान सामाजिक समावेशन, आत्मनिर्भर जीवन और मुख्यधारा के विकास अवसरों तक समान पहुंच।',
  },
};

const defaultExecutionPlan = {
  steps: [
    'Assess community needs and identify priorities.',
    'Prepare an action plan with relevant stakeholders.',
    'Coordinate implementation with volunteers and partner organizations.',
    'Monitor progress and improve activities using feedback.',
  ],
  outcomes:
    'Improved community participation, coordinated activities and progress toward program objectives.',
};

const defaultExecutionPlanHi = {
  steps: [
    'सामुदायिक प्राथमिकताओं और सेवा आवश्यकताओं का सर्वेक्षण।',
    'संबद्ध हितधारकों और स्वयंसेवकों के साथ विस्तृत कार्ययोजना तैयार करना।',
    'धरातल पर निष्ठावान स्वयंसेवकों के सहयोग से गतिविधियों का संचालन।',
    'लाभार्थियों की प्रतिक्रिया के आधार पर निरंतर सुधार और विस्तार।',
  ],
  outcomes:
    'सशक्त जन-सहभागिता, समन्वित सेवा कार्य और निर्धारित लक्ष्यों की सफल प्राप्ति।',
};

const stepIcons = [ClipboardList, Users, Handshake, BarChart3];

const sdgPlans = [
  {
    id: 1,
    title: 'No Poverty',
    color: '#e5243b',
    icon: BriefcaseBusiness,
    goal: 'Improve access to welfare support, skills and livelihood opportunities.',
    steps: [
      'Identify vulnerable households with community participation.',
      'Help eligible families discover relevant welfare schemes.',
      'Coordinate livelihood training and employment linkages.',
      'Review referrals and document support outcomes.',
    ],
    indicators: ['Households reached', 'Scheme referrals', 'Livelihood linkages'],
  },
  {
    id: 2,
    title: 'Zero Hunger',
    color: '#dda63a',
    icon: Utensils,
    goal: 'Promote food security, nutrition awareness and sustainable local food practices.',
    steps: [
      'Identify local nutrition awareness needs.',
      'Organize nutrition education with qualified partners.',
      'Promote kitchen gardens and local food-growing practices.',
      'Record participation and follow-up activities.',
    ],
    indicators: ['People reached', 'Nutrition sessions', 'Gardens supported'],
  },
  {
    id: 3,
    title: 'Good Health and Well-being',
    color: '#4c9f38',
    icon: HeartPulse,
    goal: 'Improve health awareness and access to appropriate healthcare services.',
    steps: [
      'Identify community health awareness priorities.',
      'Coordinate health camps with qualified providers.',
      'Promote preventive health, hygiene and mental wellness.',
      'Track participation and referrals while protecting personal data.',
    ],
    indicators: ['People reached', 'Health sessions', 'Healthcare referrals'],
  },
  {
    id: 4,
    title: 'Quality Education',
    color: '#c5192d',
    icon: GraduationCap,
    goal: 'Support inclusive learning, environmental education and digital literacy.',
    steps: [
      'Identify learning needs with schools and communities.',
      'Organize learning support and environmental education.',
      'Coordinate digital literacy sessions and learning resources.',
      'Review participation and learning progress with partners.',
    ],
    indicators: ['Learners reached', 'Sessions conducted', 'Learning activities'],
  },
  {
    id: 5,
    title: 'Gender Equality',
    color: '#ff3a21',
    icon: Users,
    goal: 'Promote equal opportunities, dignity and participation for women and girls.',
    steps: [
      'Consult women to understand local priorities and barriers.',
      'Organize skills development and rights-awareness sessions.',
      'Connect participants with support and livelihood networks.',
      'Collect feedback and review participation opportunities.',
    ],
    indicators: ['Participants reached', 'Training sessions', 'Support referrals'],
  },
  {
    id: 6,
    title: 'Clean Water and Sanitation',
    color: '#26bde2',
    icon: Droplets,
    goal: 'Promote water conservation, sanitation awareness and responsible water management.',
    steps: [
      'Assess community water and sanitation concerns.',
      'Coordinate water conservation and hygiene awareness.',
      'Partner on waterbody restoration where feasible.',
      'Record activities and monitor restoration indicators.',
    ],
    indicators: ['Awareness sessions', 'Sites assessed', 'Restoration activities'],
  },
  {
    id: 7,
    title: 'Affordable and Clean Energy',
    color: '#fcc30b',
    icon: Sun,
    goal: 'Encourage renewable-energy awareness and clean-energy access.',
    steps: [
      'Identify community energy needs and access barriers.',
      'Conduct solar-energy and energy-efficiency awareness sessions.',
      'Explore partnerships for feasible clean-energy projects.',
      'Document installations and referrals actually completed.',
    ],
    indicators: ['People reached', 'Energy assessments', 'Projects supported'],
  },
  {
    id: 8,
    title: 'Decent Work and Economic Growth',
    color: '#a21942',
    icon: BriefcaseBusiness,
    goal: 'Strengthen employability, vocational skills and local livelihoods.',
    steps: [
      'Identify skills and livelihood interests.',
      'Coordinate vocational training with suitable providers.',
      'Connect participants with employers and market opportunities.',
      'Follow up on training completion and livelihood linkages.',
    ],
    indicators: ['People trained', 'Training completion', 'Employment linkages'],
  },
  {
    id: 9,
    title: 'Industry, Innovation and Infrastructure',
    color: '#fd6925',
    icon: Lightbulb,
    goal: 'Encourage practical innovation, appropriate technology and resilient infrastructure.',
    steps: [
      'Identify local infrastructure and technology challenges.',
      'Consult technical experts and community stakeholders.',
      'Pilot suitable projects with partner approval.',
      'Document delivery, maintenance and lessons learned.',
    ],
    indicators: ['Needs assessed', 'Pilot projects', 'Partnerships formed'],
  },
  {
    id: 10,
    title: 'Reduced Inequalities',
    color: '#dd1367',
    icon: Accessibility,
    goal: 'Improve inclusion and access to opportunities for underserved communities.',
    steps: [
      'Identify barriers faced by marginalized communities.',
      'Review accessibility of activities and services.',
      'Coordinate inclusive learning and support opportunities.',
      'Gather feedback and improve access.',
    ],
    indicators: ['People reached', 'Accessibility reviews', 'Inclusive activities'],
  },
  {
    id: 11,
    title: 'Sustainable Cities and Communities',
    color: '#fd9d24',
    icon: Building2,
    goal: 'Support cleaner, greener and more inclusive settlements.',
    steps: [
      'Identify priorities for cleanliness, green spaces and resilience.',
      'Organize community cleanliness and awareness drives.',
      'Coordinate native planting and public-space improvement.',
      'Monitor site maintenance and community participation.',
    ],
    indicators: ['Community drives', 'Sites improved', 'Trees monitored'],
  },
  {
    id: 12,
    title: 'Responsible Consumption and Production',
    color: '#bf8b2e',
    icon: Recycle,
    goal: 'Encourage waste reduction, reuse and responsible resource consumption.',
    steps: [
      'Assess common waste and resource-use challenges.',
      'Promote waste segregation, reuse and responsible consumption.',
      'Coordinate recycling activities with authorized partners.',
      'Record activities and material quantities where measured.',
    ],
    indicators: ['Awareness sessions', 'Clean-up drives', 'Waste diverted where measured'],
  },
  {
    id: 13,
    title: 'Climate Action',
    color: '#3f7e44',
    icon: Leaf,
    goal: 'Build climate awareness and support locally appropriate climate action.',
    steps: [
      'Identify local environmental and climate-related concerns.',
      'Organize climate awareness and preparedness activities.',
      'Plan native-tree plantation with local experts.',
      'Monitor sapling survival and restoration progress.',
    ],
    indicators: ['People reached', 'Saplings monitored', 'Survival rate where measured'],
  },
  {
    id: 14,
    title: 'Life Below Water',
    color: '#0a97d9',
    icon: Fish,
    goal: 'Protect aquatic ecosystems and reduce pollution entering waterbodies.',
    steps: [
      'Identify nearby waterbodies and community concerns.',
      'Raise awareness about plastic and water pollution.',
      'Coordinate responsible clean-up activities with relevant authorities.',
      'Document sites assessed and activities completed.',
    ],
    indicators: ['Awareness drives', 'Sites assessed', 'Clean-up activities'],
  },
  {
    id: 15,
    title: 'Life on Land',
    color: '#56c02b',
    icon: Sprout,
    goal: 'Protect biodiversity, support native vegetation and restore degraded land.',
    steps: [
      'Identify suitable sites and ecological priorities.',
      'Consult local experts about native species.',
      'Coordinate plantation and habitat restoration activities.',
      'Monitor survival, maintenance and ecological progress.',
    ],
    indicators: ['Sites supported', 'Native saplings planted', 'Survival rate where measured'],
  },
  {
    id: 16,
    title: 'Peace, Justice and Strong Institutions',
    color: '#00689d',
    icon: ShieldCheck,
    goal: 'Promote rights awareness, transparent processes and accountable initiatives.',
    steps: [
      'Share reliable information about relevant rights and public services.',
      'Provide referrals to qualified support organizations.',
      'Maintain transparent records of program activities and donations.',
      'Provide channels for community feedback and grievances.',
    ],
    indicators: ['Awareness sessions', 'Referrals made', 'Feedback reviewed'],
  },
  {
    id: 17,
    title: 'Partnerships for the Goals',
    color: '#19486a',
    icon: Globe,
    goal: 'Build collaboration among communities, institutions and responsible organizations.',
    steps: [
      'Identify institutions with shared development goals.',
      'Define proposed roles and responsibilities with partners.',
      'Coordinate joint activities and community participation.',
      'Review partnership contributions and document outcomes.',
    ],
    indicators: ['Active partnerships', 'Joint activities', 'Resources coordinated'],
  },
];

const sdgPlansHiMap = {
  1: {
    title: 'शून्य गरीबी',
    goal: 'कल्याणकारी योजनाओं, कौशल प्रशिक्षण और आजीविका के अवसरों तक पहुंच बढ़ाना।',
    steps: [
      'सामुदायिक सहभागिता से जरूरतमंद परिवारों की पहचान।',
      'पात्र परिवारों को सरकारी व संस्थागत कल्याण योजनाओं से जोड़ना।',
      'कौशल विकास प्रशिक्षण और स्थानीय रोजगार के अवसर उपलब्ध कराना।',
      'सहायता परिणामों का दस्तावेजीकरण और प्रगति की निरंतर समीक्षा।',
    ],
    indicators: ['लाभान्वित परिवार', 'योजनाओं से जुड़ाव', 'आजीविका साधन'],
  },
  2: {
    title: 'भुखमरी से मुक्ति',
    goal: 'खाद्य सुरक्षा, पोषण जागरूकता और स्थानीय पोषण वाटिका को बढ़ावा देना।',
    steps: [
      'स्थानीय स्तर पर पोषण संबंधी प्राथमिक आवश्यकताओं की पहचान।',
      'योग्य विशेषज्ञों के साथ पोषण एवं स्वास्थ्य शिक्षा शिविर।',
      'घरों व स्कूलों में पोषण वाटिका और जैविक अन्न उपजाने को प्रोत्साहन।',
      'सहभागिता और अनुवर्ती पोषण प्रगति का व्यवस्थित रिकॉर्ड।',
    ],
    indicators: ['जागरूक नागरिक', 'पोषण सत्र', 'स्थापित पोषण वाटिका'],
  },
  3: {
    title: 'उत्कृष्ट स्वास्थ्य एवं कल्याण',
    goal: 'खनन व ग्रामीण क्षेत्रों में बुनियादी स्वास्थ्य सेवा, परामर्श और रोग निवारण।',
    steps: [
      'दूरस्थ बस्तियों में निःशुल्क स्वास्थ्य जांच एवं परामर्श शिविर।',
      'स्वच्छता, रोग निवारण और मातृ-शिशु स्वास्थ्य जागरूकता।',
      'गंभीर मामलों में विशेषज्ञ अस्पतालों व केंद्रों हेतु सहायता।',
      'स्वास्थ्य शिविरों और वितरित दवाओं का पारदर्शी लेखा-जोखा।',
    ],
    indicators: ['स्वास्थ्य शिविर', 'जांच किए गए ग्रामीण', 'वितरित सुरक्षा किट'],
  },
  4: {
    title: 'गुणवत्तापूर्ण शिक्षा',
    goal: 'संस्कारयुक्त, समावेशी और पर्यावरण चेतना आधारित प्राकृतिक शिक्षा।',
    steps: [
      'वृक्षों की छांव में अध्ययन (Siksha on Trees) और ग्रामीण अध्ययन केंद्र।',
      'पाठ्य सामग्री, स्टेशनरी और पर्यावरण अध्ययन का निःशुल्क वितरण।',
      'युवा स्वयंसेवकों को शिक्षण व संस्कार देने हेतु प्रेरित करना।',
      'बच्चों की उपस्थिति और सीखने के स्तर में निरंतर सुधार का अनुवर्तन।',
    ],
    indicators: ['अध्ययन केंद्र', 'लाभान्वित विद्यार्थी', 'सक्रिय शिक्षक-स्वयंसेवक'],
  },
  5: {
    title: 'लैंगिक समानता',
    goal: 'ग्रामीण महिलाओं के लिए समान अवसर, गरिमा और नेतृत्व का विकास।',
    steps: [
      'महिलाओं के स्वास्थ्य, अधिकारों और सामाजिक सुरक्षा पर संवाद।',
      'आत्मनिर्भर आजीविका और हस्तशिल्प/सिलाई कौशल कार्यशालाएं।',
      'ग्राम स्तर पर महिला स्वयं-सहायता समूहों का गठन व सहयोग।',
      'सशक्त हुई महिलाओं के अनुभवों और सफलता का आकलन।',
    ],
    indicators: ['प्रशिक्षित महिलाएं', 'जागरूकता बैठकें', 'सक्रिय स्व-सहायता समूह'],
  },
  6: {
    title: 'स्वच्छ जल एवं स्वच्छता',
    goal: 'सुरक्षित पेयजल, जल शोधन और ग्रामीण स्वच्छता सुविधाओं का विस्तार।',
    steps: [
      'पेयजल स्रोतों की गुणवत्ता और फ्लोराइड/प्रदूषण स्तर की जांच।',
      'पारंपरिक कुओं और जलप्रपातों की सफाई व संरक्षण अभियान।',
      'ग्रामीणों को जलजनित रोगों और स्वच्छता के प्रति जागरूक करना।',
      'स्वच्छ किए गए जल स्रोतों और लाभान्वित परिवारों की निगरानी।',
    ],
    indicators: ['स्वच्छ जल स्रोत', 'जागरूकता अभियान', 'लाभान्वित ग्रामीण'],
  },
  7: {
    title: 'सस्ती एवं स्वच्छ ऊर्जा',
    goal: 'ग्रामीण व आदिवासी अंचलों में सौर ऊर्जा और पर्यावरण-अनुकूल विकल्पों को बढ़ावा।',
    steps: [
      'अंधेरे या बिजली संकट वाले गांवों में ऊर्जा जरूरतों का आकलन।',
      'सौर लालटेन, सौर स्ट्रीट लाइट और ऊर्जा संरक्षण की जानकारी।',
      'स्थानीय युवाओं को सौर उपकरणों के रखरखाव का बुनियादी प्रशिक्षण।',
      'स्थापित सौर प्रकाश व्यवस्था और ईंधन बचत का रिकॉर्ड।',
    ],
    indicators: ['सौर उपकरण स्थापित', 'ऊर्जा जागरूकता सत्र', 'प्रकाशित बस्तियां'],
  },
  8: {
    title: 'सम्मानजनक कार्य एवं आर्थिक वृद्धि',
    goal: 'ग्रामीण युवाओं और कामगारों के लिए हुनर, सुरक्षा और टिकाऊ रोजगार।',
    steps: [
      'स्थानीय बाजार की मांग के अनुरूप व्यावसायिक कौशलों की पहचान।',
      'व्यावहारिक प्रशिक्षण और स्वरोजगार मार्गदर्शन कार्यशालाएं।',
      'खनन क्षेत्र के श्रमिकों के लिए सुरक्षा और कानूनी अधिकारों की जानकारी।',
      'प्रशिक्षण के बाद स्वरोजगार शुरू करने वाले युवाओं की प्रगति।',
    ],
    indicators: ['कौशल प्राप्त युवा', 'मार्गदर्शन शिविर', 'सफल स्वरोजगार'],
  },
  9: {
    title: 'उद्योग, नवाचार एवं बुनियादी ढांचा',
    goal: 'स्थानीय आवश्यकताओं हेतु सरल, पर्यावरण-अनुकूल और टिकाऊ समाधान।',
    steps: [
      'ग्रामीण चुनौतियों के लिए न्यूनतम लागत वाले तकनीकी नवाचारों की खोज।',
      'पर्यावरण-अनुकूल सामग्री और देसी ज्ञान का उपयोग कर निर्माण।',
      'स्थानीय कारीगरों और नवोन्मेषकों को मंच व संसाधन उपलब्ध कराना।',
      'सफल नवाचारों का अन्य ग्रामीण क्षेत्रों में प्रसार।',
    ],
    indicators: ['लागू नवाचार', 'सहयोगी कारीगर', 'टिकाऊ ग्राम परियोजनाएं'],
  },
  10: {
    title: 'असमानता में कमी',
    goal: 'दिव्यांगजनों और वंचित वर्गों के लिए सामाजिक सुरक्षा व समान अधिकार।',
    steps: [
      'दिव्यांगजनों की विशिष्ट सहायता और सुगमता जरूरतों की पहचान।',
      'सहायक उपकरण, कानूनी सलाह और सरकारी प्रमाण-पत्रों में मदद।',
      'समावेशी सामाजिक आयोजनों और कार्यस्थलों का निर्माण।',
      'समानता और गरिमापूर्ण जीवन की दिशा में प्रगति का मूल्यांकन।',
    ],
    indicators: ['सहायता प्राप्त दिव्यांगजन', 'उपकरण वितरण', 'समावेशी पहल'],
  },
  11: {
    title: 'टिकाऊ शहर एवं समुदाय',
    goal: 'स्वच्छ, हरित और सुरक्षित ग्रामीण व नगरीय परिवेश का निर्माण।',
    steps: [
      'सार्वजनिक स्थलों की सफाई और कचरा निस्तारण योजना।',
      'सामुदायिक वाटिकाओं और हरित सार्वजनिक परिसरों का विकास।',
      'प्राकृतिक आपदाओं से बचाव और प्राथमिक सुरक्षा की तैयारी।',
      'स्वच्छता अभियान और जनसहभागिता का नियमित रिकॉर्ड।',
    ],
    indicators: ['स्वच्छता अभियान', 'हरित स्थल विकसित', 'सक्रिय नागरिक'],
  },
  12: {
    title: 'जिम्मेदार उपभोग एवं उत्पादन',
    goal: 'कचरा प्रबंधन, प्लास्टिक निषेध और संसाधनों का विवेकपूर्ण उपयोग।',
    steps: [
      'सिंगल-यूज प्लास्टिक के विकल्पों के उपयोग का जनजागरण।',
      'सूखे और गीले कचरे के पृथक्करण और जैविक खाद निर्माण।',
      'स्थानीय प्राकृतिक उत्पादों के उपयोग को प्राथमिकता देना।',
      'कचरा न्यूनीकरण और पुनर्चक्रण गतिविधियों का लेखा।',
    ],
    indicators: ['कचरा प्रबंधन सत्र', 'खाद निर्माण इकाइयां', 'प्लास्टिक मुक्ति अभियान'],
  },
  13: {
    title: 'जलवायु परिवर्तन पर कार्यवाही',
    goal: 'सघन देशी वृक्षारोपण और पर्यावरण चेतना से जलवायु संतुलन में योगदान।',
    steps: [
      'स्थानीय पारिस्थितिकी के अनुकूल देशी छायादार व फलदार पौधों का चयन।',
      'सामुदायिक व वन क्षेत्रों में व्यापक वृक्षारोपण अभियान।',
      'रोपे गए पौधों की सुरक्षा, खाद-पानी और जीवित रहने की दर की निगरानी।',
      'जलवायु परिवर्तन और पर्यावरण संरक्षण पर युवा कार्यशालाएं।',
    ],
    indicators: ['रोपे गए पौधे', 'संरक्षित पेड़', 'सक्रिय पर्यावरण प्रहरी'],
  },
  14: {
    title: 'जल के नीचे जीवन',
    goal: 'नदियों, झरनों और प्राकृतिक जलस्रोतों को प्रदूषण मुक्त रखना।',
    steps: [
      'स्थानीय जल निकायों में गिरने वाले अपशिष्ट और प्लास्टिक की रोकथाम।',
      'नदी तटों और जलप्रपातों पर स्वच्छता व जनजागरण अभियान।',
      'जलजीवों और प्राकृतिक पारिस्थितिकी के महत्व पर संवाद।',
      'संरक्षित किए गए जल क्षेत्रों का नियमित निरीक्षण।',
    ],
    indicators: ['जल स्वच्छता अभियान', 'संरक्षित जल स्रोत', 'सहभागी स्वयंसेवक'],
  },
  15: {
    title: 'भूमि पर जीवन (वन एवं गौ-संरक्षण)',
    goal: 'वनों की रक्षा, बंजर भूमि का पुनरुद्धार और पवित्र गोवंश की सेवा।',
    steps: [
      'खनन और बंजर भूमि पर ग्रीन बेल्ट और सघन वन विकसित करना।',
      'निराश्रित गोवंश के लिए गौशाला संचालन और पौष्टिक आहार व्यवस्था।',
      'अवैध कटाई रोकने के लिए वन समितियों के साथ समन्वय।',
      'जीवित पौधों और पोषित गोवंश की नियमित स्वास्थ्य जांच।',
    ],
    indicators: ['संरक्षित गौवंश', 'हरित क्षेत्र विस्तार', 'जीवित पौधे'],
  },
  16: {
    title: 'शांति, न्याय एवं मजबूत संस्थाएं',
    goal: 'पारदर्शी ट्रस्टीशिप, सामाजिक समरसता और अधिकारों के प्रति जागरूकता।',
    steps: [
      'ग्रामीणों को उनके विधिक अधिकारों और लोक सेवाओं की सही जानकारी।',
      'पारदर्शी दान प्रबंधन और वैधानिक ट्रस्ट नियमों का अनुपालन।',
      'सामुदायिक शिकायतों और सुझावों के लिए खुला संवाद मंच।',
      'सामाजिक सद्भाव और न्यायपूर्ण वातावरण का संवर्धन।',
    ],
    indicators: ['विधिक साक्षरता सत्र', 'पारदर्शी प्रतिवेदन', 'सुलझाए गए जन-मुद्दे'],
  },
  17: {
    title: 'लक्ष्यों हेतु साझेदारी',
    goal: 'सामाजिक संस्थाओं, शिक्षण संस्थानों और युवाओं के साथ संयुक्त सेवा।',
    steps: [
      'समान विचार वाले एनजीओ और युवा संगठनों के साथ समन्वय।',
      'स्कूलों व कॉलेजों में छात्र इंटर्नशिप और वालंटियर कार्यक्रम।',
      'संयुक्त राहत और पर्यावरण अभियानों का आयोजन।',
      'साझेदारी के परिणामों और सामाजिक प्रभाव की समीक्षा।',
    ],
    indicators: ['सक्रिय साझेदारियां', 'संयुक्त अभियान', 'जुड़े हुए स्वयंसेवक'],
  },
};

function ExecutionSteps({ steps, isHindi }) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, index) => {
        const StepIcon = stepIcons[index] || CheckCircle2;

        return (
          <li key={index} className="flex min-w-0 items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-green-200 bg-white text-[#0b5e34]">
              <StepIcon className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1 pt-1">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#ea580c]">
                {isHindi ? `चरण ${String(index + 1).padStart(2, '0')}` : `Step ${String(index + 1).padStart(2, '0')}`}
              </span>
              <p className="break-words text-sm leading-relaxed text-gray-700">
                {step}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function SdgCard({ sdg, isHindi }) {
  const SdgIcon = sdg.icon;
  const hi = sdgPlansHiMap[sdg.id];

  const title = isHindi && hi ? hi.title : sdg.title;
  const goal = isHindi && hi ? hi.goal : sdg.goal;
  const steps = isHindi && hi ? hi.steps : sdg.steps;
  const indicators = isHindi && hi ? hi.indicators : sdg.indicators;

  return (
    <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className="flex min-w-0 items-start gap-4 p-5 text-white sm:p-6"
        style={{ backgroundColor: sdg.color }}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/15">
          <SdgIcon className="h-7 w-7" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/85">
            {isHindi ? `सतत विकास लक्ष्य ${sdg.id}` : `Sustainable Development Goal ${sdg.id}`}
          </p>
          <h3 className="break-words font-serif text-xl font-bold leading-snug">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
        <div>
          <h4 className="mb-2 flex items-center gap-2 font-bold text-gray-900">
            <Target className="h-4 w-4 shrink-0 text-[#0b5e34]" />
            {isHindi ? 'हमारा संकल्प' : 'Our Goal'}
          </h4>
          <p className="break-words text-sm leading-relaxed text-gray-600">
            {goal}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h4 className="mb-4 flex items-center gap-2 font-bold text-[#0b5e34]">
            <ClipboardList className="h-4 w-4 shrink-0" />
            {isHindi ? 'हमारी क्रियान्वयन पद्धति' : 'How We Execute'}
          </h4>
          <ExecutionSteps steps={steps} isHindi={isHindi} />
        </div>

        <div className="mt-auto rounded-xl border border-green-200 bg-green-50 p-4">
          <h4 className="mb-3 flex items-center gap-2 font-bold text-[#0b5e34]">
            <BarChart3 className="h-4 w-4 shrink-0" />
            {isHindi ? 'सफलता के संकेतक' : 'Success Indicators'}
          </h4>

          <div className="flex flex-wrap gap-2">
            {indicators.map((indicator) => (
              <span
                key={indicator}
                className="break-words rounded-lg border border-green-200 bg-white px-2.5 py-1.5 text-xs font-medium leading-relaxed text-gray-700"
              >
                {indicator}
              </span>
            ))}
          </div>

          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            {isHindi
              ? 'प्रस्तावित संकेतक। संस्थागत अभिलेखों और सत्यापित माप के बाद ही वास्तविक परिणाम प्रकाशित किए जाते हैं।'
              : 'Proposed indicators. Report actual results only after activities are measured and verified.'}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function How() {
  const { isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [sdgFilter, setSdgFilter] = useState('all');
  const { openDonateModal } = useModal();

  const tabs = isHindi
    ? [
        { id: 'all', label: 'सभी कार्यक्रम' },
        { id: 'coal-mining', label: 'कोयला खनन क्षेत्र' },
        { id: 'rural-development', label: 'ग्रामीण विकास' },
        { id: 'women-empowerment', label: 'महिला सशक्तिकरण' },
        { id: 'handicap-empowerment', label: 'दिव्यांगजन कल्याण' },
      ]
    : [
        { id: 'all', label: 'All Programs' },
        { id: 'coal-mining', label: 'Coal Mining' },
        { id: 'rural-development', label: 'Rural Development' },
        { id: 'women-empowerment', label: 'Women Empowerment' },
        { id: 'handicap-empowerment', label: 'Handicap Empowerment' },
      ];

  const filteredPrograms =
    activeTab === 'all'
      ? programsData
      : programsData.filter((program) => program.id === activeTab);

  const visibleSdgs =
    sdgFilter === 'all'
      ? sdgPlans
      : sdgPlans.filter((sdg) => sdg.id === Number(sdgFilter));

  return (
    <div className="how-page min-h-screen w-full min-w-0 overflow-x-clip bg-[#fcfdfc]">
      {/* Hero Banner */}
      <section className="relative flex w-full min-w-0 items-center justify-center overflow-hidden border-b-4 border-[#ea580c] bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] px-4 py-10 text-center text-white shadow-md sm:px-6 sm:py-12 lg:px-8">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-3 text-center">
          <span className="inline-flex max-w-full items-center justify-center rounded-full border border-orange-400/35 bg-orange-500/20 px-3.5 py-1 text-center text-xs font-bold uppercase tracking-wider text-orange-200">
            {isHindi ? 'सहभागिता एवं कार्यक्रम' : 'Participation & Program Tabs'}
          </span>

          <h1 className="m-0 w-full text-center font-serif text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {isHindi ? 'सहयोग मार्ग एवं क्रियान्वयन पद्धति' : 'How You Can Help & How We Execute'}
          </h1>

          <p className="m-0 w-full text-center font-serif text-lg font-bold leading-relaxed text-amber-300 sm:text-xl">
            {isHindi ? 'सहयोग मार्ग: विभिन्न कार्य-स्तंभों में सहभागिता' : 'सहयोग मार्ग: विभिन्न कार्य-स्तंभों में सहभागिता'}
          </p>

          <div className="my-1 h-1 w-20 rounded-full bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e]" />

          <p className="m-0 mx-auto w-full max-w-3xl text-center text-sm leading-relaxed text-emerald-100/90 sm:text-base">
            {isHindi
              ? 'प्रत्येक विकास स्तंभ को जानें और समझें कि आप दान, स्वयंसेवा या संस्थागत साझेदारी के माध्यम से कैसे योगदान दे सकते हैं।'
              : 'Discover each specialized development vertical and find out how you can contribute through donations, volunteering, or organizational partnerships.'}
          </p>
        </div>
      </section>

      {/* Main Programs */}
      <main className="how-main mx-auto w-full min-w-0 max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        {/* Centered program tabs */}
        <div className="mx-auto mb-8 flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 sm:mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-center text-xs font-bold transition-colors sm:text-sm ${
                activeTab === tab.id
                  ? 'border-[#0b5e34] bg-[#0b5e34] text-white shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#15803d] hover:bg-green-50 hover:text-[#0b5e34]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Centered responsive program grid */}
        <div
          className={`mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 items-stretch justify-items-stretch gap-6 sm:gap-7 lg:gap-8 ${
            filteredPrograms.length === 1
              ? 'lg:grid-cols-1'
              : 'lg:grid-cols-2'
          }`}
        >
          {filteredPrograms.map((program) => {
            const hi = programTranslationsHi[program.id];
            const title = isHindi && hi ? hi.title : program.title;
            const subtitle = isHindi && hi ? hi.subtitle : program.subtitle;
            const description = isHindi && hi ? hi.description : program.description;
            const sdgBadges = isHindi && hi ? hi.sdgBadges : program.sdgBadges;
            const pillars = isHindi && hi ? hi.pillars : program.pillars;
            const plan = isHindi
              ? (executionPlansHi[program.id] || defaultExecutionPlanHi)
              : (executionPlans[program.id] || defaultExecutionPlan);

            return (
              <article
                key={program.id}
                className={`flex h-full min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-gray-200 border-t-4 border-t-[#0b5e34] bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#15803d] hover:shadow-lg ${
                  filteredPrograms.length === 1 ? 'mx-auto max-w-3xl' : ''
                }`}
              >
                <div className="min-w-0 space-y-4 p-5 sm:p-7">
                  <div>
                    <h2 className="mb-1 break-words font-serif text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                      {title}
                    </h2>

                    <p className="mb-3 break-words text-sm font-bold text-[#ea580c]">
                      {subtitle}
                    </p>

                    <p className="break-words text-sm leading-relaxed text-gray-600">
                      {description}
                    </p>
                  </div>

                  {sdgBadges?.length > 0 && (
                    <div>
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {isHindi ? 'संबंधित एसडीजी लक्ष्य' : 'Related SDGs'}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {sdgBadges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-lg border border-green-200 bg-green-50 px-2.5 py-1.5 text-xs font-bold text-[#0b5e34]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      {isHindi ? 'कार्यक्षेत्र के मुख्य स्तंभ' : 'Key Pillars of Intervention'}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {pillars.map((pillar, index) => (
                        <span
                          key={`${program.id}-pillar-${index}`}
                          className="break-words rounded-lg border border-green-200 bg-green-50 px-2.5 py-1.5 text-xs font-bold text-[#0b5e34]"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-w-0 border-y border-gray-100 bg-[#f8fbf8] p-5 sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b5e34] text-white">
                      <Activity className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-bold text-[#0b5e34]">
                        {isHindi ? 'हमारी क्रियान्वयन पद्धति' : 'How We Execute'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {isHindi ? 'धरातलीय कार्यप्रणाली' : 'Our implementation approach'}
                      </p>
                    </div>
                  </div>

                  <ExecutionSteps steps={plan.steps} isHindi={isHindi} />
                </div>

                <div className="mt-auto min-w-0 space-y-4 p-5 sm:p-7">
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-bold text-[#0b5e34]">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      {isHindi ? 'अपेक्षित परिणाम' : 'Expected Outcomes'}
                    </h3>

                    <p className="break-words text-sm leading-relaxed text-gray-700">
                      {plan.outcomes}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500">
                      {isHindi ? 'सामुदायिक सेवा और विकास में भागीदार बनें।' : 'Support community-led development.'}
                    </p>

                    <button
                      type="button"
                      onClick={openDonateModal}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b5e34] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#073d22] focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:ring-offset-2"
                    >
                      <Heart className="h-4 w-4 fill-rose-300 text-rose-300" />
                      <span>{isHindi ? 'इस कार्यक्रम में सहयोग करें' : 'Support This Program'}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* SDG 1–17 Action Plan */}
      <section
        id="sdg-action-plan"
        className="mt-8 w-full min-w-0 border-t border-gray-200 bg-gradient-to-b from-white to-[#f3f8f3] px-4 py-14 sm:mt-10 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto w-full min-w-0 max-w-7xl">
          {/* Centered SDG heading */}
          <div className="mx-auto mb-10 flex w-full max-w-4xl flex-col items-center text-center">
            <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-[#0b5e34]">
              <Globe className="h-4 w-4 shrink-0" />
              {isHindi ? 'सतत विकास रूपरेखा' : 'Sustainable Development Framework'}
            </span>

            <h2 className="mt-5 w-full text-center font-serif text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {isHindi ? 'हमारा एसडीजी एक्शन प्लान' : 'Our SDG Action Plan'}
            </h2>

            <p className="mt-3 w-full text-center font-serif text-lg font-bold text-[#0b5e34] sm:text-xl">
              {isHindi ? 'वैश्विक लक्ष्यों से स्थानीय धरातलीय कार्य तक' : 'From Global Goals to Local Action'}
            </p>

            <div className="mx-auto my-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e]" />

            <p className="mx-auto w-full max-w-3xl text-center text-sm leading-relaxed text-gray-600 sm:text-base">
              {isHindi
                ? 'जानें कि कैसे पृथ्वीवासी संस्था सामुदायिक सहभागिता, साझेदारी, व्यावहारिक सेवा और प्रत्यक्ष माप के माध्यम से सभी १७ सतत विकास लक्ष्यों में योगदान दे रही है।'
                : 'Explore how Prithviwasi proposes to contribute to all 17 Sustainable Development Goals through community engagement, partnerships, practical activities and measurable progress.'}
            </p>
          </div>

          {/* Centered SDG filters */}
          <div className="mx-auto mb-8 flex w-full max-w-6xl flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSdgFilter('all')}
              aria-pressed={sdgFilter === 'all'}
              className={`rounded-xl border px-4 py-2 text-sm font-bold transition-colors ${
                sdgFilter === 'all'
                  ? 'border-[#0b5e34] bg-[#0b5e34] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              {isHindi ? 'सभी १७ लक्ष्य' : 'All 17 Goals'}
            </button>

            {sdgPlans.map((sdg) => (
              <button
                key={sdg.id}
                type="button"
                onClick={() => setSdgFilter(String(sdg.id))}
                aria-pressed={sdgFilter === String(sdg.id)}
                aria-label={`Show SDG ${sdg.id}: ${sdg.title}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-transform hover:scale-105"
                style={{
                  backgroundColor:
                    sdgFilter === String(sdg.id) ? sdg.color : '#ffffff',
                  borderColor: sdg.color,
                  color:
                    sdgFilter === String(sdg.id) ? '#ffffff' : sdg.color,
                }}
              >
                {sdg.id}
              </button>
            ))}
          </div>

          {/* Centered result summary */}
          <div className="mx-auto mb-6 flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 text-center">
            <p className="text-sm font-semibold text-gray-700">
              {sdgFilter === 'all'
                ? (isHindi ? 'सभी १७ सतत विकास लक्ष्य' : 'All 17 Sustainable Development Goals')
                : (isHindi
                    ? `एसडीजी ${sdgFilter}: ${sdgPlansHiMap[Number(sdgFilter)]?.title || ''}`
                    : `SDG ${sdgFilter}: ${
                        sdgPlans.find((sdg) => sdg.id === Number(sdgFilter))?.title || ''
                      }`)}
            </p>

            <span className="text-xs text-gray-500">
              ({visibleSdgs.length}{' '}
              {isHindi ? 'लक्ष्य' : (visibleSdgs.length === 1 ? 'goal' : 'goals')})
            </span>
          </div>

          {/* Responsive, centered SDG grid */}
          <div
            className={`mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 items-stretch justify-items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3 ${
              visibleSdgs.length === 1
                ? 'sm:grid-cols-1 xl:grid-cols-1'
                : ''
            }`}
          >
            {visibleSdgs.map((sdg) => (
              <div
                key={sdg.id}
                className={`w-full min-w-0 ${
                  visibleSdgs.length === 1 ? 'mx-auto max-w-xl' : ''
                }`}
              >
                <SdgCard sdg={sdg} isHindi={isHindi} />
              </div>
            ))}
          </div>

          {/* Centered transparency note */}
          <div className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Target className="mt-1 h-6 w-6 shrink-0 text-[#ea580c]" />

              <div className="min-w-0">
                <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">
                  {isHindi ? 'पारदर्शी एवं सत्यनिष्ठ प्रभाव के प्रति प्रतिबद्धता' : 'Commitment to Transparent Impact'}
                </h3>

                <p className="text-sm leading-relaxed text-gray-700">
                  {isHindi
                    ? 'यह हमारी प्रस्तावित कार्यप्रणाली और संकेतक हैं। वास्तविक गतिविधियां, लाभार्थी संख्या और परिणाम संस्थागत अभिलेखों तथा सत्यापित माप के आधार पर ही प्रस्तुत किए जाते हैं।'
                    : 'These are proposed implementation approaches and indicators. Actual activities, beneficiary counts, partnerships and outcomes should be published only when supported by organizational records and verified measurements.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
