import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import DualBarRowsLoader from './components/beyond_gdp/DualBarRowsLoader.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-satisfaction');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_satisfaction.json">
      {data => (
        <ChartSection
          standalone
          title="More prosperity doesn't guarantee more satisfaction with public services"
          description="Share of people satisfied with their last experience of public services and gross domestic product (GDP) per capita, selected countries, percentage and dollars, 2015–2024 average."
          source="World Bank and United Nations Development Programme via the United Nations Global SDG Indicators Database."
          note="Reported satisfaction may reflect expectancy-disconfirmation. People with higher expectations may report lower satisfaction, even when the objective quality of the service is higher."
          insight={["Confidence in institutions matters. And this doesn't always come with higher levels of economic prosperity. Bulgaria and Mexico report greater satisfaction with public services than some wealthier countries, such as Norway and Italy."]}
        >
          <DualBarRowsLoader data={data} />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
