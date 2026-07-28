// TODO(interactive-dashboard): the client hasn't finalized requirements for the interactive
// version (dimension selector, keyboard/touch behaviour, ARIA state) — see draft.txt's
// "INTERACTIVE DASHBOARD" note. This renders the full data model as a static, non-interactive
// layout for now; swap in a selector-driven component once the spec is confirmed.
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import DASHBOARD_ICONS from './dashboardIcons.jsx';
import './DashboardFramework.css';

const DashboardFramework = ({ dimensions = [], foundationalPrinciples = [], title }) => {
  const [ref, inView] = useIsVisible(0.2);

  return (
    <div className={`df_bg${inView ? ' df_container--inview' : ''}`} ref={ref}>
      <div className="df_container">
        <h3 className="df_title">{title}</h3>
        <div className="df_pillars">
          {dimensions.map((dim, idx) => (
            <div className={`df_pillar df_pillar--${dim.variant}`} key={dim.key} style={{ transitionDelay: `${idx * 84}ms` }}>
              <div className="df_pillar_head">{dim.label}</div>
              <ul className="df_pillar_list">
                {dim.components.map(c => {
                  const Icon = DASHBOARD_ICONS[c];
                  return (
                    <li key={c}>
                      <span className="df_pillar_icon">{Icon && <Icon />}</span>
                      {c}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="df_principles">
          <span className="df_principles_label">Foundational principles</span>
          {foundationalPrinciples.map(p => {
            const Icon = DASHBOARD_ICONS[p.label];
            return (
              <span className="df_principles_chip" key={p.key}>
                <span className="df_principles_chip_icon">{Icon && <Icon />}</span>
                {p.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardFramework;
