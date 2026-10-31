import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-22 right-6 sm:bottom-24 sm:right-6 z-40 transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-tr from-[#0b5e34] via-[#15803d] to-[#16a34a] text-white rounded-full shadow-xl hover:shadow-emerald-900/50 hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-emerald-300/40 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        aria-label="Back to top"
        title="ऊपर जाएं / Back to top"
      >
        <span className="sr-only">Back to top</span>
        <ArrowUp className="w-5 h-5 text-white stroke-[2.5] group-hover:-translate-y-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
}
