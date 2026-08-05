import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import ButtonShare from '@unctad-infovis/general-tools/components/ButtonShare.jsx';
import { resolveAsset } from '@unctad-infovis/general-tools/helpers/BasePath.js';
import './Header.css';

const renderTitle = (title, titleHighlight) => {
  if (!titleHighlight || !title.includes(titleHighlight)) return title;
  const [before, after] = title.split(titleHighlight);
  return (
    <>
      {before}
      <span className="bgdp_header_title_highlight">{titleHighlight}</span>
      {after}
    </>
  );
};

const Header = ({ byline, downloadUrl, image_url, subtitle, title, titleHighlight }) => (
  <div className="width_100vw bgdp_header" style={{ backgroundImage: `url(${resolveAsset(image_url)})` }}>
    <div className="bgdp_header_inner">
      <h1 className="bgdp_header_title">{renderTitle(title, titleHighlight)}</h1>
      <p className="bgdp_header_subtitle">{subtitle}</p>
      {byline && <p className="bgdp_header_byline">{byline}</p>}
      <div className="bgdp_header_ctas">
        <ButtonAnchor className="bgdp_header_cta bgdp_header_cta--primary" text="Explore the dashboard" url=".anchor_data" />
        {downloadUrl && <ButtonAnchor className="bgdp_header_cta bgdp_header_cta--ghost" text="Download report (PDF)" url={downloadUrl} />}
      </div>
      <ButtonShare url={window.location.href} defaultOpen position="static" iconBg="rgba(0,0,0,0.45)" iconHoverBg="color-mix(in srgb, var(--un-color-yellow-brand) 75%, transparent)" iconColor="#fff" iconHoverColor="#000" size={36} />
    </div>
  </div>
);

export default Header;
