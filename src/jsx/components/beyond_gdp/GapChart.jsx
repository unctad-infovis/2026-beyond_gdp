import GroupedBarChart from '../charts/GroupedBarChart.jsx';
import RevealOnView from './RevealOnView.jsx';

// Language-neutral group/developing-status keys as they appear in gap1.json/gap2.json —
// these must stay in English regardless of UI language, since they're functional lookup keys
// the data rows are matched against, not display text.
const DIMENSION_KEYS = ['Current Well-being', 'Equity & Inclusion', 'Foundational Principles', 'Sustainability & Resilience'];
const DEV_STATUS_KEYS = ['developed', 'developing'];
const DEFAULT_DIMENSION_LABELS = ['Current well-being', 'Equity & inclusion', 'Foundational principles', 'Sustainability & resilience'];
const DEFAULT_DEV_STATUS_LABELS = ['Developed', 'Developing'];

// Shapes gap1.json/gap2.json's {developing, group, proportion} rows into GroupedBarChart's
// category x series `values` shape. Visibility is delegated to RevealOnView since gap charts
// are shown one after another rather than inside a ChartPair. Both gap charts share the same
// 0-100% scale with a dashed 100% goal line, since full indicator coverage is the target either way.
const GapChart = ({ data, devStatusLabels = DEFAULT_DEV_STATUS_LABELS, dimensionLabels = DEFAULT_DIMENSION_LABELS, goalLabel = '100% goal', title, yLabel }) => {
  const dimensions = DIMENSION_KEYS.map((key, i) => ({ key, label: dimensionLabels[i] }));
  const devStatus = DEV_STATUS_KEYS.map((key, i) => ({ key, label: devStatusLabels[i] }));

  const values = {};
  for (const dim of dimensions) values[dim.key] = {};
  for (const row of data) {
    values[row.group][row.developing] = row.proportion * 100;
  }

  return <RevealOnView>{isVisible => <GroupedBarChart categories={dimensions} series={devStatus} values={values} isVisible={isVisible} title={title} yLabel={yLabel} valueFormat="percent" yMax={100} goal={100} goalLabel={goalLabel} />}</RevealOnView>;
};

export default GapChart;
