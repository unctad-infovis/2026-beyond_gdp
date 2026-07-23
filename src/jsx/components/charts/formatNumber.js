// House style: charts and tables use a non-breaking space as the thousands separator; commas
// are reserved for prose. Use this instead of raw `.toLocaleString()` anywhere a number is
// rendered inside a chart, tooltip, or table cell.
const formatNumber = value => Math.round(value).toLocaleString('en-US').replace(/,/g, ' ');

export default formatNumber;
