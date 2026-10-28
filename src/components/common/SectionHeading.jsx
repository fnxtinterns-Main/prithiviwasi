
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
    align === 'left'
      ? 'items-start text-left'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-center text-center';

  return (
    <div
      className={`mx-auto mb-8 flex w-full max-w-none flex-col ${alignClass} sm:mb-10 ${className}`}
    >
      {badge && (
        <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200/80 bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#ea580c] shadow-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ea580c]" />
          {badge}
        </span>
      )}

      <h2
        className={`w-full whitespace-normal break-words text-center font-serif text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl ${
          light ? 'text-white' : 'text-[#0b5e34]'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mx-auto mt-2.5 w-full whitespace-normal break-words text-center text-sm leading-relaxed sm:text-base ${
            light ? 'text-emerald-100/90' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}

      <div className="mt-3.5 h-1 w-20 rounded-full bg-gradient-to-r from-[#ea580c] via-amber-200 to-[#0b5e34]" />
    </div>
  );
}
