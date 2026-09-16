import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import PREJUDICE_COUNTRY_NAMES_ES from './components/beyond_gdp/prejudiceCountryNames.es.js';
import RevealOnView from './components/beyond_gdp/RevealOnView.jsx';
import ScatterLog from './components/charts/ScatterLog.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-prejudice-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_prejudice.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_prejudice"
          dimensionChip={{ icon: 'overlapping_deprivations', label: 'Privaciones superpuestas', variant: 'purple' }}
          title="La prosperidad económica no protege a las personas contra los prejuicios"
          description="Producto interno bruto (PIB) per cápita y proporción de personas que declaran haber sufrido discriminación o acoso en los últimos 12 meses, países seleccionados, dólares en escala logarítmica y porcentaje, promedio 2014-2024."
          insight={['Un PIB más alto no está sistemáticamente vinculado a una menor discriminación o acoso. Centrarse únicamente en el crecimiento económico crea un punto ciego importante en la experiencia vivida de las personas.']}
          source="Banco Mundial y Oficina del Alto Comisionado de las Naciones Unidas para los Derechos Humanos (ACNUDH)."
          sourceLabel="Fuente:"
          noteLabel="Nota:"
          fitChart
        >
          <RevealOnView>
            {vis => (
              <ScatterLog
                points={data.map(d => ({ key: d.iso3, label: PREJUDICE_COUNTRY_NAMES_ES[d.iso3] ?? d.iso3, x: d['GDP per capita (log scale)'], y: d['Share reporting discrimination or harassment'] }))}
                title="Producto interno bruto (PIB) per cápita y proporción de personas que declaran haber sufrido discriminación o acoso"
                xLabel="Producto interno bruto (PIB) per cápita, dólares"
                yLabel="Proporción de personas que declaran haber sufrido discriminación o acoso, porcentaje"
                isVisible={vis}
              />
            )}
          </RevealOnView>
        </ChartSection>
      )}
    </ChartData>
  </div>
);
