
import React, { useState, useRef, useEffect } from 'react';
import roadmapData from '../../data/roadmap.json';
import { useLanguage } from '../../context/LanguageContext';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  ZoomIn,
  HeartHandshake,
  Layers,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from 'lucide-react';

export default function Roadmap() {
  const { isHindi } = useLanguage();

  const [selectedYear, setSelectedYear] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [showFullGridModal, setShowFullGridModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNavigationYear, setSelectedNavigationYear] = useState('all');

  const carouselRef = useRef(null);
  const cardRefs = useRef({});

  const sortedItems = [...roadmapData].sort((a, b) => a.year - b.year);

  const filteredItems = sortedItems.filter((item) => {
    if (selectedYear !== 'all' && String(item.year) !== selectedYear) {
      return false;
    }

    if (activeStatus === 'done' && item.status !== 'done') {
      return false;
    }

    if (activeStatus === 'planned' && item.status !== 'planned') {
      return false;
    }

    return true;
  });

  const availableYears = [...new Set(sortedItems.map((item) => item.year))];

  useEffect(() => {
    setCurrentIndex(0);

    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [activeStatus, selectedYear]);

  const scrollToIndex = (index) => {
    if (!carouselRef.current || filteredItems.length === 0) return;

    const safeIndex = Math.max(
      0,
      Math.min(index, filteredItems.length - 1)
    );

    const item = filteredItems[safeIndex];
    const card = cardRefs.current[item?.year];

    if (!card) return;

    setCurrentIndex(safeIndex);

    carouselRef.current.scrollTo({
      left: card.offsetLeft - carouselRef.current.offsetLeft,
      behavior: 'smooth',
    });

    setSelectedNavigationYear(String(item.year));
  };

  const scrollRoadmap = (direction) => {
    scrollToIndex(currentIndex + direction);
  };

  const goToYear = (year) => {
    setSelectedNavigationYear(year);

    if (year === 'all') {
      setSelectedYear('all');
      setCurrentIndex(0);

      carouselRef.current?.scrollTo({
        left: 0,
        behavior: 'smooth',
      });

      return;
    }

    const targetYear = Number(year);
    const targetIndex = filteredItems.findIndex(
      (item) => item.year === targetYear
    );

    if (targetIndex !== -1) {
      scrollToIndex(targetIndex);
      return;
    }

    // If the selected year is hidden by a status filter,
    // reset the status filter so the requested year can be shown.
    const targetItem = sortedItems.find(
      (item) => item.year === targetYear
    );

    if (targetItem) {
      setActiveStatus('all');
      setSelectedYear('all');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const card = cardRefs.current[targetYear];

          if (card && carouselRef.current) {
            setCurrentIndex(
              sortedItems.findIndex((item) => item.year === targetYear)
            );

            carouselRef.current.scrollTo({
              left: card.offsetLeft - carouselRef.current.offsetLeft,
              behavior: 'smooth',
            });
          }
        });
      });
    }
  };

  const openImageModal = (item, title) => {
    if (!item.image) return;

    setActiveModalImage({
      url: item.image,
      title,
      descHindi: item.descHindi || item.desc || '',
      descEnglish:
        item.descEnglish || item.descEn || item.descHindi || '',
      year: item.year,
    });
  };

  const getTitle = (item) =>
    isHindi
      ? item.titleHi || item.title
      : item.title || item.titleHi;

  const getCategory = (item) =>
    isHindi
      ? item.categoryHi || item.category
      : item.category || item.categoryHi;

  const getHighlights = (item) =>
    isHindi
      ? item.highlightsHi || item.highlights
      : item.highlights || item.highlightsHi;

  const renderRoadmapCard = (item) => {
    const isDone = item.status === 'done';
    const title = getTitle(item);
    const category = getCategory(item);
    const highlightsList = getHighlights(item) || [];

    return (
      <article
        key={item.year}
        ref={(node) => {
          if (node) {
            cardRefs.current[item.year] = node;
          }
        }}
        className="group flex w-[300px] shrink-0 cursor-pointer flex-col justify-between rounded-3xl border border-gray-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl sm:w-[360px] sm:p-7 lg:w-[420px]"
        onClick={() => openImageModal(item, title)}
      >
        <div>
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="shrink-0 rounded-lg bg-[#0b5e34] px-3 py-1 text-xs font-black tracking-wide text-white">
                {item.year}
              </span>

              <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-[#ea580c] sm:text-[11px]">
                {category}
              </span>
            </div>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50 text-[#0b5e34]'
                  : 'border-amber-200 bg-amber-50 text-amber-800'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              ) : (
                <Clock className="h-3 w-3 text-amber-600" />
              )}

              {isDone
                ? isHindi
                  ? 'सम्पन्न'
                  : 'Completed'
                : isHindi
                  ? 'संकल्प'
                  : 'Planned'}
            </span>
          </div>

          <h3 className="mb-3 line-clamp-2 font-serif text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#0b5e34] sm:text-lg">
            {title}
          </h3>

          <div className="mb-4 rounded-r-2xl border-l-4 border-[#0b5e34] bg-[#f4f9f6] p-3.5 shadow-sm">
            <div className="mb-2 flex items-start gap-2">
              <span className="shrink-0 rounded bg-emerald-200/60 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-900">
                हिंदी
              </span>

              <p className="line-clamp-3 font-serif text-xs font-medium leading-relaxed text-gray-900 sm:text-sm">
                "{item.descHindi || item.desc}"
              </p>
            </div>

            <div className="flex items-start gap-2 border-t border-emerald-200/60 pt-2">
              <span className="shrink-0 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-extrabold text-[#ea580c]">
                ENG
              </span>

              <p className="line-clamp-3 text-xs italic leading-relaxed text-gray-700">
                "{item.descEnglish || item.descEn || item.descHindi}"
              </p>
            </div>
          </div>

          <div
            className={`relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 ${
              item.image ? 'hover:shadow-md' : 'border-dashed'
            }`}
          >
            {item.image ? (
              <>
                <img
                  src={item.image}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md">
                    <ZoomIn className="h-3.5 w-3.5 text-[#0b5e34]" />
                    {isHindi ? 'बड़ी तस्वीर देखें' : 'View Full Image'}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-[#0b5e34]">
                  <Sparkles className="h-5 w-5" />
                </div>

                <span className="block text-xs font-bold text-gray-800">
                  {item.imagePlaceholder || `${item.year} Upcoming Target`}
                </span>

                <span className="mt-1 block text-[10px] font-medium text-gray-500">
                  {isHindi
                    ? 'आगामी लक्ष्य हेतु कार्य योजना तैयार'
                    : 'Action plan configured'}
                </span>
              </div>
            )}
          </div>
        </div>

        {highlightsList.length > 0 && (
          <div className="mt-2 border-t border-gray-100 pt-3">
            <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {isHindi ? 'मुख्य उपलब्धियां' : 'Key Outcomes'}
            </h4>

            <ul className="space-y-1 text-xs text-gray-700">
              {highlightsList.slice(0, 2).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ea580c]" />
                  <span className="line-clamp-1 leading-normal">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    );
  };

  return (
    <section
      className="overflow-hidden border-b border-gray-100 bg-white py-20 sm:py-28"
      id="roadmap"
    >
      <div className="mx-auto mb-10 max-w-7xl px-4 sm:mb-14 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ea580c] shadow-sm">
            <HeartHandshake className="h-4 w-4 text-[#ea580c]" />

            <span>
              {isHindi
                ? 'खंड ग • सेवा यात्रा एवं कालक्रम (२००६ → २०३०)'
                : 'Section C • Service Timeline (2006 → 2030)'}
            </span>
          </span>

          <h2 className="font-serif text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {isHindi
              ? 'हमारी विकास यात्रा: २००६ से अब तक एवं २०३० का लक्ष्य'
              : 'Our Journey: Completed Milestones & 2030 Vision'}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {isHindi
              ? 'अपनी सुविधा के अनुसार वर्ष चुनें या तीरों से सेवा यात्रा के कार्ड आगे-पीछे देखें।'
              : 'Choose a specific year or use the arrows to navigate through our service milestones.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-2xl border border-gray-200/80 bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setActiveStatus('all')}
                className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-bold transition-all sm:text-sm ${
                  activeStatus === 'all'
                    ? 'bg-[#0b5e34] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {isHindi ? 'समस्त कार्य' : 'All Milestones'}
              </button>

              <button
                type="button"
                onClick={() => setActiveStatus('done')}
                className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all sm:text-sm ${
                  activeStatus === 'done'
                    ? 'bg-[#0b5e34] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {isHindi ? 'सम्पन्न' : 'Completed'}
              </button>

              <button
                type="button"
                onClick={() => setActiveStatus('planned')}
                className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all sm:text-sm ${
                  activeStatus === 'planned'
                    ? 'bg-[#ea580c] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                {isHindi ? 'आगामी योजनाएं' : 'Planned Targets'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowFullGridModal(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-[#0b5e34] shadow-sm transition-all hover:bg-emerald-50 hover:shadow-md sm:text-sm"
            >
              <Layers className="h-4 w-4 text-[#ea580c]" />
              {isHindi ? 'ग्रिड में सभी देखें ↗' : 'Browse All Grid View ↗'}
            </button>
          </div>
        </div>
      </div>

      {/* MANUAL YEAR SELECTOR AND PREVIOUS/NEXT CONTROLS */}
      <div className="mx-auto mb-4 flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <Calendar className="h-4 w-4 text-[#0b5e34]" />

          <span>{isHindi ? 'सीधे वर्ष चुनें' : 'Jump to year'}</span>

          <select
            value={selectedNavigationYear}
            onChange={(event) => goToYear(event.target.value)}
            className="max-w-[150px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-[#0b5e34] outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">
              {isHindi ? 'शुरुआत से' : 'Start'}
            </option>

            {availableYears.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-500 sm:text-sm">
            {filteredItems.length
              ? `${currentIndex + 1} / ${filteredItems.length}`
              : '0 / 0'}
          </span>

          <button
            type="button"
            aria-label="Previous roadmap card"
            title={isHindi ? 'पिछला वर्ष' : 'Previous'}
            disabled={currentIndex <= 0 || filteredItems.length === 0}
            onClick={() => scrollRoadmap(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#0b5e34] shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Next roadmap card"
            title={isHindi ? 'अगला वर्ष' : 'Next'}
            disabled={
              currentIndex >= filteredItems.length - 1 ||
              filteredItems.length === 0
            }
            onClick={() => scrollRoadmap(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-white text-[#0b5e34] shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL: ONLY THIS CONTAINER SCROLLS */}
      <div className="relative w-full py-4">
        <div
          ref={carouselRef}
          className="w-full overflow-x-auto overflow-y-hidden scroll-smooth"
          style={{ scrollbarWidth: 'thin', overscrollBehaviorX: 'contain' }}
          onScroll={() => {
            if (!carouselRef.current || filteredItems.length === 0) return;

            const containerLeft = carouselRef.current.getBoundingClientRect().left;
            const cards = filteredItems
              .map((item, index) => ({
                index,
                year: item.year,
                element: cardRefs.current[item.year],
              }))
              .filter((entry) => entry.element);

            if (cards.length === 0) return;

            let nearest = cards[0];
            let nearestDistance = Infinity;

            cards.forEach((entry) => {
              const distance = Math.abs(
                entry.element.getBoundingClientRect().left - containerLeft
              );

              if (distance < nearestDistance) {
                nearestDistance = distance;
                nearest = entry;
              }
            });

            setCurrentIndex(nearest.index);
            setSelectedNavigationYear(String(nearest.year));
          }}
        >
          <div className="flex w-max items-stretch gap-5 px-4 pb-5 sm:gap-6 sm:px-6 lg:px-8">
            {filteredItems.map((item) => renderRoadmapCard(item))}
          </div>
        </div>
      </div>

      {/* FULL GRID MODAL */}
      {showFullGridModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setShowFullGridModal(false)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-[#fcfdfc] p-5">
              <div>
                <h3 className="font-serif text-lg font-black text-gray-900 sm:text-xl">
                  {isHindi
                    ? 'समस्त विकास यात्रा मील के पत्थर (2006–2030)'
                    : 'Complete Journey Milestones (2006–2030)'}
                </h3>

                <p className="mt-0.5 text-xs text-gray-600">
                  {isHindi
                    ? 'सभी ऐतिहासिक वर्ष व आगामी योजनाएं'
                    : 'All historical years and future vision'}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close grid"
                onClick={() => setShowFullGridModal(false)}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 overflow-y-auto p-5 sm:p-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedItems.map((item) => {
                const isDone = item.status === 'done';
                const title = getTitle(item);

                return (
                  <article
                    key={item.year}
                    onClick={() => openImageModal(item, title)}
                    className="flex cursor-pointer flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg"
                  >
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="rounded-lg bg-[#0b5e34] px-2.5 py-1 text-xs font-black text-white">
                          {item.year}
                        </span>

                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                            isDone
                              ? 'bg-emerald-50 text-[#0b5e34]'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {isDone
                            ? isHindi
                              ? 'सम्पन्न'
                              : 'Completed'
                            : isHindi
                              ? 'संकल्प'
                              : 'Planned'}
                        </span>
                      </div>

                      <h4 className="mb-2 line-clamp-2 font-serif text-sm font-bold text-gray-900">
                        {title}
                      </h4>

                      {item.image ? (
                        <div className="mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-gray-100">
                          <img
                            src={item.image}
                            alt={title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="mb-3 flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-xs font-medium text-gray-500">
                          {item.imagePlaceholder || title}
                        </div>
                      )}

                      <p className="line-clamp-3 text-xs italic text-gray-600">
                        "{item.descEnglish || item.descHindi || item.desc}"
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setShowFullGridModal(false);
                        setActiveStatus('all');
                        setSelectedYear('all');
                        goToYear(String(item.year));
                      }}
                      className="mt-3 self-start text-xs font-bold text-[#0b5e34] hover:underline"
                    >
                      {isHindi ? 'समयरेखा में देखें →' : 'View in timeline →'}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SINGLE IMAGE LIGHTBOX */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 bg-[#fcfdfc] p-4 sm:p-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="shrink-0 rounded-lg bg-[#0b5e34] px-2.5 py-1 text-xs font-bold text-white">
                  {activeModalImage.year}
                </span>

                <h3 className="line-clamp-2 font-serif text-sm font-bold text-gray-900 sm:text-lg">
                  {activeModalImage.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close image"
                onClick={() => setActiveModalImage(null)}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex max-h-[58vh] items-center justify-center overflow-hidden bg-black">
              <img
                src={activeModalImage.url}
                alt={activeModalImage.title}
                className="h-auto max-h-[58vh] w-full object-contain"
              />
            </div>

            <div className="shrink-0 space-y-3 overflow-y-auto border-t border-gray-100 bg-white p-4 sm:p-5">
              <div className="flex items-start gap-2">
                <span className="shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                  हिंदी
                </span>

                <p className="font-serif text-xs font-medium leading-relaxed text-gray-900 sm:text-sm">
                  "{activeModalImage.descHindi}"
                </p>
              </div>

              <div className="flex items-start gap-2 border-t border-gray-100 pt-3">
                <span className="shrink-0 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-orange-800">
                  ENG
                </span>

                <p className="text-xs italic leading-relaxed text-gray-600 sm:text-sm">
                  "{activeModalImage.descEnglish}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
