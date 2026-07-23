import { useEffect, useRef, useState } from 'react';

// Shared by the React-driven chart primitives (bars, scatter) that compute their D3 scales in
// the render body rather than an imperative draw() call — tracks the plot container's size via
// ResizeObserver so scales stay correct across viewport/layout changes.
const useChartSize = initialHeight => {
  const ref = useRef(null);
  const [size, setSize] = useState({ height: initialHeight, width: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => setSize({ height: entries[0].contentRect.height, width: entries[0].contentRect.width }));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
};

export default useChartSize;
