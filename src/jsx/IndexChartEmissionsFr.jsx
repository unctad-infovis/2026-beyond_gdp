import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import { DEVELOPMENT_STATUS_PALETTE_VARS } from './components/charts/chartColors.js';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-emissions-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_emissions.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_emissions"
          dimensionChip={{ icon: 'natural_capital', label: 'Capital naturel', variant: 'green' }}
          title="Les émissions mondiales augmentent alors que les émissions par habitant se stabilisent"
          description="Émissions de gaz à effet de serre, par statut de développement, milliards de tonnes d'équivalent dioxyde de carbone et tonnes médianes d'équivalent dioxyde de carbone par personne, 2000-2017."
          source="ONU commerce et développement (CNUCED), d'après le secrétariat de la CCNUCC, via la base de données mondiale des indicateurs relatifs aux ODD des Nations Unies."
          sourceLabel="Source :"
          noteLabel="Note :"
          note="Unités supposées d'après la maquette (tonnes d'éq. CO₂ par personne ; milliards de tonnes d'éq. CO₂ au total) – non explicitement confirmées dans le graphique source."
          insight={["Le constat change si l'on considère les émissions par personne ou les émissions totales. Les émissions par personne se sont stabilisées dans de nombreux pays, mais la croissance économique et démographique continue de pousser les émissions totales à la hausse. Rester dans les limites planétaires exige davantage d'ambition et d'action."]}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="developing" valueKey="total_ghg_emissions" isVisible={vis} title="Émissions totales de gaz à effet de serre (GES), milliards de tonnes éq. CO₂" yLabel="Émissions totales de gaz à effet de serre (GES), milliards de tonnes éq. CO₂" yMax={30} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} stackedLegend palette={DEVELOPMENT_STATUS_PALETTE_VARS} series={[{ key: 'Developed', label: 'Développés' }, { key: 'LDCs', label: 'Pays les moins avancés (PMA)' }, { key: 'Other developing', label: 'Autres pays en développement' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="developing" valueKey="ghg_per_capita" isVisible={vis} title="Émissions de gaz à effet de serre (GES) par habitant, tonnes éq. CO₂ par personne" yLabel="Émissions de gaz à effet de serre (GES) par habitant, tonnes éq. CO₂ par personne" hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} stackedLegend palette={DEVELOPMENT_STATUS_PALETTE_VARS} series={[{ key: 'Developed', label: 'Développés' }, { key: 'LDCs', label: 'Pays les moins avancés (PMA)' }, { key: 'Other developing', label: 'Autres pays en développement' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
