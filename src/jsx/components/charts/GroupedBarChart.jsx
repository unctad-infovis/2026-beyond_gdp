import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import ChartCaption from './ChartCaption.jsx';
import ChartLegend from './ChartLegend.jsx';
import ChartValueLabel from './ChartValueLabel.jsx';
import ChartYTicks from './ChartYTicks.jsx';
import seriesColor, { seriesToLegendItems } from './chartColors.js';
import formatChartValue from './formatChartValue.js';
import './GroupedBarChart.css';
import useChartSize from './useChartSize.js';

// Rough average glyph width at --un-font-size-xxxxs (10px), used to decide whether a category
// label needs to wrap onto further lines rather than overlapping its neighbors on narrow charts
// (e.g. GapChart's "Sustainability & resilience" on a 4-category mobile-width band). Budgeted
// at 85% of the band width (not the full band) so adjacent labels keep a small gap even when
// both wrap to a similarly wide first line.
const LABEL_CHAR_WIDTH = 5.2;
const wrapCategoryLabel = (label, maxWidth) => {
  const budget = maxWidth * 0.85;
  if (label.length * LABEL_CHAR_WIDTH <= budget) return [label];
  const words = label.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (current && next.length * LABEL_CHAR_WIDTH > budget) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
};

// Bars are React <rect>s whose height/y respond to the `inView` boolean and animate via CSS
// transition + per-bar transitionDelay (not a D3 .transition()), so prefers-reduced-motion is
// honored natively via CSS rather than needing a JS guard — same pattern as gstp's TradeShareChart.
const GroupedBarChart = ({ categories = [], goal, goalLabel, isVisible = false, palette, series = [], title, valueFormat = 'number', values = {}, yLabel = '', yMax }) => {
  const [plotRef, size] = useChartSize(300);

  const margin = { bottom: 50, left: 48, right: 8, top: 24 };
  const width = Math.max(size.width - margin.left - margin.right, 0);
  const height = Math.max(size.height - margin.top - margin.bottom, 0);

  const x0 = scaleBand()
    .domain(categories.map(c => c.key))
    .range([0, width])
    .padding(0.3);
  const x1 = scaleBand()
    .domain(series.map(s => s.key))
    .range([0, x0.bandwidth()])
    .padding(0.12);
  const maxValue = max(categories.flatMap(c => series.map(s => values[c.key]?.[s.key] ?? 0))) ?? 0;
  const y = scaleLinear()
    .domain([0, yMax ?? maxValue])
    .range([height, 0]);
  if (yMax === undefined) y.nice();

  return (
    <div className="gbc_container">
      <ChartLegend items={seriesToLegendItems(series, palette)} />
      <ChartCaption>{yLabel}</ChartCaption>
      <div className="gbc_plot" ref={plotRef}>
        {width > 0 && (
          <svg aria-label={title} className="gbc_svg" height={size.height} role="img" width={size.width}>
            <g transform={`translate(${margin.left},${margin.top})`}>
              <ChartYTicks valueFormat={valueFormat} width={width} y={y} />
              {categories.map(c => (
                <g key={c.key} transform={`translate(${x0(c.key)},0)`}>
                  {series.map((s, sIdx) => {
                    const value = values[c.key]?.[s.key] ?? 0;
                    const targetY = y(value);
                    const targetHeight = height - targetY;
                    const idx = categories.findIndex(cat => cat.key === c.key) * series.length + sIdx;
                    return (
                      <g key={s.key}>
                        <rect className="gbc_bar" fill={seriesColor(sIdx, palette)} height={isVisible ? targetHeight : 0} style={{ transitionDelay: `${idx * 42}ms` }} width={x1.bandwidth()} x={x1(s.key)} y={isVisible ? targetY : height} />
                        <ChartValueLabel delay={idx * 42 + 150} isVisible={isVisible} value={formatChartValue(value, valueFormat)} x={x1(s.key) + x1.bandwidth() / 2} y={targetY - 8} />
                      </g>
                    );
                  })}
                  <text className="gbc_category_label" x={x0.bandwidth() / 2} y={height + 16}>
                    {wrapCategoryLabel(c.label, x0.bandwidth()).map((line, i) => (
                      <tspan dy={i === 0 ? 0 : '1.1em'} key={line} x={x0.bandwidth() / 2}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              ))}
              {goal !== undefined && (
                <g className="gbc_goal" transform={`translate(0,${y(goal)})`}>
                  <line x1={30} x2={width} />
                  <text x={width} y={14}>
                    {goalLabel ?? `${formatChartValue(goal, valueFormat)} goal`}
                  </text>
                </g>
              )}
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default GroupedBarChart;
