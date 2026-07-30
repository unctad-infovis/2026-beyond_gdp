import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import useClickOutside from '@unctad-infovis/general-tools/helpers/UseClickOutside.js';
import { useRef, useState } from 'react';
import scrollToAnchor from './scrollToAnchor.js';
import './Nav.css';

const ChevronIcon = () => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// Only "Data dashboard" carries `children` today; the label button always navigates on its
// own (per the client's explicit ask), the caret is a separate affordance toggling the
// dropdown — deliberately not hover-opened, since that fights touch and keyboard use and
// there's no existing nav-dropdown precedent in this codebase or its siblings to match.
const NavSplitButton = ({ item }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpen(false), open);

  const handleChildClick = href => {
    scrollToAnchor(href);
    setOpen(false);
  };

  return (
    <div className="bgdp_nav_item bgdp_nav_item--split" ref={containerRef}>
      <button className="bgdp_nav_btn bgdp_nav_btn--label" onClick={() => scrollToAnchor(item.href)} type="button">
        {item.label}
      </button>
      <button aria-expanded={open} aria-haspopup="menu" aria-label={`${item.label} categories`} className="bgdp_nav_btn bgdp_nav_btn--caret" onClick={() => setOpen(o => !o)} onKeyDown={e => e.key === 'Escape' && setOpen(false)} type="button">
        <ChevronIcon />
      </button>
      {open && (
        <div className="bgdp_nav_menu">
          {item.children.map(child => (
            <button className="bgdp_nav_menu_item" key={child.href} onClick={() => handleChildClick(child.href)} type="button">
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Nav = ({ downloadUrl, items = [] }) => (
  <nav className="bgdp_nav">
    <div className="bgdp_nav_links">
      {items.map(item =>
        item.children ? (
          <NavSplitButton item={item} key={item.label} />
        ) : (
          <button className="bgdp_nav_btn" key={item.label} onClick={() => scrollToAnchor(item.href)} type="button">
            {item.label}
          </button>
        )
      )}
    </div>
    {downloadUrl && <ButtonAnchor className="full_report" text="Download the report (PDF)" url={downloadUrl} />}
  </nav>
);

export default Nav;
