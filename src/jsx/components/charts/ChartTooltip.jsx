import './ChartTooltip.css';

// Floating value card that follows the cursor on chart hover. `flip` mirrors it to the left
// side of the cursor/point once the hover position crosses ~60% of the chart's width, so it
// never runs off the right edge of the container.
const ChartTooltip = ({ children, flip = false, left, top }) => (
  <div className={`chart_tooltip${flip ? ' chart_tooltip--flip' : ''}`} style={{ left, top }}>
    {children}
  </div>
);

export default ChartTooltip;
