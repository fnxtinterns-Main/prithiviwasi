/**
 * Prithviwasi Environmental Pledge & Full Website Multilingual Data
 * Contains exact 10-line Hindi pledge text, accurate English translation,
 * full bilingual text for Header, Movement Sections (WHO, WHAT, WHY, HOW),
 * Footer, Form, Success card, and First-Time Visitor Alert Modal.
 */

export const PLEDGE_DATA = {
  hi: {
    sectionBadge: 'राष्ट्रीय पर्यावरण संकल्प अभियान',
    title: 'पर्यावरण संरक्षण प्रतिज्ञा',
    subtitle: 'धरती माता के संरक्षण, संवर्धन और स्वच्छता हेतु हमारा पावन संकल्प',
    ribbonText: 'हमारा पावन राष्ट्रीय पर्यावरण संकल्प',
    paragraphs: [
      'मैं प्रतिज्ञा करता/करती हूँ कि मैं अपनी धरती माता की रक्षा पूरी निष्ठा और जिम्मेदारी से करूँगा/करूँगी।',
      'मैं प्रकृति का पोषण और प्राकृतिक संसाधनों का संरक्षण करूँगा/करूँगी।',
      'मैं जल, वायु, मिट्टी और वन जैसे प्राकृतिक संसाधनों का सदैव सम्मान करूँगा/करूँगी।',
      'मैं कचरा कम करूँगा/करूँगी और स्वच्छता को अपने जीवन का हिस्सा बनाऊँगा/बनाऊँगी।',
      'मैं प्लास्टिक के अनावश्यक उपयोग से बचूँगा/बचूँगी और पर्यावरण-अनुकूल विकल्प अपनाऊँगा/अपनाऊँगी।',
      'मैं पेड़-पौधों की रक्षा करूँगा/करूँगी और अधिक से अधिक वृक्ष लगाने के लिए प्रेरित करूँगा/करूँगी।',
      'मैं सभी जीव-जंतुओं का सम्मान करूँगा/करूँगी और जैव विविधता की रक्षा में अपना योगदान दूँगा/दूँगी।',
      'एक पृथ्वीवासी के रूप में मैं पर्यावरण संरक्षण और स्थिरता के लिए सकारात्मक कार्य करने का संकल्प लेता/लेती हूँ।',
      'मैं स्वयं जागरूक रहूँगा/रहूँगी और अपने परिवार, मित्रों तथा समाज को भी पर्यावरण के प्रति जागरूक करूँगा/करूँगी।',
      'मैं आजीवन जिम्मेदार और जागरूक जीवन जीकर आने वाली पीढ़ियों के लिए एक हरित, स्वच्छ और सुरक्षित भविष्य बनाने में अपना योगदान दूँगा/दूँगी। 🌱'
    ],
    convertOption: {
      btnText: '🌐 Read Pledge in English / अंग्रेज़ी में पढ़ें',
      targetLang: 'en',
      hintText: 'Clicking updates only the pledge into English / केवल प्रतिज्ञा अंग्रेज़ी में बदलेगी'
    },
    registeredBanner: {
      badge: '✓ आप पहले से पंजीकृत हैं',
      heading: 'आपका पर्यावरण संरक्षण संकल्प सक्रिय है',
      description: (name) => `प्रिय ${name}, आप पहले ही पृथ्वीवासी पर्यावरण संरक्षण प्रतिज्ञा स्वीकार कर चुके हैं।`,
      subNotice: 'नीचे आप पुनः प्रतिज्ञा पढ़ सकते हैं तथा इसे अंग्रेज़ी में भी बदल सकते हैं।',
      certLabel: 'प्रतिज्ञा संदर्भ संख्या:',
      dateLabel: 'संकल्प तिथि:',
      roleLabel: 'पंजीकृत भूमिका:',
      emailLabel: 'पंजीकृत ईमेल:',
      shareBtn: 'संकल्प साझा करें 📲',
      retakeBtn: 'विवरण बदलें / नया संकल्प लें'
    },
    form: {
      title: 'प्रतिज्ञा पत्र विवरण',
      subtitle: 'अपना विवरण भरें और पर्यावरण संरक्षण के इस पावन संकल्प में शामिल हों',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
      roleLabel: 'आपकी भूमिका / पद',
      rolePlaceholder: 'अपनी भूमिका चुनें',
      checkboxLabel: 'मैंने प्रतिज्ञा को ध्यानपूर्वक पढ़ा व समझा है और मैं स्वेच्छा से इस संकल्प को स्वीकार करता/करती हूँ।',
      submitBtn: 'प्रतिज्ञा स्वीकार करें',
      submitBtnDisabled: 'कृपया सभी विवरण भरें',
      validationName: 'कृपया अपना नाम दर्ज करें',
      validationEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें',
      validationRole: 'कृपया अपनी भूमिका चुनें',
      validationCheckbox: 'प्रतिज्ञा स्वीकार करने के लिए चेकबॉक्स चुनें'
    },
    roles: [
      { id: 'Student', label: 'विद्यार्थी (Student)' },
      { id: 'Teacher', label: 'शिक्षक / प्राध्यापक (Teacher)' },
      { id: 'Professional', label: 'पेशेवर (Professional)' },
      { id: 'Farmer', label: 'किसान (Farmer)' },
      { id: 'Entrepreneur', label: 'उद्यमी (Entrepreneur)' },
      { id: 'Social Worker', label: 'समाजसेवी (Social Worker)' },
      { id: 'Other', label: 'अन्य (Other)' }
    ],
    success: {
      badge: 'संकल्प पूर्ण हुआ',
      title: 'प्रतिज्ञा सफलतापूर्वक स्वीकार की गई',
      greeting: (name) => `धन्यवाद, ${name}!`,
      mainMessage: 'धरती माता को हरित, स्वच्छ और सुरक्षित बनाने की दिशा में यह एक ऐतिहासिक कदम है।',
      tagline: 'आपका संकल्प हमारी धरती के लिए एक कदम है।',
      dateLabel: 'संकल्प तिथि:',
      certificateIdLabel: 'प्रतिज्ञा संदर्भ संख्या:',
      pledgeTakenLabel: 'स्वीकृत प्रतिज्ञा:',
      viewPledgeBtn: 'प्रतिज्ञा पुनः पढ़ें',
      shareBtn: 'संकल्प साझा करें 📲',
      shareText: (name) => `मैंने पृथ्वीवासी संगठन के साथ पर्यावरण संरक्षण की पावन प्रतिज्ञा ली है। आप भी जुड़ें!`,
      retakeBtn: 'नया संकल्प लें'
    },
    modalAlert: {
      badge: '🌿 प्रथम आगमन विशेष संकल्प आमंत्रण',
      title: 'पर्यावरण संरक्षण प्रतिज्ञा एवं पंजीकरण',
      intro: 'पृथ्वीवासी पोर्टल पर आपका स्वागत है। धरती माता के संरक्षण और आने वाली पीढ़ियों के सुरक्षित भविष्य के लिए कृपया यह संकल्प पढ़ें और अपना नाम दर्ज कराएं।',
      exploreBtn: 'वेबसाइट देखें / बाद में भरें ✕',
      acceptStep: 'प्रतिज्ञा पढ़कर नीचे विवरण दर्ज करें:'
    }
  },
  en: {
    sectionBadge: 'National Environmental Pledge Movement',
    title: 'ENVIRONMENTAL PROTECTION PLEDGE',
    subtitle: 'Our sacred commitment to nurture, protect, and sustain Mother Earth',
    ribbonText: 'Our Sacred National Environmental Commitment',
    paragraphs: [
      'I pledge to protect Mother Earth with complete sincerity and responsibility.',
      'I will nurture nature and conserve natural resources.',
      'I will always respect natural resources such as water, air, soil and forests.',
      'I will reduce waste and make cleanliness a part of my life.',
      'I will avoid the unnecessary use of plastic and adopt environmentally friendly alternatives.',
      'I will protect trees and plants and encourage others to plant more trees.',
      'I will respect all living beings and contribute to the protection of biodiversity.',
      'As a Prithviwasi, I pledge to take positive action for environmental protection and sustainability.',
      'I will remain aware and also spread environmental awareness among my family, friends and society.',
      'I will live a responsible and conscious life and contribute towards creating a green, clean and safe future for generations to come. 🌱'
    ],
    convertOption: {
      btnText: '🇮🇳 Convert Pledge to Hindi / हिंदी में पढ़ें',
      targetLang: 'hi',
      hintText: 'Clicking updates only the pledge into Hindi / केवल प्रतिज्ञा हिंदी में बदलेगी'
    },
    registeredBanner: {
      badge: '✓ You are already registered',
      heading: 'Your Environmental Protection Pledge is Active',
      description: (name) => `Dear ${name}, you have already accepted the Prithviwasi Environmental Protection Pledge.`,
      subNotice: 'Below you can review your registered pledge.',
      certLabel: 'Pledge Certificate ID:',
      dateLabel: 'Date Accepted:',
      roleLabel: 'Registered Role:',
      emailLabel: 'Registered Email:',
      shareBtn: 'Share Your Pledge 📲',
      retakeBtn: 'Update Details / Retake Pledge'
    },
    form: {
      title: 'Pledge Commitment Form',
      subtitle: 'Enter your details to register your environmental commitment',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      roleLabel: 'Your Role / Profession',
      rolePlaceholder: 'Select your role',
      checkboxLabel: 'I have read and understood the pledge and voluntarily accept this commitment.',
      submitBtn: 'ACCEPT PLEDGE',
      submitBtnDisabled: 'Please complete all required fields',
      validationName: 'Please enter your full name',
      validationEmail: 'Please enter a valid email address',
      validationRole: 'Please select your role',
      validationCheckbox: 'Please confirm acceptance by checking the box'
    },
    roles: [
      { id: 'Student', label: 'Student' },
      { id: 'Teacher', label: 'Teacher' },
      { id: 'Professional', label: 'Professional' },
      { id: 'Farmer', label: 'Farmer' },
      { id: 'Entrepreneur', label: 'Entrepreneur' },
      { id: 'Social Worker', label: 'Social Worker' },
      { id: 'Other', label: 'Other' }
    ],
    success: {
      badge: 'Pledge Confirmed',
      title: 'Pledge Accepted Successfully',
      greeting: (name) => `Thank you, ${name}!`,
      mainMessage: 'Thank you for taking a step towards a greener, cleaner and safer future.',
      tagline: 'Your commitment is a step forward for our planet.',
      dateLabel: 'Pledge Date:',
      certificateIdLabel: 'Pledge Certificate ID:',
      pledgeTakenLabel: 'Accepted Commitment:',
      viewPledgeBtn: 'Review Pledge',
      shareBtn: 'Share Your Pledge 📲',
      shareText: (name) => `I have proudly taken the Prithviwasi Environmental Protection Pledge to protect Mother Earth. Join the movement!`,
      retakeBtn: 'Submit Another Pledge'
    },
    modalAlert: {
      badge: '🌿 First-Time Visitor Welcome Pledge',
      title: 'Environmental Protection Pledge & Registration',
      intro: 'Welcome to Prithviwasi. As a first-time visitor, please take a moment to read our sacred commitment to Mother Earth and register your voluntary pledge.',
      exploreBtn: 'Explore Website First ✕',
      acceptStep: 'Read the pledge and submit your details below:'
    }
  }
};

