import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import DASHBOARD_ICONS from './dashboardIcons.jsx';
import './DashboardFramework.css';
import scrollToAnchor from './scrollToAnchor.js';

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
                  const item = typeof c === 'string' ? { label: c } : c;
                  const Icon = DASHBOARD_ICONS[item.label];
                  return (
                    <li className={item.href ? 'df_pillar_item--linked' : undefined} key={item.label}>
                      {item.href ? (
                        <button className="df_pillar_link" onClick={() => scrollToAnchor(item.href)} type="button">
                          <span className="df_pillar_icon">{Icon && <Icon />}</span>
                          {item.label}
                          <span aria-hidden="true" className="df_pillar_dot" />
                        </button>
                      ) : (
                        <>
                          <span className="df_pillar_icon">{Icon && <Icon />}</span>
                          {item.label}
                        </>
                      )}
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
