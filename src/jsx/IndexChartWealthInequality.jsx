import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-wealth-inequality');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_wealth_inequality.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_wealth_inequality"
          dimensionChip={{ label: 'Wealth inequality', variant: 'purple' }}
          title="Faster growth can come with wider wealth inequality"
          description="Median gross domestic product (GDP) per capita and share of wealth held by the bottom 99%, Eastern and Southern Europe, index: 2000=100 and percentage, 2000–2019."
          source="UN Trade and Development (UNCTAD) based on World Bank and World Inequality Database."
          insight={["A rising tide doesn't always lift all boats – economic growth can coincide with growing inequality. For example, GDP per capita grew faster in Eastern Europe than in Southern Europe. Yet the share of wealth held by the bottom 99% declined more sharply in Eastern Europe."]}
          expandable={{ label: 'Countries in calculation', items: ['Eastern Europe: Belarus, Bulgaria, Czechia, Hungary, Poland, Republic of Moldova, Romania, Russian Federation, Slovakia, Ukraine.', 'Southern Europe: Albania, Andorra, Bosnia and Herzegovina, Croatia, Cyprus, Greece, Italy, Malta, Montenegro, North Macedonia, Portugal, San Marino, Serbia, Slovenia, Spain.'] }}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="gdp_per_capita" isVisible={vis} title="Gross domestic product (GDP) per capita, index 2000=100" yLabel="Gross domestic product (GDP) per capita, index 2000=100" yMin={90} yMax={250} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Eastern Europe', label: 'Eastern Europe' }, { key: 'Southern Europe', label: 'Southern Europe' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="wealth_99_perc" isVisible={vis} title="Wealth share of bottom 99%, per cent" yLabel="Wealth share of bottom 99%, percentage"  yMin={75} yMax={78} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Eastern Europe', label: 'Eastern Europe' }, { key: 'Southern Europe', label: 'Southern Europe' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
