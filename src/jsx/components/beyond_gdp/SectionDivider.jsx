import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';
import './SectionDivider.css';

// Section-intro band (eyebrow + bold headline + divider + body prose) used to introduce a
// new part of the page, styled after 2026-cdde's SectionDivider "light" variant. `maxWidth`
// narrows the whole title+body column for shorter, more compact section intros. `image` is a
// content-width illustrative photo (dimension intros only) — kept deliberately smaller than
// SectionPhotoBand's full-bleed chapter-transition treatment, per the user's explicit split
// between the two.
const SectionDivider = ({ anchorClass, children, eyebrow, image, imageCredit, maxWidth, tint = true, title }) => (
  <div className={`container_section sdv_section${tint ? ' container_section--tint' : ''}${anchorClass ? ` ${anchorClass}` : ''}`}>
    <div className="container_section__wide" style={maxWidth ? { maxWidth } : undefined}>
      {image && (
        <div className="sdv_image_wrap">
          <img alt="" className="sdv_image" src={resolveAsset(image)} />
          {imageCredit && <span className="sdv_image_credit">{imageCredit}</span>}
        </div>
      )}
      {eyebrow && (
        <div className="sdv_eyebrow">
          <span className="sdv_eyebrow_line" />
          <span className="sdv_eyebrow_text">{eyebrow}</span>
        </div>
      )}
      {title && <h2 className="sdv_title">{title}</h2>}
      {title && <hr className="sdv_divider" />}
      <div className="sdv_body">{children}</div>
    </div>
  </div>
);

export default SectionDivider;
