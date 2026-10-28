
import React from 'react';
import SectionHeading from '../components/common/SectionHeading';
import programsData from '../data/programs.json';

const sdgGoals = [
  {
    id: 1,
    title: 'No Poverty',
    image: '/assets/sdg-1-no-poverty.png',
    description: 'End poverty in all its forms by improving access to essential services, social protection and sustainable livelihood opportunities.',
    pillars: ['Social Protection', 'Basic Services', 'Economic Opportunities'],
    color: '#E5243B',
  },
  {
    id: 2,
    title: 'Zero Hunger',
    image: '/assets/sdg-2-zero-hunger.png',
    description: 'Improve food security and nutrition while supporting sustainable agriculture and access to nutritious food.',
    pillars: ['Food Security', 'Better Nutrition', 'Sustainable Agriculture'],
    color: '#DDA63A',
  },
  {
    id: 3,
    title: 'Good Health and Well-being',
    image: '/assets/sdg-3-good-health.png',
    description: 'Promote healthy lives through accessible healthcare, disease prevention and community well-being.',
    pillars: ['Healthcare Access', 'Disease Prevention', 'Well-being'],
    color: '#4C9F38',
  },
  {
    id: 4,
    title: 'Quality Education',
    image: '/assets/sdg-4-quality-education.png',
    description: 'Ensure inclusive and equitable quality education and lifelong learning opportunities for all.',
    pillars: ['Education Access', 'Learning Outcomes', 'Lifelong Learning'],
    color: '#C5192D',
  },
  {
    id: 5,
    title: 'Gender Equality',
    image: '/assets/sdg-5-gender-equality.png',
    description: 'Promote equal rights, women’s empowerment and opportunities for women and girls.',
    pillars: ['Equal Rights', 'Women’s Empowerment', 'Equal Opportunities'],
    color: '#FF3A21',
  },
  {
    id: 6,
    title: 'Clean Water and Sanitation',
    image: '/assets/sdg-6-clean-water.png',
    description: 'Improve access to safe drinking water, sanitation and sustainable water management.',
    pillars: ['Safe Drinking Water', 'Sanitation', 'Water Conservation'],
    color: '#26BDE2',
  },
  {
    id: 7,
    title: 'Affordable and Clean Energy',
    image: '/assets/sdg-7-clean-energy.png',
    description: 'Expand access to affordable, reliable and sustainable energy, including renewable energy.',
    pillars: ['Energy Access', 'Renewable Energy', 'Energy Efficiency'],
    color: '#FCC30B',
  },
  {
    id: 8,
    title: 'Decent Work and Economic Growth',
    image: '/assets/sdg-8-decent-work.png',
    description: 'Support inclusive economic growth, productive employment and decent work for all.',
    pillars: ['Employment', 'Worker Protection', 'Local Enterprise'],
    color: '#A21942',
  },
  {
    id: 9,
    title: 'Industry, Innovation and Infrastructure',
    image: '/assets/sdg-9-industry-innovation.png.jpeg',
    description: 'Build resilient infrastructure and support sustainable industry, innovation and technology.',
    pillars: ['Resilient Infrastructure', 'Innovation', 'Sustainable Industry'],
    color: '#FD6925',
  },
  {
    id: 10,
    title: 'Reduced Inequalities',
    image: '/assets/sdg-10-reduced-inequalities.png',
    description: 'Advance social inclusion and equal opportunities for disadvantaged and marginalized groups.',
    pillars: ['Social Inclusion', 'Equal Opportunity', 'Accessibility'],
    color: '#DD1367',
  },
  {
    id: 11,
    title: 'Sustainable Cities and Communities',
    image: '/assets/sdg-11-sustainable-cities.png',
    description: 'Create inclusive, safe and resilient communities through sustainable planning and local development.',
    pillars: ['Safe Communities', 'Sustainable Planning', 'Disaster Resilience'],
    color: '#FD9D24',
  },
  {
    id: 12,
    title: 'Responsible Consumption and Production',
    image: '/assets/sdg-12-responsible-consumption.png',
    description: 'Reduce waste and pollution through resource efficiency, reuse and responsible production.',
    pillars: ['Waste Reduction', 'Resource Efficiency', 'Responsible Production'],
    color: '#BF8B2E',
  },
  {
    id: 13,
    title: 'Climate Action',
    image: '/assets/sdg-13-climate-action.png',
    description: 'Strengthen climate resilience through awareness, environmental protection and local climate action.',
    pillars: ['Climate Resilience', 'Climate Awareness', 'Emission Reduction'],
    color: '#3F7E44',
  },
  {
    id: 14,
    title: 'Life Below Water',
    image: '/assets/sdg-14-life-below-water.png',
    description: 'Protect aquatic ecosystems and reduce water pollution to conserve marine and freshwater resources.',
    pillars: ['Water Pollution Control', 'Aquatic Conservation', 'Healthy Ecosystems'],
    color: '#0A97D9',
  },
  {
    id: 15,
    title: 'Life on Land',
    image: '/assets/sdg-15-life-on-land.png',
    description: 'Protect forests and biodiversity, restore degraded land and promote sustainable land management.',
    pillars: ['Afforestation', 'Biodiversity', 'Land Restoration'],
    color: '#56C02B',
  },
  {
    id: 16,
    title: 'Peace, Justice and Strong Institutions',
    image: '/assets/sdg-16-peace-justice.png',
    description: 'Promote peaceful communities, access to justice, transparency and accountable institutions.',
    pillars: ['Access to Justice', 'Transparency', 'Community Participation'],
    color: '#00689D',
  },
  {
    id: 17,
    title: 'Partnerships for the Goals',
    image: '/assets/sdg-17-partnerships.png',
    description: 'Strengthen partnerships among communities and organisations to achieve sustainable development.',
    pillars: ['Community Partnerships', 'Knowledge Sharing', 'Collective Action'],
    color: '#19486A',
  },
];

