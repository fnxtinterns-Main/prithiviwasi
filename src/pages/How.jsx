
import React, { useState } from 'react';
import programsData from '../data/programs.json';
import {
  Heart,
  ClipboardList,
  Users,
  Activity,
  Handshake,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Target,
  Droplets,
  Sun,
  BriefcaseBusiness,
  Recycle,
  Accessibility,
  Utensils,
  HeartPulse,
  Lightbulb,
  Building2,
  Fish,
  ShieldCheck,
  Globe,
  Leaf,
  Sprout,
  GraduationCap,
} from 'lucide-react';
import { useModal } from '../context/ModalContext';

const executionPlans = {
  'coal-mining': {
    steps: [
      'Assess community needs and identify priority issues.',
      'Coordinate healthcare, environmental and livelihood initiatives.',
      'Work with local communities and partner organizations.',
      'Track completed activities and community outcomes.',
    ],
    outcomes:
      'Improved access to support services, environmental awareness and livelihood opportunities.',
  },
  'rural-development': {
    steps: [
      'Assess village needs, water resources and livelihood challenges.',
      'Prepare community-led water, clean-energy and agriculture plans.',
      'Coordinate restoration and sustainable development activities.',
      'Review progress with residents and identify improvements.',
    ],
    outcomes:
      'Stronger local participation, improved resource management and sustainable rural livelihoods.',
  },
  'women-empowerment': {
    steps: [
      'Identify training needs and barriers faced by local women.',
      'Organize skill development, health awareness and legal literacy activities.',
      'Connect participants with livelihood resources and support networks.',
      'Follow up on participation, skills and livelihood progress.',
    ],
    outcomes:
      'Improved access to skills, awareness, support networks and economic opportunities.',
  },
  'handicap-empowerment': {
    steps: [
      'Identify accessibility barriers and individual support requirements.',
      'Coordinate accessible services and assistive support where available.',
      'Facilitate inclusive vocational training and community participation.',
      'Review accessibility improvements and participant feedback.',
    ],
    outcomes:
      'More inclusive participation, improved accessibility awareness and better access to development opportunities.',
  },
};

const defaultExecutionPlan = {
  steps: [
    'Assess community needs and identify priorities.',
    'Prepare an action plan with relevant stakeholders.',
    'Coordinate implementation with volunteers and partner organizations.',
    'Monitor progress and improve activities using feedback.',
  ],
  outcomes:
    'Improved community participation, coordinated activities and progress toward program objectives.',
};

const stepIcons = [ClipboardList, Users, Handshake, BarChart3];

