import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import BarPair from './components/charts/BarPair.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-wage-gap');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_wage_gap.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_wage_gap"
          dimensionChip={{ label: 'Income inequality', variant: 'purple' }}
          title="Economic growth outpaces gains in women's pay"
          description="Average gross domestic product (GDP) per capita and women's average hourly earnings as a share of men's, developed economies, dollars and percentage, 2010–2013 and 2020–2023 averages."
          source="World Bank and International Labour Organization via the United Nations Global SDG Indicators Database."
          insight={["GDP growth can be slower for one segment of the population. Average GDP per capita in developed economies rose 12% over a 10-year period, but women's pay relative to men's improved only 1% – less than one tenth as much."]}
          expandable={{ label: 'Countries in calculation', items: ['Bosnia and Herzegovina, Czechia, Finland, France, Greece, Hungary, Italy, Portugal, Republic of Korea, Republic of Moldova, Romania, Slovakia, Spain, Sweden, Switzerland, United Kingdom of Great Britain and Northern Ireland, United States of America.'] }}
        >
          <ChartPair
            rightDelayMs={840}
            leftChart={vis => <BarPair isVisible={vis} title="Gross domestic product (GDP) per capita, dollars" yLabel="Gross domestic product (GDP) per capita, dollars" periods={data.periods} values={data.series.gdp_per_capita} valueFormat="" />}
            rightChart={vis => <BarPair isVisible={vis} title="Women's hourly earnings, share of men's, per cent" yLabel="Women's hourly earnings, share of men's" periods={data.periods} values={data.series.wage_gap_pct} valueFormat="percent" />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
