import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import GapChart from './components/beyond_gdp/GapChart.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-data-gaps-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_gap1.json">
      {data => (
        <ChartSection
          standalone
          title="Les pays en développement disposent de moins de données Au-delà du PIB"
          description="Indicateurs du tableau de bord Au-delà du PIB disposant d'au moins un point de données accessible au public, par dimension et statut de développement, pourcentage."
          source="Calculs d'ONU commerce et développement (CNUCED) à partir de données disponibles au niveau international"
          sourceLabel="Source :"
          noteLabel="Note :"
          insight={["Bien que l'analyse s'appuie en grande partie sur le cadre des indicateurs ODD, la disponibilité des données demeure limitée. D'après les données recueillies en avril 2026 pour les indicateurs internationaux disponibles, les écarts de couverture entre pays développés et pays en développement sont particulièrement marqués pour le bien-être actuel ainsi que pour la durabilité et la résilience. À l'heure actuelle, moins de la moitié des pays en développement sont couverts pour ces deux dimensions clés."]}
        >
          <GapChart data={data} title="Les pays en développement disposent de moins de données Au-delà du PIB" yLabel="Indicateurs disposant de données disponibles, en pourcentage" dimensionLabels={['Bien-être actuel', 'Équité et inclusion', 'Principes fondamentaux', 'Durabilité et résilience']} devStatusLabels={['Développés', 'En développement']} goalLabel="Objectif : 100 %" />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