const sdgPlans = [
  {
    id: 1,
    title: 'No Poverty',
    color: '#e5243b',
    icon: BriefcaseBusiness,
    goal: 'Improve access to welfare support, skills and livelihood opportunities.',
    steps: [
      'Identify vulnerable households with community participation.',
      'Help eligible families discover relevant welfare schemes.',
      'Coordinate livelihood training and employment linkages.',
      'Review referrals and document support outcomes.',
    ],
    indicators: ['Households reached', 'Scheme referrals', 'Livelihood linkages'],
  },
  {
    id: 2,
    title: 'Zero Hunger',
    color: '#dda63a',
    icon: Utensils,
    goal: 'Promote food security, nutrition awareness and sustainable local food practices.',
    steps: [
      'Identify local nutrition awareness needs.',
      'Organize nutrition education with qualified partners.',
      'Promote kitchen gardens and local food-growing practices.',
      'Record participation and follow-up activities.',
    ],
    indicators: ['People reached', 'Nutrition sessions', 'Gardens supported'],
  },
  {
    id: 3,
    title: 'Good Health and Well-being',
    color: '#4c9f38',
    icon: HeartPulse,
    goal: 'Improve health awareness and access to appropriate healthcare services.',
    steps: [
      'Identify community health awareness priorities.',
      'Coordinate health camps with qualified providers.',
      'Promote preventive health, hygiene and mental wellness.',
      'Track participation and referrals while protecting personal data.',
    ],
    indicators: ['People reached', 'Health sessions', 'Healthcare referrals'],
  },
  {
    id: 4,
    title: 'Quality Education',
    color: '#c5192d',
    icon: GraduationCap,
    goal: 'Support inclusive learning, environmental education and digital literacy.',
    steps: [
      'Identify learning needs with schools and communities.',
      'Organize learning support and environmental education.',
      'Coordinate digital literacy sessions and learning resources.',
      'Review participation and learning progress with partners.',
    ],
    indicators: ['Learners reached', 'Sessions conducted', 'Learning activities'],
  },
  {
    id: 5,
    title: 'Gender Equality',
    color: '#ff3a21',
    icon: Users,
    goal: 'Promote equal opportunities, dignity and participation for women and girls.',
    steps: [
      'Consult women to understand local priorities and barriers.',
      'Organize skills development and rights-awareness sessions.',
      'Connect participants with support and livelihood networks.',
      'Collect feedback and review participation opportunities.',
    ],
    indicators: ['Participants reached', 'Training sessions', 'Support referrals'],
  },
  {
    id: 6,
    title: 'Clean Water and Sanitation',
    color: '#26bde2',
    icon: Droplets,
    goal: 'Promote water conservation, sanitation awareness and responsible water management.',
    steps: [
      'Assess community water and sanitation concerns.',
      'Coordinate water conservation and hygiene awareness.',
      'Partner on waterbody restoration where feasible.',
      'Record activities and monitor restoration indicators.',
    ],
    indicators: ['Awareness sessions', 'Sites assessed', 'Restoration activities'],
  },
  {
    id: 7,
    title: 'Affordable and Clean Energy',
    color: '#fcc30b',
    icon: Sun,
    goal: 'Encourage renewable-energy awareness and clean-energy access.',
    steps: [
      'Identify community energy needs and access barriers.',
      'Conduct solar-energy and energy-efficiency awareness sessions.',
      'Explore partnerships for feasible clean-energy projects.',
      'Document installations and referrals actually completed.',
    ],
    indicators: ['People reached', 'Energy assessments', 'Projects supported'],
  },
  {
    id: 8,
    title: 'Decent Work and Economic Growth',
    color: '#a21942',
    icon: BriefcaseBusiness,
    goal: 'Strengthen employability, vocational skills and local livelihoods.',
    steps: [
      'Identify skills and livelihood interests.',
      'Coordinate vocational training with suitable providers.',
      'Connect participants with employers and market opportunities.',
      'Follow up on training completion and livelihood linkages.',
    ],
    indicators: ['People trained', 'Training completion', 'Employment linkages'],
  },
  {
    id: 9,
    title: 'Industry, Innovation and Infrastructure',
    color: '#fd6925',
    icon: Lightbulb,
    goal: 'Encourage practical innovation, appropriate technology and resilient infrastructure.',
    steps: [
      'Identify local infrastructure and technology challenges.',
      'Consult technical experts and community stakeholders.',
      'Pilot suitable projects with partner approval.',
      'Document delivery, maintenance and lessons learned.',
    ],
    indicators: ['Needs assessed', 'Pilot projects', 'Partnerships formed'],
  },
  {
    id: 10,
    title: 'Reduced Inequalities',
    color: '#dd1367',
    icon: Accessibility,
    goal: 'Improve inclusion and access to opportunities for underserved communities.',
    steps: [
      'Identify barriers faced by marginalized communities.',
      'Review accessibility of activities and services.',
      'Coordinate inclusive learning and support opportunities.',
      'Gather feedback and improve access.',
    ],
    indicators: ['People reached', 'Accessibility reviews', 'Inclusive activities'],
  },
  {
    id: 11,
    title: 'Sustainable Cities and Communities',
    color: '#fd9d24',
    icon: Building2,
    goal: 'Support cleaner, greener and more inclusive settlements.',
    steps: [
      'Identify priorities for cleanliness, green spaces and resilience.',
      'Organize community cleanliness and awareness drives.',
      'Coordinate native planting and public-space improvement.',
      'Monitor site maintenance and community participation.',
    ],
    indicators: ['Community drives', 'Sites improved', 'Trees monitored'],
  },
  {
    id: 12,
    title: 'Responsible Consumption and Production',
    color: '#bf8b2e',
    icon: Recycle,
    goal: 'Encourage waste reduction, reuse and responsible resource consumption.',
    steps: [
      'Assess common waste and resource-use challenges.',
      'Promote waste segregation, reuse and responsible consumption.',
      'Coordinate recycling activities with authorized partners.',
      'Record activities and material quantities where measured.',
    ],
    indicators: ['Awareness sessions', 'Clean-up drives', 'Waste diverted where measured'],
  },
  {
    id: 13,
    title: 'Climate Action',
    color: '#3f7e44',
    icon: Leaf,
    goal: 'Build climate awareness and support locally appropriate climate action.',
    steps: [
      'Identify local environmental and climate-related concerns.',
      'Organize climate awareness and preparedness activities.',
      'Plan native-tree plantation with local experts.',
      'Monitor sapling survival and restoration progress.',
    ],
    indicators: ['People reached', 'Saplings monitored', 'Survival rate where measured'],
  },
  {
    id: 14,
    title: 'Life Below Water',
    color: '#0a97d9',
    icon: Fish,
    goal: 'Protect aquatic ecosystems and reduce pollution entering waterbodies.',
    steps: [
      'Identify nearby waterbodies and community concerns.',
      'Raise awareness about plastic and water pollution.',
      'Coordinate responsible clean-up activities with relevant authorities.',
      'Document sites assessed and activities completed.',
    ],
    indicators: ['Awareness drives', 'Sites assessed', 'Clean-up activities'],
  },
  {
    id: 15,
    title: 'Life on Land',
    color: '#56c02b',
    icon: Sprout,
    goal: 'Protect biodiversity, support native vegetation and restore degraded land.',
    steps: [
      'Identify suitable sites and ecological priorities.',
      'Consult local experts about native species.',
      'Coordinate plantation and habitat restoration activities.',
      'Monitor survival, maintenance and ecological progress.',
    ],
    indicators: ['Sites supported', 'Native saplings planted', 'Survival rate where measured'],
  },
  {
    id: 16,
    title: 'Peace, Justice and Strong Institutions',
    color: '#00689d',
    icon: ShieldCheck,
    goal: 'Promote rights awareness, transparent processes and accountable initiatives.',
    steps: [
      'Share reliable information about relevant rights and public services.',
      'Provide referrals to qualified support organizations.',
      'Maintain transparent records of program activities and donations.',
      'Provide channels for community feedback and grievances.',
    ],
    indicators: ['Awareness sessions', 'Referrals made', 'Feedback reviewed'],
  },
  {
    id: 17,
    title: 'Partnerships for the Goals',
    color: '#19486a',
    icon: Globe,
    goal: 'Build collaboration among communities, institutions and responsible organizations.',
    steps: [
      'Identify institutions with shared development goals.',
      'Define proposed roles and responsibilities with partners.',
      'Coordinate joint activities and community participation.',
      'Review partnership contributions and document outcomes.',
    ],
    indicators: ['Active partnerships', 'Joint activities', 'Resources coordinated'],
  },
];

