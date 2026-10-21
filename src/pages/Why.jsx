
import React from 'react';
import SectionHeading from '../components/common/SectionHeading';

export default function Why() {
  const whyPoints = [
    {
      title: 'Accelerating Ecological Crisis',
      desc: 'Groundwater tables are falling rapidly in eastern India, while soil degradation and erratic rainfall threaten rural food security. Direct afforestation is the only sustainable natural shield.',
      stat: '54% of India faces high water stress',
    },
    {
      title: 'Marginalized Tribal & Mining Communities',
      desc: 'Communities living near mineral extraction zones carry the heaviest burden of industrial pollution with minimal basic amenities. Targeted healthcare, masks, and water purification save lives.',
      stat: 'Millions impacted by industrial particulate matter',
    },
    {
      title: 'The Literacy & Values Gap',
      desc: 'Standard educational models often lack ecological consciousness and cultural grounding. "Siksha on Trees" nurtures intellectual growth while cementing moral Sanskar and nature reverence.',
      stat: 'Outdoor learning boosts retention by over 30%',
    },
    {
      title: 'Quality Education',
      desc: 'Access to inclusive and quality education helps children and communities develop knowledge, practical skills, environmental awareness, and opportunities for a better future.',
      stat: 'SDG 4: Quality Education',
    },
    {
      title: 'Gender Equality',
      desc: 'Equal opportunities for women and girls strengthen families and communities. Education, healthcare access, safety, and participation help build a fairer society.',
      stat: 'SDG 5: Gender Equality',
    },
    {
      title: 'Clean Water and Sanitation',
      desc: 'Safe drinking water, sanitation facilities, and responsible water management are essential for public health, dignity, and sustainable rural development.',
      stat: 'SDG 6: Clean Water and Sanitation',
    },
    {
      title: 'Affordable and Clean Energy',
      desc: 'Promoting renewable energy and energy-efficient practices can reduce pollution, improve energy access, and support sustainable development in underserved communities.',
      stat: 'SDG 7: Affordable and Clean Energy',
    },
    {
      title: 'Decent Work and Economic Growth',
      desc: 'Skill development, fair employment, and support for local livelihoods help families improve their economic stability while encouraging responsible growth.',
      stat: 'SDG 8: Decent Work and Economic Growth',
    },
    {
      title: 'Industry, Innovation and Infrastructure',
      desc: 'Reliable infrastructure, appropriate technology, and sustainable innovation can improve access to essential services and create solutions to local challenges.',
      stat: 'SDG 9: Industry, Innovation and Infrastructure',
    },
    {
      title: 'Reduced Inequalities',
      desc: 'People from marginalized communities need fair access to education, healthcare, opportunities, and public services regardless of their social or economic background.',
      stat: 'SDG 10: Reduced Inequalities',
    },
    {
      title: 'Sustainable Cities and Communities',
      desc: 'Cleaner surroundings, accessible public spaces, green areas, and resilient infrastructure help make villages and cities healthier and more sustainable.',
      stat: 'SDG 11: Sustainable Cities and Communities',
    },
    {
      title: 'Responsible Consumption and Production',
      desc: 'Reducing waste, reusing materials, conserving natural resources, and adopting responsible consumption habits help protect the environment for future generations.',
      stat: 'SDG 12: Responsible Consumption and Production',
    },
    {
      title: 'Climate Action',
      desc: 'Tree plantation, ecosystem restoration, climate awareness, and sustainable practices can contribute to climate resilience and help communities prepare for environmental change.',
      stat: 'SDG 13: Climate Action',
    },
    {
      title: 'Life Below Water',
      desc: 'Protecting rivers, lakes, and other aquatic ecosystems from pollution helps conserve biodiversity and maintain the natural resources on which communities depend.',
      stat: 'SDG 14: Life Below Water',
    },
    {
      title: 'Life on Land',
      desc: 'Protecting forests, restoring degraded land, conserving biodiversity, and planting suitable native trees support healthier ecosystems and wildlife habitats.',
      stat: 'SDG 15: Life on Land',
    },
    {
      title: 'Peace, Justice and Strong Institutions',
      desc: 'Transparent governance, equal access to justice, community participation, and accountable institutions help build trust and support inclusive social development.',
      stat: 'SDG 16: Peace, Justice and Strong Institutions',
    },
    {
      title: 'Partnerships for the Goals',
      desc: 'Collaboration between communities, educational institutions, volunteers, government bodies, and responsible organizations can help expand the impact of sustainable development initiatives.',
      stat: 'SDG 17: Partnerships for the Goals',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fcfdfc]">
      {/* Hero Banner */}
      <section className="relative flex w-full items-center justify-center overflow-hidden border-b-4 border-[#ea580c] bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] px-4 py-12 text-center text-white shadow-md sm:px-6 sm:py-16 lg:px-8">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-3 text-center">
          <span className="mb-1 inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/35 bg-orange-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200 shadow-sm">
            The Rationale &amp; Urgent Need
          </span>

          <h1 className="m-0 w-full text-center font-serif text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Why It Matters
          </h1>

          <p className="m-0 w-full text-center font-serif text-lg font-bold leading-relaxed text-amber-300 sm:text-xl">
            पृथ्वी का कर्ज कब चुकाओगे? • हमारा उद्देश्य एवं आवश्यकता
          </p>

          <div className="my-2 h-1 w-20 shrink-0 rounded-full bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e]" />

          <p className="m-0 mx-auto w-full max-w-3xl text-center text-sm leading-relaxed text-emerald-100/90 sm:text-base">
            Understanding why human development, environmental rejuvenation,
            and cultural character building are urgently needed today.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        {/* Centered Section Heading */}
        <section className="mx-auto mb-8 flex w-full flex-col items-center text-center">
          <div className="w-full text-center [&_*]:text-center">
            <SectionHeading
              badge="The Need"
              title="Why This Work Matters More Than Ever"
              subtitle="A breakdown of ecological urgency, rural realities, and our shared responsibility toward future generations."
              align="center"
            />
          </div>
        </section>

        {/* Centered Factors Grid */}
        <div className="mx-auto mb-12 grid w-full max-w-[1500px] grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((item, idx) => (
            <article
              key={item.title}
              className="group flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 border-t-4 border-t-[#0b5e34] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#15803d] hover:shadow-lg sm:p-6"
            >
              <div>
                <span className="mb-2 block text-xs font-mono font-bold uppercase tracking-widest text-[#ea580c]">
                  Factor {String(idx + 1).padStart(2, '0')}
                </span>

                <h3 className="mb-3 break-words font-serif text-lg font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-[#0b5e34]">
                  {item.title}
                </h3>

                <p className="mb-5 break-words text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>

              <div className="mt-auto border-t border-gray-100 pt-4">
                <span className="block whitespace-normal break-words rounded-lg border border-green-200 bg-green-50 px-3 py-3 text-center text-xs font-bold leading-relaxed text-[#0b5e34]">
                  {item.stat}
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
