import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import GapChart from './components/beyond_gdp/GapChart.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-data-gaps-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_gap1.json">
      {data => (
        <ChartSection
          standalone
          title="Los países en desarrollo disponen de menos datos Más allá del PIB"
          description="Indicadores del panel Más allá del PIB con al menos un dato disponible públicamente, por dimensión y estatus de desarrollo, porcentaje."
          source="Cálculos de ONU Comercio y Desarrollo (UNCTAD) a partir de datos disponibles internacionalmente"
          sourceLabel="Fuente:"
          noteLabel="Nota:"
          insight={['Aunque el análisis se basa en gran medida en el marco de indicadores de los ODS, la disponibilidad de datos sigue siendo limitada. Con base en los datos recopilados en abril de 2026 para los indicadores internacionales disponibles, las brechas de cobertura entre países desarrollados y en desarrollo son especialmente pronunciadas en el bienestar actual y en la sostenibilidad y la resiliencia. Actualmente, menos de la mitad de los países en desarrollo cuentan con cobertura en estas dos dimensiones clave.']}
        >
          <GapChart data={data} title="Los países en desarrollo disponen de menos datos Más allá del PIB" yLabel="Indicadores con datos disponibles, porcentaje" dimensionLabels={['Bienestar actual', 'Equidad e inclusión', 'Principios fundamentales', 'Sostenibilidad y resiliencia']} devStatusLabels={['Desarrollados', 'En desarrollo']} goalLabel="Meta: 100%" />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
