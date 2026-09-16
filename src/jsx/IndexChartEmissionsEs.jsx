import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import { DEVELOPMENT_STATUS_PALETTE_VARS } from './components/charts/chartColors.js';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-emissions-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_emissions.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_emissions"
          dimensionChip={{ icon: 'natural_capital', label: 'Capital natural', variant: 'green' }}
          title="Las emisiones mundiales aumentan incluso cuando las emisiones por persona se estabilizan"
          description="Emisiones de gases de efecto invernadero, por estatus de desarrollo, miles de millones de toneladas de dióxido de carbono equivalente y toneladas medianas de dióxido de carbono equivalente por persona, 2000-2017."
          source="ONU Comercio y Desarrollo (UNCTAD), con base en la secretaría de la CMNUCC, a través de la Base de Datos Mundial de Indicadores de los ODS de las Naciones Unidas."
          sourceLabel="Fuente:"
          noteLabel="Nota:"
          note="Unidades asumidas a partir de la maqueta preliminar (toneladas de CO₂e por persona; miles de millones de toneladas de CO₂e en total); no confirmadas explícitamente en el gráfico de origen."
          insight={['El panorama cambia si se observan las emisiones por persona o las emisiones totales. Las emisiones por persona se han estabilizado en muchos países, pero el crecimiento económico y demográfico sigue impulsando al alza las emisiones totales. Mantenerse dentro de los límites planetarios exige mayor ambición y acción.']}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="developing" valueKey="total_ghg_emissions" isVisible={vis} title="Emisiones totales de gases de efecto invernadero (GEI), miles de millones de toneladas de CO₂e" yLabel="Emisiones totales de gases de efecto invernadero (GEI), miles de millones de toneladas de CO₂e" yMax={30} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} stackedLegend palette={DEVELOPMENT_STATUS_PALETTE_VARS} series={[{ key: 'Developed', label: 'Desarrollados' }, { key: 'LDCs', label: 'Países menos adelantados (PMA)' }, { key: 'Other developing', label: 'Otros países en desarrollo' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="developing" valueKey="ghg_per_capita" isVisible={vis} title="Emisiones de gases de efecto invernadero (GEI) per cápita, toneladas de CO₂e por persona" yLabel="Emisiones de gases de efecto invernadero (GEI) per cápita, toneladas de CO₂e por persona" hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} stackedLegend palette={DEVELOPMENT_STATUS_PALETTE_VARS} series={[{ key: 'Developed', label: 'Desarrollados' }, { key: 'LDCs', label: 'Países menos adelantados (PMA)' }, { key: 'Other developing', label: 'Otros países en desarrollo' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
