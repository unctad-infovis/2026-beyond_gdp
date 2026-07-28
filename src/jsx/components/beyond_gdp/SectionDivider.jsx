import './SectionDivider.css';

// Section-intro band (eyebrow + bold headline + divider + body prose) used to introduce a
// new part of the page, styled after 2026-cdde's SectionDivider "light" variant. `maxWidth`
// narrows the whole title+body column for shorter, more compact section intros.
const SectionDivider = ({ anchorClass, children, eyebrow, maxWidth, tint = true, title }) => (
  <div className={`container_section sdv_section${tint ? ' container_section--tint' : ''}${anchorClass ? ` ${anchorClass}` : ''}`}>
    <div className="container_section__wide" style={maxWidth ? { maxWidth } : undefined}>
      {eyebrow && (
        <div className="sdv_eyebrow">
          <span className="sdv_eyebrow_line" />
          <span className="sdv_eyebrow_text">{eyebrow}</span>
        </div>
      )}
      <h2 className="sdv_title">{title}</h2>
      <hr className="sdv_divider" />
      <div className="sdv_body">{children}</div>
    </div>
  </div>
);

export default SectionDivider;
