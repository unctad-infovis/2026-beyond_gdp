import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import COUNTRY_NAMES_FR from './components/beyond_gdp/countryNames.fr.js';
import DualBarRowsLoader from './components/beyond_gdp/DualBarRowsLoader.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-satisfaction-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_satisfaction.json">
      {data => (
        <ChartSection
          standalone
          title="Plus de prospérité ne garantit pas plus de satisfaction à l'égard des services publics"
          description="Part de la population satisfaite de sa dernière expérience des services publics et produit intérieur brut (PIB) par habitant, pays sélectionnés, pourcentage et dollars, moyenne 2015-2024."
          source="Banque mondiale et Programme des Nations Unies pour le développement, via la base de données mondiale des indicateurs relatifs aux ODD des Nations Unies."
          sourceLabel="Source :"
          noteLabel="Note :"
          note="La satisfaction déclarée peut refléter un effet de disconfirmation des attentes. Les personnes ayant des attentes plus élevées peuvent déclarer une satisfaction plus faible, même lorsque la qualité objective du service est supérieure."
          insight={["La confiance dans les institutions compte. Et elle ne va pas toujours de pair avec des niveaux plus élevés de prospérité économique. La Bulgarie et le Mexique déclarent une satisfaction à l'égard des services publics plus élevée que certains pays plus riches, comme la Norvège et l'Italie."]}
        >
          <DualBarRowsLoader data={data} countryNames={COUNTRY_NAMES_FR} primaryLabel="Satisfaction à l'égard des services publics" secondaryLabel="Produit intérieur brut (PIB) par habitant" sortByLabel="Trier par" />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
