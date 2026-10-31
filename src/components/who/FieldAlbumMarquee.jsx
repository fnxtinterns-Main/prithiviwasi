import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';

export default function FieldAlbumMarquee() {
  const { isHindi } = useLanguage();
  const [activePhoto, setActivePhoto] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showFullGalleryModal, setShowFullGalleryModal] = useState(false);

  // Curated list of the TOP 20 representative field photos showcasing all initiatives
  const curatedPhotos = [
    {
      src: '/assets/who_images/2006_cremation.jpeg',
      titleEn: 'Respectful Last Rites of Unclaimed Souls (2006)',
      titleHi: 'लावारिस शवों का ससम्मान दाह संस्कार (२००६)',
      catEn: 'Cremation Seva',
      catHi: 'अंतिम संस्कार सेवा',
      descEn: 'Solemn cremation and Vedic last rites performed by trust founders at the crematorium pyre.',
      descHi: 'संस्थापकों द्वारा श्मशान घाट पर लावारिस शवों को ससम्मान मुखाग्नि व धार्मिक विधि-विधान।',
    },
    {
      src: '/assets/who_images/2006_cremation_pyre.jpeg',
      titleEn: 'Sacred Pyre for Departed Souls',
      titleHi: 'दिवंगत आत्माओं हेतु पवित्र अग्नि संस्कार',
      catEn: 'Human Dignity',
      catHi: 'मानवीय गरिमा',
      descEn: 'Ensuring human dignity and sacred Vedic rituals for every abandoned soul.',
      descHi: 'हर बेसहारा आत्मा की मानवीय गरिमा और वैदिक मर्यादा की रक्षा।',
    },
    {
      src: '/assets/who_album/album_001.jpg',
      titleEn: 'Slum Child Education & Women Vocational Training',
      titleHi: 'बस्ती बाल शिक्षा एवं महिला सिलाई प्रशिक्षण',
      catEn: 'Education & Skills',
      catHi: 'शिक्षा व कौशल',
      descEn: 'Free foundational schooling for slum children and tailoring skills for women.',
      descHi: 'कच्ची बस्तियों में बच्चों को बुनियादी शिक्षा व माताओं-बहनों को सिलाई-कढ़ाई प्रशिक्षण।',
    },
    {
      src: '/assets/who_album/album_002.jpg',
      titleEn: 'Dedicated Rural Classroom Learning Session',
      titleHi: 'ग्रामीण बालिकाओं का लगनशील अध्ययन सत्र',
      catEn: 'Girl Child Education',
      catHi: 'बालिका शिक्षा',
      descEn: 'Village children in uniform studying with notebooks and pencils on the floor.',
      descHi: 'सुदूर गांव में यूनिफॉर्म पहनकर जमीन पर बैठकर एकाग्रचित्त होकर पढ़ती बेटियां।',
    },
    {
      src: '/assets/who_album/album_003.jpg',
      titleEn: 'School Assembly & Moral Education Camp',
      titleHi: 'विद्यालयी संस्कार एवं नैतिक शिक्षा शिविर',
      catEn: 'Character Building',
      catHi: 'चरित्र निर्माण',
      descEn: 'Large hall assembly of students receiving moral values and environmental guidance.',
      descHi: 'विद्यालय सभागार में बड़ी संख्या में विद्यार्थियों को संस्कार व पर्यावरण मार्गदर्शन।',
    },
    {
      src: '/assets/who_images/2017_slum_training_sample.jpeg',
      titleEn: 'Women Sewing & Livelihood Center',
      titleHi: 'महिला सिलाई केंद्र एवं स्वावलंबन',
      catEn: 'Women Empowerment',
      catHi: 'महिला स्वावलंबन',
      descEn: 'Equipping rural and slum women with sewing machines for financial self-reliance.',
      descHi: 'महिलाओं को सिलाई मशीनों पर प्रशिक्षण देकर आर्थिक रूप से आत्मनिर्भर बनाना।',
    },
    {
      src: '/assets/who_album/album_012.jpg',
      titleEn: 'Adarsh Samuhik Vivah Mahotsav',
      titleHi: 'आदर्श सामूहिक विवाह महोत्सव',
      catEn: 'Samuhik Vivah',
      catHi: 'सामूहिक विवाह',
      descEn: 'Grand mass wedding ceremony organized for underprivileged couples with full traditional rituals.',
      descHi: 'निर्धन व जरूरतमंद कन्याओं का संपूर्ण विधि-विधान, उपहार और आशीर्वाद के साथ सामूहिक विवाह।',
    },
    {
      src: '/assets/who_album/album_120.jpg',
      titleEn: 'Gaushala Sanctuary & Calf Care',
      titleHi: 'गौशाला आश्रय एवं बछड़ों की सेवा',
      catEn: 'Cattle Welfare',
      catHi: 'गौ-संरक्षण',
      descEn: 'Safe permanent shelter, nutritious fodder, and medical attention for destitute cattle.',
      descHi: 'बेसहारा गोवंश व बछड़ों के लिए स्थायी आश्रय, हरा चारा और नियमित देखभाल।',
    },
    {
      src: '/assets/who_images/2010_gaushala_seva.jpeg',
      titleEn: 'Gaushala Green Fodder Seva',
      titleHi: 'गौशाला में हरा चारा व नंदी सेवा',
      catEn: 'Animal Compassion',
      catHi: 'जीव दया',
      descEn: 'Trustees feeding fresh green fodder and water to indigenous cows and bulls.',
      descHi: 'संस्थापकों द्वारा देसी गायों व नंदी महाराज को ताजा चारा और आहार खिलाते हुए।',
    },
    {
      src: '/assets/who_album/album_140.jpg',
      titleEn: 'Ramawata Old Age Home Medical Camp',
      titleHi: 'रामावता वृद्धाश्रम (रातू) स्वास्थ्य शिविर',
      catEn: 'Elder Care',
      catHi: 'वृद्धजन सेवा',
      descEn: 'Health camp and medical consultations for senior residents at Ramawata Old Age Home, Ratu.',
      descHi: 'रातू प्रखण्ड स्थित रामावता वृद्धाश्रम में बुजुर्गों हेतु स्वास्थ्य परामर्श व सेवा शिविर।',
    },
    {
      src: '/assets/who_images/2014_oldage_medical_camp.jpeg',
      titleEn: 'Free Rural Health & Medicine Distribution',
      titleHi: 'निःशुल्क ग्रामीण स्वास्थ्य व दवा वितरण',
      catEn: 'Free Healthcare',
      catHi: 'आरोग्य सेवा',
      descEn: 'Free checkups and doctor consultations for elderly villagers in forest blocks.',
      descHi: 'ग्रामीण व वृद्धजनों को निःशुल्क स्वास्थ्य परीक्षण एवं आवश्यक दवाइयों का वितरण।',
    },
    {
      src: '/assets/who_album/album_025.jpg',
      titleEn: 'Wheelchair & Winter Relief for Divyangjan',
      titleHi: 'दिव्यांग बंधुओं को व्हीलचेयर व कम्बल सहयोग',
      catEn: 'Divyang Support',
      catHi: 'दिव्यांग सहयोग',
      descEn: 'Distribution of wheelchairs, warm blankets, and mobility aids to disabled elders.',
      descHi: 'दिव्यांग व वृद्धजनों को व्हीलचेयर, गर्म कम्बल और सहायता उपकरणों का वितरण।',
    },
    {
      src: '/assets/who_images/2019_food_ration_distribution.jpeg',
      titleEn: 'Annapurna Hot Meal & Nutrition Seva',
      titleHi: 'अन्नपूर्णा भोजन एवं पौष्टिक आहार सेवा',
      catEn: 'Nutrition Relief',
      catHi: 'अन्नदान व पोषण',
      descEn: 'Nutritious cooked meals and food packets distributed to vulnerable slum families.',
      descHi: 'जरूरतमंद परिवारों और बच्चों तक ताजा पौष्टिक भोजन व अन्नदान सेवा।',
    },
    {
      src: '/assets/who_album/album_035.jpg',
      titleEn: 'Community Nutrition & Ration Kit Drive',
      titleHi: 'सामुदायिक राशन सामग्री वितरण अभियान',
      catEn: 'Ration Seva',
      catHi: 'राशन सेवा',
      descEn: 'Distributing dry food rations, grains, and essentials in remote village settlements.',
      descHi: 'सुदूर बस्तियों में जरूरतमंद परिवारों को सूखा राशन व खाद्यान्न किट का व्यवस्थित वितरण।',
    },
    {
      src: '/assets/who_images/2023_youth_sanskar_defense.jpeg',
      titleEn: 'Traditional Martial Sports & Youth Sanskar',
      titleHi: 'पारंपरिक अस्त्र-शस्त्र चालन व युवा संस्कार',
      catEn: 'Youth & Discipline',
      catHi: 'युवा चेतना व खेल',
      descEn: 'Youth championship fostering discipline, physical self-defense, and character building.',
      descHi: 'राज्य स्तरीय पारंपरिक खेल प्रतियोगिता, आत्मरक्षा, अनुशासन व चरित्र निर्माण।',
    },
    {
      src: '/assets/who_album/album_060.jpg',
      titleEn: 'Youth Champions & Sports Felicitation',
      titleHi: 'मेधावी युवा खिलाड़ियों का सम्मान समारोह',
      catEn: 'Awards & Honors',
      catHi: 'सम्मान व प्रोत्साहन',
      descEn: 'Honoring outstanding young sports champions and village leaders with trophies.',
      descHi: 'उत्कृष्ट प्रदर्शन करने वाले होनहार युवाओं को मंच पर ट्रॉफी व पुरस्कार से सम्मानित करते हुए।',
    },
    {
      src: '/assets/who_album/album_085.jpg',
      titleEn: 'Mass Nature Reverence & Afforestation',
      titleHi: 'सामूहिक प्रकृति वंदन एवं वृक्षारोपण',
      catEn: 'Environment Drive',
      catHi: 'पर्यावरण अभियान',
      descEn: 'Large gathering of citizens taking collective vows to plant native trees and protect soil.',
      descHi: 'बड़ी संख्या में ग्रामीणों का एकत्र होकर पौधे लगाना और प्रकृति रक्षा का पावन संकल्प।',
    },
    {
      src: '/assets/who_images/2021_village_welfare_tribal.jpeg',
      titleEn: 'Direct Tribal Hamlet Outreach & Dialogue',
      titleHi: 'दूरस्थ वनवासी व ग्रामीण परिवार संवाद',
      catEn: 'Tribal Outreach',
      catHi: 'जनजातीय उत्थान',
      descEn: 'Reaching remote forest settlements with compassionate dialogue and direct relief.',
      descHi: 'सुदूर वनवासी बस्तियों में पहुंचकर आत्मीय संवाद, वस्त्र व सहायता सामग्री वितरण।',
    },
    {
      src: '/assets/who_images/2024_community_meeting.jpeg',
      titleEn: 'National Environmental Pledge Gram Sabha',
      titleHi: 'पर्यावरण चेतना एवं राष्ट्रीय प्रतिज्ञा ग्राम सभा',
      catEn: 'Pledge Movement',
      catHi: 'पर्यावरण संकल्प',
      descEn: 'Community assembly mobilizing citizens to undertake the National Environmental Pledge.',
      descHi: 'पर्यावरण संरक्षण प्रतिज्ञा और समाज सुधार हेतु नागरिकों की विशाल सामूहिक ग्राम सभा।',
    },
  ];

  const openLightbox = (photo, index) => {
    setActivePhoto(photo);
    setActivePhotoIndex(index);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const nextIdx = (activePhotoIndex - 1 + curatedPhotos.length) % curatedPhotos.length;
    setActivePhotoIndex(nextIdx);
    setActivePhoto(curatedPhotos[nextIdx]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIdx = (activePhotoIndex + 1) % curatedPhotos.length;
    setActivePhotoIndex(nextIdx);
    setActivePhoto(curatedPhotos[nextIdx]);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#f8faf9] border-b border-gray-200/80 overflow-hidden" id="photo-album">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        {/* Header with Bilingual Support */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#0b5e34] border border-emerald-200 shadow-2xs mb-2">
              <Camera className="w-3.5 h-3.5 text-[#0b5e34]" />
              <span>
                {isHindi
                  ? 'धरातलीय छायाचित्र संग्रह • २० प्रमुख प्रामाणिक तस्वीरें'
                  : 'Grassroots Photo Album • 20 Top Verified Field Photos'}
              </span>
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight font-serif">
              {isHindi
                ? 'जमीनी सेवा कार्यों का जीवंत छायाचित्र संग्रह'
                : 'Living Gallery of Grassroots Humanitarian Action'}
            </h2>

            <p className="mt-1 text-gray-600 text-xs sm:text-sm max-w-2xl">
              {isHindi
                ? 'विगत दो दशकों में धरातल पर किए गए कार्यों की २० प्रमुख प्रामाणिक तस्वीरें। किसी भी तस्वीर पर कर्सर ले जाएं—एल्बम तुरंत रुक जाएगा।'
                : '20 authentic photographs showcasing our two decades of work on the ground. Hover over any photo to pause movement and inspect in detail.'}
            </p>
          </div>

          {/* Action Button: Browse 20 Photos */}
          <div className="shrink-0 self-start md:self-auto">
            <button
              onClick={() => setShowFullGalleryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#0b5e34] font-bold text-xs sm:text-sm border border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#ea580c]" />
              <span>
                {isHindi ? 'समस्त २० प्रमुख तस्वीरें देखें ↗' : 'Browse All 20 Photos ↗'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CONTINUOUS MOVING ALBUM ROW (SINGLE ROW, CONTINUOUS SCROLL, HOVER TO PAUSE) */}
      <div className="relative w-full py-4 overflow-hidden group">
        {/* Left & Right Edge Gradient Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f8faf9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f8faf9] to-transparent z-10 pointer-events-none" />

        <div className="animate-album-marquee flex items-center gap-5 sm:gap-6 px-4">
          {/* Duplicate the array twice for seamless infinite loop */}
          {[...curatedPhotos, ...curatedPhotos].map((photo, index) => {
            const realIndex = index % curatedPhotos.length;
            const title = isHindi ? photo.titleHi : photo.titleEn;
            const category = isHindi ? photo.catHi : photo.catEn;
            const desc = isHindi ? photo.descHi : photo.descEn;

            return (
              <div
                key={`${photo.src}-${index}`}
                onClick={() => openLightbox(photo, realIndex)}
                className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                      <ZoomIn className="w-3.5 h-3.5 text-[#0b5e34]" />
                      <span>{isHindi ? 'बड़ा देखें' : 'View Full Photo'}</span>
                    </span>
                  </div>

                  {/* Floating Category Pill */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-[#0b5e34]/90 text-white shadow-xs backdrop-blur-xs">
                    {category}
                  </span>
                </div>

                {/* Caption Footer */}
                <div className="p-3.5 bg-white">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1 font-serif group-hover:text-[#0b5e34]">
                    {title}
                  </h4>
                  <p className="text-[11px] text-gray-600 line-clamp-2 mt-1 leading-snug">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR SINGLE PHOTO INSPECTION */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#fcfdfc] shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#0b5e34] text-white text-xs font-bold rounded-lg">
                  {isHindi ? activePhoto.catHi : activePhoto.catEn}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif">
                  {isHindi ? activePhoto.titleHi : activePhoto.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image with Navigation Arrows */}
            <div className="relative bg-black flex-1 min-h-[350px] max-h-[65vh] flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.src}
                alt={isHindi ? activePhoto.titleHi : activePhoto.titleEn}
                className="w-full h-full max-h-[65vh] object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-5 bg-white border-t border-gray-100 shrink-0">
              <div className="space-y-1">
                <p className="text-sm text-gray-800 font-medium">
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

      {/* FULL GALLERY MODAL (BROWSE ALL 20 CURATED PHOTOS) */}
      {showFullGalleryModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowFullGalleryModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-6xl w-full h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f8faf9] shrink-0">
              <div>
                <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block">
                  {isHindi ? 'धरातलीय छायाचित्र अभिलेखागार' : 'Grassroots Field Archive'}
                </span>
                <h3 className="text-xl font-black text-gray-900 font-serif">
                  {isHindi ? '२० प्रमुख धरातलीय सेवा छायाचित्र' : '20 Key Field Action Photographs'}
                </h3>
              </div>

              <button
                onClick={() => setShowFullGalleryModal(false)}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Grid of 20 Curated Photos */}
            <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-50">
              {curatedPhotos.map((photo, i) => {
                const title = isHindi ? photo.titleHi : photo.titleEn;
                const category = isHindi ? photo.catHi : photo.catEn;

                return (
                  <div
                    key={photo.src}
                    onClick={() => {
                      setShowFullGalleryModal(false);
                      openLightbox(photo, i);
                    }}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0b5e34] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={photo.src}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0b5e34]/90 text-white text-[10px] font-bold">
                        {category}
                      </span>
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                        #{String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="p-3 bg-white">
                      <h4 className="font-bold text-xs text-gray-900 line-clamp-1 font-serif group-hover:text-[#0b5e34]">
                        {title}
                      </h4>
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
