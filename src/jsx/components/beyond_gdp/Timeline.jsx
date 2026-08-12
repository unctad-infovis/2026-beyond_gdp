import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import './Timeline.css';

// Vertical timeline (per user feedback on the earlier horizontal stepper — this reads more
// like an actual timeline). Every milestone's full text is always visible, ordered top to
// bottom; entries before the one flagged `current` are marked done, that one is marked
// current, and the rest read as upcoming.
const Timeline = ({ milestones = [], title }) => {
  const [trackRef, trackInView] = useIsVisible(0.2);
  const currentIndex = milestones.findIndex(m => m.current);

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
        <ol className={`tl_track${trackInView ? ' tl_track--inview' : ''}`} ref={trackRef}>
          {milestones.map((m, idx) => (
            <li className={`tl_step${m.current ? ' tl_step--current' : ''}${currentIndex !== -1 && idx < currentIndex ? ' tl_step--done' : ''}`} key={m.date} style={{ transitionDelay: `${idx * 90}ms` }}>
              <span aria-hidden="true" className="tl_step_marker" />
              <span className="tl_step_date">{m.date}</span>
              <h3 className="tl_step_title">{m.title}</h3>
              <p className="tl_step_text">{m.label}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Timeline;
