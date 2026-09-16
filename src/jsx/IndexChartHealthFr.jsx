import { createRoot } from 'react-dom/client';

import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';

const container = document.getElementById('app-root-2026-beyond_gdp-chart-health-fr');
const root = createRoot(container);
root.render(
  <div className="app">
    <ChartData file="2026-beyond_gdp_healthy_life_expectancy.json">
      {data => (
        <ChartSection
          standalone
          anchorClass="anchor_health"
          dimensionChip={{ icon: 'health', label: 'Santé', variant: 'yellow' }}
          title="Des revenus plus élevés ne garantissent pas toujours une vie plus longue et plus saine"
          description="Produit intérieur brut (PIB) par habitant médian et espérance de vie en bonne santé en années, Amérique du Nord, Europe du Nord et Europe du Sud, dollars et années, 2000-2019."
          source="ONU commerce et développement (CNUCED), d'après la Banque mondiale et l'OMS."
          sourceLabel="Source :"
          noteLabel="Note :"
          insight={["Un PIB plus élevé ne se traduit pas toujours par plus de bien-être. Le PIB par habitant de l'Europe du Sud représente moins de la moitié de celui de l'Amérique du Nord et de l'Europe du Nord. Pourtant, son espérance de vie en bonne santé y est plus élevée que celle de l'Amérique du Nord et a rattrapé celle de l'Europe du Nord. En Europe du Sud, l'espérance de vie en bonne santé a continué de s'améliorer malgré le ralentissement économique."]}
        >
          <ChartPair
            rightDelayMs={1400}
            leftChart={(vis, hover) => <LineChartMulti data={data} seriesKey="region" valueKey="gdp_per_capita" isVisible={vis} title="Produit intérieur brut (PIB) par habitant, dollars" yLabel="Produit intérieur brut (PIB) par habitant, dollars" hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} palette={['--un-color-blue-brand', '--un-color-blue-darkest', '--un-color-yellow']} series={[{ key: 'NAM', label: 'Amérique du Nord' }, { key: 'NEU', label: 'Europe du Nord' }, { key: 'SEU', label: 'Europe du Sud' }]} />}
            rightChart={(vis, hover) => <LineChartMulti data={data} seriesKey="region" valueKey="healthy_life_exp" isVisible={vis} title="Espérance de vie en bonne santé, années" yLabel="Espérance de vie en bonne santé, années" yMin={64} yMax={72} hoveredYear={hover.hoveredYear} onHoverChange={hover.onHoverChange} palette={['--un-color-blue-brand', '--un-color-blue-darkest', '--un-color-yellow']} series={[{ key: 'NAM', label: 'Amérique du Nord' }, { key: 'NEU', label: 'Europe du Nord' }, { key: 'SEU', label: 'Europe du Sud' }]} />}
          />
        </ChartSection>
      )}
    </ChartData>
  </div>
);
