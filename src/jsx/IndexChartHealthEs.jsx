import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-health-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_healthy_life_expectancy.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_health"
          dimensionChip={{ icon: 'health', label: 'Salud', variant: 'yellow' }}
          title="Unos ingresos más altos no siempre significan una vida más larga y saludable"
          description="Producto interno bruto (PIB) per cápita mediano y esperanza de vida saludable en años, América del Norte, Europa del Norte y Europa del Sur, dólares y años, 2000-2019."
          source="ONU Comercio y Desarrollo (UNCTAD), con base en el Banco Mundial y la OMS."
          sourceLabel="Fuente:"
          noteLabel="Nota:"
          insight={['Un PIB más alto no siempre se traduce en más bienestar. El PIB per cápita de Europa del Sur es menos de la mitad del de América del Norte y Europa del Norte. Sin embargo, su esperanza de vida saludable es más alta que la de América del Norte y ha alcanzado a la de Europa del Norte. En Europa del Sur, la esperanza de vida saludable siguió mejorando pese a la desaceleración económica.']}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="region" valueKey="gdp_per_capita" isVisible={vis} title="Producto interno bruto (PIB) per cápita, dólares" yLabel="Producto interno bruto (PIB) per cápita, dólares" hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} palette={['--un-color-blue-brand', '--un-color-blue-darkest', '--un-color-yellow']} series={[{ key: 'NAM', label: 'América del Norte' }, { key: 'NEU', label: 'Europa del Norte' }, { key: 'SEU', label: 'Europa del Sur' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="region" valueKey="healthy_life_exp" isVisible={vis} title="Esperanza de vida saludable, años" yLabel="Esperanza de vida saludable, años" yMin={64} yMax={72} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} palette={['--un-color-blue-brand', '--un-color-blue-darkest', '--un-color-yellow']} series={[{ key: 'NAM', label: 'América del Norte' }, { key: 'NEU', label: 'Europa del Norte' }, { key: 'SEU', label: 'Europa del Sur' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
