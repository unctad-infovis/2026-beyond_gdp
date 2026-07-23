import * as d3 from 'd3';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ChartLegend from './ChartLegend.jsx';
import ChartTooltip from './ChartTooltip.jsx';
import seriesColor from './chartColors.js';
import './d3Locale.js';
import formatNumber from './formatNumber.js';
import './LineChartMulti.css';

// Module-scope so the default stays referentially stable across renders — an inline object
// literal default parameter would otherwise be a new reference every render, destabilizing
// the draw() useCallback below and corrupting in-flight D3 transitions on parent re-renders.
const DEFAULT_MARGIN = { top: 16, right: 16, bottom: 32, left: 80 };

const formatTooltipValue = value => (Math.abs(value) >= 1000 ? formatNumber(value) : (Math.round(value * 10) / 10).toLocaleString());

// Multi-series time-line chart. The static structure (axes, gridlines, legend) renders as soon
// as the chart mounts, regardless of isVisible — only the lines themselves stay hidden (clip
// width 0) until isVisible fires, at which point they draw in left-to-right. This matters for
// a ChartPair's held-back right panel: its frame should already be there when the section
// scrolls into view, with only its data waiting on the sequencing delay. Hover shows a
// crosshair with each series' value at that year, matching the cdde CommodityPrices pattern
// (bisector-free here since the data is on a whole-year grid, so the nearest year is just a
// rounded scale inversion).
const LineChartMulti = ({ animDuration = 1400, data = [], dateKey = 'date', isVisible = false, margin = DEFAULT_MARGIN, seriesKey, series = [], title, valueKey, yLabel = '' }) => {
  const svgRef = useRef(null);
  const structureBuilt = useRef(false);
  const phase = useRef('hidden'); // 'hidden' | 'revealing' | 'shown'
  const isAnimating = useRef(false);
  const [tooltip, setTooltip] = useState(null);

  // Memoized so draw()'s identity stays stable across parent re-renders (e.g. a sibling
  // ChartPair panel flipping visible) instead of retriggering the resize-observer effect below.
  const seriesData = useMemo(
    () =>
      series.map(s => ({
        ...s,
        points: data
          .filter(d => d[seriesKey] === s.key)
          .map(d => ({ date: +d[dateKey], value: +d[valueKey] }))
          .sort((a, b) => a.date - b.date)
      })),
    [data, dateKey, series, seriesKey, valueKey]
  );

  // targetPhase: 'hidden' (clip stays at 0, structure only), 'reveal' (clip animates 0 -> full),
  // or 'shown' (clip snaps straight to full, no transition — reduced-motion or a resize redraw
  // of an already-revealed chart).
  const draw = useCallback(
    targetPhase => {
      if (!svgRef.current) return;
      setTooltip(null);
      // Measure the svg's own CSS-driven box (not its parent's), so an ancestor wrapper — e.g.
      // the ChartLegend rendered alongside it — never gets folded into the plot's dimensions.
      const totalWidth = svgRef.current.clientWidth;
      const totalHeight = svgRef.current.clientHeight;
      const width = totalWidth - margin.left - margin.right;
      const height = totalHeight - margin.top - margin.bottom;
      if (width <= 0 || height <= 0) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      svg.attr('width', totalWidth).attr('height', totalHeight);

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const allPoints = seriesData.flatMap(s => s.points);
      const xExtent = d3.extent(allPoints, d => d.date);
      const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(allPoints, d => d.value) ?? 0])
        .nice()
        .range([height, 0]);

      // Nice round-number interior ticks from d3, always anchored with the domain's first/last
      // year so the chart's actual start/end dates are labeled even if off-step. Ticks too close
      // to a neighbor (e.g. a d3-picked tick landing right next to a forced endpoint) are dropped.
      const span = xExtent[1] - xExtent[0];
      const minGap = span / 10;
      const niceTicks = xScale.ticks(Math.min(6, span + 1)).filter(t => Number.isInteger(t));
      const merged = [...new Set([xExtent[0], ...niceTicks, xExtent[1]])].sort((a, b) => a - b);
      const keptFromStart = merged.filter((t, i) => i === 0 || t - merged[i - 1] >= minGap);
      const xTicks = keptFromStart.filter((t, i) => i === 0 || i === keptFromStart.length - 1 || keptFromStart[keptFromStart.length - 1] - t >= minGap);
      const xAxis = d3.axisBottom(xScale).tickValues(xTicks).tickFormat(d3.format('d')).tickSize(0).tickPadding(10);
      g.append('g')
        .attr('class', 'lcm_axis lcm_axis_x')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .call(ax => ax.select('.domain').remove());

      const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-width).tickPadding(10);
      g.append('g')
        .attr('class', 'lcm_axis lcm_axis_y')
        .call(yAxis)
        .call(ax => ax.select('.domain').remove());

      if (yLabel) {
        g.append('text')
          .attr('class', 'lcm_axis_label')
          .attr('transform', 'rotate(-90)')
          .attr('x', -height / 2)
          .attr('y', -margin.left + 12)
          .attr('text-anchor', 'middle')
          .text(yLabel);
      }

      const clipId = `lcm-clip-${Math.random().toString(36).slice(2, 7)}`;
      svg
        .append('defs')
        .append('clipPath')
        .attr('id', clipId)
        .append('rect')
        .attr('width', targetPhase === 'shown' ? width : 0)
        .attr('height', height + margin.top);

      const linesGroup = g.append('g').attr('clip-path', `url(#${clipId})`);
      // Straight segments between points (default d3.curveLinear) — no spline smoothing, per
      // project convention: never imply data between measured points that wasn't measured.
      const lineGen = d3
        .line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value));

      seriesData.forEach((s, idx) => {
        linesGroup.append('path').datum(s.points).attr('class', 'lcm_line').attr('fill', 'none').attr('stroke', seriesColor(idx)).attr('d', lineGen);
      });

      // Hover crosshair — kept outside linesGroup (unclipped) so it works across the full plot
      // width regardless of the draw-in animation's clip progress.
      const hoverGroup = g.append('g').attr('class', 'lcm_hover').style('display', 'none');
      const hoverLine = hoverGroup.append('line').attr('class', 'lcm_hover_line').attr('y1', 0).attr('y2', height);

      const handleLeave = () => {
        hoverGroup.style('display', 'none');
        setTooltip(null);
      };

      const handleMove = event => {
        const [mx, my] = d3.pointer(event, svgRef.current);
        const chartX = mx - margin.left;
        if (chartX < 0 || chartX > width) {
          handleLeave();
          return;
        }
        const year = Math.max(xExtent[0], Math.min(xExtent[1], Math.round(xScale.invert(chartX))));
        const rows = seriesData.map((s, idx) => ({ color: seriesColor(idx), label: s.label, point: s.points.find(p => p.date === year) })).filter(r => r.point);
        if (!rows.length) {
          handleLeave();
          return;
        }
        const cx = xScale(year);
        hoverGroup.style('display', null);
        hoverLine.attr('x1', cx).attr('x2', cx);
        hoverGroup
          .selectAll('circle')
          .data(rows, d => d.label)
          .join('circle')
          .attr('class', 'lcm_hover_dot')
          .attr('r', 5)
          .attr('fill', d => d.color)
          .attr('cx', cx)
          .attr('cy', d => yScale(d.point.value));
        setTooltip({ flip: mx > totalWidth * 0.6, rows: rows.map(r => ({ color: r.color, label: r.label, value: r.point.value })), x: mx, y: my, year });
      };

      g.append('rect').attr('class', 'lcm_overlay').attr('width', width).attr('height', height).on('mousemove', handleMove).on('mouseleave', handleLeave);

      if (targetPhase === 'reveal') {
        isAnimating.current = true;
        svg
          .select(`#${clipId} rect`)
          .transition()
          .duration(animDuration)
          .ease(d3.easeLinear)
          .attr('width', width)
          .on('end', () => {
            isAnimating.current = false;
            phase.current = 'shown';
          });
      }
    },
    [animDuration, margin, seriesData, yLabel]
  );

  const hasPoints = seriesData.some(s => s.points.length > 0);

  // Build the static structure as soon as there's data, independent of isVisible — the frame
  // (axes, gridlines, legend) should already be in place before the reveal is triggered.
  useEffect(() => {
    if (!hasPoints || structureBuilt.current) return;
    structureBuilt.current = true;
    draw('hidden');
  }, [hasPoints, draw]);

  // Reveal (or, under reduced motion, snap straight to shown) once isVisible fires.
  useEffect(() => {
    if (!isVisible || !structureBuilt.current || phase.current !== 'hidden') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    phase.current = reduceMotion ? 'shown' : 'revealing';
    draw(reduceMotion ? 'shown' : 'reveal');
  }, [isVisible, draw]);

  useEffect(() => {
    if (!structureBuilt.current) return;
    let timeout;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!isAnimating.current) draw(phase.current === 'shown' ? 'shown' : 'hidden');
      }, 100);
    });
    if (svgRef.current) observer.observe(svgRef.current);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <div className="lcm_container">
      <ChartLegend items={series.map((s, idx) => ({ color: seriesColor(idx), key: s.key, label: s.label }))} />
      <div className="lcm_plot_wrap">
        <svg aria-label={title} className="lcm_svg" ref={svgRef} role="img" />
        {tooltip && (
          <ChartTooltip flip={tooltip.flip} left={tooltip.x} top={tooltip.y}>
            <div className="chart_tooltip_heading">{tooltip.year}</div>
            {tooltip.rows.map(r => (
              <div className="chart_tooltip_row" key={r.label}>
                <span className="chart_tooltip_dot" style={{ background: r.color }} />
                <span className="chart_tooltip_label">{r.label}</span>
                <span className="chart_tooltip_value">{formatTooltipValue(r.value)}</span>
              </div>
            ))}
          </ChartTooltip>
        )}
      </div>
    </div>
  );
};

export default LineChartMulti;
