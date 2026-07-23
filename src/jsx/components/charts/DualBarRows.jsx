import CircleFlag from '@unctad-infovis/general-tools/components/CircleFlag.jsx';
import { max } from 'd3-array';
import { useState } from 'react';
import './DualBarRows.css';
import formatNumber from './formatNumber.js';

// One row per item, two horizontal bars (a primary %-style measure and a secondary $-style
// measure) growing in via CSS width transition with a capped per-row stagger so a long list
// (30+ rows) doesn't take forever to finish appearing. Row names are right-aligned with an
// optional round flag to the right of the name (pass `flagCode` as an ISO2 code per row).
// Column headers are clickable to re-sort the rows by that measure (toggles direction on repeat clicks).
const DualBarRows = ({ highlight = [], isVisible = false, primaryFormat = v => Math.round(v), primaryLabel, rows = [], secondaryFormat = formatNumber, secondaryLabel }) => {
  const [sortKey, setSortKey] = useState('primaryValue');
  const [sortDir, setSortDir] = useState('desc');

  const toggleSort = key => {
    if (key === sortKey) {
      setSortDir(dir => (dir === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sorted = [...rows].sort((a, b) => (sortDir === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]));
  const primaryMax = max(sorted, r => r.primaryValue) ?? 1;
  const secondaryMax = max(sorted, r => r.secondaryValue) ?? 1;

  const headButton = (key, label) => (
    <button className={`dbr_head_label${sortKey === key ? ' dbr_head_label--active' : ''}`} onClick={() => toggleSort(key)} title={`Sort by ${label}`} type="button">
      {label}
      <span aria-hidden="true" className="dbr_sort_arrow">
        {sortKey === key && sortDir === 'asc' ? '▲' : '▼'}
      </span>
    </button>
  );

  return (
    <div className="dbr_container">
      <div className="dbr_head">
        <span className="dbr_head_name" />
        {headButton('primaryValue', primaryLabel)}
        {headButton('secondaryValue', secondaryLabel)}
      </div>
      {sorted.map((row, idx) => {
        const isHighlight = highlight.includes(row.key);
        const delay = Math.min(idx * 13, 315);
        return (
          <div className={`dbr_row${isHighlight ? ' dbr_row--highlight' : ''}`} key={row.key}>
            <span className="dbr_name">
              <span className="dbr_name_text">{row.name}</span>
              {row.flagCode && <CircleFlag className="dbr_flag" countryCode={row.flagCode} height={16} />}
            </span>
            <span className="dbr_bar_track">
              <span className="dbr_bar dbr_bar--primary" style={{ transitionDelay: `${delay}ms`, width: isVisible ? `${(row.primaryValue / primaryMax) * 100}%` : 0 }} />
              <span className="dbr_bar_value">{primaryFormat(row.primaryValue)}</span>
            </span>
            <span className="dbr_bar_track">
              <span className="dbr_bar dbr_bar--secondary" style={{ transitionDelay: `${delay}ms`, width: isVisible ? `${(row.secondaryValue / secondaryMax) * 100}%` : 0 }} />
              <span className="dbr_bar_value">{secondaryFormat(row.secondaryValue)}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DualBarRows;
