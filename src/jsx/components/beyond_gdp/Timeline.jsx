import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import { useState } from 'react';
import './Timeline.css';

// Horizontal stepper adapted from the graphic designer's mock (unctad_beyond_gdp_full_3.html)
// — steps wrap onto new rows instead of scrolling horizontally, and icons are dropped (they
// carried no real meaning in the mock). Only the active step's full text shows, below the
// track, so the row stays scannable; the last milestone (or whichever is flagged `current`)
// is active by default.
const Timeline = ({ milestones = [], title }) => {
  const [trackRef, trackInView] = useIsVisible(0.2);
  const defaultIndex = milestones.findIndex(m => m.current);
  const [activeIndex, setActiveIndex] = useState(defaultIndex === -1 ? milestones.length - 1 : defaultIndex);
  const active = milestones[activeIndex];

  return (
    <div className="tl_container">
      <div className="tl_intro">
        <div className="tl_eyebrow">
          <span className="tl_eyebrow_line" />
          Timeline
        </div>
        <h2 className="tl_title">{title}</h2>
      </div>

      {milestones.length > 0 && (
        <>
          <div className={`tl_track${trackInView ? ' tl_track--inview' : ''}`} ref={trackRef}>
            {milestones.map((m, idx) => (
              <button aria-current={idx === activeIndex ? 'step' : undefined} className={`tl_step${idx === activeIndex ? ' tl_step--active' : ''}${idx < activeIndex ? ' tl_step--done' : ''}`} key={m.date} onClick={() => setActiveIndex(idx)} style={{ transitionDelay: `${idx * 70}ms` }} type="button">
                <span className="tl_step_marker" />
                <span className="tl_step_date">{m.date}</span>
                <span className="tl_step_title">{m.title}</span>
              </button>
            ))}
          </div>
          {active && (
            <div className="tl_detail">
              <span className="tl_detail_badge">{active.date}</span>
              <p className="tl_detail_text">{active.label}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Timeline;
