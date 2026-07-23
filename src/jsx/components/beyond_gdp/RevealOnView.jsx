import useIsVisible from '@unctad-infovis/general-tools/helpers/UseIsVisible.js';

// Generic single-chart scroll-reveal wrapper for chart primitives that need no data shaping,
// just an isVisible trigger (render-prop so Article.mdx can pass the chart inline).
const RevealOnView = ({ children, threshold = 0.2 }) => {
  const [ref, isVisible] = useIsVisible(threshold);
  return <div ref={ref}>{children(isVisible)}</div>;
};

export default RevealOnView;
