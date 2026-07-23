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
// are shown one after another rather than inside a ChartPair. Both gap charts share the same
// 0-100% scale with a dashed 100% goal line, since full indicator coverage is the target either way.
const GapChart = ({ data, title, yLabel }) => {
  const values = {};
  for (const dim of DIMENSIONS) values[dim.key] = {};
  for (const row of data) {
    values[row.group][row.developing] = row.proportion * 100;
  }

  return <RevealOnView>{isVisible => <GroupedBarChart categories={DIMENSIONS} series={DEV_STATUS} values={values} isVisible={isVisible} title={title} yLabel={yLabel} valueFormat="percent" yMax={100} goal={100} goalLabel="100% goal" />}</RevealOnView>;
};

export default GapChart;
