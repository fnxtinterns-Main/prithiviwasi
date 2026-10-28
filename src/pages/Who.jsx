
import React, { useState } from 'react';
import WhoWeAre from '../components/who/WhoWeAre';
import ElevateSection from '../components/who/ElevateSection';
import FieldAlbumMarquee from '../components/who/FieldAlbumMarquee';
import Roadmap from '../components/who/Roadmap';
import HeroStory from '../components/who/HeroStory';
import InitiativesGrid from '../components/who/InitiativesGrid';
import { useLanguage } from '../context/LanguageContext';
import { Compass } from 'lucide-react';

function InteractiveLogo() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotation({
      x: (0.5 - y) * 24,
      y: (x - 0.5) * 24,
    });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="flex min-w-0 items-center justify-center lg:col-span-5">
      <div
        className="relative mx-auto w-full max-w-[430px] sm:max-w-[480px] lg:max-w-full"
        style={{ perspective: '1000px' }}
      >
        {/* Soft green glow */}
        <div
          className={`pointer-events-none absolute inset-[12%] rounded-full bg-emerald-300/20 blur-3xl transition-all duration-500 ${
            isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-60'
          }`}
        />

        {/* Interactive 3D logo */}
        <div
          className="relative mx-auto aspect-square w-full max-w-[460px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetRotation}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={resetRotation}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${
              isHovered ? 1.035 : 1
            })`,
            transformStyle: 'preserve-3d',
            transition: isHovered
              ? 'transform 100ms ease-out'
              : 'transform 500ms ease-out',
          }}
        >
          {/* Globe-like elliptical ring */}
          <div
            className="pointer-events-none absolute inset-[5%] rounded-full border border-emerald-200/40"
            style={{
              transform: 'rotateX(65deg)',
              boxShadow: isHovered
                ? '0 0 35px rgba(110,231,183,0.3)'
                : '0 0 18px rgba(110,231,183,0.12)',
              transition: 'box-shadow 300ms ease',
            }}
          />

          {/* Original organisation logo */}
          <img
            src="/assets/logo.png"
            alt="Prithivivasi Seva aur Sudhar Sangathan"
            draggable="false"
            loading="eager"
            decoding="async"
            className="relative z-10 block h-full w-full select-none object-contain drop-shadow-2xl"
            style={{
              transform: 'translateZ(25px)',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* Subtle reflective highlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              transform: 'translateZ(35px)',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.16), transparent 38%, transparent 70%, rgba(110,231,183,0.08))',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Who() {
  const { isHindi } = useLanguage();

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-white">

      {/* HERITAGE HERO SECTION */}
      <section className="relative isolate w-full overflow-hidden border-b-4 border-[#ea580c] bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] text-white">

        {/* Background decoration */}
        <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        {/* MAIN CONTAINER */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-12 xl:px-14">

          {/* LEFT COLUMN */}
          <div className="flex min-w-0 flex-col lg:col-span-7">

            {/* TRUST BADGE */}
            <div className="mb-4 flex justify-start">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/15 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-orange-200 sm:text-xs">
                <Compass className="h-4 w-4 shrink-0 text-orange-300" />

                <span>
                  {isHindi
                    ? 'पब्लिक चैरिटेबल ट्रस्ट धरोहर • स्थापना २००६'
                    : 'Public Charitable Trust Heritage • Estd. 2006'}
                </span>
              </span>
            </div>

            {/* MAIN HEADING */}
            <h1 className="mt-5 max-w-4xl font-serif text-3xl font-black leading-[1.15] tracking-tight text-white sm:mt-6 sm:text-4xl lg:text-5xl xl:text-[58px]">
              {isHindi ? (
                'हमारा परिचय एवं गौरवमयी इतिहास'
              ) : (
                <>
                  Who We Are
                  <span className="text-amber-300"> • </span>
                  Our Heritage
                  <br className="hidden xl:block" />
                  {' '}
                  <span className="text-emerald-100">&amp; Legacy</span>
                </>
              )}
            </h1>

            {/* ORGANIZATION NAME */}
            <h2 className="mt-5 max-w-3xl font-serif text-lg font-bold leading-relaxed text-amber-300 sm:text-xl">
              {isHindi
                ? 'पृथ्वीवासी सेवा और सुधार संगठन • मानव कल्याण एवं प्रकृति वंदन'
                : 'Prithivivasi Seva aur Sudhar Sangathan • Manav Kalyan & Nature Stewardship'}
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-50/90 sm:text-base sm:leading-8">
              {isHindi
                ? '२००६ से हमारा संगठन मानव सेवा, गौशाला, वृद्धजन देखभाल, निःशुल्क शिक्षा और पर्यावरण संरक्षण के लिए समर्पित है। ट्रस्ट पंजीकरण: 19317/2344, रांची, झारखण्ड।'
                : 'Founded in 2006, we support vulnerable communities through humanitarian service, cattle welfare, elder care, free education, and environmental conservation.'}
            </p>

            {/* CREDENTIAL BADGES */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5 lg:pt-6">

              <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-xs font-semibold leading-relaxed text-white">
                <span aria-hidden="true">🏛️</span>
                <span>
                  {isHindi
                    ? 'ट्रस्ट पंजीकरण: 19317/2344'
                    : 'Trust Reg: 19317/2344'}
                </span>
              </span>

              <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2.5 text-xs font-semibold leading-relaxed text-emerald-100">
                <span aria-hidden="true">🌱</span>
                <span>
                  {isHindi
                    ? 'स्थापना २००६ • १८+ वर्षों की सेवा'
                    : 'Estd. 2006 • 18+ Years of Service'}
                </span>
              </span>

              <span className="inline-flex items-center gap-2 rounded-xl border border-orange-400/30 bg-orange-500/15 px-3 py-2.5 text-xs font-semibold leading-relaxed text-orange-200">
                <span aria-hidden="true">🤝</span>
                <span>
                  {isHindi
                    ? 'सहयोगी: Agents of Change'
                    : 'Alliance Partner: Agents of Change'}
                </span>
              </span>

            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE 3D LOGO */}
          <InteractiveLogo />

        </div>
      </section>

      {/* REMAINING PAGE SECTIONS */}
      <WhoWeAre />
      <ElevateSection />
      <FieldAlbumMarquee />
      <Roadmap />
      <HeroStory />
      <InitiativesGrid />

    </div>
  );
}
