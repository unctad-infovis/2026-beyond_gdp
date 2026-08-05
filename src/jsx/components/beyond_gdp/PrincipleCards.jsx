import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';
import DASHBOARD_ICONS from './dashboardIcons.jsx';
import './PrincipleCards.css';

// The three foundational principles (Peace / Human Rights / Respect for the Planet) as a
// standalone icon+title card row within "What does going beyond GDP mean?" — reuses the same
// icon filenames already wired for the dashboard's red principles band in DASHBOARD_ICONS.
const PrincipleCards = ({ items = [] }) => (
  <div className="pc_grid">
    {items.map(item => {
      const filename = DASHBOARD_ICONS[item.icon];
      return (
        <div className="pc_card" key={item.title}>
          {filename && <img alt="" aria-hidden="true" className="pc_icon" src={resolveAsset(`assets/img/${filename}`)} />}
          <h4 className="pc_title">{item.title}</h4>
        </div>
      );
    })}
  </div>
);

export default PrincipleCards;
