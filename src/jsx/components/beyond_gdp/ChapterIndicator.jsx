import { useEffect, useState } from 'react';
import './ChapterIndicator.css';

// Sticky "you are here" pill tracking which of the page's 4 chapters is currently in view,
// via IntersectionObserver on each chapter's wrapper — the rootMargin shrinks the observed
// viewport to a thin band around its vertical center, so whichever chapter crosses that band
// becomes active (a standard scrollspy technique).
const ChapterIndicator = ({ chapters = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = window.appRef?.current ?? document;
    const elements = chapters.map(c => root.querySelector(c.selector)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [chapters]);

  const active = chapters[activeIndex];
  if (!active) return null;

  return (
    <div className="bgdp_chapter_indicator_wrap">
      <div className="bgdp_chapter_indicator">
        <span className="bgdp_chapter_indicator_number">{active.number}</span>
        <span className="bgdp_chapter_indicator_label">{active.label}</span>
      </div>
    </div>
  );
};

export default ChapterIndicator;
