import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';
import './PrincipleCards.css';

// Illustrative icon+title card row within "What does going beyond GDP mean?" — per the design
// proposal mockup, each card's icon illustrates its claim rather than the literal foundational
// principle (e.g. "well-being is collective" gets a community/houses icon, not a peace dove), so
// items pass an `icon` filename (under public/assets/img/) directly rather than a
// DASHBOARD_ICONS lookup key.
const PrincipleCards = ({ items = [] }) => (
  <div className="pc_grid">
    {items.map(item => (
      <div className="pc_card" key={item.title}>
        {item.icon && <img alt="" aria-hidden="true" className="pc_icon" src={resolveAsset(`assets/img/${item.icon}`)} />}
        <h4 className="pc_title">{item.title}</h4>
      </div>
    ))}
  </div>
);

export default PrincipleCards;
