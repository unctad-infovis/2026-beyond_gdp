import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import { PAIR_PALETTE_VARS } from './components/charts/chartColors.js';
import GroupedBarChart from './components/charts/GroupedBarChart.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-trust-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_trust.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_trust"
          dimensionChip={{ icon: 'social_cohesion', label: 'Cohésion sociale', variant: 'yellow' }}
          title="La croissance économique n'améliore pas automatiquement la cohésion sociale"
          description="Produit intérieur brut (PIB) par habitant médian et part de la population estimant que l'on peut faire confiance à la plupart des gens, Afrique du Nord et Asie occidentale, indice : 2014=100 et pourcentage, 2014 et 2022."
          source="Banque mondiale et Enquête mondiale sur les valeurs."
          sourceLabel="Source :"
          noteLabel="Note :"
          insight={["La confiance ne s'achète pas. Une croissance économique similaire peut s'accompagner d'évolutions différentes de la cohésion sociale. Le PIB médian a augmenté de 10,5 % en Afrique du Nord entre 2014 et 2022, mais la confiance envers autrui a chuté de plus de 17 %. Dans le même temps, le PIB par habitant et la confiance ont tous deux progressé de plus de 20 % en Asie occidentale au cours de la même période."]}
          expandable={{ label: 'Pays pris en compte dans le calcul', items: ['Afrique du Nord : Égypte, Libye, Maroc, Tunisie.', 'Asie occidentale : Arménie, Azerbaïdjan, Géorgie, Iraq, Jordanie, Liban, Türkiye.'] }}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={vis => (
              <GroupedBarChart
                isVisible={vis}
                title="Produit intérieur brut (PIB) par habitant, indice 2014=100"
                yLabel="Produit intérieur brut (PIB) par habitant, indice 2014=100"
                yMax={150}
                palette={PAIR_PALETTE_VARS}
                categories={[{ key: 'Northern Africa', label: 'Afrique du Nord' }, { key: 'Western Asia', label: 'Asie occidentale' }]}
                series={data.years.map(y => ({ key: String(y), label: String(y) }))}
                values={Object.fromEntries(Object.entries(data.regions).map(([region, r]) => [region, Object.fromEntries(data.years.map((y, i) => [String(y), r.gdp_index[i]]))]))}
              />
            )}
            rightChart={vis => (
              <GroupedBarChart
                isVisible={vis}
                title="Part de la population estimant que l'on peut faire confiance à la plupart des gens, en pourcentage"
                yLabel="Part de la population estimant que l'on peut faire confiance à la plupart des gens, en pourcentage"
                yMax={15}
                valueFormat=""
                palette={PAIR_PALETTE_VARS}
                categories={[{ key: 'Northern Africa', label: 'Afrique du Nord' }, { key: 'Western Asia', label: 'Asie occidentale' }]}
                series={data.years.map(y => ({ key: String(y), label: String(y) }))}
                values={Object.fromEntries(Object.entries(data.regions).map(([region, r]) => [region, Object.fromEntries(data.years.map((y, i) => [String(y), r.trust_pct[i]]))]))}
              />
            )}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
