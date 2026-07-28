import useCountUp from '@unctad-infovis/general-tools/helpers/UseCountUp.js';
import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import formatNumber from '../charts/formatNumber.js';
import './StatTiles.css';

// Compact, non-full-width companion to the gstp TileRow pattern (same card/count-up
// language) for dropping a handful of key figures inline within a prose section.
// Tiles use useCountUp (raw number) rather than the shared RollingNumber component so a
// `format: 'year'` tile (e.g. 2027) can skip thousands-grouping entirely, since a year is
// never grouped — house style only calls for it on genuine large-magnitude counts.
const StatTile = ({ delay, tile }) => {
  const [current, ref] = useCountUp(tile.value);
  const displayValue = tile.format === 'year' ? Math.round(current) : formatNumber(current);

  return (
    <div className="st_tile" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <p className="st_tile_value">{displayValue}</p>
      <p className="st_tile_label">{tile.label}</p>
    </div>
  );
};

const StatTiles = ({ tiles = [] }) => {
  const [gridRef, inView] = useIsVisible(0.3);

  return (
    <div className={`st_grid${inView ? ' st_grid--inview' : ''}`} ref={gridRef}>
      {tiles.map((tile, idx) => (
        <StatTile delay={idx * 150} key={tile.label} tile={tile} />
      ))}
    </div>
  );
};

export default StatTiles;
