import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import DASHBOARD_ICONS from './dashboardIcons.jsx';
import './DashboardFramework.css';
import scrollToAnchor from './scrollToAnchor.js';

const DashboardIcon = ({ icon }) => {
  const filename = DASHBOARD_ICONS[icon];
  return filename ? <img alt="" aria-hidden="true" className="df_pillar_icon" src={resolveAsset(`assets/img/${filename}`)} /> : null;
};

const DashboardFramework = ({ componentsLabel = 'components', dimensions = [], foot = 'Components with {seeDataLabel} are illustrated with selected indicators below.', foundationalPrinciples = [], principlesLabel = 'Foundational principles', seeDataLabel = '→ see example data', title }) => {
  const [ref, inView] = useIsVisible(0.2);
  const [footBefore, footAfter] = foot.split('{seeDataLabel}');

  return (
    <div className={`df_bg${inView ? ' df_container--inview' : ''}`} ref={ref}>
      <div className="df_container">
        <h3 className="df_title">{title}</h3>
        <div className="df_pillars">
          {dimensions.map((dim, idx) => (
            <div className={`df_pillar df_pillar--${dim.variant}`} key={dim.key} style={{ transitionDelay: `${idx * 84}ms` }}>
              <div className="df_pillar_head">
                <span className="df_pillar_name">{dim.label}</span>
                <span className="df_pillar_count">{dim.components.length} {componentsLabel}</span>
              </div>
              <ul className="df_pillar_list">
                {dim.components.map(item => (
                  <li className={item.href ? 'df_pillar_item--linked' : undefined} key={item.icon}>
                    {item.href ? (
                      <button className="df_pillar_link" onClick={() => scrollToAnchor(item.href)} type="button">
                        <DashboardIcon icon={item.icon} />
                        <span>{item.label}</span>
                        <span aria-hidden="true" className="df_pillar_go">
                          {seeDataLabel}
                        </span>
                      </button>
                    ) : (
                      <>
                        <DashboardIcon icon={item.icon} />
                        {item.label}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="df_principles">
          <span className="df_principles_label">{principlesLabel}</span>
          {foundationalPrinciples.map(p => (
            <span className="df_principles_chip" key={p.key}>
              <DashboardIcon icon={p.icon} />
              {p.label}
            </span>
          ))}
        </div>
        <p className="df_foot">
          {footBefore}<b>{seeDataLabel}</b>{footAfter}
        </p>
      </div>
    </div>
  );
};

export default DashboardFramework;
