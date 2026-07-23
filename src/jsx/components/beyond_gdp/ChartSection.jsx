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

const ChartSection = ({ children, description, expandable, insight = [], note, source, title }) => (
  <figure className="cs_container">
    <div className="cs_header">
      <h4 className="cs_title">{title}</h4>
      {description && <p className="cs_subtitle">{description}</p>}
    </div>
    {insight.map(p => (
      <p className="cs_insight" key={p.slice(0, 40)}>
        {renderInsight(p)}
      </p>
    ))}
    <div className="cs_chart">{children}</div>
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
  </figure>
);

export default ChartSection;
