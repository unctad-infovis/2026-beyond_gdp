import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleLog } from 'd3-scale';
import { select } from 'd3-selection';
import { useEffect, useRef, useState } from 'react';
import ChartCaption from './ChartCaption.jsx';
import ChartTooltip, { tooltipLeft } from './ChartTooltip.jsx';
import './d3Locale.js';
import formatNumber from './formatNumber.js';
import './ScatterLog.css';
import useChartSize from './useChartSize.js';

const defaultXFormat = v => `$${formatNumber(v)}`;
const defaultYFormat = v => `${Math.round(v * 10) / 10}%`;

// Log-scale x-axis scatterplot; circles fade/pop in one after another (18ms apart, capped at
// 2s total) so the sequence actually reads as points appearing in turn rather than a near-
// simultaneous pop. No trendline, per the draft's explicit instruction not to add one unless
// statistically validated. Hovering a point shows its exact x/y values, matching the cdde
// EconomyBubbleChart pattern (per-point mouse listeners rather than a bisector, since each
// point is its own discrete target).
const ScatterLog = ({ isVisible = false, points = [], title, xFormat = defaultXFormat, xLabel = '', yFormat = defaultYFormat, yLabel = '' }) => {
  const [plotRef, size] = useChartSize(600);
  const axesRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const margin = { bottom: 40, left: 48, right: 16, top: 8 };
  const width = Math.max(size.width - margin.left - margin.right, 0);
  const height = Math.max(size.height - margin.top - margin.bottom, 0);

  const xDomain = extent(points, p => p.x);
  const x = scaleLog()
    .domain(xDomain[0] > 0 ? xDomain : [1, 100000])
    .range([0, width]);
  const y = scaleLinear()
    .domain([0, (extent(points, p => p.y)[1] ?? 0) * 1.1])
    .nice()
    .range([height, 0]);

  useEffect(() => {
    if (!axesRef.current || width <= 0) return;
    const g = select(axesRef.current);
    g.selectAll('*').remove();
    g.append('g')
      .attr('class', 'sl_axis sl_axis_x')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x).ticks(5, '~s').tickSize(0).tickPadding(10))
      .call(ax => ax.select('.domain').remove());
    g.append('g')
      .attr('class', 'sl_axis sl_axis_y')
      .call(axisLeft(y).ticks(5).tickSize(-width).tickPadding(10))
      .call(ax => ax.select('.domain').remove());
  }, [x, y, width, height]);

  const handlePointMove = (event, p) => {
    const wrapRect = plotRef.current.getBoundingClientRect();
    const x = event.clientX - wrapRect.left;
    setHovered({ left: tooltipLeft(x, wrapRect.width), point: p, top: event.clientY - wrapRect.top });
  };

  return (
    <div className="sl_container">
      <ChartCaption>{yLabel}</ChartCaption>
      <div className="sl_plot" ref={plotRef}>
        {width > 0 && (
          <svg aria-label={title} className="sl_svg" height={size.height} role="img" width={size.width}>
            <g ref={axesRef} transform={`translate(${margin.left},${margin.top})`} />
            <g transform={`translate(${margin.left},${margin.top})`}>
              {points.map((p, idx) => (
                // biome-ignore lint/a11y/noStaticElementInteractions: mouse-only hover affordance surfacing supplementary detail; the chart's overall finding is already conveyed in the surrounding text and the svg's own aria-label
                <circle
                  className={`sl_point${isVisible ? ' sl_point--visible' : ''}${hovered?.point.key === p.key ? ' sl_point--hover' : ''}`}
                  cx={x(Math.max(p.x, xDomain[0]))}
                  cy={y(p.y)}
                  key={p.key}
                  onMouseEnter={e => handlePointMove(e, p)}
                  onMouseLeave={() => setHovered(null)}
                  onMouseMove={e => handlePointMove(e, p)}
                  r={4}
                  style={{ transitionDelay: `${Math.min(idx * 18, 2000)}ms` }}
                />
              ))}
            </g>
          </svg>
        )}
        {hovered && (
          <ChartTooltip left={hovered.left} top={hovered.top}>
            <div className="chart_tooltip_heading">{hovered.point.label ?? hovered.point.key}</div>
            <div className="chart_tooltip_row">
              <span className="chart_tooltip_label">{xLabel}</span>
              <span className="chart_tooltip_value">{xFormat(hovered.point.x)}</span>
            </div>
            <div className="chart_tooltip_row">
              <span className="chart_tooltip_label">{yLabel}</span>
              <span className="chart_tooltip_value">{yFormat(hovered.point.y)}</span>
            </div>
          </ChartTooltip>
        )}
      </div>
      <ChartCaption align="right">{xLabel}</ChartCaption>
    </div>
  );
};

export default ScatterLog;
