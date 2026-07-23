// Reads the UNCTAD brand palette from CSS custom properties at draw time, so D3's raw SVG
// attrs stay in sync with the design tokens instead of hardcoding hex values in JS. House
// style: the main/first chart color is un-blue, the secondary/second is un-yellow.
const PALETTE_VARS = ['--un-color-blue-brand', '--un-color-yellow', '--un-color-green-brand', '--un-color-purple', '--un-color-red-brand', '--un-color-grey-dark'];

// Two-series period-comparison charts (e.g. BarPair) read yellow-first/blue-second, matching
// the "baseline period, then later period" convention used throughout the draft's chart mockups.
// This project avoids orange entirely, so un-yellow stands in for the earlier-period marker.
export const PAIR_PALETTE_VARS = ['--un-color-yellow', '--un-color-blue-brand'];

// Development-status charts (Developed / LDCs / Other developing) — avoids green, since green
// isn't part of this project's chart palette, in favor of a blue/yellow/yellow-darkest ramp.
export const DEVELOPMENT_STATUS_PALETTE_VARS = ['--un-color-blue-brand', '--un-color-yellow-darkest', '--un-color-yellow'];

const seriesColor = (index, palette = PALETTE_VARS) => {
  const varName = palette[index % palette.length];
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

// Shared `series` (or `periods`) array -> ChartLegend `items` shape, used by every multi-series
// chart primitive so each one doesn't repeat the same `.map()` over its own series list.
export const seriesToLegendItems = (series, palette) => series.map((s, idx) => ({ color: seriesColor(idx, palette), key: s.key, label: s.label }));

export default seriesColor;
