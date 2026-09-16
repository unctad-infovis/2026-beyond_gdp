import DualBarRows from '../charts/DualBarRows.jsx';
import formatNumber from '../charts/formatNumber.js';
import COUNTRY_NAMES, { COUNTRY_ISO2 } from './countryNames.js';
import RevealOnView from './RevealOnView.jsx';

const HIGHLIGHT_ISO3 = [];

// Shapes the raw satisfaction.json rows (iso3-keyed) into DualBarRows' generic row shape.
// Visibility is delegated to RevealOnView since this chart renders standalone (not inside a ChartPair).
// countryNames/countryIso2 default to the English lookup tables; French/Spanish callers pass
// their own translated tables (countryNames.fr.js/countryNames.es.js) instead.
const DualBarRowsLoader = ({ countryIso2 = COUNTRY_ISO2, countryNames = COUNTRY_NAMES, data, primaryLabel = 'Satisfaction with public services', secondaryLabel = 'Gross domestic product (GDP) per capita', sortByLabel }) => {
  const rows = data.map(d => ({
    key: d.iso3,
    name: countryNames[d.iso3] ?? d.iso3,
    flagCode: countryIso2[d.iso3],
    primaryValue: d['Satisfaction with public services'],
    secondaryValue: d['GDP per capita']
  }));

  return (
    <RevealOnView>{isVisible => <DualBarRows rows={rows} highlight={HIGHLIGHT_ISO3} isVisible={isVisible} primaryLabel={primaryLabel} secondaryLabel={secondaryLabel} sortByLabel={sortByLabel} primaryFormat={v => `${Math.round(v)}%`} secondaryFormat={v => `$${formatNumber(v)}`} />}</RevealOnView>
  );
};

export default DualBarRowsLoader;
