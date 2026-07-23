import './ChartLegend.css';

// Shared color-swatch legend, used above the plot area by every multi-series chart primitive.
const ChartLegend = ({ items = [] }) => {
  if (items.length < 2) return null;
  return (
    <div className="chart_legend">
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
