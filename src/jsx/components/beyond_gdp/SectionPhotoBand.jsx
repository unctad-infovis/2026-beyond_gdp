import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';
import './SectionPhotoBand.css';

// Full-bleed, chevron-clipped photo band used only ahead of the 3 major chapter-transition
// banners (ChapterBanner) — reserved for chapter-level dividers, not the smaller dimension
// intros, which use SectionDivider's content-width `image` prop instead.
const SectionPhotoBand = ({ credit, image }) => (
  <div className="width_100vw bgdp_photo_band" style={{ backgroundImage: `url(${resolveAsset(image)})` }}>
    {credit && <span className="bgdp_photo_band_credit">{credit}</span>}
  </div>
);

export default SectionPhotoBand;
