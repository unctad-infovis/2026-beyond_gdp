import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-wealth-inequality-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_wealth_inequality.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_wealth_inequality"
          dimensionChip={{ icon: 'wealth_inequality', label: 'Desigualdad de la riqueza', variant: 'purple' }}
          title="Un crecimiento más rápido puede venir acompañado de una mayor desigualdad de la riqueza"
          description="Producto interno bruto (PIB) per cápita mediano y proporción de la riqueza en poder del 99% más pobre, Europa del Este y Europa del Sur, índice: 2000=100 y porcentaje, 2000-2019."
          source="ONU Comercio y Desarrollo (UNCTAD), con base en el Banco Mundial y la World Inequality Database."
          sourceLabel="Fuente:"
          noteLabel="Nota:"
          insight={['Una marea creciente no siempre eleva a todos los barcos: el crecimiento económico puede coincidir con una desigualdad creciente. Por ejemplo, el PIB per cápita creció más rápido en Europa del Este que en Europa del Sur. Sin embargo, la proporción de la riqueza en poder del 99% más pobre disminuyó de forma más pronunciada en Europa del Este.']}
          expandable={{ label: 'Países incluidos en el cálculo', items: ['Europa del Este: Belarús, Bulgaria, Chequia, Hungría, Polonia, República de Moldova, Rumania, Federación de Rusia, Eslovaquia, Ucrania.', 'Europa del Sur: Albania, Andorra, Bosnia y Herzegovina, Croacia, Chipre, Grecia, Italia, Malta, Montenegro, Macedonia del Norte, Portugal, San Marino, Serbia, Eslovenia, España.'] }}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="gdp_per_capita" isVisible={vis} title="Producto interno bruto (PIB) per cápita, índice 2000=100" yLabel="Producto interno bruto (PIB) per cápita, índice 2000=100" yMin={90} yMax={250} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Eastern Europe', label: 'Europa del Este' }, { key: 'Southern Europe', label: 'Europa del Sur' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="wealth_99_perc" isVisible={vis} title="Proporción de la riqueza en poder del 99% más pobre, porcentaje" yLabel="Proporción de la riqueza en poder del 99% más pobre, porcentaje" yMin={75} yMax={78} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Eastern Europe', label: 'Europa del Este' }, { key: 'Southern Europe', label: 'Europa del Sur' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
