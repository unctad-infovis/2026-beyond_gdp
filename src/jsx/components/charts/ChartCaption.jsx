import './ChartCaption.css';

// Shared y-axis/measure caption shown above a chart's plot area, next to its legend if any.
const ChartCaption = ({ children }) => (children ? <p className="chart_caption">{children}</p> : null);

export default ChartCaption;
