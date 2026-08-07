import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import DASHBOARD_ICONS from './dashboardIcons.jsx';
import './DashboardFramework.css';
import scrollToAnchor from './scrollToAnchor.js';

const DashboardIcon = ({ label }) => {
  const filename = DASHBOARD_ICONS[label];
  return filename ? <img alt="" aria-hidden="true" className="df_pillar_icon" src={resolveAsset(`assets/img/${filename}`)} /> : null;
};

const DashboardFramework = ({ dimensions = [], foundationalPrinciples = [], title }) => {
  const [ref, inView] = useIsVisible(0.2);

  return (
    <div className={`df_bg${inView ? ' df_container--inview' : ''}`} ref={ref}>
      <div className="df_container">
        <h3 className="df_title">{title}</h3>
        <div className="df_pillars">
          {dimensions.map((dim, idx) => (
            <div className={`df_pillar df_pillar--${dim.variant}`} key={dim.key} style={{ transitionDelay: `${idx * 84}ms` }}>
              <div className="df_pillar_head">
                <span className="df_pillar_name">{dim.label}</span>
                <span className="df_pillar_count">{dim.components.length} components</span>
              </div>
              <ul className="df_pillar_list">
                {dim.components.map(c => {
                  const item = typeof c === 'string' ? { label: c } : c;
                  return (
                    <li className={item.href ? 'df_pillar_item--linked' : undefined} key={item.label}>
                      {item.href ? (
                        <button className="df_pillar_link" onClick={() => scrollToAnchor(item.href)} type="button">
                          <DashboardIcon label={item.label} />
                          <span>{item.label}</span>
                          <span aria-hidden="true" className="df_pillar_go">
                            → see the data
                          </span>
                        </button>
                      ) : (
                        <>
                          <DashboardIcon label={item.label} />
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
          {foundationalPrinciples.map(p => (
            <span className="df_principles_chip" key={p.key}>
              <DashboardIcon label={p.label} />
              {p.label}
            </span>
          ))}
        </div>
        <p className="df_foot">
          Components with <b>→ see the data</b> are illustrated with selected indicators below.
        </p>
      </div>
    </div>
  );
};

export default DashboardFramework;