function getProgramImage(title = '') {
  const name = title.toLowerCase();

  if (name.includes('coal mining')) {
    return {
      src: '/assets/sdg-3-8-15.png',
      alt: 'SDG 3, 8 and 15',
    };
  }

  if (name.includes('women empowerment')) {
    return {
      src: '/assets/sdg-5-8-10.png',
      alt: 'SDG 5, 8 and 10',
    };
  }

  if (
    name.includes('holistic rural') ||
    name.includes('tribal development')
  ) {
    return {
      src: '/assets/sdg-6-7-11.png',
      alt: 'SDG 6, 7 and 11',
    };
  }

  if (
    name.includes('divyangjan') ||
    name.includes('differently-abled') ||
    name.includes('differently abled') ||
    name.includes('divyang')
  ) {
    return {
      src: '/assets/sdg-10-4-11.png.jpeg',
      alt: 'SDG 10, 4 and 11',
    };
  }

  return null;
}

function ProgramCard({ prog }) {
  const image = getProgramImage(prog.title);

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 border-t-4 border-t-[#0b5e34] bg-white shadow-sm transition-all duration-300 hover:border-[#15803d] hover:shadow-md">
      <div className="min-w-0 p-4 sm:p-5">
        {image && (
          <div className="float-right mb-2 ml-3 flex h-[48px] w-[145px] shrink-0 items-center justify-end sm:h-[52px] sm:w-[150px]">
            <img
              src={image.src}
              alt={image.alt}
              className="block h-full w-full object-contain object-right"
              loading="lazy"
            />
          </div>
        )}

        <div className="mb-2 flex flex-wrap items-start gap-1.5">
          {(prog.sdgBadges || []).map((badge) => (
            <span
              key={badge}
              className="max-w-full whitespace-normal break-words rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[10px] font-bold leading-snug text-[#ea580c] sm:text-[11px]"
            >
              {badge}
            </span>
          ))}
        </div>

        <h3 className="mb-2 min-w-0 break-words font-serif text-lg font-bold leading-snug text-gray-900 sm:text-xl">
          {prog.title}
        </h3>

        {prog.subtitle && (
          <p className="mb-2 break-words text-xs font-bold leading-relaxed text-[#ea580c] sm:text-sm">
            {prog.subtitle}
          </p>
        )}

        <p className="clear-both break-words text-sm leading-relaxed text-gray-600">
          {prog.description}
        </p>
      </div>

      <div className="border-t border-gray-100 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {(prog.pillars || []).map((pillar) => (
            <span
              key={pillar}
              className="break-words text-xs font-semibold leading-relaxed text-gray-700 sm:text-sm"
            >
              {pillar}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function SDGCard({ goal }) {
  return (
    <article
      className="flex min-w-0 flex-col self-start overflow-hidden rounded-2xl border border-gray-200 border-t-4 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ borderTopColor: goal.color }}
    >
      <div className="p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-bold uppercase leading-snug tracking-wide text-[#ea580c]">
              Sustainable Development Goal {goal.id}
            </p>

            <h3 className="break-words font-serif text-lg font-bold leading-snug text-gray-900 sm:text-xl">
              {goal.title}
            </h3>
          </div>

          <img
            src={goal.image}
            alt={`SDG ${goal.id}: ${goal.title}`}
            className="h-[68px] w-[68px] shrink-0 rounded-lg object-contain sm:h-[76px] sm:w-[76px]"
            loading="lazy"
            onError={(event) => {
              console.error(
                `SDG ${goal.id} image not found:`,
                event.currentTarget.src
              );
            }}
          />
        </div>

        <p className="mt-3 break-words text-sm leading-relaxed text-gray-600">
          {goal.description}
        </p>

        {/* Pillar names remain; heading removed */}
        <div className="mt-3 border-t border-gray-100 pt-3">
          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
            {goal.pillars.map((pillar) => (
              <span
                key={pillar}
                className="max-w-full break-words rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-semibold leading-relaxed text-gray-700"
              >
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function What() {
  const mainPrograms = programsData.filter(
    (prog) => prog.id !== 'sdg-30-alignment'
  );

  return (
    <div className="what-page min-h-screen w-full bg-[#fcfdfc]">
      {/* Hero Banner */}
      <section className="relative flex w-full justify-center overflow-hidden border-b-4 border-[#ea580c] bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] px-4 py-12 text-center text-white shadow-md sm:px-6 sm:py-16 lg:px-8">
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-3">
          <span className="rounded-full border border-orange-400/35 bg-orange-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">
            Impact Sectors &amp; SDG-30
          </span>

          <h1 className="w-full text-center font-serif text-3xl font-black sm:text-4xl lg:text-5xl">
            What We Do
          </h1>

          <p className="text-center font-serif text-lg font-bold text-amber-300 sm:text-xl">
            हमारा कार्य: धरातलीय समाज कल्याण, पर्यावरण संरक्षण एवं पुनर्वास
          </p>

          <div className="my-2 h-1 w-20 rounded-full bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e]" />

          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-emerald-100/90 sm:text-base">
            Our targeted development programs align grassroots action in
            mining, rural, and tribal areas with the United Nations
            Sustainable Development Goals (SDG-30).
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {/* Main Programs Heading */}
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            badge="Focus Areas"
            title="Programs Addressing Key Human & Environmental Needs"
            subtitle="Direct on-ground interventions delivering healthcare, education, clean water, and self-reliance."
            align="center"
          />
        </div>

        {/* Four Main Program Cards */}
        <div className="mx-auto mb-6 grid w-full max-w-7xl grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2">
          {mainPrograms.map((prog) => (
            <ProgramCard key={prog.id} prog={prog} />
          ))}
        </div>

        {/* SDG 1–17 Heading */}
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            badge="United Nations Sustainable Development Goals"
            title="Our Commitment to SDG 2030"
            subtitle="Explore each goal, its purpose and three key pillars for sustainable community development."
            align="center"
          />

          {/* Compact SDG Cards */}
          <div className="mx-auto grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2">
            {sdgGoals.map((goal) => (
              <SDGCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
