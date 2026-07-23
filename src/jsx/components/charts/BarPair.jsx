import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import ChartCaption from './ChartCaption.jsx';
import ChartLegend from './ChartLegend.jsx';
import ChartValueLabel from './ChartValueLabel.jsx';
import ChartYTicks from './ChartYTicks.jsx';
import seriesColor, { PAIR_PALETTE_VARS } from './chartColors.js';
import formatChartValue from './formatChartValue.js';
import formatYearRange from './formatYearRange.js';
import './BarPair.css';
import useChartSize from './useChartSize.js';

// Two-bar single-series period comparison (e.g. "2010-2013" vs "2020-2023"), same
// CSS-transition-driven bar-growth approach as GroupedBarChart, specialized to one series.
const BarPair = ({ isVisible = false, periods = [], title, valueFormat = 'number', values = [], yLabel = '' }) => {
  const [plotRef, size] = useChartSize(260);

  const margin = { bottom: 32, left: 64, right: 8, top: 28 };
  const width = Math.max(size.width - margin.left - margin.right, 0);
  const height = Math.max(size.height - margin.top - margin.bottom, 0);

  const x = scaleBand().domain(periods).range([0, width]).padding(0.4);
  const y = scaleLinear()
    .domain([0, (max(values) ?? 0) * 1.15])
    .nice()
    .range([height, 0]);

  return (
    <div className="bp_container">
      <ChartLegend items={periods.map((p, idx) => ({ color: seriesColor(idx, PAIR_PALETTE_VARS), key: p, label: formatYearRange(p) }))} />
      <ChartCaption>{yLabel}</ChartCaption>
      <div className="bp_plot" ref={plotRef}>
        {width > 0 && (
          <svg aria-label={title} className="bp_svg" height={size.height} role="img" width={size.width}>
            <g transform={`translate(${margin.left},${margin.top})`}>
              <ChartYTicks valueFormat={valueFormat} width={width} y={y} />
              {periods.map((period, idx) => {
                const value = values[idx] ?? 0;
                const targetY = y(value);
                const targetHeight = height - targetY;
                return (
                  <g key={period}>
                    <rect className="bp_bar" fill={seriesColor(idx, PAIR_PALETTE_VARS)} height={isVisible ? targetHeight : 0} style={{ transitionDelay: `${idx * 140}ms` }} width={x.bandwidth()} x={x(period)} y={isVisible ? targetY : height} />
                    <ChartValueLabel delay={idx * 140 + 280} isVisible={isVisible} value={formatChartValue(value, valueFormat)} x={x(period) + x.bandwidth() / 2} y={targetY - 10} />
                    <text className="bp_period_label" x={x(period) + x.bandwidth() / 2} y={height + 22}>
                      {formatYearRange(period)}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default BarPair;
