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

// Only "Data dashboard" carries `children` today. The whole pill is the trigger (no separate
// arrow segment) — hover opens the dropdown for pointer users. Click always *opens* (never
// toggles closed) so it can't fight the hover state: a mouse user hovering-then-clicking would
// otherwise immediately re-close it via toggle. Touch/keyboard users (no hover event) rely on
// that click-to-open, then close via outside-click/Escape/mouseleave/selecting an item.
const NavDropdownButton = ({ item }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpen(false), open);

  const handleChildClick = href => {
    scrollToAnchor(href);
    setOpen(false);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: mouse-only hover affordance; the dropdown button itself remains fully keyboard/touch operable via click and Escape
    <div className="bgdp_nav_item" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} ref={containerRef}>
      <button aria-expanded={open} aria-haspopup="menu" className="bgdp_nav_btn bgdp_nav_btn--dropdown" onClick={() => setOpen(true)} onKeyDown={e => e.key === 'Escape' && setOpen(false)} type="button">
        {item.label}
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

const Nav = ({ items = [] }) => (
  <nav className="bgdp_nav">
    <div className="bgdp_nav_links">
      {items.map(item =>
        item.children ? (
          <NavDropdownButton item={item} key={item.label} />
        ) : (
          <button className="bgdp_nav_btn" key={item.label} onClick={() => scrollToAnchor(item.href)} type="button">
            {item.label}
          </button>
        )
      )}
    </div>
  </nav>
);

export default Nav;
