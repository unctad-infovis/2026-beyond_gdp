// Shared by Nav and DashboardFramework's linked dimension items: scrolls to a CSS selector
// (an `anchorClass` appended to a SectionDivider/ChartSection, e.g. ".anchor_data"), scoped to
// the mounted minisite root first (matching ButtonAnchor's pattern) with a document fallback.
const scrollToAnchor = href => {
  const target = window.appRef?.current?.querySelector(href) ?? document.querySelector(href);
  if (!target) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
};

export default scrollToAnchor;
