import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import PREJUDICE_COUNTRY_NAMES from './components/beyond_gdp/prejudiceCountryNames.js';
import RevealOnView from './components/beyond_gdp/RevealOnView.jsx';
import ScatterLog from './components/charts/ScatterLog.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-prejudice');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_prejudice.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_prejudice"
          dimensionChip={{ label: 'Overlapping deprivations', variant: 'purple' }}
          title="Economic prosperity doesn't protect people against prejudice"
          description="Gross domestic product (GDP) per capita and share of people reporting discrimination or harassment in the previous 12 months, selected countries, dollars on a logarithmic scale and percentage, 2014–2024 average."
          insight={["Higher GDP isn't systematically linked to less discrimination or harassment. Focusing only on economic growth creates a major blind spot in people's lived experience."]}
          source="World Bank and Office of the United Nations High Commissioner for Human Rights (OHCHR)."
          fitChart
        >
          <RevealOnView>
            {vis => (
              <ScatterLog
                points={data.map(d => ({ key: d.iso3, label: PREJUDICE_COUNTRY_NAMES[d.iso3] ?? d.iso3, x: d['GDP per capita (log scale)'], y: d['Share reporting discrimination or harassment'] }))}
                title="Gross domestic product (GDP) per capita vs. share reporting discrimination or harassment"
                xLabel="Gross domestic product (GDP) per capita, dollars"
                yLabel="Share reporting discrimination or harassment, per cent"
                isVisible={vis}
              />
            )}
          </RevealOnView>
        </ChartSection>
      )}
    </ChartData>
  </div>
);
