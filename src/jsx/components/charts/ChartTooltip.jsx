import './ChartTooltip.css';

// Kept in sync with ChartTooltip.css's `max-width` so the position math below can reason about
// the tooltip's footprint analytically, without waiting a render to measure it.
const TOOLTIP_WIDTH = 202;
const ANCHOR_GAP = 12;

// Computes the tooltip's absolute left position (same chart-local coordinate space as `x`/
// `totalWidth`): sits just right of the anchor by default, flips to its left once that would
// run past the right edge, then clamps the result so it never runs off either edge — including
// the "dead zone" near the middle of a chart too narrow to fit the tooltip cleanly on either
// side of the anchor, where a plain anchor+flip (no clamp) would still overflow one side.
export const tooltipLeft = (x, totalWidth) => {
  const preferred = totalWidth - x < TOOLTIP_WIDTH + ANCHOR_GAP ? x - ANCHOR_GAP - TOOLTIP_WIDTH : x + ANCHOR_GAP;
  return Math.max(0, Math.min(preferred, totalWidth - TOOLTIP_WIDTH));
};

// Floating value card that follows the cursor on chart hover. `left`/`top` are the final,
// already-clamped position (see `tooltipLeft` above) — no further offset is applied here.
const ChartTooltip = ({ children, left, top }) => (
  <div className="chart_tooltip" style={{ left, top }}>
    {children}
  </div>
);

export default ChartTooltip;
