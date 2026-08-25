import ButtonShare from '@unctad-infovis/general-tools/components/ButtonShare.jsx';
import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';
import DASHBOARD_ICONS from './dashboardIcons.jsx';
import scrollToAnchor from './scrollToAnchor.js';
import './ChartSection.css';

// Insight paragraphs may wrap a clause in ==double equals== to mark it as the key takeaway,
// rendered as a yellow highlight (e.g. "homicides increased ==nearly 50%== from 2015 to 2023").
const HIGHLIGHT_RE = /==(.+?)==/g;
const renderInsight = text =>
  text.split(HIGHLIGHT_RE).map((part, i) =>
    i % 2 === 1 ? (
      <mark className="cs_insight_highlight" key={part}>
        {part}
      </mark>
    ) : (
      part
    )
  );

const ChartSection = ({ anchorClass, children, description, dimensionChip, expandable, fitChart = false, insight = [], note, source, title }) => {
  const chipIcon = dimensionChip && DASHBOARD_ICONS[dimensionChip.label];

  return (
    <figure className={`cs_container${anchorClass ? ` ${anchorClass}` : ''}`}>
      {dimensionChip && (
        <div className="cs_chiprow">
          <span className={`cs_dimchip cs_dimchip--${dimensionChip.variant}`}>
            {chipIcon && <img alt="" aria-hidden="true" className="cs_dimchip_icon" src={resolveAsset(`assets/img/${chipIcon}`)} />}
            {dimensionChip.label}
          </span>
        </div>
      )}
      <div className="cs_card">
        <div className="cs_share">
          <ButtonShare
            borderRadius="6px"
            defaultOpen
            iconBg="var(--un-color-blue-lightest)"
            iconColor="var(--un-color-blue-text-dark)"
            iconHoverBg="var(--un-color-blue)"
            iconHoverColor="#fff"
            position="static"
            size={30}
            url={anchorClass ? `${window.location.origin}${window.location.pathname}#${anchorClass}` : window.location.href}
          />
        </div>
        <div className="cs_header">
          <h4 className="cs_title">{title}</h4>
          {description && <p className="cs_subtitle">{description}</p>}
        </div>
        {insight.map(p => (
          <p className="cs_insight" key={p.slice(0, 40)}>
            {renderInsight(p)}
          </p>
        ))}
        <div className={`cs_chart${fitChart ? ' cs_chart--fit' : ''}`}>{children}</div>
      </div>
      {expandable && (
        <details className="cs_expandable">
          <summary>{expandable.label}</summary>
          {expandable.items.map(item => (
            <p key={item.slice(0, 40)}>{item}</p>
          ))}
        </details>
      )}
      {(source || note) && (
        <figcaption className="cs_meta">
          {source && (
            <p className="cs_meta_row">
              <em>Source:</em> {source}
            </p>
          )}
          {note && (
            <p className="cs_meta_row">
              <em>Note:</em> {note}
            </p>
          )}
        </figcaption>
      )}
      <div className="cs_backrow">
        <button className="cs_backdash" onClick={() => scrollToAnchor('.anchor_data')} type="button">
          ← Back to dashboard
        </button>
      </div>
    </figure>
  );
};

export default ChartSection;
