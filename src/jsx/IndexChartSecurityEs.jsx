import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-security-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_homicides.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_security"
          dimensionChip={{ icon: 'security', label: 'Seguridad', variant: 'yellow' }}
          title="La seguridad puede empeorar incluso cuando el PIB mejora"
          description="Producto interno bruto (PIB) per cápita mediano y homicidios intencionales, América Latina y el Caribe y Asia Oriental y Sudoriental, índice: 2015=100 y homicidios por cada 100.000 habitantes, 2015-2023."
          insight={['Un crecimiento sostenido del PIB no siempre se traduce en más seguridad. En América Latina, los homicidios aumentaron casi un 50% entre 2015 y 2023, aun cuando el PIB creció un 17%. De hecho, la tasa mediana de homicidios alcanzó su nivel más alto registrado en 2023. Esto contrasta fuertemente con Asia Oriental y Sudoriental, donde las tasas de homicidios eran 29 veces más bajas.']}
          expandable={{ label: 'Países incluidos en el cálculo', items: ['Asia Oriental y Sudoriental: Japón, Malasia, Mongolia, Myanmar, República de Corea, Singapur.', 'América Latina: Argentina, Barbados, Brasil, Chile, Colombia, Costa Rica, Dominica, Ecuador, Granada, Guyana, Honduras, Jamaica, México, Panamá, Paraguay, Estado Plurinacional de Bolivia, Santa Lucía, Suriname, Uruguay.'] }}
          source="Banco Mundial."
          sourceLabel="Fuente:"
          noteLabel="Nota:"
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="gdp_per_capita" isVisible={vis} title="Producto interno bruto (PIB) per cápita, índice 2015=100" yLabel="Producto interno bruto (PIB) per cápita, índice 2015=100" yMin={90} yMax={121} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Latin America and the Caribbean', label: 'América Latina y el Caribe' }, { key: 'Eastern and South-Eastern Asia', label: 'Asia Oriental y Sudoriental' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="homicides" isVisible={vis} title="Número de víctimas de homicidio por cada 100.000 habitantes" yLabel="Número de víctimas de homicidio por cada 100.000 habitantes" yMin={0} yMax={20} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Latin America and the Caribbean', label: 'América Latina y el Caribe' }, { key: 'Eastern and South-Eastern Asia', label: 'Asia Oriental y Sudoriental' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
