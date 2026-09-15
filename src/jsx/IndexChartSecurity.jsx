import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-security');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_homicides.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_security"
          dimensionChip={{ label: 'Security', variant: 'yellow' }}
          title="Safety and security can worsen even as GDP improves"
          description="Median gross domestic product (GDP) per capita and intentional homicides, Latin America and the Caribbean and Eastern and South-Eastern Asia, index: 2015=100 and homicides per 100,000 people, 2015–2023."
          insight={["Sustained GDP growth doesn't always deliver more safety. In Latin America, homicides increased nearly 50% from 2015 to 2023, even as GDP rose 17%. In fact, median homicide rates reached their highest level on record in 2023. This contrasts sharply with Eastern and South-Eastern Asia, where homicide rates were 29 times lower."]}
          expandable={{ label: 'Countries in calculation', items: ['Eastern and South-Eastern Asia: Japan, Malaysia, Mongolia, Myanmar, Republic of Korea, Singapore.', 'Latin America: Argentina, Barbados, Brazil, Chile, Colombia, Costa Rica, Dominica, Ecuador, Grenada, Guyana, Honduras, Jamaica, Mexico, Panama, Paraguay, Plurinational State of Bolivia, Saint Lucia, Suriname, Uruguay.'] }}
          source="World Bank."
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="gdp_per_capita" isVisible={vis} title="Gross domestic product (GDP) per capita index, index 2015=100" yLabel="Gross domestic product (GDP) per capita, index 2015=100" yMin={90} yMax={121} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Latin America and the Caribbean', label: 'Latin America and the Caribbean' }, { key: 'Eastern and South-Eastern Asia', label: 'Eastern and South-Eastern Asia' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="homicides" isVisible={vis} title="Number of victims of homicide per 100 000 people" yLabel="Number of victims of homicide per 100 000 people" yMin={0} yMax={20} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Latin America and the Caribbean', label: 'Latin America and the Caribbean' }, { key: 'Eastern and South-Eastern Asia', label: 'Eastern and South-Eastern Asia' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
