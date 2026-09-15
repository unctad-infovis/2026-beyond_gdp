import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import { PAIR_PALETTE_VARS } from './components/charts/chartColors.js';
import GroupedBarChart from './components/charts/GroupedBarChart.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-trust');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_trust.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_trust"
          dimensionChip={{ label: 'Social cohesion', variant: 'yellow' }}
          title="Economic growth doesn't automatically improve social cohesion"
          description="Median gross domestic product (GDP) per capita and share of people who say most people can be trusted, Northern Africa and Western Asia, index: 2014=100 and percentage, 2014 and 2022."
          source="World Bank and World Values Survey."
          insight={["You can't buy trust. Similar economic growth can coincide with different changes in social cohesion. Median GDP rose 10.5% in Northern Africa between 2014 and 2022, but trust in people fell more than 17%. Meanwhile, both GDP per capita and trust rose by more than 20% during the same period in Western Asia."]}
          expandable={{ label: 'Countries in calculation', items: ['Northern Africa: Egypt, Libya, Morocco, Tunisia.', 'Western Asia: Armenia, Azerbaijan, Georgia, Iraq, Jordan, Lebanon, Türkiye.'] }}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={vis => (
              <GroupedBarChart
                isVisible={vis}
                title="Gross domestic product (GDP) per capita, index 2014=100"
                yLabel="Gross domestic product (GDP) per capita, index 2014=100"
                yMax={150}
                palette={PAIR_PALETTE_VARS}
                categories={[{ key: 'Northern Africa', label: 'Northern Africa' }, { key: 'Western Asia', label: 'Western Asia' }]}
                series={data.years.map(y => ({ key: String(y), label: String(y) }))}
                values={Object.fromEntries(Object.entries(data.regions).map(([region, r]) => [region, Object.fromEntries(data.years.map((y, i) => [String(y), r.gdp_index[i]]))]))}
              />
            )}
            rightChart={vis => (
              <GroupedBarChart
                isVisible={vis}
                title="Share of people who say most people can be trusted, per cent"
                yLabel="Share of people who say most people can be trusted, per cent"
                yMax={15}
                valueFormat=""
                palette={PAIR_PALETTE_VARS}
                categories={[{ key: 'Northern Africa', label: 'Northern Africa' }, { key: 'Western Asia', label: 'Western Asia' }]}
                series={data.years.map(y => ({ key: String(y), label: String(y) }))}
                values={Object.fromEntries(Object.entries(data.regions).map(([region, r]) => [region, Object.fromEntries(data.years.map((y, i) => [String(y), r.trust_pct[i]]))]))}
              />
            )}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
