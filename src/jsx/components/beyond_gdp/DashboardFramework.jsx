// TODO(interactive-dashboard): the client hasn't finalized requirements for the interactive
// version (dimension selector, keyboard/touch behaviour, ARIA state) — see draft.txt's
// "INTERACTIVE DASHBOARD" note. This renders the full data model as a static, non-interactive
// layout for now; swap in a selector-driven component once the spec is confirmed.
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import './DashboardFramework.css';

const DashboardFramework = ({ dimensions = [], foundationalPrinciples = [], title }) => {
  const [ref, inView] = useIsVisible(0.2);

  return (
    <div className={`df_bg${inView ? ' df_container--inview' : ''}`} ref={ref}>
      <div className="df_container">
        <h3 className="df_title">{title}</h3>
        <div className="df_dimensions">
          {dimensions.map((dim, idx) => (
            <div className="df_dimension" key={dim.key} style={{ transitionDelay: `${idx * 84}ms` }}>
              <h4 className="df_dimension_label">{dim.label}</h4>
              <ul className="df_component_list">
                {dim.components.map(c => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="df_foundations">
          <span className="df_foundations_label">Foundational principles</span>
          <div className="df_foundations_items">
            {foundationalPrinciples.map(p => (
              <span className="df_foundation_item" key={p.key}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFramework;
