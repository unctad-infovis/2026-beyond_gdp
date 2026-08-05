import './ChapterBanner.css';

// Gradient transition banner marking the start of the dashboard, data-gaps and driving-change
// sections — a heavier signal than SectionDivider's subsection headings. No chapter numbering
// (the site dropped that convention); just a small eyebrow label above the title, plus a large
// low-opacity watermark arrow, per the design-proposal v2 mockup's ".section-banner".
const ChapterBanner = ({ anchorClass, eyebrow, title }) => (
  <div className={`bgdp_chapter_banner${anchorClass ? ` ${anchorClass}` : ''}`}>
    <div className="bgdp_chapter_banner_watermark" aria-hidden="true" />
    <div className="bgdp_chapter_banner_inner">
      {eyebrow && <span className="bgdp_chapter_banner_eyebrow">{eyebrow}</span>}
      <h2 className="bgdp_chapter_banner_title">{title}</h2>
    </div>
  </div>
);

export default ChapterBanner;
