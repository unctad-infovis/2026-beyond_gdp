// Icon set for DashboardFramework's dimension pillars and foundational-principles chips,
// adapted from the graphic designer's HTML mock (unctad_beyond_gdp_full_3.html) — no
// equivalent topical iconography exists in the shared unctad-icons package, which only
// covers site-chrome icons (download/eye/logo), so these are inlined locally. Kept as plain
// stroke="currentColor" line icons so each pillar's CSS `color` drives the icon color.
const iconProps = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, viewBox: '0 0 24 24' };

const IconBriefcase = () => (
  <svg aria-hidden="true" {...iconProps}>
    <rect height="14" rx="2" width="20" x="2" y="7" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconHeart = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 1 0-7.65 7.65L12 19.5l8.42-8.4a5.4 5.4 0 0 0 0-7.65Z" />
  </svg>
);
const IconEducation = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
  </svg>
);
const IconSecurity = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconWellbeing = () => (
  <svg aria-hidden="true" {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" x2="9.01" y1="9" y2="9" />
    <line x1="15" x2="15.01" y1="9" y2="9" />
  </svg>
);
const IconPeople = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconInstitutions = () => (
  <svg aria-hidden="true" {...iconProps}>
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <path d="M12 2 2 8h20L12 2Z" />
  </svg>
);
const IconEnvironment = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M11 20A7 7 0 0 1 4 13c0-6 7-11 15-11 0 8-5 15-11 15Z" />
    <path d="M4 20c4-4 6-6 15-15" />
  </svg>
);
const IconScales = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M12 3v18" />
    <path d="M5 7h14" />
    <path d="M5 7 2 14a3 3 0 0 0 6 0L5 7Z" />
    <path d="M19 7l-3 7a3 3 0 0 0 6 0l-3-7Z" />
  </svg>
);
const IconCoins = () => (
  <svg aria-hidden="true" {...iconProps}>
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="m16.71 13.88.7.71-2.82 2.82" />
  </svg>
);
const IconMapPin = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconLayers = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
);
const IconGear = () => (
  <svg aria-hidden="true" {...iconProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 5v2M12 17v2M5 12h2M17 12h2M7.05 7.05l1.41 1.41M15.54 15.54l1.41 1.41M16.95 7.05l-1.41 1.41M8.46 15.54l-1.41 1.41" />
  </svg>
);
const IconPerson = () => (
  <svg aria-hidden="true" {...iconProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
  </svg>
);
const IconCheck = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M8 12l3 3 5-5" />
    <path d="M2 12h4l3-3 3 3h4" />
  </svg>
);
const IconDroplet = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13Z" />
  </svg>
);
const IconPeace = () => (
  <svg aria-hidden="true" {...iconProps}>
    <path d="M2 12c4-4 8-2 10 2 1-4 5-7 10-6-3 2-4 5-4 7 0 4-4 6-8 6-3 0-5-1-6-2" />
  </svg>
);
const IconGlobe = () => (
  <svg aria-hidden="true" {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </svg>
);

const DASHBOARD_ICONS = {
  'Material conditions and work': IconBriefcase,
  Health: IconHeart,
  Education: IconEducation,
  Security: IconSecurity,
  'Subjective well-being': IconWellbeing,
  'Social cohesion': IconPeople,
  'Quality of institutions': IconInstitutions,
  'Environmental quality': IconEnvironment,
  'Wealth inequality': IconScales,
  'Income inequality': IconPeople,
  Poverty: IconCoins,
  'Work inclusion': IconBriefcase,
  'Regional inequalities': IconMapPin,
  'Overlapping deprivations': IconLayers,
  'Produced capital': IconGear,
  'Human capital': IconPerson,
  'Social capital': IconCheck,
  'Institutional capital': IconInstitutions,
  'Natural capital': IconDroplet,
  Peace: IconPeace,
  'Human Rights': IconScales,
  'Respect for the Planet': IconGlobe
};

export default DASHBOARD_ICONS;
