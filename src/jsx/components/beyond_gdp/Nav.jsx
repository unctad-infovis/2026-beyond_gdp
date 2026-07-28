import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import './Nav.css';

const scrollToTarget = href => {
  const target = document.querySelector(href);
  if (!target) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
};

const Nav = ({ downloadUrl, items = [] }) => (
  <nav className="bgdp_nav">
    <div className="bgdp_nav_links">
      {items.map(item => (
        <button className="bgdp_nav_btn" key={item.label} onClick={() => scrollToTarget(item.href)} type="button">
          {item.label}
        </button>
      ))}
    </div>
    {downloadUrl && <ButtonAnchor className="full_report" text="Download the report (PDF)" url={downloadUrl} />}
  </nav>
);

export default Nav;
