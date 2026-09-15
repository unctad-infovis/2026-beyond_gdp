import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import GapChart from './components/beyond_gdp/GapChart.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-data-gaps');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_gap1.json">
      {data => (
        <ChartSection
          standalone
          title="Developing countries have less Beyond GDP data"
          description="Beyond GDP dashboard indicators with at least one publicly available data point, by dimension and development status, percentage."
          source="UN Trade and Development (UNCTAD) calculations on internationally available data"
          insight={["Although the analysis largely relies on the SDG indicator framework, data availability remains limited. Based on data collected in April 2026 for the available international indicators, coverage gaps between developed and developing countries are particularly pronounced for current well-being and sustainability and resilience. At present, fewer than half of developing countries are covered for these two key dimensions."]}
        >
          <GapChart data={data} title="Developing countries have less Beyond GDP data" yLabel="Indicators with available data, percentage" />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
