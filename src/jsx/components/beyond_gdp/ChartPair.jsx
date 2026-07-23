import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';
import { useEffect, useState } from 'react';
import './ChartPair.css';

// Sequences the storytelling beat "look at this, then look at this": the left chart starts
// drawing as soon as the pair scrolls into view, the right chart is deliberately held back by
// rightDelayMs so it starts only once the left chart's own animation has finished. Keep
// rightDelayMs in sync with however long the left chart's draw-in animation actually takes.
const ChartPair = ({ leftChart, rightChart, rightDelayMs = 2000 }) => {
  const [pairRef, pairInView] = useIsVisible(0.3);
  const [rightVisible, setRightVisible] = useState(false);

  useEffect(() => {
    if (!pairInView) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setRightVisible(true);
      return;
    }
    const timer = setTimeout(() => setRightVisible(true), rightDelayMs);
    return () => clearTimeout(timer);
  }, [pairInView, rightDelayMs]);

  return (
    <div className="two_column cp_pair" ref={pairRef}>
      <div className="cp_panel">{leftChart(pairInView)}</div>
      <div className="cp_panel">{rightChart(rightVisible)}</div>
    </div>
  );
};

export default ChartPair;
