import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, Wrench, CheckCircle, ArrowRight, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

export default function HeroStory() {
  const { isHindi } = useLanguage();

  const storyboard = [
    {
      step: isHindi ? '०१' : '01',
      phase: isHindi ? 'मूल समस्या (चुनौती)' : 'Phase 01 • The Problem',
      title: isHindi
        ? 'पर्यावरणीय संकट, अशिक्षा व उपेक्षित बस्तियां'
        : 'Ecological Depletion & Rural Disenfranchisement',
      icon: AlertTriangle,
      color: 'amber',
      accentBg: 'bg-amber-50',
      accentBorder: 'border-amber-200',
      accentText: 'text-amber-700',
      iconColor: 'text-amber-600',
      description: isHindi
        ? 'वनों की अंधाधुंध कटाई, कोयला खनन का गहरा प्रदूषण और संसाधनों के घोर अभाव ने सुदूर ग्रामीण व जनजातीय परिवारों को बीमारियों, लाचारी, स्वच्छ जल की कमी और बुनियादी शिक्षा से वंचित कर दिया था।'
        : 'Decades of unchecked deforestation, industrial coal mining runoffs, and geographic isolation left remote tribal communities with contaminated ground water, high childhood respiratory illnesses, and zero access to functional schools.',
      points: isHindi
        ? [
            'पारंपरिक वनों और हरियाली की भारी क्षति व अनियंत्रित प्रदूषण',
            'बस्तियों में बच्चों के लिए प्राथमिक शिक्षा व नैतिक संस्कारों का अभाव',
            'लावारिस शवों की असहाय दुर्गति और निराश्रित बुजुर्गों की उपेक्षा',
          ]
        : [
            'Massive loss of native tree canopy and sacred tribal groves',
            'Absence of early childhood education in remote forest pockets',
            'Severe respiratory distress and abandonment of destitute individuals',
          ],
    },
    {
      step: isHindi ? '०२' : '02',
      phase: isHindi ? 'जमीनी प्रयास (धरातलीय सेवा)' : 'Phase 02 • The Action',
      title: isHindi
        ? 'जन-सहभागिता, "वृक्ष पर शिक्षा" व प्रत्यक्ष सेवा'
        : 'Grassroot Mobilization & "Siksha on Trees"',
      icon: Wrench,
      color: 'emerald',
      accentBg: 'bg-emerald-50',
      accentBorder: 'border-emerald-200',
      accentText: 'text-[#0b5e34]',
      iconColor: 'text-[#0b5e34]',
      description: isHindi
        ? 'संस्थापकों व कार्यकर्ताओं ने स्वयं आगे बढ़कर लावारिस शवों का ससम्मान दाह संस्कार शुरू किया, विशाल वृक्षों की छांव में बच्चों को निःशुल्क पढ़ाना शुरू किया, गौशाला बनाई और बस्तियों में अन्न-वस्त्र पहुंचाया।'
        : 'Rather than waiting for outside intervention, Prithiviwasi trustees and volunteers sat under community banyan trees to teach children, launched free herbal dispensaries, and began planting thousands of indigenous trees with village youth.',
      points: isHindi
        ? [
            'पेड़ों के नीचे "वृक्ष पर शिक्षा" और बाल संस्कार पाठशाला',
            'निःशुल्क स्वास्थ्य शिविर, ओल्ड एज होम व दवा वितरण',
            'महिलाओं व बेटियों को निःशुल्क सिलाई व स्वावलंबन प्रशिक्षण',
          ]
        : [
            'Creation of 25+ open-air tree study circles and free literacy hubs',
            'Direct medical checkup camps, elder shelter, and free medicine',
            'Free tailoring and self-reliance skills for tribal women and youth',
          ],
    },
    {
      step: isHindi ? '०३' : '03',
      phase: isHindi ? 'स्थायी समाधान (सकारात्मक परिणाम)' : 'Phase 03 • The Resolution',
      title: isHindi
        ? 'आत्मनिर्भर परिवार, हरित परिवेश व मानवीय गरिमा'
        : 'Restored Ecosystems & Empowered Communities',
      icon: CheckCircle,
      color: 'blue',
      accentBg: 'bg-blue-50',
      accentBorder: 'border-blue-200',
      accentText: 'text-blue-700',
      iconColor: 'text-blue-600',
      description: isHindi
        ? 'आज वे बच्चे शिक्षा प्राप्त कर समाज का गौरव बन रहे हैं, गौमाता व मूक पशु सुरक्षित हैं, और ग्रामीण बहनें अपने पैरों पर खड़ी होकर स्वाभिमान से परिवार का संबल बन रही हैं।'
        : 'Today, children who studied on tree roots are community leaders, vibrant green buffers shield tribal settlements from industrial soot, and villagers manage self-help cooperatives for sustainable organic livelihoods.',
      points: isHindi
        ? [
            '५०,००० से अधिक जीवित वृक्षों का प्राकृतिक सुरक्षा घेरा',
            '१५,००० से अधिक शिक्षित, संस्कारी बच्चे व आत्मनिर्भर माताएं',
            'लावारिस आत्माओं को सम्मान व बेसहारा बुजुर्गों को सुरक्षित आसरा',
          ]
        : [
            'Over 50,000 thriving native trees acting as green bio-shields',
            '15,000+ children transitioned into formal academics and careers',
            'Restored human dignity through dignified cremation & elder care',
          ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f8faf9] border-b border-gray-100" id="storyboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200/80 shadow-2xs mb-3">
            <Layers className="w-4 h-4 text-[#ea580c]" />
            <span>
              {isHindi ? 'खंड घ • परिवर्तन की प्रेरक गाथा' : 'Section D • Transformation Storyboard'}
            </span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight font-serif">
            {isHindi ? 'समस्या ➔ जमीनी सेवा प्रयास ➔ स्थायी समाधान' : 'Problem → Action → Resolution'}
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'किस प्रकार निष्काम सेवा, मानवीय संवेदना और सतत प्रयासों ने संकटग्रस्त परिवेश को आत्मनिर्भरता और गौरव में बदला।'
              : 'The cohesive journey of how grassroots dedication transforms vulnerable rural ecosystems into resilient, empowered habitats.'}
          </p>
        </div>

        {/* Cohesive Stepper Flow Ribbon linking all together */}
        <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto mb-10 px-6 py-3 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs font-black">1</span>
            <span>{isHindi ? 'समस्या (चुनौती)' : 'The Problem'}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2 text-[#0b5e34] font-bold text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-black">2</span>
            <span>{isHindi ? 'जमीनी प्रयास' : 'The Action'}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-black">3</span>
            <span>{isHindi ? 'स्थायी समाधान' : 'The Resolution'}</span>
          </div>
        </div>

        {/* 3-Step Storyboard Cards: LARGER, SPACIOUS BOXES with Generous Padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {storyboard.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl p-8 sm:p-10 lg:p-11 border border-gray-200/90 shadow-2xs hover:border-[#15803d] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[500px]"
              >
                <div>
                  {/* Top Step Pill & Phase Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <span className="text-4xl font-black text-[#0b5e34]/25 font-serif">
                      {item.step}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${item.accentBg} ${item.accentBorder} border ${item.accentText} shadow-2xs`}>
                      {item.phase}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${item.accentBg} border ${item.accentBorder} shadow-2xs flex items-center justify-center ${item.iconColor} mb-5`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-snug font-serif">
                    {item.title}
                  </h3>

                  {/* Narrative Body */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Key Dimensions Section with Clear Bullets */}
                <div className="pt-5 border-t border-gray-100 mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    {isHindi ? 'धरातलीय साक्ष्य एवं आयाम' : 'Key Field Dimensions'}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#0b5e34] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