export const SITE_HEADER_TEXT = {
  hi: {
    title: 'PRITHVIWASI',
    subtitle: 'सेवा और सुधार संगठन • संघे शक्ति कलियुगे',
    partnerLogoLabel: 'एजेंट्स ऑफ चेंज - एम्पावरिंग द फ्यूचर',
    nav: [
      { id: 'who', label: 'हम कौन हैं', full: 'WHO - हम कौन हैं' },
      { id: 'what', label: 'हमारा कार्य', full: 'WHAT - हमारा कार्य' },
      { id: 'why', label: 'हमारा उद्देश्य', full: 'WHY - हमारा उद्देश्य' },
      { id: 'how', label: 'सहयोग मार्ग', full: 'HOW - सहयोग मार्ग' },
      { id: 'pledge', label: 'संकल्प प्रतिज्ञा', full: 'PLEDGE - संकल्प प्रतिज्ञा', isPledge: true }
    ],
    menuLabel: 'नेविगेशन मेनू',
    closeLabel: 'बंद करें',
    returnHero: '← वापस लैंडिंग पेज (Hero Page)'
  },
  en: {
    title: 'PRITHVIWASI',
    subtitle: 'Service & Reform Movement • Strength in Unity',
    partnerLogoLabel: 'Agents of Change - Empowering the Future',
    nav: [
      { id: 'who', label: 'WHO', full: 'WHO - Who We Are' },
      { id: 'what', label: 'WHAT', full: 'WHAT - What We Do' },
      { id: 'why', label: 'WHY', full: 'WHY - Why It Matters' },
      { id: 'how', label: 'HOW', full: 'HOW - How You Can Help' },
      { id: 'pledge', label: 'PLEDGE', full: 'PLEDGE - Environmental Pledge', isPledge: true }
    ],
    menuLabel: 'Navigation Menu',
    closeLabel: 'Close',
    returnHero: '← Back to Landing Page (Hero Page)'
  }
};

