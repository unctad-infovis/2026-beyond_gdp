import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-health');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_healthy_life_expectancy.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_health"
          dimensionChip={{ label: 'Health', variant: 'yellow' }}
          title="Higher incomes don't always mean longer, healthier lives"
          description="Median gross domestic product (GDP) per capita and healthy life expectancy in years, Northern America, Northern Europe and Southern Europe, dollars and years, 2000–2019."
          source="UN Trade and Development (UNCTAD) based on World Bank and WHO."
          insight={["Higher GDP doesn't always translate into more well-being. Southern Europe's GDP per capita is less than one half of Northern America's and Northern Europe's. Yet its healthy life expectancy is higher than the former's and has caught up to the latter's. In Southern Europe, healthy life expectancy continued to improve despite economic slowdown."]}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="region" valueKey="gdp_per_capita" isVisible={vis} title="Gross domestic product (GDP) per capita, dollars" yLabel="Gross domestic product (GDP) per capita, dollars" hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} palette={['--un-color-blue-brand', '--un-color-blue-darkest', '--un-color-yellow']} series={[{ key: 'NAM', label: 'Northern America' }, { key: 'NEU', label: 'Northern Europe' }, { key: 'SEU', label: 'Southern Europe' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="region" valueKey="healthy_life_exp" isVisible={vis} title="Healthy life expectancy, years" yLabel="Healthy life expectancy, years" yMin={64} yMax={72} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} palette={['--un-color-blue-brand', '--un-color-blue-darkest', '--un-color-yellow']} series={[{ key: 'NAM', label: 'Northern America' }, { key: 'NEU', label: 'Northern Europe' }, { key: 'SEU', label: 'Southern Europe' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
