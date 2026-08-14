import ButtonAnchor from '@unctad-infovis/general-tools/components/ButtonAnchor.jsx';
import './Footer.css';

// Closing section — matches the design-proposal v2 mockup's "#closing" minus the UNCTAD
// logo, which the site's own Drupal-embedded footer already carries.
const Footer = ({ children, downloadUrl, title }) => (
  <footer className="width_100vw bgdp_footer">
    <div className="bgdp_footer_inner">
      <h2 className="bgdp_footer_title">{title}</h2>
      <div className="bgdp_footer_body">{children}</div>
      <div className="bgdp_footer_ctas">
        {downloadUrl && <ButtonAnchor className="bgdp_footer_cta bgdp_footer_cta--primary" text="Download the report (PDF)" url={downloadUrl} />}
        <ButtonAnchor className="bgdp_footer_cta bgdp_footer_cta--ghost" text="Explore insights" url=".anchor_data" />
      </div>
    </div>
  </footer>
);

export default Footer;
