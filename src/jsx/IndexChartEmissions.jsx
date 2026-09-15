import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import { DEVELOPMENT_STATUS_PALETTE_VARS } from './components/charts/chartColors.js';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-emissions');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_emissions.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_emissions"
          dimensionChip={{ label: 'Natural capital', variant: 'green' }}
          title="Global emissions rise even as emissions per person level off"
          description="Greenhouse gas emissions, by development status, billions of tonnes of carbon dioxide equivalent and median tonnes of carbon dioxide equivalent per person, 2000–2017."
          source="UN Trade and Development (UNCTAD) based on UNFCCC Secretariat via UN Global SDG Indicators Database."
          note="Units assumed from the draft mockup (tonnes CO₂e per person; billions of tonnes CO₂e total) – not explicitly confirmed in the source graphic."
          insight={["The picture changes if we look at emissions per person or total emissions. Per-person emissions have stabilized in many countries, but economic and population growth continue to push total emissions higher. Staying within planetary boundaries requires greater ambition and action."]}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="developing" valueKey="total_ghg_emissions" isVisible={vis} title="Total greenhouse gas (GHG) emissions, billions of tonnes CO₂e" yLabel="Total greenhouse gas (GHG) emissions, billions of tonnes CO₂e" yMax={30} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} stackedLegend palette={DEVELOPMENT_STATUS_PALETTE_VARS} series={[{ key: 'Developed', label: 'Developed' }, { key: 'LDCs', label: 'Least developed countries (LDCs)' }, { key: 'Other developing', label: 'Other developing' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="developing" valueKey="ghg_per_capita" isVisible={vis} title="Greenhouse gas (GHG) emissions per capita, tonnes CO₂e per person" yLabel="Greenhouse gas (GHG) emissions per capita, tonnes CO₂e per person" hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} stackedLegend palette={DEVELOPMENT_STATUS_PALETTE_VARS} series={[{ key: 'Developed', label: 'Developed' }, { key: 'LDCs', label: 'Least developed countries (LDCs)' }, { key: 'Other developing', label: 'Other developing' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
