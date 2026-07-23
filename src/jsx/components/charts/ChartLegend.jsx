import './ChartLegend.css';

// Shared color-swatch legend, used above the plot area by every multi-series chart primitive.
// `stacked` is a one-off exception for legends whose item labels are long enough that the
// default wrapping flex row breaks unevenly (e.g. 2 items then a lone 3rd) — stacks items in a
// single column instead.
const ChartLegend = ({ items = [], stacked = false }) => {
  if (items.length < 2) return null;
  return (
    <div className={`chart_legend${stacked ? ' chart_legend--stacked' : ''}`}>
      {items.map(item => (
        <span className="chart_legend_item" key={item.key}>
          <span className="chart_legend_swatch" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default ChartLegend;
