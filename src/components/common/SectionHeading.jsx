import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false,
}) {
  const alignClass =
    align === 'left' ? 'text-left items-start' : align === 'right' ? 'text-right items-end' : 'text-center items-center';

  return (
    <div className={`flex flex-col ${alignClass} mb-8 sm:mb-10 max-w-3xl mx-auto ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200/80 mb-2.5 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-pulse"></span>
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-serif ${
          light ? 'text-white' : 'text-[#0b5e34]'
        } leading-tight`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2.5 text-sm sm:text-base ${
            light ? 'text-emerald-100/90' : 'text-gray-600'
          } leading-relaxed`}
        >
          {subtitle}
        </p>
      )}
      <div className="w-20 h-1 bg-gradient-to-r from-[#ea580c] via-amber-200 to-[#0b5e34] rounded-full mt-3.5"></div>
    </div>
  );
}
