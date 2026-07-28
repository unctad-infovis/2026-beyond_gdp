import { useRef } from 'react';

import Article from '../Article.mdx';
import ChartData from './components/beyond_gdp/ChartData.jsx';
import ChartPair from './components/beyond_gdp/ChartPair.jsx';
import ChartSection from './components/beyond_gdp/ChartSection.jsx';
import DashboardFramework from './components/beyond_gdp/DashboardFramework.jsx';
import DualBarRowsLoader from './components/beyond_gdp/DualBarRowsLoader.jsx';
import GapChart from './components/beyond_gdp/GapChart.jsx';
import Header from './components/beyond_gdp/Header.jsx';
import Nav from './components/beyond_gdp/Nav.jsx';
import RevealList from './components/beyond_gdp/RevealList.jsx';
import RevealOnView from './components/beyond_gdp/RevealOnView.jsx';
import SectionDivider from './components/beyond_gdp/SectionDivider.jsx';
import StatTiles from './components/beyond_gdp/StatTiles.jsx';
import Timeline from './components/beyond_gdp/Timeline.jsx';
import BarPair from './components/charts/BarPair.jsx';
import DualBarRows from './components/charts/DualBarRows.jsx';
import GroupedBarChart from './components/charts/GroupedBarChart.jsx';
import LineChartMulti from './components/charts/LineChartMulti.jsx';
import ScatterLog from './components/charts/ScatterLog.jsx';

import './components/beyond_gdp/beyond_gdp.css';
import '@unctad-infovis/general-tools/styles/styles.css';

const components = {
  BarPair,
  ChartData,
  ChartPair,
  ChartSection,
  DashboardFramework,
  DualBarRows,
  DualBarRowsLoader,
  GapChart,
  GroupedBarChart,
  Header,
  LineChartMulti,
  Nav,
  RevealList,
  RevealOnView,
  ScatterLog,
  SectionDivider,
  StatTiles,
  Timeline
};

const App = ({ meta }) => {
  const appRef = useRef();

  window.appRef = appRef;

  return (
    <div className="app" ref={appRef}>
      <Article components={components} meta={meta} />
    </div>
  );
};

export default App;
