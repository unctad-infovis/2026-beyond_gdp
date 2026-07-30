import { useEffect, useState } from 'react';
import './ChapterIndicator.css';

// Sticky "you are here" pill tracking which of the page's 4 chapters is currently in view,
// via IntersectionObserver on each chapter's wrapper — the rootMargin shrinks the observed
// viewport down to a zero-height line at its very top, so a chapter only becomes active once
// its own top edge scrolls up to/past that line (not merely once it's "in view" generally),
// matching a standard scrollspy pattern. Starts at `null` (nothing rendered) rather than
// defaulting to the first chapter, so the pill doesn't appear at all until the reader has
// actually scrolled into chapter 1 — not while still up in the hero/nav area.
const ChapterIndicator = ({ chapters = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

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
      { rootMargin: '0px 0px -100% 0px', threshold: 0 }
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
