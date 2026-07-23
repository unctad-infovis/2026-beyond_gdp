import formatChartValue from './formatChartValue.js';
import './ChartYTicks.css';

// Shared y-axis gridline + tick-label rendering for the React-declarative bar charts
// (GroupedBarChart, BarPair) — both draw a plain linear y scale the same way, just with a
// different tick count/label offset.
const ChartYTicks = ({ labelX = -8, tickCount = 4, valueFormat = 'number', width, y }) => (
  <>
    {y.ticks(tickCount).map(tick => (
      <g key={tick} transform={`translate(0,${y(tick)})`}>
        <line className="chart_y_gridline" x2={width} />
        <text className="chart_y_tick_label" x={labelX} y={4}>
          {formatChartValue(tick, valueFormat)}
        </text>
      </g>
    ))}
  </>
);

export default ChartYTicks;
