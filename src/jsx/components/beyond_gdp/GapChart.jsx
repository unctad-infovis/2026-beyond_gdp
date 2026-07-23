import GroupedBarChart from '../charts/GroupedBarChart.jsx';
import RevealOnView from './RevealOnView.jsx';

const DIMENSIONS = [
  { key: 'Current Well-being', label: 'Current well-being' },
  { key: 'Equity & Inclusion', label: 'Equity & inclusion' },
  { key: 'Foundational Principles', label: 'Foundational principles' },
  { key: 'Sustainability & Resilience', label: 'Sustainability & resilience' }
];
const DEV_STATUS = [
  { key: 'developed', label: 'Developed' },
  { key: 'developing', label: 'Developing' }
];

// Shapes gap1.json/gap2.json's {developing, group, proportion} rows into GroupedBarChart's
// category x series `values` shape. Visibility is delegated to RevealOnView since gap charts
// are shown one after another rather than inside a ChartPair.
const GapChart = ({ data, title }) => {
  const values = {};
  for (const dim of DIMENSIONS) values[dim.key] = {};
  for (const row of data) {
    values[row.group][row.developing] = row.proportion * 100;
  }

  return <RevealOnView>{isVisible => <GroupedBarChart categories={DIMENSIONS} series={DEV_STATUS} values={values} isVisible={isVisible} title={title} valueFormat="percent" />}</RevealOnView>;
};

export default GapChart;