export const MOVEMENT_SECTIONS = [
  {
    id: 'who',
    icon: '🌏',
    hi: {
      tag: 'पहचान एवं संकल्प',
      title: 'हम कौन हैं? (Who We Are)',
      subtitle: 'पृथ्वीवासी सेवा और सुधार संगठन',
      desc: 'हम प्रकृति, पर्यावरण संरक्षण और समाज सुधार के लिए निष्ठावान समर्पित नागरिकों, युवाओं और प्रबुद्धजनों का राष्ट्रव्यापी महासंगठन हैं। हमारा ध्येय धरती माता के ऋण को चुकाना और आने वाली पीढ़ियों के लिए स्वच्छ, हरित वातावरण सुरक्षित करना है।',
      stat: '100% निःस्वार्थ सेवा',
      statLabel: 'राष्ट्र व प्रकृति समर्पित',
      points: [
        'राष्ट्रप्रेम, सेवा और सनातन पर्यावरण मूल्यों पर आधारित संगठन',
        'वंचित वर्ग, ग्रामीण समाज और युवा शक्ति का सशक्त एकीकरण',
        'प्राकृतिक संतुलन और सामाजिक संस्कारों की पुनर्स्थापना'
      ],
      jumpBtn: 'प्रतिज्ञा पढ़ें एवं लें →'
    },
    en: {
      tag: 'Identity & Purpose',
      title: 'Who We Are (हम कौन हैं)',
      subtitle: 'Prithviwasi Service & Reform Organization',
      desc: 'We are a nationwide collective of dedicated citizens, youth, and leaders united to protect Mother Earth, nurture ecological balance, and instill environmental consciousness across our nation.',
      stat: '100% Dedicated Service',
      statLabel: 'Committed to Mother Earth',
      points: [
        'Rooted in patriotic values, environmental stewardship, and community responsibility',
        'Empowering grassroots citizens, rural communities, and active youth forces',
        'Restoring natural ecological balance and traditional conservation ethics'
      ],
      jumpBtn: 'Take the Pledge →'
    }
  },
  {
    id: 'what',
    icon: '🌱',
    hi: {
      tag: 'धरातलीय कार्य',
      title: 'हमारा कार्य (What We Do)',
      subtitle: 'सेवा ही संकल्प, सुधार ही हमारा लक्ष्य',
      desc: 'प्रत्यक्ष धरातल पर सघन वृक्षारोपण, नदियों-जलाशयों की स्वच्छता, एकल-उपयोग प्लास्टिक के विरुद्ध जन-आंदोलन, जैविक कृषि प्रोत्साहन, तथा ग्रामीण-शहरी क्षेत्रों में स्वच्छता व स्वास्थ्य शिविरों का सतत संचालन।',
      stat: '50,000+ वृक्षारोपण',
      statLabel: 'हरित आवरण संवर्धन',
      points: [
        'सघन वृक्षारोपण एवं देशी प्रजातियों के पौधों का संरक्षण',
        'प्राकृतिक जल स्रोतों और तालाबों का जीर्णोद्धार',
        'शून्य-अपशिष्ट (Zero Waste) जीवनशैली का जन-जागरण'
      ],
      jumpBtn: 'प्रतिज्ञा पढ़ें एवं लें →'
    },
    en: {
      tag: 'Our Ground Work',
      title: 'What We Do (हमारा कार्य)',
      subtitle: 'Service is our pledge, reform is our destination',
      desc: 'Grassroots mass tree plantation drives, water body revival, relentless campaigning against single-use plastic, promotion of natural agriculture, and community-led cleanliness and wellness initiatives.',
      stat: '50,000+ Trees Planted',
      statLabel: 'Nurturing Green Canopies',
      points: [
        'Active afforestation focusing on native species that restore biodiversity',
        'Restoration and desilting of local ponds, wells, and freshwater streams',
        'Empowering citizens to embrace zero-waste and circular living habits'
      ],
      jumpBtn: 'Take the Pledge →'
    }
  },
  {
    id: 'why',
    icon: '☀️',
    hi: {
      tag: 'अस्तित्व का आह्वान',
      title: 'हमारा उद्देश्य (Why It Matters)',
      subtitle: 'पृथ्वी का कर्ज कब चुकाओगे?',
      desc: 'अनियंत्रित प्रदूषण, घटते वन और जलवायु परिवर्तन हमारे अस्तित्व के लिए गंभीर चेतावनी हैं। प्रकृति का शोषण रोककर उसका पोषण करना हमारा परम राष्ट्रीय व मानवीय कर्तव्य है। जब तक हर नागरिक आगे नहीं आएगा, तब तक स्थायी परिवर्तन संभव नहीं है।',
      stat: 'संघे शक्ति कलियुगे',
      statLabel: 'एकता में ही विजय',
      points: [
        'जलवायु संकट और जल संकट का समयबद्ध स्थायी समाधान',
        'पर्यावरणीय न्याय और जैव विविधता का संरक्षण',
        'हमारी आने वाली पीढ़ियों के स्वास्थ्य और सुरक्षा की गारंटी'
      ],
      jumpBtn: 'प्रतिज्ञा पढ़ें एवं लें →'
    },
    en: {
      tag: 'Urgent Imperative',
      title: 'Why It Matters (हमारा उद्देश्य)',
      subtitle: 'When will we repay the debt owed to Mother Earth?',
      desc: 'Escalating climate disruptions, shrinking green covers, and contaminated water tables threaten life itself. Nurturing Mother Earth is our supreme civic duty. Real impact is born when every individual rises to act.',
      stat: 'Sanghe Shakti Kaliyuge',
      statLabel: 'Strength through Unified Action',
      points: [
        'Decisive community action to mitigate groundwater depletion and climate hazards',
        'Preserving biological diversity and animal welfare as moral imperatives',
        'Safeguarding clean breathable air and potable water for upcoming generations'
      ],
      jumpBtn: 'Take the Pledge →'
    }
  },
  {
    id: 'how',
    icon: '🤝',
    hi: {
      tag: 'जन-सहभागिता',
      title: 'सहयोग का मार्ग (How We Work)',
      subtitle: 'संगठित जन-शक्ति से ही संभव है महापरिवर्तन',
      desc: 'हम जमीनी स्तर पर जन-सहयोग और सामुदायिक भागीदारी से कार्य करते हैं। प्रत्येक नागरिक हमारे साथ जुड़कर अपने स्तर पर प्रतिज्ञा ले सकता है, वृक्ष लगा सकता है, और संगठन के अभियानों में सक्रिय योगदान दे सकता है।',
      stat: '18,000+ सहभागी',
      statLabel: 'जागरूक संकल्पित परिवार',
      points: [
        'पर्यावरण संरक्षण प्रतिज्ञा ग्रहण कर स्वयं से शुरुआत',
        'स्थानीय स्तर पर वृक्षारोपण व स्वच्छता दलों का गठन',
        'विद्यालयों, महाविद्यालयों और कॉलोनियों में जागरूकता अभियान'
      ],
      jumpBtn: 'प्रतिज्ञा पढ़ें एवं लें →'
    },
    en: {
      tag: 'Collective Action',
      title: 'How You Can Help (सहयोग मार्ग)',
      subtitle: 'Transformational impact through collective citizen power',
      desc: 'Every milestone starts with voluntary citizen engagement. Start by formally taking the national pledge, adopt a tree, practice waste minimization, and rally your local neighborhood and student communities.',
      stat: '18,000+ Pledged Citizens',
      statLabel: 'Active Changemakers Nationwide',
      points: [
        'Take and uphold the formal Environmental Protection Pledge today',
        'Form and lead hyper-local tree-planting and pond-cleaning task forces',
        'Spread ecological mindfulness in educational campuses and housing societies'
      ],
      jumpBtn: 'Take the Pledge →'
    }
  }
];

