import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-wealth-inequality-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_wealth_inequality.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_wealth_inequality"
          dimensionChip={{ icon: 'wealth_inequality', label: 'Inégalités de richesse', variant: 'purple' }}
          title="Une croissance plus rapide peut s'accompagner d'inégalités de richesse plus marquées"
          description="Produit intérieur brut (PIB) par habitant médian et part de la richesse détenue par les 99 % les moins riches, Europe de l'Est et Europe du Sud, indice : 2000=100 et pourcentage, 2000-2019."
          source="ONU commerce et développement (CNUCED), d'après la Banque mondiale et la World Inequality Database."
          sourceLabel="Source :"
          noteLabel="Note :"
          insight={["Une marée montante ne soulève pas toujours tous les bateaux : la croissance économique peut s'accompagner d'inégalités croissantes. Par exemple, le PIB par habitant a progressé plus rapidement en Europe de l'Est qu'en Europe du Sud. Pourtant, la part de la richesse détenue par les 99 % les moins riches y a reculé plus fortement."]}
          expandable={{ label: 'Pays pris en compte dans le calcul', items: ["Europe de l'Est : Bélarus, Bulgarie, Tchéquie, Hongrie, Pologne, République de Moldova, Roumanie, Fédération de Russie, Slovaquie, Ukraine.", 'Europe du Sud : Albanie, Andorre, Bosnie-Herzégovine, Croatie, Chypre, Grèce, Italie, Malte, Monténégro, Macédoine du Nord, Portugal, Saint-Marin, Serbie, Slovénie, Espagne.'] }}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="gdp_per_capita" isVisible={vis} title="Produit intérieur brut (PIB) par habitant, indice 2000=100" yLabel="Produit intérieur brut (PIB) par habitant, indice 2000=100" yMin={90} yMax={250} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Eastern Europe', label: "Europe de l'Est" }, { key: 'Southern Europe', label: 'Europe du Sud' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="UNCTAD_region" valueKey="wealth_99_perc" isVisible={vis} title="Part de la richesse détenue par les 99 % les moins riches, en pourcentage" yLabel="Part de la richesse détenue par les 99 % les moins riches, en pourcentage" yMin={75} yMax={78} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} series={[{ key: 'Eastern Europe', label: "Europe de l'Est" }, { key: 'Southern Europe', label: 'Europe du Sud' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
