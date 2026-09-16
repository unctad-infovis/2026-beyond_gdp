import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import PREJUDICE_COUNTRY_NAMES_FR from './components/beyond_gdp/prejudiceCountryNames.fr.js';
import RevealOnView from './components/beyond_gdp/RevealOnView.jsx';
import ScatterLog from './components/charts/ScatterLog.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-prejudice-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_prejudice.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_prejudice"
          dimensionChip={{ icon: 'overlapping_deprivations', label: 'Privations cumulées', variant: 'purple' }}
          title="La prospérité économique ne protège pas contre les préjugés"
          description="Produit intérieur brut (PIB) par habitant et part de la population déclarant avoir été victime de discrimination ou de harcèlement au cours des 12 derniers mois, pays sélectionnés, dollars sur une échelle logarithmique et pourcentage, moyenne 2014-2024."
          insight={["Un PIB plus élevé n'est pas systématiquement associé à moins de discrimination ou de harcèlement. Se concentrer uniquement sur la croissance économique crée un angle mort majeur dans le vécu des populations."]}
          source="Banque mondiale et Haut-Commissariat des Nations Unies aux droits de l'homme (HCDH)."
          sourceLabel="Source :"
          noteLabel="Note :"
          fitChart
        >
          <RevealOnView>
            {vis => (
              <ScatterLog
                points={data.map(d => ({ key: d.iso3, label: PREJUDICE_COUNTRY_NAMES_FR[d.iso3] ?? d.iso3, x: d['GDP per capita (log scale)'], y: d['Share reporting discrimination or harassment'] }))}
                title="Produit intérieur brut (PIB) par habitant et part de la population déclarant avoir subi des discriminations ou du harcèlement"
                xLabel="Produit intérieur brut (PIB) par habitant, dollars"
                yLabel="Part de la population déclarant avoir subi des discriminations ou du harcèlement, en pourcentage"
                isVisible={vis}
              />
            )}
          </RevealOnView>
        </ChartSection>
      )}
    </ChartData>
  </div>
);
