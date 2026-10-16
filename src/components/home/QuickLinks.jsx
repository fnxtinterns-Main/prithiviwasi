import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import initiativesData from '../../data/initiatives.json';
import { ArrowRight, Compass, Target } from 'lucide-react';



export default function QuickLinks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          badge="Impact & Operations"
          title="Transforming Communities on the Ground"
          subtitle="Explore our key pillars of humanitarian development, environmental restoration, and grassroot empowerment."
        />

        {/* Initiatives Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {initiativesData.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {item.badge}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">{item.impact}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-emerald-700 font-medium text-xs mb-3">{item.hindiTitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {item.pillars.slice(0, 2).map((p, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">
                      {p}
                    </span>
                  ))}
                </div>
                <Link
                  to="/who#initiatives"
                  className="text-emerald-700 hover:text-emerald-900 font-bold text-xs flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Action Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Banner 1: Who We Are & Roadmap */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 mb-4">
                <Compass className="w-3.5 h-3.5" />
                Organizational Heritage
              </span>
              <h3 className="text-2xl font-black mb-3">Who We Are & The 2006–2030 Roadmap</h3>
              <p className="text-emerald-100/90 text-sm leading-relaxed mb-6">
                Discover how a dedicated group of volunteers evolved into a certified public charitable trust registered in Ranchi, executing the "Siksha on Trees" vision and scaling toward the 2030 SDG benchmark.
              </p>
            </div>
            <div className="relative z-10">
              <Link
                to="/who"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-sm shadow hover:bg-emerald-50 transition-colors"
              >
                <span>Read Full Who Story & Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Banner 2: SDG-30 Programs & Field Action */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 mb-4">
                <Target className="w-3.5 h-3.5" />
                Programs & SDG-30 Alignment
              </span>
              <h3 className="text-2xl font-black mb-3">Field Programs: Coal Mining, Rural & Divyangjan</h3>
              <p className="text-emerald-100/90 text-sm leading-relaxed mb-6">
                Explore targeted solutions for mining-affected communities, women SHG micro-enterprises, and accessible education models tailored to marginalized groups.
              </p>
            </div>
            <div className="relative z-10">
              <Link
                to="/what"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-sm shadow hover:bg-emerald-400 transition-colors"
              >
                <span>View What We Do & SDG Goals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
