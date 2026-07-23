import './ChartValueLabel.css';

// Shared "value fades in above a bar once it's finished growing" label, used by GroupedBarChart
// and BarPair. `delay` should line up with the bar's own height/y transition duration so the
// number appears once the bar has (roughly) reached its final height.
const ChartValueLabel = ({ delay = 0, isVisible = false, value, x, y }) => (
  <text className={`chart_value_label${isVisible ? ' chart_value_label--visible' : ''}`} style={{ transitionDelay: `${delay}ms` }} x={x} y={y}>
    {value}
  </text>
);

export default ChartValueLabel;
