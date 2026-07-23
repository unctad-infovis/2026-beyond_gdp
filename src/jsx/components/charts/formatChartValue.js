import formatNumber from './formatNumber.js';

const formatChartValue = (value, format = 'number') => {
  if (format === 'percent') return `${Math.round(value)}%`;
  if (format === 'currency') return `$${formatNumber(value)}`;
  return formatNumber(value);
};

export default formatChartValue;
