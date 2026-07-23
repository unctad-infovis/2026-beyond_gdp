import { formatDefaultLocale } from 'd3-format';

// House style: charts and tables use a non-breaking space as the thousands separator (commas
// are reserved for prose). Sets d3-format's default locale once, application-wide, so every
// D3 axis/tick/format call — including ones with no explicit format specifier — follows it.
formatDefaultLocale({
  currency: ['$', ''],
  decimal: '.',
  grouping: [3],
  thousands: ' '
});