export const SITE_FOOTER_TEXT = {
  hi: {
    brandTitleHi: 'पृथ्वीवासी सेवा और सुधार संगठन',
    brandTitleEn: 'PRITHVIWASI SEVA AUR SUDHAR SANGATHAN',
    collabNotice: 'सहयोगी अभियान: एजेंट्स ऑफ चेंज (Agents of Change - Empowering the Future)',
    missionLead: 'धरती माता के संरक्षण, संवर्धन और स्वच्छता को समर्पित एक राष्ट्रव्यापी सामाजिक-पर्यावरणीय महाअभियान। संघे शक्ति कलियुगे — जन-जागरूकता और संगठित सेवा से ही नव-निर्माण संभव है।',
    pillarsTitle: 'अभियान के 4 आधार स्तंभ',
    pillars: [
      '🌲 सघन देशी वृक्षारोपण',
      '💧 जल संरक्षण एवं नदी स्वच्छता',
      '🚫 प्लास्टिक मुक्त भारत आंदोलन',
      '🕊️ अहिंसा एवं जीव-दया संवर्धन'
    ],
    linksTitle: 'त्वरित नेविगेशन',
    links: [
      { id: 'pledge', label: '🌿 पर्यावरण संरक्षण प्रतिज्ञा' },
      { id: 'who', label: 'हम कौन हैं (Who We Are)' },
      { id: 'what', label: 'हमारा कार्य (What We Do)' },
      { id: 'why', label: 'हमारा उद्देश्य (Why It Matters)' },
      { id: 'how', label: 'सहयोग मार्ग (How We Work)' }
    ],
    actionTitle: 'सक्रिय सहभागिता',
    returnBtn: '← वापस लैंडिंग पेज (Hero Page)',
    pledgeBtn: '🌿 पर्यावरण प्रतिज्ञा लें',
    quote: '"प्रकृति का पोषण, राष्ट्र का रक्षण। धरती माता की जय!"',
    copyright: '© 2026 पृथ्वीवासी सेवा और सुधार संगठन। सर्वाधिकार सुरक्षित।',
    cleanIndia: 'स्वच्छ भारत • हरित भारत • सुरक्षित भविष्य 🌱'
  },
  en: {
    brandTitleHi: 'PRITHVIWASI SEVA AUR SUDHAR SANGATHAN',
    brandTitleEn: 'Service & Reform Movement for Mother Earth',
    collabNotice: 'In Alliance with: Agents of Change - Empowering the Future',
    missionLead: 'A dedicated environmental and social movement striving to protect, revive, and sustain Mother Earth. Through community solidarity and civic discipline, we create a thriving natural inheritance.',
    pillarsTitle: '4 Core Pillars of Action',
    pillars: [
      '🌲 Native Afforestation & Tree Care',
      '💧 Watershed & River Revitalization',
      '🚫 Plastic-Free Communities Movement',
      '🕊️ Compassion & Biodiversity Welfare'
    ],
    linksTitle: 'Quick Navigation',
    links: [
      { id: 'pledge', label: '🌿 Environmental Pledge' },
      { id: 'who', label: 'Who We Are' },
      { id: 'what', label: 'What We Do' },
      { id: 'why', label: 'Why It Matters' },
      { id: 'how', label: 'How You Can Help' }
    ],
    actionTitle: 'Take Action',
    returnBtn: '← Back to Landing Page (Hero Page)',
    pledgeBtn: '🌿 Take the Environmental Pledge',
    quote: '"Nurturing Nature, Protecting our Nation. Long Live Mother Earth!"',
    copyright: '© 2026 Prithviwasi Seva Aur Sudhar Sangathan. All Rights Reserved.',
    cleanIndia: 'Green Earth • Clean Communities • Secure Tomorrow 🌱'
  }
};
