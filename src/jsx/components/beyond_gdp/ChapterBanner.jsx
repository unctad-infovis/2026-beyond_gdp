import './ChapterBanner.css';

// Marks where one of the page's 4 top-level chapters (Introduction/Data/Recommendation/What
// next) starts — a consistent, heavier signal than SectionDivider's subsection headings, so
// the reader always knows a new chapter began rather than just another subsection.
const ChapterBanner = ({ number, title }) => (
  <div className="bgdp_chapter_banner">
    <span className="bgdp_chapter_banner_number">{number}</span>
    <span className="bgdp_chapter_banner_title">{title}</span>
  </div>
);

export default ChapterBanner;
