import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, Pause, Play, Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

export default function FieldAlbumMarquee() {
  const { isHindi, language } = useLanguage();
  const [activePhoto, setActivePhoto] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showFullGalleryModal, setShowFullGalleryModal] = useState(false);

  // Curated list of representative field photos showcasing all initiatives
  const curatedPhotos = [
    {
      src: '/assets/who_images/2006_cremation.jpeg',
      titleEn: 'Respectful Last Rites of Unclaimed Bodies',
      titleHi: 'लावारिस शवों का ससम्मान दाह संस्कार',
      catEn: 'Cremation Seva (2006)',
      catHi: 'अंतिम संस्कार सेवा (२००६)',
      descEn: 'Solemn cremation and last rites performed by trust founders at the crematorium pyre.',
      descHi: 'संस्थापकों द्वारा श्मशान घाट पर लावारिस शवों को ससम्मान मुखाग्नि व धार्मिक विधि-विधान।',
    },
    {
      src: '/assets/who_images/2006_cremation_pyre.jpeg',
      titleEn: 'Sacred Pyre for Departed Souls',
      titleHi: 'दिवंगत आत्माओं हेतु पवित्र अग्नि संस्कार',
      catEn: 'Crematorium Ground',
      catHi: 'श्मशान स्थल',
      descEn: 'Ensuring human dignity and Vedic rituals for every abandoned soul.',
      descHi: 'हर बेसहारा आत्मा की मानवीय गरिमा और वैदिक मर्यादा की रक्षा।',
    },
    {
      src: '/assets/who_images/2010_gaushala_seva.jpeg',
      titleEn: 'Gaushala Sanctuary & Cattle Care',
      titleHi: 'गौशाला आश्रय एवं नंदी सेवा',
      catEn: 'Animal Welfare',
      catHi: 'पशु कल्याण व जीव दया',
      descEn: 'Shelter, medical care, and fresh green fodder for destitute indigenous cows and bulls.',
      descHi: 'बेसहारा गायों व बछड़ों के लिए स्थायी आश्रय, चारा और नियमित चिकित्सा।',
    },
    {
      src: '/assets/who_images/2014_oldage_medical_camp.jpeg',
      titleEn: 'Old Age Home & Free Medical Camp',
      titleHi: 'वृद्धजन आश्रय व निःशुल्क स्वास्थ्य शिविर',
      catEn: 'Healthcare & Elder Care',
      catHi: 'स्वास्थ्य व वृद्ध सेवा',
      descEn: 'Free medicine distribution and health checkups in Ratu block.',
      descHi: 'रातू प्रखण्ड में असहाय बुजुर्गों को निःशुल्क परामर्श व दवाइयों का वितरण।',
    },
    {
      src: '/assets/who_images/2017_slum_training_sample.jpeg',
      titleEn: 'Slum Children Study & Women Sewing Classes',
      titleHi: 'बस्ती बाल शिक्षा एवं महिला सिलाई प्रशिक्षण',
      catEn: 'Women & Child Education',
      catHi: 'महिला व बाल शिक्षा',
      descEn: 'Free tailoring courses for women and foundational learning circles for slum kids.',
      descHi: 'बस्तियों में महिलाओं को सिलाई-कढ़ाई व बच्चों को निःशुल्क संस्कार शिक्षा।',
    },
    {
      src: '/assets/who_images/2019_food_ration_distribution.jpeg',
      titleEn: 'Annapurna Hot Meal & Nutrition Seva',
      titleHi: 'अन्नपूर्णा भोजन एवं पौष्टिक आहार सेवा',
      catEn: 'Nutrition Relief',
      catHi: 'अन्नदान व पोषण',
      descEn: 'Fresh nutritious meals and sweet packets distributed to families in need.',
      descHi: 'जरूरतमंद परिवारों और बच्चों तक ताजा पौष्टिक भोजन व आहार का वितरण।',
    },
    {
      src: '/assets/who_images/2021_village_welfare_tribal.jpeg',
      titleEn: 'Tribal Hamlet Direct Family Outreach',
      titleHi: 'दूरस्थ वनवासी व ग्रामीण परिवार संवाद',
      catEn: 'Tribal Welfare',
      catHi: 'जनजातीय उत्थान',
      descEn: 'Reaching deep into forest settlements with warmth, clothing, and empathy.',
      descHi: 'सुदूर वनवासी बस्तियों में पहुंचकर आत्मीय संवाद, वस्त्र व सहायता वितरण।',
    },
    {
      src: '/assets/who_images/2022_differently_abled_elders.jpeg',
      titleEn: 'Differently-Abled & Senior Citizens Seva',
      titleHi: 'दिव्यांग बंधु एवं वरिष्ठ जन सहयोग शिविर',
      catEn: 'Inclusion & Mobility',
      catHi: 'दिव्यांग सहयोग',
      descEn: 'Assistance, moral solidarity, and community care for elders with special needs.',
      descHi: 'दिव्यांगजनों और बुजुर्गों के लिए सहायक संसाधन व सामाजिक सम्मान।',
    },
    {
      src: '/assets/who_images/2023_youth_sanskar_defense.jpeg',
      titleEn: 'Youth Traditional Martial Sports & Sanskar',
      titleHi: 'पारंपरिक अस्त्र-शस्त्र चालन व युवा संस्कार',
      catEn: 'Youth & Discipline',
      catHi: 'युवा चेतना व चरित्र',
      descEn: 'State tournament championing physical self-defense, character, and unity.',
      descHi: 'राज्य स्तरीय पारंपरिक खेल प्रतियोगिता, आत्मरक्षा व चरित्र निर्माण।',
    },
    {
      src: '/assets/who_images/2024_community_meeting.jpeg',
      titleEn: 'Community Assembly & Environmental Council',
      titleHi: 'सामुदायिक ग्राम सभा व पर्यावरण चेतना',
      catEn: 'Community Solidarity',
      catHi: 'जन-सहभागिता',
      descEn: 'Mass village gatherings mobilizing citizens for the National Environmental Pledge.',
      descHi: 'पर्यावरण संरक्षण संकल्प और समाज सुधार हेतु नागरिकों की सामूहिक सभा।',
    },
    {
      src: '/assets/who_images/2008_trust_founders_press.jpeg',
      titleEn: 'Trust Deed & Institutional Integrity',
      titleHi: 'संस्थापक गण एवं विधिक ट्रस्ट विलेख',
      catEn: 'Legal Credentials',
      catHi: 'वैधानिक पंजीकरण',
      descEn: 'Trustees holding the official trust records and public newspaper coverage.',
      descHi: 'संस्थापकों द्वारा ट्रस्ट विलेख और जन-कल्याण के समाचार अभिलेखों का प्रदर्शन।',
    },
    {
      src: '/assets/who_album/album_012.jpg',
      titleEn: 'Adarsh Samuhik Vivah Mahotsav',
      titleHi: 'आदर्श सामूहिक विवाह महोत्सव',
      catEn: 'Samuhik Vivah',
      catHi: 'सामूहिक विवाह',
      descEn: 'Solemn mass wedding ceremony organized for underprivileged couples with full traditional rituals, bridal gifts, and community blessings.',
      descHi: 'निर्धन व जरूरतमंद कन्याओं का संपूर्ण विधि-विधान, वैवाहिक उपहार और आशीर्वाद के साथ सामूहिक विवाह का पावन आयोजन।',
    },
    {
      src: '/assets/who_album/album_035.jpg',
      titleEn: 'Community Nutrition Assembly',
      titleHi: 'सामुदायिक पोषण आहार वितरण',
      catEn: 'Ration Seva',
      catHi: 'राशन सेवा',
      descEn: 'Distribution of ration kits and warm meals in settlement clusters.',
      descHi: 'बस्ती में राशन सामग्री और पौष्टिक आहार का व्यवस्थित वितरण।',
    },
    {
      src: '/assets/who_album/album_060.jpg',
      titleEn: 'Traditional Youth Champions Felicitated',
      titleHi: 'मेधावी युवाओं का सम्मान समारोह',
      catEn: 'Awards & Honors',
      catHi: 'सम्मान व प्रोत्साहन',
      descEn: 'Honoring young village leaders and athletic champions with trophies.',
      descHi: 'उत्कृष्ट प्रदर्शन करने वाले होनहार युवाओं को पुरस्कार व सम्मान।',
    },
    {
      src: '/assets/who_album/album_085.jpg',
      titleEn: 'Sacred Nature & Tree Plantation Gathering',
      titleHi: 'प्रकृति वंदन एवं सामूहिक वृक्षारोपण',
      catEn: 'Environment Drive',
      catHi: 'पर्यावरण अभियान',
      descEn: 'Villagers gathering to revere sacred groves and plant native trees.',
      descHi: 'ग्रामीणों का एकत्र होकर पौधे लगाना और प्रकृति की रक्षा का संकल्प।',
    },
    {
      src: '/assets/who_album/album_120.jpg',
      titleEn: 'Night Community Chaupal & Consultation',
      titleHi: 'रात्रि ग्राम चौपाल एवं विचार-विमर्श',
      catEn: 'Village Governance',
      catHi: 'ग्राम चौपाल',
      descEn: 'Late evening discussions with village elders addressing village challenges.',
      descHi: 'ग्राम प्रधानों और बुजुर्गों के साथ गांव की समस्याओं पर सार्थक संवाद।',
    },
  ];

  // Total available photos from album
  const totalAlbumCount = 229;

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
                  ? 'धरातलीय छायाचित्र संग्रह • २२०+ वास्तविक तस्वीरें'
                  : 'Grassroots Photo Album • 220+ Real Field Photos'}
              </span>
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight font-serif">
              {isHindi
                ? 'जमीनी सेवा कार्यों का जीवंत छायाचित्र संग्रह'
                : 'Living Gallery of Grassroots Humanitarian Action'}
            </h2>

            <p className="mt-1 text-gray-600 text-xs sm:text-sm max-w-2xl">
              {isHindi
                ? 'विगत दो दशकों में धरातल पर किए गए कार्यों की वास्तविक तस्वीरें। किसी भी तस्वीर पर कर्सर ले जाएं—एल्बम तुरंत रुक जाएगा।'
                : 'Authentic photos from our two decades on the ground. Hover over any photo to pause movement and inspect in detail.'}
            </p>
          </div>

          {/* Quick Action Button to View All 220+ Photos */}
          <button
            onClick={() => setShowFullGalleryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#0b5e34] font-bold text-xs sm:text-sm border border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0 self-start md:self-auto"
          >
            <Layers className="w-4 h-4 text-[#ea580c]" />
            <span>
              {isHindi ? 'समस्त २२०+ तस्वीरें देखें ↗' : 'Browse All 220+ Photos ↗'}
            </span>
          </button>
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

      {/* FULL GALLERY MODAL (BROWSE ALL 220+ ALBUM PHOTOS) */}
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
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-[#f8faf9] shrink-0">
              <div>
                <span className="text-xs font-bold text-[#ea580c] uppercase tracking-wider block">
                  {isHindi ? 'धरातलीय छायाचित्र अभिलेखागार' : 'Grassroots Field Archive'}
                </span>
                <h3 className="text-xl font-black text-gray-900 font-serif">
                  {isHindi ? 'समस्त २२९ छायाचित्रों की विस्तृत गैलरी' : 'Complete Archive of All 229 Field Photos'}
                </h3>
              </div>
              <button
                onClick={() => setShowFullGalleryModal(false)}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Grid of All 229 Album Photos */}
            <div className="p-5 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 bg-gray-50">
              {Array.from({ length: totalAlbumCount }, (_, i) => {
                const numStr = String(i + 1).padStart(3, '0');
                const photoSrc = `/assets/who_album/album_${numStr}.jpg`;

                return (
                  <div
                    key={photoSrc}
                    onClick={() => {
                      setShowFullGalleryModal(false);
                      setActivePhoto({
                        src: photoSrc,
                        titleEn: `Field Archive Photo #${numStr}`,
                        titleHi: `धरातलीय सेवा छायाचित्र क्रमांक #${numStr}`,
                        catEn: 'Field Record',
                        catHi: 'सेवा अभिलेख',
                        descEn: 'Authentic photograph captured during grassroots fieldwork in Jharkhand.',
                        descHi: 'झारखण्ड में धरातलीय सेवा कार्यों के दौरान लिया गया वास्तविक छायाचित्र।',
                      });
                    }}
                    className="group relative aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer border border-gray-300 hover:border-[#0b5e34] hover:shadow-md transition-all"
                  >
                    <img
                      src={photoSrc}
                      alt={`Album ${numStr}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono">
                      #{numStr}
                    </span>
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
