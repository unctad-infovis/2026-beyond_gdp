import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import BarPair from './components/charts/BarPair.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-wage-gap-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_wage_gap.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_wage_gap"
          dimensionChip={{ icon: 'income_inequality', label: 'Inégalités de revenu', variant: 'purple' }}
          title="La croissance économique dépasse les progrès des salaires des femmes"
          description="Produit intérieur brut (PIB) par habitant moyen et gains horaires moyens des femmes en proportion de ceux des hommes, économies développées, dollars et pourcentage, moyennes 2010-2013 et 2020-2023."
          source="Banque mondiale et Organisation internationale du Travail, via la base de données mondiale des indicateurs relatifs aux ODD des Nations Unies."
          sourceLabel="Source :"
          noteLabel="Note :"
          insight={["La croissance du PIB peut être plus lente pour une partie de la population. Le PIB par habitant moyen des économies développées a augmenté de 12 % sur une période de dix ans, mais l'écart de rémunération entre les femmes et les hommes ne s'est réduit que de 1 %, soit moins d'un dixième de cette progression."]}
          expandable={{ label: 'Pays pris en compte dans le calcul', items: ["Bosnie-Herzégovine, Tchéquie, Finlande, France, Grèce, Hongrie, Italie, Portugal, République de Corée, République de Moldova, Roumanie, Slovaquie, Espagne, Suède, Suisse, Royaume-Uni de Grande-Bretagne et d'Irlande du Nord, États-Unis d'Amérique."] }}
        >
          <ChartPair
            rightDelayMs={840}
            leftChart={vis => <BarPair isVisible={vis} title="Produit intérieur brut (PIB) par habitant, dollars" yLabel="Produit intérieur brut (PIB) par habitant, dollars" periods={data.periods} values={data.series.gdp_per_capita} valueFormat="" />}
            rightChart={vis => <BarPair isVisible={vis} title="Gains horaires des femmes, en proportion de ceux des hommes, en pourcentage" yLabel="Gains horaires des femmes, en proportion de ceux des hommes" periods={data.periods} values={data.series.wage_gap_pct} valueFormat="percent" />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
