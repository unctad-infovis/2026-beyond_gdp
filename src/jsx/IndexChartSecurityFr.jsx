import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-security-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_homicides.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_security"
          dimensionChip={{ icon: 'security', label: 'Sécurité', variant: 'yellow' }}
          title="La sécurité peut se dégrader même lorsque le PIB progresse"
          description="Produit intérieur brut (PIB) par habitant médian et homicides volontaires, Amérique latine et Caraïbes et Asie de l'Est et du Sud-Est, indice : 2015=100 et homicides pour 100 000 habitants, 2015-2023."
          insight={["Une croissance soutenue du PIB ne garantit pas toujours plus de sécurité. En Amérique latine, les homicides ont augmenté de près de 50 % entre 2015 et 2023, alors même que le PIB progressait de 17 %. Le taux médian d'homicides a d'ailleurs atteint son niveau le plus élevé jamais enregistré en 2023. Cette situation contraste fortement avec l'Asie de l'Est et du Sud-Est, où les taux d'homicides étaient 29 fois plus faibles."]}
          expandable={{ label: 'Pays pris en compte dans le calcul', items: ["Asie de l'Est et du Sud-Est : Japon, Malaisie, Mongolie, Myanmar, République de Corée, Singapour.", "Amérique latine : Argentine, Barbade, Brésil, Chili, Colombie, Costa Rica, Dominique, Équateur, Grenade, Guyana, Honduras, Jamaïque, Mexique, Panama, Paraguay, État plurinational de Bolivie, Sainte-Lucie, Suriname, Uruguay."] }}
          source="Banque mondiale."
          sourceLabel="Source :"
          noteLabel="Note :"
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="gdp_per_capita" isVisible={vis} title="Produit intérieur brut (PIB) par habitant, indice 2015=100" yLabel="Produit intérieur brut (PIB) par habitant, indice 2015=100" yMin={90} yMax={121} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Latin America and the Caribbean', label: 'Amérique latine et Caraïbes' }, { key: 'Eastern and South-Eastern Asia', label: "Asie de l'Est et du Sud-Est" }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="homicides" isVisible={vis} title="Nombre de victimes d'homicide pour 100 000 habitants" yLabel="Nombre de victimes d'homicide pour 100 000 habitants" yMin={0} yMax={20} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Latin America and the Caribbean', label: 'Amérique latine et Caraïbes' }, { key: 'Eastern and South-Eastern Asia', label: "Asie de l'Est et du Sud-Est" }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
