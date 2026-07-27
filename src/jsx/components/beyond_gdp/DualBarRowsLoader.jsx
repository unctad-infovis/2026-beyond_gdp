import DualBarRows from '../charts/DualBarRows.jsx';
import formatNumber from '../charts/formatNumber.js';
import COUNTRY_NAMES, { COUNTRY_ISO2 } from './countryNames.js';
import RevealOnView from './RevealOnView.jsx';

const HIGHLIGHT_ISO3 = [];

// Shapes the raw satisfaction.json rows (iso3-keyed) into DualBarRows' generic row shape.
// Visibility is delegated to RevealOnView since this chart renders standalone (not inside a ChartPair).
const DualBarRowsLoader = ({ data }) => {
  const rows = data.map(d => ({
    key: d.iso3,
    name: COUNTRY_NAMES[d.iso3] ?? d.iso3,
    flagCode: COUNTRY_ISO2[d.iso3],
    primaryValue: d['Satisfaction with public services'],
    secondaryValue: d['GDP per capita']
  }));

  return (
    <RevealOnView>{isVisible => <DualBarRows rows={rows} highlight={HIGHLIGHT_ISO3} isVisible={isVisible} primaryLabel="Satisfaction with public services" secondaryLabel="Gross domestic product (GDP) per capita" primaryFormat={v => `${Math.round(v)}%`} secondaryFormat={v => `$${formatNumber(v)}`} />}</RevealOnView>
  );
};

export default DualBarRowsLoader;
