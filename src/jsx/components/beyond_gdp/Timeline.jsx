import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import './Timeline.css';

const Timeline = ({ milestones = [], title }) => {
  const [trackRef, trackInView] = useIsVisible(0.2);

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
        <div className={`tl_track${trackInView ? ' tl_track--inview' : ''}`} ref={trackRef}>
          {milestones.map((m, idx) => (
            <div className={`tl_item${m.current ? ' tl_item--current' : ''}`} key={m.date} style={{ transitionDelay: `${idx * 105}ms` }}>
              <span className="tl_date">{m.date}</span>
              <div className="tl_marker_row">
                <span className="tl_marker" />
              </div>
              <p className="tl_label">{m.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