function ExecutionSteps({ steps }) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, index) => {
        const StepIcon = stepIcons[index] || CheckCircle2;

        return (
          <li key={index} className="flex min-w-0 items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-green-200 bg-white text-[#0b5e34]">
              <StepIcon className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1 pt-1">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#ea580c]">
                Step {String(index + 1).padStart(2, '0')}
              </span>
              <p className="break-words text-sm leading-relaxed text-gray-700">
                {step}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function SdgCard({ sdg }) {
  const SdgIcon = sdg.icon;

  return (
    <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className="flex min-w-0 items-start gap-4 p-5 text-white sm:p-6"
        style={{ backgroundColor: sdg.color }}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/15">
          <SdgIcon className="h-7 w-7" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/85">
            Sustainable Development Goal {sdg.id}
          </p>
          <h3 className="break-words font-serif text-xl font-bold leading-snug">
            {sdg.title}
          </h3>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
        <div>
          <h4 className="mb-2 flex items-center gap-2 font-bold text-gray-900">
            <Target className="h-4 w-4 shrink-0 text-[#0b5e34]" />
            Our Goal
          </h4>
          <p className="break-words text-sm leading-relaxed text-gray-600">
            {sdg.goal}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h4 className="mb-4 flex items-center gap-2 font-bold text-[#0b5e34]">
            <ClipboardList className="h-4 w-4 shrink-0" />
            How We Execute
          </h4>
          <ExecutionSteps steps={sdg.steps} />
        </div>

        <div className="mt-auto rounded-xl border border-green-200 bg-green-50 p-4">
          <h4 className="mb-3 flex items-center gap-2 font-bold text-[#0b5e34]">
            <BarChart3 className="h-4 w-4 shrink-0" />
            Success Indicators
          </h4>

          <div className="flex flex-wrap gap-2">
            {sdg.indicators.map((indicator) => (
              <span
                key={indicator}
                className="break-words rounded-lg border border-green-200 bg-white px-2.5 py-1.5 text-xs font-medium leading-relaxed text-gray-700"
              >
                {indicator}
              </span>
            ))}
          </div>

          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            Proposed indicators. Report actual results only after activities
            are measured and verified.
          </p>
        </div>
      </div>
    </article>
  );
}

export default function How() {
  const [activeTab, setActiveTab] = useState('all');
  const [sdgFilter, setSdgFilter] = useState('all');
  const { openDonateModal } = useModal();

  const tabs = [
    { id: 'all', label: 'All Programs' },
    { id: 'coal-mining', label: 'Coal Mining' },
    { id: 'rural-development', label: 'Rural Development' },
    { id: 'women-empowerment', label: 'Women Empowerment' },
    { id: 'handicap-empowerment', label: 'Handicap Empowerment' },
  ];

  const filteredPrograms =
    activeTab === 'all'
      ? programsData
      : programsData.filter((program) => program.id === activeTab);

  const visibleSdgs =
    sdgFilter === 'all'
      ? sdgPlans
      : sdgPlans.filter((sdg) => sdg.id === Number(sdgFilter));

  return (
    <div className="how-page min-h-screen w-full min-w-0 overflow-x-clip bg-[#fcfdfc]">
      {/* Hero Banner */}
      <section className="relative flex w-full min-w-0 items-center justify-center overflow-hidden border-b-4 border-[#ea580c] bg-gradient-to-br from-[#0b5e34] via-[#094b2a] to-[#15803d] px-4 py-10 text-center text-white shadow-md sm:px-6 sm:py-12 lg:px-8">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-3 text-center">
          <span className="inline-flex max-w-full items-center justify-center rounded-full border border-orange-400/35 bg-orange-500/20 px-3.5 py-1 text-center text-xs font-bold uppercase tracking-wider text-orange-200">
            Participation &amp; Program Tabs
          </span>

          <h1 className="m-0 w-full text-center font-serif text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            How You Can Help &amp; How We Execute
          </h1>

          <p className="m-0 w-full text-center font-serif text-lg font-bold leading-relaxed text-amber-300 sm:text-xl">
            सहयोग मार्ग: विभिन्न कार्य-स्तंभों में सहभागिता
          </p>

          <div className="my-1 h-1 w-20 rounded-full bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e]" />

          <p className="m-0 mx-auto w-full max-w-3xl text-center text-sm leading-relaxed text-emerald-100/90 sm:text-base">
            Discover each specialized development vertical and find out how
            you can contribute through donations, volunteering, or
            organizational partnerships.
          </p>
        </div>
      </section>

      {/* Main Programs */}
      <main className="how-main mx-auto w-full min-w-0 max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        {/* Centered program tabs */}
        <div className="mx-auto mb-8 flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 sm:mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-center text-xs font-bold transition-colors sm:text-sm ${
                activeTab === tab.id
                  ? 'border-[#0b5e34] bg-[#0b5e34] text-white shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#15803d] hover:bg-green-50 hover:text-[#0b5e34]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Centered responsive program grid */}
        <div
          className={`mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 items-stretch justify-items-stretch gap-6 sm:gap-7 lg:gap-8 ${
            filteredPrograms.length === 1
              ? 'lg:grid-cols-1'
              : 'lg:grid-cols-2'
          }`}
        >
          {filteredPrograms.map((program) => {
            const plan = executionPlans[program.id] || defaultExecutionPlan;

            return (
              <article
                key={program.id}
                className={`flex h-full min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-gray-200 border-t-4 border-t-[#0b5e34] bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#15803d] hover:shadow-lg ${
                  filteredPrograms.length === 1 ? 'mx-auto max-w-3xl' : ''
                }`}
              >
                <div className="min-w-0 space-y-4 p-5 sm:p-7">
                  <div>
                    <h2 className="mb-1 break-words font-serif text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                      {program.title}
                    </h2>

                    <p className="mb-3 break-words text-sm font-bold text-[#ea580c]">
                      {program.subtitle}
                    </p>

                    <p className="break-words text-sm leading-relaxed text-gray-600">
                      {program.description}
                    </p>
                  </div>

                  {program.sdgBadges?.length > 0 && (
                    <div>
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Related SDGs
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {program.sdgBadges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-lg border border-green-200 bg-green-50 px-2.5 py-1.5 text-xs font-bold text-[#0b5e34]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Key Pillars of Intervention
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {program.pillars.map((pillar, index) => (
                        <span
                          key={`${program.id}-pillar-${index}`}
                          className="break-words rounded-lg border border-green-200 bg-green-50 px-2.5 py-1.5 text-xs font-bold text-[#0b5e34]"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-w-0 border-y border-gray-100 bg-[#f8fbf8] p-5 sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b5e34] text-white">
                      <Activity className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-bold text-[#0b5e34]">
                        How We Execute
                      </h3>
                      <p className="text-xs text-gray-500">
                        Our implementation approach
                      </p>
                    </div>
                  </div>

                  <ExecutionSteps steps={plan.steps} />
                </div>

                <div className="mt-auto min-w-0 space-y-4 p-5 sm:p-7">
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-bold text-[#0b5e34]">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      Expected Outcomes
                    </h3>

                    <p className="break-words text-sm leading-relaxed text-gray-700">
                      {plan.outcomes}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500">
                      Support community-led development.
                    </p>

                    <button
                      type="button"
                      onClick={openDonateModal}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b5e34] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#073d22] focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:ring-offset-2"
                    >
                      <Heart className="h-4 w-4 fill-rose-300 text-rose-300" />
                      <span>Support This Program</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* SDG 1–17 Action Plan */}
      <section
        id="sdg-action-plan"
        className="mt-8 w-full min-w-0 border-t border-gray-200 bg-gradient-to-b from-white to-[#f3f8f3] px-4 py-14 sm:mt-10 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto w-full min-w-0 max-w-7xl">
          {/* Centered SDG heading */}
          <div className="mx-auto mb-10 flex w-full max-w-4xl flex-col items-center text-center">
            <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-[#0b5e34]">
              <Globe className="h-4 w-4 shrink-0" />
              Sustainable Development Framework
            </span>

            <h2 className="mt-5 w-full text-center font-serif text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Our SDG Action Plan
            </h2>

            <p className="mt-3 w-full text-center font-serif text-lg font-bold text-[#0b5e34] sm:text-xl">
              From Global Goals to Local Action
            </p>

            <div className="mx-auto my-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#ea580c] via-white to-[#22c55e]" />

            <p className="mx-auto w-full max-w-3xl text-center text-sm leading-relaxed text-gray-600 sm:text-base">
              Explore how Prithviwasi proposes to contribute to all 17
              Sustainable Development Goals through community engagement,
              partnerships, practical activities and measurable progress.
            </p>
          </div>

          {/* Centered SDG filters */}
          <div className="mx-auto mb-8 flex w-full max-w-6xl flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSdgFilter('all')}
              aria-pressed={sdgFilter === 'all'}
              className={`rounded-xl border px-4 py-2 text-sm font-bold transition-colors ${
                sdgFilter === 'all'
                  ? 'border-[#0b5e34] bg-[#0b5e34] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              All 17 Goals
            </button>

            {sdgPlans.map((sdg) => (
              <button
                key={sdg.id}
                type="button"
                onClick={() => setSdgFilter(String(sdg.id))}
                aria-pressed={sdgFilter === String(sdg.id)}
                aria-label={`Show SDG ${sdg.id}: ${sdg.title}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-transform hover:scale-105"
                style={{
                  backgroundColor:
                    sdgFilter === String(sdg.id) ? sdg.color : '#ffffff',
                  borderColor: sdg.color,
                  color:
                    sdgFilter === String(sdg.id) ? '#ffffff' : sdg.color,
                }}
              >
                {sdg.id}
              </button>
            ))}
          </div>

          {/* Centered result summary */}
          <div className="mx-auto mb-6 flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 text-center">
            <p className="text-sm font-semibold text-gray-700">
              {sdgFilter === 'all'
                ? 'All 17 Sustainable Development Goals'
                : `SDG ${sdgFilter}: ${
                    sdgPlans.find(
                      (sdg) => sdg.id === Number(sdgFilter)
                    )?.title || ''
                  }`}
            </p>

            <span className="text-xs text-gray-500">
              ({visibleSdgs.length}{' '}
              {visibleSdgs.length === 1 ? 'goal' : 'goals'})
            </span>
          </div>

          {/* Responsive, centered SDG grid */}
          <div
            className={`mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 items-stretch justify-items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3 ${
              visibleSdgs.length === 1
                ? 'sm:grid-cols-1 xl:grid-cols-1'
                : ''
            }`}
          >
            {visibleSdgs.map((sdg) => (
              <div
                key={sdg.id}
                className={`w-full min-w-0 ${
                  visibleSdgs.length === 1 ? 'mx-auto max-w-xl' : ''
                }`}
              >
                <SdgCard sdg={sdg} />
              </div>
            ))}
          </div>

          {/* Centered transparency note */}
          <div className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Target className="mt-1 h-6 w-6 shrink-0 text-[#ea580c]" />

              <div className="min-w-0">
                <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">
                  Commitment to Transparent Impact
                </h3>

                <p className="text-sm leading-relaxed text-gray-700">
                  These are proposed implementation approaches and indicators.
                  Actual activities, beneficiary counts, partnerships and
                  outcomes should be published only when supported by
                  organizational records and verified measurements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
