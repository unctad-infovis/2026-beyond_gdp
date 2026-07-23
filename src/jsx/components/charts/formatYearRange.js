// Normalizes "2010-2013"-style hyphenated year ranges (as they sometimes arrive from source
// data) to the en dash ("2010–2013") used everywhere else on the page for a time-range divider.
const formatYearRange = str => (typeof str === 'string' ? str.replace(/(\d{4})-(\d{4})/, '$1–$2') : str);

export default formatYearRange;
