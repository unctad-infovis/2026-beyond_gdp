import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import COUNTRY_NAMES_ES from './components/beyond_gdp/countryNames.es.js';
import DualBarRowsLoader from './components/beyond_gdp/DualBarRowsLoader.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-satisfaction-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_satisfaction.json">
      {data => (
        <ChartSection
          standalone
          title="Más prosperidad no garantiza más satisfacción con los servicios públicos"
          description="Proporción de personas satisfechas con su última experiencia de los servicios públicos y producto interno bruto (PIB) per cápita, países seleccionados, porcentaje y dólares, promedio 2015-2024."
          source="Banco Mundial y Programa de las Naciones Unidas para el Desarrollo, a través de la Base de Datos Mundial de Indicadores de los ODS de las Naciones Unidas."
          sourceLabel="Fuente:"
          noteLabel="Nota:"
          note="La satisfacción declarada puede reflejar un efecto de disconfirmación de expectativas. Las personas con expectativas más altas pueden declarar una satisfacción menor, incluso cuando la calidad objetiva del servicio es superior."
          insight={['La confianza en las instituciones importa. Y esta no siempre va acompañada de niveles más altos de prosperidad económica. Bulgaria y México declaran una mayor satisfacción con los servicios públicos que algunos países más ricos, como Noruega e Italia.']}
        >
          <DualBarRowsLoader data={data} countryNames={COUNTRY_NAMES_ES} primaryLabel="Satisfacción con los servicios públicos" secondaryLabel="Producto interno bruto (PIB) per cápita" sortByLabel="Ordenar por" />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
