import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import './Relay.css';

// "Closing the gap is a shared responsibility" — a chevron relay of who-must-act segments,
// styled after the design-proposal v2 mockup's ".relay". Segments run navy → blue via
// color-mix so no hex outside the design-token set is introduced.
const Relay = ({ items = [] }) => {
  const [ref, inView] = useIsVisible(0.2);

  return (
    <div className={`rly_relay${inView ? ' rly_relay--inview' : ''}`} ref={ref}>
      {items.map((item, idx) => (
        <div className="rly_seg" key={item.title} style={{ transitionDelay: `${idx * 91}ms` }}>
          <span className="rly_n">{String(idx + 1).padStart(2, '0')}</span>
          <h4 className="rly_title">{item.title}</h4>
          <p className="rly_description">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Relay;
