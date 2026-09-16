// Filenames under public/assets/img/ for DashboardFramework's dimension pillars and
// foundational-principles chips — real icons supplied by the graphic designer (originally
// tmp/svg/), each already carrying its own fill color (yellow/purple/green for the three
// dimensions, red for the foundational principles), so these are rendered as plain <img>s
// rather than currentColor-driven inline SVGs.
// Keyed by a stable language-neutral slug (not the display label) so translated labels never
// affect icon lookup — every dimensionChip/dimension-component/foundationalPrinciple entry
// carries a matching `icon` field alongside its (translatable) `label`.
const DASHBOARD_ICONS = {
  material_conditions_and_work: 'material_conditions_and_work.svg',
  health: 'health.svg',
  education: 'education.svg',
  security: 'security.svg',
  subjective_well_being: 'subjective_well_being.svg',
  social_cohesion: 'social_cohesion.svg',
  quality_of_institutions: 'quality_of_institutions.svg',
  environmental_quality: 'environmental_quality.svg',
  wealth_inequality: 'wealth_inequality.svg',
  income_inequality: 'income_inequality.svg',
  poverty: 'poverty.svg',
  work_inclusion: 'work_inclusion.svg',
  regional_inequalities: 'regional_inequalities.svg',
  overlapping_deprivations: 'overlapping_deprivations.svg',
  produced_capital: 'produced_capital.svg',
  human_capital: 'human_capital.svg',
  social_capital: 'social_capital.svg',
  institutional_capital: 'institutional_capital.svg',
  natural_capital: 'natural_capital.svg',
  peace: 'peace.svg',
  human_rights: 'human_rights.svg',
  planet: 'respect_for_the_planet_red.svg'
};

export default DASHBOARD_ICONS;
