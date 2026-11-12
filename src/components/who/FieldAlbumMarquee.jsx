import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Camera,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Heart,
  Calendar,
  Tag
} from 'lucide-react';

export default function FieldAlbumMarquee() {
  const { isHindi } = useLanguage();
  const [activePhoto, setActivePhoto] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showFullGalleryModal, setShowFullGalleryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isPaused, setIsPaused] = useState(false);

  // 100% Unique, Non-repeating Grassroots Photos (Checked & Verified)
  // Each description accurately reflects what is genuinely taking place in the image.
  const albumPhotos = [
    {
      id: '01',
      src: '/assets/who_images/ranchi_talab_safai_abhiyan.jpg',
      titleEn: 'Pond Rejuvenation & Water Conservation Drive | Ranchi, Jharkhand',
      titleHi: 'तालाब सफाई अभियान | Ranchi, Jharkhand',
      catKey: 'ENV',
      catEn: 'Water Conservation',
      catHi: 'जल संरक्षण व स्वच्छता',
      descEn: 'Commendable initiative by PRITHVIWASI removing invasive water hyacinth weeds from water bodies for clean environment and water security.',
      descHi: 'PRITHVIWASI द्वारा जलाशय की सफाई एवं जलकुंभी हटाकर स्वच्छ पर्यावरण और जल संरक्षण की दिशा में एक सराहनीय पहल।',
      tagEn: 'Water Rejuvenation',
      tagHi: 'जल संरक्षण',
    },
    {
      id: '02',
      src: '/assets/who_images/2006_cremation_pyre.jpeg',
      titleEn: 'Respectful Vedic Cremation of Unclaimed Souls',
      titleHi: 'लावारिस व बेसहारा शवों का ससम्मान वैदिक दाह संस्कार',
      catKey: 'SEVA',
      catEn: 'Dignified Rites',
      catHi: 'अंतिम संस्कार सेवा',
      descEn: 'Solemn cremation and Vedic last rites performed at the pyre to ensure human dignity for unclaimed souls.',
      descHi: 'श्मशान घाट पर लावारिस व बेसहारा आत्माओं का पूर्ण धार्मिक विधि-विधान व वैदिक मर्यादा के साथ पावन मुखाग्नि संस्कार।',
      tagEn: 'Human Dignity',
      tagHi: 'मानवीय गरिमा',
    },
    {
      id: '03',
      src: '/assets/who_album/album_120.jpg',
      titleEn: 'Gaushala Sanctuary & Destitute Cattle Care',
      titleHi: 'गौशाला आश्रय एवं नन्हें बछड़ों की स्नेहमयी सेवा',
      catKey: 'SEVA',
      catEn: 'Cattle Welfare',
      catHi: 'गौ-संरक्षण व सेवा',
      descEn: 'Shelter, nutritious green fodder, and gentle care for rescued indigenous cows and calves in the sanctuary shed.',
      descHi: 'गौशाला शेड में बेसहारा देशी गायों व छोटे बछड़ों को स्वच्छ आश्रय, हरा चारा और नियमित औषधीय देखभाल।',
      tagEn: 'Animal Compassion',
      tagHi: 'जीव दया',
    },
    {
      id: '04',
      src: '/assets/who_album/album_001.jpg',
      titleEn: 'Slum Child Education & Women Vocational Sewing Center',
      titleHi: 'कच्ची बस्ती बाल शिक्षा एवं महिला सिलाई स्वावलंबन केंद्र',
      catKey: 'EDU',
      catEn: 'Education & Skills',
      catHi: 'शिक्षा व स्वावलंबन',
      descEn: 'Free foundational schooling for slum children and tailoring skills for women to build financial self-reliance.',
      descHi: 'झुग्गी बस्तियों में बच्चों को कॉपी-किताब से नि:शुल्क पढ़ाई तथा माताओं-बहनों को सिलाई मशीनों पर हुनरमंद बनाने का केंद्र।',
      tagEn: 'Empowerment',
      tagHi: 'महिला उत्थान',
    },
    {
      id: '05',
      src: '/assets/who_album/album_002.jpg',
      titleEn: 'Rural Schoolgirls Dedicated Learning & Value Exam',
      titleHi: 'ग्रामीण विद्यालय में छात्राओं का लगनशील अध्ययन व संस्कार परीक्षा',
      catKey: 'EDU',
      catEn: 'Girl Education',
      catHi: 'बालिका शिक्षा',
      descEn: 'Disciplined village schoolgirls in uniform sitting on the classroom floor appearing for moral education tests.',
      descHi: 'सुदूर गांव में यूनिफॉर्म पहनकर जमीन पर बैठकर एकाग्रचित्त होकर संस्कार व ज्ञान परीक्षा में भाग लेतीं बेटियां।',
      tagEn: 'Knowledge',
      tagHi: 'ज्ञानार्जन',
    },
    {
      id: '06',
      src: '/assets/who_album/album_003.jpg',
      titleEn: 'School Character Building & Moral Values Assembly',
      titleHi: 'विद्यालयी संस्कार, अनुशासन व चरित्र निर्माण कार्यशाला',
      catKey: 'EDU',
      catEn: 'Sanskar Workshop',
      catHi: 'संस्कार चेतना',
      descEn: 'Large school hall assembly of students receiving inspiring guidance on ethics, discipline, and nation-building.',
      descHi: 'विद्यालय सभागार में बड़ी संख्या में उपस्थित विद्यार्थियों को नैतिक मूल्य, पर्यावरण व राष्ट्र सेवा का पावन मार्गदर्शन।',
      tagEn: 'Youth Sanskar',
      tagHi: 'युवा चेतना',
    },
    {
      id: '07',
      src: '/assets/who_album/album_014.jpg',
      titleEn: 'Academic Talent & Value Assessment for Boys',
      titleHi: 'युवा छात्रों की बौद्धिक प्रतिभा परीक्षा एवं शैक्षणिक मार्गदर्शन',
      catKey: 'EDU',
      catEn: 'Youth Talent',
      catHi: 'शैक्षणिक प्रतिभा',
      descEn: 'Young boys in uniform writing attentively on question sheets during school competitive talent evaluation.',
      descHi: 'कक्षा में दरी पर बैठकर प्रश्न-पत्र हल करते अनुशासित छात्र, जो अपनी बौद्धिक क्षमता और संस्कारों का परिचय दे रहे हैं।',
      tagEn: 'Student Talent',
      tagHi: 'विद्यार्थी प्रतिभा',
    },
    {
      id: '08',
      src: '/assets/who_album/album_004.jpg',
      titleEn: 'Grand Multi-Faith Mass Wedding Felicitation Stage',
      titleHi: 'सर्वजातीय आदर्श सामूहिक विवाह महोत्सव (मंच आशीर्वाद)',
      catKey: 'VIVAH',
      catEn: 'Mass Wedding',
      catHi: 'सामूहिक विवाह',
      descEn: 'Grand mass marriage of underprivileged daughters with full honors, traditional safas, gifts, and stage blessings.',
      descHi: 'सुसज्जित मंच पर निर्धन व जरूरतमंद कन्याओं का ससम्मान सामूहिक विवाह—पारंपरिक पगड़ी, वरमाला, उपहार व बड़ों का आशीर्वाद।',
      tagEn: 'Social Equality',
      tagHi: 'समानता व सम्मान',
    },
    {
      id: '09',
      src: '/assets/who_album/album_005.jpg',
      titleEn: 'Sacred Vedic Havan & Wedding Rituals at Mass Marriage',
      titleHi: 'सामूहिक विवाह में पावन वैदिक हवन एवं अग्नि-साक्षी फेरे',
      catKey: 'VIVAH',
      catEn: 'Vedic Rituals',
      catHi: 'वैदिक विवाह संस्कार',
      descEn: 'Dozens of couples seated in rows performing sacred Vedic marriage havan with Vedic mantras and sacred pyre.',
      descHi: 'भव्य विवाह प्रांगण में आचार्यों द्वारा वैदिक मंत्रोच्चार के बीच पावन अग्नि को साक्षी मानकर फेरे लेते नवयुगल।',
      tagEn: 'Sacred Vows',
      tagHi: 'वैदिक मर्यादा',
    },
    {
      id: '10',
      src: '/assets/who_album/album_050.jpg',
      titleEn: 'Wheelchair Distribution & Care for Differently-Abled Children',
      titleHi: 'विशेष आवश्यकता वाले दिव्यांग बच्चों को व्हीलचेयर व पोषण संबल',
      catKey: 'DIVYANG',
      catEn: 'Divyang Welfare',
      catHi: 'दिव्यांग बाल सेवा',
      descEn: 'Trustees and doctors distributing new wheelchairs, refreshments, and supportive aids to disabled children and mothers.',
      descHi: 'सभागार में चिकित्सकों व संस्थापकों द्वारा दिव्यांग बच्चों को व्हीलचेयर, पोषण सामग्री और आत्मीय स्नेह संबल प्रदान करते हुए।',
      tagEn: 'Child Care',
      tagHi: 'स्नेहमयी सेवा',
    },
    {
      id: '11',
      src: '/assets/who_album/album_070.jpg',
      titleEn: 'Support at Guru Nanak Home for Handicapped Children',
      titleHi: 'गुरु नानक होम फॉर हैंडीकैप्ड चिल्ड्रन में मातृ-शिशु सहयोग',
      catKey: 'DIVYANG',
      catEn: 'Special Home Seva',
      catHi: 'विशेष गृह सेवा',
      descEn: 'Meeting mothers and children at Guru Nanak Home with love, counselling, and continuous healthcare support.',
      descHi: 'दिव्यांग बच्चों के विशेष गृह में उपस्थित माताओं व बच्चों से संवाद कर उन्हें चिकित्सा परामर्श और आवश्यक सहायता।',
      tagEn: 'Special Children',
      tagHi: 'विशेष बच्चे',
    },
    {
      id: '12',
      src: '/assets/who_album/album_122.jpg',
      titleEn: 'Joy of Giving & Sweet Distribution to Slum Children',
      titleHi: 'झुग्गी-बस्ती के नन्हें-मुन्ने बच्चों को मिठाई व स्नेह वितरण',
      catKey: 'EDU',
      catEn: 'Child Nutrition',
      catHi: 'बाल पोषण व मुस्कान',
      descEn: 'Volunteers distributing sweet boxes, nutrition packs, and smiles to underprivileged barefoot children.',
      descHi: 'कच्ची बस्ती में जाकर निर्धन बच्चों के हाथों में ताजी मिठाइयों के डिब्बे और खुशियां बांटते स्वयंसेवक।',
      tagEn: 'Child Happiness',
      tagHi: 'बाल मुस्कान',
    },
    {
      id: '13',
      src: '/assets/who_album/album_025.jpg',
      titleEn: 'Winter Relief Blankets & Wheelchair Distribution for Destitute Elders',
      titleHi: 'ग्रामीण बुजुर्गों व दिव्यांगों को व्हीलचेयर एवं गर्म कम्बल वितरण',
      catKey: 'DIVYANG',
      catEn: 'Winter Relief',
      catHi: 'शीतकालीन राहत',
      descEn: 'Providing wheelchairs and warm black winter blankets to elderly villagers and divyang elders in remote blocks.',
      descHi: 'कड़ाके की ठंड में असहाय ग्रामीण बुजुर्गों व दिव्यांगों को गर्म कम्बल और आवागमन हेतु व्हीलचेयर का व्यवस्थित सहयोग।',
      tagEn: 'Elder Support',
      tagHi: 'वृद्धजन सहारा',
    },
    {
      id: '14',
      src: '/assets/who_album/album_041.jpg',
      titleEn: 'Heartfelt Blessings & Gratitude from a Village Grandmother',
      titleHi: 'सहयोग पाकर भावुक वृद्ध माता का हाथ जोड़कर पावन आशीर्वाद',
      catKey: 'DIVYANG',
      catEn: 'Elder Blessings',
      catHi: 'मातृ आशीर्वाद',
      descEn: 'An elderly destitute grandmother sitting with folded hands expressing deep heartfelt gratitude and blessings.',
      descHi: 'संस्था से सहायता और सम्मान पाकर जमीन पर हाथ जोड़कर निस्वार्थ सेवा के लिए अंतःकरण से आशीर्वाद देती वृद्ध माता।',
      tagEn: 'Pure Gratitude',
      tagHi: 'सच्चा आशीर्वाद',
    },
    {
      id: '15',
      src: '/assets/who_album/album_175.jpg',
      titleEn: 'Free Health & Medicine Camp at Ramawati Old Age Home, Ratu',
      titleHi: 'रामावती वृद्धाश्रम (रातू प्रखण्ड) में निःशुल्क स्वास्थ्य व दवा वितरण शिविर',
      catKey: 'HEALTH',
      catEn: 'Elder Healthcare',
      catHi: 'वृद्धाश्रम आरोग्य',
      descEn: 'Doctor consultations, checkups, and distribution of essential medicines for senior residents at Ramawati Old Age Home.',
      descHi: 'रातू प्रखण्ड के रामावती वृद्धाश्रम में डॉक्टरों की टीम द्वारा बुजुर्गों की सेहत की जांच एवं निःशुल्क दवाइयां उपलब्ध कराई गईं।',
      tagEn: 'Free Medicine',
      tagHi: 'निःशुल्क चिकित्सा',
    },
    {
      id: '16',
      src: '/assets/who_album/album_100.jpg',
      titleEn: 'Senior Citizens Fellowship & Joyful Dialogue in Garden',
      titleHi: 'उपवन में वृद्धजनों के साथ आत्मीय संवाद, सत्संग व मानसिक संबल',
      catKey: 'HEALTH',
      catEn: 'Senior Wellness',
      catHi: 'वृद्धजन सत्संग',
      descEn: 'Elderly citizens sitting together with smiles on an ashram garden bench, receiving emotional warmth and dignity.',
      descHi: 'हरियाली के बीच पार्क बेंच पर मुस्कुराते वृद्धजन, जिनके साथ बैठकर संस्था के सदस्यों ने उनके दुख-दर्द बांटे।',
      tagEn: 'Dignified Ageing',
      tagHi: 'सम्मानित बुढ़ापा',
    },
    {
      id: '17',
      src: '/assets/who_album/album_101.jpg',
      titleEn: 'Elderly Mobility Aid & Memorial Seva Gathering',
      titleHi: 'वरिष्ठ नागरिकों की सेवा व लाठी-सहारा संबल अभियान',
      catKey: 'HEALTH',
      catEn: 'Mobility Support',
      catHi: 'लाठी-सहारा सेवा',
      descEn: 'Supporting senior citizens with walking sticks, companionship, and care during an elder memorial gathering.',
      descHi: 'वृद्ध माताओं-पिताओं को चलने में सहायता हेतु लाठी प्रदान करना और उनके स्वास्थ्य की नियमित निगरानी करना।',
      tagEn: 'Walking Support',
      tagHi: 'कदम संबल',
    },
    {
      id: '18',
      src: '/assets/who_images/2023_youth_sanskar_defense.jpeg',
      titleEn: 'Jharkhand State Traditional Martial Sports Championship, Urugutu',
      titleHi: 'झारखण्ड स्तरीय पारंपरिक अस्त्र-शस्त्र चालन व खेल महोत्सव (उरुगुटू)',
      catKey: 'YOUTH',
      catEn: 'Martial Sports',
      catHi: 'पारंपरिक खेल व शौर्य',
      descEn: 'State championship organized at Urugutu Bazar Tand promoting traditional defense sports, discipline, and awards.',
      descHi: 'उरुगुटू बाजार टांड़ में आयोजित राज्य स्तरीय पारंपरिक खेल प्रतियोगिता—मंच पर स्वर्ण ट्राफियां और युवा शौर्य सम्मान।',
      tagEn: 'Youth Discipline',
      tagHi: 'युवा शौर्य',
    },
    {
      id: '19',
      src: '/assets/who_album/album_145.jpg',
      titleEn: 'Vedic Cultural Vows & Sanskar Pledge by Youth Girls',
      titleHi: 'बालिका सांस्कृतिक दल द्वारा राष्ट्र चेतना व संस्कार प्रतिज्ञा',
      catKey: 'YOUTH',
      catEn: 'Cultural Vow',
      catHi: 'सांस्कृतिक प्रतिज्ञा',
      descEn: 'Young girls in traditional saffron and yellow attire taking a solemn public pledge for culture, heritage, and pride.',
      descHi: 'पारंपरिक वेशभूषा में सजी बालिकाओं द्वारा हाथ उठाकर राष्ट्र चेतना, वैदिक संस्कार व महिला शक्ति की रक्षा का पावन संकल्प।',
      tagEn: 'Cultural Heritage',
      tagHi: 'राष्ट्र चेतना',
    },
    {
      id: '20',
      src: '/assets/who_album/album_222.jpg',
      titleEn: 'Grassroots Village Assembly & Community Dialogue',
      titleHi: 'सुदूर ग्रामीण अंचल में ग्रामवासियों, माताओं व युवाओं संग चौपाल',
      catKey: 'COMMUNITY',
      catEn: 'Village Outreach',
      catHi: 'ग्रामीण चौपाल',
      descEn: 'Connecting with 20+ village families, mothers, and youth to address rural health, livelihood, and community rights.',
      descHi: 'खपड़ैल घरों के बीच पूरे गांव के महिला-पुरुषों, बच्चों और युवाओं के साथ जमीन से जुड़कर सामूहिक कल्याणकारी चर्चा।',
      tagEn: 'Grassroots Voice',
      tagHi: 'जन-संवाद',
    },
    {
      id: '21',
      src: '/assets/who_album/album_112.jpg',
      titleEn: 'Village Tree Panchayat & Awareness Leaflet Distribution',
      titleHi: 'ग्रामीण वृक्ष की छांव में चौपाल एवं जन-जागरूकता पत्रक वितरण',
      catKey: 'COMMUNITY',
      catEn: 'Village Awareness',
      catHi: 'जन-जागरूकता',
      descEn: 'Trustees and village elders standing together under the village tree distributing guidance pamphlets to farmers.',
      descHi: 'विशाल वृक्ष की छांव में एकत्रित ग्रामीणों व किसानों को सामाजिक कुरीतियों के उन्मूलन व अधिकारों के पत्रक सौंपते हुए।',
      tagEn: 'Farmer Outreach',
      tagHi: 'किसान संवाद',
    },
    {
      id: '22',
      src: '/assets/who_album/album_020.jpg',
      titleEn: 'Maternal Nutrition & Community Gathering for Rural Mothers',
      titleHi: 'ग्रामीण माताओं व नन्हें शिशुओं के लिए पोषण व स्नेह मिलन',
      catKey: 'HEALTH',
      catEn: 'Maternal Care',
      catHi: 'मातृ-शिशु सुरक्षा',
      descEn: 'Joyful gathering of rural mothers and infants to promote maternal nutrition, immunisation, and hygiene habits.',
      descHi: 'सुदूर गांव की माताओं और उनकी गोद में खिलखिलाते शिशुओं को संतुलित आहार और स्वास्थ्य सुरक्षा की प्रेरणा।',
      tagEn: 'Mother & Child',
      tagHi: 'मातृ ममता',
    },
    {
      id: '23',
      src: '/assets/who_album/album_080.jpg',
      titleEn: 'Representing Grassroots Health at Digi Health Conclave, Ranchi',
      titleHi: 'झारखण्ड सरकार "डिजी हेल्थ कॉन्क्लेव" (चाणक्य BNR, रांची) में सहभागिता',
      catKey: 'POLICY',
      catEn: 'State Conclave',
      catHi: 'राज्य स्तरीय कॉन्क्लेव',
      descEn: 'Trust leaders participating in the Govt of Jharkhand Digi Health Conclave at Chanakya BNR Ranchi.',
      descHi: 'चाणक्य बीएनआर होटल रांची में झारखण्ड सरकार के आधिकारिक स्वास्थ्य सम्मेलन में ट्रस्ट के संस्थापकों की सक्रिय सहभागिता।',
      tagEn: 'Health Policy',
      tagHi: 'स्वास्थ्य नीति',
    },
    {
      id: '24',
      src: '/assets/who_album/album_085.jpg',
      titleEn: 'Active Participation in State Healthcare Policy Convention',
      titleHi: 'राज्य स्तरीय स्वास्थ्य संगोष्ठी के विशाल सभागार में भागीदारी',
      catKey: 'POLICY',
      catEn: 'Policy Assembly',
      catHi: 'स्वास्थ्य संगोष्ठी',
      descEn: 'Massive auditorium of doctors, policymakers, and civil society leaders deliberating on accessible public healthcare.',
      descHi: 'सभागार में उपस्थित सैकड़ों चिकित्सकों, विशेषज्ञों और सामाजिक संगठनों के साथ ग्रामीण स्वास्थ्य सुधार पर विमर्श।',
      tagEn: 'Public Health',
      tagHi: 'लोक स्वास्थ्य',
    },
    {
      id: '25',
      src: '/assets/who_album/album_139.jpg',
      titleEn: 'Sacred Vow of Selfless Humanitarian Service at Daksheshwar Shrine',
      titleHi: 'श्री दक्षेश्वर महादेव पावन धाम पर निस्वार्थ समाज सेवा का संकल्प',
      catKey: 'SEVA',
      catEn: 'Sacred Vow',
      catHi: 'सेवा संकल्प',
      descEn: 'Trustees and volunteers receiving holy prasad and taking solemn lifelong vows of dedicated humanitarian seva.',
      descHi: 'पवित्र तीर्थ स्थल पर माता की चुनरी व प्रसाद ग्रहण कर समाज के अंतिम व्यक्ति तक सेवा पहुंचाने का अटूट संकल्प।',
      tagEn: 'Devotion to Seva',
      tagHi: 'समर्पण भाव',
    },
    {
      id: '26',
      src: '/assets/who_album/album_220.jpg',
      titleEn: 'Consultation with Tribal Intellectuals & Community Scholars at Trust Office',
      titleHi: 'संस्था कार्यालय में जनजातीय व सामाजिक प्रबुद्धजनों के साथ विमर्श',
      catKey: 'COMMUNITY',
      catEn: 'Scholarly Council',
      catHi: 'प्रबुद्धजन परामर्श',
      descEn: 'Trust leadership consulting with tribal elders, reviewing Jharkhand literature and chalking community welfare drives.',
      descHi: 'कार्यालय में झारखंड के इतिहास व संस्कृति के प्रबुद्ध चिंतकों के साथ मिलकर वनवासी कल्याण की कार्ययोजना बनाना।',
      tagEn: 'Tribal Leadership',
      tagHi: 'जनजातीय चिंतन',
    },
    {
      id: '27',
      src: '/assets/who_album/album_215.jpg',
      titleEn: 'Trust Founders & Field Coordinators Planning Strategy Session',
      titleHi: 'संस्थापक मंडल व समन्वयकों की अंतरंग कार्ययोजना एवं रणनीति बैठक',
      catKey: 'COMMUNITY',
      catEn: 'Strategic Planning',
      catHi: 'कार्ययोजना बैठक',
      descEn: 'Dedicated core team and village coordinators mapping out timelines and field targets for upcoming relief drives.',
      descHi: 'संस्था के संस्थापक सदस्यों और क्षेत्रीय कार्यकर्ताओं की बैठक, जिसमें सेवा कार्यों को धरातल पर गति देने का निर्णय हुआ।',
      tagEn: 'Team Coordination',
      tagHi: 'संगठन शक्ति',
    },
    {
      id: '28',
      src: '/assets/who_images/2024_community_meeting.jpeg',
      titleEn: 'Grand Public Gram Sabha & Citizen Assembly for Social Reform',
      titleHi: 'सामाजिक चेतना एवं जन-कल्याण हेतु विशाल नागरिक ग्राम सभा',
      catKey: 'COMMUNITY',
      catEn: 'Citizen Sabha',
      catHi: 'विशाल जन-सभा',
      descEn: 'Packed auditorium gathering of youth, farmers, and social workers discussing environmental and social upliftment.',
      descHi: 'सभागार में खचाखच भरे नागरिकों, युवाओं और प्रबुद्धजनों की सामूहिक विचार-मंथन सभा, जहां पर्यावरण व समाज सुधार का संकल्प लिया गया।',
      tagEn: 'Public Movement',
      tagHi: 'जन आंदोलन',
    },
  ];

  // Category filter tabs
  const categories = [
    { key: 'ALL', labelHi: 'समस्त छायाचित्र (२८)', labelEn: 'All Photos (28)' },
    { key: 'ENV', labelHi: 'तालाब व जल संरक्षण', labelEn: 'Water & Environment' },
    { key: 'EDU', labelHi: 'शिक्षा व बाल कल्याण', labelEn: 'Education & Children' },
    { key: 'VIVAH', labelHi: 'सामूहिक विवाह', labelEn: 'Mass Weddings' },
    { key: 'DIVYANG', labelHi: 'दिव्यांग व वृद्ध सेवा', labelEn: 'Divyang & Elders' },
    { key: 'HEALTH', labelHi: 'आरोग्य व वृद्धाश्रम', labelEn: 'Health & Old Age' },
    { key: 'YOUTH', labelHi: 'युवा शौर्य व संस्कृति', labelEn: 'Youth & Culture' },
    { key: 'COMMUNITY', labelHi: 'ग्रामीण चौपाल व समाज', labelEn: 'Village Outreach' },
    { key: 'SEVA', labelHi: 'गौ व अंतिम संस्कार', labelEn: 'Gaushala & Cremation' },
    { key: 'POLICY', labelHi: 'राज्य नीति व सम्मेलन', labelEn: 'State Conclave' },
  ];

  const filteredPhotos =
    selectedCategory === 'ALL'
      ? albumPhotos
      : albumPhotos.filter((p) => p.catKey === selectedCategory);

  const openLightbox = (photo, index) => {
    setActivePhoto(photo);
    setActivePhotoIndex(index);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const nextIdx =
      (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhotoIndex(nextIdx);
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = (activePhotoIndex + 1) % filteredPhotos.length;
    setActivePhotoIndex(nextIdx);
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, activePhotoIndex, filteredPhotos]);

  return (
    <section
      className="py-16 sm:py-24 bg-[#f8faf9] border-b border-gray-200/80 overflow-hidden"
      id="photo-album"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        {/* Header with Bilingual Support */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#0b5e34] border border-emerald-200 shadow-2xs mb-2">
              <Camera className="w-3.5 h-3.5 text-[#0b5e34]" />
              <span>
                {isHindi
                  ? 'धरातलीय छायाचित्र एल्बम • २८ प्रामाणिक तस्वीरें'
                  : 'Grassroots Photo Album • 28 Verified Field Photos'}
              </span>
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight font-serif">
              {isHindi
                ? 'जमीनी सेवा कार्यों का वास्तविक छायाचित्र संग्रह'
                : 'Living Gallery of Genuine Grassroots Action'}
            </h2>

            <p className="mt-1 text-gray-600 text-xs sm:text-sm max-w-2xl">
              {isHindi
                ? 'विगत दो दशकों में धरातल पर हुए कार्यों की २८ बिल्कुल अलग और प्रामाणिक तस्वीरें (तालाब सफाई, बाल शिक्षा, सामूहिक विवाह, दिव्यांग सेवा, आदि)। हर तस्वीर के नीचे उसकी वास्तविक जानकारी दर्ज है।'
                : '28 distinct, verified photographs documenting two decades of service with zero duplicate or repeated scenes. Every photo details the real ground event.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs border border-gray-300 shadow-2xs transition-all cursor-pointer"
              title={isPaused ? 'Resume Album' : 'Pause Album'}
            >
              <span>{isPaused ? '▶ प्ले करें' : '⏸ रोकें'}</span>
            </button>

            <button
              onClick={() => setShowFullGalleryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b5e34] hover:bg-[#084827] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#ea580c]" />
              <span>
                {isHindi ? 'पूरा एल्बम देखें (२८ फोटो) ↗' : 'Browse Full Album (28 Photos) ↗'}
              </span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0b5e34] text-white border-[#0b5e34] shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                {isHindi ? cat.labelHi : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTINUOUS MOVING ALBUM ROW (SINGLE ROW, HOVER TO PAUSE) */}
      <div
        className="relative w-full py-4 overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Edge Gradient Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f8faf9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f8faf9] to-transparent z-10 pointer-events-none" />

        <div
          className={`flex items-stretch gap-5 sm:gap-6 px-4 ${
            isPaused ? '' : 'animate-album-marquee'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            width: 'max-content',
          }}
        >
          {/* Duplicate the array twice for seamless infinite loop */}
          {[...filteredPhotos, ...filteredPhotos].map((photo, index) => {
            const realIndex = index % filteredPhotos.length;
            const title = isHindi ? photo.titleHi : photo.titleEn;
            const category = isHindi ? photo.catHi : photo.catEn;
            const desc = isHindi ? photo.descHi : photo.descEn;
            const tag = isHindi ? photo.tagHi : photo.tagEn;

            return (
              <div
                key={`${photo.src}-${index}`}
                onClick={() => openLightbox(photo, realIndex)}
                className="w-76 sm:w-84 shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-2xl hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Photo Container with Album Framing */}
                <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden border-b border-gray-100">
                  <img
                    src={photo.src}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-gray-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-[#0b5e34]" />
                      <span>{isHindi ? 'बड़ा देखें' : 'View Full Photo'}</span>
                    </span>
                  </div>

                  {/* Floating Category Pill */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-[#0b5e34] text-white shadow-xs backdrop-blur-xs">
                    {category}
                  </span>

                  {/* Photo Index Number */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-black font-mono bg-black/60 text-white backdrop-blur-xs">
                    #{photo.id}
                  </span>
                </div>

                {/* Caption Footer - Explains Exactly What Is Happening */}
                <div className="p-4 bg-white flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Tag className="w-3 h-3 text-[#ea580c]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea580c]">
                        {tag}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 font-serif leading-snug line-clamp-2">
                      {title}
                    </h4>

                    <p className="text-[11px] text-gray-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-medium">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {isHindi ? 'प्रामाणिक धरातलीय छायाचित्र' : 'Verified Field Record'}
                    </span>
                    <span className="text-gray-400">
                      {isHindi ? 'क्लिक कर पढ़ें ↗' : 'Click to inspect ↗'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR SINGLE PHOTO INSPECTION */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#fcfdfc] shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 bg-[#0b5e34] text-white text-xs font-bold rounded-lg font-mono">
                  #{activePhoto.id}
                </span>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                  {isHindi ? activePhoto.catHi : activePhoto.catEn}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 font-serif line-clamp-1">
                  {isHindi ? activePhoto.titleHi : activePhoto.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image with Navigation Arrows */}
            <div className="relative bg-[#111] flex-1 min-h-[300px] max-h-[62vh] flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.src}
                alt={isHindi ? activePhoto.titleHi : activePhoto.titleEn}
                className="w-full h-full max-h-[62vh] object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-lg"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer Description - What Is Happening */}
            <div className="p-4 sm:p-5 bg-white border-t border-gray-100 shrink-0">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ea580c] uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{isHindi ? activePhoto.tagHi : activePhoto.tagEn}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 font-normal">
                    {isHindi
                      ? `छायाचित्र ${activePhotoIndex + 1} / ${filteredPhotos.length}`
                      : `Photo ${activePhotoIndex + 1} of ${filteredPhotos.length}`}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-900 font-semibold leading-relaxed">
                  {isHindi ? activePhoto.descHi : activePhoto.descEn}
                </p>
                <p className="text-xs text-gray-500 italic">
                  {isHindi ? activePhoto.descEn : activePhoto.descHi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL GALLERY MODAL (BROWSE ALL 28 VERIFIED PHOTOS) */}
      {showFullGalleryModal && (
        <div
          className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowFullGalleryModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-6xl w-full h-[92vh] overflow-hidden shadow-2xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f8faf9] shrink-0">
              <div>
                <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block">
                  {isHindi ? 'धरातलीय छायाचित्र अभिलेखागार' : 'Grassroots Field Archive'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 font-serif">
                  {isHindi
                    ? '२८ प्रमुख प्रामाणिक धरातलीय सेवा छायाचित्र'
                    : '28 Verified Field Action Photographs'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isHindi
                    ? 'प्रत्येक छायाचित्र वास्तविक घटना स्थल का है, शून्य डुप्लीकेट।'
                    : 'Every photo represents an authentic field initiative, zero duplicates.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFullGalleryModal(false)}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Grid of 28 Curated Photos */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-50">
              {albumPhotos.map((photo, i) => {
                const title = isHindi ? photo.titleHi : photo.titleEn;
                const category = isHindi ? photo.catHi : photo.catEn;
                const desc = isHindi ? photo.descHi : photo.descEn;

                return (
                  <div
                    key={photo.src}
                    onClick={() => {
                      setShowFullGalleryModal(false);
                      openLightbox(photo, i);
                    }}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0b5e34] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={photo.src}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0b5e34] text-white text-[10px] font-bold">
                        {category}
                      </span>
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                        #{photo.id}
                      </span>
                    </div>

                    <div className="p-3 bg-white flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-2 font-serif group-hover:text-[#0b5e34] leading-snug">
                          {title}
                        </h4>
                        <p className="text-[11px] text-gray-600 line-clamp-2 mt-1 leading-snug">
                          {desc}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#ea580c] font-bold mt-2">
                        {isHindi ? photo.tagHi : photo.tagEn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
