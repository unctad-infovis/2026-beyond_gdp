import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import { PAIR_PALETTE_VARS } from './components/charts/chartColors.js';
import GroupedBarChart from './components/charts/GroupedBarChart.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-trust-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_trust.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_trust"
          dimensionChip={{ icon: 'social_cohesion', label: 'Cohesión social', variant: 'yellow' }}
          title="El crecimiento económico no mejora automáticamente la cohesión social"
          description="Producto interno bruto (PIB) per cápita mediano y proporción de personas que afirman que se puede confiar en la mayoría de la gente, África del Norte y Asia Occidental, índice: 2014=100 y porcentaje, 2014 y 2022."
          source="Banco Mundial y Encuesta Mundial de Valores."
          sourceLabel="Fuente:"
          noteLabel="Nota:"
          insight={['La confianza no se compra. Un crecimiento económico similar puede coincidir con cambios distintos en la cohesión social. El PIB mediano aumentó un 10,5% en África del Norte entre 2014 y 2022, pero la confianza en las personas cayó más de un 17%. Mientras tanto, tanto el PIB per cápita como la confianza aumentaron más de un 20% durante el mismo período en Asia Occidental.']}
          expandable={{ label: 'Países incluidos en el cálculo', items: ['África del Norte: Egipto, Libia, Marruecos, Túnez.', 'Asia Occidental: Armenia, Azerbaiyán, Georgia, Iraq, Jordania, Líbano, Türkiye.'] }}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={vis => (
              <GroupedBarChart
                isVisible={vis}
                title="Producto interno bruto (PIB) per cápita, índice 2014=100"
                yLabel="Producto interno bruto (PIB) per cápita, índice 2014=100"
                yMax={150}
                palette={PAIR_PALETTE_VARS}
                categories={[{ key: 'Northern Africa', label: 'África del Norte' }, { key: 'Western Asia', label: 'Asia Occidental' }]}
                series={data.years.map(y => ({ key: String(y), label: String(y) }))}
                values={Object.fromEntries(Object.entries(data.regions).map(([region, r]) => [region, Object.fromEntries(data.years.map((y, i) => [String(y), r.gdp_index[i]]))]))}
              />
            )}
            rightChart={vis => (
              <GroupedBarChart
                isVisible={vis}
                title="Proporción de personas que afirman que se puede confiar en la mayoría de la gente, porcentaje"
                yLabel="Proporción de personas que afirman que se puede confiar en la mayoría de la gente, porcentaje"
                yMax={15}
                valueFormat=""
                palette={PAIR_PALETTE_VARS}
                categories={[{ key: 'Northern Africa', label: 'África del Norte' }, { key: 'Western Asia', label: 'Asia Occidental' }]}
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
