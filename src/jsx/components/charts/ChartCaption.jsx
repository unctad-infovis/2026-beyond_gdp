import './ChartCaption.css';

// Shared y-axis/measure caption shown above a chart's plot area, next to its legend if any.
// `align="right"` is for the (rarer) case of captioning an x-axis below the chart instead,
// where right-aligning under the axis's end reads more naturally than the default left edge.
const ChartCaption = ({ align = 'left', children }) => (children ? <p className={`chart_caption${align === 'right' ? ' chart_caption--right' : ''}`}>{children}</p> : null);

export default ChartCaption;
