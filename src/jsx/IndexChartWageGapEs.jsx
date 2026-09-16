import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import BarPair from './components/charts/BarPair.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-wage-gap-es');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_wage_gap.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_wage_gap"
          dimensionChip={{ icon: 'income_inequality', label: 'Desigualdad de ingresos', variant: 'purple' }}
          title="El crecimiento económico supera los avances en la remuneración de las mujeres"
          description="Producto interno bruto (PIB) per cápita promedio e ingresos por hora promedio de las mujeres como proporción de los de los hombres, economías desarrolladas, dólares y porcentaje, promedios 2010-2013 y 2020-2023."
          source="Banco Mundial y Organización Internacional del Trabajo, a través de la Base de Datos Mundial de Indicadores de los ODS de las Naciones Unidas."
          sourceLabel="Fuente:"
          noteLabel="Nota:"
          insight={['El crecimiento del PIB puede ser más lento para un segmento de la población. El PIB per cápita promedio de las economías desarrolladas aumentó un 12% en un período de 10 años, pero la remuneración de las mujeres en relación con la de los hombres solo mejoró un 1%, menos de una décima parte de ese avance.']}
          expandable={{ label: 'Países incluidos en el cálculo', items: ['Bosnia y Herzegovina, Chequia, Finlandia, Francia, Grecia, Hungría, Italia, Portugal, República de Corea, República de Moldova, Rumania, Eslovaquia, España, Suecia, Suiza, Reino Unido de Gran Bretaña e Irlanda del Norte, Estados Unidos de América.'] }}
        >
          <ChartPair
            rightDelayMs={840}
            leftChart={vis => <BarPair isVisible={vis} title="Producto interno bruto (PIB) per cápita, dólares" yLabel="Producto interno bruto (PIB) per cápita, dólares" periods={data.periods} values={data.series.gdp_per_capita} valueFormat="" />}
            rightChart={vis => <BarPair isVisible={vis} title="Ingresos por hora de las mujeres, como proporción de los de los hombres, porcentaje" yLabel="Ingresos por hora de las mujeres, como proporción de los de los hombres" periods={data.periods} values={data.series.wage_gap_pct} valueFormat="percent" />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
